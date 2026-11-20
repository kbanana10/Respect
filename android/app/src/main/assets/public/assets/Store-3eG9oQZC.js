import { r as reactExports, R as React, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useAuth, t } from "./index-C4ml4lrv.js";
import { bx as Snowflake, z as Megaphone, Z as Zap, w as Check } from "./vendor-icons-UlZxPqC8.js";
import { m as motion } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-router-m5cA7LJQ.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
const GEM_PACKS = [
  { id: "small", gems: 100, emoji: "💰", price: "$1.99", best: false },
  { id: "medium", gems: 500, emoji: "🎁", price: "$6.99", best: true },
  { id: "large", gems: 1200, emoji: "🏆", price: "$12.99", best: false }
];
const FREEZE_COST = 200;
function Store() {
  const { userData, updateUserData, language } = useAuth();
  const gems = (userData == null ? void 0 : userData.gems) ?? 0;
  const freezes = (userData == null ? void 0 : userData.streakFreezes) ?? 0;
  const [toast, setToast] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const toastTimerRef = React.useRef(null);
  const showToast = React.useCallback((msg) => {
    setToast(msg);
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      toastTimerRef.current = null;
      setToast(null);
    }, 2500);
  }, []);
  React.useEffect(() => () => {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
  }, []);
  const packName = (id) => id === "small" ? t(language, "store_pack_small") : id === "medium" ? t(language, "store_pack_medium") : t(language, "store_pack_large");
  const buyFreeze = async () => {
    if (busy) return;
    if (gems < FREEZE_COST) {
      showToast(t(language, "store_not_enough"));
      return;
    }
    setBusy(true);
    try {
      await updateUserData({ gems: gems - FREEZE_COST, streakFreezes: freezes + 1 });
      showToast(t(language, "store_freeze_bought"));
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-8 pb-28 max-w-3xl mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-line-soft rounded-3xl p-5 shadow-flat relative overflow-hidden flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_80%_30%,#00B0FF_0%,transparent_55%)] pointer-events-none", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-extrabold text-muted uppercase tracking-widest", children: t(language, "store_balance") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl select-none", "aria-hidden": "true", children: "💎" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black text-ink", children: gems })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-extrabold text-muted uppercase tracking-widest", children: t(language, "store_freeze_title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-5 h-5 text-sky-500", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black text-ink", children: freezes })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#FFF6E0] dark:bg-[#3A2F14] border border-[#FFB300]/40 rounded-2xl px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-full bg-[#FFB300]/20 flex items-center justify-center shrink-0 text-[#B8860B] dark:text-[#FFCE6B]", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-extrabold text-[#8A6100] dark:text-[#FFCE6B] leading-relaxed", children: t(language, "store_preview_banner") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black text-ink px-1 uppercase tracking-wider", children: t(language, "store_gem_packs") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: GEM_PACKS.map((pack, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.06 },
          className: `bg-white dark:bg-slate-900 rounded-3xl p-4 pt-5 flex flex-col items-center text-center gap-1.5 shadow-flat relative ${pack.best ? "border-2 border-[#FFB300]" : "border border-line-soft"}`,
          children: [
            pack.best && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2.5 inset-x-0 mx-auto w-max bg-[#FFB300] text-[#432C00] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full", children: t(language, "store_best_value") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl select-none", "aria-hidden": "true", children: pack.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-ink leading-tight", children: packName(pack.id) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-[#00B0FF]", children: [
              "💎 ",
              pack.gems
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-subtle line-through", children: pack.price }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full mt-1 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wide", children: t(language, "store_coming_soon") })
          ]
        },
        pack.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black text-ink px-1 uppercase tracking-wider", children: t(language, "store_powerups") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-line-soft rounded-3xl p-4 shadow-flat flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-black text-ink flex items-center gap-2", children: [
            t(language, "store_freeze_title"),
            " ❄️",
            freezes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full", children: [
              freezes,
              " ",
              t(language, "store_owned")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted font-semibold mt-0.5 leading-relaxed", children: t(language, "store_freeze_desc") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: buyFreeze,
            disabled: busy,
            className: `shrink-0 min-h-[44px] px-4 rounded-full font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${gems >= FREEZE_COST ? "bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] shadow-[0_3px_0_#E69500]" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"}`,
            children: [
              t(language, "store_buy"),
              " · 💎",
              FREEZE_COST
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-line-soft rounded-3xl p-4 shadow-flat flex items-center gap-4 opacity-80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-black text-ink", children: [
            t(language, "store_boost_title"),
            " ⚡"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted font-semibold mt-0.5 leading-relaxed", children: t(language, "store_boost_desc") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 px-3.5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wide", children: t(language, "store_coming_soon") })
      ] })
    ] }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        className: "fixed bottom-24 inset-x-4 max-w-md mx-auto bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-700 rounded-2xl px-4 py-3 shadow-[0_18px_44px_rgba(30,41,59,0.18)] flex items-center gap-2.5 z-50",
        role: "status",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-500 shrink-0", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-ink", children: toast })
        ]
      }
    )
  ] });
}
export {
  Store
};
