import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth, a as academicVocabulary, t, d as tLevel, A as AudioButton } from "./index-C4ml4lrv.js";
import { u as useFavorites } from "./useFavorites-CTXFeMsV.js";
import { v as vocabulary } from "./kurmanji-DANKPvwI.js";
import { d as Heart, c as Search } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
function Favorites() {
  const navigate = useNavigate();
  const { language } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = reactExports.useState("");
  const allWords = [
    ...academicVocabulary.filter(Boolean).map((w) => ({ ...w, type: "academic" })),
    // SAFETY: core vocabulary is beginner material by definition; 'beginner' is a member of AcademicLevel.
    ...vocabulary.filter(Boolean).map((w) => ({ ...w, type: "vocab", level: "beginner" }))
  ];
  const favWords = allWords.filter((w) => w && w.id && isFavorite(w.id));
  const words = favWords.filter((w) => {
    const ku = (w == null ? void 0 : w.ku) || "";
    const en = (w == null ? void 0 : w.en) || "";
    const ar = (w == null ? void 0 : w.ar) || "";
    const matchesSearch = ku.toLowerCase().includes(search.toLowerCase()) || en.toLowerCase().includes(search.toLowerCase()) || ar.includes(search);
    return matchesSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-rose-50 dark:bg-rose-950/20 rounded-3xl p-6 shadow-sm border border-rose-100 dark:border-rose-900/40 flex items-center gap-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl text-rose-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-10 h-10 fill-current" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-rose-900 dark:text-rose-200", children: t(language, "favorites") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-rose-700 dark:text-rose-400 font-medium", children: [
          favWords.length,
          " ",
          t(language, "words")
        ] })
      ] })
    ] }),
    favWords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-slate-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          className: "w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.015)] focus:border-rose-300 focus:outline-none transition-colors ps-10 pe-4 text-slate-800 dark:text-slate-100 text-xs font-semibold",
          placeholder: t(language, "search_terms"),
          value: search,
          onChange: (e) => setSearch(e.target.value)
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pb-4", children: [
      words.map((word) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] border border-slate-200 border-s-4 border-s-rose-500 dark:border-slate-800 flex flex-col gap-3 group relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-left font-black text-slate-900 dark:text-white text-base", dir: "ltr", children: word.ku }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg uppercase tracking-wider ms-4", children: tLevel(language, word.level) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-xs font-semibold mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${language === "en" || language === "ku" ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: (word == null ? void 0 : word.en) || "" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300 dark:text-slate-700", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${language === "ar" ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: (word == null ? void 0 : word.ar) || "" }) })
          ] })
        ] }) }),
        "exampleKu" in word && word.exampleKu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50/75 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-left font-extrabold text-slate-800 dark:text-slate-200 mb-1", dir: "ltr", children: [
            '"',
            word.exampleKu,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("bdi", { children: language === "ar" ? word.exampleAr : word.exampleEn }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onPointerDown: (e) => {
                e.preventDefault();
                toggleFavorite(word.id);
              },
              className: `p-2 rounded-full transition-colors cursor-pointer ${isFavorite(word.id) ? "bg-rose-50 dark:bg-rose-950/40 text-rose-500" : "bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500 hover:bg-slate-100"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-5 h-5 ${isFavorite(word.id) ? "fill-current" : ""}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AudioButton, { audioUrl: word.audio, textToSpeak: word.ku, className: "bg-rose-50 dark:bg-rose-950/45 text-rose-600 dark:text-rose-400 hover:bg-rose-100 border-none" })
        ] })
      ] }, word.id)),
      favWords.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-2 border-dashed border-rose-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-16 h-16 text-rose-300 dark:text-rose-900/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-slate-800 dark:text-white", children: t(language, "no_results") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400", children: language === "ku" ? "Kategoriyên peyvan bigere û peyvên akademîk yan giştî li bijareyên xwe zêde bike!" : language === "ar" ? "تصفح تصنيفات المفردات وأضف المصطلحات إلى مفضلتك الشخصية!" : "Go explore vocabulary categories and add standard or academic items to your favorites!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => navigate("/vocabulary"),
            className: "mt-4 bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold px-6 py-3 rounded-2xl hover:bg-rose-200 transition-colors border-none cursor-pointer",
            children: language === "ku" ? "Peyvan Bibîne" : language === "ar" ? "استعراض المفردات" : "Browse Vocabulary"
          }
        )
      ] }),
      words.length === 0 && favWords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 text-slate-500 font-medium", children: t(language, "no_results") })
    ] })
  ] });
}
export {
  Favorites
};
