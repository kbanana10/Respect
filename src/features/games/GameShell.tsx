/**
 * GameShell.tsx — Unified Games Arcade HUD & End-of-Round Summary.
 *
 * Provides a consistent top bar across games: Exit, Score/Stars, optional
 * Timer toggle (OFF by default in Kids Mode), Sound mute toggle, Pause modal,
 * and an End-of-Round Celebration with Missed Words Audio Review.
 */
import React, { useState } from 'react';
import {
  ArrowLeft, Pause, Play, Volume2, VolumeX, Clock, RotateCcw, Trophy, Star,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { t, pickLocalized } from '../../localization/translations';
import { getMuteState, setMuteState } from '../audio/hooks/useAudio';
import { AudioButton } from '../audio/components/AudioButton';
import { Modal, Button } from '../../components/ui';
import type { GameVocabItem } from './curriculumWords';

export interface GameShellProps {
  title: string;
  scoreLabel: string;
  scoreValue: number | string;
  onExit: () => void;
  onRestart: () => void;
  timerEnabled?: boolean;
  onToggleTimer?: () => void;
  elapsedSeconds?: number;
  finished?: boolean;
  earnedXp?: number;
  missedWords?: readonly GameVocabItem[];
  children: React.ReactNode;
}

export function GameShell({
  title,
  scoreLabel,
  scoreValue,
  onExit,
  onRestart,
  timerEnabled,
  onToggleTimer,
  elapsedSeconds,
  finished = false,
  earnedXp = 15,
  missedWords = [],
  children,
}: GameShellProps) {
  const { language } = useAuth();
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState<boolean>(() => getMuteState());

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setMuteState(next);
  };

  const pauseLabel = pickLocalized(language, {
    en: 'Pause game',
    ar: 'إيقاف مؤقت',
    ku: 'Lîstikê rawestîne',
  });

  const playAgainLabel = pickLocalized(language, {
    en: 'Play Again',
    ar: 'العب مجدداً',
    ku: 'Dîsa Bilîze',
  });

  return (
    <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto px-4 pt-4 pb-8 space-y-4">
      {/* Unified HUD Header */}
      <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl px-3 py-2.5 flex items-center justify-between gap-2 shadow-flat">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onExit}
            aria-label={t(language, 'game_exit')}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-muted hover:text-ink cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <h2 className="font-black text-sm sm:text-base text-ink truncate">{title}</h2>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onToggleTimer && (
            <button
              type="button"
              onClick={onToggleTimer}
              aria-pressed={Boolean(timerEnabled)}
              title={timerEnabled ? t(language, 'game_timer_on') : t(language, 'game_timer_off')}
              className={`min-h-[40px] px-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1 cursor-pointer border ${
                timerEnabled
                  ? 'bg-[#FFF6E0] dark:bg-[#3A2F14] border-[#FFB300]/40 text-[#8A6100] dark:text-[#FFCE6B]'
                  : 'bg-slate-100 dark:bg-slate-800 border-transparent text-muted'
              }`}
            >
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {timerEnabled && elapsedSeconds !== undefined ? (
                <span className="tabular-nums font-mono">{elapsedSeconds}s</span>
              ) : (
                <span className="hidden sm:inline">{t(language, 'game_timer_off')}</span>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? t(language, 'game_sound_off') : t(language, 'game_sound_on')}
            aria-pressed={!muted}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-muted hover:text-ink cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setPaused(true)}
            aria-label={pauseLabel}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-muted hover:text-ink cursor-pointer"
          >
            <Pause className="w-4 h-4" />
          </button>

          <div className="bg-[#FFF6E0] dark:bg-[#3A2F14] border border-[#FFB300]/40 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#FFB300] fill-[#FFB300]" aria-hidden="true" />
            <span className="text-xs font-black text-ink tabular-nums">
              {scoreValue}
            </span>
            <span className="sr-only">{scoreLabel}</span>
          </div>
        </div>
      </div>

      {/* Main Content or End-of-Round Summary */}
      {finished ? (
        <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-flat">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Trophy className="w-9 h-9" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-ink">{t(language, 'game_well_done')}</h3>
            <p className="text-sm font-extrabold text-[#8A6100] dark:text-[#FFCE6B] tabular-nums">
              +{earnedXp} XP · {scoreLabel}: {scoreValue}
            </p>
          </div>

          {missedWords.length > 0 && (
            <div className="text-start bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-4 space-y-2.5">
              <div className="text-xs font-black text-muted uppercase tracking-wider">
                {t(language, 'game_missed_words')}
              </div>
              <div className="space-y-2">
                {missedWords.map((w) => (
                  <div
                    key={w.id}
                    className="flex items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-xl p-2.5 border border-line-soft dark:border-slate-800"
                  >
                    <div className="min-w-0">
                      <div className="font-black text-sm text-ink" dir="ltr">{w.ku}</div>
                      <div className="text-xs text-muted font-semibold">
                        {pickLocalized(language, { en: w.en, ar: w.ar, ku: `${w.en} · ${w.ar}` })}
                      </div>
                    </div>
                    <AudioButton textToSpeak={w.ku} className="shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={onExit}>
              {t(language, 'game_exit')}
            </Button>
            <Button variant="primary" fullWidth onClick={onRestart}>
              <RotateCcw className="w-4 h-4 me-1.5 inline" />
              {playAgainLabel}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">{children}</div>
      )}

      {/* Pause Modal */}
      <Modal
        open={paused}
        onClose={() => setPaused(false)}
        title={t(language, 'game_pause')}
      >
        <div className="space-y-3">
          <Button variant="primary" fullWidth onClick={() => setPaused(false)}>
            <Play className="w-4 h-4 me-1.5 inline" />
            {t(language, 'game_resume')}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              setPaused(false);
              onRestart();
            }}
          >
            <RotateCcw className="w-4 h-4 me-1.5 inline" />
            {t(language, 'game_restart')}
          </Button>
          <Button variant="danger" fullWidth onClick={onExit}>
            {t(language, 'game_exit')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
