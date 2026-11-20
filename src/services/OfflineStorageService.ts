/**
 * OfflineStorageService.ts — Unified Multi-Tier Offline Storage & Migration Layer (Data Layer)
 *
 * Tier 1 (Web/Native Fast Mirror): PlatformAdapter KV (Capacitor Preferences on Android/iOS, localStorage on Web)
 * Tier 2 (Structured Persistent Store): IndexedDB v2 with versioned schema migrations & pre-migration backups
 *
 * Guarantees:
 * - Zero data loss across schema upgrades (v0/v1/v2 -> v3)
 * - Automatic pre-migration snapshot preservation
 * - Coalescing/deduplicating sync mutation queue with retry metadata
 * - Safe JSON backup export and validated restore
 */
import type { Language, UserData } from '../models/user';
import {
  CURRENT_USER_SCHEMA_VERSION,
  createBackupEnvelope,
  migrateUserData,
  parseAndMigrateBackup,
} from '../domain/schema/migrations';
import { getPlatform } from '../platform';
import { createLogger } from '../core/logging/logger';

const log = createLogger('OfflineStorage');

export interface PendingSyncMutation {
  id: string;
  userId: string;
  type: 'UPDATE_PROGRESS' | 'COMPLETE_LESSON' | 'EARN_XP' | 'CLAIM_REWARD' | 'UPDATE_STREAK';
  payload: {
    xpToAdd?: number;
    wordsToAdd?: number;
    quizCompleted?: boolean;
    gemsToAdd?: number;
    data?: Partial<UserData>;
  };
  clientTimestamp: number;
  retryCount: number;
  nextRetryAt?: number;
  lastError?: string;
  idempotencyKey?: string;
  status: 'pending' | 'syncing' | 'failed';
}

export interface StorageDiagnostics {
  readonly dbVersion: number;
  readonly schemaVersion: number;
  readonly pendingMutations: number;
  readonly failedMutations: number;
  readonly hasLocalProfile: boolean;
  readonly platformTarget: string;
}

const DB_NAME = 'kurmanji_quester_db';
const DB_VERSION = 2;
const USER_DATA_STORE = 'user_data';
const SYNC_QUEUE_STORE = 'sync_queue';
const TELEMETRY_STORE = 'telemetry_events';
const METADATA_STORE = 'metadata';
const BACKUPS_STORE = 'backups';

const LOCALSTORAGE_KEY = 'kurmanji_user_data_v2';
const LEGACY_LOCALSTORAGE_KEY = 'kurdish_quest_data';
const SYNC_QUEUE_FALLBACK_KEY = 'kurmanji_sync_queue';
const MAX_RETRY_COUNT = 5;

