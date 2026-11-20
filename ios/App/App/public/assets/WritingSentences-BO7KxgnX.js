import { j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth } from "./index-C4ml4lrv.js";
import { W as WRITING_SENTENCES } from "./writingSentences-e0j8USzu.js";
import { S as SUBJECT_ACCENTS } from "./subjectAccents-Ctlc_nEP.js";
import { bi as NotebookPen, l as Sparkles, bm as MessageSquareText, w as Check } from "./vendor-icons-UlZxPqC8.js";
import { m as motion } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
const ACCENT = SUBJECT_ACCENTS.writing;
function WritingSentences() {
  const navigate = useNavigate();
  const { language, userData } = useAuth();
  const isAr = language === "ar";
  const isKu = language === "ku";
  const deck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
  const isLearned = (id) => {
    const item = deck[id];
    return !!item && item.repetitions > 0;
  };
  const learnedCount = WRITING_SENTENCES.filter((s) => isLearned(s.id)).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col min-h-screen pb-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFB300]/10 dark:bg-[#FFB300]/5 rounded-full filter blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-[32px] p-6 mb-6 relative overflow-hidden shadow-flat border border-line-soft group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -top-16 h-48 bg-[radial-gradient(circle_at_50%_0%,#FFB300_0%,transparent_65%)] opacity-[0.10] pointer-events-none", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NotebookPen, { className: "absolute right-0 bottom-0 opacity-[0.06] w-40 h-40 transform translate-y-8 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 text-slate-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 relative z-10 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-max ${ACCENT.well} ${ACCENT.icon}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          isKu ? "HEVOK" : isAr ? "جُمَل" : "SENTENCES"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black mt-2 leading-tight tracking-tight text-ink", children: isKu ? "Hevok" : isAr ? "جُمَل" : "Sentences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-[11px] leading-relaxed font-semibold", children: isKu ? "Hevoka temam bikişîne — her peyv ji bo xwe tê kontrolkirin." : isAr ? "اكتب الجملة كاملة — تُفحص كل كلمة على حدة." : "Trace the whole sentence — every word is checked on its own." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black text-slate-400 uppercase tracking-widest", children: isKu ? `${WRITING_SENTENCES.length} Hevok` : isAr ? `${WRITING_SENTENCES.length} جُمل` : `${WRITING_SENTENCES.length} Sentences` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase", children: isKu ? `${learnedCount} hîn bûye` : isAr ? `${learnedCount} مكتوبة` : `${learnedCount} learned` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4 space-y-2", children: WRITING_SENTENCES.map((sentence, index) => {
      const done = isLearned(sentence.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          whileTap: { scale: 0.98 },
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: index * 0.04, duration: 0.3 },
          onClick: () => navigate(`/writing/sentences/${sentence.id}`),
          "aria-label": `${sentence.ku} — ${isAr ? sentence.ar : sentence.en}${done ? isAr ? "، مكتوبة" : ", written" : ""}`,
          className: `w-full flex items-center gap-3 rounded-2xl p-3.5 transition-all relative cursor-pointer select-none text-start min-h-[56px]
                ${done ? "border-2 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/50" : "bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 hover:border-[#7C3AED]/40 hover:bg-[#EDE9FE]/30 shadow-[0_8px_30px_rgba(0,0,0,0.015)]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${ACCENT.well}`, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareText, { className: `w-5 h-5 ${ACCENT.icon}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block font-black text-base leading-snug ${done ? "text-emerald-700 dark:text-emerald-300" : "text-slate-800 dark:text-slate-200"}`, dir: "ltr", children: sentence.ku }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block text-[11px] font-semibold leading-snug ${done ? "text-emerald-600/80 dark:text-emerald-400/80" : "text-muted"}`, children: isAr ? sentence.ar : sentence.en })
            ] }),
            done && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white shadow-sm shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) })
          ]
        },
        sentence.id
      );
    }) })
  ] });
}
export {
  WritingSentences
};
