const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Login-CbfurkQx.js","assets/vendor-react--N-K1Ubq.js","assets/vendor-router-m5cA7LJQ.js","assets/vendor-icons-UlZxPqC8.js","assets/vendor-motion-D8-S3eer.js","assets/vendor-capacitor-BK0LZzXH.js","assets/vendor-firebase-CxrLxvH4.js","assets/vendor-B7z8ML8n.js","assets/vendor-CTZuBZOi.css","assets/vendor-confetti-Dl7ieZFU.js","assets/LearningHub-CG66_Umj.js","assets/kurmanji-DANKPvwI.js","assets/subjectAccents-Ctlc_nEP.js","assets/Alphabet-JUnEvOW4.js","assets/RecallButton-DT4xUp_8.js","assets/SpacedRepetitionService-DkhvYl5r.js","assets/VocabularyCategories-IYLsjRVq.js","assets/VocabularyList-Bqu6pDtV.js","assets/useFavorites-CTXFeMsV.js","assets/Sentences-CxDHnDJS.js","assets/Grammar-BkDBEAWf.js","assets/grammarScoring-DPrToKDM.js","assets/answerUtils-WRjxYtEq.js","assets/GrammarLesson-Cqm2dZzk.js","assets/Writing-HkRy6hSe.js","assets/WritingTracingPage-DDt2U5kD.js","assets/TracingCanvas-32skzIIu.js","assets/traceLetters-CGZtlSUi.js","assets/pathValidation-BvL8cQk4.js","assets/WritingLessonPage-D36tUba6.js","assets/Progress-BMdEo1cu.js","assets/WritingWords-BEZEfOub.js","assets/writingWords-DQJu-7eV.js","assets/WritingWordTracingPage-CDO2k35p.js","assets/WritingSentences-BO7KxgnX.js","assets/writingSentences-e0j8USzu.js","assets/WritingSentenceTracingPage-B93J0HZ-.js","assets/WritingComingSoon-h1twOshs.js","assets/Favorites-C_uowKsc.js","assets/Quiz-DNciyhtL.js","assets/questionGenerator-3VjXWBPZ.js","assets/Switch-_Uos24zj.js","assets/Search-BlBcILWi.js","assets/Store-3eG9oQZC.js","assets/Profile-RsT1pWk8.js","assets/LeaderboardPage-D3oCyWV5.js","assets/Roadmap-DoL8IuvX.js","assets/Games-ByZC-tVN.js","assets/PrivacyPolicy-Cj_J_7BM.js","assets/TermsOfService-BgiTbjz5.js","assets/NotFound-Cm0Lupj-.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, R as React, a as reactDomExports, c as clientExports } from "./vendor-react--N-K1Ubq.js";
import { C as Capacitor, K as Keyboard, a as KeyboardResize, S as SplashScreen, b as StatusBar, c as Style, H as Haptics, N as NotificationType, I as ImpactStyle, A as App$1, d as Network, P as Preferences, _ as __vitePreload } from "./vendor-capacitor-BK0LZzXH.js";
import { u as useNavigate, a as useLocation, b as useNavigationType, L as Link, O as Outlet, B as BrowserRouter, R as Routes, c as Route, d as useParams } from "./vendor-router-m5cA7LJQ.js";
import { g as getApps, i as initializeApp, a as getApp, b as getFirestore, s as setLogLevel, c as getAuth, G as GoogleAuthProvider, d as doc, e as getDoc, f as setDoc, o as onAuthStateChanged, h as signInWithPopup, u as updateProfile, j as signOut } from "./vendor-firebase-CxrLxvH4.js";
import { t as twMerge, c as clsx, a as create, b as oe } from "./vendor-B7z8ML8n.js";
import { L as LoaderCircle, X, C as CircleAlert, D as Download, S as Share, a as SquarePlus, H as Hash, G as GraduationCap, M as Map$1, b as Gamepad2, U as User, c as Search$1, d as Heart, T as Trophy, e as ShoppingBag, f as Sun, g as Moon, B as Bell, A as ArrowLeft, h as Settings, F as Flame, i as Award, j as Compass, k as Star, l as Sparkles, m as Smile, n as Turtle, V as Volume2, o as Users, P as Plane, p as BookOpen, q as Briefcase, r as Sprout, s as MessageCircle, R as Rocket, t as Coffee, u as CalendarCheck, v as ChevronRight, w as Check, x as Globe, y as Gift, Z as Zap, z as Megaphone, E as LogOut, I as Clock, J as Library, K as CircleCheck, W as WifiOff, N as RefreshCw, O as Wifi, Q as TriangleAlert, Y as House } from "./vendor-icons-UlZxPqC8.js";
import { A as AnimatePresence, m as motion } from "./vendor-motion-D8-S3eer.js";
import { R as ReactConfetti } from "./vendor-confetti-Dl7ieZFU.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const projectId = "gemini-1-490611";
const appId = "1:330053178665:web:da454d03361fbcd5e49338";
const apiKey = "AIzaSyB8-ahJTMjX39RIi2iSAgqQ0UMwswXkhm8";
const authDomain = "gemini-1-490611.firebaseapp.com";
const firestoreDatabaseId = "ai-studio-c5e9c3c7-22fd-4350-837c-45ad1fd7af39";
const storageBucket = "gemini-1-490611.firebasestorage.app";
const messagingSenderId = "330053178665";
const measurementId = "";
const devPlaceholderConfig = {
  projectId,
  appId,
  apiKey,
  authDomain,
  firestoreDatabaseId,
  storageBucket,
  messagingSenderId,
  measurementId
};
const __vite_import_meta_env__ = {};
function readEnvConfig() {
  const env = __vite_import_meta_env__;
  const apiKey2 = env.VITE_FIREBASE_API_KEY;
  const authDomain2 = env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId2 = env.VITE_FIREBASE_PROJECT_ID;
  const appId2 = env.VITE_FIREBASE_APP_ID;
  if (!apiKey2 || !authDomain2 || !projectId2 || !appId2) return null;
  return {
    apiKey: apiKey2,
    authDomain: authDomain2,
    projectId: projectId2,
    appId: appId2,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
    firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID
  };
}
const envConfig = readEnvConfig();
const isFirebaseConfigured = envConfig !== null;
const firebaseConfig = envConfig ?? devPlaceholderConfig;
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "default");
setLogLevel("error");
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
function getUtcDateString(date = /* @__PURE__ */ new Date()) {
  return date.toISOString().split("T")[0];
}
function getDaysDifference(dateStr1, dateStr2) {
  const d1 = (/* @__PURE__ */ new Date(dateStr1 + "T00:00:00Z")).getTime();
  const d2 = (/* @__PURE__ */ new Date(dateStr2 + "T00:00:00Z")).getTime();
  const diffTime = Math.abs(d2 - d1);
  return Math.floor(diffTime / (1e3 * 60 * 60 * 24));
}
const CURVE_BASE = 100;
const CURVE_EXP = 1.4;
const MAX_LEVEL = 200;
function getXpRequiredForLevel(level) {
  if (!Number.isFinite(level) || level <= 1) return 0;
  const capped = Math.min(Math.floor(level), MAX_LEVEL);
  return Math.floor(CURVE_BASE * Math.pow(capped - 1, CURVE_EXP));
}
function calculateLevelFromXP(xp) {
  if (!Number.isFinite(xp) || xp <= 0) return 1;
  const safeXp = Math.min(xp, Number.MAX_SAFE_INTEGER);
  const approx = Math.floor(Math.pow(safeXp / CURVE_BASE, 1 / CURVE_EXP)) + 1;
  let level = Math.max(1, Math.min(approx, MAX_LEVEL));
  while (level < MAX_LEVEL && safeXp >= getXpRequiredForLevel(level + 1)) level++;
  while (level > 1 && safeXp < getXpRequiredForLevel(level)) level--;
  return level;
}
function getLevelProgress(xp) {
  const safeXp = Number.isFinite(xp) && xp > 0 ? Math.floor(xp) : 0;
  const level = calculateLevelFromXP(safeXp);
  const floorXp = getXpRequiredForLevel(level);
  const ceilXp = getXpRequiredForLevel(level + 1);
  const span = Math.max(1, ceilXp - floorXp);
  const into = Math.max(0, safeXp - floorXp);
  return {
    level,
    currentLevelXp: floorXp,
    xpForThisLevel: span,
    xpIntoLevel: into,
    xpToNextLevel: Math.max(0, ceilXp - safeXp),
    percent: Math.max(0, Math.min(100, Math.round(into / span * 100)))
  };
}
function checkAndUpdateStreak(userData) {
  const todayStr = getUtcDateString(/* @__PURE__ */ new Date());
  const lastActiveStr = userData.lastActive ? getUtcDateString(new Date(userData.lastActive)) : todayStr;
  let currentStreak = userData.streak || 0;
  let freezes = userData.streakFreezes ?? 1;
  let freezeUsed = false;
  let streakBroken = false;
  const diff = getDaysDifference(lastActiveStr, todayStr);
  if (diff === 0) {
    return {
      updatedStreak: currentStreak === 0 ? 1 : currentStreak,
      streakFreezes: freezes,
      lastActiveDate: todayStr,
      freezeUsed: false,
      streakBroken: false
    };
  } else if (diff === 1) {
    currentStreak += 1;
  } else if (diff === 2) {
    if (freezes > 0) {
      freezes -= 1;
      freezeUsed = true;
      currentStreak = Math.max(1, currentStreak);
    } else {
      currentStreak = 1;
      streakBroken = true;
    }
  } else {
    currentStreak = 1;
    streakBroken = true;
  }
  return {
    updatedStreak: currentStreak,
    streakFreezes: freezes,
    lastActiveDate: todayStr,
    freezeUsed,
    streakBroken
  };
}
function calculateQuizRewards(score, totalQuestions, currentXp, levelMultiplier = 12) {
  const total = Number.isFinite(totalQuestions) ? Math.max(0, Math.floor(totalQuestions)) : 0;
  const rawScore = Number.isFinite(score) ? Math.max(0, Math.floor(score)) : 0;
  const safeScore = Math.min(rawScore, total);
  const mult = Number.isFinite(levelMultiplier) ? Math.max(1, Math.min(levelMultiplier, 50)) : 12;
  score = safeScore;
  totalQuestions = total;
  levelMultiplier = mult;
  const isPerfect = totalQuestions > 0 && score === totalQuestions;
  const accuracy = totalQuestions > 0 ? score / totalQuestions : 0;
  let xpGained = score * levelMultiplier;
  if (isPerfect) {
    xpGained += 20;
  } else if (accuracy >= 0.8) {
    xpGained += 10;
  }
  let gemsGained = 0;
  if (isPerfect) {
    gemsGained += 5;
  }
  const safeCurrentXp = Number.isFinite(currentXp) && currentXp > 0 ? currentXp : 0;
  const oldLevel = calculateLevelFromXP(safeCurrentXp);
  const newXp = safeCurrentXp + xpGained;
  const newLevel = calculateLevelFromXP(newXp);
  const levelUp = newLevel > oldLevel;
  if (levelUp) {
    gemsGained += 15;
  }
  return {
    xpGained,
    gemsGained,
    isPerfect,
    levelUp,
    newLevel
  };
}
var AppErrorCode = /* @__PURE__ */ ((AppErrorCode2) => {
  AppErrorCode2["NETWORK_OFFLINE"] = "NETWORK_OFFLINE";
  AppErrorCode2["STORAGE_READ_FAILED"] = "STORAGE_READ_FAILED";
  AppErrorCode2["STORAGE_WRITE_FAILED"] = "STORAGE_WRITE_FAILED";
  AppErrorCode2["MIGRATION_FAILED"] = "MIGRATION_FAILED";
  AppErrorCode2["BACKUP_INVALID"] = "BACKUP_INVALID";
  AppErrorCode2["SYNC_CONFLICT"] = "SYNC_CONFLICT";
  AppErrorCode2["SYNC_FAILED"] = "SYNC_FAILED";
  AppErrorCode2["AUTH_FAILED"] = "AUTH_FAILED";
  AppErrorCode2["VALIDATION_ERROR"] = "VALIDATION_ERROR";
  AppErrorCode2["PLATFORM_UNAVAILABLE"] = "PLATFORM_UNAVAILABLE";
  AppErrorCode2["UNKNOWN"] = "UNKNOWN";
  return AppErrorCode2;
})(AppErrorCode || {});
class AppError extends Error {
  constructor(options) {
    super(options.message);
    this.name = "AppError";
    this.code = options.code;
    this.recoverable = options.recoverable ?? true;
    this.cause = options.cause;
    this.context = options.context;
    this.timestamp = Date.now();
  }
}
function toAppError(error, fallbackCode = "UNKNOWN", fallbackMessage = "Unexpected error") {
  if (error instanceof AppError) {
    return error;
  }
  if (error instanceof Error) {
    return new AppError({
      code: fallbackCode,
      message: error.message || fallbackMessage,
      cause: error
    });
  }
  return new AppError({
    code: fallbackCode,
    message: typeof error === "string" && error.trim() ? error : fallbackMessage,
    cause: error
  });
}
const USER_MESSAGES = {
  [
    "NETWORK_OFFLINE"
    /* NETWORK_OFFLINE */
  ]: {
    en: "You are offline. Your progress is safely saved on this device.",
    ar: "أنت غير متصل بالإنترنت. تم حفظ تقدمك بأمان على جهازك.",
    ku: "Tu bê înternet î. Pêşveçûna te bi ewlehî li ser cîhaza te hatiye tomarkirin."
  },
  [
    "STORAGE_READ_FAILED"
    /* STORAGE_READ_FAILED */
  ]: {
    en: "Could not read local progress. Retrying with fallback storage.",
    ar: "تعذرت قراءة البيانات المحلية. جاري المحاولة عبر التخزين الاحتياطي.",
    ku: "Xwendina daneyên herêmî bi ser neket. Bi hilanîna cîgir tê ceribandin."
  },
  [
    "STORAGE_WRITE_FAILED"
    /* STORAGE_WRITE_FAILED */
  ]: {
    en: "Could not save progress to device storage. Please check available space.",
    ar: "تعذر حفظ التقدم على الجهاز. يرجى التحقق من المساحة المتاحة.",
    ku: "Tomarkirina pêşveçûnê bi ser neket. Ji kerema xwe cihê vala kontrol bike."
  },
  [
    "MIGRATION_FAILED"
    /* MIGRATION_FAILED */
  ]: {
    en: "Could not upgrade saved data format. Original data was preserved.",
    ar: "تعذرت ترقية تنسيق البيانات المحفوظة. تم الحفاظ على بياناتك الأصلية.",
    ku: "Nûkirina şêwaza daneyan bi ser neket. Daneyên orîjînal hatin parastin."
  },
  [
    "BACKUP_INVALID"
    /* BACKUP_INVALID */
  ]: {
    en: "The selected backup file is invalid or corrupted.",
    ar: "ملف النسخة الاحتياطية غير صالح أو تالف.",
    ku: "Pelê hilanînê ne derbasdar e an jî xera bûye."
  },
  [
    "SYNC_CONFLICT"
    /* SYNC_CONFLICT */
  ]: {
    en: "Progress from multiple devices was merged automatically.",
    ar: "تم دمج تقدمك من عدة أجهزة تلقائياً دون فقدان البيانات.",
    ku: "Pêşveçûna ji çend cîhazan bixweber hate yekkirin."
  },
  [
    "SYNC_FAILED"
    /* SYNC_FAILED */
  ]: {
    en: "Cloud sync paused. Your changes stay queued and will retry automatically.",
    ar: "توقفت المزامنة السحابية مؤقتاً. ستتم إعادة المحاولة تلقائياً عند توفر الاتصال.",
    ku: "Hevdengkirina ewrê rawestiya. Guhertinên te dê bixweber dîsa werin şandin."
  },
  [
    "AUTH_FAILED"
    /* AUTH_FAILED */
  ]: {
    en: "Sign-in could not be completed. You can continue learning offline as a guest.",
    ar: "تعذر إكمال تسجيل الدخول. يمكنك متابعة التعلم كضيف دون إنترنت.",
    ku: "Têketin neqedî. Tu dikarî wekî mêvan bê înternet fêrbûnê bidomînî."
  },
  [
    "VALIDATION_ERROR"
    /* VALIDATION_ERROR */
  ]: {
    en: "Please check the entered information and try again.",
    ar: "يرجى التحقق من البيانات المدخلة والمحاولة مرة أخرى.",
    ku: "Ji kerema xwe agahiyên ku hatine nivîsandin kontrol bike û dîsa biceribîne."
  },
  [
    "PLATFORM_UNAVAILABLE"
    /* PLATFORM_UNAVAILABLE */
  ]: {
    en: "This device capability is not available on the current platform.",
    ar: "هذه الميزة غير متوفرة على المنصة الحالية.",
    ku: "Ev taybetmendiya cîhazê li ser vê platformê peyda nabe."
  },
  [
    "UNKNOWN"
    /* UNKNOWN */
  ]: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    ku: "Tiştêk şaş çû. Ji kerema xwe dîsa biceribîne."
  }
};
function getUserErrorMessage(error, language) {
  var _a;
  const appErr = toAppError(error);
  return ((_a = USER_MESSAGES[appErr.code]) == null ? void 0 : _a[language]) ?? USER_MESSAGES[
    "UNKNOWN"
    /* UNKNOWN */
  ][language];
}
const CURRENT_USER_SCHEMA_VERSION = 3;
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function toSafeNonNegInt(value, fallback, max = 1e7) {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(max, Math.floor(value)));
}
function toUniqueStringArray(value, fallback = []) {
  if (!Array.isArray(value)) return [...fallback];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const item of value) {
    if (typeof item === "string" && item.trim().length > 0 && !seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}
function sanitizeGameScores(value) {
  if (!isPlainObject(value)) return {};
  const result = {};
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === "number" && Number.isFinite(v) && v >= 0) {
      result[k] = Math.floor(v);
    }
  }
  return result;
}
function sanitizeReviewDeck(value, now) {
  if (!isPlainObject(value)) return {};
  const deck = {};
  for (const [id, rawItem] of Object.entries(value)) {
    if (!isPlainObject(rawItem)) continue;
    const ease = typeof rawItem.easeFactor === "number" && Number.isFinite(rawItem.easeFactor) ? Math.max(1.3, rawItem.easeFactor) : 2.5;
    const item = {
      id: typeof rawItem.id === "string" && rawItem.id ? rawItem.id : id,
      easeFactor: ease,
      intervalDays: typeof rawItem.intervalDays === "number" && Number.isFinite(rawItem.intervalDays) ? Math.max(0, rawItem.intervalDays) : 0,
      repetitions: toSafeNonNegInt(rawItem.repetitions, 0, 1e4),
      dueAt: typeof rawItem.dueAt === "number" && Number.isFinite(rawItem.dueAt) ? rawItem.dueAt : now,
      lastReviewedAt: typeof rawItem.lastReviewedAt === "number" && Number.isFinite(rawItem.lastReviewedAt) ? rawItem.lastReviewedAt : 0,
      lapses: toSafeNonNegInt(rawItem.lapses, 0, 1e4)
    };
    deck[id] = item;
  }
  return deck;
}
function sanitizeWritingProgress(value) {
  if (!isPlainObject(value)) return void 0;
  const out = {};
  for (const [letter, entry] of Object.entries(value)) {
    if (!isPlainObject(entry)) continue;
    out[letter] = {
      bestScore: toSafeNonNegInt(entry.bestScore, 0, 100),
      attempts: toSafeNonNegInt(entry.attempts, 0, 1e5),
      completed: Boolean(entry.completed)
    };
  }
  return out;
}
function createDefaultUserData(now = Date.now()) {
  const todayUtc = getUtcDateString(new Date(now));
  return {
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp: 0,
    level: 1,
    streak: 1,
    gems: 100,
    streakFreezes: 1,
    lastActive: now,
    lastActiveDate: todayUtc,
    createdAt: now,
    updatedAt: now,
    wordsLearned: 0,
    quizzesCompleted: 0,
    sessionsCount: 0,
    totalStudyTime: 0,
    recentSearches: [],
    favorites: [],
    completedLessons: [],
    unlockedLevels: ["A1"],
    badges: [],
    gameScores: {},
    wrongAnswersHistory: [],
    reviewDeck: {},
    isOnboarded: false
  };
}
function migrateUserData(raw, now = Date.now()) {
  const warnings = [];
  if (!isPlainObject(raw)) {
    warnings.push("Input payload was empty or non-object; initialized fresh defaults.");
    return {
      data: createDefaultUserData(now),
      migratedFrom: 0,
      didMigrate: true,
      warnings
    };
  }
  const detectedVersion = typeof raw.schemaVersion === "number" && Number.isInteger(raw.schemaVersion) && raw.schemaVersion >= 0 ? raw.schemaVersion : typeof raw.gems === "number" || isPlainObject(raw.reviewDeck) ? 2 : 1;
  const xp = toSafeNonNegInt(raw.xp, 0);
  const derivedLevel = calculateLevelFromXP(xp);
  if (typeof raw.level === "number" && raw.level !== derivedLevel) {
    warnings.push(`Reconciled level (${raw.level} -> ${derivedLevel}) to match XP curve.`);
  }
  const lastActive = typeof raw.lastActive === "number" && Number.isFinite(raw.lastActive) && raw.lastActive > 0 ? raw.lastActive : now;
  const lastActiveDate = typeof raw.lastActiveDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.lastActiveDate) ? raw.lastActiveDate : getUtcDateString(new Date(lastActive));
  const createdAt = typeof raw.createdAt === "number" && Number.isFinite(raw.createdAt) && raw.createdAt > 0 ? raw.createdAt : now;
  const updatedAt = typeof raw.updatedAt === "number" && Number.isFinite(raw.updatedAt) && raw.updatedAt > 0 ? raw.updatedAt : now;
  const unlockedRaw = toUniqueStringArray(raw.unlockedLevels, ["A1"]);
  if (!unlockedRaw.includes("A1")) unlockedRaw.unshift("A1");
  if (xp >= 150 && !unlockedRaw.includes("A2")) unlockedRaw.push("A2");
  if (xp >= 450 && !unlockedRaw.includes("B1")) unlockedRaw.push("B1");
  if (xp >= 800 && !unlockedRaw.includes("B2")) unlockedRaw.push("B2");
  if (xp >= 1300 && !unlockedRaw.includes("Advanced")) unlockedRaw.push("Advanced");
  const rawDailyGoal = typeof raw.dailyGoalXp === "number" && Number.isFinite(raw.dailyGoalXp) ? Math.max(10, Math.min(500, Math.floor(raw.dailyGoalXp))) : void 0;
  const migrated = {
    ...raw,
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp,
    level: derivedLevel,
    streak: toSafeNonNegInt(raw.streak, 0, 1e5),
    gems: raw.gems === void 0 ? 100 : toSafeNonNegInt(raw.gems, 100),
    streakFreezes: raw.streakFreezes === void 0 ? 1 : toSafeNonNegInt(raw.streakFreezes, 1, 999),
    lastActive,
    lastActiveDate,
    createdAt,
    updatedAt,
    wordsLearned: toSafeNonNegInt(raw.wordsLearned, 0),
    quizzesCompleted: toSafeNonNegInt(raw.quizzesCompleted, 0),
    sessionsCount: toSafeNonNegInt(raw.sessionsCount, 0),
    totalStudyTime: toSafeNonNegInt(raw.totalStudyTime, 0),
    recentSearches: toUniqueStringArray(raw.recentSearches).slice(0, 20),
    favorites: toUniqueStringArray(raw.favorites),
    completedLessons: toUniqueStringArray(raw.completedLessons),
    unlockedLevels: unlockedRaw,
    badges: toUniqueStringArray(raw.badges),
    gameScores: sanitizeGameScores(raw.gameScores),
    wrongAnswersHistory: toUniqueStringArray(raw.wrongAnswersHistory),
    reviewDeck: sanitizeReviewDeck(raw.reviewDeck, now),
    writingProgress: sanitizeWritingProgress(raw.writingProgress),
    dailyGoalXp: rawDailyGoal,
    isOnboarded: typeof raw.isOnboarded === "boolean" ? raw.isOnboarded : xp > 0 || unlockedRaw.length > 1
  };
  return {
    data: migrated,
    migratedFrom: detectedVersion,
    didMigrate: detectedVersion < CURRENT_USER_SCHEMA_VERSION || warnings.length > 0,
    warnings
  };
}
function createBackupEnvelope(userData, profile = {}, appVersion = "2.0.0") {
  const { data } = migrateUserData(userData);
  return {
    format: "kurdish-quest-backup",
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    appVersion,
    profile,
    userData: data
  };
}
function parseAndMigrateBackup(rawJson) {
  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: "Backup file is not valid JSON.",
      cause: err
    });
  }
  if (!isPlainObject(parsed)) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: "Backup file root must be a JSON object."
    });
  }
  const isEnvelope = parsed.format === "kurdish-quest-backup" && isPlainObject(parsed.userData);
  const candidateData = isEnvelope ? parsed.userData : parsed;
  if (!isPlainObject(candidateData) || typeof candidateData.xp !== "number" && !Array.isArray(candidateData.completedLessons)) {
    throw new AppError({
      code: AppErrorCode.BACKUP_INVALID,
      message: "Backup file does not contain recognizable Kurdish Quest progress data."
    });
  }
  const migration = migrateUserData(candidateData);
  const rawProfile = isEnvelope && isPlainObject(parsed.profile) ? parsed.profile : {};
  const language = rawProfile.language === "en" || rawProfile.language === "ar" || rawProfile.language === "ku" ? rawProfile.language : void 0;
  const theme = rawProfile.theme === "light" || rawProfile.theme === "dark" ? rawProfile.theme : void 0;
  const displayName = typeof rawProfile.displayName === "string" ? rawProfile.displayName.slice(0, 60) : void 0;
  return {
    envelope: {
      format: "kurdish-quest-backup",
      schemaVersion: CURRENT_USER_SCHEMA_VERSION,
      exportedAt: typeof parsed.exportedAt === "string" ? parsed.exportedAt : (/* @__PURE__ */ new Date()).toISOString(),
      appVersion: typeof parsed.appVersion === "string" ? parsed.appVersion : "legacy",
      profile: { displayName, language, theme },
      userData: migration.data
    },
    migration
  };
}
function evaluateUnlockedBadges(data) {
  const badges = new Set(data.badges || []);
  if (data.xp >= 50) badges.add("first_steps");
  if (data.xp >= 500) badges.add("dedicated_learner");
  if (data.xp >= 1500) badges.add("academic_achiever");
  if ((data.wordsLearned || 0) >= 10) badges.add("vocabulary_enthusiast");
  if ((data.wordsLearned || 0) >= 50) badges.add("vocabulary_master");
  if ((data.wordsLearned || 0) >= 150) badges.add("polyglot");
  if (data.streak >= 3) badges.add("streak_3");
  if (data.streak >= 7) badges.add("streak_7");
  if ((data.quizzesCompleted || 0) >= 5) badges.add("quiz_conqueror");
  if ((data.quizzesCompleted || 0) >= 20) badges.add("quiz_master");
  if ((data.completedLessons || []).length >= 5) badges.add("lesson_scholar");
  return Array.from(badges);
}
function evaluateUnlockedCefrLevels(xp, existing = []) {
  const levels = /* @__PURE__ */ new Set(["A1", ...existing]);
  if (xp >= 150) levels.add("A2");
  if (xp >= 450) levels.add("B1");
  if (xp >= 800) levels.add("B2");
  if (xp >= 1300) levels.add("Advanced");
  return Array.from(levels);
}
function applyProgressDelta(currentData, input, now = Date.now()) {
  const safeXpDelta = Number.isFinite(input.xpToAdd) ? Math.max(0, Math.floor(input.xpToAdd)) : 0;
  const safeWordsDelta = Number.isFinite(input.wordsToAdd) ? Math.max(0, Math.floor(input.wordsToAdd)) : 0;
  const safeGemsDelta = Number.isFinite(input.gemsToAdd ?? 0) ? Math.max(0, Math.floor(input.gemsToAdd ?? 0)) : 0;
  const newXp = (currentData.xp || 0) + safeXpDelta;
  const newLevel = calculateLevelFromXP(newXp);
  const newGems = (currentData.gems ?? 100) + safeGemsDelta;
  const newWords = (currentData.wordsLearned || 0) + safeWordsDelta;
  const newQuizzes = input.quizCompleted ? (currentData.quizzesCompleted || 0) + 1 : currentData.quizzesCompleted || 0;
  const nextSessions = (currentData.sessionsCount || 0) + 1;
  const updatedTotalTime = (currentData.totalStudyTime || 0) + 2;
  const todayStr = getUtcDateString(new Date(now));
  const nextXpToday = (currentData.xpTodayDate === todayStr ? currentData.xpToday || 0 : 0) + safeXpDelta;
  const prevMissions = currentData.missionsState;
  const missionCounters = prevMissions && prevMissions.date === todayStr ? { ...prevMissions.counters } : { quizzes: 0, games: 0, perfect: 0 };
  if (input.quizCompleted) {
    if ((input.source ?? "quiz") === "game") missionCounters.games += 1;
    else missionCounters.quizzes += 1;
  }
  if (input.perfect) {
    missionCounters.perfect += 1;
  }
  const nextMissionsState = {
    date: todayStr,
    counters: missionCounters,
    claimed: prevMissions && prevMissions.date === todayStr ? [...prevMissions.claimed] : []
  };
  const streakResult = checkAndUpdateStreak(currentData);
  const nextUnlockedLevels = evaluateUnlockedCefrLevels(newXp, currentData.unlockedLevels);
  const nextData = {
    ...currentData,
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp: newXp,
    xpToday: nextXpToday,
    xpTodayDate: todayStr,
    missionsState: nextMissionsState,
    level: newLevel,
    gems: newGems,
    streak: streakResult.updatedStreak,
    streakFreezes: streakResult.streakFreezes,
    wordsLearned: newWords,
    quizzesCompleted: newQuizzes,
    sessionsCount: nextSessions,
    totalStudyTime: updatedTotalTime,
    unlockedLevels: nextUnlockedLevels,
    lastActive: now,
    lastActiveDate: streakResult.lastActiveDate,
    updatedAt: now
  };
  nextData.badges = evaluateUnlockedBadges(nextData);
  return nextData;
}
function createServiceToken(label) {
  return { id: Symbol(label), label };
}
class ServiceContainer {
  constructor() {
    this.factories = /* @__PURE__ */ new Map();
    this.singletons = /* @__PURE__ */ new Map();
  }
  registerSingleton(token, factory) {
    this.factories.set(token.id, factory);
    this.singletons.delete(token.id);
  }
  registerInstance(token, instance) {
    this.singletons.set(token.id, instance);
    this.factories.set(token.id, () => instance);
  }
  resolve(token) {
    if (this.singletons.has(token.id)) {
      return this.singletons.get(token.id);
    }
    const factory = this.factories.get(token.id);
    if (!factory) {
      throw new Error(`Service token "${token.label}" is not registered in ServiceContainer.`);
    }
    const instance = factory();
    this.singletons.set(token.id, instance);
    return instance;
  }
  has(token) {
    return this.singletons.has(token.id) || this.factories.has(token.id);
  }
  resetInstances() {
    this.singletons.clear();
  }
}
const serviceContainer = new ServiceContainer();
var define_process_env_default = {};
const SENSITIVE_KEY_PATTERN = /token|secret|password|apikey|api_key|auth|credential|email/i;
function sanitizeMeta(meta) {
  if (!meta) return void 0;
  const clean = {};
  for (const [key, value] of Object.entries(meta)) {
    if (SENSITIVE_KEY_PATTERN.test(key)) {
      clean[key] = "[REDACTED]";
    } else if (value instanceof Error) {
      clean[key] = { name: value.name, message: value.message };
    } else {
      clean[key] = value;
    }
  }
  return clean;
}
function createLogger(scope) {
  const emit = (level, message, meta) => {
    const cleanMeta = sanitizeMeta(meta);
    const isTest = typeof process !== "undefined" && Boolean(define_process_env_default == null ? void 0 : define_process_env_default.VITEST);
    if (isTest && (level === "debug" || level === "info")) {
      return;
    }
    const prefix = `[KQ:${scope}] ${message}`;
    if (level === "error") {
      console.error(prefix, cleanMeta ?? "");
    } else if (level === "warn") {
      console.warn(prefix, cleanMeta ?? "");
    } else if (level === "info") {
      console.info(prefix, cleanMeta ?? "");
    }
  };
  return {
    debug: (message, meta) => emit("debug", message, meta),
    info: (message, meta) => emit("info", message, meta),
    warn: (message, meta) => emit("warn", message, meta),
    error: (message, meta) => emit("error", message, meta)
  };
}
const log$4 = createLogger("WebPlatform");
function detectStandalonePWA() {
  if (typeof window === "undefined") return false;
  const standaloneMedia = typeof window.matchMedia === "function" && window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = window.navigator.standalone === true;
  return standaloneMedia || iosStandalone;
}
function detectIOSSafari() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  const isIOSDevice = /iphone|ipad|ipod/.test(ua) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return isIOSDevice && !detectStandalonePWA();
}
class WebPlatformAdapter {
  getCapabilities() {
    const isStandalonePWA = detectStandalonePWA();
    const isIOSSafariBrowser = detectIOSSafari();
    return {
      target: "web",
      isNative: false,
      isAndroid: false,
      isIOS: false,
      isWeb: true,
      isStandalonePWA,
      isIOSSafariBrowser,
      hasNativeStorage: false
    };
  }
  async initialize(theme) {
    await this.syncStatusBar(theme);
  }
  async syncStatusBar(theme) {
    if (typeof document === "undefined") return;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = theme === "dark" ? "#141414" : "#FFB300";
    }
  }
  async triggerHaptic(style) {
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
    try {
      const pattern = style === "success" ? [12, 40, 18] : style === "error" ? [35, 30, 35] : style === "medium" ? 18 : 8;
      navigator.vibrate(pattern);
    } catch {
    }
  }
  onHardwareBackButton(_handler) {
    return () => {
    };
  }
  onAppStateChange(handler) {
    if (typeof document === "undefined") return () => {
    };
    const listener = () => {
      handler(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", listener);
    return () => document.removeEventListener("visibilitychange", listener);
  }
  onNetworkChange(handler) {
    if (typeof window === "undefined") return () => {
    };
    const onOnline = () => handler(true);
    const onOffline = () => handler(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }
  async isOnline() {
    if (typeof navigator === "undefined") return true;
    return navigator.onLine;
  }
  async kvGet(key) {
    try {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem(key);
    } catch (err) {
      log$4.warn("localStorage.getItem failed", { key, err });
      return null;
    }
  }
  async kvSet(key, value) {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, value);
    } catch (err) {
      log$4.warn("localStorage.setItem failed", { key, err });
    }
  }
  async kvRemove(key) {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(key);
    } catch (err) {
      log$4.warn("localStorage.removeItem failed", { key, err });
    }
  }
  async exitApp() {
  }
}
const log$3 = createLogger("CapacitorPlatform");
class CapacitorPlatformAdapter {
  constructor() {
    const raw = Capacitor.getPlatform();
    this.target = raw === "android" ? "android" : raw === "ios" ? "ios" : "web";
  }
  getCapabilities() {
    return {
      target: this.target,
      isNative: Capacitor.isNativePlatform(),
      isAndroid: this.target === "android",
      isIOS: this.target === "ios",
      isWeb: this.target === "web",
      isStandalonePWA: false,
      isIOSSafariBrowser: false,
      hasNativeStorage: true
    };
  }
  async initialize(theme) {
    await this.syncStatusBar(theme);
    try {
      if (this.target === "ios") {
        await Keyboard.setResizeMode({ mode: KeyboardResize.Body });
        await Keyboard.setScroll({ isDisabled: false });
      }
    } catch (err) {
      log$3.debug("Keyboard plugin configuration skipped", { err });
    }
    try {
      await SplashScreen.hide();
    } catch (err) {
      log$3.debug("SplashScreen.hide skipped", { err });
    }
  }
  async syncStatusBar(theme) {
    try {
      await StatusBar.setStyle({
        style: theme === "dark" ? Style.Dark : Style.Light
      });
      if (this.target === "android") {
        await StatusBar.setBackgroundColor({
          color: theme === "dark" ? "#141414" : "#FBFBFA"
        });
      }
    } catch (err) {
      log$3.debug("StatusBar sync skipped", { err });
    }
  }
  async triggerHaptic(style) {
    try {
      if (style === "success") {
        await Haptics.notification({ type: NotificationType.Success });
      } else if (style === "error") {
        await Haptics.notification({ type: NotificationType.Error });
      } else if (style === "medium") {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } else {
        await Haptics.impact({ style: ImpactStyle.Light });
      }
    } catch {
    }
  }
  onHardwareBackButton(handler) {
    let active = true;
    const handlePromise = App$1.addListener("backButton", () => {
      if (!active) return;
      const handled = handler();
      if (!handled) {
        void this.exitApp();
      }
    });
    return () => {
      active = false;
      void handlePromise.then((h) => h.remove()).catch(() => {
      });
    };
  }
  onAppStateChange(handler) {
    let active = true;
    const handlePromise = App$1.addListener("appStateChange", ({ isActive }) => {
      if (active) handler(isActive);
    });
    return () => {
      active = false;
      void handlePromise.then((h) => h.remove()).catch(() => {
      });
    };
  }
  onNetworkChange(handler) {
    let active = true;
    const handlePromise = Network.addListener("networkStatusChange", (status) => {
      if (active) handler(status.connected);
    });
    return () => {
      active = false;
      void handlePromise.then((h) => h.remove()).catch(() => {
      });
    };
  }
  async isOnline() {
    try {
      const status = await Network.getStatus();
      return status.connected;
    } catch {
      return typeof navigator !== "undefined" ? navigator.onLine : true;
    }
  }
  async kvGet(key) {
    try {
      const { value } = await Preferences.get({ key });
      if (value !== null) return value;
    } catch (err) {
      log$3.warn("Capacitor Preferences.get failed, falling back to localStorage", { key, err });
    }
    try {
      return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  }
  async kvSet(key, value) {
    try {
      await Preferences.set({ key, value });
    } catch (err) {
      log$3.warn("Capacitor Preferences.set failed", { key, err });
    }
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(key, value);
    } catch {
    }
  }
  async kvRemove(key) {
    try {
      await Preferences.remove({ key });
    } catch (err) {
      log$3.warn("Capacitor Preferences.remove failed", { key, err });
    }
    try {
      if (typeof window !== "undefined") window.localStorage.removeItem(key);
    } catch {
    }
  }
  async exitApp() {
    try {
      await App$1.exitApp();
    } catch {
    }
  }
}
const PLATFORM_TOKEN = createServiceToken("PlatformAdapter");
function createDefaultPlatformAdapter() {
  try {
    if (Capacitor.isNativePlatform()) {
      return new CapacitorPlatformAdapter();
    }
  } catch {
  }
  return new WebPlatformAdapter();
}
serviceContainer.registerSingleton(PLATFORM_TOKEN, createDefaultPlatformAdapter);
function getPlatform() {
  return serviceContainer.resolve(PLATFORM_TOKEN);
}
function useOnlineStatus() {
  const [isOnline, setIsOnline] = reactExports.useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  reactExports.useEffect(() => {
    const platform = getPlatform();
    let mounted = true;
    void platform.isOnline().then((online) => {
      if (mounted) setIsOnline(online);
    });
    const unsubscribe = platform.onNetworkChange((online) => {
      if (mounted) setIsOnline(online);
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);
  return isOnline;
}
function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = reactExports.useState(null);
  const [isInstalled, setIsInstalled] = reactExports.useState(() => {
    const caps = getPlatform().getCapabilities();
    return caps.isNative || caps.isStandalonePWA;
  });
  const [isIOSSafari, setIsIOSSafari] = reactExports.useState(
    () => getPlatform().getCapabilities().isIOSSafariBrowser
  );
  reactExports.useEffect(() => {
    const caps = getPlatform().getCapabilities();
    setIsInstalled(caps.isNative || caps.isStandalonePWA);
    setIsIOSSafari(caps.isIOSSafariBrowser);
    if (typeof window === "undefined" || caps.isNative) return;
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);
  const install = reactExports.useCallback(async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  }, [deferredPrompt]);
  return {
    isInstallable: Boolean(deferredPrompt),
    isInstalled,
    isIOS: isIOSSafari,
    install
  };
}
const log$2 = createLogger("OfflineStorage");
const DB_NAME = "kurmanji_quester_db";
const DB_VERSION = 2;
const USER_DATA_STORE = "user_data";
const SYNC_QUEUE_STORE = "sync_queue";
const TELEMETRY_STORE = "telemetry_events";
const METADATA_STORE = "metadata";
const BACKUPS_STORE = "backups";
const LOCALSTORAGE_KEY = "kurmanji_user_data_v2";
const LEGACY_LOCALSTORAGE_KEY = "kurdish_quest_data";
const SYNC_QUEUE_FALLBACK_KEY = "kurmanji_sync_queue";
const MAX_RETRY_COUNT = 5;
class OfflineStorageService {
  constructor() {
    this.dbPromise = null;
  }
  getDB() {
    if (this.dbPromise) return this.dbPromise;
    this.dbPromise = new Promise((resolve, reject) => {
      if (globalThis.window === void 0 || !window.indexedDB) {
        reject(new Error("IndexedDB is not supported in this environment"));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db2 = event.target.result;
        if (!db2.objectStoreNames.contains(USER_DATA_STORE)) {
          db2.createObjectStore(USER_DATA_STORE);
        }
        if (!db2.objectStoreNames.contains(SYNC_QUEUE_STORE)) {
          db2.createObjectStore(SYNC_QUEUE_STORE, { keyPath: "id" });
        }
        if (!db2.objectStoreNames.contains(TELEMETRY_STORE)) {
          db2.createObjectStore(TELEMETRY_STORE, { keyPath: "eventId" });
        }
        if (!db2.objectStoreNames.contains(METADATA_STORE)) {
          db2.createObjectStore(METADATA_STORE);
        }
        if (!db2.objectStoreNames.contains(BACKUPS_STORE)) {
          db2.createObjectStore(BACKUPS_STORE, { keyPath: "id" });
        }
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        this.dbPromise = null;
        log$2.warn("IndexedDB failed to open; using KV fallback", { error: request.error });
        reject(request.error);
      };
    });
    return this.dbPromise;
  }
  /**
   * Stores an immutable pre-migration safety snapshot in IndexedDB `backups` store
   * so legacy user progress is never destroyed during schema upgrades.
   */
  async saveSafetySnapshot(rawPayload, fromVersion) {
    try {
      const db2 = await this.getDB();
      if (!db2.objectStoreNames.contains(BACKUPS_STORE)) return;
      await new Promise((resolve, reject) => {
        const tx = db2.transaction(BACKUPS_STORE, "readwrite");
        const store = tx.objectStore(BACKUPS_STORE);
        const req = store.put({
          id: `pre_migration_v${fromVersion}_${Date.now()}`,
          fromVersion,
          capturedAt: Date.now(),
          payload: rawPayload
        });
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      log$2.debug("Safety snapshot write skipped", { err });
    }
  }
  /**
   * Save UserData into both Tier 1 (Platform KV: Capacitor Preferences + localStorage)
   * and Tier 2 (IndexedDB).
   */
  async saveUserData(userData) {
    const normalized = {
      ...userData,
      schemaVersion: userData.schemaVersion ?? CURRENT_USER_SCHEMA_VERSION
    };
    const serialized = JSON.stringify(normalized);
    try {
      if (globalThis.window !== void 0) {
        localStorage.setItem(LOCALSTORAGE_KEY, serialized);
      }
    } catch (e) {
      log$2.warn("LocalStorage save failed", { err: e });
    }
    try {
      const platform = getPlatform();
      if (platform.getCapabilities().hasNativeStorage) {
        await platform.kvSet(LOCALSTORAGE_KEY, serialized);
      }
    } catch (e) {
      log$2.warn("Native Preferences mirror save failed", { err: e });
    }
    try {
      const db2 = await this.getDB();
      await new Promise((resolve, reject) => {
        const tx = db2.transaction(USER_DATA_STORE, "readwrite");
        const store = tx.objectStore(USER_DATA_STORE);
        const req = store.put(normalized, "current_user");
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      log$2.warn("IndexedDB saveUserData fallback", { err });
    }
  }
  /**
   * Retrieve UserData from IndexedDB, native Preferences, or legacy localStorage,
   * automatically applying lossless schema migration if needed.
   */
  async getUserData() {
    let rawData = null;
    try {
      const db2 = await this.getDB();
      rawData = await new Promise((resolve, reject) => {
        const tx = db2.transaction(USER_DATA_STORE, "readonly");
        const store = tx.objectStore(USER_DATA_STORE);
        const req = store.get("current_user");
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      log$2.warn("IndexedDB getUserData fallback to KV", { err });
    }
    if (!rawData) {
      try {
        const platform = getPlatform();
        if (platform.getCapabilities().hasNativeStorage) {
          const nativeRaw = await platform.kvGet(LOCALSTORAGE_KEY);
          if (nativeRaw) rawData = JSON.parse(nativeRaw);
        }
      } catch (err) {
        log$2.warn("Native Preferences read failed", { err });
      }
    }
    if (!rawData) {
      try {
        if (globalThis.window !== void 0) {
          const raw = localStorage.getItem(LOCALSTORAGE_KEY) || localStorage.getItem(LEGACY_LOCALSTORAGE_KEY);
          if (raw) rawData = JSON.parse(raw);
        }
      } catch (e) {
        log$2.warn("LocalStorage parse failed", { err: e });
      }
    }
    if (!rawData) return null;
    const migration = migrateUserData(rawData);
    if (migration.didMigrate) {
      log$2.info("Migrated UserData schema", {
        from: migration.migratedFrom,
        to: CURRENT_USER_SCHEMA_VERSION,
        warnings: migration.warnings
      });
      await this.saveSafetySnapshot(rawData, migration.migratedFrom);
      await this.saveUserData(migration.data);
    }
    return migration.data;
  }
  /**
   * Enqueue mutation into pending sync queue with deduplication / coalescing:
   * consecutive pending `UPDATE_PROGRESS` mutations for the same user are merged
   * instead of creating redundant writes.
   */
  async enqueueMutation(mutation) {
    const existing = await this.getPendingMutations();
    if (mutation.type === "UPDATE_PROGRESS") {
      const existingProgress = existing.find(
        (m) => m.userId === mutation.userId && m.type === "UPDATE_PROGRESS" && m.status === "pending"
      );
      if (existingProgress) {
        const coalesced = {
          ...existingProgress,
          clientTimestamp: Date.now(),
          payload: {
            xpToAdd: (existingProgress.payload.xpToAdd || 0) + (mutation.payload.xpToAdd || 0),
            wordsToAdd: (existingProgress.payload.wordsToAdd || 0) + (mutation.payload.wordsToAdd || 0),
            gemsToAdd: (existingProgress.payload.gemsToAdd || 0) + (mutation.payload.gemsToAdd || 0),
            quizCompleted: Boolean(existingProgress.payload.quizCompleted || mutation.payload.quizCompleted),
            data: existingProgress.payload.data || mutation.payload.data ? { ...existingProgress.payload.data || {}, ...mutation.payload.data || {} } : void 0
          }
        };
        await this.putMutation(coalesced);
        return coalesced;
      }
    }
    if (mutation.idempotencyKey) {
      const dup = existing.find((m) => m.idempotencyKey === mutation.idempotencyKey);
      if (dup) return dup;
    }
    const fullMutation = {
      ...mutation,
      id: `mut_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      clientTimestamp: Date.now(),
      retryCount: 0,
      status: "pending"
    };
    await this.putMutation(fullMutation);
    return fullMutation;
  }
  async putMutation(mutation) {
    try {
      const db2 = await this.getDB();
      await new Promise((resolve, reject) => {
        const tx = db2.transaction(SYNC_QUEUE_STORE, "readwrite");
        const store = tx.objectStore(SYNC_QUEUE_STORE);
        const req = store.put(mutation);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      try {
        const rawQueue = localStorage.getItem(SYNC_QUEUE_FALLBACK_KEY) || "[]";
        const queue = JSON.parse(rawQueue);
        const idx = queue.findIndex((m) => m.id === mutation.id);
        if (idx >= 0) queue[idx] = mutation;
        else queue.push(mutation);
        localStorage.setItem(SYNC_QUEUE_FALLBACK_KEY, JSON.stringify(queue));
      } catch (e) {
        log$2.warn("Failed to persist mutation in LocalStorage fallback", { err: e });
      }
    }
  }
  /**
   * Record a failed sync attempt with exponential backoff and dead-letter capping.
   */
  async markMutationFailed(id, errorMessage, now = Date.now()) {
    const queue = await this.getPendingMutations();
    const target = queue.find((m) => m.id === id);
    if (!target) return;
    const nextRetryCount = target.retryCount + 1;
    const backoffMs = Math.min(6e4, 2e3 * Math.pow(2, nextRetryCount - 1));
    const updated = {
      ...target,
      retryCount: nextRetryCount,
      lastError: errorMessage,
      nextRetryAt: now + backoffMs,
      status: nextRetryCount >= MAX_RETRY_COUNT ? "failed" : "pending"
    };
    await this.putMutation(updated);
  }
  /**
   * Reset all dead-letter failed mutations back to pending for manual retry.
   */
  async resetFailedMutations() {
    const queue = await this.getPendingMutations();
    for (const mut of queue) {
      if (mut.status === "failed" || mut.retryCount > 0) {
        await this.putMutation({
          ...mut,
          retryCount: 0,
          nextRetryAt: void 0,
          lastError: void 0,
          status: "pending"
        });
      }
    }
  }
  /**
   * Get all queued sync mutations.
   */
  async getPendingMutations() {
    try {
      const db2 = await this.getDB();
      return await new Promise((resolve, reject) => {
        const tx = db2.transaction(SYNC_QUEUE_STORE, "readonly");
        const store = tx.objectStore(SYNC_QUEUE_STORE);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch {
      try {
        const rawQueue = localStorage.getItem(SYNC_QUEUE_FALLBACK_KEY) || "[]";
        return JSON.parse(rawQueue);
      } catch {
        return [];
      }
    }
  }
  /**
   * Remove a single mutation after successful sync.
   */
  async removeMutation(id) {
    try {
      const db2 = await this.getDB();
      await new Promise((resolve, reject) => {
        const tx = db2.transaction(SYNC_QUEUE_STORE, "readwrite");
        const store = tx.objectStore(SYNC_QUEUE_STORE);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      try {
        const rawQueue = localStorage.getItem(SYNC_QUEUE_FALLBACK_KEY) || "[]";
        const queue = JSON.parse(rawQueue);
        const filtered = queue.filter((m) => m.id !== id);
        localStorage.setItem(SYNC_QUEUE_FALLBACK_KEY, JSON.stringify(filtered));
      } catch (e) {
        log$2.warn("Failed to remove mutation from LocalStorage", { err: e });
      }
    }
  }
  /**
   * Clear all pending sync queue items.
   */
  async clearSyncQueue() {
    try {
      const db2 = await this.getDB();
      await new Promise((resolve, reject) => {
        const tx = db2.transaction(SYNC_QUEUE_STORE, "readwrite");
        const store = tx.objectStore(SYNC_QUEUE_STORE);
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      try {
        localStorage.removeItem(SYNC_QUEUE_FALLBACK_KEY);
      } catch {
      }
    }
  }
  /** Export a portable, versioned JSON backup of the learner's progress. */
  async exportBackupJson(profile) {
    const data = await this.getUserData();
    const migrated = migrateUserData(data).data;
    const envelope = createBackupEnvelope(migrated, profile);
    return JSON.stringify(envelope, null, 2);
  }
  /** Validate, migrate, and persist a JSON backup without losing existing data if invalid. */
  async restoreBackupJson(rawJson) {
    const { envelope, migration } = parseAndMigrateBackup(rawJson);
    const existing = await this.getUserData();
    if (existing) {
      await this.saveSafetySnapshot(existing, existing.schemaVersion ?? CURRENT_USER_SCHEMA_VERSION);
    }
    await this.saveUserData(envelope.userData);
    return {
      userData: envelope.userData,
      profile: envelope.profile,
      migratedFrom: migration.migratedFrom
    };
  }
  async getDiagnostics() {
    const [data, queue] = await Promise.all([
      this.getUserData().catch(() => null),
      this.getPendingMutations().catch(() => [])
    ]);
    return {
      dbVersion: DB_VERSION,
      schemaVersion: (data == null ? void 0 : data.schemaVersion) ?? CURRENT_USER_SCHEMA_VERSION,
      pendingMutations: queue.filter((m) => m.status !== "failed").length,
      failedMutations: queue.filter((m) => m.status === "failed").length,
      hasLocalProfile: data !== null,
      platformTarget: getPlatform().getCapabilities().target
    };
  }
}
const offlineStorage = new OfflineStorageService();
function reconcileUserData(local, remote, now = Date.now()) {
  const localTime = local.updatedAt || local.lastActive || 0;
  const remoteTime = remote.updatedAt || remote.lastActive || 0;
  const isLocalNewer = localTime >= remoteTime;
  const resolvedFields = [];
  if ((local.xp || 0) !== (remote.xp || 0)) resolvedFields.push("xp");
  if ((local.gems ?? 100) !== (remote.gems ?? 100)) resolvedFields.push("gems");
  const mergedXp = Math.max(local.xp || 0, remote.xp || 0);
  const mergedLevel = calculateLevelFromXP(mergedXp);
  const mergedWords = Math.max(local.wordsLearned || 0, remote.wordsLearned || 0);
  const mergedQuizzes = Math.max(local.quizzesCompleted || 0, remote.quizzesCompleted || 0);
  const mergedSessions = Math.max(local.sessionsCount || 0, remote.sessionsCount || 0);
  const mergedTotalStudyTime = Math.max(local.totalStudyTime || 0, remote.totalStudyTime || 0);
  const mergedLessons = Array.from(/* @__PURE__ */ new Set([...local.completedLessons || [], ...remote.completedLessons || []]));
  const mergedBadges = Array.from(/* @__PURE__ */ new Set([...local.badges || [], ...remote.badges || []]));
  const mergedUnlocked = Array.from(/* @__PURE__ */ new Set(["A1", ...local.unlockedLevels || [], ...remote.unlockedLevels || []]));
  const mergedFavorites = Array.from(/* @__PURE__ */ new Set([...local.favorites || [], ...remote.favorites || []]));
  const mergedWrongAnswers = Array.from(/* @__PURE__ */ new Set([...local.wrongAnswersHistory || [], ...remote.wrongAnswersHistory || []]));
  const mergedCompletedTours = Array.from(/* @__PURE__ */ new Set([...local.completedTours || [], ...remote.completedTours || []]));
  const rawSearches = isLocalNewer ? [...local.recentSearches || [], ...remote.recentSearches || []] : [...remote.recentSearches || [], ...local.recentSearches || []];
  const mergedRecentSearches = Array.from(new Set(rawSearches)).slice(0, 20);
  const mergedGameScores = { ...remote.gameScores || {} };
  for (const [key, val] of Object.entries(local.gameScores || {})) {
    mergedGameScores[key] = Math.max(mergedGameScores[key] || 0, val || 0);
  }
  const mergedWriting = { ...remote.writingProgress || {} };
  for (const [letter, localProg] of Object.entries(local.writingProgress || {})) {
    const remoteProg = mergedWriting[letter];
    if (!remoteProg) {
      mergedWriting[letter] = localProg;
    } else {
      mergedWriting[letter] = {
        bestScore: Math.max(localProg.bestScore, remoteProg.bestScore),
        attempts: Math.max(localProg.attempts, remoteProg.attempts),
        completed: localProg.completed || remoteProg.completed
      };
    }
  }
  const mergedReviewDeck = { ...remote.reviewDeck || {} };
  for (const [id, localCard] of Object.entries(local.reviewDeck || {})) {
    const remoteCard = mergedReviewDeck[id];
    if (!remoteCard) {
      mergedReviewDeck[id] = localCard;
    } else {
      const localReviewed = localCard.lastReviewedAt || 0;
      const remoteReviewed = remoteCard.lastReviewedAt || 0;
      if (localReviewed > remoteReviewed) {
        mergedReviewDeck[id] = localCard;
      } else if (remoteReviewed > localReviewed) {
        mergedReviewDeck[id] = remoteCard;
      } else {
        mergedReviewDeck[id] = (localCard.repetitions || 0) >= (remoteCard.repetitions || 0) ? localCard : remoteCard;
      }
    }
  }
  const mergedGems = isLocalNewer ? local.gems ?? remote.gems ?? 100 : remote.gems ?? local.gems ?? 100;
  const mergedFreezes = isLocalNewer ? local.streakFreezes ?? remote.streakFreezes ?? 1 : remote.streakFreezes ?? local.streakFreezes ?? 1;
  const mergedLastFreezeUsed = isLocalNewer ? local.lastStreakFreezeUsed ?? remote.lastStreakFreezeUsed : remote.lastStreakFreezeUsed ?? local.lastStreakFreezeUsed;
  const mergedLastDailyReward = isLocalNewer ? local.lastDailyRewardClaimed ?? remote.lastDailyRewardClaimed : remote.lastDailyRewardClaimed ?? local.lastDailyRewardClaimed;
  let mergedStreak = Math.max(local.streak || 0, remote.streak || 0);
  let mergedLastActiveDate = local.lastActiveDate || remote.lastActiveDate;
  if (local.lastActiveDate && remote.lastActiveDate) {
    if (local.lastActiveDate === remote.lastActiveDate) {
      mergedStreak = Math.max(local.streak || 0, remote.streak || 0);
      mergedLastActiveDate = local.lastActiveDate;
    } else if (local.lastActiveDate > remote.lastActiveDate) {
      mergedStreak = local.streak || 0;
      mergedLastActiveDate = local.lastActiveDate;
    } else {
      mergedStreak = remote.streak || 0;
      mergedLastActiveDate = remote.lastActiveDate;
    }
  } else if (local.lastActiveDate) {
    mergedStreak = local.streak || 0;
    mergedLastActiveDate = local.lastActiveDate;
  } else if (remote.lastActiveDate) {
    mergedStreak = remote.streak || 0;
    mergedLastActiveDate = remote.lastActiveDate;
  }
  if (mergedLessons.length > (local.completedLessons || []).length) resolvedFields.push("completedLessons");
  if (Object.keys(mergedReviewDeck).length > Object.keys(local.reviewDeck || {}).length) resolvedFields.push("reviewDeck");
  const baseMetadata = isLocalNewer ? { ...remote, ...local } : { ...local, ...remote };
  const merged = {
    ...baseMetadata,
    schemaVersion: CURRENT_USER_SCHEMA_VERSION,
    xp: mergedXp,
    level: mergedLevel,
    gems: mergedGems,
    wordsLearned: mergedWords,
    quizzesCompleted: mergedQuizzes,
    sessionsCount: mergedSessions,
    totalStudyTime: mergedTotalStudyTime,
    completedLessons: mergedLessons,
    badges: mergedBadges,
    unlockedLevels: mergedUnlocked,
    favorites: mergedFavorites,
    recentSearches: mergedRecentSearches,
    gameScores: mergedGameScores,
    wrongAnswersHistory: mergedWrongAnswers,
    reviewDeck: mergedReviewDeck,
    writingProgress: mergedWriting,
    completedTours: mergedCompletedTours,
    streak: mergedStreak,
    streakFreezes: mergedFreezes,
    lastStreakFreezeUsed: mergedLastFreezeUsed,
    lastDailyRewardClaimed: mergedLastDailyReward,
    lastActiveDate: mergedLastActiveDate,
    lastActive: Math.max(local.lastActive || 0, remote.lastActive || 0),
    createdAt: Math.min(local.createdAt || now, remote.createdAt || now),
    updatedAt: Math.max(localTime, remoteTime, now)
  };
  return {
    merged,
    summary: {
      hadDivergence: resolvedFields.length > 0,
      resolvedFields,
      winnerForLww: isLocalNewer ? "local" : "remote"
    }
  };
}
const log$1 = createLogger("SyncEngine");
class SyncEngine {
  constructor() {
    this.isSyncing = false;
    this.isOnline = globalThis.navigator !== void 0 ? navigator.onLine : true;
    this.lastSyncedAt = null;
    this.lastError = null;
    this.lastConflict = null;
    this.listeners = /* @__PURE__ */ new Set();
    if (globalThis.window !== void 0) {
      const platform = getPlatform();
      void platform.isOnline().then((online) => {
        this.isOnline = online;
        void this.notifyListeners();
      });
      platform.onNetworkChange((online) => {
        this.isOnline = online;
        void this.notifyListeners();
        if (online) {
          void this.processQueue();
        }
      });
      platform.onAppStateChange((isActive) => {
        if (isActive && this.isOnline) {
          void this.processQueue();
        }
      });
    }
  }
  subscribe(listener) {
    this.listeners.add(listener);
    void this.notifyStatus(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  getStatus() {
    return {
      isOnline: globalThis.navigator !== void 0 ? navigator.onLine : this.isOnline,
      isSyncing: this.isSyncing,
      pendingCount: 0,
      failedCount: 0,
      lastSyncedAt: this.lastSyncedAt,
      lastError: this.lastError,
      lastConflict: this.lastConflict
    };
  }
  async buildStatus() {
    const queue = await offlineStorage.getPendingMutations();
    const online = globalThis.navigator !== void 0 ? navigator.onLine : this.isOnline;
    return {
      isOnline: online,
      isSyncing: this.isSyncing,
      pendingCount: queue.filter((m) => m.status !== "failed").length,
      failedCount: queue.filter((m) => m.status === "failed").length,
      lastSyncedAt: this.lastSyncedAt,
      lastError: this.lastError,
      lastConflict: this.lastConflict
    };
  }
  async notifyListeners() {
    const status = await this.buildStatus();
    this.listeners.forEach((fn) => fn(status));
  }
  async notifyStatus(listener) {
    const status = await this.buildStatus();
    listener(status);
  }
  /**
   * Reconciles local and remote user state using the pure domain CRDT/LWW engine.
   * Public method signature preserved for full backward compatibility.
   */
  mergeUserDataAdditive(local, remote) {
    return reconcileUserData(local, remote).merged;
  }
  /**
   * User-triggered manual sync: resets dead-letter retries and flushes immediately.
   */
  async manualSync(userId) {
    await offlineStorage.resetFailedMutations();
    this.lastError = null;
    return this.processQueue(userId, true);
  }
  /**
   * Main Queue Processor: Flushes pending mutations to Firestore when online.
   * Reconciles with remote state first to avoid clobbering progress from other devices,
   * and applies exponential backoff on transient failures.
   */
  async processQueue(userId, ignoreBackoff = false) {
    var _a;
    if (this.isSyncing) return false;
    if (globalThis.navigator !== void 0 && !navigator.onLine) return false;
    const targetUserId = userId || ((_a = auth.currentUser) == null ? void 0 : _a.uid);
    if (!targetUserId || targetUserId === "local_user") {
      return false;
    }
    const now = Date.now();
    const allQueued = await offlineStorage.getPendingMutations();
    const eligible = allQueued.filter(
      (m) => m.status !== "failed" && (ignoreBackoff || !m.nextRetryAt || m.nextRetryAt <= now)
    );
    if (eligible.length === 0) {
      await this.notifyListeners();
      return true;
    }
    this.isSyncing = true;
    this.lastError = null;
    await this.notifyListeners();
    try {
      const currentLocal = await offlineStorage.getUserData();
      if (currentLocal && db) {
        const userRef = doc(db, "users", targetUserId);
        let targetData = currentLocal;
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const remoteData = docSnap.data();
            const outcome = reconcileUserData(currentLocal, remoteData);
            targetData = outcome.merged;
            this.lastConflict = outcome.summary.hadDivergence ? outcome.summary : null;
          }
        } catch (fetchErr) {
          log$1.warn("Remote fetch skipped before push; proceeding with local state", { err: fetchErr });
        }
        await offlineStorage.saveUserData(targetData);
        await setDoc(userRef, targetData, { merge: true });
        for (const mut of eligible) {
          await offlineStorage.removeMutation(mut.id);
        }
        this.lastSyncedAt = Date.now();
        this.lastError = null;
      }
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sync failed";
      this.lastError = message;
      log$1.warn("SyncEngine processQueue failed; scheduling exponential backoff", { err });
      for (const mut of eligible) {
        await offlineStorage.markMutationFailed(mut.id, message);
      }
      return false;
    } finally {
      this.isSyncing = false;
      await this.notifyListeners();
    }
  }
}
const syncEngine = new SyncEngine();
const log = createLogger("AuthContext");
const AuthContext = reactExports.createContext({
  user: null,
  userData: null,
  loading: true,
  profileError: null,
  retryProfileLoad: () => {
  },
  language: "en",
  setLanguage: () => {
  },
  theme: "light",
  toggleTheme: () => {
  },
  signInWithName: async () => {
  },
  loginWithGoogle: async () => {
  },
  logout: async () => {
  },
  updateUserProgress: async () => {
  },
  updateUserData: async () => {
  },
  updateProfileName: async () => {
  },
  importBackupData: async () => {
  }
});
const useAuth = () => reactExports.useContext(AuthContext);
function applyDocumentDirection(lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}
function applyDocumentTheme(nextTheme) {
  if (typeof document !== "undefined") {
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  void getPlatform().syncStatusBar(nextTheme);
}
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(() => {
    try {
      const storedUser = localStorage.getItem("kurdish_quest_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [userData, setUserData] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem("kurmanji_user_data_v2") || localStorage.getItem("kurdish_quest_data");
      if (stored) {
        return migrateUserData(JSON.parse(stored)).data;
      }
    } catch {
    }
    return createDefaultUserData();
  });
  const userDataRef = reactExports.useRef(userData);
  reactExports.useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);
  const [loading, setLoading] = reactExports.useState(true);
  const [profileError, setProfileError] = reactExports.useState(null);
  const [reloadNonce, setReloadNonce] = reactExports.useState(0);
  const [language, setLanguageState] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem("kurdish_quest_lang");
      if (stored === "en" || stored === "ar" || stored === "ku") return stored;
    } catch {
    }
    return "en";
  });
  const [theme, setThemeState] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem("kurdish_quest_theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {
    }
    return "light";
  });
  reactExports.useEffect(() => {
    applyDocumentDirection(language);
  }, [language]);
  reactExports.useEffect(() => {
    applyDocumentTheme(theme);
  }, [theme]);
  reactExports.useEffect(() => {
    void getPlatform().initialize(theme);
  }, []);
  reactExports.useEffect(() => {
    if (!isFirebaseConfigured) return;
    async function testConnection() {
      try {
        await getDoc(doc(db, "test", "connection"));
      } catch (error) {
        log.debug("Firestore startup probe operating in offline/fallback mode", { error });
      }
    }
    void testConnection();
  }, []);
  reactExports.useEffect(() => {
    const loadProfile = async (firebaseUser) => {
      if (firebaseUser) {
        const simplifiedUser = {
          displayName: firebaseUser.displayName || firebaseUser.email || "Learner",
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL
        };
        setUser(simplifiedUser);
        localStorage.setItem("kurdish_quest_user", JSON.stringify(simplifiedUser));
        const docRef = doc(db, "users", firebaseUser.uid);
        let cloudData = null;
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            cloudData = migrateUserData(docSnap.data()).data;
          }
        } catch (e) {
          log.warn("Firestore profile pull skipped (offline/cold start)", { err: e });
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
              log.warn("Failed pushing merged profile to cloud", { err });
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
              log.warn("Failed creating cloud profile on initial sign-in", { err });
            }
          }
        }
        if (navigator.onLine) {
          void syncEngine.processQueue(firebaseUser.uid);
        }
      } else {
        const storedUser = localStorage.getItem("kurdish_quest_user");
        let parsed = null;
        if (storedUser) {
          try {
            parsed = JSON.parse(storedUser);
          } catch {
            log.warn("Corrupt kurdish_quest_user in localStorage — clearing.");
            localStorage.removeItem("kurdish_quest_user");
          }
        }
        const localDataObj = await offlineStorage.getUserData();
        const isAutostart = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("autostart") === "1";
        if (!parsed && isAutostart) {
          parsed = { displayName: "Dilan", uid: "local_user" };
          localStorage.setItem("kurdish_quest_user", JSON.stringify(parsed));
        }
        setUser(parsed && parsed.uid === "local_user" ? parsed : null);
        if (localDataObj) {
          const nextData = isAutostart && localDataObj.isOnboarded === false ? { ...localDataObj, isOnboarded: true, dailyGoalXp: localDataObj.dailyGoalXp ?? 50 } : localDataObj;
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
      loadProfile(firebaseUser).catch((err) => {
        log.error("Profile load failed", { err });
        setProfileError(err instanceof Error ? err.message : String(err));
      }).finally(() => setLoading(false));
    });
    return () => unsubscribe();
  }, [reloadNonce]);
  const toggleTheme = reactExports.useCallback(() => {
    setThemeState((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("kurdish_quest_theme", nextTheme);
      } catch {
      }
      applyDocumentTheme(nextTheme);
      return nextTheme;
    });
  }, []);
  const signInWithName = reactExports.useCallback(async (name) => {
    const cleanName = name.trim().slice(0, 60) || "Learner";
    const newUser = { displayName: cleanName, uid: "local_user" };
    setUser(newUser);
    localStorage.setItem("kurdish_quest_user", JSON.stringify(newUser));
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
  const loginWithGoogle = reactExports.useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      log.error("Popup login error", { err: e });
      throw e;
    }
  }, []);
  const updateProfileName = reactExports.useCallback(
    async (name) => {
      if (!user) return;
      const cleanName = name.trim().slice(0, 60) || "Learner";
      const updated = { ...user, displayName: cleanName };
      setUser(updated);
      localStorage.setItem("kurdish_quest_user", JSON.stringify(updated));
      if (auth.currentUser) {
        try {
          await updateProfile(auth.currentUser, { displayName: cleanName });
        } catch (err) {
          log.warn("Could not save display name on Firebase auth account", { err });
        }
      }
    },
    [user]
  );
  const logout = reactExports.useCallback(async () => {
    setUser(null);
    const fresh = createDefaultUserData();
    userDataRef.current = fresh;
    setUserData(fresh);
    localStorage.removeItem("kurdish_quest_user");
    try {
      await signOut(auth);
    } catch (e) {
      log.warn("Sign out err", { err: e });
    }
  }, []);
  const updateUserProgress = reactExports.useCallback(
    async (xpToAdd, wordsToAdd, quizCompleted = false, gemsToAdd = 0, opts) => {
      const currentData = userDataRef.current || userData || createDefaultUserData();
      const updatedData = applyProgressDelta(currentData, {
        xpToAdd,
        wordsToAdd,
        quizCompleted,
        gemsToAdd,
        source: opts == null ? void 0 : opts.source,
        perfect: opts == null ? void 0 : opts.perfect
      });
      userDataRef.current = updatedData;
      setUserData(updatedData);
      await offlineStorage.saveUserData(updatedData);
      if (user && user.uid !== "local_user") {
        if (navigator.onLine) {
          try {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, updatedData, { merge: true });
          } catch {
            await offlineStorage.enqueueMutation({
              userId: user.uid,
              type: "UPDATE_PROGRESS",
              payload: { xpToAdd, wordsToAdd, quizCompleted, gemsToAdd }
            });
          }
        } else {
          await offlineStorage.enqueueMutation({
            userId: user.uid,
            type: "UPDATE_PROGRESS",
            payload: { xpToAdd, wordsToAdd, quizCompleted, gemsToAdd }
          });
        }
      }
    },
    [user, userData]
  );
  const updateUserData = reactExports.useCallback(
    async (data) => {
      const currentData = userDataRef.current || userData || createDefaultUserData();
      const updatedData = {
        ...currentData,
        ...data,
        updatedAt: Date.now()
      };
      userDataRef.current = updatedData;
      setUserData(updatedData);
      await offlineStorage.saveUserData(updatedData);
      if (user && user.uid !== "local_user") {
        if (navigator.onLine) {
          try {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, updatedData, { merge: true });
          } catch {
            await offlineStorage.enqueueMutation({
              userId: user.uid,
              type: "UPDATE_PROGRESS",
              payload: { data }
            });
          }
        } else {
          await offlineStorage.enqueueMutation({
            userId: user.uid,
            type: "UPDATE_PROGRESS",
            payload: { data }
          });
        }
      }
    },
    [user, userData]
  );
  const setLanguage = reactExports.useCallback((lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("kurdish_quest_lang", lang);
    } catch {
    }
    applyDocumentDirection(lang);
  }, []);
  const importBackupData = reactExports.useCallback(
    async (restoredData, profile) => {
      const migrated = migrateUserData(restoredData).data;
      userDataRef.current = migrated;
      setUserData(migrated);
      await offlineStorage.saveUserData(migrated);
      if (profile == null ? void 0 : profile.language) {
        setLanguage(profile.language);
      }
      if (profile == null ? void 0 : profile.theme) {
        setThemeState(profile.theme);
        try {
          localStorage.setItem("kurdish_quest_theme", profile.theme);
        } catch {
        }
        applyDocumentTheme(profile.theme);
      }
      if ((profile == null ? void 0 : profile.displayName) && user) {
        await updateProfileName(profile.displayName);
      }
    },
    [setLanguage, updateProfileName, user]
  );
  const retryProfileLoad = reactExports.useCallback(() => {
    setProfileError(null);
    setLoading(true);
    setReloadNonce((n) => n + 1);
  }, []);
  const authContextValue = reactExports.useMemo(
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
      importBackupData
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
      importBackupData
    ]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: authContextValue, children: !loading && children });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const translations = {
  en: {
    // Main UI
    app_title: "Kurdish Quest",
    loading: "Loading...",
    home: "Home",
    alphabet: "Alphabet",
    learning: "Learning",
    roadmap_tab: "Roadmap",
    profile_tab: "Profile",
    quiz_hub_title: "Quizzes",
    quiz_choose_title: "Choose Quiz Type",
    quiz_choose_sub: "Challenge yourself and learn more!",
    quiz_mode_word_title: "Word Quiz",
    quiz_mode_word_desc: "Choose the correct meaning of the word",
    quiz_mode_listening_title: "Listening Quiz",
    quiz_mode_listening_desc: "Listen and pick the word you hear",
    quiz_mode_writing_title: "Writing Quiz",
    quiz_mode_writing_desc: "Type the Kurdish word yourself",
    quiz_mode_image_title: "Image Quiz",
    quiz_mode_image_desc: "Match the picture to the word",
    quiz_mode_adaptive_title: "My Level Practice",
    quiz_mode_adaptive_desc: "Smart questions from the words you've learned",
    quiz_mode_mixed_title: "Unit Challenge",
    quiz_coming_soon: "Coming Soon",
    quiz_verify: "Verify",
    quiz_next: "Next Question",
    quiz_feedback_correct: "Pir baş! Great job!",
    quiz_tap_to_replay: "Tap to hear it again",
    quiz_personalized_badge: "Personalized",
    tour_next: "Next",
    tour_back: "Back",
    tour_done: "Done",
    tour_welcome_title: "Welcome to Kurdish Quest! 🌞",
    tour_welcome_desc: "Let's take a quick tour so you always know exactly what to tap next. Finish it and a gem bonus is waiting for you!",
    tour_stats_title: "Streak & Gems",
    tour_stats_desc: "Your daily streak 🔥 and gem balance 💎 live up here. Practice every day to keep the flame burning.",
    tour_goal_title: "Your Daily Goal",
    tour_goal_desc: "This bar tracks the XP you earn today against the goal you picked. Fill it every day to build the habit.",
    tour_lesson_title: "Continue Learning",
    tour_lesson_desc: "Your next recommended lesson always waits here — one tap and you're studying.",
    tour_nav_roadmap_title: "Open your Roadmap",
    tour_nav_roadmap_desc: "Tap the highlighted Roadmap tab to see your full learning path.",
    tour_map_title: "This is your Roadmap",
    tour_map_desc: "Lessons are arranged into worlds, from A1 basics upward. Completing a lesson unlocks the next one.",
    tour_first_lesson_title: "Start your first lesson",
    tour_first_lesson_desc: "Tap the glowing lesson node to preview its words and begin. Serkeftin — good luck!",
    tour_reward_title: "Tour complete! 💎 +20",
    tour_reward_msg: "You earned 20 gems for finishing the guided tour. Enjoy the journey!",
    tour_replay_title: "Guided Tour",
    tour_replay_desc: "Replay the app walkthrough",
    tour_replay_btn: "Replay",
    quiz_exit_title: "Leave the quiz?",
    quiz_exit_msg: "Your progress in this run will be lost.",
    quiz_exit_keep: "Keep Going",
    quiz_exit_leave: "Leave",
    missions_title: "Daily Missions",
    missions_sub: "Complete missions to earn gems — they reset every day",
    mission_claim: "Claim",
    mission_claimed: "Claimed",
    mission_xp_title: "Daily Learner",
    mission_xp_desc: "Earn 50 XP today",
    mission_quiz_title: "Quiz Champion",
    mission_quiz_desc: "Finish 3 quizzes today",
    mission_games_title: "Arcade Winner",
    mission_games_desc: "Win 2 games today",
    mission_perfect_title: "Perfect Round",
    mission_perfect_desc: "Score 100% in a quiz today",
    goal_today_suffix: "XP today",
    goal_adjust: "Adjust Goal",
    goal_reached: "Daily goal reached! 🎉",
    goal_modal_title: "Daily Goal",
    goal_modal_desc: "Pick the pace that fits your day. Saved instantly.",
    // --- Gem Store ---
    store_brand: "GEM STORE",
    store_title: "Store",
    store_heading: "Gems & Rewards",
    store_subtitle: "Fuel your learning streak with gems and power-ups.",
    store_balance: "Your Balance",
    store_preview_banner: "In-App Purchases Coming Soon — Preview Mode",
    store_gem_packs: "Gem Packs",
    store_powerups: "Power-Ups",
    store_pack_small: "Small Pouch",
    store_pack_medium: "Scholar Chest",
    store_pack_large: "Vault",
    store_gems: "Gems",
    store_best_value: "Best Value",
    store_coming_soon: "Coming Soon",
    store_freeze_title: "Streak Freeze",
    store_freeze_desc: "Protects your streak for one missed day.",
    store_boost_title: "Double XP Boost",
    store_boost_desc: "Earn 2× XP for your next lesson.",
    store_owned: "Owned",
    store_buy: "Buy",
    store_not_enough: "Not enough gems yet — keep learning!",
    store_freeze_bought: "Streak Freeze added! ❄️",
    // --- Legal, consent & about ---
    legal_section: "Legal & Privacy",
    privacy_policy: "Privacy Policy",
    privacy_policy_desc: "How your data is stored and protected",
    terms_of_service: "Terms of Service",
    terms_of_service_desc: "The rules of using Kurdish Quest",
    about_us: "About Us",
    about_app_desc: "Kurdish Quest is a labor of love built to keep the Kurmanji language alive — learn through play, streaks, stories and songs of the mountains.",
    app_version: "Version",
    made_with: "Made with ❤️ for the Kurdish language community",
    legal_agree_prefix: "I agree to the",
    legal_and: "and",
    legal_required_hint: "Please accept the terms to continue.",
    // --- First-time user experience (FTUX) + onboarding wizard ---
    ftux_welcome_title: "Bi xêr hatî bo Kurdish Quest! 👋",
    ftux_welcome_tagline: "Discover Kurmanji — the melody of the mountains. Learn with play, streaks and stories.",
    ftux_get_started: "Get Started",
    ftux_lang_title: "Zimanê te yê zikmakî çi ye?",
    ftux_lang_subtitle: "Choose your preferred app language. You can change it anytime in Settings.",
    ftux_auth_title: "Almost there!",
    ftux_auth_subtitle: "Sign in to save your progress across devices, or jump right in.",
    ftux_google: "Continue with Google",
    ftux_or: "or",
    ftux_guest_hint: "No account needed — your progress is saved on this device.",
    ftux_back: "Back",
    onb_step: "Step",
    onb_reason_title: "Why are you learning Kurmanji?",
    onb_reason_subtitle: "We will tailor your journey around it.",
    onb_reason_family: "Family & Heritage",
    onb_reason_family_desc: "Reconnect with your roots and loved ones.",
    onb_reason_travel: "Travel & Communication",
    onb_reason_travel_desc: "Speak with locals and explore Kurdistan.",
    onb_reason_culture: "Kurdish Culture & Literature",
    onb_reason_culture_desc: "Poetry, music, dengbêj and stories.",
    onb_reason_career: "Career & Study",
    onb_reason_career_desc: "Work, research and academic goals.",
    onb_level_title: "What is your current level?",
    onb_level_subtitle: "Be honest — we will meet you there.",
    onb_level_beginner: "Complete Beginner",
    onb_level_beginner_desc: "Starting from zero (A1).",
    onb_level_basics: "I know a few basic words",
    onb_level_basics_desc: "Greetings and simple phrases.",
    onb_level_intermediate: "Intermediate",
    onb_level_intermediate_desc: "I can hold simple conversations.",
    onb_goal_title: "Choose your daily goal",
    onb_goal_subtitle: "Small daily steps beat rare big leaps.",
    onb_goal_casual: "Casual",
    onb_goal_casual_desc: "5 min / day · 20 XP",
    onb_goal_regular: "Regular",
    onb_goal_regular_desc: "10 min / day · 50 XP",
    onb_goal_serious: "Serious",
    onb_goal_serious_desc: "15 min / day · 100 XP",
    onb_avatar_title: "Pick your character",
    onb_avatar_subtitle: "Your companion on the quest — change it anytime.",
    onb_finish: "Start Learning!",
    words: "Words",
    games_tab: "Games",
    // Login
    login_title_1: "Learn Kurmanji",
    login_title_2: "Easy & Fun",
    login_desc: "Start your journey to mastering the Kurmanji language through play!",
    enter_name: "Enter your name",
    start_playing: "Start Playing",
    // Dashboard
    welcome_back: "Welcome back,",
    learner: "Learner",
    level: "Level",
    total_xp: "total XP",
    xp_to_next: "XP to next level",
    day_streak: "Day Streak",
    words_learned: "Words",
    learning_path: "Learning Path",
    module_alphabet: "Alphabet",
    module_alphabet_desc: "Learn the letters",
    module_vocab: "Vocabulary",
    module_vocab_desc: "Everyday words",
    module_sentences: "Sentences",
    module_sentences_desc: "Common phrases",
    module_academic: "Academic",
    module_academic_desc: "Educational terms",
    // Alphabet Component
    vowel: "Vow",
    consonant: "Con",
    // Vocabulary Categories
    categories_title: "Categories",
    categories_desc: "Select a topic to study",
    practice: "Practice",
    // Vocabulary List
    practice_module: "Practice this module",
    // Sentences
    listen_and_read: "Listen and read",
    // Academic & Favorites
    daily_word: "Word of the Day",
    level_beginner: "Beginner",
    level_intermediate: "Intermediate",
    level_advanced: "Advanced",
    level_professional: "Professional",
    search_terms: "Search terms...",
    all_levels: "All Levels",
    favorites: "Favorites",
    profile: "Profile",
    logout: "Logout",
    no_results: "No results found",
    // Quiz Component
    quiz: "Quiz",
    question: "Question",
    awesome: "Awesome!",
    you_earned: "You earned",
    xp_points: "XP points",
    new_words: "new words",
    continue: "Continue",
    correct: "Correct!",
    incorrect: "Incorrect",
    quiz_type_choice: "Choose Quiz Type",
    quiz_type_mc: "Multiple Choice",
    quiz_type_mc_desc: "Choose the correct translation",
    quiz_type_write: "Writing Quiz",
    quiz_type_write_desc: "Type the translation in Kurdish",
    type_placeholder: "Type your answer in Kurdish...",
    check: "Verify",
    correct_answer_is: "Correct answer is:",
    exit_confirm_title: "Exit App",
    exit_confirm_msg: "Are you sure you want to exit?",
    exit_confirm_yes: "Exit",
    exit_confirm_no: "Cancel",
    daily_goal_title: "Daily Study Goal",
    daily_goal_desc: "Pick your daily XP goal",
    study_mins_today: "mins studied today",
    of_mins: "of",
    goal_mins_label: "Goal",
    adjust_goal: "Adjust Goal",
    log_time_btn: "Log Time",
    start_session_btn: "Start Study Timer",
    pause_session_btn: "Pause Timer",
    add_1_min: "+1 min",
    add_5_min: "+5 mins",
    add_10_min: "+10 mins",
    congrats_goal: "Daily Goal Achieved!",
    roadmap: "Education Path",
    roadmap_desc: "Visual progressive curriculum path",
    games: "Interactive Games",
    games_desc: "Learn through playful challenges",
    quiz_type_emoji: "Emoji Association",
    quiz_type_emoji_desc: "Match emojis with corresponding Kurdish words",
    error_generic_title: "Something went wrong",
    error_generic_desc: "An error occurred while loading content. Please try again.",
    retry: "Try Again",
    library: "Study Library",
    library_desc: "Explore comprehensive learning materials and references",
    nav_sentences: "Phrases & Sentences",
    nav_dictionary: "Dictionary & Vocab",
    nav_favorites: "My Favorites",
    nav_leaderboard: "Leaderboard"
  },
  ku: {
    // Main UI
    app_title: "Kurdish Quest",
    loading: "Tê barkirin...",
    home: "Destpêk",
    alphabet: "Alfabe",
    learning: "Fêrbûn",
    roadmap_tab: "Nexşe",
    profile_tab: "Profîl",
    quiz_hub_title: "Test",
    quiz_choose_title: "Cureyê testê hilbijêre",
    quiz_choose_sub: "Xwe biceribîne û bêtir fêr bibe!",
    quiz_mode_word_title: "Testa Peyvan",
    quiz_mode_word_desc: "Wateya rast a peyvê hilbijêre",
    quiz_mode_listening_title: "Testa Guhdarîkirinê",
    quiz_mode_listening_desc: "Guhdarî bike û peyva ku tu dibihîzî hilbijêre",
    quiz_mode_writing_title: "Testa Nivîsandinê",
    quiz_mode_writing_desc: "Peyva Kurdî bi xwe binivîse",
    quiz_mode_image_title: "Testa Wêneyan",
    quiz_mode_image_desc: "Wêne bi peyva rast re bide hev",
    quiz_mode_adaptive_title: "Pratîka Asta Min",
    quiz_mode_adaptive_desc: "Pirsên aqilmend ji peyvên ku te fêr bûne",
    quiz_mode_mixed_title: "Serpêhatiya Yekîneyê",
    quiz_coming_soon: "Qonaxa Nû — di nêzîk de",
    quiz_verify: "Kontrol bike",
    quiz_next: "Pirsa din",
    quiz_feedback_correct: "Pir baş! Berdewam be!",
    quiz_tap_to_replay: "Dîsa guhdarî bike",
    quiz_personalized_badge: "Taybet ji te re",
    tour_next: "Pêşve",
    tour_back: "Vegere",
    tour_done: "Temam",
    tour_welcome_title: "Bi xêr hatî Kurdish Quest! 🌞",
    tour_welcome_desc: "Were em gerekî bilez bikin da ku tu her dem zanibî divê çi bitikînî. Wê biqedîne û xelata elmasan li benda te ye!",
    tour_stats_title: "Zincîr û Elmas",
    tour_stats_desc: "Zincîra te ya rojane 🔥 û elmasên te 💎 li vir in. Her roj temrîn bike da ku agir venemire.",
    tour_goal_title: "Armanca te ya Rojane",
    tour_goal_desc: "Ev şirît XP-ya ku tu îro qezenc dikî li gorî armanca te nîşan dide. Her roj wê tije bike da ku hînbûn bibe adet.",
    tour_lesson_title: "Hînbûnê Bidomîne",
    tour_lesson_desc: "Dersa te ya pêşniyarkirî her dem li vir e — bi yek tikandinê dest pê bike.",
    tour_nav_roadmap_title: "Nexşeya Rê veke",
    tour_nav_roadmap_desc: "Li tabê Nexşe yê ronîkirî bitikîne da ku riya xwe ya hînbûnê bi tevahî bibînî.",
    tour_map_title: "Ev Nexşeya te ya Rê ye",
    tour_map_desc: "Ders di cîhanan de rêz kirî ne, ji bingehên A1 ber bi jor. Dersekê biqedîne da ku ya din vebe.",
    tour_first_lesson_title: "Dersa xwe ya yekem dest pê bike",
    tour_first_lesson_desc: "Li girêka dersê ya biriqî bitikîne, peyvên wê bibîne û dest pê bike. Serkeftin!",
    tour_reward_title: "Ger qediya! 💎 +20",
    tour_reward_msg: "Te 20 elmas qezenc kirin ji ber ku te gera rêberiyê qedand. Rêwîtiyeke xweş!",
    tour_replay_title: "Gera Rêberiyê",
    tour_replay_desc: "Gera danasîna sepanê ji nû ve bibîne",
    tour_replay_btn: "Dubare bike",
    quiz_exit_title: "Ji azmûnê derkevî?",
    quiz_exit_msg: "Pêşketina te ya vê gerê wê winda bibe.",
    quiz_exit_keep: "Bidomîne",
    quiz_exit_leave: "Derkeve",
    missions_title: "Erkên Rojane",
    missions_sub: "Erkan biqedîne û elmasan bi dest bixe — her roj nû dibin",
    mission_claim: "Wergire",
    mission_claimed: "Hat wergirtin",
    mission_xp_title: "Fêrxwazê Rojane",
    mission_xp_desc: "Îro 50 XP bi dest bixe",
    mission_quiz_title: "Şampiyonê Testan",
    mission_quiz_desc: "Îro 3 testan biqedîne",
    mission_games_title: "Serkeftiyê Lîstikan",
    mission_games_desc: "Îro di 2 lîstikan de bi ser bikeve",
    mission_perfect_title: "Dora Bêkêmasî",
    mission_perfect_desc: "Îro di testekê de 100% bike",
    goal_today_suffix: "XP îro",
    goal_adjust: "Guhertina Armancê",
    goal_reached: "Armanca rojane pêk hat! 🎉",
    goal_modal_title: "Armanca Rojane",
    goal_modal_desc: "Leza ku li roja te tê hilbijêre. Tavilê tê tomarkirin.",
    // --- Dikana Gewheran ---
    store_brand: "DIKANA GEWHERAN",
    store_title: "Dikan",
    store_heading: "Gewher û Xelat",
    store_subtitle: "Zincîra xwe bi gewher û hêzdaran xurt bike.",
    store_balance: "Hesabê Te",
    store_preview_banner: "Kirîna serhêl di nêzîk de ye — Moda Pêşdîtinê",
    store_gem_packs: "Pakêtên Gewheran",
    store_powerups: "Hêzdar",
    store_pack_small: "Kîsikê Biçûk",
    store_pack_medium: "Sindoqa Zaneyar",
    store_pack_large: "Xezîne",
    store_gems: "Gewher",
    store_best_value: "Baştirîn Bihayî",
    store_coming_soon: "Di nêzîk de",
    store_freeze_title: "Cemidandina Zincîrê",
    store_freeze_desc: "Zincîra te ji bo rojek windakirî diparêze.",
    store_boost_title: "Boosta 2× XP",
    store_boost_desc: "Ji bo dersa te ya bê 2× XP qezenc bike.",
    store_owned: "Hene",
    store_buy: "Bikire",
    store_not_enough: "Hîn gewher têrê nakin — fêrbûnê bidomîne!",
    store_freeze_bought: "Cemidandina Zincîrê hat zêdekirin! ❄️",
    // --- Yasayî, razîbûn û derbar ---
    legal_section: "Yasayî û Nihênî",
    privacy_policy: "Polîtîkaya Nihêniyê",
    privacy_policy_desc: "Daneyên te çawa tên parastin",
    terms_of_service: "Mercên Bikaranînê",
    terms_of_service_desc: "Rêbazên bikaranîna Kurdish Quest",
    about_us: "Derbarê Me",
    about_app_desc: "Kurdish Quest bi evîn hatiye çêkirin da ku zimanê Kurmancî zindî bimîne — bi lîstik, zincîre, çîrok û stranên çiyayan fêr bibe.",
    app_version: "Guherto",
    made_with: "Bi ❤️ ji bo civaka zimanê Kurdî hatiye çêkirin",
    legal_agree_prefix: "Ez razî me bi",
    legal_and: "û",
    legal_required_hint: "Ji kerema xwe mercan qebûl bike da ku berdewam bikî.",
    // --- FTUX + onboarding ---
    ftux_welcome_title: "Bi xêr hatî bo Kurdish Quest! 👋",
    ftux_welcome_tagline: "Kurmancî nas bike — awaza çiyayan. Bi lîstik, zincîre û çîrokan fêr bibe.",
    ftux_get_started: "Dest pê bike",
    ftux_lang_title: "Zimanê te yê zikmakî çi ye?",
    ftux_lang_subtitle: "Zimanê sepanê hilbijêre. Tu dikarî her dem di Mîhengan de biguherî.",
    ftux_auth_title: "Hema hindik ma!",
    ftux_auth_subtitle: "Têkeve da ku pêşketina te were parastin, an yekser dest pê bike.",
    ftux_google: "Bi Google berdewam bike",
    ftux_or: "an",
    ftux_guest_hint: "Hesab ne pêwîst e — pêşketina te li ser vê amûrê tê tomarkirin.",
    ftux_back: "Vegere",
    onb_step: "Gav",
    onb_reason_title: "Çima tu Kurmancî fêr dibî?",
    onb_reason_subtitle: "Em ê rêwîtiya te li gorî vê saz bikin.",
    onb_reason_family: "Malbat û Mîras",
    onb_reason_family_desc: "Bi koka xwe û hezkiriyan re ji nû ve girêbide.",
    onb_reason_travel: "Ger û Axaftin",
    onb_reason_travel_desc: "Bi xelkê re biaxive û Kurdistanê nas bike.",
    onb_reason_culture: "Çand û Wêjeya Kurdî",
    onb_reason_culture_desc: "Helbest, muzîk, dengbêjî û çîrok.",
    onb_reason_career: "Kar û Xwendin",
    onb_reason_career_desc: "Armancên kar, lêkolîn û akademîk.",
    onb_level_title: "Asta te ya niha çi ye?",
    onb_level_subtitle: "Rastgo be — em ê li wir dest pê bikin.",
    onb_level_beginner: "Destpêkerê temam",
    onb_level_beginner_desc: "Ji sifirê dest pê dike (A1).",
    onb_level_basics: "Çend peyvên bingehîn dizanim",
    onb_level_basics_desc: "Silav û hevokên hêsan.",
    onb_level_intermediate: "Navîn",
    onb_level_intermediate_desc: "Dikarim axaftinên hêsan bikim.",
    onb_goal_title: "Armanca xwe ya rojane hilbijêre",
    onb_goal_subtitle: "Gavên biçûk ên rojane ji bazdanên mezin çêtir in.",
    onb_goal_casual: "Sivik",
    onb_goal_casual_desc: "5 xulek / roj · 20 XP",
    onb_goal_regular: "Birêkûpêk",
    onb_goal_regular_desc: "10 xulek / roj · 50 XP",
    onb_goal_serious: "Cidî",
    onb_goal_serious_desc: "15 xulek / roj · 100 XP",
    onb_avatar_title: "Karakterê xwe hilbijêre",
    onb_avatar_subtitle: "Hevrêyê te di kwestê de — her dem tê guhertin.",
    onb_finish: "Dest bi fêrbûnê bike!",
    words: "Peyv",
    games_tab: "Lîstik",
    // Login
    login_title_1: "Fêrî Kurmancî Bibe",
    login_title_2: "Hêsan & Kêfxweş",
    login_desc: "Rêwîtiya xwe ya fêrbûna zimanê Kurmancî bi rêya lîstikan dest pê bike!",
    enter_name: "Navê xwe binivîse",
    start_playing: "Dest Pê Bike",
    // Dashboard
    welcome_back: "Bi xêr hatî,",
    learner: "Fêrxwaz",
    level: "Asta",
    total_xp: "Tevahiya XP",
    xp_to_next: "XP ji bo asta din",
    day_streak: "Rojên li pey hev",
    words_learned: "Peyvên fêrbûyî",
    learning_path: "Rêça Fêrbûnê",
    module_alphabet: "Alfabe",
    module_alphabet_desc: "Tîpan fêr bibe",
    module_vocab: "Peyv",
    module_vocab_desc: "Peyvên rojane",
    module_sentences: "Hevok",
    module_sentences_desc: "Hevokên rojane",
    module_academic: "Akademîk",
    module_academic_desc: "Zaravên perwerdeyê",
    // Alphabet Component
    vowel: "Dengdar",
    consonant: "Bêdeng",
    // Vocabulary Categories
    categories_title: "Kategorî",
    categories_desc: "Babatekê ji bo xwendinê hilbijêre",
    practice: "Pratîk",
    // Vocabulary List
    practice_module: "Vê modulê pratîk bike",
    // Sentences
    listen_and_read: "Guhdarî bike û bixwîne",
    // Academic & Favorites
    daily_word: "Peyva Rojê",
    level_beginner: "Destpêk",
    level_intermediate: "Navîn",
    level_advanced: "Pêşketî",
    level_professional: "Zanistî / Pispor",
    search_terms: "Li peyvan bigere...",
    all_levels: "Hemû Ast",
    favorites: "Bijare",
    profile: "Profîl",
    logout: "Derketin",
    no_results: "Encam nehate dîtin",
    // Quiz Component
    quiz: "Pirsyarî",
    question: "Pirs",
    awesome: "Pir baş!",
    you_earned: "Te qezenc kir",
    xp_points: "Puanên XP",
    new_words: "Peyvên nû",
    continue: "Berdewam bike",
    correct: "Rast e!",
    incorrect: "Şaş e",
    quiz_type_choice: "Cureyê Pirsyariyê Hilbijêre",
    quiz_type_mc: "Gelek Bijarde",
    quiz_type_mc_desc: "Wergara rast ji bijardeyan hilbijêre",
    quiz_type_write: "Nivîsandina Kurdî",
    quiz_type_write_desc: "Wergara bi kurdî binivîse",
    type_placeholder: "Bersiva xwe bi Kurmancî binivîse...",
    check: "Kontrol bike",
    correct_answer_is: "Bersiva rast ev e:",
    exit_confirm_title: "Derketina ji sepanê",
    exit_confirm_msg: "Tu bawer î ku dixwazî derkevî?",
    exit_confirm_yes: "Derkeve",
    exit_confirm_no: "Betal bike",
    daily_goal_title: "Armanca Rojane ya Xwendinê",
    daily_goal_desc: "Armanca xwe ya XP ya rojane hilbijêre",
    study_mins_today: "Xulekên îro hatine xwendin",
    of_mins: "ji",
    goal_mins_label: "Armanc",
    adjust_goal: "Armancê serrast bike",
    log_time_btn: "Dem tomar bike",
    start_session_btn: "Demjimêrê bide destpêkirin",
    pause_session_btn: "Demjimêrê rawestîne",
    add_1_min: "+1 xul",
    add_5_min: "+5 xul",
    add_10_min: "+10 xul",
    congrats_goal: "Armanca rojane pêk hat!",
    roadmap: "Rêça Perwerdeyê",
    roadmap_desc: "Nexşeya rêça fêrbûnê ya gav bi gav",
    games: "Lîstikên Têkildar",
    games_desc: "Bi rêya lîstikan fêr bibe",
    quiz_type_emoji: "Hevberkirina Emojiyan",
    quiz_type_emoji_desc: "Emojiyan bi peyvên kurdî re li hev bîne",
    error_generic_title: "Çewtî derket",
    error_generic_desc: "Di barkirina naverokê de çewtî çêbû. Ji kerema xwe cardin biceribîne.",
    retry: "Cardin Biceribîne",
    library: "Pirtûkxaneya Xwendinê",
    library_desc: "Çavkanî û babetên fêrbûnê yên berfireh bibîne",
    nav_sentences: "Hevok û Gotin",
    nav_dictionary: "Ferheng & Peyv",
    nav_favorites: "Bijareyên Min",
    nav_leaderboard: "Tabloya Pêşengan"
  },
  ar: {
    // Main UI
    app_title: "تعلم الكرمانجية",
    loading: "جاري التحميل...",
    home: "الرئيسية",
    alphabet: "الأبجدية",
    learning: "التعلّم",
    roadmap_tab: "الخارطة",
    profile_tab: "حسابي",
    quiz_hub_title: "الاختبارات",
    quiz_choose_title: "اختر نوع الاختبار",
    quiz_choose_sub: "تحدَّ نفسك وتعلّم أكثر!",
    quiz_mode_word_title: "اختبار الكلمات",
    quiz_mode_word_desc: "اختر المعنى الصحيح للكلمة",
    quiz_mode_listening_title: "اختبار الاستماع",
    quiz_mode_listening_desc: "استمع واختر الكلمة التي تسمعها",
    quiz_mode_writing_title: "اختبار الكتابة",
    quiz_mode_writing_desc: "اكتب الكلمة الكوردية بنفسك",
    quiz_mode_image_title: "اختبار الصور",
    quiz_mode_image_desc: "طابق الصورة مع الكلمة الصحيحة",
    quiz_mode_adaptive_title: "تدريب مستواي",
    quiz_mode_adaptive_desc: "أسئلة ذكية من الكلمات التي تعلمتها",
    quiz_mode_mixed_title: "تحدي الوحدة",
    quiz_coming_soon: "قريباً",
    quiz_verify: "التحقق",
    quiz_next: "التالي",
    quiz_feedback_correct: "Pir baş! أحسنت!",
    quiz_tap_to_replay: "اضغط للاستماع مرة أخرى",
    quiz_personalized_badge: "مخصص لك",
    tour_next: "التالي",
    tour_back: "السابق",
    tour_done: "تم",
    tour_welcome_title: "أهلاً بك في Kurdish Quest! 🌞",
    tour_welcome_desc: "لنقم بجولة سريعة لتعرف دائماً ما الخطوة التالية بالضبط. أكمل الجولة وستجد مكافأة من الجواهر بانتظارك!",
    tour_stats_title: "السلسلة والجواهر",
    tour_stats_desc: "سلسلة أيامك 🔥 ورصيد جواهرك 💎 هنا في الأعلى. تمرّن كل يوم لتحافظ على الشعلة مشتعلة.",
    tour_goal_title: "هدفك اليومي",
    tour_goal_desc: "هذا الشريط يتابع نقاط الخبرة التي تكسبها اليوم مقابل الهدف الذي اخترته. املأه يومياً لبناء عادة التعلم.",
    tour_lesson_title: "واصل التعلم",
    tour_lesson_desc: "درسك الموصى به التالي بانتظارك هنا دائماً — نقرة واحدة وتبدأ الدراسة.",
    tour_nav_roadmap_title: "افتح خريطة الطريق",
    tour_nav_roadmap_desc: "اضغط على تبويب الخريطة المُضاء لرؤية مسار تعلمك الكامل.",
    tour_map_title: "هذه خريطة طريقك",
    tour_map_desc: "الدروس مرتبة في عوالم، من أساسيات A1 وصعوداً. إكمال درس يفتح الدرس الذي يليه.",
    tour_first_lesson_title: "ابدأ درسك الأول",
    tour_first_lesson_desc: "اضغط على عقدة الدرس المتوهجة لمعاينة كلماتها والبدء. بالتوفيق!",
    tour_reward_title: "اكتملت الجولة! 💎 +20",
    tour_reward_msg: "حصلت على 20 جوهرة لإكمالك الجولة الإرشادية. رحلة موفقة!",
    tour_replay_title: "الجولة الإرشادية",
    tour_replay_desc: "إعادة تشغيل جولة التعريف بالتطبيق",
    tour_replay_btn: "إعادة",
    quiz_exit_title: "مغادرة الاختبار؟",
    quiz_exit_msg: "سيضيع تقدمك في هذه الجولة.",
    quiz_exit_keep: "متابعة الحل",
    quiz_exit_leave: "مغادرة",
    missions_title: "المهام اليومية",
    missions_sub: "أكمل المهام لتكسب الجواهر — تتجدد كل يوم",
    mission_claim: "استلام",
    mission_claimed: "تم الاستلام",
    mission_xp_title: "متعلم اليوم",
    mission_xp_desc: "اكسب 50 نقطة خبرة اليوم",
    mission_quiz_title: "بطل الاختبارات",
    mission_quiz_desc: "أكمل 3 اختبارات اليوم",
    mission_games_title: "فائز الألعاب",
    mission_games_desc: "افز بلعبتين اليوم",
    mission_perfect_title: "جولة مثالية",
    mission_perfect_desc: "حقق 100% في اختبار اليوم",
    goal_today_suffix: "نقطة اليوم",
    goal_adjust: "تعديل الهدف",
    goal_reached: "تحقق هدف اليوم! 🎉",
    goal_modal_title: "الهدف اليومي",
    goal_modal_desc: "اختر الوتيرة المناسبة ليومك. يُحفظ فوراً.",
    // --- متجر الجواهر ---
    store_brand: "متجر الجواهر",
    store_title: "المتجر",
    store_heading: "الجواهر والمكافآت",
    store_subtitle: "عزّز سلسلة تعلمك بالجواهر والتعزيزات.",
    store_balance: "رصيدك",
    store_preview_banner: "الشراء داخل التطبيق قريباً — وضع المعاينة",
    store_gem_packs: "حزم الجواهر",
    store_powerups: "التعزيزات",
    store_pack_small: "كيس صغير",
    store_pack_medium: "صندوق الدارس",
    store_pack_large: "الخزنة",
    store_gems: "جوهرة",
    store_best_value: "أفضل قيمة",
    store_coming_soon: "قريباً",
    store_freeze_title: "تجميد السلسلة",
    store_freeze_desc: "يحمي سلسلتك عند تفويت يوم واحد.",
    store_boost_title: "مضاعفة النقاط 2×",
    store_boost_desc: "اكسب ضعف النقاط في درسك القادم.",
    store_owned: "تملك",
    store_buy: "شراء",
    store_not_enough: "الجواهر غير كافية بعد — واصل التعلم!",
    store_freeze_bought: "تمت إضافة تجميد السلسلة! ❄️",
    // --- القانونية والموافقة وحول التطبيق ---
    legal_section: "الخصوصية والقانونية",
    privacy_policy: "سياسة الخصوصية",
    privacy_policy_desc: "كيف تُحفظ بياناتك وتُحمى",
    terms_of_service: "شروط الاستخدام",
    terms_of_service_desc: "قواعد استخدام Kurdish Quest",
    about_us: "من نحن",
    about_app_desc: "بُني Kurdish Quest بحب لإبقاء اللغة الكورمانجية حيّة — تعلّم باللعب والسلاسل والقصص وأغاني الجبال.",
    app_version: "الإصدار",
    made_with: "صُنع بـ ❤️ لمجتمع اللغة الكوردية",
    legal_agree_prefix: "أوافق على",
    legal_and: "و",
    legal_required_hint: "يرجى قبول الشروط للمتابعة.",
    // --- تجربة المستخدم الأولى + معالج التهيئة ---
    ftux_welcome_title: "Bi xêr hatî bo Kurdish Quest! 👋",
    ftux_welcome_tagline: "اكتشف الكورمانجية — لحن الجبال. تعلّم باللعب والسلاسل والقصص.",
    ftux_get_started: "ابدأ الآن",
    ftux_lang_title: "Zimanê te yê zikmakî çi ye?",
    ftux_lang_subtitle: "اختر لغة التطبيق المفضلة لديك. يمكنك تغييرها لاحقاً من الإعدادات.",
    ftux_auth_title: "اقتربنا من البداية!",
    ftux_auth_subtitle: "سجّل الدخول لحفظ تقدمك عبر الأجهزة، أو ابدأ فوراً.",
    ftux_google: "المتابعة عبر Google",
    ftux_or: "أو",
    ftux_guest_hint: "لا حاجة لحساب — يُحفظ تقدمك على هذا الجهاز.",
    ftux_back: "رجوع",
    onb_step: "خطوة",
    onb_reason_title: "لماذا تتعلم الكورمانجية؟",
    onb_reason_subtitle: "سنصمم رحلتك بناءً على هدفك.",
    onb_reason_family: "العائلة والجذور",
    onb_reason_family_desc: "تواصل مع جذورك وأحبّتك.",
    onb_reason_travel: "السفر والتواصل",
    onb_reason_travel_desc: "تحدث مع الناس واستكشف كوردستان.",
    onb_reason_culture: "الثقافة والأدب الكوردي",
    onb_reason_culture_desc: "الشعر والموسيقى والدنكبيج والحكايات.",
    onb_reason_career: "العمل والدراسة",
    onb_reason_career_desc: "أهداف مهنية وبحثية وأكاديمية.",
    onb_level_title: "ما هو مستواك الحالي؟",
    onb_level_subtitle: "كن صريحاً — سنبدأ من حيث أنت.",
    onb_level_beginner: "مبتدئ تماماً",
    onb_level_beginner_desc: "أبدأ من الصفر (A1).",
    onb_level_basics: "أعرف كلمات أساسية قليلة",
    onb_level_basics_desc: "التحيات وجمل بسيطة.",
    onb_level_intermediate: "متوسط",
    onb_level_intermediate_desc: "أستطيع إجراء محادثات بسيطة.",
    onb_goal_title: "اختر هدفك اليومي",
    onb_goal_subtitle: "خطوات صغيرة يومية خير من قفزات نادرة.",
    onb_goal_casual: "خفيف",
    onb_goal_casual_desc: "٥ دقائق / يوم · 20 XP",
    onb_goal_regular: "منتظم",
    onb_goal_regular_desc: "١٠ دقائق / يوم · 50 XP",
    onb_goal_serious: "جاد",
    onb_goal_serious_desc: "١٥ دقيقة / يوم · 100 XP",
    onb_avatar_title: "اختر شخصيتك",
    onb_avatar_subtitle: "رفيقك في الرحلة — يمكن تغييره في أي وقت.",
    onb_finish: "ابدأ التعلم!",
    words: "الكلمات",
    games_tab: "الألعاب",
    // Login
    login_title_1: "تعلم الكرمانجية",
    login_title_2: "سَهْل ومُمتِع",
    login_desc: "ابدأ رحلتك لإتقان اللغة الكرمانجية من خلال اللعب!",
    enter_name: "أدخل اسمك",
    start_playing: "ابدأ اللعب",
    // Dashboard
    welcome_back: "مرحباً بعودتك،",
    learner: "متعلم",
    level: "المستوى",
    total_xp: "إجمالي النقاط",
    xp_to_next: "نقطة للمستوى التالي",
    day_streak: "أيام متتالية",
    words_learned: "كلمات",
    learning_path: "مسار التعلم",
    module_alphabet: "الأبجدية",
    module_alphabet_desc: "تعلم الحروف",
    module_vocab: "المفردات",
    module_vocab_desc: "كلمات يومية",
    module_sentences: "الجُمل",
    module_sentences_desc: "عبارات شائعة",
    module_academic: "المصطلحات الأكاديمية",
    module_academic_desc: "مفردات تعليمية ودراسية",
    // Alphabet Component
    vowel: "صوتي",
    consonant: "ساكن",
    // Vocabulary Categories
    categories_title: "التصنيفات",
    categories_desc: "اختر موضوعاً للدراسة",
    practice: "تمرين",
    // Vocabulary List
    practice_module: "تدرّب على هذه الوحدة",
    // Sentences
    listen_and_read: "استمع واقرأ",
    // Academic & Favorites
    daily_word: "كلمة اليوم",
    level_beginner: "مبتدئ",
    level_intermediate: "متوسط",
    level_advanced: "متقدم",
    level_professional: "محترف/جامعي",
    search_terms: "ابحث عن المصطلحات...",
    all_levels: "جميع المستويات",
    favorites: "المفضلة",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    no_results: "لا توجد نتائج",
    // Quiz Component
    quiz: "اختبار",
    question: "السؤال",
    awesome: "رائع!",
    you_earned: "لقد كسبت",
    xp_points: "نقاط خبرة",
    new_words: "كلمات جديدة",
    continue: "متابعة",
    correct: "صحيح!",
    incorrect: "خطأ",
    quiz_type_choice: "اختر نوع الاختبار",
    quiz_type_mc: "اختيار من متعدد",
    quiz_type_mc_desc: "اختر الترجمة الصحيحة من الخيارات المعروضة",
    quiz_type_write: "اختبار كتابة الكلمات بالكوردية",
    quiz_type_write_desc: "اكتب الكلمة الكوردية المطابقة للمصطلح المعروض",
    type_placeholder: "اكتب الإجابة باللغة الكوردية...",
    check: "التحقق",
    correct_answer_is: "الإجابة الصحيحة هي:",
    exit_confirm_title: "خروج من التطبيق",
    exit_confirm_msg: "هل أنت متأكد من رغبتك في الخروج؟",
    exit_confirm_yes: "خروج",
    exit_confirm_no: "إلغاء",
    daily_goal_title: "الهدف اليومي للدراسة",
    daily_goal_desc: "اختر هدفك اليومي من نقاط الخبرة",
    study_mins_today: "دقيقة مدروسة اليوم",
    of_mins: "من أصل",
    goal_mins_label: "الهدف",
    adjust_goal: "تعديل الهدف",
    log_time_btn: "تسجيل الوقت",
    start_session_btn: "بدأ مؤقت الدراسة",
    pause_session_btn: "إيقاف مؤقت",
    add_1_min: "+1 دقيقة",
    add_5_min: "+5 د",
    add_10_min: "+10 د",
    congrats_goal: "تم تحقيق هدفك اليومي!",
    roadmap: "مسار التعلم",
    roadmap_desc: "الخطة التعليمية المتسلسلة والمميزة في الخريطة",
    games: "الألعاب التفاعلية",
    games_desc: "تسلّى ببطاقات الذاكرة وتركيب الكلمات من الحروف التفاعلية",
    quiz_type_emoji: "مطابقة الرموز وإيموجي",
    quiz_type_emoji_desc: "اربط الرمز التعبيري بالكلمة الكوردية المناسبة بصرياً",
    error_generic_title: "حدث خطأ ما",
    error_generic_desc: "حدث خطأ أثناء تحميل المحتوى. يرجى المحاولة مرة أخرى.",
    retry: "إعادة المحاولة",
    library: "مكتبة التعلم",
    library_desc: "استكشف مصادر ومواد تعليمية شاملة",
    nav_sentences: "الجمل والعبارات",
    nav_dictionary: "القاموس والمفردات",
    nav_favorites: "المفضلة",
    nav_leaderboard: "لوحة الصدارة"
  }
};
function t(lang, key) {
  const dictionary = translations[lang] || translations.en;
  return dictionary[key] || translations.en[key] || key;
}
function tLevel(lang, level) {
  const normalized = level.toLowerCase().replace(/^level_/, "");
  const key = `level_${normalized}`;
  if (key in translations.en) {
    return t(lang, key);
  }
  return level;
}
function getLayoutDirection(lang) {
  return lang === "ar" ? "rtl" : "ltr";
}
const NUMBER_FAMILY_HISTORY_STATE = "number-family";
function getRouteMeta(pathname, language) {
  const isAr = language === "ar";
  const isKu = language === "ku";
  if (pathname === "/") {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "KWESTA KURDÎ" : isAr ? "كويست الكورمانجية" : "KURMANJI QUEST",
      title: "Zimanê Kurdî",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname === "/login") {
    return {
      isMainTab: true,
      hideHeader: true,
      hideBottomNav: true,
      brandLabel: isKu ? "BI XÊR HATÎ" : isAr ? "مرحباً" : "WELCOME",
      title: isKu ? "Têketin" : isAr ? "تسجيل الدخول" : "Login",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname === "/alphabet") {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "LÎSTEYA TÎPAN" : isAr ? "دراسة الأبجدية" : "ALPHABET STUDY",
      title: isKu ? "Tîpên Kurdî" : isAr ? "الحروف الكوردية" : "Letters",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname === "/vocabulary") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "FERHENG Û PEYV" : isAr ? "القاموس والمفردات" : "DICTIONARY",
      title: isKu ? "Kategorî" : isAr ? "التصنيفات" : "Categories",
      safeBackTo: isKu ? "Rêç" : isAr ? "الخارطة" : "Roadmap"
    };
  }
  if (pathname.startsWith("/vocabulary/")) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "PEYV" : isAr ? "المفردات" : "VOCABULARY",
      title: isKu ? "Lîsteya Peyvan" : isAr ? "قائمة الكلمات" : "Word List",
      safeBackTo: isKu ? "Kategorî" : isAr ? "التصنيفات" : "Categories"
    };
  }
  if (pathname === "/sentences") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "HEVOK" : isAr ? "الجمل" : "PHRASES",
      title: isKu ? "Hevokên Belav" : isAr ? "العبارات الشائعة" : "Common Phrases",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname.startsWith("/writing/words/")) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "PEYV" : isAr ? "كلمات" : "WORDS",
      title: isKu ? "Peyv" : isAr ? "كلمة" : "Word",
      safeBackTo: isKu ? "Peyv" : isAr ? "كلمات" : "Words"
    };
  }
  if (pathname === "/writing/words") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "NIVÎSÎN" : isAr ? "الكتابة" : "WRITING",
      title: isKu ? "Peyv" : isAr ? "كلمات" : "Words",
      safeBackTo: isKu ? "Nivîsîn" : isAr ? "الكتابة" : "Writing"
    };
  }
  if (pathname.startsWith("/writing/sentences/")) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "HEVOK" : isAr ? "جُمَل" : "SENTENCES",
      title: isKu ? "Hevok" : isAr ? "جملة" : "Sentence",
      safeBackTo: isKu ? "Hevok" : isAr ? "جُمَل" : "Sentences"
    };
  }
  if (pathname === "/writing/sentences") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "NIVÎSÎN" : isAr ? "الكتابة" : "WRITING",
      title: isKu ? "Hevok" : isAr ? "جُمَل" : "Sentences",
      safeBackTo: isKu ? "Nivîsîn" : isAr ? "الكتابة" : "Writing"
    };
  }
  if (pathname.startsWith("/writing/")) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "NIVÎSÎN" : isAr ? "الكتابة" : "WRITING",
      title: isKu ? "Şopandin" : isAr ? "الكتابة" : "Trace",
      safeBackTo: isKu ? "Nivîsîn" : isAr ? "الكتابة" : "Writing"
    };
  }
  if (pathname === "/writing") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "NIVÎSÎN" : isAr ? "الكتابة" : "WRITING",
      title: isKu ? "Nivîsîn" : isAr ? "الكتابة" : "Writing",
      safeBackTo: isKu ? "Fêrbûn" : isAr ? "التعلّم" : "Learning"
    };
  }
  if (pathname.startsWith("/grammar/")) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "RÊZIMAN" : isAr ? "قواعد" : "GRAMMAR",
      title: isKu ? "Ders" : isAr ? "الدرس" : "Lesson",
      safeBackTo: isKu ? "Rêziman" : isAr ? "النحو" : "Grammar"
    };
  }
  if (pathname === "/grammar") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "RÊZIMAN" : isAr ? "قواعد" : "GRAMMAR",
      title: isKu ? "Rêziman" : isAr ? "النحو" : "Grammar",
      safeBackTo: isKu ? "Fêrbûn" : isAr ? "التعلّم" : "Learning"
    };
  }
  if (pathname === "/favorites") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "KOMEL" : isAr ? "مجموعتي" : "SAVED",
      title: isKu ? "Bijare" : isAr ? "المفضلة" : "Favorites",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname.startsWith("/quiz/")) {
    return {
      isMainTab: false,
      // DESIGN FIX: the quiz screens render their own compact header (exit,
      // mode title, hearts, counter). Stacking the app bar above it produced
      // double chrome — two headers and two back affordances — in a flow
      // that is declared immersive.
      hideHeader: true,
      hideBottomNav: true,
      brandLabel: isKu ? "PIRS" : isAr ? "التحدي" : "QUIZ ZONE",
      title: isKu ? "Pirs" : isAr ? "اختبار" : "Quiz",
      safeBackTo: isKu ? "Rêç" : isAr ? "الخارطة" : "Roadmap",
      shellMode: "immersive"
    };
  }
  if (pathname === "/roadmap") {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "PLANA DERSAN" : isAr ? "المنهج الدراسي" : "CURRICULUM",
      title: isKu ? "Rêça Hînbûnê" : isAr ? "الخارطة التعليمية" : "Roadmap",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname === "/games") {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "LÎSTIKÊN ŞAHIYÊ" : isAr ? "ركن الألعاب" : "FUN ARCADE",
      title: isKu ? "Lîstikên Perwerdeyê" : isAr ? "الألعاب التعليمية" : "Mini-Games",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname === "/store") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "DIKANA GEWHERAN" : isAr ? "متجر الجواهر" : "GEM STORE",
      title: isKu ? "Dikan" : isAr ? "المتجر" : "Store",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname === "/search") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "FERHENG" : isAr ? "المعجم الكوردي" : "GLOSSARY",
      title: isKu ? "Lêgerîn" : isAr ? "البحث" : "Search",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname === "/profile") {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "HESAB" : isAr ? "الحساب" : "ACCOUNT",
      title: isKu ? "Profîl" : isAr ? "الملف الشخصي" : "Profile",
      safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
    };
  }
  if (pathname === "/leaderboard") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "RÊZBÛN" : isAr ? "الترتيب" : "RANKING",
      title: isKu ? "Tabloya Pêşengan" : isAr ? "لوحة الصدارة" : "Leaderboard",
      safeBackTo: isKu ? "Profîl" : isAr ? "الملف الشخصي" : "Profile"
    };
  }
  if (pathname === "/privacy") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "PARASTINA DANEYAN" : isAr ? "الخصوصية" : "COMPLIANCE",
      title: isKu ? "Rêbaza Nepeniyê" : isAr ? "سياسة الخصوصية" : "Privacy Policy",
      safeBackTo: isKu ? "Profîl" : isAr ? "الملف الشخصي" : "Profile"
    };
  }
  if (pathname === "/terms") {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: isKu ? "ŞERTÊN BIKARANÎNÊ" : isAr ? "الشروط" : "COMPLIANCE",
      title: isKu ? "Mercên Xizmetê" : isAr ? "شروط الخدمة" : "Terms of Service",
      safeBackTo: isKu ? "Profîl" : isAr ? "الملف الشخصي" : "Profile"
    };
  }
  return {
    isMainTab: false,
    hideHeader: false,
    hideBottomNav: false,
    brandLabel: isKu ? "KWESTA KURDÎ" : isAr ? "كويست الكورمانجية" : "KURMANJI QUEST",
    title: isKu ? "Hîn Bibe" : isAr ? "تعلم" : "Learn",
    safeBackTo: isKu ? "Mal" : isAr ? "الرئيسية" : "Home"
  };
}
function navigateSafelyBack(navigate, pathname) {
  const historyIdx = globalThis.window !== void 0 && window.history.state && Number.isInteger(window.history.state.idx) ? window.history.state.idx : 0;
  if (historyIdx > 0) {
    navigate(-1);
    return;
  }
  if (pathname.startsWith("/vocabulary/")) {
    navigate("/learn");
  } else if (pathname === "/vocabulary") {
    navigate("/roadmap");
  } else if (pathname.startsWith("/quiz/")) {
    navigate("/roadmap");
  } else if (pathname === "/leaderboard" || pathname === "/privacy" || pathname === "/terms") {
    navigate("/profile");
  } else if (pathname === "/grammar") {
    navigate("/learn");
  } else if (pathname.startsWith("/grammar/")) {
    navigate("/grammar");
  } else if (pathname === "/writing") {
    navigate("/learn");
  } else if (pathname.startsWith("/writing/words/")) {
    navigate("/writing/words");
  } else if (pathname === "/writing/words") {
    navigate("/writing");
  } else if (pathname.startsWith("/writing/sentences/")) {
    navigate("/writing/sentences");
  } else if (pathname === "/writing/sentences") {
    navigate("/writing");
  } else if (pathname.startsWith("/writing/")) {
    navigate("/writing");
  } else {
    navigate("/");
  }
}
const backInterceptors = [];
function registerBackInterceptor(fn) {
  backInterceptors.push(fn);
  return () => {
    const idx = backInterceptors.indexOf(fn);
    if (idx >= 0) backInterceptors.splice(idx, 1);
  };
}
function runBackInterceptors() {
  for (let i = backInterceptors.length - 1; i >= 0; i--) {
    if (backInterceptors[i]()) return true;
  }
  return false;
}
const DEFAULT_REMINDER_SETTINGS = {
  enabled: true,
  hour: 18
  // Default to 6:00 PM (18:00)
};
function getReminderSettings() {
  try {
    const stored = localStorage.getItem("kurdish_quest_reminder_settings");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse reminder settings", e);
  }
  return DEFAULT_REMINDER_SETTINGS;
}
function saveReminderSettings(settings) {
  localStorage.setItem("kurdish_quest_reminder_settings", JSON.stringify(settings));
}
function supportsNotifications() {
  return globalThis.window !== void 0 && "Notification" in window;
}
function isNotificationPermissionGranted() {
  if (!supportsNotifications()) return false;
  return Notification.permission === "granted";
}
function getTodayDateString() {
  const d = /* @__PURE__ */ new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function hasUserStudiedToday(lastActiveTime) {
  if (!lastActiveTime) return false;
  const lastActiveDate = new Date(lastActiveTime).toDateString();
  const todayDate = (/* @__PURE__ */ new Date()).toDateString();
  return lastActiveDate === todayDate;
}
function checkAndTriggerReminder(lastActiveTime, lang) {
  const result = { triggered: false, message: "", title: "" };
  const settings = getReminderSettings();
  if (!settings.enabled) return result;
  if (hasUserStudiedToday(lastActiveTime)) {
    return result;
  }
  const currentHour = (/* @__PURE__ */ new Date()).getHours();
  if (currentHour < settings.hour) {
    return result;
  }
  const todayStr = getTodayDateString();
  const notifiedDatesStr = localStorage.getItem("kurdish_quest_notified_dates") || "";
  const notifiedDates = notifiedDatesStr.split(",").filter(Boolean);
  if (notifiedDates.includes(todayStr)) {
    return result;
  }
  const details = getReminderContent(lang);
  notifiedDates.push(todayStr);
  if (notifiedDates.length > 7) {
    notifiedDates.shift();
  }
  localStorage.setItem("kurdish_quest_notified_dates", notifiedDates.join(","));
  triggerNativeNotification(details.title, details.body);
  return {
    triggered: true,
    title: details.title,
    message: details.body
  };
}
function triggerNativeNotification(title, body) {
  if (supportsNotifications() && isNotificationPermissionGranted()) {
    try {
      new Notification(title, {
        body,
        icon: "/pwa-192x192.png",
        badge: "/favicon.png",
        tag: "streak-reminder"
      });
      return true;
    } catch (e) {
      console.error("Failed to trigger native notification", e);
    }
  }
  return false;
}
function getReminderContent(lang) {
  if (lang === "ku") {
    return {
      title: "Kwesta Kurdî: Rêza Xwe Biparêze!",
      body: "Asta nû li benda te ye! Îro 1 deqeyê veqetîne ji bo pratîka Kurdî û domandina rêza hînbûna xwe."
    };
  }
  if (lang === "ar") {
    return {
      title: "تحدي الكردية: حافظ على حماسك!",
      body: "المستوى القادم بانتظارك! خصص دقيقة واحدة الآن للتدرب على الكلمات الكردية والحفاظ على أيامك المتتالية."
    };
  }
  return {
    title: "Kurdish Quest: Keep Your Streak!",
    body: "The next level is waiting! Take 1 minute today to practice Kurdish and keep your learning streak burning."
  };
}
const VARIANTS = {
  primary: "bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] border border-transparent shadow-[0_3px_0_#E69500,0_10px_20px_rgba(255,179,0,0.22)]",
  secondary: "bg-white dark:bg-slate-900 text-ink border border-line-soft shadow-[0_2px_10px_rgba(0,0,0,0.04)]",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-surface-2",
  danger: "bg-[#EF4444] hover:bg-[#DC2626] text-white border border-transparent shadow-[0_3px_0_#B91C1C,0_10px_20px_rgba(239,68,68,0.22)]",
  success: "bg-[#10B981] hover:bg-[#0DA271] text-white border border-transparent shadow-[0_3px_0_#00A86B,0_10px_20px_rgba(16,185,129,0.22)]",
  outline: "bg-transparent text-brand-deep border-2 border-[#FFB300] hover:bg-surface-2"
};
const SIZES = {
  // min-h keeps every size at or above the 44px touch-target floor.
  // Pill shape per DESIGN.md ("Interactive Pills").
  sm: "min-h-[44px] px-4 py-2 text-xs rounded-full gap-1.5",
  md: "min-h-[50px] px-5 py-3 text-sm rounded-full gap-2",
  lg: "min-h-[58px] px-6 py-4 text-base rounded-full gap-2.5"
};
const Button = React.forwardRef(function Button2({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}, ref) {
  const isDisabled = disabled || loading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      ref,
      type,
      disabled: isDisabled,
      "aria-busy": loading || void 0,
      className: cn(
        "inline-flex items-center justify-center font-black tracking-tight",
        "transition-all duration-150 cursor-pointer select-none",
        "hover:-translate-y-0.5 active:translate-y-1 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB300] focus-visible:ring-offset-2",
        "dark:focus-visible:ring-[#FFBA38] dark:focus-visible:ring-offset-slate-900",
        "disabled:cursor-not-allowed disabled:active:scale-100 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:border-transparent dark:disabled:bg-slate-800 dark:disabled:text-slate-600",
        // prefers-reduced-motion is handled globally in index.css
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className
      ),
      ...rest,
      children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin", "aria-hidden": "true" }) : leadingIcon,
        children,
        !loading && trailingIcon
      ]
    }
  );
});
const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  variant = "center",
  hideCloseButton = false,
  closeLabel = "Close modal",
  className
}) {
  const panelRef = reactExports.useRef(null);
  const previouslyFocused = reactExports.useRef(null);
  const titleId = reactExports.useRef(`modal-title-${Math.random().toString(36).slice(2, 9)}`).current;
  const descId = reactExports.useRef(`modal-desc-${Math.random().toString(36).slice(2, 9)}`).current;
  reactExports.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    const id = window.setTimeout(() => {
      var _a, _b;
      const first = (_a = panelRef.current) == null ? void 0 : _a.querySelector(FOCUSABLE);
      (_b = first ?? panelRef.current) == null ? void 0 : _b.focus();
    }, 0);
    return () => {
      var _a, _b;
      window.clearTimeout(id);
      (_b = (_a = previouslyFocused.current) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      var _a;
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(((_a = panelRef.current) == null ? void 0 : _a.querySelectorAll(FOCUSABLE)) ?? []);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );
  if (globalThis.document === void 0) return null;
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "fixed inset-0 z-[100] flex justify-center p-0 sm:p-4",
          variant === "sheet" ? "items-end sm:items-center" : "items-center"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              onClick: onClose,
              className: "absolute inset-0 bg-slate-900/50 backdrop-blur-md",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              ref: panelRef,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": titleId,
              "aria-describedby": description ? descId : void 0,
              tabIndex: -1,
              onKeyDown: handleKeyDown,
              initial: variant === "sheet" ? { y: "100%", opacity: 0.6 } : { scale: 0.95, opacity: 0 },
              animate: variant === "sheet" ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 },
              exit: variant === "sheet" ? { y: "100%", opacity: 0.6 } : { scale: 0.95, opacity: 0 },
              transition: { type: "spring", damping: 26, stiffness: 240 },
              className: cn(
                "relative z-10 w-full max-w-md bg-white dark:bg-slate-950",
                "border border-line shadow-[0_24px_60px_rgba(0,0,0,0.18)]",
                "flex flex-col gap-4 p-6 max-h-[90vh] overflow-y-auto outline-none",
                variant === "sheet" ? "rounded-t-[32px] sm:rounded-[32px]" : "rounded-[28px] m-4",
                className
              ),
              children: [
                variant === "sheet" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto -mt-2 sm:hidden" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: titleId, className: "text-lg font-black text-slate-900 dark:text-white tracking-tight", children: title }),
                    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: descId, className: "text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed", children: description })
                  ] }),
                  !hideCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      "aria-label": "Close dialog",
                      className: "shrink-0 min-w-[44px] min-h-[44px] -me-2 -mt-2 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                    }
                  )
                ] }),
                children
              ]
            }
          )
        ]
      }
    ) }),
    document.body
  );
}
function Spinner({ size = "md", className, label, showLabel = false }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: cn("animate-spin text-brand", sizeClasses[size], className) }),
    showLabel && label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-500 dark:text-slate-400", children: label })
  ] });
}
function ErrorState({
  icon,
  title = "Something went wrong",
  description,
  retryLabel = "Try again",
  onRetry,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-3xl bg-surface border-2 border-line", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center", children: icon || /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black text-ink", children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted font-medium", children: description })
    ] }),
    onRetry && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onRetry, children: retryLabel })
  ] });
}
function SunMark({ className }) {
  const rays = Array.from({ length: 21 }, (_, i) => {
    const a = i * 2 * Math.PI / 21 - Math.PI / 2;
    return {
      x1: 50 + Math.cos(a) * 26,
      y1: 50 + Math.sin(a) * 26,
      x2: 50 + Math.cos(a) * 46,
      y2: 50 + Math.sin(a) * 46
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className, "aria-hidden": "true", fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "17", fill: "currentColor" }),
    rays.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "line",
      {
        x1: r.x1,
        y1: r.y1,
        x2: r.x2,
        y2: r.y2,
        stroke: "currentColor",
        strokeWidth: "4.5",
        strokeLinecap: "round"
      },
      i
    ))
  ] });
}
const COPY$1 = {
  en: {
    installApp: "Install App",
    installIOS: "Add to Home Screen",
    iosTitle: "Install on iPhone / iPad",
    iosStep1: "Tap the Share button in Safari toolbar.",
    iosStep2: 'Scroll down and tap "Add to Home Screen".',
    close: "Close"
  },
  ar: {
    installApp: "تثبيت التطبيق",
    installIOS: "إضافة للشاشة الرئيسية",
    iosTitle: "التثبيت على iPhone و iPad",
    iosStep1: "اضغط على زر المشاركة (Share) في شريط Safari.",
    iosStep2: 'مرّر للأسفل واختر "إضافة إلى الشاشة الرئيسية".',
    close: "إغلاق"
  },
  ku: {
    installApp: "Sepanê Saz Bike",
    installIOS: "Li Ekrana Sereke Zêde Bike",
    iosTitle: "Li ser iPhone / iPad Saz Bike",
    iosStep1: "Li ser bişkoka Parvekirinê (Share) di Safari de bitikîne.",
    iosStep2: 'Biçe xwarê û "Add to Home Screen" hilbijêre.',
    close: "Bigire"
  }
};
const PWAInstallButton = ({
  compact = false,
  className = ""
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language } = useAuth();
  const [showIOSGuide, setShowIOSGuide] = reactExports.useState(false);
  if (isInstalled) {
    return null;
  }
  const strings = COPY$1[language] ?? COPY$1.en;
  if (isInstallable) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void install(),
        className: `inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${className}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 shrink-0", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: strings.installApp })
        ]
      }
    );
  }
  if (isIOS) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowIOSGuide(true),
          className: `inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-extrabold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${className}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share, { className: "w-4 h-4 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: compact ? strings.installApp : strings.installIOS })
          ]
        }
      ),
      showIOSGuide && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "ios-install-title",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl text-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "ios-install-title", className: "text-base font-extrabold text-slate-900 dark:text-white", children: strings.iosTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowIOSGuide(false),
                  "aria-label": strings.close,
                  className: "min-w-[44px] min-h-[44px] -me-2 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-3 text-sm text-slate-600 dark:text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share, { className: "w-4 h-4", "aria-hidden": "true" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: strings.iosStep1 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePlus, { className: "w-4 h-4", "aria-hidden": "true" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: strings.iosStep2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowIOSGuide(false),
                className: "mt-5 w-full min-h-[44px] rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer",
                children: strings.close
              }
            )
          ] })
        }
      )
    ] });
  }
  return null;
};
const AVATARS = [
  { id: "av-1", icon: "user", color: "bg-blue-100 text-blue-600" },
  { id: "av-2", icon: "smile", color: "bg-rose-100 text-rose-600" },
  { id: "av-3", icon: "graduation-cap", color: "bg-amber-100 text-amber-600" },
  { id: "av-4", icon: "flame", color: "bg-emerald-100 text-emerald-600" },
  { id: "av-5", icon: "sparkles", color: "bg-indigo-100 text-indigo-600" },
  { id: "av-6", icon: "star", color: "bg-fuchsia-100 text-fuchsia-600" },
  { id: "av-7", icon: "compass", color: "bg-slate-100 text-slate-600" },
  { id: "av-8", icon: "award", color: "bg-yellow-100 text-yellow-600" }
];
const renderHeaderAvatarIcon = (iconName) => {
  const iconMap = {
    user: User,
    smile: Smile,
    "graduation-cap": GraduationCap,
    flame: Flame,
    sparkles: Sparkles,
    star: Star,
    compass: Compass,
    award: Award
  };
  const IconComponent = iconMap[iconName] || User;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-5 h-5" });
};
const LEARN_ACTIVE_PATHS = [
  "/learn",
  "/alphabet",
  "/vocabulary/numbers",
  "/vocabulary/colors",
  "/grammar",
  "/grammar/pronouns",
  "/grammar/verbs",
  "/grammar/nouns",
  "/grammar/sentence-structure",
  "/grammar/prepositions",
  "/writing",
  "/writing/words",
  "/writing/sentences"
];
function isNavPathActive(path, current, activePaths) {
  return Boolean(
    activePaths && (activePaths.includes(current) || current.startsWith(path)) || current === path || path !== "/" && current.startsWith(path)
  );
}
function MainLayout() {
  const { user, userData, loading, language, setLanguage, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const routeMeta = getRouteMeta(location.pathname, language);
  const isProfile = location.pathname === "/profile";
  const selectedHeaderAvatar = AVATARS.find((a) => a.id === (userData == null ? void 0 : userData.avatarId)) || AVATARS[0];
  const [showExitModal, setShowExitModal] = reactExports.useState(false);
  const mainScrollRef = reactExports.useRef(null);
  const scrollPositionsRef = reactExports.useRef({});
  reactExports.useEffect(() => {
    const el = mainScrollRef.current;
    if (navigationType === "POP") {
      const saved = scrollPositionsRef.current[location.key] ?? 0;
      if (el) {
        el.scrollTop = saved;
        el.scrollLeft = 0;
      }
      if (globalThis.window !== void 0) window.scrollTo(0, saved);
    } else {
      if (el) {
        el.scrollTop = 0;
        el.scrollLeft = 0;
      }
      if (globalThis.window !== void 0) window.scrollTo(0, 0);
    }
  }, [location.key, location.pathname, navigationType]);
  reactExports.useEffect(() => {
    const el = mainScrollRef.current;
    if (!el) return;
    const capture = () => {
      scrollPositionsRef.current[location.key] = el.scrollTop;
    };
    el.addEventListener("scroll", capture, { passive: true });
    return () => el.removeEventListener("scroll", capture);
  }, [location.key]);
  const [activeNotification, setActiveNotification] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!activeNotification) return;
    const timer = setTimeout(() => setActiveNotification(null), 8e3);
    return () => clearTimeout(timer);
  }, [activeNotification]);
  const [isGameActive, setIsGameActive] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleGameActive = (e) => {
      const customEvent = e;
      if (customEvent && (customEvent.detail === true || customEvent.detail === false)) {
        setIsGameActive(customEvent.detail && location.pathname === "/games");
      }
    };
    window.addEventListener("set-game-active", handleGameActive);
    return () => {
      window.removeEventListener("set-game-active", handleGameActive);
    };
  }, [location.pathname]);
  reactExports.useEffect(() => {
    if (location.pathname !== "/games" && isGameActive) {
      setIsGameActive(false);
    }
  }, [isGameActive, location.pathname]);
  reactExports.useEffect(() => {
    if (loading || !user || !userData) return;
    const checkReminder = () => {
      const result = checkAndTriggerReminder(userData.lastActive, language);
      if (result.triggered) {
        setActiveNotification({
          title: result.title,
          message: result.message
        });
      }
    };
    const initialTimeout = setTimeout(checkReminder, 3e3);
    const intervalId = setInterval(checkReminder, 6e4);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [user, loading, userData, language]);
  reactExports.useEffect(() => {
    const handleInAppTrigger = (e) => {
      const customEvent = e;
      if (customEvent.detail) {
        setActiveNotification(customEvent.detail);
      }
    };
    window.addEventListener("trigger-in-app-notification", handleInAppTrigger);
    return () => {
      window.removeEventListener("trigger-in-app-notification", handleInAppTrigger);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!loading && !user && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [user, loading, location, navigate]);
  const lastKqFamilyEntryWasNumberFamily = () => {
    var _a;
    const state = typeof window !== "undefined" ? (_a = window.history) == null ? void 0 : _a.state : null;
    return state != null && state.usr === NUMBER_FAMILY_HISTORY_STATE;
  };
  const historyBack = () => {
    var _a;
    if (typeof window !== "undefined" && typeof ((_a = window.history) == null ? void 0 : _a.back) === "function") {
      window.history.back();
    }
  };
  const handleSmartBack = () => {
    if (runBackInterceptors()) {
      return;
    }
    if (location.pathname === "/vocabulary/numbers" && lastKqFamilyEntryWasNumberFamily()) {
      historyBack();
      return;
    }
    navigateSafelyBack(navigate, location.pathname);
  };
  reactExports.useEffect(() => {
    const platform = getPlatform();
    if (!platform.getCapabilities().isNative) {
      return;
    }
    const handleNativeBack = () => {
      if (runBackInterceptors()) {
        return;
      }
      if (showExitModal) {
        setShowExitModal(false);
        return;
      }
      if (location.pathname === "/" || location.pathname === "/login") {
        setShowExitModal(true);
        return;
      }
      if (location.pathname === "/vocabulary/numbers" && lastKqFamilyEntryWasNumberFamily()) {
        historyBack();
        return;
      }
      navigateSafelyBack(navigate, location.pathname);
    };
    return platform.onHardwareBackButton(() => {
      handleNativeBack();
      return true;
    });
  }, [location.pathname, navigate, showExitModal]);
  const isMainTab = routeMeta.isMainTab;
  const isLogin = routeMeta.hideHeader && location.pathname === "/login";
  const shouldHideHeader = routeMeta.hideHeader || isGameActive;
  const shouldHideBottomNav = routeMeta.hideBottomNav || isGameActive || isLogin;
  reactExports.useEffect(() => {
    if (globalThis.document !== void 0) {
      document.documentElement.lang = language;
      document.documentElement.dir = getLayoutDirection(language);
    }
  }, [language]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[100dvh] w-full flex items-center justify-center text-brand-deep dark:text-[#FFCE6B] font-bold text-2xl", children: t(language, "loading") });
  }
  const primaryNavItems = [
    { path: "/", label: t(language, "home"), icon: Hash },
    { path: "/learn", activePaths: LEARN_ACTIVE_PATHS, label: t(language, "learning"), icon: GraduationCap },
    { path: "/roadmap", label: t(language, "roadmap_tab"), icon: Map$1, tourId: "nav-roadmap" },
    { path: "/games", label: t(language, "games_tab"), icon: Gamepad2 },
    { path: "/profile", label: t(language, "profile_tab"), icon: User }
  ];
  const secondaryLinks = [
    { path: "/search", label: t(language, "nav_dictionary"), icon: Search$1 },
    { path: "/favorites", label: t(language, "nav_favorites"), icon: Heart },
    { path: "/leaderboard", label: language === "ar" ? "المتصدرون" : language === "ku" ? "Rêzbendî" : "Leaderboard", icon: Trophy },
    { path: "/store", label: language === "ar" ? "المتجر" : language === "ku" ? "Firoşgeh" : "Store", icon: ShoppingBag }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      dir: getLayoutDirection(language),
      className: cn(
        "h-[100dvh] w-full flex text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 overflow-hidden",
        isGameActive ? "bg-slate-950" : "bg-surface-2 dark:bg-slate-950"
      ),
      children: [
        !shouldHideBottomNav && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "aside",
          {
            "aria-label": "Sidebar Navigation",
            className: "hidden lg:flex lg:flex-col w-64 shrink-0 bg-white dark:bg-slate-900 border-e border-line-soft dark:border-slate-800 h-full z-20",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 flex items-center gap-3 border-b border-line dark:border-slate-800", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[#FFB300] text-[#432C00] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SunMark, { className: "w-6 h-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-lg tracking-tight text-ink whitespace-nowrap", children: "Kurdish Quest" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-3 py-4 space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: primaryNavItems.map((item) => {
                  const active = isNavPathActive(item.path, location.pathname, item.activePaths);
                  const Icon = item.icon;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: item.path,
                      "aria-current": active ? "page" : void 0,
                      className: cn(
                        "flex items-center gap-3 px-3.5 py-2.5 min-h-[44px] rounded-xl text-sm font-bold transition-colors whitespace-nowrap",
                        active ? "bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B]" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-ink"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 shrink-0", "aria-hidden": "true" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label })
                      ]
                    },
                    item.path
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-line dark:border-slate-800 space-y-1", children: secondaryLinks.map((item) => {
                  const active = location.pathname === item.path;
                  const Icon = item.icon;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: item.path,
                      "aria-current": active ? "page" : void 0,
                      className: cn(
                        "flex items-center gap-3 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold transition-colors whitespace-nowrap",
                        active ? "bg-slate-100 dark:bg-slate-800 text-ink" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-ink"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 shrink-0", "aria-hidden": "true" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label })
                      ]
                    },
                    item.path
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 border-t border-line dark:border-slate-800 space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-0.5 flex-1", children: ["en", "ku", "ar"].map((langCode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setLanguage(langCode),
                      className: cn(
                        "flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-colors cursor-pointer whitespace-nowrap",
                        language === langCode ? "bg-white dark:bg-slate-700 text-[#8A6100] dark:text-[#FFCE6B] shadow-2xs" : "text-slate-500 dark:text-slate-400 hover:text-ink"
                      ),
                      children: langCode === "en" ? "EN" : langCode === "ku" ? "KU" : "عربي"
                    },
                    langCode
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: toggleTheme,
                      "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
                      className: "min-w-[40px] min-h-[40px] rounded-xl border border-line-soft dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0",
                      children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PWAInstallButton, { compact: true, className: "w-full" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex-1 min-w-0 h-full relative flex flex-col overflow-hidden transition-colors duration-300",
              isGameActive ? "bg-slate-950" : "bg-slate-50 dark:bg-slate-950"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Modal,
                {
                  open: showExitModal,
                  onClose: () => setShowExitModal(false),
                  title: t(language, "exit_confirm_title"),
                  description: t(language, "exit_confirm_msg"),
                  hideCloseButton: true,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", fullWidth: true, onClick: () => setShowExitModal(false), children: t(language, "exit_confirm_no") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", fullWidth: true, onClick: () => void getPlatform().exitApp(), children: t(language, "exit_confirm_yes") })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: activeNotification && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: -50, scale: 0.95 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  exit: { opacity: 0, y: -20, scale: 0.95 },
                  className: "absolute top-[max(1rem,env(safe-area-inset-top))] inset-x-4 max-w-md mx-auto bg-white dark:bg-slate-900 text-ink rounded-2xl p-4 shadow-[0_18px_44px_rgba(30,41,59,0.18)] z-[60] flex items-start gap-3 border border-line-soft overflow-hidden",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#FFF3D6] dark:bg-[#3A2F14] p-2.5 rounded-xl shrink-0 mt-0.5 text-[#B8860B] dark:text-[#FFCE6B]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pe-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm tracking-tight leading-snug", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: activeNotification.title }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted mt-1 leading-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: activeNotification.message }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 mt-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              setActiveNotification(null);
                              navigate("/");
                            },
                            className: "bg-[#FFB300] text-[#432C00] font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-[#E69500] transition-colors cursor-pointer",
                            children: language === "ku" ? "Niha Biceribîne" : language === "ar" ? "تمرّن الآن" : "Practice Now"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setActiveNotification(null),
                            className: "bg-transparent hover:bg-surface-2 text-muted border border-line-soft font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer",
                            children: language === "ku" ? "Paşê" : language === "ar" ? "لاحقاً" : "Snooze"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": language === "ar" ? "إغلاق الإشعار" : "Dismiss notification",
                        onClick: () => setActiveNotification(null),
                        className: "text-muted hover:text-ink p-1 rounded-lg hover:bg-surface-2 transition-colors shrink-0 -me-1 -mt-1 cursor-pointer",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ]
                }
              ) }),
              !shouldHideHeader && /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-4 lg:px-8 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2.5 flex items-center z-10 bg-white/95 dark:bg-[#1F1F1E]/95 backdrop-blur-md border-b border-line dark:border-[#2B2B2A] min-h-[56px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-5xl mx-auto flex items-center gap-3", children: [
                (!isMainTab || isProfile) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: handleSmartBack,
                    type: "button",
                    "aria-label": language !== "ar" ? `Back to ${routeMeta.safeBackTo}` : "رجوع آمن",
                    className: "min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#2B2B2A] transition-colors -ms-2 focus-visible:ring-2 focus-visible:ring-[#FFB300] dark:focus-visible:ring-[#FFBA38] cursor-pointer",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ArrowLeft,
                      {
                        className: cn(
                          "w-5 h-5 rtl:rotate-180",
                          isProfile ? "text-[#FFB300]" : "text-slate-600 dark:text-slate-400"
                        )
                      }
                    )
                  }
                ),
                isMainTab && !isProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => navigate("/profile"),
                    type: "button",
                    "aria-label": language !== "ar" ? "Profile" : "الملف الشخصي",
                    title: language !== "ar" ? "Profile" : "الملف الشخصي",
                    className: "lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer overflow-hidden border border-line-soft focus-visible:ring-2 focus-visible:ring-[#FFB300] shrink-0",
                    children: (user == null ? void 0 : user.photoURL) ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.photoURL, alt: (user == null ? void 0 : user.displayName) || "User", className: "w-full h-full object-cover", referrerPolicy: "no-referrer" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full h-full flex items-center justify-center ${selectedHeaderAvatar.color}`, children: renderHeaderAvatarIcon(selectedHeaderAvatar.icon) })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex-1 min-w-0", isProfile ? "text-center lg:text-start" : "text-start"), children: [
                  !isProfile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { dir: "auto", className: "text-xs font-bold text-[#8A6100] dark:text-[#FFCE6B] leading-none truncate", children: routeMeta.brandLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { dir: "auto", className: "text-lg font-black tracking-tight text-ink truncate leading-tight mt-0.5", children: routeMeta.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ms-auto shrink-0", children: [
                  isProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => window.dispatchEvent(new CustomEvent("kq:profile-settings")),
                      "aria-label": language !== "ar" ? "Settings" : "الإعدادات",
                      title: language !== "ar" ? "Settings" : "الإعدادات",
                      className: "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-[#FFB300] focus-visible:ring-2 focus-visible:ring-[#FFB300]",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" })
                    }
                  ),
                  !isProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-tour": "stats-pill",
                      className: "flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 border border-line-soft dark:border-slate-700 rounded-xl px-3.5 py-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            onClick: () => navigate("/"),
                            type: "button",
                            title: language === "ku" ? "Rêza Rojane" : language === "ar" ? "سلسلة الأيام" : "Current Streak",
                            className: "flex items-center gap-1.5 cursor-pointer bg-transparent border-none min-h-0 py-2.5 -my-2.5 ps-2.5 -ms-2.5 pe-1 -me-1",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Flame,
                                {
                                  className: `w-4 h-4 ${((userData == null ? void 0 : userData.streak) || 0) > 0 ? "text-orange-500 fill-orange-500" : "text-orange-400"}`,
                                  "aria-hidden": "true"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-sm text-ink tabular-nums", children: (userData == null ? void 0 : userData.streak) || 0 })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-4 bg-line-soft dark:bg-slate-700", "aria-hidden": "true" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            onClick: () => navigate("/store"),
                            type: "button",
                            title: language === "ku" ? "Cewher" : language === "ar" ? "الجواهر" : "Gems",
                            className: "flex items-center gap-1.5 cursor-pointer bg-transparent border-none min-h-0 py-2.5 -my-2.5 pe-2.5 -me-2.5 ps-1 -ms-1",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", "aria-hidden": "true", children: "💎" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-sm text-ink tabular-nums", children: (userData == null ? void 0 : userData.gems) || 0 })
                            ]
                          }
                        )
                      ]
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "main",
                {
                  ref: mainScrollRef,
                  className: cn(
                    "flex-1 overflow-y-auto scroll-smooth",
                    shouldHideBottomNav ? "pb-0" : "pb-20 lg:pb-8",
                    (isGameActive || routeMeta.shellMode === "immersive") && "relative overflow-hidden h-full flex flex-col"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
                }
              ),
              !shouldHideBottomNav && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "nav",
                {
                  "aria-label": "Main Navigation",
                  className: "lg:hidden absolute bottom-0 w-full bg-white/95 dark:bg-[#1F1F1E]/95 backdrop-blur-md border-t border-slate-200/70 dark:border-[#2B2B2A] flex justify-around items-center px-1 pb-safe pt-1 h-16 z-20",
                  children: primaryNavItems.map((item) => {
                    const Icon = item.icon;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      NavIcon,
                      {
                        path: item.path,
                        activePaths: item.activePaths,
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }),
                        label: item.label,
                        current: location.pathname,
                        tourId: item.tourId
                      },
                      item.path
                    );
                  })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function NavIcon({
  path,
  icon,
  label,
  current,
  tourId,
  activePaths
}) {
  const navigate = useNavigate();
  const isActive = isNavPathActive(path, current, activePaths);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: () => navigate(path),
      type: "button",
      "aria-label": label,
      "aria-current": isActive ? "page" : void 0,
      "data-tour": tourId,
      className: cn(
        "flex flex-col items-center justify-center flex-1 min-w-[44px] h-full relative transition-colors duration-200 outline-none select-none cursor-pointer whitespace-nowrap rounded-xl focus-visible:ring-2 focus-visible:ring-[#FFB300] dark:focus-visible:ring-[#FFBA38] px-0.5",
        isActive ? "text-[#432C00] font-extrabold" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center justify-center w-full", children: [
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            layoutId: "activeNavTab",
            className: "absolute -inset-x-1 -inset-y-1 bg-[#FFB300] rounded-xl -z-10",
            transition: { type: "spring", stiffness: 380, damping: 28 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transition-transform duration-200", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold mt-0.5 block whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-0.5", children: label })
      ] })
    }
  );
}
const academicCategories = [
  { id: "school_objects", nameEn: "School Objects", nameAr: "أدوات مدرسية", icon: "Backpack", color: "bg-blue-100 text-blue-600 border-blue-200 hover:border-blue-400" },
  { id: "university", nameEn: "University Terms", nameAr: "مصطلحات جامعية", icon: "Building2", color: "bg-purple-100 text-purple-600 border-purple-200 hover:border-purple-400" },
  { id: "classroom", nameEn: "Classroom", nameAr: "الفصل الدراسي", icon: "School", color: "bg-amber-100 text-amber-600 border-amber-200 hover:border-amber-400" },
  { id: "math", nameEn: "Mathematics", nameAr: "الرياضيات", icon: "Ruler", color: "bg-rose-100 text-rose-600 border-rose-200 hover:border-rose-400" },
  { id: "computers", nameEn: "Computer Science", nameAr: "علوم الحاسوب", icon: "Laptop", color: "bg-slate-800 text-emerald-400 border-slate-700 hover:border-emerald-500" },
  { id: "physics", nameEn: "Physics", nameAr: "الفيزياء", icon: "Atom", color: "bg-cyan-100 text-cyan-600 border-cyan-200 hover:border-cyan-400" },
  { id: "chemistry", nameEn: "Chemistry", nameAr: "الكيمياء", icon: "FlaskConical", color: "bg-green-100 text-green-600 border-green-200 hover:border-green-400" },
  { id: "biology", nameEn: "Biology", nameAr: "الأحياء", icon: "Microscope", color: "bg-lime-100 text-lime-600 border-lime-200 hover:border-lime-400" },
  { id: "exams", nameEn: "Exams & Study", nameAr: "الامتحانات والدراسة", icon: "FileSpreadsheet", color: "bg-orange-100 text-orange-600 border-orange-200 hover:border-orange-400" },
  { id: "actions", nameEn: "Academic Actions", nameAr: "أفعال أكاديمية", icon: "PenTool", color: "bg-pink-100 text-pink-600 border-pink-200 hover:border-pink-400" }
];
const defaultAcademicVocabulary = [
  // ==================== SCHOOL OBJECTS (أدوات مدرسية) ====================
  { id: "edu1", ku: "Pirtûk", en: "Book", ar: "كتاب", categoryId: "school_objects", audio: "/audio/academic/book.mp3", level: "beginner", exampleKu: "Ev pirtûk balkêş e.", exampleEn: "This book is interesting.", exampleAr: "هذا الكتاب مثير للاهتمام." },
  { id: "edu2", ku: "Pênûs", en: "Pen", ar: "قلم حبر", categoryId: "school_objects", audio: "/audio/academic/pen.mp3", level: "beginner", exampleKu: "Pênûsa min winda bû.", exampleEn: "My pen is lost.", exampleAr: "قلمي مفقود." },
  { id: "edu3", ku: "Pênûsa reş", en: "Pencil", ar: "قلم رصاص", categoryId: "school_objects", audio: "/audio/academic/pencil.mp3", level: "beginner", exampleKu: "Ez bi pênûsa reş dinivîsim.", exampleEn: "I write with a pencil.", exampleAr: "أكتب بقلم الرصاص." },
  { id: "edu4", ku: "Lênûs", en: "Notebook", ar: "دفتر", categoryId: "school_objects", audio: "/audio/academic/notebook.mp3", level: "beginner", exampleKu: "Lênûsa min tijî ye.", exampleEn: "My notebook is full.", exampleAr: "دفتري ممتلئ." },
  { id: "edu5", ku: "Çente", en: "School Bag", ar: "حقيبة مدرسية", categoryId: "school_objects", audio: "/audio/academic/bag.mp3", level: "beginner", exampleKu: "Çenteya min giran e.", exampleEn: "My bag is heavy.", exampleAr: "حقيبتي ثقيلة." },
  { id: "edu101", ku: "Jêbir", en: "Eraser", ar: "ممحاة", categoryId: "school_objects", audio: "/audio/academic/eraser.mp3", level: "beginner", exampleKu: "Bi jêbirê, ez xetên xelet jê dibim.", exampleEn: "The eraser removes the wrong line.", exampleAr: "الممحاة تمسح الخطأ." },
  { id: "edu102", ku: "Rastkêş", en: "Ruler", ar: "مسطرة", categoryId: "school_objects", audio: "/audio/academic/ruler.mp3", level: "beginner", exampleKu: "Ez bi rastkêşê xêz dikişînim.", exampleEn: "I draw lines with a ruler.", exampleAr: "أرسم خطوطاً بالمسطرة." },
  { id: "edu103", ku: "Qayçî", en: "Scissors", ar: "مقص", categoryId: "school_objects", audio: "/audio/academic/scissors.mp3", level: "beginner", exampleKu: "Qayçî ji bo birînê ye.", exampleEn: "Scissors are for cutting.", exampleAr: "المقص للقص." },
  { id: "edu104", ku: "Zeliqok", en: "Glue", ar: "غراء", categoryId: "school_objects", audio: "/audio/academic/glue.mp3", level: "beginner", exampleKu: "Ez bi zeliqokê wêneyê dizeliqînim.", exampleEn: "I stick the picture with glue.", exampleAr: "ألصق الصورة بالغراء." },
  { id: "edu105", ku: "Hesapker / Kalkûlatör", en: "Calculator", ar: "آلة حاسبة", categoryId: "school_objects", audio: "/audio/academic/calculator.mp3", level: "intermediate", exampleKu: "Hesapker di bîrkariyê de kêrhatî ye.", exampleEn: "The calculator is useful in math.", exampleAr: "الآلة الحاسبة مفيدة في الرياضيات." },
  { id: "edu106", ku: "Pirtûkxane", en: "Library", ar: "مكتبة", categoryId: "school_objects", audio: "/audio/academic/library.mp3", level: "beginner", exampleKu: "Ez di pirtûkxaneyê de dixwînim.", exampleEn: "I study in the library.", exampleAr: "أنا أدرس في المكتبة." },
  { id: "edu107", ku: "Ferheng", en: "Dictionary", ar: "قاموس", categoryId: "school_objects", audio: "/audio/academic/dictionary.mp3", level: "intermediate", exampleKu: "Ez di ferhengê de li peyvan digerim.", exampleEn: "I look up the word in the dictionary.", exampleAr: "أبحث عن الكلمة في القاموس." },
  { id: "edu108", ku: "Pergel", en: "Compass (drawing)", ar: "فرجار", categoryId: "school_objects", audio: "/audio/academic/compass.mp3", level: "intermediate", exampleKu: "Ez bi pergelê xêzên bazindî dikişînim.", exampleEn: "I draw circles with a compass.", exampleAr: "أرسم دوائر بالفرجار." },
  { id: "edu109", ku: "Pênûsa nîşankirinê / Marker", en: "Marker Pen", ar: "قلم تحديد", categoryId: "school_objects", audio: "/audio/academic/marker.mp3", level: "beginner", exampleKu: "Pênûsa nîşankirinê ji bo nivîsîna li ser textê ye.", exampleEn: "The marker is for writing on the board.", exampleAr: "القلم المحدد للكتابة على السبورة." },
  { id: "edu110", ku: "Mifte / Kîlît", en: "Key", ar: "مفتاح", categoryId: "school_objects", audio: "/audio/academic/key.mp3", level: "beginner", exampleKu: "Mifta odeyê li cem kî ye?", exampleEn: "Who has the room key?", exampleAr: "من يملك مفتاح الغرفة؟" },
  { id: "edu111", ku: "Şûşeya avê", en: "Water Bottle", ar: "زجاجة ماء", categoryId: "school_objects", audio: "/audio/academic/water_bottle.mp3", level: "beginner", exampleKu: "Ez şûşeya avê têr dikim.", exampleEn: "I fill the water bottle.", exampleAr: "أملأ زجاجة الماء." },
  { id: "edu112", ku: "Pirtûka dersê", en: "Textbook", ar: "كتاب دراسي", categoryId: "school_objects", audio: "/audio/academic/textbook.mp3", level: "intermediate", exampleKu: "Pirtûka dersê ya îsal nû ye.", exampleEn: "This year's textbook is new.", exampleAr: "كتاب الدراسة لهذا العام جديد." },
  // ==================== UNIVERSITY TERMS (مصطلحات جامعية) ====================
  { id: "edu6", ku: "Zanîngeh", en: "University", ar: "جامعة", categoryId: "university", audio: "/audio/academic/university.mp3", level: "intermediate", exampleKu: "Zanîngeha Silêmaniyê navdar e.", exampleEn: "Sulaymaniyah University is famous.", exampleAr: "جامعة السليمانية مشهورة." },
  { id: "edu7", ku: "Mamoste", en: "Professor / Teacher", ar: "أستاذ / معلم", categoryId: "university", audio: "/audio/academic/professor.mp3", level: "beginner", exampleKu: "Mamoste dersê baş dide.", exampleEn: "The teacher teaches well.", exampleAr: "الأستاذ يدرس جيداً." },
  { id: "edu8", ku: "Xwendekar", en: "Student", ar: "طالب", categoryId: "university", audio: "/audio/academic/student.mp3", level: "beginner", exampleKu: "Xwendekar li zanîngehê dixwîne.", exampleEn: "The student studies at university.", exampleAr: "الطالب يدرس في الجامعة." },
  { id: "edu9", ku: "Hola dersan", en: "Lecture Hall", ar: "قاعة محاضرات", categoryId: "university", audio: "/audio/academic/lecture_hall.mp3", level: "advanced", exampleKu: "Hola dersan tijî xwendekar e.", exampleEn: "The lecture hall is full of students.", exampleAr: "قاعة المحاضرات ممتلئة بالطلاب." },
  { id: "edu201", ku: "Beş", en: "Department", ar: "قسم", categoryId: "university", audio: "/audio/academic/department.mp3", level: "intermediate", exampleKu: "Ez di beşa zanistên kompîturê de dixwînim.", exampleEn: "I study in the computer science department.", exampleAr: "أدرس في قسم علوم الحاسوب." },
  { id: "edu202", ku: "Kolej", en: "College / Faculty", ar: "كلية", categoryId: "university", audio: "/audio/academic/faculty.mp3", level: "intermediate", exampleKu: "Koleja zanistan cihekî baş e.", exampleEn: "The science college is a good place.", exampleAr: "كلية العلوم مكان جيد." },
  { id: "edu203", ku: "Sala xwendinê", en: "Academic Year", ar: "السنة الدراسية", categoryId: "university", audio: "/audio/academic/academic_year.mp3", level: "intermediate", exampleKu: "Sala xwendinê ya nû dest pê kir.", exampleEn: "The new academic year has started.", exampleAr: "السنة الدراسية الجديدة بدأت." },
  { id: "edu204", ku: "Semestr", en: "Semester", ar: "فصل دراسي", categoryId: "university", audio: "/audio/academic/semester.mp3", level: "intermediate", exampleKu: "Semestra zivistanê dirêj e.", exampleEn: "The winter semester is long.", exampleAr: "الفصل الدراسي الشتوي طويل." },
  { id: "edu205", ku: "Lêkolîn", en: "Research", ar: "بحث", categoryId: "university", audio: "/audio/academic/research.mp3", level: "advanced", exampleKu: "Lêkolîna min li ser zimanê kurdî ye.", exampleEn: "My research is about Kurdish language.", exampleAr: "بحثي حول اللغة الكردية." },
  { id: "edu206", ku: "Tez", en: "Thesis / Dissertation", ar: "أطروحة / رسالة", categoryId: "university", audio: "/audio/academic/thesis.mp3", level: "professional", exampleKu: "Teza min li ser wêjeya kurdî ye.", exampleEn: "My thesis is about Kurdish literature.", exampleAr: "أطروحتي حول الأدب الكردي." },
  { id: "edu207", ku: "Doktor", en: "PhD / Doctorate", ar: "دكتوراه", categoryId: "university", audio: "/audio/academic/phd.mp3", level: "professional", exampleKu: "Wî doktoraya xwe bi dawî anî.", exampleEn: "He completed his doctorate.", exampleAr: "أكمل درجة الدكتوراه." },
  { id: "edu208", ku: "Lîsans", en: "Bachelor's Degree", ar: "بكالوريوس", categoryId: "university", audio: "/audio/academic/bachelor.mp3", level: "intermediate", exampleKu: "Min lîsansa zanistên kompîturê stand.", exampleEn: "I got a bachelor's in computer science.", exampleAr: "حصلت على بكالوريوس علوم الحاسوب." },
  { id: "edu209", ku: "Master", en: "Master's Degree", ar: "ماجستير", categoryId: "university", audio: "/audio/academic/master.mp3", level: "advanced", exampleKu: "Wî mastera xwe li Îngilîstanê stand.", exampleEn: "He got his master's in England.", exampleAr: "حصل على الماجستير في إنجلترا." },
  { id: "edu210", ku: "Rênmayên zanîngehê", en: "University Regulations", ar: "لوائح الجامعة", categoryId: "university", audio: "/audio/academic/regulations.mp3", level: "advanced", exampleKu: "Divê rêz li rênmayên zanîngehê bê girtin.", exampleEn: "University regulations must be respected.", exampleAr: "يجب احترام لوائح الجامعة." },
  { id: "edu211", ku: "Staj", en: "Internship", ar: "تدريب عملي", categoryId: "university", audio: "/audio/academic/internship.mp3", level: "intermediate", exampleKu: "Staja min li nexweşxaneyê bû.", exampleEn: "My internship was at the hospital.", exampleAr: "تدريبي العملي كان في المستشفى." },
  { id: "edu212", ku: "Burs", en: "Scholarship", ar: "منحة دراسية", categoryId: "university", audio: "/audio/academic/scholarship.mp3", level: "intermediate", exampleKu: "Wî bursa xwendinê stand.", exampleEn: "He got a scholarship.", exampleAr: "حصل على منحة دراسية." },
  // ==================== CLASSROOM (الفصل الدراسي) ====================
  { id: "edu10", ku: "Zengil", en: "Bell", ar: "جرس", categoryId: "classroom", audio: "/audio/academic/bell.mp3", level: "beginner", exampleKu: "Zengil lêda û ders qediya.", exampleEn: "The bell rang and the class ended.", exampleAr: "رن الجرس وانتهى الدرس." },
  { id: "edu11", ku: "Textê spî", en: "Whiteboard", ar: "سبورة بيضاء", categoryId: "classroom", audio: "/audio/academic/board.mp3", level: "beginner", exampleKu: "Mamoste li ser textê dinivîse.", exampleEn: "The teacher writes on the board.", exampleAr: "الأستاذ يكتب على السبورة." },
  { id: "edu12", ku: "Mase", en: "Desk", ar: "مكتب", categoryId: "classroom", audio: "/audio/academic/desk.mp3", level: "beginner", exampleKu: "Maseya min tijî pirtûkan e.", exampleEn: "My desk is full of books.", exampleAr: "مكتبي ممتلئ بالكتب." },
  { id: "edu301", ku: "Kursî", en: "Chair", ar: "كرسي", categoryId: "classroom", audio: "/audio/academic/chair.mp3", level: "beginner", exampleKu: "Kursiya min şikestiye.", exampleEn: "My chair is broken.", exampleAr: "كرسي مكسور." },
  { id: "edu302", ku: "Pencere", en: "Window", ar: "نافذة", categoryId: "classroom", audio: "/audio/academic/window.mp3", level: "beginner", exampleKu: "Pencere vekirî ye.", exampleEn: "The window is open.", exampleAr: "النافذة مفتوحة." },
  { id: "edu303", ku: "Derî", en: "Door", ar: "باب", categoryId: "classroom", audio: "/audio/academic/door.mp3", level: "beginner", exampleKu: "Derî girtî ye.", exampleEn: "The door is closed.", exampleAr: "الباب مغلق." },
  { id: "edu304", ku: "Saet", en: "Clock", ar: "ساعة", categoryId: "classroom", audio: "/audio/academic/clock.mp3", level: "beginner", exampleKu: "Saet nêzîkî du ye.", exampleEn: "The clock is almost two.", exampleAr: "الساعة تقرب الثانية." },
  { id: "edu305", ku: "Nexşe", en: "Map", ar: "خريطة", categoryId: "classroom", audio: "/audio/academic/map.mp3", level: "intermediate", exampleKu: "Nexşeya cîhanê li ser dîwarê ye.", exampleEn: "The world map is on the wall.", exampleAr: "خريطة العالم على الحائط." },
  { id: "edu306", ku: "Dîwar", en: "Wall", ar: "حائط", categoryId: "classroom", audio: "/audio/academic/wall.mp3", level: "beginner", exampleKu: "Wêne li ser dîwarê ye.", exampleEn: "The picture is on the wall.", exampleAr: "الصورة على الحائط." },
  { id: "edu307", ku: "Dolab", en: "Cabinet / Cupboard", ar: "خزانة", categoryId: "classroom", audio: "/audio/academic/cabinet.mp3", level: "beginner", exampleKu: "Pirtûk di dolabê de ne.", exampleEn: "The books are in the cabinet.", exampleAr: "الكتب في الخزانة." },
  { id: "edu308", ku: "Projektor", en: "Projector", ar: "بروجكتور", categoryId: "classroom", audio: "/audio/academic/projector.mp3", level: "intermediate", exampleKu: "Projektor kar nake.", exampleEn: "The projector is not working.", exampleAr: "البروجكتور لا يعمل." },
  { id: "edu309", ku: "Ekran", en: "Screen", ar: "شاشة", categoryId: "classroom", audio: "/audio/academic/screen.mp3", level: "intermediate", exampleKu: "Ekran mezin e.", exampleEn: "The screen is big.", exampleAr: "الشاشة كبيرة." },
  { id: "edu310", ku: "Jêbira textê", en: "Duster / Board Eraser", ar: "ممسحة السبورة", categoryId: "classroom", audio: "/audio/academic/duster.mp3", level: "beginner", exampleKu: "Jêbira textê textê paqij dike.", exampleEn: "The duster cleans the board.", exampleAr: "ممسحة السبورة تنظف السبورة." },
  { id: "edu311", ku: "Çira", en: "Light", ar: "ضوء / مصباح", categoryId: "classroom", audio: "/audio/academic/light.mp3", level: "beginner", exampleKu: "Çirayê veke.", exampleEn: "Turn on the light.", exampleAr: "أشغل الضوء." },
  { id: "edu312", ku: "Kompîtura polê", en: "Class Computer", ar: "حاسوب الفصل", categoryId: "classroom", audio: "/audio/academic/class_computer.mp3", level: "intermediate", exampleKu: "Kompîtura polê nû ye.", exampleEn: "The class computer is new.", exampleAr: "حاسوب الفصل جديد." },
  // ==================== MATHEMATICS (الرياضيات) ====================
  { id: "edu13", ku: "Bîrkarî", en: "Mathematics", ar: "الرياضيات", categoryId: "math", audio: "/audio/academic/mathematics.mp3", level: "intermediate", exampleKu: "Bîrkarî mijareke girîng e.", exampleEn: "Mathematics is an important subject.", exampleAr: "الرياضيات مادة مهمة." },
  { id: "edu14", ku: "Hejmar", en: "Number", ar: "رقم", categoryId: "math", audio: "/audio/academic/number.mp3", level: "beginner", exampleKu: "Hejmara sifir hejmareke taybet e.", exampleEn: "Zero is a special number.", exampleAr: "الصفر رقم مميز." },
  { id: "edu24", ku: "Geometrî", en: "Geometry", ar: "هندسة", categoryId: "math", audio: "/audio/academic/math/geometry.mp3", level: "intermediate", exampleKu: "Geometrî li ser şêwayan e.", exampleEn: "Geometry is about shapes.", exampleAr: "الهندسة تتعلق بالأشكال." },
  { id: "edu25", ku: "Cebir", en: "Algebra", ar: "جبر", categoryId: "math", audio: "/audio/academic/math/algebra.mp3", level: "intermediate", exampleKu: "Cebir bi têbinîyan re mijûl dibe.", exampleEn: "Algebra deals with variables.", exampleAr: "الجبر يتعامل مع المتغيرات." },
  { id: "edu26", ku: "Dîferansiyel û Întegral", en: "Calculus", ar: "حساب التفاضل والتكامل", categoryId: "math", audio: "/audio/academic/math/calculus.mp3", level: "advanced", exampleKu: "Dîferansiyel û întegral beşekî zor dijwaz e ji bîrkarîyê.", exampleEn: "Calculus is a very difficult part of math.", exampleAr: "حساب التفاضل والتكامل جزء صعب جداً من الرياضيات." },
  { id: "edu27", ku: "Statîstîk", en: "Statistics", ar: "إحصاء", categoryId: "math", audio: "/audio/academic/math/statistics.mp3", level: "advanced", exampleKu: "Statîstîk li ser daneyan dixebite.", exampleEn: "Statistics works with data.", exampleAr: "الإحصاء يعمل مع البيانات." },
  { id: "edu401", ku: "Komkirin", en: "Addition", ar: "جمع", categoryId: "math", audio: "/audio/academic/math/addition.mp3", level: "beginner", exampleKu: "Komkirina du û sê pênc e.", exampleEn: "The addition of two and three is five.", exampleAr: "جمع اثنين وثلاثة يساوي خمسة." },
  { id: "edu402", ku: "Derxistin", en: "Subtraction", ar: "طرح", categoryId: "math", audio: "/audio/academic/math/subtraction.mp3", level: "beginner", exampleKu: "Derxistina heft ji deh sê ye.", exampleEn: "The subtraction of seven from ten is three.", exampleAr: "طرح سبعة من عشرة يساوي ثلاثة." },
  { id: "edu403", ku: "Lêkdan / Carkirin", en: "Multiplication", ar: "ضرب", categoryId: "math", audio: "/audio/academic/math/multiplication.mp3", level: "beginner", exampleKu: "Lêkdana çar û du heşt e.", exampleEn: "The multiplication of four and two is eight.", exampleAr: "ضرب أربعة في اثنين يساوي ثمانية." },
  { id: "edu404", ku: "Dabeşkirin", en: "Division", ar: "قسمة", categoryId: "math", audio: "/audio/academic/math/division.mp3", level: "beginner", exampleKu: "Dabeşkirina deh bi du pênc e.", exampleEn: "The division of ten by two is five.", exampleAr: "قسمة عشرة على اثنين يساوي خمسة." },
  { id: "edu405", ku: "Hevkêşe", en: "Equation", ar: "معادلة", categoryId: "math", audio: "/audio/academic/math/equation.mp3", level: "intermediate", exampleKu: "Hevkêşeya x + y = 10 ye.", exampleEn: "The equation is x + y = 10.", exampleAr: "المعادلة هي س + ص = 10." },
  { id: "edu406", ku: "Bazne", en: "Circle", ar: "دائرة", categoryId: "math", audio: "/audio/academic/math/circle.mp3", level: "beginner", exampleKu: "Bazne şêweyekî girover e.", exampleEn: "The circle is a round shape.", exampleAr: "الدائرة شكل مستدير." },
  { id: "edu407", ku: "Çargoşe", en: "Square", ar: "مربع", categoryId: "math", audio: "/audio/academic/math/square.mp3", level: "beginner", exampleKu: "Çargoşeyek çar aliyên wekhev heye.", exampleEn: "The square has four equal sides.", exampleAr: "المربع له أربعة أضلاع متساوية." },
  { id: "edu408", ku: "Sêgoşe", en: "Triangle", ar: "مثلث", categoryId: "math", audio: "/audio/academic/math/triangle.mp3", level: "beginner", exampleKu: "Sêgoşeyek sê goşeyan heye.", exampleEn: "The triangle has three angles.", exampleAr: "المثلث له ثلاث زوايا." },
  { id: "edu409", ku: "Xêz / Rastxêz", en: "Line", ar: "خط", categoryId: "math", audio: "/audio/academic/math/line.mp3", level: "beginner", exampleKu: "Rastxêzek ji du aliyan berdewam e.", exampleEn: "A line continues in two directions.", exampleAr: "الخط يمتد في اتجاهين." },
  { id: "edu410", ku: "Goşe", en: "Angle", ar: "زاوية", categoryId: "math", audio: "/audio/academic/math/angle.mp3", level: "intermediate", exampleKu: "Goşeya rast nod pileyî ye.", exampleEn: "The right angle is ninety degrees.", exampleAr: "الزاوية القائمة تسعين درجة." },
  { id: "edu411", ku: "Ji sedî / Rêje", en: "Percentage", ar: "نسبة مئوية", categoryId: "math", audio: "/audio/academic/math/percentage.mp3", level: "intermediate", exampleKu: "Rêjeya serkeftinê ji sedî heştê ye.", exampleEn: "The success rate is eighty percent.", exampleAr: "نسبة النجاح ثمانون بالمئة." },
  { id: "edu412", ku: "Hêz", en: "Power / Exponent", ar: "أس", categoryId: "math", audio: "/audio/academic/math/power.mp3", level: "advanced", exampleKu: "Du li ser hêza sê heşt e.", exampleEn: "Two to the power of three is eight.", exampleAr: "اثنين أس ثلاثة يساوي ثمانية." },
  { id: "edu413", ku: "Kok", en: "Root", ar: "جذر", categoryId: "math", audio: "/audio/academic/math/root.mp3", level: "advanced", exampleKu: "Koka çaran du ye.", exampleEn: "The root of four is two.", exampleAr: "جذر الأربعة اثنان." },
  { id: "edu414", ku: "Fonksiyon", en: "Function", ar: "دالة", categoryId: "math", audio: "/audio/academic/math/function.mp3", level: "advanced", exampleKu: "Fonksiyona f(x) = 2x + 1 ye.", exampleEn: "The function is f(x) = 2x + 1.", exampleAr: "الدالة هي ف(س) = 2س + 1." },
  { id: "edu415", ku: "Întegral", en: "Integral", ar: "تكامل", categoryId: "math", audio: "/audio/academic/math/integral.mp3", level: "professional", exampleKu: "Întegral rêbazekî hesabê ye.", exampleEn: "Integral is a calculus method.", exampleAr: "التكامل طريقة في حساب التفاضل والتكامل." },
  // ==================== COMPUTER SCIENCE (علوم الحاسوب) ====================
  { id: "edu15", ku: "Kompîtur", en: "Computer", ar: "حاسوب", categoryId: "computers", audio: "/audio/academic/computer.mp3", level: "intermediate", exampleKu: "Kompîturekî nû kirîye.", exampleEn: "He bought a new computer.", exampleAr: "اشترى حاسوباً جديداً." },
  { id: "edu16", ku: "Nermalav", en: "Software", ar: "برمجيات", categoryId: "computers", audio: "/audio/academic/software.mp3", level: "advanced", exampleKu: "Nermalava nû hat saz kirin.", exampleEn: "The new software was installed.", exampleAr: "تم تثبيت البرمجيات الجديدة." },
  { id: "edu501", ku: "Hişkar", en: "Hardware", ar: "عتاد", categoryId: "computers", audio: "/audio/academic/hardware.mp3", level: "advanced", exampleKu: "Hişkari kompîtur divê were nû kirin.", exampleEn: "The computer hardware needs updating.", exampleAr: "عتاد الحاسوب يحتاج تحديثاً." },
  { id: "edu502", ku: "Tor", en: "Network", ar: "شبكة", categoryId: "computers", audio: "/audio/academic/network.mp3", level: "intermediate", exampleKu: "Tora înternetê xurt e.", exampleEn: "The internet network is strong.", exampleAr: "شبكة الإنترنت قوية." },
  { id: "edu503", ku: "Malper", en: "Website", ar: "موقع إلكتروني", categoryId: "computers", audio: "/audio/academic/website.mp3", level: "intermediate", exampleKu: "Ez malperekê ava dikim.", exampleEn: "I am building a website.", exampleAr: "أنا أبني موقعاً إلكترونياً." },
  { id: "edu504", ku: "Bername", en: "Program / Application", ar: "برنامج / تطبيق", categoryId: "computers", audio: "/audio/academic/program.mp3", level: "intermediate", exampleKu: "Ev bername gelek baş e.", exampleEn: "This program is very good.", exampleAr: "هذا البرنامج جيد جداً." },
  { id: "edu505", ku: "Dane", en: "Data", ar: "بيانات", categoryId: "computers", audio: "/audio/academic/data.mp3", level: "intermediate", exampleKu: "Divê dane werin parastin.", exampleEn: "Data must be protected.", exampleAr: "يجب حماية البيانات." },
  { id: "edu506", ku: "Şîfre", en: "Password", ar: "كلمة مرور", categoryId: "computers", audio: "/audio/academic/password.mp3", level: "intermediate", exampleKu: "Şîfreya te xurt be.", exampleEn: "Your password should be strong.", exampleAr: "يجب أن تكون كلمة المرور قوية." },
  { id: "edu507", ku: "Pel", en: "File", ar: "ملف", categoryId: "computers", audio: "/audio/academic/file.mp3", level: "beginner", exampleKu: "Pela nû tomar kir.", exampleEn: "Save the new file.", exampleAr: "احفظ الملف الجديد." },
  { id: "edu508", ku: "Peldank", en: "Folder", ar: "مجلد", categoryId: "computers", audio: "/audio/academic/folder.mp3", level: "beginner", exampleKu: "Peldanka nû çêkir.", exampleEn: "Create a new folder.", exampleAr: "أنشئ مجلداً جديداً." },
  { id: "edu509", ku: "Çapkirin", en: "Print", ar: "طباعة", categoryId: "computers", audio: "/audio/academic/print.mp3", level: "beginner", exampleKu: "Ev belgeyê çap bike.", exampleEn: "Print this document.", exampleAr: "اطبع هذه الوثيقة." },
  { id: "edu510", ku: "Kod", en: "Code", ar: "كود", categoryId: "computers", audio: "/audio/academic/code.mp3", level: "intermediate", exampleKu: "Koda Python hêsan e.", exampleEn: "Python code is easy.", exampleAr: "كود بايثون سهل." },
  { id: "edu511", ku: "Pêşdebir", en: "Developer", ar: "مطور", categoryId: "computers", audio: "/audio/academic/developer.mp3", level: "advanced", exampleKu: "Ew pêşdebirekî malperan e.", exampleEn: "He is a web developer.", exampleAr: "هو مطور مواقع." },
  { id: "edu512", ku: "Înternet", en: "Internet", ar: "إنترنت", categoryId: "computers", audio: "/audio/academic/internet.mp3", level: "beginner", exampleKu: "Înternetê vekirî ye.", exampleEn: "The internet is available.", exampleAr: "الإنترنت متاح." },
  { id: "edu513", ku: "E-peyam", en: "Email", ar: "بريد إلكتروني", categoryId: "computers", audio: "/audio/academic/email.mp3", level: "beginner", exampleKu: "E-peyamekê nû stand.", exampleEn: "I received a new email.", exampleAr: "استلمت بريداً إلكترونياً جديداً." },
  { id: "edu514", ku: "Vîrus", en: "Virus", ar: "فيروس", categoryId: "computers", audio: "/audio/academic/virus.mp3", level: "advanced", exampleKu: "Vîrusê kompîturê xirab kir.", exampleEn: "The virus damaged the computer.", exampleAr: "الفيروس أضر بالحاسوب." },
  { id: "edu515", ku: "Dîmender", en: "Monitor / Screen", ar: "شاشة عرض", categoryId: "computers", audio: "/audio/academic/monitor.mp3", level: "beginner", exampleKu: "Dîmendera min mezin e.", exampleEn: "My monitor is big.", exampleAr: "شاشتي كبيرة." },
  { id: "edu516", ku: "Klavye", en: "Keyboard", ar: "لوحة مفاتيح", categoryId: "computers", audio: "/audio/academic/keyboard.mp3", level: "beginner", exampleKu: "Ez bi klavyeyê dinivîsim.", exampleEn: "I type with the keyboard.", exampleAr: "أكتب بلوحة المفاتيح." },
  { id: "edu517", ku: "Mişk", en: "Mouse", ar: "فأرة", categoryId: "computers", audio: "/audio/academic/mouse.mp3", level: "beginner", exampleKu: "Mişkê bi klîk bike.", exampleEn: "Click with the mouse.", exampleAr: "انقر بالفأرة." },
  { id: "edu518", ku: "Binkeya daneyan", en: "Database", ar: "قاعدة بيانات", categoryId: "computers", audio: "/audio/academic/database.mp3", level: "advanced", exampleKu: "Binkeya daneyan a zanyariyan mezin e.", exampleEn: "The data database is large.", exampleAr: "قاعدة بيانات المعلومات كبيرة." },
  { id: "edu519", ku: "Sîstem", en: "Operating System", ar: "نظام تشغيل", categoryId: "computers", audio: "/audio/academic/os.mp3", level: "advanced", exampleKu: "Sîstema Windows 11 nû ye.", exampleEn: "Windows 11 system is new.", exampleAr: "نظام ويندوز 11 جديد." },
  { id: "edu520", ku: "Algorîtm", en: "Algorithm", ar: "خوارزمية", categoryId: "computers", audio: "/audio/academic/algorithm.mp3", level: "advanced", exampleKu: "Algorîtmê çareseriyê dît.", exampleEn: "He found the solution algorithm.", exampleAr: "وجد خوارزمية الحل." },
  // ==================== PHYSICS (الفيزياء) ====================
  { id: "edu601", ku: "Fîzîk", en: "Physics", ar: "فيزياء", categoryId: "physics", audio: "/audio/academic/physics/physics.mp3", level: "intermediate", exampleKu: "Fîzîk zanistiya xwezayê ye.", exampleEn: "Physics is the science of nature.", exampleAr: "الفيزياء علم الطبيعة." },
  { id: "edu602", ku: "Hêz", en: "Force", ar: "قوة", categoryId: "physics", audio: "/audio/academic/physics/force.mp3", level: "intermediate", exampleKu: "Hêza kêşanê erdê dikişîne.", exampleEn: "Gravity pulls the earth.", exampleAr: "الجاذبية تجذب الأرض." },
  { id: "edu603", ku: "Bariste", en: "Mass", ar: "كتلة", categoryId: "physics", audio: "/audio/academic/physics/mass.mp3", level: "intermediate", exampleKu: "Barista vê kevire mezin e.", exampleEn: "The mass of this stone is large.", exampleAr: "كتلة هذا الحجر كبيرة." },
  { id: "edu604", ku: "Giranî", en: "Weight", ar: "وزن", categoryId: "physics", audio: "/audio/academic/physics/weight.mp3", level: "intermediate", exampleKu: "Giraniya min şêst kîlo ye.", exampleEn: "My weight is sixty kilos.", exampleAr: "وزني ستون كيلوغراماً." },
  { id: "edu605", ku: "Lez", en: "Speed / Velocity", ar: "سرعة", categoryId: "physics", audio: "/audio/academic/physics/speed.mp3", level: "intermediate", exampleKu: "Leza wesayîtê bilind e.", exampleEn: "The car speed is high.", exampleAr: "سرعة السيارة عالية." },
  { id: "edu606", ku: "Ronahî", en: "Light", ar: "ضوء", categoryId: "physics", audio: "/audio/academic/physics/light.mp3", level: "intermediate", exampleKu: "Ronahî bi leza bilind diçe.", exampleEn: "Light travels at high speed.", exampleAr: "الضوء يسافر بسرعة عالية." },
  { id: "edu607", ku: "Deng", en: "Sound", ar: "صوت", categoryId: "physics", audio: "/audio/academic/physics/sound.mp3", level: "intermediate", exampleKu: "Deng bi mewc diçû.", exampleEn: "Sound travels in waves.", exampleAr: "الصوت ينتقل بالموجات." },
  { id: "edu608", ku: "Germahî", en: "Temperature", ar: "حرارة / درجة حرارة", categoryId: "physics", audio: "/audio/academic/physics/temperature.mp3", level: "intermediate", exampleKu: "Germahiya odeyê bîst û pênc e.", exampleEn: "The room temperature is twenty-five.", exampleAr: "درجة حرارة الغرفة خمس وعشرون." },
  { id: "edu609", ku: "Elektrîk", en: "Electricity", ar: "كهرباء", categoryId: "physics", audio: "/audio/academic/physics/electricity.mp3", level: "intermediate", exampleKu: "Elektrîk ji bo jiyana nûjen girîng e.", exampleEn: "Electricity is important for modern life.", exampleAr: "الكهرباء مهمة للحياة الحديثة." },
  { id: "edu610", ku: "Mîknatîs", en: "Magnet", ar: "مغناطيس", categoryId: "physics", audio: "/audio/academic/physics/magnet.mp3", level: "intermediate", exampleKu: "Mîknatîs hez dikşîne.", exampleEn: "The magnet attracts iron.", exampleAr: "المغناطيس يجذب الحديد." },
  { id: "edu611", ku: "Atom", en: "Atom", ar: "ذرة", categoryId: "physics", audio: "/audio/academic/physics/atom.mp3", level: "advanced", exampleKu: "Atom beşeke bingehîn a madeyê ye.", exampleEn: "The atom is a basic part of matter.", exampleAr: "الذرة جزء أساسي من المادة." },
  { id: "edu612", ku: "Molekul", en: "Molecule", ar: "جزيء", categoryId: "physics", audio: "/audio/academic/physics/molecule.mp3", level: "advanced", exampleKu: "Molekul ji atoman pêk tê.", exampleEn: "A molecule consists of atoms.", exampleAr: "الجزيء يتكون من ذرات." },
  { id: "edu613", ku: "Wize", en: "Energy", ar: "طاقة", categoryId: "physics", audio: "/audio/academic/physics/energy.mp3", level: "intermediate", exampleKu: "Wize nayê winda kirin, tenê diguhere.", exampleEn: "Energy is not lost, only transformed.", exampleAr: "الطاقة لا تفنى، بل تتحول." },
  { id: "edu614", ku: "Pêl", en: "Wave", ar: "موجة", categoryId: "physics", audio: "/audio/academic/physics/wave.mp3", level: "intermediate", exampleKu: "Pêlên dengî bandorê li hev dikin.", exampleEn: "Sound waves affect each other.", exampleAr: "موجات الصوت تؤثر على بعضها." },
  { id: "edu615", ku: "Kêşan", en: "Gravity", ar: "جاذبية", categoryId: "physics", audio: "/audio/academic/physics/gravity.mp3", level: "advanced", exampleKu: "Kêşana erdê me li xwe dikişîne.", exampleEn: "Earth's gravity pulls us.", exampleAr: "جاذبية الأرض تجذبنا." },
  { id: "edu616", ku: "Zivirîn", en: "Rotation", ar: "دوران", categoryId: "physics", audio: "/audio/academic/physics/rotation.mp3", level: "advanced", exampleKu: "Zivirîna erdê rojane çend e.", exampleEn: "Earth's rotation is daily.", exampleAr: "دوران الأرض يومي." },
  { id: "edu617", ku: "Berxwedana hewayê", en: "Air Resistance", ar: "مقاومة الهواء", categoryId: "physics", audio: "/audio/academic/physics/air_resistance.mp3", level: "advanced", exampleKu: "Berxwedana hewayê lezê kêm dike.", exampleEn: "Air resistance reduces speed.", exampleAr: "مقاومة الهواء تقلل السرعة." },
  { id: "edu618", ku: "Pîvana germahiyê", en: "Thermometer", ar: "ميزان حرارة / ترمومتر", categoryId: "physics", audio: "/audio/academic/physics/thermometer.mp3", level: "intermediate", exampleKu: "Pîvana germahiyê germahî nîşan dide.", exampleEn: "The thermometer shows temperature.", exampleAr: "الترمومتر يظهر درجة الحرارة." },
  { id: "edu619", ku: "Barometr", en: "Barometer", ar: "بارومتر", categoryId: "physics", audio: "/audio/academic/physics/barometer.mp3", level: "advanced", exampleKu: "Barometr zexta hewayê pîvan dike.", exampleEn: "The barometer measures air pressure.", exampleAr: "البارومتر يقيس ضغط الهواء." },
  { id: "edu620", ku: "Voltmetr", en: "Voltmeter", ar: "فولتميتر", categoryId: "physics", audio: "/audio/academic/physics/voltmeter.mp3", level: "advanced", exampleKu: "Voltmetr voltajê pîvan dike.", exampleEn: "The voltmeter measures voltage.", exampleAr: "الفولتميتر يقيس الجهد الكهربائي." },
  { id: "edu621", ku: "Ampermetr", en: "Ammeter", ar: "أميتر", categoryId: "physics", audio: "/audio/academic/physics/ammeter.mp3", level: "advanced", exampleKu: "Ampermetr zexta elektrîkê pîvan dike.", exampleEn: "The ammeter measures electric current.", exampleAr: "الأميتر يقيس التيار الكهربائي." },
  { id: "edu622", ku: "Qeweta elektrîkê", en: "Electric Power", ar: "قدرة كهربائية", categoryId: "physics", audio: "/audio/academic/physics/electric_power.mp3", level: "advanced", exampleKu: "Qeweta elektrîkê bi watt tê pîvan.", exampleEn: "Electric power is measured in watts.", exampleAr: "القدرة الكهربائية تقاس بالواط." },
  { id: "edu623", ku: "Lêkaxistin", en: "Friction", ar: "احتكاك", categoryId: "physics", audio: "/audio/academic/physics/friction.mp3", level: "advanced", exampleKu: "Lêkaxistin lezê kêm dike.", exampleEn: "Friction reduces speed.", exampleAr: "الاحتكاك يقلل السرعة." },
  { id: "edu624", ku: "Hêza navendî", en: "Centripetal Force", ar: "قوة مركزية", categoryId: "physics", audio: "/audio/academic/physics/centripetal.mp3", level: "professional", exampleKu: "Hêza navendî zivirînê çêdike.", exampleEn: "Centripetal force creates rotation.", exampleAr: "القوة المركزية تنشئ الدوران." },
  // ==================== CHEMISTRY (الكيمياء) ====================
  { id: "edu701", ku: "Kîmya", en: "Chemistry", ar: "كيمياء", categoryId: "chemistry", audio: "/audio/academic/chemistry/chemistry.mp3", level: "intermediate", exampleKu: "Kîmya zanistiya madeyan e.", exampleEn: "Chemistry is the science of substances.", exampleAr: "الكيمياء علم المواد." },
  { id: "edu702", ku: "Made", en: "Substance / Matter", ar: "مادة", categoryId: "chemistry", audio: "/audio/academic/chemistry/matter.mp3", level: "intermediate", exampleKu: "Made sê hal hene: ron, gaz, hişk.", exampleEn: "Matter has three states: liquid, gas, solid.", exampleAr: "المادة لها ثلاث حالات: سائل، غاز، صلب." },
  { id: "edu703", ku: "Gaz", en: "Gas", ar: "غاز", categoryId: "chemistry", audio: "/audio/academic/chemistry/gas.mp3", level: "beginner", exampleKu: "Oksîjen gazeke girîng e.", exampleEn: "Oxygen is an important gas.", exampleAr: "الأكسجين غاز مهم." },
  { id: "edu704", ku: "Ron", en: "Liquid", ar: "سائل", categoryId: "chemistry", audio: "/audio/academic/chemistry/liquid.mp3", level: "beginner", exampleKu: "Av madeyekî ron e.", exampleEn: "Water is a liquid substance.", exampleAr: "الماء مادة سائلة." },
  { id: "edu705", ku: "Hişk", en: "Solid", ar: "صلب", categoryId: "chemistry", audio: "/audio/academic/chemistry/solid.mp3", level: "beginner", exampleKu: "Kevir madeyekî hişk e.", exampleEn: "Stone is a solid substance.", exampleAr: "الحجر مادة صلبة." },
  { id: "edu706", ku: "Hêman", en: "Element", ar: "عنصر", categoryId: "chemistry", audio: "/audio/academic/chemistry/element.mp3", level: "intermediate", exampleKu: "Oksîjen hêmanekî girîng e.", exampleEn: "Oxygen is an important element.", exampleAr: "الأكسجين عنصر مهم." },
  { id: "edu707", ku: "Pêkhatî", en: "Compound", ar: "مركب", categoryId: "chemistry", audio: "/audio/academic/chemistry/compound.mp3", level: "intermediate", exampleKu: "Av pêkhatiyek ji hîdrojen û oksîjenê ye.", exampleEn: "Water is a compound of hydrogen and oxygen.", exampleAr: "الماء مركب من الهيدروجين والأكسجين." },
  { id: "edu708", ku: "Reaksiyon", en: "Reaction", ar: "تفاعل", categoryId: "chemistry", audio: "/audio/academic/chemistry/reaction.mp3", level: "intermediate", exampleKu: "Reaksiyona kîmyayî bi bandor e.", exampleEn: "The chemical reaction is effective.", exampleAr: "التفاعل الكيميائي فعال." },
  { id: "edu709", ku: "Asît", en: "Acid", ar: "حمض", categoryId: "chemistry", audio: "/audio/academic/chemistry/acid.mp3", level: "intermediate", exampleKu: "Asîta sulfurîk gelek xurt e.", exampleEn: "Sulfuric acid is very strong.", exampleAr: "حمض الكبريتيك قوي جداً." },
  { id: "edu710", ku: "Asas", en: "Base / Alkali", ar: "قاعدة", categoryId: "chemistry", audio: "/audio/academic/chemistry/base.mp3", level: "intermediate", exampleKu: "Asas bi asîtê re reaksiyonê dide.", exampleEn: "The base reacts with acid.", exampleAr: "القاعدة تتفاعل مع الحمض." },
  { id: "edu711", ku: "PH", en: "pH Level", ar: "درجة الحموضة", categoryId: "chemistry", audio: "/audio/academic/chemistry/ph.mp3", level: "advanced", exampleKu: "PH ya ava paqij bîst û heft e.", exampleEn: "The pH of pure water is seven.", exampleAr: "درجة حموضة الماء النقي سبعة." },
  { id: "edu712", ku: "Perîodîk", en: "Periodic Table", ar: "الجدول الدوري", categoryId: "chemistry", audio: "/audio/academic/chemistry/periodic_table.mp3", level: "advanced", exampleKu: "Tabloya perîodîk hêmanan nîşan dide.", exampleEn: "The periodic table shows elements.", exampleAr: "الجدول الدوري يظهر العناصر." },
  { id: "edu713", ku: "Kîmyagir", en: "Chemist", ar: "كيميائي", categoryId: "chemistry", audio: "/audio/academic/chemistry/chemist.mp3", level: "intermediate", exampleKu: "Kîmyagir li laboratuvarê dixebite.", exampleEn: "The chemist works in the laboratory.", exampleAr: "الكيميائي يعمل في المختبر." },
  { id: "edu714", ku: "Laboratuvar", en: "Laboratory", ar: "مختبر", categoryId: "chemistry", audio: "/audio/academic/chemistry/laboratory.mp3", level: "intermediate", exampleKu: "Tajelî li laboratuvarê tê ceribandin.", exampleEn: "The reaction is tested in the laboratory.", exampleAr: "التفاعل يُختبر في المختبر." },
  { id: "edu715", ku: "Tûp", en: "Test Tube", ar: "أنبوب اختبار", categoryId: "chemistry", audio: "/audio/academic/chemistry/test_tube.mp3", level: "intermediate", exampleKu: "Reaksiyona li tûpê reng diguhere.", exampleEn: "The color changes in the test tube.", exampleAr: "اللون يتغير في أنبوب الاختبار." },
  { id: "edu716", ku: "Bîker", en: "Beaker", ar: "كأس مخبري", categoryId: "chemistry", audio: "/audio/academic/chemistry/beaker.mp3", level: "intermediate", exampleKu: "Made li bîkerê tê tevlî kirin.", exampleEn: "Substances are mixed in the beaker.", exampleAr: "تُخلط المواد في الكأس المخبري." },
  { id: "edu717", ku: "Termometra kîmyayî", en: "Chemical Thermometer", ar: "ترمومتر كيميائي", categoryId: "chemistry", audio: "/audio/academic/chemistry/chem_thermometer.mp3", level: "intermediate", exampleKu: "Termometra kîmyayî germahiya tajeliyê pîvan dike.", exampleEn: "The chemical thermometer measures reaction temperature.", exampleAr: "الترمومتر الكيميائي يقيس حرارة التفاعل." },
  { id: "edu718", ku: "Molekul", en: "Molecule", ar: "جزيء", categoryId: "chemistry", audio: "/audio/academic/chemistry/molecule_chem.mp3", level: "advanced", exampleKu: "Molekula avê du atomên hîdrojenê dihewîne.", exampleEn: "A water molecule contains two hydrogen atoms.", exampleAr: "جزيء الماء يحتوي على ذرتي هيدروجين." },
  { id: "edu719", ku: "Katalîzator", en: "Catalyst", ar: "محفز", categoryId: "chemistry", audio: "/audio/academic/chemistry/catalyst.mp3", level: "advanced", exampleKu: "Katalîzator leza tajeliyê zêde dike.", exampleEn: "The catalyst increases reaction speed.", exampleAr: "المحفز يزيد سرعة التفاعل." },
  { id: "edu720", ku: "Oksîdasyon", en: "Oxidation", ar: "أكسدة", categoryId: "chemistry", audio: "/audio/academic/chemistry/oxidation.mp3", level: "advanced", exampleKu: "Oksîdasyon zêdekirina oksîjenê ye.", exampleEn: "Oxidation is the addition of oxygen.", exampleAr: "الأكسدة هي إضافة الأكسجين." },
  { id: "edu721", ku: "Hilweşîn", en: "Dissolution", ar: "ذوبان", categoryId: "chemistry", audio: "/audio/academic/chemistry/dissolution.mp3", level: "intermediate", exampleKu: "Şekir di avê de dihelweşe.", exampleEn: "Sugar dissolves in water.", exampleAr: "السكر يذوب في الماء." },
  { id: "edu722", ku: "Girêdan", en: "Chemical Bond", ar: "رابط كيميائي", categoryId: "chemistry", audio: "/audio/academic/chemistry/bond.mp3", level: "advanced", exampleKu: "Girêdana kovalent hêzan parve dike.", exampleEn: "Covalent bond shares electrons.", exampleAr: "الرابط التساهمي يتشارك الإلكترونات." },
  { id: "edu723", ku: "Elektron", en: "Electron", ar: "إلكترون", categoryId: "chemistry", audio: "/audio/academic/chemistry/electron.mp3", level: "advanced", exampleKu: "Elektron li dora navokê digere.", exampleEn: "The electron orbits around the nucleus.", exampleAr: "الإلكترون يدور حول النواة." },
  { id: "edu724", ku: "Proton", en: "Proton", ar: "بروتون", categoryId: "chemistry", audio: "/audio/academic/chemistry/proton.mp3", level: "advanced", exampleKu: "Proton barê pozîtîf heye.", exampleEn: "The proton has positive charge.", exampleAr: "البروتون له شحنة موجبة." },
  { id: "edu725", ku: "Nêtron", en: "Neutron", ar: "نيوترون", categoryId: "chemistry", audio: "/audio/academic/chemistry/neutron.mp3", level: "advanced", exampleKu: "Nêtron barê neyînî nîne.", exampleEn: "The neutron has no charge.", exampleAr: "النيوترون ليس له شحنة." },
  { id: "edu726", ku: "Navok", en: "Nucleus", ar: "نواة", categoryId: "chemistry", audio: "/audio/academic/chemistry/nucleus.mp3", level: "advanced", exampleKu: "Navok navenda atomê ye.", exampleEn: "The nucleus is the center of the atom.", exampleAr: "النواة هي مركز الذرة." },
  // ==================== BIOLOGY (الأحياء) ====================
  { id: "edu801", ku: "Biyolojî", en: "Biology", ar: "أحياء", categoryId: "biology", audio: "/audio/academic/biology/biology.mp3", level: "intermediate", exampleKu: "Biyolojî zanistiya jiyanê ye.", exampleEn: "Biology is the science of life.", exampleAr: "الأحياء علم الحياة." },
  { id: "edu802", ku: "Zîndewer", en: "Organism", ar: "كائن حي", categoryId: "biology", audio: "/audio/academic/biology/organism.mp3", level: "intermediate", exampleKu: "Mirov zîndewerekî pêşkeftî ye.", exampleEn: "Humans are advanced organisms.", exampleAr: "الإنسان كائن حي متطور." },
  { id: "edu803", ku: "Hucre", en: "Cell", ar: "خلية", categoryId: "biology", audio: "/audio/academic/biology/cell.mp3", level: "intermediate", exampleKu: "Hucre beşeke bingehîn a laşê ye.", exampleEn: "The cell is a basic part of the body.", exampleAr: "الخلية جزء أساسي من الجسم." },
  { id: "edu804", ku: "Derman", en: "Medicine / Drug", ar: "دواء / عقار", categoryId: "biology", audio: "/audio/academic/biology/medicine.mp3", level: "intermediate", exampleKu: "Derman nexweşiyê derman dike.", exampleEn: "Medicine cures the disease.", exampleAr: "الدواء يشفي المرض." },
  { id: "edu805", ku: "Nexweşî", en: "Disease", ar: "مرض", categoryId: "biology", audio: "/audio/academic/biology/disease.mp3", level: "intermediate", exampleKu: "Nexweşiya vîrusî belav dibe.", exampleEn: "The viral disease is spreading.", exampleAr: "المرض الفيروسي ينتشر." },
  { id: "edu806", ku: "Bakterî", en: "Bacteria", ar: "بكتيريا", categoryId: "biology", audio: "/audio/academic/biology/bacteria.mp3", level: "advanced", exampleKu: "Bakterî hin caran nexweşî çêdikin.", exampleEn: "Bacteria sometimes cause disease.", exampleAr: "البكتيريا أحياناً تسبب المرض." },
  { id: "edu807", ku: "Vîrus", en: "Virus (biological)", ar: "فيروس", categoryId: "biology", audio: "/audio/academic/biology/virus_bio.mp3", level: "advanced", exampleKu: "Vîrus ji hucreyekê bi hucreyekê din derbas dibe.", exampleEn: "Virus passes from cell to cell.", exampleAr: "الفيروس ينتقل من خلية لأخرى." },
  { id: "edu808", ku: "Xwîn", en: "Blood", ar: "دم", categoryId: "biology", audio: "/audio/academic/biology/blood.mp3", level: "intermediate", exampleKu: "Xwîn oksîjenê li laşê belav dike.", exampleEn: "Blood distributes oxygen in the body.", exampleAr: "الدم ينقل الأكسجين في الجسم." },
  { id: "edu809", ku: "Dil", en: "Heart", ar: "قلب", categoryId: "biology", audio: "/audio/academic/biology/heart.mp3", level: "intermediate", exampleKu: "Dil xwînê pompe dike.", exampleEn: "The heart pumps blood.", exampleAr: "القلب يضخ الدم." },
  { id: "edu810", ku: "Pişik", en: "Lung", ar: "رئة", categoryId: "biology", audio: "/audio/academic/biology/lung.mp3", level: "intermediate", exampleKu: "Pişik hewayê paqij dikin.", exampleEn: "The lungs clean the air.", exampleAr: "الرئتان تنظفان الهواء." },
  { id: "edu811", ku: "Mêjî", en: "Brain", ar: "دماغ", categoryId: "biology", audio: "/audio/academic/biology/brain.mp3", level: "intermediate", exampleKu: "Mêjî navenda kontrolê ya laşê ye.", exampleEn: "The brain is the control center of the body.", exampleAr: "الدماغ هو مركز التحكم في الجسم." },
  { id: "edu812", ku: "Laş", en: "Body", ar: "جسم", categoryId: "biology", audio: "/audio/academic/biology/body.mp3", level: "beginner", exampleKu: "Laşê mirovî pêşkeftî ye.", exampleEn: "The human body is advanced.", exampleAr: "جسم الإنسان متطور." },
  { id: "edu813", ku: "Masûlke", en: "Muscle", ar: "عضلة", categoryId: "biology", audio: "/audio/academic/biology/muscle.mp3", level: "intermediate", exampleKu: "Masûlke laşê me diguhezînin.", exampleEn: "Muscles move our body.", exampleAr: "العضلات تحرك جسمنا." },
  { id: "edu814", ku: "Hestî", en: "Bone", ar: "عظم", categoryId: "biology", audio: "/audio/academic/biology/bone.mp3", level: "beginner", exampleKu: "Hestî piştgiriyê didin laşê me.", exampleEn: "Bones support our body.", exampleAr: "العظام تدعم جسمنا." },
  { id: "edu815", ku: "Çerm", en: "Skin", ar: "جلد", categoryId: "biology", audio: "/audio/academic/biology/skin.mp3", level: "beginner", exampleKu: "Çerm parastina laş e.", exampleEn: "Skin is the protection of the body.", exampleAr: "الجلد هو حماية الجسم." },
  { id: "edu816", ku: "Çav", en: "Eye", ar: "عين", categoryId: "biology", audio: "/audio/academic/biology/eye.mp3", level: "beginner", exampleKu: "Çav ji bo dîtinê ye.", exampleEn: "The eye is for seeing.", exampleAr: "العين للرؤية." },
  { id: "edu817", ku: "Guh", en: "Ear", ar: "أذن", categoryId: "biology", audio: "/audio/academic/biology/ear.mp3", level: "beginner", exampleKu: "Guh ji bo bihîstinê ye.", exampleEn: "The ear is for hearing.", exampleAr: "الأذن للسمع." },
  { id: "edu818", ku: "Dev", en: "Mouth", ar: "فم", categoryId: "biology", audio: "/audio/academic/biology/mouth.mp3", level: "beginner", exampleKu: "Dev ji bo xwarinê ye.", exampleEn: "The mouth is for eating.", exampleAr: "الفم للأكل." },
  { id: "edu819", ku: "Diran", en: "Tooth", ar: "سن", categoryId: "biology", audio: "/audio/academic/biology/tooth.mp3", level: "beginner", exampleKu: "Diran ji bo ciûtinê ne.", exampleEn: "Teeth are for chewing.", exampleAr: "الأسنان للمضغ." },
  { id: "edu820", ku: "Ziman", en: "Tongue", ar: "لسان", categoryId: "biology", audio: "/audio/academic/biology/tongue.mp3", level: "beginner", exampleKu: "Ziman ji bo tamkirinê ye.", exampleEn: "The tongue is for tasting.", exampleAr: "اللسان للتذوق." },
  { id: "edu821", ku: "Gen", en: "DNA / Gene", ar: "جين / حمض نووي", categoryId: "biology", audio: "/audio/academic/biology/gene.mp3", level: "advanced", exampleKu: "Gen taybetmendiyên me diyar dikin.", exampleEn: "Genes determine our traits.", exampleAr: "الجينات تحدد صفاتنا." },
  { id: "edu822", ku: "Genetîk", en: "Genetics", ar: "وراثة", categoryId: "biology", audio: "/audio/academic/biology/genetics.mp3", level: "advanced", exampleKu: "Genetîk li ser genên malbatî dixebite.", exampleEn: "Genetics works on family genes.", exampleAr: "الوراثة تعمل على الجينات العائلية." },
  { id: "edu823", ku: "Bîolojîst", en: "Biologist", ar: "أحيائي", categoryId: "biology", audio: "/audio/academic/biology/biologist.mp3", level: "intermediate", exampleKu: "Bîolojîst li ser zîndewaran lêkolîn dike.", exampleEn: "The biologist studies organisms.", exampleAr: "الأحيائي يدرس الكائنات الحية." },
  { id: "edu824", ku: "Ekosîstem", en: "Ecosystem", ar: "نظام بيئي", categoryId: "biology", audio: "/audio/academic/biology/ecosystem.mp3", level: "advanced", exampleKu: "Ekosîstema daristanê dewlemend e.", exampleEn: "The forest ecosystem is rich.", exampleAr: "النظام البيئي للغابة غني." },
  { id: "edu825", ku: "Fotosentez", en: "Photosynthesis", ar: "البناء الضوئي", categoryId: "biology", audio: "/audio/academic/biology/photosynthesis.mp3", level: "advanced", exampleKu: "Giyayên bi fotosentezê xwarinê çêdikin.", exampleEn: "Plants make food through photosynthesis.", exampleAr: "النباتات تصنع غذاءها بالبناء الضوئي." },
  { id: "edu826", ku: "Pergala demarî", en: "Nervous System", ar: "الجهاز العصبي", categoryId: "biology", audio: "/audio/academic/biology/nervous_system.mp3", level: "advanced", exampleKu: "Pergala demarî peyamên laş belav dike.", exampleEn: "The nervous system spreads body messages.", exampleAr: "الجهاز العصبي ينقل رسائل الجسم." },
  { id: "edu827", ku: "Pergala helandinê", en: "Digestive System", ar: "الجهاز الهضمي", categoryId: "biology", audio: "/audio/academic/biology/digestive.mp3", level: "advanced", exampleKu: "Pergala helandinê xwarinê vediguhezîne.", exampleEn: "The digestive system transforms food.", exampleAr: "الجهاز الهضمي يحول الطعام." },
  { id: "edu828", ku: "Pergala geroka xwînê", en: "Circulatory System", ar: "الجهاز الدوري", categoryId: "biology", audio: "/audio/academic/biology/circulatory.mp3", level: "advanced", exampleKu: "Pergala geroka xwînê xwînê digerîne.", exampleEn: "The circulatory system circulates blood.", exampleAr: "الجهاز الدوري يدور الدم." },
  { id: "edu829", ku: "Pergala henaseyê", en: "Respiratory System", ar: "الجهاز التنفسي", categoryId: "biology", audio: "/audio/academic/biology/respiratory.mp3", level: "advanced", exampleKu: "Pergala henaseyê oksîjenê dikişîne.", exampleEn: "The respiratory system absorbs oxygen.", exampleAr: "الجهاز التنفسي يمتص الأكسجين." },
  { id: "edu830", ku: "Endam", en: "Organ", ar: "عضو", categoryId: "biology", audio: "/audio/academic/biology/organ.mp3", level: "intermediate", exampleKu: "Dil endamekî girîng e.", exampleEn: "The heart is an important organ.", exampleAr: "القلب عضو مهم." },
  { id: "edu831", ku: "Tenduristî", en: "Health", ar: "صحة", categoryId: "biology", audio: "/audio/academic/biology/health.mp3", level: "beginner", exampleKu: "Tenduristî dewlemendiya rastîn e.", exampleEn: "Health is true wealth.", exampleAr: "الصحة هي الغنى الحقيقي." },
  { id: "edu832", ku: "Vaksîn", en: "Vaccine", ar: "لقاح", categoryId: "biology", audio: "/audio/academic/biology/vaccine.mp3", level: "advanced", exampleKu: "Vaksîn laşê li dijî nexweşiyê amade dike.", exampleEn: "Vaccine prepares the body against disease.", exampleAr: "اللقاح يجهز الجسم ضد المرض." },
  { id: "edu833", ku: "Mîkrob", en: "Microbe / Microorganism", ar: "ميكروب / كائن مجهري", categoryId: "biology", audio: "/audio/academic/biology/microbe.mp3", level: "advanced", exampleKu: "Mîkrob bi çavan nayê dîtin.", exampleEn: "Microbes cannot be seen with the eyes.", exampleAr: "الميكروبات لا ترى بالعين المجردة." },
  { id: "edu834", ku: "Mîkroskop", en: "Microscope", ar: "مجهر", categoryId: "biology", audio: "/audio/academic/biology/microscope.mp3", level: "intermediate", exampleKu: "Bi mîkroskopê hucreyan dibînin.", exampleEn: "They see cells with a microscope.", exampleAr: "يرون الخلايا بالمجهر." },
  { id: "edu835", ku: "Madeyên xwarinê", en: "Nutrients", ar: "مواد غذائية", categoryId: "biology", audio: "/audio/academic/biology/nutrients.mp3", level: "intermediate", exampleKu: "Laş ji bo jiyana xwe madeyên xwarinê hewce dike.", exampleEn: "The body needs nutrients for life.", exampleAr: "الجسم يحتاج المواد الغذائية للحياة." },
  { id: "edu836", ku: "Hormon", en: "Hormone", ar: "هرمون", categoryId: "biology", audio: "/audio/academic/biology/hormone.mp3", level: "advanced", exampleKu: "Hormon laş bi rêve dibin.", exampleEn: "Hormones guide the body.", exampleAr: "الهرمونات توجه الجسم." },
  { id: "edu837", ku: "Enzîm", en: "Enzyme", ar: "إنزيم", categoryId: "biology", audio: "/audio/academic/biology/enzyme.mp3", level: "advanced", exampleKu: "Enzîm tajeliyên kîmyayî lez dike.", exampleEn: "Enzymes speed up chemical reactions.", exampleAr: "الإنزيمات تسرع التفاعلات الكيميائية." },
  // ==================== EXAMS & STUDY (الامتحانات والدراسة) ====================
  { id: "edu17", ku: "Ezmûn", en: "Exam", ar: "امتحان", categoryId: "exams", audio: "/audio/academic/exam.mp3", level: "beginner", exampleKu: "Ezmûna matematîkê sibê ye.", exampleEn: "The math exam is tomorrow.", exampleAr: "امتحان الرياضيات غداً." },
  { id: "edu18", ku: "Pirs", en: "Question", ar: "سؤال", categoryId: "exams", audio: "/audio/academic/question.mp3", level: "beginner", exampleKu: "Pirsek min heye.", exampleEn: "I have a question.", exampleAr: "لدي سؤال." },
  { id: "edu19", ku: "Bersiv", en: "Answer", ar: "إجابة", categoryId: "exams", audio: "/audio/academic/answer.mp3", level: "beginner", exampleKu: "Bersiva vê pirsê zor e.", exampleEn: "The answer to this question is difficult.", exampleAr: "إجابة هذا السؤال صعبة." },
  { id: "edu20", ku: "Nîşe", en: "Grade / Score", ar: "درجة / علامة", categoryId: "exams", audio: "/audio/academic/grade.mp3", level: "beginner", exampleKu: "Nîşeya min a bilind bû.", exampleEn: "My grade was high.", exampleAr: "درجتي كانت عالية." },
  { id: "edu901", ku: "Serkeftin", en: "Success / Pass", ar: "نجاح", categoryId: "exams", audio: "/audio/academic/success.mp3", level: "beginner", exampleKu: "Serkeftina min di ezmûnê de bû.", exampleEn: "My success was in the exam.", exampleAr: "نجاحي كان في الامتحان." },
  { id: "edu902", ku: "Ketina ezmûnê", en: "Failure / Fail", ar: "رسوب", categoryId: "exams", audio: "/audio/academic/failure.mp3", level: "beginner", exampleKu: "Ketina wî ya di ezmûnê de ew xemgîn kir.", exampleEn: "His failure made him sad.", exampleAr: "رسوبه جعله حزيناً." },
  { id: "edu903", ku: "Pêşkêşî", en: "Presentation", ar: "عرض تقديمي", categoryId: "exams", audio: "/audio/academic/presentation.mp3", level: "intermediate", exampleKu: "Pêşkêşiya min li ser dîroka Kurdistanê bû.", exampleEn: "My presentation was about Kurdish history.", exampleAr: "عرضي كان عن تاريخ كردستان." },
  { id: "edu904", ku: "Gotar", en: "Essay / Article", ar: "مقال", categoryId: "exams", audio: "/audio/academic/essay.mp3", level: "intermediate", exampleKu: "Gotara min li ser perwerdeyê ye.", exampleEn: "My essay is about education.", exampleAr: "مقالي حول التعليم." },
  { id: "edu905", ku: "Erkê malê", en: "Homework", ar: "واجب منزلي", categoryId: "exams", audio: "/audio/academic/homework.mp3", level: "beginner", exampleKu: "Erkê malê yê îro dirêj e.", exampleEn: "Today's homework is long.", exampleAr: "واجب اليوم طويل." },
  { id: "edu906", ku: "Xwendina bi hev re", en: "Group Study", ar: "دراسة جماعية", categoryId: "exams", audio: "/audio/academic/group_study.mp3", level: "intermediate", exampleKu: "Em îro xwendina bi hev re dikin.", exampleEn: "We are doing group study today.", exampleAr: "نحن ندرس جماعياً اليوم." },
  { id: "edu907", ku: "Nîşankirin", en: "Marking / Grading", ar: "تصحيح / توقيع", categoryId: "exams", audio: "/audio/academic/marking.mp3", level: "intermediate", exampleKu: "Nîşankirina ezmûnan dem digire.", exampleEn: "Marking exams takes time.", exampleAr: "تصحيح الامتحانات يأخذ وقتاً." },
  { id: "edu908", ku: "Sertîfîka", en: "Certificate", ar: "شهادة", categoryId: "exams", audio: "/audio/academic/certificate.mp3", level: "intermediate", exampleKu: "Sertîfîkaya xwendinê stand.", exampleEn: "He got the study certificate.", exampleAr: "حصل على شهادة الدراسة." },
  { id: "edu909", ku: "Diplom", en: "Diploma", ar: "دبلوم", categoryId: "exams", audio: "/audio/academic/diploma.mp3", level: "intermediate", exampleKu: "Diplom ji bo karê girîng e.", exampleEn: "A diploma is important for work.", exampleAr: "الدبلوم مهم للعمل." },
  { id: "edu910", ku: "Qebûlkirin", en: "Admission / Acceptance", ar: "قبول", categoryId: "exams", audio: "/audio/academic/admission.mp3", level: "intermediate", exampleKu: "Qebûlkirina min ji zanîngehê hat.", exampleEn: "My admission from university came.", exampleAr: "جاء قبولي من الجامعة." },
  { id: "edu911", ku: "Bernameya xwendinê / Sîlabus", en: "Syllabus / Curriculum", ar: "منهج دراسي", categoryId: "exams", audio: "/audio/academic/syllabus.mp3", level: "intermediate", exampleKu: "Bernameya xwendinê ya vê semestrê nû ye.", exampleEn: "This semester's syllabus is new.", exampleAr: "منهج هذا الفصل جديد." },
  { id: "edu912", ku: "Kredî", en: "Credit (Hour)", ar: "ساعة معتمدة", categoryId: "exams", audio: "/audio/academic/credit.mp3", level: "advanced", exampleKu: "Vê dersê sê kredî ye.", exampleEn: "This course is three credits.", exampleAr: "هذه المادة ثلاث ساعات معتمدة." },
  { id: "edu913", ku: "Navînî", en: "Average / GPA", ar: "معدل", categoryId: "exams", audio: "/audio/academic/gpa.mp3", level: "intermediate", exampleKu: "Navîniya min a giştî sê û nîv e.", exampleEn: "My overall average is three and a half.", exampleAr: "معدلي العام ثلاثة ونصف." },
  { id: "edu914", ku: "Dersa bijartî", en: "Optional Course", ar: "مادة اختيارية", categoryId: "exams", audio: "/audio/academic/optional.mp3", level: "intermediate", exampleKu: "Min dersa bijartî ya îngilîzî hilbijart.", exampleEn: "I chose English as an optional course.", exampleAr: "اخترت الإنجليزية مادة اختيارية." },
  { id: "edu915", ku: "Dersa bingehîn", en: "Core Course", ar: "مادة إجبارية", categoryId: "exams", audio: "/audio/academic/core.mp3", level: "intermediate", exampleKu: "Matematîk dersa bingehîn e.", exampleEn: "Mathematics is a core course.", exampleAr: "الرياضيات مادة إجبارية." },
  { id: "edu916", ku: "Dizîna zanistî", en: "Plagiarism", ar: "انتحال / سرقة أدبية", categoryId: "exams", audio: "/audio/academic/plagiarism.mp3", level: "advanced", exampleKu: "Dizîna zanistî qedexe ye.", exampleEn: "Plagiarism is forbidden.", exampleAr: "الانتحال ممنوع." },
  // ==================== ACADEMIC ACTIONS (أفعال أكاديمية) ====================
  { id: "edu21", ku: "Xwendin", en: "To Read / Study", ar: "يقرأ / يدرس", categoryId: "actions", audio: "/audio/academic/to_read.mp3", level: "beginner", exampleKu: "Ez her roj dixwînim.", exampleEn: "I study every day.", exampleAr: "أدرس كل يوم." },
  { id: "edu22", ku: "Nivîsîn", en: "To Write", ar: "يكتب", categoryId: "actions", audio: "/audio/academic/to_write.mp3", level: "beginner", exampleKu: "Ez nameyekê dinivîsim.", exampleEn: "I am writing a letter.", exampleAr: "أكتب رسالة." },
  { id: "edu23", ku: "Fêrbûn", en: "To Learn", ar: "يتعلم", categoryId: "actions", audio: "/audio/academic/to_learn.mp3", level: "beginner", exampleKu: "Ez her roj tiştekî nû fêr dibim.", exampleEn: "I learn something new every day.", exampleAr: "أتعلم شيئاً جديداً كل يوم." },
  { id: "edu1001", ku: "Gotin / Axaftin", en: "To Speak / Talk", ar: "يتكلم", categoryId: "actions", audio: "/audio/academic/to_speak.mp3", level: "beginner", exampleKu: "Ew bi zelalî diaxive.", exampleEn: "He speaks clearly.", exampleAr: "يتكلم بوضوح." },
  { id: "edu1002", ku: "Fêmkirin", en: "To Understand", ar: "يفهم", categoryId: "actions", audio: "/audio/academic/to_understand.mp3", level: "beginner", exampleKu: "Ez te baş fêm dikim.", exampleEn: "I understand you well.", exampleAr: "أفهمك جيداً." },
  { id: "edu1003", ku: "Pirsîn", en: "To Ask", ar: "يسأل", categoryId: "actions", audio: "/audio/academic/to_ask.mp3", level: "beginner", exampleKu: "Ez ji mamoste pirsîm.", exampleEn: "I asked the teacher.", exampleAr: "سألت الأستاذ." },
  { id: "edu1004", ku: "Bersivdan", en: "To Answer / Reply", ar: "يجيب", categoryId: "actions", audio: "/audio/academic/to_answer.mp3", level: "beginner", exampleKu: "Wî bersiva pirsê da.", exampleEn: "He answered the question.", exampleAr: "أجاب على السؤال." },
  { id: "edu1005", ku: "Guhdarîkirin", en: "To Listen", ar: "يستمع", categoryId: "actions", audio: "/audio/academic/to_listen.mp3", level: "beginner", exampleKu: "Ez bi baldarî guhdarî mamoste dikim.", exampleEn: "I listen to the teacher carefully.", exampleAr: "أستمع للأستاذ بعناية." },
  { id: "edu1006", ku: "Dîtîn", en: "To See / Watch", ar: "يرى / يشاهد", categoryId: "actions", audio: "/audio/academic/to_see.mp3", level: "beginner", exampleKu: "Ez vîdyoyê dibînim.", exampleEn: "I am watching the video.", exampleAr: "أشاهد الفيديو." },
  { id: "edu1007", ku: "Xêzkirin", en: "To Draw", ar: "يرسم", categoryId: "actions", audio: "/audio/academic/to_draw.mp3", level: "beginner", exampleKu: "Ez wêneyekê xêz dikim.", exampleEn: "I am drawing a picture.", exampleAr: "أرسم صورة." },
  { id: "edu1008", ku: "Hilbijartin", en: "To Choose / Select", ar: "يختار", categoryId: "actions", audio: "/audio/academic/to_choose.mp3", level: "intermediate", exampleKu: "Ez vê bersivê hilbijart.", exampleEn: "I chose this answer.", exampleAr: "اخترت هذا الجواب." },
  { id: "edu1009", ku: "Analîzkirin", en: "To Analyze", ar: "يحلل", categoryId: "actions", audio: "/audio/academic/to_analyze.mp3", level: "advanced", exampleKu: "Em daneyan analîz dikin.", exampleEn: "We analyze the data.", exampleAr: "نحلل البيانات." },
  { id: "edu1010", ku: "Berhevkirin", en: "To Collect / Gather", ar: "يجمع", categoryId: "actions", audio: "/audio/academic/to_collect.mp3", level: "intermediate", exampleKu: "Ez agahî berhev dikim.", exampleEn: "I am collecting information.", exampleAr: "أجمع المعلومات." },
  { id: "edu1011", ku: "Lêkolîn", en: "To Research", ar: "يبحث", categoryId: "actions", audio: "/audio/academic/to_research.mp3", level: "advanced", exampleKu: "Ew li ser zimanê kurdî lêkolîn dike.", exampleEn: "He researches Kurdish language.", exampleAr: "يبحث في اللغة الكردية." },
  { id: "edu1012", ku: "Nîşandan", en: "To Show / Demonstrate", ar: "يشرح / يوضح", categoryId: "actions", audio: "/audio/academic/to_show.mp3", level: "intermediate", exampleKu: "Mamoste li ser textê nîşan da.", exampleEn: "The teacher demonstrated on the board.", exampleAr: "الأستاذ شرح على السبورة." },
  { id: "edu1013", ku: "Çareserkirin", en: "To Solve", ar: "يحل", categoryId: "actions", audio: "/audio/academic/to_solve.mp3", level: "intermediate", exampleKu: "Ez pirsgirêkê çareser dikim.", exampleEn: "I am solving the problem.", exampleAr: "أحل المشكلة." },
  { id: "edu1014", ku: "Ezberkirin", en: "To Memorize", ar: "يحفظ", categoryId: "actions", audio: "/audio/academic/to_memorize.mp3", level: "intermediate", exampleKu: "Ez peyvên nû ji ber dikim.", exampleEn: "I memorize new words.", exampleAr: "أحفظ الكلمات الجديدة." },
  { id: "edu1015", ku: "Rêkxistin", en: "To Organize", ar: "ينظم", categoryId: "actions", audio: "/audio/academic/to_organize.mp3", level: "intermediate", exampleKu: "Ez belgeyên xwe rêk dixim.", exampleEn: "I organize my documents.", exampleAr: "أنظم وثائقي." },
  { id: "edu1016", ku: "Pêşkêşkirin", en: "To Present", ar: "يقدم", categoryId: "actions", audio: "/audio/academic/to_present.mp3", level: "intermediate", exampleKu: "Ew li pêşberî polê pêşkêş kir.", exampleEn: "He presented in front of the class.", exampleAr: "قدم أمام الفصل." },
  { id: "edu1017", ku: "Nûkirin", en: "To Update / Renew", ar: "يجدد / يحدث", categoryId: "actions", audio: "/audio/academic/to_update.mp3", level: "intermediate", exampleKu: "Ez zanyariyan nû dikim.", exampleEn: "I update the information.", exampleAr: "أحدث المعلومات." },
  { id: "edu1018", ku: "Pêşniyazkirin", en: "To Recommend / Suggest", ar: "يقترح", categoryId: "actions", audio: "/audio/academic/to_suggest.mp3", level: "intermediate", exampleKu: "Ez vê pirtûkê pêşniyaz dikim.", exampleEn: "I recommend this book.", exampleAr: "أقترح هذا الكتاب." },
  { id: "edu1019", ku: "Berawirdkirin", en: "To Compare", ar: "يقارن", categoryId: "actions", audio: "/audio/academic/to_compare.mp3", level: "intermediate", exampleKu: "Em du nivîsaran berawird dikin.", exampleEn: "We compare two articles.", exampleAr: "نقارن مقالين." },
  { id: "edu1020", ku: "Rastkirin", en: "To Correct", ar: "يصحح", categoryId: "actions", audio: "/audio/academic/to_correct.mp3", level: "intermediate", exampleKu: "Mamoste xeletiyan rast kir.", exampleEn: "The teacher corrected the mistakes.", exampleAr: "الأستاذ صحح الأخطاء." }
];
let academicVocabulary = [...defaultAcademicVocabulary];
if (globalThis.window !== void 0) {
  const overrides = localStorage.getItem("academic_vocabulary");
  if (overrides) {
    try {
      academicVocabulary = JSON.parse(overrides);
    } catch (e) {
      console.error("Error loading academic vocabulary overrides:", e);
    }
  }
}
function isAudioPath(text) {
  if (!text) return false;
  return text.startsWith("/") || /\.(mp3|wav|ogg|m4a|aac)$/i.test(text);
}
const audioCache = /* @__PURE__ */ new Map();
let currentlyPlaying = null;
let currentSetter = null;
const MAX_CACHED_AUDIO = 40;
const BUNDLED_AUDIO_ASSETS = /* @__PURE__ */ new Set([
  "/audio/feedback/correct.wav",
  "/audio/feedback/wrong.wav",
  "/audio/feedback/complete.wav"
]);
function normalizeLocalAudioPath(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url, globalThis.window === void 0 ? "http://localhost" : window.location.origin);
    const sameOrigin = globalThis.window === void 0 || parsed.origin === window.location.origin;
    if (!sameOrigin) return null;
    return parsed.pathname;
  } catch {
    return url.startsWith("/") ? url.split(/[?#]/, 1)[0] : null;
  }
}
function hasKnownBundledAudioAsset(url) {
  const localPath = normalizeLocalAudioPath(url);
  if (!localPath || !localPath.startsWith("/audio/")) return false;
  return BUNDLED_AUDIO_ASSETS.has(localPath);
}
function estimateSpeechDurationMs(text, rate = 1) {
  const normalizedRate = Math.max(0.5, rate || 1);
  return Math.min(3500, Math.max(700, text.trim().length * 85 / normalizedRate));
}
function getCachedAudio(url) {
  const existing = audioCache.get(url);
  if (existing) {
    audioCache.delete(url);
    audioCache.set(url, existing);
    return existing;
  }
  while (audioCache.size >= MAX_CACHED_AUDIO) {
    const oldestKey = audioCache.keys().next().value;
    if (oldestKey === void 0) break;
    const victim = audioCache.get(oldestKey);
    audioCache.delete(oldestKey);
    if (victim && victim !== currentlyPlaying) {
      try {
        victim.pause();
        victim.removeAttribute("src");
        victim.load();
      } catch {
      }
    }
  }
  const created = document.createElement("audio");
  created.preload = "none";
  created.src = url;
  audioCache.set(url, created);
  return created;
}
function getMuteState() {
  if (globalThis.window === void 0) return false;
  return localStorage.getItem("quiz_audio_muted") === "true";
}
function setMuteState(muted) {
  if (globalThis.window === void 0) return;
  localStorage.setItem("quiz_audio_muted", String(muted));
  if (muted) {
    stopAllActiveAudio();
  }
}
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      throw new Error("Web Audio API is not supported in this browser");
    }
    audioCtx = new AudioContextCtor();
  }
  return audioCtx;
}
function playSynthSound(trigger) {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume().then(() => {
        try {
          trigger(ctx, ctx.currentTime);
        } catch (e) {
          console.warn("Error running custom playSynthSound callback", e);
        }
      }).catch((err) => {
        console.warn("Could not resume AudioContext inside playSynthSound", err);
      });
    } else {
      trigger(ctx, ctx.currentTime);
    }
  } catch (err) {
    console.warn("Web Audio API is not supported or accessible in this environment", err);
  }
}
function playSuccessSound() {
  if (getMuteState()) return;
  playSynthSound((ctx, t2) => {
    const playNote = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(1e-3, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };
    playNote(523.25, t2, 0.12);
    playNote(659.25, t2 + 0.06, 0.12);
    playNote(783.99, t2 + 0.12, 0.25);
  });
}
function playFailureSound() {
  if (getMuteState()) return;
  playSynthSound((ctx, t2) => {
    const playNote = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);
      osc.frequency.linearRampToValueAtTime(freq - 70, start + duration);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(1e-3, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };
    playNote(220, t2, 0.3);
  });
}
function playCompleteSound() {
  if (getMuteState()) return;
  playSynthSound((ctx, t2) => {
    const playNote = (freq, start, duration, volume = 0.08) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(volume, start + 0.06);
      gain.gain.exponentialRampToValueAtTime(1e-3, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };
    playNote(261.63, t2, 0.5, 0.06);
    playNote(329.63, t2 + 0.06, 0.5, 0.06);
    playNote(392, t2 + 0.12, 0.5, 0.06);
    playNote(523.25, t2 + 0.18, 0.9, 0.1);
  });
}
let cachedVoices = [];
let voicesWarmed = false;
function warmVoices() {
  if (voicesWarmed) return;
  if (globalThis.window === void 0 || !("speechSynthesis" in window)) return;
  voicesWarmed = true;
  const refresh = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices();
    } catch {
      cachedVoices = [];
    }
  };
  refresh();
  try {
    window.speechSynthesis.addEventListener("voiceschanged", refresh);
  } catch {
  }
}
function pickPreferredVoice() {
  warmVoices();
  const voices = cachedVoices.length ? cachedVoices : (() => {
    try {
      return window.speechSynthesis.getVoices();
    } catch {
      return [];
    }
  })();
  const kuVoice = voices.find((v) => {
    const lang = (v.lang || "").toLowerCase();
    return lang === "ku" || lang.startsWith("ku-") || lang.startsWith("ku_") || lang.startsWith("kmr");
  });
  const trVoice = voices.find((v) => (v.lang || "").toLowerCase().startsWith("tr"));
  const enVoice = voices.find((v) => (v.lang || "").toLowerCase().startsWith("en"));
  return kuVoice ?? trVoice ?? enVoice ?? voices[0] ?? null;
}
function speakFallback(text, rate = 1) {
  if (getMuteState()) return;
  if (globalThis.window === void 0 || !("speechSynthesis" in window)) return;
  const looksLikePath = isAudioPath(text);
  if (looksLikePath) {
    console.warn(`[useAudio] speakFallback refused path string "${text}". Explicit textToSpeak is required.`);
    return;
  }
  const cleanText = text.trim();
  if (!cleanText) return;
  try {
    warmVoices();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();
  } catch (e) {
    console.warn(e);
  }
  const utterance = new SpeechSynthesisUtterance(cleanText);
  const preferred = pickPreferredVoice();
  if (preferred) {
    const lang = (preferred.lang || "").toLowerCase();
    utterance.voice = preferred;
    if (lang === "ku" || lang.startsWith("ku") || lang.startsWith("kmr")) {
      utterance.lang = preferred.lang;
    } else if (lang.startsWith("tr")) {
      utterance.lang = "tr";
    } else if (lang.startsWith("en")) {
      utterance.lang = "en";
    }
  }
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}
function stopAllActiveAudio() {
  if (currentlyPlaying) {
    try {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
    } catch (e) {
      console.warn(e);
    }
    currentlyPlaying = null;
  }
  if (currentSetter) {
    currentSetter(false);
    currentSetter = null;
  }
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn(e);
    }
  }
}
const playAudioUrl = async (url, textToSpeak, playbackRate = 1) => {
  if (getMuteState()) return;
  const fallbackText = textToSpeak || url;
  {
    speakFallback(fallbackText, playbackRate);
    await new Promise((resolve) => window.setTimeout(resolve, estimateSpeechDurationMs(fallbackText, playbackRate)));
    return;
  }
};
function useAudio(audioUrl, textToSpeak) {
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const audioInstanceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (!audioUrl || !hasKnownBundledAudioAsset(audioUrl)) {
      audioInstanceRef.current = null;
      return;
    }
    const audio = getCachedAudio(audioUrl);
    audioInstanceRef.current = audio;
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      if (currentlyPlaying === audio) {
        currentlyPlaying = null;
        currentSetter = null;
      }
    };
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration * 100);
      }
    };
    const handlePause = () => {
      setIsPlaying(false);
    };
    const handlePlayState = () => {
      setIsPlaying(true);
    };
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlayState);
    if (!audio.paused) {
      setIsPlaying(true);
      currentlyPlaying = audio;
      currentSetter = setIsPlaying;
    }
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlayState);
      if (currentlyPlaying === audio) {
        audio.pause();
        audio.currentTime = 0;
        currentlyPlaying = null;
        if (currentSetter) currentSetter(false);
      }
    };
  }, [audioUrl]);
  const play = reactExports.useCallback(async (playbackRate = 1) => {
    if (getMuteState()) {
      setIsPlaying(true);
      setTimeout(() => {
        setIsPlaying(false);
      }, 500);
      return;
    }
    if (!audioUrl && !textToSpeak) return;
    {
      const fallbackText = textToSpeak || audioUrl || "";
      speakFallback(fallbackText, playbackRate);
      setIsPlaying(true);
      window.setTimeout(() => {
        setIsPlaying(false);
      }, estimateSpeechDurationMs(fallbackText, playbackRate));
      return;
    }
  }, [audioUrl, textToSpeak]);
  const stop = reactExports.useCallback(() => {
    if (audioInstanceRef.current) {
      const audio = audioInstanceRef.current;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {
        console.warn(e);
      }
      setIsPlaying(false);
      setProgress(0);
      if (currentlyPlaying === audio) {
        currentlyPlaying = null;
        currentSetter = null;
      }
    }
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn(e);
      }
    }
  }, []);
  return { play, stop, isPlaying, progress };
}
let zombieMusInterval = null;
function startZombieMusic() {
  if (getMuteState()) return;
  stopZombieMusic();
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    let step = 0;
    const notes = [82.41, 98, 92.5, 87.31];
    zombieMusInterval = setInterval(() => {
      if (getMuteState()) return;
      try {
        const t2 = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(notes[step % notes.length], t2);
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, t2);
        gain.gain.setValueAtTime(0, t2);
        gain.gain.linearRampToValueAtTime(0.04, t2 + 0.05);
        gain.gain.exponentialRampToValueAtTime(1e-3, t2 + 0.38);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t2);
        osc.stop(t2 + 0.4);
        step++;
      } catch (err) {
        console.warn(err);
      }
    }, 450);
  } catch (e) {
    console.warn("Could not activate synthesized zombie music", e);
  }
}
function stopZombieMusic() {
  if (zombieMusInterval) {
    clearInterval(zombieMusInterval);
    zombieMusInterval = null;
  }
}
function playZombieKillSound() {
  if (getMuteState()) return;
  playSynthSound((ctx, t2) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(750, t2);
    osc.frequency.exponentialRampToValueAtTime(120, t2 + 0.16);
    gain.gain.setValueAtTime(0.12, t2);
    gain.gain.exponentialRampToValueAtTime(1e-3, t2 + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t2);
    osc.stop(t2 + 0.16);
  });
}
function playZombieDamageSound() {
  if (getMuteState()) return;
  playSynthSound((ctx, t2) => {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(110, t2);
    osc1.frequency.linearRampToValueAtTime(55, t2 + 0.32);
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(107, t2);
    osc2.frequency.linearRampToValueAtTime(52, t2 + 0.32);
    gain.gain.setValueAtTime(0, t2);
    gain.gain.linearRampToValueAtTime(0.25, t2 + 0.04);
    gain.gain.exponentialRampToValueAtTime(1e-3, t2 + 0.35);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.start(t2);
    osc2.start(t2);
    osc1.stop(t2 + 0.35);
    osc2.stop(t2 + 0.35);
  });
}
function slowLabel(language) {
  if (language === "ar") return "بطيء";
  if (language === "ku") return "Hêdî";
  return "Slow";
}
function AudioButton({ audioUrl, textToSpeak, className = "", iconClassName = "w-6 h-6", showProgress = true, playbackRate, label }) {
  const { language } = useAuth();
  const { play, stop, isPlaying, progress } = useAudio(audioUrl, textToSpeak);
  const isDisabled = !audioUrl && !textToSpeak;
  const hasExplicitRate = playbackRate !== void 0;
  const [slowArmed, setSlowArmed] = reactExports.useState(false);
  const [playingSlow, setPlayingSlow] = reactExports.useState(false);
  const slowText = slowLabel(language);
  const isSlowed = hasExplicitRate ? playbackRate < 1 : playingSlow;
  const handlePress = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isDisabled) return;
    const rate = hasExplicitRate ? playbackRate : slowArmed ? 0.7 : 1;
    if (isPlaying) {
      stop();
    }
    play(rate);
    setPlayingSlow(rate < 1);
    setSlowArmed((prev) => !prev);
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
    setSlowArmed((prev) => !prev);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: handlePress,
      onContextMenu: handleContextMenu,
      disabled: isDisabled,
      type: "button",
      className: `relative min-w-[44px] min-h-[44px] p-3 rounded-full transition-all outline-none overflow-hidden flex items-center justify-center
        focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
        ${isDisabled ? "opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600" : isPlaying ? "bg-indigo-100 dark:bg-indigo-950/80 shadow-inner text-indigo-800 dark:text-indigo-300" : "bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 active:scale-95 text-indigo-600 dark:text-indigo-400"}
        ${className}`,
      title: isSlowed ? `${slowText} (press again for normal)` : "Play Audio",
      "aria-label": isPlaying ? `Stop pronunciation${textToSpeak ? ` of ${textToSpeak}` : ""}` : `${isSlowed ? `${slowText} — ` : ""}Play pronunciation${label ?? (textToSpeak ? ` of ${textToSpeak}` : "")}`,
      "aria-pressed": isPlaying,
      children: [
        showProgress && isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 top-0 bottom-0 bg-indigo-200/50 dark:bg-indigo-700/50 transition-all duration-75 ease-linear pointer-events-none",
            style: { width: `${progress}%` }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: isPlaying ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 },
            transition: { duration: 0.8, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" },
            children: isSlowed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Turtle, { className: `${iconClassName} text-amber-600 dark:text-amber-400` }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: iconClassName })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", "aria-live": "polite", children: isPlaying ? isSlowed ? "Playing audio slowly" : "Playing audio" : "Audio stopped" })
      ]
    }
  );
}
const AVATAR_ICONS = {
  "user": User,
  "smile": Smile,
  "graduation-cap": GraduationCap,
  "flame": Flame,
  "sparkles": Sparkles,
  "star": Star,
  "compass": Compass,
  "award": Award
};
const TOTAL_STEPS = 4;
function OnboardingFlow({ onComplete }) {
  const { language, updateUserData } = useAuth();
  const [step, setStep] = reactExports.useState(0);
  const [saving, setSaving] = reactExports.useState(false);
  const [reason, setReason] = reactExports.useState("");
  const [level, setLevel] = reactExports.useState("");
  const [goalXp, setGoalXp] = reactExports.useState(null);
  const [avatarId, setAvatarId] = reactExports.useState("");
  const REASONS = [
    { id: "family", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }), tone: "bg-rose-100 dark:bg-rose-950/40 text-rose-500", title: t(language, "onb_reason_family"), desc: t(language, "onb_reason_family_desc") },
    { id: "travel", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { className: "w-5 h-5" }), tone: "bg-sky-100 dark:bg-sky-950/40 text-sky-500", title: t(language, "onb_reason_travel"), desc: t(language, "onb_reason_travel_desc") },
    { id: "culture", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }), tone: "bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#D97706] dark:text-[#FFCE6B]", title: t(language, "onb_reason_culture"), desc: t(language, "onb_reason_culture_desc") },
    { id: "career", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-5 h-5" }), tone: "bg-purple-100 dark:bg-purple-950/40 text-purple-600", title: t(language, "onb_reason_career"), desc: t(language, "onb_reason_career_desc") }
  ];
  const LEVELS = [
    { id: "beginner", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-5 h-5" }), tone: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600", title: t(language, "onb_level_beginner"), desc: t(language, "onb_level_beginner_desc") },
    { id: "elementary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }), tone: "bg-sky-100 dark:bg-sky-950/40 text-sky-500", title: t(language, "onb_level_basics"), desc: t(language, "onb_level_basics_desc") },
    { id: "conversational", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-5 h-5" }), tone: "bg-purple-100 dark:bg-purple-950/40 text-purple-600", title: t(language, "onb_level_intermediate"), desc: t(language, "onb_level_intermediate_desc") }
  ];
  const GOALS = [
    { xp: 20, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { className: "w-5 h-5" }), tone: "bg-sky-100 dark:bg-sky-950/40 text-sky-500", title: t(language, "onb_goal_casual"), desc: t(language, "onb_goal_casual_desc") },
    { xp: 50, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-5 h-5" }), tone: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600", title: t(language, "onb_goal_regular"), desc: t(language, "onb_goal_regular_desc") },
    { xp: 100, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5" }), tone: "bg-orange-100 dark:bg-orange-950/40 text-orange-500", title: t(language, "onb_goal_serious"), desc: t(language, "onb_goal_serious_desc") }
  ];
  const stepReady = step === 0 ? reason !== "" : step === 1 ? level !== "" : step === 2 ? goalXp !== null : avatarId !== "";
  const finish = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const mins = goalXp === 20 ? 5 : goalXp === 100 ? 15 : 10;
      try {
        localStorage.setItem("kurdish_quest_daily_goal_mins", String(mins));
      } catch {
      }
      await updateUserData({
        isOnboarded: true,
        onboardingReason: reason || "culture",
        onboardingLevel: level || "beginner",
        dailyGoalXp: goalXp ?? 50,
        avatarId: avatarId || AVATARS[0].id,
        preferredStartingPath: level === "conversational" ? "A2" : "A1"
      });
      onComplete();
    } finally {
      setSaving(false);
    }
  };
  const next = () => {
    if (!stepReady || saving) return;
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else void finish();
  };
  const titles = [
    [t(language, "onb_reason_title"), t(language, "onb_reason_subtitle")],
    [t(language, "onb_level_title"), t(language, "onb_level_subtitle")],
    [t(language, "onb_goal_title"), t(language, "onb_goal_subtitle")],
    [t(language, "onb_avatar_title"), t(language, "onb_avatar_subtitle")]
  ][step];
  const OptionRow = ({ active, onClick, icon, tone, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `w-full p-4 rounded-3xl border-2 flex items-center gap-3.5 transition-all cursor-pointer text-start bg-white dark:bg-slate-900 ${active ? "border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14] shadow-[0_4px_20px_rgba(255,179,0,0.15)]" : "border-line-soft hover:border-[#FFB300]/50 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${tone}`, "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-black text-sm text-ink leading-snug", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted font-semibold mt-0.5 leading-relaxed", children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${active ? "bg-[#FFB300] text-[#432C00]" : "bg-slate-100 dark:bg-slate-800 text-transparent"}`,
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 stroke-[3.5]" })
          }
        )
      ]
    }
  );
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "fixed inset-0 z-[100] bg-[#FBFBFA] dark:bg-[#141414] overflow-y-auto",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": titles[0],
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto min-h-full flex flex-col p-5 pb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 pb-5", children: [
            step > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setStep((s) => Math.max(0, s - 1)),
                "aria-label": t(language, "ftux_back"),
                className: "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-line-soft text-muted hover:text-ink shadow-xs cursor-pointer shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 rotate-180 rtl:-rotate-0" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center mb-1.5 text-[11px] font-extrabold text-muted uppercase tracking-widest", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                t(language, "onb_step"),
                " ",
                step + 1,
                " / ",
                TOTAL_STEPS
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "h-full rounded-full bg-gradient-to-r from-[#FFC541] to-[#FFA000]",
                  animate: { width: `${(step + 1) / TOTAL_STEPS * 100}%` },
                  transition: { type: "spring", stiffness: 160, damping: 24 }
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11 shrink-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1.5 pb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[22px] font-black text-ink tracking-tight leading-snug text-balance", children: titles[0] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted font-semibold leading-relaxed", children: titles[1] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 24 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -18 },
              transition: { duration: 0.18 },
              className: "space-y-3",
              children: [
                step === 0 && REASONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(OptionRow, { active: reason === o.id, onClick: () => setReason(o.id), ...o }, o.id)),
                step === 1 && LEVELS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(OptionRow, { active: level === o.id, onClick: () => setLevel(o.id), ...o }, o.id)),
                step === 2 && GOALS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(OptionRow, { active: goalXp === o.xp, onClick: () => setGoalXp(o.xp), ...o }, o.xp)),
                step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3 pt-2", children: AVATARS.map((av) => {
                  const Icon = AVATAR_ICONS[av.icon] || User;
                  const active = avatarId === av.id;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setAvatarId(av.id),
                      "aria-label": av.id,
                      "aria-pressed": active,
                      className: `aspect-square rounded-3xl flex items-center justify-center transition-all cursor-pointer border-2 ${av.color} ${active ? "border-[#FFB300] scale-105 shadow-[0_6px_18px_rgba(255,179,0,0.3)]" : "border-transparent opacity-75 hover:opacity-100"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8" })
                    },
                    av.id
                  );
                }) })
              ]
            },
            step
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: next,
              disabled: !stepReady || saving,
              className: "w-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] py-4 rounded-full font-black text-base shadow-[0_3px_0_#E69500,0_10px_20px_rgba(255,179,0,0.22)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none dark:disabled:bg-slate-800 dark:disabled:text-slate-600 disabled:cursor-not-allowed",
              children: [
                step === TOTAL_STEPS - 1 ? t(language, "onb_finish") : t(language, "continue"),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 rtl:-scale-x-100" })
              ]
            }
          ) })
        ] })
      }
    ),
    document.body
  );
}
const learningPath = [
  {
    id: "A1",
    title: "Beginner A1",
    descEn: "Basic foundations, family greetings, and natural domains.",
    descAr: "الأساسيات والمبادئ الأولية، مفردات العائلة والترحيب وعناصر الطبيعة.",
    requiredXp: 0,
    color: "from-emerald-500 to-green-600",
    lessons: [
      {
        id: "a1_family",
        titleEn: "Family & Relatives",
        titleAr: "العائلة والقرابة",
        descEn: "Learn to address primary household names under familial terms.",
        descAr: "تعلم نطق وكتابة أفراد العائلة والأقارب بلغة كوردية صحيحة.",
        icon: "Users",
        xpReward: 30,
        words: [
          { id: "f_mom", ku: "Dayik", en: "Mother", ar: "أُم", emoji: "👩", audio: "/audio/family/mother.mp3", category: "family", difficulty: "easy" },
          { id: "f_dad", ku: "Bav", en: "Father", ar: "أب", emoji: "👨", audio: "/audio/family/father.mp3", category: "family", difficulty: "easy" },
          { id: "f_bro", ku: "Bra", en: "Brother", ar: "شقيق / أخ", emoji: "👦", audio: "/audio/family/brother.mp3", category: "family", difficulty: "easy" },
          { id: "f_sis", ku: "Xwişk", en: "Sister", ar: "شقيقة / أخت", emoji: "👧", audio: "/audio/family/sister.mp3", category: "family", difficulty: "easy" },
          { id: "f_grandmom", ku: "Dapîr", en: "Grandmother", ar: "جدة", emoji: "👵", audio: "/audio/family/grandmom.mp3", category: "family", difficulty: "medium" },
          { id: "f_granddad", ku: "Bapîr", en: "Grandfather", ar: "جد", emoji: "👴", audio: "/audio/family/granddad.mp3", category: "family", difficulty: "medium" }
        ]
      },
      {
        id: "a1_nature",
        titleEn: "Nature & Wilderness",
        titleAr: "الطبيعة والبيئة",
        descEn: "Describe mountains, trees, water, and outdoor elements.",
        descAr: "تعلم أسماء معالم الطبيعة كالجبال والوديان والماء باللغة الكرمانجية.",
        icon: "TreePine",
        xpReward: 30,
        words: [
          { id: "nat_water", ku: "Av", en: "Water", ar: "ماء", emoji: "💧", audio: "/audio/nature/water.mp3", category: "nature", difficulty: "easy" },
          { id: "nat_tree", ku: "Dar", en: "Tree", ar: "شجرة", emoji: "🌳", audio: "/audio/nature/tree.mp3", category: "nature", difficulty: "easy" },
          { id: "nat_mtn", ku: "Çiya", en: "Mountain", ar: "جبل", emoji: "🏔️", audio: "/audio/nature/mountain.mp3", category: "nature", difficulty: "medium" },
          { id: "nat_river", ku: "Rûbar", en: "River", ar: "نهر", emoji: "🏞️", audio: "/audio/nature/river.mp3", category: "nature", difficulty: "medium" },
          { id: "nat_sun", ku: "Roj", en: "Sun", ar: "شمس", emoji: "☀️", audio: "/audio/nature/sun.mp3", category: "nature", difficulty: "easy" },
          { id: "nat_flower", ku: "Kulîlk", en: "Flower", ar: "زهرة / وردة", emoji: "🌸", audio: "/audio/nature/flower.mp3", category: "nature", difficulty: "hard" }
        ]
      }
    ]
  },
  {
    id: "A2",
    title: "Beginner A2",
    descEn: "Interactive objects, animals, food, and basic navigation transportation.",
    descAr: "الأمور التفاعلية، الحيوانات اليومية، أصناف الأطعمة، ووسائل النقل والتحرك السريع.",
    requiredXp: 150,
    color: "from-sky-500 to-blue-600",
    lessons: [
      {
        id: "a2_animals",
        titleEn: "Animal Kingdom",
        titleAr: "مملكة الحيوان",
        descEn: "Master names of wild and domestic birds, dogs, cats, and mammals.",
        descAr: "تعلم الكلمات الخاصة بأسماء الحيوانات الأليفة والبرية وأصواتها.",
        icon: "Cat",
        xpReward: 35,
        words: [
          { id: "ani_cat", ku: "Pisîk", en: "Cat", ar: "قطة", emoji: "🐱", audio: "/audio/animals/cat.mp3", category: "animals", difficulty: "easy" },
          { id: "ani_dog", ku: "Se / Kûçik", en: "Dog", ar: "كلب", emoji: "🐶", audio: "/audio/animals/dog.mp3", category: "animals", difficulty: "easy" },
          { id: "ani_bird", ku: "Çûk / Teyr", en: "Bird", ar: "طائر", emoji: "🐦", audio: "/audio/animals/bird.mp3", category: "animals", difficulty: "easy" },
          { id: "ani_horse", ku: "Hesp", en: "Horse", ar: "حصان", emoji: "🐴", audio: "/audio/animals/horse.mp3", category: "animals", difficulty: "medium" },
          { id: "ani_wolf", ku: "Gur", en: "Wolf", ar: "ذئب", emoji: "🐺", audio: "/audio/animals/wolf.mp3", category: "animals", difficulty: "medium" },
          { id: "ani_fish", ku: "Masî", en: "Fish", ar: "سمكة", emoji: "🐟", audio: "/audio/animals/fish.mp3", category: "animals", difficulty: "easy" }
        ]
      },
      {
        id: "a2_food",
        titleEn: "Food & Meals",
        titleAr: "الطعام والتغذية",
        descEn: "Name basic commodities like bread, honey, tea, and dining items.",
        descAr: "مسميات العناصر الغذائية الأساسية كالخبز والعسل والشاي والجبن.",
        icon: "Utensils",
        xpReward: 35,
        words: [
          { id: "fd_bread", ku: "Nan", en: "Bread", ar: "خبز", emoji: "🍞", audio: "/audio/food/bread.mp3", category: "food", difficulty: "easy" },
          { id: "fd_milk", ku: "Şîr", en: "Milk", ar: "حليب", emoji: "🥛", audio: "/audio/food/milk.mp3", category: "food", difficulty: "easy" },
          { id: "fd_cheese", ku: "Penîr", en: "Cheese", ar: "جبن", emoji: "🧀", audio: "/audio/food/cheese.mp3", category: "food", difficulty: "medium" },
          { id: "fd_sugar", ku: "Şekir", en: "Sugar", ar: "سكر", emoji: "🍬", audio: "/audio/food/sugar.mp3", category: "food", difficulty: "easy" },
          { id: "fd_honey", ku: "Hingiv", en: "Honey", ar: "عسل", emoji: "🍯", audio: "/audio/food/honey.mp3", category: "food", difficulty: "medium" },
          { id: "fd_apple", ku: "Sêv", en: "Apple", ar: "تفاحة", emoji: "🍎", audio: "/audio/food/apple.mp3", category: "food", difficulty: "easy" }
        ]
      },
      {
        id: "a2_transport",
        titleEn: "Transportation",
        titleAr: "وسائل المواصلات والنقل",
        descEn: "Understand essential terms for cars, trains, airplanes, and streets.",
        descAr: "مفردات السيارات، الطائرات، القطارات والشوارع بالكوردية.",
        icon: "Car",
        xpReward: 35,
        words: [
          { id: "tr_car", ku: "Erebe / Otomobîl", en: "Car", ar: "سيارة", emoji: "🚗", audio: "/audio/transportation/car.mp3", category: "transportation", difficulty: "easy" },
          { id: "tr_bus", ku: "Otobus", en: "Bus", ar: "حافلة", emoji: "🚌", audio: "/audio/transportation/bus.mp3", category: "transportation", difficulty: "easy" },
          { id: "tr_train", ku: "Trên", en: "Train", ar: "قطار", emoji: " train", audio: "/audio/transportation/train.mp3", category: "transportation", difficulty: "medium" },
          { id: "tr_plane", ku: "Balafir", en: "Airplane", ar: "طائرة", emoji: "✈️", audio: "/audio/transportation/plane.mp3", category: "transportation", difficulty: "hard" },
          { id: "tr_ship", ku: "Keştî", en: "Ship", ar: "سفينة", emoji: "🚢", audio: "/audio/transportation/ship.mp3", category: "transportation", difficulty: "hard" },
          { id: "tr_cycle", ku: "Bisîklet", en: "Bicycle", ar: "دراجة هوائية", emoji: "🚲", audio: "/audio/transportation/bicycle.mp3", category: "transportation", difficulty: "medium" }
        ]
      }
    ]
  },
  {
    id: "B1",
    title: "Intermediate B1",
    descEn: "Expressing travel directives, emotions, and local situations.",
    descAr: "التوجيهات والمسارات عند السفر، التعبير عن المشاعر، والمحادثات الحيوية البسيطة.",
    requiredXp: 450,
    color: "from-indigo-500 to-purple-600",
    lessons: [
      {
        id: "b1_travel",
        titleEn: "Travel & Hospitality",
        titleAr: "السفر والضيافة",
        descEn: "Navigate hotels, passport controls, airports, and ask directions.",
        descAr: "عبارات الفنادق والمطارات، حقيبة اليد، والمستندات الرسمية وإعطاء التوجيهات.",
        icon: "Plane",
        xpReward: 40,
        words: [
          { id: "tv_passport", ku: "Pasaport", en: "Passport", ar: "جواز سفر", emoji: "🛂", audio: "/audio/travel/passport.mp3", category: "travel", difficulty: "easy" },
          { id: "tv_hotel", ku: "Otel", en: "Hotel", ar: "فندق", emoji: "🏨", audio: "/audio/travel/hotel.mp3", category: "travel", difficulty: "easy" },
          { id: "tv_bag", ku: "Çente / Sandoq", en: "Suitcase", ar: "حقيبة سفر", emoji: "🧳", audio: "/audio/travel/suitcase.mp3", category: "travel", difficulty: "medium" },
          { id: "tv_map", ku: "Nexşe", en: "Map", ar: "خريطة", emoji: "🗺️", audio: "/audio/travel/map.mp3", category: "travel", difficulty: "medium" },
          { id: "tv_ticket", ku: "Bîlet", en: "Ticket", ar: "تذكرة", emoji: "🎫", audio: "/audio/travel/ticket.mp3", category: "travel", difficulty: "easy" },
          { id: "tv_road", ku: "Rê", en: "Way / Road", ar: "طريق", emoji: "🛣️", audio: "/audio/travel/road.mp3", category: "travel", difficulty: "medium" }
        ]
      },
      {
        id: "b1_emotions",
        titleEn: "Emotions & Feelings",
        titleAr: "المشاعر والعواطف",
        descEn: "Describe happiness, anger, sadness, fear, and fatigue.",
        descAr: "تعلم نطق مشاعر السعادة، الحزن، الخوف، الغضب، والتعب بالكوردية.",
        icon: "Heart",
        xpReward: 40,
        words: [
          { id: "em_happy", ku: "Dilşad / Keyfxweş", en: "Happy", ar: "سعيد", emoji: "😊", audio: "/audio/emotions/happy.mp3", category: "emotions", difficulty: "easy" },
          { id: "em_sad", ku: "Xemgîn", en: "Sad", ar: "حزين", emoji: "😢", audio: "/audio/emotions/sad.mp3", category: "emotions", difficulty: "easy" },
          { id: "em_angry", ku: "Hêrsbûyî", en: "Angry", ar: "غاضب", emoji: "😠", audio: "/audio/emotions/angry.mp3", category: "emotions", difficulty: "medium" },
          { id: "em_tired", ku: "Westyayî", en: "Tired", ar: "تعبان / مرهق", emoji: "😫", audio: "/audio/emotions/tired.mp3", category: "emotions", difficulty: "medium" },
          { id: "em_afraid", ku: "Tirsiyayî", en: "Scared", ar: "خائف", emoji: "😨", audio: "/audio/emotions/scared.mp3", category: "emotions", difficulty: "hard" },
          { id: "em_excited", ku: "Bicoş", en: "Excited", ar: "متحمس", emoji: "🤩", audio: "/audio/emotions/excited.mp3", category: "emotions", difficulty: "hard" }
        ]
      },
      {
        id: "b1_conversation",
        titleEn: "Daily Conversation",
        titleAr: "جمل المحادثة اليومية",
        descEn: "Engage in friendly chat, ask about health, and state replies.",
        descAr: "خوض غمار الترحيب اللطيف، والسؤال عن الحال وتقديم عبارات الشكر والامتنان.",
        icon: "MessageCircle",
        xpReward: 40,
        words: [
          { id: "conv_hello", ku: "Slav", en: "Hello", ar: "مرحباً", emoji: "👋", audio: "/audio/conversation/hello.mp3", category: "daily_conversation", difficulty: "easy" },
          { id: "conv_thanks", ku: "Spas", en: "Thank you", ar: "شكراً", emoji: "🙏", audio: "/audio/conversation/thanks.mp3", category: "daily_conversation", difficulty: "easy" },
          { id: "conv_how", ku: "Çon î?", en: "How are you?", ar: "كيف حالك؟", emoji: "❓", audio: "/audio/conversation/how_are_you.mp3", category: "daily_conversation", difficulty: "medium" },
          { id: "conv_good", ku: "Ez baş im", en: "I am fine", ar: "أنا بخير", emoji: "👍", audio: "/audio/conversation/fine.mp3", category: "daily_conversation", difficulty: "easy" },
          { id: "conv_bye", ku: "Bi xatire te", en: "Goodbye", ar: "مع السلامة", emoji: "👋", audio: "/audio/conversation/goodbye.mp3", category: "daily_conversation", difficulty: "medium" },
          { id: "conv_welcome", ku: "Bi xêr hatî", en: "Welcome", ar: "أهلاً وسهلاً بك", emoji: "🤝", audio: "/audio/conversation/welcome.mp3", category: "daily_conversation", difficulty: "medium" }
        ]
      }
    ]
  },
  {
    id: "B2",
    title: "Intermediate B2",
    descEn: "Advanced domains of technology, university lectures, physics, and medical checkups.",
    descAr: "العوالم المتقدمة لتقنيات الحاسوب والإنترنت والفيزياء، والمواقع الطبية والمصطلحات الجامعية.",
    requiredXp: 800,
    color: "from-purple-500 to-pink-600",
    lessons: [
      {
        id: "b2_technology",
        titleEn: "Technology & Computing",
        titleAr: "التكنولوجيا والاتصالات",
        descEn: "Learn computer names, internet software, and communication media icons.",
        descAr: "أدوات التكنولوجيا المتقدمة، شاشات الحواسيب، البرمجيات وشبكة المعلومات.",
        icon: "Laptop",
        xpReward: 45,
        words: [
          { id: "tech_computer", ku: "Kompûter / Kompîter", en: "Computer", ar: "حاسوب", emoji: "💻", audio: "/audio/tech/computer.mp3", category: "technology", difficulty: "easy" },
          { id: "tech_net", ku: "Înternet", en: "Internet", ar: "الإنترنت", emoji: "🌐", audio: "/audio/tech/internet.mp3", category: "technology", difficulty: "easy" },
          { id: "tech_phone", ku: "Telefon / Mobayl", en: "Phone", ar: "هاتف", emoji: "📱", audio: "/audio/tech/phone.mp3", category: "technology", difficulty: "easy" },
          { id: "tech_site", ku: "Malper", en: "Website", ar: "موقع إلكتروني", emoji: "📄", audio: "/audio/tech/website.mp3", category: "technology", difficulty: "hard" },
          { id: "tech_prog", ku: "Bername", en: "Software / Program", ar: "برنامج", emoji: "💾", audio: "/audio/tech/program.mp3", category: "technology", difficulty: "medium" },
          { id: "tech_code", ku: "Kod / Pîlot", en: "Code / Cipher", ar: "شفرة برمجة", emoji: "🧮", audio: "/audio/tech/code.mp3", category: "technology", difficulty: "hard" }
        ]
      },
      {
        id: "b2_university",
        titleEn: "University & Research",
        titleAr: "التعليم الجامعي والبحث العلمي",
        descEn: "Express exams, lecture theaters, research criteria, and academic ranks.",
        descAr: "مصطلحات الامتحانات، المدرج الدراسي، مراتب العلوم، وبحوث التخرج والدرجات.",
        icon: "Landmark",
        xpReward: 45,
        words: [
          { id: "uni_prof", ku: "Profesor", en: "Professor", ar: "أستاذ جامعي", emoji: "👨‍🏫", audio: "/audio/academic/professor.mp3", category: "university", difficulty: "easy" },
          { id: "uni_exam", ku: "Ezmûn / Îmtîhan", en: "Exam", ar: "امتحان", emoji: "📄", audio: "/audio/academic/exam.mp3", category: "university", difficulty: "easy" },
          { id: "uni_deg", ku: "Bawername", en: "Degree / Certificate", ar: "شهادة جامعية", emoji: "🎓", audio: "/audio/academic/degree.mp3", category: "university", difficulty: "hard" },
          { id: "uni_research", ku: "Lêkolîn", en: "Research", ar: "بحث علمي", emoji: "🔬", audio: "/audio/academic/research.mp3", category: "university", difficulty: "hard" },
          { id: "uni_lesson", ku: "Wane", en: "Lecture / Lesson", ar: "محاضرة / درس", emoji: "📖", audio: "/audio/academic/lecture.mp3", category: "university", difficulty: "medium" },
          { id: "uni_std", ku: "Xwendekar", en: "Student", ar: "طالب علم", emoji: "🧑‍🎓", audio: "/audio/academic/student.mp3", category: "university", difficulty: "medium" }
        ]
      },
      {
        id: "b2_medical",
        titleEn: "Medical & Health",
        titleAr: "المصطلحات الطبية والصحة",
        descEn: "Describe clinic items, prescription drugs, fever, doctors and nurse tasks.",
        descAr: "العيادات الطبية، الأدوية، تخصص الأطباء وطاقم التمريض والصحة العامة.",
        icon: "Stethoscope",
        xpReward: 45,
        words: [
          { id: "med_doc", ku: "Bijîşk / Doktor", en: "Doctor", ar: "طبيب", emoji: "👨‍⚕️", audio: "/audio/medical/doctor.mp3", category: "medical", difficulty: "easy" },
          { id: "med_nurse", ku: "Perîstar", en: "Nurse", ar: "ممرض / ممرضة", emoji: "👩‍⚕️", audio: "/audio/medical/nurse.mp3", category: "medical", difficulty: "hard" },
          { id: "med_pils", ku: "Derman", en: "Medicine", ar: "دواء", emoji: "💊", audio: "/audio/medical/medicine.mp3", category: "medical", difficulty: "medium" },
          { id: "med_hosp", ku: "Nexweşxane", en: "Hospital", ar: "مستشفى", emoji: "🏥", audio: "/audio/medical/hospital.mp3", category: "medical", difficulty: "hard" },
          { id: "med_fever", ku: "Tay", en: "Fever / Heat", ar: "حمى / حرارة", emoji: "🤒", audio: "/audio/medical/fever.mp3", category: "medical", difficulty: "easy" },
          { id: "med_pain", ku: "Êş / Jan", en: "Pain", ar: "ألم / وجع", emoji: "🤕", audio: "/audio/medical/pain.mp3", category: "medical", difficulty: "medium" }
        ]
      }
    ]
  },
  {
    id: "Advanced",
    title: "Advanced C1",
    descEn: "Professional operations, business transactions, corporate roles, and advanced idioms.",
    descAr: "المعاملات المهنية والتجارية المتقدمة، وظائف الشركات والمؤسسات، والتعبيرات الاصطلاحية العميقة.",
    requiredXp: 1300,
    color: "from-amber-500 to-rose-600",
    lessons: [
      {
        id: "c1_business",
        titleEn: "Business & Corporate",
        titleAr: "الأعمال والشركات",
        descEn: "Master corporate dialogue, office spaces, salaries, and executive hierarchy.",
        descAr: "مفردات بيئة العمل، الرواتب والعملات، وعقد الاجتماعات والقيادة بالكوردية.",
        icon: "Briefcase",
        xpReward: 50,
        words: [
          { id: "biz_office", ku: "Ofîs / Buroyî", en: "Office", ar: "مكتب عمل", emoji: "🏢", audio: "/audio/business/office.mp3", category: "business", difficulty: "easy" },
          { id: "biz_boss", ku: "Serok / Rêveber", en: "Manager / Boss", ar: "مدير / رئيس", emoji: "🧳", audio: "/audio/business/manager.mp3", category: "business", difficulty: "medium" },
          { id: "biz_wage", ku: "Meaş", en: "Salary", ar: "راتب شهر", emoji: "💵", audio: "/audio/business/salary.mp3", category: "business", difficulty: "medium" },
          { id: "biz_meeting", ku: "Civîn", en: "Meeting", ar: "اجتماع", emoji: "🤝", audio: "/audio/business/meeting.mp3", category: "business", difficulty: "hard" },
          { id: "biz_contract", ku: "Peyman", en: "Contract / Treaty", ar: "عقد اتفاق", emoji: "📄", audio: "/audio/business/contract.mp3", category: "business", difficulty: "hard" },
          { id: "biz_work", ku: "Kar / Şixul", en: "Work / Job", ar: "عمل / وظيفة", emoji: "🔧", audio: "/audio/business/work.mp3", category: "business", difficulty: "easy" }
        ]
      }
    ]
  }
];
const useAdStore = create((set, get) => ({
  bannersEnabled: true,
  interstitialActive: false,
  interstitialLoading: false,
  interstitialOnClose: null,
  rewardedActive: false,
  rewardedLoading: false,
  rewardedOnSuccess: null,
  rewardedOnClose: null,
  setBannersEnabled: (bannersEnabled) => set({ bannersEnabled }),
  showInterstitial: (onClose) => {
    set({ interstitialLoading: true });
    setTimeout(() => {
      set({
        interstitialActive: true,
        interstitialLoading: false,
        interstitialOnClose: onClose
      });
    }, 400);
  },
  closeInterstitial: () => {
    const { interstitialOnClose } = get();
    set({ interstitialActive: false, interstitialOnClose: null });
    if (interstitialOnClose) {
      interstitialOnClose();
    }
  },
  showRewarded: (onSuccess, onClose) => {
    set({ rewardedLoading: true });
    setTimeout(() => {
      set({
        rewardedActive: true,
        rewardedLoading: false,
        rewardedOnSuccess: onSuccess,
        rewardedOnClose: onClose || null
      });
    }, 500);
  },
  closeRewarded: (successFullyCompleted) => {
    const { rewardedOnSuccess, rewardedOnClose } = get();
    set({ rewardedActive: false, rewardedOnSuccess: null, rewardedOnClose: null });
    if (successFullyCompleted && rewardedOnSuccess) {
      rewardedOnSuccess();
    } else if (rewardedOnClose) {
      rewardedOnClose();
    }
  }
}));
function AdBanner() {
  const { bannersEnabled } = useAdStore();
  const { language } = useAuth();
  const [closed, setClosed] = reactExports.useState(false);
  if (!bannersEnabled || closed) return null;
  const labels = {
    en: {
      sponsored: "Sponsored Advertisement",
      upgrade: "Ad-free Experience",
      text: "Upgrade to Quest Premium to disable all ads and unlock advanced Kurdish vocabulary lessons!",
      button: "Go Ad-Free"
    },
    ar: {
      sponsored: "إعلان مدعوم",
      upgrade: "تجربة خالية من الإعلانات",
      text: "اشترك في كويست بريميوم لإزالة كافة الإعلانات وبدء تحديات قواعد اللغة المتقدمة!",
      button: "ترقية الحساب"
    }
  }[language !== "ar" ? "en" : "ar"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 relative overflow-hidden select-none shadow-xs mt-3 text-center flex flex-col items-center gap-3 sm:max-w-md mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-3 h-3 text-[#B45309] dark:text-[#FFCE6B]" }),
            labels.sponsored
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setClosed(true),
              "aria-label": labels.sponsored ? `Dismiss ${labels.sponsored}` : "Dismiss ad",
              className: "min-w-[44px] min-h-[44px] -my-2.5 -me-2 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-indigo-600 text-white rounded-xl w-12 h-12 flex items-center justify-center shrink-0 font-black text-sm shadow-xs", children: "Quest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-slate-800 dark:text-slate-200 leading-tight", children: labels.upgrade }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-1.5 font-medium line-clamp-2 px-2", children: labels.text })
          ] })
        ] })
      ]
    }
  );
}
function InterstitialAdModal() {
  const { interstitialActive, closeInterstitial } = useAdStore();
  const { language } = useAuth();
  const [countdown, setCountdown] = reactExports.useState(4);
  reactExports.useEffect(() => {
    if (!interstitialActive) {
      setCountdown(4);
      return;
    }
    if (countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1e3);
    return () => clearTimeout(timer);
  }, [interstitialActive, countdown]);
  if (!interstitialActive) return null;
  const labels = {
    en: {
      advertisement: "ADVERTISEMENT",
      title: "Journey to Kurdistan!",
      info: "Discover historical castles, epic lakes and centuries-old culture with Kurdistan Tourism board.",
      closing: "Closing in",
      sec: "s",
      skip: "Skip Ad"
    },
    ar: {
      advertisement: "إعلان تجاري للتطبيق",
      title: "رحلتك إلى كردستان!",
      info: "اكتشف القلاع التاريخية والبحيرات الرائعة والثقافة القديمة مع هيئة السياحة في كردستان.",
      closing: "إغلاق في خلال",
      sec: "ثوانٍ",
      skip: "تخطي الإعلان"
    }
  }[language !== "ar" ? "en" : "ar"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 bg-slate-950/95 backdrop-blur-md z-99 flex flex-col items-center justify-between p-6 overflow-hidden text-center text-white select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex justify-between items-center max-w-sm mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/10 px-2.5 py-1 text-[9px] font-black tracking-widest rounded-full text-slate-300", children: labels.advertisement }),
      countdown > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-black text-slate-400 bg-white/10 px-3 py-1 rounded-full font-mono", children: [
        labels.closing,
        " ",
        countdown,
        labels.sec
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          onClick: closeInterstitial,
          className: "bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold cursor-pointer transition-all border-none shadow-md shadow-indigo-600/20 active:scale-95",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels.skip }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm flex flex-col items-center gap-6 my-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { scale: [1, 1.04, 1] },
            transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            className: "w-24 h-24 bg-gradient-to-tr from-amber-400 to-indigo-600 rounded-3xl flex items-center justify-center text-5xl shadow-2xl relative text-white",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-12 h-12" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black tracking-tight leading-tight bg-gradient-to-r from-amber-200 to-indigo-300 bg-clip-text text-transparent", children: labels.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 leading-relaxed max-w-[280px] mx-auto", children: labels.info })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-around", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Map$1, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-extrabold", children: "Amadiya" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[1px] h-8 bg-slate-800" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-6 h-6 animate-spin-slow" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-extrabold", children: "Zend Cave" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[1px] h-8 bg-slate-800" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-extrabold", children: "Rawanduz" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500 font-medium pb-2 select-none", children: "Ads help fund our servers and free academic content. Thank you for learning Kurmanji!" })
  ] });
}
function RewardedAdModal() {
  const { rewardedActive, closeRewarded } = useAdStore();
  const { language } = useAuth();
  const [countdown, setCountdown] = reactExports.useState(5);
  const [isFinished, setIsFinished] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!rewardedActive) {
      setCountdown(5);
      setIsFinished(false);
      return;
    }
    if (countdown <= 0) {
      setIsFinished(true);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1e3);
    return () => clearTimeout(timer);
  }, [rewardedActive, countdown]);
  if (!rewardedActive) return null;
  const labels = {
    en: {
      heading: "WATCHING SPONSORED REWARD",
      rewarding: "REWARD UNLOCKED",
      sub: "Watch this video helper to claim +50 XP bonus instantly!",
      bonusUnlocked: "Congratulations! +50 XP Bonus credited to your account profile.",
      sec: "s",
      claimButton: "Claim Reward +50 XP",
      watchingAd: "Watching ad content...",
      quit: "Quit (Lose Bonus)"
    },
    ar: {
      heading: "جاري عرض إعلان المكافأة",
      rewarding: "تم تفعيل المكافأة",
      sub: "شاهد هذا المقطع القصير للحصول على +50 نقطة خبرة إضافية فوراً!",
      bonusUnlocked: "تهانينا! تم إضافة مكافأة بقيمة +50 نقطة خبرة لإحصائيات حسابك.",
      sec: "ثوانٍ",
      claimButton: "الحصول على +50 نقطة خبرة",
      watchingAd: "جاري تحميل الإعلان التجاري...",
      quit: "الخروج (خسارة المكافأة)"
    }
  }[language !== "ar" ? "en" : "ar"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 bg-slate-950/98 backdrop-blur-lg z-99 flex flex-col items-center justify-between p-6 text-center text-white select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex justify-between items-center max-w-sm mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-500/20 text-amber-300 border border-amber-500/20 px-2.5 py-1 text-[9px] font-black tracking-widest rounded-full", children: labels.heading }),
      isFinished ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-[9px] font-bold tracking-wider rounded-full uppercase", children: labels.rewarding }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => closeRewarded(false),
          className: "p-1 px-3 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl cursor-copy border-none",
          children: labels.quit
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm flex flex-col items-center gap-7 my-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-amber-400/25 rounded-full blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: {
              scale: isFinished ? [1, 1.12, 1] : 1,
              rotate: isFinished ? [0, 10, -10, 360] : 0
            },
            transition: { duration: 1.5, ease: "easeInOut" },
            className: `w-28 h-28 ${isFinished ? "bg-gradient-to-tr from-emerald-500 to-teal-400 text-white" : "bg-gradient-to-tr from-amber-500 to-orange-400 text-white"} rounded-full flex items-center justify-center shadow-2xl relative border-2 border-white/20`,
            children: isFinished ? /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-12 h-12 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-12 h-12 text-white fill-amber-300" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black tracking-tight leading-tight max-w-[280px]", children: isFinished ? labels.rewarding : labels.watchingAd }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 leading-relaxed max-w-[260px] mx-auto font-medium", children: isFinished ? labels.bonusUnlocked : labels.sub })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: !isFinished ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-900 border border-slate-800 h-3 rounded-full overflow-hidden p-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-amber-400 h-full rounded-full transition-all duration-1000 ease-linear",
            style: { width: `${(5 - countdown) / 5 * 100}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-black text-amber-400 font-mono", children: [
          countdown,
          " ",
          labels.sec,
          " remaining"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          whileHover: { scale: 1.03 },
          whileTap: { scale: 0.97 },
          onClick: () => closeRewarded(true),
          className: "w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white rounded-2xl font-black text-sm cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 border-none",
          children: labels.claimButton
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500 font-medium pb-2 select-none", children: "Reward partners make educational access entirely free. Claim your points and power up!" })
  ] });
}
const WELCOME_TOUR_ID = "tour_home_v1";
const ROADMAP_TOUR_ID = "tour_roadmap_v1";
const TOUR_REWARD_CLAIMED_ID = "tour_reward_claimed_v1";
const TOUR_REWARD_GEMS = 20;
const TOUR_CHAIN_STORAGE_KEY = "kurdish_quest_tour_chain";
const TOURS_DONE_STORAGE_KEY = "kurdish_quest_tours_done_v1";
function readLocalCompletions() {
  try {
    const raw = localStorage.getItem(TOURS_DONE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((value) => String(value)) : [];
  } catch {
    return [];
  }
}
function markTourCompletedLocally(tourId) {
  try {
    const merged = Array.from(/* @__PURE__ */ new Set([...readLocalCompletions(), tourId]));
    localStorage.setItem(TOURS_DONE_STORAGE_KEY, JSON.stringify(merged));
  } catch {
  }
}
function isTourCompleted(tourId, userData) {
  if (((userData == null ? void 0 : userData.completedTours) ?? []).includes(tourId)) return true;
  return readLocalCompletions().includes(tourId);
}
function isTourRewardClaimed(userData) {
  return isTourCompleted(TOUR_REWARD_CLAIMED_ID, userData);
}
function resetToursForReplay(userData) {
  try {
    const keptLocal = readLocalCompletions().filter((id) => id === TOUR_REWARD_CLAIMED_ID);
    localStorage.setItem(TOURS_DONE_STORAGE_KEY, JSON.stringify(keptLocal));
  } catch {
  }
  try {
    sessionStorage.setItem(TOUR_CHAIN_STORAGE_KEY, "welcome");
  } catch {
  }
  return {
    completedTours: ((userData == null ? void 0 : userData.completedTours) ?? []).filter((id) => id === TOUR_REWARD_CLAIMED_ID)
  };
}
function shouldAutoStartWelcomeTour(userData) {
  if (!userData) return false;
  if (userData.isOnboarded === false) return false;
  if ((userData.completedLessons ?? []).length > 0) return false;
  if (Object.keys(userData.gameScores ?? {}).length > 0) return false;
  return !isTourCompleted(WELCOME_TOUR_ID, userData);
}
function getFirstActionableLessonId(userData) {
  const completed = (userData == null ? void 0 : userData.completedLessons) ?? [];
  const xp = (userData == null ? void 0 : userData.xp) ?? 0;
  for (const lvl of learningPath) {
    if (xp >= lvl.requiredXp) {
      for (const lesson of lvl.lessons) {
        if (!completed.includes(lesson.id)) return lesson.id;
      }
    }
  }
  if (learningPath.length > 0 && learningPath[0].lessons.length > 0) {
    return learningPath[0].lessons[0].id;
  }
  return null;
}
function buildWelcomeTourSteps(language) {
  return [
    {
      title: t(language, "tour_welcome_title"),
      description: t(language, "tour_welcome_desc")
    },
    {
      element: '[data-tour="stats-pill"]',
      title: t(language, "tour_stats_title"),
      description: t(language, "tour_stats_desc"),
      side: "bottom",
      align: "end"
    },
    {
      element: '[data-tour="daily-goal"]',
      title: t(language, "tour_goal_title"),
      description: t(language, "tour_goal_desc"),
      side: "bottom"
    },
    {
      element: '[data-tour="next-lesson"]',
      title: t(language, "tour_lesson_title"),
      description: t(language, "tour_lesson_desc"),
      side: "bottom"
    },
    {
      element: '[data-tour="nav-roadmap"]',
      title: t(language, "tour_nav_roadmap_title"),
      description: t(language, "tour_nav_roadmap_desc"),
      requiresAction: true,
      side: "top"
    }
  ];
}
function buildRoadmapTourSteps(language, firstLessonNodeId) {
  return [
    {
      title: t(language, "tour_map_title"),
      description: t(language, "tour_map_desc")
    },
    {
      element: `#${firstLessonNodeId}`,
      title: t(language, "tour_first_lesson_title"),
      description: t(language, "tour_first_lesson_desc"),
      requiresAction: true,
      side: "bottom"
    }
  ];
}
let activeDriver = null;
function useAppTour() {
  const { language, userData, updateUserData } = useAuth();
  const userDataRef = reactExports.useRef(userData);
  reactExports.useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);
  const startedHereRef = reactExports.useRef(false);
  const finalizeTour = reactExports.useCallback(async (tourId, finishedByAction, rewardGems) => {
    markTourCompletedLocally(tourId);
    const current = userDataRef.current;
    const previous = (current == null ? void 0 : current.completedTours) ?? [];
    const grantReward = finishedByAction && rewardGems > 0 && !isTourRewardClaimed(current);
    const nextCompleted = Array.from(new Set(
      grantReward ? [...previous, tourId, TOUR_REWARD_CLAIMED_ID] : [...previous, tourId]
    ));
    if (grantReward) markTourCompletedLocally(TOUR_REWARD_CLAIMED_ID);
    const patch = { completedTours: nextCompleted };
    if (grantReward) {
      patch.gems = ((current == null ? void 0 : current.gems) ?? 100) + rewardGems;
    }
    await updateUserData(patch);
    if (grantReward) {
      window.dispatchEvent(new CustomEvent("trigger-in-app-notification", {
        detail: {
          title: t(language, "tour_reward_title"),
          message: t(language, "tour_reward_msg")
        }
      }));
    }
  }, [language, updateUserData]);
  const startTour = reactExports.useCallback((options) => {
    if (globalThis.document === void 0) return;
    if (activeDriver !== null && activeDriver.isActive()) return;
    const direction = getLayoutDirection(language);
    let finishedByAction = false;
    const steps = options.steps.map((def, index) => {
      const isAction = def.requiresAction === true;
      const isLast = index === options.steps.length - 1;
      const step = {
        element: def.element,
        // Info steps: the live control stays inert (no accidental taps).
        // Action steps: the control is the ONLY thing the learner can tap.
        disableActiveInteraction: !isAction,
        popover: {
          title: def.title,
          description: def.description,
          side: def.side,
          align: def.align,
          showButtons: isAction ? ["close"] : index === 0 ? ["next", "close"] : ["next", "previous", "close"]
        }
      };
      if (isAction) {
        step.onHighlighted = (element) => {
          if (!element) return;
          element.addEventListener("click", () => {
            if (finishedByAction) return;
            if (isLast) {
              finishedByAction = true;
              activeDriver == null ? void 0 : activeDriver.destroy();
            } else {
              activeDriver == null ? void 0 : activeDriver.moveNext();
            }
          }, { once: true, capture: true });
        };
      }
      return step;
    });
    const instance = oe({
      steps,
      animate: true,
      smoothScroll: true,
      // Guided session = no random exits: overlay taps and Esc do nothing,
      // arrow keys can't skip an interactive checkpoint. The ✕ button is the
      // single, explicit way out.
      allowClose: false,
      overlayClickBehavior: () => void 0,
      allowKeyboardControl: false,
      overlayColor: "#1E293B",
      overlayOpacity: 0.72,
      stagePadding: 6,
      stageRadius: 18,
      popoverClass: "kq-tour",
      showProgress: options.steps.length > 1,
      progressText: "{{current}} / {{total}}",
      nextBtnText: t(language, "tour_next"),
      prevBtnText: t(language, "tour_back"),
      doneBtnText: t(language, "tour_done"),
      disableActiveInteraction: true,
      skipMissingElement: true,
      onPopoverRender: (popover) => {
        popover.wrapper.setAttribute("dir", direction);
        window.setTimeout(() => {
          if (popover.nextButton.style.display !== "none") popover.nextButton.focus();
        }, 0);
      },
      onCloseClick: () => {
        instance.destroy();
      },
      onDestroyed: () => {
        var _a;
        activeDriver = null;
        startedHereRef.current = false;
        void finalizeTour(options.tourId, finishedByAction, options.rewardGems ?? 0);
        if (finishedByAction) (_a = options.onFinishedAction) == null ? void 0 : _a.call(options);
      }
    });
    activeDriver = instance;
    startedHereRef.current = true;
    instance.drive();
  }, [language, finalizeTour]);
  reactExports.useEffect(() => () => {
    if (startedHereRef.current && activeDriver !== null && activeDriver.isActive()) {
      activeDriver.destroy();
    }
  }, []);
  return { startTour };
}
const MOTIVATIONAL_QUOTES = [
  { ku: "Hêdî hêdî karkerî, fêr bûn e.", translationEn: "Step by step, practicing leads to language mastery.", translationAr: "خطوة بخطوة، التدريب والاجتهاد يقود لإتقان اللغة." },
  { ku: "Zimanê dayîkî, kaniya çand û nasnameyê ye.", translationEn: "Our mother tongue is the fountain of culture and identity.", translationAr: "اللغة الأم هي نبع الهوية والثقافة الأصيل." },
  { ku: "Her rojek nû, fersendek nû ye bo fêrbûnê.", translationEn: "Every new day brings a fresh milestone to learn.", translationAr: "كل يوم جديد يجلب معه فرصة واعدة للتعلم والتقدم." },
  { ku: "Zimanê xwe winda meke, ew rûmeta te ye.", translationEn: "Never lose grasp of your tongue; it represents your heritage.", translationAr: "لا تفرط بلسانك وجذورك الكوردية؛ فهي مبعث فخرك." }
];
function Dashboard() {
  const { userData, logout, user, language, updateUserData, loading, profileError, retryProfileLoad } = useAuth();
  const navigate = useNavigate();
  const [dailyWord, setDailyWord] = reactExports.useState(academicVocabulary[0]);
  const [isGoalReached, setIsGoalReached] = reactExports.useState(false);
  const [isDailyGoalOpen, setIsDailyGoalOpen] = reactExports.useState(false);
  const [showStreakConfetti, setShowStreakConfetti] = reactExports.useState(false);
  const [quoteIdx, setQuoteIdx] = reactExports.useState(0);
  const [sparks, setSparks] = reactExports.useState([]);
  const confettiTimerRef = reactExports.useRef(null);
  const sparksTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => () => {
    if (confettiTimerRef.current !== null) window.clearTimeout(confettiTimerRef.current);
    if (sparksTimerRef.current !== null) window.clearTimeout(sparksTimerRef.current);
  }, []);
  const [windowDimensions, setWindowDimensions] = reactExports.useState({
    width: globalThis.window !== void 0 ? window.innerWidth : 500,
    height: globalThis.window !== void 0 ? window.innerHeight : 800
  });
  reactExports.useEffect(() => {
    if (globalThis.window === void 0) return;
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { startTour } = useAppTour();
  const tourAttemptedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (loading || !userData || userData.isOnboarded === false) return;
    if (tourAttemptedRef.current) return;
    let forcedReplay = false;
    try {
      forcedReplay = sessionStorage.getItem(TOUR_CHAIN_STORAGE_KEY) === "welcome";
    } catch {
      forcedReplay = false;
    }
    if (!forcedReplay && !shouldAutoStartWelcomeTour(userData)) return;
    const timer = window.setTimeout(() => {
      if (tourAttemptedRef.current) return;
      tourAttemptedRef.current = true;
      if (forcedReplay) {
        try {
          sessionStorage.removeItem(TOUR_CHAIN_STORAGE_KEY);
        } catch {
        }
      }
      startTour({
        tourId: WELCOME_TOUR_ID,
        steps: buildWelcomeTourSteps(language),
        onFinishedAction: () => {
          try {
            sessionStorage.setItem(TOUR_CHAIN_STORAGE_KEY, "roadmap");
          } catch {
          }
        }
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [loading, userData, language, startTour]);
  reactExports.useEffect(() => {
    const goal = (userData == null ? void 0 : userData.dailyGoalXp) || 50;
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const earned = (userData == null ? void 0 : userData.xpTodayDate) === today ? (userData == null ? void 0 : userData.xpToday) || 0 : 0;
    handleGoalReachedChange(earned >= goal, earned >= goal);
  }, [userData == null ? void 0 : userData.xpToday, userData == null ? void 0 : userData.xpTodayDate, userData == null ? void 0 : userData.dailyGoalXp]);
  const handleGoalReachedChange = (reached, newlyReached) => {
    setIsGoalReached(reached);
    if (reached && newlyReached) {
      const alreadyCelebratedThisSession = sessionStorage.getItem("kurdish_quest_daily_goal_celebrated_session");
      if (!alreadyCelebratedThisSession) {
        sessionStorage.setItem("kurdish_quest_daily_goal_celebrated_session", "true");
        setShowStreakConfetti(true);
        if (confettiTimerRef.current !== null) window.clearTimeout(confettiTimerRef.current);
        confettiTimerRef.current = window.setTimeout(() => {
          confettiTimerRef.current = null;
          setShowStreakConfetti(false);
        }, 7e3);
        const newSparks = Array.from({ length: 30 }).map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 80 + 30;
          return {
            id: Date.now() + i,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance - 15,
            size: Math.random() * 8 + 4,
            color: ["#ff4500", "#ff8c00", "#ffd700", "#ff3300", "#ffa500"][Math.floor(Math.random() * 5)]
          };
        });
        setSparks(newSparks);
        if (sparksTimerRef.current !== null) window.clearTimeout(sparksTimerRef.current);
        sparksTimerRef.current = window.setTimeout(() => {
          sparksTimerRef.current = null;
          setSparks([]);
        }, 1250);
      }
    }
  };
  reactExports.useEffect(() => {
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const index = today.split("-").reduce((acc, val) => acc + parseInt(val), 0) % academicVocabulary.length;
    setDailyWord(academicVocabulary[index]);
    const quoteIndex = today.split("-").reduce((acc, val) => acc + parseInt(val), 0) % MOTIVATIONAL_QUOTES.length;
    setQuoteIdx(quoteIndex);
  }, []);
  if (loading && !userData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Spinner,
      {
        size: "lg",
        label: language !== "ar" ? "Loading your profile..." : "جاري تحميل الملف الشخصي...",
        showLabel: true
      }
    ) });
  }
  if (profileError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorState,
      {
        className: "max-w-md w-full",
        title: t(language, "error_generic_title"),
        description: t(language, "error_generic_desc"),
        retryLabel: t(language, "retry"),
        onRetry: retryProfileLoad
      }
    ) });
  }
  const safeUserData = userData || {
    xp: 0,
    level: 1,
    streak: 0,
    completedLessons: [],
    isOnboarded: true,
    lastActiveDate: ""
  };
  const needsOnboarding = safeUserData.isOnboarded === false;
  const levelProgress = getLevelProgress(safeUserData.xp || 0);
  const currentLevelXP = levelProgress.xpIntoLevel;
  const progressPercent = levelProgress.percent;
  const todayUtc = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const xpTodaySafe = safeUserData.xpTodayDate === todayUtc ? safeUserData.xpToday || 0 : 0;
  const dailyGoalTarget = safeUserData.dailyGoalXp || 50;
  const dailyGoalReached = xpTodaySafe >= dailyGoalTarget;
  const getDashboardRecommendedLesson = () => {
    const completed = safeUserData.completedLessons || [];
    for (const lvl of learningPath) {
      if ((safeUserData.xp || 0) >= lvl.requiredXp) {
        for (const les of lvl.lessons) {
          if (!completed.includes(les.id)) {
            return { lesson: les, level: lvl };
          }
        }
      }
    }
    if (learningPath.length > 0 && learningPath[0].lessons.length > 0) {
      return { lesson: learningPath[0].lessons[0], level: learningPath[0] };
    }
    return null;
  };
  const nextLessonData = getDashboardRecommendedLesson();
  const handleCompleteOnboarding = async () => {
  };
  const generateStreakCalendar = () => {
    const today = /* @__PURE__ */ new Date();
    const days = [];
    const lastActiveDateObj = safeUserData.lastActiveDate ? /* @__PURE__ */ new Date(safeUserData.lastActiveDate + "T00:00:00Z") : null;
    const currentStreak = safeUserData.streak || 0;
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const diffToLastActive = safeUserData.lastActiveDate ? Math.floor(Math.abs((/* @__PURE__ */ new Date(todayStr + "T00:00:00Z")).getTime() - lastActiveDateObj.getTime()) / (1e3 * 60 * 60 * 24)) : 0;
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayLabel = language !== "ar" ? ["S", "M", "T", "W", "T", "F", "S"][date.getDay()] : ["أ", "ن", "ث", "ر", "خ", "ج", "س"][date.getDay()];
      const isActive = currentStreak > 0 && i >= diffToLastActive && i < diffToLastActive + currentStreak;
      days.push({ id: i, label: dayLabel, isActive, isToday: i === 0 });
    }
    return days;
  };
  generateStreakCalendar();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-8 pb-24 lg:pb-12 max-w-5xl mx-auto space-y-6 relative selection:bg-brand/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: needsOnboarding && /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingFlow, { onComplete: handleCompleteOnboarding }) }),
    showStreakConfetti && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReactConfetti,
      {
        width: windowDimensions.width,
        height: windowDimensions.height,
        recycle: false,
        numberOfPieces: 185
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-6 shadow-flat relative overflow-hidden flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SunMark, { className: "absolute -end-10 -top-10 w-44 h-44 text-[#FFB300] opacity-[0.08] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl lg:text-4xl font-black text-ink tracking-tight leading-tight", children: language === "ar" ? "سرْكفْتِن !" : "Serkeftin!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted font-semibold mt-1.5", children: language === "ku" ? "Îro ji bo fêrbûna Kurmancî amade yî?" : language === "ar" ? "جاهز لتعلم الكورمانجية اليوم؟" : "Ready for Kurmanji today?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: logout,
              "aria-label": t(language, "logout"),
              className: "min-w-[44px] min-h-[44px] bg-white dark:bg-slate-900 font-sans text-muted hover:text-danger rounded-xl transition-colors cursor-pointer border border-line-soft dark:border-slate-700 flex items-center justify-center shrink-0",
              title: t(language, "logout"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 rtl:-scale-x-100" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mt-5 pt-4 border-t border-line dark:border-slate-800 flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SunMark, { className: "w-4 h-4 text-[#FFB300] shrink-0 mt-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm font-bold text-ink italic leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("bdi", { dir: "ltr", children: [
              "“ ",
              MOTIVATIONAL_QUOTES[quoteIdx].ku,
              " ”"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted font-semibold leading-relaxed mt-0.5", children: language !== "ar" ? MOTIVATIONAL_QUOTES[quoteIdx].translationEn : MOTIVATIONAL_QUOTES[quoteIdx].translationAr })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-tour": "daily-goal", className: "bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 shadow-flat relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${dailyGoalReached ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600" : "bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#B8860B] dark:text-[#FFCE6B]"}`, children: dailyGoalReached ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs text-muted leading-none", children: t(language, "goal_modal_title") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-base text-ink mt-1.5 leading-tight tabular-nums", children: dailyGoalReached ? t(language, "goal_reached") : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "whitespace-nowrap", children: [
                    xpTodaySafe,
                    " / ",
                    dailyGoalTarget
                  ] }),
                  " ",
                  t(language, "goal_today_suffix")
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsDailyGoalOpen(true),
                className: "shrink-0 min-h-[44px] px-4 rounded-xl bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] border border-[#FFB300]/40 font-extrabold text-xs cursor-pointer hover:bg-[#FFE7B3] transition-colors whitespace-nowrap",
                children: t(language, "goal_adjust")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden", dir: "ltr", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": dailyGoalTarget, "aria-valuenow": Math.min(xpTodaySafe, dailyGoalTarget), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-full rounded-full transition-all duration-700 ease-out ${dailyGoalReached ? "bg-emerald-500" : "bg-[#FFB300]"}`,
              style: { width: `${Math.min(100, Math.round(xpTodaySafe / dailyGoalTarget * 100))}%` }
            }
          ) })
        ] }),
        nextLessonData && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-tour": "next-lesson",
            onClick: () => navigate(`/quiz/${nextLessonData.lesson.id}`),
            className: "flex-1 text-start bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 flex justify-between items-center gap-4 shadow-flat relative overflow-hidden group cursor-pointer hover:border-[#FFB300]/60 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 z-10 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#8A6100] dark:text-[#FFCE6B] font-extrabold", children: language === "ku" ? "Dersa Pêş" : language === "ar" ? "التالي لك" : "Up Next" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-black text-ink pt-0.5 truncate", children: language !== "ar" ? nextLessonData.lesson.titleEn : nextLessonData.lesson.titleAr }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted font-semibold flex items-center gap-1.5 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: nextLessonData.level.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#8A6100] dark:text-[#FFCE6B] font-bold tabular-nums", children: [
                    "+",
                    nextLessonData.lesson.xpReward,
                    " XP"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 bg-[#FFB300] text-[#432C00] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform rtl:-scale-x-100 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 stroke-[2.75]" }) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 shadow-flat relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-4 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted", children: language === "ku" ? "Asta Fêrxwazî" : language === "ar" ? "المستوى الأكاديمي" : "Student Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-3xl font-black text-ink mt-1 leading-none tracking-tight tabular-nums", children: [
              t(language, "level"),
              " ",
              safeUserData.level
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted block font-bold", children: t(language, "total_xp") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black text-ink tabular-nums", children: [
              safeUserData.xp,
              " XP"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden relative", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-[#FFB300] h-full rounded-full transition-all duration-700 ease-out",
            style: { width: `${progressPercent}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-2.5 text-xs text-muted font-bold font-mono tabular-nums", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            currentLevelXP,
            "/",
            levelProgress.xpForThisLevel,
            " XP"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            levelProgress.xpToNextLevel,
            " ",
            t(language, "xp_to_next")
          ] })
        ] })
      ] }),
      dailyWord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between gap-3.5 shadow-flat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-muted", children: t(language, "daily_word") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center gap-3 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black text-ink leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: dailyWord.ku }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted font-semibold text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language !== "ar" ? dailyWord.en : dailyWord.ar }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AudioButton, { audioUrl: dailyWord.audio, textToSpeak: dailyWord.ku, className: "bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#B8860B] dark:text-[#FFCE6B] hover:bg-[#FFE7B3] border-none cursor-pointer shrink-0" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black text-ink px-1", children: language === "ku" ? "Keşf Bike" : language === "ar" ? "استكشف" : "Explore" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
        { path: "/vocabulary", label: t(language, "module_vocab"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-5 h-5" }), tone: "bg-[#FFF3D6] dark:bg-[#3A2F14] text-[#D97706] dark:text-[#FFCE6B]" },
        { path: "/sentences", label: t(language, "nav_sentences"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }), tone: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
        { path: "/search", label: t(language, "nav_dictionary"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { className: "w-5 h-5" }), tone: "bg-sky-100 dark:bg-sky-950/40 text-sky-500" },
        { path: "/favorites", label: t(language, "nav_favorites"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5" }), tone: "bg-rose-100 dark:bg-rose-950/40 text-rose-500" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate(item.path),
          className: "bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-2xl p-4 min-h-[56px] flex items-center gap-3 text-start hover:border-[#FFB300]/50 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFB300]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.tone}`, "aria-hidden": "true", children: item.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-sm text-ink leading-tight", children: item.label })
          ]
        },
        item.path
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: isDailyGoalOpen,
        onClose: () => setIsDailyGoalOpen(false),
        variant: "sheet",
        title: language !== "ar" ? "Study Goal" : "الهدف اليومي للدراسة",
        description: t(language, "daily_goal_desc"),
        closeLabel: language !== "ar" ? "Close" : "إغلاق",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          { xp: 20, emoji: "☕", title: t(language, "onb_goal_casual"), desc: t(language, "onb_goal_casual_desc") },
          { xp: 50, emoji: "📅", title: t(language, "onb_goal_regular"), desc: t(language, "onb_goal_regular_desc") },
          { xp: 100, emoji: "🔥", title: t(language, "onb_goal_serious"), desc: t(language, "onb_goal_serious_desc") }
        ].map((tier) => {
          const active = dailyGoalTarget === tier.xp;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                void updateUserData({ dailyGoalXp: tier.xp });
                try {
                  localStorage.setItem("kurdish_quest_daily_goal_mins", String(tier.xp === 20 ? 5 : tier.xp === 100 ? 15 : 10));
                } catch {
                }
              },
              className: `w-full p-4 rounded-3xl border-2 flex items-center gap-3.5 transition-all cursor-pointer text-start bg-white dark:bg-slate-900 ${active ? "border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14] shadow-[0_4px_20px_rgba(255,179,0,0.15)]" : "border-line-soft hover:border-[#FFB300]/50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl select-none", "aria-hidden": "true", children: tier.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-black text-sm text-ink", children: tier.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted font-semibold mt-0.5", children: tier.desc })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${active ? "bg-[#FFB300]" : "bg-slate-100 dark:bg-slate-800"}`, "aria-hidden": "true", children: active && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-[#432C00]" }) })
              ]
            },
            tier.xp
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, {})
  ] });
}
const COPY = {
  en: {
    offline: "Offline Mode — Saved locally",
    syncing: (n) => `Syncing (${n})...`,
    backOnline: "Back Online",
    merged: "Progress synced across devices"
  },
  ar: {
    offline: "وضع بدون إنترنت — الحفظ محلي",
    syncing: (n) => `جاري المزامنة (${n})...`,
    backOnline: "تمت استعادة الاتصال",
    merged: "تمت مزامنة التقدم بنجاح"
  },
  ku: {
    offline: "Bê înternet — Li cîhazê tê tomarkirin",
    syncing: (n) => `Hevdengkirin (${n})...`,
    backOnline: "Înternet vegeriya",
    merged: "Pêşveçûn hate hevdengkirin"
  }
};
function NetworkStatusBadge() {
  const { language } = useAuth();
  const platformOnline = useOnlineStatus();
  const [status, setStatus] = reactExports.useState(() => syncEngine.getStatus());
  const [showOnlineToast, setShowOnlineToast] = reactExports.useState(false);
  const effectiveOnline = platformOnline && status.isOnline;
  const wasOnlineRef = reactExports.useRef(effectiveOnline);
  const onlineToastTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const unsubscribe = syncEngine.subscribe((newStatus) => {
      setStatus(newStatus);
    });
    return () => {
      unsubscribe();
      if (onlineToastTimerRef.current !== null) window.clearTimeout(onlineToastTimerRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!wasOnlineRef.current && effectiveOnline) {
      setShowOnlineToast(true);
      if (onlineToastTimerRef.current !== null) window.clearTimeout(onlineToastTimerRef.current);
      onlineToastTimerRef.current = window.setTimeout(() => {
        onlineToastTimerRef.current = null;
        setShowOnlineToast(false);
      }, 3500);
    }
    wasOnlineRef.current = effectiveOnline;
  }, [effectiveOnline]);
  const strings = COPY[language] ?? COPY.en;
  const showCloudSyncing = isFirebaseConfigured && effectiveOnline && (status.isSyncing || status.pendingCount > 0);
  const showOffline = !effectiveOnline;
  const showReconnected = effectiveOnline && showOnlineToast && !showCloudSyncing;
  if (!showOffline && !showCloudSyncing && !showReconnected) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed top-[max(0.5rem,env(safe-area-inset-top))] end-3 z-50 pointer-events-none select-none",
      role: "status",
      "aria-live": "polite",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
        showOffline && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            className: "pointer-events-auto bg-amber-500 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2 border border-amber-400",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-3.5 h-3.5 shrink-0", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: strings.offline }),
              status.pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono tabular-nums opacity-80", children: [
                "(",
                status.pendingCount,
                ")"
              ] })
            ]
          },
          "offline"
        ),
        showCloudSyncing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            className: "pointer-events-auto bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 animate-spin shrink-0", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: strings.syncing(status.pendingCount) })
            ]
          },
          "syncing"
        ),
        showReconnected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            className: "pointer-events-auto bg-emerald-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3.5 h-3.5 shrink-0", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isFirebaseConfigured ? strings.merged : strings.backOnline })
            ]
          },
          "online"
        )
      ] })
    }
  );
}
class ErrorBoundary extends reactExports.Component {
  constructor() {
    super(...arguments);
    this.state = {
      hasError: false,
      error: null
    };
    this.handleRetry = () => {
      this.setState({ hasError: false, error: null });
      if (this.props.onReset) {
        this.props.onReset();
      } else {
        window.location.reload();
      }
    };
    this.handleGoHome = () => {
      this.setState({ hasError: false, error: null });
      window.location.href = "/";
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
  }
  render() {
    if (this.state.hasError) {
      const titleEn = this.props.fallbackTitleEn || "Something went wrong in this section";
      const titleAr = this.props.fallbackTitleAr || "حدث خطأ غير متوقع في هذا الجزء";
      this.props.fallbackDescEn || "Don’t worry! Your learning progress is safely saved locally.";
      const descAr = this.props.fallbackDescAr || "لا تقلق! تقدمك في التعلم محفوظ بأمان محلياً.";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 my-4 bg-slate-900 border border-slate-800 rounded-[2rem] text-center shadow-xl max-w-lg mx-auto animate-in fade-in zoom-in-95", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-7 h-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black text-white mb-2", children: titleAr }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-slate-400 mb-6 leading-relaxed", children: descAr }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-slate-500 mb-6 dir-ltr opacity-70", children: titleEn }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: this.handleRetry,
              className: "px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 border-none cursor-pointer transition-all shadow-md shadow-indigo-600/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إعادة التحميل" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: this.handleGoHome,
              className: "px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl flex items-center gap-2 border-none cursor-pointer transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الرئيسية" })
              ]
            }
          )
        ] })
      ] });
    }
    return this.props.children;
  }
}
function RouteFallback() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 space-y-4 animate-pulse",
      role: "status",
      "aria-live": "polite",
      "aria-busy": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Loading page…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-40 rounded-lg bg-slate-200 dark:bg-slate-800" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-56 rounded bg-slate-100 dark:bg-slate-800/70" })
        ] }),
        [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          },
          i
        ))
      ]
    }
  );
}
const Login = reactExports.lazy(() => __vitePreload(() => import("./Login-CbfurkQx.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.Login })));
const LearningHub = reactExports.lazy(() => __vitePreload(() => import("./LearningHub-CG66_Umj.js"), true ? __vite__mapDeps([10,1,2,11,12,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.LearningHub })));
const Alphabet = reactExports.lazy(() => __vitePreload(() => import("./Alphabet-JUnEvOW4.js"), true ? __vite__mapDeps([13,1,11,2,14,15,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.Alphabet })));
const VocabularyCategories = reactExports.lazy(() => __vitePreload(() => import("./VocabularyCategories-IYLsjRVq.js"), true ? __vite__mapDeps([16,1,11,2,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.VocabularyCategories })));
const VocabularyList = reactExports.lazy(() => __vitePreload(() => import("./VocabularyList-Bqu6pDtV.js"), true ? __vite__mapDeps([17,1,2,11,14,15,3,18,12,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.VocabularyList })));
const Sentences = reactExports.lazy(() => __vitePreload(() => import("./Sentences-CxDHnDJS.js"), true ? __vite__mapDeps([19,1,2,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.Sentences })));
const Grammar = reactExports.lazy(() => __vitePreload(() => import("./Grammar-BkDBEAWf.js"), true ? __vite__mapDeps([20,1,2,12,21,22,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.Grammar })));
const GrammarLessonPage = reactExports.lazy(() => __vitePreload(() => import("./GrammarLesson-Cqm2dZzk.js"), true ? __vite__mapDeps([23,1,2,21,22,12,15,4,3,5,6,7,8,9]) : void 0).then((m) => ({ default: m.GrammarLessonPage })));
const Writing = reactExports.lazy(() => __vitePreload(() => import("./Writing-HkRy6hSe.js"), true ? __vite__mapDeps([24,1,2,11,12,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.Writing })));
const WritingTracingPage = reactExports.lazy(() => __vitePreload(() => import("./WritingTracingPage-DDt2U5kD.js"), true ? __vite__mapDeps([25,1,2,11,26,27,28,15,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.WritingTracingPage })));
const WritingLessonPage = reactExports.lazy(() => __vitePreload(() => import("./WritingLessonPage-D36tUba6.js"), true ? __vite__mapDeps([29,1,2,11,30,28,27,3,15,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.WritingLessonPage })));
reactExports.lazy(() => __vitePreload(() => import("./WritingWords-BEZEfOub.js"), true ? __vite__mapDeps([31,1,2,32,12,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.WritingWords })));
reactExports.lazy(() => __vitePreload(() => import("./WritingWordTracingPage-CDO2k35p.js"), true ? __vite__mapDeps([33,1,2,32,26,27,15,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.WritingWordTracingPage })));
reactExports.lazy(() => __vitePreload(() => import("./WritingSentences-BO7KxgnX.js"), true ? __vite__mapDeps([34,1,2,35,12,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.WritingSentences })));
reactExports.lazy(() => __vitePreload(() => import("./WritingSentenceTracingPage-B93J0HZ-.js"), true ? __vite__mapDeps([36,1,2,35,26,27,15,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.WritingSentenceTracingPage })));
const WritingComingSoon = reactExports.lazy(() => __vitePreload(() => import("./WritingComingSoon-h1twOshs.js"), true ? __vite__mapDeps([37,1,2,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.WritingComingSoon })));
const Favorites = reactExports.lazy(() => __vitePreload(() => import("./Favorites-C_uowKsc.js"), true ? __vite__mapDeps([38,1,2,18,11,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.Favorites })));
const Quiz = reactExports.lazy(() => __vitePreload(() => import("./Quiz-DNciyhtL.js"), true ? __vite__mapDeps([39,1,2,40,11,15,22,3,4,41,9,30,5,6,7,8]) : void 0).then((m) => ({ default: m.Quiz })));
const Search = reactExports.lazy(() => __vitePreload(() => import("./Search-BlBcILWi.js"), true ? __vite__mapDeps([42,1,2,18,11,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.Search })));
const Store = reactExports.lazy(() => __vitePreload(() => import("./Store-3eG9oQZC.js"), true ? __vite__mapDeps([43,1,3,4,5,2,6,7,8,9]) : void 0).then((m) => ({ default: m.Store })));
const Profile = reactExports.lazy(() => __vitePreload(() => import("./Profile-RsT1pWk8.js"), true ? __vite__mapDeps([44,1,2,41,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.Profile })));
const LeaderboardPage = reactExports.lazy(() => __vitePreload(() => import("./LeaderboardPage-D3oCyWV5.js"), true ? __vite__mapDeps([45,1,2,6,7,8,3,4,5,9]) : void 0).then((m) => ({ default: m.LeaderboardPage })));
const Roadmap = reactExports.lazy(() => __vitePreload(() => import("./Roadmap-DoL8IuvX.js"), true ? __vite__mapDeps([46,1,2,15,40,11,22,3,4,5,6,7,8,9]) : void 0).then((m) => ({ default: m.Roadmap })));
const Games = reactExports.lazy(() => __vitePreload(() => import("./Games-ByZC-tVN.js"), true ? __vite__mapDeps([47,1,2,11,9,30,3,4,22,5,6,7,8]) : void 0).then((m) => ({ default: m.Games })));
const PrivacyPolicy = reactExports.lazy(() => __vitePreload(() => import("./PrivacyPolicy-Cj_J_7BM.js"), true ? __vite__mapDeps([48,1,2,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfService = reactExports.lazy(() => __vitePreload(() => import("./TermsOfService-BgiTbjz5.js"), true ? __vite__mapDeps([49,1,2,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.TermsOfService })));
const NotFound = reactExports.lazy(() => __vitePreload(() => import("./NotFound-Cm0Lupj-.js"), true ? __vite__mapDeps([50,1,2,3,5,6,7,8,4,9]) : void 0).then((m) => ({ default: m.NotFound })));
function KeyedWritingLesson() {
  const { letterId } = useParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WritingLessonPage, {}, letterId);
}
function WordsGate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WritingComingSoon, { feature: "words" });
}
function WordTracingGate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WritingComingSoon, { feature: "words" });
}
function SentencesGate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WritingComingSoon, { feature: "sentences" });
}
function SentenceTracingGate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WritingComingSoon, { feature: "sentences" });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BrowserRouter, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkStatusBadge, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(RouteFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Routes, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, {}), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          index: true,
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ErrorBoundary,
            {
              fallbackTitleAr: "حدث خطأ في الصفحة الرئيسية",
              fallbackTitleEn: "An error occurred on the home page",
              fallbackDescAr: "يمكنك إعادة تحميل الصفحة أو التنقل عبر الشريط السفلي.",
              fallbackDescEn: "You can reload the page or navigate using the bottom bar.",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {})
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Login, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "learn", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LearningHub, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "alphabet", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Alphabet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "vocabulary", element: /* @__PURE__ */ jsxRuntimeExports.jsx(VocabularyCategories, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "vocabulary/:categoryId", element: /* @__PURE__ */ jsxRuntimeExports.jsx(VocabularyList, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "sentences", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Sentences, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "grammar", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Grammar, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "grammar/:lessonId", element: /* @__PURE__ */ jsxRuntimeExports.jsx(GrammarLessonPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "writing", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Writing, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "writing/lesson/:letterId", element: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyedWritingLesson, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "writing/words", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WordsGate, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "writing/words/:wordId", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WordTracingGate, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "writing/sentences", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SentencesGate, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "writing/sentences/:sentenceId", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SentenceTracingGate, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "writing/:letterId", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WritingTracingPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "favorites", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Favorites, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "quiz/:moduleId",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ErrorBoundary,
            {
              fallbackTitleAr: "حدث خطأ في محرك الاختبار",
              fallbackTitleEn: "An error occurred in the quiz engine",
              fallbackDescAr: "يمكنك العودة إلى الخارطة وإعادة محاولة الدرس بأمان.",
              fallbackDescEn: "You can safely return to the roadmap and retry the lesson.",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quiz, {})
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "roadmap", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Roadmap, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "games",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ErrorBoundary,
            {
              fallbackTitleAr: "حدث خطأ في اللعبة",
              fallbackTitleEn: "An error occurred in the game",
              fallbackDescAr: "تقدمك محفوظ. يمكنك العودة واختيار لعبة أخرى.",
              fallbackDescEn: "Your progress is saved. Go back and pick another game.",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Games, {})
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "search", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "store", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "profile",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ErrorBoundary,
            {
              fallbackTitleAr: "حدث خطأ في صفحة الملف الشخصي",
              fallbackTitleEn: "An error occurred in profile page",
              fallbackDescAr: "بياناتك المحفوظة بخير. اضغط على إعادة التحميل للبدء مجدداً.",
              fallbackDescEn: "Your saved data is intact. Click reload to try again.",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Profile, {})
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "leaderboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "privacy", element: /* @__PURE__ */ jsxRuntimeExports.jsx(PrivacyPolicy, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "terms", element: /* @__PURE__ */ jsxRuntimeExports.jsx(TermsOfService, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {}) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InterstitialAdModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RewardedAdModal, {})
  ] }) }) });
}
function registerSW(options = {}) {
  const {
    immediate = false,
    onNeedReload,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisteredSW,
    onRegisterError
  } = options;
  let wb;
  let registerPromise;
  const updateServiceWorker = async (_reloadPage = true) => {
    await registerPromise;
  };
  async function register() {
    if ("serviceWorker" in navigator) {
      wb = await __vitePreload(async () => {
        const { Workbox } = await import("./vendor-B7z8ML8n.js").then((n) => n.w);
        return { Workbox };
      }, true ? __vite__mapDeps([7,1,8]) : void 0).then(({ Workbox }) => {
        return new Workbox("/sw.js", { scope: "/", type: "classic" });
      }).catch((e) => {
        onRegisterError == null ? void 0 : onRegisterError(e);
        return void 0;
      });
      if (!wb)
        return;
      {
        {
          wb.addEventListener("activated", (event) => {
            if (event.isUpdate || event.isExternal) {
              if (onNeedReload)
                onNeedReload();
              else
                window.location.reload();
            }
          });
          wb.addEventListener("installed", (event) => {
            if (!event.isUpdate) {
              onOfflineReady == null ? void 0 : onOfflineReady();
            }
          });
        }
      }
      wb.register({ immediate }).then((r) => {
        if (onRegisteredSW)
          onRegisteredSW("/sw.js", r);
        else
          onRegistered == null ? void 0 : onRegistered(r);
      }).catch((e) => {
        onRegisterError == null ? void 0 : onRegisterError(e);
      });
    }
  }
  registerPromise = register();
  return updateServiceWorker;
}
registerSW({
  onNeedRefresh() {
  },
  onOfflineReady() {
    console.log("App is ready to work offline, all TTS assets cached.");
  }
});
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
export {
  AudioButton as A,
  Button as B,
  resetToursForReplay as C,
  saveReminderSettings as D,
  ErrorState as E,
  db as F,
  useAppTour as G,
  isTourCompleted as H,
  getFirstActionableLessonId as I,
  TOUR_REWARD_GEMS as J,
  buildRoadmapTourSteps as K,
  startZombieMusic as L,
  Modal as M,
  NUMBER_FAMILY_HISTORY_STATE as N,
  playZombieDamageSound as O,
  PWAInstallButton as P,
  playZombieKillSound as Q,
  ROADMAP_TOUR_ID as R,
  Spinner as S,
  TOUR_CHAIN_STORAGE_KEY as T,
  stopZombieMusic as U,
  academicVocabulary as a,
  academicCategories as b,
  cn as c,
  tLevel as d,
  playCompleteSound as e,
  playSuccessSound as f,
  playFailureSound as g,
  calculateQuizRewards as h,
  isFirebaseConfigured as i,
  useAdStore as j,
  getMuteState as k,
  learningPath as l,
  setMuteState as m,
  getUtcDateString as n,
  syncEngine as o,
  playAudioUrl as p,
  offlineStorage as q,
  registerBackInterceptor as r,
  stopAllActiveAudio as s,
  t,
  useAuth as u,
  getUserErrorMessage as v,
  getReminderSettings as w,
  supportsNotifications as x,
  isNotificationPermissionGranted as y,
  AVATARS as z
};
