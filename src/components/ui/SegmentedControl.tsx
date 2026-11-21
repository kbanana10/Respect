/**
 * SegmentedControl.tsx — Accessible segmented tab switcher
 */
import React from 'react';
import { cn } from '../../utils/cn';

interface SegmentedOption<T extends string> {
  readonly value: T;
  readonly label: string;
  readonly icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'flex bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl gap-1 border border-line-soft dark:border-slate-700',
        className,
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap',
              selected
                ? 'bg-white dark:bg-slate-900 text-[#8A6100] dark:text-[#FFCE6B] shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-ink',
            )}
          >
            {opt.icon && <span aria-hidden="true">{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
