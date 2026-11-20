import { j as jsxRuntimeExports, r as reactExports, R as React } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { c as cn, g as playFailureSound, f as playSuccessSound, e as playCompleteSound, L as startZombieMusic, O as playZombieDamageSound, Q as playZombieKillSound, U as stopZombieMusic, u as useAuth } from "./index-C4ml4lrv.js";
import { v as vocabulary } from "./kurmanji-DANKPvwI.js";
import { R as ReactConfetti } from "./vendor-confetti-Dl7ieZFU.js";
import { P as Progress } from "./Progress-BMdEo1cu.js";
import { A as ArrowLeft, I as Clock, d as Heart, N as RefreshCw, aB as Lightbulb, bE as Coins, i as Award, bc as ArrowRight, h as Settings, bF as Skull, p as BookOpen, Z as Zap, T as Trophy, a5 as Play, bG as Pause, V as Volume2, b3 as RotateCcw, Y as House, X, bu as VolumeX, k as Star, bH as Shuffle, b as Gamepad2, aS as Workflow, v as ChevronRight, bI as Puzzle, bJ as CaseSensitive, aK as Lock, a$ as Brain, b1 as CircleQuestionMark, j as Compass, q as Briefcase, b6 as Stethoscope, G as GraduationCap, aa as Laptop, a1 as MessageSquare, m as Smile, a0 as Palette, ag as Apple, ah as Cat, o as Users } from "./vendor-icons-UlZxPqC8.js";
import { A as AnimatePresence, m as motion } from "./vendor-motion-D8-S3eer.js";
import { g as getPrimaryAnswerVariant } from "./answerUtils-WRjxYtEq.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
function StatPill({ icon, label, value, className, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 border border-line px-3.5 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)]",
        className
      ),
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[#FFB300]", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-ink", children: value })
      ]
    }
  );
}
function GameHeader({
  title,
  onExit,
  exitLabel,
  stat,
  indicator,
  action,
  tone = "light"
}) {
  const dark = tone === "dark";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: cn(
        "w-full max-w-md mx-auto min-h-[56px] px-0.5 py-1.5 mb-2 flex items-center gap-2.5 shrink-0",
        dark ? "text-white" : "text-ink"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onExit,
            "aria-label": exitLabel,
            className: cn(
              "min-w-[44px] min-h-[44px] shrink-0 rounded-full flex items-center justify-center border transition-all active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FFB300]",
              dark ? "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white" : "bg-white dark:bg-slate-900 border-line-soft text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 rtl:-scale-x-100" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { dir: "auto", className: "flex-1 min-w-0 truncate text-lg font-black leading-tight text-start", children: title }),
        indicator && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 flex items-center gap-1", children: indicator }),
        stat && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "shrink-0 flex items-center gap-1.5 rounded-full px-3 min-h-[36px] border",
              dark ? "bg-slate-900/80 border-slate-800" : "bg-white dark:bg-slate-900 border-line-soft shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[9px] font-black uppercase tracking-widest", dark ? "text-slate-500" : "text-muted"), children: stat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black tabular-nums", children: stat.value })
            ]
          }
        ),
        action
      ]
    }
  );
}
function WordMatchingGame({ vocabulary: vocabulary2, language, onWin, onClose }) {
  const [round, setRound] = reactExports.useState(1);
  const [pairsCount, setPairsCount] = reactExports.useState(4);
  const [lives, setLives] = reactExports.useState(null);
  const [isGameOver, setIsGameOver] = reactExports.useState(false);
  const [kurdishList, setKurdishList] = reactExports.useState([]);
  const [arabicList, setArabicList] = reactExports.useState([]);
  const [selectedKu, setSelectedKu] = reactExports.useState(null);
  const [selectedAr, setSelectedAr] = reactExports.useState(null);
  const [recentCompleted, setRecentCompleted] = reactExports.useState(false);
  const [gainedXP, setGainedXP] = reactExports.useState(0);
  const [timeLeft, setTimeLeft] = reactExports.useState(45);
  const roundRewardedRef = reactExports.useRef(false);
  const advanceRoundLockRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (isGameOver || recentCompleted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          playFailureSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, [isGameOver, recentCompleted, timeLeft]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const startNewRound = (targetRound) => {
    roundRewardedRef.current = false;
    setRecentCompleted(false);
    setIsGameOver(false);
    setSelectedKu(null);
    setSelectedAr(null);
    setTimeLeft(Math.max(30, 50 - targetRound * 5));
    let count = 4;
    if (targetRound === 2) count = 5;
    else if (targetRound === 3) count = 5;
    else if (targetRound === 4) count = 6;
    else if (targetRound >= 5) count = 6;
    setPairsCount(count);
    if (targetRound === 1) {
      setLives(null);
    } else if (targetRound === 2) {
      setLives(5);
    } else if (targetRound === 3) {
      setLives(4);
    } else {
      setLives(3);
    }
    const shuffledVocab = [...vocabulary2].sort(() => 0.5 - Math.random());
    const selectedWords = shuffledVocab.slice(0, count);
    const kuItems = selectedWords.map((word) => ({
      id: `${word.id}-ku`,
      text: word.ku,
      wordId: word.id,
      isMatched: false,
      state: "default"
    })).sort(() => 0.5 - Math.random());
    const arItems = selectedWords.map((word) => ({
      id: `${word.id}-ar`,
      text: word.ar,
      wordId: word.id,
      isMatched: false,
      state: "default"
    })).sort(() => 0.5 - Math.random());
    setKurdishList(kuItems);
    setArabicList(arItems);
  };
  reactExports.useEffect(() => {
    if (vocabulary2 && vocabulary2.length > 0) {
      startNewRound(round);
    }
  }, [vocabulary2, round]);
  const handlePairSelection = (id, type) => {
    if (recentCompleted || isGameOver) return;
    if (type === "ku") {
      const item = kurdishList.find((i) => i.id === id);
      if (!item || item.isMatched) return;
      if (selectedKu === id) {
        setSelectedKu(null);
        setKurdishList((prev) => prev.map((i) => i.id === id ? { ...i, state: "default" } : i));
      } else {
        setSelectedKu(id);
        setKurdishList((prev) => prev.map((i) => i.id === id ? { ...i, state: "selected" } : i.state === "selected" ? { ...i, state: "default" } : i));
      }
    } else {
      const item = arabicList.find((i) => i.id === id);
      if (!item || item.isMatched) return;
      if (selectedAr === id) {
        setSelectedAr(null);
        setArabicList((prev) => prev.map((i) => i.id === id ? { ...i, state: "default" } : i));
      } else {
        setSelectedAr(id);
        setArabicList((prev) => prev.map((i) => i.id === id ? { ...i, state: "selected" } : i.state === "selected" ? { ...i, state: "default" } : i));
      }
    }
  };
  reactExports.useEffect(() => {
    if (selectedKu && selectedAr) {
      const kuItem = kurdishList.find((i) => i.id === selectedKu);
      const arItem = arabicList.find((i) => i.id === selectedAr);
      if (kuItem && arItem) {
        if (kuItem.wordId === arItem.wordId) {
          playSuccessSound();
          setGainedXP((prev) => prev + 5);
          setKurdishList((prev) => prev.map((i) => i.id === selectedKu ? { ...i, isMatched: true, state: "correct" } : i));
          setArabicList((prev) => prev.map((i) => i.id === selectedAr ? { ...i, isMatched: true, state: "correct" } : i));
          setSelectedKu(null);
          setSelectedAr(null);
        } else {
          playFailureSound();
          if (round > 1 && lives !== null) {
            setLives((curr) => {
              if (curr === null) return null;
              const next = curr - 1;
              if (next <= 0) {
                setIsGameOver(true);
              }
              return next;
            });
          }
          setKurdishList((prev) => prev.map((i) => i.id === selectedKu ? { ...i, state: "wrong" } : i));
          setArabicList((prev) => prev.map((i) => i.id === selectedAr ? { ...i, state: "wrong" } : i));
          const currentKu = selectedKu;
          const currentAr = selectedAr;
          setSelectedKu(null);
          setSelectedAr(null);
          setTimeout(() => {
            setKurdishList((prev) => prev.map((i) => i.id === currentKu && i.state === "wrong" ? { ...i, state: "default" } : i));
            setArabicList((prev) => prev.map((i) => i.id === currentAr && i.state === "wrong" ? { ...i, state: "default" } : i));
          }, 800);
        }
      }
    }
  }, [selectedKu, selectedAr, round, lives]);
  reactExports.useEffect(() => {
    if (kurdishList.length > 0 && kurdishList.every((i) => i.isMatched) && !recentCompleted && !roundRewardedRef.current) {
      roundRewardedRef.current = true;
      advanceRoundLockRef.current = false;
      setRecentCompleted(true);
      const xpEarned = 10 + (round - 1) * 5;
      setGainedXP((prev) => prev + xpEarned);
      onWin(xpEarned);
      playCompleteSound();
    }
  }, [kurdishList, round, onWin, recentCompleted]);
  const resetAtRef = reactExports.useRef(0);
  const resetGameHandler = () => {
    const now = Date.now();
    if (now - resetAtRef.current < 500) return;
    resetAtRef.current = now;
    setRound(1);
    setGainedXP(0);
    setIsGameOver(false);
    startNewRound(1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full bg-slate-50 dark:bg-slate-950 p-4 pb-24 max-w-lg mx-auto w-full antialiased relative overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GameHeader,
      {
        title: language !== "ar" ? "Word Matching" : "مطابقة الكلمات",
        onExit: onClose,
        exitLabel: language !== "ar" ? "Exit game" : "الخروج من اللعبة",
        indicator: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full px-2.5 min-h-[36px] bg-white dark:bg-slate-900 border border-line-soft shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-xs font-black tabular-nums text-ink", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-[#B45309]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", children: formatTime(timeLeft) })
        ] }),
        stat: { label: language !== "ar" ? "XP" : "خبرة", value: gainedXP }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black text-slate-600 dark:text-slate-300", children: language !== "ar" ? "Connect the word with its correct meaning" : "صل الكلمة بمعناها الصحيح" }) }),
    isGameOver ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-red-100 dark:bg-red-950/20 border border-red-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-10 h-10 text-red-500 fill-red-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black text-red-600 dark:text-red-500 uppercase tracking-widest", children: language !== "ar" ? "Attempts Depleted" : "استنفاد المحاولات!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 font-semibold", children: language !== "ar" ? `You made too many wrong connections at Round ${round}.` : `للأسف أخطأت في توصيل الكلمات في الجولة ${round}.` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl w-full max-w-sm text-xs space-y-2 text-start shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-center font-bold", children: language !== "ar" ? "Battle History" : "سجل التوصيل الإجمالي" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-400 mt-2 font-bold select-none pb-1.5 border-b border-slate-200 dark:border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Max Round Reached:" : "أقصى جولة وصلتها:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-600 font-black", children: round })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-400 mt-2 font-bold select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "XP Points Gained:" : "النقاط التي جمعتها:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-500 font-black", children: [
            gainedXP,
            " XP"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "flex-1 py-3.5 min-h-[44px] bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 active:scale-95 text-slate-700 dark:text-slate-300 font-bold rounded-full text-xs transition-all border border-slate-200 dark:border-slate-800 cursor-pointer outline-none",
            children: language !== "ar" ? "Exit to Games" : "صندوق الألعاب"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: resetGameHandler,
            className: "flex-1 py-3.5 min-h-[44px] bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] shadow-[0_2px_0_#E69500] active:scale-95 font-extrabold rounded-full text-xs transition-all cursor-pointer outline-none flex items-center justify-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Try from Round 1" : "ابدأ مجدداً كالمحترفين" })
            ]
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/10 dark:border-slate-800 shadow-xs mb-6 text-center space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs text-slate-400 font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Matched Pairs" : "الأزواج الموصولة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            kurdishList.filter((i) => i.isMatched).length,
            " / ",
            pairsCount
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: kurdishList.filter((i) => i.isMatched).length, max: pairsCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs text-slate-400 font-bold pt-1 border-t border-dashed border-slate-200 dark:border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Hearts / Attempts" : "القلوب ومحاولات الخطأ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex gap-1 items-center", children: lives === null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-500 text-[11px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full", children: [
            "∞ ",
            language !== "ar" ? "Unlimited (R1)" : "غير محدودة (ج1)"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({ length: lives }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-red-500 fill-red-500 animate-pulse" }, i)) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold", children: language !== "ar" ? "Tap a Kurdish word, then tap its matching Arabic meaning!" : "اختر الكلمة الكوردية، ثم اضغط على معناها الصحيح بالعربية لتوصيلهما!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 items-center py-2 h-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black text-slate-400 text-center uppercase tracking-widest leading-none mb-1", children: language !== "ar" ? "Kurmanji" : "كرمانجي" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: kurdishList.map((item) => {
            const isSelected = selectedKu === item.id;
            const isWrong = item.state === "wrong";
            const isCorrect = item.isMatched;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                layoutId: item.id,
                disabled: item.isMatched,
                onClick: () => handlePairSelection(item.id, "ku"),
                className: `w-full py-4.5 px-3 rounded-2xl font-black text-sm border-2 flex items-center justify-center transition-all ${isCorrect ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-900 dark:text-emerald-300 scale-95 opacity-50 cursor-not-allowed" : isWrong ? "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-800 dark:text-red-300 animate-[shake_0.4s_ease-in-out]" : isSelected ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-700 dark:text-indigo-400 ring-4 ring-indigo-500/10" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-800 hover:bg-slate-50/50 active:scale-[0.98]"} cursor-pointer min-h-[58px] outline-none`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-wide text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: item.text }) })
              },
              item.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black text-slate-400 text-center uppercase tracking-widest leading-none mb-1", children: language !== "ar" ? "Arabic" : "العربية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: arabicList.map((item) => {
            const isSelected = selectedAr === item.id;
            const isWrong = item.state === "wrong";
            const isCorrect = item.isMatched;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                layoutId: item.id,
                disabled: item.isMatched,
                onClick: () => handlePairSelection(item.id, "ar"),
                className: `w-full py-4.5 px-3 rounded-2xl font-black text-sm border-2 flex items-center justify-center transition-all ${isCorrect ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-900 dark:text-emerald-300 scale-95 opacity-50 cursor-not-allowed" : isWrong ? "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-800 dark:text-red-300 animate-[shake_0.4s_ease-in-out]" : isSelected ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-700 dark:text-indigo-400 ring-4 ring-indigo-500/10" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-800 hover:bg-slate-50/50 active:scale-[0.98]"} cursor-pointer min-h-[58px] outline-none`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-wide text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: item.text }) })
              },
              item.id
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mt-6 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              const unmatchedKu = kurdishList.find((k) => !k.isMatched);
              if (unmatchedKu) {
                const matchingAr = arabicList.find((a) => a.wordId === unmatchedKu.wordId);
                if (matchingAr) {
                  playSuccessSound();
                  setSelectedKu(null);
                  setSelectedAr(null);
                  setKurdishList((prev) => prev.map((i) => i.id === unmatchedKu.id ? { ...i, isMatched: true, state: "correct" } : i));
                  setArabicList((prev) => prev.map((i) => i.id === matchingAr.id ? { ...i, isMatched: true, state: "correct" } : i));
                }
              }
            },
            className: "flex-1 py-3 px-4 min-h-[44px] bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-full flex items-center justify-center gap-2 font-black text-xs text-amber-700 dark:text-amber-400 hover:bg-amber-100 transition-colors shadow-xs cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-amber-500 fill-amber-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5 text-yellow-500 fill-yellow-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Hint" : "تلميح" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: resetGameHandler,
            className: "flex-1 py-3 px-4 min-h-[44px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center gap-2 font-black text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-indigo-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Restart" : "إعادة اللعبة" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: recentCompleted && !isGameOver && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9, y: 30 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 30 },
        className: "w-full max-w-sm bg-gradient-to-br from-indigo-600 to-purple-800 rounded-3xl p-6 text-center text-white space-y-4 shadow-2xl relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 text-7xl opacity-5 select-none pointer-events-none", children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black", children: language !== "ar" ? "Brilliant Connection!" : "ترابط عبقري وممتاز!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-indigo-100", children: language !== "ar" ? "All words matched perfectly in this round." : `أوصلت الكلمات الكوردية مع معانيها ببراعة في الجولة ${round}!` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex bg-white/15 rounded-2xl items-center justify-center py-2.5 px-4 gap-2 border border-white/5 font-extrabold text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "+",
              10 + (round - 1) * 5,
              " XP ",
              language !== "ar" ? "Points Earned" : "نقطة إضافية مضافة"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 relative z-10 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                className: "flex-1 py-3 min-h-[44px] bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold rounded-full text-xs transition-all border border-white/10 cursor-pointer outline-none",
                children: language !== "ar" ? "Back" : "الرئيسية"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (advanceRoundLockRef.current) return;
                  advanceRoundLockRef.current = true;
                  setRound((r) => r + 1);
                },
                className: "flex-1 py-3 min-h-[44px] bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black rounded-full text-xs hover:from-emerald-400 hover:to-emerald-500 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 outline-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Next Round" : "الجولة التالية" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 rtl:rotate-180" })
                ]
              }
            )
          ] })
        ]
      }
    ) }) })
  ] });
}
const SPECIAL_KURDISH_KEYS = [
  { key: "Ç", helper: "C" },
  { key: "Ê", helper: "E" },
  { key: "Î", helper: "I" },
  { key: "Ş", helper: "S" },
  { key: "Û", helper: "U" }
];
const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];
function ZombieTypingGame({ vocabulary: vocabulary2, language, onWin, onClose }) {
  const zt = {
    en: {
      kicker: "ATTACK OF THE",
      title: "ZOMBIES",
      tagline: "Learn, defend, survive!",
      rules: "HOW TO PLAY",
      rule1t: "Type the correct words",
      rule1d: "Spell without mistakes",
      rule2t: "Level up your language",
      rule2d: "Reading + listening + writing",
      rule3t: "Beat every wave",
      rule3d: "Push your high score!",
      best: "YOUR BEST SCORE",
      start: "START GAME",
      wave: "WAVE",
      score: "SCORE",
      time: "TIME",
      prompt: "TYPE THIS WORD",
      canType: "You can type:",
      or: "or",
      placeholder: "Type your answer…",
      clear: "Clear",
      space: "Space",
      submit: "ENTER",
      lost: "GAME OVER",
      lostSub: "The zombies got you!",
      lostDesc: "Shake it off — try again.",
      tryAgain: "TRY AGAIN",
      backHome: "BACK TO GAMES",
      paused: "GAME PAUSED",
      pausedSub: "Take a breather.",
      resume: "Resume",
      mainMenu: "Main Menu",
      settings: "Settings",
      sound: "Sound Effects",
      close: "Close",
      speak: "Pronounce word"
    },
    ku: {
      kicker: "ÊRÎŞA",
      title: "ZOMBIYAN",
      tagline: "Fêr bibe, biparêze, serkeftî be!",
      rules: "ÇAWA TÊ LÎSTIN",
      rule1t: "Peyvên rast binivîse",
      rule1d: "{zt.rule1d}",
      rule2t: "Zimanê xwe bi pêş bixe",
      rule2d: "Xwendin + Guhdarîkirin + Nivîsandin",
      rule3t: "Hemû pêlan têk bibe",
      rule3d: "Puana xwe bilind bike!",
      best: "PUANA TE YA HERÎ BILIND",
      start: "DEST PÊ BIKE",
      wave: "PÊL",
      score: "PUAN",
      time: "DEM",
      prompt: "VÊ PEYVÊ BINIVÎSE",
      canType: "Dikarî binivîsî:",
      or: "an",
      placeholder: "Bersiva xwe binivîse…",
      clear: "Paqij bike",
      space: "Navber",
      submit: "TEMAM",
      lost: "DAWÎ!",
      lostSub: "Zombî bi ser ketin!",
      lostDesc: "{zt.lostDesc}",
      tryAgain: "DÎSA BICERIBÎNE",
      backHome: "VEGERE LÎSTIKAN",
      paused: "LÎSTIK RAWESTIYA",
      pausedSub: "Bêhna xwe veke.",
      resume: "Berdewam bike",
      mainMenu: "Menuya Serî",
      settings: "Mîheng",
      sound: "Deng",
      close: "Bigire",
      speak: "Peyvê bibihîze"
    },
    ar: {
      kicker: "هجوم",
      title: "الزومبي",
      tagline: "تعلّم، دافع، انجُ!",
      rules: "طريقة اللعب",
      rule1t: "اكتب الكلمات الصحيحة",
      rule1d: "اكتب دون أخطاء",
      rule2t: "طوّر لغتك الكوردية",
      rule2d: "قراءة + استماع + كتابة",
      rule3t: "تغلّب على كل الموجات",
      rule3d: "ارفع رقمك القياسي!",
      best: "أعلى نتيجة لك",
      start: "ابدأ اللعب",
      wave: "الموجة",
      score: "النقاط",
      time: "الوقت",
      prompt: "اكتب هذه الكلمة",
      canType: "يمكنك كتابة:",
      or: "أو",
      placeholder: "اكتب إجابتك…",
      clear: "مسح",
      space: "مسافة",
      submit: "إدخال",
      lost: "انتهت اللعبة!",
      lostSub: "أمسك بك الزومبي!",
      lostDesc: "حاول مرة أخرى.",
      tryAgain: "حاول مجدداً",
      backHome: "العودة للألعاب",
      paused: "اللعبة متوقفة",
      pausedSub: "خذ نفساً.",
      resume: "استئناف",
      mainMenu: "القائمة الرئيسية",
      settings: "الإعدادات",
      sound: "المؤثرات الصوتية",
      close: "إغلاق",
      speak: "انطق الكلمة"
    }
  }[language === "ku" ? "ku" : language === "ar" ? "ar" : "en"];
  const [gameState, setGameState] = reactExports.useState("start");
  const [score, setScore] = reactExports.useState(0);
  const [highScore, setHighScore] = reactExports.useState(0);
  const [wave, setWave] = reactExports.useState(1);
  const [lives, setLives] = reactExports.useState(3);
  const [currentWord, setCurrentWord] = reactExports.useState(null);
  const [inputValue, setInputValue] = reactExports.useState("");
  const [timeLeft, setTimeLeft] = reactExports.useState(100);
  const [gameTimeSeconds, setGameTimeSeconds] = reactExports.useState(0);
  const [wordsCleared, setWordsCleared] = reactExports.useState(0);
  const [shakeInput, setShakeInput] = reactExports.useState(false);
  const [soundEnabled, setSoundEnabled] = reactExports.useState(true);
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const rootRef = reactExports.useRef(null);
  const timerRef = reactExports.useRef(null);
  const secondTimerRef = reactExports.useRef(null);
  const gameOverAwardedRef = reactExports.useRef(false);
  const isResolvingRef = reactExports.useRef(false);
  const timeoutPendingRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const saved = localStorage.getItem("kurdish_zombie_highscore");
    if (saved) {
      const parsed = parseInt(saved, 10);
      setHighScore(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
    }
  }, []);
  reactExports.useEffect(() => {
    if (gameState === "playing" && soundEnabled) {
      startZombieMusic();
    } else {
      stopZombieMusic();
    }
    return () => {
      stopZombieMusic();
    };
  }, [gameState, soundEnabled]);
  const pickNewWord = (avoidId) => {
    if (!vocabulary2 || vocabulary2.length === 0) return;
    let pool = vocabulary2.filter((w) => w.ku && w.ku.trim().length > 0);
    if (avoidId && pool.length > 1) {
      pool = pool.filter((w) => w.id !== avoidId);
    }
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];
    setCurrentWord(selected);
    setTimeLeft(100);
    setInputValue("");
  };
  const startGame = () => {
    var _a;
    gameOverAwardedRef.current = false;
    isResolvingRef.current = false;
    timeoutPendingRef.current = false;
    setScore(0);
    setWave(1);
    setLives(3);
    setGameTimeSeconds(0);
    setWordsCleared(0);
    setGameState("playing");
    pickNewWord();
    if ((_a = rootRef.current) == null ? void 0 : _a.scrollTo) {
      window.setTimeout(() => {
        var _a2;
        return (_a2 = rootRef.current) == null ? void 0 : _a2.scrollTo({ top: 0 });
      }, 0);
    } else {
      window.setTimeout(() => {
        if (rootRef.current) rootRef.current.scrollTop = 0;
      }, 0);
    }
    window.setTimeout(() => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
    }, 0);
  };
  const speakWord = (text) => {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = "tr-TR";
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error(e);
    }
  };
  const livesRef = reactExports.useRef(lives);
  livesRef.current = lives;
  const scoreRef = reactExports.useRef(score);
  scoreRef.current = score;
  const highScoreRef = reactExports.useRef(highScore);
  highScoreRef.current = highScore;
  const currentWordRef = reactExports.useRef(currentWord);
  currentWordRef.current = currentWord;
  reactExports.useEffect(() => {
    if (gameState !== "playing") {
      if (timerRef.current) clearInterval(timerRef.current);
      if (secondTimerRef.current) clearInterval(secondTimerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const speed = 0.8 + wave * 0.15;
        const nextTime = prev - speed;
        if (nextTime <= 0) {
          if (!timeoutPendingRef.current) {
            timeoutPendingRef.current = true;
            setTimeout(() => {
              timeoutPendingRef.current = false;
              handleTimeOut();
            }, 0);
          }
          return 100;
        }
        return nextTime;
      });
    }, 100);
    secondTimerRef.current = setInterval(() => {
      setGameTimeSeconds((s) => s + 1);
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (secondTimerRef.current) clearInterval(secondTimerRef.current);
    };
  }, [gameState, wave]);
  const handleTimeOut = () => {
    if (isResolvingRef.current) return;
    if (gameOverAwardedRef.current || livesRef.current <= 0) return;
    isResolvingRef.current = true;
    if (soundEnabled) playZombieDamageSound();
    const nextLives = livesRef.current - 1;
    setLives(nextLives);
    if (nextLives <= 0) {
      triggerGameOver(scoreRef.current);
    } else if (currentWordRef.current) {
      pickNewWord(currentWordRef.current.id);
      window.setTimeout(() => {
        var _a;
        isResolvingRef.current = false;
        (_a = inputRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
      }, 0);
      return;
    }
    isResolvingRef.current = false;
  };
  const triggerGameOver = (finalScore) => {
    if (gameOverAwardedRef.current) return;
    gameOverAwardedRef.current = true;
    isResolvingRef.current = false;
    setGameState("gameover");
    if (soundEnabled) playCompleteSound();
    if (finalScore > highScoreRef.current) {
      setHighScore(finalScore);
      localStorage.setItem("kurdish_zombie_highscore", finalScore.toString());
    }
    const xp = Math.min(30, Math.max(10, Math.floor(finalScore / 2)));
    if (xp > 0) {
      window.setTimeout(() => {
        onWin(xp);
      }, 0);
    }
  };
  const normalizeKurdishText = (text) => {
    return text.trim().toLowerCase().replace(/[çÇ]/g, "c").replace(/[êÊ]/g, "e").replace(/[îÎ]/g, "i").replace(/[şŞ]/g, "s").replace(/[ûÛ]/g, "u").replace(/[^\w\s]/gi, "").replace(/\s+/g, " ");
  };
  const getWordVariants = (targetKuWord) => {
    if (!targetKuWord) return [];
    const parts = targetKuWord.split(/[/,]| or /gi).map((p) => p.trim()).filter(Boolean);
    const full = targetKuWord.trim();
    if (parts.length > 0 && !parts.includes(full)) {
      parts.push(full);
    }
    return parts;
  };
  const isInputMatchingWord = (typedInput, targetKuWord) => {
    if (!typedInput || !targetKuWord) return false;
    const rawTyped = typedInput.trim().toLowerCase();
    const normTyped = normalizeKurdishText(typedInput);
    if (!rawTyped) return false;
    const variants = getWordVariants(targetKuWord);
    for (const v of variants) {
      const rawVariant = v.toLowerCase();
      const normVariant = normalizeKurdishText(v);
      if (rawTyped === rawVariant || normTyped === normVariant) {
        return true;
      }
    }
    return false;
  };
  const handleSubmit = () => {
    if (isResolvingRef.current || gameState !== "playing") return;
    if (!currentWord || !inputValue.trim()) return;
    isResolvingRef.current = true;
    if (isInputMatchingWord(inputValue, currentWord.ku)) {
      if (soundEnabled) playZombieKillSound();
      const addedPoints = 15;
      setScore((s) => s + addedPoints);
      const nextCleared = wordsCleared + 1;
      setWordsCleared(nextCleared);
      if (nextCleared % 3 === 0) {
        setWave((w) => w + 1);
      }
      pickNewWord(currentWord.id);
      window.setTimeout(() => {
        var _a;
        isResolvingRef.current = false;
        (_a = inputRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
      }, 0);
    } else {
      setShakeInput(true);
      if (soundEnabled) playZombieDamageSound();
      window.setTimeout(() => {
        var _a;
        setShakeInput(false);
        isResolvingRef.current = false;
        (_a = inputRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
      }, 400);
    }
  };
  reactExports.useEffect(() => {
    if (gameState !== "playing") return;
    const handleKeyDown = (e) => {
      if (e.key !== "Enter") return;
      if (document.activeElement === inputRef.current) return;
      handleSubmit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, inputValue, currentWord]);
  const handleVirtualKey = (key) => {
    setInputValue((prev) => prev + key);
  };
  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };
  const isAttacking = timeLeft < 35;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, className: `flex flex-col min-h-0 h-full p-4 max-w-md mx-auto w-full font-sans relative select-none rounded-3xl overflow-x-hidden overflow-y-auto ${gameState === "start" ? "bg-[#FBFBFA] text-[#1E293B] border border-[#F1F5F9] shadow-[0_4px_20px_rgba(0,0,0,0.03)]" : "bg-[#0B0E1D] text-white shadow-2xl border border-slate-800"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GameHeader,
      {
        tone: gameState === "start" ? "light" : "dark",
        title: zt.title,
        onExit: onClose,
        exitLabel: zt.mainMenu,
        indicator: gameState === "playing" || gameState === "paused" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-0.5", children: [1, 2, 3].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heart,
          {
            "aria-hidden": "true",
            className: `w-4 h-4 transition-all ${h <= lives ? "text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "text-slate-800 fill-slate-800"}`
          },
          h
        )) }) : void 0,
        stat: gameState === "playing" || gameState === "paused" ? { label: zt.score, value: score } : void 0,
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowSettings(true),
            "aria-label": zt.settings,
            className: `min-w-[44px] min-h-[44px] shrink-0 rounded-full border flex items-center justify-center transition-all cursor-pointer outline-none active:scale-95 ${gameState === "start" ? "bg-white shadow-sm border-[#F1F5F9] text-[#64748B] hover:text-[#1E293B]" : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" })
          }
        )
      }
    ),
    gameState === "start" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between py-2 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFDAD6] border border-[#F1F5F9] text-[#93000A] mb-1 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skull, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-sm font-bold tracking-widest uppercase text-[#64748B]", children: zt.kicker }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-extrabold tracking-widest text-[#BA1A1A] uppercase pt-1", children: zt.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#64748B] font-semibold pt-1", children: zt.tagline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-44 sm:h-48 rounded-3xl overflow-hidden bg-white border border-[#F1F5F9] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-center my-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.10)_0%,transparent_70%)] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 200 200", className: "w-40 h-40 sm:w-44 sm:h-44 z-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M70,160 Q100,140 130,160 L140,200 L60,200 Z", fill: "#4C1D95" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M80,165 Q100,150 120,165 L125,200 L75,200 Z", fill: "#3B0764" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M60,160 C40,140 30,120 20,130 C15,135 30,150 50,170 Z", fill: "#15803D" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M140,160 C160,140 170,120 180,130 C185,135 170,150 150,170 Z", fill: "#15803D" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "70", y: "60", width: "60", height: "70", rx: "20", fill: "#16A34A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "130", rx: "15", ry: "8", fill: "#15803D" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "65", cy: "95", r: "8", fill: "#15803D" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "135", cy: "95", r: "8", fill: "#15803D" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "85", cy: "90", r: "12", fill: "#FEF08A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "85", cy: "90", r: "5", fill: "#854D0E" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "115", cy: "90", r: "12", fill: "#FEF08A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "115", cy: "90", r: "5", fill: "#854D0E" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M82,115 Q100,125 118,115 Z", fill: "#450A0A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "88", y: "115", width: "4", height: "4", fill: "#FFFFFF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "108", y: "115", width: "4", height: "4", fill: "#FFFFFF" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-[#F1F5F9] rounded-3xl p-4 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-center text-[#64748B]", children: zt.rules }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0 text-[#8B5CF6]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-[#1E293B] leading-tight", children: zt.rule1t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[#64748B] font-semibold", children: zt.rule1d })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#FFB300]/20 border border-[#FFB300]/30 flex items-center justify-center shrink-0 text-[#B8860B]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-[#1E293B] leading-tight", children: zt.rule2t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[#64748B] font-semibold", children: zt.rule2d })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0 text-[#10B981]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-[#1E293B] leading-tight", children: zt.rule3t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[#64748B] font-semibold", children: zt.rule3d })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-[#F1F5F9] rounded-3xl p-4 text-center space-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.03)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-[#64748B] block", children: zt.best }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-2xl font-extrabold text-[#FFB300] font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-[#FFB300] fill-[#FFB300]/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: highScore })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: startGame,
          className: "w-full py-4 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:brightness-110 active:scale-[0.98] text-white font-black text-lg tracking-wider transition-all shadow-lg shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-2 outline-none uppercase",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 fill-current" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: zt.start })
          ]
        }
      )
    ] }),
    (gameState === "playing" || gameState === "paused") && currentWord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 flex flex-col justify-between space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatPill, { label: zt.wave, value: wave, className: "bg-slate-900 text-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setGameState("paused"),
            "aria-label": zt.paused,
            className: "min-w-[44px] min-h-[44px] rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-all active:scale-90",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4 fill-current" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative w-full flex-1 min-h-[96px] max-h-52 rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col justify-between p-3 ${isAttacking ? "bg-gradient-to-b from-red-950 via-rose-950/80 to-[#0B0E1D] border-red-600/60 shadow-[0_0_20px_rgba(225,29,72,0.3)]" : "bg-gradient-to-b from-slate-950 via-indigo-950/50 to-[#0B0E1D] border-indigo-900/40"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2)_0%,transparent_80%)] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-2 right-6 w-14 h-14 rounded-full border shadow-md transition-colors ${isAttacking ? "bg-red-200/20 border-red-500/30" : "bg-indigo-100/10 border-white/20"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: isAttacking ? { scale: [1, 1.08, 1], y: [0, -4, 0] } : { y: [0, -2, 0] },
            transition: { repeat: Infinity, duration: isAttacking ? 0.6 : 1.5 },
            className: "w-36 h-36 sm:w-40 sm:h-40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 200 200", className: "w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M70,160 Q100,140 130,160 L140,200 L60,200 Z", fill: isAttacking ? "#7F1D1D" : "#4C1D95" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M80,165 Q100,150 120,165 L125,200 L75,200 Z", fill: isAttacking ? "#450A0A" : "#3B0764" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: isAttacking ? "M50,150 C30,110 20,90 10,100 C5,105 20,130 40,160 Z" : "M60,160 C40,140 30,120 20,130 C15,135 30,150 50,170 Z", fill: "#16A34A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: isAttacking ? "M150,150 C170,110 180,90 190,100 C195,105 180,130 160,160 Z" : "M140,160 C160,140 170,120 180,130 C185,135 170,150 150,170 Z", fill: "#16A34A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "70", y: "60", width: "60", height: "70", rx: "20", fill: "#22C55E" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "130", rx: "15", ry: "8", fill: "#16A34A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "85", cy: "90", r: "12", fill: isAttacking ? "#F97316" : "#FEF08A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "85", cy: "90", r: "5", fill: isAttacking ? "#7C2D12" : "#854D0E" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "115", cy: "90", r: "12", fill: isAttacking ? "#F97316" : "#FEF08A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "115", cy: "90", r: "5", fill: isAttacking ? "#7C2D12" : "#854D0E" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M80,115 Q100,130 120,115 Z", fill: "#450A0A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "88", y: "115", width: "4", height: "4", fill: "#FFFFFF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "108", y: "115", width: "4", height: "4", fill: "#FFFFFF" })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 z-10 bg-black/40 backdrop-blur-xs p-1.5 rounded-full border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isAttacking ? "bg-red-600 text-white animate-pulse" : "bg-emerald-950 text-emerald-400"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skull, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: Math.max(0, timeLeft), max: 100, className: "flex-1" })
        ] })
      ] }),
      (() => {
        const wordVariants = getWordVariants(currentWord.ku);
        const cleanSubOptions = wordVariants.filter((v) => !v.includes("/") && !v.includes(","));
        const hasMultipleVariants = cleanSubOptions.length > 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#151B2E] border border-slate-800/90 rounded-2xl p-3.5 relative flex flex-col items-center justify-center text-center shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-1", children: zt.prompt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-black text-white font-mono tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: currentWord.ku }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language !== "ar" ? currentWord.en || currentWord.ar : currentWord.ar || currentWord.en }) }),
            hasMultipleVariants && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 px-2.5 py-0.5 rounded-full bg-[#3A2F14] border border-[#FFB300]/40 text-[11px] font-bold text-[#FFCE6B] inline-block shadow-xs", children: `${zt.canType} ${cleanSubOptions.join(` ${zt.or} `)}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => speakWord(currentWord.ku),
              className: "absolute right-3.5 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-90",
              title: zt.speak,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5" })
            }
          )
        ] });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative w-full rounded-2xl bg-[#151B2E] border p-1 transition-all ${shakeInput ? "border-red-500 ring-2 ring-red-500/30 animate-bounce" : "border-slate-800 focus-within:border-[#FFB300]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "text",
            inputMode: "none",
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            },
            placeholder: zt.placeholder,
            maxLength: 36,
            className: "w-full bg-transparent px-4 py-2.5 text-center text-lg font-bold font-mono text-white placeholder:text-slate-500 outline-none",
            "data-kq-focus": "managed"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1.5", dir: "ltr", children: SPECIAL_KURDISH_KEYS.map(({ key, helper }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleVirtualKey(key),
            className: "h-10 rounded-xl bg-[#3A2F14] hover:bg-[#4A3C1A] border border-[#FFB300]/40 text-[#FFCE6B] font-black text-base cursor-pointer transition-all active:scale-95 flex items-center justify-center relative shadow-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: key }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 right-1.5 text-[9px] text-indigo-400 font-extrabold leading-none opacity-80", children: helper })
            ]
          },
          key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 pt-1", dir: "ltr", children: [
          KEYBOARD_ROWS.map((row, rIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1", children: row.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleVirtualKey(k),
              className: "flex-1 min-w-[24px] max-w-[36px] h-9 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-indigo-950 border border-slate-800 text-slate-200 font-extrabold text-xs cursor-pointer transition-all shadow-xs flex items-center justify-center",
              children: k
            },
            k
          )) }, rIdx)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 pt-1", dir: "ltr", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setInputValue(""),
                className: "px-3 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 font-extrabold text-xs cursor-pointer transition-all active:scale-95 flex items-center justify-center",
                children: zt.clear
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setInputValue((prev) => prev + " "),
                className: "flex-1 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 font-extrabold text-xs cursor-pointer transition-all active:scale-95 flex items-center justify-center",
                children: zt.space
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleBackspace,
                className: "px-3 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 font-extrabold text-xs cursor-pointer transition-all active:scale-95 flex items-center justify-center",
                children: "⌫"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSubmit,
                className: "px-5 h-10 rounded-xl bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] font-black text-xs cursor-pointer transition-all active:scale-95 flex items-center justify-center shadow-[0_2px_0_#E69500] uppercase tracking-wider",
                children: zt.submit
              }
            )
          ] })
        ] })
      ] })
    ] }),
    gameState === "gameover" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between py-2 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heart,
          {
            className: `w-5 h-5 ${h <= lives ? "text-red-500 fill-red-500" : "text-slate-800 fill-slate-800"}`
          },
          h
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none", children: zt.wave }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-slate-100 font-mono", children: wave })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none", children: zt.score }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-amber-500 font-mono", children: score })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-2xl bg-slate-900/40 border border-slate-800/40 flex items-center justify-center text-slate-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4 fill-current opacity-40" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-black text-red-500 font-mono tracking-widest drop-shadow-[0_4px_16px_rgba(239,68,68,0.5)]", children: zt.lost }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black text-slate-100 font-mono tracking-wide uppercase", children: zt.lostSub }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-bold", children: zt.lostDesc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-[#0B0E1D] border border-slate-800 flex items-center justify-center shadow-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2)_0%,transparent_70%)] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 200 200", className: "w-36 h-36 sm:w-40 sm:h-40 z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50,180 L50,80 C50,40 150,40 150,80 L150,180 Z", fill: "#334155", stroke: "#475569", strokeWidth: "3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M40,180 L160,180 L160,195 L40,195 Z", fill: "#1E293B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "95", r: "18", fill: "#94A3B8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "91", y: "108", width: "18", height: "8", rx: "2", fill: "#94A3B8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "93", cy: "95", r: "5", fill: "#1E293B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "107", cy: "95", r: "5", fill: "#1E293B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M98,103 L102,103 L100,100 Z", fill: "#1E293B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "75", y1: "130", x2: "125", y2: "130", stroke: "#64748B", strokeWidth: "3", strokeLinecap: "round" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "85", y1: "142", x2: "115", y2: "142", stroke: "#64748B", strokeWidth: "3", strokeLinecap: "round" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#151B2E] border border-slate-800/90 rounded-2xl p-3.5 grid grid-cols-3 text-center divide-x divide-slate-800/80 shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5", children: zt.score }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black text-red-500 font-mono", children: score })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5", children: zt.wave }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black text-amber-400 font-mono", children: wave })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5", children: zt.time }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black text-slate-100 font-mono", children: formatTime(gameTimeSeconds) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#151B2E] border border-slate-800/90 rounded-2xl p-3 text-center space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 block", children: zt.best }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-2xl font-black text-amber-400 font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-amber-400 fill-amber-400/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: highScore })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: startGame,
            className: "w-full py-3.5 rounded-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] shadow-[0_2px_0_#E69500] active:scale-[0.98] font-black text-sm tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 outline-none uppercase",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: zt.tryAgain })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onClose,
            className: "w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 active:scale-[0.98] text-slate-300 hover:text-white font-extrabold text-sm tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 outline-none uppercase",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: zt.backHome })
            ]
          }
        )
      ] })
    ] }),
    gameState === "paused" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#151B2E] border border-slate-800 rounded-3xl p-6 text-center space-y-6 max-w-xs w-full shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black text-white font-mono uppercase tracking-wider", children: zt.paused }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-semibold", children: zt.pausedSub })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setGameState("playing"),
            className: "w-full py-3.5 rounded-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] shadow-[0_2px_0_#E69500] font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: zt.resume })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setGameState("start"),
            className: "w-full py-3.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: zt.mainMenu })
            ]
          }
        )
      ] })
    ] }) }),
    showSettings && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#151B2E] border border-slate-800 rounded-3xl p-6 space-y-6 max-w-xs w-full shadow-2xl relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowSettings(false),
          className: "absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-white uppercase tracking-wider", children: zt.settings }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 text-xs font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-200", children: zt.sound }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSoundEnabled(!soundEnabled),
            className: `p-2 rounded-xl transition-all cursor-pointer ${soundEnabled ? "bg-[#FFB300] text-[#432C00]" : "bg-slate-800 text-slate-500"}`,
            children: soundEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-5 h-5" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowSettings(false),
          className: "w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs cursor-pointer",
          children: zt.close
        }
      )
    ] }) })
  ] });
}
function WordConnectGame({ vocabulary: vocabulary2, language, onWin, onClose }) {
  const [level, setLevel] = reactExports.useState(1);
  const [currentWord, setCurrentWord] = reactExports.useState(null);
  const [letters, setLetters] = reactExports.useState([]);
  const [selectedIndices, setSelectedIndices] = reactExports.useState([]);
  const [isWordCorrect, setIsWordCorrect] = reactExports.useState(null);
  const [gainedXP, setGainedXP] = reactExports.useState(0);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [dragLineEnd, setDragLineEnd] = reactExports.useState(null);
  const [isLevelSuccess, setIsLevelSuccess] = reactExports.useState(false);
  const [isGameFinished, setIsGameFinished] = reactExports.useState(false);
  const [revealedHintCount, setRevealedHintCount] = reactExports.useState(0);
  const padRef = reactExports.useRef(null);
  const touchActiveIndices = reactExports.useRef([]);
  const levelAwardedRef = reactExports.useRef(false);
  const advanceTimerRef = reactExports.useRef(null);
  const advanceLevelLockRef = reactExports.useRef(false);
  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };
  reactExports.useEffect(() => () => clearAdvanceTimer(), []);
  const advanceLevel = (solvedLevel) => {
    if (advanceLevelLockRef.current) return;
    advanceLevelLockRef.current = true;
    clearAdvanceTimer();
    if (solvedLevel >= 5) {
      setIsGameFinished(true);
      playCompleteSound();
    } else {
      setLevel((prev) => prev + 1);
    }
  };
  const getConnectTarget = (word) => getPrimaryAnswerVariant(word.ku).toUpperCase();
  const getGameWords = () => {
    return vocabulary2.filter((word) => {
      const target = getConnectTarget(word);
      return /^[A-ZÇÊÎŞÛ]{3,7}$/.test(target);
    });
  };
  const loadWordForLevel = (lvl) => {
    const pool = getGameWords();
    if (pool.length === 0) return;
    const index = (lvl - 1) % pool.length;
    const wordItem = pool[index];
    setCurrentWord(wordItem);
    setRevealedHintCount(0);
    setIsLevelSuccess(false);
    setIsWordCorrect(null);
    setSelectedIndices([]);
    setDragLineEnd(null);
    setIsDragging(false);
    touchActiveIndices.current = [];
    levelAwardedRef.current = false;
    const wordLetters = getConnectTarget(wordItem).split("");
    const shuffledWithOrigIndices = wordLetters.map((char, index2) => ({ char, index: index2 })).sort(() => Math.random() - 0.5);
    setupLettersPositioning(shuffledWithOrigIndices);
  };
  const setupLettersPositioning = (lettersData) => {
    const N = lettersData.length;
    const radius = 95;
    const center = 130;
    const newLetters = lettersData.map((item, i) => {
      const angle = i * 2 * Math.PI / N - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return {
        id: `letter-${item.index}-${i}`,
        char: item.char,
        index: i,
        angle,
        x,
        y
      };
    });
    setLetters(newLetters);
  };
  reactExports.useEffect(() => {
    if (vocabulary2 && vocabulary2.length > 0) {
      loadWordForLevel(level);
    }
  }, [vocabulary2, level]);
  const selectLetter = (index) => {
    if (isLevelSuccess || isWordCorrect !== null) return;
    if (!selectedIndices.includes(index)) {
      const newIndices = [...selectedIndices, index];
      setSelectedIndices(newIndices);
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
    }
  };
  const handleShuffle = () => {
    if (isLevelSuccess || isWordCorrect !== null) return;
    const currentLettersData = letters.map((l) => ({ char: l.char, index: l.index }));
    const shuffled = currentLettersData.sort(() => Math.random() - 0.5);
    setupLettersPositioning(shuffled);
    setSelectedIndices([]);
    setDragLineEnd(null);
  };
  const handleHint = () => {
    if (!currentWord || isLevelSuccess) return;
    const wordLen = getConnectTarget(currentWord).length;
    if (revealedHintCount < wordLen) {
      setRevealedHintCount((prev) => prev + 1);
    }
  };
  const submitWord = (indices = selectedIndices) => {
    if (!currentWord || indices.length === 0) {
      setSelectedIndices([]);
      setDragLineEnd(null);
      setIsDragging(false);
      return;
    }
    const constructed = indices.map((i) => {
      var _a;
      return ((_a = letters[i]) == null ? void 0 : _a.char) ?? "";
    }).join("").toLowerCase();
    const target = getConnectTarget(currentWord).toLowerCase();
    if (isWordCorrect !== null || isLevelSuccess) {
      setSelectedIndices([]);
      setDragLineEnd(null);
      setIsDragging(false);
      return;
    }
    if (constructed === target) {
      if (levelAwardedRef.current) return;
      levelAwardedRef.current = true;
      advanceLevelLockRef.current = false;
      playSuccessSound();
      setIsWordCorrect(true);
      setIsLevelSuccess(true);
      const xpEarned = 10;
      setGainedXP((prev) => prev + xpEarned);
      onWin(xpEarned);
      const solvedLevel = level;
      clearAdvanceTimer();
      advanceTimerRef.current = window.setTimeout(() => {
        advanceTimerRef.current = null;
        advanceLevel(solvedLevel);
      }, 900);
    } else {
      playFailureSound();
      setIsWordCorrect(false);
      window.setTimeout(() => {
        setIsWordCorrect(null);
        setSelectedIndices([]);
        setDragLineEnd(null);
        setIsDragging(false);
        touchActiveIndices.current = [];
      }, 1e3);
    }
  };
  const handleMouseDown = (index) => {
    if (isLevelSuccess || isWordCorrect !== null) return;
    setIsDragging(true);
    setSelectedIndices([index]);
    setDragLineEnd({ x: letters[index].x, y: letters[index].y });
  };
  const handleMouseEnter = (index) => {
    if (!isDragging || isLevelSuccess || isWordCorrect !== null) return;
    if (selectedIndices.length > 1 && selectedIndices[selectedIndices.length - 2] === index) {
      setSelectedIndices((prev) => prev.slice(0, -1));
      return;
    }
    selectLetter(index);
  };
  const handleMouseMove = (e) => {
    if (!isDragging || selectedIndices.length === 0 || isLevelSuccess || isWordCorrect !== null) return;
    if (!padRef.current) return;
    const rect = padRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragLineEnd({ x, y });
  };
  const handleGlobalMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      submitWord(selectedIndices);
    }
  };
  reactExports.useEffect(() => {
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, selectedIndices, letters, currentWord]);
  const handleTouchStart = (e, index) => {
    e.preventDefault();
    if (isLevelSuccess || isWordCorrect !== null) return;
    setIsDragging(true);
    setSelectedIndices([index]);
    touchActiveIndices.current = [index];
    setDragLineEnd({ x: letters[index].x, y: letters[index].y });
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDragging || isLevelSuccess || isWordCorrect !== null || !padRef.current) return;
    const touch = e.touches[0];
    const rect = padRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setDragLineEnd({ x, y });
    const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!touchedElement) return;
    const dataIndexStr = touchedElement.getAttribute("data-letter-index");
    if (dataIndexStr !== null) {
      const idx = parseInt(dataIndexStr, 10);
      if (!isNaN(idx)) {
        if (touchActiveIndices.current.length > 1 && touchActiveIndices.current[touchActiveIndices.current.length - 2] === idx) {
          touchActiveIndices.current.pop();
          setSelectedIndices([...touchActiveIndices.current]);
        } else if (!touchActiveIndices.current.includes(idx)) {
          touchActiveIndices.current.push(idx);
          setSelectedIndices([...touchActiveIndices.current]);
          if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(10);
          }
        }
      }
    }
  };
  const handleTouchEnd = (e) => {
    e == null ? void 0 : e.preventDefault();
    if (isDragging) {
      setIsDragging(false);
      submitWord(touchActiveIndices.current);
    }
  };
  const handleLetterTap = (index) => {
    if (isDragging || isLevelSuccess || isWordCorrect !== null) return;
    if (selectedIndices.includes(index)) {
      if (selectedIndices[selectedIndices.length - 1] === index) {
        setSelectedIndices((prev) => prev.slice(0, -1));
      } else {
        setSelectedIndices([]);
      }
      return;
    }
    selectLetter(index);
  };
  const handleRestartFullGame = () => {
    clearAdvanceTimer();
    advanceLevelLockRef.current = false;
    setLevel(1);
    setGainedXP(0);
    setIsGameFinished(false);
    loadWordForLevel(1);
  };
  if (!currentWord) return null;
  const activeTarget = getConnectTarget(currentWord);
  const wordLength = activeTarget.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full bg-slate-50 dark:bg-slate-950 p-4 pb-24 max-w-lg mx-auto w-full antialiased relative overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GameHeader,
      {
        title: language !== "ar" ? "Word Connect" : "توصيل الكلمات",
        onExit: onClose,
        exitLabel: language !== "ar" ? "Exit game" : "الخروج من اللعبة",
        stat: { label: language !== "ar" ? "Level" : "المستوى", value: `${level}/5` }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 shadow-xs mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-start font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block tracking-widest uppercase", children: language !== "ar" ? "TRANSLATION CLUE" : "معنى الكلمة المستهدفة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-indigo-600 dark:text-indigo-400", children: language !== "ar" ? currentWord.en : currentWord.ar })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatPill, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-current" }), label: language !== "ar" ? "XP" : "خبرة", value: gainedXP })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: level - 1 + (isLevelSuccess ? 1 : 0), max: 5, label: language !== "ar" ? "Challenge Progress" : "تقدم التحدي" }) }),
    isGameFinished ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-amber-100 dark:bg-amber-950/20 border-2 border-amber-400 rounded-full flex items-center justify-center animate-bounce shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-12 h-12 text-amber-500 fill-amber-300" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest", children: language !== "ar" ? "Wonderful Victory!" : "فوز باهر ومستحق!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed", children: language !== "ar" ? "You have connected all word levels and completed the Word Connect challenge!" : "لقد أتممت توصيل الكلمات وحل جميع الألغاز في جولة التحدي بنجاح تام!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl w-full max-w-sm text-xs space-y-3 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-bold uppercase tracking-widest text-center text-[10px]", children: language !== "ar" ? "Round Performance Summary" : "ملخص أدائك الكلي" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-400 font-bold pb-2 border-b border-dashed border-slate-200 dark:border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Levels Completed:" : "المستويات المنجزة:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-600 font-black", children: "5 / 5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-400 font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Total XP Gained:" : "مجموع النقاط المكتسبة:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-500 font-black", children: [
            "+",
            gainedXP,
            " XP"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "flex-1 py-3.5 min-h-[44px] bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 active:scale-95 text-slate-700 dark:text-slate-300 font-bold rounded-full text-xs transition-all border border-slate-200 dark:border-slate-800 cursor-pointer outline-none",
            children: language !== "ar" ? "Exit" : "خروج"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleRestartFullGame,
            className: "flex-1 py-3.5 min-h-[44px] bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] shadow-[0_2px_0_#E69500] active:scale-95 font-extrabold rounded-full text-xs transition-all cursor-pointer outline-none flex items-center justify-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Play Again" : "العب مجدداً" })
            ]
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center space-y-4 py-3", children: [
        currentWord.emoji && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl filter drop-shadow-xs mb-1 select-none animate-pulse", children: currentWord.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center flex-wrap", dir: "ltr", children: activeTarget.split("").map((char, idx) => {
          const targetChar = char.toUpperCase();
          const isRevealedBySelection = selectedIndices.length > idx && isWordCorrect === true;
          const isRevealedByHint = idx < revealedHintCount;
          const isShown = isRevealedBySelection || isRevealedByHint;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              className: `w-11 h-11 rounded-xl font-mono text-lg font-black border-2 flex items-center justify-center transition-all ${isWordCorrect === true ? "bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300" : isWordCorrect === false ? "bg-red-50 border-red-500 text-red-800 dark:bg-red-950/20 dark:text-red-300 animate-[shake_0.4s_ease-in-out]" : isShown ? "bg-indigo-50/70 border-indigo-400 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400" : "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-transparent"}`,
              children: isShown ? targetChar : "_"
            },
            idx
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: selectedIndices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 5 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -5 },
            className: `px-4 py-1 rounded-full text-xs font-black tracking-widest font-mono shadow-inner border uppercase ${isWordCorrect === true ? "bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300" : isWordCorrect === false ? "bg-red-100 border-red-300 text-red-800 dark:bg-red-950/30 dark:text-red-300" : "bg-indigo-50 border-indigo-100 text-indigo-700 dark:bg-slate-900 dark:border-slate-800 dark:text-indigo-300"}`,
            children: selectedIndices.map((i) => letters[i].char).join("")
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-6 relative select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: padRef,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          onMouseMove: handleMouseMove,
          className: "relative w-[260px] h-[260px] bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 rounded-full shadow-inner flex items-center justify-center touch-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full pointer-events-none z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "3", result: "blur" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })
              ] }) }),
              selectedIndices.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: `M ${selectedIndices.map((idx) => `${letters[idx].x} ${letters[idx].y}`).join(" L ")}`,
                  fill: "none",
                  stroke: "var(--color-indigo-500, #6366f1)",
                  strokeWidth: "6",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  opacity: "0.85",
                  className: "stroke-indigo-500 dark:stroke-indigo-400",
                  style: { filter: "drop-shadow(0px 2px 4px rgba(99, 102, 241, 0.4))" }
                }
              ),
              isDragging && selectedIndices.length > 0 && dragLineEnd && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: letters[selectedIndices[selectedIndices.length - 1]].x,
                  y1: letters[selectedIndices[selectedIndices.length - 1]].y,
                  x2: dragLineEnd.x,
                  y2: dragLineEnd.y,
                  stroke: "var(--color-indigo-400, #818cf8)",
                  strokeWidth: "5",
                  strokeLinecap: "round",
                  opacity: "0.7",
                  className: "stroke-indigo-400 dark:stroke-indigo-500",
                  strokeDasharray: "4 4"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute w-24 h-24 bg-slate-50 dark:bg-slate-950/60 rounded-full border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-2 text-center pointer-events-none select-none z-0 shadow-inner", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-slate-400 leading-tight uppercase block", children: language !== "ar" ? "CONNECT" : "وصّل" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-snug mt-1", children: language !== "ar" ? "Swipe / Tap" : "اسحب أو انقر" })
            ] }),
            letters.map((letter, idx) => {
              const isSelected = selectedIndices.includes(idx);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  "data-letter-index": idx,
                  className: `connect-letter-btn absolute w-13 h-13 rounded-full font-mono text-xl font-extrabold flex items-center justify-center border-2 shadow-sm transition-all select-none z-20 ${isSelected ? "bg-indigo-600 border-indigo-400 text-white scale-110 ring-4 ring-indigo-500/20 shadow-md" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-indigo-400 active:scale-95"} cursor-pointer touch-none`,
                  style: {
                    left: `${letter.x - 26}px`,
                    // Offset half of width (52px / 2 = 26px)
                    top: `${letter.y - 26}px`
                  },
                  onMouseDown: () => handleMouseDown(idx),
                  onMouseEnter: () => handleMouseEnter(idx),
                  onTouchStart: (e) => handleTouchStart(e, idx),
                  onClick: () => handleLetterTap(idx),
                  children: letter.char
                },
                letter.id
              );
            })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleShuffle,
            className: "flex-1 py-3 px-4 min-h-[44px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center gap-2 font-black text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer active:scale-95",
            title: language !== "ar" ? "Shuffle Letters" : "خلط ترتيب الحروف",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-4 h-4 text-indigo-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Shuffle" : "إعادة ترتيب" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleHint,
            disabled: revealedHintCount >= wordLength,
            className: `flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs transition-all shadow-xs cursor-pointer active:scale-95 ${revealedHintCount >= wordLength ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-100"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-amber-500 fill-amber-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Reveal Hint" : "كشف حرف" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isLevelSuccess && !isGameFinished && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9, y: 30 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.9, y: 30 },
          className: "w-full max-w-sm bg-gradient-to-br from-indigo-600 to-purple-800 rounded-3xl p-6 text-center text-white space-y-4 shadow-2xl relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 text-7xl opacity-5 select-none pointer-events-none", children: "🌟" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black", children: language !== "ar" ? "Awesome Match!" : "توصيل رائع ومتقن!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-indigo-100 leading-relaxed font-semibold", children: language !== "ar" ? `You spelled "${currentWord.ku}" correctly!` : `تهانينا! لقد ركّبت الكلمة "${currentWord.ku}" بشكل صحيح متقن!` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex bg-white/15 rounded-2xl items-center justify-center py-2.5 px-4 gap-2 border border-white/5 font-extrabold text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4.5 h-4.5 text-yellow-300 fill-yellow-300 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "+10 XP ",
                language !== "ar" ? "Earned" : "نقاط إضافية مضافة"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 relative z-10 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "flex-1 py-3 min-h-[44px] bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold rounded-full text-xs transition-all border border-white/10 cursor-pointer outline-none",
                  children: language !== "ar" ? "Exit" : "الرئيسية"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    advanceLevel(level);
                  },
                  className: "flex-1 py-3 min-h-[44px] bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black rounded-full text-xs hover:from-emerald-400 hover:to-emerald-500 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 outline-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Next Level" : "المستوى التالي" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 rtl:rotate-180" })
                  ]
                }
              )
            ] })
          ]
        }
      ) }) })
    ] })
  ] });
}
const MemoWordMatchingGame = React.memo(WordMatchingGame);
const MemoZombieTypingGame = React.memo(ZombieTypingGame);
const MemoWordConnectGame = React.memo(WordConnectGame);
const getWordIcon = (category, className = "w-6 h-6 text-indigo-600 dark:text-indigo-400") => {
  const categoryMap = {
    "family": Users,
    "animals": Cat,
    "food": Apple,
    "colors": Palette,
    "emotions": Smile,
    "daily_conversation": MessageSquare,
    "technology": Laptop,
    "university": GraduationCap,
    "medical": Stethoscope,
    "business": Briefcase,
    "travel": Compass
  };
  const IconComponent = category ? categoryMap[category] : void 0;
  if (IconComponent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className });
};
function Games() {
  var _a;
  const { userData, updateUserData, updateUserProgress, language } = useAuth();
  const isEstablishedUser = (((_a = userData == null ? void 0 : userData.completedLessons) == null ? void 0 : _a.length) ?? 0) > 0 || Object.keys((userData == null ? void 0 : userData.gameScores) ?? {}).length > 0;
  useNavigate();
  const [activeGame, setActiveGame] = reactExports.useState("menu");
  const [celebrate, setCelebrate] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const isGame = activeGame !== "menu";
    window.dispatchEvent(new CustomEvent("set-game-active", { detail: isGame }));
    return () => {
      window.dispatchEvent(new CustomEvent("set-game-active", { detail: false }));
    };
  }, [activeGame]);
  const [gainedXP, setGainedXP] = reactExports.useState(0);
  const updateProgressRef = reactExports.useRef(updateUserProgress);
  reactExports.useEffect(() => {
    updateProgressRef.current = updateUserProgress;
  }, [updateUserProgress]);
  const handleGameWin = reactExports.useCallback((xp) => {
    void updateProgressRef.current(xp, 1, true, 0, { source: "game" });
  }, []);
  const handleExitToMenu = reactExports.useCallback(() => setActiveGame("menu"), []);
  const [memoryCards, setMemoryCards] = reactExports.useState([]);
  const [selectedCards, setSelectedCards] = reactExports.useState([]);
  const [moves, setMoves] = reactExports.useState(0);
  const [matchedPairs, setMatchedPairs] = reactExports.useState(0);
  const [memorizeCountdown, setMemorizeCountdown] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (memorizeCountdown <= 0) return;
    const timer = setTimeout(() => {
      setMemorizeCountdown((prev) => {
        if (prev <= 1) {
          setMemoryCards(
            (prevCards) => prevCards.map((c) => ({ ...c, isFlipped: false }))
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearTimeout(timer);
  }, [memorizeCountdown]);
  const [scrambleWord, setScrambleWord] = reactExports.useState(null);
  const [scrambleLetters, setScrambleLetters] = reactExports.useState([]);
  const [userLetters, setUserLetters] = reactExports.useState([]);
  const [scrambleScore, setScrambleScore] = reactExports.useState(0);
  const [scrambleAttempts, setScrambleAttempts] = reactExports.useState(0);
  const [showScrambleHint, setShowScrambleHint] = reactExports.useState(false);
  const [isScrambleCorrect, setIsScrambleCorrect] = reactExports.useState(null);
  const triggerWinSetup = async (xpValue) => {
    setGainedXP(xpValue);
    setCelebrate(true);
    await updateUserProgress(xpValue, 1, true, 0, { source: "game" });
    if (userData && updateUserData) {
      const currentScores = { ...userData.gameScores || {} };
      if (activeGame === "scramble") {
        const previousHigh = currentScores["scramble"] || 0;
        currentScores["scramble"] = Math.max(previousHigh, scrambleScore + 1);
      } else if (activeGame === "memory") {
        const previousBest = currentScores["memory"] || 999;
        currentScores["memory"] = Math.min(previousBest, moves);
      }
      await updateUserData({ gameScores: currentScores });
    }
    setTimeout(() => {
      setCelebrate(false);
    }, 5e3);
  };
  const initMemoryGame = () => {
    setCelebrate(false);
    setMoves(0);
    setMatchedPairs(0);
    memorySelectionRef.current = [];
    setSelectedCards([]);
    const sorted = [...vocabulary].sort(() => 0.5 - Math.random());
    const selectedWords = sorted.slice(0, 6);
    const cards = [];
    selectedWords.forEach((word) => {
      cards.push({
        id: `${word.id}-ku`,
        wordId: word.id,
        type: "ku",
        content: word.ku,
        emoji: "",
        isFlipped: true,
        // Start opened for preview memorization phase
        isMatched: false
      });
      const isArabicClue = Math.random() > 0.5;
      let content = "";
      let emoji = "";
      if (isArabicClue) {
        content = word.ar;
        emoji = "";
      } else {
        content = word.en;
        emoji = word.emoji || "💡";
      }
      cards.push({
        id: `${word.id}-translation`,
        wordId: word.id,
        type: "meaning",
        content,
        emoji,
        isFlipped: true,
        // Start opened for preview memorization phase
        isMatched: false
      });
    });
    setMemoryCards(cards.sort(() => 0.5 - Math.random()));
    setMemorizeCountdown(5);
  };
  const st = {
    en: {
      title: "Spelling Scrambler",
      menuDesc: "Order the letters correctly",
      scoreLabel: "Words Spelled",
      showHint: "Show Hint",
      hideHint: "Hide Hint",
      prompt: "Spell it in Kurdish",
      hintStarts: "The word starts with:",
      available: "Available Letters",
      reset: "Reset",
      verify: "Verify Answer",
      next: "Next Word",
      tip: "Strict spelling — every correct word earns +10 XP.",
      slotEmpty: "Empty letter slot",
      removeLetter: "Remove letter"
    },
    ku: {
      title: "Tevliheviya Tîpan",
      menuDesc: "Tîpan rast rêz bike",
      scoreLabel: "Peyvên Nivîsandî",
      showHint: "Têbînî nîşan bide",
      hideHint: "Têbîniyê veşêre",
      prompt: "Bi Kurdî binivîse",
      hintStarts: "Peyv bi vê tîpê dest pê dike:",
      available: "Tîpên Berdest",
      reset: "Ji nû ve",
      verify: "Kontrol bike",
      next: "Peyva din",
      tip: "Rastnivîs hişk e — her peyva rast +10 XP dide.",
      slotEmpty: "Valahiya tîpê",
      removeLetter: "Tîpê rake"
    },
    ar: {
      title: "تركيب الحروف",
      menuDesc: "رتب الحروف بشكل صحيح",
      scoreLabel: "الكلمات المكتملة",
      showHint: "إظهار التلميح",
      hideHint: "إخفاء التلميح",
      prompt: "اكتب الكلمة الكوردية",
      hintStarts: "تبدأ الكلمة بالحرف:",
      available: "الحروف المتاحة",
      reset: "إعادة تعيين",
      verify: "تأكيد الإجابة",
      next: "الكلمة التالية",
      tip: "التدقيق صارم — كل كلمة صحيحة تمنحك +10 نقطة خبرة.",
      slotEmpty: "خانة فارغة",
      removeLetter: "إزالة الحرف"
    }
  }[language === "ku" ? "ku" : language === "ar" ? "ar" : "en"];
  const memorySelectionRef = reactExports.useRef([]);
  const scrambleVerifyLockRef = reactExports.useRef(false);
  const scrambleAdvanceAtRef = reactExports.useRef(0);
  const scrambleResetTimerRef = reactExports.useRef(null);
  const initScrambleGame = () => {
    const now = Date.now();
    if (now - scrambleAdvanceAtRef.current < 400) return;
    scrambleAdvanceAtRef.current = now;
    if (scrambleResetTimerRef.current !== null) {
      clearTimeout(scrambleResetTimerRef.current);
      scrambleResetTimerRef.current = null;
    }
    scrambleVerifyLockRef.current = false;
    setIsScrambleCorrect(null);
    setUserLetters([]);
    setShowScrambleHint(false);
    const randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    setScrambleWord(randomWord);
    const kWord = randomWord.ku.toLowerCase();
    const lettersArray = kWord.split("").map((char, index) => ({
      id: `${randomWord.id}-char-${index}`,
      char,
      used: false
    }));
    let scrambled = [...lettersArray].sort(() => 0.5 - Math.random());
    if (scrambled.map((l) => l.char).join("") === kWord && lettersArray.length > 2) {
      scrambled = [...lettersArray].sort(() => 0.5 - Math.random());
    }
    setScrambleLetters(scrambled);
  };
  const selectScrambleLetter = (letterId, char) => {
    if (isScrambleCorrect) return;
    setScrambleLetters(
      (prev) => prev.map((l) => l.id === letterId ? { ...l, used: true } : l)
    );
    setUserLetters((prev) => [...prev, { originalId: letterId, char }]);
  };
  const deselectScrambleLetter = (userLetterIdx) => {
    if (isScrambleCorrect) return;
    const removed = userLetters[userLetterIdx];
    setUserLetters((prev) => prev.filter((_, idx) => idx !== userLetterIdx));
    setScrambleLetters(
      (prev) => prev.map((l) => l.id === removed.originalId ? { ...l, used: false } : l)
    );
    setIsScrambleCorrect(null);
  };
  const handleVerifyScramble = () => {
    if (!scrambleWord) return;
    if (isScrambleCorrect === true || scrambleVerifyLockRef.current) return;
    scrambleVerifyLockRef.current = true;
    const constructedWord = userLetters.map((l) => l.char).join("");
    const targetWord = scrambleWord.ku.toLowerCase();
    if (constructedWord === targetWord) {
      playSuccessSound();
      setIsScrambleCorrect(true);
      setScrambleScore((s) => s + 1);
      triggerWinSetup(10);
    } else {
      playFailureSound();
      setIsScrambleCorrect(false);
      setScrambleAttempts((a) => a + 1);
      scrambleResetTimerRef.current = window.setTimeout(() => {
        scrambleResetTimerRef.current = null;
        setIsScrambleCorrect(null);
        setUserLetters([]);
        setScrambleLetters((prev) => prev.map((l) => ({ ...l, used: false })));
        scrambleVerifyLockRef.current = false;
      }, 2e3);
    }
  };
  reactExports.useEffect(() => {
    if (activeGame === "memory") {
      initMemoryGame();
    } else if (activeGame === "scramble") {
      initScrambleGame();
    }
  }, [activeGame]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-sans leading-relaxed transition-colors duration-300 ${activeGame === "menu" ? "w-full min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20" : activeGame === "zombie" ? "absolute inset-0 z-50 flex flex-col bg-slate-950 text-white overflow-hidden pb-0" : "absolute inset-0 z-50 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-y-auto pb-12"}`, children: [
    celebrate && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReactConfetti,
      {
        width: window.innerWidth,
        height: window.innerHeight,
        recycle: false,
        numberOfPieces: 150
      }
    ),
    activeGame !== "menu" && activeGame !== "matching" && activeGame !== "zombie" && activeGame !== "connect" && /* Top-bar harmonization audit: the Scrambler (and legacy memory
    screen) now share the SAME GameHeader primitive as the other
    games — standard back button position, start-aligned title and
    the score pill in the unified end-side slot. */
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 w-full max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      GameHeader,
      {
        title: activeGame === "memory" ? language !== "ar" ? "Memory Cards Match" : "تطابق بطاقات الذاكرة" : st.title,
        onExit: () => setActiveGame("menu"),
        exitLabel: language !== "ar" ? "Exit game" : "الخروج من اللعبة",
        stat: activeGame === "scramble" ? { label: st.scoreLabel, value: scrambleScore } : void 0
      }
    ) }),
    activeGame === "menu" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "p-4 space-y-5 pb-24 max-w-sm mx-auto w-full",
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-flat border border-line-soft relative overflow-hidden flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -bottom-6 w-32 h-32 bg-[#FFB300]/15 rounded-full blur-2xl pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-1 text-center mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black tracking-tight text-ink", children: language !== "ar" ? "Learn with play & fun!" : "تعلم باللعب ومرح!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted font-bold", children: language !== "ar" ? "Play and learn at the same time" : "العب وتعلّم في نفس الوقت" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-[#FFF3D6] dark:bg-[#3A2F14] rounded-2xl flex items-center justify-center shrink-0 border border-[#FFB300]/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-8 h-8 text-[#B8860B] dark:text-[#FFCE6B]" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-slate-900 dark:text-white text-base", children: language !== "ar" ? "Choose your favorite game" : "اختر لعبتك المفضلة" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setActiveGame("connect"),
                className: "col-span-2 bg-white dark:bg-slate-900 border-2 border-[#FFB300]/60 rounded-3xl p-5 flex items-center justify-between gap-4 text-start shadow-flat hover:border-[#FFB300] hover:shadow-md transition-all group cursor-pointer outline-none min-h-[104px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-[#FFB300] text-[#432C00] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_3px_0_#E69500]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-7 h-7 text-white" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-[#B45309] dark:group-hover:text-[#FFCE6B] transition-colors", children: language !== "ar" ? "Word Connect" : "توصيل الكلمات" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full animate-pulse", children: language !== "ar" ? "NEW" : "جديد" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400 text-xs font-semibold leading-snug", children: language !== "ar" ? "Swipe letters to connect and spell Kurdish words!" : "صل الحروف بشكل دائري لتركيب الكلمات الكوردية!" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-slate-400 group-hover:text-[#FFB300] transition-colors shrink-0 rtl:rotate-180" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setActiveGame("matching"),
                className: "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-center shadow-xs hover:border-[#FFB300] hover:shadow-md transition-all group cursor-pointer outline-none h-42",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "w-6 h-6 text-emerald-600 dark:text-emerald-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-[#B45309] transition-colors", children: language !== "ar" ? "Word Matching" : "مطابقة الكلمات" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-[11px] font-semibold leading-snug", children: language !== "ar" ? "Match word with meaning" : "تطابق الكلمة مع معناها" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setActiveGame("zombie"),
                className: "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-center shadow-xs hover:border-red-500 hover:shadow-md transition-all group cursor-pointer outline-none h-42",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skull, { className: "w-6 h-6 text-red-600 dark:text-red-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-red-600 transition-colors", children: language !== "ar" ? "Zombie Typing" : "هجوم الزومبي" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-[11px] font-semibold leading-snug", children: language !== "ar" ? "Type quickly to survive" : "اكتب الكلمات لحماية قريتك" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setActiveGame("scramble"),
                className: "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-center shadow-xs hover:border-[#FFB300] hover:shadow-md transition-all group cursor-pointer outline-none h-42",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-purple-950/60 text-[#8B5CF6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CaseSensitive, { className: "w-6 h-6 text-[#8B5CF6]" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-[#B45309] transition-colors", children: st.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-[11px] font-semibold leading-snug", children: st.menuDesc })
                  ] })
                ]
              }
            ),
            isEstablishedUser && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "aria-disabled": "true",
                className: "bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-center shadow-xs h-42 relative overflow-hidden select-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2.5 right-2.5 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-amber-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Coming Soon" : "قريباً" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-6 h-6 text-amber-600 dark:text-amber-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-slate-800 dark:text-slate-200 text-sm leading-tight group-hover:text-amber-600 transition-colors", children: language !== "ar" ? "Memory Game" : "لعبة الذاكرة" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-600/90 dark:text-amber-400/90 text-[11px] font-extrabold leading-snug", children: language !== "ar" ? "Under development - Coming Soon!" : "قيد التحديث والتطوير - قريباً!" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#FFF6E0] dark:bg-slate-900/80 border border-[#FFB300]/30 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[#FFB300] text-[#432C00] flex items-center justify-center shrink-0 shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-extrabold text-xs text-slate-800 dark:text-white", children: language !== "ar" ? "Gamified Learning Boost" : "فائدة التكرار التفاعلي بالألعاب" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5", children: language !== "ar" ? "Playing games speeds up long-term vocabulary retention by up to 3x!" : "أثبتت الأبحاث أن ربط المفردات بالألعاب التفاعلية يزيد سرعة التذكر بنسبة 300%!" })
            ] })
          ] })
        ]
      }
    ),
    activeGame === "memory" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center space-y-5 my-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          className: "w-24 h-24 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 border-2 border-amber-500/30 flex items-center justify-center text-amber-500 shadow-xl relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-12 h-12 text-amber-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-2xl shadow-md border-2 border-white dark:border-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block", children: language !== "ar" ? "Coming Soon" : "ستتوفر قريباً" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-slate-900 dark:text-white", children: language !== "ar" ? "Memory Game Updating" : "لعبة الذاكرة قيد التحديث" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400 text-xs font-bold leading-relaxed", children: language !== "ar" ? "We are upgrading the memory game to be lighter and fully text-based. Stay tuned!" : "تم إيقاف هذه الصفحة مؤقتاً. نعمل حالياً على إعادة بناء لعبة الذاكرة لتكون أسرع وبدون أي صور. ستتوفر قريبًا بنسخة جديدة!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveGame("menu"),
          className: "w-full max-w-xs py-3.5 min-h-[44px] bg-[#FFB300] hover:bg-[#E69500] active:scale-95 text-[#432C00] rounded-full font-black text-sm transition-all shadow-[0_2px_0_#E69500] cursor-pointer flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4.5 h-4.5 rtl:rotate-180" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Back to Games Menu" : "العودة لقائمة الألعاب" })
          ]
        }
      )
    ] }),
    activeGame === "scramble" && scrambleWord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex-1 flex flex-col justify-between max-w-sm mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end items-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowScrambleHint(!showScrambleHint),
            className: "px-4 py-2 min-h-[44px] bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300 border border-amber-300 dark:border-amber-900 rounded-full font-bold text-xs transition-colors cursor-pointer",
            children: showScrambleHint ? st.hideHint : st.showHint
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-center space-y-6 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "absolute right-0 top-0 w-24 h-24 text-indigo-500 opacity-5 -translate-y-4 translate-x-4 select-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pb-1", children: getWordIcon(scrambleWord.category, "w-10 h-10 text-indigo-600 dark:text-indigo-400") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-wider", children: st.prompt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black text-slate-950 dark:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language !== "ar" ? scrambleWord.en : scrambleWord.ar }) })
          ] }),
          showScrambleHint && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-2.5 rounded-xl text-xs text-amber-700 dark:text-amber-400 font-bold", children: [
            st.hintStarts,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-indigo-600 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-amber-300/40 font-mono inline-block ml-1", children: scrambleWord.ku[0] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center py-4 flex-wrap", dir: "ltr", children: scrambleWord.ku.split("").map((_, idx) => {
            const letter = userLetters[idx];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                whileHover: letter ? { scale: 1.05 } : {},
                onClick: () => letter && deselectScrambleLetter(idx),
                "aria-label": letter ? `${st.removeLetter}: ${letter.char}` : st.slotEmpty,
                className: `w-12 h-12 rounded-xl text-lg font-black border-2 flex items-center justify-center transition-all cursor-pointer ${isScrambleCorrect === true ? "bg-emerald-50 border-emerald-500 text-emerald-800" : isScrambleCorrect === false ? "bg-red-50 border-red-500 text-red-800 animate-[shake_0.5s_ease-in-out]" : letter ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm" : "bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700/60"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: letter && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: -5 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 5 },
                    children: letter.char
                  }
                ) })
              },
              idx
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 uppercase tracking-widest font-black", children: st.available }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2.5 justify-center flex-wrap", dir: "ltr", children: scrambleLetters.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                disabled: l.used || isScrambleCorrect !== null,
                onClick: () => selectScrambleLetter(l.id, l.char),
                className: `w-12 h-12 rounded-xl font-black text-lg border cursor-pointer flex items-center justify-center transition-all ${l.used ? "bg-slate-100 border-slate-200 text-slate-300 opacity-30 cursor-not-allowed" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/40 active:scale-90 shadow-xs"}`,
                children: l.char
              },
              l.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setUserLetters([]);
                setScrambleLetters((l) => l.map((item) => ({ ...item, used: false })));
                setIsScrambleCorrect(null);
              },
              className: "py-4 px-5 bg-slate-200 hover:bg-slate-300 active:scale-[0.98] text-slate-700 rounded-3xl font-extrabold text-sm transition-all cursor-pointer dark:bg-slate-800 dark:text-slate-200",
              children: st.reset
            }
          ),
          isScrambleCorrect === true ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                initScrambleGame();
              },
              className: "flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-3xl text-sm transition-all shadow-md shadow-emerald-500/15 cursor-pointer flex items-center justify-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: st.next }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-current text-yellow-300" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              disabled: userLetters.length !== scrambleWord.ku.length,
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleVerifyScramble();
              },
              className: `flex-1 py-4 font-extrabold rounded-3xl text-sm transition-all shadow-md flex items-center justify-center gap-2 ${userLetters.length === scrambleWord.ku.length ? "bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white cursor-pointer shadow-purple-500/15" : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`,
              children: st.verify
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs text-slate-500 flex gap-2 text-center mt-8 items-center max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "w-5 h-5 text-purple-500 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed", children: st.tip })
      ] })
    ] }),
    activeGame === "matching" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "flex-1 min-h-0 flex flex-col",
        initial: { opacity: 0, y: 18, scale: 0.99 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.22, ease: "easeOut" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MemoWordMatchingGame,
          {
            vocabulary,
            language,
            onWin: handleGameWin,
            onClose: handleExitToMenu
          }
        )
      }
    ),
    activeGame === "zombie" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "flex-1 min-h-0 flex flex-col",
        initial: { opacity: 0, y: 18, scale: 0.99 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.22, ease: "easeOut" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MemoZombieTypingGame,
          {
            vocabulary,
            language,
            onWin: handleGameWin,
            onClose: handleExitToMenu
          }
        )
      }
    ),
    activeGame === "connect" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "flex-1 min-h-0 flex flex-col",
        initial: { opacity: 0, y: 18, scale: 0.99 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.22, ease: "easeOut" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MemoWordConnectGame,
          {
            vocabulary,
            language,
            onWin: handleGameWin,
            onClose: handleExitToMenu
          }
        )
      }
    )
  ] });
}
export {
  Games
};
