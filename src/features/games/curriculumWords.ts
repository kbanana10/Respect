/**
 * curriculumWords.ts — Curriculum-aware word pool for Games Arcade.
 *
 * Prioritizes words from the learner's unlocked/completed Learning Map lessons
 * and due SM-2 review deck so games reinforce active study instead of random
 * unlearned terms. Falls back smoothly to Unit 0 + A1 vocabulary.
 */
import { learningPath } from '../../data/learningPath';
import { vocabulary } from '../../data/kurmanji';
import type { UserData } from '../../models/user';

export interface GameVocabItem {
  readonly id: string;
  readonly ku: string;
  readonly en: string;
  readonly ar: string;
  readonly emoji?: string;
}

export function getCurriculumWordPool(userData: UserData | null | undefined, minCount = 12): GameVocabItem[] {
  const seen = new Set<string>();
  const prioritized: GameVocabItem[] = [];

  const pushUnique = (item: GameVocabItem) => {
    const key = item.ku.trim().toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    prioritized.push(item);
  };

  const completed = new Set(userData?.completedLessons ?? []);
  const xp = userData?.xp ?? 0;

  // 1. Words from completed lessons & currently unlocked levels
  for (const level of learningPath) {
    if (xp >= level.requiredXp || level.id === 'U0' || level.id === 'A1') {
      for (const lesson of level.lessons) {
        if (completed.has(lesson.id) || level.id === 'U0' || level.id === 'A1') {
          for (const word of lesson.words) {
            pushUnique({
              id: word.id,
              ku: word.ku,
              en: word.en,
              ar: word.ar,
              emoji: word.emoji,
            });
          }
        }
      }
    }
  }

  // 2. Supplement with core vocabulary if needed
  if (prioritized.length < minCount) {
    for (const word of vocabulary) {
      pushUnique({
        id: word.id,
        ku: word.ku,
        en: word.en,
        ar: word.ar,
        emoji: word.emoji,
      });
      if (prioritized.length >= minCount * 2) break;
    }
  }

  return prioritized;
}
