import { describe, it, expect, beforeEach } from 'vitest';
import { offlineStorage } from '../src/services/OfflineStorageService';
import { CURRENT_USER_SCHEMA_VERSION, createDefaultUserData } from '../src/domain/schema/migrations';

describe('OfflineStorageService v2 — Migrations, Coalescing Queue, Backoff & Backup', () => {
  beforeEach(async () => {
    localStorage.clear();
    await offlineStorage.clearSyncQueue();
  });

  it('migrates legacy v1 localStorage payload seamlessly without data loss', async () => {
    // Clear current IDB record by saving nothing and seeding legacy localStorage key
    const legacyV1 = {
      xp: 350,
      level: 1,
      streak: 4,
      wordsLearned: 29,
      completedLessons: ['a1_greetings', 'a1_numbers'],
      favorites: ['w_av'],
    };
    localStorage.setItem('kurdish_quest_data', JSON.stringify(legacyV1));

    // Fresh DB read when IDB has no current_user or after resetting key
    // Directly test restoreBackupJson + saveUserData + getUserData roundtrip
    const restored = await offlineStorage.restoreBackupJson(JSON.stringify(legacyV1));
    expect(restored.userData.schemaVersion).toBe(CURRENT_USER_SCHEMA_VERSION);
    expect(restored.userData.xp).toBe(350);
    expect(restored.userData.unlockedLevels).toContain('A2');
    expect(restored.userData.completedLessons).toEqual(['a1_greetings', 'a1_numbers']);

    const loaded = await offlineStorage.getUserData();
    expect(loaded).not.toBeNull();
    expect(loaded?.xp).toBe(350);
    expect(loaded?.favorites).toEqual(['w_av']);
  });

  it('coalesces consecutive pending UPDATE_PROGRESS mutations for the same user', async () => {
    await offlineStorage.enqueueMutation({
      userId: 'user_1',
      type: 'UPDATE_PROGRESS',
      payload: { xpToAdd: 20, wordsToAdd: 4, gemsToAdd: 5 },
    });
    await offlineStorage.enqueueMutation({
      userId: 'user_1',
      type: 'UPDATE_PROGRESS',
      payload: { xpToAdd: 30, wordsToAdd: 6, gemsToAdd: 10, quizCompleted: true },
    });

    const pending = await offlineStorage.getPendingMutations();
    expect(pending).toHaveLength(1);
    expect(pending[0].payload.xpToAdd).toBe(50);
    expect(pending[0].payload.wordsToAdd).toBe(10);
    expect(pending[0].payload.gemsToAdd).toBe(15);
    expect(pending[0].payload.quizCompleted).toBe(true);
  });

  it('applies exponential backoff and dead-letters after 5 failures, then recovers on reset', async () => {
    const mut = await offlineStorage.enqueueMutation({
      userId: 'user_backoff',
      type: 'COMPLETE_LESSON',
      payload: { data: { completedLessons: ['a1_family'] } },
      idempotencyKey: 'lesson_a1_family',
    });

    // Duplicate idempotency key must not create a second entry
    const dup = await offlineStorage.enqueueMutation({
      userId: 'user_backoff',
      type: 'COMPLETE_LESSON',
      payload: { data: { completedLessons: ['a1_family'] } },
      idempotencyKey: 'lesson_a1_family',
    });
    expect(dup.id).toBe(mut.id);

    const baseNow = 1730000000000;
    await offlineStorage.markMutationFailed(mut.id, 'Network timeout', baseNow);
    let queue = await offlineStorage.getPendingMutations();
    expect(queue[0].retryCount).toBe(1);
    expect(queue[0].status).toBe('pending');
    expect(queue[0].nextRetryAt).toBe(baseNow + 2000);

    for (let i = 2; i <= 5; i++) {
      await offlineStorage.markMutationFailed(mut.id, 'Still offline', baseNow + i * 10_000);
    }
    queue = await offlineStorage.getPendingMutations();
    expect(queue[0].retryCount).toBe(5);
    expect(queue[0].status).toBe('failed');

    await offlineStorage.resetFailedMutations();
    queue = await offlineStorage.getPendingMutations();
    expect(queue[0].status).toBe('pending');
    expect(queue[0].retryCount).toBe(0);
    expect(queue[0].lastError).toBeUndefined();
  });

  it('exports and restores a complete portable JSON backup and reports diagnostics', async () => {
    const user = createDefaultUserData();
    user.xp = 640;
    user.gems = 180;
    user.completedLessons = ['a1_greetings', 'a2_home'];
    await offlineStorage.saveUserData(user);

    const json = await offlineStorage.exportBackupJson({
      displayName: 'Diyar',
      language: 'ar',
      theme: 'dark',
    });

    const parsed = await offlineStorage.restoreBackupJson(json);
    expect(parsed.userData.xp).toBe(640);
    expect(parsed.userData.gems).toBe(180);
    expect(parsed.profile.language).toBe('ar');
    expect(parsed.profile.theme).toBe('dark');

    const diag = await offlineStorage.getDiagnostics();
    expect(diag.dbVersion).toBe(2);
    expect(diag.schemaVersion).toBe(CURRENT_USER_SCHEMA_VERSION);
    expect(diag.hasLocalProfile).toBe(true);
  });
});
