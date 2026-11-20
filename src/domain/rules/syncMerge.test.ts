import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultUserData } from '../schema/migrations.ts';
import { reconcileUserData } from './syncMerge.ts';

describe('Domain Sync Conflict Reconciliation (reconcileUserData)', () => {
  it('takes max of monotonic progress metrics and unions grow-only collections', () => {
    const t0 = 1730000000000;
    const local = {
      ...createDefaultUserData(t0),
      xp: 420,
      wordsLearned: 35,
      quizzesCompleted: 6,
      completedLessons: ['a1_greetings', 'a1_family'],
      badges: ['first_steps'],
      favorites: ['w_roj'],
      completedTours: ['dashboard'],
      gameScores: { memory: 120, zombie: 450 },
      writingProgress: {
        A: { bestScore: 88, attempts: 2, completed: true },
        B: { bestScore: 72, attempts: 1, completed: false },
      },
      updatedAt: t0 + 1000,
    };

    const remote = {
      ...createDefaultUserData(t0),
      xp: 600,
      wordsLearned: 28,
      quizzesCompleted: 9,
      completedLessons: ['a1_greetings', 'a1_numbers'],
      badges: ['first_steps', 'dedicated_learner'],
      favorites: ['w_av'],
      completedTours: ['roadmap'],
      gameScores: { memory: 180, sentence: 90 },
      writingProgress: {
        A: { bestScore: 96, attempts: 4, completed: true },
        C: { bestScore: 80, attempts: 1, completed: true },
      },
      updatedAt: t0 + 2000,
    };

    const { merged, summary } = reconcileUserData(local, remote, t0 + 3000);

    assert.equal(summary.hadDivergence, true);
    assert.equal(summary.winnerForLww, 'remote');
    assert.equal(merged.xp, 600);
    assert.equal(merged.wordsLearned, 35);
    assert.equal(merged.quizzesCompleted, 9);
    assert.deepEqual(
      [...merged.completedLessons].sort(),
      ['a1_family', 'a1_greetings', 'a1_numbers'],
    );
    assert.deepEqual([...merged.badges].sort(), ['dedicated_learner', 'first_steps']);
    assert.deepEqual([...merged.favorites].sort(), ['w_av', 'w_roj']);
    assert.deepEqual([...(merged.completedTours || [])].sort(), ['dashboard', 'roadmap']);
    assert.deepEqual(merged.gameScores, { memory: 180, sentence: 90, zombie: 450 });
    assert.equal(merged.writingProgress?.A.bestScore, 96);
    assert.equal(merged.writingProgress?.A.attempts, 4);
    assert.equal(merged.writingProgress?.B.bestScore, 72);
    assert.equal(merged.writingProgress?.C.completed, true);
  });

  it('uses Last-Write-Wins for spendable gems and streak freezes so spent items do not resurrect', () => {
    const t0 = 1730000000000;
    const localAfterPurchase = {
      ...createDefaultUserData(t0),
      gems: 40, // spent 60 gems in store locally
      streakFreezes: 2,
      updatedAt: t0 + 5000,
    };
    const staleRemote = {
      ...createDefaultUserData(t0),
      gems: 100,
      streakFreezes: 1,
      updatedAt: t0 + 1000,
    };

    const { merged, summary } = reconcileUserData(localAfterPurchase, staleRemote, t0 + 6000);
    assert.equal(summary.winnerForLww, 'local');
    assert.equal(merged.gems, 40);
    assert.equal(merged.streakFreezes, 2);
  });

  it('merges SM-2 reviewDeck per card by most recent lastReviewedAt', () => {
    const t0 = 1730000000000;
    const local = {
      ...createDefaultUserData(t0),
      reviewDeck: {
        card_a: { id: 'card_a', easeFactor: 2.6, intervalDays: 6, repetitions: 2, dueAt: t0 + 86400_000, lastReviewedAt: t0 + 5000, lapses: 0 },
        card_b: { id: 'card_b', easeFactor: 2.3, intervalDays: 1, repetitions: 1, dueAt: t0 + 1000, lastReviewedAt: t0 + 1000, lapses: 1 },
      },
    };
    const remote = {
      ...createDefaultUserData(t0),
      reviewDeck: {
        card_a: { id: 'card_a', easeFactor: 2.4, intervalDays: 1, repetitions: 1, dueAt: t0 + 1000, lastReviewedAt: t0 + 2000, lapses: 0 },
        card_b: { id: 'card_b', easeFactor: 2.5, intervalDays: 4, repetitions: 2, dueAt: t0 + 99999, lastReviewedAt: t0 + 8000, lapses: 0 },
        card_c: { id: 'card_c', easeFactor: 2.5, intervalDays: 1, repetitions: 1, dueAt: t0 + 5000, lastReviewedAt: t0 + 3000, lapses: 0 },
      },
    };

    const { merged } = reconcileUserData(local, remote, t0 + 9000);
    assert.equal(merged.reviewDeck?.card_a.repetitions, 2, 'Local newer review of card_a should win');
    assert.equal(merged.reviewDeck?.card_b.repetitions, 2, 'Remote newer review of card_b should win');
    assert.equal(merged.reviewDeck?.card_c.id, 'card_c', 'Remote-only card_c should be kept');
  });
});
