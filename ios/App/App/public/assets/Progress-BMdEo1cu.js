import { j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { c as cn } from "./index-C4ml4lrv.js";
function Progress({ value, max = 100, label, size = "md", className, ...rest }) {
  const percent = Math.max(0, Math.min(100, value / max * 100));
  const heightClasses = {
    sm: "h-2.5",
    md: "h-4",
    lg: "h-6"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-1.5", className), ...rest, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-100", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "rounded-full bg-surface-2 border border-line overflow-hidden",
          heightClasses[size]
        ),
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": max,
        "aria-valuenow": value,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full bg-gradient-to-r from-[#FFC541] to-[#FFA000] transition-all duration-500",
            style: { width: `${percent}%` }
          }
        )
      }
    )
  ] });
}
export {
  Progress as P
};
