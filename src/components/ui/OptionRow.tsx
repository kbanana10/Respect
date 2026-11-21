/**
 * OptionRow.tsx — Accessible tactile selection row (`aria-pressed`)
 */
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface OptionRowProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  tone?: string;
  title: string;
  desc?: string;
  badge?: string;
  className?: string;
}

export function OptionRow({
  active,
  onClick,
  icon,
  tone = 'bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#B8860B] dark:text-[#FFCE6B]',
  title,
  desc,
  badge,
  className,
}: OptionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'w-full p-4 min-h-[60px] rounded-3xl border-2 flex items-center gap-3.5 transition-all cursor-pointer text-start bg-white dark:bg-slate-900',
        active
          ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14] shadow-[0_4px_20px_rgba(255,179,0,0.15)]'
          : 'border-line-soft dark:border-slate-800 hover:border-[#FFB300]/50 shadow-[0_2px_10px_rgba(0,0,0,0.03)]',
        className,
      )}
    >
      <span
        className={cn('w-11 h-11 rounded-2xl flex items-center justify-center shrink-0', tone)}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="flex items-center gap-2 flex-wrap">
          <span className="font-black text-sm text-ink leading-snug">{title}</span>
          {badge && (
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
              {badge}
            </span>
          )}
        </span>
        {desc && (
          <span className="block text-xs text-muted font-semibold mt-0.5 leading-relaxed">
            {desc}
          </span>
        )}
      </span>
      <span
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all',
          active
            ? 'bg-[#FFB300] text-[#432C00]'
            : 'bg-slate-100 dark:bg-slate-800 text-transparent',
        )}
        aria-hidden="true"
      >
        <Check className="w-3.5 h-3.5 stroke-[3.5]" />
      </span>
    </button>
  );
}
