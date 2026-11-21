/**
 * Roadmap.tsx — Unified Visual Learning Map (/roadmap)
 *
 * Displays a winding vertical milestone trail from Unit 0 (Hawar Foundations)
 * through A1 → A2 → B1 → B2 → C1, with tri-lingual titles/descriptions,
 * SM-2 Smart Review & Fix Mistakes banners, Adult "Test Out" unlock option,
 * and an accessible lesson preview sheet with live Kurmanji audio.
 */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../store/AuthContext';
import { getDueItems } from '../services/SpacedRepetitionService';
import { cn } from '../utils/cn';
import {
  learningPath,
  getLevelTitle,
  getLevelDesc,
  getLessonTitle,
  getLessonDesc,
  type CEFRLevel,
  type Lesson,
} from '../data/learningPath';
import { t, pickLocalized } from '../localization/translations';
import { filterReviewableIds } from '../features/quiz/utils/questionGenerator';
import { useAppTour } from '../features/tour/useAppTour';
import {
  ROADMAP_TOUR_ID,
  TOUR_CHAIN_STORAGE_KEY,
  TOUR_REWARD_GEMS,
  buildRoadmapTourSteps,
  getFirstActionableLessonId,
  isTourCompleted,
} from '../features/tour/tours';
import { motion } from 'motion/react';
import { AudioButton } from '../features/audio/components/AudioButton';
import { Modal, Button, Spinner } from '../components/ui';
import {
  Lock, CheckCircle2, Play, Star, RotateCcw, Sparkles, Circle,
  Compass, Flame, Trophy, BookOpen, Globe, Briefcase, Car, Cat, Heart,
  Landmark, Laptop, MessageCircle, Plane, Stethoscope, TreePine, Users,
  Utensils, Clock, Link, Scale, Brain, Unlock, type LucideIcon,
} from 'lucide-react';

const LESSON_ICONS = {
  Briefcase, Car, Cat, Heart, Landmark, Laptop, MessageCircle,
  Plane, Stethoscope, TreePine, Users, Utensils,
  Clock, Link, Scale, BookOpen, Globe, Compass, Flame, Trophy, Sparkles,
} satisfies Record<string, LucideIcon>;

const LESSON_ICON_LOOKUP = new Map<string, LucideIcon>(Object.entries(LESSON_ICONS));

function renderLessonIcon(iconName: string) {
  const IconComponent = LESSON_ICON_LOOKUP.get(iconName) ?? Circle;
  return <IconComponent className="w-7 h-7" aria-hidden="true" />;
}

