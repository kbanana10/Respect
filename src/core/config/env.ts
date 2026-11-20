/**
 * env.ts — Typed Runtime & Environment Configuration (Core Layer)
 *
 * Centralizes all build-time and runtime configuration in one validated module.
 * Never reads or bundles server-side secrets (such as GEMINI_API_KEY).
 */

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  measurementId?: string;
  firestoreDatabaseId?: string;
}

export interface AppConfig {
  readonly appName: string;
  readonly appVersion: string;
  readonly schemaVersion: number;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly isTest: boolean;
  readonly firebase: FirebaseClientConfig | null;
  readonly isFirebaseConfigured: boolean;
}

function readMetaEnv(): Record<string, string | boolean | undefined> {
  try {
    return (import.meta.env ?? {}) as Record<string, string | boolean | undefined>;
  } catch {
    return {};
  }
}

export function readFirebaseEnvConfig(
  env: Record<string, string | boolean | undefined> = readMetaEnv(),
): FirebaseClientConfig | null {
  const apiKey = typeof env.VITE_FIREBASE_API_KEY === 'string' ? env.VITE_FIREBASE_API_KEY.trim() : '';
  const authDomain = typeof env.VITE_FIREBASE_AUTH_DOMAIN === 'string' ? env.VITE_FIREBASE_AUTH_DOMAIN.trim() : '';
  const projectId = typeof env.VITE_FIREBASE_PROJECT_ID === 'string' ? env.VITE_FIREBASE_PROJECT_ID.trim() : '';
  const appId = typeof env.VITE_FIREBASE_APP_ID === 'string' ? env.VITE_FIREBASE_APP_ID.trim() : '';

  if (!apiKey || !authDomain || !projectId || !appId) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    appId,
    storageBucket: typeof env.VITE_FIREBASE_STORAGE_BUCKET === 'string' ? env.VITE_FIREBASE_STORAGE_BUCKET.trim() : undefined,
    messagingSenderId: typeof env.VITE_FIREBASE_MESSAGING_SENDER_ID === 'string' ? env.VITE_FIREBASE_MESSAGING_SENDER_ID.trim() : undefined,
    measurementId: typeof env.VITE_FIREBASE_MEASUREMENT_ID === 'string' ? env.VITE_FIREBASE_MEASUREMENT_ID.trim() : undefined,
    firestoreDatabaseId: typeof env.VITE_FIREBASE_FIRESTORE_DATABASE_ID === 'string' ? env.VITE_FIREBASE_FIRESTORE_DATABASE_ID.trim() : undefined,
  };
}

export function createAppConfig(
  env: Record<string, string | boolean | undefined> = readMetaEnv(),
): AppConfig {
  const firebase = readFirebaseEnvConfig(env);
  const mode = typeof env.MODE === 'string' ? env.MODE : 'development';
  const isTest = mode === 'test' || Boolean(env.VITEST);
  const isProduction = Boolean(env.PROD) || mode === 'production';

  return {
    appName: 'Kurdish Quest',
    appVersion: '2.0.0',
    schemaVersion: 3,
    isProduction,
    isDevelopment: !isProduction && !isTest,
    isTest,
    firebase,
    isFirebaseConfigured: firebase !== null,
  };
}

export const appConfig: AppConfig = createAppConfig();
