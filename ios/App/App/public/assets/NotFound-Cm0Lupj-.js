import { j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth } from "./index-C4ml4lrv.js";
import { j as Compass, A as ArrowLeft, Y as House } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
function NotFound() {
  const navigate = useNavigate();
  const { language } = useAuth();
  const isEn = language !== "ar";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center text-center px-6 py-16 gap-5 min-h-[60vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-8 h-8" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-black text-slate-900 dark:text-white", children: isEn ? "This page does not exist" : "هذه الصفحة غير موجودة" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed", children: isEn ? "The link may be outdated, or the lesson was moved. Your progress is safe." : "قد يكون الرابط قديماً أو تم نقل الدرس. تقدمك محفوظ بأمان." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full max-w-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate(-1),
          className: "flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rtl:rotate-180" }),
            isEn ? "Go back" : "رجوع"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate("/"),
          className: "flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
            isEn ? "Home" : "الرئيسية"
          ]
        }
      )
    ] })
  ] });
}
export {
  NotFound
};
