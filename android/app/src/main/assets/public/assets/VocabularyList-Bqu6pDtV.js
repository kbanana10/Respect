import { r as reactExports, R as React, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { d as useParams, u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { c as categories, v as vocabulary } from "./kurmanji-DANKPvwI.js";
import { u as useAuth, b as academicCategories, a as academicVocabulary, A as AudioButton, t, c as cn, d as tLevel, N as NUMBER_FAMILY_HISTORY_STATE } from "./index-C4ml4lrv.js";
import { R as RecallButton } from "./RecallButton-DT4xUp_8.js";
import { u as useFavorites } from "./useFavorites-CTXFeMsV.js";
import { c as categorySubjectAccent } from "./subjectAccents-Ctlc_nEP.js";
import { A as AnimatePresence, m as motion } from "./vendor-motion-D8-S3eer.js";
import { o as Users, l as Sparkles, v as ChevronRight, X, w as Check, a5 as Play, A as ArrowLeft, p as BookOpen, ai as ChevronUp, aj as ChevronDown, c as Search, ak as Funnel, d as Heart, a3 as PenTool, a6 as FileSpreadsheet, a7 as Microscope, a8 as FlaskConical, a9 as Atom, aa as Laptop, ab as Ruler, ac as School, ad as Building2, ae as Backpack, af as Calendar, Y as House, ag as Apple, ah as Cat, a0 as Palette, $ as Binary, al as Dog, am as Bird, an as Fish, ao as Bug, t as Coffee, I as Clock, ap as ClipboardList, aq as Eraser, ar as Scissors, as as Calculator, J as Library, j as Compass, at as Key, G as GraduationCap, au as UserCheck, av as ShieldCheck, i as Award, q as Briefcase, aw as FileText, B as Bell, ax as Presentation, ay as Table, az as Armchair, aA as PanelsTopLeft, M as Map, aB as Lightbulb, aC as Plus, aD as Minus, aE as Percent, Z as Zap, aF as Activity, aG as Code, aH as Cpu, aI as Network, aJ as Database, aK as Lock, aL as Folder, aM as Printer, aN as Terminal, aO as Mail, aP as ShieldAlert, aQ as Keyboard, aR as MousePointer, aS as Workflow, aT as Scale, aU as TrendingUp, V as Volume2, aV as ArrowDown, aW as Wind, aX as Droplet, aY as Box, aZ as Grid3x3, F as Flame, a_ as Dna, a$ as Brain, U as User, b0 as Eye, m as Smile, f as Sun, x as Globe, b1 as CircleQuestionMark, b2 as SquareCheckBig, N as RefreshCw, T as Trophy } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
import "./SpacedRepetitionService-DkhvYl5r.js";
const NUMBER_FAMILY_HOOK = "number-family";
function pushFamilyHistoryEntry() {
  var _a;
  const h = (_a = globalThis.window) == null ? void 0 : _a.history;
  if (!h) return;
  const prev = h.state;
  const prevIdx = prev && typeof prev === "object" && "idx" in prev ? prev.idx : void 0;
  const idx = (typeof prevIdx === "number" && Number.isInteger(prevIdx) ? prevIdx : 0) + 1;
  const key = Math.random().toString(36).substring(2, 10);
  const state = { usr: NUMBER_FAMILY_HISTORY_STATE, key, idx };
  try {
    h.pushState(state, "", globalThis.window ? globalThis.window.location.href : "");
  } catch {
    h.pushState(null, "", globalThis.window ? globalThis.window.location.href : "");
  }
}
function renderNumberDigit(word) {
  const id = (word == null ? void 0 : word.id) || "";
  const lowerEn = ((word == null ? void 0 : word.en) || "").toLowerCase().trim();
  if (id === "n0" || lowerEn === "zero") return "0";
  if (id === "n1" || lowerEn === "one") return "1";
  if (id === "n2" || lowerEn === "two") return "2";
  if (id === "n3" || lowerEn === "three") return "3";
  if (id === "n4" || lowerEn === "four") return "4";
  if (id === "n5" || lowerEn === "five") return "5";
  if (id === "n6" || lowerEn === "six") return "6";
  if (id === "n7" || lowerEn === "seven") return "7";
  if (id === "n8" || lowerEn === "eight") return "8";
  if (id === "n9" || lowerEn === "nine") return "9";
  if (id === "n10" || lowerEn === "ten") return "10";
  if (id === "n20" || lowerEn === "twenty") return "20";
  if (id === "n30" || lowerEn === "thirty") return "30";
  if (id === "n40" || lowerEn === "forty") return "40";
  if (id === "n50" || lowerEn === "fifty") return "50";
  if (id === "n60" || lowerEn === "sixty") return "60";
  if (id === "n70" || lowerEn === "seventy") return "70";
  if (id === "n80" || lowerEn === "eighty") return "80";
  if (id === "n90" || lowerEn === "ninety") return "90";
  if (id === "n100" || lowerEn === "one hundred" || lowerEn === "hundred") return "100";
  if (id === "n1000" || lowerEn === "thousand" || lowerEn === "one thousand") return "1,000";
  if (id === "n10000" || lowerEn === "ten thousand") return "10,000";
  if (id === "n100000" || lowerEn === "hundred thousand" || lowerEn === "one hundred thousand") return "100,000";
  if (id === "n1000000" || lowerEn === "million" || lowerEn === "one million") return "1M";
  if (id === "n1000000000" || lowerEn === "billion" || lowerEn === "one billion") return "1B";
  if (id === "n1000000000000" || lowerEn === "trillion" || lowerEn === "one trillion") return "1T";
  const idMatch = /^n(\d+)$/.exec(id);
  if (idMatch) return idMatch[1];
  const textMatch = lowerEn.match(/\d+/);
  return textMatch ? textMatch[0] : "#";
}
function renderCompactNumberDigit(word) {
  const dig = renderNumberDigit(word);
  if (dig === "1,000") return "1K";
  if (dig === "10,000") return "10K";
  if (dig === "100,000") return "100K";
  return dig;
}
function colorSwatchClass(word) {
  const lowerEn = ((word == null ? void 0 : word.en) || "").toLowerCase().trim();
  const colorClasses = {
    "red": "bg-red-500 border-red-600",
    "blue": "bg-blue-500 border-blue-600",
    "green": "bg-emerald-500 border-emerald-600",
    "yellow": "bg-amber-400 border-amber-500",
    "black": "bg-slate-950 border-slate-900",
    // PHASE 3 (contrast): a white swatch disappears on the white card in
    // light mode — give it a clearly visible neutral outline (`border-slate-400`,
    // NOT the soft `border-slate-300` remapped to the near-invisible `--kq-border`).
    "white": "bg-white border-slate-400 dark:border-slate-500",
    "grey": "bg-slate-400 border-slate-500",
    "gray": "bg-slate-400 border-slate-500",
    "brown": "bg-amber-800 border-amber-900",
    "pink": "bg-pink-400 border-pink-500",
    "purple": "bg-purple-600 border-purple-700",
    "orange": "bg-orange-500 border-orange-600"
  };
  return colorClasses[lowerEn] || "bg-gradient-to-br from-indigo-500 to-purple-500";
}
const getWordIcon = (word, className = "w-6 h-6 text-indigo-600 dark:text-indigo-400") => {
  if (!word) return /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className });
  const lowerEn = (word.en || "").toLowerCase().trim();
  const id = word.id || "";
  const emoji = word.emoji || "";
  if (word.categoryId === "numbers" || id.startsWith("n")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black tracking-tighter text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded-md min-w-[20px] text-center", children: renderNumberDigit(word) });
  }
  if (word.categoryId === "colors") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-5 h-5 rounded-full border shadow-sm shrink-0 ${colorSwatchClass(word)}` });
  }
  if (lowerEn === "dog") return /* @__PURE__ */ jsxRuntimeExports.jsx(Dog, { className });
  if (lowerEn === "cat") return /* @__PURE__ */ jsxRuntimeExports.jsx(Cat, { className });
  if (lowerEn === "bird") return /* @__PURE__ */ jsxRuntimeExports.jsx(Bird, { className });
  if (lowerEn === "fish") return /* @__PURE__ */ jsxRuntimeExports.jsx(Fish, { className });
  if (lowerEn.includes("bee") || lowerEn.includes("ant") || lowerEn.includes("butterfly") || lowerEn.includes("fly") || lowerEn.includes("mosquito") || lowerEn.includes("spider") || word.categoryId === "animals" && word.subCategoryId === "insects") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className });
  }
  if (word.categoryId === "animals") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className });
  }
  if (lowerEn === "coffee" || lowerEn === "tea" || lowerEn === "milk" || lowerEn === "water") return /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { className });
  if (word.categoryId === "food") return /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className });
  if (word.categoryId === "family") return /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className });
  if (word.categoryId === "home") return /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className });
  if (word.categoryId === "time") return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className });
  if (lowerEn === "book" || lowerEn === "textbook" || lowerEn === "dictionary" || lowerEn.includes("pirtûk")) return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className });
  if (lowerEn === "pen" || lowerEn === "pencil" || lowerEn === "marker pen" || lowerEn === "marker") return /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className });
  if (lowerEn === "notebook" || lowerEn === "syllabus" || lowerEn === "curriculum") return /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className });
  if (lowerEn === "school bag" || lowerEn === "bag") return /* @__PURE__ */ jsxRuntimeExports.jsx(Backpack, { className });
  if (lowerEn === "eraser" || lowerEn === "board eraser" || lowerEn === "duster") return /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className });
  if (lowerEn === "ruler") return /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { className });
  if (lowerEn === "scissors") return /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className });
  if (lowerEn === "calculator") return /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className });
  if (lowerEn === "library") return /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className });
  if (lowerEn === "compass" || lowerEn === "compass (drawing)") return /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className });
  if (lowerEn === "key") return /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className });
  if (lowerEn === "university" || lowerEn === "college" || lowerEn === "faculty" || lowerEn.includes("degree") || lowerEn.includes("doctorate") || lowerEn.includes("phd") || lowerEn.includes("bachelor") || lowerEn.includes("master")) return /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className });
  if (lowerEn.includes("professor") || lowerEn.includes("teacher") || lowerEn.includes("instructor")) return /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className });
  if (lowerEn.includes("student") || lowerEn.includes("learner") || lowerEn.includes("group study")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className });
  if (lowerEn.includes("regulation") || lowerEn.includes("rule") || lowerEn.includes("plagiarism")) return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className });
  if (lowerEn.includes("scholarship") || lowerEn.includes("award") || lowerEn.includes("grade") || lowerEn.includes("score")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className });
  if (lowerEn === "internship" || lowerEn === "job" || lowerEn === "work" || lowerEn === "department") return /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className });
  if (lowerEn.includes("research") || lowerEn.includes("study")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className });
  if (lowerEn.includes("thesis") || lowerEn.includes("dissertation") || lowerEn.includes("essay") || lowerEn.includes("article") || lowerEn.includes("file") || lowerEn.includes("document")) return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className });
  if (lowerEn === "bell") return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className });
  if (lowerEn === "whiteboard" || lowerEn === "board") return /* @__PURE__ */ jsxRuntimeExports.jsx(Presentation, { className });
  if (lowerEn === "desk" || lowerEn === "table") return /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { className });
  if (lowerEn === "chair") return /* @__PURE__ */ jsxRuntimeExports.jsx(Armchair, { className });
  if (lowerEn === "window" || lowerEn === "door") return /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { className });
  if (lowerEn === "clock" || lowerEn === "hour" || lowerEn === "time" || lowerEn.includes("semester") || lowerEn.includes("credit")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className });
  if (lowerEn === "map") return /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className });
  if (lowerEn === "light" || lowerEn === "lamp") return /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className });
  if (lowerEn.includes("computer") || lowerEn === "monitor" || lowerEn === "screen" || lowerEn === "projector") return /* @__PURE__ */ jsxRuntimeExports.jsx(Laptop, { className });
  if (lowerEn === "mathematics" || lowerEn === "math" || lowerEn === "algebra" || lowerEn === "calculus" || lowerEn === "statistics" || lowerEn === "number") return /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className });
  if (lowerEn === "addition") return /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className });
  if (lowerEn === "subtraction") return /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className });
  if (lowerEn === "multiplication") return /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className });
  if (lowerEn === "division" || lowerEn === "percentage") return /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className });
  if (lowerEn === "circle" || lowerEn === "square" || lowerEn === "triangle" || lowerEn === "line" || lowerEn === "angle") return /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { className });
  if (lowerEn.includes("power") || lowerEn.includes("exponent")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className });
  if (lowerEn === "equation" || lowerEn === "function" || lowerEn === "integral" || lowerEn === "root") return /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className });
  if (lowerEn === "software" || lowerEn === "code" || lowerEn === "program" || lowerEn === "application" || lowerEn === "website") return /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className });
  if (lowerEn === "hardware" || lowerEn === "cpu" || lowerEn.includes("operating system") || lowerEn === "system") return /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className });
  if (lowerEn === "network" || lowerEn === "internet") return /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className });
  if (lowerEn === "data" || lowerEn === "database") return /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className });
  if (lowerEn === "password") return /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className });
  if (lowerEn === "folder") return /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className });
  if (lowerEn === "print") return /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className });
  if (lowerEn === "developer") return /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className });
  if (lowerEn === "email") return /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className });
  if (lowerEn === "virus") return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className });
  if (lowerEn === "keyboard") return /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard, { className });
  if (lowerEn === "mouse") return /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointer, { className });
  if (lowerEn === "algorithm") return /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className });
  if (lowerEn === "physics" || lowerEn === "atom" || lowerEn === "molecule") return /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className });
  if (lowerEn === "force" || lowerEn === "energy" || lowerEn === "electricity" || lowerEn === "electric power") return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className });
  if (lowerEn === "mass" || lowerEn === "weight") return /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className });
  if (lowerEn === "speed" || lowerEn === "velocity" || lowerEn === "rotation" || lowerEn === "friction" || lowerEn.includes("force")) return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className });
  if (lowerEn === "light" || lowerEn === "temperature" || lowerEn === "thermometer" || lowerEn === "chemical thermometer") return /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className });
  if (lowerEn === "sound" || lowerEn === "wave") return /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className });
  if (lowerEn === "magnet") return /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className });
  if (lowerEn === "gravity") return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className });
  if (lowerEn === "air resistance") return /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className });
  if (lowerEn === "barometer" || lowerEn === "voltmeter" || lowerEn === "ammeter" || lowerEn.includes("meter")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className });
  if (lowerEn === "chemistry" || lowerEn === "chemist" || lowerEn === "laboratory" || lowerEn.includes("test tube") || lowerEn === "beaker" || lowerEn === "tube") return /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className });
  if (lowerEn === "gas") return /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className });
  if (lowerEn === "liquid" || lowerEn === "dissolution") return /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className });
  if (lowerEn === "solid") return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className });
  if (lowerEn === "element" || lowerEn === "periodic table") return /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className });
  if (lowerEn === "compound" || lowerEn === "reaction" || lowerEn === "acid" || lowerEn === "base" || lowerEn === "alkali" || lowerEn === "catalyst" || lowerEn === "chemical bond" || lowerEn === "bond") return /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className });
  if (lowerEn === "electron" || lowerEn === "proton" || lowerEn === "neutron" || lowerEn === "nucleus") return /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className });
  if (lowerEn === "biology" || lowerEn === "biologist" || lowerEn === "microscope") return /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className });
  if (lowerEn === "organism" || lowerEn === "bacteria" || lowerEn === "virus (biological)" || lowerEn === "microbe" || lowerEn.includes("microorganism")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className });
  if (lowerEn === "cell" || lowerEn === "dna" || lowerEn === "gene" || lowerEn === "genetics") return /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className });
  if (lowerEn === "medicine" || lowerEn === "drug" || lowerEn === "vaccine" || lowerEn === "health" || lowerEn === "disease") return /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className });
  if (lowerEn === "blood" || lowerEn === "heart" || lowerEn === "organ" || lowerEn.includes("system") || lowerEn === "nutrients") return /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className });
  if (lowerEn === "brain" || lowerEn.includes("nervous")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className });
  if (lowerEn === "body" || lowerEn === "skin" || lowerEn === "muscle" || lowerEn === "bone") return /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className });
  if (lowerEn === "eye") return /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className });
  if (lowerEn === "ear" || lowerEn === "mouth" || lowerEn === "tooth" || lowerEn === "tongue") return /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className });
  if (lowerEn === "sun" || lowerEn === "photosynthesis") return /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className });
  if (lowerEn === "ecosystem") return /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className });
  if (lowerEn === "exam" || lowerEn === "homework" || lowerEn === "syllabus") return /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className });
  if (lowerEn === "question") return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className });
  if (lowerEn === "answer") return /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className });
  if (lowerEn.includes("admission") || lowerEn.includes("acceptance")) return /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className });
  if (lowerEn.startsWith("to read") || lowerEn.startsWith("to study")) return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className });
  if (lowerEn.startsWith("to write") || lowerEn.startsWith("to draw")) return /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className });
  if (lowerEn.startsWith("to learn")) return /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className });
  if (lowerEn.startsWith("to speak") || lowerEn.startsWith("to listen") || lowerEn.startsWith("to talk")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className });
  if (lowerEn.startsWith("to understand") || lowerEn.startsWith("to memorize")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className });
  if (lowerEn.startsWith("to ask")) return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className });
  if (lowerEn.startsWith("to answer")) return /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className });
  if (lowerEn.startsWith("to see") || lowerEn.startsWith("to watch")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className });
  if (lowerEn.startsWith("to choose") || lowerEn.startsWith("to solve") || lowerEn.startsWith("to correct")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className });
  if (lowerEn.startsWith("to analyze") || lowerEn.startsWith("to research")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className });
  if (lowerEn.startsWith("to collect") || lowerEn.startsWith("to organize")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className });
  if (lowerEn.startsWith("to show") || lowerEn.startsWith("to present")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Presentation, { className });
  if (lowerEn.startsWith("to update") || lowerEn.startsWith("to compare")) return /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className });
  const emojiMap = {
    "📄": Briefcase,
    "🔧": Briefcase,
    "🔟": Zap,
    "💧": Compass,
    "🍞": Apple,
    "🍎": Apple,
    "🥛": Apple,
    "☕": Flame,
    "👨": Users,
    "👩": Users,
    "👧": Users,
    "👦": Users,
    "📚": BookOpen,
    "🏛️": GraduationCap,
    "👨‍🏫": GraduationCap,
    "💻": Laptop,
    "🍽️": Apple,
    "📖": BookOpen,
    "✍️": Palette,
    "🏃": Flame,
    "💡": Lightbulb,
    "🏆": Trophy
  };
  const IconComponent = emojiMap[emoji];
  if (IconComponent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className });
};
const CATEGORY_HERO_ICONS = {
  Binary,
  Palette,
  Cat,
  Apple,
  Users,
  Home: House,
  Calendar,
  Backpack,
  Building2,
  School,
  Ruler,
  Laptop,
  Atom,
  FlaskConical,
  Microscope,
  FileSpreadsheet,
  PenTool
};
const renderCategoryHeroIcon = (iconName) => {
  const IconComponent = CATEGORY_HERO_ICONS[iconName];
  if (IconComponent) return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-8 h-8" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl leading-none", children: iconName });
};
function VocabularyList() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { language, userData } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = reactExports.useState("");
  const [levelFilter, setLevelFilter] = reactExports.useState("all");
  const [activeSubCategory, setActiveSubCategory] = reactExports.useState(categoryId === "numbers" ? "ones" : "all");
  const [focusedId, setFocusedId] = reactExports.useState(null);
  const [expandedFamilyId, setExpandedFamilyId] = reactExports.useState(null);
  const [isAdvancedOpen, setIsAdvancedOpen] = reactExports.useState(false);
  const [controlsExpanded, setControlsExpanded] = reactExports.useState(true);
  const suppressNextPopRef = React.useRef(false);
  const isAcademic = academicCategories.some((c) => c.id === categoryId);
  const category = isAcademic ? academicCategories.find((c) => c.id === categoryId) : categories.find((c) => c.id === categoryId);
  const isNumbers = categoryId === "numbers";
  const isColors = categoryId === "colors";
  const isSubjectLayout = isNumbers || isColors;
  const baseWords = isAcademic ? academicVocabulary.filter((w) => w.categoryId === categoryId) : vocabulary.filter((w) => w.categoryId === categoryId);
  const reviewDeck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
  const isWordLearned = (id) => {
    const item = reviewDeck[id];
    return !!item && item.repetitions > 0;
  };
  const subCategoriesConfig = {
    animals: [
      { id: "all", en: "All", ar: "الكل" },
      { id: "animals", en: "Animals", ar: "الحيوانات" },
      { id: "insects", en: "Insects", ar: "الحشرات" }
    ],
    food: [
      { id: "all", en: "All", ar: "الكل" },
      { id: "food", en: "Food & Meals", ar: "الأطعمة والوجبات" },
      { id: "vegetables", en: "Vegetables", ar: "الخضروات" },
      { id: "fruits", en: "Fruits", ar: "الفواكه" }
    ],
    time: [
      { id: "all", en: "All", ar: "الكل" },
      { id: "temporal", en: "Time Units", ar: "الوحدات الزمنية والفترات" },
      { id: "days", en: "Days of the Week", ar: "أيام الأسبوع" }
    ]
  };
  const practiceWords = baseWords;
  const words = isAcademic ? practiceWords.filter((w) => {
    if (!w) return false;
    const ku = w.ku || "";
    const en = w.en || "";
    const ar = w.ar || "";
    const matchesSearch = ku.toLowerCase().includes(search.toLowerCase()) || en.toLowerCase().includes(search.toLowerCase()) || ar.includes(search);
    const matchesLevel = levelFilter === "all" || w.level === levelFilter;
    return matchesSearch && matchesLevel;
  }) : practiceWords.filter((w) => {
    if (!w) return false;
    const ku = w.ku || "";
    const en = w.en || "";
    const ar = w.ar || "";
    const matchesSearch = ku.toLowerCase().includes(search.toLowerCase()) || en.toLowerCase().includes(search.toLowerCase()) || ar.includes(search);
    const effectiveGroup = categoryId === "numbers" ? "all" : activeSubCategory;
    const matchesSubCategory = effectiveGroup === "all" || w.subCategoryId === effectiveGroup;
    return matchesSearch && matchesSubCategory;
  });
  if (!category) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-slate-500 font-black", children: language !== "ar" ? "Category not found" : "لم يتم العثور على التصنيف المحدد" });
  const subjectAccent = categorySubjectAccent(categoryId);
  const headerBadge = isAcademic ? language !== "ar" ? "ACADEMIC PATH" : "المسار الأكاديمي" : isNumbers ? language !== "ar" ? "NUMBERS" : "الأرقام" : isColors ? language !== "ar" ? "COLORS" : "الألوان" : language !== "ar" ? "VOCABULARY UNIT" : "وحدة الكلمات";
  const categoryView = category;
  const categoryName = isAcademic ? language !== "ar" ? categoryView.nameEn : categoryView.nameAr : language !== "ar" ? categoryView.name : categoryView.ar || categoryView.name;
  const ROUND_TEN_SUBGROUPS = [
    { id: "teens", value: "10" },
    { id: "twenties", value: "20" },
    { id: "thirties", value: "30" },
    { id: "forties", value: "40" },
    { id: "fifties", value: "50" },
    { id: "sixties", value: "60" },
    { id: "seventies", value: "70" },
    { id: "eighties", value: "80" },
    { id: "nineties", value: "90" }
  ];
  const openFamilyItem = expandedFamilyId ? words.find((w) => w.id === expandedFamilyId) ?? null : null;
  const digitOf = (w) => w ? renderNumberDigit(w) : "";
  const familyAnchorGroup = (w) => {
    if (!w) return "";
    const sub = w.subCategoryId ?? "";
    if (sub === "ones" || sub === "hundred") return sub;
    const group = ROUND_TEN_SUBGROUPS.find((g) => g.id === sub);
    return group ? group.id : "";
  };
  const familyRootWord = isNumbers ? (w) => {
    if (!w) return null;
    if (!ROUND_TEN_SUBGROUPS.some((g) => g.id === (w.subCategoryId ?? ""))) return null;
    const digit = Number(digitOf(w));
    if (!Number.isFinite(digit) || digit < 10 || digit > 90 || digit % 10 !== 0) return null;
    return w;
  } : () => null;
  const openFamilyRoot = isNumbers ? familyRootWord(openFamilyItem) : null;
  const expandedGroup = isNumbers ? familyAnchorGroup(openFamilyRoot) : "";
  const LARGE_NUMBER_SUBGROUP = "hundreds";
  const largeNumbers = isNumbers ? words.filter((w) => (w.subCategoryId ?? "") === LARGE_NUMBER_SUBGROUP) : [];
  const masterNumbers = isNumbers ? words.filter((w) => w.subCategoryId === "ones" || w.subCategoryId === "hundred" || familyRootWord(w) !== null) : [];
  const familyWords = isNumbers && openFamilyRoot ? words.filter((w) => (w.subCategoryId ?? "") === expandedGroup) : [];
  const isFamilyExpanded = isNumbers && familyRootWord(openFamilyItem) !== null;
  const isAdvancedExpanded = isNumbers && isAdvancedOpen;
  const subjectGridWords = !isSubjectLayout ? [] : isNumbers ? masterNumbers : words;
  const focusedWord = isSubjectLayout ? words.find((w) => w.id === focusedId) ?? (openFamilyRoot ? familyWords[0] : isAdvancedOpen ? largeNumbers[0] ?? null : subjectGridWords[0]) ?? null : null;
  const focusCanOpenFamily = isNumbers && !isAdvancedOpen && familyRootWord(focusedWord) !== null;
  const overlayOpen = isFamilyExpanded || isAdvancedExpanded;
  reactExports.useEffect(() => {
    if (!isNumbers || !expandedFamilyId) return;
    const raf = requestAnimationFrame(() => {
      var _a;
      (_a = document.getElementById(NUMBER_FAMILY_HOOK)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => cancelAnimationFrame(raf);
  }, [isNumbers, expandedFamilyId]);
  reactExports.useEffect(() => {
    var _a;
    if (!isNumbers) return;
    const onPop = () => {
      requestAnimationFrame(() => {
        if (suppressNextPopRef.current) {
          suppressNextPopRef.current = false;
          return;
        }
        if (expandedFamilyId || isAdvancedOpen) {
          setExpandedFamilyId(null);
          setIsAdvancedOpen(false);
          setFocusedId(null);
        }
      });
    };
    (_a = globalThis.window) == null ? void 0 : _a.addEventListener("popstate", onPop);
    return () => {
      var _a2;
      return (_a2 = globalThis.window) == null ? void 0 : _a2.removeEventListener("popstate", onPop);
    };
  }, [isNumbers, expandedFamilyId, isAdvancedOpen]);
  if (isSubjectLayout) {
    const accent = subjectAccent ?? {
      well: "bg-indigo-100 dark:bg-indigo-950/50",
      icon: "text-indigo-600 dark:text-indigo-400"
    };
    const solidCta = isNumbers ? "bg-sky-500 hover:bg-sky-600 shadow-sky-500/20" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20";
    const focusTone = isNumbers ? "text-sky-700 dark:text-sky-300" : "text-emerald-700 dark:text-emerald-300";
    const focusBorder = isNumbers ? "border-sky-500 dark:border-sky-400" : "border-emerald-500 dark:border-emerald-400";
    const plaqueTone = isNumbers ? "bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/50" : "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50";
    const sectionLabel = isNumbers ? language === "ar" ? "الأرقام" : language === "ku" ? "Jimar" : "Numbers" : language === "ar" ? "الألوان" : language === "ku" ? "Reng" : "Colors";
    const familyCtaWord = language === "ar" ? "عائلة" : language === "ku" ? "Malbata" : "Family of";
    const familyAnchor = digitOf(openFamilyRoot);
    const familyLabel = isNumbers && openFamilyRoot ? `${familyCtaWord} ${familyAnchor}` : "";
    const backToAllLabel = isNumbers ? language === "ar" ? "عرض كل الأرقام" : language === "ku" ? "Hemû jimar" : "All numbers" : "";
    const advancedOpen = isNumbers && isAdvancedOpen;
    const advancedLabel = language === "ar" ? "أعداد كبيرة" : language === "ku" ? "Jimarên Mezin" : "Large numbers";
    const advancedCtaWord = language === "ar" ? "تعلّم المزيد" : language === "ku" ? "Bêtir Fêr Bibe" : "Learn more";
    const openFamily = (id) => {
      setFocusedId(id);
      setIsAdvancedOpen(false);
      setExpandedFamilyId(id);
      pushFamilyHistoryEntry();
    };
    const openAdvanced = () => {
      var _a;
      setExpandedFamilyId(null);
      setIsAdvancedOpen(true);
      setFocusedId(((_a = largeNumbers[0]) == null ? void 0 : _a.id) ?? null);
      pushFamilyHistoryEntry();
    };
    const closeFamily = () => {
      var _a;
      setExpandedFamilyId(null);
      setIsAdvancedOpen(false);
      setFocusedId(null);
      if (expandedFamilyId || isAdvancedOpen) {
        suppressNextPopRef.current = true;
        if (((_a = globalThis.window) == null ? void 0 : _a.history) && globalThis.window.history.length > 1) {
          globalThis.window.history.back();
        }
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-[2rem] p-8 text-center mb-6 relative overflow-hidden shadow-flat flex-shrink-0 border border-line-soft group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -top-16 h-48 bg-[radial-gradient(circle_at_50%_0%,#FFB300_0%,transparent_65%)] opacity-[0.10] pointer-events-none", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 end-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudioButton,
          {
            audioUrl: focusedWord == null ? void 0 : focusedWord.audio,
            textToSpeak: focusedWord == null ? void 0 : focusedWord.ku,
            className: `${accent.well} ${accent.icon} border border-line-soft hover:opacity-90 cursor-pointer shadow-sm`,
            iconClassName: "w-5 h-5",
            showProgress: false
          }
        ) }),
        focusedWord && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9, y: 5 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.9, y: -5 },
            transition: { duration: 0.2 },
            className: "flex flex-col items-center",
            children: [
              isNumbers ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${focusTone} font-black text-8xl transition-all duration-300 tracking-tight font-display select-none leading-none tabular-nums ${overlayOpen ? "text-5xl mt-2 mb-3" : "mb-6 mt-4"}`, dir: "ltr", children: renderNumberDigit(focusedWord) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-20 h-20 rounded-full border-4 border-white dark:border-slate-700 shadow-lg my-6 ${colorSwatchClass(focusedWord)}`, "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${plaqueTone} p-5 rounded-2xl w-full max-w-xs transition-colors duration-300 ${overlayOpen ? "p-3.5" : ""}`, dir: "ltr", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-ink font-black mb-1 ${overlayOpen ? "text-lg" : "text-2xl"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: focusedWord.ku }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted tracking-wider uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language === "ar" ? focusedWord.ar : focusedWord.en }) })
              ] }),
              !overlayOpen && isNumbers && focusCanOpenFamily && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  whileTap: { scale: 0.97 },
                  onClick: () => openFamily(focusedWord.id),
                  className: "w-full max-w-xs mt-4 rounded-2xl px-4 py-3 text-sm font-black text-sky-700 dark:text-sky-200 border-2 border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors cursor-pointer flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-baseline gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: familyCtaWord }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", dir: "ltr", children: digitOf(focusedWord) })
                    ] })
                  ]
                },
                `family-${focusedWord.id}`
              ),
              !overlayOpen && isNumbers && (focusedWord == null ? void 0 : focusedWord.subCategoryId) === "hundred" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  whileTap: { scale: 0.97 },
                  onClick: openAdvanced,
                  className: "w-full max-w-xs mt-3 rounded-2xl px-4 py-3 text-sm font-black text-slate-700 dark:text-slate-200 border-2 border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors cursor-pointer flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 shrink-0 text-sky-600 dark:text-sky-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-baseline gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: advancedCtaWord }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", children: advancedLabel })
                    ] })
                  ]
                },
                "advanced-numbers"
              )
            ]
          },
          focusedWord.id
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest", dir: "ltr", children: advancedOpen ? advancedLabel : isFamilyExpanded ? familyLabel : sectionLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold px-2 py-0.5 rounded-full uppercase", children: advancedOpen ? largeNumbers.length : isFamilyExpanded ? familyWords.length : subjectGridWords.length })
      ] }),
      isNumbers && !overlayOpen && largeNumbers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: openAdvanced,
          className: "w-full mb-3 flex items-center justify-between px-4 py-3 rounded-2xl border-2 border-sky-200/70 dark:border-sky-800/60 bg-sky-50/60 dark:bg-sky-950/30 hover:bg-sky-100/70 dark:hover:bg-sky-900/40 transition-colors cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-xs font-black text-sky-700 dark:text-sky-300 uppercase tracking-widest", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-sky-600 dark:text-sky-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: advancedCtaWord })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", children: advancedLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 rtl:-scale-x-100" })
            ] })
          ]
        }
      ),
      isFamilyExpanded && openFamilyRoot ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          id: NUMBER_FAMILY_HOOK,
          role: "region",
          "aria-label": familyLabel,
          className: "mb-4 rounded-2xl border border-sky-200/70 dark:border-sky-800/60 bg-sky-50/60 dark:bg-sky-950/30 p-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5 px-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-sky-700 dark:text-sky-300 uppercase tracking-widest", dir: "ltr", children: familyLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: closeFamily,
                  "aria-label": backToAllLabel,
                  className: "flex items-center gap-1 min-h-[32px] px-2.5 rounded-full text-[10px] font-black text-sky-600 dark:text-sky-400 bg-white/70 dark:bg-slate-900/70 border border-sky-200/70 dark:border-sky-800/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: backToAllLabel })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: familyWords.map((word, index) => {
              const isFocused = (focusedWord == null ? void 0 : focusedWord.id) === word.id;
              const isLearned = isWordLearned(word.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  whileTap: { scale: 0.92 },
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: Math.min(index * 0.02, 0.25), duration: 0.3 },
                  onClick: () => setFocusedId(word.id),
                  "aria-pressed": isFocused,
                  "aria-label": `${word.ku} — ${language === "ar" ? word.ar : word.en}${isLearned ? language === "ar" ? "، محفوظ" : ", learned" : ""}`,
                  className: `aspect-square rounded-2xl flex flex-col items-center justify-center font-black text-xl transition-all relative cursor-pointer select-none
                      ${isFocused ? `${accent.well} border-2 ${focusBorder} ${accent.icon} shadow-md scale-105` : isLearned ? "border-2 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300" : "bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 shadow-[0_8px_30px_rgba(0,0,0,0.015)]"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-black tabular-nums", dir: "ltr", children: renderNumberDigit(word) }),
                    isLearned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -end-1.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500 text-white shadow-sm", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }) })
                  ]
                },
                word.id
              );
            }) })
          ]
        }
      ) : advancedOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          id: NUMBER_FAMILY_HOOK,
          role: "region",
          "aria-label": advancedLabel,
          className: "mb-4 rounded-2xl border border-sky-200/70 dark:border-sky-800/60 bg-sky-50/60 dark:bg-sky-950/30 p-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5 px-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-sky-700 dark:text-sky-300 uppercase tracking-widest", dir: "ltr", children: advancedLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: closeFamily,
                  "aria-label": backToAllLabel,
                  className: "flex items-center gap-1 min-h-[32px] px-2.5 rounded-full text-[10px] font-black text-sky-600 dark:text-sky-400 bg-white/70 dark:bg-slate-900/70 border border-sky-200/70 dark:border-sky-800/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: backToAllLabel })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: largeNumbers.map((word, index) => {
              const isFocused = (focusedWord == null ? void 0 : focusedWord.id) === word.id;
              const isLearned = isWordLearned(word.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  whileTap: { scale: 0.92 },
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: Math.min(index * 0.02, 0.25), duration: 0.3 },
                  onClick: () => setFocusedId(word.id),
                  "aria-pressed": isFocused,
                  "aria-label": `${word.ku} — ${language === "ar" ? word.ar : word.en}${isLearned ? language === "ar" ? "، محفوظ" : ", learned" : ""}`,
                  className: `aspect-square rounded-2xl flex flex-col items-center justify-center gap-0.5 font-black text-base transition-all relative cursor-pointer select-none
                      ${isFocused ? `${accent.well} border-2 ${focusBorder} ${accent.icon} shadow-md scale-105` : isLearned ? "border-2 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300" : "bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 shadow-[0_8px_30px_rgba(0,0,0,0.015)]"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-black tabular-nums", dir: "ltr", children: renderCompactNumberDigit(word) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-slate-500 dark:text-slate-400 leading-none", dir: "ltr", children: word.ku }),
                    isLearned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -end-1.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500 text-white shadow-sm", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }) })
                  ]
                },
                word.id
              );
            }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid ${isNumbers ? "grid-cols-4" : "grid-cols-3"} gap-2`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: subjectGridWords.map((word, index) => {
          const isFocused = (focusedWord == null ? void 0 : focusedWord.id) === word.id;
          const isLearned = isWordLearned(word.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileTap: { scale: 0.92 },
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.94 },
              transition: { delay: Math.min(index * 0.02, 0.25), duration: 0.3 },
              onClick: () => setFocusedId(word.id),
              "aria-pressed": isFocused,
              "aria-label": `${word.ku} — ${language === "ar" ? word.ar : word.en}${isLearned ? language === "ar" ? "، محفوظ" : ", learned" : ""}`,
              className: `aspect-square rounded-2xl flex flex-col items-center justify-center font-black text-xl transition-all relative cursor-pointer select-none
                        ${isFocused ? `${accent.well} border-2 ${focusBorder} ${accent.icon} shadow-md scale-105` : isLearned ? "border-2 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300" : "bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 shadow-[0_8px_30px_rgba(0,0,0,0.015)]"}`,
              children: [
                isColors && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-8 h-8 rounded-full border-2 shadow-sm ${colorSwatchClass(word)}`, "aria-hidden": "true" }),
                isNumbers && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-black tabular-nums", dir: "ltr", children: renderNumberDigit(word) }),
                isLearned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -end-1.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500 text-white shadow-sm", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }) })
              ]
            },
            word.id
          );
        }) }) }),
        isNumbers && largeNumbers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: openAdvanced,
            className: "mt-2 w-full flex items-center justify-between px-4 py-2.5 rounded-2xl border border-sky-200/70 dark:border-sky-800/60 bg-sky-50/60 dark:bg-sky-950/30 hover:bg-sky-100/70 dark:hover:bg-sky-900/40 transition-colors cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-[10px] font-black text-sky-700 dark:text-sky-300 uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-sky-600 dark:text-sky-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: advancedCtaWord })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-wider", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", children: advancedLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 rtl:-scale-x-100" })
              ] })
            ]
          }
        )
      ] }),
      focusedWord && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-2 pt-1 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecallButton, { wordId: focusedWord.id, size: "block" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-1 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          whileTap: { scale: 0.98 },
          onClick: () => navigate(`/quiz/${categoryId}`),
          className: `${solidCta} text-white font-extrabold px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-base w-full justify-center flex items-center gap-3 cursor-pointer border-none focus-visible:ring-2 focus-visible:ring-indigo-600`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(language, "practice") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current rtl:-scale-x-100" })
          ]
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-6 min-h-screen pb-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/3 w-72 h-72 bg-indigo-200/15 dark:bg-indigo-950/20 rounded-full filter blur-3xl pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 py-1 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
        "text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide",
        subjectAccent ? subjectAccent.well : "bg-indigo-100 dark:bg-indigo-950/50",
        subjectAccent ? subjectAccent.icon : "text-indigo-700 dark:text-indigo-400"
      ), children: headerBadge }),
      subjectAccent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate("/learn"),
          className: "flex items-center gap-1 text-[10px] font-black text-muted hover:text-ink transition-colors cursor-pointer bg-transparent border-none min-h-[36px] px-1 rounded-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 rtl:-scale-x-100" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              t(language, "learning"),
              " Hub"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-4xl mx-auto bg-white dark:bg-slate-900 border-s-4 ${subjectAccent ? subjectAccent.heroBorder : "border-s-[#FFCF54] dark:border-s-[#FFBA38]"} border border-line-soft dark:border-slate-800 rounded-[2rem] p-6 text-center shadow-flat relative overflow-hidden group`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -top-16 h-48 bg-[radial-gradient(circle_at_50%_0%,#FFB300_0%,transparent_65%)] opacity-[0.10] pointer-events-none", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mb-3 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl ${subjectAccent ? subjectAccent.well : "bg-[#FFF3D6] dark:bg-[#3A2F14]"} ${subjectAccent ? subjectAccent.icon : "text-[#D97706] dark:text-[#FFCE6B]"} drop-shadow-md transition-transform duration-500`, "aria-hidden": "true", children: renderCategoryHeroIcon(category.icon) }),
      subjectAccent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-2 inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${subjectAccent.well} ${subjectAccent.icon}`, children: isNumbers ? language !== "ar" ? "Numbers" : "الأرقام" : language !== "ar" ? "Colors" : "الألوان" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black text-slate-900 dark:text-white tracking-tight", children: categoryName }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 flex items-center justify-center gap-1.5 uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 text-indigo-500" }),
        baseWords.length,
        " ",
        t(language, "words")
      ] })
    ] }),
    subjectAccent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setControlsExpanded((e) => !e),
        "aria-expanded": controlsExpanded,
        className: "max-w-4xl mx-auto flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer bg-transparent border-none min-h-[36px]",
        children: [
          controlsExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: controlsExpanded ? language !== "ar" ? "Hide filters & search" : "إخفاء التصفية والبحث" : language !== "ar" ? "Show filters & search" : "إظهار التصفية والبحث" })
        ]
      }
    ),
    controlsExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto flex gap-2 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4.5 h-4.5 text-slate-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.015)] focus:border-indigo-300 focus:outline-none transition-colors ps-10 pe-4 text-xs font-bold text-slate-800 dark:text-slate-200",
              placeholder: t(language, "search_terms"),
              value: search,
              onChange: (e) => setSearch(e.target.value)
            }
          )
        ] }),
        isAcademic && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.015)] focus:border-purple-300 focus:outline-none transition-colors text-xs font-bold text-slate-600 dark:text-slate-300 outline-none appearance-none cursor-pointer pr-8",
              value: levelFilter,
              onChange: (e) => setLevelFilter(e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t(language, "all_levels") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "beginner", children: t(language, "level_beginner") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "intermediate", children: t(language, "level_intermediate") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "advanced", children: t(language, "level_advanced") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "professional", children: t(language, "level_professional") })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" }) })
        ] })
      ] }),
      !isAcademic && categoryId !== "numbers" && subCategoriesConfig[categoryId] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto flex gap-1.5 overflow-x-auto no-scrollbar py-1 shrink-0 relative z-10 scroll-smooth", children: subCategoriesConfig[categoryId].map((sub) => {
        const isActive = activeSubCategory === sub.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveSubCategory(sub.id),
            "aria-pressed": isActive,
            className: `min-h-[44px] py-2 px-4 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border-none flex items-center justify-center gap-1 shrink-0 focus-visible:ring-2 focus-visible:ring-indigo-600 ${isActive ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/10" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? sub.en : sub.ar })
          },
          sub.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 pb-6 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: words.map((word, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          transition: { delay: Math.min(index * 0.03, 0.3), type: "spring", stiffness: 280, damping: 25 },
          className: `bg-white dark:bg-slate-900 border border-slate-200 ${isAcademic ? "border-s-4 border-s-purple-600 dark:border-s-purple-500" : "border-s-4 border-s-indigo-600 dark:border-s-indigo-500"} dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.025)] relative overflow-hidden text-start group hover:border-indigo-300 dark:hover:border-slate-700 hover:shadow-md transition-all`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                className: "flex items-center gap-3.5 flex-1",
                // General word beautiful emoji bubble
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-slate-50 dark:bg-slate-950 border border-slate-100/50 dark:border-slate-800/80 rounded-xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform", children: getWordIcon(word) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start flex-wrap gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-left text-base font-black text-slate-900 dark:text-white leading-tight", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: word.ku }) }),
                      isAcademic && "level" in word && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black px-2 py-0.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 rounded-md uppercase tracking-wider", children: tLevel(language, word.level || "") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap text-start", children: [
                      language !== "ar" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: word.en }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 dark:text-slate-400 text-xs font-bold font-arabic leading-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: word.ar }) }),
                      isAcademic && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 dark:text-slate-600 font-bold", children: "•" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 dark:text-slate-500 text-[10px] font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language !== "ar" ? word.ar : word.en }) })
                      ] })
                    ] })
                  ] })
                ]
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0 ms-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.preventDefault();
                      toggleFavorite(word.id);
                    },
                    "aria-label": isFavorite(word.id) ? language !== "ar" ? "Remove from favorites" : "إزالة من المفضلة" : language !== "ar" ? "Add to favorites" : "إضافة للمفضلة",
                    className: `min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full transition-all border-none cursor-pointer hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-600 ${isFavorite(word.id) ? "bg-rose-50 dark:bg-rose-950/30 text-rose-500" : "bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50/50"}`,
                    title: language !== "ar" ? "Favorite word" : "إضافة للمفضلة",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-4 h-4 ${isFavorite(word.id) ? "fill-rose-500 text-rose-500" : ""}` })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AudioButton,
                  {
                    audioUrl: word.audio,
                    textToSpeak: word.ku,
                    className: `p-2 rounded-full transition-colors ${isAcademic ? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 hover:bg-purple-100 border-none" : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 hover:bg-indigo-100 border-none"}`,
                    iconClassName: "w-4 h-4",
                    showProgress: false
                  }
                )
              ] })
            ] }),
            word.exampleKu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50/80 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100/50 dark:border-slate-800/80 text-[11px] font-medium leading-relaxed mt-1 animate-fade-in", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-left font-extrabold text-slate-800 dark:text-slate-200 mb-0.5", dir: "ltr", children: [
                '"',
                /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { lang: "ku", children: word.exampleKu }),
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language !== "ar" ? word.exampleEn : word.exampleAr }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RecallButton, { wordId: word.id, size: "sm", className: "self-start mt-1" })
          ]
        },
        word.id
      )) }),
      words.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-12 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl text-slate-500 font-bold text-xs", children: t(language, "no_results") }),
      words.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate(`/quiz/${categoryId}`),
          className: `text-white font-black px-6 py-4.5 min-h-[48px] rounded-[20px] cursor-pointer shadow-lg flex items-center gap-2.5 active:scale-97 transition-all text-sm w-full justify-center border-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${isAcademic ? "bg-gradient-to-r from-purple-600 to-purple-700 shadow-purple-600/10 hover:shadow-purple-700/20" : "bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-indigo-600/10 hover:shadow-indigo-700/20"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current rtl:-scale-x-100" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              t(language, "practice"),
              " ",
              categoryName
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate("/store"),
          className: "w-full flex items-center justify-center gap-1.5 min-h-[36px] text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer bg-transparent border-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Studying ad-free · Go Premium" : "تتعلّم بدون إعلانات · اشترك بريميوم" })
          ]
        }
      )
    ] })
  ] });
}
export {
  VocabularyList
};