export function Roadmap() {
  const { userData, updateUserData, language, loading } = useAuth();
  const navigate = useNavigate();
  const isKidsMode = userData?.learnerMode === 'kids';

  const [selectedNode, setSelectedNode] = useState<{
    lesson: Lesson;
    level: CEFRLevel;
    status: 'completed' | 'active' | 'locked';
  } | null>(null);

  const { startTour } = useAppTour();
  const tourAttemptedRef = useRef(false);

  useEffect(() => {
    if (loading && !userData) return;
    if (tourAttemptedRef.current) return;
    let chain: string | null = null;
    try {
      chain = sessionStorage.getItem(TOUR_CHAIN_STORAGE_KEY);
    } catch {
      chain = null;
    }
    if (chain !== 'roadmap') return;

    const timer = window.setTimeout(() => {
      if (tourAttemptedRef.current) return;
      tourAttemptedRef.current = true;
      try {
        sessionStorage.removeItem(TOUR_CHAIN_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (isTourCompleted(ROADMAP_TOUR_ID, userData)) return;
      const lessonId = getFirstActionableLessonId(userData);
      if (!lessonId) return;
      startTour({
        tourId: ROADMAP_TOUR_ID,
        steps: buildRoadmapTourSteps(language, `roadmap-node-${lessonId}`),
        rewardGems: TOUR_REWARD_GEMS,
      });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [loading, userData, language, startTour]);

  if (loading && !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Spinner size="lg" label={t(language, 'loading')} showLabel />
      </div>
    );
  }

  const userXp = userData?.xp ?? 0;
  const completedLessons = userData?.completedLessons ?? [];
  const unlockedLevels = new Set(userData?.unlockedLevels ?? ['U0', 'A1']);
  const dueCardsCount = getDueItems(userData?.reviewDeck ?? {}).length;
  const mistakesCount = filterReviewableIds(userData?.wrongAnswersHistory ?? []).length;

  const allFlatNodes = learningPath.flatMap((lvl) =>
    lvl.lessons.map((lesson) => ({ lesson, level: lvl })),
  );

  const isLevelOpen = (lvl: CEFRLevel) =>
    userXp >= lvl.requiredXp || unlockedLevels.has(lvl.id) || lvl.id === 'U0' || lvl.id === 'A1';

  const getNodeStatus = (lessonId: string, level: CEFRLevel): 'completed' | 'active' | 'locked' => {
    if (!isLevelOpen(level)) return 'locked';
    if (completedLessons.includes(lessonId)) return 'completed';
    const flatIdx = allFlatNodes.findIndex((n) => n.lesson.id === lessonId);
    if (flatIdx <= 0) return 'active';
    const prev = allFlatNodes[flatIdx - 1];
    if (completedLessons.includes(prev.lesson.id) || prev.level.id !== level.id) {
      return 'active';
    }
    return 'locked';
  };

  const handleUnlockLevelTestOut = async (level: CEFRLevel) => {
    const nextUnlocked = Array.from(new Set([...unlockedLevels, level.id]));
    await updateUserData({ unlockedLevels: nextUnlocked });
    if (level.lessons[0]) {
      navigate(`/quiz/${level.lessons[0].id}`);
    }
  };

  const copy = pickLocalized(language, {
    en: {
      mapTitle: isKidsMode ? 'Adventure Map' : 'Learning Path',
      mapDesc: isKidsMode
        ? 'Follow the golden trail from Hawar Sounds to full Kurdish adventures!'
        : 'Step-by-step Kurmanji curriculum from Unit 0 Hawar Foundations through C1.',
      completed: (done: number, total: number) => `${done} / ${total} completed`,
      dueTitle: `${dueCardsCount} words due for Smart Review`,
      dueAction: 'Review Now',
      mistakesTitle: `${mistakesCount} mistakes ready to practice`,
      mistakesAction: 'Fix Mistakes',
      unlockTestOut: 'Jump Here (Test Out)',
      needsXp: (xp: number) => `Unlocks at ${xp} XP`,
      startLesson: 'Start Lesson',
      replayLesson: 'Practice Again',
      lockedHint: 'Complete the previous milestone to unlock this lesson.',
      previewWords: 'Words in this lesson',
      close: 'Close',
      statusDone: 'Completed',
      statusNext: 'Next Up',
      statusLocked: 'Locked',
    },
    ar: {
      mapTitle: isKidsMode ? 'خريطة المغامرة' : 'مسار التعلّم',
      mapDesc: isKidsMode
        ? 'اتبع المسار الذهبي من أصوات الهوار إلى مغامرات الكردية الممتعة!'
        : 'منهج الكورمانجية المتدرج من الوحدة 0 (أساسيات الهوار) حتى المستوى C1.',
      completed: (done: number, total: number) => `${done} / ${total} مكتمل`,
      dueTitle: `${dueCardsCount} كلمة جاهزة للمراجعة الذكية`,
      dueAction: 'ابدأ المراجعة',
      mistakesTitle: `${mistakesCount} أخطاء جاهزة للتصحيح`,
      mistakesAction: 'صحّح الأخطاء',
      unlockTestOut: 'افتح هذا المستوى (اختبار تخطي)',
      needsXp: (xp: number) => `يُفتح عند ${xp} XP`,
      startLesson: 'ابدأ الدرس',
      replayLesson: 'تدرّب مجدداً',
      lockedHint: 'أكمل المحطة السابقة لفتح هذا الدرس.',
      previewWords: 'كلمات هذا الدرس',
      close: 'إغلاق',
      statusDone: 'مكتمل',
      statusNext: 'الدرس التالي',
      statusLocked: 'مغلق',
    },
    ku: {
      mapTitle: isKidsMode ? 'Nexşeya Serpêhatiyê' : 'Rêya Fêrbûnê',
      mapDesc: isKidsMode
        ? 'Ji Dengên Hawarê heta serpêhatiyên kurdî rêya zêrîn bişopîne!'
        : 'Bernameya Kurmancî ya gav bi gav ji Yekîneya 0 (Hawar) heta C1.',
      completed: (done: number, total: number) => `${done} / ${total} temam`,
      dueTitle: `${dueCardsCount} peyv ji bo Dubarekirina Jîr amade ne`,
      dueAction: 'Niha Dubare Bike',
      mistakesTitle: `${mistakesCount} çewtî ji bo rastkirinê amade ne`,
      mistakesAction: 'Çewtiyan Rast Bike',
      unlockTestOut: 'Vê Astê Veke (Testa Derbasbûnê)',
      needsXp: (xp: number) => `Li ${xp} XP vedibe`,
      startLesson: 'Dersê Dest Pê Bike',
      replayLesson: 'Dîsa Biceribîne',
      lockedHint: 'Ji bo vekirina vê dersê gava berê temam bike.',
      previewWords: 'Peyvên vê dersê',
      close: 'Bigire',
      statusDone: 'Temam',
      statusNext: 'Gava Pêş',
      statusLocked: 'Girtî',
    },
  });

  const totalCompleted = allFlatNodes.filter((n) => completedLessons.includes(n.lesson.id)).length;

  return (
    <div className="p-4 lg:p-8 pb-28 max-w-3xl mx-auto space-y-6">
      {/* Header Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-6 shadow-flat space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl font-black text-ink tracking-tight">{copy.mapTitle}</h2>
            <p className="text-sm text-muted font-semibold mt-1">{copy.mapDesc}</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] text-xs font-black tabular-nums">
            {copy.completed(totalCompleted, allFlatNodes.length)}
          </span>
        </div>
      </div>

      {/* Review Action Strips (SM-2 + Mistakes) */}
      {(dueCardsCount > 0 || mistakesCount > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dueCardsCount > 0 && (
            <button
              type="button"
              onClick={() => navigate('/quiz/srs_review')}
              className="bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center justify-between gap-3 text-start cursor-pointer hover:border-emerald-400"
            >
              <div className="flex items-center gap-3 min-w-0">
                <RotateCcw className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs font-black text-emerald-900 dark:text-emerald-100 leading-snug">
                  {copy.dueTitle}
                </span>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shrink-0">
                {copy.dueAction}
              </span>
            </button>
          )}
          {mistakesCount > 0 && (
            <button
              type="button"
              onClick={() => navigate('/quiz/review_mistakes')}
              className="bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-center justify-between gap-3 text-start cursor-pointer hover:border-amber-400"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Brain className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-xs font-black text-amber-900 dark:text-amber-100 leading-snug">
                  {copy.mistakesTitle}
                </span>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-[#FFB300] text-[#432C00] text-xs font-extrabold shrink-0">
                {copy.mistakesAction}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Winding Vertical Trail by Unit / CEFR Level */}
      <div className="space-y-8">
        {learningPath.map((lvl) => {
          const open = isLevelOpen(lvl);
          const doneInUnit = lvl.lessons.filter((l) => completedLessons.includes(l.id)).length;

          return (
            <section
              key={lvl.id}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-flat space-y-6"
            >
              {/* Unit Header */}
              <div className="flex items-start justify-between gap-3 flex-wrap border-b border-line dark:border-slate-800 pb-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#FFB300] text-[#432C00] text-xs font-black">
                      {lvl.id}
                    </span>
                    <h3 className="text-lg font-black text-ink leading-tight">
                      {getLevelTitle(lvl, language)}
                    </h3>
                  </div>
                  <p className="text-xs text-muted font-semibold">{getLevelDesc(lvl, language)}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {open ? (
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full tabular-nums">
                      {doneInUnit}/{lvl.lessons.length}
                    </span>
                  ) : (
                    <>
                      <span className="text-xs font-bold text-muted bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        {copy.needsXp(lvl.requiredXp)}
                      </span>
                      {!isKidsMode && (
                        <button
                          type="button"
                          onClick={() => void handleUnlockLevelTestOut(lvl)}
                          className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] border border-[#FFB300]/40 text-xs font-black flex items-center gap-1.5 cursor-pointer hover:bg-[#FFE7B3]"
                        >
                          <Unlock className="w-3.5 h-3.5" />
                          {copy.unlockTestOut}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Winding Milestone Nodes */}
              <div className="flex flex-col items-center gap-5 relative py-2">
                {lvl.lessons.map((lesson, idx) => {
                  const status = getNodeStatus(lesson.id, lvl);
                  const offsetClass =
                    idx % 3 === 1
                      ? 'sm:translate-x-10'
                      : idx % 3 === 2
                        ? 'sm:-translate-x-10'
                        : '';

                  return (
                    <div key={lesson.id} className={cn('w-full max-w-sm transition-transform', offsetClass)}>
                      <motion.button
                        type="button"
                        data-tour={`roadmap-node-${lesson.id}`}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedNode({ lesson, level: lvl, status })}
                        className={cn(
                          'w-full p-4 rounded-3xl border-2 flex items-center gap-4 text-start transition-all cursor-pointer min-h-[76px]',
                          status === 'completed'
                            ? 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30'
                            : status === 'active'
                              ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14] shadow-[0_6px_24px_rgba(255,179,0,0.18)]'
                              : 'border-line-soft dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-75',
                        )}
                      >
                        <div
                          className={cn(
                            'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0',
                            status === 'completed'
                              ? 'bg-emerald-500 text-white'
                              : status === 'active'
                                ? 'bg-[#FFB300] text-[#432C00] shadow-[0_3px_0_#E69500]'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-500',
                          )}
                        >
                          {status === 'locked' ? (
                            <Lock className="w-6 h-6" />
                          ) : status === 'completed' ? (
                            <CheckCircle2 className="w-7 h-7" />
                          ) : (
                            renderLessonIcon(lesson.icon)
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base text-ink truncate">
                              {getLessonTitle(lesson, language)}
                            </span>
                          </div>
                          <p className="text-xs text-muted font-semibold truncate mt-0.5">
                            {getLessonDesc(lesson, language)}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs font-extrabold">
                            <span
                              className={cn(
                                status === 'completed'
                                  ? 'text-emerald-700 dark:text-emerald-300'
                                  : status === 'active'
                                    ? 'text-[#8A6100] dark:text-[#FFCE6B]'
                                    : 'text-muted',
                              )}
                            >
                              {status === 'completed'
                                ? copy.statusDone
                                : status === 'active'
                                  ? copy.statusNext
                                  : copy.statusLocked}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-muted tabular-nums">+{lesson.xpReward} XP</span>
                          </div>
                        </div>

                        {status === 'active' && (
                          <span className="w-10 h-10 rounded-full bg-[#FFB300] text-[#432C00] flex items-center justify-center shrink-0">
                            <Play className="w-4 h-4 fill-current" />
                          </span>
                        )}
                        {status === 'completed' && (
                          <Star className="w-5 h-5 text-[#FFB300] fill-[#FFB300] shrink-0" />
                        )}
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Lesson Preview Modal */}
      <Modal
        open={selectedNode !== null}
        onClose={() => setSelectedNode(null)}
        variant="sheet"
        title={selectedNode ? getLessonTitle(selectedNode.lesson, language) : ''}
        description={selectedNode ? getLessonDesc(selectedNode.lesson, language) : ''}
        closeLabel={copy.close}
      >
        {selectedNode && (
          <div className="space-y-4">
            <div className="text-xs font-black text-muted uppercase tracking-wider">
              {copy.previewWords} ({selectedNode.lesson.words.length})
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pe-1">
              {selectedNode.lesson.words.map((word) => (
                <div
                  key={word.id}
                  className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-3 border border-line-soft dark:border-slate-700"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {word.emoji && (
                      <span className="text-2xl shrink-0 select-none" aria-hidden="true">
                        {word.emoji}
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="font-black text-sm text-ink" dir="ltr">
                        {word.ku}
                      </div>
                      <div className="text-xs font-semibold text-muted">
                        {pickLocalized(language, {
                          en: word.en,
                          ar: word.ar,
                          ku: `${word.en} · ${word.ar}`,
                        })}
                      </div>
                    </div>
                  </div>
                  <AudioButton audioUrl={word.audio} textToSpeak={word.ku} className="shrink-0" />
                </div>
              ))}
            </div>

            {selectedNode.status === 'locked' ? (
              <p className="text-xs font-bold text-center text-muted bg-slate-100 dark:bg-slate-800 rounded-2xl p-3">
                {copy.lockedHint}
              </p>
            ) : (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  const id = selectedNode.lesson.id;
                  setSelectedNode(null);
                  navigate(`/quiz/${id}`);
                }}
              >
                {selectedNode.status === 'completed' ? copy.replayLesson : copy.startLesson}
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
