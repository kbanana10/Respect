/**
 * soundPresets.ts — Pure, deterministic musical note & envelope presets for
 * Duolingo-style kids educational audio feedback.
 *
 * Kept 100% free of browser/DOM APIs so pitch math, combo escalation, and
 * Kids Mode rules can be unit-tested deterministically via `node:test`.
 */
import type { LearnerMode } from '../models/user';

export interface SynthNoteSpec {
  /** Base frequency in Hz. */
  readonly freq: number;
  /** Optional end frequency for gentle pitch glide (e.g., bubble pop or soft retry). */
  readonly endFreq?: number;
  /** Offset in seconds from trigger time. */
  readonly delay: number;
  /** Note duration in seconds. */
  readonly duration: number;
  /** Peak gain (0..1), kept comfortable for children's ears. */
  readonly volume: number;
  /** Primary oscillator waveform. */
  readonly wave: 'sine' | 'triangle';
  /** Optional bell-like harmonic overtone multiplier (e.g., 2 for octave shimmer). */
  readonly harmonicMultiplier?: number;
  /** Optional lowpass cutoff in Hz to keep tones warm and non-piercing. */
  readonly lowpassHz?: number;
}

/** C-major pentatonic scale (bright, joyful, zero dissonance for kids). */
const PENTATONIC_TAP_SCALE_HZ: readonly number[] = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.0,  // A5
  1046.5, // C6
  1174.66, // D6
  1318.51, // E6
];

/**
 * Ascending musical bubble/marimba pop for sequential letter taps, tile taps,
 * and memory card flips. Loops gracefully at the top of the pentatonic octave.
 */
export function getTapPopNotes(stepIndex = 0): readonly SynthNoteSpec[] {
  const safeIdx = Math.max(0, Math.floor(stepIndex));
  const base = PENTATONIC_TAP_SCALE_HZ[safeIdx % PENTATONIC_TAP_SCALE_HZ.length];
  return [
    {
      freq: base * 0.92,
      endFreq: base * 1.04,
      delay: 0,
      duration: 0.085,
      volume: 0.13,
      wave: 'sine',
      harmonicMultiplier: 2,
      lowpassHz: 2400,
    },
  ];
}

/**
 * Crisp, soft tactile click for UI buttons and navigation switches.
 */
export function getSoftClickNotes(): readonly SynthNoteSpec[] {
  return [
    {
      freq: 620,
      endFreq: 740,
      delay: 0,
      duration: 0.045,
      volume: 0.075,
      wave: 'sine',
      lowpassHz: 1800,
    },
  ];
}

/**
 * Duolingo-inspired bright "WaBing!" positive chime.
 * Escalates smoothly in pitch as the child builds a combo streak (clamped so
 * it stays warm and never becomes piercing).
 */
export function getSuccessChimeNotes(combo = 1): readonly SynthNoteSpec[] {
  const clampedCombo = Math.max(1, Math.min(6, Math.floor(combo)));
  // Shift up by 1 semitone per streak step (2^(1/12) ≈ 1.05946)
  const pitchFactor = Math.pow(2, (clampedCombo - 1) / 12);

  const notes: SynthNoteSpec[] = [
    {
      freq: 523.25 * pitchFactor, // C5 root
      delay: 0,
      duration: 0.14,
      volume: 0.14,
      wave: 'triangle',
      harmonicMultiplier: 2,
      lowpassHz: 2800,
    },
    {
      freq: 659.25 * pitchFactor, // E5 major third
      delay: 0.065,
      duration: 0.16,
      volume: 0.15,
      wave: 'triangle',
      harmonicMultiplier: 2,
      lowpassHz: 3000,
    },
    {
      freq: 783.99 * pitchFactor, // G5 fifth ring
      delay: 0.13,
      duration: 0.28,
      volume: 0.17,
      wave: 'sine',
      harmonicMultiplier: 2,
      lowpassHz: 3200,
    },
  ];

  // At 3+ combo streak, add an extra sparkling octave bell!
  if (clampedCombo >= 3) {
    notes.push({
      freq: 1046.5 * pitchFactor,
      delay: 0.2,
      duration: 0.34,
      volume: 0.14,
      wave: 'sine',
      lowpassHz: 3600,
    });
  }

  return notes;
}

/**
 * Warm, forgiving wooden "boop-boop" when a child needs another try.
 * Deliberately avoids harsh buzzer waveforms or jarring dissonances.
 */
export function getGentleRetryNotes(): readonly SynthNoteSpec[] {
  return [
    {
      freq: 329.63, // E4
      endFreq: 293.66, // D4
      delay: 0,
      duration: 0.13,
      volume: 0.11,
      wave: 'triangle',
      lowpassHz: 680,
    },
    {
      freq: 261.63, // C4
      endFreq: 233.08, // Bb3 gentle settle
      delay: 0.11,
      duration: 0.19,
      volume: 0.1,
      wave: 'sine',
      lowpassHz: 560,
    },
  ];
}

/**
 * Sparkling coin / gem / star unlock chime (Store unlocks, mission claims, hints).
 */
export function getRewardSparkleNotes(): readonly SynthNoteSpec[] {
  return [
    { freq: 880.0, delay: 0, duration: 0.12, volume: 0.12, wave: 'sine', harmonicMultiplier: 2 },
    { freq: 1174.66, delay: 0.06, duration: 0.14, volume: 0.13, wave: 'sine', harmonicMultiplier: 2 },
    { freq: 1318.51, delay: 0.12, duration: 0.16, volume: 0.14, wave: 'sine', lowpassHz: 3400 },
    { freq: 1760.0, delay: 0.18, duration: 0.3, volume: 0.12, wave: 'sine', lowpassHz: 3600 },
  ];
}

/**
 * Celebratory Duolingo-style lesson / game victory fanfare (ascending triad + joyful resolve).
 */
export function getVictoryFanfareNotes(): readonly SynthNoteSpec[] {
  return [
    { freq: 523.25, delay: 0, duration: 0.18, volume: 0.14, wave: 'triangle', harmonicMultiplier: 2, lowpassHz: 2600 },
    { freq: 659.25, delay: 0.09, duration: 0.18, volume: 0.14, wave: 'triangle', harmonicMultiplier: 2, lowpassHz: 2800 },
    { freq: 783.99, delay: 0.18, duration: 0.22, volume: 0.15, wave: 'triangle', harmonicMultiplier: 2, lowpassHz: 3000 },
    { freq: 1046.5, delay: 0.28, duration: 0.55, volume: 0.18, wave: 'sine', harmonicMultiplier: 2, lowpassHz: 3400 },
    // Warm supporting harmony chord on the landing note
    { freq: 523.25, delay: 0.28, duration: 0.5, volume: 0.09, wave: 'sine', lowpassHz: 2000 },
    { freq: 659.25, delay: 0.28, duration: 0.5, volume: 0.09, wave: 'sine', lowpassHz: 2200 },
    // Final tiny star twinkle
    { freq: 1318.51, delay: 0.44, duration: 0.38, volume: 0.11, wave: 'sine', lowpassHz: 3600 },
  ];
}

/**
 * Kids Mode uses forgiving, heart-free practice so children aged 5–12 never
 * get locked out mid-lesson by mistakes. Review/SRS drills are also heart-free.
 */
export function shouldEnableQuizHearts(
  moduleId: string | undefined,
  learnerMode: LearnerMode | undefined,
): boolean {
  if (learnerMode === 'kids') return false;
  if (moduleId === 'srs_review' || moduleId === 'review_due' || moduleId === 'review_mistakes') {
    return false;
  }
  return true;
}
