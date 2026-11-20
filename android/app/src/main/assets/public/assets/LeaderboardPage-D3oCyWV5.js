import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { i as isFirebaseConfigured, F as db, u as useAuth } from "./index-C4ml4lrv.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { f as setDoc, d as doc, k as serverTimestamp, q as query, l as limit, m as orderBy, n as collection, p as getDocs } from "./vendor-firebase-CxrLxvH4.js";
import { l as Sparkles, bA as Landmark, T as Trophy, o as Users, bB as Medal, c as Search, Z as Zap, i as Award, j as Compass, k as Star, F as Flame, G as GraduationCap, m as Smile, U as User } from "./vendor-icons-UlZxPqC8.js";
import { m as motion, A as AnimatePresence } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
const DEFAULT_COMPETITORS = [
  { uid: "comp-1", name: "Ronahi", xp: 1850, avatar: "av-2" },
  { uid: "comp-2", name: "Dilshad", xp: 1540, avatar: "av-5" },
  { uid: "comp-3", name: "Berivan", xp: 1220, avatar: "av-3" },
  { uid: "comp-4", name: "Shivan", xp: 950, avatar: "av-1" },
  { uid: "comp-5", name: "Zozan", xp: 750, avatar: "av-4" },
  { uid: "comp-6", name: "Rawend", xp: 480, avatar: "av-6" },
  { uid: "comp-7", name: "Alan", xp: 260, avatar: "av-7" },
  { uid: "comp-8", name: "Avan", xp: 120, avatar: "av-8" }
];
function getCompetitors() {
  try {
    const stored = localStorage.getItem("kurdish_quest_competitors");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse competitors", e);
  }
  localStorage.setItem("kurdish_quest_competitors", JSON.stringify(DEFAULT_COMPETITORS));
  return DEFAULT_COMPETITORS;
}
function getMergedLeaderboard(currentUserName, currentUserXp, currentUserAvatarId) {
  const competitors = getCompetitors();
  const userAvatar = currentUserAvatarId || "av-1";
  const currentUserEntry = {
    uid: "current-user-uid",
    name: currentUserName,
    xp: currentUserXp,
    avatar: userAvatar,
    isCurrentUser: true
  };
  const merged = [...competitors, currentUserEntry];
  return merged.sort((a, b) => b.xp - a.xp);
}
const COLLECTION = "leaderboard";
const GUEST_UID = "local_user";
function isRealLeaderboardUser(user) {
  return isFirebaseConfigured && !!(user == null ? void 0 : user.uid) && user.uid !== GUEST_UID;
}
async function fetchCloudLeaderboard(currentUid, limitN = 50) {
  const q = query(collection(db, COLLECTION), orderBy("xp", "desc"), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      uid: d.id,
      // Boundary coercion of untrusted server fields (no typeof narrowing):
      name: String(data.name ?? "Learner"),
      xp: Number(data.xp) || 0,
      avatar: String(data.avatar ?? "av-1"),
      isCurrentUser: d.id === currentUid
    };
  });
}
async function publishOwnEntry(uid, name, xp, avatar) {
  try {
    await setDoc(
      doc(db, COLLECTION, uid),
      {
        name: name.slice(0, 50),
        xp: Math.max(0, Math.floor(xp)),
        avatar,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (err) {
    console.warn("[CloudLeaderboard] publish failed (board will show last known entry):", err);
  }
}
const renderAvatarIcon = (avatarId, sizeClass = "w-6 h-6") => {
  const iconMap = {
    "av-1": User,
    "av-2": Smile,
    "av-3": GraduationCap,
    "av-4": Flame,
    "av-5": Sparkles,
    "av-6": Star,
    "av-7": Compass,
    "av-8": Award
  };
  const colorMap = {
    "av-1": "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
    "av-2": "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
    "av-3": "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    "av-4": "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    "av-5": "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400",
    "av-6": "bg-fuchsia-100 dark:bg-fuchsia-950/40 text-fuchsia-600 dark:text-fuchsia-400",
    "av-7": "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400",
    "av-8": "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400"
  };
  const IconComponent = iconMap[avatarId] || User;
  const colors = colorMap[avatarId] || "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl flex items-center justify-center p-1.5 shadow-xs ${colors}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: sizeClass }) });
};
function LeaderboardPage() {
  const { userData, user, language, loading } = useAuth();
  useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("weekly");
  const [boardData, setBoardData] = reactExports.useState([]);
  const [simulationPulse, setSimulationPulse] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const isRealBoard = isRealLeaderboardUser(user);
  const ALL_TIME_LEGENDS = [
    { uid: "legend-1", name: "Zinar - Amude", xp: 12450, avatar: "av-1" },
    { uid: "legend-2", name: "Salar - Erbil", xp: 9540, avatar: "av-2" },
    { uid: "legend-3", name: "Nisrin - Diyarbakir", xp: 8220, avatar: "av-3" },
    { uid: "legend-4", name: "Shergo - Qamishlo", xp: 7650, avatar: "av-4" },
    { uid: "legend-5", name: "Kovan - Duhok", xp: 6710, avatar: "av-5" },
    { uid: "legend-6", name: "Jamil - Afrin", xp: 5980, avatar: "av-6" },
    { uid: "legend-7", name: "Rojda - Kobane", xp: 5410, avatar: "av-7" }
  ];
  reactExports.useEffect(() => {
    if (!userData) return;
    const currentUserName = (user == null ? void 0 : user.displayName) || (language !== "ar" ? "Learner" : "متعلم");
    if (isRealLeaderboardUser(user)) {
      let cancelled = false;
      (async () => {
        await publishOwnEntry(user.uid, currentUserName, userData.xp, userData.avatarId || "av-1");
        try {
          const entries = await fetchCloudLeaderboard(user.uid);
          if (!cancelled) setBoardData(entries);
        } catch (err) {
          console.warn("[Leaderboard] cloud fetch failed:", err);
          if (!cancelled) setBoardData([]);
        }
      })();
      return () => {
        cancelled = true;
      };
    }
    if (activeTab === "weekly") {
      const records = getMergedLeaderboard(currentUserName, userData.xp, userData.avatarId);
      setBoardData(records);
    } else {
      const userAvatar = userData.avatarId || "av-1";
      const currentUserEntry = {
        uid: "current-user-uid",
        name: currentUserName,
        xp: userData.xp,
        avatar: userAvatar,
        isCurrentUser: true
      };
      const merged = [...ALL_TIME_LEGENDS, currentUserEntry].sort((a, b) => b.xp - a.xp);
      setBoardData(merged);
    }
  }, [userData, user, language, activeTab]);
  if (loading && !userData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black tracking-wide", children: language !== "ar" ? "Loading leaderboard..." : "جاري تحميل لوحة الصدارة..." })
    ] });
  }
  const safeUserData = userData || {
    xp: 0
  };
  const userRankIdx = boardData.findIndex((item) => item.isCurrentUser);
  const userRank = userRankIdx !== -1 ? userRankIdx + 1 : 0;
  const filteredBoard = boardData.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const dict = {
    en: {
      title: "Kurmanji Leagues",
      subtitle: "View community standings & compete live!",
      weeklyTab: "Weekly Sprint",
      allTimeTab: "All-Time Legends",
      rank: "Rank",
      xp: "XP Points",
      searchPlaceholder: "Search competitors...",
      simulateBtn: "Test Rival Active Progress",
      weeklyDesc: "Refreshes every Sunday. Study daily to lock in your rank!",
      allTimeDesc: "The hall of fame containing top learners worldwide.",
      positionInfo: "Your Rank position: ",
      behindMsg: " XP behind the lead!",
      firstMsg: "Outstanding! You are currently leading this League!",
      searchNoResults: "No competitors found with that name",
      backBtn: "Dashboard",
      realDesc: "Live global standings — real learners, updated from the cloud.",
      practiceNote: "Practice League — these rivals are training bots, not real players. Sign in with Google to join the live global board."
    },
    ku: {
      title: "Lîga Kurmancî",
      subtitle: "Rêzbûna civakê bibîne û bikeve pêşbaziyê!",
      weeklyTab: "Pêşbaziya Heftane",
      allTimeTab: "Hostayên Hemû Deman",
      rank: "Rêz",
      xp: "Puanên XP",
      searchPlaceholder: "Li hevalan bigere...",
      simulateBtn: "Nûkirina Çalakiya Hevalan",
      weeklyDesc: "Her roja Yekşemê tê nûkirin. Rojane bixwîne da ku pêşeng bimînî!",
      allTimeDesc: "Tabloya rûmetê ya fêrxwazên herî serkeftî yên cîhanê.",
      positionInfo: "Cihê te yê rêzbûnê: ",
      behindMsg: " XP ma ji bo serkeftinê!",
      firstMsg: "Aferîn! Tu niha li serê vê lîgê yî!",
      searchNoResults: "Tu kes bi vî navî nehate dîtin",
      backBtn: "Destpêk",
      realDesc: "Rêzbûna cîhanî ya zindî — fêrxwazên rastîn, ji ewrê tê nûkirin.",
      practiceNote: "Lîga Pratîkê — ev hevrik botên perwerdeyê ne, ne lîstikvanên rastîn in. Bi Google têkeve da ku beşdarî tabloya cîhanî ya zindî bibî."
    },
    ar: {
      title: "دوري الكرمانجية",
      subtitle: "شاهد ترتيب المجتمع والتنافس المباشر!",
      weeklyTab: "التحدي الأسبوعي",
      allTimeTab: "أساطير منصة كويستر",
      rank: "الترتيب",
      xp: "نقطة خبرة",
      searchPlaceholder: "البحث عن المنافسين...",
      simulateBtn: "تحديث نشاط المنافسين",
      weeklyDesc: "يتجدد الترتيب كل أحد. ادرس يومياً للحفاظ على صدارتك!",
      allTimeDesc: "لوحة الشرف التي تضم كبار المتعلمين من جميع أرجاء العالم.",
      positionInfo: "ترتيبك الحالي: ",
      behindMsg: " نقطة تفصلك عن المتصدر!",
      firstMsg: "مذهل! أنت تتصدر هذا الدوري حالياً!",
      searchNoResults: "لا يوجد منافس بهذا الاسم",
      backBtn: "الرئيسية",
      realDesc: "الترتيب العالمي المباشر — متعلمون حقيقيون، يتم التحديث من السحابة.",
      practiceNote: "دوري التدريب — هؤلاء المنافسون روبوتات تدريبية وليسوا لاعبين حقيقيين. سجّل الدخول عبر Google للانضمام إلى اللوحة العالمية المباشرة."
    }
  }[language === "ku" ? "ku" : language === "ar" ? "ar" : "en"];
  const top3 = filteredBoard.slice(0, 3);
  const remaingList = filteredBoard.slice(3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-6 relative max-w-3xl mx-auto min-h-screen bg-slate-50 dark:bg-slate-950 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight", children: dict.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-snug", children: dict.subtitle })
    ] }) }),
    !isRealBoard && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-100 dark:bg-slate-900 rounded-3xl p-1 border border-slate-200/50 dark:border-slate-800/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setActiveTab("weekly");
            setSearchQuery("");
          },
          className: `flex-1 py-3 min-h-[44px] text-center font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "weekly" ? "bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dict.weeklyTab })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setActiveTab("alltime");
            setSearchQuery("");
          },
          className: `flex-1 py-3 min-h-[44px] text-center font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "alltime" ? "bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dict.allTimeTab })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100/40 dark:border-indigo-900/40 p-3 rounded-2xl text-[11px] text-slate-500 dark:text-slate-400 leading-normal flex items-start gap-2 select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-amber-500/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isRealBoard ? dict.realDesc : activeTab === "weekly" ? dict.weeklyDesc : dict.allTimeDesc })
    ] }),
    !isRealBoard && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "note",
        className: "bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/50 p-3 rounded-2xl text-[11px] font-bold text-amber-800 dark:text-amber-300 leading-normal flex items-start gap-2 select-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dict.practiceNote })
        ]
      }
    ),
    filteredBoard.length >= 3 && searchQuery === "" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5 items-end justify-center py-6 px-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/50 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" }),
      top3[1] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center mb-1", children: [
          renderAvatarIcon(top3[1].avatar, "w-8 h-8"),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 bg-slate-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] uppercase font-black font-mono border border-white", children: "2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-slate-700 dark:text-slate-300 truncate max-w-[90px] mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: top3[1].name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold font-mono text-slate-400 dark:text-slate-500", children: [
          top3[1].xp,
          " xp"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-full bg-slate-100 dark:bg-slate-800 rounded-t-2xl mt-2 flex items-center justify-center shadow-inner border border-slate-100 dark:border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "w-5 h-5 text-slate-400" }) })
      ] }),
      top3[0] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center z-10 scale-105", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-6 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { rotate: [0, 10, -10, 0], y: [0, -1, 0] },
              transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-yellow-500 fill-yellow-300 animate-pulse" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: renderAvatarIcon(top3[0].avatar, "w-10 h-10") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 bg-amber-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-[11px] uppercase font-black font-mono border border-white max-w-[24px]", children: "1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-amber-600 dark:text-amber-400 truncate max-w-[100px] mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: top3[0].name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-black font-mono text-amber-500", children: [
          top3[0].xp,
          " xp"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-full bg-linear-to-b from-amber-100 to-amber-200 dark:from-amber-950/60 dark:to-amber-900/30 rounded-t-2xl mt-2 flex items-center justify-center shadow-lg border-2 border-amber-300 dark:border-amber-800/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-7 h-7 text-amber-500 fill-amber-300/20 animate-bounce" }) })
      ] }),
      top3[2] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center mb-1", children: [
          renderAvatarIcon(top3[2].avatar, "w-8 h-8"),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 bg-amber-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] uppercase font-black font-mono border border-white", children: "3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-slate-700 dark:text-slate-300 truncate max-w-[90px] mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: top3[2].name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold font-mono text-slate-400 dark:text-slate-500", children: [
          top3[2].xp,
          " xp"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-full bg-amber-50 dark:bg-slate-800 rounded-t-2xl mt-2 flex items-center justify-center shadow-inner border border-slate-100 dark:border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "w-5 h-5 text-amber-700" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          "aria-label": dict.searchPlaceholder,
          placeholder: dict.searchPlaceholder,
          className: "w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 px-10 font-medium text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 shadow-xs"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }) })
    ] }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mt-4 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filteredBoard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 font-bold text-slate-400 text-xs", children: dict.searchNoResults }) : (
      // If we are showing top 3 on the pedestal and there is no search filter, we skip rendering top 3 in the regular list to make it dynamic and compact!
      (searchQuery !== "" ? filteredBoard : remaingList).map((item, localIdx) => {
        const rank = searchQuery !== "" ? boardData.findIndex((orig) => orig.uid === item.uid) + 1 : localIdx + 4;
        const isUser = item.isCurrentUser;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            layout: true,
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95 },
            className: `py-3 px-4 rounded-2xl flex items-center justify-between border transition-all duration-300 ${isUser ? "bg-indigo-50/70 dark:bg-indigo-950/25 border-indigo-200 dark:border-indigo-800/80 ring-2 ring-indigo-500/10" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/50 hover:bg-slate-50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold font-mono ${isUser ? "bg-indigo-600 text-white" : "text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950"}`, children: rank }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  renderAvatarIcon(item.avatar, "w-4 h-4"),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-bold tracking-tight truncate max-w-[150px] ${isUser ? "text-indigo-800 dark:text-indigo-300 font-extrabold" : "text-slate-700 dark:text-slate-200"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: item.name }) }),
                  isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-indigo-600 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md tracking-wider", children: language !== "ar" ? "YOU" : "أنت" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-black ${isUser ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`, children: item.xp }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 lowercase font-medium", children: "xp" })
              ] })
            ]
          },
          item.uid
        );
      })
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-4 rounded-3xl flex items-center gap-3 shadow-xl shadow-slate-900/10 z-10 select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-orange-400 fill-orange-400/15 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs leading-normal font-medium flex-1 min-w-0", children: userRank === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-emerald-400", children: dict.firstMsg }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate", children: [
        dict.positionInfo,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-indigo-300 font-extrabold", children: [
          "#",
          userRank
        ] }),
        ". ",
        language !== "ar" ? "You are " : "تبعد ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400 font-black", children: boardData[0] ? boardData[0].xp - safeUserData.xp : 0 }),
        dict.behindMsg
      ] }) })
    ] })
  ] });
}
export {
  LeaderboardPage
};
