/**
 * PrivacyPolicy.tsx
 * 
 * Legally sound and GDPR/COPPA-compliant Privacy Policy designed for Google Play Store publication.
 */
import React from 'react';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { pickLocalized } from '../localization/translations';

export function PrivacyPolicy() {
  const { language } = useAuth();

  const labels = pickLocalized(language, {
    en: {
      title: "Privacy Policy",
      subtitle: "Last Updated: June 2026",
      desc: "Your privacy is of paramount importance to us. This document outlines the types of personal information we collect, record, and how we protect it in compliance with GDPR/COPPA guidelines.",
      collect: "1. Information We Collect",
      collectBody: "When registering or signing in through Google, we process your email address, display name, and profile photos solely to manage scores and global learning standings. Offline performance data remains strictly inside your local device cache.",
      cookies: "2. Ad-Free Kids Mode & Adult Ads",
      cookiesBody: "Kids Mode is 100% ad-free with zero tracking or third-party ad requests. In Adults Mode, optional non-intrusive ads may help support the platform while respecting privacy preferences.",
      retention: "3. Retention & Data Erasure",
      retentionBody: "Your gamified learning checkpoints (XP, level milestones, streaks) are stored in secure sandboxed systems. You may request absolute removal of your data at any time by contacting our support desk or deleting your profile.",
      safe: "4. Child Safety Compliance",
      safeBody: "We do not track minors under age 13. Kids Mode disables all advertisements, hides competitive leaderboards, and protects settings behind a Parental Gate.",
      contact: "Have Questions?",
      contactBody: "For privacy questions, access queries or absolute account wipes, coordinate with legal@kurdishquest.com",
    },
    ar: {
      title: "سياسة الخصوصية",
      subtitle: "آخر تحديث: يونيو 2026",
      desc: "خصوصيتك ذات أهمية بالغة لدينا. توضح هذه الوثيقة أنواع البيانات الشخصية التي نقوم بجمعها، معالجتها، وحمايتها تماشياً مع معايير اللائحة العامة لحماية البيانات (GDPR) وCOPPA.",
      collect: "١. البيانات التي نجمعها",
      collectBody: "عند تسجيل الدخول بواسطة غوغل، نقوم فقط بحفظ اسمك وصورتك الشخصية والبريد الإلكتروني لتشغيل لوحة الصدارة وحفظ نقاط الخبرة (XP). بينما تبقى نتائج التعلم الأخرى محفوظة محلياً على جهازك.",
      cookies: "٢. وضع الأطفال الخالي من الإعلانات",
      cookiesBody: "وضع الأطفال خالٍ تماماً من الإعلانات بنسبة 100% ودون أي تتبع. في وضع الكبار فقط قد تظهر إعلانات اختيارية خفيفة لدعم استمرارية التطبيق.",
      retention: "٣. حقوق مسح البيانات",
      retentionBody: "يتم تخزين تقدمك التعليمي وسجل مشاركاتك بشكل آمن. يمكنك طلب حذف حسابك وبياناتك فوراً عن طريق التواصل بمركز الدعم الفني أو مسح ملفك المحلي.",
      safe: "٤. حماية القاصرين والأطفال",
      safeBody: "لا نقوم بتتبع الأطفال دون سن ١٣ عاماً. يوقف وضع الأطفال جميع الإعلانات ولوحات الترتيب التنافسية، ويحمي الإعدادات ببوابة والدية.",
      contact: "هل لديك استفسار؟",
      contactBody: "إذا كنت ترغب بمسح بياناتك بشكل كامل، تفضل بمراسلة الفريق البرمجي: legal@kurdishquest.com",
    },
    ku: {
      title: "Rêbaza Nepeniyê",
      subtitle: "Nûkirina Dawî: Hezîran 2026",
      desc: "Nepeniya te ji bo me gelek girîng e. Ev belge diyar dike ku em çi daneyan diparêzin û çawa li gorî GDPR/COPPA tevdigerin.",
      collect: "1. Daneyên ku em berhev dikin",
      collectBody: "Gava tu bi Google têkevî, em tenê nav, wêne û e-nameya te ji bo tomarkirina pêşketinê bikar tînin. Daneyên fêrbûna bê-înternet tenê li ser cîhaza te dimînin.",
      cookies: "2. Moda Zarokan a Bê-Reklam",
      cookiesBody: "Moda Zarokan %100 bê-reklam û bê-şopandin e. Di Moda Mezinan de dibe ku reklamên sivik ji bo piştgiriya projeyê xuya bibin.",
      retention: "3. Parastin û Jêbirina Daneyan",
      retentionBody: "Pêşketina te ya fêrbûnê (XP, ast, zincîr) bi ewlehî tê tomarkirin. Tu dikarî her dem daxwaza jêbirina daneyên xwe bikî.",
      safe: "4. Ewlehiya Zarokan",
      safeBody: "Em zarokên di bin 13 saliyê de naşopînin. Moda Zarokan hemû reklaman digire û mîhengan bi Deriyê Dêûbavan diparêze.",
      contact: "Pirseke te heye?",
      contactBody: "Ji bo pirsên nepeniyê yan jêbirina hesabê, ji me re binivîse: legal@kurdishquest.com",
    },
  });

  return (
    <div className="p-5 max-w-md mx-auto bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 text-slate-800 dark:text-slate-200 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">{labels.title}</h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{labels.subtitle}</p>
        </div>
      </div>

      <div className="bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100/40 dark:border-indigo-900/30 p-4 rounded-3xl mb-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-3">
        <Shield className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <p>{labels.desc}</p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>{labels.collect}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.collectBody}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <Eye className="w-4 h-4" />
            <span>{labels.cookies}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.cookiesBody}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <CheckCircle className="w-4 h-4" />
            <span>{labels.retention}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.retentionBody}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>{labels.safe}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.safeBody}
          </p>
        </div>

        <div className="border border-slate-200 dark:border-slate-800/40 p-4 rounded-3xl space-y-1 text-start bg-slate-100 dark:bg-slate-900">
          <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">{labels.contact}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.contactBody}
          </p>
        </div>

      </div>

    </div>
  );
}
