import { j as jsxRuntimeExports, r as reactExports, R as React } from "./vendor-react--N-K1Ubq.js";
import { d as useParams, u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { c as cn, s as stopAllActiveAudio, e as playCompleteSound, h as calculateQuizRewards, l as learningPath, f as playSuccessSound, g as playFailureSound, t, B as Button, A as AudioButton, j as useAdStore, u as useAuth, k as getMuteState, p as playAudioUrl, S as Spinner, E as ErrorState, M as Modal, b as academicCategories, m as setMuteState } from "./index-C4ml4lrv.js";
import { g as generateQuestionsForModule, a as getAdaptiveLevelId, b as getLevelOfModule } from "./questionGenerator-3VjXWBPZ.js";
import { i as isQuizAnswerAccepted } from "./answerUtils-WRjxYtEq.js";
import { g as gradeFromAnswer, r as recordReview } from "./SpacedRepetitionService-DkhvYl5r.js";
import { c as categories } from "./kurmanji-DANKPvwI.js";
import { av as ShieldCheck, X, aB as Lightbulb, w as Check, bc as ArrowRight, b1 as CircleQuestionMark, x as Globe, Z as Zap, bn as Shield, a$ as Brain, bo as Type, k as Star, T as Trophy, i as Award, af as Calendar, I as Clock, bp as MapPin, j as Compass, U as User, o as Users, ad as Building2, bq as Building, Y as House, br as Car, ag as Apple, t as Coffee, b7 as Utensils, bs as Cloud, g as Moon, f as Sun, m as Smile, d as Heart, l as Sparkles, s as MessageCircle, p as BookOpen, n as Turtle, bt as Rabbit, bu as VolumeX, V as Volume2, v as ChevronRight, A as ArrowLeft, bv as BrainCircuit, a3 as PenTool, a0 as Palette, aK as Lock, b4 as PartyPopper, Q as TriangleAlert, bw as Gem } from "./vendor-icons-UlZxPqC8.js";
import { A as AnimatePresence, m as motion } from "./vendor-motion-D8-S3eer.js";
import { S as Switch } from "./Switch-_Uos24zj.js";
import { R as ReactConfetti } from "./vendor-confetti-Dl7ieZFU.js";
import { P as Progress } from "./Progress-BMdEo1cu.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
const ELEVATION = {
  flat: "bg-white dark:bg-slate-900 border border-line shadow-[0_2px_10px_rgba(0,0,0,0.02)]",
  raised: "bg-white dark:bg-slate-900 border border-line shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
  outline: "bg-transparent border border-dashed border-line-soft"
};
const PADDING = { none: "", sm: "p-3", md: "p-4", lg: "p-6" };
function Card({
  elevation = "raised",
  padding = "md",
  as: Tag = "div",
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      className: cn("rounded-3xl transition-all duration-200", ELEVATION[elevation], PADDING[padding], className),
      ...rest,
      children
    }
  );
}
const TONES = {
  primary: "bg-[#FFF3D6] text-[#8A6100] border-transparent dark:bg-[#3A2F14] dark:text-[#FFCE6B]",
  success: "bg-emerald-100 text-emerald-700 border-transparent dark:bg-emerald-950/50 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 border-transparent dark:bg-amber-950/50 dark:text-amber-300",
  danger: "bg-rose-100 text-rose-700 border-transparent dark:bg-rose-950/50 dark:text-rose-300",
  neutral: "bg-surface-2 text-muted border-transparent"
};
function Badge({ tone = "primary", className, children, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider",
        TONES[tone],
        className
      ),
      ...rest,
      children
    }
  );
}
function useQuizEngine({
  moduleId,
  language,
  updateUserProgress,
  updateUserData,
  userData,
  navigateBack
}) {
  const [selectedQuizMode, setSelectedQuizMode] = reactExports.useState(
    // The default alphabet drill is sound→letter recognition, i.e. a genuine
    // listening quiz — it must carry that mode id so the header/title and
    // question rendering match. ('multiple_choice' here previously produced
    // a "Word Quiz" that rendered listen questions.)
    moduleId === "alphabet" ? "listening" : moduleId === "adaptive_practice" ? "adaptive_practice" : "mixed_challenge"
  );
  const [questions, setQuestions] = reactExports.useState([]);
  const [questionSetReady, setQuestionSetReady] = reactExports.useState(false);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const [typingAnswer, setTypingAnswer] = reactExports.useState("");
  const [hasChecked, setHasChecked] = reactExports.useState(false);
  const [isCorrect, setIsCorrect] = reactExports.useState(null);
  const [score, setScore] = reactExports.useState(0);
  const [isFinished, setIsFinished] = reactExports.useState(false);
  const [showConfetti, setShowConfetti] = reactExports.useState(false);
  const [missedQuestions, setMissedQuestions] = reactExports.useState([]);
  const [earnedXp, setEarnedXp] = reactExports.useState(0);
  const [earnedGems, setEarnedGems] = reactExports.useState(0);
  const HEARTS_PER_QUIZ = 3;
  const heartsEnabled = !(moduleId === "srs_review" || moduleId === "review_due" || moduleId === "review_mistakes");
  const [hearts, setHearts] = reactExports.useState(heartsEnabled ? HEARTS_PER_QUIZ : null);
  const heartsRef = reactExports.useRef(heartsEnabled ? HEARTS_PER_QUIZ : null);
  const loseHeart = reactExports.useCallback(() => {
    if (heartsRef.current === null) return;
    heartsRef.current = Math.max(0, heartsRef.current - 1);
    setHearts(heartsRef.current);
  }, []);
  const initializedRef = reactExports.useRef(null);
  const scoreRef = reactExports.useRef(0);
  const finishStartedRef = reactExports.useRef(false);
  const questionStartTimeRef = reactExports.useRef(Date.now());
  const advanceTimerRef = reactExports.useRef(null);
  const advanceLockRef = reactExports.useRef(false);
  const answerLockRef = reactExports.useRef(false);
  const clearAdvanceTimer = reactExports.useCallback(() => {
    if (advanceTimerRef.current !== null) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);
  reactExports.useEffect(() => {
    questionStartTimeRef.current = Date.now();
    advanceLockRef.current = false;
    answerLockRef.current = false;
  }, [currentIndex]);
  reactExports.useEffect(() => () => clearAdvanceTimer(), [clearAdvanceTimer]);
  reactExports.useEffect(() => {
    if (!selectedQuizMode) {
      setQuestions([]);
      setQuestionSetReady(true);
      initializedRef.current = null;
      setCurrentIndex(0);
      scoreRef.current = 0;
      finishStartedRef.current = false;
      return;
    }
    const needsUserData = moduleId === "srs_review" || moduleId === "review_due" || moduleId === "review_mistakes" || moduleId === "adaptive_practice" || selectedQuizMode === "adaptive_practice";
    const initKey = `${moduleId}_${selectedQuizMode}_${language}${needsUserData && !userData ? "_awaiting_user" : ""}`;
    if (initializedRef.current === initKey) {
      return;
    }
    setQuestionSetReady(false);
    const generated = generateQuestionsForModule(
      moduleId || "",
      selectedQuizMode,
      language,
      userData
    );
    setQuestions(generated);
    setQuestionSetReady(true);
    setCurrentIndex(0);
    setIsFinished(false);
    setScore(0);
    scoreRef.current = 0;
    finishStartedRef.current = false;
    setHasChecked(false);
    setSelectedOption(null);
    setTypingAnswer("");
    setIsCorrect(null);
    setMissedQuestions([]);
    setShowConfetti(false);
    setEarnedXp(0);
    setEarnedGems(0);
    heartsRef.current = heartsEnabled ? HEARTS_PER_QUIZ : null;
    setHearts(heartsRef.current);
    clearAdvanceTimer();
    advanceLockRef.current = false;
    answerLockRef.current = false;
    questionStartTimeRef.current = Date.now();
    initializedRef.current = initKey;
  }, [moduleId, language, selectedQuizMode, userData, heartsEnabled, clearAdvanceTimer]);
  reactExports.useEffect(() => {
    stopAllActiveAudio();
    return () => {
      stopAllActiveAudio();
    };
  }, [currentIndex, selectedQuizMode, isFinished]);
  const finishQuiz = reactExports.useCallback(async (finalScore) => {
    if (finishStartedRef.current) return;
    finishStartedRef.current = true;
    const safeFinalScore = Math.max(0, Math.min(finalScore, questions.length));
    scoreRef.current = safeFinalScore;
    setScore(safeFinalScore);
    setIsFinished(true);
    setShowConfetti(true);
    playCompleteSound();
    const levelId = moduleId === "adaptive_practice" || selectedQuizMode === "adaptive_practice" ? getAdaptiveLevelId(userData) : getLevelOfModule(moduleId || "");
    let mult = 12;
    if (levelId === "A2") mult = 15;
    else if (levelId === "B1") mult = 18;
    else if (levelId === "B2") mult = 22;
    else if (levelId === "Advanced") mult = 25;
    const currentXp = (userData == null ? void 0 : userData.xp) || 0;
    const rewards = calculateQuizRewards(safeFinalScore, questions.length, currentXp, mult);
    setEarnedXp(rewards.xpGained);
    setEarnedGems(rewards.gemsGained);
    const wordsGained = safeFinalScore;
    if (updateUserProgress) {
      await updateUserProgress(rewards.xpGained, wordsGained, true, rewards.gemsGained, {
        source: "quiz",
        perfect: questions.length > 0 && safeFinalScore === questions.length
      });
    }
    if (userData && updateUserData) {
      const isLessonModule = learningPath.some((lvl) => lvl.lessons.some((l) => l.id === moduleId));
      const currentCompleted = [...userData.completedLessons || []];
      if (isLessonModule && moduleId && !currentCompleted.includes(moduleId)) {
        currentCompleted.push(moduleId);
      }
      await updateUserData({
        completedLessons: currentCompleted
      });
    }
  }, [updateUserProgress, updateUserData, userData, moduleId, selectedQuizMode, questions.length]);
  const advanceToNext = reactExports.useCallback(() => {
    if (advanceLockRef.current) return;
    advanceLockRef.current = true;
    clearAdvanceTimer();
    setSelectedOption(null);
    setIsCorrect(null);
    setHasChecked(false);
    setTypingAnswer("");
    if (heartsRef.current !== null && heartsRef.current <= 0) {
      finishQuiz(scoreRef.current);
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishQuiz(scoreRef.current);
    }
  }, [currentIndex, questions, finishQuiz, clearAdvanceTimer]);
  const handleOptionSelect = reactExports.useCallback(async (option) => {
    var _a;
    if (selectedOption || hasChecked) return;
    if (answerLockRef.current) return;
    answerLockRef.current = true;
    setSelectedOption(option);
    setHasChecked(true);
    const currentQ = questions[currentIndex];
    const correct = option === currentQ.correctAnswer;
    setIsCorrect(correct);
    const responseMs = Date.now() - questionStartTimeRef.current;
    const grade = gradeFromAnswer({ correct, responseMs });
    stopAllActiveAudio();
    if (correct) {
      playSuccessSound();
      const nextScore = scoreRef.current + 1;
      scoreRef.current = nextScore;
      setScore(nextScore);
    } else {
      playFailureSound();
      loseHeart();
      if (currentQ) {
        setMissedQuestions((prev) => {
          if (prev.some((q) => q.id === currentQ.id)) return prev;
          return [...prev, currentQ];
        });
      }
    }
    clearAdvanceTimer();
    advanceTimerRef.current = window.setTimeout(() => {
      advanceTimerRef.current = null;
      advanceToNext();
    }, correct ? 1400 : 2200);
    if (userData && updateUserData && currentQ) {
      const cat = currentQ.category || "general";
      const lemmaId = currentQ.wordId || ((_a = currentQ.word) == null ? void 0 : _a.id) || currentQ.id.replace(/_q\d+$/, "");
      const correctsMap = { ...userData.strongCategories || {} };
      const mistakesMap = { ...userData.weakCategories || {} };
      const wrongsHistory = [...userData.wrongAnswersHistory || []];
      const updatedDeck = recordReview(userData.reviewDeck || {}, lemmaId, grade);
      try {
        if (correct) {
          correctsMap[cat] = (correctsMap[cat] || 0) + 1;
          const filteredWrongs = wrongsHistory.filter((id) => id !== lemmaId && id !== currentQ.id);
          await updateUserData({
            strongCategories: correctsMap,
            wrongAnswersHistory: filteredWrongs,
            reviewDeck: updatedDeck
          });
        } else {
          mistakesMap[cat] = (mistakesMap[cat] || 0) + 1;
          if (!wrongsHistory.includes(lemmaId)) {
            wrongsHistory.push(lemmaId);
          }
          await updateUserData({
            weakCategories: mistakesMap,
            wrongAnswersHistory: wrongsHistory,
            reviewDeck: updatedDeck
          });
        }
      } catch (err) {
        console.warn("Quiz progress persistence failed:", err);
      }
    }
  }, [selectedOption, hasChecked, questions, currentIndex, userData, updateUserData, advanceToNext, clearAdvanceTimer, loseHeart]);
  const handleVerify = reactExports.useCallback(async () => {
    var _a;
    if (!typingAnswer.trim() || hasChecked) return;
    if (answerLockRef.current) return;
    answerLockRef.current = true;
    const currentQ = questions[currentIndex];
    const correctAns = currentQ.correctAnswer;
    const isAnsCorrect = isQuizAnswerAccepted(typingAnswer, correctAns);
    setIsCorrect(isAnsCorrect);
    setHasChecked(true);
    const responseMs = Date.now() - questionStartTimeRef.current;
    const grade = gradeFromAnswer({ correct: isAnsCorrect, responseMs });
    stopAllActiveAudio();
    if (isAnsCorrect) {
      playSuccessSound();
      const nextScore = scoreRef.current + 1;
      scoreRef.current = nextScore;
      setScore(nextScore);
    } else {
      playFailureSound();
      loseHeart();
      if (currentQ) {
        setMissedQuestions((prev) => {
          if (prev.some((q) => q.id === currentQ.id)) return prev;
          return [...prev, currentQ];
        });
      }
    }
    if (userData && updateUserData && currentQ) {
      const cat = currentQ.category || "general";
      const lemmaId = currentQ.wordId || ((_a = currentQ.word) == null ? void 0 : _a.id) || currentQ.id.replace(/_q\d+$/, "");
      const correctsMap = { ...userData.strongCategories || {} };
      const mistakesMap = { ...userData.weakCategories || {} };
      const wrongsHistory = [...userData.wrongAnswersHistory || []];
      const updatedDeck = recordReview(userData.reviewDeck || {}, lemmaId, grade);
      try {
        if (isAnsCorrect) {
          correctsMap[cat] = (correctsMap[cat] || 0) + 1;
          const filteredWrongs = wrongsHistory.filter((id) => id !== lemmaId && id !== currentQ.id);
          await updateUserData({
            strongCategories: correctsMap,
            wrongAnswersHistory: filteredWrongs,
            reviewDeck: updatedDeck
          });
        } else {
          mistakesMap[cat] = (mistakesMap[cat] || 0) + 1;
          if (!wrongsHistory.includes(lemmaId)) {
            wrongsHistory.push(lemmaId);
          }
          await updateUserData({
            weakCategories: mistakesMap,
            wrongAnswersHistory: wrongsHistory,
            reviewDeck: updatedDeck
          });
        }
      } catch (err) {
        console.warn("Quiz progress persistence failed:", err);
      }
    }
  }, [typingAnswer, hasChecked, questions, currentIndex, userData, updateUserData, loseHeart]);
  const handleNext = reactExports.useCallback(() => {
    advanceToNext();
  }, [advanceToNext]);
  const handleCharClick = reactExports.useCallback((char) => {
    setTypingAnswer((prev) => prev + char);
    const inputEl = document.getElementById("writing-input");
    if (inputEl) {
      inputEl.focus();
    }
  }, []);
  const restartMissedQuestions = reactExports.useCallback(() => {
    if (missedQuestions.length === 0) return;
    clearAdvanceTimer();
    advanceLockRef.current = false;
    answerLockRef.current = false;
    setQuestions([...missedQuestions]);
    setQuestionSetReady(true);
    setMissedQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    scoreRef.current = 0;
    finishStartedRef.current = false;
    setIsFinished(false);
    setShowConfetti(false);
    setHasChecked(false);
    setSelectedOption(null);
    setTypingAnswer("");
    setIsCorrect(null);
    heartsRef.current = heartsEnabled ? HEARTS_PER_QUIZ : null;
    setHearts(heartsRef.current);
    questionStartTimeRef.current = Date.now();
  }, [missedQuestions, clearAdvanceTimer, heartsEnabled]);
  return {
    selectedQuizMode,
    setSelectedQuizMode,
    questions,
    questionSetReady,
    currentIndex,
    selectedOption,
    typingAnswer,
    setTypingAnswer,
    hasChecked,
    isCorrect,
    score,
    hearts,
    isFinished,
    showConfetti,
    earnedXp,
    earnedGems,
    missedQuestions,
    restartMissedQuestions,
    handleOptionSelect,
    handleVerify,
    handleNext,
    handleCharClick
  };
}
function MultipleChoiceQuestion({
  currentQ,
  eliminatedOptions = [],
  selectedOption,
  hasChecked,
  isCorrect,
  handleOptionSelect
}) {
  const options = (currentQ == null ? void 0 : currentQ.options) || [];
  const isGrid = options.length <= 4;
  return (
    /* `mt-auto` removed: inside the centring wrapper it pinned the options to
       the bottom, opening a huge dead void under the question card. */
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mb-2 ${isGrid ? "grid grid-cols-2 gap-3.5" : "space-y-3"}`, children: options.map((opt, i) => {
      const isSelected = selectedOption === opt;
      const isCorrectAnswer = opt === currentQ.correctAnswer;
      const isEliminated = eliminatedOptions.includes(opt);
      let btnClass = "bg-white border-2 border-slate-100 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs";
      if (isEliminated && !selectedOption && !hasChecked) {
        btnClass = "bg-slate-100 border-2 border-slate-200 text-slate-400 line-through opacity-40 dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-600";
      } else if (selectedOption || hasChecked) {
        if (isSelected && isCorrect) {
          btnClass = "bg-emerald-50 border-2 border-emerald-500 text-emerald-800 font-black dark:bg-emerald-950/60 dark:text-emerald-300 shadow-sm";
        } else if (isSelected && !isCorrect) {
          btnClass = "bg-rose-50 border-2 border-rose-500 text-rose-800 font-black dark:bg-rose-950/60 dark:text-rose-300 shadow-sm";
        } else if (!isSelected && isCorrectAnswer) {
          btnClass = "bg-emerald-50/80 border-2 border-emerald-500/80 text-emerald-700 font-bold dark:bg-emerald-950/40 dark:text-emerald-300";
        } else {
          btnClass = "bg-slate-50 border border-slate-200 text-slate-400 opacity-50 dark:bg-slate-900/50 dark:border-slate-800";
        }
      } else {
        btnClass += " hover:bg-indigo-50/60 dark:hover:bg-slate-800 hover:border-indigo-400 active:scale-[0.98] cursor-pointer";
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: `opt-btn-${i}`,
          type: "button",
          disabled: !!selectedOption || hasChecked || isEliminated,
          onClick: () => handleOptionSelect(opt),
          "aria-pressed": isSelected,
          "aria-label": isEliminated ? `Option ${i + 1}: ${opt} — eliminated by hint` : `Option ${i + 1}: ${opt}`,
          className: `w-full ${isGrid ? "min-h-[72px] p-4 text-center justify-center flex-col" : "min-h-[52px] p-4 text-center justify-between"} rounded-2xl text-base font-black transition-all duration-200 ${btnClass} flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: opt }) }),
            selectedOption && isSelected && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-emerald-600 shrink-0" }),
            selectedOption && isSelected && !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-rose-600 shrink-0" })
          ]
        },
        i
      );
    }) })
  );
}
function TranslateQuestion({
  currentQ,
  typingAnswer,
  setTypingAnswer,
  hasChecked,
  isCorrect,
  language,
  handleCharClick,
  handleVerify,
  handleNext
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      currentQ.type === "fill_blank" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/40 rounded-2xl p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold text-amber-600 dark:text-amber-400 block uppercase tracking-wider mb-1", children: language !== "ar" ? "Translation Hint" : "تلميح الترجمة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-amber-500 fill-amber-300 animate-pulse shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? currentQ.hintEn || currentQ.hintAr : currentQ.hintAr })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "writing-input",
          type: "text",
          autoFocus: true,
          disabled: hasChecked,
          value: typingAnswer,
          onChange: (e) => setTypingAnswer(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              if (!hasChecked) {
                if (typingAnswer.trim()) handleVerify();
              } else {
                handleNext();
              }
            }
          },
          className: `w-full p-5 rounded-3xl text-xl font-bold border-2 focus:outline-none transition-all duration-300 text-center shadow-xs ${hasChecked ? isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-extrabold dark:bg-emerald-950 dark:text-emerald-300" : "bg-red-50 border-red-500 text-red-800 font-extrabold dark:bg-red-950 dark:text-red-300" : "bg-white border-slate-200 focus:border-purple-500 text-slate-800 dark:bg-slate-900 dark:border-slate-800 focus:ring-2 focus:ring-purple-200 dark:text-white"}`,
          placeholder: t(language, "type_placeholder"),
          dir: "ltr",
          autoComplete: "off",
          autoCapitalize: "none"
        }
      ),
      !hasChecked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 pt-1 select-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-black tracking-wider text-slate-400", children: language !== "ar" ? "Helper letters:" : "حروف مساعدة للكتابة:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center", children: ["ç", "ê", "î", "ş", "û"].map((char) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleCharClick(char),
            "aria-label": `Insert letter ${char}`,
            className: "min-w-[44px] min-h-[44px] bg-white border border-slate-200 rounded-xl font-black text-slate-700 hover:bg-purple-100 hover:border-purple-300 active:scale-90 transition-all cursor-pointer flex items-center justify-center text-base shadow-xs dark:bg-slate-900 dark:border-slate-800 dark:text-white focus-visible:ring-2 focus-visible:ring-indigo-600",
            children: char
          },
          char
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasChecked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: -10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: -10 },
          className: `p-5 rounded-3xl border flex flex-col gap-2 text-center ${isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:text-red-300"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 font-black text-base", children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5.5 h-5.5 text-emerald-600 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "correct") })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5.5 h-5.5 text-red-600 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "incorrect") })
            ] }) }),
            !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75 block mb-1", children: t(language, "correct_answer_is") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { className: "text-lg font-black tracking-wide text-indigo-700 dark:text-indigo-400 block bg-white dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60 mt-1 shadow-xs", children: currentQ.correctAnswer })
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 mb-4", children: !hasChecked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        id: "verify-btn",
        type: "button",
        disabled: !typingAnswer.trim(),
        onClick: handleVerify,
        className: `w-full py-4 rounded-3xl font-black text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 border-none ${typingAnswer.trim() ? "bg-purple-600 hover:bg-purple-700 active:scale-95 text-white cursor-pointer shadow-purple-600/20" : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
          t(language, "check")
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        id: "next-btn",
        type: "button",
        onClick: handleNext,
        className: "w-full py-4 rounded-3xl font-black text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer border-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "continue") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:-scale-x-100" })
        ]
      }
    ) })
  ] });
}
function ScrambledLettersQuestion({
  currentQ,
  typingAnswer,
  setTypingAnswer,
  selectedBlockIndices,
  setSelectedBlockIndices,
  hasChecked,
  isCorrect,
  language,
  handleVerify,
  handleNext
}) {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "key-scrambled flex-1 flex flex-col justify-between mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 min-h-[70px] bg-white border-2 border-dashed border-slate-200 rounded-3xl dark:bg-slate-900 dark:border-slate-800 flex flex-wrap gap-1.5 items-center justify-center shadow-inner", children: typingAnswer.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs font-bold animate-pulse", children: language !== "ar" ? "Click letter blocks below to spell..." : "اضغط على المكعبات في الأسفل للتهجئة..." }) : typingAnswer.split("").map((char, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "px-3.5 py-1.5 bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-white border border-indigo-200 rounded-xl font-black text-base drop-shadow-xs",
          children: char
        },
        index
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center max-w-sm mx-auto", children: (_a = currentQ.scrambledLetters) == null ? void 0 : _a.map((char, index) => {
        const isSelected = selectedBlockIndices.includes(index);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            disabled: isSelected || hasChecked,
            onClick: () => {
              if (isSelected || hasChecked) return;
              const newIndices = [...selectedBlockIndices, index];
              setSelectedBlockIndices(newIndices);
              const assembled = newIndices.map((idx) => currentQ.scrambledLetters[idx]).join("");
              setTypingAnswer(assembled);
            },
            "aria-label": `Letter ${char}`,
            "aria-pressed": isSelected,
            className: `min-w-[44px] min-h-[44px] rounded-xl border-2 font-black text-base flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 ${isSelected ? "bg-slate-100 border-slate-200 text-slate-300 dark:bg-slate-950 dark:border-slate-800 pointer-events-none opacity-40 shadow-none border-dashed" : "bg-white border-indigo-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white"}`,
            children: char
          },
          index
        );
      }) }),
      !hasChecked && selectedBlockIndices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setSelectedBlockIndices([]);
            setTypingAnswer("");
          },
          className: "min-h-[44px] px-3 py-2 text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer bg-transparent border-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg",
          children: language !== "ar" ? "Reset Spelling ↺" : "إعادة تعيين الأحرف ↺"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasChecked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: -10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          className: `p-5 rounded-3xl border flex flex-col gap-2 text-center ${isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/40 dark:text-red-300"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 font-black text-base", children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5.5 h-5.5 text-emerald-600 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "correct") })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5.5 h-5.5 text-red-600 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "incorrect") })
            ] }) }),
            !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75 block mb-1", children: t(language, "correct_answer_is") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { className: "text-lg font-black tracking-wide text-indigo-700 dark:text-indigo-400 block bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60 mt-1 shadow-xs", children: currentQ.correctAnswer })
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 mb-4", children: !hasChecked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        disabled: selectedBlockIndices.length === 0,
        onClick: handleVerify,
        className: `w-full py-4 rounded-3xl font-black text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 border-none ${selectedBlockIndices.length > 0 ? "bg-purple-600 hover:bg-purple-700 active:scale-95 text-white cursor-pointer shadow-purple-600/20" : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
          t(language, "check")
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handleNext,
        className: "w-full py-4 rounded-3xl font-black text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer border-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "continue") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:-scale-x-100" })
        ]
      }
    ) })
  ] });
}
function SentenceReorderQuestion({
  currentQ,
  selectedBlockIndices,
  setSelectedBlockIndices,
  typingAnswer,
  setTypingAnswer,
  hasChecked,
  isCorrect,
  language,
  handleVerify,
  handleNext
}) {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "key-scrambled-sentence flex-1 flex flex-col justify-between mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-50/55 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900/60 rounded-3xl p-4.5 text-center flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-amber-100 dark:bg-amber-950/40 rounded-xl h-max text-amber-600 dark:text-amber-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-5 h-5 fill-amber-300 animate-pulse" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black tracking-wider text-indigo-500 uppercase block mb-1", children: language !== "ar" ? "Translate Sentence:" : "ترجم الجملة المقترحة للغة الكوردية:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[15px] font-bold text-slate-800 dark:text-slate-100", children: [
            '"',
            language !== "ar" ? currentQ.hintEn || currentQ.hintAr : currentQ.hintAr,
            '"'
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 min-h-[80px] bg-white border-2 border-dashed border-purple-100 dark:border-slate-800 dark:bg-slate-900 rounded-3xl flex flex-wrap gap-2 items-center justify-center shadow-inner", children: selectedBlockIndices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs font-bold animate-pulse text-center", children: language !== "ar" ? "Select words below to construct the translation:" : "اضغط على الكلمات بالترتيب الصحيح لتشكيل الجملة الكوردية" }) : selectedBlockIndices.map((idx, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "px-3 py-1.5 bg-gradient-to-br from-indigo-50 to-indigo-100/30 text-indigo-600 dark:from-slate-800 dark:to-slate-800 dark:text-white border border-indigo-200 rounded-xl font-extrabold text-sm drop-shadow-xs",
          children: currentQ.sentenceWords[idx]
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: (_a = currentQ.sentenceWords) == null ? void 0 : _a.map((word, index) => {
        const isSelected = selectedBlockIndices.includes(index);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            disabled: isSelected || hasChecked,
            onClick: () => {
              if (isSelected || hasChecked) return;
              const newIndices = [...selectedBlockIndices, index];
              setSelectedBlockIndices(newIndices);
              const assembled = newIndices.map((idx) => currentQ.sentenceWords[idx]).join(" ");
              setTypingAnswer(assembled);
            },
            "aria-label": `Word ${word}`,
            "aria-pressed": isSelected,
            className: `min-h-[44px] px-4 py-2.5 rounded-2xl border-2 font-bold text-sm shadow-xs transition-colors active:scale-90 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 ${isSelected ? "bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-950 dark:border-slate-800 pointer-events-none opacity-40 shadow-none border-dashed" : "bg-white border-purple-200 text-slate-800 hover:border-purple-400 hover:bg-purple-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white"}`,
            children: word
          },
          index
        );
      }) }),
      !hasChecked && selectedBlockIndices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setSelectedBlockIndices([]);
            setTypingAnswer("");
          },
          className: "min-h-[44px] px-3 py-2 text-xs font-black text-purple-600 dark:text-purple-400 hover:underline cursor-pointer bg-transparent border-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg",
          children: language !== "ar" ? "Reset Order ↺" : "إعادة ترتيب الكلمات ↺"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasChecked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: -10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          className: `p-5 rounded-3xl border flex flex-col gap-2 text-center ${isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/40 dark:text-red-300"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 font-black text-base", children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5.5 h-5.5 text-emerald-600 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "correct") })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5.5 h-5.5 text-red-600 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "incorrect") })
            ] }) }),
            !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75 block mb-1", children: t(language, "correct_answer_is") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { className: "text-lg font-black tracking-wide text-indigo-700 dark:text-indigo-400 block bg-white dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60 mt-1 shadow-xs", children: currentQ.correctAnswer })
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 mb-4", children: !hasChecked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        disabled: selectedBlockIndices.length === 0,
        onClick: handleVerify,
        className: `w-full py-4 rounded-3xl font-black text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 border-none ${selectedBlockIndices.length > 0 ? "bg-purple-600 hover:bg-purple-700 active:scale-95 text-white cursor-pointer shadow-purple-600/20" : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
          t(language, "check")
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handleNext,
        className: "w-full py-4 rounded-3xl font-black text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer border-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "continue") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:-scale-x-100" })
        ]
      }
    ) })
  ] });
}
const iconMap = {
  book: BookOpen,
  books: BookOpen,
  message: MessageCircle,
  chat: MessageCircle,
  sparkles: Sparkles,
  heart: Heart,
  smile: Smile,
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  food: Utensils,
  utensils: Utensils,
  drink: Coffee,
  coffee: Coffee,
  apple: Apple,
  fruit: Apple,
  car: Car,
  transport: Car,
  home: House,
  house: House,
  building: Building,
  building2: Building2,
  buildings: Building2,
  users: Users,
  family: Users,
  people: Users,
  user: User,
  compass: Compass,
  map: MapPin,
  clock: Clock,
  time: Clock,
  calendar: Calendar,
  award: Award,
  trophy: Trophy,
  star: Star,
  type: Type,
  alphabet: Type,
  brain: Brain,
  shield: Shield,
  zap: Zap,
  globe: Globe,
  default: CircleQuestionMark
};
function getIconByName(name, className = "w-6 h-6") {
  const normalized = (name || "").toLowerCase().trim();
  const IconComponent = iconMap[normalized] || iconMap.default;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className });
}
function QuizStudyPhase({
  language,
  catName,
  catIcon,
  words,
  useSlowPronunciation,
  onToggleSlow,
  isMuted,
  onToggleMute,
  onStart,
  onExit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col h-full absolute top-0 start-0 w-full bg-surface-2 text-ink z-50 font-sans leading-relaxed overflow-y-auto pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: onExit,
          "aria-label": language !== "ar" ? "Exit lesson" : "إنهاء الدرس",
          className: "shrink-0 !px-0 w-11 rounded-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-black flex-1 text-center text-ink truncate", children: language !== "ar" ? "Phase 1: Explore & Learn" : "المرحلة الأولى: دراسة مفردات الوحدة" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11 shrink-0", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", className: "flex items-center gap-4 mb-6 max-w-sm mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-surface-2 border-2 border-line flex items-center justify-center rounded-control shrink-0", children: getIconByName(catIcon, "w-8 h-8 text-brand") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black text-brand uppercase tracking-wider block mb-0.5", children: language !== "ar" ? "LET'S ENRICH SENSES" : "ادرس وانطق الكلمات لتثبيتها" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-ink truncate", children: catName })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-sm mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "sm", elevation: "flat", className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-ink flex items-center gap-1.5 min-w-0", children: [
          useSlowPronunciation ? /* @__PURE__ */ jsxRuntimeExports.jsx(Turtle, { className: "w-4 h-4 text-brand shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Rabbit, { className: "w-4 h-4 text-brand shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: language !== "ar" ? "Slow Speaker" : "تحدث بطيء" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: useSlowPronunciation,
            onChange: onToggleSlow,
            label: language !== "ar" ? "Slow pronunciation" : "النطق البطيء"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "sm", elevation: "flat", className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-ink flex items-center gap-1.5 min-w-0", children: [
          isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4 text-danger shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4 text-success shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: language !== "ar" ? "Mute" : "كتم الصوت" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: isMuted,
            onChange: onToggleMute,
            tone: "warning",
            label: language !== "ar" ? "Mute audio" : "كتم الصوت"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 flex-1 max-w-sm mx-auto w-full mb-6 list-none p-0", children: words.map((word) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        as: "li",
        elevation: "flat",
        className: "flex items-center justify-between gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-surface-2 rounded-control flex items-center justify-center text-3xl select-none shrink-0", children: word.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-ink text-base leading-tight truncate", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: word.ku }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-xs font-bold mt-1 truncate", children: language !== "ar" ? word.en : word.ar })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AudioButton,
            {
              audioUrl: word.audio,
              textToSpeak: word.ku,
              className: "bg-surface-2 hover:bg-surface-3 p-2.5 text-brand rounded-control shrink-0",
              iconClassName: "w-4 h-4",
              showProgress: false,
              playbackRate: useSlowPronunciation ? 0.65 : 1
            }
          )
        ]
      },
      word.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-sm mx-auto w-full mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "success",
        size: "lg",
        fullWidth: true,
        onClick: onStart,
        trailingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rtl:rotate-180" }),
        children: language !== "ar" ? "Let's Play Random Quiz!" : "الآن اختبر مهاراتي في التحدي!"
      }
    ) })
  ] });
}
function QuizModePicker({ language, userLevelId, showAdaptive, onSelectMode, onBack, onLeaderboard }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col h-full absolute top-0 start-0 w-full bg-surface-2 text-ink z-50 font-sans leading-relaxed overflow-y-auto pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 py-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: onBack,
          "aria-label": language !== "ar" ? "Back" : "رجوع",
          className: "shrink-0 w-11 !px-0 rounded-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 rtl:-scale-x-100" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-black text-ink truncate", children: t(language, "quiz_hub_title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: onLeaderboard,
          "aria-label": language !== "ar" ? "Leaderboard" : "قائمة المتصدرين",
          className: "shrink-0 w-11 !px-0 rounded-full text-warning",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 max-w-sm mx-auto w-full px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-ink tracking-tight", children: t(language, "quiz_choose_title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted font-bold mt-1", children: t(language, "quiz_choose_sub") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 flex-1 max-w-sm mx-auto w-full", children: [
      showAdaptive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSelectMode("adaptive_practice"),
          "aria-label": `${t(language, "quiz_mode_adaptive_title")}. ${t(language, "quiz_mode_adaptive_desc")}`,
          className: cn(
            "w-full bg-surface border-2 border-brand/60 rounded-card p-4 shadow-flat",
            "flex items-center justify-between gap-3 text-start cursor-pointer",
            "min-h-[44px] transition-[transform,border-color] hover:-translate-y-0.5 hover:border-brand",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3.5 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 h-12 rounded-control bg-[#FFF6E0] dark:bg-[#3A2F14] text-brand flex items-center justify-center shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-x-2 gap-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-ink text-base leading-tight whitespace-nowrap", children: t(language, "quiz_mode_adaptive_title") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "primary", className: "tracking-normal shrink-0", children: [
                    userLevelId,
                    " · ",
                    t(language, "quiz_personalized_badge")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted text-xs mt-1 font-bold block", children: t(language, "quiz_mode_adaptive_desc") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-muted shrink-0 rtl:rotate-180", "aria-hidden": "true" })
          ]
        }
      ),
      [
        {
          mode: "multiple_choice",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black", children: "ABC" }),
          tone: "text-brand-alt",
          title: t(language, "quiz_mode_word_title"),
          desc: t(language, "quiz_mode_word_desc"),
          locked: false
        },
        {
          mode: "listening",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5" }),
          tone: "text-brand",
          title: t(language, "quiz_mode_listening_title"),
          desc: t(language, "quiz_mode_listening_desc"),
          locked: false
        },
        {
          mode: "write_kurdish",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "w-5 h-5" }),
          tone: "text-warning",
          title: t(language, "quiz_mode_writing_title"),
          desc: t(language, "quiz_mode_writing_desc"),
          locked: false
        },
        {
          mode: "emoji_match",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-5 h-5" }),
          tone: "text-info",
          title: t(language, "quiz_mode_image_title"),
          desc: t(language, "quiz_mode_image_desc"),
          locked: true
        }
      ].map((opt) => {
        if (opt.locked) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              role: "button",
              "aria-disabled": "true",
              "aria-label": `${opt.title}. ${t(language, "quiz_coming_soon")}`,
              className: cn(
                "w-full bg-surface-2 border-2 border-dashed border-line-soft rounded-card p-4",
                "flex items-center justify-between gap-3 text-start cursor-not-allowed select-none min-h-[44px]"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3.5 min-w-0 opacity-60", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("w-12 h-12 rounded-control bg-surface flex items-center justify-center shrink-0", opt.tone), "aria-hidden": "true", children: opt.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-ink text-base leading-tight block", children: opt.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted text-xs mt-1 font-bold block", children: opt.desc })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "warning", className: "tracking-normal shrink-0 normal-case", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3", "aria-hidden": "true" }),
                  t(language, "quiz_coming_soon")
                ] })
              ]
            },
            opt.mode
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelectMode(opt.mode),
            "aria-label": `${opt.title}. ${opt.desc}`,
            className: cn(
              "w-full bg-surface border-2 border-line rounded-card p-4 shadow-flat",
              "flex items-center justify-between gap-3 text-start cursor-pointer",
              "min-h-[44px] transition-[transform,border-color] hover:-translate-y-0.5 hover:border-line-soft",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn("w-12 h-12 rounded-control bg-surface-2 flex items-center justify-center shrink-0", opt.tone),
                    "aria-hidden": "true",
                    children: opt.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-ink text-base leading-tight block", children: opt.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted text-xs mt-1 font-bold block", children: opt.desc })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-muted shrink-0 rtl:rotate-180", "aria-hidden": "true" })
            ]
          },
          opt.mode
        );
      })
    ] })
  ] });
}
function QuizResults({
  language,
  score,
  total,
  earnedXp,
  earnedGems,
  showConfetti,
  hasMissedQuestions,
  onPrimary,
  onHome
}) {
  const accuracyPercent = Math.round(score / (total || 1) * 100);
  const missedCount = total - score;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-full flex flex-col items-center justify-between p-5 text-center absolute top-0 start-0 bg-surface-2 z-50 overflow-y-auto pb-20 select-none", children: [
    showConfetti && /* @__PURE__ */ jsxRuntimeExports.jsx(ReactConfetti, { width: globalThis.window !== void 0 ? window.innerWidth : 400, height: globalThis.window !== void 0 ? window.innerHeight : 800, recycle: false, numberOfPieces: 300 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm py-2 text-center border-b-2 border-line pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-black text-ink", children: language !== "ar" ? "Quiz Results" : "نتائج الاختبار" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-auto py-4 flex flex-col items-center space-y-4 max-w-sm w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-center justify-center my-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-36 h-36 rounded-full border-8 border-line flex items-center justify-center relative bg-surface", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute inset-0 w-full h-full -rotate-90", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "50",
            cy: "50",
            r: "42",
            fill: "transparent",
            stroke: "currentColor",
            strokeWidth: "8",
            className: "text-brand transition-all duration-1000",
            strokeDasharray: `${accuracyPercent * 2.64} 264`,
            strokeLinecap: "round"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-10 h-10 text-warning drop-shadow-sm mb-1 animate-bounce" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-black text-ink", children: [
            score,
            "/",
            total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold text-muted", children: [
            accuracyPercent,
            "%"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-ink font-display", children: accuracyPercent >= 80 ? language !== "ar" ? "Serkeftin! Well done!" : "سەركەفتن! أحسنت!" : language !== "ar" ? "Good effort — keep going!" : "جهد طيب — واصل!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted font-bold text-xs", children: language !== "ar" ? "You completed the quiz successfully" : "لقد أكملت الاختبار بنجاح" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5 w-full pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "sm", elevation: "flat", className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-ink", children: total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted mt-0.5", children: language !== "ar" ? "Total" : "عدد الأسئلة" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "sm", elevation: "flat", className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-success", children: score }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted mt-0.5", children: language !== "ar" ? "Correct" : "إجابات صحيحة" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "sm", elevation: "flat", className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-danger", children: missedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted mt-0.5", children: language !== "ar" ? "Errors" : "أخطاء" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "success", className: "text-xs px-3.5 py-1.5 normal-case tracking-normal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
          "+",
          earnedXp || score * 12,
          " XP"
        ] }),
        earnedGems > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "warning", className: "text-xs px-3.5 py-1.5 normal-case tracking-normal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "💎" }),
          " +",
          earnedGems
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-2.5 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          fullWidth: true,
          onClick: onPrimary,
          trailingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 rtl:rotate-180" }),
          children: hasMissedQuestions ? language !== "ar" ? "Review Answers" : "مراجعة الإجابات" : t(language, "continue")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", fullWidth: true, onClick: onHome, children: language !== "ar" ? "Back to Home" : "العودة للرئيسية" })
    ] })
  ] });
}
function Quiz() {
  var _a, _b, _c;
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { showInterstitial } = useAdStore();
  const { userData, updateUserData, updateUserProgress, language } = useAuth();
  const [useSlowPronunciation, setUseSlowPronunciation] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(getMuteState());
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    setMuteState(nextMute);
  };
  const [isInStudyPhase, setIsInStudyPhase] = reactExports.useState(true);
  const [selectedBlockIndices, setSelectedBlockIndices] = reactExports.useState([]);
  const [hintUsed, setHintUsed] = reactExports.useState(false);
  const [eliminatedOptions, setEliminatedOptions] = reactExports.useState([]);
  const [showExitConfirm, setShowExitConfirm] = reactExports.useState(false);
  const {
    selectedQuizMode,
    setSelectedQuizMode,
    questions,
    questionSetReady,
    currentIndex,
    selectedOption,
    typingAnswer,
    setTypingAnswer,
    hasChecked,
    isCorrect,
    score,
    hearts,
    isFinished,
    showConfetti,
    earnedXp,
    earnedGems,
    missedQuestions,
    restartMissedQuestions,
    handleOptionSelect,
    handleVerify,
    handleNext,
    handleCharClick
  } = useQuizEngine({
    moduleId,
    language,
    updateUserProgress,
    updateUserData,
    userData,
    navigateBack: () => navigate(-1)
  });
  React.useEffect(() => {
    setSelectedBlockIndices([]);
    setHintUsed(false);
    setEliminatedOptions([]);
  }, [currentIndex]);
  const activeListenQ = !isFinished && questionSetReady ? questions[currentIndex] : void 0;
  React.useEffect(() => {
    if (!activeListenQ || activeListenQ.type !== "listen" || !activeListenQ.audio) return;
    const timer = window.setTimeout(() => {
      var _a2;
      void playAudioUrl(
        activeListenQ.audio,
        ((_a2 = activeListenQ.word) == null ? void 0 : _a2.ku) || activeListenQ.correctAnswer,
        useSlowPronunciation ? 0.65 : 1
      );
    }, 400);
    return () => {
      window.clearTimeout(timer);
      stopAllActiveAudio();
    };
  }, [activeListenQ == null ? void 0 : activeListenQ.id]);
  const getCategoryInfo = () => {
    if (moduleId === "alphabet") return { name: t(language, "alphabet"), icon: "Type" };
    if (moduleId === "srs_review") return { name: language !== "ar" ? "Spaced Repetition Review" : "مراجعة التكرار المتباعد", icon: "RotateCcw" };
    if (moduleId === "review_mistakes") return { name: language !== "ar" ? "Review Lessons Mistakes" : "مراجعة وتكرار الأخطاء والمطبات", icon: "Brain" };
    for (const lvl of learningPath) {
      const les = lvl.lessons.find((l) => l.id === moduleId);
      if (les) return { name: language !== "ar" ? les.titleEn : les.titleAr, icon: les.icon };
    }
    const cat = categories.find((c) => c.id === moduleId);
    if (cat) return { name: language !== "ar" ? cat.name : cat.ar || cat.name, icon: cat.icon };
    const acadCat = academicCategories.find((c) => c.id === moduleId);
    if (acadCat) return { name: language !== "ar" ? acadCat.nameEn : acadCat.nameAr, icon: acadCat.icon };
    return { name: "Practice Sandbox", icon: "BookOpen" };
  };
  const catInfo = getCategoryInfo();
  const userLevelId = getAdaptiveLevelId(userData);
  let matchedLessonWords = [];
  for (const lvl of learningPath) {
    const matched = lvl.lessons.find((l) => l.id === moduleId);
    if (matched) {
      matchedLessonWords = matched.words;
      break;
    }
  }
  if (selectedQuizMode === "mixed_challenge" && isInStudyPhase && matchedLessonWords.length > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizStudyPhase,
      {
        language,
        catName: catInfo.name,
        catIcon: catInfo.icon,
        words: matchedLessonWords,
        useSlowPronunciation,
        onToggleSlow: setUseSlowPronunciation,
        isMuted,
        onToggleMute: handleToggleMute,
        onStart: () => setIsInStudyPhase(false),
        onExit: () => navigate("/roadmap")
      }
    );
  }
  if (!selectedQuizMode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizModePicker,
      {
        language,
        userLevelId,
        showAdaptive: (((_a = userData == null ? void 0 : userData.completedLessons) == null ? void 0 : _a.length) ?? 0) > 0,
        onSelectMode: setSelectedQuizMode,
        onBack: () => navigate(-1),
        onLeaderboard: () => navigate("/leaderboard")
      }
    );
  }
  if (!questionSetReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "lg", showLabel: true, label: t(language, "loading") }) });
  }
  if (isFinished) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizResults,
      {
        language,
        score,
        total: questions.length,
        earnedXp,
        earnedGems,
        showConfetti,
        hasMissedQuestions: missedQuestions.length > 0,
        onPrimary: () => {
          if (missedQuestions.length > 0) {
            restartMissedQuestions();
          } else {
            showInterstitial(() => {
              navigate("/roadmap");
            });
          }
        },
        onHome: () => navigate("/")
      }
    );
  }
  const currentQ = questions[currentIndex];
  if (questions.length === 0) {
    if (moduleId === "srs_review" || moduleId === "review_due" || moduleId === "review_mistakes") {
      const isSrs = moduleId !== "review_mistakes";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col items-center justify-center h-full gap-5 text-center max-w-sm mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-9 h-9" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-ink", children: isSrs ? language === "ku" ? "Tu bi tevahî amade yî! 🎉" : language === "ar" ? "أنت على اطلاع تام! 🎉" : "All caught up! 🎉" : language === "ku" ? "Tomara te paqij e! ✨" : language === "ar" ? "سجلك نظيف! ✨" : "Clean record! ✨" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted font-semibold leading-relaxed", children: isSrs ? language === "ku" ? "Niha tu peyvên ji bo dubarekirinê tune ne. Dersan bidomîne — dubarekirin dê li vir xuya bibin." : language === "ar" ? "لا توجد كلمات بحاجة للمراجعة الآن. واصل الدروس وستظهر المراجعات هنا." : "No words are due for review right now. Keep learning — new reviews will appear here as you go." : language === "ku" ? "Tu çewtiyên ji bo rastkirinê tune ne. Karê hêja!" : language === "ar" ? "لا توجد أخطاء لمعالجتها. عمل رائع!" : "You have no mistakes to fix. Great work!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", fullWidth: true, onClick: () => navigate("/roadmap"), children: language === "ku" ? "Berdewamî fêrbûnê" : language === "ar" ? "واصل التعلم" : "Keep Learning" })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col items-center justify-center h-full gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ErrorState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8", "aria-hidden": "true" }),
          title: language !== "ar" ? "This lesson has no questions yet" : "لا توجد أسئلة في هذا الدرس بعد",
          description: language !== "ar" ? "The lesson may have been moved or renamed. Pick another lesson from the roadmap." : "ربما تم نقل الدرس أو إعادة تسميته. اختر درساً آخر من الخارطة.",
          onRetry: () => navigate("/roadmap"),
          retryLabel: language !== "ar" ? "Roadmap" : "الخارطة",
          className: "w-full max-w-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => navigate(-1), children: language !== "ar" ? "Go back" : "رجوع" })
    ] });
  }
  if (!currentQ || !currentQ.question) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "lg", showLabel: true, label: t(language, "loading") }) });
  }
  const progressPercent = (currentIndex + 1) / questions.length * 100;
  const currentSpeed = useSlowPronunciation ? 0.65 : 1;
  const getQuizModeTitle = () => {
    if (moduleId === "srs_review" || moduleId === "review_mistakes") return getCategoryInfo().name;
    if (selectedQuizMode === "multiple_choice") return t(language, "quiz_mode_word_title");
    if (selectedQuizMode === "emoji_match") return t(language, "quiz_mode_image_title");
    if (selectedQuizMode === "listening") return t(language, "quiz_mode_listening_title");
    if (selectedQuizMode === "write_kurdish") return t(language, "quiz_mode_writing_title");
    if (selectedQuizMode === "adaptive_practice") return t(language, "quiz_mode_adaptive_title");
    if (selectedQuizMode === "mixed_challenge") return t(language, "quiz_mode_mixed_title");
    return language !== "ar" ? "Quiz" : "اختبار";
  };
  const isOptionQuestion = currentQ.type === "multiple_choice" || currentQ.type === "true_false" || currentQ.type === "emoji" || currentQ.type === "listen";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col h-full absolute top-0 start-0 w-full bg-surface-2 text-ink z-50 select-none pb-24 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 py-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => setShowExitConfirm(true),
          "aria-label": language !== "ar" ? "Exit quiz" : "إنهاء الاختبار",
          className: "shrink-0 w-11 !px-0 rounded-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Modal,
        {
          open: showExitConfirm,
          onClose: () => setShowExitConfirm(false),
          title: t(language, "quiz_exit_title"),
          description: t(language, "quiz_exit_msg"),
          hideCloseButton: true,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "secondary",
                fullWidth: true,
                onClick: () => setShowExitConfirm(false),
                children: t(language, "quiz_exit_keep")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "danger",
                fullWidth: true,
                onClick: () => {
                  setShowExitConfirm(false);
                  setSelectedQuizMode(null);
                },
                children: t(language, "quiz_exit_leave")
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-black text-ink truncate", children: getQuizModeTitle() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        hearts !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "flex items-center gap-0.5",
            role: "status",
            "aria-label": language !== "ar" ? `${hearts} hearts left` : `${hearts} قلوب متبقية`,
            children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Heart,
              {
                "aria-hidden": "true",
                className: cn(
                  "w-4 h-4 transition-colors",
                  i < hearts ? "text-[#FF5722] fill-[#FF5722]" : "text-line-soft fill-transparent"
                )
              },
              i
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "primary", className: "shrink-0 tracking-normal", children: [
          currentIndex + 1,
          "/",
          questions.length
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Progress,
      {
        value: progressPercent,
        size: "sm",
        label: language !== "ar" ? "Quiz progress" : "تقدم الاختبار",
        className: "mb-6 max-w-sm mx-auto w-full [&>div:first-child]:sr-only"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between max-w-sm mx-auto w-full space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "lg", className: "text-center flex flex-col items-center justify-center space-y-3", children: currentQ.type === "listen" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-ink tracking-tight", children: currentQ.question || "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudioButton,
          {
            audioUrl: currentQ.audio,
            textToSpeak: ((_b = currentQ.word) == null ? void 0 : _b.ku) || currentQ.correctAnswer,
            className: "w-16 h-16 bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] rounded-full flex items-center justify-center transition-colors cursor-pointer border-none shadow-flat",
            iconClassName: "w-7 h-7",
            showProgress: false,
            playbackRate: currentSpeed
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted", children: t(language, "quiz_tap_to_replay") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-ink tracking-tight", children: currentQ.question || "" }),
        currentQ.audio && /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudioButton,
          {
            audioUrl: currentQ.audio,
            textToSpeak: (_c = currentQ.word) == null ? void 0 : _c.ku,
            className: "bg-surface-2 hover:bg-surface-3 p-2.5 text-brand rounded-control transition-colors cursor-pointer border-none",
            iconClassName: "w-5 h-5",
            showProgress: false,
            playbackRate: currentSpeed
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col justify-center", children: (() => {
        if (currentQ.type === "multiple_choice" || currentQ.type === "true_false" || currentQ.type === "emoji" || currentQ.type === "listen") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            MultipleChoiceQuestion,
            {
              currentQ,
              eliminatedOptions,
              selectedOption,
              hasChecked,
              isCorrect,
              handleOptionSelect
            }
          );
        }
        if (currentQ.type === "translate" || currentQ.type === "fill_blank") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            TranslateQuestion,
            {
              currentQ,
              typingAnswer,
              setTypingAnswer,
              hasChecked,
              isCorrect,
              language,
              handleCharClick,
              handleVerify,
              handleNext
            }
          );
        }
        if (currentQ.type === "scrambled_letters") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScrambledLettersQuestion,
            {
              currentQ,
              typingAnswer,
              setTypingAnswer,
              selectedBlockIndices,
              setSelectedBlockIndices,
              hasChecked,
              isCorrect,
              language,
              handleVerify,
              handleNext
            }
          );
        }
        if (currentQ.type === "sentence_reorder") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            SentenceReorderQuestion,
            {
              currentQ,
              selectedBlockIndices,
              setSelectedBlockIndices,
              typingAnswer,
              setTypingAnswer,
              hasChecked,
              isCorrect,
              language,
              handleVerify,
              handleNext
            }
          );
        }
        return null;
      })() }),
      isOptionQuestion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasChecked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 8 },
            role: "status",
            className: cn(
              "rounded-card border-2 px-4 py-3 flex items-center gap-2.5 text-start",
              isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300" : "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300"
            ),
            children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 shrink-0 text-emerald-600", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-sm", children: t(language, "quiz_feedback_correct") })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 shrink-0 text-rose-600", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75", children: t(language, "correct_answer_is") }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { className: "font-black", children: currentQ.correctAnswer })
              ] })
            ] })
          }
        ) }),
        hasChecked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            fullWidth: true,
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNext();
            },
            children: t(language, "quiz_next")
          }
        ),
        currentQ.options.length > 2 && !hasChecked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            fullWidth: true,
            onClick: () => {
              if (selectedOption || hasChecked || hintUsed) return;
              const cost = 10;
              if (((userData == null ? void 0 : userData.gems) ?? 0) < cost) return;
              const wrongOpts = currentQ.options.filter((o) => o !== currentQ.correctAnswer);
              const toRemove = wrongOpts.slice(0, Math.max(1, Math.floor(wrongOpts.length / 2)));
              setEliminatedOptions(toRemove);
              setHintUsed(true);
              void (updateUserData == null ? void 0 : updateUserData({ gems: ((userData == null ? void 0 : userData.gems) ?? 0) - cost }));
            },
            disabled: hasChecked || hintUsed || ((userData == null ? void 0 : userData.gems) ?? 0) < 10,
            leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3.5 h-3.5 text-warning" }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Use Hint" : "استخدم تلميح" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "warning", className: "ms-2 tracking-normal", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gem, { className: "w-3 h-3", "aria-hidden": "true" }),
                "10"
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  Quiz
};
