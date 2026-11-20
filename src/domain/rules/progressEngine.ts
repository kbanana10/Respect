/**
 * progressEngine.ts — Pure Learning Progress & Badge Domain Engine (Domain Layer)
 *
 * Extracted from AuthContext so progression rules (XP, exponential leveling,
 * CEFR unlocks, UTC daily missions, streak shields, and achievements) are 100%
 * deterministic, testable, and reusable across Web, Android, and iOS.
 */
import type { UserData } from '../../models/user';
import {
  calculateLevelFromXP,
  checkAndUpdateStreak,
  getUtcDateString,
} from '../../services/GamificationService';
import { CURRENT_USER_SCHEMA_VERSION } from '../schema/migrations';

export interface ProgressDeltaInput {
  xpToAdd: number;
  wordsToAdd: number;
  quizCompleted?: boolean;
  gemsToAdd?: number;
  source?: 'quiz' | 'game';
  perfect?: boolean;
}

export function evaluateUnlockedBadges(data: UserData): string[] {
  const badges = new Set<string>(data.badges || []);

  if (data.xp >= 50) badges.add('first_steps');
  if (data.xp >= 500) badges.add('dedicated_learner');
  if (data.xp >= 1500) badges.add('academic_achiever');
  if ((data.wordsLearned || 0) >= 10) badges.add('vocabulary_enthusiast');
  if ((data.wordsLearned || 0) >= 50) badges.add('vocabulary_master');
  if ((data.wordsLearned || 0) >= 150) badges.add('polyglot');
  if (data.streak >= 3) badges.add('streak_3');
  if (data.streak >= 7) badges.add('streak_7');
  if ((data.quizzesCompleted || 0) >= 5) badges.add('quiz_conqueror');
  if ((data.quizzesCompleted || 0) >= 20) badges.add('quiz_master');
  if ((data.completedLessons || []).length >= 5) badges.add('lesson_scholar');

  return Array.from(badges);
}

export function evaluateUnlockedCefrLevels(xp: number, existing: string[] = []): string[] {
  const levels = new Set<string>(['A1', ...existing]);
  if (xp >= 150) levels.add('A2');
  if (xp >= 450) levels.add('B1');
  if (xp >= 800) levels.add('B2');
  if (xp >= 1300) levels.add('Advanced');
  return Array.from(levels);
}

export function applyProgressDelta(
  currentData: UserData,
  input: ProgressDeltaInput,
  now: number = Date.now(),
): UserData {
  const safeXpDelta = Number.isFinite(input.xpToAdd) ? Math.max(0, Math.floor(input.xpToAdd)) : 0;
  const safeWordsDelta = Number.isFinite(input.wordsToAdd) ? Math.max(0, Math.floor(input.wordsToAdd)) : 0;
  const safeGemsDelta = Number.isFinite(input.gemsToAdd ?? 0) ? Math.max(0, Math.floor(input.gemsToAdd ?? 0)) : 0;

  const newXp = (currentData.xp || 0) + safeXpDelta;
  const newLevel = calculateLevelFromXP(newXp);
  const newGems = (currentData.gems ?? 100) + safeGemsDelta;
  const newWords = (currentData.wordsLearned || 0) + safeWordsDelta;
  const newQuizzes = input.quizCompleted
    ? (currentData.quizzesCompleted || 0) + 1
    : (currentData.quizzesCompleted || 0);
  const nextSessions = (currentData.sessionsCount || 0) + 1;
  const updatedTotalTime = (currentData.totalStudyTime || 0) + 2;

  const todayStr = getUtcDateString(new Date(now));
  const nextXpToday =
    (currentData.xpTodayDate === todayStr ? (currentData.xpToday || 0) : 0) + safeXpDelta;

  const prevMissions = currentData.missionsState;
  const missionCounters =
    prevMissions && prevMissions.date === todayStr
      ? { ...prevMissions.counters }
      : { quizzes: 0, games: 0, perfect: 0 };

  if (input.quizCompleted) {
    if ((input.source ?? 'quiz') === 'game') missionCounters.games += 1;
    else missionCounters.quizzes += 1;
  }
  if (input.perfect) {
    missionCounters.perfect += 1;
  }

  const nextMissionsState = {
    date: todayStr,
    counters: missionCounters,
    claimed: prevMissions && prevMissions.date === todayStr ? [...prevMissions.claimed] : [],
  };

  const streakResult = checkAndUpdateStreak(currentData);
  const nextUnlockedLevels = evaluateUnlockedCefrLevels(newXp, currentData.unlockedLevels);

  const nextData: UserData = {
    ...currentData,
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp: newXp,
    xpToday: nextXpToday,
    xpTodayDate: todayStr,
    missionsState: nextMissionsState,
    level: newLevel,
    gems: newGems,
    streak: streakResult.updatedStreak,
    streakFreezes: streakResult.streakFreezes,
    wordsLearned: newWords,
    quizzesCompleted: newQuizzes,
    sessionsCount: nextSessions,
    totalStudyTime: updatedTotalTime,
    unlockedLevels: nextUnlockedLevels,
    lastActive: now,
    lastActiveDate: streakResult.lastActiveDate,
    updatedAt: now,
  };

  nextData.badges = evaluateUnlockedBadges(nextData);
  return nextData;
}
