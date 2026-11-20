/**
 * PWAInstallButton.tsx — Trilingual Cross-Platform PWA Install Prompt & iOS Safari Guide
 *
 * Automatically hides when running inside Capacitor Android/iOS native shell or
 * already installed as a standalone PWA.
 */
import React, { useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../../platform';
import { useAuth } from '../../store/AuthContext';
import type { Language } from '../../models/user';

interface PWAInstallButtonProps {
  compact?: boolean;
  className?: string;
}

const COPY: Record<
  Language,
  {
    installApp: string;
    installIOS: string;
    iosTitle: string;
    iosStep1: string;
    iosStep2: string;
    close: string;
  }
> = {
  en: {
    installApp: 'Install App',
    installIOS: 'Add to Home Screen',
    iosTitle: 'Install on iPhone / iPad',
    iosStep1: 'Tap the Share button in Safari toolbar.',
    iosStep2: 'Scroll down and tap "Add to Home Screen".',
    close: 'Close',
  },
  ar: {
    installApp: 'تثبيت التطبيق',
    installIOS: 'إضافة للشاشة الرئيسية',
    iosTitle: 'التثبيت على iPhone و iPad',
    iosStep1: 'اضغط على زر المشاركة (Share) في شريط Safari.',
    iosStep2: 'مرّر للأسفل واختر "إضافة إلى الشاشة الرئيسية".',
    close: 'إغلاق',
  },
  ku: {
    installApp: 'Sepanê Saz Bike',
    installIOS: 'Li Ekrana Sereke Zêde Bike',
    iosTitle: 'Li ser iPhone / iPad Saz Bike',
    iosStep1: 'Li ser bişkoka Parvekirinê (Share) di Safari de bitikîne.',
    iosStep2: 'Biçe xwarê û "Add to Home Screen" hilbijêre.',
    close: 'Bigire',
  },
};

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  compact = false,
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language } = useAuth();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const strings = COPY[language] ?? COPY.en;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${className}`}
      >
        <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{strings.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-extrabold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${className}`}
        >
          <Share className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{compact ? strings.installApp : strings.installIOS}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl text-start">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 id="ios-install-title" className="text-base font-extrabold text-slate-900 dark:text-white">
                  {strings.iosTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label={strings.close}
                  className="min-w-[44px] min-h-[44px] -me-2 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <Share className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">{strings.iosStep1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">{strings.iosStep2}</span>
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[44px] rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                {strings.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
