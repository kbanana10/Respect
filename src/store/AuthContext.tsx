/**
 * AuthContext.tsx — Thin Application-Layer Auth & Progress State Adapter
 *
 * Delegates domain progression to `applyProgressDelta`, schema migration to
 * `migrateUserData`, offline persistence to `offlineStorage`, background cloud
 * sync to `syncEngine`, and native/web platform capabilities to `getPlatform()`.
 */
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import type { User, UserData, Language } from '../models/user';
import { db, auth, googleProvider, isFirebaseConfigured } from '../lib/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { applyProgressDelta } from '../domain/rules/progressEngine';
import { createDefaultUserData, migrateUserData } from '../domain/schema/migrations';
import { offlineStorage } from '../services/OfflineStorageService';
import { syncEngine } from '../services/SyncEngine';
import { getPlatform } from '../platform';
import { createLogger } from '../core/logging/logger';

const log = createLogger('AuthContext');

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  /** Non-null when the initial profile load failed; pages can surface ErrorState. */
  profileError: string | null;
  /** Re-runs the auth/profile load after a failure. */
  retryProfileLoad: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  signInWithName: (name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProgress: (
    xpToAdd: number,
    wordsToAdd: number,
    quizCompleted?: boolean,
    gemsToAdd?: number,
    opts?: { source?: 'quiz' | 'game'; perfect?: boolean },
  ) => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  updateProfileName: (name: string) => Promise<void>;
  importBackupData: (
    restoredData: UserData,
    profile?: { displayName?: string; language?: Language; theme?: 'light' | 'dark' },
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  profileError: null,
  retryProfileLoad: () => {},
  language: 'en',
  setLanguage: () => {},
  theme: 'light',
  toggleTheme: () => {},
  signInWithName: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  updateUserProgress: async () => {},
  updateUserData: async () => {},
  updateProfileName: async () => {},
  importBackupData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

function applyDocumentDirection(lang: Language): void {
  if (globalThis.document === undefined) return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function applyDocumentTheme(nextTheme: 'light' | 'dark'): void {
  if (globalThis.document !== undefined) {
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  void getPlatform().syncStatusBar(nextTheme);
}

function applyDocumentLearnerMode(mode: 'kids' | 'adults', accent: string): void {
  if (globalThis.document === undefined) return;
  document.documentElement.dataset.learnerMode = mode;
  document.documentElement.dataset.accent = accent;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('kurdish_quest_user');
      // SAFETY: `kurdish_quest_user` is exclusively written by AuthContext with a serialized `User` object.
      return storedUser ? (JSON.parse(storedUser) as User) : null;
    } catch {
      return null;
    }
  });

  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const stored =
        localStorage.getItem('kurmanji_user_data_v2') ||
        localStorage.getItem('kurdish_quest_data');
      if (stored) {
        return migrateUserData(JSON.parse(stored)).data;
      }
    } catch {
      // Fallback to fresh defaults
    }
    return createDefaultUserData();
  });

  // Synchronous ref avoids lost-update races when updateUserProgress and
  // updateUserData are invoked back-to-back in the same tick.
  const userDataRef = useRef<UserData>(userData);
  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('kurdish_quest_lang');
      if (stored === 'en' || stored === 'ar' || stored === 'ku') return stored;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('kurdish_quest_theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // ignore
    }
    return 'light';
  });

  // Initialize platform shell (StatusBar, Keyboard, SplashScreen) & sync DOM dir/theme
  useEffect(() => {
    applyDocumentDirection(language);
  }, [language]);

  useEffect(() => {
    applyDocumentTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyDocumentLearnerMode(userData.learnerMode ?? 'adults', userData.activeAccent ?? 'gold');
  }, [userData.learnerMode, userData.activeAccent]);

  const initialThemeRef = useRef(theme);
  useEffect(() => {
    void getPlatform().initialize(initialThemeRef.current);
  }, []);

  // Only probe Firestore when a real Firebase project is configured via env.
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    async function testConnection() {
      try {
        await getDoc(doc(db, 'test', 'connection'));
      } catch (error) {
        log.debug('Firestore startup probe operating in offline/fallback mode', { error: error instanceof Error ? error : String(error) });
      }
    }
    void testConnection();
  }, []);

  // Listen to Firebase Auth state with IndexedDB migration & additive merge
  useEffect(() => {
    const loadProfile = async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const simplifiedUser: User = {
          displayName: firebaseUser.displayName || firebaseUser.email || 'Learner',
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL,
        };
        setUser(simplifiedUser);
        localStorage.setItem('kurdish_quest_user', JSON.stringify(simplifiedUser));

        const docRef = doc(db, 'users', firebaseUser.uid);
        let cloudData: UserData | null = null;
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            cloudData = migrateUserData(docSnap.data()).data;
          }
        } catch (e) {
          log.warn('Firestore profile pull skipped (offline/cold start)', { err: e instanceof Error ? e : String(e) });
        }

        const localDataObj = await offlineStorage.getUserData();

        if (cloudData && localDataObj) {
          const merged = syncEngine.mergeUserDataAdditive(localDataObj, cloudData);
          userDataRef.current = merged;
          setUserData(merged);
          await offlineStorage.saveUserData(merged);

          if (navigator.onLine) {
            try {
              await setDoc(docRef, merged, { merge: true });
            } catch (err) {
              log.warn('Failed pushing merged profile to cloud', { err: err instanceof Error ? err : String(err) });
            }
          }
        } else if (cloudData) {
          userDataRef.current = cloudData;
          setUserData(cloudData);
          await offlineStorage.saveUserData(cloudData);
        } else {
          const finalProfile = localDataObj || createDefaultUserData();
          userDataRef.current = finalProfile;
          setUserData(finalProfile);
          await offlineStorage.saveUserData(finalProfile);
          if (navigator.onLine) {
            try {
              await setDoc(docRef, finalProfile);
            } catch (err) {
              log.warn('Failed creating cloud profile on initial sign-in', { err: err instanceof Error ? err : String(err) });
            }
          }
        }

        if (navigator.onLine) {
          void syncEngine.processQueue(firebaseUser.uid);
        }
      } else {
        // Guest / Local profile mode
        const storedUser = localStorage.getItem('kurdish_quest_user');
        let parsed: User | null = null;
        if (storedUser) {
          try {
            // SAFETY: `kurdish_quest_user` is exclusively written by AuthContext with a serialized `User` object.
            parsed = JSON.parse(storedUser) as User;
          } catch {
            log.warn('Corrupt kurdish_quest_user in localStorage — clearing.');
            localStorage.removeItem('kurdish_quest_user');
          }
        }

        const localDataObj = await offlineStorage.getUserData();

        // Support ?autostart=1 for deterministic direct-to-dashboard sessions
        const isAutostart =
          globalThis.window !== undefined &&
          new URLSearchParams(window.location.search).get('autostart') === '1';

        if (!parsed && isAutostart) {
          parsed = { displayName: 'Dilan', uid: 'local_user' };
          localStorage.setItem('kurdish_quest_user', JSON.stringify(parsed));
        }

        setUser(parsed && parsed.uid === 'local_user' ? parsed : null);

        if (localDataObj) {
          const nextData = isAutostart && localDataObj.isOnboarded === false
            ? { ...localDataObj, isOnboarded: true, dailyGoalXp: localDataObj.dailyGoalXp ?? 50 }
            : localDataObj;
          userDataRef.current = nextData;
          setUserData(nextData);
          if (nextData !== localDataObj) {
            await offlineStorage.saveUserData(nextData);
          }
        } else {
          const defaultData = createDefaultUserData();
          if (isAutostart) {
            defaultData.isOnboarded = true;
            defaultData.dailyGoalXp = 50;
          }
          userDataRef.current = defaultData;
          setUserData(defaultData);
          await offlineStorage.saveUserData(defaultData);
        }
      }
      setProfileError(null);
    };

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      loadProfile(firebaseUser)
        .catch((err) => {
          log.error('Profile load failed', { err: err instanceof Error ? err : String(err) });
          setProfileError(err instanceof Error ? err.message : String(err));
        })
        .finally(() => setLoading(false));
    });

    return () => unsubscribe();
  }, [reloadNonce]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('kurdish_quest_theme', nextTheme);
      } catch {
        // ignore
      }
      applyDocumentTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  const signInWithName = useCallback(async (name: string) => {
    const cleanName = name.trim().slice(0, 60) || 'Learner';
    const newUser: User = { displayName: cleanName, uid: 'local_user' };
    setUser(newUser);
    localStorage.setItem('kurdish_quest_user', JSON.stringify(newUser));

    const localDataObj = await offlineStorage.getUserData();
    if (localDataObj) {
      userDataRef.current = localDataObj;
      setUserData(localDataObj);
    } else {
      const fresh = createDefaultUserData();
      userDataRef.current = fresh;
      setUserData(fresh);
      await offlineStorage.saveUserData(fresh);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      log.error('Popup login error', { err: e instanceof Error ? e : String(e) });
      throw e;
    }
  }, []);

  const updateProfileName = useCallback(
    async (name: string) => {
      if (!user) return;
      const cleanName = name.trim().slice(0, 60) || 'Learner';
      const updated = { ...user, displayName: cleanName };
      setUser(updated);
      localStorage.setItem('kurdish_quest_user', JSON.stringify(updated));

      if (auth.currentUser) {
        try {
          await updateProfile(auth.currentUser, { displayName: cleanName });
        } catch (err) {
          log.warn('Could not save display name on Firebase auth account', { err: err instanceof Error ? err : String(err) });
        }
      }
    },
    [user],
  );

  const logout = useCallback(async () => {
    setUser(null);
    const fresh = createDefaultUserData();
    userDataRef.current = fresh;
    setUserData(fresh);
    localStorage.removeItem('kurdish_quest_user');
    try {
      await signOut(auth);
    } catch (e) {
      log.warn('Sign out err', { err: e instanceof Error ? e : String(e) });
    }
  }, []);

  const updateUserProgress = useCallback(
    async (
      xpToAdd: number,
      wordsToAdd: number,
      quizCompleted = false,
      gemsToAdd = 0,
      opts?: { source?: 'quiz' | 'game'; perfect?: boolean },
    ) => {
      const currentData = userDataRef.current || userData || createDefaultUserData();
      const updatedData = applyProgressDelta(currentData, {
        xpToAdd,
        wordsToAdd,
        quizCompleted,
        gemsToAdd,
        source: opts?.source,
        perfect: opts?.perfect,
      });

      userDataRef.current = updatedData;
      setUserData(updatedData);
      await offlineStorage.saveUserData(updatedData);

      if (user && user.uid !== 'local_user') {
        if (navigator.onLine) {
          try {
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, updatedData, { merge: true });
          } catch {
            await offlineStorage.enqueueMutation({
              userId: user.uid,
              type: 'UPDATE_PROGRESS',
              payload: { xpToAdd, wordsToAdd, quizCompleted, gemsToAdd },
            });
          }
        } else {
          await offlineStorage.enqueueMutation({
            userId: user.uid,
            type: 'UPDATE_PROGRESS',
            payload: { xpToAdd, wordsToAdd, quizCompleted, gemsToAdd },
          });
        }
      }
    },
    [user, userData],
  );

  const updateUserData = useCallback(
    async (data: Partial<UserData>) => {
      const currentData = userDataRef.current || userData || createDefaultUserData();
      const updatedData: UserData = {
        ...currentData,
        ...data,
        updatedAt: Date.now(),
      };

      userDataRef.current = updatedData;
      setUserData(updatedData);
      await offlineStorage.saveUserData(updatedData);

      if (user && user.uid !== 'local_user') {
        if (navigator.onLine) {
          try {
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, updatedData, { merge: true });
          } catch {
            await offlineStorage.enqueueMutation({
              userId: user.uid,
              type: 'UPDATE_PROGRESS',
              payload: { data },
            });
          }
        } else {
          await offlineStorage.enqueueMutation({
            userId: user.uid,
            type: 'UPDATE_PROGRESS',
            payload: { data },
          });
        }
      }
    },
    [user, userData],
  );

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kurdish_quest_lang', lang);
    } catch {
      // ignore
    }
    applyDocumentDirection(lang);
  }, []);

  const importBackupData = useCallback(
    async (
      restoredData: UserData,
      profile?: { displayName?: string; language?: Language; theme?: 'light' | 'dark' },
    ) => {
      const migrated = migrateUserData(restoredData).data;
      userDataRef.current = migrated;
      setUserData(migrated);
      await offlineStorage.saveUserData(migrated);

      if (profile?.language) {
        setLanguage(profile.language);
      }
      if (profile?.theme) {
        setThemeState(profile.theme);
        try {
          localStorage.setItem('kurdish_quest_theme', profile.theme);
        } catch {
          // ignore
        }
        applyDocumentTheme(profile.theme);
      }
      if (profile?.displayName && user) {
        await updateProfileName(profile.displayName);
      }
    },
    [setLanguage, updateProfileName, user],
  );

  const retryProfileLoad = useCallback(() => {
    setProfileError(null);
    setLoading(true);
    setReloadNonce((n) => n + 1);
  }, []);

  const authContextValue = useMemo(
    () => ({
      user,
      userData,
      loading,
      profileError,
      retryProfileLoad,
      language,
      setLanguage,
      theme,
      toggleTheme,
      signInWithName,
      loginWithGoogle,
      logout,
      updateUserProgress,
      updateUserData,
      updateProfileName,
      importBackupData,
    }),
    [
      user,
      userData,
      loading,
      profileError,
      retryProfileLoad,
      language,
      setLanguage,
      theme,
      toggleTheme,
      signInWithName,
      loginWithGoogle,
      logout,
      updateUserProgress,
      updateUserData,
      updateProfileName,
      importBackupData,
    ],
  );

  return <AuthContext.Provider value={authContextValue}>{!loading && children}</AuthContext.Provider>;
}
