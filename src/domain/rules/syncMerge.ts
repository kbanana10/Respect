/**
 * syncMerge.ts — Deterministic CRDT / Additive + LWW UserData Reconciliation (Domain Layer)
 *
 * Pure conflict-resolution module shared across Web, Android, and iOS.
 */
import type { GameScoreMap, UserData, WritingProgressMap } from '../../models/user';
import { calculateLevelFromXP } from '../../services/GamificationService';
import type { ReviewDeck } from '../../services/SpacedRepetitionService';
import { CURRENT_USER_SCHEMA_VERSION } from '../schema/migrations';

export interface SyncConflictSummary {
  readonly hadDivergence: boolean;
  readonly resolvedFields: string[];
  readonly winnerForLww: 'local' | 'remote';
}

export interface MergeOutcome {
  readonly merged: UserData;
  readonly summary: SyncConflictSummary;
}

export function reconcileUserData(local: UserData, remote: UserData, now: number = Date.now()): MergeOutcome {
  const localTime = local.updatedAt || local.lastActive || 0;
  const remoteTime = remote.updatedAt || remote.lastActive || 0;
  const isLocalNewer = localTime >= remoteTime;
  const resolvedFields: string[] = [];

  if ((local.xp || 0) !== (remote.xp || 0)) resolvedFields.push('xp');
  if ((local.gems ?? 100) !== (remote.gems ?? 100)) resolvedFields.push('gems');

  // 1. Monotonic progress metrics (max-wins to guarantee zero lost learning progress)
  const mergedXp = Math.max(local.xp || 0, remote.xp || 0);
  const mergedLevel = calculateLevelFromXP(mergedXp);
  const mergedWords = Math.max(local.wordsLearned || 0, remote.wordsLearned || 0);
  const mergedQuizzes = Math.max(local.quizzesCompleted || 0, remote.quizzesCompleted || 0);
  const mergedSessions = Math.max(local.sessionsCount || 0, remote.sessionsCount || 0);
  const mergedTotalStudyTime = Math.max(local.totalStudyTime || 0, remote.totalStudyTime || 0);

  // 2. Grow-only sets (union)
  const mergedLessons = Array.from(new Set([...(local.completedLessons || []), ...(remote.completedLessons || [])]));
  const mergedBadges = Array.from(new Set([...(local.badges || []), ...(remote.badges || [])]));
  const mergedUnlocked = Array.from(new Set(['U0', 'A1', ...(local.unlockedLevels || []), ...(remote.unlockedLevels || [])]));
  const mergedFavorites = Array.from(new Set([...(local.favorites || []), ...(remote.favorites || [])]));
  const mergedWrongAnswers = Array.from(new Set([...(local.wrongAnswersHistory || []), ...(remote.wrongAnswersHistory || [])]));
  const mergedCompletedTours = Array.from(new Set([...(local.completedTours || []), ...(remote.completedTours || [])]));
  const mergedAvatars = Array.from(new Set(['sun_classic', 'mountain_eagle', ...(local.unlockedAvatars || []), ...(remote.unlockedAvatars || [])]));
  const mergedStickers = Array.from(new Set([...(local.unlockedStickers || []), ...(remote.unlockedStickers || [])]));

  const rawSearches = isLocalNewer
    ? [...(local.recentSearches || []), ...(remote.recentSearches || [])]
    : [...(remote.recentSearches || []), ...(local.recentSearches || [])];
  const mergedRecentSearches = Array.from(new Set(rawSearches)).slice(0, 20);

  // 3. Keyed High Scores (key-wise max)
  const mergedGameScores: GameScoreMap = { ...(remote.gameScores || {}) };
  for (const [key, val] of Object.entries(local.gameScores || {})) {
    mergedGameScores[key] = Math.max(mergedGameScores[key] || 0, val || 0);
  }

  // 4. Writing progress (per-letter max bestScore, max attempts, OR completed)
  const mergedWriting: WritingProgressMap = { ...(remote.writingProgress || {}) };
  for (const [letter, localProg] of Object.entries(local.writingProgress || {})) {
    const remoteProg = mergedWriting[letter];
    if (!remoteProg) {
      mergedWriting[letter] = localProg;
    } else {
      mergedWriting[letter] = {
        bestScore: Math.max(localProg.bestScore, remoteProg.bestScore),
        attempts: Math.max(localProg.attempts, remoteProg.attempts),
        completed: localProg.completed || remoteProg.completed,
      };
    }
  }

  // 5. Spaced Repetition Review Deck (per-card recency merge)
  const mergedReviewDeck: ReviewDeck = { ...(remote.reviewDeck || {}) };
  for (const [id, localCard] of Object.entries(local.reviewDeck || {})) {
    const remoteCard = mergedReviewDeck[id];
    if (!remoteCard) {
      mergedReviewDeck[id] = localCard;
    } else {
      const localReviewed = localCard.lastReviewedAt || 0;
      const remoteReviewed = remoteCard.lastReviewedAt || 0;
      if (localReviewed > remoteReviewed) {
        mergedReviewDeck[id] = localCard;
      } else if (remoteReviewed > localReviewed) {
        mergedReviewDeck[id] = remoteCard;
      } else {
        mergedReviewDeck[id] = (localCard.repetitions || 0) >= (remoteCard.repetitions || 0) ? localCard : remoteCard;
      }
    }
  }

  // 6. Spendable balances & consumables (Last-Write-Wins so spent gems/freezes don't resurrect)
  const mergedGems = isLocalNewer
    ? (local.gems ?? remote.gems ?? 100)
    : (remote.gems ?? local.gems ?? 100);
  const mergedFreezes = isLocalNewer
    ? (local.streakFreezes ?? remote.streakFreezes ?? 1)
    : (remote.streakFreezes ?? local.streakFreezes ?? 1);
  const mergedLastFreezeUsed = isLocalNewer
    ? (local.lastStreakFreezeUsed ?? remote.lastStreakFreezeUsed)
    : (remote.lastStreakFreezeUsed ?? local.lastStreakFreezeUsed);
  const mergedLastDailyReward = isLocalNewer
    ? (local.lastDailyRewardClaimed ?? remote.lastDailyRewardClaimed)
    : (remote.lastDailyRewardClaimed ?? local.lastDailyRewardClaimed);

  // 7. Streak & Activity Date Reconciliation
  let mergedStreak = Math.max(local.streak || 0, remote.streak || 0);
  let mergedLastActiveDate = local.lastActiveDate || remote.lastActiveDate;
  if (local.lastActiveDate && remote.lastActiveDate) {
    if (local.lastActiveDate === remote.lastActiveDate) {
      mergedStreak = Math.max(local.streak || 0, remote.streak || 0);
      mergedLastActiveDate = local.lastActiveDate;
    } else if (local.lastActiveDate > remote.lastActiveDate) {
      mergedStreak = local.streak || 0;
      mergedLastActiveDate = local.lastActiveDate;
    } else {
      mergedStreak = remote.streak || 0;
      mergedLastActiveDate = remote.lastActiveDate;
    }
  } else if (local.lastActiveDate) {
    mergedStreak = local.streak || 0;
    mergedLastActiveDate = local.lastActiveDate;
  } else if (remote.lastActiveDate) {
    mergedStreak = remote.streak || 0;
    mergedLastActiveDate = remote.lastActiveDate;
  }

  if (mergedLessons.length > (local.completedLessons || []).length) resolvedFields.push('completedLessons');
  if (Object.keys(mergedReviewDeck).length > Object.keys(local.reviewDeck || {}).length) resolvedFields.push('reviewDeck');

  const baseMetadata = isLocalNewer ? { ...remote, ...local } : { ...local, ...remote };

  const merged: UserData = {
    ...baseMetadata,
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp: mergedXp,
    level: mergedLevel,
    gems: mergedGems,
    wordsLearned: mergedWords,
    quizzesCompleted: mergedQuizzes,
    sessionsCount: mergedSessions,
    totalStudyTime: mergedTotalStudyTime,
    completedLessons: mergedLessons,
    badges: mergedBadges,
    unlockedLevels: mergedUnlocked,
    favorites: mergedFavorites,
    recentSearches: mergedRecentSearches,
    gameScores: mergedGameScores,
    wrongAnswersHistory: mergedWrongAnswers,
    reviewDeck: mergedReviewDeck,
    writingProgress: mergedWriting,
    completedTours: mergedCompletedTours,
    unlockedAvatars: mergedAvatars,
    unlockedStickers: mergedStickers,
    streak: mergedStreak,
    streakFreezes: mergedFreezes,
    lastStreakFreezeUsed: mergedLastFreezeUsed,
    lastDailyRewardClaimed: mergedLastDailyReward,
    lastActiveDate: mergedLastActiveDate,
    lastActive: Math.max(local.lastActive || 0, remote.lastActive || 0),
    createdAt: Math.min(local.createdAt || now, remote.createdAt || now),
    updatedAt: Math.max(localTime, remoteTime, now),
  };

  return {
    merged,
    summary: {
      hadDivergence: resolvedFields.length > 0,
      resolvedFields,
      winnerForLww: isLocalNewer ? 'local' : 'remote',
    },
  };
}
