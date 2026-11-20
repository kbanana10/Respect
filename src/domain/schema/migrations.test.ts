import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CURRENT_USER_SCHEMA_VERSION,
  createBackupEnvelope,
  createDefaultUserData,
  migrateUserData,
  parseAndMigrateBackup,
} from './migrations.ts';
import { AppError, AppErrorCode } from '../../core/errors/AppError.ts';

describe('Domain Schema Migrations (v0/v1/v2 -> v3)', () => {
  it('initializes clean defaults for empty or non-object payloads', () => {
    const fixedNow = 1730000000000;
    const res = migrateUserData(null, fixedNow);
    assert.equal(res.didMigrate, true);
    assert.equal(res.migratedFrom, 0);
    assert.equal(res.data.schemaVersion, CURRENT_USER_SCHEMA_VERSION);
    assert.equal(res.data.xp, 0);
    assert.equal(res.data.level, 1);
    assert.equal(res.data.gems, 100);
    assert.deepEqual(res.data.unlockedLevels, ['A1']);
    assert.ok(res.warnings.length > 0);
  });

  it('losslessly migrates legacy v1 payload without dropping progress or custom fields', () => {
    const legacyV1 = {
      xp: 520,
      level: 1, // stale level — must reconcile to match XP curve
      streak: 5,
      wordsLearned: 42,
      quizzesCompleted: 7,
      completedLessons: ['a1_greetings', 'a1_greetings', 'a1_numbers'],
      favorites: ['w1', 'w2'],
      badges: ['first_steps'],
      writingProgress: {
        A: { bestScore: 95, attempts: 3, completed: true },
        Ç: { bestScore: 150, attempts: -2, completed: 1 }, // clamped safely
      },
      customLegacyNote: 'preserve-me',
    };

    const res = migrateUserData(legacyV1, 1730000000000);
    assert.equal(res.didMigrate, true);
    assert.equal(res.migratedFrom, 1);
    assert.equal(res.data.schemaVersion, CURRENT_USER_SCHEMA_VERSION);
    assert.equal(res.data.xp, 520);
    assert.ok(res.data.level > 1, 'Level should reconcile upwards to match 520 XP');
    assert.deepEqual(res.data.completedLessons, ['a1_greetings', 'a1_numbers']);
    assert.ok(res.data.unlockedLevels.includes('A2'));
    assert.ok(res.data.unlockedLevels.includes('B1'));
    assert.equal(res.data.gems, 100);
    assert.equal(res.data.streakFreezes, 1);
    assert.equal(res.data.writingProgress?.A.bestScore, 95);
    assert.equal(res.data.writingProgress?.Ç.bestScore, 100);
    assert.equal(res.data.writingProgress?.Ç.attempts, 0);
    assert.equal((res.data as unknown as Record<string, unknown>).customLegacyNote, 'preserve-me');
  });

  it('sanitizes malformed reviewDeck cards and clamps easeFactor >= 1.3', () => {
    const raw = {
      schemaVersion: 2,
      xp: 100,
      reviewDeck: {
        w_apple: {
          id: 'w_apple',
          easeFactor: 0.4,
          intervalDays: -5,
          repetitions: 3,
          dueAt: 1730000000000,
          lastReviewedAt: 1729900000000,
          lapses: 1,
        },
        bad_entry: 'corrupted',
      },
    };

    const res = migrateUserData(raw, 1730000000000);
    assert.equal(res.data.reviewDeck?.w_apple.easeFactor, 1.3);
    assert.equal(res.data.reviewDeck?.w_apple.intervalDays, 0);
    assert.equal(res.data.reviewDeck?.w_apple.repetitions, 3);
    assert.equal(res.data.reviewDeck?.bad_entry, undefined);
  });

  it('round-trips BackupEnvelope export and validated restore', () => {
    const base = createDefaultUserData(1730000000000);
    base.xp = 880;
    base.gems = 240;
    base.completedLessons = ['a1_greetings', 'a2_home'];
    base.badges = ['first_steps', 'dedicated_learner'];

    const envelope = createBackupEnvelope(base, {
      displayName: 'Zilan',
      language: 'ku',
      theme: 'dark',
    });

    const json = JSON.stringify(envelope);
    const parsed = parseAndMigrateBackup(json);

    assert.equal(parsed.envelope.format, 'kurdish-quest-backup');
    assert.equal(parsed.envelope.schemaVersion, CURRENT_USER_SCHEMA_VERSION);
    assert.equal(parsed.envelope.profile.displayName, 'Zilan');
    assert.equal(parsed.envelope.profile.language, 'ku');
    assert.equal(parsed.envelope.profile.theme, 'dark');
    assert.equal(parsed.envelope.userData.xp, 880);
    assert.equal(parsed.envelope.userData.gems, 240);
    assert.deepEqual(parsed.envelope.userData.completedLessons, ['a1_greetings', 'a2_home']);
    assert.ok(parsed.envelope.userData.unlockedLevels.includes('B2'));
  });

  it('accepts raw legacy UserData JSON backups without envelope wrapper', () => {
    const rawLegacy = JSON.stringify({
      xp: 310,
      completedLessons: ['a1_family'],
      favorites: ['nat_sun'],
    });

    const parsed = parseAndMigrateBackup(rawLegacy);
    assert.equal(parsed.envelope.userData.xp, 310);
    assert.deepEqual(parsed.envelope.userData.completedLessons, ['a1_family']);
    assert.deepEqual(parsed.envelope.userData.favorites, ['nat_sun']);
  });

  it('rejects malformed or unrecognizable JSON with AppError(BACKUP_INVALID)', () => {
    assert.throws(
      () => parseAndMigrateBackup('{not valid json'),
      (err: unknown) => err instanceof AppError && err.code === AppErrorCode.BACKUP_INVALID,
    );

    assert.throws(
      () => parseAndMigrateBackup(JSON.stringify({ hello: 'world' })),
      (err: unknown) => err instanceof AppError && err.code === AppErrorCode.BACKUP_INVALID,
    );
  });
});
