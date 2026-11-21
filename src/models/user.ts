/**
 * user.ts
 *
 * Central domain models representing Users, Profile Settings, Adaptive Learner Mode
 * (Kids 5-12 vs Adults 13+), Rewards, and Learning Progression.
 */

import type { ReviewDeck } from '../services/SpacedRepetitionService';

export interface User {
  displayName: string | null;
  uid: string;
  /** Present on Firebase-authenticated users; absent for local guests. */
  photoURL?: string | null;
}

export type Language = 'en' | 'ar' | 'ku';

export type LearnerMode = 'kids' | 'adults';

export type ThemeAccent = 'gold' | 'emerald' | 'sky' | 'rose';

/** Named owner contract: per-game best scores keyed by game id. */
export interface GameScoreMap {
  [gameId: string]: number;
}

/** Named owner contract: per-letter writing lesson progress keyed by UPPERCASE glyph. */
export interface WritingProgressMap {
  [letter: string]: WritingLetterProgress;
}

export interface UserData {
  /** Monotonic schema version for lossless storage migrations (current: 4). */
  schemaVersion?: number;
  xp: number;
  level: number;
  streak: number;
  lastActive: number;
  createdAt: number;
  updatedAt: number;
  wordsLearned: number;
  recentSearches: string[];
  favorites: string[];
  avatarId?: string;
  ageRange?: string;
  gender?: string;
  region?: string;
  kurdishRegion?: string;
  quizzesCompleted?: number;

  // Adaptive Learner Mode & Accessibility Preferences (Schema v4)
  learnerMode?: LearnerMode;
  autoPlayAudio?: boolean;
  soundEnabled?: boolean;
  relaxedTimer?: boolean;
  parentalGateEnabled?: boolean;

  // Offline Rewards Shop & Personalization (Schema v4)
  unlockedAvatars?: string[];
  unlockedStickers?: string[];
  activeAccent?: ThemeAccent;

  // Onboarding & Customization Preferences
  isOnboarded?: boolean;
  onboardingReason?: string;
  onboardingLevel?: string;
  onboardingStyle?: string;
  preferredStartingPath?: string;
  /** Daily XP commitment chosen in onboarding (20 / 50 / 100). */
  dailyGoalXp?: number;
  /** XP earned today (rolls over at UTC midnight via xpTodayDate). */
  xpToday?: number;
  xpTodayDate?: string;

  // Evolved gamification systems
  gems?: number; // Quester Gems / Coins currency
  streakFreezes?: number; // Available streak freeze shields
  /** Daily missions tracking (UTC day): activity counters + claimed reward ids. */
  missionsState?: {
    date: string; // YYYY-MM-DD UTC
    counters: { quizzes: number; games: number; perfect: number };
    claimed: string[];
  };
  lastStreakFreezeUsed?: string; // YYYY-MM-DD UTC when freeze was last consumed
  lastActiveDate?: string; // YYYY-MM-DD UTC date string
  completedLessons?: string[]; // list of completed lesson IDs
  unlockedLevels?: string[]; // list of unlocked CEFR levels ('U0', 'A1', 'A2', 'B1', 'B2', 'Advanced')
  badges?: string[]; // list of unlocked achievement IDs
  gameScores?: GameScoreMap; // game_id -> high score
  wrongAnswersHistory?: string[]; // word/sentence ids the user got wrong for review
  reviewDeck?: ReviewDeck; // SM-2 Spaced Repetition deck
  weakCategories?: Record<string, number>; // categoryId -> mistakeCount
  strongCategories?: Record<string, number>; // categoryId -> correctCount
  sessionsCount?: number; // total sessions logged
  totalStudyTime?: number; // total practice minutes/sessions
  lastDailyRewardClaimed?: string; // YYYY-MM-DD string
  /** Guided-tour ids the user finished or skipped (see src/features/tour). */
  completedTours?: string[];
  /**
   * Interactive Letter Writing Lesson progress, keyed by UPPERCASE glyph.
   * Persisted only as per-letter aggregates — never pointer/ink data.
   */
  writingProgress?: WritingProgressMap;
}

/** Per-letter stats for the Interactive Letter Writing Lesson. */
export interface WritingLetterProgress {
  /** Highest deterministic 0..100 score ever achieved for this letter. */
  bestScore: number;
  /** Completed attempts (a full Learn→Watch→Trace→Write→Score run). */
  attempts: number;
  /** At least one attempt cleared the "keep practicing" (≥60) floor. */
  completed: boolean;
}
