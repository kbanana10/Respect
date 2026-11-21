/**
 * MobileBottomNav.tsx — Adaptive mobile & portrait-tablet bottom navigation bar.
 * Renders 4 spacious tabs in Kids Mode (Home, Map, Games, Stars) and 5 tabs in
 * Adults Mode (Home, Path, Practice, Games, Profile).
 */
import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';
import { isNavPathActive, type NavItemConfig } from './DesktopSidebar';

interface MobileBottomNavProps {
  items: readonly NavItemConfig[];
  currentPath: string;
}

export function MobileBottomNav({ items, currentPath }: MobileBottomNavProps) {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Main Navigation"
      className="lg:hidden absolute bottom-0 w-full bg-white/95 dark:bg-[#1F1F1E]/95 backdrop-blur-md border-t border-slate-200/70 dark:border-[#2B2B2A] flex justify-around items-center px-1 pb-safe pt-1 h-16 z-20"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = isNavPathActive(item.path, currentPath, item.activePaths);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            type="button"
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            data-tour={item.tourId}
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
              <div className="transition-transform duration-200">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold mt-0.5 block whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-0.5">
                {item.label}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