class OfflineStorageService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (globalThis.window === undefined || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this environment'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(USER_DATA_STORE)) {
          db.createObjectStore(USER_DATA_STORE);
        }
        if (!db.objectStoreNames.contains(SYNC_QUEUE_STORE)) {
          db.createObjectStore(SYNC_QUEUE_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(TELEMETRY_STORE)) {
          db.createObjectStore(TELEMETRY_STORE, { keyPath: 'eventId' });
        }
        if (!db.objectStoreNames.contains(METADATA_STORE)) {
          db.createObjectStore(METADATA_STORE);
        }
        if (!db.objectStoreNames.contains(BACKUPS_STORE)) {
          db.createObjectStore(BACKUPS_STORE, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        this.dbPromise = null;
        log.warn('IndexedDB failed to open; using KV fallback', { error: request.error });
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Stores an immutable pre-migration safety snapshot in IndexedDB `backups` store
   * so legacy user progress is never destroyed during schema upgrades.
   */
  private async saveSafetySnapshot(rawPayload: unknown, fromVersion: number): Promise<void> {
    try {
      const db = await this.getDB();
      if (!db.objectStoreNames.contains(BACKUPS_STORE)) return;
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(BACKUPS_STORE, 'readwrite');
        const store = tx.objectStore(BACKUPS_STORE);
        const req = store.put({
          id: `pre_migration_v${fromVersion}_${Date.now()}`,
          fromVersion,
          capturedAt: Date.now(),
          payload: rawPayload,
        });
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      log.debug('Safety snapshot write skipped', { err });
    }
  }

  /**
   * Save UserData into both Tier 1 (Platform KV: Capacitor Preferences + localStorage)
   * and Tier 2 (IndexedDB).
   */
  async saveUserData(userData: UserData): Promise<void> {
    const normalized: UserData = {
      ...userData,
      schemaVersion: userData.schemaVersion ?? CURRENT_USER_SCHEMA_VERSION,
    };

    const serialized = JSON.stringify(normalized);

    // 1. Tier 1: LocalStorage synchronous mirror + Capacitor Preferences native mirror
    try {
      if (globalThis.window !== undefined) {
        localStorage.setItem(LOCALSTORAGE_KEY, serialized);
      }
    } catch (e) {
      log.warn('LocalStorage save failed', { err: e });
    }

    try {
      const platform = getPlatform();
      if (platform.getCapabilities().hasNativeStorage) {
        await platform.kvSet(LOCALSTORAGE_KEY, serialized);
      }
    } catch (e) {
      log.warn('Native Preferences mirror save failed', { err: e });
    }

    // 2. Tier 2: IndexedDB
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(USER_DATA_STORE, 'readwrite');
        const store = tx.objectStore(USER_DATA_STORE);
        const req = store.put(normalized, 'current_user');
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      log.warn('IndexedDB saveUserData fallback', { err });
    }
  }

  /**
   * Retrieve UserData from IndexedDB, native Preferences, or legacy localStorage,
   * automatically applying lossless schema migration if needed.
   */
  async getUserData(): Promise<UserData | null> {
    let rawData: unknown = null;

    // 1. Try IndexedDB first
    try {
      const db = await this.getDB();
      rawData = await new Promise<unknown>((resolve, reject) => {
        const tx = db.transaction(USER_DATA_STORE, 'readonly');
        const store = tx.objectStore(USER_DATA_STORE);
        const req = store.get('current_user');
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      log.warn('IndexedDB getUserData fallback to KV', { err });
    }

    // 2. Try native Capacitor Preferences if IndexedDB was empty/evicted (common on iOS WKWebView)
    if (!rawData) {
      try {
        const platform = getPlatform();
        if (platform.getCapabilities().hasNativeStorage) {
          const nativeRaw = await platform.kvGet(LOCALSTORAGE_KEY);
          if (nativeRaw) rawData = JSON.parse(nativeRaw);
        }
      } catch (err) {
        log.warn('Native Preferences read failed', { err });
      }
    }

    // 3. Fallback to LocalStorage (v2 or legacy v1 key)
    if (!rawData) {
      try {
        if (globalThis.window !== undefined) {
          const raw =
            localStorage.getItem(LOCALSTORAGE_KEY) ||
            localStorage.getItem(LEGACY_LOCALSTORAGE_KEY);
          if (raw) rawData = JSON.parse(raw);
        }
      } catch (e) {
        log.warn('LocalStorage parse failed', { err: e });
      }
    }

    if (!rawData) return null;

    // Lossless schema migration (v0/v1/v2 -> v3)
    const migration = migrateUserData(rawData);
    if (migration.didMigrate) {
      log.info('Migrated UserData schema', {
        from: migration.migratedFrom,
        to: CURRENT_USER_SCHEMA_VERSION,
        warnings: migration.warnings,
      });
      await this.saveSafetySnapshot(rawData, migration.migratedFrom);
      await this.saveUserData(migration.data);
    }

    return migration.data;
  }

  /**
   * Enqueue mutation into pending sync queue with deduplication / coalescing:
   * consecutive pending `UPDATE_PROGRESS` mutations for the same user are merged
   * instead of creating redundant writes.
   */
  async enqueueMutation(
    mutation: Omit<PendingSyncMutation, 'id' | 'clientTimestamp' | 'retryCount' | 'status'>,
  ): Promise<PendingSyncMutation> {
    const existing = await this.getPendingMutations();

    // Coalesce pending UPDATE_PROGRESS mutations for the same user to avoid queue bloat
    if (mutation.type === 'UPDATE_PROGRESS') {
      const existingProgress = existing.find(
        (m) => m.userId === mutation.userId && m.type === 'UPDATE_PROGRESS' && m.status === 'pending',
      );
      if (existingProgress) {
        const coalesced: PendingSyncMutation = {
          ...existingProgress,
          clientTimestamp: Date.now(),
          payload: {
            xpToAdd: (existingProgress.payload.xpToAdd || 0) + (mutation.payload.xpToAdd || 0),
            wordsToAdd: (existingProgress.payload.wordsToAdd || 0) + (mutation.payload.wordsToAdd || 0),
            gemsToAdd: (existingProgress.payload.gemsToAdd || 0) + (mutation.payload.gemsToAdd || 0),
            quizCompleted: Boolean(existingProgress.payload.quizCompleted || mutation.payload.quizCompleted),
            data:
              existingProgress.payload.data || mutation.payload.data
                ? { ...(existingProgress.payload.data || {}), ...(mutation.payload.data || {}) }
                : undefined,
          },
        };
        await this.putMutation(coalesced);
        return coalesced;
      }
    }

    // Deduplicate identical idempotency keys
    if (mutation.idempotencyKey) {
      const dup = existing.find((m) => m.idempotencyKey === mutation.idempotencyKey);
      if (dup) return dup;
    }

    const fullMutation: PendingSyncMutation = {
      ...mutation,
      id: `mut_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      clientTimestamp: Date.now(),
      retryCount: 0,
      status: 'pending',
    };

    await this.putMutation(fullMutation);
    return fullMutation;
  }

  private async putMutation(mutation: PendingSyncMutation): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(SYNC_QUEUE_STORE, 'readwrite');
        const store = tx.objectStore(SYNC_QUEUE_STORE);
        const req = store.put(mutation);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      try {
        const rawQueue = localStorage.getItem(SYNC_QUEUE_FALLBACK_KEY) || '[]';
        const queue: PendingSyncMutation[] = JSON.parse(rawQueue);
        const idx = queue.findIndex((m) => m.id === mutation.id);
        if (idx >= 0) queue[idx] = mutation;
        else queue.push(mutation);
        localStorage.setItem(SYNC_QUEUE_FALLBACK_KEY, JSON.stringify(queue));
      } catch (e) {
        log.warn('Failed to persist mutation in LocalStorage fallback', { err: e });
      }
    }
  }

  /**
   * Record a failed sync attempt with exponential backoff and dead-letter capping.
   */
  async markMutationFailed(id: string, errorMessage: string, now: number = Date.now()): Promise<void> {
    const queue = await this.getPendingMutations();
    const target = queue.find((m) => m.id === id);
    if (!target) return;

    const nextRetryCount = target.retryCount + 1;
    const backoffMs = Math.min(60_000, 2_000 * Math.pow(2, nextRetryCount - 1));

    const updated: PendingSyncMutation = {
      ...target,
      retryCount: nextRetryCount,
      lastError: errorMessage,
      nextRetryAt: now + backoffMs,
      status: nextRetryCount >= MAX_RETRY_COUNT ? 'failed' : 'pending',
    };

    await this.putMutation(updated);
  }

  /**
   * Reset all dead-letter failed mutations back to pending for manual retry.
   */
  async resetFailedMutations(): Promise<void> {
    const queue = await this.getPendingMutations();
    for (const mut of queue) {
      if (mut.status === 'failed' || mut.retryCount > 0) {
        await this.putMutation({
          ...mut,
          retryCount: 0,
          nextRetryAt: undefined,
          lastError: undefined,
          status: 'pending',
        });
      }
    }
  }

  /**
   * Get all queued sync mutations.
   */
  async getPendingMutations(): Promise<PendingSyncMutation[]> {
    try {
      const db = await this.getDB();
      return await new Promise<PendingSyncMutation[]>((resolve, reject) => {
        const tx = db.transaction(SYNC_QUEUE_STORE, 'readonly');
        const store = tx.objectStore(SYNC_QUEUE_STORE);
        const req = store.getAll();
        req.onsuccess = () => resolve((req.result as PendingSyncMutation[]) || []);
        req.onerror = () => reject(req.error);
      });
    } catch {
      try {
        const rawQueue = localStorage.getItem(SYNC_QUEUE_FALLBACK_KEY) || '[]';
        return JSON.parse(rawQueue) as PendingSyncMutation[];
      } catch {
        return [];
      }
    }
  }

  /**
   * Remove a single mutation after successful sync.
   */
  async removeMutation(id: string): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(SYNC_QUEUE_STORE, 'readwrite');
        const store = tx.objectStore(SYNC_QUEUE_STORE);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      try {
        const rawQueue = localStorage.getItem(SYNC_QUEUE_FALLBACK_KEY) || '[]';
        const queue: PendingSyncMutation[] = JSON.parse(rawQueue);
        const filtered = queue.filter((m) => m.id !== id);
        localStorage.setItem(SYNC_QUEUE_FALLBACK_KEY, JSON.stringify(filtered));
      } catch (e) {
        log.warn('Failed to remove mutation from LocalStorage', { err: e });
      }
    }
  }

  /**
   * Clear all pending sync queue items.
   */
  async clearSyncQueue(): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(SYNC_QUEUE_STORE, 'readwrite');
        const store = tx.objectStore(SYNC_QUEUE_STORE);
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      try {
        localStorage.removeItem(SYNC_QUEUE_FALLBACK_KEY);
      } catch {
        // ignore
      }
    }
  }

  /** Export a portable, versioned JSON backup of the learner's progress. */
  async exportBackupJson(profile?: {
    displayName?: string;
    language?: Language;
    theme?: 'light' | 'dark';
  }): Promise<string> {
    const data = await this.getUserData();
    const migrated = migrateUserData(data).data;
    const envelope = createBackupEnvelope(migrated, profile);
    return JSON.stringify(envelope, null, 2);
  }

  /** Validate, migrate, and persist a JSON backup without losing existing data if invalid. */
  async restoreBackupJson(rawJson: string): Promise<{
    userData: UserData;
    profile: { displayName?: string; language?: Language; theme?: 'light' | 'dark' };
    migratedFrom: number;
  }> {
    const { envelope, migration } = parseAndMigrateBackup(rawJson);
    // Keep a safety snapshot of current local data before restoring
    const existing = await this.getUserData();
    if (existing) {
      await this.saveSafetySnapshot(existing, existing.schemaVersion ?? CURRENT_USER_SCHEMA_VERSION);
    }
    await this.saveUserData(envelope.userData);
    return {
      userData: envelope.userData,
      profile: envelope.profile,
      migratedFrom: migration.migratedFrom,
    };
  }

  async getDiagnostics(): Promise<StorageDiagnostics> {
    const [data, queue] = await Promise.all([
      this.getUserData().catch(() => null),
      this.getPendingMutations().catch(() => []),
    ]);
    return {
      dbVersion: DB_VERSION,
      schemaVersion: data?.schemaVersion ?? CURRENT_USER_SCHEMA_VERSION,
      pendingMutations: queue.filter((m) => m.status !== 'failed').length,
      failedMutations: queue.filter((m) => m.status === 'failed').length,
      hasLocalProfile: data !== null,
      platformTarget: getPlatform().getCapabilities().target,
    };
  }
}

export const offlineStorage = new OfflineStorageService();
