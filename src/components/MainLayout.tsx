/**
 * MainLayout.tsx — Responsive Cross-Platform Adaptive Application Shell
 *
 * Adapts seamlessly across:
 * - Mobile (Android, iPhone, small web): edge-to-edge layout + safe-area insets + bottom tab bar
 * - Tablet & Desktop (iPad, desktop browsers): persistent RTL-aware sidebar + spacious content canvas
 *
 * All native device interactions (Android hardware back button, app exit, safe areas)
 * are delegated to the Platform Layer (`src/platform`).
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation, useNavigationType } from 'react-router';
import { useAuth } from '../store/AuthContext';
import {
  Hash, ArrowLeft, Search, User, Bell, X as CloseIcon,
  Gamepad2, Map, Flame, Smile, GraduationCap, Sparkles, Star, Compass, Award,
  Settings as SettingsIcon, Heart, Trophy, ShoppingBag, Sun, Moon,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { t, getLayoutDirection } from '../localization/translations';
import { getRouteMeta, navigateSafelyBack, NUMBER_FAMILY_HISTORY_STATE, runBackInterceptors } from '../lib/navigation';
import { getPlatform } from '../platform';
import { motion, AnimatePresence } from 'motion/react';
import { checkAndTriggerReminder } from '../services/ReminderService';
import { Modal, Button } from './ui';
import { SunMark } from './ui/SunMark';
import { PWAInstallButton } from '../presentation/components/PWAInstallButton';
import { AVATARS } from '../constants/appConstants';
import type { Language } from '../models/user';

interface HistoryStateWithUsr {
  usr?: unknown;
}

const renderHeaderAvatarIcon = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    user: User,
    smile: Smile,
    'graduation-cap': GraduationCap,
    flame: Flame,
    sparkles: Sparkles,
    star: Star,
    compass: Compass,
    award: Award,
  };
  const IconComponent = iconMap[iconName] || User;
  return <IconComponent className="w-5 h-5" />;
};

const LEARN_ACTIVE_PATHS = [
  '/learn',
  '/alphabet',
  '/vocabulary/numbers',
  '/vocabulary/colors',
  '/grammar',
  '/grammar/pronouns',
  '/grammar/verbs',
  '/grammar/nouns',
  '/grammar/sentence-structure',
  '/grammar/prepositions',
  '/writing',
  '/writing/words',
  '/writing/sentences',
];

function isNavPathActive(path: string, current: string, activePaths?: string[]): boolean {
  return Boolean(
    (activePaths && (activePaths.includes(current) || current.startsWith(path))) ||
      current === path ||
      (path !== '/' && current.startsWith(path)),
  );
}

export function MainLayout() {
  const { user, userData, loading, language, setLanguage, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const routeMeta = getRouteMeta(location.pathname, language);
  const isProfile = location.pathname === '/profile';
  const selectedHeaderAvatar = AVATARS.find((a) => a.id === userData?.avatarId) || AVATARS[0];
  const [showExitModal, setShowExitModal] = useState(false);

  const mainScrollRef = useRef<HTMLElement | null>(null);
  const scrollPositionsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const el = mainScrollRef.current;
    if (navigationType === 'POP') {
      const saved = scrollPositionsRef.current[location.key] ?? 0;
      if (el) {
        el.scrollTop = saved;
        el.scrollLeft = 0;
      }
      if (globalThis.window !== undefined) window.scrollTo(0, saved);
    } else {
      if (el) {
        el.scrollTop = 0;
        el.scrollLeft = 0;
      }
      if (globalThis.window !== undefined) window.scrollTo(0, 0);
    }
  }, [location.key, location.pathname, navigationType]);

  useEffect(() => {
    const el = mainScrollRef.current;
    if (!el) return;
    const capture = () => {
      scrollPositionsRef.current[location.key] = el.scrollTop;
    };
    el.addEventListener('scroll', capture, { passive: true });
    return () => el.removeEventListener('scroll', capture);
  }, [location.key]);

  const [activeNotification, setActiveNotification] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    if (!activeNotification) return;
    const timer = setTimeout(() => setActiveNotification(null), 8000);
    return () => clearTimeout(timer);
  }, [activeNotification]);

  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    const handleGameActive = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (customEvent && (customEvent.detail === true || customEvent.detail === false)) {
        setIsGameActive(customEvent.detail && location.pathname === '/games');
      }
    };
    window.addEventListener('set-game-active', handleGameActive);
    return () => {
      window.removeEventListener('set-game-active', handleGameActive);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/games' && isGameActive) {
      setIsGameActive(false);
    }
  }, [isGameActive, location.pathname]);

  useEffect(() => {
    if (loading || !user || !userData) return;

    const checkReminder = () => {
      const result = checkAndTriggerReminder(userData.lastActive, language);
      if (result.triggered) {
        setActiveNotification({
          title: result.title,
          message: result.message,
        });
      }
    };

    const initialTimeout = setTimeout(checkReminder, 3000);
    const intervalId = setInterval(checkReminder, 60000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [user, loading, userData, language]);

  useEffect(() => {
    const handleInAppTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ title: string; message: string }>;
      if (customEvent.detail) {
        setActiveNotification(customEvent.detail);
      }
    };
    window.addEventListener('trigger-in-app-notification', handleInAppTrigger);
    return () => {
      window.removeEventListener('trigger-in-app-notification', handleInAppTrigger);
    };
  }, []);

  useEffect(() => {
    if (!loading && !user && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [user, loading, location, navigate]);

  const lastKqFamilyEntryWasNumberFamily = (): boolean => {
    const state =
      typeof window !== 'undefined'
        ? (window.history?.state as HistoryStateWithUsr | null)
        : null;
    return state != null && state.usr === NUMBER_FAMILY_HISTORY_STATE;
  };

  const historyBack = () => {
    if (typeof window !== 'undefined' && typeof window.history?.back === 'function') {
      window.history.back();
    }
  };

  const handleSmartBack = () => {
    if (runBackInterceptors()) {
      return;
    }
    if (location.pathname === '/vocabulary/numbers' && lastKqFamilyEntryWasNumberFamily()) {
      historyBack();
      return;
    }
    navigateSafelyBack(navigate, location.pathname);
  };

  // Native hardware back-button support routed cleanly through PlatformAdapter
  useEffect(() => {
    const platform = getPlatform();
    if (!platform.getCapabilities().isNative) {
      return;
    }

    const handleNativeBack = () => {
      if (runBackInterceptors()) {
        return;
      }
      if (showExitModal) {
        setShowExitModal(false);
        return;
      }
      if (location.pathname === '/' || location.pathname === '/login') {
        setShowExitModal(true);
        return;
      }
      if (location.pathname === '/vocabulary/numbers' && lastKqFamilyEntryWasNumberFamily()) {
        historyBack();
        return;
      }
      navigateSafelyBack(navigate, location.pathname);
    };

    return platform.onHardwareBackButton(() => {
      handleNativeBack();
      return true;
    });
  }, [location.pathname, navigate, showExitModal]);

  const isMainTab = routeMeta.isMainTab;
  const isLogin = routeMeta.hideHeader && location.pathname === '/login';
  const shouldHideHeader = routeMeta.hideHeader || isGameActive;
  const shouldHideBottomNav = routeMeta.hideBottomNav || isGameActive || isLogin;

  useEffect(() => {
    if (globalThis.document !== undefined) {
      document.documentElement.lang = language;
      document.documentElement.dir = getLayoutDirection(language);
    }
  }, [language]);

  if (loading) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center text-brand-deep dark:text-[#FFCE6B] font-bold text-2xl">
        {t(language, 'loading')}
      </div>
    );
  }

  const primaryNavItems = [
    { path: '/', label: t(language, 'home'), icon: Hash },
    { path: '/learn', activePaths: LEARN_ACTIVE_PATHS, label: t(language, 'learning'), icon: GraduationCap },
    { path: '/roadmap', label: t(language, 'roadmap_tab'), icon: Map, tourId: 'nav-roadmap' },
    { path: '/games', label: t(language, 'games_tab'), icon: Gamepad2 },
    { path: '/profile', label: t(language, 'profile_tab'), icon: User },
  ];

  const secondaryLinks = [
    { path: '/search', label: t(language, 'nav_dictionary'), icon: Search },
    { path: '/favorites', label: t(language, 'nav_favorites'), icon: Heart },
    { path: '/leaderboard', label: language === 'ar' ? 'المتصدرون' : language === 'ku' ? 'Rêzbendî' : 'Leaderboard', icon: Trophy },
    { path: '/store', label: language === 'ar' ? 'المتجر' : language === 'ku' ? 'Firoşgeh' : 'Store', icon: ShoppingBag },
  ];

  return (
    <div
      dir={getLayoutDirection(language)}
      className={cn(
        'h-[100dvh] w-full flex text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 overflow-hidden',
        isGameActive ? 'bg-slate-950' : 'bg-surface-2 dark:bg-slate-950',
      )}
    >
      {/* Desktop & iPad Landscape Adaptive Sidebar */}
      {!shouldHideBottomNav && (
        <aside
          aria-label="Sidebar Navigation"
          className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-white dark:bg-slate-900 border-e border-line-soft dark:border-slate-800 h-full z-20"
        >
          <div className="px-5 py-5 flex items-center gap-3 border-b border-line dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-[#FFB300] text-[#432C00] flex items-center justify-center shrink-0">
              <SunMark className="w-6 h-6" />
            </div>
            <span className="font-display font-black text-lg tracking-tight text-ink whitespace-nowrap">
              Kurdish Quest
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            <div className="space-y-1">
              {primaryNavItems.map((item) => {
                const active = isNavPathActive(item.path, location.pathname, item.activePaths);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3.5 py-2.5 min-h-[44px] rounded-xl text-sm font-bold transition-colors whitespace-nowrap',
                      active
                        ? 'bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B]'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-ink',
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-line dark:border-slate-800 space-y-1">
              {secondaryLinks.map((item) => {
                const active = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold transition-colors whitespace-nowrap',
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
          </div>

          <div className="p-3.5 border-t border-line dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-0.5 flex-1">
                {(['en', 'ku', 'ar'] as Language[]).map((langCode) => (
                  <button
                    key={langCode}
                    type="button"
                    onClick={() => setLanguage(langCode)}
                    className={cn(
                      'flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-colors cursor-pointer whitespace-nowrap',
                      language === langCode
                        ? 'bg-white dark:bg-slate-700 text-[#8A6100] dark:text-[#FFCE6B] shadow-2xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-ink',
                    )}
                  >
                    {langCode === 'en' ? 'EN' : langCode === 'ku' ? 'KU' : 'عربي'}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="min-w-[40px] min-h-[40px] rounded-xl border border-line-soft dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
            <PWAInstallButton compact className="w-full" />
          </div>
        </aside>
      )}

      {/* Main Responsive App Column */}
      <div
        className={cn(
          'flex-1 min-w-0 h-full relative flex flex-col overflow-hidden transition-colors duration-300',
          isGameActive ? 'bg-slate-950' : 'bg-slate-50 dark:bg-slate-950',
        )}
      >
        <Modal
          open={showExitModal}
          onClose={() => setShowExitModal(false)}
          title={t(language, 'exit_confirm_title')}
          description={t(language, 'exit_confirm_msg')}
          hideCloseButton
        >
          <div className="flex gap-3 w-full">
            <Button variant="secondary" fullWidth onClick={() => setShowExitModal(false)}>
              {t(language, 'exit_confirm_no')}
            </Button>
            <Button variant="danger" fullWidth onClick={() => void getPlatform().exitApp()}>
              {t(language, 'exit_confirm_yes')}
            </Button>
          </div>
        </Modal>

        <AnimatePresence>
          {activeNotification && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-[max(1rem,env(safe-area-inset-top))] inset-x-4 max-w-md mx-auto bg-white dark:bg-slate-900 text-ink rounded-2xl p-4 shadow-[0_18px_44px_rgba(30,41,59,0.18)] z-[60] flex items-start gap-3 border border-line-soft overflow-hidden"
            >
              <div className="bg-[#FFF3D6] dark:bg-[#3A2F14] p-2.5 rounded-xl shrink-0 mt-0.5 text-[#B8860B] dark:text-[#FFCE6B]">
                <Bell className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 pe-1">
                <h4 className="font-bold text-sm tracking-tight leading-snug">
                  <bdi>{activeNotification.title}</bdi>
                </h4>
                <p className="text-xs text-muted mt-1 leading-normal">
                  <bdi>{activeNotification.message}</bdi>
                </p>
                <div className="flex gap-2.5 mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNotification(null);
                      navigate('/');
                    }}
                    className="bg-[#FFB300] text-[#432C00] font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-[#E69500] transition-colors cursor-pointer"
                  >
                    {language === 'ku' ? 'Niha Biceribîne' : language === 'ar' ? 'تمرّن الآن' : 'Practice Now'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveNotification(null)}
                    className="bg-transparent hover:bg-surface-2 text-muted border border-line-soft font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    {language === 'ku' ? 'Paşê' : language === 'ar' ? 'لاحقاً' : 'Snooze'}
                  </button>
                </div>
              </div>

              <button
                type="button"
                aria-label={language === 'ar' ? 'إغلاق الإشعار' : 'Dismiss notification'}
                onClick={() => setActiveNotification(null)}
                className="text-muted hover:text-ink p-1 rounded-lg hover:bg-surface-2 transition-colors shrink-0 -me-1 -mt-1 cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!shouldHideHeader && (
          <header className="px-4 lg:px-8 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2.5 flex items-center z-10 bg-white/95 dark:bg-[#1F1F1E]/95 backdrop-blur-md border-b border-line dark:border-[#2B2B2A] min-h-[56px]">
            <div className="w-full max-w-5xl mx-auto flex items-center gap-3">
              {(!isMainTab || isProfile) && (
                <button
                  onClick={handleSmartBack}
                  type="button"
                  aria-label={language !== 'ar' ? `Back to ${routeMeta.safeBackTo}` : 'رجوع آمن'}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#2B2B2A] transition-colors -ms-2 focus-visible:ring-2 focus-visible:ring-[#FFB300] dark:focus-visible:ring-[#FFBA38] cursor-pointer"
                >
                  <ArrowLeft
                    className={cn(
                      'w-5 h-5 rtl:rotate-180',
                      isProfile ? 'text-[#FFB300]' : 'text-slate-600 dark:text-slate-400',
                    )}
                  />
                </button>
              )}

              {isMainTab && !isProfile && (
                <button
                  onClick={() => navigate('/profile')}
                  type="button"
                  aria-label={language !== 'ar' ? 'Profile' : 'الملف الشخصي'}
                  title={language !== 'ar' ? 'Profile' : 'الملف الشخصي'}
                  className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer overflow-hidden border border-line-soft focus-visible:ring-2 focus-visible:ring-[#FFB300] shrink-0"
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user?.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${selectedHeaderAvatar.color}`}>
                      {renderHeaderAvatarIcon(selectedHeaderAvatar.icon)}
                    </div>
                  )}
                </button>
              )}

              <div className={cn('flex-1 min-w-0', isProfile ? 'text-center lg:text-start' : 'text-start')}>
                {!isProfile && (
                  <p dir="auto" className="text-xs font-bold text-[#8A6100] dark:text-[#FFCE6B] leading-none truncate">
                    {routeMeta.brandLabel}
                  </p>
                )}
                <h1 dir="auto" className="text-lg font-black tracking-tight text-ink truncate leading-tight mt-0.5">
                  {routeMeta.title}
                </h1>
              </div>

              <div className="flex items-center gap-2 ms-auto shrink-0">
                {isProfile && (
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('kq:profile-settings'))}
                    aria-label={language !== 'ar' ? 'Settings' : 'الإعدادات'}
                    title={language !== 'ar' ? 'Settings' : 'الإعدادات'}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-[#FFB300] focus-visible:ring-2 focus-visible:ring-[#FFB300]"
                  >
                    <SettingsIcon className="w-5 h-5" />
                  </button>
                )}

                {!isProfile && (
                  <div
                    data-tour="stats-pill"
                    className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 border border-line-soft dark:border-slate-700 rounded-xl px-3.5 py-2"
                  >
                    <button
                      onClick={() => navigate('/')}
                      type="button"
                      title={language === 'ku' ? 'Rêza Rojane' : language === 'ar' ? 'سلسلة الأيام' : 'Current Streak'}
                      className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none min-h-0 py-2.5 -my-2.5 ps-2.5 -ms-2.5 pe-1 -me-1"
                    >
                      <Flame
                        className={`w-4 h-4 ${(userData?.streak || 0) > 0 ? 'text-orange-500 fill-orange-500' : 'text-orange-400'}`}
                        aria-hidden="true"
                      />
                      <span className="font-black text-sm text-ink tabular-nums">{userData?.streak || 0}</span>
                    </button>
                    <span className="w-px h-4 bg-line-soft dark:bg-slate-700" aria-hidden="true" />
                    <button
                      onClick={() => navigate('/store')}
                      type="button"
                      title={language === 'ku' ? 'Cewher' : language === 'ar' ? 'الجواهر' : 'Gems'}
                      className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none min-h-0 py-2.5 -my-2.5 pe-2.5 -me-2.5 ps-1 -ms-1"
                    >
                      <span className="text-sm" aria-hidden="true">💎</span>
                      <span className="font-black text-sm text-ink tabular-nums">{userData?.gems || 0}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
        )}

        <main
          ref={mainScrollRef}
          className={cn(
            'flex-1 overflow-y-auto scroll-smooth',
            shouldHideBottomNav ? 'pb-0' : 'pb-20 lg:pb-8',
            (isGameActive || routeMeta.shellMode === 'immersive') &&
              'relative overflow-hidden h-full flex flex-col',
          )}
        >
          <Outlet />
        </main>

        {/* Mobile & Portrait Tablet Bottom Navigation */}
        {!shouldHideBottomNav && (
          <nav
            aria-label="Main Navigation"
            className="lg:hidden absolute bottom-0 w-full bg-white/95 dark:bg-[#1F1F1E]/95 backdrop-blur-md border-t border-slate-200/70 dark:border-[#2B2B2A] flex justify-around items-center px-1 pb-safe pt-1 h-16 z-20"
          >
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavIcon
                  key={item.path}
                  path={item.path}
                  activePaths={item.activePaths}
                  icon={<Icon className="w-5 h-5" />}
                  label={item.label}
                  current={location.pathname}
                  tourId={item.tourId}
                />
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}

function NavIcon({
  path,
  icon,
  label,
  current,
  tourId,
  activePaths,
}: {
  path: string;
  icon: React.ReactNode;
  label: string;
  current: string;
  tourId?: string;
  activePaths?: string[];
}) {
  const navigate = useNavigate();
  const isActive = isNavPathActive(path, current, activePaths);

  return (
    <button
      onClick={() => navigate(path)}
      type="button"
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      data-tour={tourId}
      className={cn(
        'flex flex-col items-center justify-center flex-1 min-w-[44px] h-full relative transition-colors duration-200 outline-none select-none cursor-pointer whitespace-nowrap rounded-xl focus-visible:ring-2 focus-visible:ring-[#FFB300] dark:focus-visible:ring-[#FFBA38] px-0.5',
        isActive
          ? 'text-[#432C00] font-extrabold'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
      )}
    >
      <div className="relative flex flex-col items-center justify-center w-full">
        {isActive && (
          <motion.div
            layoutId="activeNavTab"
            className="absolute -inset-x-1 -inset-y-1 bg-[#FFB300] rounded-xl -z-10"
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          />
        )}
        <div className="transition-transform duration-200">{icon}</div>
        <span className="text-[11px] font-bold mt-0.5 block whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-0.5">
          {label}
        </span>
      </div>
    </button>
  );
}
