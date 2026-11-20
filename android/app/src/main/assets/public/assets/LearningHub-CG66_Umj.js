import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth, a as academicVocabulary } from "./index-C4ml4lrv.js";
import { a as alphabet, s as sentences, v as vocabulary } from "./kurmanji-DANKPvwI.js";
import { S as SUBJECT_ACCENTS } from "./subjectAccents-Ctlc_nEP.js";
import { _ as BookA, $ as Binary, a0 as Palette, p as BookOpen, a1 as MessageSquare, a2 as Pencil, a3 as PenTool, V as Volume2, G as GraduationCap, Z as Zap, v as ChevronRight, a4 as CornerDownRight } from "./vendor-icons-UlZxPqC8.js";
import { m as motion } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
const HUB_CARDS = [
  { id: "letters", Icon: BookA, available: true, path: "/alphabet" },
  { id: "numbers", Icon: Binary, available: true, path: "/vocabulary/numbers" },
  { id: "colors", Icon: Palette, available: true, path: "/vocabulary/colors" },
  { id: "vocabulary", Icon: BookOpen, available: true, path: "/vocabulary" },
  { id: "phrases", Icon: MessageSquare, available: true, path: "/sentences" },
  { id: "writing", Icon: Pencil, available: true, path: "/writing" },
  { id: "grammar", Icon: PenTool, available: true, path: "/grammar" },
  { id: "pronunciation", Icon: Volume2, available: false, path: "" }
];
const AR_NAMES = {
  letters: "الأحرف",
  numbers: "الأرقام",
  colors: "الألوان",
  vocabulary: "المفردات",
  phrases: "العبارات",
  pronunciation: "النطق",
  grammar: "النحو",
  writing: "الكتابة"
};
const EN_KU_NAMES = {
  letters: { en: "Letters", ku: "Tîp" },
  numbers: { en: "Numbers", ku: "Jimar" },
  colors: { en: "Colors", ku: "Reng" },
  vocabulary: { en: "Vocabulary", ku: "Peyv" },
  phrases: { en: "Phrases", ku: "Hevok" },
  pronunciation: { en: "Pronunciation", ku: "Bilêvkirin" },
  grammar: { en: "Grammar", ku: "Rêziman" },
  writing: { en: "Writing", ku: "Nivîsîn" }
};
const EN_KU_DESCS = {
  letters: { en: "The Hawar alphabet", ku: "Alfabeya Hawar" },
  numbers: { en: "Zero to millions", ku: "Ji sifir heta milyonan" },
  colors: { en: "Colors of the world", ku: "Rengên cîhanê" },
  vocabulary: { en: "Everyday & academic words", ku: "Peyvên rojane" },
  phrases: { en: "Phrases & dialogues", ku: "Hevok û diyalog" },
  pronunciation: { en: "Speaking practice", ku: "Piraniya axaftinê" },
  grammar: { en: "Grammar basics", ku: "Bingehên rêzimanê" },
  writing: { en: "Learning to write letters", ku: "Hînî nivîsîna tîpan" }
};
const AR_DESCS = {
  letters: "الحروف الكردية",
  numbers: "من صفر حتى الملايين",
  colors: "ألوان العالم",
  vocabulary: "كلمات يومية وأكاديمية",
  phrases: "جمل ومحادثات",
  pronunciation: "التدرب على النطق",
  grammar: "أساسيات القواعد",
  writing: "تعلّم كتابة الحروف"
};
function title(id, lang) {
  if (lang === "ar") return AR_NAMES[id];
  return lang === "ku" ? EN_KU_NAMES[id].ku : EN_KU_NAMES[id].en;
}
function description(id, lang) {
  if (lang === "ar") return AR_DESCS[id];
  return lang === "ku" ? EN_KU_DESCS[id].ku : EN_KU_DESCS[id].en;
}
const CONTENT_IDS = {
  letters: alphabet.map((l) => l.id),
  numbers: vocabulary.filter((w) => w.categoryId === "numbers").map((w) => w.id),
  colors: vocabulary.filter((w) => w.categoryId === "colors").map((w) => w.id),
  vocabulary: [...vocabulary, ...academicVocabulary].map((w) => w.id),
  phrases: sentences.map((s) => s.id),
  writing: alphabet.map((l) => l.id)
};
function computeProgress(reviewDeck) {
  const deck = reviewDeck ?? {};
  return {
    letters: progressFor("letters", deck),
    numbers: progressFor("numbers", deck),
    colors: progressFor("colors", deck),
    vocabulary: progressFor("vocabulary", deck),
    phrases: progressFor("phrases", deck),
    pronunciation: { done: 0, total: 0 },
    grammar: { done: 0, total: 0 },
    writing: progressFor("writing", deck)
  };
}
function progressFor(subject, deck) {
  const ids = CONTENT_IDS[subject];
  const done = ids.filter((id) => id in deck).length;
  return { done, total: ids.length };
}
function totalReviewed(progress) {
  return SUBJECT_ORDER.reduce((sum, subject) => {
    var _a;
    return sum + (((_a = progress[subject]) == null ? void 0 : _a.done) ?? 0);
  }, 0);
}
const SUBJECT_ORDER = ["letters", "numbers", "colors", "vocabulary", "phrases", "writing", "grammar", "pronunciation"];
function LearningHub() {
  const navigate = useNavigate();
  const { language, userData } = useAuth();
  const isAr = language === "ar";
  const progress = reactExports.useMemo(() => computeProgress(userData == null ? void 0 : userData.reviewDeck), [userData == null ? void 0 : userData.reviewDeck]);
  const lastVisitedId = reactExports.useMemo(() => {
    for (const subject of SUBJECT_ORDER) {
      if (subject === "pronunciation") continue;
      if (progress[subject].done > 0) return subject;
    }
    return null;
  }, [progress]);
  const suggestedId = reactExports.useMemo(() => {
    if (!lastVisitedId) return "letters";
    const idx = SUBJECT_ORDER.indexOf(lastVisitedId);
    return SUBJECT_ORDER[(idx + 1) % SUBJECT_ORDER.length];
  }, [lastVisitedId]);
  const continueCard = lastVisitedId ? HUB_CARDS.find((c) => c.id === lastVisitedId) : null;
  const suggestedCard = HUB_CARDS.find((c) => c.id === suggestedId);
  const todayUtc = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const xpToday = (userData == null ? void 0 : userData.xpTodayDate) === todayUtc ? (userData == null ? void 0 : userData.xpToday) ?? 0 : 0;
  const dailyGoalTarget = (userData == null ? void 0 : userData.dailyGoalXp) ?? 0;
  const goalPercent = dailyGoalTarget > 0 ? Math.min(100, Math.round(xpToday / dailyGoalTarget * 100)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-8 space-y-5 min-h-screen pb-24 lg:pb-12 max-w-5xl mx-auto relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-flat border border-line-soft dark:border-slate-800 relative overflow-hidden group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "absolute end-2 bottom-0 opacity-[0.05] w-36 h-36 transform translate-y-6 select-none pointer-events-none text-slate-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 relative z-10 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#8A6100] dark:text-[#FFCE6B] font-extrabold", children: language === "ku" ? "Navenda Fêrbûnê" : isAr ? "مركز التعلّم" : "Learning Hub" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl lg:text-3xl font-black leading-tight tracking-tight text-ink", children: language === "ku" ? "Fêrbûn" : isAr ? "التعلّم" : "Learning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-sm leading-relaxed font-medium max-w-2xl", children: language === "ku" ? "Cihê te yê fêrbûnê: tîp, jimar, reng û peyv — hemû di yek derî de." : isAr ? "كل ما تحتاجه للتعلّم في مكان واحد: الأحرف، الأرقام، الألوان والمفردات." : "Everything you need to learn — letters, numbers, colors and words — in one place." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-full bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl px-5 py-4 shadow-flat",
        role: "progressbar",
        "aria-label": language === "ku" ? "XP îro" : isAr ? "نقاط الخبرة اليوم" : "XP today",
        "aria-valuemin": 0,
        "aria-valuemax": dailyGoalTarget > 0 ? dailyGoalTarget : 100,
        "aria-valuenow": xpToday,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-xl bg-[#FFF3D6] dark:bg-[#3A2F14] flex items-center justify-center shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-[#B8860B] dark:text-[#FFCE6B] fill-[#FFB300]/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 lg:min-w-[150px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-muted leading-none", children: language === "ku" ? "XP îro" : isAr ? "نقاط الخبرة اليوم" : "XP today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-ink leading-none tabular-nums", dir: "ltr", children: xpToday }),
              dailyGoalTarget > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-muted tabular-nums", dir: "ltr", children: [
                "/ ",
                dailyGoalTarget
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", "aria-hidden": "true", children: dailyGoalTarget > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full rounded-full transition-all duration-500 ${goalPercent >= 100 ? "bg-emerald-500" : "bg-[#FFB300]"}`,
                style: { width: `${goalPercent}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-end text-xs font-bold text-muted tabular-nums", dir: "ltr", children: [
              goalPercent,
              "%"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-end text-xs font-bold text-muted", children: language === "ku" ? "Rojane xwe bixebitîne" : isAr ? "تدرّب يومياً" : "Keep learning daily" }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      continueCard && suggestedCard && continueCard.id !== "pronunciation" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate(continueCard.path),
            className: "bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer min-h-[52px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${SUBJECT_ACCENTS[continueCard.id].well}`, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(continueCard.Icon, { className: `w-4 h-4 ${SUBJECT_ACCENTS[continueCard.id].icon}` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-muted leading-none", children: language === "ku" ? "Bidomîne" : isAr ? "واصل" : "Continue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-black text-ink truncate mt-1", children: title(continueCard.id, language) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate(suggestedCard.path),
            className: "bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer min-h-[52px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${SUBJECT_ACCENTS[suggestedCard.id].well}`, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(suggestedCard.Icon, { className: `w-4 h-4 ${SUBJECT_ACCENTS[suggestedCard.id].icon}` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-muted leading-none", children: language === "ku" ? "Ya bê" : isAr ? "التالي" : "Next up" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-black text-ink truncate mt-1", children: title(suggestedCard.id, language) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 shrink-0 ms-auto text-muted rtl:-scale-x-100", "aria-hidden": "true" })
            ]
          }
        )
      ] }),
      !continueCard && suggestedCard && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate(suggestedCard.path),
          className: "col-span-2 bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer min-h-[52px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${SUBJECT_ACCENTS[suggestedCard.id].well}`, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(suggestedCard.Icon, { className: `w-4 h-4 ${SUBJECT_ACCENTS[suggestedCard.id].icon}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-muted leading-none", children: language === "ku" ? "Bi dest pê bike" : isAr ? "ابدأ من هنا" : "Start here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-black text-ink truncate mt-1", children: title(suggestedCard.id, language) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 shrink-0 ms-auto text-muted rtl:-scale-x-100", "aria-hidden": "true" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5", children: HUB_CARDS.map((card, index) => {
      const accent = SUBJECT_ACCENTS[card.id];
      const prog = progress[card.id];
      const pct = prog.total > 0 ? Math.min(100, Math.round(prog.done / prog.total * 100)) : 0;
      const isLocked = !card.available;
      const progressSummary = `${totalReviewed(progress)} ${language === "ku" ? "peyv hîn bûne" : isAr ? "كلمة تم تعلّمها" : "words learned"}`;
      if (isLocked) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "aria-disabled": "true",
            "aria-label": `${title(card.id, language)} — ${language === "ku" ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon"}`,
            title: `${title(card.id, language)} — ${language === "ku" ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon"}`,
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: index * 0.05, type: "spring", stiffness: 260, damping: 22 },
            className: "bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-[26px] p-5 flex flex-col items-center justify-center gap-3 text-center shadow-xs relative overflow-hidden select-none min-h-[150px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2.5 end-2.5 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-[#8A6100] dark:text-[#FFCE6B] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language === "ku" ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-slate-100 dark:bg-slate-800 opacity-70", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.Icon, { className: "w-6 h-6 text-slate-400 dark:text-slate-500" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-slate-800 dark:text-slate-200 text-sm leading-snug", children: title(card.id, language) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold mt-1 leading-snug text-slate-500 dark:text-slate-400", children: language === "ku" ? "Nêzîk e — di pêşketinê de ye" : isAr ? "قيد التطوير" : "Under development" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: language === "ku" ? "Ev beş hîn amade nîne." : isAr ? "هذا القسم غير متاح بعد." : "This section is not available yet." })
            ]
          },
          card.id
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          "aria-label": `${title(card.id, language)} — ${progressSummary}`,
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: index * 0.05, type: "spring", stiffness: 260, damping: 22 },
          whileHover: { y: -3 },
          whileTap: { scale: 0.96 },
          onClick: () => navigate(card.path),
          className: "bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800/80 rounded-[26px] p-5 flex flex-col items-center justify-center gap-3 hover:shadow-[0_10px_30px_rgba(30,41,59,0.07)] hover:scale-[1.015] transition-all active:scale-95 cursor-pointer relative overflow-hidden min-h-[150px] shadow-[0_8px_30px_rgba(0,0,0,0.025)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${accent.well}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.Icon, { className: `w-6 h-6 ${accent.icon}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-slate-800 dark:text-slate-200 text-sm leading-snug", children: title(card.id, language) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold mt-1 leading-snug text-muted", children: description(card.id, language) })
            ] }),
            prog.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full transition-all duration-500 ${accent.barFill}`, style: { width: `${pct}%` } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1.5", "data-testid": `progress-${card.id}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-black text-muted uppercase tracking-wider", children: [
                  prog.done,
                  "/",
                  prog.total
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-black text-muted", children: [
                  pct,
                  "%"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-[#8A6100] dark:text-[#FFCE6B] flex items-center gap-1 mt-0.5", children: [
              language === "ku" ? "Veke" : isAr ? "افتح" : "Open",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 rtl:-scale-x-100" })
            ] })
          ]
        },
        card.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-md mx-auto text-center text-[10px] text-slate-400 dark:text-slate-500 font-semibold flex items-center justify-center gap-1", "aria-live": "polite", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CornerDownRight, { className: "w-3 h-3" }),
      language === "ku" ? `Her mijar gavek e li ser rêya te — ${totalReviewed(progress)} peyv di dest de vekolîne` : isAr ? `كل موضوع هو خطوة على مسارك — ${totalReviewed(progress)} كلمة تعلّمتها حتى الآن` : `Each topic is one step along your path — ${totalReviewed(progress)} words reviewed so far`
    ] })
  ] });
}
export {
  LearningHub
};
