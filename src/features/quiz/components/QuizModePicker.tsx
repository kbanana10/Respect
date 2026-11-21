/**
 * QuizModePicker.tsx — Quiz mode selection hub.
 * All 4 modes (Word Quiz, Listening Quiz, Writing Quiz, Emoji Visual Quiz)
 * plus Adaptive Level Practice are 100% live — zero "Coming Soon" locks.
 */
import { ArrowLeft, Trophy, ChevronRight, Volume2, PenTool, Sparkles, BrainCircuit } from 'lucide-react';
import type { Language } from '../../../models/user';
import { t, pickLocalized } from '../../../localization/translations';
import { cn } from '../../../utils/cn';
import { Badge, Button } from '../../../components/ui';
import type { QuizMode } from '../types';

interface QuizModePickerProps {
  language: Language;
  userLevelId: string;
  showAdaptive: boolean;
  isKidsMode?: boolean;
  onSelectMode: (mode: QuizMode) => void;
  onBack: () => void;
  onLeaderboard: () => void;
}

export function QuizModePicker({
  language,
  userLevelId,
  showAdaptive,
  isKidsMode = false,
  onSelectMode,
  onBack,
  onLeaderboard,
}: QuizModePickerProps) {
  const labels = pickLocalized(language, {
    en: { back: 'Back', leaderboard: 'Leaderboard' },
    ar: { back: 'رجوع', leaderboard: 'قائمة المتصدرين' },
    ku: { back: 'Vegere', leaderboard: 'Tabloya Pêşengan' },
  });

  const modes = [
    {
      mode: 'multiple_choice' as const,
      icon: <span className="text-lg font-black">ABC</span>,
      tone: 'text-brand-alt',
      title: t(language, 'quiz_mode_word_title'),
      desc: t(language, 'quiz_mode_word_desc'),
    },
    {
      mode: 'listening' as const,
      icon: <Volume2 className="w-5 h-5" />,
      tone: 'text-brand',
      title: t(language, 'quiz_mode_listening_title'),
      desc: t(language, 'quiz_mode_listening_desc'),
    },
    {
      mode: 'emoji_match' as const,
      icon: <Sparkles className="w-5 h-5" />,
      tone: 'text-info',
      title: t(language, 'quiz_type_emoji'),
      desc: t(language, 'quiz_type_emoji_desc'),
    },
    {
      mode: 'write_kurdish' as const,
      icon: <PenTool className="w-5 h-5" />,
      tone: 'text-warning',
      title: t(language, 'quiz_mode_writing_title'),
      desc: t(language, 'quiz_mode_writing_desc'),
    },
  ];

  return (
    <div className="p-4 flex flex-col h-full absolute top-0 start-0 w-full bg-surface-2 text-ink z-50 font-sans leading-relaxed overflow-y-auto pb-24">
      <div className="flex items-center justify-between gap-3 py-3 mb-4 max-w-md mx-auto w-full">
        <Button
          variant="secondary"
          size="sm"
          onClick={onBack}
          aria-label={labels.back}
          className="shrink-0 w-11 !px-0 rounded-full"
        >
          <ArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
        </Button>

        <h1 className="text-xl font-black text-ink truncate">{t(language, 'quiz_hub_title')}</h1>

        {isKidsMode ? (
          <span className="w-11 shrink-0" />
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={onLeaderboard}
            aria-label={labels.leaderboard}
            className="shrink-0 w-11 !px-0 rounded-full text-warning"
          >
            <Trophy className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="mb-5 max-w-md mx-auto w-full px-1">
        <h2 className="text-2xl font-black text-ink tracking-tight">{t(language, 'quiz_choose_title')}</h2>
        <p className="text-sm text-muted font-bold mt-1">{t(language, 'quiz_choose_sub')}</p>
      </div>

      <div className="space-y-3 flex-1 max-w-md mx-auto w-full">
        {showAdaptive && (
          <button
            type="button"
            onClick={() => onSelectMode('adaptive_practice')}
            aria-label={`${t(language, 'quiz_mode_adaptive_title')}. ${t(language, 'quiz_mode_adaptive_desc')}`}
            className={cn(
              'w-full bg-surface border-2 border-brand/60 rounded-card p-4 shadow-flat',
              'flex items-center justify-between gap-3 text-start cursor-pointer',
              'min-h-[56px] transition-[transform,border-color] hover:-translate-y-0.5 hover:border-brand',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
            )}
          >
            <span className="flex items-center gap-3.5 min-w-0">
              <span
                className="w-12 h-12 rounded-control bg-[#FFF6E0] dark:bg-[#3A2F14] text-brand flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <BrainCircuit className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-black text-ink text-base leading-tight whitespace-nowrap">
                    {t(language, 'quiz_mode_adaptive_title')}
                  </span>
                  <Badge tone="primary" className="tracking-normal shrink-0">
                    {userLevelId} · {t(language, 'quiz_personalized_badge')}
                  </Badge>
                </span>
                <span className="text-muted text-xs mt-1 font-bold block">
                  {t(language, 'quiz_mode_adaptive_desc')}
                </span>
              </span>
            </span>
            <ChevronRight className="w-5 h-5 text-muted shrink-0 rtl:rotate-180" aria-hidden="true" />
          </button>
        )}

        {modes.map((opt) => (
          <button
            key={opt.mode}
            type="button"
            onClick={() => onSelectMode(opt.mode)}
            aria-label={`${opt.title}. ${opt.desc}`}
            className={cn(
              'w-full bg-surface border-2 border-line rounded-card p-4 shadow-flat',
              'flex items-center justify-between gap-3 text-start cursor-pointer',
              'min-h-[56px] transition-[transform,border-color] hover:-translate-y-0.5 hover:border-line-soft',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
            )}
          >
            <span className="flex items-center gap-3.5 min-w-0">
              <span
                className={cn(
                  'w-12 h-12 rounded-control bg-surface-2 flex items-center justify-center shrink-0',
                  opt.tone,
                )}
                aria-hidden="true"
              >
                {opt.icon}
              </span>
              <span className="min-w-0">
                <span className="font-black text-ink text-base leading-tight block">{opt.title}</span>
                <span className="text-muted text-xs mt-1 font-bold block">{opt.desc}</span>
              </span>
            </span>
            <ChevronRight className="w-5 h-5 text-muted shrink-0 rtl:rotate-180" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
