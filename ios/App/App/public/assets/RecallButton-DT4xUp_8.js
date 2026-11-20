import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useAuth, c as cn } from "./index-C4ml4lrv.js";
import { r as recordReview } from "./SpacedRepetitionService-DkhvYl5r.js";
import { w as Check, b3 as RotateCcw, b0 as Eye } from "./vendor-icons-UlZxPqC8.js";
function RecallButton({ wordId, className, size = "sm" }) {
  const { userData, updateUserData, language } = useAuth();
  const deck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
  const item = deck[wordId];
  const [flash, setFlash] = reactExports.useState(null);
  const flashTimerRef = reactExports.useRef(null);
  const persisted = item ? item.repetitions > 0 ? "knew" : "again" : null;
  const status = flash ?? persisted;
  reactExports.useEffect(() => () => {
    if (flashTimerRef.current !== null) clearTimeout(flashTimerRef.current);
  }, []);
  const handleGrade = (grade) => {
    const updated = recordReview(deck, wordId, grade);
    void updateUserData({ reviewDeck: updated });
    setFlash(grade === "good" ? "knew" : "again");
    if (flashTimerRef.current !== null) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = window.setTimeout(() => setFlash(null), 1600);
  };
  const isKu = language === "ku";
  const isAr = language === "ar";
  const knewLabel = isKu ? "Min zanîbû" : isAr ? "حفظتها" : "Knew it";
  const againLabel = isKu ? "Dîsa" : isAr ? "أعدها" : "Again";
  const getsAnEdge = size === "block";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 p-0.5", className),
      role: "group",
      "aria-label": isKu ? "Xwe-ceribandinê" : isAr ? "اختبر حفظك" : "Self-check",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleGrade("good"),
            "aria-pressed": status === "knew",
            "aria-label": `${knewLabel}${wordId ? ` — ${wordId}` : ""}`,
            className: cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1.5 min-h-[36px] text-[10px] font-black transition-colors cursor-pointer border-none focus-visible:ring-2 focus-visible:ring-emerald-500",
              status === "knew" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" : "text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: cn("w-3.5 h-3.5", status === "knew" && "fill-emerald-500 text-emerald-600 dark:text-emerald-400") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: knewLabel })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleGrade("again"),
            "aria-pressed": status === "again",
            "aria-label": `${againLabel}${wordId ? ` — ${wordId}` : ""}`,
            className: cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1.5 min-h-[36px] text-[10px] font-black transition-colors cursor-pointer border-none focus-visible:ring-2 focus-visible:ring-rose-500",
              status === "again" ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300" : "text-slate-500 dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-300"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: againLabel })
            ]
          }
        ),
        getsAnEdge && status === null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 ps-1 pe-2 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
          isKu ? "Xwe-ceribîne" : isAr ? "جرّب نفسك" : "Self-check"
        ] })
      ]
    }
  );
}
export {
  RecallButton as R
};
