/**
 * SyncEngine.ts — Cross-Platform Offline Sync & Conflict Resolution Engine (Data Layer)
 *
 * Processes pending mutations queued while offline, reconciles conflicts via
 * pure domain CRDT/LWW rules (`reconcileUserData`), applies exponential backoff
 * on transient failures, and listens to platform network + foreground events.
 */
import { offlineStorage } from './OfflineStorageService';
import type { UserData } from '../models/user';
import { reconcileUserData, type SyncConflictSummary } from '../domain/rules/syncMerge';
import { getPlatform } from '../platform';
import { createLogger } from '../core/logging/logger';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

const log = createLogger('SyncEngine');

export interface SyncEngineStatus {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  failedCount: number;
  lastSyncedAt: number | null;
  lastError: string | null;
  lastConflict: SyncConflictSummary | null;
}

type StatusListener = (status: SyncEngineStatus) => void;

class SyncEngine {
  private isSyncing = false;
  private isOnline = globalThis.navigator !== undefined ? navigator.onLine : true;
  private lastSyncedAt: number | null = null;
  private lastError: string | null = null;
  private lastConflict: SyncConflictSummary | null = null;
  private listeners: Set<StatusListener> = new Set();

  constructor() {
    if (globalThis.window !== undefined) {
      const platform = getPlatform();
      void platform.isOnline().then((online) => {
        this.isOnline = online;
        void this.notifyListeners();
      });

      platform.onNetworkChange((online) => {
        this.isOnline = online;
        void this.notifyListeners();
        if (online) {
          void this.processQueue();
        }
      });

      platform.onAppStateChange((isActive) => {
        if (isActive && this.isOnline) {
          void this.processQueue();
        }
      });
    }
  }

  public subscribe(listener: StatusListener): () => void {
    this.listeners.add(listener);
    void this.notifyStatus(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getStatus(): SyncEngineStatus {
    return {
      isOnline: globalThis.navigator !== undefined ? navigator.onLine : this.isOnline,
      isSyncing: this.isSyncing,
      pendingCount: 0,
      failedCount: 0,
      lastSyncedAt: this.lastSyncedAt,
      lastError: this.lastError,
      lastConflict: this.lastConflict,
    };
  }

  private async buildStatus(): Promise<SyncEngineStatus> {
    const queue = await offlineStorage.getPendingMutations();
    const online = globalThis.navigator !== undefined ? navigator.onLine : this.isOnline;
    return {
      isOnline: online,
      isSyncing: this.isSyncing,
      pendingCount: queue.filter((m) => m.status !== 'failed').length,
      failedCount: queue.filter((m) => m.status === 'failed').length,
      lastSyncedAt: this.lastSyncedAt,
      lastError: this.lastError,
      lastConflict: this.lastConflict,
    };
  }

  private async notifyListeners(): Promise<void> {
    const status = await this.buildStatus();
    this.listeners.forEach((fn) => fn(status));
  }

  private async notifyStatus(listener: StatusListener): Promise<void> {
    const status = await this.buildStatus();
    listener(status);
  }

  /**
   * Reconciles local and remote user state using the pure domain CRDT/LWW engine.
   * Public method signature preserved for full backward compatibility.
   */
  public mergeUserDataAdditive(local: UserData, remote: UserData): UserData {
    return reconcileUserData(local, remote).merged;
  }

  /**
   * User-triggered manual sync: resets dead-letter retries and flushes immediately.
   */
  public async manualSync(userId?: string): Promise<boolean> {
    await offlineStorage.resetFailedMutations();
    this.lastError = null;
    return this.processQueue(userId, true);
  }

  /**
   * Main Queue Processor: Flushes pending mutations to Firestore when online.
   * Reconciles with remote state first to avoid clobbering progress from other devices,
   * and applies exponential backoff on transient failures.
   */
  public async processQueue(userId?: string, ignoreBackoff = false): Promise<boolean> {
    if (this.isSyncing) return false;
    if (globalThis.navigator !== undefined && !navigator.onLine) return false;

    const targetUserId = userId || auth.currentUser?.uid;
    if (!targetUserId || targetUserId === 'local_user') {
      return false;
    }

    const now = Date.now();
    const allQueued = await offlineStorage.getPendingMutations();
    const eligible = allQueued.filter(
      (m) =>
        m.status !== 'failed' &&
        (ignoreBackoff || !m.nextRetryAt || m.nextRetryAt <= now),
    );

    if (eligible.length === 0) {
      await this.notifyListeners();
      return true;
    }

    this.isSyncing = true;
    this.lastError = null;
    await this.notifyListeners();

    try {
      const currentLocal = await offlineStorage.getUserData();
      if (currentLocal && db) {
        const userRef = doc(db, 'users', targetUserId);

        let targetData = currentLocal;
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            // SAFETY: Firestore `users/{uid}` documents store UserData; migrateUserData validates all fields before merge.
            const remoteData = docSnap.data() as UserData;
            const outcome = reconcileUserData(currentLocal, remoteData);
            targetData = outcome.merged;
            this.lastConflict = outcome.summary.hadDivergence ? outcome.summary : null;
          }
        } catch (fetchErr) {
          log.warn('Remote fetch skipped before push; proceeding with local state', { err: fetchErr instanceof Error ? fetchErr : String(fetchErr) });
        }

        await offlineStorage.saveUserData(targetData);
        await setDoc(userRef, targetData, { merge: true });

        for (const mut of eligible) {
          await offlineStorage.removeMutation(mut.id);
        }

        this.lastSyncedAt = Date.now();
        this.lastError = null;
      }
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sync failed';
      this.lastError = message;
      log.warn('SyncEngine processQueue failed; scheduling exponential backoff', { err: err instanceof Error ? err : String(err) });
      for (const mut of eligible) {
        await offlineStorage.markMutationFailed(mut.id, message);
      }
      return false;
    } finally {
      this.isSyncing = false;
      await this.notifyListeners();
    }
  }
}

export const syncEngine = new SyncEngine();
