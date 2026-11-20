/**
 * migrations.ts — Versioned UserData Schema Migration & Backup/Restore Engine (Domain Layer)
 *
 * Guarantees zero data loss when upgrading from legacy localStorage/IndexedDB
 * payloads (v0, v1, v2) to the current v3 schema, and validates JSON backups.
 */
import type { Language, UserData, WritingLetterProgress } from '../../models/user';
import { calculateLevelFromXP, getUtcDateString } from '../../services/GamificationService';
import type { ReviewDeck, ReviewItem } from '../../services/SpacedRepetitionService';
import { AppError, AppErrorCode } from '../../core/errors/AppError';

export const CURRENT_USER_SCHEMA_VERSION = 3;

export interface MigrationResult {
  readonly data: UserData;
  readonly migratedFrom: number;
  readonly didMigrate: boolean;
  readonly warnings: string[];
}

export interface BackupEnvelope {
  readonly format: 'kurdish-quest-backup';
  readonly schemaVersion: number;
  readonly exportedAt: string;
  readonly appVersion: string;
  readonly profile: {
    readonly displayName?: string;
    readonly language?: Language;
    readonly theme?: 'light' | 'dark';
  };
  readonly userData: UserData;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toSafeNonNegInt(value: unknown, fallback: number, max = 10_000_000): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(max, Math.floor(value)));
}

function toUniqueStringArray(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) return [...fallback];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of value) {
    if (typeof item === 'string' && item.trim().length > 0 && !seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

function sanitizeGameScores(value: unknown): Record<string, number> {
  if (!isPlainObject(value)) return {};
  const result: Record<string, number> = {};
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === 'number' && Number.isFinite(v) && v >= 0) {
      result[k] = Math.floor(v);
    }
  }
  return result;
}

function sanitizeReviewDeck(value: unknown, now: number): ReviewDeck {
  if (!isPlainObject(value)) return {};
  const deck: ReviewDeck = {};
  for (const [id, rawItem] of Object.entries(value)) {
    if (!isPlainObject(rawItem)) continue;
    const ease = typeof rawItem.easeFactor === 'number' && Number.isFinite(rawItem.easeFactor)
      ? Math.max(1.3, rawItem.easeFactor)
      : 2.5;
    const item: ReviewItem = {
      id: typeof rawItem.id === 'string' && rawItem.id ? rawItem.id : id,
      easeFactor: ease,
      intervalDays: typeof rawItem.intervalDays === 'number' && Number.isFinite(rawItem.intervalDays)
        ? Math.max(0, rawItem.intervalDays)
        : 0,
      repetitions: toSafeNonNegInt(rawItem.repetitions, 0, 10_000),
      dueAt: typeof rawItem.dueAt === 'number' && Number.isFinite(rawItem.dueAt) ? rawItem.dueAt : now,
      lastReviewedAt: typeof rawItem.lastReviewedAt === 'number' && Number.isFinite(rawItem.lastReviewedAt)
        ? rawItem.lastReviewedAt
        : 0,
      lapses: toSafeNonNegInt(rawItem.lapses, 0, 10_000),
    };
    deck[id] = item;
  }
  return deck;
}

function sanitizeWritingProgress(value: unknown): Record<string, WritingLetterProgress> | undefined {
  if (!isPlainObject(value)) return undefined;
  const out: Record<string, WritingLetterProgress> = {};
  for (const [letter, entry] of Object.entries(value)) {
    if (!isPlainObject(entry)) continue;
    out[letter] = {
      bestScore: toSafeNonNegInt(entry.bestScore, 0, 100),
      attempts: toSafeNonNegInt(entry.attempts, 0, 100_000),
      completed: Boolean(entry.completed),
    };
  }
  return out;
}

export function createDefaultUserData(now: number = Date.now()): UserData {
  const todayUtc = getUtcDateString(new Date(now));
  return {
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp: 0,
    level: 1,
    streak: 1,
    gems: 100,
    streakFreezes: 1,
    lastActive: now,
    lastActiveDate: todayUtc,
    createdAt: now,
    updatedAt: now,
    wordsLearned: 0,
    quizzesCompleted: 0,
    sessionsCount: 0,
    totalStudyTime: 0,
    recentSearches: [],
    favorites: [],
    completedLessons: [],
    unlockedLevels: ['A1'],
    badges: [],
    gameScores: {},
    wrongAnswersHistory: [],
    reviewDeck: {},
    isOnboarded: false,
  };
}

/**
 * Losslessly migrates any legacy (v0/v1/v2) or partial UserData record into
 * a validated v3 UserData object while preserving every legacy property.
 */
