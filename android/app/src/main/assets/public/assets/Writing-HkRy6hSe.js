import { j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth } from "./index-C4ml4lrv.js";
import { a as alphabet } from "./kurmanji-DANKPvwI.js";
import { S as SUBJECT_ACCENTS } from "./subjectAccents-Ctlc_nEP.js";
import { a2 as Pencil, l as Sparkles, a1 as MessageSquare, bi as NotebookPen, w as Check } from "./vendor-icons-UlZxPqC8.js";
import { m as motion } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
const ACCENT = SUBJECT_ACCENTS.writing;
function Writing() {
  const navigate = useNavigate();
  const { language, userData } = useAuth();
  const isAr = language === "ar";
  const isKu = language === "ku";
  const deck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
  const isWordLearned = (id) => {
    const item = deck[id];
    return !!item && item.repetitions > 0;
  };
  const titleText = isKu ? "Nivîsîn" : isAr ? "الكتابة" : "Writing";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col min-h-screen pb-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFB300]/10 dark:bg-[#FFB300]/5 rounded-full filter blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-5 w-60 h-60 bg-[#EDE9FE]/40 dark:bg-[#2E2447]/30 rounded-full filter blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-[32px] p-6 mb-6 relative overflow-hidden shadow-flat border border-line-soft group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -top-16 h-48 bg-[radial-gradient(circle_at_50%_0%,#FFB300_0%,transparent_65%)] opacity-[0.10] pointer-events-none", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "absolute right-0 bottom-0 opacity-[0.06] w-40 h-40 transform translate-y-8 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 text-slate-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 relative z-10 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-max ${ACCENT.well} ${ACCENT.icon}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          isKu ? "NIVÎSÎN" : isAr ? "الكتابة" : "WRITING"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black mt-2 leading-tight tracking-tight text-ink", children: titleText }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-[11px] leading-relaxed font-semibold", children: isKu ? "Tîpekê hilbijêre û bi tiliya xwe bikşîne." : isAr ? "اختر حرفاً وتتبّعه بإصبعك." : "Pick a letter and trace it with your finger." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.08, type: "spring", stiffness: 260, damping: 22 },
        "aria-disabled": "true",
        "aria-label": `${isKu ? "Peyv" : isAr ? "كلمات" : "Words"} — ${isKu ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon"}`,
        title: `${isKu ? "Peyv" : isAr ? "كلمات" : "Words"} — ${isKu ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon"}`,
        className: "w-full max-w-md mx-auto flex items-center gap-3 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-[26px] p-4 mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] opacity-70 pointer-events-none select-none relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2.5 end-2.5 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-[#8A6100] dark:text-[#FFCE6B] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs", children: isKu ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-slate-100 dark:bg-slate-800 opacity-70", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-6 h-6 text-slate-400 dark:text-slate-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0 text-start pe-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-extrabold text-slate-500 dark:text-slate-400 text-sm leading-snug", children: isKu ? "Peyv" : isAr ? "كلمات" : "Words" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] font-semibold text-slate-400 dark:text-slate-500 leading-snug", children: isKu ? "Peyvên kurt tîp bi tîp binivîse" : isAr ? "اكتب كلمات قصيرة حرفاً حرفاً" : "Trace short words letter by letter" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1, type: "spring", stiffness: 260, damping: 22 },
        "aria-disabled": "true",
        "aria-label": `${isKu ? "Hevok" : isAr ? "جُمل" : "Sentences"} — ${isKu ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon"}`,
        title: `${isKu ? "Hevok" : isAr ? "جُمل" : "Sentences"} — ${isKu ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon"}`,
        className: "w-full max-w-md mx-auto flex items-center gap-3 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-[26px] p-4 mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] opacity-70 pointer-events-none select-none relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2.5 end-2.5 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-[#8A6100] dark:text-[#FFCE6B] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs", children: isKu ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-slate-100 dark:bg-slate-800 opacity-70", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotebookPen, { className: "w-6 h-6 text-slate-400 dark:text-slate-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0 text-start pe-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-extrabold text-slate-500 dark:text-slate-400 text-sm leading-snug", children: isKu ? "Hevok" : isAr ? "جُمل" : "Sentences" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] font-semibold text-slate-400 dark:text-slate-500 leading-snug", children: isKu ? "Hevokên kurt peyv bi peyv binivîse" : isAr ? "اكتب جُملاً قصيرة كلمةً كلمة" : "Trace short sentences word by word" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black text-slate-400 uppercase tracking-widest", children: isKu ? "Tîp" : isAr ? "الحروف" : "Letters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase", children: isKu ? `${alphabet.length} Tîp` : isAr ? `${alphabet.length} حرف` : `${alphabet.length} Chars` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: alphabet.map((letter, index) => {
      const isLearned = isWordLearned(letter.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          whileTap: { scale: 0.92 },
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: index * 0.015, duration: 0.3 },
          onClick: () => navigate(`/writing/lesson/${letter.id}`),
          "aria-label": `${letter.char.split(" ")[0]}${isLearned ? isAr ? " — مكتوب" : " — written" : ""}`,
          className: `aspect-square rounded-2xl flex flex-col items-center justify-center font-black text-xl transition-all relative cursor-pointer select-none
                  ${isLearned ? "border-2 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300" : "bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#7C3AED]/40 hover:bg-[#EDE9FE]/30 shadow-[0_8px_30px_rgba(0,0,0,0.015)]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: letter.char.split(" ")[0] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold mt-1 tracking-wider uppercase scale-90 text-slate-400", children: letter.type === "vowel" ? isAr ? "حرف علة" : "vowel" : isAr ? "حرف ساكن" : "consonant" }),
            isLearned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -end-1.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500 text-white shadow-sm", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }) })
          ]
        },
        letter.id
      );
    }) }) })
  ] });
}
export {
  Writing
};
