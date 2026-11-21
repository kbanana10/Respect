/**
 * NotFound.tsx
 *
 * AUDIT FIX: the router had no catch-all route, so any unknown or stale deep
 * link (e.g. a bookmarked /vocabulary/deleted-category, or a typo) rendered a
 * completely blank screen inside the layout with no way to recover other than
 * the browser back button.
 */
import { useNavigate } from 'react-router';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { pickLocalized } from '../localization/translations';

export function NotFound() {
  const navigate = useNavigate();
  const { language } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 gap-5 min-h-[60vh]">
      <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-black text-slate-900 dark:text-white">
          {pickLocalized(language, {
            en: 'This page does not exist',
            ar: 'هذه الصفحة غير موجودة',
            ku: 'Ev rûpel tune ye',
          })}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          {pickLocalized(language, {
            en: 'The link may be outdated, or the lesson was moved. Your progress is safe.',
            ar: 'قد يكون الرابط قديماً أو تم نقل الدرس. تقدمك محفوظ بأمان.',
            ku: 'Dibe ku girêdan kevin be yan ders hatibe guhertin. Pêşketina te parastî ye.',
          })}
        </p>
      </div>

      <div className="flex gap-3 w-full max-w-xs">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          {pickLocalized(language, { en: 'Go back', ar: 'رجوع', ku: 'Vegere' })}
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          {pickLocalized(language, { en: 'Home', ar: 'الرئيسية', ku: 'Destpêk' })}
        </button>
      </div>
    </div>
  );
}
