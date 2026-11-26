/**
 * Games.tsx — Unified Games Arcade (/games)
 *
 * All 5 games are 100% live (zero "Coming Soon" dead tiles):
 *   1. Word Connect
 *   2. Word Matching
 *   3. Memory Match (newly completed & wrapped in GameShell HUD)
 *   4. Spelling Scrambler (curriculum-aware + GameShell HUD)
 *   5. Zombie Typing (optional action challenge)
 */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAuth } from '../store/AuthContext';
import { t, pickLocalized } from '../localization/translations';
import { vocabulary, type Word } from '../data/kurmanji';
import { motion } from 'motion/react';
import {
  Gamepad2, Zap, ChevronRight, Puzzle, Skull, CaseSensitive, Brain, Workflow, HelpCircle,
} from 'lucide-react';
import Confetti from 'react-confetti';
import { WordMatchingGame } from '../components/games/WordMatchingGame';
import { ZombieTypingGame } from '../components/games/ZombieTypingGame';
import { WordConnectGame } from '../components/games/WordConnectGame';
import { MemoryMatchGame } from '../features/games/MemoryMatchGame';
import { GameShell } from '../features/games/GameShell';
import { getCurriculumWordPool, type GameVocabItem } from '../features/games/curriculumWords';
import { playSuccessSound, playFailureSound, playTapSound, playRewardSound } from '../features/audio/hooks/useAudio';

const MemoWordMatchingGame = React.memo(WordMatchingGame);
const MemoZombieTypingGame = React.memo(ZombieTypingGame);
const MemoWordConnectGame = React.memo(WordConnectGame);
const MemoMemoryMatchGame = React.memo(MemoryMatchGame);

type ActiveGameId = 'menu' | 'memory' | 'scramble' | 'matching' | 'zombie' | 'connect';

