/**
 * MemoryMatchGame.tsx — Fully Live, Tri-Lingual, Kids-Friendly Memory Match.
 *
 * Replaces the legacy "Memory Game — Coming Soon" stub with a complete,
 * race-condition-free card-matching game fed dynamically from the learner's
 * curriculum word pool, wrapped in the unified GameShell HUD.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { t, pickLocalized } from '../../localization/translations';
import {
  playSuccessSound,
  playFailureSound,
  playCompleteSound,
  playTapSound,
  playAudioUrl,
} from '../audio/hooks/useAudio';
import { getCurriculumWordPool, type GameVocabItem } from './curriculumWords';
import { GameShell } from './GameShell';

interface MemoryCard {
  readonly uid: string;
  readonly word: GameVocabItem;
  readonly side: 'ku' | 'meaning';
  readonly label: string;
  readonly emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMatchGameProps {
  onWin: (xp: number) => void;
  onExit: () => void;
}

const PAIR_COUNT = 6;

export function MemoryMatchGame({ onWin, onExit }: MemoryMatchGameProps) {
  const { language, userData } = useAuth();
  const isKids = userData?.learnerMode === 'kids';
  const [timerEnabled, setTimerEnabled] = useState<boolean>(!isKids && !userData?.relaxedTimer);
  const [elapsed, setElapsed] = useState(0);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [finished, setFinished] = useState(false);
  const [missedWords, setMissedWords] = useState<GameVocabItem[]>([]);

  const userDataRef = useRef(userData);
  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  const selectedRef = useRef<number[]>([]);
  const matchedPairsRef = useRef(0);
  const comboRef = useRef(0);
  const winAwardedRef = useRef(false);
  const flipTimerRef = useRef<number | null>(null);

  const buildDeck = useCallback(() => {
    if (flipTimerRef.current !== null) {
      window.clearTimeout(flipTimerRef.current);
      flipTimerRef.current = null;
    }
    selectedRef.current = [];
    matchedPairsRef.current = 0;
    comboRef.current = 0;
    winAwardedRef.current = false;
    setMoves(0);
    setMatchedPairs(0);
    setElapsed(0);
    setFinished(false);
    setMissedWords([]);

    const pool = getCurriculumWordPool(userDataRef.current, PAIR_COUNT * 2);
    const chosen = [...pool].sort(() => Math.random() - 0.5).slice(0, PAIR_COUNT);

    const deck: MemoryCard[] = [];
    for (const word of chosen) {
      deck.push({
        uid: `${word.id}-ku`,
        word,
        side: 'ku',
        label: word.ku,
        emoji: '',
        isFlipped: false,
        isMatched: false,
      });
      const meaning = pickLocalized(language, {
        en: word.en,
        ar: word.ar,
        ku: word.en,
      });
      deck.push({
        uid: `${word.id}-meaning`,
        word,
        side: 'meaning',
        label: meaning,
        emoji: word.emoji ?? '',
        isFlipped: false,
        isMatched: false,
      });
    }

    setCards(deck.sort(() => Math.random() - 0.5));
  }, [language]);

  useEffect(() => {
    buildDeck();
    return () => {
      if (flipTimerRef.current !== null) window.clearTimeout(flipTimerRef.current);
    };
  }, [buildDeck]);

  useEffect(() => {
    if (!timerEnabled || finished) return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerEnabled, finished]);

  const handleCardTap = (index: number) => {
    if (finished) return;
    const currentSel = selectedRef.current;
    if (currentSel.length >= 2 || currentSel.includes(index)) return;
    const target = cards[index];
    if (!target || target.isFlipped || target.isMatched) return;

    playTapSound(currentSel.length);

    const nextCards = cards.map((c, idx) => (idx === index ? { ...c, isFlipped: true } : c));
    setCards(nextCards);

    if (target.side === 'ku') {
      void playAudioUrl('', target.word.ku, 1.0);
    }

    const nextSel = [...currentSel, index];
    selectedRef.current = nextSel;

    if (nextSel.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextSel;
      const first = nextCards[firstIdx];
      const second = nextCards[secondIdx];

      if (first.word.id === second.word.id && first.side !== second.side) {
        comboRef.current += 1;
        playSuccessSound(comboRef.current);
        flipTimerRef.current = window.setTimeout(() => {
          flipTimerRef.current = null;
          setCards((prev) =>
            prev.map((c, idx) =>
              idx === firstIdx || idx === secondIdx ? { ...c, isMatched: true } : c,
            ),
          );
          selectedRef.current = [];
          const nextPairs = matchedPairsRef.current + 1;
          matchedPairsRef.current = nextPairs;
          setMatchedPairs(nextPairs);
          if (nextPairs >= PAIR_COUNT && !winAwardedRef.current) {
            winAwardedRef.current = true;
            playCompleteSound();
            setFinished(true);
            onWin(20);
          }
        }, 420);
      } else {
        comboRef.current = 0;
        playFailureSound();
        setMissedWords((prev) => {
          const exists = prev.some((w) => w.id === first.word.id);
          return exists ? prev : [...prev, first.word];
        });
        flipTimerRef.current = window.setTimeout(() => {
          flipTimerRef.current = null;
          setCards((prev) =>
            prev.map((c, idx) =>
              idx === firstIdx || idx === secondIdx ? { ...c, isFlipped: false } : c,
            ),
          );
          selectedRef.current = [];
        }, 900);
      }
    }
  };

  const hintText = pickLocalized(language, {
    en: `Match ${PAIR_COUNT} pairs · Moves: ${moves}`,
    ar: `طابق ${PAIR_COUNT} أزواج · المحاولات: ${moves}`,
    ku: `${PAIR_COUNT} cotan bibîne · Tevger: ${moves}`,
  });

  const pairsLabel = pickLocalized(language, {
    en: 'Pairs',
    ar: 'الأزواج',
    ku: 'Cot',
  });

  return (
    <GameShell
      title={t(language, 'memory_match_title')}
      scoreLabel={pairsLabel}
      scoreValue={`${matchedPairs}/${PAIR_COUNT}`}
      onExit={onExit}
      onRestart={buildDeck}
      timerEnabled={timerEnabled}
      onToggleTimer={() => setTimerEnabled((v) => !v)}
      elapsedSeconds={elapsed}
      finished={finished}
      earnedXp={20}
      missedWords={missedWords}
    >
      <p className="text-xs font-extrabold text-muted text-center mb-3">{hintText}</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 flex-1 content-start">
        {cards.map((card, index) => {
          const revealed = card.isFlipped || card.isMatched;
          return (
            <motion.button
              key={card.uid}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => handleCardTap(index)}
              aria-pressed={revealed}
              aria-label={revealed ? card.label : `Card ${index + 1}`}
              className={`min-h-[96px] sm:min-h-[112px] rounded-2xl border-2 p-2.5 flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none ${
                card.isMatched
                  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
                  : revealed
                    ? 'border-[#FFB300] bg-white dark:bg-slate-900 text-ink shadow-md'
                    : 'border-line-soft dark:border-slate-800 bg-[#FFF6E0] dark:bg-[#2A2415] hover:border-[#FFB300] text-[#8A6100] dark:text-[#FFCE6B]'
              }`}
            >
              {revealed ? (
                <>
                  {card.emoji && (
                    <span className="text-xl mb-1 select-none" aria-hidden="true">
                      {card.emoji}
                    </span>
                  )}
                  <span
                    className={`font-black leading-snug ${
                      card.side === 'ku' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                    }`}
                    dir={card.side === 'ku' ? 'ltr' : 'auto'}
                  >
                    {card.label}
                  </span>
                </>
              ) : (
                <Sparkles className="w-6 h-6 opacity-70" aria-hidden="true" />
              )}
            </motion.button>
          );
        })}
      </div>
    </GameShell>
  );
}
