import { r as reactExports, j as jsxRuntimeExports, R as React } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { n as getUtcDateString, u as useAuth, o as syncEngine, q as offlineStorage, i as isFirebaseConfigured, P as PWAInstallButton, v as getUserErrorMessage, w as getReminderSettings, x as supportsNotifications, y as isNotificationPermissionGranted, z as AVATARS, t, C as resetToursForReplay, D as saveReminderSettings } from "./index-C4ml4lrv.js";
import { S as Switch } from "./Switch-_Uos24zj.js";
import { aJ as Database, O as Wifi, W as WifiOff, D as Download, by as Upload, N as RefreshCw, K as CircleCheck, C as CircleAlert, bz as Pen, k as Star, c as Search, T as Trophy, f as Sun, F as Flame, i as Award, av as ShieldCheck, w as Check, g as Moon, j as Compass, B as Bell, I as Clock, p as BookOpen, v as ChevronRight, x as Globe, E as LogOut, l as Sparkles, G as GraduationCap, m as Smile, U as User, s as MessageCircle, J as Library } from "./vendor-icons-UlZxPqC8.js";
import { m as motion } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
const ANALYTICS_ENABLED_KEY = "kurmanji_analytics_enabled";
const TELEMETRY_CLIENT_ID_KEY = "kurmanji_telemetry_client_uuid";
const TELEMETRY_STORE = "telemetry_events";
const DB_NAME = "kurmanji_quester_db";
class TelemetryService {
  constructor() {
    this.isEnabled = this.loadAnalyticsPreference();
    this.clientUuid = this.getOrCreateClientUuid();
    if (globalThis.window !== void 0) {
      window.addEventListener("online", () => {
        this.flushBatch();
      });
    }
  }
  loadAnalyticsPreference() {
    if (globalThis.window === void 0) return true;
    const stored = localStorage.getItem(ANALYTICS_ENABLED_KEY);
    return stored !== null ? stored === "true" : true;
  }
  setAnalyticsEnabled(enabled) {
    this.isEnabled = enabled;
    if (globalThis.window !== void 0) {
      localStorage.setItem(ANALYTICS_ENABLED_KEY, enabled ? "true" : "false");
    }
    if (!enabled) {
      this.clearBufferedEvents();
    }
  }
  isAnalyticsEnabled() {
    return this.isEnabled;
  }
  getOrCreateClientUuid() {
    if (globalThis.window === void 0) return "anon_server";
    let uuid = localStorage.getItem(TELEMETRY_CLIENT_ID_KEY);
    if (!uuid) {
      uuid = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(TELEMETRY_CLIENT_ID_KEY, uuid);
    }
    return uuid;
  }
  /**
   * Log an event with zero-PII policy
   */
  async logEvent(eventName, payload = {}, options = {}) {
    if (!this.isEnabled) return;
    const sanitizedPayload = { ...payload };
    delete sanitizedPayload.email;
    delete sanitizedPayload.displayName;
    delete sanitizedPayload.name;
    delete sanitizedPayload.ip;
    delete sanitizedPayload.authToken;
    const isMobile = globalThis.window !== void 0 && window.innerWidth <= 768;
    const event = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      eventName,
      anonUserHash: this.clientUuid,
      timestampUtc: Date.now(),
      appVersion: "1.2.0",
      uiLanguage: options.uiLanguage || "ar",
      theme: options.theme || "dark",
      platform: isMobile ? "web_mobile" : "web_desktop",
      ...sanitizedPayload
    };
    await this.bufferEvent(event);
    if (globalThis.navigator !== void 0 && navigator.onLine) {
      this.flushBatch();
    }
  }
  /**
   * Buffer event into IndexedDB
   */
  async bufferEvent(event) {
    try {
      if (globalThis.window === void 0 || !window.indexedDB) return;
      const request = indexedDB.open(DB_NAME);
      request.onsuccess = () => {
        const db = request.result;
        if (db.objectStoreNames.contains(TELEMETRY_STORE)) {
          const tx = db.transaction(TELEMETRY_STORE, "readwrite");
          tx.objectStore(TELEMETRY_STORE).put(event);
        }
      };
    } catch (err) {
      try {
        const raw = localStorage.getItem("kurmanji_telemetry_queue") || "[]";
        const queue = JSON.parse(raw);
        queue.push(event);
        localStorage.setItem("kurmanji_telemetry_queue", JSON.stringify(queue.slice(-100)));
      } catch (e) {
      }
    }
  }
  /**
   * Flush buffered events batch (max 20 events)
   */
  async flushBatch() {
    if (!this.isEnabled) return;
    if (globalThis.navigator !== void 0 && !navigator.onLine) return;
    try {
      if (globalThis.window === void 0 || !window.indexedDB) return;
      const request = indexedDB.open(DB_NAME);
      request.onsuccess = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(TELEMETRY_STORE)) return;
        const tx = db.transaction(TELEMETRY_STORE, "readwrite");
        const store = tx.objectStore(TELEMETRY_STORE);
        const getAllReq = store.getAll();
        getAllReq.onsuccess = () => {
          const events = getAllReq.result || [];
          if (events.length === 0) return;
          const batch = events.slice(0, 20);
          const clearTx = db.transaction(TELEMETRY_STORE, "readwrite");
          const clearStore = clearTx.objectStore(TELEMETRY_STORE);
          batch.forEach((evt) => clearStore.delete(evt.eventId));
        };
      };
    } catch (err) {
      localStorage.removeItem("kurmanji_telemetry_queue");
    }
  }
  async clearBufferedEvents() {
    try {
      if (globalThis.window === void 0 || !window.indexedDB) return;
      const request = indexedDB.open(DB_NAME);
      request.onsuccess = () => {
        const db = request.result;
        if (db.objectStoreNames.contains(TELEMETRY_STORE)) {
          const tx = db.transaction(TELEMETRY_STORE, "readwrite");
          tx.objectStore(TELEMETRY_STORE).clear();
        }
      };
    } catch (e) {
      localStorage.removeItem("kurmanji_telemetry_queue");
    }
  }
}
const telemetryService = new TelemetryService();
const DAILY_MISSIONS = [
  { id: "daily_xp_50", icon: "⚡", target: 50, reward: 15, titleKey: "mission_xp_title", descKey: "mission_xp_desc" },
  { id: "daily_quizzes_3", icon: "🎓", target: 3, reward: 20, titleKey: "mission_quiz_title", descKey: "mission_quiz_desc" },
  { id: "daily_games_2", icon: "🎮", target: 2, reward: 10, titleKey: "mission_games_title", descKey: "mission_games_desc" },
  { id: "daily_perfect_1", icon: "🏆", target: 1, reward: 25, titleKey: "mission_perfect_title", descKey: "mission_perfect_desc" }
];
DAILY_MISSIONS.reduce((s, m) => s + m.reward, 0);
const EMPTY_COUNTERS = { quizzes: 0, games: 0, perfect: 0 };
function emptyState(today) {
  return { date: today, counters: { ...EMPTY_COUNTERS }, claimed: [] };
}
function getMissionStatuses(userData, now = /* @__PURE__ */ new Date()) {
  var _a;
  const today = getUtcDateString(now);
  const state = ((_a = userData == null ? void 0 : userData.missionsState) == null ? void 0 : _a.date) === today ? userData.missionsState : emptyState(today);
  const xpToday = (userData == null ? void 0 : userData.xpTodayDate) === today ? (userData == null ? void 0 : userData.xpToday) || 0 : 0;
  const progressFor = (id) => {
    switch (id) {
      case "daily_xp_50":
        return xpToday;
      case "daily_quizzes_3":
        return state.counters.quizzes;
      case "daily_games_2":
        return state.counters.games;
      case "daily_perfect_1":
        return state.counters.perfect;
      default:
        return 0;
    }
  };
  return DAILY_MISSIONS.map((def) => {
    const progress = Math.min(progressFor(def.id), def.target);
    return {
      def,
      progress,
      complete: progress >= def.target,
      claimed: state.claimed.includes(def.id)
    };
  });
}
function claimMission(userData, missionId, now = /* @__PURE__ */ new Date()) {
  var _a;
  const statuses = getMissionStatuses(userData, now);
  const status = statuses.find((s) => s.def.id === missionId);
  if (!status || !status.complete || status.claimed) return null;
  const today = getUtcDateString(now);
  const state = ((_a = userData.missionsState) == null ? void 0 : _a.date) === today ? userData.missionsState : emptyState(today);
  return {
    gems: (userData.gems ?? 0) + status.def.reward,
    missionsState: {
      date: today,
      counters: { ...state.counters },
      claimed: [...state.claimed, missionId]
    }
  };
}
const LABELS = {
  en: {
    sectionTitle: "Storage, Sync & Backup",
    offlineReady: "Offline-first local storage active",
    onlineLabel: "Online",
    offlineLabel: "Offline Mode",
    syncNow: "Sync Now",
    syncing: "Syncing...",
    exportBtn: "Export Backup",
    importBtn: "Restore Backup",
    exportSuccess: "Progress backup downloaded successfully.",
    importSuccess: "Progress restored and migrated safely.",
    syncDone: "Sync check completed.",
    schemaLabel: "Schema",
    pendingLabel: "Queued"
  },
  ar: {
    sectionTitle: "التخزين والمزامنة والنسخ الاحتياطي",
    offlineReady: "التخزين المحلي للعمل دون إنترنت مفعّل",
    onlineLabel: "متصل",
    offlineLabel: "وضع دون إنترنت",
    syncNow: "مزامنة الآن",
    syncing: "جاري المزامنة...",
    exportBtn: "تصدير نسخة احتياطية",
    importBtn: "استعادة نسخة",
    exportSuccess: "تم تنزيل النسخة الاحتياطية لتقدمك بنجاح.",
    importSuccess: "تمت استعادة البيانات وترقيتها بأمان.",
    syncDone: "اكتمل فحص المزامنة.",
    schemaLabel: "المخطط",
    pendingLabel: "قيد الانتظار"
  },
  ku: {
    sectionTitle: "Hilanîn, Hevdengkirin û Piştgir",
    offlineReady: "Hilanîna herêmî ya bê-înternet çalak e",
    onlineLabel: "Girêdayî",
    offlineLabel: "Bê înternet",
    syncNow: "Niha Hevdeng Bike",
    syncing: "Tê hevdengkirin...",
    exportBtn: "Piştgirê Daxe",
    importBtn: "Piştgirê Vegerîne",
    exportSuccess: "Piştgira pêşveçûna te bi serkeftî hate daxistin.",
    importSuccess: "Daneyên te bi ewlehî hatin vegerandin û nûkirin.",
    syncDone: "Kontrola hevdengkirinê qediya.",
    schemaLabel: "Şema",
    pendingLabel: "Li bendê"
  }
};
const DataBackupCard = () => {
  const { user, language, theme, importBackupData } = useAuth();
  const [syncStatus, setSyncStatus] = reactExports.useState(() => syncEngine.getStatus());
  const [diag, setDiag] = reactExports.useState(null);
  const [feedback, setFeedback] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const strings = LABELS[language] ?? LABELS.en;
  reactExports.useEffect(() => {
    const unsub = syncEngine.subscribe(setSyncStatus);
    void offlineStorage.getDiagnostics().then(setDiag);
    return unsub;
  }, []);
  const handleExport = async () => {
    setBusy(true);
    setFeedback(null);
    try {
      const json = await offlineStorage.exportBackupJson({
        displayName: (user == null ? void 0 : user.displayName) ?? void 0,
        language,
        theme
      });
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kurdish-quest-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setFeedback({ kind: "ok", text: strings.exportSuccess });
    } catch (err) {
      setFeedback({ kind: "err", text: getUserErrorMessage(err, language) });
    } finally {
      setBusy(false);
    }
  };
  const handleFileChange = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setFeedback(null);
    try {
      const text = await file.text();
      const restored = await offlineStorage.restoreBackupJson(text);
      await importBackupData(restored.userData, restored.profile);
      setDiag(await offlineStorage.getDiagnostics());
      setFeedback({ kind: "ok", text: strings.importSuccess });
    } catch (err) {
      setFeedback({ kind: "err", text: getUserErrorMessage(err, language) });
    } finally {
      setBusy(false);
    }
  };
  const handleManualSync = async () => {
    setBusy(true);
    setFeedback(null);
    try {
      await syncEngine.manualSync(user == null ? void 0 : user.uid);
      setDiag(await offlineStorage.getDiagnostics());
      setFeedback({ kind: "ok", text: strings.syncDone });
    } catch (err) {
      setFeedback({ kind: "err", text: getUserErrorMessage(err, language) });
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black text-xs text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: strings.sectionTitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300", children: [
        syncStatus.isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-3.5 h-3.5 text-amber-600 dark:text-amber-400", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: syncStatus.isOnline ? strings.onlineLabel : strings.offlineLabel })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: strings.offlineReady }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono tabular-nums", children: [
        strings.schemaLabel,
        " v",
        (diag == null ? void 0 : diag.schemaVersion) ?? 3
      ] }),
      syncStatus.pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono tabular-nums", children: [
          strings.pendingLabel,
          ": ",
          syncStatus.pendingCount
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => void handleExport(),
          disabled: busy,
          className: "inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: strings.exportBtn })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          disabled: busy,
          className: "inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: strings.importBtn })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "application/json,.json",
          onChange: (e) => void handleFileChange(e),
          className: "sr-only",
          "aria-label": strings.importBtn
        }
      ),
      isFirebaseConfigured && user && user.uid !== "local_user" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => void handleManualSync(),
          disabled: busy || syncStatus.isSyncing || !syncStatus.isOnline,
          className: "inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 shrink-0 ${syncStatus.isSyncing ? "animate-spin" : ""}`, "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: syncStatus.isSyncing ? strings.syncing : strings.syncNow })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PWAInstallButton, {})
    ] }),
    feedback && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "status",
        className: `flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold ${feedback.kind === "ok" ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200" : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200"}`,
        children: [
          feedback.kind === "ok" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feedback.text })
        ]
      }
    )
  ] });
};
const renderProfileAvatarIcon = (iconName, className = "w-12 h-12") => {
  const iconMap = {
    "user": User,
    "smile": Smile,
    "graduation-cap": GraduationCap,
    "flame": Flame,
    "sparkles": Sparkles,
    "star": Star,
    "compass": Compass,
    "award": Award
  };
  const IconComponent = iconMap[iconName] || User;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className });
};
const BADGES_DB = [
  { id: "first_steps", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6" }), titleEn: "First Steps", titleKu: "Gavên Yekem", titleAr: "الخطوة الأولى", descEn: "Earn 50 XP to begin your path", descKu: "50 XP qezenc bike ji bo destpêkirinê", descAr: "اجمع أول 50 نقطة لبدء المسار", color: "from-blue-400 to-indigo-500" },
  { id: "dedicated_learner", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-6 h-6" }), titleEn: "Dedicated Learner", titleKu: "Fêrxwazê Xebatkar", titleAr: "المتعلم المكرّس", descEn: "Accumulate 500 XP total", descKu: "Tevahiya 500 XP berhev bike", descAr: "احصد 500 نقطة خبرة إجمالية", color: "from-orange-400 to-red-500" },
  { id: "academic_achiever", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6" }), titleEn: "Academic Scholar", titleKu: "Zanayê Akademîk", titleAr: "العالم الأكاديمي", descEn: "Accumulate 1500 XP total", descKu: "Tevahiya 1500 XP berhev bike", descAr: "احصد 1500 نقطة خبرة إجمالية", color: "from-yellow-400 to-amber-500" },
  { id: "vocabulary_enthusiast", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6" }), titleEn: "Vocab Hobbyist", titleKu: "Hezkiriyê Peyvan", titleAr: "هاوي المفردات", descEn: "Learn at least 10 words", descKu: "Kêmzêde 10 peyvan fêr bibe", descAr: "أتقن ما لا يقل عن 10 كلمات كوردية", color: "from-emerald-400 to-green-500" },
  { id: "vocabulary_master", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6" }), titleEn: "Lexicon King", titleKu: "Mîrê Ferhengê", titleAr: "ملك القاموس", descEn: "Learn at least 50 words", descKu: "Kêmzêde 50 peyvan fêr bibe", descAr: "أتقن ما لا يقل عن 50 كلمة كوردية", color: "from-teal-400 to-emerald-600" },
  { id: "polyglot", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-6 h-6" }), titleEn: "Speech Polyglot", titleKu: "Zimanzanê Kurmancî", titleAr: "متحدث فصيح", descEn: "Learn at least 150 words", descKu: "Kêmzêde 150 peyvan fêr bibe", descAr: "أتقن ما لا يقل عن 150 كلمة كوردية", color: "from-cyan-400 to-blue-600" },
  { id: "streak_3", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6" }), titleEn: "Streak Starter", titleKu: "Destpêka Rêzê", titleAr: "مشعل الحماس", descEn: "Maintain a 3-day streak", descKu: "3 rojan li pey hev bidomîne", descAr: "حافظ على حماسك لثلاثة أيام متتالية", color: "from-purple-400 to-pink-500" },
  { id: "streak_7", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-6 h-6" }), titleEn: "Streak Majesty", titleKu: "Pehlewaniya Rêzê", titleAr: "سيادة الانضباط", descEn: "Maintain a 7-day streak", descKu: "7 rojan li pey hev bidomîne", descAr: "حافظ على حماسك لسبعة أيام متتالية", color: "from-rose-400 to-red-600" },
  { id: "quiz_conqueror", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6" }), titleEn: "Arena Conqueror", titleKu: "Serkeftiyê Ezmûnan", titleAr: "قاهر الاختبارات", descEn: "Complete 5 syllabus quizzes", descKu: "5 pirsyariyan biqedîne", descAr: "امض بثقة واجتاز 5 اختبارات تدريبية", color: "from-amber-400 to-yellow-600" },
  { id: "quiz_master", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-6 h-6" }), titleEn: "Great Master", titleKu: "Hostayê Mezin", titleAr: "سيد الحكمة والامتحانات", descEn: "Complete 20 syllabus quizzes", descKu: "20 pirsyariyan biqedîne", descAr: "امض بثقة واجتاز 20 اختباراً منهاجياً كلياً", color: "from-indigo-400 to-violet-600" },
  { id: "lesson_scholar", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-6 h-6" }), titleEn: "Lesson Scholar", titleKu: "Zanayê Dersan", titleAr: "الباحث العظيم", descEn: "Master 5 complete lessons", descKu: "5 dersan bi temamî hîn bibe", descAr: "أتقن المادة الكلية لخمس وحدات درسية", color: "from-fuchsia-400 to-purple-600" }
];
function Profile() {
  const navigate = useNavigate();
  const { user, userData, language, setLanguage, theme, toggleTheme, logout, updateUserData, updateProfileName, loading } = useAuth();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("progress");
  const [showAllBadges, setShowAllBadges] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const openSettings = () => setActiveTab("settings");
    window.addEventListener("kq:profile-settings", openSettings);
    return () => window.removeEventListener("kq:profile-settings", openSettings);
  }, []);
  const [reminderEnabled, setReminderEnabled] = reactExports.useState(() => getReminderSettings().enabled);
  const [reminderHour, setReminderHour] = reactExports.useState(() => getReminderSettings().hour);
  const [analyticsEnabled, setAnalyticsEnabledState] = reactExports.useState(() => telemetryService.isAnalyticsEnabled());
  const [hasWebNotificationSupport] = reactExports.useState(() => supportsNotifications());
  const [browserPermissionGranted, setBrowserPermissionGranted] = reactExports.useState(() => isNotificationPermissionGranted());
  const [testNotificationFeedback, setTestNotificationFeedback] = reactExports.useState(null);
  const handleToggleReminder = () => {
    const nextEnabled = !reminderEnabled;
    setReminderEnabled(nextEnabled);
    saveReminderSettings({ enabled: nextEnabled, hour: reminderHour });
  };
  const feedbackTimerRef = React.useRef(null);
  React.useCallback((ms) => {
    if (feedbackTimerRef.current !== null) window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(() => {
      feedbackTimerRef.current = null;
      setTestNotificationFeedback(null);
    }, ms);
  }, []);
  React.useEffect(() => () => {
    if (feedbackTimerRef.current !== null) window.clearTimeout(feedbackTimerRef.current);
  }, []);
  const handleClaimMission = async (missionId) => {
    if (!userData) return;
    const update = claimMission(userData, missionId);
    if (!update) return;
    await updateUserData(update);
  };
  const [editName, setEditName] = reactExports.useState((user == null ? void 0 : user.displayName) || "");
  const [editAvatar, setEditAvatar] = reactExports.useState((userData == null ? void 0 : userData.avatarId) || "");
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const handleSave = async () => {
    if (editName.trim() !== (user == null ? void 0 : user.displayName)) await updateProfileName(editName.trim() || "Learner");
    await updateUserData({ avatarId: editAvatar });
    setIsEditing(false);
  };
  if (loading && !userData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 border-3 border-[#FFB300] border-t-transparent rounded-full animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black tracking-wide", children: language !== "ar" ? "Loading profile..." : "جاري تحميل الملف الشخصي..." })
    ] });
  }
  const emptyProfile = {
    xp: 0,
    streak: 0,
    gems: 0,
    streakFreezes: 0,
    avatarId: "av-1"
  };
  const safeUserData = userData ?? emptyProfile;
  const userUnlockedBadges = safeUserData.badges || [];
  const selectedAvatar = AVATARS.find((a) => a.id === (isEditing ? editAvatar : safeUserData.avatarId)) || AVATARS[0];
  const StatBox = ({ icon, label, value, colorClass, highlight }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white dark:bg-slate-900 border rounded-3xl p-4 flex flex-col items-center text-center shadow-xs ${highlight ? "border-[#FFB300]/60" : "border-slate-200 dark:border-slate-800"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl mb-2 ${colorClass}`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-500 dark:text-slate-400", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black text-slate-800 dark:text-white font-mono tabular-nums mt-1", children: value })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full bg-transparent p-4 lg:p-8 pb-28 lg:pb-12 max-w-5xl mx-auto w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 mb-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#FFE7B3] to-transparent dark:from-[#3A2F14] pointer-events-none" }),
      !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setEditName((user == null ? void 0 : user.displayName) || "");
        setEditAvatar(safeUserData.avatarId || "");
        setIsEditing(true);
      }, "aria-label": language !== "ar" ? "Edit profile" : "تعديل الملف الشخصي", title: language !== "ar" ? "Edit profile" : "تعديل الملف الشخصي", className: "absolute top-4 right-4 rtl:left-4 rtl:right-auto w-11 h-11 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-28 h-28 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg ring-4 ring-white dark:ring-slate-900 ${selectedAvatar.color}`, children: renderProfileAvatarIcon(selectedAvatar.icon, "w-14 h-14") }),
      isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-5 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editName, onChange: (e) => setEditName(e.target.value), className: "w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-4 px-5 font-black text-center text-slate-800 dark:text-white focus:ring-4 focus:ring-[#FFB300]/25 outline-none transition-all", placeholder: "Your name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-100 dark:bg-slate-800 rounded-3xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3", children: language !== "ar" ? "Select Avatar" : "اختر صورتك" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2.5", children: AVATARS.map((avatar) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditAvatar(avatar.id), className: `aspect-square rounded-2xl flex items-center justify-center transition-all cursor-pointer ${editAvatar === avatar.id ? "ring-4 ring-[#FFB300] scale-105 shadow-md" : "opacity-60 hover:opacity-100"} ${avatar.color}`, children: renderProfileAvatarIcon(avatar.icon, "w-8 h-8") }, avatar.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsEditing(false), className: "flex-1 py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-2xl font-black text-sm cursor-pointer transition-colors", children: language !== "ar" ? "Cancel" : "إلغاء" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, className: "flex-1 py-4 min-h-[44px] bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] rounded-full font-black text-sm shadow-[0_2px_0_#E69500] cursor-pointer transition-colors", children: language !== "ar" ? "Save" : "حفظ" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-slate-800 dark:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: (user == null ? void 0 : user.displayName) || "Learner" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] rounded-full text-xs font-extrabold border border-[#FFB300]/40 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-[#FFB300] text-[#FFB300]" }),
          language !== "ar" ? "Quest Learner" : "متعلم كويست"
        ] })
      ] })
    ] }),
    !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-200/60 dark:bg-[#262524] p-1.5 rounded-2xl mb-6 w-full max-w-sm mx-auto shadow-inner border border-transparent dark:border-[#343331]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("progress"), className: `flex-1 py-3 min-h-[44px] text-xs font-black rounded-xl transition-all cursor-pointer ${activeTab === "progress" ? "bg-white dark:bg-slate-900 text-[#B45309] dark:text-[#FFCE6B] shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`, children: language !== "ar" ? "Progress" : "التقدم" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("settings"), className: `flex-1 py-3 min-h-[44px] text-xs font-black rounded-xl transition-all cursor-pointer ${activeTab === "settings" ? "bg-white dark:bg-slate-900 text-[#B45309] dark:text-[#FFCE6B] shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`, children: language !== "ar" ? "Settings" : "الإعدادات" })
      ] }),
      activeTab === "progress" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5 sm:gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate("/search"),
              className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-xs hover:border-[#FFB300]/60 dark:hover:border-[#FFB300]/40 transition-all cursor-pointer group text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 dark:bg-sky-950/40 rounded-full flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 sm:w-6 sm:h-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest", children: language !== "ar" ? "Dictionary" : "القاموس" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-xs sm:text-sm text-slate-800 dark:text-white mt-0.5", children: language !== "ar" ? "Search" : "البحث" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate("/favorites"),
              className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-xs hover:border-rose-300 dark:hover:border-rose-800 transition-all cursor-pointer group text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-rose-100 dark:bg-rose-950/40 rounded-full flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 sm:w-6 sm:h-6 fill-rose-500/20" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest", children: language !== "ar" ? "Saved" : "المحفوظات" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-xs sm:text-sm text-slate-800 dark:text-white mt-0.5", children: language !== "ar" ? "Favorites" : "المفضلة" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate("/leaderboard"),
              className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-xs hover:border-amber-300 dark:hover:border-amber-800 transition-all cursor-pointer group text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF3D6] dark:bg-amber-950/40 rounded-full flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform animate-bounce-slow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 sm:w-6 sm:h-6 fill-amber-500/20" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest", children: language !== "ar" ? "Rank" : "التصنيف" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-xs sm:text-sm text-slate-800 dark:text-white mt-0.5", children: language !== "ar" ? "Leaderboard" : "المتصدرون" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-8 h-8 text-[#FFB300] fill-[#FFB300]/30" }), label: language !== "ar" ? "Total XP" : "نقاط الخبرة", value: safeUserData.xp || 0, colorClass: "text-amber-500", highlight: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-8 h-8 text-[#FF5722] fill-[#FF5722]/20" }), label: language !== "ar" ? "Day Streak" : "أيام متتالية", value: safeUserData.streak || 0, colorClass: "text-orange-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8 text-sky-500" }), label: language !== "ar" ? "Gems" : "الجواهر", value: safeUserData.gems ?? 100, colorClass: "text-sky-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-blue-500" }), label: language !== "ar" ? "Freezes" : "التجميد", value: safeUserData.streakFreezes ?? 1, colorClass: "text-blue-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-base text-slate-800 dark:text-white mb-4", children: language === "ku" ? "Ev Hefte" : language === "ar" ? "هذا الأسبوع" : "This Week" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center", dir: "ltr", children: (() => {
            const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];
            const todayIdx = (/* @__PURE__ */ new Date()).getDay();
            const streak = safeUserData.streak || 0;
            const activeToday = safeUserData.lastActiveDate === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
            return dayLetters.map((letter, i) => {
              const isToday = i === todayIdx;
              const daysAgo = todayIdx - i;
              const isDone = !isToday && daysAgo > 0 && daysAgo <= (activeToday ? streak - 1 : streak);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-extrabold uppercase ${isDone || isToday ? "text-[#8A6100] dark:text-[#FFCE6B]" : "text-slate-400"}`, children: letter }),
                isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-full bg-[#FFB300] flex items-center justify-center shadow-[0_2px_0_#E69500]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-white stroke-[3.5]" }) }) : isToday ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-full border-2 border-[#FFB300] flex items-center justify-center bg-white dark:bg-slate-900", children: activeToday ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-[#FFB300] stroke-[3.5]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#FFB300]" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800" })
              ] }, i);
            });
          })() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1 px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-lg text-slate-800 dark:text-white", children: t(language, "missions_title") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", "aria-hidden": "true", children: "💎" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold text-slate-400 dark:text-slate-500 px-1 mb-3 leading-snug", children: t(language, "missions_sub") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 list-none p-0 m-0", children: getMissionStatuses(userData).map(({ def, progress, complete, claimed }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: `rounded-2xl border p-3 flex items-center gap-3 ${claimed ? "bg-emerald-50/60 border-emerald-200/70 dark:bg-emerald-950/20 dark:border-emerald-900/50" : "bg-slate-50 border-slate-100 dark:bg-slate-950/40 dark:border-slate-800"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-lg shrink-0 select-none", "aria-hidden": "true", children: def.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[13px] font-black text-slate-800 dark:text-slate-100 truncate", children: t(language, def.titleKey) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-cyan-700 dark:text-cyan-300 shrink-0", children: [
                      "💎 ",
                      def.reward
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold text-slate-400 dark:text-slate-500 truncate", children: t(language, def.descKey) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "mt-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden",
                      dir: "ltr",
                      role: "progressbar",
                      "aria-valuemin": 0,
                      "aria-valuemax": def.target,
                      "aria-valuenow": progress,
                      "aria-label": t(language, def.titleKey),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `h-full rounded-full transition-all ${complete ? "bg-emerald-500" : "bg-[#FFB300]"}`,
                          style: { width: `${Math.round(progress / def.target * 100)}%` }
                        }
                      )
                    }
                  )
                ] }),
                claimed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-[10px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                  " ",
                  t(language, "mission_claimed")
                ] }) : complete ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleClaimMission(def.id),
                    className: "shrink-0 min-h-[44px] px-4 rounded-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] text-xs font-black cursor-pointer transition-colors active:scale-95",
                    children: t(language, "mission_claim")
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-[11px] font-black text-slate-400 font-mono", children: [
                  progress,
                  "/",
                  def.target
                ] })
              ]
            },
            def.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4 px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-lg text-slate-800 dark:text-white", children: language !== "ar" ? "Achievements" : "الإنجازات" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowAllBadges((v) => !v),
                className: "text-sm font-extrabold text-[#8A6100] dark:text-[#FFCE6B] bg-transparent border-none cursor-pointer min-h-[44px] px-2",
                children: showAllBadges ? language !== "ar" ? "Show Less" : "عرض أقل" : language !== "ar" ? "View All" : "عرض الكل"
              }
            )
          ] }),
          !showAllBadges ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar", children: BADGES_DB.map((badge) => {
            const isUnlocked = userUnlockedBadges.includes(badge.id);
            const title = language === "ku" ? badge.titleKu || badge.titleEn : language === "ar" ? badge.titleAr : badge.titleEn;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-w-[118px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 flex flex-col items-center gap-2.5 text-center shadow-xs shrink-0 ${isUnlocked ? "" : "opacity-60"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-14 h-14 rounded-full flex items-center justify-center text-2xl ${isUnlocked ? `bg-gradient-to-br ${badge.color} text-white shadow-sm` : "bg-slate-100 dark:bg-slate-800 text-slate-400 grayscale"}`, children: badge.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-slate-700 dark:text-slate-200 leading-tight", children: title })
            ] }, badge.id);
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[22rem] overflow-y-auto pr-1", children: BADGES_DB.map((badge) => {
            const isUnlocked = userUnlockedBadges.includes(badge.id);
            const title = language === "ku" ? badge.titleKu || badge.titleEn : language === "ar" ? badge.titleAr : badge.titleEn;
            const desc = language === "ku" ? badge.descKu || badge.descEn : language === "ar" ? badge.descAr : badge.descEn;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-[1.5rem] border flex items-center gap-4 transition-all ${isUnlocked ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm" : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 opacity-60"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-3xl shrink-0 shadow-sm ${isUnlocked ? `bg-gradient-to-br ${badge.color} text-white` : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`, children: badge.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-black text-sm text-slate-800 dark:text-slate-100 leading-tight", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1", children: desc })
              ] }),
              isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-500" }) })
            ] }, badge.id);
          }) })
        ] })
      ] }),
      activeTab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "space-y-5 text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-4 h-4" }),
            language === "ku" ? "Vebijêrk" : language === "ar" ? "التفضيلات" : "Preferences"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black text-slate-800 dark:text-white mb-0.5", children: language === "ku" ? "Zimanê Sepanê" : language === "ar" ? "لغة التطبيق" : "App Language" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-slate-500", children: language === "ku" ? "Zimanê navrûyê biguhere" : language === "ar" ? "تغيير لغة واجهة المستخدم" : "Change interface language" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLanguage("en"), className: `px-3 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${language === "en" ? "bg-white dark:bg-slate-700 shadow-sm text-[#B45309] dark:text-[#FFCE6B]" : "text-slate-500"}`, children: "EN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLanguage("ku"), className: `px-3 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${language === "ku" ? "bg-white dark:bg-slate-700 shadow-sm text-[#B45309] dark:text-[#FFCE6B]" : "text-slate-500"}`, children: "Kurdî" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLanguage("ar"), className: `px-3 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${language === "ar" ? "bg-white dark:bg-slate-700 shadow-sm text-[#B45309] dark:text-[#FFCE6B]" : "text-slate-500"}`, children: "عربي" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-slate-100 dark:bg-slate-800 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#FFF3D6] dark:bg-[#3A2F14] flex items-center justify-center text-[#8A6100] dark:text-[#FFCE6B]", children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black text-slate-800 dark:text-white mb-0.5", children: language !== "ar" ? "Dark Mode" : "الوضع الليلي" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-slate-500", children: language !== "ar" ? "Toggle dark appearance" : "تفعيل المظهر الداكن" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: theme === "dark", onCheckedChange: () => toggleTheme(), label: language !== "ar" ? "Dark Mode" : "الوضع الليلي" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-slate-100 dark:bg-slate-800 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black text-slate-800 dark:text-white mb-0.5", children: t(language, "tour_replay_title") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-slate-500", children: t(language, "tour_replay_desc") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  void updateUserData(resetToursForReplay(userData));
                  navigate("/");
                },
                className: "shrink-0 min-h-[44px] px-4 rounded-full bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] border border-[#FFB300]/40 font-black text-xs cursor-pointer hover:bg-[#FFE7B3] transition-colors",
                children: t(language, "tour_replay_btn")
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
            language !== "ar" ? "Notifications" : "الإشعارات"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black text-slate-800 dark:text-white mb-0.5", children: language !== "ar" ? "Daily Reminders" : "التذكير اليومي" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-slate-500", children: language !== "ar" ? "Get notified to practice" : "احصل على إشعارات للتمرين" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: reminderEnabled, onCheckedChange: () => handleToggleReminder(), label: language !== "ar" ? "Daily reminder" : "التذكير اليومي" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DataBackupCard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
            t(language, "legal_section")
          ] }),
          [
            { path: "/privacy", title: t(language, "privacy_policy"), desc: t(language, "privacy_policy_desc"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5" }), tone: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
            { path: "/terms", title: t(language, "terms_of_service"), desc: t(language, "terms_of_service_desc"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }), tone: "bg-sky-100 dark:bg-sky-950/40 text-sky-500" }
          ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate(row.path),
              className: "w-full min-h-[56px] flex items-center gap-3.5 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer text-start px-2 -mx-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${row.tone}`, "aria-hidden": "true", children: row.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-black text-slate-800 dark:text-white leading-snug", children: row.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] font-medium text-slate-500 mt-0.5", children: row.desc })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-slate-400 rtl:-scale-x-100 shrink-0", "aria-hidden": "true" })
              ]
            },
            row.path
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
            t(language, "about_us")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-gradient-to-br from-[#FFC541] to-[#FFA000] rounded-2xl shadow-md shadow-[#FFB300]/25 flex items-center justify-center border border-[#FFDE8A] shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#432C00] font-black text-2xl select-none", children: "K" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black text-slate-800 dark:text-white", children: "Kurdish Quest" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-slate-400 mt-0.5", children: [
                t(language, "app_version"),
                " 2.0.0"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed mt-4", children: t(language, "about_app_desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold text-[#B45309] dark:text-[#FFCE6B] mt-3", children: t(language, "made_with") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "w-full bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 p-5 rounded-3xl flex items-center justify-center gap-2 font-black text-sm transition-colors cursor-pointer shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5" }),
          language !== "ar" ? "Sign Out" : "تسجيل الخروج"
        ] })
      ] })
    ] })
  ] });
}
export {
  Profile
};
