/**
 * DesktopSidebar.tsx — Persistent RTL-aware sidebar for desktop & landscape tablets.
 * Adapts automatically between Kids Mode (4 core destinations, ad-free & leaderboard-free)
 * and Adults Mode (5 core destinations + full study utilities).
 */
import React from 'react';
import { Link } from 'react-router';
import { Sun, Moon, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';
import { SunMark } from '../ui/SunMark';
import { PWAInstallButton } from '../../presentation/components/PWAInstallButton';
import { t, pickLocalized } from '../../localization/translations';
import type { Language } from '../../models/user';
import { playButtonClickSound } from '../../features/audio/hooks/useAudio';

export interface NavItemConfig {
  readonly path: string;
  readonly label: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly activePaths?: readonly string[];
  readonly tourId?: string;
}

export function isNavPathActive(
  path: string,
  current: string,
  activePaths?: readonly string[],
): boolean {
  return Boolean(
    (activePaths && (activePaths.includes(current) || current.startsWith(path))) ||
      current === path ||
      (path !== '/' && current.startsWith(path)),
  );
}

interface DesktopSidebarProps {
  primaryNavItems: readonly NavItemConfig[];
  secondaryLinks: readonly NavItemConfig[];
  currentPath: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isKidsMode: boolean;
}

const LANGUAGES: readonly Language[] = ['en', 'ku', 'ar'];

export function DesktopSidebar({
  primaryNavItems,
  secondaryLinks,
  currentPath,
  language,
  setLanguage,
  theme,
  toggleTheme,
  isKidsMode,
}: DesktopSidebarProps) {
  const themeLabel = pickLocalized(language, {
    en: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
    ar: theme === 'dark' ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الداكن',
    ku: theme === 'dark' ? 'Biguherîne moda ronahî' : 'Biguherîne moda tarî',
  });

  return (
    <aside
      aria-label="Sidebar Navigation"
      className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-white dark:bg-slate-900 border-e border-line-soft dark:border-slate-800 h-full z-20"
    >
      <div className="px-5 py-5 flex items-center gap-3 border-b border-line dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-[var(--kq-gold)] text-[var(--kq-gold-on)] flex items-center justify-center shrink-0">
          <SunMark className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <span className="font-display font-black text-lg tracking-tight text-ink whitespace-nowrap block">
            Kurdish Quest
          </span>
          {isKidsMode && (
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {t(language, 'mode_kids')}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div className="space-y-1">
          {primaryNavItems.map((item) => {
            const active = isNavPathActive(item.path, currentPath, item.activePaths);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                data-tour={item.tourId}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 min-h-[48px] rounded-xl text-sm font-bold transition-colors whitespace-nowrap',
                  active
                    ? 'bg-[var(--kq-surface-2)] text-[var(--kq-gold-text)]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-ink',
                )}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {secondaryLinks.length > 0 && (
          <div className="pt-4 border-t border-line dark:border-slate-800 space-y-1">
            {secondaryLinks.map((item) => {
              const active = currentPath === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold transition-colors whitespace-nowrap',
                    active
                      ? 'bg-slate-100 dark:bg-slate-800 text-ink'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-ink',
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-3.5 border-t border-line dark:border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-0.5 flex-1">
            {LANGUAGES.map((langCode) => (
              <button
                key={langCode}
                type="button"
                aria-pressed={language === langCode}
                onClick={() => {
                  playButtonClickSound();
                  setLanguage(langCode);
                }}
                className={cn(
                  'flex-1 py-1.5 min-h-[36px] text-xs font-extrabold rounded-lg transition-colors cursor-pointer whitespace-nowrap',
                  language === langCode
                    ? 'bg-white dark:bg-slate-700 text-[var(--kq-gold-text)] shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-ink',
                )}
              >
                {langCode === 'en' ? 'EN' : langCode === 'ku' ? 'KU' : 'عربي'}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              playButtonClickSound();
              toggleTheme();
            }}
            aria-label={themeLabel}
            className="min-w-[44px] min-h-[44px] rounded-xl border border-line-soft dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <PWAInstallButton compact className="w-full" />
      </div>
    </aside>
  );
}
