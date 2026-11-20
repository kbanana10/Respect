import { j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth } from "./index-C4ml4lrv.js";
import { bA as Landmark, a1 as MessageSquare, b1 as CircleQuestionMark, Q as TriangleAlert } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
function TermsOfService() {
  useNavigate();
  const { language } = useAuth();
  const labels = {
    en: {
      title: "Terms of Service",
      subtitle: "Last Updated: June 2026",
      desc: "By launching Kurdish Quest, you agree to comply with the rules of usage specified below. Please read carefully to understand user account limits and copyrights.",
      agreement: "1. Acceptance of Terms",
      agreementBody: "Our Kurdish syllabus and custom generated voice clips are provided purely for academic, language education, and non-commercial usage. Any massive scraping or automated bot requests will lead to absolute IP blacklisting.",
      gamified: "2. Gamification and Fair Play",
      gamifiedBody: "Experience Points (XP), levels, badges, and streaks are hosted variables. Any manipulation of local storage hashes or cheat techniques to gain ranks on the global scoreboard is highly discouraged.",
      monetization: "3. Subscriptions & Advertisements",
      monetizationBody: "All advertisements are powered by AdMob. Users must not utilize ad-blockers or software to hijack the normal flow of reward videos; doing so breaks the ecosystem that funds this community server.",
      liability: "4. Disclaimers of Accuracy",
      liabilityBody: "While we make absolute efforts to provide standard, high-accuracy Kurmanji translations paired with professional voice synthesis, dialect nuances can vary by city/region in Kurdistan. Use feedback forms for corrections.",
      contact: "Have Questions?",
      contactBody: "For corporate licensing, educational partnerships or syllabus error reports, write to support@kurdishquest.com",
      back: "Dashboard"
    },
    ar: {
      title: "شروط الخدمة",
      subtitle: "آخر تحديث: يونيو 2026",
      desc: "من خلال تشغيل تطبيق كويستر الكرمانجي، فإنك توافق على الالتزام بالقواعد البسيطة التالية. تفضل بقراءة البنود للحفاظ على سلامة بيئتنا التعليمية.",
      agreement: "١. استخدام المنهج والترجمة",
      agreementBody: "تقدم المواد الصوتية والترجمات المتوفرة فقط لصالح التعليم الفردي وتطوير مهارات الكلام. يُمنع منعاً باتاً استخراج المحتوى البرمجي آلياً بدون ترخيص رسمي.",
      gamified: "٢. النزاهة في لوحة المتصدرين",
      gamifiedBody: "تعتمد نقاط المنافسة (XP) ومستويات التقدم على النزاهة الأكاديمية. يُحظر تزييف بيانات المتصدرين للحفاظ على دقة المنافسة وصحتها.",
      monetization: "٣. الإعلانات والشراكات",
      monetizationBody: "تقدم الإعلانات بواسطة غوغل لتوفير تمويل ذاتي للفرقة الهندسية. تواجدك بالخدمة يعني قبولك بعرض الفيديوهات التعليمية المدعومة.",
      liability: "٤. حدود المسؤولية الأكاديمية",
      liabilityBody: "اللهجة الكرمانجية الكردية غنية بالتنوع المحلي الممتد بين ديار بكر وأربيل والقامشلي. قد تجد اختيارات طفيفة تختلف بحسب الإقليم؛ نرحب دائماً بملاحظاتك لتعديلها.",
      contact: "هل لديك سؤال؟",
      contactBody: "إذا كنت تريد ترخيص المنهج للمدارس أو المعاهد الحكومية، تفضل بمراسلتنا: support@kurdishquest.com",
      back: "الرئيسية"
    }
  }[language !== "ar" ? "en" : "ar"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 max-w-md mx-auto bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 text-slate-800 dark:text-slate-200 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-900 dark:text-slate-100", children: labels.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest", children: labels.subtitle })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100/40 dark:border-indigo-900/30 p-4 rounded-3xl mb-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "w-5 h-5 text-indigo-500 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: labels.desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.agreement })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.agreementBody })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.gamified })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.gamifiedBody })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.monetization })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.monetizationBody })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.liability })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.liabilityBody })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-slate-200 dark:border-slate-800/40 p-4 rounded-3xl space-y-1 text-start bg-slate-100 dark:bg-slate-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-slate-900 dark:text-slate-100", children: labels.contact }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.contactBody })
      ] })
    ] })
  ] });
}
export {
  TermsOfService
};
