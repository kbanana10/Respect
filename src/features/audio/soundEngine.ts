/**
 * soundEngine.ts — Memory-safe Web Audio API synthesizer & reactive mute manager
 * for Kurdish Quest's playful kids & adults audio feedback.
 *
 * Design principles (Duolingo-inspired kids audio UX):
 * - Single shared AudioContext + master GainNode (zero per-click AudioContext leaks).
 * - Every OscillatorNode, BiquadFilterNode, and GainNode disconnects on `onended`.
 * - Auto-suspends AudioContext when the browser tab/app goes to background.
 * - Reactive mute state broadcast so header, sidebar, and quiz controls stay synced.
 * - Pairs sounds with subtle platform haptics (best-effort, non-blocking).
 */
import {
  getTapPopNotes,
  getSoftClickNotes,
  getSuccessChimeNotes,
  getGentleRetryNotes,
  getRewardSparkleNotes,
  getVictoryFanfareNotes,
  type SynthNoteSpec,
} from '../../domain/soundPresets';
import { getPlatform } from '../../platform';

const MUTE_STORAGE_KEY = 'quiz_audio_muted';

type MuteListener = (muted: boolean) => void;
const muteListeners = new Set<MuteListener>();

let sharedAudioCtx: AudioContext | null = null;
let masterGainNode: GainNode | null = null;
let visibilityHooked = false;

export function readMutePreference(): boolean {
  if (globalThis.window === undefined) return false;
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function writeMutePreference(muted: boolean): void {
  if (globalThis.window !== undefined) {
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(muted));
    } catch {
      /* ignore private-mode storage restrictions */
    }
  }
  if (masterGainNode && sharedAudioCtx) {
    try {
      masterGainNode.gain.setTargetAtTime(muted ? 0 : 1, sharedAudioCtx.currentTime, 0.015);
    } catch {
      /* ignore */
    }
  }
  muteListeners.forEach((cb) => cb(muted));
}

export function subscribeMutePreference(listener: MuteListener): () => void {
  muteListeners.add(listener);
  return () => {
    muteListeners.delete(listener);
  };
}

function ensureVisibilityCleanup(): void {
  if (visibilityHooked || globalThis.document === undefined) return;
  visibilityHooked = true;
  document.addEventListener('visibilitychange', () => {
    if (!sharedAudioCtx) return;
    if (document.visibilityState === 'hidden' && sharedAudioCtx.state === 'running') {
      void sharedAudioCtx.suspend().catch(() => undefined);
    }
  });
}

export function getSharedAudioContext(): AudioContext {
  if (!sharedAudioCtx) {
    // SAFETY: Legacy Safari exposes `webkitAudioContext` on Window when standard AudioContext is absent.
    const AudioContextCtor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      throw new Error('Web Audio API is not supported in this browser');
    }
    sharedAudioCtx = new AudioContextCtor();
    masterGainNode = sharedAudioCtx.createGain();
    masterGainNode.gain.value = readMutePreference() ? 0 : 1;
    masterGainNode.connect(sharedAudioCtx.destination);
    ensureVisibilityCleanup();
  }
  return sharedAudioCtx;
}

function scheduleNote(ctx: AudioContext, dest: AudioNode, t0: number, spec: SynthNoteSpec): void {
  const start = t0 + spec.delay;
  const end = start + spec.duration;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const nodesToDisconnect: AudioNode[] = [osc, gain];

  osc.type = spec.wave;
  osc.frequency.setValueAtTime(spec.freq, start);
  if (spec.endFreq !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, spec.endFreq), end);
  }

  // Smooth attack + natural exponential bell decay
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(spec.volume, start + Math.min(0.022, spec.duration * 0.25));
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  let outputNode: AudioNode = osc;
  if (spec.lowpassHz) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(spec.lowpassHz, start);
    osc.connect(filter);
    outputNode = filter;
    nodesToDisconnect.push(filter);
  }

  outputNode.connect(gain);
  gain.connect(dest);

  // Optional gentle bell harmonic overtone (gives warm marimba/glockenspiel sparkle)
  let harmonicOsc: OscillatorNode | null = null;
  let harmonicGain: GainNode | null = null;
  if (spec.harmonicMultiplier) {
    harmonicOsc = ctx.createOscillator();
    harmonicGain = ctx.createGain();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(spec.freq * spec.harmonicMultiplier, start);
    harmonicGain.gain.setValueAtTime(0.0001, start);
    harmonicGain.gain.linearRampToValueAtTime(spec.volume * 0.22, start + 0.015);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, start + spec.duration * 0.65);
    harmonicOsc.connect(harmonicGain);
    harmonicGain.connect(dest);
    nodesToDisconnect.push(harmonicOsc, harmonicGain);
  }

  osc.onended = () => {
    for (const node of nodesToDisconnect) {
      try {
        node.disconnect();
      } catch {
        /* already disconnected */
      }
    }
  };

  osc.start(start);
  osc.stop(end + 0.01);
  if (harmonicOsc) {
    harmonicOsc.start(start);
    harmonicOsc.stop(start + spec.duration * 0.68);
  }
}

function playNoteSequence(notes: readonly SynthNoteSpec[]): void {
  if (readMutePreference() || globalThis.window === undefined) return;
  try {
    const ctx = getSharedAudioContext();
    const dest = masterGainNode ?? ctx.destination;
    const run = () => {
      const now = ctx.currentTime;
      for (const note of notes) {
        scheduleNote(ctx, dest, now, note);
      }
    };
    if (ctx.state === 'suspended') {
      void ctx.resume().then(run).catch(() => undefined);
    } else {
      run();
    }
  } catch {
    // Web Audio unavailable (e.g., headless jsdom without AudioContext)
  }
}

function fireHaptic(style: 'light' | 'medium' | 'success'): void {
  try {
    void getPlatform().triggerHaptic(style).catch(() => undefined);
  } catch {
    /* haptics optional */
  }
}

/** Musical ascending pop when a child taps letters, cards, or tiles. */
export function triggerTapSound(stepIndex = 0): void {
  playNoteSequence(getTapPopNotes(stepIndex));
  fireHaptic('light');
}

/** Subtle crisp click for primary UI toggles and buttons. */
export function triggerButtonClickSound(): void {
  playNoteSequence(getSoftClickNotes());
}

/** Bright Duolingo-style chime that climbs in pitch with consecutive combo streaks. */
export function triggerSuccessSound(combo = 1): void {
  playNoteSequence(getSuccessChimeNotes(combo));
  fireHaptic('success');
}

/** Warm, gentle wooden retry tone (never a harsh buzzer). */
export function triggerGentleRetrySound(): void {
  playNoteSequence(getGentleRetryNotes());
  fireHaptic('light');
}

/** Sparkling chime for unlocking rewards, claiming stars/gems, or using hints. */
export function triggerRewardSound(): void {
  playNoteSequence(getRewardSparkleNotes());
  fireHaptic('success');
}

/** Triumphant lesson/game victory fanfare. */
export function triggerVictoryFanfare(): void {
  playNoteSequence(getVictoryFanfareNotes());
  fireHaptic('success');
}
