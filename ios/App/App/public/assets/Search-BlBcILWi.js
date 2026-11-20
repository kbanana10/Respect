import { r as reactExports, j as jsxRuntimeExports, R as React } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { a as academicVocabulary, l as learningPath, u as useAuth, A as AudioButton } from "./index-C4ml4lrv.js";
import { u as useFavorites } from "./useFavorites-CTXFeMsV.js";
import { v as vocabulary } from "./kurmanji-DANKPvwI.js";
import { c as Search$1, X, I as Clock, d as Heart, l as Sparkles, al as Dog, ah as Cat, am as Bird, an as Fish, ao as Bug, t as Coffee, o as Users, Y as House, p as BookOpen, a3 as PenTool, ap as ClipboardList, ae as Backpack, aq as Eraser, ab as Ruler, ar as Scissors, as as Calculator, J as Library, j as Compass, at as Key, G as GraduationCap, au as UserCheck, av as ShieldCheck, i as Award, q as Briefcase, aw as FileText, B as Bell, ax as Presentation, ay as Table, az as Armchair, aA as PanelsTopLeft, M as Map$1, aB as Lightbulb, aa as Laptop, aC as Plus, aD as Minus, aE as Percent, Z as Zap, aF as Activity, aG as Code, aH as Cpu, aI as Network, aJ as Database, aK as Lock, aL as Folder, aM as Printer, aN as Terminal, aO as Mail, aP as ShieldAlert, aQ as Keyboard, aR as MousePointer, aS as Workflow, a9 as Atom, aT as Scale, aU as TrendingUp, V as Volume2, aV as ArrowDown, aW as Wind, a8 as FlaskConical, aX as Droplet, aY as Box, aZ as Grid3x3, F as Flame, a7 as Microscope, a_ as Dna, a$ as Brain, U as User, b0 as Eye, m as Smile, f as Sun, x as Globe, b1 as CircleQuestionMark, b2 as SquareCheckBig, w as Check, N as RefreshCw, T as Trophy, a0 as Palette, ag as Apple } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
const normalizedVocabularyLemmas = [
  // Numbers
  {
    id: "voc_n0",
    lemmaKu: "Sifir",
    ipa: "/sɪfɪɾ/",
    partOfSpeech: "numeral",
    translations: { en: "Zero", ar: "صفر" },
    categoryId: "numbers",
    subCategoryId: "ones",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/numbers/zero.mp3", emoji: "0️⃣" },
    examples: [{ sentenceKu: "Puanên min sifir in.", translations: { en: "My points are zero.", ar: "نقاطي صفر." } }],
    tags: ["numbers", "basic", "a1"]
  },
  {
    id: "voc_n1",
    lemmaKu: "Yek",
    ipa: "/jɛk/",
    partOfSpeech: "numeral",
    translations: { en: "One", ar: "واحد" },
    categoryId: "numbers",
    subCategoryId: "ones",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/numbers/one.mp3", emoji: "1️⃣" },
    examples: [{ sentenceKu: "Min yek pênûs heye.", translations: { en: "I have one pen.", ar: "لدي قلم واحد." } }],
    tags: ["numbers", "basic", "a1"]
  },
  {
    id: "voc_n2",
    lemmaKu: "Du",
    ipa: "/dʊ/",
    partOfSpeech: "numeral",
    translations: { en: "Two", ar: "اثنان" },
    categoryId: "numbers",
    subCategoryId: "ones",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/numbers/two.mp3", emoji: "2️⃣" },
    examples: [{ sentenceKu: "Du birayên min hene.", translations: { en: "I have two brothers.", ar: "لدي أخوان." } }],
    tags: ["numbers", "basic", "a1"]
  },
  {
    id: "voc_n3",
    lemmaKu: "Sê",
    ipa: "/seː/",
    partOfSpeech: "numeral",
    translations: { en: "Three", ar: "ثلاثة" },
    categoryId: "numbers",
    subCategoryId: "ones",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/numbers/three.mp3", emoji: "3️⃣" },
    examples: [{ sentenceKu: "Sê sêv li ser masê ne.", translations: { en: "Three apples are on the table.", ar: "ثلاث تفاحات على الطاولة." } }],
    tags: ["numbers", "basic", "a1"]
  },
  {
    id: "voc_n4",
    lemmaKu: "Çar",
    ipa: "/tʃɑːɾ/",
    partOfSpeech: "numeral",
    translations: { en: "Four", ar: "أربعة" },
    categoryId: "numbers",
    subCategoryId: "ones",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/numbers/four.mp3", emoji: "4️⃣" },
    examples: [{ sentenceKu: "Ode çar pencere hene.", translations: { en: "The room has four windows.", ar: "الغرفة فيها أربع نوافذ." } }],
    tags: ["numbers", "basic", "a1"]
  },
  {
    id: "voc_n5",
    lemmaKu: "Pênc",
    ipa: "/peːntʃ/",
    partOfSpeech: "numeral",
    translations: { en: "Five", ar: "خمسة" },
    categoryId: "numbers",
    subCategoryId: "ones",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/numbers/five.mp3", emoji: "5️⃣" },
    examples: [{ sentenceKu: "Ew pênc deqîqan diskinê.", translations: { en: "Wait five minutes.", ar: "انتظر خمس دقائق." } }],
    tags: ["numbers", "basic", "a1"]
  },
  {
    id: "voc_n10",
    lemmaKu: "Deh",
    ipa: "/dɛh/",
    partOfSpeech: "numeral",
    translations: { en: "Ten", ar: "عشرة" },
    categoryId: "numbers",
    subCategoryId: "tens",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/numbers/ten.mp3", emoji: "🔟" },
    examples: [{ sentenceKu: "Deh pirtûkên min hene.", translations: { en: "I have ten books.", ar: "لدي عشرة كتب." } }],
    tags: ["numbers", "basic", "a1"]
  },
  // Food & Water
  {
    id: "voc_food_01",
    lemmaKu: "Av",
    ipa: "/ɑːv/",
    gender: "feminine",
    partOfSpeech: "noun",
    translations: { en: "Water", ar: "ماء" },
    categoryId: "food",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/av.mp3", emoji: "💧" },
    examples: [{ sentenceKu: "Av sar e.", translations: { en: "The water is cold.", ar: "الماء بارد." }, audioUrl: "/audio/sentences/av_sar_e.mp3" }],
    tags: ["basic", "food", "drink", "essential"]
  },
  {
    id: "voc_food_02",
    lemmaKu: "Nan",
    ipa: "/nɑːn/",
    gender: "masculine",
    partOfSpeech: "noun",
    translations: { en: "Bread", ar: "خبز" },
    categoryId: "food",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/nan.mp3", emoji: "🍞" },
    examples: [{ sentenceKu: "Ez nan dixwim.", translations: { en: "I eat bread.", ar: "أنا آكل الخبز." } }],
    tags: ["basic", "food", "essential"]
  },
  {
    id: "voc_food_03",
    lemmaKu: "Sêv",
    ipa: "/seːv/",
    gender: "feminine",
    partOfSpeech: "noun",
    translations: { en: "Apple", ar: "تفاحة" },
    categoryId: "food",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/sev.mp3", emoji: "🍎" },
    examples: [{ sentenceKu: "Sêveke sor e.", translations: { en: "It is a red apple.", ar: "إنها تفاحة حمراء." } }],
    tags: ["food", "fruit", "a1"]
  },
  {
    id: "voc_food_04",
    lemmaKu: "Şîr",
    ipa: "/ʃiːɾ/",
    gender: "masculine",
    partOfSpeech: "noun",
    translations: { en: "Milk", ar: "حليب" },
    categoryId: "food",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/shir.mp3", emoji: "🥛" },
    examples: [{ sentenceKu: "Ez şîrê germ vedixwim.", translations: { en: "I drink warm milk.", ar: "أنا أشرب حليباً دافئاً." } }],
    tags: ["food", "drink", "a1"]
  },
  {
    id: "voc_food_05",
    lemmaKu: "Çay",
    ipa: "/tʃɑːj/",
    gender: "feminine",
    partOfSpeech: "noun",
    translations: { en: "Tea", ar: "شاي" },
    categoryId: "food",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/chay.mp3", emoji: "☕" },
    examples: [{ sentenceKu: "Çaya kurdî gelek xweş e.", translations: { en: "Kurdish tea is very delicious.", ar: "الشاي الكردي لذيذ جداً." } }],
    tags: ["food", "drink", "culture"]
  },
  // Family
  {
    id: "voc_fam_01",
    lemmaKu: "Bav",
    ipa: "/bɑːv/",
    gender: "masculine",
    partOfSpeech: "noun",
    translations: { en: "Father", ar: "أب" },
    categoryId: "family",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/bav.mp3", emoji: "👨" },
    examples: [{ sentenceKu: "Bavê min mamoste ye.", translations: { en: "My father is a teacher.", ar: "أبي معلم." } }],
    tags: ["family", "basic", "a1"]
  },
  {
    id: "voc_fam_02",
    lemmaKu: "Dayik / Dê",
    ipa: "/dɑːjɪk/",
    gender: "feminine",
    partOfSpeech: "noun",
    translations: { en: "Mother", ar: "أم" },
    categoryId: "family",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/dayik.mp3", emoji: "👩" },
    examples: [{ sentenceKu: "Dayika min dilovan e.", translations: { en: "My mother is kind.", ar: "أمي حنونة." } }],
    tags: ["family", "basic", "a1"]
  },
  {
    id: "voc_fam_03",
    lemmaKu: "Xuşk",
    ipa: "/xʊʃk/",
    gender: "feminine",
    partOfSpeech: "noun",
    translations: { en: "Sister", ar: "أخت" },
    categoryId: "family",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/xusk.mp3", emoji: "👧" },
    examples: [{ sentenceKu: "Xuşka min biçûk e.", translations: { en: "My sister is small.", ar: "أختي صغيرة." } }],
    tags: ["family", "a1"]
  },
  {
    id: "voc_fam_04",
    lemmaKu: "Bira",
    ipa: "/bɪɾɑː/",
    gender: "masculine",
    partOfSpeech: "noun",
    translations: { en: "Brother", ar: "أخ" },
    categoryId: "family",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/vocabulary/bira.mp3", emoji: "👦" },
    examples: [{ sentenceKu: "Birayê min li zanîngehê ye.", translations: { en: "My brother is at university.", ar: "أخي في الجامعة." } }],
    tags: ["family", "a1"]
  },
  // Academic & Education
  {
    id: "voc_acad_01",
    lemmaKu: "Pirtûk",
    ipa: "/pɪɾtuːk/",
    gender: "feminine",
    partOfSpeech: "noun",
    translations: { en: "Book", ar: "كتاب" },
    categoryId: "school_objects",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/academic/book.mp3", emoji: "📚" },
    examples: [{ sentenceKu: "Ev pirtûk balkêş e.", translations: { en: "This book is interesting.", ar: "هذا الكتاب مثير للاهتمام." } }],
    tags: ["school", "academic", "a1"]
  },
  {
    id: "voc_acad_02",
    lemmaKu: "Zanîngeh",
    ipa: "/zɑːniːnɡɛh/",
    gender: "feminine",
    partOfSpeech: "noun",
    translations: { en: "University", ar: "جامعة" },
    categoryId: "university",
    cefrLevel: "A2",
    media: { audioUrl: "/audio/academic/university.mp3", emoji: "🏛️" },
    examples: [{ sentenceKu: "Ez li zanîngehê dixwînim.", translations: { en: "I study at university.", ar: "أنا أدرس في الجامعة." } }],
    tags: ["academic", "education", "a2"]
  },
  {
    id: "voc_acad_03",
    lemmaKu: "Mamoste",
    ipa: "/mɑːmɔstɛ/",
    gender: "neutral",
    partOfSpeech: "noun",
    translations: { en: "Teacher / Professor", ar: "معلم / أستاذ" },
    categoryId: "university",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/academic/professor.mp3", emoji: "👨‍🏫" },
    examples: [{ sentenceKu: "Mamoste dersê baş dide.", translations: { en: "The teacher teaches well.", ar: "المعلم يدرس جيداً." } }],
    tags: ["academic", "education", "a1"]
  },
  {
    id: "voc_acad_04",
    lemmaKu: "Kompîtur",
    ipa: "/kɔmpiːtʊɾ/",
    gender: "feminine",
    partOfSpeech: "noun",
    translations: { en: "Computer", ar: "حاسوب" },
    categoryId: "computers",
    cefrLevel: "B1",
    media: { audioUrl: "/audio/academic/computer.mp3", emoji: "💻" },
    examples: [{ sentenceKu: "Ez bernameyan li ser kompîturê çêdikim.", translations: { en: "I write programs on the computer.", ar: "أصنع البرامج على الحاسوب." } }],
    tags: ["academic", "technology", "b1"]
  },
  // Verbs & Actions
  {
    id: "voc_verb_01",
    lemmaKu: "Xwarin",
    ipa: "/xwɑːɾɪn/",
    partOfSpeech: "verb",
    translations: { en: "To eat", ar: "أن يأكل" },
    categoryId: "actions",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/verbs/xwarin.mp3", emoji: "🍽️" },
    examples: [{ sentenceKu: "Ez fêkiyan dixwim.", translations: { en: "I eat fruits.", ar: "أنا آكل الفواكه." } }],
    tags: ["verbs", "daily", "a1"]
  },
  {
    id: "voc_verb_02",
    lemmaKu: "Xwendin",
    ipa: "/xwɛndɪn/",
    partOfSpeech: "verb",
    translations: { en: "To read / study", ar: "أن يقرأ / يدرس" },
    categoryId: "actions",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/verbs/xwendin.mp3", emoji: "📖" },
    examples: [{ sentenceKu: "Ez pirtûkê dixwînim.", translations: { en: "I am reading a book.", ar: "أنا أقرأ كتاباً." } }],
    tags: ["verbs", "academic", "a1"]
  },
  {
    id: "voc_verb_03",
    lemmaKu: "Nivîsîn",
    ipa: "/nɪviːsiːn/",
    partOfSpeech: "verb",
    translations: { en: "To write", ar: "أن يكتب" },
    categoryId: "actions",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/verbs/nivisin.mp3", emoji: "✍️" },
    examples: [{ sentenceKu: "Tu nameyê dinivîsî.", translations: { en: "You are writing a letter.", ar: "أنت تكتب رسالة." } }],
    tags: ["verbs", "academic", "a1"]
  },
  {
    id: "voc_verb_04",
    lemmaKu: "Çûn",
    ipa: "/tʃuːn/",
    partOfSpeech: "verb",
    translations: { en: "To go", ar: "أن يذهب" },
    categoryId: "actions",
    cefrLevel: "A1",
    media: { audioUrl: "/audio/verbs/chun.mp3", emoji: "🏃" },
    examples: [{ sentenceKu: "Ez diçim malê.", translations: { en: "I am going home.", ar: "أنا أذهب إلى البيت." } }],
    tags: ["verbs", "essential", "a1"]
  }
];
let _lemmaCache = null;
function getAllVocabularyLemmas() {
  if (_lemmaCache) return _lemmaCache;
  const map = /* @__PURE__ */ new Map();
  normalizedVocabularyLemmas.forEach((lemma) => {
    map.set(lemma.id, lemma);
  });
  vocabulary.forEach((v) => {
    if (!map.has(v.id)) {
      map.set(v.id, {
        id: v.id,
        lemmaKu: v.ku,
        partOfSpeech: "noun",
        translations: { en: v.en, ar: v.ar },
        categoryId: v.categoryId,
        subCategoryId: v.subCategoryId,
        cefrLevel: "A1",
        media: { audioUrl: v.audio, emoji: v.emoji },
        examples: [],
        tags: [v.categoryId, "a1"]
      });
    }
  });
  academicVocabulary.forEach((a) => {
    const lemmaId = `acad_${a.id}`;
    if (!map.has(lemmaId)) {
      map.set(lemmaId, {
        id: lemmaId,
        lemmaKu: a.ku,
        partOfSpeech: a.categoryId === "actions" ? "verb" : "noun",
        translations: { en: a.en, ar: a.ar },
        categoryId: a.categoryId,
        cefrLevel: a.level === "beginner" ? "A1" : a.level === "intermediate" ? "A2" : "B1",
        media: { audioUrl: a.audio },
        examples: a.exampleKu ? [{
          sentenceKu: a.exampleKu,
          translations: { en: a.exampleEn || a.en, ar: a.exampleAr || a.ar }
        }] : [],
        tags: ["academic", a.categoryId, a.level]
      });
    }
  });
  learningPath.forEach((pathLevel) => {
    const cefr = pathLevel.title === "Beginner A1" ? "A1" : pathLevel.title === "Elementary A2" ? "A2" : pathLevel.title === "Intermediate B1" ? "B1" : "A1";
    pathLevel.lessons.forEach((lesson) => {
      lesson.words.forEach((w) => {
        if (!map.has(w.id)) {
          map.set(w.id, {
            id: w.id,
            lemmaKu: w.ku,
            partOfSpeech: "noun",
            translations: { en: w.en, ar: w.ar },
            categoryId: w.category || "general",
            cefrLevel: cefr,
            media: { audioUrl: w.audio, emoji: "📖" },
            examples: [],
            tags: ["syllabus", cefr]
          });
        }
      });
    });
  });
  _lemmaCache = Array.from(map.values());
  return _lemmaCache;
}
function searchVocabulary(options) {
  let list = getAllVocabularyLemmas();
  if (options.cefrLevel && options.cefrLevel !== "All" && options.cefrLevel !== "all") {
    list = list.filter((item) => {
      var _a;
      return item.cefrLevel.toLowerCase() === ((_a = options.cefrLevel) == null ? void 0 : _a.toLowerCase());
    });
  }
  if (options.categoryId && options.categoryId !== "All" && options.categoryId !== "all") {
    list = list.filter((item) => item.categoryId === options.categoryId);
  }
  if (options.partOfSpeech && options.partOfSpeech !== "All" && options.partOfSpeech !== "all") {
    list = list.filter((item) => item.partOfSpeech === options.partOfSpeech);
  }
  if (options.query && options.query.trim().length > 0) {
    const q = options.query.trim().toLowerCase();
    const qFold = foldKurmanji(q);
    list = list.filter((item) => {
      const ku = item.lemmaKu.toLowerCase();
      const en = item.translations.en.toLowerCase();
      const ar = item.translations.ar;
      return ku.includes(q) || en.includes(q) || ar.includes(q) || foldKurmanji(ku).includes(qFold);
    });
    list = [...list].sort((a, b) => scoreLemma(b, q) - scoreLemma(a, q));
  }
  if (options.limit && options.limit > 0 && list.length > options.limit) {
    return list.slice(0, options.limit);
  }
  return list;
}
function foldKurmanji(input) {
  return input.replace(/[çÇ]/g, "c").replace(/[êÊ]/g, "e").replace(/[îÎ]/g, "i").replace(/[şŞ]/g, "s").replace(/[ûÛ]/g, "u");
}
function scoreLemma(item, q) {
  const ku = item.lemmaKu.toLowerCase();
  const en = item.translations.en.toLowerCase();
  if (ku === q) return 100;
  if (en === q) return 90;
  if (ku.startsWith(q)) return 80;
  if (en.startsWith(q)) return 70;
  if (ku.includes(q)) return 40;
  if (en.includes(q)) return 30;
  return 10;
}
const PAGE_SIZE = 25;
const getWordIcon = (item, className = "w-5 h-5 text-indigo-600 dark:text-indigo-400") => {
  var _a, _b;
  if (!item) return React.createElement(Sparkles, { className });
  const lowerEn = (((_a = item.translations) == null ? void 0 : _a.en) || item.en || "").toLowerCase().trim();
  const id = item.id || "";
  const emoji = ((_b = item.media) == null ? void 0 : _b.emoji) || item.emoji || "";
  const isNumberCategory = id.startsWith("n") || item.categoryId === "numbers";
  if (isNumberCategory) {
    let numStr = "";
    if (id === "n0" || lowerEn === "zero") numStr = "0";
    else if (id === "n1" || lowerEn === "one") numStr = "1";
    else if (id === "n2" || lowerEn === "two") numStr = "2";
    else if (id === "n3" || lowerEn === "three") numStr = "3";
    else if (id === "n4" || lowerEn === "four") numStr = "4";
    else if (id === "n5" || lowerEn === "five") numStr = "5";
    else if (id === "n6" || lowerEn === "six") numStr = "6";
    else if (id === "n7" || lowerEn === "seven") numStr = "7";
    else if (id === "n8" || lowerEn === "eight") numStr = "8";
    else if (id === "n9" || lowerEn === "nine") numStr = "9";
    else if (id === "n10" || lowerEn === "ten") numStr = "10";
    else if (id === "n20" || lowerEn === "twenty") numStr = "20";
    else if (id === "n30" || lowerEn === "thirty") numStr = "30";
    else if (id === "n40" || lowerEn === "forty") numStr = "40";
    else if (id === "n50" || lowerEn === "fifty") numStr = "50";
    else if (id === "n60" || lowerEn === "sixty") numStr = "60";
    else if (id === "n70" || lowerEn === "seventy") numStr = "70";
    else if (id === "n80" || lowerEn === "eighty") numStr = "80";
    else if (id === "n90" || lowerEn === "ninety") numStr = "90";
    else if (id === "n100" || lowerEn === "one hundred" || lowerEn === "hundred") numStr = "100";
    else if (id === "n200") numStr = "200";
    else if (id === "n300") numStr = "300";
    else if (id === "n500") numStr = "500";
    else if (id === "n1000" || lowerEn === "thousand") numStr = "1K";
    else if (id === "n1000000" || lowerEn === "million") numStr = "1M";
    else if (id === "n1000000000" || lowerEn === "billion") numStr = "1B";
    else {
      const match = lowerEn.match(/\d+/);
      numStr = match ? match[0] : "#";
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black tracking-tighter text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded-md min-w-[20px] text-center", children: numStr });
  }
  const isColorCategory = id.startsWith("c") && !id.startsWith("co") && !id.startsWith("cl") && !id.startsWith("ch");
  if (isColorCategory) {
    const colorClasses = {
      "red": "bg-red-500 border-red-600",
      "blue": "bg-blue-500 border-blue-600",
      "green": "bg-emerald-500 border-emerald-600",
      "yellow": "bg-amber-400 border-amber-500",
      "black": "bg-slate-950 border-slate-900",
      "white": "bg-white border-slate-300 dark:border-slate-700",
      "grey": "bg-slate-400 border-slate-500",
      "gray": "bg-slate-400 border-slate-500",
      "brown": "bg-amber-800 border-amber-900",
      "pink": "bg-pink-400 border-pink-500",
      "purple": "bg-purple-600 border-purple-700",
      "orange": "bg-orange-500 border-orange-600"
    };
    const swatchClass = colorClasses[lowerEn] || "bg-gradient-to-br from-indigo-500 to-purple-500";
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-5 h-5 rounded-full border shadow-sm shrink-0 ${swatchClass}` });
  }
  const getIconComp = () => {
    if (lowerEn === "dog") return Dog;
    if (lowerEn === "cat") return Cat;
    if (lowerEn === "bird") return Bird;
    if (lowerEn === "fish") return Fish;
    if (lowerEn.includes("bee") || lowerEn.includes("ant") || lowerEn.includes("butterfly") || lowerEn.includes("fly") || lowerEn.includes("mosquito") || lowerEn.includes("spider")) return Bug;
    if (lowerEn === "coffee" || lowerEn === "tea" || lowerEn === "milk" || lowerEn === "water") return Coffee;
    if (lowerEn.includes("family") || lowerEn.includes("mother") || lowerEn.includes("father") || lowerEn.includes("brother") || lowerEn.includes("sister") || lowerEn.includes("son") || lowerEn.includes("daughter")) return Users;
    if (lowerEn.includes("house") || lowerEn.includes("home") || lowerEn.includes("room")) return House;
    if (lowerEn.includes("time") || lowerEn.includes("clock") || lowerEn.includes("day") || lowerEn.includes("year") || lowerEn.includes("month") || lowerEn.includes("week")) return Clock;
    if (lowerEn === "book" || lowerEn === "textbook" || lowerEn === "dictionary" || lowerEn.includes("pirtûk")) return BookOpen;
    if (lowerEn === "pen" || lowerEn === "pencil" || lowerEn === "marker pen" || lowerEn === "marker") return PenTool;
    if (lowerEn === "notebook" || lowerEn === "syllabus" || lowerEn === "curriculum") return ClipboardList;
    if (lowerEn === "school bag" || lowerEn === "bag") return Backpack;
    if (lowerEn === "eraser" || lowerEn === "board eraser" || lowerEn === "duster") return Eraser;
    if (lowerEn === "ruler") return Ruler;
    if (lowerEn === "scissors") return Scissors;
    if (lowerEn === "calculator") return Calculator;
    if (lowerEn === "library") return Library;
    if (lowerEn === "compass" || lowerEn === "compass (drawing)") return Compass;
    if (lowerEn === "key") return Key;
    if (lowerEn === "university" || lowerEn === "college" || lowerEn === "faculty" || lowerEn.includes("degree") || lowerEn.includes("doctorate") || lowerEn.includes("phd") || lowerEn.includes("bachelor") || lowerEn.includes("master")) return GraduationCap;
    if (lowerEn.includes("professor") || lowerEn.includes("teacher") || lowerEn.includes("instructor")) return UserCheck;
    if (lowerEn.includes("student") || lowerEn.includes("learner") || lowerEn.includes("group study")) return Users;
    if (lowerEn.includes("regulation") || lowerEn.includes("rule") || lowerEn.includes("plagiarism")) return ShieldCheck;
    if (lowerEn.includes("scholarship") || lowerEn.includes("award") || lowerEn.includes("grade") || lowerEn.includes("score")) return Award;
    if (lowerEn === "internship" || lowerEn === "job" || lowerEn === "work" || lowerEn === "department") return Briefcase;
    if (lowerEn.includes("research") || lowerEn.includes("study")) return Search$1;
    if (lowerEn.includes("thesis") || lowerEn.includes("dissertation") || lowerEn.includes("essay") || lowerEn.includes("article") || lowerEn.includes("file") || lowerEn.includes("document")) return FileText;
    if (lowerEn === "bell") return Bell;
    if (lowerEn === "whiteboard" || lowerEn === "board") return Presentation;
    if (lowerEn === "desk" || lowerEn === "table") return Table;
    if (lowerEn === "chair") return Armchair;
    if (lowerEn === "window" || lowerEn === "door") return PanelsTopLeft;
    if (lowerEn === "map") return Map$1;
    if (lowerEn === "light" || lowerEn === "lamp") return Lightbulb;
    if (lowerEn.includes("computer") || lowerEn === "monitor" || lowerEn === "screen" || lowerEn === "projector") return Laptop;
    if (lowerEn === "mathematics" || lowerEn === "math" || lowerEn === "algebra" || lowerEn === "calculus" || lowerEn === "statistics" || lowerEn === "number") return Calculator;
    if (lowerEn === "addition") return Plus;
    if (lowerEn === "subtraction") return Minus;
    if (lowerEn === "multiplication") return X;
    if (lowerEn === "division" || lowerEn === "percentage") return Percent;
    if (lowerEn === "circle" || lowerEn === "square" || lowerEn === "triangle" || lowerEn === "line" || lowerEn === "angle") return Ruler;
    if (lowerEn.includes("power") || lowerEn.includes("exponent")) return Zap;
    if (lowerEn === "equation" || lowerEn === "function" || lowerEn === "integral" || lowerEn === "root") return Activity;
    if (lowerEn === "software" || lowerEn === "code" || lowerEn === "program" || lowerEn === "application" || lowerEn === "website") return Code;
    if (lowerEn === "hardware" || lowerEn === "cpu" || lowerEn.includes("operating system") || lowerEn === "system") return Cpu;
    if (lowerEn === "network" || lowerEn === "internet") return Network;
    if (lowerEn === "data" || lowerEn === "database") return Database;
    if (lowerEn === "password") return Lock;
    if (lowerEn === "folder") return Folder;
    if (lowerEn === "print") return Printer;
    if (lowerEn === "developer") return Terminal;
    if (lowerEn === "email") return Mail;
    if (lowerEn === "virus") return ShieldAlert;
    if (lowerEn === "keyboard") return Keyboard;
    if (lowerEn === "mouse") return MousePointer;
    if (lowerEn === "algorithm") return Workflow;
    if (lowerEn === "physics" || lowerEn === "atom" || lowerEn === "molecule") return Atom;
    if (lowerEn === "force" || lowerEn === "energy" || lowerEn === "electricity" || lowerEn === "electric power") return Zap;
    if (lowerEn === "mass" || lowerEn === "weight") return Scale;
    if (lowerEn === "speed" || lowerEn === "velocity" || lowerEn === "rotation" || lowerEn === "friction" || lowerEn.includes("force")) return TrendingUp;
    if (lowerEn === "light" || lowerEn === "temperature" || lowerEn === "thermometer" || lowerEn === "chemical thermometer") return Lightbulb;
    if (lowerEn === "sound" || lowerEn === "wave") return Volume2;
    if (lowerEn === "magnet") return Compass;
    if (lowerEn === "gravity") return ArrowDown;
    if (lowerEn === "air resistance") return Wind;
    if (lowerEn === "barometer" || lowerEn === "voltmeter" || lowerEn === "ammeter" || lowerEn.includes("meter")) return Activity;
    if (lowerEn === "chemistry" || lowerEn === "chemist" || lowerEn === "laboratory" || lowerEn.includes("test tube") || lowerEn === "beaker" || lowerEn === "tube") return FlaskConical;
    if (lowerEn === "gas") return Wind;
    if (lowerEn === "liquid" || lowerEn === "dissolution") return Droplet;
    if (lowerEn === "solid") return Box;
    if (lowerEn === "element" || lowerEn === "periodic table") return Grid3x3;
    if (lowerEn === "compound" || lowerEn === "reaction" || lowerEn === "acid" || lowerEn === "base" || lowerEn === "alkali" || lowerEn === "catalyst" || lowerEn === "chemical bond" || lowerEn === "bond") return Flame;
    if (lowerEn === "electron" || lowerEn === "proton" || lowerEn === "neutron" || lowerEn === "nucleus") return Atom;
    if (lowerEn === "biology" || lowerEn === "biologist" || lowerEn === "microscope") return Microscope;
    if (lowerEn === "organism" || lowerEn === "bacteria" || lowerEn === "virus (biological)" || lowerEn === "microbe" || lowerEn.includes("microorganism")) return Bug;
    if (lowerEn === "cell" || lowerEn === "dna" || lowerEn === "gene" || lowerEn === "genetics") return Dna;
    if (lowerEn === "medicine" || lowerEn === "drug" || lowerEn === "vaccine" || lowerEn === "health" || lowerEn === "disease") return Heart;
    if (lowerEn === "blood" || lowerEn === "heart" || lowerEn === "organ" || lowerEn.includes("system") || lowerEn === "nutrients") return Heart;
    if (lowerEn === "brain" || lowerEn.includes("nervous")) return Brain;
    if (lowerEn === "body" || lowerEn === "skin" || lowerEn === "muscle" || lowerEn === "bone") return User;
    if (lowerEn === "eye") return Eye;
    if (lowerEn === "ear" || lowerEn === "mouth" || lowerEn === "tooth" || lowerEn === "tongue") return Smile;
    if (lowerEn === "sun" || lowerEn === "photosynthesis") return Sun;
    if (lowerEn === "ecosystem") return Globe;
    if (lowerEn === "exam" || lowerEn === "homework" || lowerEn === "syllabus") return ClipboardList;
    if (lowerEn === "question") return CircleQuestionMark;
    if (lowerEn === "answer") return SquareCheckBig;
    if (lowerEn.includes("admission") || lowerEn.includes("acceptance")) return UserCheck;
    if (lowerEn.startsWith("to read") || lowerEn.startsWith("to study")) return BookOpen;
    if (lowerEn.startsWith("to write") || lowerEn.startsWith("to draw")) return PenTool;
    if (lowerEn.startsWith("to learn")) return GraduationCap;
    if (lowerEn.startsWith("to speak") || lowerEn.startsWith("to listen") || lowerEn.startsWith("to talk")) return Volume2;
    if (lowerEn.startsWith("to understand") || lowerEn.startsWith("to memorize")) return Brain;
    if (lowerEn.startsWith("to ask")) return CircleQuestionMark;
    if (lowerEn.startsWith("to answer")) return SquareCheckBig;
    if (lowerEn.startsWith("to see") || lowerEn.startsWith("to watch")) return Eye;
    if (lowerEn.startsWith("to choose") || lowerEn.startsWith("to solve") || lowerEn.startsWith("to correct")) return Check;
    if (lowerEn.startsWith("to analyze") || lowerEn.startsWith("to research")) return Search$1;
    if (lowerEn.startsWith("to collect") || lowerEn.startsWith("to organize")) return Folder;
    if (lowerEn.startsWith("to show") || lowerEn.startsWith("to present")) return Presentation;
    if (lowerEn.startsWith("to update") || lowerEn.startsWith("to compare")) return RefreshCw;
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
    return IconComponent || Sparkles;
  };
  const ResolvedIcon = getIconComp();
  return React.createElement(ResolvedIcon, { className });
};
function Search() {
  useNavigate();
  const { language, userData, updateUserData } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [query, setQuery] = reactExports.useState("");
  const [recentSearches, setRecentSearches] = reactExports.useState([]);
  const [activeCefr, setActiveCefr] = reactExports.useState("All");
  const [activePartOfSpeech, setActivePartOfSpeech] = reactExports.useState("All");
  reactExports.useEffect(() => {
    if (userData == null ? void 0 : userData.recentSearches) {
      setRecentSearches(userData.recentSearches.slice(0, 5));
    }
  }, [userData == null ? void 0 : userData.recentSearches]);
  const saveRecentSearch = (term) => {
    if (!term.trim()) return;
    const newRecent = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(newRecent);
    if (updateUserData) {
      updateUserData({ recentSearches: newRecent });
    }
  };
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState("");
  const [visibleCount, setVisibleCount] = reactExports.useState(PAGE_SIZE);
  reactExports.useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 180);
    return () => clearTimeout(id);
  }, [query]);
  reactExports.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedQuery, activeCefr, activePartOfSpeech]);
  const allResults = reactExports.useMemo(() => {
    return searchVocabulary({
      query: debouncedQuery,
      cefrLevel: activeCefr,
      partOfSpeech: activePartOfSpeech
    });
  }, [debouncedQuery, activeCefr, activePartOfSpeech]);
  const results = reactExports.useMemo(
    () => allResults.slice(0, visibleCount),
    [allResults, visibleCount]
  );
  const hasMore = allResults.length > results.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100 font-sans leading-relaxed", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-900 dark:text-white leading-tight", children: language !== "ar" ? "Ferheng — the Dictionary" : "فەرهەنگ — القاموس" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: language !== "ar" ? "Every Kurmanji word — with sound, level and examples" : "كل كلمة كورمانجية — بالنطق والمستوى والأمثلة" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { className: "w-5 h-5 text-slate-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: "w-full bg-slate-50 border-2 border-slate-100 dark:bg-slate-950 dark:border-slate-800 rounded-2xl py-3.5 shadow-sm focus:border-indigo-400 focus:outline-none focus:bg-white transition-all ps-11 pe-11 font-bold text-slate-800 dark:text-white",
            placeholder: language !== "ar" ? "Try “av”, “water” or “ماء”…" : "جرّب «av» أو «ماء»…",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") saveRecentSearch(query);
            }
          }
        ),
        query && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setQuery(""),
            className: "absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none", dir: "ltr", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-slate-400 me-1", children: "CEFR:" }),
          ["All", "A1", "A2", "B1", "B2"].map((lvl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveCefr(lvl),
              className: `relative after:absolute after:-inset-y-2 after:-inset-x-1.5 after:content-[''] px-3 py-2 rounded-xl text-[11px] font-black cursor-pointer transition-all border-none ${activeCefr === lvl ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50"}`,
              children: lvl
            },
            lvl
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none", dir: "ltr", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-slate-400 me-1", children: "POS:" }),
          [
            { id: "All", name: "All" },
            { id: "noun", name: "Nouns" },
            { id: "verb", name: "Verbs" },
            { id: "numeral", name: "Numbers" },
            { id: "adjective", name: "Adjectives" }
          ].map((pos) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActivePartOfSpeech(pos.id),
              className: `relative after:absolute after:-inset-y-2 after:-inset-x-1.5 after:content-[''] px-2.5 py-2 rounded-xl text-[10px] font-bold cursor-pointer transition-all border-none ${activePartOfSpeech === pos.id ? "bg-purple-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`,
              children: pos.name
            },
            pos.id
          ))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4", children: [
      !query.trim() && activeCefr === "All" && activePartOfSpeech === "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pt-2", children: [
        recentSearches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2.5 px-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-black text-slate-400 uppercase tracking-wider", children: language === "ku" ? "Lêgerînên Dawî" : language !== "ar" ? "Recent Queries" : "عمليات البحث الأخيرة" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: recentSearches.map((term, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setQuery(term),
              className: "relative after:absolute after:-inset-y-1 after:inset-x-0 after:content-[''] bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 cursor-pointer",
              children: term
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 px-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black text-slate-900 dark:text-white mb-1", children: language === "ku" ? "Li ferhengê bigere" : language !== "ar" ? "Search the ferheng" : "ابحث في القاموس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto", children: language === "ku" ? "Ji bo dîtina peyvan, her peyvek bi Kurmancî, Îngilîzî yan Erebî binivîse." : language !== "ar" ? "Type a word in Kurmanji, English or Arabic — its sound, level and examples appear here." : "اكتب أي كلمة بالكورمانجية أو معناها بالعربية والإنجليزية للبحث في كافة القاموس." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        results.map((item) => {
          const isFav = isFavorite(item.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:border-indigo-300 transition-all flex flex-col gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 sm:gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-100/50 dark:border-slate-800/80 rounded-xl flex items-center justify-center shrink-0 shadow-inner", children: getWordIcon(item) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-black text-slate-900 dark:text-white font-mono", dir: "ltr", children: item.lemmaKu }),
                        item.ipa && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-lg border border-purple-200 dark:border-purple-900/60", children: item.ipa }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300", children: item.cefrLevel })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-slate-600 dark:text-slate-300 mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language !== "ar" ? item.translations.en : item.translations.ar }),
                        item.translations.en !== item.translations.ar && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 ms-2 font-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("bdi", { children: [
                          "(",
                          language !== "ar" ? item.translations.ar : item.translations.en,
                          ")"
                        ] }) })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                    item.media.audioUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(AudioButton, { audioUrl: item.media.audioUrl, textToSpeak: item.lemmaKu }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleFavorite(item.id),
                        "aria-label": language !== "ar" ? isFav ? "Remove from favorites" : "Add to favorites" : isFav ? "إزالة من المفضلة" : "أضف إلى المفضلة",
                        "aria-pressed": isFav,
                        className: `p-3 rounded-xl border-none cursor-pointer transition-all ${isFav ? "bg-rose-50 text-rose-500 dark:bg-rose-950/40" : "bg-slate-100 text-slate-400 dark:bg-slate-800 hover:text-rose-500"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-5 h-5 ${isFav ? "fill-rose-500" : ""}` })
                      }
                    )
                  ] })
                ] }),
                item.examples.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-slate-800 dark:text-slate-200 mb-0.5", dir: "ltr", children: [
                    '"',
                    item.examples[0].sentenceKu,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: language !== "ar" ? item.examples[0].translations.en : item.examples[0].translations.ar })
                ] })
              ]
            },
            item.id
          );
        }),
        hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setVisibleCount((c) => c + PAGE_SIZE),
            className: "w-full py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm hover:border-indigo-300 active:scale-[0.99] transition-all cursor-pointer",
            children: language !== "ar" ? `Show more (${allResults.length - results.length} remaining)` : `عرض المزيد (${allResults.length - results.length} متبقية)`
          }
        ),
        results.length === 0 && (query.trim() || activeCefr !== "All" || activePartOfSpeech !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-500 dark:text-slate-400", children: language !== "ar" ? "No words match your search — try a shorter spelling." : "لا توجد كلمات مطابقة — جرّب كتابة أقصر." }) })
      ] })
    ] })
  ] });
}
export {
  Search
};
