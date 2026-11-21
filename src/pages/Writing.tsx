/**
 * Writing.tsx — Unified Writing Studio (/writing)
 *
 * Consolidates Letters, Words, and Sentences tracing into one seamless,
 * progressive Writing Studio with zero "Coming Soon" gates. Every tab is live,
 * backed by the shared SM-2 `userData.reviewDeck` learned state, and preserves
 * direct routes (`/writing/lesson/:letterId`, `/writing/words/:wordId`,
 * `/writing/sentences/:sentenceId`).
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../store/AuthContext';
import { alphabet } from '../data/kurmanji';
import { WRITING_WORDS } from '../data/writingWords';
import { WRITING_SENTENCES } from '../data/writingSentences';
import { motion } from 'motion/react';
import { Pencil, Sparkles, Check, MessageSquare, NotebookPen, BookA, MessageSquareText } from 'lucide-react';
import type { ReviewDeck } from '../services/SpacedRepetitionService';
import { SUBJECT_ACCENTS } from '../constants/subjectAccents';
import { t, pickLocalized } from '../localization/translations';
import { SegmentedControl } from '../components/ui';

const ACCENT = SUBJECT_ACCENTS.writing;
type StudioTab = 'letters' | 'words' | 'sentences';

export function Writing() {
  const navigate = useNavigate();
  const { language, userData } = useAuth();
  const [activeTab, setActiveTab] = useState<StudioTab>('letters');

  const deck: ReviewDeck = userData?.reviewDeck ?? {};
  const isItemLearned = (id: string): boolean => {
    const item = deck[id];
    return !!item && item.repetitions > 0;
  };

  const learnedLetters = alphabet.filter((l) => isItemLearned(l.id)).length;
  const learnedWords = WRITING_WORDS.filter((w) => isItemLearned(w.id)).length;
  const learnedSentences = WRITING_SENTENCES.filter((s) => isItemLearned(s.id)).length;

  const copy = pickLocalized(language, {
    en: {
      badge: 'WRITING STUDIO',
      subtitle: 'Trace Hawar letters, build short words, and write full Kurdish sentences.',
      vowel: 'vowel',
      consonant: 'consonant',
      written: 'written',
      learned: 'learned',
      chars: `${alphabet.length} Letters`,
      wordsCount: `${WRITING_WORDS.length} Words`,
      sentencesCount: `${WRITING_SENTENCES.length} Sentences`,
      tabAria: 'Writing studio mode',
    },
    ar: {
      badge: 'استوديو الكتابة',
      subtitle: 'تتبّع حروف الهوار، ثم انتقل لكتابة الكلمات والجمل الكردية الكاملة.',
      vowel: 'حرف علة',
      consonant: 'حرف ساكن',
      written: 'مكتوب',
      learned: 'مكتمل',
      chars: `${alphabet.length} حرفاً`,
      wordsCount: `${WRITING_WORDS.length} كلمة`,
      sentencesCount: `${WRITING_SENTENCES.length} جملة`,
      tabAria: 'وضع استوديو الكتابة',
    },
    ku: {
      badge: 'STÛDYOYA NIVÎSANDINÊ',
      subtitle: 'Tîpên Hawarê bikişîne, peyvên kurt binivîse û hevokên temam ava bike.',
      vowel: 'dengdêr',
      consonant: 'dengdar',
      written: 'nivîsandî',
      learned: 'fêrbûyî',
      chars: `${alphabet.length} Tîp`,
      wordsCount: `${WRITING_WORDS.length} Peyv`,
      sentencesCount: `${WRITING_SENTENCES.length} Hevok`,
      tabAria: 'Moda stûdyoya nivîsandinê',
    },
  });

  const tabs: readonly { value: StudioTab; label: string; icon: React.ReactNode }[] = [
    { value: 'letters', label: t(language, 'writing_tab_letters'), icon: <BookA className="w-4 h-4" /> },
    { value: 'words', label: t(language, 'writing_tab_words'), icon: <MessageSquare className="w-4 h-4" /> },
    { value: 'sentences', label: t(language, 'writing_tab_sentences'), icon: <NotebookPen className="w-4 h-4" /> },
  ];

  return (
    <div className="p-4 lg:p-8 flex flex-col min-h-screen pb-24 max-w-4xl mx-auto relative overflow-hidden space-y-5">
      {/* Hero */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 relative overflow-hidden shadow-flat border border-line-soft dark:border-slate-800 group">
        <div
          className="absolute inset-x-0 -top-16 h-48 bg-[radial-gradient(circle_at_50%_0%,#FFB300_0%,transparent_65%)] opacity-[0.10] pointer-events-none"
          aria-hidden="true"
        />
        <Pencil className="absolute end-2 bottom-0 opacity-[0.06] w-36 h-36 transform translate-y-6 select-none pointer-events-none text-slate-500" />

        <div className="space-y-2 relative z-10 text-start">
          <span
            className={`text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 ${ACCENT.well} ${ACCENT.icon}`}
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            {copy.badge}
          </span>
          <h2 className="text-2xl font-black leading-tight tracking-tight text-ink">
            {t(language, 'writing_studio_title')}
          </h2>
          <p className="text-muted text-sm leading-relaxed font-semibold max-w-xl">
            {copy.subtitle}
          </p>
        </div>
      </div>

      {/* Unified 3-Mode Studio Switcher */}
      <SegmentedControl<StudioTab>
        options={tabs}
        value={activeTab}
        onChange={(next) => setActiveTab(next)}
        ariaLabel={copy.tabAria}
      />

      {/* TAB 1: LETTERS */}
      {activeTab === 'letters' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-muted uppercase tracking-wider">{copy.chars}</h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full tabular-nums">
              {learnedLetters}/{alphabet.length} {copy.learned}
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {alphabet.map((letter) => {
              const isLearned = isItemLearned(letter.id);
              const glyph = letter.char.split(' ')[0];
              return (
                <motion.button
                  key={letter.id}
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={() => navigate(`/writing/lesson/${letter.id}`)}
                  aria-label={`${glyph}${isLearned ? ` — ${copy.written}` : ''}`}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center font-black text-xl transition-all relative cursor-pointer select-none ${
                    isLearned
                      ? 'border-2 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#FFB300]/60 shadow-xs'
                  }`}
                >
                  <span className="font-mono" dir="ltr">{glyph}</span>
                  <span className="text-[11px] font-bold mt-1 text-muted">
                    {letter.type === 'vowel' ? copy.vowel : copy.consonant}
                  </span>
                  {isLearned && (
                    <span
                      className="absolute -top-1.5 -end-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shadow-sm"
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 2: WORDS */}
      {activeTab === 'words' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-muted uppercase tracking-wider">{copy.wordsCount}</h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full tabular-nums">
              {learnedWords}/{WRITING_WORDS.length} {copy.learned}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {WRITING_WORDS.map((word) => {
              const isLearned = isItemLearned(word.id);
              const meaning = pickLocalized(language, { en: word.en, ar: word.ar, ku: word.en });
              return (
                <motion.button
                  key={word.id}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/writing/words/${word.id}`)}
                  aria-label={`${word.ku} — ${meaning}`}
                  className={`min-h-[88px] rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all relative cursor-pointer select-none ${
                    isLearned
                      ? 'border-2 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-ink hover:border-[#FFB300]/60 shadow-xs'
                  }`}
                >
                  <span className="font-mono font-black text-lg tracking-wider" dir="ltr">
                    {word.ku}
                  </span>
                  <span className="text-xs font-semibold text-muted mt-1 truncate max-w-full">
                    {meaning}
                  </span>
                  {isLearned && (
                    <span
                      className="absolute -top-1.5 -end-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shadow-sm"
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 3: SENTENCES */}
      {activeTab === 'sentences' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-muted uppercase tracking-wider">{copy.sentencesCount}</h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full tabular-nums">
              {learnedSentences}/{WRITING_SENTENCES.length} {copy.learned}
            </span>
          </div>
          <div className="space-y-2.5">
            {WRITING_SENTENCES.map((sentence) => {
              const done = isItemLearned(sentence.id);
              const meaning = pickLocalized(language, {
                en: sentence.en,
                ar: sentence.ar,
                ku: sentence.en,
              });
              return (
                <motion.button
                  key={sentence.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/writing/sentences/${sentence.id}`)}
                  aria-label={`${sentence.ku} — ${meaning}`}
                  className={`w-full flex items-center gap-3.5 rounded-2xl p-4 transition-all relative cursor-pointer select-none text-start min-h-[60px] ${
                    done
                      ? 'border-2 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 hover:border-[#FFB300]/60 shadow-xs'
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${ACCENT.well}`}
                    aria-hidden="true"
                  >
                    <MessageSquareText className={`w-5 h-5 ${ACCENT.icon}`} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-black text-base text-ink leading-snug" dir="ltr">
                      {sentence.ku}
                    </span>
                    <span className="block text-xs font-semibold text-muted leading-snug mt-0.5">
                      {meaning}
                    </span>
                  </span>
                  {done && (
                    <span
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white shadow-sm shrink-0"
                      aria-hidden="true"
                    >
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
