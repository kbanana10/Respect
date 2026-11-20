import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useAuth, t, i as isFirebaseConfigured } from "./index-C4ml4lrv.js";
import { u as useNavigate } from "./vendor-router-m5cA7LJQ.js";
import { A as ArrowLeft, l as Sparkles, w as Check } from "./vendor-icons-UlZxPqC8.js";
import { A as AnimatePresence, m as motion } from "./vendor-motion-D8-S3eer.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-confetti-Dl7ieZFU.js";
const LANGUAGES = [
  { id: "ku", native: "Kurdî (Kurmancî)", hint: "Zimanê dilê me", dir: "ltr" },
  { id: "ar", native: "العربية", hint: "واجهة من اليمين إلى اليسار", dir: "rtl" },
  { id: "en", native: "English", hint: "Left-to-right interface", dir: "ltr" }
];
function Login() {
  const { signInWithName, loginWithGoogle, user, language, setLanguage } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = reactExports.useState("welcome");
  const [name, setName] = reactExports.useState("");
  const [authError, setAuthError] = reactExports.useState(null);
  const [legalAccepted, setLegalAccepted] = reactExports.useState(false);
  const [legalNudge, setLegalNudge] = reactExports.useState(false);
  const recordLegalAcceptance = () => {
    try {
      localStorage.setItem("kurdish_quest_legal_accepted", (/* @__PURE__ */ new Date()).toISOString());
    } catch {
    }
  };
  const requireLegal = () => {
    if (legalAccepted) return true;
    setLegalNudge(true);
    return false;
  };
  const [googleBusy, setGoogleBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requireLegal()) return;
    if (name.trim()) {
      recordLegalAcceptance();
      signInWithName(name.trim());
    }
  };
  const handleGoogle = async () => {
    if (!requireLegal()) return;
    recordLegalAcceptance();
    setAuthError(null);
    setGoogleBusy(true);
    try {
      await loginWithGoogle();
    } catch {
      setAuthError(
        language === "ku" ? "Têketina Google serneket. Ji kerema xwe wek mêvan berdewam bike." : language === "ar" ? "تعذّر تسجيل الدخول عبر Google. تابع كضيف من فضلك." : "Google sign-in did not complete. Please continue as guest."
      );
    } finally {
      setGoogleBusy(false);
    }
  };
  const phaseIndex = phase === "welcome" ? 0 : phase === "language" ? 1 : 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center min-h-[92vh] p-6 text-center bg-gradient-to-b from-indigo-50/20 via-white to-white dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm flex items-center justify-between pt-2 pb-4 min-h-[52px]", children: [
      phase !== "welcome" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setPhase(phase === "auth" ? "language" : "welcome"),
          "aria-label": t(language, "ftux_back"),
          className: "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-line-soft text-muted hover:text-ink shadow-xs cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 rtl:-scale-x-100" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", "aria-hidden": "true", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `rounded-full transition-all duration-300 ${i === phaseIndex ? "w-6 h-2 bg-[#FFB300]" : "w-2 h-2 bg-slate-200 dark:bg-slate-700"}`
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full max-w-sm flex flex-col justify-center pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      phase === "welcome" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
          className: "space-y-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { scale: 0.8, rotate: -14 },
                animate: { scale: 1, rotate: 8 },
                transition: { type: "spring", stiffness: 200, damping: 14 },
                className: "mx-auto w-28 h-28 bg-gradient-to-br from-[#FFC541] to-[#FFA000] rounded-3xl shadow-xl shadow-[#FFB300]/25 flex items-center justify-center border-2 border-[#FFDE8A] relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#432C00] font-black text-6xl select-none", children: "K" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-900 rounded-full border border-line-soft shadow-md flex items-center justify-center text-xl select-none", children: "👋" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[27px] font-black text-ink tracking-tight leading-snug text-balance", children: t(language, "ftux_welcome_title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted font-semibold leading-relaxed px-2", children: t(language, "ftux_welcome_tagline") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setPhase("language"),
                className: "w-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] py-4 rounded-full font-black text-base shadow-[0_3px_0_#E69500,0_10px_20px_rgba(255,179,0,0.22)] transition-all cursor-pointer flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                  t(language, "ftux_get_started")
                ]
              }
            )
          ]
        },
        "welcome"
      ),
      phase === "language" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
          className: "space-y-7",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-ink tracking-tight leading-snug", children: t(language, "ftux_lang_title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted font-semibold leading-relaxed", children: t(language, "ftux_lang_subtitle") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: LANGUAGES.map((opt) => {
              const active = language === opt.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setLanguage(opt.id),
                  dir: opt.dir,
                  className: `w-full p-4 rounded-3xl border-2 flex items-center justify-between gap-3 transition-all cursor-pointer text-start bg-white dark:bg-slate-900 ${active ? "border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14] shadow-[0_4px_20px_rgba(255,179,0,0.15)]" : "border-line-soft hover:border-[#FFB300]/50 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block font-black text-base ${active ? "text-[#8A6100] dark:text-[#FFCE6B]" : "text-ink"}`, children: opt.native }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted font-semibold mt-0.5", children: opt.hint })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${active ? "bg-[#FFB300] text-[#432C00]" : "bg-slate-100 dark:bg-slate-800 text-transparent"}`,
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 stroke-[3.5]" })
                      }
                    )
                  ]
                },
                opt.id
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setPhase("auth"),
                className: "w-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] py-4 rounded-full font-black text-base shadow-[0_3px_0_#E69500,0_10px_20px_rgba(255,179,0,0.22)] transition-all cursor-pointer",
                children: t(language, "continue")
              }
            )
          ]
        },
        "language"
      ),
      phase === "auth" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
          className: "space-y-7",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-ink tracking-tight leading-snug", children: t(language, "ftux_auth_title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted font-semibold leading-relaxed", children: t(language, "ftux_auth_subtitle") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `p-4 rounded-3xl border-2 text-start transition-all ${legalNudge && !legalAccepted ? "border-danger/60 bg-rose-50/60 dark:bg-rose-950/20" : legalAccepted ? "border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14]" : "border-line-soft bg-white dark:bg-slate-900"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer select-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: legalAccepted,
                        onChange: (e) => {
                          setLegalAccepted(e.target.checked);
                          if (e.target.checked) setLegalNudge(false);
                        },
                        className: "sr-only"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: `mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${legalAccepted ? "bg-[#FFB300] border-[#FFB300] text-[#432C00]" : "bg-white dark:bg-slate-900 border-line-soft text-transparent"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 stroke-[3.5]" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-ink leading-relaxed", children: [
                      t(language, "legal_agree_prefix"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate("/terms");
                          },
                          className: "text-[#B45309] dark:text-[#FFCE6B] font-extrabold underline underline-offset-2 bg-transparent border-none p-0 min-h-0 cursor-pointer",
                          children: t(language, "terms_of_service")
                        }
                      ),
                      " ",
                      t(language, "legal_and"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate("/privacy");
                          },
                          className: "text-[#B45309] dark:text-[#FFCE6B] font-extrabold underline underline-offset-2 bg-transparent border-none p-0 min-h-0 cursor-pointer",
                          children: t(language, "privacy_policy")
                        }
                      )
                    ] })
                  ] }),
                  legalNudge && !legalAccepted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-danger font-bold mt-2 ms-9", role: "alert", children: t(language, "legal_required_hint") })
                ]
              }
            ),
            isFirebaseConfigured && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleGoogle,
                disabled: googleBusy,
                className: `w-full bg-white dark:bg-slate-900 border border-line-soft py-4 rounded-full font-extrabold text-sm text-ink shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-3 ${!legalAccepted ? "opacity-60" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5 shrink-0", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A11.99 11.99 0 0 0 12 24z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29v-3.1H1.29A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.29 5.39l4-3.1z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 4.76c1.76 0 3.34.61 4.58 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.61l4 3.1C6.23 6.87 8.88 4.76 12 4.76z" })
                  ] }),
                  t(language, "ftux_google")
                ]
              }
            ),
            authError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-danger font-bold leading-relaxed", role: "alert", children: authError }),
            isFirebaseConfigured && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 h-px bg-line-soft" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-subtle", children: t(language, "ftux_or") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 h-px bg-line-soft" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: t(language, "enter_name"),
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "w-full bg-white dark:bg-slate-900 border-2 border-line-soft text-ink py-4 px-6 rounded-full font-black focus:outline-none focus:border-[#FFB300] focus:ring-4 focus:ring-[#FFB300]/20 transition-all text-center text-base placeholder-slate-400 dark:placeholder-slate-500 shadow-xs",
                  required: true,
                  maxLength: 25
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "submit",
                  className: `w-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] py-4 rounded-full font-black text-base shadow-[0_3px_0_#E69500,0_10px_20px_rgba(255,179,0,0.22)] transition-all cursor-pointer flex items-center justify-center gap-2 ${!legalAccepted ? "opacity-60" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                    t(language, "start_playing")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted font-semibold leading-relaxed", children: t(language, "ftux_guest_hint") })
            ] })
          ]
        },
        "auth"
      )
    ] }) })
  ] });
}
export {
  Login
};
