import { j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth } from "./index-C4ml4lrv.js";
import { l as Sparkles, a1 as MessageSquare, bi as NotebookPen, A as ArrowLeft } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
const FEATURE_COPY = {
  words: { titleEn: "Word Writing", titleKu: "Nivîsîna Peyvan", titleAr: "كتابة الكلمات" },
  sentences: { titleEn: "Sentence Writing", titleKu: "Nivîsîna Hevokan", titleAr: "كتابة الجُمل" }
};
function WritingComingSoon({ feature }) {
  const navigate = useNavigate();
  const { language } = useAuth();
  const isAr = language === "ar";
  const isKu = language === "ku";
  const copy = FEATURE_COPY[feature];
  const title = isKu ? copy.titleKu : isAr ? copy.titleAr : copy.titleEn;
  const Icon = feature === "words" ? MessageSquare : NotebookPen;
  const badge = isKu ? "Di nêzîk de" : isAr ? "قريباً" : "Coming Soon";
  const body = isKu ? "Ev beş di pêşketinê de ye. Di nêzîk de vegere!" : isAr ? "هذا القسم قيد التطوير. عد قريباً!" : "This section is being prepared. Check back soon!";
  const backLabel = isKu ? "Vegere Nivîsînê" : isAr ? "العودة إلى الكتابة" : "Back to Writing";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[70dvh] flex items-center justify-center p-4 pb-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFB300]/10 dark:bg-[#FFB300]/5 rounded-full filter blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white dark:bg-slate-900 border border-line-soft rounded-[32px] p-8 shadow-flat flex flex-col items-center text-center gap-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -top-16 h-48 bg-[radial-gradient(circle_at_50%_0%,#FFB300_0%,transparent_65%)] opacity-[0.08] pointer-events-none", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-[#8A6100] dark:text-[#FFCE6B] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
        badge
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 bg-slate-100 dark:bg-slate-800 opacity-70", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-9 h-9 text-slate-400 dark:text-slate-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "relative z-10 text-xl font-black tracking-tight text-ink leading-snug", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative z-10 text-muted text-[12px] leading-relaxed font-semibold", children: [
        " ",
        body
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate("/writing"),
          "aria-label": backLabel,
          className: "relative z-10 inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 text-sm font-black tracking-tight rounded-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] border border-transparent shadow-[0_3px_0_#E69500,0_10px_20px_rgba(255,179,0,0.22)] transition-all duration-150 cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-1 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB300] focus-visible:ring-offset-2 dark:focus-visible:ring-[#FFBA38] dark:focus-visible:ring-offset-slate-900",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rtl:-scale-x-100", "aria-hidden": "true" }),
            backLabel
          ]
        }
      )
    ] })
  ] });
}
export {
  WritingComingSoon
};
