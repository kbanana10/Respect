import { j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth } from "./index-C4ml4lrv.js";
import { S as SUBJECT_ACCENTS } from "./subjectAccents-Ctlc_nEP.js";
import { G as GRAMMAR_LESSONS, l as lessonCompletionPercent, g as grammarLessonKey } from "./grammarScoring-DPrToKDM.js";
import { a3 as PenTool, l as Sparkles, o as Users, Z as Zap, b9 as Tag, ba as ListTree, bb as Link, K as CircleCheck, v as ChevronRight } from "./vendor-icons-UlZxPqC8.js";
import { m as motion } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
import "./answerUtils-WRjxYtEq.js";
const GRAMMAR_SUB_CATEGORIES = [
  {
    id: "pronouns",
    Icon: Users,
    en: "Pronouns",
    ar: "الضمائر",
    ku: "Cînavk",
    enDesc: "Personal & possessive pronouns",
    arDesc: "الضمائر الشخصية وضمائر الملكية",
    kuDesc: "Cînavkên kesane û xwedîtiyê"
  },
  {
    id: "verbs",
    Icon: Zap,
    en: "Verbs",
    ar: "الأفعال",
    ku: "Lêker",
    enDesc: "Verb tenses & conjugation",
    arDesc: "أزمنة الأفعال والتصريف",
    kuDesc: "Dema lêkeran û tewandin"
  },
  {
    id: "nouns",
    Icon: Tag,
    en: "Nouns",
    ar: "الأسماء",
    ku: "Navdêr",
    enDesc: "Gender, number & inflection",
    arDesc: "الجنس والعدد والتصريف",
    kuDesc: "Zayend, hejmar û tewandin"
  },
  {
    id: "sentence-structure",
    Icon: ListTree,
    en: "Sentence Structure",
    ar: "تركيب الجملة",
    ku: "Hevoksazî",
    enDesc: "Building sentences",
    arDesc: "بناء الجملة",
    kuDesc: "Avakirina hevokê"
  },
  {
    id: "prepositions",
    Icon: Link,
    en: "Prepositions",
    ar: "حروف الجر",
    ku: "Daçek",
    enDesc: "The key prepositions",
    arDesc: "حروف الجر الأساسية",
    kuDesc: "Daçekên sereke"
  }
];
const gramCount = GRAMMAR_SUB_CATEGORIES.length;
function subTitle(sub, lang) {
  if (lang === "ar") return sub.ar;
  return lang === "ku" ? sub.ku : sub.en;
}
function subDescription(sub, lang) {
  if (lang === "ar") return sub.arDesc;
  return lang === "ku" ? sub.kuDesc : sub.enDesc;
}
const ACCENT = SUBJECT_ACCENTS.grammar;
function Grammar() {
  const navigate = useNavigate();
  const { language, userData } = useAuth();
  const isAr = language === "ar";
  const isKu = language === "ku";
  const deck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
  const completed = (userData == null ? void 0 : userData.completedLessons) ?? [];
  const anyProgress = GRAMMAR_LESSONS.some((l) => lessonCompletionPercent(l, deck) > 0);
  const progressByTopic = /* @__PURE__ */ new Map();
  for (const lesson of GRAMMAR_LESSONS) {
    progressByTopic.set(lesson.topicId, {
      percent: lessonCompletionPercent(lesson, deck),
      done: completed.includes(grammarLessonKey(lesson.topicId))
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 min-h-screen pb-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFB300]/10 dark:bg-[#FFB300]/5 rounded-full filter blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-5 w-60 h-60 bg-teal-200/15 dark:bg-teal-950/20 rounded-full filter blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-flat border border-line-soft relative overflow-hidden group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "absolute right-0 bottom-0 opacity-[0.06] w-40 h-40 transform translate-y-8 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 text-slate-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 relative z-10 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-max ${ACCENT.well} ${ACCENT.icon}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          isKu ? "RÊZIMAN" : isAr ? "قواعد اللغة" : "GRAMMAR"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black mt-2 leading-tight tracking-tight text-ink", children: isKu ? "Rêziman" : isAr ? "النحو" : "Grammar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-[11px] leading-relaxed font-semibold", children: isKu ? "Bingehên rêzimanê: cînavk, lêker, navdêr, hevoksazî û daçek." : isAr ? "أساسيات القواعد: الضمائر، الأفعال، الأسماء، تركيب الجملة وحروف الجر." : "Grammar basics — pronouns, verbs, nouns, sentence structure and prepositions." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto", children: GRAMMAR_SUB_CATEGORIES.map((sub, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        "aria-label": `${subTitle(sub, language)} — ${subDescription(sub, language)}`,
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.05, type: "spring", stiffness: 260, damping: 22 },
        whileHover: { y: -3 },
        whileTap: { scale: 0.96 },
        onClick: () => navigate(`/grammar/${sub.id}`),
        className: "bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800/80 rounded-[26px] p-5 flex flex-col items-center justify-center gap-3 hover:shadow-[0_10px_30px_rgba(30,41,59,0.07)] hover:scale-[1.015] transition-all active:scale-95 cursor-pointer relative overflow-hidden min-h-[150px] shadow-[0_8px_30px_rgba(0,0,0,0.025)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${ACCENT.well}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(sub.Icon, { className: `w-6 h-6 ${ACCENT.icon}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-slate-800 dark:text-slate-200 text-sm leading-snug", children: subTitle(sub, language) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold mt-1 leading-snug text-muted", children: subDescription(sub, language) })
          ] }),
          (() => {
            const info = progressByTopic.get(sub.id) ?? { percent: 0, done: false };
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full transition-all duration-500 ${ACCENT.barFill}`, style: { width: `${info.percent}%` } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-black text-muted uppercase tracking-wider", children: [
                  info.percent,
                  "%"
                ] }),
                info.done && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: isKu ? "Qediya" : isAr ? "مكتمل" : "Done" })
                ] })
              ] })
            ] });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-[#8A6100] dark:text-[#FFCE6B] flex items-center gap-1 mt-0.5", children: [
            isKu ? "Veke" : isAr ? "افتح" : "Open",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 rtl:-scale-x-100" })
          ] })
        ]
      },
      sub.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-4xl mx-auto text-center text-[10px] text-slate-400 dark:text-slate-500 font-semibold flex items-center justify-center gap-1", "aria-live": "polite", children: [
      isKu ? `${gramCount} mijar — veke û dest bi fêrbûnê bike` : isAr ? `${gramCount} مواضيع — افتح وابدأ التعلّم` : `${gramCount} topics — open one to start learning`,
      anyProgress && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-500 font-black", children: isKu ? "· pêşketin hatiye tomarkirin" : isAr ? "· تم تسجيل التقدم" : "· progress saved" })
    ] })
  ] });
}
export {
  Grammar
};
