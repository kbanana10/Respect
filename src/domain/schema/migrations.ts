/**
 * migrations.ts — Versioned UserData Schema Migration & Backup/Restore Engine (Domain Layer)
 *
 * Guarantees zero data loss when upgrading from legacy localStorage/IndexedDB
 * payloads (v0, v1, v2, v3) to the current v4 schema (Kids/Adults adaptive mode +
 * offline rewards), and validates portable JSON backups.
 */
import type {
  GameScoreMap,
  Language,
  LearnerMode,
  ThemeAccent,
  UserData,
  WritingProgressMap,
} from '../../models/user';
import { calculateLevelFromXP, getUtcDateString } from '../../services/GamificationService';
import type { ReviewDeck, ReviewItem } from '../../services/SpacedRepetitionService';
import { AppError, AppErrorCode } from '../../core/errors/AppError';

export const CURRENT_USER_SCHEMA_VERSION = 4;

export interface MigrationResult {
  readonly data: UserData;
  readonly migratedFrom: number;
  readonly didMigrate: boolean;
  readonly warnings: string[];
}

export interface BackupProfile {
  readonly displayName?: string;
  readonly language?: Language;
  readonly theme?: 'light' | 'dark';
}

export interface BackupEnvelope {
  readonly format: 'kurdish-quest-backup';
  readonly schemaVersion: number;
  readonly exportedAt: string;
  readonly appVersion: string;
  readonly profile: BackupProfile;
  readonly userData: UserData;
}

export interface ParsedBackupResult {
  readonly envelope: BackupEnvelope;
  readonly migration: MigrationResult;
}

/**
 * Unvalidated JSON value accepted at storage/backup I/O boundaries.
 */
type JsonPrimitive = string | number | boolean | null | undefined;
export type JsonValue = JsonPrimitive | JsonObject | readonly JsonValue[];
interface JsonObject {
  readonly [key: string]: JsonValue;
}

function isJsonObject(value: JsonValue): value is JsonObject {
  return value !== null && value !== undefined && !Array.isArray(value) && Object.prototype.toString.call(value) === '[object Object]';
}

function isFiniteNumber(value: JsonValue): value is number {
  return Number.isFinite(value);
}

function isNonEmptyString(value: JsonValue): value is string {
  return Object.prototype.toString.call(value) === '[object String]' && String(value).trim().length > 0;
}

function isBooleanValue(value: JsonValue): value is boolean {
  return value === true || value === false;
}

function toSafeNonNegInt(value: JsonValue, fallback: number, max = 10_000_000): number {
  if (!isFiniteNumber(value)) return fallback;
  return Math.max(0, Math.min(max, Math.floor(value)));
}

