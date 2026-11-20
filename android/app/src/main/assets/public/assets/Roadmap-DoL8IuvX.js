import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth, G as useAppTour, T as TOUR_CHAIN_STORAGE_KEY, H as isTourCompleted, I as getFirstActionableLessonId, J as TOUR_REWARD_GEMS, R as ROADMAP_TOUR_ID, K as buildRoadmapTourSteps, l as learningPath, c as cn, t, A as AudioButton } from "./index-C4ml4lrv.js";
import { a as getDueItems } from "./SpacedRepetitionService-DkhvYl5r.js";
import { f as filterReviewableIds, a as getAdaptiveLevelId } from "./questionGenerator-3VjXWBPZ.js";
import { j as Compass, b3 as RotateCcw, F as Flame, k as Star, K as CircleCheck, T as Trophy, v as ChevronRight, a$ as Brain, l as Sparkles, x as Globe, aK as Lock, X, a5 as Play, p as BookOpen, aT as Scale, bb as Link, I as Clock, b7 as Utensils, o as Users, bC as TreePine, b6 as Stethoscope, P as Plane, s as MessageCircle, aa as Laptop, bA as Landmark, d as Heart, ah as Cat, br as Car, q as Briefcase, bD as Circle } from "./vendor-icons-UlZxPqC8.js";
import { m as motion, A as AnimatePresence } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
import "./kurmanji-DANKPvwI.js";
import "./answerUtils-WRjxYtEq.js";
const LESSON_ICONS = {
  Briefcase,
  Car,
  Cat,
  Heart,
  Landmark,
  Laptop,
  MessageCircle,
  Plane,
  Stethoscope,
  TreePine,
  Users,
  Utensils,
  Clock,
  Link,
  Scale,
  BookOpen,
  Globe,
  Compass,
  Flame,
  Trophy
};
const renderIcon = (iconName) => {
  const IconComponent = LESSON_ICONS[iconName] ?? Circle;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" });
};
function Roadmap() {
  var _a, _b, _c;
  const { user, userData, updateUserData, language, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = reactExports.useState(null);
  const { startTour } = useAppTour();
  const tourAttemptedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (loading && !userData) return;
    if (tourAttemptedRef.current) return;
    let chain = null;
    try {
      chain = sessionStorage.getItem(TOUR_CHAIN_STORAGE_KEY);
    } catch {
      chain = null;
    }
    if (chain !== "roadmap") return;
    const timer = window.setTimeout(() => {
      if (tourAttemptedRef.current) return;
      tourAttemptedRef.current = true;
      try {
        sessionStorage.removeItem(TOUR_CHAIN_STORAGE_KEY);
      } catch {
      }
      if (isTourCompleted(ROADMAP_TOUR_ID, userData)) return;
      const lessonId = getFirstActionableLessonId(userData);
      if (!lessonId) return;
      startTour({
        tourId: ROADMAP_TOUR_ID,
        steps: buildRoadmapTourSteps(language, `roadmap-node-${lessonId}`),
        rewardGems: TOUR_REWARD_GEMS
      });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [loading, userData, language, startTour]);
  if (loading && !userData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black tracking-wide", children: language !== "ar" ? "Loading roadmap..." : "جاري تحميل الخارطة..." })
    ] });
  }
  const safeUserData = userData || {
    xp: 0,
    level: 1,
    completedLessons: []
  };
  const userLevel = safeUserData.level || 1;
  const userXp = safeUserData.xp || 0;
  const completedLessons = safeUserData.completedLessons || [];
  const getLevelNodes = (lvl) => {
    const list = [];
    lvl.lessons.forEach((l) => {
      list.push({
        type: "vocabulary",
        id: l.id,
        titleEn: l.titleEn,
        titleAr: l.titleAr,
        icon: l.icon,
        xpReward: l.xpReward,
        lesson: l
      });
    });
    return list;
  };
  const allFlatNodes = learningPath.flatMap(
    (lvl) => getLevelNodes(lvl).map((node) => ({ ...node, level: lvl }))
  );
  const getNodeStatus = (nodeId, level) => {
    const isLevelUnlocked = userXp >= level.requiredXp;
    if (!isLevelUnlocked) return "locked";
    const flatIndex = allFlatNodes.findIndex((n) => n.id === nodeId);
    if (flatIndex === 0) {
      return completedLessons.includes(nodeId) ? "completed" : "active";
    }
    if (completedLessons.includes(nodeId)) {
      return "completed";
    }
    const prevNode = allFlatNodes[flatIndex - 1];
    const isPrevCompleted = completedLessons.includes(prevNode.id);
    return isPrevCompleted ? "active" : "locked";
  };
  const dueReviewsCount = filterReviewableIds(getDueItems((userData == null ? void 0 : userData.reviewDeck) || {}).map((d) => d.id)).length;
  const mistakesCount = filterReviewableIds((userData == null ? void 0 : userData.wrongAnswersHistory) || []).length;
  const hasPracticeActivity = completedLessons.length > 0 || mistakesCount > 0 || Object.keys((userData == null ? void 0 : userData.reviewDeck) || {}).length > 0 || Object.keys((userData == null ? void 0 : userData.gameScores) || {}).length > 0;
  const showLevelPractice = completedLessons.length > 0;
  const handleNodeLaunch = (node) => {
    if (!node) return;
    setSelectedNode(null);
    navigate(`/quiz/${node.id}`);
  };
  const handleResetProgress = async () => {
    if (window.confirm(language !== "ar" ? "Are you sure you want to reset all your learning path completions? Your XP will remain safe." : "هل أنت متأكد من أنك تود تصفير محصلة تقدم الدروس المكتملة؟ نقاط خبرتك الإجمالية ستبقى آمنة.")) {
      await updateUserData({ completedLessons: [] });
    }
  };
  const handleNodeClick = (node, level) => {
    const status = getNodeStatus(node.id, level);
    if (status === "locked") {
      return;
    }
    setSelectedNode({ ...node, level });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-slate-50 dark:bg-slate-950 p-4 pb-24 text-slate-800 dark:text-slate-100 font-sans leading-relaxed selection:bg-indigo-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3 mb-4 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-900 dark:text-white leading-none font-display", children: language !== "ar" ? "Quest Trail" : "خريطة التعلم التفاعلية" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-3.5 h-3.5 text-indigo-500 animate-spin", style: { animationDuration: "6s" } }),
          language !== "ar" ? "Complete vocabulary lessons & milestones" : "أنهِ الدروس والوحدات التفاعلية كالمحترفين"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleResetProgress,
          className: "min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer border-none bg-transparent",
          title: language !== "ar" ? "Reset Progress" : "إعادة تعيين التقدم",
          "aria-label": language !== "ar" ? "Reset Progress" : "إعادة تعيين التقدم",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-flat mb-6 border border-line-soft relative overflow-hidden group max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "absolute right-[-40px] bottom-[-40px] w-48 h-48 opacity-[0.06] text-slate-500 transform rotate-12 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] font-black px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap inline-block", children: language !== "ar" ? "Kurdish Quest Scholar" : "أكاديمية اللغة الكوردية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black mt-1.5 leading-tight tracking-tight text-ink", children: (user == null ? void 0 : user.displayName) || (userXp > 305 ? "Academic Scholar" : "Kurdish Learner") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 text-xs font-extrabold items-center bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/50 px-3 py-1.5 rounded-full shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-orange-500 fill-orange-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            userData.streak || 0,
            " ",
            language !== "ar" ? "Day Streak" : "أيام متتالية"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5 pt-3 border-t border-line relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface-2 p-2.5 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted uppercase font-black block", children: language !== "ar" ? "Rank XP" : "نقاط الخبرة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-[#B8860B] dark:text-[#FFCE6B] flex items-center justify-center gap-1 font-mono pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-current" }),
            userXp
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface-2 p-2.5 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted uppercase font-black block", children: language !== "ar" ? "Completed" : "أنهيت" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 font-mono pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
            completedLessons.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface-2 p-2.5 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted uppercase font-black block", children: language !== "ar" ? "Level" : "المستوى" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1 font-mono pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3.5 h-3.5" }),
            userLevel
          ] })
        ] })
      ] })
    ] }),
    hasPracticeActivity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 mb-6 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black text-ink px-1 uppercase tracking-wider", children: language !== "ar" ? "Smart Review" : "المراجعة الذكية" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            onClick: () => navigate("/quiz/srs_review"),
            whileHover: { scale: 1.01 },
            whileTap: { scale: 0.99 },
            className: cn(
              "border-2 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-2xs cursor-pointer transition-all relative overflow-hidden",
              dueReviewsCount > 0 ? "bg-surface-2 border-brand/50 hover:border-brand" : "bg-surface border-line hover:border-line-soft"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
                  "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border-2",
                  dueReviewsCount > 0 ? "bg-brand/10 text-brand border-brand/30" : "bg-surface-2 text-muted border-line"
                ), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-black text-ink truncate", children: language !== "ar" ? "Spaced Reviews" : "المراجعة المتباعدة" }),
                    dueReviewsCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-[10px] font-black bg-brand text-on-brand rounded-full", children: dueReviewsCount })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted font-medium truncate mt-0.5", children: dueReviewsCount > 0 ? language !== "ar" ? `${dueReviewsCount} ${dueReviewsCount === 1 ? "word" : "words"} due today` : `${dueReviewsCount} كلمة بحاجة للمراجعة` : language !== "ar" ? "All reviews completed" : "تمت جميع مراجعات اليوم" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-muted shrink-0 rtl:-scale-x-100" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            onClick: () => navigate("/quiz/review_mistakes"),
            whileHover: { scale: 1.01 },
            whileTap: { scale: 0.99 },
            className: cn(
              "border-2 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-2xs cursor-pointer transition-all relative overflow-hidden",
              mistakesCount > 0 ? "bg-surface-2 border-warning/50 hover:border-warning" : "bg-surface border-line hover:border-line-soft"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
                  "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border-2",
                  mistakesCount > 0 ? "bg-warning/10 text-warning border-warning/30" : "bg-surface-2 text-muted border-line"
                ), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-black text-ink truncate", children: language !== "ar" ? "Fix Mistakes" : "معالجة الأخطاء" }),
                    mistakesCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-[10px] font-black bg-warning text-black rounded-full", children: mistakesCount })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted font-medium truncate mt-0.5", children: mistakesCount > 0 ? language !== "ar" ? `${mistakesCount} weak ${mistakesCount === 1 ? "point" : "points"} logged` : `${mistakesCount} نقاط تحتاج للتركيز` : language !== "ar" ? "No mistake backlog" : "سجل أخطائك نظيف" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-muted shrink-0 rtl:-scale-x-100" })
            ]
          }
        ),
        showLevelPractice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            onClick: () => navigate("/quiz/adaptive_practice"),
            whileHover: { scale: 1.01 },
            whileTap: { scale: 0.99 },
            className: "sm:col-span-2 border-2 border-brand/50 hover:border-brand bg-surface-2 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-2xs cursor-pointer transition-all relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border-2 bg-brand/10 text-brand border-brand/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-black text-ink truncate", children: t(language, "quiz_mode_adaptive_title") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-[10px] font-black bg-brand text-on-brand rounded-full", children: getAdaptiveLevelId(userData) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted font-medium truncate mt-0.5", children: t(language, "quiz_mode_adaptive_desc") })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-muted shrink-0 rtl:-scale-x-100" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12 max-w-3xl mx-auto pt-2", children: learningPath.map((lvl, lvlIdx) => {
      const isLvlUnlocked = userXp >= lvl.requiredXp;
      const levelNodes = getLevelNodes(lvl);
      const mapHeight = levelNodes.length * 110;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800/80 rounded-[36px] shadow-sm p-6 hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-[24px] bg-gradient-to-r ${lvl.color} text-white relative overflow-hidden group mb-4 shadow-sm`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "absolute right-[-10px] bottom-[-10px] w-20 h-20 opacity-10 text-white select-none pointer-events-none group-hover:scale-110 transition-transform duration-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] bg-white/20 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider", children: language !== "ar" ? `WORLD 0${lvlIdx + 1}` : `العالم 0${lvlIdx + 1}` }),
                isLvlUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-amber-300 font-black tracking-wide bg-black/15 px-2 py-0.5 rounded-md flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-2.5 h-2.5" }),
                  language !== "ar" ? "ACTIVE REGION" : "إقليم نشط"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black mt-2 leading-tight tracking-tight", children: lvl.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/80 mt-1 leading-snug font-semibold", children: language !== "ar" ? lvl.descEn : lvl.descAr })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative max-w-[400px] w-full mx-auto select-none mt-4 transition-all",
                style: { height: `${mapHeight}px` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: "absolute inset-0 w-full h-full pointer-events-none z-0",
                      viewBox: `0 0 400 ${mapHeight}`,
                      preserveAspectRatio: "none",
                      children: levelNodes.map((node, idx) => {
                        if (idx === 0) return null;
                        const prevOffset = Math.sin((idx - 1) * 1.55) * 110;
                        const prevX = 200 + prevOffset;
                        const prevY = (idx - 1) * 110 + 55;
                        const currOffset = Math.sin(idx * 1.55) * 110;
                        const currX = 200 + currOffset;
                        const currY = idx * 110 + 55;
                        const currentStatus = getNodeStatus(node.id, lvl);
                        let strokeColor = "stroke-slate-200 dark:stroke-slate-800";
                        let strokeDash = "6,6";
                        let strokeWidth = 5;
                        if (currentStatus === "completed") {
                          strokeColor = "stroke-emerald-400 dark:stroke-emerald-500";
                          strokeDash = "0";
                          strokeWidth = 6;
                        } else if (currentStatus === "active") {
                          strokeColor = "stroke-indigo-400 dark:stroke-indigo-500";
                          strokeDash = "4,4";
                          strokeWidth = 5;
                        }
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: `M ${prevX} ${prevY} C ${prevX} ${prevY + 55}, ${currX} ${currY - 55}, ${currX} ${currY}`,
                            fill: "none",
                            className: `${strokeColor} transition-all duration-300`,
                            strokeWidth,
                            strokeDasharray: strokeDash,
                            strokeLinecap: "round"
                          },
                          `line-${node.id}`
                        );
                      })
                    }
                  ),
                  levelNodes.map((node, idx) => {
                    const status = getNodeStatus(node.id, lvl);
                    const isCompleted = status === "completed";
                    const isActive = status === "active";
                    const isLocked = status === "locked";
                    const offset = Math.sin(idx * 1.55) * 110;
                    const leftOffset = `calc(50% + ${offset}px)`;
                    const topOffset = `${idx * 110 + 23}px`;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute transform -translate-x-1/2 z-10",
                        style: { left: leftOffset, top: topOffset },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.button,
                          {
                            id: `roadmap-node-${node.id}`,
                            "aria-label": isLocked ? `${language !== "ar" ? node.titleEn || node.id : node.titleAr || node.id} (${language !== "ar" ? "locked" : "مقفل"})` : language !== "ar" ? `${node.titleEn || node.id}${isCompleted ? " — completed" : " — start lesson"}` : `${node.titleAr || node.id}${isCompleted ? " — مكتمل" : " — ابدأ الدرس"}`,
                            whileHover: { scale: !isLocked ? 1.08 : 1 },
                            whileTap: { scale: !isLocked ? 0.95 : 1 },
                            onClick: () => handleNodeClick(node, lvl),
                            className: `w-16 h-16 flex items-center justify-center relative transition-all focus:outline-none cursor-pointer rounded-full border-4 ${isCompleted ? "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500 border-white dark:border-slate-800 text-white shadow-emerald-500/10" : isActive ? "bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 border-white dark:border-slate-800 text-white ring-4 ring-indigo-500/15 shadow-indigo-600/20" : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 cursor-default grayscale"} shadow-lg`,
                            children: [
                              isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-indigo-500/30 rounded-full animate-ping -z-10 scale-[1.35]" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse -z-10 scale-[1.15]" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -bottom-5 text-center flex justify-center rotate-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black bg-indigo-600 text-white rounded-full px-2 py-0.5 border border-white dark:border-indigo-400 uppercase tracking-widest leading-none shadow-md animate-bounce transform rotate-0 block select-none", children: language !== "ar" ? "PLAY" : "ابدأ" }) })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${isLocked ? "opacity-40" : "opacity-100"} flex justify-center items-center select-none`, children: renderIcon(node.icon) }),
                              isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -top-1 -end-1 rounded-full p-0.5 border-2 border-white dark:border-slate-900 shadow-md bg-emerald-500 text-white`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 stroke-3" }) }),
                              isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -top-1 -end-1 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full p-1 border-2 border-slate-300 dark:border-slate-700 shadow-sm`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }) })
                            ]
                          }
                        )
                      },
                      node.id
                    );
                  })
                ]
              }
            ),
            !isLvlUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-slate-900/65 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 z-20 rounded-[34px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-slate-950/90 text-slate-400 rounded-3xl flex items-center justify-center border border-slate-800 shadow-lg mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 stroke-[2.5]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-white text-base tracking-tight select-none", children: language !== "ar" ? `${lvl.id} Island Locked` : `${lvl.id} عالم مغلق` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-[11px] mt-1 font-semibold max-w-[240px] select-none leading-relaxed", children: language !== "ar" ? `Amass ${lvl.requiredXp} XP in primary lesson paths to unlock this adventure island!` : `جمّع ${lvl.requiredXp} نقطة خبرة لرفع مرتبتك وصياغة هذا العالم!` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 px-4 py-2 bg-white/20 text-yellow-300 font-extrabold uppercase tracking-widest font-mono text-[9px] select-none rounded-xl border border-white/5", children: language !== "ar" ? `LOCK LIMIT: ${lvl.requiredXp} XP` : `المطلوب: ${lvl.requiredXp} خبرة` })
            ] })
          ]
        },
        lvl.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedNode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setSelectedNode(null),
          className: "absolute inset-0"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { y: "100%", opacity: 0.5 },
          animate: { y: 0, opacity: 1 },
          exit: { y: "100%", opacity: 0.5 },
          transition: { type: "spring", damping: 25, stiffness: 220 },
          className: "bg-white dark:bg-slate-950 w-full max-w-md rounded-t-[36px] sm:rounded-[36px] overflow-hidden shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800 flex flex-col max-h-[92vh]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-8 bg-gradient-to-br ${selectedNode.level.color} text-white text-center relative flex flex-col items-center justify-center border-b border-white/10 shrink-0`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setSelectedNode(null),
                  className: "absolute top-4 end-4 p-2.5 bg-black/15 hover:bg-black/25 text-white rounded-full transition-all cursor-pointer border-none",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-20 h-20 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center flex justify-center items-center shadow-md border border-white/10 animate-bounce`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: renderIcon(selectedNode.icon) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-white/20 text-white font-black px-2.5 py-1 rounded-full uppercase tracking-wider", children: selectedNode.level.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black mt-2 leading-none tracking-tight", children: language !== "ar" ? selectedNode.titleEn : selectedNode.titleAr })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 overflow-y-auto space-y-4 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest", children: language !== "ar" ? "Adventure Syllabus" : "منهاج التدريب" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-300 text-xs font-semibold leading-relaxed mt-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl", children: language !== "ar" ? (_a = selectedNode.lesson) == null ? void 0 : _a.descEn : (_b = selectedNode.lesson) == null ? void 0 : _b.descAr })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50/50 dark:bg-amber-950/15 border border-amber-100/50 dark:border-amber-900/30 rounded-2xl p-3 flex flex-col justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 dark:text-slate-400 font-bold block mb-1", children: language !== "ar" ? "Base Rewards" : "النقاط الأساسية" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-amber-600 dark:text-amber-400 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-amber-500 fill-current" }),
                    "+",
                    selectedNode.xpReward,
                    " XP"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl p-3 flex flex-col justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 dark:text-slate-400 font-bold block mb-1", children: language !== "ar" ? "Questions Pool" : "عدد الأسئلة والجهد" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1 text-[11px] truncate", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-4 h-4 text-indigo-500" }),
                    (() => {
                      var _a2;
                      const levelId = ((_a2 = selectedNode.level) == null ? void 0 : _a2.id) || "A1";
                      if (levelId === "A1") return language !== "ar" ? "5 Qs (A1 Easy)" : "5 أسئلة (A1 سهل)";
                      if (levelId === "A2") return language !== "ar" ? "7 Qs (A2 Casual)" : "7 أسئلة (A2 متوسط)";
                      if (levelId === "B1") return language !== "ar" ? "8 Qs (B1 Medium)" : "8 أسئلة (B1 مهارة)";
                      if (levelId === "B2") return language !== "ar" ? "10 Qs (B2 Hard)" : "10 أسئلة (B2 متقدم)";
                      if (levelId === "Advanced") return language !== "ar" ? "12 Qs (C1 Expert)" : "12 سؤال متمكن (C1)";
                      return language !== "ar" ? "7 Qs (Normal)" : "7 أسئلة";
                    })()
                  ] })
                ] })
              ] }),
              // Targeted Vocabulary Checklist preview
              // Targeted Vocabulary Checklist preview
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest", children: language !== "ar" ? "Preview Lexicon Words" : "المفردات التأسيسية المدرجة" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto pr-1", children: (_c = selectedNode.lesson) == null ? void 0 : _c.words.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between items-center p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-indigo-200 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl select-none", children: w.emoji }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-sm text-slate-900 dark:text-white leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: w.ku }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 leading-none", children: language !== "ar" ? w.en : w.ar })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AudioButton,
                        {
                          audioUrl: w.audio,
                          textToSpeak: w.ku,
                          className: "bg-indigo-50/70 hover:bg-indigo-100/80 dark:bg-slate-800 p-2 text-indigo-600 hover:text-indigo-700",
                          iconClassName: "w-4 h-4",
                          showProgress: false
                        }
                      )
                    ]
                  },
                  w.id
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => handleNodeLaunch(selectedNode),
                className: "w-full py-4.5 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 transition-all border-none bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:shadow-indigo-600/20 shadow-indigo-600/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current text-indigo-100" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Start Active Quiz!" : "ابدأ تدريب الوحدة التفاعلية!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rtl:rotate-180" })
                ]
              }
            ) })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  Roadmap
};
