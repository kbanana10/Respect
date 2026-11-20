import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultUserData } from '../schema/migrations.ts';
import {
  applyProgressDelta,
  evaluateUnlockedBadges,
  evaluateUnlockedCefrLevels,
} from './progressEngine.ts';

describe('Domain Progress & Badge Engine', () => {
  it('accumulates XP, unlocks CEFR levels, and unlocks earned badges deterministically', () => {
    const day1 = Date.UTC(2026, 3, 15, 10, 0, 0);
    const start = createDefaultUserData(day1);

    const afterFirstQuiz = applyProgressDelta(
      start,
      { xpToAdd: 60, wordsToAdd: 12, quizCompleted: true, gemsToAdd: 15, source: 'quiz', perfect: true },
      day1,
    );

    assert.equal(afterFirstQuiz.xp, 60);
    assert.equal(afterFirstQuiz.xpToday, 60);
    assert.equal(afterFirstQuiz.xpTodayDate, '2026-04-15');
    assert.equal(afterFirstQuiz.wordsLearned, 12);
    assert.equal(afterFirstQuiz.quizzesCompleted, 1);
    assert.equal(afterFirstQuiz.gems, 115);
    assert.equal(afterFirstQuiz.missionsState?.counters.quizzes, 1);
    assert.equal(afterFirstQuiz.missionsState?.counters.perfect, 1);
    assert.ok(afterFirstQuiz.badges.includes('first_steps'));
    assert.ok(afterFirstQuiz.badges.includes('vocabulary_enthusiast'));

    const afterBigBoost = applyProgressDelta(
      afterFirstQuiz,
      { xpToAdd: 500, wordsToAdd: 40, quizCompleted: true, source: 'game' },
      day1 + 60_000,
    );

    assert.equal(afterBigBoost.xp, 560);
    assert.equal(afterBigBoost.xpToday, 560);
    assert.equal(afterBigBoost.missionsState?.counters.games, 1);
    assert.ok(afterBigBoost.unlockedLevels.includes('A2'));
    assert.ok(afterBigBoost.unlockedLevels.includes('B1'));
    assert.ok(afterBigBoost.badges.includes('dedicated_learner'));
    assert.ok(afterBigBoost.badges.includes('vocabulary_master'));
  });

  it('resets daily XP and mission counters cleanly across UTC midnight rollover', () => {
    const day1 = Date.UTC(2026, 3, 15, 23, 50, 0);
    const day2 = Date.UTC(2026, 3, 16, 0, 10, 0);

    const first = applyProgressDelta(
      createDefaultUserData(day1),
      { xpToAdd: 45, wordsToAdd: 5, quizCompleted: true, source: 'quiz' },
      day1,
    );
    assert.equal(first.xpToday, 45);
    assert.equal(first.missionsState?.counters.quizzes, 1);

    const nextDay = applyProgressDelta(
      first,
      { xpToAdd: 25, wordsToAdd: 3, quizCompleted: true, source: 'game' },
      day2,
    );
    assert.equal(nextDay.xp, 70);
    assert.equal(nextDay.xpToday, 25);
    assert.equal(nextDay.xpTodayDate, '2026-04-16');
    assert.equal(nextDay.missionsState?.counters.quizzes, 0);
    assert.equal(nextDay.missionsState?.counters.games, 1);
  });

  it('ignores negative or NaN deltas safely', () => {
    const now = Date.UTC(2026, 3, 15, 12, 0, 0);
    const start = createDefaultUserData(now);
    const next = applyProgressDelta(
      start,
      { xpToAdd: -999, wordsToAdd: Number.NaN, gemsToAdd: -50 },
      now,
    );

    assert.equal(next.xp, 0);
    assert.equal(next.wordsLearned, 0);
    assert.equal(next.gems, 100);
  });

  it('unlocks all CEFR thresholds correctly', () => {
    assert.deepEqual(evaluateUnlockedCefrLevels(0), ['A1']);
    assert.deepEqual(evaluateUnlockedCefrLevels(150), ['A1', 'A2']);
    assert.deepEqual(evaluateUnlockedCefrLevels(450), ['A1', 'A2', 'B1']);
    assert.deepEqual(evaluateUnlockedCefrLevels(800), ['A1', 'A2', 'B1', 'B2']);
    assert.deepEqual(evaluateUnlockedCefrLevels(1300), ['A1', 'A2', 'B1', 'B2', 'Advanced']);
  });

  it('evaluates streak and lesson badges accurately', () => {
    const user = createDefaultUserData();
    user.streak = 7;
    user.completedLessons = ['l1', 'l2', 'l3', 'l4', 'l5'];
    user.quizzesCompleted = 20;
    const badges = evaluateUnlockedBadges(user);
    assert.ok(badges.includes('streak_3'));
    assert.ok(badges.includes('streak_7'));
    assert.ok(badges.includes('lesson_scholar'));
    assert.ok(badges.includes('quiz_conqueror'));
    assert.ok(badges.includes('quiz_master'));
  });
});
