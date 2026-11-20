import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useAuth, A as AudioButton } from "./index-C4ml4lrv.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { A as ArrowLeft, a1 as MessageSquare, l as Sparkles, p as BookOpen, I as Clock, j as Compass, f as Sun, g as Moon, b4 as PartyPopper, v as ChevronRight, d as Heart, m as Smile, U as User, b5 as ChefHat, b6 as Stethoscope, q as Briefcase, b7 as Utensils, b8 as Handshake, t as Coffee, F as Flame } from "./vendor-icons-UlZxPqC8.js";
import { A as AnimatePresence, m as motion } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
const renderSentencesIcon = (iconName, className = "w-6 h-6 text-purple-600") => {
  const iconMap = {
    "Flame": Flame,
    "Coffee": Coffee,
    "Handshake": Handshake,
    "Utensils": Utensils,
    "Briefcase": Briefcase,
    "Stethoscope": Stethoscope,
    "ChefHat": ChefHat,
    "User": User,
    "BookOpen": BookOpen,
    "Smile": Smile,
    "MessageSquare": MessageSquare,
    "Compass": Compass,
    "Clock": Clock,
    "Sun": Sun,
    "Moon": Moon,
    "PartyPopper": PartyPopper,
    "Sparkles": Sparkles,
    "Heart": Heart
  };
  const IconComponent = iconMap[iconName];
  if (IconComponent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className });
};
const everydayPhrases = [
  { id: "ev1", ku: "Ez fêrî Kurmancî dibim.", en: "I am learning Kurmanji.", ar: "أنا أتعلم الكورمانجية.", emoji: "BookOpen", audio: "" },
  { id: "ev2", ku: "Kerem bike, rûnişte.", en: "Please, take a seat.", ar: "تفضل بالجلوس.", emoji: "Smile", audio: "" },
  { id: "ev3", ku: "Spas ji bo alîkariya te.", en: "Thank you for your help.", ar: "شكراً لك على مساعدتك.", emoji: "Handshake", audio: "" },
  { id: "ev4", ku: "Ez te fêm nakim.", en: "I do not understand you.", ar: "أنا لا أفهمك.", emoji: "Smile", audio: "" },
  { id: "ev5", ku: "Tu dikarî hêdî biaxivî?", en: "Can you speak slowly?", ar: "هل يمكنك التحدث ببطء؟", emoji: "MessageSquare", audio: "" },
  { id: "ev6", ku: "Bi xêr hatî bo mala me.", en: "Welcome to our home.", ar: "أهلاً بك في منزلنا.", emoji: "Compass", audio: "" },
  { id: "ev7", ku: "Ez birçî me, xwarin heye?", en: "I am hungry, is there food?", ar: "أنا جائع، هل هناك طعام؟", emoji: "Utensils", audio: "" },
  { id: "ev8", ku: "Ez tî me, ava sar dixwazim.", en: "I am thirsty, I want cold water.", ar: "أنا عطشان، أريد ماء بارداً.", emoji: "Coffee", audio: "" },
  { id: "ev9", ku: "Navnîşan kûderê ye?", en: "Where is the address?", ar: "أين يقع العنوان؟", emoji: "Compass", audio: "" },
  { id: "ev10", ku: "Kengî em ê biçin?", en: "When will we go?", ar: "متى سنذهب؟", emoji: "Clock", audio: "" }
];
const temporalPhrases = [
  // Morning (فترة الصباح والتحيات الصباحية)
  { id: "tm1", ku: "Rojbaş! Sibeha te bi xêr be.", en: "Good morning! Have a blessed morning.", ar: "صباح الخير! يسعد صباحك.", emoji: "Sun", audio: "", timeTag: "morning" },
  { id: "tm2", ku: "Hema niha ez şiyar bûm.", en: "I just woke up right now.", ar: "لقد استيقظت للتو الآن.", emoji: "Smile", audio: "", timeTag: "morning" },
  { id: "tm3", ku: "Ez ê taştê bixwim.", en: "I will eat breakfast.", ar: "سوف أتناول الفطور.", emoji: "Utensils", audio: "", timeTag: "morning" },
  { id: "tm4", ku: "Saet çend e di sibehan de?", en: "What time is it in the morning?", ar: "كم الساعة في الصباح؟", emoji: "Clock", audio: "", timeTag: "morning" },
  // Afternoon/Evening (المساء، العصر والظهيرة)
  { id: "te1", ku: "Êvarbaş! Demên we xweş bin.", en: "Good evening! Have a good time.", ar: "مساء الخير! طابت أوقاتكم.", emoji: "Sun", audio: "", timeTag: "evening" },
  { id: "te2", ku: "Şevbaş! Xewnên xweş.", en: "Good night! Sweet dreams.", ar: "تصبح على خير! أحلاماً سعيدة.", emoji: "Moon", audio: "", timeTag: "evening" },
  { id: "te3", ku: "Paş nîvroya te bi xêr be.", en: "Have a great afternoon.", ar: "طابت بعد ظهيرتك.", emoji: "Sun", audio: "", timeTag: "evening" },
  { id: "te4", ku: "Em ê li serê êvarê bên bal te.", en: "We will visit you in the evening.", ar: "سنأتي لزيارتك في وقت المساء.", emoji: "Coffee", audio: "", timeTag: "evening" },
  // Occasions (المناسبات والأعياد)
  { id: "to1", ku: "Cejna te pîroz be!", en: "Happy Feast / Eid!", ar: "عيدك مبارك! / كل عام وأنت بخير.", emoji: "PartyPopper", audio: "", timeTag: "occasions" },
  { id: "to2", ku: "Rojbûna te pîroz be!", en: "Happy birthday!", ar: "عيد ميلاد سعيد!", emoji: "Smile", audio: "", timeTag: "occasions" },
  { id: "to3", ku: "Sersala we pîroz be!", en: "Happy new year!", ar: "سنة جديدة سعيدة! / كل عام وأنتم بخير.", emoji: "PartyPopper", audio: "", timeTag: "occasions" },
  { id: "to4", ku: "Serkeftinê ji bo we dixwazim.", en: "I wish you success.", ar: "أتمنى لكم التوفيق والنجاح.", emoji: "Sparkles", audio: "", timeTag: "occasions" }
];
const readingPassages = [
  {
    id: "rp1",
    titleKu: "Newroz û Hatinên Biharê",
    titleEn: "Newroz and the Arrival of Spring",
    titleAr: "نوروز وقدوم فصل الربيع",
    icon: "Flame",
    fullKu: "Bihar hat û xwezaye şîn bû. Newroz roja nû ye û cejna gelê Kurd e. Di vê rojê de em agir dadidin, govendê digirin û cilan nû li xwe dikin.",
    fullEn: "Spring has arrived and nature has turned green. Newroz is a new day and the festival of the Kurdish people. On this day we light fire, dance traditional dances, and wear new clothes.",
    fullAr: "لقد جاء الربيع واكتست الطبيعة بالاخضرار. عيد نوروز هو اليوم الجديد وهو العيد الوطني للشعب الكردي. في هذا اليوم نوقد نيران نوروز، ونعقد الدبكات ونرتدي ملابسنا الجديدة الفلكلورية.",
    sentences: [
      { ku: "Bihar hat û xwezaye şîn bû.", en: "Spring has arrived and nature has turned green.", ar: "لقد جاء الربيع واكتست الطبيعة بالخضار والجمال." },
      { ku: "Newroz roja nû ye û cejna gelê Kurd e.", en: "Newroz is a new day and the festival of the Kurdish people.", ar: "عيد نوروز هو اليوم الجديد وهو عيد الشعب الكردي." },
      { ku: "Di vê rojê de em agir dadidin û govendê digirin.", en: "On this day we light fire and dance traditional dances.", ar: "في هذا اليوم نوقد الشعلة ونعقد الدبكات والرقصات الشعبية." },
      { ku: "Em cilên nû û rengîn li xwe dikin.", en: "We wear new and colorful clothes.", ar: "ونرتدي الملابس الجديدة الملونة والجميلة." }
    ],
    vocabulary: [
      { ku: "Bihar", tr: "Spring / الربيع" },
      { ku: "Roja nû", tr: "New day / اليوم الجديد" },
      { ku: "Agir", tr: "Fire / النار" },
      { ku: "Govend", tr: "Traditional Dance / الدبكة" }
    ]
  },
  {
    id: "rp2",
    titleKu: "Mêvanperweriya Kurdan",
    titleEn: "Kurdish Hospitality",
    titleAr: "عادات الضيافة الكردية الاصيلة",
    icon: "Coffee",
    fullKu: "Kurd gelek mêvanperwer in. Çay li her malê heye û ji bo mêvanan her tim xwarinên xweş amade dikin. Deriyê malê wan her tim vekirî ye.",
    fullEn: "Kurdish people are very hospitable. Tea is available in every house, and they always prepare delicious food for guests. The doors of their homes are always open.",
    fullAr: "يتميز الكرد بكرم الضيافة وحسن الاستقبال الشديدين. الشاي الساخن متواجد في كل بيت ودائماً ما يحضرون ألذ الأطعمة لضيوفهم. باب منازلهم مفتوح دائمًا لكل قاصد.",
    sentences: [
      { ku: "Kurd gelek mêvanperwer in.", en: "Kurdish people are very hospitable.", ar: "يتميز الشعب الكردي بكرم الضيافة الشديد." },
      { ku: "Çay li her malê heye û her tim amade ye.", en: "Tea is in every house and always ready.", ar: "الشاي متوفر دائماً وبشكل أساسي في كل منزل." },
      { ku: "Ji bo mêvanan xwarinên pir xweş amade dikin.", en: "They prepare delicious food for the guests.", ar: "يقومون بإعداد وتجهيز الوجبات اللذيذة والشهية إكراماً للضيوف." },
      { ku: "Deriyê malê wan her tim vekirî ye.", en: "The doors of their homes are always open.", ar: "أبواب بيوتهم ومضافاتهم مفتوحة دائماً للقادمين." }
    ],
    vocabulary: [
      { ku: "Mêvanperwer", tr: "Hospitable / كريم ومحب للضيوف" },
      { ku: "Malê", tr: "House / البيت" },
      { ku: "Xwarin", tr: "Food / الطعام" },
      { ku: "Vekirî", tr: "Open / مفتوح" }
    ]
  }
];
const dialogueScenarios = [
  {
    id: "ds1",
    titleKu: "Hevdîtin û Nasîn",
    titleEn: "Meeting & Acquaintance",
    titleAr: "اللقاء الأول والتعارف في العمل والمعهد",
    descriptionKu: "Mutedeka Azad û Jiyan dema yekem car li zanîngehê li hev rast tên.",
    descriptionEn: "The dialogue between Azad and Jiyan meeting for the first time at university.",
    descriptionAr: "حوار تعريفي ملهم بين آزاد وجيان عند لقائهما لأول مرة في الحرم الجامعي.",
    icon: "Handshake",
    turns: [
      { speaker: "Azad", avatar: "Briefcase", gender: "male", align: "left", ku: "Rojbaş! Ez Azad im. Navê te çiye?", en: "Good morning! I am Azad. What is your name?", ar: "صباح الخير! أنا آزاد. ما اسمك؟" },
      { speaker: "Jiyan", avatar: "Stethoscope", gender: "female", align: "right", ku: "Rojbaş Azad! Navê min Jiyan e. Tu çawa yî?", en: "Good morning Azad! My name is Jiyan. How are you?", ar: "صباح الخير آزاد! اسمي جيان. كيف حالك؟" },
      { speaker: "Azad", avatar: "Briefcase", gender: "male", align: "left", ku: "Ez baş im, spas. Tu ji ku yî, Jiyan?", en: "I am doing well, thank you. Where are you from, Jiyan?", ar: "أنا بخير، شكراً. من أين أنت يا جيان؟" },
      { speaker: "Jiyan", avatar: "Stethoscope", gender: "female", align: "right", ku: "Ez ji Qamişloyê me, lê ez li Amedê fêrî bîkolojiyê dibim. Tu?", en: "I am from Qamishli, but I study biology in Diyarbakir. How about you?", ar: "أنا من قامشلي، ولكني أدرس علم الأحياء في ديار بكر. وأنت؟" },
      { speaker: "Azad", avatar: "Briefcase", gender: "male", align: "left", ku: "Ez ji Helebceyê me. Ez gelek kêfxweş bûm bi nasîna te, Jiyan.", en: "I am from Halabja. I am very delighted to meet you, Jiyan.", ar: "أنا من حلبجة. لقد سعدت جداً بلقائك ومعرفتك يا جيان." },
      { speaker: "Jiyan", avatar: "Stethoscope", gender: "female", align: "right", ku: "Spas Azad, ez jî her weha. Serkeftin bo te!", en: "Thank you Azad, me too. Good luck to you!", ar: "شكراً آزاد، وأنا كذلك بالتأكيد. التوفيق والنجاح لك!" }
    ]
  },
  {
    id: "ds2",
    titleKu: "Di Xwaringehê de",
    titleEn: "At the Traditional Restaurant",
    titleAr: "طلب الطعام في مطعم شعبي كوردستاني كلاسيكي",
    descriptionKu: "Muxabereya Hêriş û Garsonê xwaringeha kurdî ya meşhûr.",
    descriptionEn: "The dialog between Hêriş and the Waiter at a famous Kurdish food joint.",
    descriptionAr: "محادثة شيقة وواقعية لطلب المأكولات والمشروبات الشعبية مع النادل.",
    icon: "Utensils",
    turns: [
      { speaker: "Garson", avatar: "ChefHat", gender: "male", align: "left", ku: "Bi xêr hatin! Hûn çi xwarin dixwazin birêz?", en: "Welcome! What kind of food would you like, sir?", ar: "أهلاً وسهلاً بكم! أي طعام ترغبون به سيدي؟" },
      { speaker: "Hêriş", avatar: "User", gender: "male", align: "right", ku: "Spas be. Ez şorbe, birinc û goştê berxê dixwazim. Gelo selete heye?", en: "Thank you. I want soup, rice, and lamb meat. Is there any salad?", ar: "شكراً لك. أريد شوربة، أرزاً، ولحم غنم. هل توجد سلطة خضراء؟" },
      { speaker: "Garson", avatar: "ChefHat", gender: "male", align: "left", ku: "Erê, em ê niha amade bikin. Ji bo vexwarinê çi dixwazin?", en: "Yes, we will prepare it now. What would you like to drink?", ar: "نعم متوفرة، سنحضرها حالاً. ماذا تطلبون للشرب؟" },
      { speaker: "Hêriş", avatar: "User", gender: "male", align: "right", ku: "Avek sar bînin. Û her weha piştî xwarinê çayeke germ bînin.", en: "Bring cold water. And also, bring hot tea after the meal.", ar: "أحضر ماءً بارداً. وأيضاً أحضر كوباً من الشاي الساخن بعد الوجبة." },
      { speaker: "Garson", avatar: "ChefHat", gender: "male", align: "left", ku: "Li ser seran û ser çavan! Niha amade dibe.", en: "On my head and my eyes! It will be ready shortly.", ar: "على راسي وعيني! سيكون طلباً جاهزاً خلال دقائق." }
    ]
  }
];
function Sentences() {
  const { language } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("everyday");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [selectedPassage, setSelectedPassage] = reactExports.useState(null);
  const [selectedScenario, setSelectedScenario] = reactExports.useState(null);
  const [temporalFilter, setTemporalFilter] = reactExports.useState("morning");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-6 min-h-screen pb-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-950/25 rounded-full filter blur-3xl pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3/4 right-5 w-72 h-72 bg-purple-200/15 dark:bg-purple-950/20 rounded-full filter blur-3xl pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2 max-w-xl mx-auto", children: [
      (selectedPassage || selectedScenario) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            if (selectedPassage) {
              setSelectedPassage(null);
            } else if (selectedScenario) {
              setSelectedScenario(null);
            } else {
              navigate("/");
            }
          },
          "aria-label": language !== "ar" ? "Back" : "رجوع",
          className: "p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs",
          title: language !== "ar" ? "Back" : "رجوع",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 text-slate-600 dark:text-slate-400 rtl:-scale-x-100" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-900 dark:text-white leading-none", children: language !== "ar" ? "Conversational Phrases" : "جمل ومحادثات ومقالات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-wider mt-1.5 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5 text-indigo-500" }),
          language !== "ar" ? "Speak like a local" : "تحدث كأهل اللغة"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      !selectedPassage && !selectedScenario && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -15 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-flat border border-line-soft relative overflow-hidden group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -top-16 h-48 bg-[radial-gradient(circle_at_50%_0%,#FFB300_0%,transparent_65%)] opacity-[0.10] pointer-events-none", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "absolute right-0 bottom-0 opacity-[0.06] w-40 h-40 transform translate-y-8 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 text-slate-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 relative z-10 text-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-max", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-[#FFB300] fill-[#FFB300]/40 animate-pulse" }),
                  language !== "ar" ? "PHRASEOLOGY PLAYGROUND" : "منصة تركيب الجمل والمحادثات"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black mt-2 leading-tight tracking-tight text-ink", children: language !== "ar" ? "Natural Kurmanji Dialogues" : "تحدث الكورمانجية بطلاقة تامة" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-[11px] leading-relaxed font-semibold", children: language !== "ar" ? "Embark on everyday conversational chunks, filter routines, practice paragraph reading, or model immersive characters in dialogue scenarios." : "استعرض جمل الاستخدام اليومي الهامة، التحيات الصباحية والمسائية، مقالات تعليمية للقراءة بفقرات قابلة للتحليل، ومحاكاة محادثات حية واقعية." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto grid grid-cols-4 gap-1 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setActiveTab("everyday"),
                  className: `text-center py-2.5 rounded-xl text-[10px] md:text-xs font-black transition-all cursor-pointer border-none flex flex-col items-center gap-1 ${activeTab === "everyday" ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/10" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Everyday" : "يومي" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setActiveTab("temporal"),
                  className: `text-center py-2.5 rounded-xl text-[10px] md:text-xs font-black transition-all cursor-pointer border-none flex flex-col items-center gap-1 ${activeTab === "temporal" ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/10" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Timings" : "أوقات" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setActiveTab("reading"),
                  className: `text-center py-2.5 rounded-xl text-[10px] md:text-xs font-black transition-all cursor-pointer border-none flex flex-col items-center gap-1 ${activeTab === "reading" ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-600/10" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Reading" : "قصص وقراءة" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setActiveTab("dialogues"),
                  className: `text-center py-2.5 rounded-xl text-[10px] md:text-xs font-black transition-all cursor-pointer border-none flex flex-col items-center gap-1 ${activeTab === "dialogues" ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-600/10" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Dialogues" : "محادثات" })
                  ]
                }
              )
            ] }),
            activeTab === "everyday" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5 max-w-xl mx-auto text-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                  language !== "ar" ? "CORE DAILY PHRASES" : "جمل الاستخدام الضرورية طوال اليوم"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-extrabold bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg", children: [
                  everydayPhrases.length,
                  " ",
                  language !== "ar" ? "Phrases" : "جملة"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: everydayPhrases.map((phrase, idx) => {
                const isCurrent = expandedId === phrase.id;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.98, y: 10 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    transition: { delay: idx * 0.03, type: "spring" },
                    onClick: () => setExpandedId(isCurrent ? null : phrase.id),
                    className: "p-4 bg-white dark:bg-slate-900 border border-slate-200 border-s-4 border-s-indigo-600 dark:border-s-indigo-500 dark:border-slate-800 rounded-2xl flex flex-col gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.025)] hover:border-indigo-300 dark:hover:border-slate-800 transition-all cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center shrink-0", children: renderSentencesIcon(phrase.emoji, "w-5 h-5 text-indigo-600 dark:text-indigo-400") }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: phrase.ku }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language !== "ar" ? phrase.en : phrase.ar }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AudioButton,
                          {
                            audioUrl: phrase.audio,
                            textToSpeak: phrase.ku,
                            className: "p-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 border-none hover:bg-indigo-100",
                            iconClassName: "w-4 h-4",
                            showProgress: false
                          }
                        ) })
                      ] }),
                      isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, height: 0 },
                          animate: { opacity: 1, height: "auto" },
                          className: "pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1 px-1 bg-slate-50/50 dark:bg-slate-950/10 p-2.5 rounded-xl border border-dashed text-[10px] font-medium leading-relaxed",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block", children: "Detailed equivalents:" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-600 dark:text-slate-400", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-indigo-600", children: "English:" }),
                                " ",
                                phrase.en
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-600 dark:text-slate-400", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-indigo-600 font-arabic", children: "العربية:" }),
                                " ",
                                phrase.ar
                              ] })
                            ] })
                          ]
                        }
                      )
                    ]
                  },
                  phrase.id
                );
              }) })
            ] }),
            activeTab === "temporal" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-xl mx-auto text-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex p-0.5 bg-slate-100 dark:bg-slate-900 rounded-xl gap-0.5 border border-slate-200 dark:border-slate-800", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setTemporalFilter("morning"),
                    className: `flex-1 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border-none flex items-center justify-center gap-1 ${temporalFilter === "morning" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-slate-400"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-3.5 h-3.5 text-amber-500" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Morning" : "تحيات الصباح" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setTemporalFilter("evening"),
                    className: `flex-1 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border-none flex items-center justify-center gap-1 ${temporalFilter === "evening" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-slate-400"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-3.5 h-3.5 text-indigo-600" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Evening" : "المساء والليل" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setTemporalFilter("occasions"),
                    className: `flex-1 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border-none flex items-center justify-center gap-1 ${temporalFilter === "occasions" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-slate-400"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-3.5 h-3.5 text-purple-500" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language !== "ar" ? "Occasions" : "المناسبات بالأعياد" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: temporalPhrases.filter((p) => p.timeTag === temporalFilter).map((item, idx) => {
                const isCurrent = expandedId === item.id;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.98, y: 8 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    transition: { delay: idx * 0.03 },
                    onClick: () => setExpandedId(isCurrent ? null : item.id),
                    className: "p-4 bg-white dark:bg-slate-900 border border-slate-200 border-s-4 border-s-indigo-600 dark:border-s-indigo-500 dark:border-slate-800 rounded-2xl flex flex-col gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.025)] hover:border-indigo-300 dark:hover:border-slate-800 transition-all cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center shrink-0", children: renderSentencesIcon(item.emoji, "w-5 h-5 text-indigo-600 dark:text-indigo-400") }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-amber-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: item.ku }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language !== "ar" ? item.en : item.ar }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AudioButton,
                          {
                            audioUrl: item.audio,
                            textToSpeak: item.ku,
                            className: "p-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 border-none hover:bg-indigo-100",
                            iconClassName: "w-4 h-4",
                            showProgress: false
                          }
                        )
                      ] }),
                      isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 p-2.5 rounded-lg text-[10px] text-slate-500 font-semibold space-y-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-indigo-600", children: "Kurdish:" }),
                          " ",
                          item.ku
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-indigo-600", children: "English:" }),
                          " ",
                          item.en
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-arabic", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-indigo-600", children: "العربية:" }),
                          " ",
                          item.ar
                        ] })
                      ] })
                    ]
                  },
                  item.id
                );
              }) })
            ] }),
            activeTab === "reading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-xl mx-auto text-start animate-fade-in", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-4 h-4 text-purple-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider", children: language !== "ar" ? "READING PRACTICE PASSAGES" : "نصوص وقصص كاملة للتدريب على القراءة" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4", children: readingPassages.map((passage, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 15 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: index * 0.05 },
                  whileHover: { scale: 1.01 },
                  onClick: () => setSelectedPassage(passage),
                  className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] p-5 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.025)] relative overflow-hidden group hover:border-purple-300 dark:hover:border-purple-950/60",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner", children: renderSentencesIcon(passage.icon, "w-6 h-6 text-purple-600 dark:text-purple-400") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider", children: language !== "ar" ? "PASSAGE READER" : "نص قراءة وتفسير" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-base font-black text-slate-900 dark:text-white mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors", children: language !== "ar" ? passage.titleEn : passage.titleAr }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-bold italic mt-0.5", children: [
                            '"',
                            passage.titleKu,
                            '"'
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-full group-hover:bg-purple-50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-purple-500" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 bg-slate-50/80 dark:bg-slate-950/30 p-3 rounded-xl border border-slate-200/40 border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-extrabold text-slate-700 dark:text-slate-200 line-clamp-2 leading-relaxed italic", children: [
                      '"',
                      passage.fullKu,
                      '"'
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5 flex items-center justify-between text-[11px] font-extrabold text-purple-600", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        passage.sentences.length,
                        " ",
                        language !== "ar" ? "interactive chunks" : "جمل تدريب تفاعلية"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 group-hover:translate-x-1 transition-transform", children: [
                        language !== "ar" ? "Start Reading" : "ابدأ ممارسة القراءة",
                        " →"
                      ] })
                    ] })
                  ]
                },
                passage.id
              )) })
            ] }),
            activeTab === "dialogues" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-xl mx-auto text-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-purple-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider", children: language !== "ar" ? "IMMERSED CHARACTER CONVERSATIONS" : "المحادثات التفاعلية والسيناريوهات الحلقية" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4", children: dialogueScenarios.map((scenario, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.98, y: 12 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: { delay: index * 0.05 },
                  whileHover: { scale: 1.01 },
                  onClick: () => setSelectedScenario(scenario),
                  className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] p-5 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.025)] relative overflow-hidden group hover:border-purple-300 dark:hover:border-purple-950/60",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/45 border border-purple-100 dark:border-purple-900/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner", children: renderSentencesIcon(scenario.icon, "w-6 h-6 text-purple-600 dark:text-purple-400") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider", children: language !== "ar" ? "MULTI-CHARACTER" : "تعدد شخصيات" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-base font-black text-slate-900 dark:text-white mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors", children: language !== "ar" ? scenario.titleEn : scenario.titleAr }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-bold text-slate-400 dark:text-slate-500", children: [
                            '"',
                            scenario.titleKu,
                            '"'
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-full group-hover:bg-purple-50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-purple-500" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed", children: language !== "ar" ? scenario.descriptionEn : scenario.descriptionAr }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[11px] font-black", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-1.5 overflow-hidden shrink-0", children: scenario.turns.slice(0, 3).map((turn, tIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border border-white dark:border-slate-800 bg-slate-200 flex items-center justify-center shadow-2xs", children: renderSentencesIcon(turn.avatar, "w-3.5 h-3.5 text-slate-500 dark:text-slate-400") }, tIdx)) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-purple-600 hover:underline", children: [
                        language !== "ar" ? "Open Dialogue Scenario" : "ابدأ تشغيل المحادثة",
                        " →"
                      ] })
                    ] })
                  ]
                },
                scenario.id
              )) })
            ] })
          ]
        },
        "hub-dashboard"
      ),
      selectedPassage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          className: "max-w-xl mx-auto space-y-6 text-start",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 shadow-md relative overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl shrink-0 drop-shadow-md", children: selectedPassage.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-black px-2.5 py-1 rounded-md uppercase tracking-wider", children: language !== "ar" ? "PRACTICE MODULE" : "دراسة وتدريب لغوي" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-slate-900 dark:text-white mt-1", children: language !== "ar" ? selectedPassage.titleEn : selectedPassage.titleAr }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-bold italic", children: [
                    '"',
                    selectedPassage.titleKu,
                    '"'
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-slate-950/60 dark:to-slate-950/40 border border-indigo-100/50 dark:border-slate-800/80 p-5 rounded-[22px] leading-relaxed relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-2", children: "Original Text • النص الأصلي للفقرة" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-black text-slate-900 dark:text-white leading-loose tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: selectedPassage.fullKu }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5 pt-3 border-t border-indigo-100/60 dark:border-indigo-950/40 text-xs text-slate-500 dark:text-slate-400 font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Arabic:" }),
                  " ",
                  selectedPassage.fullAr
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider px-1", children: language !== "ar" ? "LINE-BY-LINE ANALYSIS" : "تحليل النص وتقسيمه جملة بعد جملة ورقة مفردات" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: selectedPassage.sentences.map((sentence, sIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: sIdx * 0.04 },
                  className: "bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-2 shadow-2xs group hover:border-indigo-100 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-400 px-2 py-0.5 rounded", children: [
                          "0",
                          sIdx + 1
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-base font-black text-slate-900 dark:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: sentence.ku }) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AudioButton,
                        {
                          textToSpeak: sentence.ku,
                          className: "p-2.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 border-none hover:bg-indigo-100",
                          iconClassName: "w-4 h-4",
                          showProgress: false
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 pt-2.5 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-1 text-[11px] text-slate-500", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-indigo-600 font-extrabold", children: "English:" }),
                        " ",
                        sentence.en
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-arabic", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-indigo-600 font-extrabold", children: "العربية:" }),
                        " ",
                        sentence.ar
                      ] })
                    ] })
                  ]
                },
                sIdx
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                language !== "ar" ? "CURATED VOCABULARY IN PASSAGE" : "مفردات هامة مستخرجة من النص"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: selectedPassage.vocabulary.map((vocab, vIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-indigo-600 dark:text-indigo-400 block", children: vocab.ku }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 block", children: vocab.tr })
              ] }, vIdx)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSelectedPassage(null),
                className: "py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black text-sm rounded-[20px] w-full shadow-lg shadow-indigo-600/10 hover:shadow-indigo-700/20 active:scale-98 transition-all border-none",
                children: language !== "ar" ? "Keep Learning • Back to Chapters" : "إتمام القراءة والرجوع للأقسام"
              }
            )
          ]
        },
        "selected-passage-view"
      ),
      selectedScenario && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
          className: "max-w-xl mx-auto space-y-6 text-start",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-5 shadow-xs flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 flex items-center justify-center text-3xl shrink-0 shadow-inner", children: selectedScenario.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-extrabold px-2 py-0.5 rounded tracking-wider uppercase", children: "DIALOGUE SCENARIO" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black text-slate-900 dark:text-white mt-0.5", children: language !== "ar" ? selectedScenario.titleEn : selectedScenario.titleAr }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold text-slate-400 dark:text-slate-500 truncate max-w-[240px] md:max-w-xs", children: [
                    '"',
                    selectedScenario.titleKu,
                    '"'
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setSelectedScenario(null),
                  className: "py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200 font-black rounded-xl text-xs border-none cursor-pointer",
                  children: language !== "ar" ? "Close" : "إغلاق"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-100/50 dark:bg-slate-900/40 p-5 rounded-[32px] border border-slate-200/40 dark:border-slate-800/80 space-y-5 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-black text-slate-400 shadow-3xs pointer-events-none", children: "Interactive Transcript" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 space-y-6", children: selectedScenario.turns.map((turn, tIdx) => {
                const isLeftAlign = turn.align === "left";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: isLeftAlign ? -15 : 15 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: tIdx * 0.08, type: "spring" },
                    className: `flex gap-3 items-end max-w-[85%] ${isLeftAlign ? "me-auto flex-row" : "ms-auto flex-row-reverse"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-xs hover:scale-105 transition-transform", children: renderSentencesIcon(turn.avatar, "w-5 h-5 text-indigo-600 dark:text-indigo-400") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black text-slate-400 mt-1 dark:text-slate-500", children: turn.speaker })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-[22px] shadow-3xs group relative ${isLeftAlign ? "bg-white dark:bg-slate-800 rounded-bl-none text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800" : "bg-indigo-600 dark:bg-indigo-700 text-white rounded-br-none"}`, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-black leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: turn.ku }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-2 pt-2 border-t text-[11px] leading-relaxed select-text font-medium ${isLeftAlign ? "border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400" : "border-white/10 text-indigo-100"}`, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "opacity-75", children: "EN:" }),
                            " ",
                            turn.en
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-arabic flex items-center gap-1.5 mt-0.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "opacity-75", children: "AR:" }),
                            " ",
                            turn.ar
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AudioButton,
                          {
                            audioUrl: turn.audio,
                            textToSpeak: turn.ku,
                            className: `p-1.5 border-none shadow-none ${isLeftAlign ? "bg-indigo-50 text-indigo-600" : "bg-white/20 text-white"}`,
                            iconClassName: "w-3.5 h-3.5",
                            showProgress: false
                          }
                        ) })
                      ] }) })
                    ]
                  },
                  tIdx
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                language !== "ar" ? "CONVERSATION METHODOLOGY KEYS" : "مفاتيح التفاعل والطلاقة اللغوية"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold", children: language !== "ar" ? 'Tap the audio button inside each dialogue turn to capture accents, model tone matching, and study the context of Kurdish honorifics like "ser seran û ser çavan" (with great honor).' : "اضغط على رمز الصوت داخل أي فقرة حوارية للتعرف على اللحن الصوتي ومخارج الكلمات، كرر العبارات مع تغيير الضمائر لزيادة ثقتك بالتحدث مباشرة." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSelectedScenario(null),
                className: "py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-black text-sm rounded-[20px] w-full shadow-lg shadow-purple-600/10 hover:shadow-purple-700/20 active:scale-97 transition-all border-none",
                children: language !== "ar" ? "Finish Conversation Study" : "إنهاء دراسة المحادثة والعودة"
              }
            )
          ]
        },
        "selected-dialogue-view"
      )
    ] })
  ] });
}
export {
  Sentences
};
