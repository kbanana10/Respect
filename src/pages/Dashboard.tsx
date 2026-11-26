import { useAuth } from '../store/AuthContext';
import type { UserData } from '../models/user';
import {
  LogOut, Trophy, Flame, ChevronRight, Clock, BookOpen, MessageCircle,
  Library, Search as SearchIcon, Heart, Brain, CheckCircle2, PenTool,
  Gamepad2, Sparkles, ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { t, pickLocalized } from '../localization/translations';
import { academicVocabulary } from '../data/academic';
import { AudioButton } from '../features/audio/components/AudioButton';
import { useState, useEffect, useRef } from 'react';
import { OnboardingFlow } from '../components/OnboardingFlow';
import {
  learningPath,
  getLessonTitle,
  getLevelTitle,
  type CEFRLevel,
  type Lesson,
} from '../data/learningPath';
import { getLevelProgress } from '../services/GamificationService';
import { countDue } from '../services/SpacedRepetitionService';
import Confetti from 'react-confetti';
import { AnimatePresence } from 'motion/react';
import { AdBanner } from '../features/monetization/components/AdElements';
import { Modal, Spinner, ErrorState } from '../components/ui';
import { SunMark } from '../components/ui/SunMark';
import { useAppTour } from '../features/tour/useAppTour';
import { useFavorites } from '../hooks/useFavorites';
import {
  WELCOME_TOUR_ID,
  TOUR_CHAIN_STORAGE_KEY,
  buildWelcomeTourSteps,
  shouldAutoStartWelcomeTour,
} from '../features/tour/tours';

const MOTIVATIONAL_QUOTES = [
  {
    ku: 'Hêdî hêdî karkerî, fêr bûn e.',
    en: 'Step by step, practicing leads to language mastery.',
    ar: 'خطوة بخطوة، التدريب والاجتهاد يقود لإتقان اللغة.',
  },
  {
    ku: 'Zimanê dayîkî, kaniya çand û nasnameyê ye.',
    en: 'Our mother tongue is the fountain of culture and identity.',
    ar: 'اللغة الأم هي نبع الهوية والثقافة الأصيل.',
  },
  {
    ku: 'Her rojek nû, fersendek nû ye bo fêrbûnê.',
    en: 'Every new day brings a fresh milestone to learn.',
    ar: 'كل يوم جديد يجلب معه فرصة واعدة للتعلم والتقدم.',
  },
  {
    ku: 'Zimanê xwe winda meke, ew rûmeta te ye.',
    en: 'Never lose grasp of your tongue; it represents your heritage.',
    ar: 'لا تفرط بلسانك وجذورك الكوردية؛ فهي مبعث فخرك.',
  },
] as const;

export function Dashboard() {
  const { userData, logout, language, updateUserData, loading, profileError, retryProfileLoad } = useAuth();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [dailyWord, setDailyWord] = useState(academicVocabulary[0]);

  const [isDailyGoalOpen, setIsDailyGoalOpen] = useState(false);
  const [showStreakConfetti, setShowStreakConfetti] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const confettiTimerRef = useRef<number | null>(null);
  useEffect(() => () => {
    if (confettiTimerRef.current !== null) window.clearTimeout(confettiTimerRef.current);
  }, []);

  const [windowDimensions, setWindowDimensions] = useState({
    width: globalThis.window !== undefined ? window.innerWidth : 500,
    height: globalThis.window !== undefined ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Guided Tour
  const { startTour } = useAppTour();
  const tourAttemptedRef = useRef(false);
  useEffect(() => {
    if (loading || !userData || userData.isOnboarded === false || isDailyGoalOpen) return;
    if (tourAttemptedRef.current) return;
    let forcedReplay = false;
    try {
      forcedReplay = sessionStorage.getItem(TOUR_CHAIN_STORAGE_KEY) === 'welcome';
    } catch {
      forcedReplay = false;
    }
    if (!forcedReplay && !shouldAutoStartWelcomeTour(userData)) return;

    const timer = window.setTimeout(() => {
      if (tourAttemptedRef.current) return;
      if (globalThis.document !== undefined && document.querySelector('[role="dialog"]')) return;
      tourAttemptedRef.current = true;
      if (forcedReplay) {
        try {
          sessionStorage.removeItem(TOUR_CHAIN_STORAGE_KEY);
        } catch {
          /* ignore */
        }
      }
      startTour({
        tourId: WELCOME_TOUR_ID,
        steps: buildWelcomeTourSteps(language),
        onFinishedAction: () => {
          try {
            sessionStorage.setItem(TOUR_CHAIN_STORAGE_KEY, 'roadmap');
          } catch {
            /* ignore */
          }
        },
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [loading, userData, language, startTour, isDailyGoalOpen]);

  // Celebrate once per session when daily XP goal is crossed
  useEffect(() => {
    const goal = userData?.dailyGoalXp || 50;
    const today = new Date().toISOString().slice(0, 10);
    const earned = userData?.xpTodayDate === today ? userData?.xpToday || 0 : 0;
    if (earned >= goal) {
      const celebrated = sessionStorage.getItem('kurdish_quest_daily_goal_celebrated_session');
      if (!celebrated) {
        sessionStorage.setItem('kurdish_quest_daily_goal_celebrated_session', 'true');
        setShowStreakConfetti(true);
        if (confettiTimerRef.current !== null) window.clearTimeout(confettiTimerRef.current);
        confettiTimerRef.current = window.setTimeout(() => {
          confettiTimerRef.current = null;
          setShowStreakConfetti(false);
        }, 5500);
      }
    }
  }, [userData?.xpToday, userData?.xpTodayDate, userData?.dailyGoalXp]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const seed = today.split('-').reduce((acc, val) => acc + Number.parseInt(val, 10), 0);
    setDailyWord(academicVocabulary[seed % academicVocabulary.length]);
    setQuoteIdx(seed % MOTIVATIONAL_QUOTES.length);
  }, []);

  if (loading && !userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner
          size="lg"
          label={pickLocalized(language, {
            en: 'Loading your profile...',
            ar: 'جاري تحميل الملف الشخصي...',
            ku: 'Profîla te tê barkirin...',
          })}
          showLabel
        />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[60vh]">
        <ErrorState
          className="max-w-md w-full"
          title={t(language, 'error_generic_title')}
          description={t(language, 'error_generic_desc')}
          retryLabel={t(language, 'retry')}
          onRetry={retryProfileLoad}
        />
      </div>
    );
  }

  const safeUserData: UserData = userData || {
    xp: 0,
    level: 1,
    gems: 100,
    streak: 0,
    wordsLearned: 0,
    completedLessons: [],
    isOnboarded: true,
    learnerMode: 'adults',
    streakFreezes: 1,
    lastActiveDate: '',
    lastActive: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    recentSearches: [],
    favorites: [],
    wrongAnswersHistory: [],
    reviewDeck: {},
  };

  const isKidsMode = safeUserData.learnerMode === 'kids';
  const needsOnboarding = safeUserData.isOnboarded === false;

  const levelProgress = getLevelProgress(safeUserData.xp || 0);
  const todayUtc = new Date().toISOString().slice(0, 10);
  const xpTodaySafe = safeUserData.xpTodayDate === todayUtc ? safeUserData.xpToday || 0 : 0;
  const dailyGoalTarget = safeUserData.dailyGoalXp || 50;
  const dailyGoalReached = xpTodaySafe >= dailyGoalTarget;
  const dueReviewCount = countDue(safeUserData.reviewDeck ?? {});

  const getDashboardRecommendedLesson = (): { lesson: Lesson; level: CEFRLevel } | null => {
    const completed = safeUserData.completedLessons || [];
    for (const lvl of learningPath) {
      if ((safeUserData.xp || 0) >= lvl.requiredXp) {
        for (const les of lvl.lessons) {
          if (!completed.includes(les.id)) {
            return { lesson: les, level: lvl };
          }
        }
      }
    }
    if (learningPath.length > 0 && learningPath[0].lessons.length > 0) {
      return { lesson: learningPath[0].lessons[0], level: learningPath[0] };
    }
    return null;
  };

  const nextLessonData = getDashboardRecommendedLesson();

  // 7-day visual streak strip
  const dayLetters = pickLocalized(language, {
    en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    ar: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    ku: ['Y', 'D', 'S', 'Ç', 'P', 'Î', 'Ş'],
  });

  const weekDays = (() => {
    const today = new Date();
    const lastActiveDateObj = safeUserData.lastActiveDate
      ? new Date(`${safeUserData.lastActiveDate}T00:00:00Z`)
      : null;
    const currentStreak = safeUserData.streak || 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const diffToLastActive = lastActiveDateObj
      ? Math.floor(
          Math.abs(new Date(`${todayStr}T00:00:00Z`).getTime() - lastActiveDateObj.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

    return Array.from({ length: 7 }, (_, idx) => {
      const i = 6 - idx;
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const isActive = currentStreak > 0 && i >= diffToLastActive && i < diffToLastActive + currentStreak;
      return { id: i, label: dayLetters[date.getDay()], isActive, isToday: i === 0 };
    });
  })();

  const dailyWordKey = `acad_${dailyWord.id}`;
  const isDailyWordFav = isFavorite(dailyWordKey) || isFavorite(dailyWord.id);
  const toggleDailyWordFav = () => {
    const keyToToggle = isFavorite(dailyWord.id) ? dailyWord.id : dailyWordKey;
    toggleFavorite(keyToToggle);
  };

  const labels = pickLocalized(language, {
    en: {
      greeting: isKidsMode ? 'Silav, Explorer!' : 'Serkeftin!',
      subtitle: isKidsMode ? 'Ready for a fun Kurdish adventure?' : 'Ready for Kurmanji today?',
      continueLearning: 'Continue Learning',
      upNext: 'Up Next on Your Map',
      studentLevel: isKidsMode ? 'Star Level' : 'Student Level',
      explore: isKidsMode ? 'Fun Activities' : 'Quick Access',
      reviewDue: `${dueReviewCount} words ready to review`,
      close: 'Close',
      studyGoal: 'Daily Study Goal',
      favAdd: 'Save to favorites',
      favRemove: 'Remove from favorites',
    },
    ar: {
      greeting: isKidsMode ? 'مرحباً يا بطل!' : 'سرْكفْتِن !',
      subtitle: isKidsMode ? 'هل أنت مستعد لمغامرة كردية ممتعة؟' : 'جاهز لتعلم الكورمانجية اليوم؟',
      continueLearning: 'تابع التعلّم',
      upNext: 'الدرس التالي في خريطتك',
      studentLevel: isKidsMode ? 'مستوى النجوم' : 'المستوى الدراسي',
      explore: isKidsMode ? 'أنشطة ممتعة' : 'وصول سريع',
      reviewDue: `${dueReviewCount} كلمات جاهزة للمراجعة`,
      close: 'إغلاق',
      studyGoal: 'الهدف اليومي للدراسة',
      favAdd: 'حفظ في المفضلة',
      favRemove: 'إزالة من المفضلة',
    },
    ku: {
      greeting: isKidsMode ? 'Silav, Leheng!' : 'Serkeftin!',
      subtitle: isKidsMode ? 'Tu ji bo serpêhatiyeke xweş a kurdî amade yî?' : 'Îro ji bo fêrbûna Kurmancî amade yî?',
      continueLearning: 'Fêrbûnê Bidomîne',
      upNext: 'Dersa Pêş li ser Nexşeyê',
      studentLevel: isKidsMode ? 'Asta Stêrkan' : 'Asta Fêrxwazî',
      explore: isKidsMode ? 'Çalakiyên Xweş' : 'Gihîştina Bilez',
      reviewDue: `${dueReviewCount} peyv ji bo dubarekirinê amade ne`,
      close: 'Bigire',
      studyGoal: 'Armanca Rojane',
      favAdd: 'Li bijareyan zêde bike',
      favRemove: 'Ji bijareyan rake',
    },
  });

  const quickActions = isKidsMode
    ? [
        { path: '/writing', label: t(language, 'writing_studio_title'), icon: <PenTool className="w-5 h-5" />, tone: 'bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#D97706] dark:text-[#FFCE6B]' },
        { path: '/games', label: t(language, 'games_tab'), icon: <Gamepad2 className="w-5 h-5" />, tone: 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400' },
        { path: '/alphabet', label: t(language, 'alphabet'), icon: <BookOpen className="w-5 h-5" />, tone: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' },
        { path: '/store', label: t(language, 'nav_store'), icon: <Sparkles className="w-5 h-5" />, tone: 'bg-sky-100 dark:bg-sky-950/40 text-sky-500' },
      ]
    : [
        { path: '/vocabulary', label: t(language, 'module_vocab'), icon: <Library className="w-5 h-5" />, tone: 'bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#D97706] dark:text-[#FFCE6B]' },
        { path: '/sentences', label: t(language, 'nav_sentences'), icon: <MessageCircle className="w-5 h-5" />, tone: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' },
        { path: '/search', label: t(language, 'nav_dictionary'), icon: <SearchIcon className="w-5 h-5" />, tone: 'bg-sky-100 dark:bg-sky-950/40 text-sky-500' },
        { path: '/favorites', label: t(language, 'nav_favorites'), icon: <Heart className="w-5 h-5" />, tone: 'bg-rose-100 dark:bg-rose-950/40 text-rose-500' },
      ];

  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-12 max-w-5xl mx-auto space-y-6 relative selection:bg-brand/20">
      <AnimatePresence>
        {needsOnboarding && <OnboardingFlow onComplete={() => undefined} />}
      </AnimatePresence>

      {showStreakConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={160}
        />
      )}

      {/* Primary Hero Split: Continue Learning CTA + Daily Goal & Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Hero Card with Primary Continue Learning CTA */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-6 shadow-flat relative overflow-hidden flex flex-col justify-between gap-5">
          <SunMark className="absolute -end-10 -top-10 w-44 h-44 text-[var(--kq-gold)] opacity-[0.08] pointer-events-none" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              {isKidsMode && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  {t(language, 'kids_ad_free_badge')}
                </span>
              )}
              <h1 className="font-display text-3xl lg:text-4xl font-black text-ink tracking-tight leading-tight">
                {labels.greeting}
              </h1>
              <p className="text-sm text-muted font-semibold mt-1">{labels.subtitle}</p>
            </div>

            {!isKidsMode && (
              <button
                type="button"
                onClick={logout}
                aria-label={t(language, 'logout')}
                className="min-w-[44px] min-h-[44px] bg-white dark:bg-slate-900 font-sans text-muted hover:text-danger rounded-xl transition-colors cursor-pointer border border-line-soft dark:border-slate-700 flex items-center justify-center shrink-0"
                title={t(language, 'logout')}
              >
                <LogOut className="w-4 h-4 rtl:-scale-x-100" />
              </button>
            )}
          </div>

          {/* Primary Hero CTA: Continue Learning */}
          {nextLessonData && (
            <button
              type="button"
              data-tour="next-lesson"
              onClick={() => navigate(`/quiz/${nextLessonData.lesson.id}`)}
              className="relative z-10 w-full text-start bg-[var(--kq-gold)] hover:bg-[var(--kq-gold-hover)] text-[var(--kq-gold-on)] rounded-2xl p-4 sm:p-5 flex justify-between items-center gap-4 shadow-[0_3px_0_var(--kq-gold-dark)] transition-all cursor-pointer group"
            >
              <div className="min-w-0 space-y-0.5">
                <span className="text-xs font-extrabold uppercase tracking-wider opacity-80 block">
                  {labels.continueLearning} · {nextLessonData.level.id}
                </span>
                <div className="text-lg sm:text-xl font-black truncate leading-tight">
                  {getLessonTitle(nextLessonData.lesson, language)}
                </div>
                <div className="text-xs font-bold opacity-85 flex items-center gap-1.5">
                  <span className="truncate">{getLevelTitle(nextLessonData.level, language)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums shrink-0">+{nextLessonData.lesson.xpReward} XP</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform rtl:-scale-x-100">
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </div>
            </button>
          )}

          {/* Daily Kurdish proverb (Adults Mode) */}
          {!isKidsMode && (
            <div className="relative z-10 pt-3 border-t border-line dark:border-slate-800 flex items-start gap-2.5">
              <SunMark className="w-4 h-4 text-[var(--kq-gold)] shrink-0 mt-1" />
              <div className="min-w-0">
                <div className="font-display text-sm font-bold text-ink italic leading-relaxed">
                  <bdi dir="ltr">“ {MOTIVATIONAL_QUOTES[quoteIdx].ku} ”</bdi>
                </div>
                <div className="text-xs text-muted font-semibold leading-relaxed mt-0.5">
                  {pickLocalized(language, MOTIVATIONAL_QUOTES[quoteIdx])}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Daily Goal & 7-Day Streak Stack */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div
            data-tour="daily-goal"
            className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 shadow-flat space-y-4"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    dailyGoalReached
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600'
                      : 'bg-[var(--kq-surface-2)] text-[var(--kq-gold-text)]'
                  }`}
                >
                  {dailyGoalReached ? <Trophy className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-muted leading-none">{t(language, 'goal_modal_title')}</h4>
                  <div className="font-black text-base text-ink mt-1.5 leading-tight tabular-nums">
                    {dailyGoalReached ? (
                      t(language, 'goal_reached')
                    ) : (
                      <>
                        <span className="whitespace-nowrap">
                          {xpTodaySafe} / {dailyGoalTarget}
                        </span>{' '}
                        {t(language, 'goal_today_suffix')}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {!isKidsMode && (
                <button
                  type="button"
                  onClick={() => setIsDailyGoalOpen(true)}
                  className="shrink-0 min-h-[44px] px-4 rounded-xl bg-[var(--kq-surface-2)] text-[var(--kq-gold-text)] border border-[var(--kq-gold)]/40 font-extrabold text-xs cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {t(language, 'goal_adjust')}
                </button>
              )}
            </div>

            <div
              className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden"
              dir="ltr"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={dailyGoalTarget}
              aria-valuenow={Math.min(xpTodaySafe, dailyGoalTarget)}
            >
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  dailyGoalReached ? 'bg-emerald-500' : 'bg-[var(--kq-gold)]'
                }`}
                style={{ width: `${Math.min(100, Math.round((xpTodaySafe / dailyGoalTarget) * 100))}%` }}
              />
            </div>

            {/* 7-day streak dots */}
            <div className="flex items-center justify-between gap-1.5 pt-1">
              {weekDays.map((d) => (
                <div key={d.id} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                      d.isActive
                        ? 'bg-orange-500 text-white'
                        : d.isToday
                          ? 'bg-[var(--kq-surface-2)] text-[var(--kq-gold-text)] border border-[var(--kq-gold)]'
                          : 'bg-slate-100 dark:bg-slate-800 text-muted'
                    }`}
                  >
                    {d.isActive ? <Flame className="w-4 h-4 fill-white" /> : d.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SM-2 Smart Review Card (Surfaces prominently when cards are due) */}
          {dueReviewCount > 0 && (
            <button
              type="button"
              onClick={() => navigate('/quiz/srs_review')}
              className="bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-5 flex items-center justify-between gap-4 text-start hover:border-emerald-400 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-black text-emerald-900 dark:text-emerald-100">
                    {t(language, 'smart_review_title')}
                  </div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">
                    {labels.reviewDue}
                  </div>
                </div>
              </div>
              <span className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold whitespace-nowrap">
                {t(language, 'smart_review_cta')}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Middle Two-Column Grid: Level Progress + Word of the Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 shadow-flat relative overflow-hidden">
          <div className="flex justify-between items-end mb-4 relative z-10">
            <div>
              <span className="text-xs font-bold text-muted">{labels.studentLevel}</span>
              <h3 className="text-3xl font-black text-ink mt-1 leading-none tracking-tight tabular-nums">
                {t(language, 'level')} {safeUserData.level}
              </h3>
            </div>
            <div className="text-end">
              <span className="text-xs text-muted block font-bold">{t(language, 'total_xp')}</span>
              <span className="text-2xl font-black text-ink tabular-nums">{safeUserData.xp} XP</span>
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden relative" dir="ltr">
            <div
              className="bg-[var(--kq-gold)] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${levelProgress.percent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2.5 text-xs text-muted font-bold font-mono tabular-nums">
            <span>
              {levelProgress.xpIntoLevel}/{levelProgress.xpForThisLevel} XP
            </span>
            <span>
              {levelProgress.xpToNextLevel} {t(language, 'xp_to_next')}
            </span>
          </div>
        </div>

        {dailyWord && (
          <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between gap-3.5 shadow-flat">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-muted">{t(language, 'daily_word')}</span>
              <button
                type="button"
                onClick={toggleDailyWordFav}
                aria-label={isDailyWordFav ? labels.favRemove : labels.favAdd}
                aria-pressed={isDailyWordFav}
                className="min-w-[44px] min-h-[44px] -my-2 -me-2 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isDailyWordFav ? 'text-rose-500 fill-rose-500' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center gap-3 z-10">
              <div className="space-y-1 min-w-0">
                <div className="text-2xl font-black text-ink leading-tight">
                  <bdi>{dailyWord.ku}</bdi>
                </div>
                <div className="text-muted font-semibold text-sm">
                  <bdi>
                    {pickLocalized(language, {
                      en: dailyWord.en,
                      ar: dailyWord.ar,
                      ku: `${dailyWord.en} · ${dailyWord.ar}`,
                    })}
                  </bdi>
                </div>
              </div>
              <AudioButton
                audioUrl={dailyWord.audio}
                textToSpeak={dailyWord.ku}
                className="bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#B8860B] dark:text-[#FFCE6B] hover:bg-[#FFE7B3] border-none cursor-pointer shrink-0"
              />
            </div>
          </div>
        )}
      </div>

      {/* Adaptive Quick Access Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-ink px-1">{labels.explore}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl p-4 min-h-[60px] flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFB300]"
            >
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.tone}`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="font-extrabold text-sm text-ink leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={isDailyGoalOpen}
        onClose={() => setIsDailyGoalOpen(false)}
        variant="sheet"
        title={labels.studyGoal}
        description={t(language, 'daily_goal_desc')}
        closeLabel={labels.close}
      >
        <div className="space-y-3">
          {[
            { xp: 20, emoji: '☕', title: t(language, 'onb_goal_casual'), desc: t(language, 'onb_goal_casual_desc') },
            { xp: 50, emoji: '📅', title: t(language, 'onb_goal_regular'), desc: t(language, 'onb_goal_regular_desc') },
            { xp: 100, emoji: '🔥', title: t(language, 'onb_goal_serious'), desc: t(language, 'onb_goal_serious_desc') },
          ].map((tier) => {
            const active = dailyGoalTarget === tier.xp;
            return (
              <button
                key={tier.xp}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  void updateUserData({ dailyGoalXp: tier.xp });
                  try {
                    localStorage.setItem(
                      'kurdish_quest_daily_goal_mins',
                      String(tier.xp === 20 ? 5 : tier.xp === 100 ? 15 : 10),
                    );
                  } catch {
                    /* ignore */
                  }
                  setIsDailyGoalOpen(false);
                }}
                className={`w-full p-4 rounded-3xl border-2 flex items-center gap-3.5 transition-all cursor-pointer text-start bg-white dark:bg-slate-900 ${
                  active
                    ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14] shadow-[0_4px_20px_rgba(255,179,0,0.15)]'
                    : 'border-line-soft hover:border-[#FFB300]/50'
                }`}
              >
                <span className="text-2xl select-none" aria-hidden="true">
                  {tier.emoji}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-black text-sm text-ink">{tier.title}</span>
                  <span className="block text-xs text-muted font-semibold mt-0.5">{tier.desc}</span>
                </span>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    active ? 'bg-[#FFB300]' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                  aria-hidden="true"
                >
                  {active && <CheckCircle2 className="w-4 h-4 text-[#432C00]" />}
                </span>
              </button>
            );
          })}
        </div>
      </Modal>

      {/* Automatically returns null in Kids Mode */}
      <AdBanner />
    </div>
  );
}