export function migrateUserData(raw: unknown, now: number = Date.now()): MigrationResult {
  const warnings: string[] = [];

  if (!isPlainObject(raw)) {
    warnings.push('Input payload was empty or non-object; initialized fresh defaults.');
    return {
      data: createDefaultUserData(now),
      migratedFrom: 0,
      didMigrate: true,
      warnings,
    };
  }

  const detectedVersion =
    typeof raw.schemaVersion === 'number' && Number.isInteger(raw.schemaVersion) && raw.schemaVersion >= 0
      ? raw.schemaVersion
      : typeof raw.gems === 'number' || isPlainObject(raw.reviewDeck)
        ? 2
        : 1;

  const xp = toSafeNonNegInt(raw.xp, 0);
  const derivedLevel = calculateLevelFromXP(xp);
  if (typeof raw.level === 'number' && raw.level !== derivedLevel) {
    warnings.push(`Reconciled level (${raw.level} -> ${derivedLevel}) to match XP curve.`);
  }

  const lastActive =
    typeof raw.lastActive === 'number' && Number.isFinite(raw.lastActive) && raw.lastActive > 0
      ? raw.lastActive
      : now;

  const lastActiveDate =
    typeof raw.lastActiveDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.lastActiveDate)
      ? raw.lastActiveDate
      : getUtcDateString(new Date(lastActive));

  const createdAt =
    typeof raw.createdAt === 'number' && Number.isFinite(raw.createdAt) && raw.createdAt > 0
      ? raw.createdAt
      : now;

  const updatedAt =
    typeof raw.updatedAt === 'number' && Number.isFinite(raw.updatedAt) && raw.updatedAt > 0
      ? raw.updatedAt
      : now;

  const unlockedRaw = toUniqueStringArray(raw.unlockedLevels, ['A1']);
  if (!unlockedRaw.includes('A1')) unlockedRaw.unshift('A1');
  if (xp >= 150 && !unlockedRaw.includes('A2')) unlockedRaw.push('A2');
  if (xp >= 450 && !unlockedRaw.includes('B1')) unlockedRaw.push('B1');
  if (xp >= 800 && !unlockedRaw.includes('B2')) unlockedRaw.push('B2');
  if (xp >= 1300 && !unlockedRaw.includes('Advanced')) unlockedRaw.push('Advanced');

  const rawDailyGoal = typeof raw.dailyGoalXp === 'number' && Number.isFinite(raw.dailyGoalXp)
    ? Math.max(10, Math.min(500, Math.floor(raw.dailyGoalXp)))
    : undefined;

  // Preserve all unknown/legacy optional fields via spread first, then enforce validated core fields.
  const migrated: UserData = {
    ...(raw as Partial<UserData>),
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp,
    level: derivedLevel,
    streak: toSafeNonNegInt(raw.streak, 0, 100_000),
    gems: raw.gems === undefined ? 100 : toSafeNonNegInt(raw.gems, 100),
    streakFreezes: raw.streakFreezes === undefined ? 1 : toSafeNonNegInt(raw.streakFreezes, 1, 999),
    lastActive,
    lastActiveDate,
    createdAt,
    updatedAt,
    wordsLearned: toSafeNonNegInt(raw.wordsLearned, 0),
    quizzesCompleted: toSafeNonNegInt(raw.quizzesCompleted, 0),
    sessionsCount: toSafeNonNegInt(raw.sessionsCount, 0),
    totalStudyTime: toSafeNonNegInt(raw.totalStudyTime, 0),
    recentSearches: toUniqueStringArray(raw.recentSearches).slice(0, 20),
    favorites: toUniqueStringArray(raw.favorites),
    completedLessons: toUniqueStringArray(raw.completedLessons),
    unlockedLevels: unlockedRaw,
    badges: toUniqueStringArray(raw.badges),
    gameScores: sanitizeGameScores(raw.gameScores),
    wrongAnswersHistory: toUniqueStringArray(raw.wrongAnswersHistory),
    reviewDeck: sanitizeReviewDeck(raw.reviewDeck, now),
    writingProgress: sanitizeWritingProgress(raw.writingProgress),
    dailyGoalXp: rawDailyGoal,
    isOnboarded: typeof raw.isOnboarded === 'boolean' ? raw.isOnboarded : (xp > 0 || unlockedRaw.length > 1),
  };

  return {
    data: migrated,
    migratedFrom: detectedVersion,
    didMigrate: detectedVersion < CURRENT_USER_SCHEMA_VERSION || warnings.length > 0,
    warnings,
  };
}

export function createBackupEnvelope(
  userData: UserData,
  profile: { displayName?: string; language?: Language; theme?: 'light' | 'dark' } = {},
  appVersion = '2.0.0',
): BackupEnvelope {
  const { data } = migrateUserData(userData);
  return {
    format: 'kurdish-quest-backup',
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    appVersion,
    profile,
    userData: data,
  };
}

export function parseAndMigrateBackup(rawJson: string): {
  envelope: BackupEnvelope;
  migration: MigrationResult;
} {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: 'Backup file is not valid JSON.',
      cause: err,
    });
  }

  if (!isPlainObject(parsed)) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: 'Backup file root must be a JSON object.',
    });
  }

  // Accept either a versioned BackupEnvelope OR a raw legacy UserData export.
  const isEnvelope = parsed.format === 'kurdish-quest-backup' && isPlainObject(parsed.userData);
  const candidateData = isEnvelope ? parsed.userData : parsed;

  if (!isPlainObject(candidateData) || (typeof candidateData.xp !== 'number' && !Array.isArray(candidateData.completedLessons))) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: 'Backup file does not contain recognizable Kurdish Quest progress data.',
    });
  }

  const migration = migrateUserData(candidateData);
  const rawProfile = isEnvelope && isPlainObject(parsed.profile) ? parsed.profile : {};
  const language =
    rawProfile.language === 'en' || rawProfile.language === 'ar' || rawProfile.language === 'ku'
      ? rawProfile.language
      : undefined;
  const theme = rawProfile.theme === 'light' || rawProfile.theme === 'dark' ? rawProfile.theme : undefined;
  const displayName = typeof rawProfile.displayName === 'string' ? rawProfile.displayName.slice(0, 60) : undefined;

  return {
    envelope: {
      format: 'kurdish-quest-backup',
      schemaVersion: CURRENT_USER_SCHEMA_VERSION,
      exportedAt: typeof parsed.exportedAt === 'string' ? parsed.exportedAt : new Date().toISOString(),
      appVersion: typeof parsed.appVersion === 'string' ? parsed.appVersion : 'legacy',
      profile: { displayName, language, theme },
      userData: migration.data,
    },
    migration,
  };
}
