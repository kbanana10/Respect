/**
 * OnboardingFlow.tsx — 3-Step Kids + Adults Adaptive Onboarding with 60-Second First Win.
 *
 *   1. Learner Mode (Kids 5–12 vs Adults 13+) — with compact header language toggle
 *   2. Avatar & Starting Point (Kids -> Unit 0; Adults -> Level + Daily Goal)
 *   3. 60-Second First Win ("Silav!") — listen, tap the right meaning, celebrate & enter Home
 */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout, MessageCircle, Rocket, Coffee, CalendarCheck, Flame as FlameIcon,
  ChevronRight, Check, User as UserIcon, Smile, GraduationCap, Flame,
  Sparkles, Star, Compass, Award, Globe, ShieldCheck, PartyPopper,
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { t, pickLocalized, getLayoutDirection } from '../localization/translations';
import { AVATARS } from '../constants/appConstants';
import { OptionRow } from './ui';
import { AudioButton } from '../features/audio/components/AudioButton';
import { playSuccessSound } from '../features/audio/hooks/useAudio';
import type { Language, LearnerMode } from '../models/user';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const AVATAR_ICONS = {
  user: UserIcon,
  smile: Smile,
  'graduation-cap': GraduationCap,
  flame: Flame,
  sparkles: Sparkles,
  star: Star,
  compass: Compass,
  award: Award,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

const AVATAR_LABELS = {
  'av-1': { en: 'Explorer', ar: 'مستكشف', ku: 'Lêger' },
  'av-2': { en: 'Happy Friend', ar: 'صديق سعيد', ku: 'Hevalê Kêfxweş' },
  'av-3': { en: 'Scholar', ar: 'طالب علم', ku: 'Xwendekar' },
  'av-4': { en: 'Flame Runner', ar: 'شعلة الحماس', ku: 'Agirê Hêzê' },
  'av-5': { en: 'Starlight', ar: 'نجمة مضيئة', ku: 'Stêrka Geş' },
  'av-6': { en: 'Golden Star', ar: 'نجم ذهبي', ku: 'Stêrka Zêrîn' },
  'av-7': { en: 'Navigator', ar: 'رحّالة', ku: 'Rêwî' },
  'av-8': { en: 'Champion', ar: 'بطل', ku: 'Şampiyon' },
} satisfies Record<string, { en: string; ar: string; ku: string }>;

const TOTAL_STEPS = 3;
const HEADER_LANGS: readonly Language[] = ['en', 'ku', 'ar'];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { language, setLanguage, updateUserData, userData } = useAuth();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [learnerMode, setLearnerMode] = useState<LearnerMode>('adults');
  const [level, setLevel] = useState<'beginner' | 'elementary' | 'conversational'>('beginner');
  const [goalXp, setGoalXp] = useState<number>(50);
  const [avatarId, setAvatarId] = useState<string>(AVATARS[0].id);

  // Step 3: 60-Second First Win state ("Silav!")
  const [pickedGreeting, setPickedGreeting] = useState<string | null>(null);
  const [firstWinSolved, setFirstWinSolved] = useState(false);

  const isKids = learnerMode === 'kids';

  const LEVELS = [
    {
      id: 'beginner' as const,
      icon: <Sprout className="w-5 h-5" />,
      tone: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600',
      title: t(language, 'onb_level_beginner'),
      desc: t(language, 'onb_level_beginner_desc'),
    },
    {
      id: 'elementary' as const,
      icon: <MessageCircle className="w-5 h-5" />,
      tone: 'bg-sky-100 dark:bg-sky-950/40 text-sky-500',
      title: t(language, 'onb_level_basics'),
      desc: t(language, 'onb_level_basics_desc'),
    },
    {
      id: 'conversational' as const,
      icon: <Rocket className="w-5 h-5" />,
      tone: 'bg-purple-100 dark:bg-purple-950/40 text-purple-600',
      title: t(language, 'onb_level_intermediate'),
      desc: t(language, 'onb_level_intermediate_desc'),
    },
  ];

  const GOALS = [
    {
      xp: 20,
      icon: <Coffee className="w-5 h-5" />,
      tone: 'bg-sky-100 dark:bg-sky-950/40 text-sky-500',
      title: t(language, 'onb_goal_casual'),
      desc: t(language, 'onb_goal_casual_desc'),
    },
    {
      xp: 50,
      icon: <CalendarCheck className="w-5 h-5" />,
      tone: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600',
      title: t(language, 'onb_goal_regular'),
      desc: t(language, 'onb_goal_regular_desc'),
    },
    {
      xp: 100,
      icon: <FlameIcon className="w-5 h-5" />,
      tone: 'bg-orange-100 dark:bg-orange-950/40 text-orange-500',
      title: t(language, 'onb_goal_serious'),
      desc: t(language, 'onb_goal_serious_desc'),
    },
  ];

  const firstWinChoices = [
    {
      id: 'hello',
      correct: true,
      label: pickLocalized(language, { en: 'Hello!', ar: 'مرحباً!', ku: 'Merheba / Silav!' }),
      emoji: '👋',
    },
    {
      id: 'water',
      correct: false,
      label: pickLocalized(language, { en: 'Water', ar: 'ماء', ku: 'Av' }),
      emoji: '💧',
    },
    {
      id: 'sun',
      correct: false,
      label: pickLocalized(language, { en: 'Sun', ar: 'شمس', ku: 'Roj' }),
      emoji: '☀️',
    },
  ];

  const handlePickGreeting = (choiceId: string, correct: boolean) => {
    setPickedGreeting(choiceId);
    if (correct) {
      setFirstWinSolved(true);
      playSuccessSound();
    }
  };

  const finish = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const effectiveGoal = isKids ? 20 : goalXp;
      const mins = effectiveGoal === 20 ? 5 : effectiveGoal === 100 ? 15 : 10;
      try {
        localStorage.setItem('kurdish_quest_daily_goal_mins', String(mins));
      } catch {
        /* ignore */
      }

      const currentXp = userData?.xp ?? 0;
      const currentGems = userData?.gems ?? 100;

      await updateUserData({
        isOnboarded: true,
        learnerMode,
        relaxedTimer: isKids,
        parentalGateEnabled: isKids,
        autoPlayAudio: true,
        onboardingReason: isKids ? 'kids_play' : 'culture',
        onboardingLevel: isKids ? 'beginner' : level,
        dailyGoalXp: effectiveGoal,
        avatarId: avatarId || AVATARS[0].id,
        preferredStartingPath: isKids ? 'U0' : level === 'conversational' ? 'A2' : 'U0',
        xp: currentXp + (firstWinSolved ? 10 : 0),
        gems: currentGems + (firstWinSolved ? 10 : 0),
        wordsLearned: Math.max(userData?.wordsLearned ?? 0, firstWinSolved ? 1 : 0),
      });
      onComplete();
    } finally {
      setSaving(false);
    }
  };

  const stepReady = step === 2 ? firstWinSolved : true;

  const next = () => {
    if (!stepReady || saving) return;
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else void finish();
  };

  const stepMeta = [
    [t(language, 'mode_select_title'), t(language, 'mode_select_subtitle')],
    [
      isKids ? t(language, 'onb_avatar_title') : pickLocalized(language, { en: 'Personalize Your Start', ar: 'خصّص بدايتك', ku: 'Destpêka Xwe Xweser Bike' }),
      isKids
        ? pickLocalized(language, { en: 'Pick a friend! You will start with Hawar Letters & Sounds.', ar: 'اختر شخصيتك! ستبدأ مع أصوات وحروف الهوار.', ku: 'Hevalekî hilbijêre! Tu dê bi tîp û dengên Hawarê dest pê bikî.' })
        : pickLocalized(language, { en: 'Pick your avatar, level & daily pace.', ar: 'اختر شخصيتك ومستواك وهدفك اليومي.', ku: 'Avatar, ast û hedefa xwe ya rojane hilbijêre.' }),
    ],
    [t(language, 'first_win_title'), t(language, 'first_win_listen')],
  ][step];

  return createPortal(
    <motion.div
      dir={getLayoutDirection(language)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-[#FBFBFA] dark:bg-[#141414] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={stepMeta[0]}
    >
      <div className="max-w-md mx-auto min-h-full flex flex-col p-5 pb-8">
        {/* Progress header */}
        <div className="flex items-center gap-3 pt-2 pb-5">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              aria-label={t(language, 'ftux_back')}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-line-soft text-muted hover:text-ink shadow-xs cursor-pointer shrink-0"
            >
              <ChevronRight className="w-5 h-5 rotate-180 rtl:rotate-0" />
            </button>
          ) : (
            <span className="w-11 shrink-0" />
          )}

          <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-extrabold text-muted uppercase tracking-widest">
              <span>
                {t(language, 'onb_step')} {step + 1} / {TOTAL_STEPS}
              </span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                {HEADER_LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    aria-pressed={language === code}
                    onClick={() => setLanguage(code)}
                    className={`px-2 py-0.5 min-h-[26px] rounded-md text-[11px] font-extrabold cursor-pointer transition-colors ${
                      language === code
                        ? 'bg-white dark:bg-slate-700 text-[#8A6100] dark:text-[#FFCE6B] shadow-2xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-ink'
                    }`}
                  >
                    {code === 'en' ? 'EN' : code === 'ku' ? 'KU' : 'عربي'}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" dir="ltr">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#FFC541] to-[#FFA000]"
                animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                transition={{ type: 'spring', stiffness: 160, damping: 24 }}
              />
            </div>
          </div>
          <span className="w-2 shrink-0" />
        </div>

        {/* Step title */}
        <div className="text-center space-y-1.5 pb-5">
          <h2 className="text-[22px] font-black text-ink tracking-tight leading-snug text-balance">
            {stepMeta[0]}
          </h2>
          <p className="text-sm text-muted font-semibold leading-relaxed">{stepMeta[1]}</p>
        </div>

        {/* Step body */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              {/* STEP 0: Learner Mode (Kids vs Adults) */}
              {step === 0 && (
                <>
                  <OptionRow
                    active={learnerMode === 'kids'}
                    onClick={() => setLearnerMode('kids')}
                    icon={<span className="text-2xl">🎈</span>}
                    tone="bg-emerald-100 dark:bg-emerald-950/40"
                    title={t(language, 'mode_kids')}
                    desc={t(language, 'mode_kids_desc')}
                    badge={t(language, 'kids_ad_free_badge')}
                  />
                  <OptionRow
                    active={learnerMode === 'adults'}
                    onClick={() => setLearnerMode('adults')}
                    icon={<Globe className="w-6 h-6" />}
                    tone="bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B]"
                    title={t(language, 'mode_adults')}
                    desc={t(language, 'mode_adults_desc')}
                  />
                </>
              )}

              {/* STEP 1: Avatar + Starting Point */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-extrabold text-muted uppercase tracking-wider mb-2.5 px-1">
                      {t(language, 'onb_avatar_title')}
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      {AVATARS.map((av) => {
                        const iconLookup = new Map<string, React.ComponentType<{ className?: string }>>(
                          Object.entries(AVATAR_ICONS),
                        );
                        const labelLookup = new Map<string, { en: string; ar: string; ku: string }>(
                          Object.entries(AVATAR_LABELS),
                        );
                        const Icon = iconLookup.get(av.icon) ?? UserIcon;
                        const labelEntry = labelLookup.get(av.id) ?? AVATAR_LABELS['av-1'];
                        const active = avatarId === av.id;
                        return (
                          <button
                            key={av.id}
                            type="button"
                            onClick={() => setAvatarId(av.id)}
                            aria-label={pickLocalized(language, labelEntry)}
                            aria-pressed={active}
                            className={`aspect-square rounded-3xl flex items-center justify-center transition-all cursor-pointer border-2 ${av.color} ${
                              active
                                ? 'border-[#FFB300] scale-105 shadow-[0_6px_18px_rgba(255,179,0,0.3)]'
                                : 'border-transparent opacity-80 hover:opacity-100'
                            }`}
                          >
                            <Icon className="w-8 h-8" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isKids ? (
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-4 flex items-center gap-3">
                      <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-100 leading-relaxed">
                        {pickLocalized(language, {
                          en: 'Kids Mode starts at Unit 0 (Hawar Letters & Greetings) with 100% ad-free protection and a Grown-up Check for settings.',
                          ar: 'يبدأ وضع الأطفال من الوحدة 0 (حروف الهوار والتحيات) مع حماية كاملة بدون إعلانات وقفل لأولياء الأمور على الإعدادات.',
                          ku: 'Moda Zarokan ji Yekîneya 0 (Tîpên Hawar û Silav) dest pê dike, %100 bê reklam û bi kontrola mezinan.',
                        })}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <p className="text-xs font-extrabold text-muted uppercase tracking-wider px-1">
                          {t(language, 'onb_level_title')}
                        </p>
                        {LEVELS.map((o) => (
                          <OptionRow
                            key={o.id}
                            active={level === o.id}
                            onClick={() => setLevel(o.id)}
                            icon={o.icon}
                            tone={o.tone}
                            title={o.title}
                            desc={o.desc}
                          />
                        ))}
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-extrabold text-muted uppercase tracking-wider px-1">
                          {t(language, 'onb_goal_title')}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {GOALS.map((g) => {
                            const active = goalXp === g.xp;
                            return (
                              <button
                                key={g.xp}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setGoalXp(g.xp)}
                                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                                  active
                                    ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14]'
                                    : 'border-line-soft dark:border-slate-800 bg-white dark:bg-slate-900'
                                }`}
                              >
                                <div className="font-black text-sm text-ink">{g.title}</div>
                                <div className="text-[11px] font-bold text-muted mt-0.5 tabular-nums">{g.xp} XP</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STEP 2: 60-Second First Win ("Silav!") */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-6 text-center shadow-flat space-y-3">
                    <span className="text-5xl block select-none" aria-hidden="true">
                      👋
                    </span>
                    <div className="text-3xl font-black text-ink tracking-tight" dir="ltr">
                      Silav!
                    </div>
                    <div className="flex justify-center">
                      <AudioButton
                        textToSpeak="Silav"
                        className="bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B]"
                      />
                    </div>
                  </div>

                  <p className="text-sm font-black text-ink text-center pt-1">
                    {t(language, 'first_win_pick')}
                  </p>

                  <div className="space-y-2.5">
                    {firstWinChoices.map((choice) => {
                      const isPicked = pickedGreeting === choice.id;
                      const showWrong = isPicked && !choice.correct;
                      const showRight = isPicked && choice.correct;
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          aria-pressed={isPicked}
                          onClick={() => handlePickGreeting(choice.id, choice.correct)}
                          className={`w-full p-4 min-h-[56px] rounded-3xl border-2 flex items-center gap-3.5 text-start transition-all cursor-pointer ${
                            showRight
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                              : showWrong
                                ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30 animate-shake'
                                : 'border-line-soft dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#FFB300]/60'
                          }`}
                        >
                          <span className="text-2xl select-none" aria-hidden="true">
                            {choice.emoji}
                          </span>
                          <span className="flex-1 font-black text-base text-ink">{choice.label}</span>
                          {showRight && <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>

                  {firstWinSolved && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-4 flex items-center gap-3 text-emerald-900 dark:text-emerald-100"
                    >
                      <PartyPopper className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                      <div className="text-xs sm:text-sm font-black leading-snug">
                        {t(language, 'first_win_celebrate')} (+10 XP · +10 💎)
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="pt-6">
          <button
            type="button"
            onClick={next}
            disabled={!stepReady || saving}
            className="w-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] py-4 min-h-[54px] rounded-full font-black text-base shadow-[0_3px_0_#E69500,0_10px_20px_rgba(255,179,0,0.22)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none dark:disabled:bg-slate-800 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
          >
            {step === TOTAL_STEPS - 1 ? t(language, 'onb_finish') : t(language, 'continue')}
            <ChevronRight className="w-5 h-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
