import { useAuth } from '../store/AuthContext';
import type { UserData } from '../models/user';
import { LogOut, Trophy, Flame, Star, ChevronRight, Clock, Sparkles, BookOpen, MessageCircle, Library, MessageSquare, Rocket, GraduationCap, Search as SearchIcon, Heart, Medal, RotateCcw, Brain, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { t } from '../localization/translations';
import { academicVocabulary } from '../data/academic';
import { AudioButton } from '../features/audio/components/AudioButton';
import { useState, useEffect, useRef } from 'react';
import { OnboardingFlow } from '../components/OnboardingFlow';
import { learningPath, CEFRLevel, Lesson } from '../data/learningPath';
import { getLevelProgress } from '../services/GamificationService';
import { countDue } from '../services/SpacedRepetitionService';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { AdBanner } from '../features/monetization/components/AdElements';
import { Modal, Spinner, ErrorState } from '../components/ui';
import { SunMark } from '../components/ui/SunMark';
import { cn } from '../utils/cn';
import { useAppTour } from '../features/tour/useAppTour';
import {
  WELCOME_TOUR_ID,
  TOUR_CHAIN_STORAGE_KEY,
  buildWelcomeTourSteps,
  shouldAutoStartWelcomeTour,
} from '../features/tour/tours';

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const MOTIVATIONAL_QUOTES = [
  { ku: "Hêdî hêdî karkerî, fêr bûn e.", translationEn: "Step by step, practicing leads to language mastery.", translationAr: "خطوة بخطوة، التدريب والاجتهاد يقود لإتقان اللغة." },
  { ku: "Zimanê dayîkî, kaniya çand û nasnameyê ye.", translationEn: "Our mother tongue is the fountain of culture and identity.", translationAr: "اللغة الأم هي نبع الهوية والثقافة الأصيل." },
  { ku: "Her rojek nû, fersendek nû ye bo fêrbûnê.", translationEn: "Every new day brings a fresh milestone to learn.", translationAr: "كل يوم جديد يجلب معه فرصة واعدة للتعلم والتقدم." },
  { ku: "Zimanê xwe winda meke, ew rûmeta te ye.", translationEn: "Never lose grasp of your tongue; it represents your heritage.", translationAr: "لا تفرط بلسانك وجذورك الكوردية؛ فهي مبعث فخرك." }
];

export function Dashboard() {
  const { userData, logout, user, language, updateUserData, loading, profileError, retryProfileLoad } = useAuth();
  const navigate = useNavigate();
  const [dailyWord, setDailyWord] = useState(academicVocabulary[0]);
  
  const [isGoalReached, setIsGoalReached] = useState(false);
  const [isDailyGoalOpen, setIsDailyGoalOpen] = useState(false);
  const [showStreakConfetti, setShowStreakConfetti] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);

  // TIMER SAFETY (TODO-028): celebration timers are tracked and cleared on
  // unmount so leaving the Dashboard mid-celebration can't fire ghost
  // setState calls 7s later.
  const confettiTimerRef = useRef<number | null>(null);
  const sparksTimerRef = useRef<number | null>(null);
  useEffect(() => () => {
    if (confettiTimerRef.current !== null) window.clearTimeout(confettiTimerRef.current);
    if (sparksTimerRef.current !== null) window.clearTimeout(sparksTimerRef.current);
  }, []);

  // Monitor responsive window changes for accurate confetti coverage
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

  // GUIDED TOUR (Driver.js): auto-start the welcome walkthrough for genuinely
  // fresh accounts (once the onboarding wizard is out of the way), or when a
  // replay was armed from Profile → Settings via the session chain flag.
  const { startTour } = useAppTour();
  const tourAttemptedRef = useRef(false);
  useEffect(() => {
    if (loading || !userData || userData.isOnboarded === false) return;
    if (tourAttemptedRef.current) return;
    let forcedReplay = false;
    try {
      forcedReplay = sessionStorage.getItem(TOUR_CHAIN_STORAGE_KEY) === 'welcome';
    } catch {
      forcedReplay = false;
    }
    if (!forcedReplay && !shouldAutoStartWelcomeTour(userData)) return;
    // Debounced start: early profile writes (streak check, mission counters)
    // re-run this effect and clear the pending timer; the ref is only set
    // once the timer actually fires, so the tour launches when the
    // dashboard has settled for 800ms — not never.
    const timer = window.setTimeout(() => {
      if (tourAttemptedRef.current) return;
      tourAttemptedRef.current = true;
      if (forcedReplay) {
        try { sessionStorage.removeItem(TOUR_CHAIN_STORAGE_KEY); } catch { /* best effort */ }
      }
      startTour({
        tourId: WELCOME_TOUR_ID,
        steps: buildWelcomeTourSteps(language),
        onFinishedAction: () => {
          // Hand over to the roadmap leg once the learner taps the nav tab.
          try { sessionStorage.setItem(TOUR_CHAIN_STORAGE_KEY, 'roadmap'); } catch { /* best effort */ }
        },
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [loading, userData, language, startTour]);

  // Celebrate once per session when the XP daily goal is crossed
  useEffect(() => {
    const goal = userData?.dailyGoalXp || 50;
    const today = new Date().toISOString().slice(0, 10);
    const earned = userData?.xpTodayDate === today ? (userData?.xpToday || 0) : 0;
    handleGoalReachedChange(earned >= goal, earned >= goal);
    // (deps intentionally narrowed — see comment above)
  }, [userData?.xpToday, userData?.xpTodayDate, userData?.dailyGoalXp]);

  const handleGoalReachedChange = (reached: boolean, newlyReached: boolean) => {
    setIsGoalReached(reached);
    
    if (reached && newlyReached) {
      // Check if confetti was already celebrated in this browser session
      const alreadyCelebratedThisSession = sessionStorage.getItem('kurdish_quest_daily_goal_celebrated_session');
      
      if (!alreadyCelebratedThisSession) {
        // Tag session state to ensure we only celebrate once
        sessionStorage.setItem('kurdish_quest_daily_goal_celebrated_session', 'true');

        // Trigger beautiful canvas-confetti cascade
        setShowStreakConfetti(true);
        if (confettiTimerRef.current !== null) window.clearTimeout(confettiTimerRef.current);
        confettiTimerRef.current = window.setTimeout(() => {
          confettiTimerRef.current = null;
          setShowStreakConfetti(false);
        }, 7000);

        // Trigger dynamic interactive sparks explosion
        const newSparks = Array.from({ length: 30 }).map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 80 + 30;
          return {
            id: Date.now() + i,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance - 15,
            size: Math.random() * 8 + 4,
            color: ['#ff4500', '#ff8c00', '#ffd700', '#ff3300', '#ffa500'][Math.floor(Math.random() * 5)],
          };
        });
        setSparks(newSparks);
        if (sparksTimerRef.current !== null) window.clearTimeout(sparksTimerRef.current);
        sparksTimerRef.current = window.setTimeout(() => {
          sparksTimerRef.current = null;
          setSparks([]);
        }, 1250);
      }
    }
  };

  useEffect(() => {
    // Deterministic random word based on the date
    const today = new Date().toISOString().split('T')[0];
    const index = today.split('-').reduce((acc, val) => acc + parseInt(val), 0) % academicVocabulary.length;
    setDailyWord(academicVocabulary[index]);

    const quoteIndex = today.split('-').reduce((acc, val) => acc + parseInt(val), 0) % MOTIVATIONAL_QUOTES.length;
    setQuoteIdx(quoteIndex);
  }, []);

  if (loading && !userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner
          size="lg"
          label={language !== 'ar' ? 'Loading your profile...' : 'جاري تحميل الملف الشخصي...'}
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
    streakFreezes: 1,
    lastActiveDate: '',
    lastActive: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    recentSearches: [],
    favorites: [],
    wrongAnswersHistory: [],
    reviewDeck: {}
  };

  // Verify if onboarding wizard is completed
  const needsOnboarding = safeUserData.isOnboarded === false;

  // AUDIT FIX: the bar used `xp % 100`, which is unrelated to the exponential
  // level curve. A level-4 player on 500 XP saw "0/100 XP" and an empty bar.
  // getLevelProgress() is derived from the same thresholds used to award levels.
  const levelProgress = getLevelProgress(safeUserData.xp || 0);
  const currentLevelXP = levelProgress.xpIntoLevel;
  const progressPercent = levelProgress.percent;
  // Daily goal (XP-based): today's tally is only valid for today's date.
  const todayUtc = new Date().toISOString().slice(0, 10);
  const xpTodaySafe = safeUserData.xpTodayDate === todayUtc ? (safeUserData.xpToday || 0) : 0;
  const dailyGoalTarget = safeUserData.dailyGoalXp || 50;
  const dailyGoalReached = xpTodaySafe >= dailyGoalTarget;

  // Logic to find recommended next incomplete lesson
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
    // Return first lesson as fallback
    if (learningPath.length > 0 && learningPath[0].lessons.length > 0) {
      return { lesson: learningPath[0].lessons[0], level: learningPath[0] };
    }
    return null;
  };

  const nextLessonData = getDashboardRecommendedLesson();

  const handleCompleteOnboarding = async () => {
    // Re-sync occurs automatically due to React Context state flow
  };

  // Helper to generate the past 7 days for the streak calendar
  const generateStreakCalendar = () => {
    const today = new Date();
    const days = [];
    const lastActiveDateObj = safeUserData.lastActiveDate ? new Date(safeUserData.lastActiveDate + 'T00:00:00Z') : null;
    const currentStreak = safeUserData.streak || 0;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const diffToLastActive = safeUserData.lastActiveDate ? 
      Math.floor(Math.abs(new Date(todayStr + 'T00:00:00Z').getTime() - lastActiveDateObj!.getTime()) / (1000 * 60 * 60 * 24)) : 0;
      
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayLabel = language !== 'ar' ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()] : ['أ', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'][date.getDay()];
      
      const isActive = currentStreak > 0 && i >= diffToLastActive && i < diffToLastActive + currentStreak;
      
      days.push({ id: i, label: dayLabel, isActive, isToday: i === 0 });
    }
    return days;
  };
  const weekDays = generateStreakCalendar();

  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-12 max-w-5xl mx-auto space-y-6 relative selection:bg-brand/20">
      
      {/* Onboarding Wizard Overlay (Only shown if isOnboarded is false) */}
      <AnimatePresence>
        {needsOnboarding && (
          <OnboardingFlow onComplete={handleCompleteOnboarding} />
        )}
      </AnimatePresence>

      {/* Confetti celebration */}
      {showStreakConfetti && (
        <Confetti 
          width={windowDimensions.width} 
          height={windowDimensions.height} 
          recycle={false} 
          numberOfPieces={185} 
        />
      )}

      {/* Top Two-Column Desktop Split: Hero + Primary Action / Daily Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* 1. Hero welcome card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-6 shadow-flat relative overflow-hidden flex flex-col justify-between">
          <SunMark className="absolute -end-10 -top-10 w-44 h-44 text-[#FFB300] opacity-[0.08] pointer-events-none" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-display text-3xl lg:text-4xl font-black text-ink tracking-tight leading-tight">
                {language === 'ar' ? 'سرْكفْتِن !' : 'Serkeftin!'}
              </h1>
              <p className="text-sm text-muted font-semibold mt-1.5">
                {language === 'ku'
                  ? 'Îro ji bo fêrbûna Kurmancî amade yî?'
                  : language === 'ar'
                    ? 'جاهز لتعلم الكورمانجية اليوم؟'
                    : 'Ready for Kurmanji today?'}
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              aria-label={t(language, 'logout')}
              className="min-w-[44px] min-h-[44px] bg-white dark:bg-slate-900 font-sans text-muted hover:text-danger rounded-xl transition-colors cursor-pointer border border-line-soft dark:border-slate-700 flex items-center justify-center shrink-0"
              title={t(language, 'logout')}
            >
              <LogOut className="w-4 h-4 rtl:-scale-x-100" />
            </button>
          </div>

          {/* Daily Kurdish proverb */}
          <div className="relative z-10 mt-5 pt-4 border-t border-line dark:border-slate-800 flex items-start gap-2.5">
            <SunMark className="w-4 h-4 text-[#FFB300] shrink-0 mt-1" />
            <div className="min-w-0">
              <div className="font-display text-sm font-bold text-ink italic leading-relaxed">
                <bdi dir="ltr">“ {MOTIVATIONAL_QUOTES[quoteIdx].ku} ”</bdi>
              </div>
              <div className="text-xs text-muted font-semibold leading-relaxed mt-0.5">
                {language !== 'ar' ? MOTIVATIONAL_QUOTES[quoteIdx].translationEn : MOTIVATIONAL_QUOTES[quoteIdx].translationAr}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Daily Goal & Up Next Stack */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div data-tour="daily-goal" className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 shadow-flat relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${dailyGoalReached ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600' : 'bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#B8860B] dark:text-[#FFCE6B]'}`}>
                  {dailyGoalReached ? <Trophy className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-muted leading-none">{t(language, 'goal_modal_title')}</h4>
                  <div className="font-black text-base text-ink mt-1.5 leading-tight tabular-nums">
                    {dailyGoalReached
                      ? t(language, 'goal_reached')
                      : <><span className="whitespace-nowrap">{xpTodaySafe} / {dailyGoalTarget}</span> {t(language, 'goal_today_suffix')}</>}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDailyGoalOpen(true)}
                className="shrink-0 min-h-[44px] px-4 rounded-xl bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] border border-[#FFB300]/40 font-extrabold text-xs cursor-pointer hover:bg-[#FFE7B3] transition-colors whitespace-nowrap"
              >
                {t(language, 'goal_adjust')}
              </button>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden" dir="ltr" role="progressbar" aria-valuemin={0} aria-valuemax={dailyGoalTarget} aria-valuenow={Math.min(xpTodaySafe, dailyGoalTarget)}>
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${dailyGoalReached ? 'bg-emerald-500' : 'bg-[#FFB300]'}`}
                style={{ width: `${Math.min(100, Math.round((xpTodaySafe / dailyGoalTarget) * 100))}%` }}
              />
            </div>
          </div>

          {nextLessonData && (
            <button
              type="button"
              data-tour="next-lesson"
              onClick={() => navigate(`/quiz/${nextLessonData.lesson.id}`)}
              className="flex-1 text-start bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 flex justify-between items-center gap-4 shadow-flat relative overflow-hidden group cursor-pointer hover:border-[#FFB300]/60 transition-colors"
            >
              <div className="space-y-1 z-10 min-w-0">
                <span className="text-xs text-[#8A6100] dark:text-[#FFCE6B] font-extrabold">
                  {language === 'ku' ? 'Dersa Pêş' : language === 'ar' ? 'التالي لك' : 'Up Next'}
                </span>
                <h4 className="text-lg font-black text-ink pt-0.5 truncate">
                  {language !== 'ar' ? nextLessonData.lesson.titleEn : nextLessonData.lesson.titleAr}
                </h4>
                <p className="text-xs text-muted font-semibold flex items-center gap-1.5 mt-1">
                  <span>{nextLessonData.level.title}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#8A6100] dark:text-[#FFCE6B] font-bold tabular-nums">+{nextLessonData.lesson.xpReward} XP</span>
                </p>
              </div>

              <div className="w-11 h-11 bg-[#FFB300] text-[#432C00] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform rtl:-scale-x-100 shrink-0">
                <ChevronRight className="w-5 h-5 stroke-[2.75]" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Middle Two-Column Grid: Level Progress + Word of the Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 shadow-flat relative overflow-hidden">
          <div className="flex justify-between items-end mb-4 relative z-10">
            <div>
              <span className="text-xs font-bold text-muted">
                {language === 'ku' ? 'Asta Fêrxwazî' : language === 'ar' ? 'المستوى الأكاديمي' : 'Student Level'}
              </span>
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
              className="bg-[#FFB300] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2.5 text-xs text-muted font-bold font-mono tabular-nums">
            <span>{currentLevelXP}/{levelProgress.xpForThisLevel} XP</span>
            <span>{levelProgress.xpToNextLevel} {t(language, 'xp_to_next')}</span>
          </div>
        </div>

        {dailyWord && (
          <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between gap-3.5 shadow-flat">
            <div className="text-xs font-bold text-muted">{t(language, 'daily_word')}</div>
            <div className="flex justify-between items-center gap-3 z-10">
              <div className="space-y-1 min-w-0">
                <div className="text-2xl font-black text-ink leading-tight"><bdi>{dailyWord.ku}</bdi></div>
                <div className="text-muted font-semibold text-sm"><bdi>{language !== 'ar' ? dailyWord.en : dailyWord.ar}</bdi></div>
              </div>
              <AudioButton audioUrl={dailyWord.audio} textToSpeak={dailyWord.ku} className="bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#B8860B] dark:text-[#FFCE6B] hover:bg-[#FFE7B3] border-none cursor-pointer shrink-0" />
            </div>
          </div>
        )}
      </div>

      {/* Explore Grid: 2 cols mobile, 4 cols tablet/desktop */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-ink px-1">
          {language === 'ku' ? 'Keşf Bike' : language === 'ar' ? 'استكشف' : 'Explore'}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { path: '/vocabulary', label: t(language, 'module_vocab'), icon: <Library className="w-5 h-5" />, tone: 'bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#D97706] dark:text-[#FFCE6B]' },
            { path: '/sentences', label: t(language, 'nav_sentences'), icon: <MessageCircle className="w-5 h-5" />, tone: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' },
            { path: '/search', label: t(language, 'nav_dictionary'), icon: <SearchIcon className="w-5 h-5" />, tone: 'bg-sky-100 dark:bg-sky-950/40 text-sky-500' },
            { path: '/favorites', label: t(language, 'nav_favorites'), icon: <Heart className="w-5 h-5" />, tone: 'bg-rose-100 dark:bg-rose-950/40 text-rose-500' },
          ].map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl p-4 min-h-[56px] flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFB300]"
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.tone}`} aria-hidden="true">
                {item.icon}
              </span>
              <span className="font-extrabold text-sm text-ink leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>



      {/*
        PHASE 1 FIX: this sheet was a hand-rolled overlay with no role="dialog",
        no aria-modal, no focus trap, no Escape handling and no focus
        restoration — the exact defect already fixed elsewhere via the Modal
        primitive. It now reuses that primitive.
      */}
      <Modal
        open={isDailyGoalOpen}
        onClose={() => setIsDailyGoalOpen(false)}
        variant="sheet"
        title={language !== 'ar' ? 'Study Goal' : 'الهدف اليومي للدراسة'}
        description={t(language, 'daily_goal_desc')}
        closeLabel={language !== 'ar' ? 'Close' : 'إغلاق'}
      >
        <div className="space-y-3">
          {[
            { xp: 20, emoji: '☕', title: t(language, 'onb_goal_casual'), desc: t(language, 'onb_goal_casual_desc') },
            { xp: 50, emoji: '📅', title: t(language, 'onb_goal_regular'), desc: t(language, 'onb_goal_regular_desc') },
            { xp: 100, emoji: '🔥', title: t(language, 'onb_goal_serious'), desc: t(language, 'onb_goal_serious_desc') },
          ].map(tier => {
            const active = dailyGoalTarget === tier.xp;
            return (
              <button
                key={tier.xp}
                type="button"
                onClick={() => {
                  // Save instantly; keep the sheet open so the choice is visible.
                  void updateUserData({ dailyGoalXp: tier.xp });
                  try { localStorage.setItem('kurdish_quest_daily_goal_mins', String(tier.xp === 20 ? 5 : tier.xp === 100 ? 15 : 10)); } catch {}
                }}
                className={`w-full p-4 rounded-3xl border-2 flex items-center gap-3.5 transition-all cursor-pointer text-start bg-white dark:bg-slate-900 ${
                  active
                    ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14] shadow-[0_4px_20px_rgba(255,179,0,0.15)]'
                    : 'border-line-soft hover:border-[#FFB300]/50'
                }`}
              >
                <span className="text-2xl select-none" aria-hidden="true">{tier.emoji}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-black text-sm text-ink">{tier.title}</span>
                  <span className="block text-xs text-muted font-semibold mt-0.5">{tier.desc}</span>
                </span>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${active ? 'bg-[#FFB300]' : 'bg-slate-100 dark:bg-slate-800'}`} aria-hidden="true">
                  {active && <CheckCircle2 className="w-4 h-4 text-[#432C00]" />}
                </span>
              </button>
            );
          })}
        </div>
      </Modal>

      <AdBanner />
    </div>
  );
}