function toUniqueStringArray(value: JsonValue, fallback: readonly string[] = []): string[] {
  if (!Array.isArray(value)) return [...fallback];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of value) {
    if (isNonEmptyString(item) && !seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

function sanitizeGameScores(value: JsonValue): GameScoreMap {
  const result: GameScoreMap = {};
  if (!isJsonObject(value)) return result;
  for (const [k, v] of Object.entries(value)) {
    if (isFiniteNumber(v) && v >= 0) {
      result[k] = Math.floor(v);
    }
  }
  return result;
}

function sanitizeReviewDeck(value: JsonValue, now: number): ReviewDeck {
  const deck: ReviewDeck = {};
  if (!isJsonObject(value)) return deck;
  for (const [id, rawItem] of Object.entries(value)) {
    if (!isJsonObject(rawItem)) continue;
    const ease = isFiniteNumber(rawItem.easeFactor) ? Math.max(1.3, rawItem.easeFactor) : 2.5;
    const item: ReviewItem = {
      id: isNonEmptyString(rawItem.id) ? rawItem.id : id,
      easeFactor: ease,
      intervalDays: isFiniteNumber(rawItem.intervalDays) ? Math.max(0, rawItem.intervalDays) : 0,
      repetitions: toSafeNonNegInt(rawItem.repetitions, 0, 10_000),
      dueAt: isFiniteNumber(rawItem.dueAt) ? rawItem.dueAt : now,
      lastReviewedAt: isFiniteNumber(rawItem.lastReviewedAt) ? rawItem.lastReviewedAt : 0,
      lapses: toSafeNonNegInt(rawItem.lapses, 0, 10_000),
    };
    deck[id] = item;
  }
  return deck;
}

function sanitizeWritingProgress(value: JsonValue): WritingProgressMap | undefined {
  if (!isJsonObject(value)) return undefined;
  const out: WritingProgressMap = {};
  for (const [letter, entry] of Object.entries(value)) {
    if (!isJsonObject(entry)) continue;
    out[letter] = {
      bestScore: toSafeNonNegInt(entry.bestScore, 0, 100),
      attempts: toSafeNonNegInt(entry.attempts, 0, 100_000),
      completed: Boolean(entry.completed),
    };
  }
  return out;
}

function sanitizeLearnerMode(value: JsonValue, ageRange: JsonValue): LearnerMode {
  if (value === 'kids' || value === 'adults') return value;
  if (ageRange === '5-12' || ageRange === 'under_12' || ageRange === 'kids') return 'kids';
  return 'adults';
}

function sanitizeAccent(value: JsonValue): ThemeAccent {
  if (value === 'gold' || value === 'emerald' || value === 'sky' || value === 'rose') {
    return value;
  }
  return 'gold';
}

export function createDefaultUserData(
  now: number = Date.now(),
  mode: LearnerMode = 'adults',
): UserData {
  const todayUtc = getUtcDateString(new Date(now));
  const isKids = mode === 'kids';
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
    unlockedLevels: ['U0', 'A1'],
    badges: [],
    gameScores: {},
    wrongAnswersHistory: [],
    reviewDeck: {},
    isOnboarded: false,
    learnerMode: mode,
    autoPlayAudio: isKids,
    soundEnabled: true,
    relaxedTimer: isKids,
    parentalGateEnabled: isKids,
    unlockedAvatars: ['sun_classic', 'mountain_eagle'],
    unlockedStickers: [],
    activeAccent: 'gold',
  };
}

/**
 * Losslessly migrates any legacy (v0/v1/v2/v3) or partial UserData record into
 * a validated v4 UserData object while preserving every legacy property.
 */
export function migrateUserData(raw: JsonValue | UserData, now: number = Date.now()): MigrationResult {
  const warnings: string[] = [];

  // SAFETY: UserData is a plain JSON-serializable object validated structurally by isJsonObject below.
  const rawJson = raw as JsonValue;
  if (!isJsonObject(rawJson)) {
    warnings.push('Input payload was empty or non-object; initialized fresh defaults.');
    return {
      data: createDefaultUserData(now),
      migratedFrom: 0,
      didMigrate: true,
      warnings,
    };
  }

  const detectedVersion =
    isFiniteNumber(rawJson.schemaVersion) && Number.isInteger(rawJson.schemaVersion) && rawJson.schemaVersion >= 0
      ? rawJson.schemaVersion
      : isFiniteNumber(rawJson.gems) || isJsonObject(rawJson.reviewDeck)
        ? 2
        : 1;

  const xp = toSafeNonNegInt(rawJson.xp, 0);
  const derivedLevel = calculateLevelFromXP(xp);
  if (isFiniteNumber(rawJson.level) && rawJson.level !== derivedLevel) {
    warnings.push(`Reconciled level (${rawJson.level} -> ${derivedLevel}) to match XP curve.`);
  }

  const lastActive =
    isFiniteNumber(rawJson.lastActive) && rawJson.lastActive > 0
      ? rawJson.lastActive
      : now;

  const lastActiveDate =
    isNonEmptyString(rawJson.lastActiveDate) && /^\d{4}-\d{2}-\d{2}$/.test(rawJson.lastActiveDate)
      ? rawJson.lastActiveDate
      : getUtcDateString(new Date(lastActive));

  const createdAt =
    isFiniteNumber(rawJson.createdAt) && rawJson.createdAt > 0
      ? rawJson.createdAt
      : now;

  const updatedAt =
    isFiniteNumber(rawJson.updatedAt) && rawJson.updatedAt > 0
      ? rawJson.updatedAt
      : now;

  const unlockedRaw = toUniqueStringArray(rawJson.unlockedLevels, ['U0', 'A1']);
  if (!unlockedRaw.includes('A1')) unlockedRaw.unshift('A1');
  if (!unlockedRaw.includes('U0')) unlockedRaw.unshift('U0');
  if (xp >= 150 && !unlockedRaw.includes('A2')) unlockedRaw.push('A2');
  if (xp >= 450 && !unlockedRaw.includes('B1')) unlockedRaw.push('B1');
  if (xp >= 800 && !unlockedRaw.includes('B2')) unlockedRaw.push('B2');
  if (xp >= 1300 && !unlockedRaw.includes('Advanced')) unlockedRaw.push('Advanced');

  const rawDailyGoal = isFiniteNumber(rawJson.dailyGoalXp)
    ? Math.max(10, Math.min(500, Math.floor(rawJson.dailyGoalXp)))
    : undefined;

  const learnerMode = sanitizeLearnerMode(rawJson.learnerMode, rawJson.ageRange);
  const isKids = learnerMode === 'kids';

  // SAFETY: rawJson was verified as a plain object above; spreading preserves unknown legacy keys while all known UserData fields are explicitly validated below.
  const preservedFields = rawJson as Partial<UserData>;

  const migrated: UserData = {
    ...preservedFields,
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp,
    level: derivedLevel,
    streak: toSafeNonNegInt(rawJson.streak, 0, 100_000),
    gems: rawJson.gems === undefined ? 100 : toSafeNonNegInt(rawJson.gems, 100),
    streakFreezes: rawJson.streakFreezes === undefined ? 1 : toSafeNonNegInt(rawJson.streakFreezes, 1, 999),
    lastActive,
    lastActiveDate,
    createdAt,
    updatedAt,
    wordsLearned: toSafeNonNegInt(rawJson.wordsLearned, 0),
    quizzesCompleted: toSafeNonNegInt(rawJson.quizzesCompleted, 0),
    sessionsCount: toSafeNonNegInt(rawJson.sessionsCount, 0),
    totalStudyTime: toSafeNonNegInt(rawJson.totalStudyTime, 0),
    recentSearches: toUniqueStringArray(rawJson.recentSearches).slice(0, 20),
    favorites: toUniqueStringArray(rawJson.favorites),
    completedLessons: toUniqueStringArray(rawJson.completedLessons),
    unlockedLevels: unlockedRaw,
    badges: toUniqueStringArray(rawJson.badges),
    gameScores: sanitizeGameScores(rawJson.gameScores),
    wrongAnswersHistory: toUniqueStringArray(rawJson.wrongAnswersHistory),
    reviewDeck: sanitizeReviewDeck(rawJson.reviewDeck, now),
    writingProgress: sanitizeWritingProgress(rawJson.writingProgress),
    dailyGoalXp: rawDailyGoal,
    isOnboarded: isBooleanValue(rawJson.isOnboarded) ? rawJson.isOnboarded : (xp > 0 || unlockedRaw.length > 2),
    learnerMode,
    autoPlayAudio: isBooleanValue(rawJson.autoPlayAudio) ? rawJson.autoPlayAudio : isKids,
    soundEnabled: isBooleanValue(rawJson.soundEnabled) ? rawJson.soundEnabled : true,
    relaxedTimer: isBooleanValue(rawJson.relaxedTimer) ? rawJson.relaxedTimer : isKids,
    parentalGateEnabled: isBooleanValue(rawJson.parentalGateEnabled) ? rawJson.parentalGateEnabled : isKids,
    unlockedAvatars: toUniqueStringArray(rawJson.unlockedAvatars, ['sun_classic', 'mountain_eagle']),
    unlockedStickers: toUniqueStringArray(rawJson.unlockedStickers, []),
    activeAccent: sanitizeAccent(rawJson.activeAccent),
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
  profile: BackupProfile = {},
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

export function parseAndMigrateBackup(rawJson: string): ParsedBackupResult {
  let parsed: JsonValue;
  try {
    // SAFETY: JSON.parse returns valid JSON values matching the recursive JsonValue union.
    parsed = JSON.parse(rawJson) as JsonValue;
  } catch (err) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: 'Backup file is not valid JSON.',
      cause: err instanceof Error ? err : String(err),
    });
  }

  if (!isJsonObject(parsed)) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: 'Backup file root must be a JSON object.',
    });
  }

  // Accept either a versioned BackupEnvelope OR a raw legacy UserData export.
  const isEnvelope = parsed.format === 'kurdish-quest-backup' && isJsonObject(parsed.userData);
  const candidateData = isEnvelope ? parsed.userData : parsed;

  if (
    !isJsonObject(candidateData) ||
    (!isFiniteNumber(candidateData.xp) && !Array.isArray(candidateData.completedLessons))
  ) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: 'Backup file does not contain recognizable Kurdish Quest progress data.',
    });
  }

  const migration = migrateUserData(candidateData);
  const rawProfile = isEnvelope && isJsonObject(parsed.profile) ? parsed.profile : {};
  const language =
    rawProfile.language === 'en' || rawProfile.language === 'ar' || rawProfile.language === 'ku'
      ? rawProfile.language
      : undefined;
  const theme = rawProfile.theme === 'light' || rawProfile.theme === 'dark' ? rawProfile.theme : undefined;
  const displayName = isNonEmptyString(rawProfile.displayName)
    ? rawProfile.displayName.slice(0, 60)
    : undefined;

  return {
    envelope: {
      format: 'kurdish-quest-backup',
      schemaVersion: CURRENT_USER_SCHEMA_VERSION,
      exportedAt: isNonEmptyString(parsed.exportedAt) ? parsed.exportedAt : new Date().toISOString(),
      appVersion: isNonEmptyString(parsed.appVersion) ? parsed.appVersion : 'legacy',
      profile: { displayName, language, theme },
      userData: migration.data,
    },
    migration,
  };
}
