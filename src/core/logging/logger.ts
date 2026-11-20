/**
 * logger.ts — Structured, Privacy-Safe Application Logger (Core Layer)
 *
 * Redacts sensitive fields (tokens, keys, emails, passwords) before logging or
 * storing in the bounded diagnostic ring buffer.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  readonly timestamp: number;
  readonly level: LogLevel;
  readonly scope: string;
  readonly message: string;
  readonly meta?: Record<string, unknown>;
}

const SENSITIVE_KEY_PATTERN = /token|secret|password|apikey|api_key|auth|credential|email/i;
const MAX_BUFFER_SIZE = 100;

const ringBuffer: LogEntry[] = [];

function sanitizeMeta(meta?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!meta) return undefined;
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (SENSITIVE_KEY_PATTERN.test(key)) {
      clean[key] = '[REDACTED]';
    } else if (value instanceof Error) {
      clean[key] = { name: value.name, message: value.message };
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

function recordEntry(entry: LogEntry): void {
  ringBuffer.push(entry);
  if (ringBuffer.length > MAX_BUFFER_SIZE) {
    ringBuffer.shift();
  }
}

export interface ScopedLogger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

export function createLogger(scope: string): ScopedLogger {
  const emit = (level: LogLevel, message: string, meta?: Record<string, unknown>): void => {
    const cleanMeta = sanitizeMeta(meta);
    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      scope,
      message,
      meta: cleanMeta,
    };
    recordEntry(entry);

    const isTest = typeof process !== 'undefined' && Boolean(process.env?.VITEST);
    if (isTest && (level === 'debug' || level === 'info')) {
      return;
    }

    const prefix = `[KQ:${scope}] ${message}`;
    if (level === 'error') {
      console.error(prefix, cleanMeta ?? '');
    } else if (level === 'warn') {
      console.warn(prefix, cleanMeta ?? '');
    } else if (level === 'info') {
      console.info(prefix, cleanMeta ?? '');
    }
  };

  return {
    debug: (message, meta) => emit('debug', message, meta),
    info: (message, meta) => emit('info', message, meta),
    warn: (message, meta) => emit('warn', message, meta),
    error: (message, meta) => emit('error', message, meta),
  };
}

export function getRecentLogs(): readonly LogEntry[] {
  return [...ringBuffer];
}

export function clearLogBuffer(): void {
  ringBuffer.length = 0;
}
