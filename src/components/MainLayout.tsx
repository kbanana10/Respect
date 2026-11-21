/**
 * MainLayout.tsx — Responsive Cross-Platform Adaptive Application Shell
 *
 * Adapts seamlessly across:
 * - Mobile (Android, iPhone, small web): edge-to-edge layout + safe-area insets + bottom tab bar
 * - Tablet & Desktop (iPad, desktop browsers): persistent RTL-aware sidebar + spacious content canvas
 * - Kids Mode (4 tabs: Home, Map, Games, Stars; ad-free & leaderboard-free)
 * - Adults Mode (5 tabs: Home, Path, Practice, Games, Profile; full study tools)
 */
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useLocation, useNavigationType } from 'react-router';
import { useAuth } from '../store/AuthContext';
import {
  Home, ArrowLeft, Search, User, Bell, X as CloseIcon,
  Gamepad2, Map, Flame, Smile, GraduationCap, Sparkles, Star, Compass, Award,
  Settings as SettingsIcon, Heart, Trophy, ShoppingBag,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { t, getLayoutDirection, pickLocalized } from '../localization/translations';
import { getRouteMeta, navigateSafelyBack, NUMBER_FAMILY_HISTORY_STATE, runBackInterceptors } from '../lib/navigation';
import { getPlatform } from '../platform';
import { motion, AnimatePresence } from 'motion/react';
import { checkAndTriggerReminder } from '../services/ReminderService';
import { Modal, Button } from './ui';
import { AVATARS } from '../constants/appConstants';
import { DesktopSidebar, type NavItemConfig } from './layout/DesktopSidebar';
import { MobileBottomNav } from './layout/MobileBottomNav';

interface HistoryStateWithUsr {
  usr?: string;
}

const AVATAR_ICON_MAP = {
  user: User,
  smile: Smile,
  'graduation-cap': GraduationCap,
  flame: Flame,
  sparkles: Sparkles,
  star: Star,
  compass: Compass,
  award: Award,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

const AVATAR_ICON_LOOKUP = new globalThis.Map<string, React.ComponentType<{ className?: string }>>(
  Object.entries(AVATAR_ICON_MAP),
);

function renderHeaderAvatarIcon(iconName: string): React.ReactNode {
  const IconComponent = AVATAR_ICON_LOOKUP.get(iconName) ?? User;
  return <IconComponent className="w-5 h-5" />;
}

const LEARN_ACTIVE_PATHS = [
  '/learn',
  '/alphabet',
  '/vocabulary',
  '/sentences',
  '/grammar',
  '/writing',
] as const;

export function MainLayout() {
  const { user, userData, loading, language, setLanguage, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const routeMeta = getRouteMeta(location.pathname, language);
  const isProfile = location.pathname === '/profile';
  const isKidsMode = userData?.learnerMode === 'kids';
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
    const timer = window.setTimeout(() => setActiveNotification(null), 8000);
    return () => window.clearTimeout(timer);
  }, [activeNotification]);

  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    const handleGameActive = (e: Event) => {
      if (e instanceof CustomEvent && (e.detail === true || e.detail === false)) {
        setIsGameActive(e.detail && location.pathname === '/games');
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

    const initialTimeout = window.setTimeout(checkReminder, 3000);
    const intervalId = window.setInterval(checkReminder, 60000);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(intervalId);
    };
  }, [user, loading, userData, language]);

  useEffect(() => {
    const handleInAppTrigger = (e: Event) => {
      if (e instanceof CustomEvent && e.detail && e.detail.title && e.detail.message) {
        setActiveNotification({
          title: String(e.detail.title),
          message: String(e.detail.message),
        });
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
    if (globalThis.window === undefined) return false;
    // SAFETY: React Router stores route state under `window.history.state.usr`.
    const state = window.history?.state as HistoryStateWithUsr | null;
    return state != null && state.usr === NUMBER_FAMILY_HISTORY_STATE;
  };

  const historyBack = () => {
    if (globalThis.window !== undefined && window.history && window.history.back) {
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

  const primaryNavItems: readonly NavItemConfig[] = isKidsMode
    ? [
        { path: '/', label: t(language, 'home'), icon: Home },
        { path: '/roadmap', label: t(language, 'nav_map'), icon: Map, tourId: 'nav-roadmap' },
        { path: '/games', label: t(language, 'games_tab'), icon: Gamepad2 },
        { path: '/profile', label: t(language, 'nav_stars'), icon: Star },
      ]
    : [
        { path: '/', label: t(language, 'home'), icon: Home },
        { path: '/roadmap', label: t(language, 'roadmap_tab'), icon: Map, tourId: 'nav-roadmap' },
        { path: '/learn', activePaths: LEARN_ACTIVE_PATHS, label: t(language, 'nav_practice'), icon: GraduationCap },
        { path: '/games', label: t(language, 'games_tab'), icon: Gamepad2 },
        { path: '/profile', label: t(language, 'profile_tab'), icon: User },
      ];

  const secondaryLinks: readonly NavItemConfig[] = isKidsMode
    ? [
        { path: '/writing', label: t(language, 'writing_studio_title'), icon: GraduationCap },
        { path: '/store', label: t(language, 'nav_store'), icon: ShoppingBag },
      ]
    : [
        { path: '/search', label: t(language, 'nav_dictionary'), icon: Search },
        { path: '/favorites', label: t(language, 'nav_favorites'), icon: Heart },
        { path: '/leaderboard', label: t(language, 'nav_leaderboard'), icon: Trophy },
        { path: '/store', label: t(language, 'nav_store'), icon: ShoppingBag },
      ];

  const headerLabels = pickLocalized(language, {
    en: {
      practiceNow: 'Practice Now',
      snooze: 'Snooze',
      dismissNotif: 'Dismiss notification',
      back: `Back to ${routeMeta.safeBackTo}`,
      profile: 'Profile',
      settings: 'Settings',
      streak: 'Current Streak',
      gems: 'Gems & Rewards',
    },
    ar: {
      practiceNow: 'تمرّن الآن',
      snooze: 'لاحقاً',
      dismissNotif: 'إغلاق الإشعار',
      back: 'رجوع آمن',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      streak: 'سلسلة الأيام',
      gems: 'الجواهر والمكافآت',
    },
    ku: {
      practiceNow: 'Niha Biceribîne',
      snooze: 'Paşê',
      dismissNotif: 'Agahdariyê bigire',
      back: 'Vegere paş',
      profile: 'Profîl',
      settings: 'Mîheng',
      streak: 'Rêza Rojane',
      gems: 'Cewher û Xelat',
    },
  });

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
        <DesktopSidebar
          primaryNavItems={primaryNavItems}
          secondaryLinks={secondaryLinks}
          currentPath={location.pathname}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          toggleTheme={toggleTheme}
          isKidsMode={isKidsMode}
        />
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
                    {headerLabels.practiceNow}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveNotification(null)}
                    className="bg-transparent hover:bg-surface-2 text-muted border border-line-soft font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    {headerLabels.snooze}
                  </button>
                </div>
              </div>

              <button
                type="button"
                aria-label={headerLabels.dismissNotif}
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
                  aria-label={headerLabels.back}
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
                  aria-label={headerLabels.profile}
                  title={headerLabels.profile}
                  className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer overflow-hidden border border-line-soft focus-visible:ring-2 focus-visible:ring-[#FFB300] shrink-0"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user?.displayName || 'User'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
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
                    aria-label={headerLabels.settings}
                    title={headerLabels.settings}
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
                      title={headerLabels.streak}
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
                      title={headerLabels.gems}
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
          <MobileBottomNav items={primaryNavItems} currentPath={location.pathname} />
        )}
      </div>
    </div>
  );
}
