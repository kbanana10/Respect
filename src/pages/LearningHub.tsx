import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../store/AuthContext';
import { motion } from 'motion/react';
import {
  GraduationCap, ChevronRight, BookA, Binary, Palette, BookOpen,
  MessageSquare, Volume2, PenTool, Pencil, CornerDownRight, Zap, CheckCircle2,
} from 'lucide-react';
import { alphabet, vocabulary, sentences } from '../data/kurmanji';
import { academicVocabulary } from '../data/academic';
import {
  SUBJECT_ACCENTS,
  type LearningSubject,
  type SubjectAccent,
} from '../constants/subjectAccents';
import type { ReviewDeck } from '../services/SpacedRepetitionService';
import type { Language } from '../models/user';
import { t, pickLocalized } from '../localization/translations';
import { Modal, Button } from '../components/ui';
import { AudioButton } from '../features/audio/components/AudioButton';
import { playSuccessSound } from '../features/audio/hooks/useAudio';

interface HubCard {
  id: LearningSubject;
  Icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const HUB_CARDS: readonly HubCard[] = [
  { id: 'letters', Icon: BookA, path: '/alphabet' },
  { id: 'numbers', Icon: Binary, path: '/vocabulary/numbers' },
  { id: 'colors', Icon: Palette, path: '/vocabulary/colors' },
  { id: 'vocabulary', Icon: BookOpen, path: '/vocabulary' },
  { id: 'phrases', Icon: MessageSquare, path: '/sentences' },
  { id: 'writing', Icon: Pencil, path: '/writing' },
  { id: 'grammar', Icon: PenTool, path: '/grammar' },
  { id: 'pronunciation', Icon: Volume2, path: '#listen-drill' },
];

const LISTEN_DRILL_ITEMS = [
  { ku: 'Silav', en: 'Hello', ar: 'مرحباً', tip: 'S-i-l-a-v' },
  { ku: 'Spas dikim', en: 'Thank you', ar: 'شكراً لك', tip: 'Spas di-kim' },
  { ku: 'Tu çawa yî?', en: 'How are you?', ar: 'كيف حالك؟', tip: 'Tu cha-wa yî?' },
  { ku: 'Ez baş im', en: 'I am good', ar: 'أنا بخير', tip: 'Ez bash im' },
  { ku: 'Rojbaş', en: 'Good morning', ar: 'صباح الخير', tip: 'Roj-bash' },
  { ku: 'Şevbaş', en: 'Good night', ar: 'تصبح على خير', tip: 'Shev-bash' },
] as const;

const SUBJECT_NAMES = {
  letters: { en: 'Letters', ar: 'الأحرف', ku: 'Tîp' },
  numbers: { en: 'Numbers', ar: 'الأرقام', ku: 'Jimar' },
  colors: { en: 'Colors', ar: 'الألوان', ku: 'Reng' },
  vocabulary: { en: 'Vocabulary', ar: 'المفردات', ku: 'Peyv' },
  phrases: { en: 'Phrases', ar: 'العبارات', ku: 'Hevok' },
  pronunciation: { en: 'Listen & Repeat', ar: 'استمع وكرّر', ku: 'Guhdarî û Dubare' },
  grammar: { en: 'Grammar', ar: 'النحو', ku: 'Rêziman' },
  writing: { en: 'Writing Studio', ar: 'استوديو الكتابة', ku: 'Stûdyoya Nivîsînê' },
} satisfies Record<LearningSubject, { en: string; ar: string; ku: string }>;

const SUBJECT_DESCS = {
  letters: { en: 'The Hawar alphabet', ar: 'الحروف الكردية', ku: 'Alfabeya Hawar' },
  numbers: { en: 'Zero to millions', ar: 'من صفر حتى الملايين', ku: 'Ji sifir heta milyonan' },
  colors: { en: 'Colors of the world', ar: 'ألوان العالم', ku: 'Rengên cîhanê' },
  vocabulary: { en: 'Everyday & academic words', ar: 'كلمات يومية وأكاديمية', ku: 'Peyvên rojane' },
  phrases: { en: 'Phrases & dialogues', ar: 'جمل ومحادثات', ku: 'Hevok û diyalog' },
  pronunciation: { en: 'Normal & slow audio drill', ar: 'تدريب صوتي عادي وبطيء', ku: 'Rahênana dengî ya normal û hêdî' },
  grammar: { en: 'Grammar basics', ar: 'أساسيات القواعد', ku: 'Bingehên rêzimanê' },
  writing: { en: 'Letters, words & sentences', ar: 'حروف، كلمات وجمل', ku: 'Tîp, peyv û hevok' },
} satisfies Record<LearningSubject, { en: string; ar: string; ku: string }>;

const CONTENT_IDS = {
  letters: alphabet.map((l) => l.id),
  numbers: vocabulary.filter((w) => w.categoryId === 'numbers').map((w) => w.id),
  colors: vocabulary.filter((w) => w.categoryId === 'colors').map((w) => w.id),
  vocabulary: [...vocabulary, ...academicVocabulary].map((w) => w.id),
  phrases: sentences.map((s) => s.id),
  writing: alphabet.map((l) => l.id),
} satisfies Record<Exclude<LearningSubject, 'pronunciation' | 'grammar'>, string[]>;

interface SubjectProgress {
  done: number;
  total: number;
}

function progressFor(
  subject: Exclude<LearningSubject, 'pronunciation' | 'grammar'>,
  deck: ReviewDeck,
): SubjectProgress {
  const ids = CONTENT_IDS[subject];
  const done = ids.filter((id) => id in deck).length;
  return { done, total: ids.length };
}

function computeProgress(reviewDeck: ReviewDeck | undefined) {
  const deck = reviewDeck ?? {};
  return {
    letters: progressFor('letters', deck),
    numbers: progressFor('numbers', deck),
    colors: progressFor('colors', deck),
    vocabulary: progressFor('vocabulary', deck),
    phrases: progressFor('phrases', deck),
    pronunciation: { done: 0, total: 0 },
    grammar: { done: 0, total: 0 },
    writing: progressFor('writing', deck),
  } satisfies Record<LearningSubject, SubjectProgress>;
}

const SUBJECT_ORDER: readonly LearningSubject[] = [
  'letters',
  'numbers',
  'colors',
  'vocabulary',
  'phrases',
  'writing',
  'grammar',
  'pronunciation',
];

function totalReviewed(progress: Record<LearningSubject, SubjectProgress>): number {
  return SUBJECT_ORDER.reduce((sum, subject) => sum + (progress[subject]?.done ?? 0), 0);
}

export function LearningHub() {
  const navigate = useNavigate();
  const { language, userData, updateUserProgress } = useAuth();
  const [drillOpen, setDrillOpen] = useState(false);
  const [drillIdx, setDrillIdx] = useState(0);
  const [drillCompleted, setDrillCompleted] = useState(false);

  const progress = useMemo(() => computeProgress(userData?.reviewDeck), [userData?.reviewDeck]);

  const lastVisitedId = useMemo(() => {
    for (const subject of SUBJECT_ORDER) {
      if (subject === 'pronunciation') continue;
      if (progress[subject].done > 0) return subject;
    }
    return null;
  }, [progress]);

  const suggestedId = useMemo(() => {
    if (!lastVisitedId) return 'letters';
    const idx = SUBJECT_ORDER.indexOf(lastVisitedId);
    const next = SUBJECT_ORDER[(idx + 1) % SUBJECT_ORDER.length];
    return next === 'pronunciation' ? 'letters' : next;
  }, [lastVisitedId]);

  const continueCard = lastVisitedId ? HUB_CARDS.find((c) => c.id === lastVisitedId) : null;
  const suggestedCard = HUB_CARDS.find((c) => c.id === suggestedId);

  const todayUtc = new Date().toISOString().slice(0, 10);
  const xpToday = userData?.xpTodayDate === todayUtc ? (userData?.xpToday ?? 0) : 0;
  const dailyGoalTarget = userData?.dailyGoalXp ?? 0;
  const goalPercent = dailyGoalTarget > 0 ? Math.min(100, Math.round((xpToday / dailyGoalTarget) * 100)) : 0;

  const copy = pickLocalized(language, {
    en: {
      hubBadge: 'Practice Hub',
      hubTitle: 'Practice & Reference',
      hubDesc: 'Everything you need to practice — letters, numbers, writing studio, grammar and audio drills.',
      xpToday: 'XP today',
      keepDaily: 'Keep learning daily',
      continue: 'Continue',
      nextUp: 'Next up',
      startHere: 'Start here',
      open: 'Open',
      wordsLearned: 'words learned',
      footer: `Each topic is one step along your path — ${totalReviewed(progress)} words reviewed so far`,
      drillTip: 'Tap once for normal speed, tap again for slow speed, then say it aloud!',
      drillNext: 'Next Phrase',
      drillFinish: 'Complete Drill (+15 XP)',
      drillDone: 'Awesome speaking practice! +15 XP earned.',
      close: 'Close',
    },
    ar: {
      hubBadge: 'مركز التمرين',
      hubTitle: 'التمرين والمراجعة',
      hubDesc: 'كل ما تحتاجه للتعلّم في مكان واحد: الأحرف، الأرقام، استوديو الكتابة، القواعد وتدريب النطق.',
      xpToday: 'نقاط الخبرة اليوم',
      keepDaily: 'تدرّب يومياً',
      continue: 'واصل',
      nextUp: 'التالي',
      startHere: 'ابدأ من هنا',
      open: 'افتح',
      wordsLearned: 'كلمة تم تعلّمها',
      footer: `كل موضوع هو خطوة على مسارك — ${totalReviewed(progress)} كلمة تعلّمتها حتى الآن`,
      drillTip: 'اضغط مرة للسرعة العادية ومرة أخرى للسرعة البطيئة، ثم كرّر بصوت مسموع!',
      drillNext: 'العبارة التالية',
      drillFinish: 'إنهاء التدريب (+15 XP)',
      drillDone: 'أحسنت! تم احتساب +15 نقطة خبرة لتدريب النطق.',
      close: 'إغلاق',
    },
    ku: {
      hubBadge: 'Navenda Rahênanê',
      hubTitle: 'Fêrbûn û Rahênan',
      hubDesc: 'Hemû amûrên fêrbûnê di yek cîhî de: tîp, jimar, stûdyoya nivîsînê, rêziman û bilêvkirin.',
      xpToday: 'XP îro',
      keepDaily: 'Rojane xwe bixebitîne',
      continue: 'Bidomîne',
      nextUp: 'Ya bê',
      startHere: 'Bi dest pê bike',
      open: 'Veke',
      wordsLearned: 'peyv hîn bûne',
      footer: `Her mijar gavek e li ser rêya te — ${totalReviewed(progress)} peyv hatine dîtin`,
      drillTip: 'Carekê ji bo leza normal, cara duyem ji bo leza hêdî bitikîne û bi dengê bilind dubare bike!',
      drillNext: 'Hevoka Pêş',
      drillFinish: 'Rahênanê Biqedîne (+15 XP)',
      drillDone: 'Bijî! Te +15 XP ji bo rahênana bilêvkirinê qezenc kir.',
      close: 'Bigire',
    },
  });

  const handleOpenCard = (card: HubCard) => {
    if (card.id === 'pronunciation') {
      setDrillIdx(0);
      setDrillCompleted(false);
      setDrillOpen(true);
      return;
    }
    navigate(card.path);
  };

  const handleAdvanceDrill = () => {
    playSuccessSound();
    if (drillIdx < LISTEN_DRILL_ITEMS.length - 1) {
      setDrillIdx((i) => i + 1);
    } else {
      setDrillCompleted(true);
      void updateUserProgress(15, 0, false, 5);
    }
  };

  const currentDrill = LISTEN_DRILL_ITEMS[drillIdx];
  const progressSummary = `${totalReviewed(progress)} ${copy.wordsLearned}`;

  const getTitle = (id: LearningSubject, lang: Language) => pickLocalized(lang, SUBJECT_NAMES[id]);
  const getDesc = (id: LearningSubject, lang: Language) => pickLocalized(lang, SUBJECT_DESCS[id]);

  return (
    <div className="p-4 lg:p-8 space-y-5 min-h-screen pb-24 lg:pb-12 max-w-5xl mx-auto relative overflow-hidden">
      {/* 1. Hero */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-flat border border-line-soft dark:border-slate-800 relative overflow-hidden">
        <GraduationCap className="absolute end-2 bottom-0 opacity-[0.05] w-36 h-36 transform translate-y-6 select-none pointer-events-none text-slate-500" />
        <div className="space-y-2 relative z-10 text-start">
          <div className="text-xs text-[#8A6100] dark:text-[#FFCE6B] font-extrabold">{copy.hubBadge}</div>
          <h2 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight text-ink">
            {copy.hubTitle}
          </h2>
          <p className="text-muted text-sm leading-relaxed font-medium max-w-2xl">{copy.hubDesc}</p>
        </div>
      </div>

      {/* 2. XP Today strip */}
      <div
        className="w-full bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl px-5 py-4 shadow-flat"
        role="progressbar"
        aria-label={copy.xpToday}
        aria-valuemin={0}
        aria-valuemax={dailyGoalTarget > 0 ? dailyGoalTarget : 100}
        aria-valuenow={xpToday}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl bg-[#FFF3D6] dark:bg-[#3A2F14] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <Zap className="w-4 h-4 text-[#B8860B] dark:text-[#FFCE6B] fill-[#FFB300]/40" />
          </span>
          <div className="min-w-0 lg:min-w-[150px]">
            <div className="text-xs font-bold text-muted leading-none">{copy.xpToday}</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-ink leading-none tabular-nums" dir="ltr">
                {xpToday}
              </span>
              {dailyGoalTarget > 0 && (
                <span className="text-xs font-bold text-muted tabular-nums" dir="ltr">
                  / {dailyGoalTarget}
                </span>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0" aria-hidden="true">
            {dailyGoalTarget > 0 ? (
              <>
                <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      goalPercent >= 100 ? 'bg-emerald-500' : 'bg-[#FFB300]'
                    }`}
                    style={{ width: `${goalPercent}%` }}
                  />
                </div>
                <div className="mt-1 text-end text-xs font-bold text-muted tabular-nums" dir="ltr">
                  {goalPercent}%
                </div>
              </>
            ) : (
              <div className="text-end text-xs font-bold text-muted">{copy.keepDaily}</div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Continue / next-topic strip */}
      <div className="grid grid-cols-2 gap-3">
        {continueCard && suggestedCard ? (
          <>
            <button
              type="button"
              onClick={() => handleOpenCard(continueCard)}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer min-h-[56px]"
            >
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${SUBJECT_ACCENTS[continueCard.id].well}`}
                aria-hidden="true"
              >
                <continueCard.Icon className={`w-4 h-4 ${SUBJECT_ACCENTS[continueCard.id].icon}`} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold text-muted leading-none">{copy.continue}</span>
                <span className="block text-sm font-black text-ink truncate mt-1">
                  {getTitle(continueCard.id, language)}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenCard(suggestedCard)}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer min-h-[56px]"
            >
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${SUBJECT_ACCENTS[suggestedCard.id].well}`}
                aria-hidden="true"
              >
                <suggestedCard.Icon className={`w-4 h-4 ${SUBJECT_ACCENTS[suggestedCard.id].icon}`} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold text-muted leading-none">{copy.nextUp}</span>
                <span className="block text-sm font-black text-ink truncate mt-1">
                  {getTitle(suggestedCard.id, language)}
                </span>
              </span>
              <ChevronRight className="w-4 h-4 shrink-0 ms-auto text-muted rtl:-scale-x-100" aria-hidden="true" />
            </button>
          </>
        ) : (
          suggestedCard && (
            <button
              type="button"
              onClick={() => handleOpenCard(suggestedCard)}
              className="col-span-2 bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer min-h-[56px]"
            >
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${SUBJECT_ACCENTS[suggestedCard.id].well}`}
                aria-hidden="true"
              >
                <suggestedCard.Icon className={`w-4 h-4 ${SUBJECT_ACCENTS[suggestedCard.id].icon}`} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold text-muted leading-none">{copy.startHere}</span>
                <span className="block text-sm font-black text-ink truncate mt-1">
                  {getTitle(suggestedCard.id, language)}
                </span>
              </span>
              <ChevronRight className="w-4 h-4 shrink-0 ms-auto text-muted rtl:-scale-x-100" aria-hidden="true" />
            </button>
          )
        )}
      </div>

      {/* 4. All 8 Live Section Cards — Zero Coming Soon */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {HUB_CARDS.map((card, index) => {
          const accent: SubjectAccent = SUBJECT_ACCENTS[card.id];
          const prog = progress[card.id];
          const pct = prog.total > 0 ? Math.min(100, Math.round((prog.done / prog.total) * 100)) : 0;

          return (
            <motion.button
              key={card.id}
              type="button"
              aria-label={`${getTitle(card.id, language)} — ${progressSummary}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleOpenCard(card)}
              className="bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800/80 rounded-[26px] p-5 flex flex-col items-center justify-center gap-3 hover:shadow-soft transition-all cursor-pointer relative overflow-hidden min-h-[156px] shadow-flat"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${accent.well}`}>
                <card.Icon className={`w-6 h-6 ${accent.icon}`} />
              </div>

              <div className="text-center w-full">
                <div className="font-extrabold text-ink text-sm leading-snug">
                  {getTitle(card.id, language)}
                </div>
                <div className="text-xs font-semibold mt-1 leading-snug text-muted">
                  {getDesc(card.id, language)}
                </div>
              </div>

              {prog.total > 0 && (
                <div className="w-full">
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden" aria-hidden="true">
                    <div className={`h-full rounded-full transition-all duration-500 ${accent.barFill}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-1.5" data-testid={`progress-${card.id}`}>
                    <span className="text-xs font-bold text-muted tabular-nums">
                      {prog.done}/{prog.total}
                    </span>
                    <span className="text-xs font-bold text-muted tabular-nums">{pct}%</span>
                  </div>
                </div>
              )}

              <span className="text-xs font-black text-[#8A6100] dark:text-[#FFCE6B] flex items-center gap-1 mt-0.5">
                {copy.open}
                <ChevronRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
              </span>
            </motion.button>
          );
        })}
      </div>

      <p
        className="max-w-md mx-auto text-center text-xs text-muted font-semibold flex items-center justify-center gap-1"
        aria-live="polite"
      >
        <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
        {copy.footer}
      </p>

      {/* Live Listen & Repeat Audio Drill Modal */}
      <Modal
        open={drillOpen}
        onClose={() => setDrillOpen(false)}
        title={t(language, 'listen_drill_title')}
        description={t(language, 'listen_drill_desc')}
        closeLabel={copy.close}
      >
        {drillCompleted ? (
          <div className="text-center space-y-4 py-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <p className="text-base font-black text-ink">{copy.drillDone}</p>
            <Button variant="primary" fullWidth onClick={() => setDrillOpen(false)}>
              {copy.close}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-extrabold text-muted tabular-nums">
              <span>
                {drillIdx + 1} / {LISTEN_DRILL_ITEMS.length}
              </span>
              <span dir="ltr" className="font-mono">
                {currentDrill.tip}
              </span>
            </div>

            <div className="bg-[#FFF6E0] dark:bg-[#3A2F14] border border-[#FFB300]/30 rounded-3xl p-6 text-center space-y-3">
              <div className="text-2xl font-black text-ink" dir="ltr">
                {currentDrill.ku}
              </div>
              <div className="text-sm font-bold text-muted">
                {pickLocalized(language, {
                  en: currentDrill.en,
                  ar: currentDrill.ar,
                  ku: `${currentDrill.en} · ${currentDrill.ar}`,
                })}
              </div>
              <div className="flex items-center justify-center gap-3 pt-1">
                <AudioButton
                  textToSpeak={currentDrill.ku}
                  className="bg-white dark:bg-slate-900 text-[#8A6100] dark:text-[#FFCE6B] shadow-xs"
                />
              </div>
            </div>

            <p className="text-xs font-semibold text-muted text-center">{copy.drillTip}</p>

            <Button variant="primary" fullWidth onClick={handleAdvanceDrill}>
              {drillIdx < LISTEN_DRILL_ITEMS.length - 1 ? copy.drillNext : copy.drillFinish}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
