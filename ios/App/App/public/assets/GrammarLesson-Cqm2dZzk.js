import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate, d as useParams } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth, e as playCompleteSound, f as playSuccessSound, g as playFailureSound, A as AudioButton } from "./index-C4ml4lrv.js";
import { a as grammarExerciseNodeKey, g as grammarLessonKey, c as checkExerciseAnswer, b as grammarShuffle, d as getGrammarLesson } from "./grammarScoring-DPrToKDM.js";
import { S as SUBJECT_ACCENTS } from "./subjectAccents-Ctlc_nEP.js";
import { g as gradeFromAnswer, r as recordReview } from "./SpacedRepetitionService-DkhvYl5r.js";
import { m as motion, A as AnimatePresence } from "./vendor-motion-D8-S3eer.js";
import { aB as Lightbulb, av as ShieldCheck, X, w as Check, bc as ArrowRight, A as ArrowLeft, bd as ListOrdered, aQ as Keyboard, be as ArrowLeftRight, bf as PenLine, bg as Headphones, bh as Languages, l as Sparkles, p as BookOpen, K as CircleCheck, ay as Table, b3 as RotateCcw } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
import "./answerUtils-WRjxYtEq.js";
function pickLocalized(text, language) {
  return language === "ar" ? text.ar : language === "ku" ? text.ku : text.en;
}
function optionLabel(option, language, mode) {
  if (mode === "target") return option.ku;
  return pickLocalized(option, language);
}
function optionDisplayMode(type, direction) {
  {
    return direction === "to_kurdish" ? "target" : "translation";
  }
}
function exerciseIconKey(type) {
  switch (type) {
    case "select_translation":
      return "languages";
    case "listen_choose":
      return "headphones";
    case "complete_sentence":
      return "pen";
    case "match_pairs":
      return "arrow-left-right";
    case "write_word":
      return "keyboard";
    case "arrange_sentence":
      return "list-ordered";
  }
}
const NO_LESSON = {
  topicId: "",
  xp: 0,
  title: { en: "", ar: "", ku: "" },
  description: { en: "", ar: "", ku: "" },
  concepts: [],
  exercises: []
};
function useGrammarLesson(lesson) {
  const { userData, updateUserData, updateUserProgress } = useAuth();
  const resolved = lesson ?? NO_LESSON;
  const [index, setIndex] = reactExports.useState(0);
  const [score, setScore] = reactExports.useState(0);
  const [checkCount, setCheckCount] = reactExports.useState(0);
  const [phase, setPhase] = reactExports.useState("practicing");
  const [checked, setChecked] = reactExports.useState(null);
  const [earnedXp, setEarnedXp] = reactExports.useState(null);
  const total = resolved.exercises.length;
  const exercise = resolved.exercises[index] ?? null;
  const seenCount = checkCount;
  const allSeen = total > 0 && seenCount >= total;
  const checkedCorrect = checked === true;
  reactExports.useCallback(() => {
    return gradeFromAnswer({ correct: checkedCorrect });
  }, [checkedCorrect]);
  const recordDeckReview = reactExports.useCallback(
    async (ex, correct) => {
      if (!userData || !updateUserData) return;
      const nodeKey = grammarExerciseNodeKey(resolved.topicId, ex.nodeId);
      const grade = gradeFromAnswer({ correct });
      const updatedDeck = recordReview(userData.reviewDeck ?? {}, nodeKey, grade);
      try {
        await updateUserData({ reviewDeck: updatedDeck });
      } catch {
      }
    },
    [userData, updateUserData, resolved.topicId]
  );
  const completeLesson = reactExports.useCallback(async () => {
    if (!userData) return;
    const key = grammarLessonKey(resolved.topicId);
    const completed = [...userData.completedLessons ?? []];
    if (!completed.includes(key)) completed.push(key);
    const gained = Math.max(1, Math.round(resolved.xp * (score / Math.max(1, total))));
    setEarnedXp(gained);
    try {
      await updateUserData({ completedLessons: completed });
    } catch {
    }
    try {
      await updateUserProgress(gained, 0, false, 0);
    } catch {
    }
    playCompleteSound();
  }, [userData, updateUserData, updateUserProgress, resolved, score, total]);
  const checkAnswer = reactExports.useCallback(
    async (answer) => {
      if (!exercise || checked !== null) return;
      const result = checkExerciseAnswer(exercise, answer);
      const correct = result.correct;
      setChecked(correct);
      setCheckCount((n) => n + 1);
      if (correct) {
        setScore((s) => s + 1);
        playSuccessSound();
      } else {
        playFailureSound();
      }
      await recordDeckReview(exercise, correct);
    },
    [exercise, checked, recordDeckReview]
  );
  const nextExercise = reactExports.useCallback(() => {
    setChecked(null);
    if (index + 1 < total) {
      setIndex((i) => i + 1);
    } else {
      setPhase("finished");
      void completeLesson();
    }
  }, [index, total, completeLesson]);
  const restart = reactExports.useCallback(() => {
    setIndex(0);
    setScore(0);
    setCheckCount(0);
    setChecked(null);
    setEarnedXp(null);
    setPhase("practicing");
  }, []);
  const progress = reactExports.useMemo(() => ({ index, total }), [index, total]);
  return {
    exercise,
    index,
    total,
    score,
    phase,
    checked,
    checkedCorrect,
    allSeen,
    earnedXp,
    progress,
    checkAnswer,
    nextExercise,
    restart
  };
}
function TriRow({
  ku = "",
  kuNode,
  ar = "",
  en = "",
  rightNode,
  audioText,
  audioLabel,
  showAudio = true,
  kuClassName = "text-[13px] font-bold text-ink leading-snug",
  arClassName = "text-[12px] font-semibold text-slate-700 dark:text-slate-200 leading-snug",
  enClassName = "text-[11px] font-medium text-muted leading-snug",
  audioClassName = "p-2 min-w-[36px] min-h-[36px]",
  audioIconClassName = "w-4 h-4",
  className = "",
  testId
}) {
  const kuId = testId ? `${testId}-ku` : void 0;
  const audioId = testId ? `${testId}-audio` : void 0;
  const rightId = testId ? `${testId}-right` : void 0;
  const leftCell = kuNode ?? (ku ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "bdi",
    {
      dir: "ltr",
      "data-testid": kuId,
      className: `min-w-0 break-words text-left ${kuClassName}`,
      children: ku
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "min-w-0" }));
  const audioCell = showAudio ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-testid": audioId,
      className: "justify-self-center shrink-0 flex items-center justify-center",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AudioButton,
        {
          textToSpeak: audioText ?? ku,
          label: audioLabel ?? ` of ${ku}`,
          iconClassName: audioIconClassName,
          className: audioClassName,
          showProgress: false
        }
      )
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "justify-self-center min-w-[44px]" });
  const translationStack = rightNode ?? (ar || en ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    ar ? (
      // dir="auto" keeps Arabic reading right-to-left (primary case) but
      // also renders UI-language references (en/ku) left-to-right when a
      // caller passes the localized reference as `ar`.
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: "auto", className: `block ${arClassName}`, children: ar })
    ) : null,
    en ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: "ltr", className: `block ${enClassName}`, children: en }) : null
  ] }) : null);
  const rightCell = translationStack ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-testid": rightId, className: "min-w-0 text-right", children: translationStack }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "min-w-0" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-testid": testId,
      className: `grid grid-cols-[1fr_auto_1fr] items-center gap-3 min-h-[56px] ${className}`,
      style: { direction: "ltr" },
      children: [
        leftCell,
        audioCell,
        rightCell
      ]
    }
  );
}
function ConceptCard({ concept, language }) {
  const isAr = language === "ar";
  const noteHeading = isAr ? "متى تُستخدم: " : language === "ku" ? "Kengî tê bikaranîn: " : "When to use it: ";
  function exampleRow(example, index) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TriRow,
      {
        testId: `example-${index}`,
        ku: example.ku,
        ar: example.ar,
        en: example.en,
        audioText: example.ku
      },
      `${concept.id}-ex-${index}`
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -24 },
      transition: { duration: 0.22 },
      className: "bg-white dark:bg-slate-900 rounded-[28px] p-5 shadow-flat border border-line-soft relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TriRow,
          {
            testId: "concept-title",
            ku: concept.term,
            ar: concept.ar,
            en: concept.en,
            audioText: concept.term,
            className: "min-h-[64px]",
            kuClassName: "text-[30px] font-black tracking-tight text-ink leading-none",
            arClassName: "text-lg font-black text-ink leading-snug",
            enClassName: "text-[13px] font-semibold text-muted leading-snug",
            audioIconClassName: "w-5 h-5"
          }
        ),
        concept.phonetic && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            dir: "ltr",
            className: "mt-1.5 inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[12px] font-semibold text-muted",
            children: concept.phonetic
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-3.5 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] font-black uppercase tracking-wider text-muted mb-1", children: isAr ? "أمثلة" : language === "ku" ? "Nimûne" : "Examples" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: concept.examples.map(exampleRow) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-start gap-2 rounded-2xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 p-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] font-bold leading-relaxed text-slate-800 dark:text-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-teal-700 dark:text-teal-300", children: noteHeading }),
              isAr ? concept.usage.ar : concept.usage.en
            ] }),
            !isAr && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium leading-relaxed text-muted", children: concept.usage.ar })
          ] })
        ] })
      ]
    }
  );
}
function OptionChip({
  option,
  language,
  mode,
  selected,
  submitted,
  isCorrectOption,
  onSelect
}) {
  let cls = "bg-white border-2 border-slate-200 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100";
  if (submitted) {
    if (selected && isCorrectOption) {
      cls = "bg-emerald-50 border-2 border-emerald-500 dark:bg-emerald-950/60 dark:border-emerald-500";
    } else if (selected && !isCorrectOption) {
      cls = "bg-rose-50 border-2 border-rose-500 dark:bg-rose-950/60 dark:border-rose-500";
    } else if (!selected && isCorrectOption) {
      cls = "bg-emerald-50/80 border-2 border-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-400";
    } else {
      cls = "bg-slate-50 border border-slate-200 text-slate-400 opacity-50 dark:bg-slate-900/50 dark:border-slate-800";
    }
  } else if (selected) {
    cls = "bg-slate-100 border-2 border-slate-400 dark:bg-slate-800 dark:border-slate-600";
  }
  const label = optionLabel(option, language, mode);
  const isKurdishTarget = mode === "target";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      disabled: submitted,
      onClick: () => onSelect(option.ku),
      className: `w-full min-h-[72px] rounded-2xl p-4 flex items-center justify-center gap-2 text-center shadow-xs transition-all active:scale-[0.98] ${submitted ? "cursor-default" : "cursor-pointer hover:border-teal-400"} ${cls}`,
      children: isKurdishTarget ? /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { dir: "ltr", className: "text-base font-black leading-snug", children: label }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "auto", className: "text-base font-black leading-snug", children: label })
    }
  );
}
function CheckButton({ disabled, onClick, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      disabled,
      onClick,
      className: `w-full py-4 rounded-3xl font-black text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 border-none ${disabled ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-teal-700 hover:bg-teal-800 active:scale-95 text-white cursor-pointer"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
        label
      ]
    }
  );
}
function ContinueButton({ onClick, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full py-4 rounded-3xl font-black text-sm bg-teal-700 hover:bg-teal-800 active:scale-95 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:-scale-x-100" })
      ]
    }
  );
}
function ResultNote({ correct, answerText, answerIsKurdish, headline, answerLabel }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `p-4 rounded-3xl border flex flex-col gap-2 text-center ${correct ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 font-black text-base", children: [
          correct ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: headline })
        ] }),
        !correct && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75", children: answerLabel }),
          answerIsKurdish ? /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { dir: "ltr", className: "text-lg font-black tracking-wide block bg-white dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60 mt-1 shadow-xs", children: answerText }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "auto", className: "text-lg font-black tracking-wide block bg-white dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60 mt-1 shadow-xs", children: answerText })
        ] })
      ]
    }
  );
}
const DIACRITIC_CHARS = ["ç", "ê", "î", "ş", "û"];
function DiacriticKeys({ onInsert }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 select-none", children: DIACRITIC_CHARS.map((character) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      dir: "ltr",
      onClick: () => onInsert(character),
      "aria-label": `Insert letter ${character}`,
      className: "min-w-[44px] min-h-[44px] bg-white border border-slate-200 rounded-xl font-black text-slate-700 hover:bg-teal-50 hover:border-teal-400 active:scale-90 transition-all cursor-pointer flex items-center justify-center text-base shadow-xs dark:bg-slate-900 dark:border-slate-800 dark:text-white",
      children: character
    },
    character
  )) });
}
function SelectTranslationExercise({ exercise, checked, onCheck, onNext }) {
  const { language } = useAuth();
  const isAr = language === "ar";
  const [pending, setPending] = reactExports.useState(null);
  const submitted = checked !== null;
  const correct = checked === true;
  const options = exercise.options ?? [];
  const direction = exercise.direction ?? "to_arabic";
  const mode = optionDisplayMode("select_translation", direction);
  const correctOption = options.find((o) => o.ku === exercise.correctAnswer);
  const showKurdishPrompt = direction === "to_arabic" && !!exercise.display;
  const answerText = mode === "target" ? exercise.correctAnswer : pickLocalized(correctOption ?? { ku: "", ar: "", en: "" }, language);
  const answerIsKurdish = mode === "target";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed", children: pickLocalized(exercise.prompt, language) }),
    showKurdishPrompt && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TriRow,
      {
        testId: "st-prompt",
        ku: exercise.display,
        audioText: exercise.display,
        audioLabel: " of the sentence",
        kuClassName: "text-lg font-black text-ink leading-snug"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5", children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionChip,
      {
        option,
        language,
        mode,
        selected: pending === option.ku,
        submitted,
        isCorrectOption: option.ku === exercise.correctAnswer,
        onSelect: (value) => {
          if (submitted) return;
          setPending(value);
          onCheck(value);
        }
      },
      option.ku
    )) }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultNote,
      {
        correct,
        answerText,
        answerIsKurdish,
        headline: correct ? isAr ? "صحيح!" : "Correct!" : isAr ? "خطأ" : "Incorrect",
        answerLabel: isAr ? "الإجابة الصحيحة هي:" : "Correct answer is:"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueButton, { onClick: onNext, label: isAr ? "متابعة" : "Continue" }) })
  ] });
}
function ListenChooseExercise({ exercise, checked, onCheck, onNext }) {
  const { language } = useAuth();
  const isAr = language === "ar";
  const [pending, setPending] = reactExports.useState(null);
  const submitted = checked !== null;
  const correct = checked === true;
  const options = exercise.options ?? [];
  const audioText = exercise.audioText ?? exercise.correctAnswer;
  const correctOption = options.find((o) => o.ku === exercise.correctAnswer);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed", children: pickLocalized(exercise.prompt, language) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      AudioButton,
      {
        textToSpeak: audioText,
        label: " of the word",
        iconClassName: "w-8 h-8",
        className: "p-4 min-w-[72px] min-h-[72px] scale-125",
        showProgress: false
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5", children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionChip,
      {
        option,
        language,
        mode: "target",
        selected: pending === option.ku,
        submitted,
        isCorrectOption: option.ku === exercise.correctAnswer,
        onSelect: (value) => {
          if (submitted) return;
          setPending(value);
          onCheck(value);
        }
      },
      option.ku
    )) }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultNote,
      {
        correct,
        answerText: exercise.correctAnswer,
        answerIsKurdish: true,
        headline: correct ? isAr ? "صحيح!" : "Correct!" : isAr ? "خطأ" : "Incorrect",
        answerLabel: isAr ? "الإجابة الصحيحة هي:" : "Correct answer is:"
      }
    ),
    submitted && correct && correctOption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[12px] font-bold text-muted", children: pickLocalized(correctOption, language) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueButton, { onClick: onNext, label: isAr ? "متابعة" : "Continue" }) })
  ] });
}
function CompleteSentenceExercise({ exercise, checked, onCheck, onNext }) {
  var _a;
  const { language } = useAuth();
  const isAr = language === "ar";
  const [pending, setPending] = reactExports.useState(null);
  const submitted = checked !== null;
  const correct = checked === true;
  const options = exercise.options ?? [];
  const audioText = ((_a = exercise.reference) == null ? void 0 : _a.ku) ?? exercise.display ?? exercise.correctAnswer;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed", children: pickLocalized(exercise.prompt, language) }),
    exercise.display && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TriRow,
      {
        testId: "cs-display",
        ku: exercise.display,
        audioText,
        audioLabel: " of the sentence",
        ar: exercise.reference ? pickLocalized(exercise.reference, language) : "",
        kuClassName: "text-lg font-black text-ink leading-snug"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5", children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionChip,
      {
        option,
        language,
        mode: "target",
        selected: pending === option.ku,
        submitted,
        isCorrectOption: option.ku === exercise.correctAnswer,
        onSelect: (value) => {
          if (submitted) return;
          setPending(value);
          onCheck(value);
        }
      },
      option.ku
    )) }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultNote,
      {
        correct,
        answerText: exercise.correctAnswer,
        answerIsKurdish: true,
        headline: correct ? isAr ? "صحيح!" : "Correct!" : isAr ? "خطأ" : "Incorrect",
        answerLabel: isAr ? "الإجابة الصحيحة هي:" : "Correct answer is:"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueButton, { onClick: onNext, label: isAr ? "متابعة" : "Continue" }) })
  ] });
}
function MatchPairsExercise({ exercise, checked, onCheck, onNext }) {
  const { language } = useAuth();
  const isAr = language === "ar";
  const pairs = exercise.pairs ?? [];
  const shuffledRight = reactExports.useMemo(
    () => grammarShuffle(pairs.map((p) => pickLocalized(p, language))),
    [pairs, language]
  );
  const [selectedLeft, setSelectedLeft] = reactExports.useState(null);
  const [assignedRight, setAssignedRight] = reactExports.useState({});
  const submitted = checked !== null;
  const correct = checked === true;
  const rights = shuffledRight;
  const ownedRight = (gloss) => Object.values(assignedRight).includes(gloss);
  const anyLeftMissing = pairs.some((_, li) => !(li in assignedRight));
  const rightIndexForGloss = (gloss) => pairs.findIndex((p) => pickLocalized(p, language) === gloss);
  function assignRight(gloss) {
    if (selectedLeft === null || submitted) return;
    const next = { ...assignedRight };
    for (const key of Object.keys(next)) {
      if (next[Number(key)] === gloss) delete next[Number(key)];
    }
    next[selectedLeft] = gloss;
    setAssignedRight(next);
    setSelectedLeft(null);
  }
  function handleCheck() {
    if (submitted) return;
    const ordered = pairs.map((_, li) => assignedRight[li] ?? "");
    onCheck(ordered.map((gloss) => rightIndexForGloss(gloss)));
  }
  const instruction = isAr ? "اضغط على الكلمة الكردية ثم على معناها" : language === "ku" ? "Li ser peyva kurdî û paşê wateya wê bitikîne" : "Tap a Kurdish word, then its meaning";
  const hintHeading = isAr ? "التطابق الصحيح:" : language === "ku" ? "Cotên rast:" : "Correct matches:";
  const previewPairs = pairs.map((p) => `${p.ku} → ${pickLocalized(p, language)}`).join(" · ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed", children: pickLocalized(exercise.prompt, language) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider", children: instruction }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pairs.map((p, li) => {
      const mine = assignedRight[li];
      const isSelected = selectedLeft === li;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TriRow,
        {
          testId: `mp-row-${li}`,
          audioText: p.ku,
          audioLabel: ` of ${p.ku}`,
          kuNode: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              dir: "ltr",
              disabled: submitted,
              onClick: () => setSelectedLeft(isSelected ? null : li),
              className: `min-w-0 w-full text-left py-2.5 px-3 rounded-xl border-2 font-black text-base min-h-[48px] break-words transition-all ${mine ? "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200" : isSelected ? "border-teal-500 bg-teal-50 dark:bg-teal-950/40" : "border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"} ${submitted ? "opacity-80" : "cursor-pointer hover:border-teal-400"}`,
              children: p.ku
            }
          ),
          rightNode: mine ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: "auto", className: "min-w-0 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 px-3 py-2 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-teal-800 dark:text-teal-300 break-words", children: mine }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: submitted,
                onClick: () => {
                  const next = { ...assignedRight };
                  delete next[li];
                  setAssignedRight(next);
                },
                className: "text-[11px] font-bold text-teal-600 dark:text-teal-400 underline shrink-0",
                children: isAr ? "إعادة" : language === "ku" ? "paşve" : "undo"
              }
            )
          ] }) : null
        }
      ) }, p.ku);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: "auto", className: "flex flex-wrap gap-1.5 justify-center", children: rights.map((gloss, i) => {
      if (ownedRight(gloss)) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          disabled: submitted,
          onClick: () => assignRight(gloss),
          className: "px-3 py-2 min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm shadow-xs hover:border-teal-400 active:scale-95 transition-all",
          children: gloss
        },
        i
      );
    }) }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultNote,
      {
        correct,
        answerText: previewPairs,
        answerIsKurdish: language === "ku",
        headline: correct ? isAr ? "صحيح!" : language === "ku" ? "Rast!" : "Correct!" : isAr ? "خطأ" : language === "ku" ? "Şaş" : "Incorrect",
        answerLabel: hintHeading
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: !submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckButton, { disabled: anyLeftMissing, onClick: handleCheck, label: isAr ? "تحقق" : language === "ku" ? "Kontrol bike" : "Check" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueButton, { onClick: onNext, label: isAr ? "متابعة" : language === "ku" ? "Bidomîne" : "Continue" }) })
  ] });
}
function WriteWordExercise({ exercise, checked, onCheck, onNext }) {
  const { language } = useAuth();
  const isAr = language === "ar";
  const [value, setValue] = reactExports.useState("");
  const submitted = checked !== null;
  const correct = checked === true;
  const audioText = exercise.audioText ?? exercise.correctAnswer;
  const reference = exercise.reference ? pickLocalized(exercise.reference, language) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed", children: pickLocalized(exercise.prompt, language) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TriRow,
      {
        testId: "ww-ref",
        ar: reference,
        audioText,
        audioLabel: " of the word",
        audioIconClassName: "w-7 h-7",
        audioClassName: "p-3.5 min-w-[64px] min-h-[64px]",
        arClassName: "text-[12px] font-bold text-muted leading-snug"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id: "grammar-write-input",
        type: "text",
        autoFocus: true,
        dir: "ltr",
        autoComplete: "off",
        autoCapitalize: "none",
        disabled: submitted,
        value,
        onChange: (e) => setValue(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            if (!submitted && value.trim()) onCheck(value);
            else if (submitted) onNext();
          }
        },
        placeholder: "…",
        className: `w-full p-5 rounded-3xl text-lg font-bold border-2 focus:outline-none transition-all duration-300 text-center shadow-xs ${submitted ? correct ? "bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-rose-50 border-rose-500 text-rose-800 dark:bg-rose-950 dark:text-rose-300" : "bg-white border-slate-200 focus:border-teal-500 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-white"}`
      }
    ),
    !submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(DiacriticKeys, { onInsert: (c) => setValue((prev) => prev + c) }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultNote,
      {
        correct,
        answerText: exercise.correctAnswer,
        answerIsKurdish: true,
        headline: correct ? isAr ? "صحيح!" : "Correct!" : isAr ? "خطأ" : "Incorrect",
        answerLabel: isAr ? "الإجابة الصحيحة هي:" : "Correct answer is:"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: !submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckButton, { disabled: !value.trim(), onClick: () => onCheck(value), label: isAr ? "تحقق" : "Check" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueButton, { onClick: onNext, label: isAr ? "متابعة" : "Continue" }) })
  ] });
}
function ArrangeSentenceExercise({ exercise, checked, onCheck, onNext }) {
  var _a;
  const { language } = useAuth();
  const isAr = language === "ar";
  const isKu = language === "ku";
  const canonical = exercise.sentenceWords ?? [];
  const pool = reactExports.useMemo(() => grammarShuffle(canonical), [canonical]);
  const [answer, setAnswer] = reactExports.useState([]);
  const submitted = checked !== null;
  const correct = checked === true;
  const fullAudio = ((_a = exercise.reference) == null ? void 0 : _a.ku) ?? canonical.join(" ");
  function inAnswer(word) {
    return answer.includes(word);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed", children: pickLocalized(exercise.prompt, language) }),
    exercise.reference && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TriRow,
      {
        testId: "as-ref",
        ar: pickLocalized(exercise.reference, language),
        audioText: fullAudio,
        audioLabel: " of the sentence",
        className: "bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-1",
        arClassName: "text-[12px] font-bold text-muted leading-snug"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        dir: "ltr",
        className: `min-h-[64px] w-full rounded-2xl border-2 border-dashed p-2.5 flex flex-wrap gap-1.5 items-center transition-colors ${submitted ? correct ? "border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30" : "border-rose-400 bg-rose-50/60 dark:bg-rose-950/30" : "border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40"}`,
        children: answer.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "auto", className: "text-slate-400 text-xs font-semibold px-2", children: isAr ? "اضغط الكلمات بالترتيب الصحيح" : isKu ? "Peyvan bi rêza rast bitikîne" : "Tap the words in order" }) : answer.map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            dir: "ltr",
            disabled: submitted,
            onClick: () => submitted ? void 0 : setAnswer((prev) => prev.filter((_, j) => j !== i)),
            className: "px-3 py-2 rounded-xl bg-teal-700 text-white font-bold text-sm shadow-xs transition-all active:scale-95",
            children: word
          },
          `${word}-${i}`
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: "ltr", className: "flex flex-wrap gap-1.5 justify-center", children: pool.map(
      (word, i) => inAnswer(word) ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          dir: "ltr",
          disabled: submitted,
          onClick: () => submitted ? void 0 : setAnswer((prev) => [...prev, word]),
          className: "px-3.5 py-2 min-h-[44px] rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-sm shadow-xs hover:border-teal-400 active:scale-95 transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100",
          children: word
        },
        `${word}-${i}`
      )
    ) }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultNote,
      {
        correct,
        answerText: canonical.join(" "),
        answerIsKurdish: true,
        headline: correct ? isAr ? "صحيح!" : isKu ? "Rast!" : "Correct!" : isAr ? "خطأ" : isKu ? "Şaş" : "Incorrect",
        answerLabel: isAr ? "الجملة الصحيحة:" : isKu ? "Hevoka rast:" : "Correct sentence:"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: !submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckButton,
      {
        disabled: answer.length !== canonical.length,
        onClick: () => onCheck(answer),
        label: isAr ? "تحقق" : isKu ? "Kontrol bike" : "Check"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueButton, { onClick: onNext, label: isAr ? "متابعة" : isKu ? "Bidomîne" : "Continue" }) })
  ] });
}
const ACCENT = SUBJECT_ACCENTS.grammar;
const EXERCISE_LABELS = {
  "select_translation": { en: "Choose the translation", ar: "اختر الترجمة", ku: "Wergerê hilbijêre" },
  "listen_choose": { en: "Listen & choose", ar: "اسمع واختر", ku: "Guhdarî bike û hilbijêre" },
  "complete_sentence": { en: "Complete the sentence", ar: "أكمل الجملة", ku: "Hevokê temam bike" },
  "match_pairs": { en: "Match pairs", ar: "طابِق الأزواج", ku: "Cotan bigihîne" },
  "write_word": { en: "Write the word", ar: "اكتب الكلمة", ku: "Peyvê binivîse" },
  "arrange_sentence": { en: "Arrange the sentence", ar: "رتّب الجملة", ku: "Hevokê sererast bike" }
};
const EXERCISE_ICONS = {
  languages: Languages,
  headphones: Headphones,
  pen: PenLine,
  "arrow-left-right": ArrowLeftRight,
  keyboard: Keyboard,
  "list-ordered": ListOrdered
};
function GrammarLessonPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { language } = useAuth();
  const isAr = language === "ar";
  const isKu = language === "ku";
  const lesson = lessonId ? getGrammarLesson(lessonId) : null;
  const engine = useGrammarLesson(lesson);
  const [stage, setStage] = reactExports.useState("concepts");
  const [conceptIndex, setConceptIndex] = reactExports.useState(0);
  const backLabel = isKu ? "Vegere" : isAr ? "رجوع" : "Back";
  if (!lesson) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[70dvh] flex flex-col items-center justify-center gap-4 p-4 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate("/grammar"),
          className: "flex items-center gap-1.5 text-sm font-black text-teal-600 dark:text-teal-400 hover:opacity-80 transition-opacity",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rtl:-scale-x-100" }),
            isKu ? "Rêziman" : isAr ? "النحو" : "Grammar"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white dark:bg-slate-900 border border-line-soft rounded-[32px] p-8 shadow-flat text-center space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black tracking-tight text-ink", children: isKu ? "Ders nehat dîtin" : isAr ? "الدرس غير موجود" : "Lesson not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-[12px] font-semibold", children: isKu ? "Ev mijar tune ye." : isAr ? "هذا الموضوع غير متوفر." : "That grammar topic does not exist." })
      ] })
    ] });
  }
  const concepts = lesson.concepts;
  const concept = concepts[conceptIndex];
  const conceptTotal = concepts.length;
  const exercise = engine.exercise;
  const showResults = stage === "exercises" && engine.phase === "finished";
  const exerciseLabel = exercise ? isAr ? EXERCISE_LABELS[exercise.type].ar : isKu ? EXERCISE_LABELS[exercise.type].ku : EXERCISE_LABELS[exercise.type].en : "";
  const ExerciseIcon = exercise ? EXERCISE_ICONS[exerciseIconKey(exercise.type)] : null;
  function renderExerciseBody() {
    if (!exercise) return null;
    const key = exercise.id;
    const checked = engine.checked;
    const onNext = engine.nextExercise;
    switch (exercise.type) {
      case "select_translation":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTranslationExercise, { exercise, checked, onCheck: (v) => void engine.checkAnswer({ kind: "choice", value: v }), onNext }, key);
      case "listen_choose":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ListenChooseExercise, { exercise, checked, onCheck: (v) => void engine.checkAnswer({ kind: "choice", value: v }), onNext }, key);
      case "complete_sentence":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CompleteSentenceExercise, { exercise, checked, onCheck: (v) => void engine.checkAnswer({ kind: "choice", value: v }), onNext }, key);
      case "match_pairs":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MatchPairsExercise, { exercise, checked, onCheck: (rightIndexes) => void engine.checkAnswer({ kind: "match", rightIndexes }), onNext }, key);
      case "write_word":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(WriteWordExercise, { exercise, checked, onCheck: (v) => void engine.checkAnswer({ kind: "text", value: v }), onNext }, key);
      case "arrange_sentence":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrangeSentenceExercise, { exercise, checked, onCheck: (words) => void engine.checkAnswer({ kind: "reorder", words }), onNext }, key);
      default:
        return null;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 pb-24 min-h-screen relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFB300]/10 dark:bg-[#FFB300]/5 rounded-full filter blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-5 w-60 h-60 bg-teal-200/15 dark:bg-teal-950/20 rounded-full filter blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto flex flex-col gap-4 min-h-[calc(100dvh-7rem)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate("/grammar"),
            className: "shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-line-soft shadow-xs hover:opacity-80 transition-opacity",
            "aria-label": backLabel,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rtl:-scale-x-100" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-black tracking-tight text-ink leading-snug truncate", children: isAr ? lesson.title.ar : isKu ? lesson.title.ku : lesson.title.en }),
          stage === "concepts" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all duration-300 [background:linear-gradient(90deg,#FFB300,#14b8a6)]",
                style: { width: `${Math.round(conceptIndex / Math.max(1, conceptTotal) * 100)}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-[10px] font-black text-muted", children: [
              conceptIndex + 1,
              "/",
              conceptTotal
            ] })
          ] }),
          stage === "exercises" && !showResults && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all duration-300 [background:linear-gradient(90deg,#FFB300,#14b8a6)]",
                style: { width: `${Math.round(engine.index / Math.max(1, engine.total) * 100)}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-[10px] font-black text-muted", children: [
              engine.index + 1,
              "/",
              engine.total
            ] })
          ] })
        ] })
      ] }),
      stage === "concepts" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1.5", "aria-hidden": "true", children: concepts.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setConceptIndex(i),
            "aria-label": `${isAr ? "مفهوم" : "Concept"} ${i + 1}`,
            className: `h-2 rounded-full transition-all duration-300 ${i === conceptIndex ? "w-6 bg-teal-500" : "w-2 bg-slate-200 dark:bg-slate-700"}`
          },
          c.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: concept && /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptCard, { concept, language }, concept.id) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          conceptIndex > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setConceptIndex((i) => Math.max(0, i - 1)),
              className: "flex-1 py-3.5 rounded-3xl font-black text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 border-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rtl:-scale-x-100" }),
                isAr ? "السابق" : isKu ? "Paş" : "Back"
              ]
            }
          ),
          conceptIndex < conceptTotal - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setConceptIndex((i) => Math.min(conceptTotal - 1, i + 1)),
              className: "flex-1 py-3.5 rounded-3xl font-black text-sm bg-teal-700 hover:bg-teal-800 active:scale-95 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none",
              children: [
                isAr ? "التالي" : isKu ? "Pêş" : "Next",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:-scale-x-100" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setStage("exercises"),
              className: "flex-1 py-3.5 rounded-3xl font-black text-sm bg-teal-700 hover:bg-teal-800 active:scale-95 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                isAr ? "ابدأ التمارين" : isKu ? "Dest bi temrînan bike" : "Start exercises"
              ]
            }
          )
        ] })
      ] }),
      stage === "exercises" && !showResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-max ${ACCENT.well} ${ACCENT.icon}`, children: [
            ExerciseIcon ? /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseIcon, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
            exerciseLabel
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-muted", children: [
            isAr ? "النقاط:" : "Score:",
            " ",
            engine.score
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white dark:bg-slate-900 rounded-[28px] p-5 shadow-flat border border-line-soft flex flex-col flex-1", children: renderExerciseBody() })
      ] }),
      showResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.94, y: 12 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { type: "spring", stiffness: 260, damping: 22 },
          className: "bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-flat border border-line-soft flex flex-col items-center text-center gap-4 relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 ${ACCENT.well}`, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: `w-9 h-9 ${ACCENT.icon}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black tracking-tight text-ink leading-snug", children: isKu ? "Pîroz be!" : isAr ? "أحسنت!" : "Lesson complete!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-[12px] font-semibold", children: isAr ? `أنهيتَ درس ${lesson.title.ar}.` : isKu ? `Te dersa ${lesson.title.ku} qedand.` : `You finished ${lesson.title.en}.` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 flex items-center justify-around", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-black text-ink", children: [
                  engine.score,
                  "/",
                  engine.total
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black text-muted uppercase tracking-wider", children: isAr ? "النقاط" : "Score" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-slate-200 dark:bg-slate-700", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-black text-[#D97706] dark:text-[#FFCE6B]", children: [
                  "+",
                  engine.earnedXp ?? 0
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black text-muted uppercase tracking-wider", children: "XP" })
              ] })
            ] }),
            lesson.summaryTable && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 text-start", dir: "auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-muted mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { className: "w-3.5 h-3.5" }),
                isAr ? "جدول مرجعي" : "Quick reference"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: lesson.summaryTable.rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-700/70 pb-1.5 last:border-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { dir: "ltr", className: "text-[12px] font-black text-ink", children: row.ku }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-muted", children: isAr ? row.ar : row.en })
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col w-full gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setConceptIndex(0);
                    setStage("concepts");
                  },
                  className: "w-full py-3.5 rounded-3xl font-black text-sm bg-teal-700 hover:bg-teal-800 active:scale-95 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                    isAr ? "مراجعة البطاقات" : isKu ? "Vegere kartan" : "Review cards"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate("/grammar"),
                  className: "w-full py-3.5 rounded-3xl font-black text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-200 dark:hover:bg-slate-700 border-none",
                  children: isKu ? "Vegere Rêzimanê" : isAr ? "العودة إلى النحو" : "Back to Grammar"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    engine.restart();
                    setStage("exercises");
                  },
                  className: "w-full py-3 rounded-3xl font-bold text-sm bg-transparent text-teal-600 dark:text-teal-400 flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-70 border-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                    isKu ? "Dîsa biceribîne" : isAr ? "إعادة المحاولة" : "Try again"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  GrammarLessonPage
};
