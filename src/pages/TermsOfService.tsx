/**
 * TermsOfService.tsx
 * 
 * Production-ready Terms of Service design, complete with licensing, usage limits, and Kurdish Quest rules.
 */
import React from 'react';
import { Landmark, MessageSquare, AlertTriangle, HelpCircle } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { pickLocalized } from '../localization/translations';

export function TermsOfService() {
  const { language } = useAuth();

  const labels = pickLocalized(language, {
    en: {
      title: "Terms of Service",
      subtitle: "Last Updated: June 2026",
      desc: "By launching Kurdish Quest, you agree to comply with the rules of usage specified below. Please read carefully to understand user account limits and copyrights.",
      agreement: "1. Acceptance of Terms",
      agreementBody: "Our Kurdish syllabus and audio drills are provided for academic, language education, and non-commercial personal learning. Automated bulk scraping without authorization is prohibited.",
      gamified: "2. Gamification and Fair Play",
      gamifiedBody: "Experience Points (XP), levels, badges, and streaks reflect real study effort. Manipulation of local progress to game rankings is discouraged.",
      monetization: "3. Ad-Free Kids Mode & Adult Support",
      monetizationBody: "Kids Mode is completely ad-free. Optional non-intrusive ads may appear in Adults Mode to help sustain free learning resources.",
      liability: "4. Disclaimers of Accuracy",
      liabilityBody: "While we strive to provide accurate standard Kurmanji translations and pronunciation, regional dialect nuances naturally vary across Kurdistan. We welcome community feedback.",
      contact: "Have Questions?",
      contactBody: "For educational partnerships or syllabus error reports, write to support@kurdishquest.com",
    },
    ar: {
      title: "شروط الخدمة",
      subtitle: "آخر تحديث: يونيو 2026",
      desc: "من خلال تشغيل تطبيق كويست الكرمانجية، فإنك توافق على الالتزام بالقواعد البسيطة التالية. تفضل بقراءة البنود للحفاظ على سلامة بيئتنا التعليمية.",
      agreement: "١. استخدام المنهج والترجمة",
      agreementBody: "تقدم المواد الصوتية والترجمات المتوفرة فقط لصالح التعليم الفردي وتطوير مهارات الكلام. يُمنع استخراج المحتوى البرمجي آلياً بدون ترخيص رسمي.",
      gamified: "٢. النزاهة في التعلم ولوحة المتصدرين",
      gamifiedBody: "تعتمد نقاط الخبرة (XP) ومستويات التقدم على الجهد الحقيقي. يُحظر التلاعب ببيانات الترتيب للحفاظ على عدالة المنافسة.",
      monetization: "٣. وضع الأطفال المجاني والإعلانات",
      monetizationBody: "وضع الأطفال خالٍ تماماً من الإعلانات. قد تظهر إعلانات خفيفة اختيارية في وضع الكبار لدعم استمرار المنهج المجاني.",
      liability: "٤. حدود المسؤولية الأكاديمية",
      liabilityBody: "اللهجة الكرمانجية غنية بالتنوع المحلي الممتد عبر مناطق متعددة. قد تجد اختيارات طفيفة تختلف بحسب الإقليم؛ نرحب دائماً بملاحظاتك لتعديلها.",
      contact: "هل لديك سؤال؟",
      contactBody: "إذا كنت تريد ترخيص المنهج للمدارس أو المعاهد، تفضل بمراسلتنا: support@kurdishquest.com",
    },
    ku: {
      title: "Mercên Xizmetê",
      subtitle: "Nûkirina Dawî: Hezîran 2026",
      desc: "Bi bikaranîna Kurdish Quest re, tu van mercên hêsan ên jêrîn qebûl dikî.",
      agreement: "1. Bikaranîna Bernameya Fêrbûnê",
      agreementBody: "Materyalên dengî û wergerên me ji bo fêrbûna kesane û perwerdeyê ne. Kopîkirina otomatîk bê destûr qedexe ye.",
      gamified: "2. Lîstika Dadperwer",
      gamifiedBody: "Xalên XP, ast û zincîr hewldana te ya rastîn nîşan didin. Ji kerema xwe bi dadperwerî fêr bibe.",
      monetization: "3. Moda Zarokan a Bê-Reklam",
      monetizationBody: "Moda Zarokan bi tevahî bê-reklam e. Di Moda Mezinan de dibe ku reklamên sivik ji bo piştgiriya projeyê hebin.",
      liability: "4. Cihêrengiya Devokan",
      liabilityBody: "Kurmancî xwedî dewlemendiyeke herêmî ye. Dibe ku hinek peyv li gorî herêman cihê bin; em her dem pêşniyarên te pêşwazî dikin.",
      contact: "Pirseke te heye?",
      contactBody: "Ji bo hevkariya perwerdeyê yan raporkirina şaşiyan: support@kurdishquest.com",
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
        <Landmark className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <p>{labels.desc}</p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>{labels.agreement}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.agreementBody}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>{labels.gamified}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.gamifiedBody}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>{labels.monetization}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.monetizationBody}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-4 rounded-3xl space-y-1 text-start">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>{labels.liability}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            {labels.liabilityBody}
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