export function Games() {
  const { userData, updateUserData, updateUserProgress, language } = useAuth();
  const isKidsMode = userData?.learnerMode === 'kids';

  const [activeGame, setActiveGame] = useState<ActiveGameId>('menu');
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const isGame = activeGame !== 'menu';
    window.dispatchEvent(new CustomEvent('set-game-active', { detail: isGame }));
    return () => {
      window.dispatchEvent(new CustomEvent('set-game-active', { detail: false }));
    };
  }, [activeGame]);

  const updateProgressRef = useRef(updateUserProgress);
  useEffect(() => {
    updateProgressRef.current = updateUserProgress;
  }, [updateUserProgress]);

  const celebrateTimerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (celebrateTimerRef.current !== null) {
        window.clearTimeout(celebrateTimerRef.current);
      }
    };
  }, []);

  const handleGameWin = useCallback((xp: number) => {
    setCelebrate(true);
    void updateProgressRef.current(xp, 1, true, 0, { source: 'game' });
    if (celebrateTimerRef.current !== null) {
      window.clearTimeout(celebrateTimerRef.current);
    }
    celebrateTimerRef.current = window.setTimeout(() => {
      celebrateTimerRef.current = null;
      setCelebrate(false);
    }, 3500);
  }, []);

  const handleExitToMenu = useCallback(() => setActiveGame('menu'), []);

  const gameVocabulary = useMemo<Word[]>(() => {
    const prioritized = getCurriculumWordPool(userData, 36);
    const byId = new Map(vocabulary.map((w) => [w.id, w]));
    const seen = new Set<string>();
    const list: Word[] = [];
    for (const item of prioritized) {
      const existing = byId.get(item.id);
      if (existing) {
        seen.add(existing.id);
        list.push(existing);
      } else {
        seen.add(item.id);
        list.push({
          id: item.id,
          ku: item.ku,
          en: item.en,
          ar: item.ar,
          categoryId: 'basics',
          audio: '',
          emoji: item.emoji,
        });
      }
    }
    for (const w of vocabulary) {
      if (!seen.has(w.id)) list.push(w);
    }
    return list;
  }, [userData]);

  // ==================== SPELLING SCRAMBLER STATE ====================
  const [scrambleWord, setScrambleWord] = useState<GameVocabItem | null>(null);
  const [scrambleLetters, setScrambleLetters] = useState<{ id: string; char: string; used: boolean }[]>([]);
  const [userLetters, setUserLetters] = useState<{ originalId: string; char: string }[]>([]);
  const [scrambleScore, setScrambleScore] = useState(0);
  const [showScrambleHint, setShowScrambleHint] = useState(false);
  const [isScrambleCorrect, setIsScrambleCorrect] = useState<boolean | null>(null);
  const scrambleVerifyLockRef = useRef(false);
  const scrambleResetTimerRef = useRef<number | null>(null);

  const st = pickLocalized(language, {
    en: {
      title: 'Spelling Scrambler',
      menuDesc: 'Order the letters to spell Kurdish words',
      scoreLabel: 'Spelled',
      showHint: 'Show Hint',
      hideHint: 'Hide Hint',
      prompt: 'Spell it in Kurdish',
      hintStarts: 'Starts with:',
      available: 'Available Letters',
      reset: 'Reset',
      verify: 'Verify Answer',
      next: 'Next Word',
      slotEmpty: 'Empty letter slot',
      removeLetter: 'Remove letter',
    },
    ku: {
      title: 'Tevliheviya Tîpan',
      menuDesc: 'Tîpan rast rêz bike û peyvan çêke',
      scoreLabel: 'Peyv',
      showHint: 'Têbînî nîşan bide',
      hideHint: 'Têbîniyê veşêre',
      prompt: 'Bi Kurdî binivîse',
      hintStarts: 'Bi vê tîpê dest pê dike:',
      available: 'Tîpên Berdest',
      reset: 'Ji nû ve',
      verify: 'Kontrol bike',
      next: 'Peyva din',
      slotEmpty: 'Valahiya tîpê',
      removeLetter: 'Tîpê rake',
    },
    ar: {
      title: 'تركيب الحروف',
      menuDesc: 'رتّب الحروف لكتابة الكلمات الكردية',
      scoreLabel: 'مكتملة',
      showHint: 'إظهار التلميح',
      hideHint: 'إخفاء التلميح',
      prompt: 'اكتب الكلمة الكردية',
      hintStarts: 'تبدأ الكلمة بالحرف:',
      available: 'الحروف المتاحة',
      reset: 'إعادة تعيين',
      verify: 'تأكيد الإجابة',
      next: 'الكلمة التالية',
      slotEmpty: 'خانة فارغة',
      removeLetter: 'إزالة الحرف',
    },
  });

  const userDataRef = useRef(userData);
  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  const initScrambleWord = useCallback(() => {
    if (scrambleResetTimerRef.current !== null) {
      window.clearTimeout(scrambleResetTimerRef.current);
      scrambleResetTimerRef.current = null;
    }
    scrambleVerifyLockRef.current = false;
    setIsScrambleCorrect(null);
    setUserLetters([]);
    setShowScrambleHint(false);

    const currentData = userDataRef.current;
    const pool = getCurriculumWordPool(currentData, 16).filter((w) => w.ku.length >= 2 && w.ku.length <= 8 && !w.ku.includes(' '));
    const word = pool[Math.floor(Math.random() * pool.length)] ?? getCurriculumWordPool(currentData, 10)[0];
    setScrambleWord(word);

    const chars = word.ku.toLowerCase().split('').map((char, idx) => ({
      id: `${word.id}-${idx}`,
      char,
      used: false,
    }));
    const shuffled = [...chars].sort(() => Math.random() - 0.5);
    setScrambleLetters(shuffled);
  }, []);

  useEffect(() => {
    if (activeGame === 'scramble') {
      initScrambleWord();
    }
    return () => {
      if (scrambleResetTimerRef.current !== null) window.clearTimeout(scrambleResetTimerRef.current);
    };
  }, [activeGame, initScrambleWord]);

  const selectScrambleLetter = (letterId: string, char: string) => {
    if (isScrambleCorrect) return;
    playTapSound(userLetters.length);
    setScrambleLetters((prev) => prev.map((l) => (l.id === letterId ? { ...l, used: true } : l)));
    setUserLetters((prev) => [...prev, { originalId: letterId, char }]);
  };

  const deselectScrambleLetter = (idx: number) => {
    if (isScrambleCorrect) return;
    const removed = userLetters[idx];
    if (!removed) return;
    playTapSound(0);
    setUserLetters((prev) => prev.filter((_, i) => i !== idx));
    setScrambleLetters((prev) => prev.map((l) => (l.id === removed.originalId ? { ...l, used: false } : l)));
    setIsScrambleCorrect(null);
  };

  const handleVerifyScramble = () => {
    if (!scrambleWord || isScrambleCorrect === true || scrambleVerifyLockRef.current) return;
    scrambleVerifyLockRef.current = true;
    const built = userLetters.map((l) => l.char).join('');
    if (built === scrambleWord.ku.toLowerCase()) {
      const nextScore = scrambleScore + 1;
      playSuccessSound(nextScore);
      setIsScrambleCorrect(true);
      setScrambleScore(nextScore);
      handleGameWin(10);
      if (userData) {
        const currentScores = { ...(userData.gameScores || {}) };
        currentScores.scramble = Math.max(currentScores.scramble || 0, nextScore);
        void updateUserData({ gameScores: currentScores });
      }
    } else {
      playFailureSound();
      setIsScrambleCorrect(false);
      scrambleResetTimerRef.current = window.setTimeout(() => {
        scrambleResetTimerRef.current = null;
        setIsScrambleCorrect(null);
        setUserLetters([]);
        setScrambleLetters((prev) => prev.map((l) => ({ ...l, used: false })));
        scrambleVerifyLockRef.current = false;
      }, 1500);
    }
  };

  const menuCopy = pickLocalized(language, {
    en: {
      heroTitle: isKidsMode ? 'Play & Learn Arcade!' : 'Learn through Play',
      heroDesc: isKidsMode
        ? 'Fun Kurdish games with zero timers & big buttons!'
        : 'Reinforce words from your Learning Map through interactive games.',
      sectionTitle: 'Choose a Game',
      connectTitle: 'Word Connect',
      connectDesc: 'Swipe letters on the wheel to build Kurdish words',
      connectBadge: isKidsMode ? 'KID PICK' : 'POPULAR',
      matchTitle: 'Word Matching',
      matchDesc: 'Pair each Kurdish word with its meaning',
      zombieTitle: 'Zombie Typing',
      zombieDesc: isKidsMode ? 'Fast typing challenge (optional)' : 'Type Kurdish words fast to defend your village',
      benefitTitle: 'Curriculum-Powered Games',
      benefitDesc: 'Every round draws from your unlocked Learning Map words and earns XP + Gems.',
    },
    ar: {
      heroTitle: isKidsMode ? 'صالة الألعاب التعليمية!' : 'تعلّم باللعب والمرح!',
      heroDesc: isKidsMode
        ? 'ألعاب كردية ممتعة بدون مؤقت ضاغط وبأزرار مريحة!'
        : 'عزّز الكلمات التي تتعلّمها في خريطتك عبر ألعاب تفاعلية ممتعة.',
      sectionTitle: 'اختر لعبتك المفضلة',
      connectTitle: 'توصيل الكلمات',
      connectDesc: 'صل الحروف الدائرية لتركيب الكلمات الكردية',
      connectBadge: isKidsMode ? 'للأطفال' : 'مميزة',
      matchTitle: 'مطابقة الكلمات',
      matchDesc: 'طابق الكلمة الكردية مع معناها الصحيح',
      zombieTitle: 'هجوم الزومبي',
      zombieDesc: isKidsMode ? 'تحدي كتابة سريع (اختياري)' : 'اكتب الكلمات الكردية بسرعة لحماية قريتك',
      benefitTitle: 'ألعاب متصلة بمنهجك',
      benefitDesc: 'تعتمد الجولات على الكلمات المفتوحة في مسارك وتمنحك نقاط خبرة وجواهر.',
    },
    ku: {
      heroTitle: isKidsMode ? 'Lîstikên Fêrbûnê!' : 'Bi Lîstikê Fêr Bibe!',
      heroDesc: isKidsMode
        ? 'Lîstikên xweş ên kurdî bê zexta demjimêrê!'
        : 'Peyvên ji Nexşeya xwe ya Fêrbûnê bi lîstikan bihêz bike.',
      sectionTitle: 'Lîstikekê Hilbijêre',
      connectTitle: 'Girêdana Peyvan',
      connectDesc: 'Tîpan li ser çerxê bigihîne hev û peyvên kurdî çêke',
      connectBadge: isKidsMode ? 'BO ZAROKAN' : 'POPULER',
      matchTitle: 'Hevberkirina Peyvan',
      matchDesc: 'Peyva kurdî bi wateya wê re cot bike',
      zombieTitle: 'Nivîsandina Zombî',
      zombieDesc: isKidsMode ? 'Pêşbaziya nivîsandinê (vebijarkî)' : 'Peyvan bilez binivîse û gundê xwe biparêze',
      benefitTitle: 'Lîstikên bi Bernameyê re Girêdayî',
      benefitDesc: 'Her ger peyvên dersên te bi kar tîne û XP û Cewher dide.',
    },
  });

  return (
    <div
      className={`font-sans leading-relaxed transition-colors duration-300 ${
        activeGame === 'menu'
          ? 'w-full min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-24'
          : activeGame === 'zombie'
            ? 'absolute inset-0 z-50 flex flex-col bg-slate-950 text-white overflow-hidden pb-0'
            : 'absolute inset-0 z-50 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-y-auto pb-12'
      }`}
    >
      {celebrate && globalThis.window !== undefined && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={140}
        />
      )}

      {/* ==================== ARCADE MENU ==================== */}
      {activeGame === 'menu' && (
        <motion.div
          className="p-4 lg:p-8 space-y-5 pb-24 max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-flat border border-line-soft dark:border-slate-800 relative overflow-hidden flex items-center justify-between gap-4">
            <div className="relative z-10 space-y-1 text-start">
              <h2 className="text-2xl font-black tracking-tight text-ink">{menuCopy.heroTitle}</h2>
              <p className="text-xs sm:text-sm text-muted font-semibold">{menuCopy.heroDesc}</p>
            </div>
            <div className="w-14 h-14 bg-[#FFF3D6] dark:bg-[#3A2F14] rounded-2xl flex items-center justify-center shrink-0 border border-[#FFB300]/30">
              <Gamepad2 className="w-8 h-8 text-[#B8860B] dark:text-[#FFCE6B]" />
            </div>
          </div>

          <h3 className="font-black text-ink text-sm uppercase tracking-wider px-1">
            {menuCopy.sectionTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Word Connect (Featured) */}
            <button
              type="button"
              onClick={() => setActiveGame('connect')}
              className="sm:col-span-2 bg-white dark:bg-slate-900 border-2 border-[#FFB300]/60 rounded-3xl p-5 flex items-center justify-between gap-4 text-start shadow-flat hover:border-[#FFB300] transition-all group cursor-pointer min-h-[104px]"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-2xl bg-[#FFB300] text-[#432C00] flex items-center justify-center shrink-0 shadow-[0_3px_0_#E69500]">
                  <Workflow className="w-7 h-7" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-black text-ink text-base leading-tight">{menuCopy.connectTitle}</h4>
                    <span className="bg-amber-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                      {menuCopy.connectBadge}
                    </span>
                  </div>
                  <p className="text-muted text-xs font-semibold leading-snug">{menuCopy.connectDesc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted shrink-0 rtl:rotate-180" />
            </button>

            {/* 2. Memory Match (100% Live!) */}
            <button
              type="button"
              onClick={() => setActiveGame('memory')}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-center shadow-flat hover:border-[#FFB300] transition-all cursor-pointer min-h-[156px]"
            >
              <div className="w-13 h-13 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Brain className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-ink text-sm leading-tight">{t(language, 'memory_match_title')}</h4>
                <p className="text-muted text-xs font-semibold leading-snug">{t(language, 'memory_match_desc')}</p>
              </div>
            </button>

            {/* 3. Word Matching */}
            <button
              type="button"
              onClick={() => setActiveGame('matching')}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-center shadow-flat hover:border-emerald-500 transition-all cursor-pointer min-h-[156px]"
            >
              <div className="w-13 h-13 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Puzzle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-ink text-sm leading-tight">{menuCopy.matchTitle}</h4>
                <p className="text-muted text-xs font-semibold leading-snug">{menuCopy.matchDesc}</p>
              </div>
            </button>

            {/* 4. Spelling Scrambler */}
            <button
              type="button"
              onClick={() => setActiveGame('scramble')}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-center shadow-flat hover:border-purple-500 transition-all cursor-pointer min-h-[156px]"
            >
              <div className="w-13 h-13 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <CaseSensitive className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-ink text-sm leading-tight">{st.title}</h4>
                <p className="text-muted text-xs font-semibold leading-snug">{st.menuDesc}</p>
              </div>
            </button>

            {/* 5. Zombie Typing */}
            <button
              type="button"
              onClick={() => setActiveGame('zombie')}
              className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-center shadow-flat hover:border-rose-500 transition-all cursor-pointer min-h-[156px]"
            >
              <div className="w-13 h-13 rounded-2xl bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Skull className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-ink text-sm leading-tight">{menuCopy.zombieTitle}</h4>
                <p className="text-muted text-xs font-semibold leading-snug">{menuCopy.zombieDesc}</p>
              </div>
            </button>
          </div>

          <div className="bg-[#FFF6E0] dark:bg-slate-900 border border-[#FFB300]/30 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFB300] text-[#432C00] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-start">
              <div className="text-xs font-black text-ink">{menuCopy.benefitTitle}</div>
              <p className="text-xs text-muted font-semibold mt-0.5">{menuCopy.benefitDesc}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================== LIVE GAME VIEWS ==================== */}
      {activeGame === 'memory' && (
        <MemoMemoryMatchGame onWin={handleGameWin} onExit={handleExitToMenu} />
      )}

      {activeGame === 'matching' && (
        <MemoWordMatchingGame
          vocabulary={gameVocabulary}
          language={language}
          isKidsMode={isKidsMode}
          onWin={handleGameWin}
          onClose={handleExitToMenu}
        />
      )}

      {activeGame === 'zombie' && (
        <MemoZombieTypingGame
          vocabulary={gameVocabulary}
          language={language}
          onWin={handleGameWin}
          onClose={handleExitToMenu}
        />
      )}

      {activeGame === 'connect' && (
        <MemoWordConnectGame
          vocabulary={gameVocabulary}
          language={language}
          onWin={handleGameWin}
          onClose={handleExitToMenu}
        />
      )}

      {activeGame === 'scramble' && scrambleWord && (
        <GameShell
          title={st.title}
          scoreLabel={st.scoreLabel}
          scoreValue={scrambleScore}
          onExit={handleExitToMenu}
          onRestart={() => {
            setScrambleScore(0);
            initScrambleWord();
          }}
        >
          <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-6 space-y-6 shadow-flat">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold text-[#8A6100] dark:text-[#FFCE6B] uppercase tracking-wider">
                {st.prompt}
              </span>
              {scrambleWord.emoji && (
                <div className="text-4xl select-none" aria-hidden="true">
                  {scrambleWord.emoji}
                </div>
              )}
              <div className="text-2xl font-black text-ink">
                {pickLocalized(language, {
                  en: scrambleWord.en,
                  ar: scrambleWord.ar,
                  ku: `${scrambleWord.en} · ${scrambleWord.ar}`,
                })}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowScrambleHint((v) => {
                    if (!v) playRewardSound();
                    return !v;
                  });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                {showScrambleHint ? st.hideHint : st.showHint}
              </button>
              {showScrambleHint && (
                <div className="text-xs font-black text-[#8A6100] dark:text-[#FFCE6B]" dir="ltr">
                  {st.hintStarts} {scrambleWord.ku[0].toUpperCase()}
                </div>
              )}
            </div>

            {/* Answer slots */}
            <div className="flex flex-wrap justify-center gap-2 min-h-[56px]" dir="ltr">
              {scrambleWord.ku.split('').map((_, idx) => {
                const chosen = userLetters[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!chosen || isScrambleCorrect === true}
                    onClick={() => chosen && deselectScrambleLetter(idx)}
                    aria-label={chosen ? `${st.removeLetter} ${chosen.char}` : st.slotEmpty}
                    className={`w-12 h-12 rounded-2xl border-2 font-mono text-xl font-black flex items-center justify-center transition-all cursor-pointer ${
                      isScrambleCorrect === true
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                        : isScrambleCorrect === false
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-600 animate-shake'
                          : chosen
                            ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14] text-ink'
                            : 'border-dashed border-line-soft dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
                    }`}
                  >
                    {chosen ? chosen.char : ''}
                  </button>
                );
              })}
            </div>

            {/* Available letters */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-muted text-center">{st.available}</div>
              <div className="flex flex-wrap justify-center gap-2" dir="ltr">
                {scrambleLetters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    disabled={item.used || isScrambleCorrect === true}
                    onClick={() => selectScrambleLetter(item.id, item.char)}
                    className={`w-12 h-12 rounded-2xl border-2 font-mono text-xl font-black transition-all cursor-pointer ${
                      item.used
                        ? 'opacity-25 border-transparent bg-slate-100 dark:bg-slate-800 cursor-default'
                        : 'border-line-soft dark:border-slate-700 bg-white dark:bg-slate-800 text-ink hover:border-[#FFB300] shadow-xs'
                    }`}
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 pt-2">
              {isScrambleCorrect === true ? (
                <button
                  type="button"
                  onClick={initScrambleWord}
                  className="w-full py-3.5 min-h-[48px] rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm cursor-pointer"
                >
                  {st.next}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setUserLetters([]);
                      setScrambleLetters((prev) => prev.map((l) => ({ ...l, used: false })));
                      setIsScrambleCorrect(null);
                    }}
                    className="px-4 min-h-[48px] rounded-2xl bg-slate-100 dark:bg-slate-800 text-ink font-extrabold text-sm cursor-pointer"
                  >
                    {st.reset}
                  </button>
                  <button
                    type="button"
                    disabled={userLetters.length !== scrambleWord.ku.length}
                    onClick={handleVerifyScramble}
                    className="flex-1 min-h-[48px] rounded-2xl bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] font-black text-sm cursor-pointer disabled:opacity-40"
                  >
                    {st.verify}
                  </button>
                </>
              )}
            </div>
          </div>
        </GameShell>
      )}
    </div>
  );
}
