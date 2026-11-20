import { j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth } from "./index-C4ml4lrv.js";
import { bn as Shield, aK as Lock, b0 as Eye, bK as CircleCheckBig } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
function PrivacyPolicy() {
  useNavigate();
  const { language } = useAuth();
  const labels = {
    en: {
      title: "Privacy Policy",
      subtitle: "Last Updated: June 2026",
      desc: "Your privacy is of paramount importance to us. This document outlines the types of personal information we collect, record, and how we protect it in compliance with GPDR/COPPA guidelines.",
      collect: "1. Information We Collect",
      collectBody: "When registering or signing in through Google, we process your email address, display name, and profile photos solely to manage scores and global learning standings. Offline performance data remains strictly inside your local device cache.",
      cookies: "2. AdMob & Analytics Tracking",
      cookiesBody: "We utilize Google AdMob services to serve light, context-aware student ads. Google may use advertising identifiers to serve personalized ads based on interests while respecting COPPA restrictions.",
      retention: "3. Retention & Data Erasure",
      retentionBody: "Your gamified learning checkpoints (XP, level milestones, streaks) are stored in secure sandboxed systems. You may request absolute removal of your data at any time by contacting our support desk or deleting your profile.",
      safe: "4. Child Safety Compliance",
      safeBody: "We do not intentionally target minors under age 13 with tracking. All children's features are designed with safe parameters keeping content clean, authentic, and scholastic.",
      contact: "Have Questions?",
      contactBody: "For privacy questions, access queries or absolute account wipes, coordinate with legal@kurdishquest.com",
      back: "Dashboard"
    },
    ar: {
      title: "سياسة الخصوصية",
      subtitle: "آخر تحديث: يونيو 2026",
      desc: "خصوصيتك ذات أهمية بالغة لدينا. توضح هذه الوثيقة أنواع البيانات الشخصية التي نقوم بجمعها، معالجتها، وحمايتها تماشياً مع معايير اللائحة العامة لحماية البيانات (GDPR).",
      collect: "١. البيانات التي نجمعها",
      collectBody: "عند تسجيل الدخول بواسطة غوغل، نقوم فقط بحفظ اسمك وصورتك الشخصية والبريد الإلكتروني لتشغيل لوحة الصدارة وحفظ نقاط الخبرة (XP). بينما تبقى نتائج التعلم الأخرى محفوظة محلياً على جهازك.",
      cookies: "٢. شراكة الإعلانات AdMob",
      cookiesBody: "نحن نستخدم خدمات Google AdMob لعرض الإعلانات المدرسية القصيرة. قد تستخدم غوغل معرفات الهواتف لدعم الإعلانات المخصصة والمحتوى التعليمي.",
      retention: "٣. حقوق مسح البيانات",
      retentionBody: "يتم تخزين تقدمك التعليمي وسجل مشاركاتك بشكل آمن. يمكنك طلب حذف حسابك وبياناتك فوراً عن طريق التواصل بمركز الدعم الفني.",
      safe: "٤. حماية القاصرين والأطفال",
      safeBody: "جميع محتوياتنا آمنة وتعليمية بشكل كلي لجميع الأعمار ولا نهدف إلى تتبع الأطفال دون سن ١٣ عاماً بشكل مباشر.",
      contact: "هل لديك استفسار؟",
      contactBody: "إذا كنت ترغب بمسح بياناتك بشكل كامل، تفضل بمراسلة الفريق البرمجي: legal@kurdishquest.com",
      back: "الرئيسية"
    }
  }[language !== "ar" ? "en" : "ar"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 max-w-md mx-auto bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 text-slate-800 dark:text-slate-200 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-900 dark:text-slate-100", children: labels.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest", children: labels.subtitle })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100/40 dark:border-indigo-900/30 p-4 rounded-3xl mb-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-indigo-500 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: labels.desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.collect })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.collectBody })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.cookies })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.cookiesBody })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.retention })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.retentionBody })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.safe })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.safeBody })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-slate-200 dark:border-slate-800/40 p-4 rounded-3xl space-y-1 text-start bg-slate-100 dark:bg-slate-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-slate-900 dark:text-slate-100", children: labels.contact }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1", children: labels.contactBody })
      ] })
    ] })
  ] });
}
export {
  PrivacyPolicy
};
