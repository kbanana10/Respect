import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate, d as useParams } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth, B as Button, M as Modal } from "./index-C4ml4lrv.js";
import { a as alphabet } from "./kurmanji-DANKPvwI.js";
import { T as TracingCanvas } from "./TracingCanvas-32skzIIu.js";
import { A as AUTHORED_GLYPHS, g as glyphBBoxFromMask, v as validateStrokeTrace, S as StrokeGuide } from "./pathValidation-BvL8cQk4.js";
import { e as emptyTraceResult, b as buildLetterMask, a as buildStrokesMask, c as evaluateTrace, C as COVERAGE_TOLERANCE_PX, O as OVERALL_COVERAGE_MIN, Z as ZONE_COVERAGE_MIN, d as OUT_OF_BOUNDS_MAX, T as TRACE_CANVAS } from "./traceLetters-CGZtlSUi.js";
import { r as recordReview } from "./SpacedRepetitionService-DkhvYl5r.js";
import { b0 as Eye, aq as Eraser, b3 as RotateCcw, K as CircleCheck, v as ChevronRight, bj as CircleX } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
const TOP_LETTER = (letterApi) => letterApi.char.split(" ")[0];
function WritingTracingPage() {
  const navigate = useNavigate();
  const { letterId } = useParams();
  const { language, userData, updateUserData } = useAuth();
  const deck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
  const letter = alphabet.find((l) => l.id === letterId) || alphabet[0];
  const glyph = reactExports.useMemo(() => TOP_LETTER(letter), [letter]);
  const maskCacheRef = reactExports.useRef(null);
  const traceRef = reactExports.useRef(null);
  const [result, setResult] = reactExports.useState(emptyTraceResult);
  const [pathResult, setPathResult] = reactExports.useState(null);
  const [open, setOpen] = reactExports.useState(false);
  const [replayToken, setReplayToken] = reactExports.useState(0);
  reactExports.useEffect(() => {
    return;
  }, []);
  const maskFor = reactExports.useCallback(() => {
    const cached = maskCacheRef.current;
    if (cached && cached.glyph === glyph) return cached.mask;
    const mask = buildLetterMask(glyph);
    maskCacheRef.current = { glyph, mask };
    return mask;
  }, [glyph]);
  const hasGuide = AUTHORED_GLYPHS.includes(glyph);
  const handleCheck = reactExports.useCallback(() => {
    var _a, _b, _c, _d, _e;
    if (hasGuide) {
      const mask2 = maskFor();
      const bbox = glyphBBoxFromMask(mask2, TRACE_CANVAS);
      const ink = ((_a = traceRef.current) == null ? void 0 : _a.strokePaths()) ?? [];
      const path = validateStrokeTrace(glyph, ink, bbox ?? { minC: 0, minR: 0, w: 0, h: 0 });
      setPathResult(path);
      setResult(emptyTraceResult());
      setOpen(true);
      if (!path.passed && bbox) {
        const redPaths = [...path.deviations.map((p) => [p])];
        (_b = traceRef.current) == null ? void 0 : _b.showRedPaths([...redPaths, ...path.missingPaths]);
      } else if (path.passed) {
        (_c = traceRef.current) == null ? void 0 : _c.clearMissHighlight();
      }
      return;
    }
    const strokes = ((_d = traceRef.current) == null ? void 0 : _d.canvas()) ?? null;
    const mask = maskFor();
    const strokesMask = buildStrokesMask(strokes);
    const traced = evaluateTrace(mask, strokesMask, void 0, glyph);
    setPathResult(null);
    setResult(traced);
    setOpen(true);
    (_e = traceRef.current) == null ? void 0 : _e.showMissHighlight(traced.miss);
  }, [hasGuide, maskFor, glyph]);
  const goToLetter = reactExports.useCallback(
    (id) => {
      setOpen(false);
      navigate(`/writing/${id}`, { replace: true });
    },
    [navigate]
  );
  const handlePassNext = reactExports.useCallback(() => {
    const updatedDeck = recordReview(deck, letter.id, "good");
    void updateUserData({ reviewDeck: updatedDeck });
    const next = alphabet[(alphabet.findIndex((l) => l.id === letter.id) + 1) % alphabet.length];
    goToLetter(next.id);
  }, [deck, updateUserData, goToLetter, letter.id]);
  const handleRetry = reactExports.useCallback(() => {
    var _a;
    (_a = traceRef.current) == null ? void 0 : _a.clear();
    setPathResult(null);
    setResult(emptyTraceResult());
    setOpen(false);
  }, []);
  const handleNext = reactExports.useCallback(() => {
    const next = alphabet[(alphabet.findIndex((l) => l.id === letter.id) + 1) % alphabet.length];
    goToLetter(next.id);
  }, [goToLetter, letter.id]);
  const isAr = language === "ar";
  const isKu = language === "ku";
  const clearLabel = isKu ? "Paqij bike" : isAr ? "مسح الكل" : "Clear";
  const undoLabel = isKu ? "Vegere" : isAr ? "تراجع" : "Undo";
  const checkLabel = isKu ? "Kontrol" : isAr ? "تحقق" : "Check";
  const nextLabel = isKu ? "Ya din" : isAr ? "التالي" : "Next";
  const watchLabel = isKu ? "Binêre" : isAr ? "شاهد" : "Watch how";
  const failTitle = isKu ? "Dîsa biceribîne ❌" : isAr ? "حاول مرة أخرى ❌" : "Try again ❌";
  const passTitle = isKu ? "Baş e! ✅" : isAr ? "أحسنت! ✅" : "Well done! ✅";
  const percentText = (fraction) => `${Math.round(fraction * 100)}%`;
  const pathPassed = (pathResult == null ? void 0 : pathResult.passed) ?? false;
  const pathHint = (() => {
    if (!pathResult || pathResult.passed) return null;
    switch (pathResult.reason) {
      case "empty":
        return isKu ? "Tiştek nexşandî. Ji kerema xwe her tîp bi rêz bikişîne." : isAr ? "لم ترسم شيئاً بعد. ارسم الحرف بضربات مرتبة." : "Nothing drawn yet. Trace the letter stroke by stroke.";
      case "stroke-count":
        return isKu ? `Vê tîpê ${pathResult.expectedCount} xet hene — te ${pathResult.strokeCount} xet kişand.` : isAr ? `هذا الحرف يتكون من ${pathResult.expectedCount} حركات وأنت رسمت ${pathResult.strokeCount}.` : `This letter has ${pathResult.expectedCount} strokes — you drew ${pathResult.strokeCount}.`;
      case "order":
        return isKu ? 'Rêza xetan xelet e. Li "Binêre" temaşe bike û dîsa biceribîne.' : isAr ? 'ترتيب الحركات خاطئ. شاهد "شاهد" ثم حاول مجدداً.' : "Strokes drawn in the wrong order. Watch the demo and try again.";
      case "direction":
        return isKu ? "Berê xetê berevajî ye. Ji cihê destpêkê dest pê bike." : isAr ? "اتجاه الحركة معكوس. ابدأ من نقطة البداية." : "A stroke was drawn the wrong way. Start from the starting point.";
      case "shape":
        return isKu ? "Şikl ji rê derket. Deverên sor li ser rêya zêrîn bikişîne." : isAr ? "انحرفت عن المسار. ارسم فوق المناطق الحمراء على طول المسار الذهبي." : "A stroke drifted off the path. Trace the red parts along the gold guide.";
      case "connection":
        return isKu ? "Xet li hev nayên girêdan — ji kerema xwe serê xetan bigihîne hev." : isAr ? "الحركات غير متصلة — صل أطراف الحركات ببعضها." : "Strokes are not connected — join the stroke ends together.";
      case "coverage":
        return isKu ? "Beşek ji tîpê kêm e. Deverên sor temam bike." : isAr ? "جزء من الحرف ناقص. أكمل المناطق الحمراء." : "Part of the letter is missing. Complete the red areas.";
      default:
        return null;
    }
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col min-h-screen pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black text-ink leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", className: "font-mono", children: glyph }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-muted ms-2", children: isKu ? "Binivîse" : isAr ? "اكتب الحرف" : "Write the letter" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1.5", children: isKu ? "Bi tiliya xwe bikşîne" : isAr ? "تتبّع بإصبعك" : "Trace with your finger" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("/writing"),
          className: "text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 uppercase tracking-wider cursor-pointer bg-transparent border-none min-h-[44px] px-2",
          children: isKu ? "Vegere tomaran" : isAr ? "إلى الحروف" : "All letters"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TracingCanvas,
      {
        ref: traceRef,
        char: glyph,
        guideOverlay: hasGuide ? /* @__PURE__ */ jsxRuntimeExports.jsx(StrokeGuide, { char: glyph, replayToken }) : void 0
      },
      letter.id
    ) }),
    hasGuide && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md w-full mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        size: "md",
        onClick: () => setReplayToken((t) => t + 1),
        leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
        className: "text-xs h-12 w-full",
        children: watchLabel
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 max-w-md w-full mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          size: "md",
          onClick: () => {
            var _a;
            return (_a = traceRef.current) == null ? void 0 : _a.clear();
          },
          leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "w-4 h-4" }),
          className: "text-xs h-12",
          children: clearLabel
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          size: "md",
          onClick: () => {
            var _a;
            return (_a = traceRef.current) == null ? void 0 : _a.undo();
          },
          leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
          className: "text-xs h-12",
          children: undoLabel
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "primary",
          size: "md",
          onClick: handleCheck,
          leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
          className: "text-xs h-12",
          children: checkLabel
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "success",
          size: "md",
          onClick: handleNext,
          leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rtl:-scale-x-100" }),
          className: "text-xs h-12",
          children: nextLabel
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open,
        onClose: () => setOpen(false),
        title: hasGuide ? pathPassed ? passTitle : failTitle : result.passed ? passTitle : failTitle,
        variant: "center",
        hideCloseButton: true,
        children: hasGuide ? pathResult ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-bold text-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isKu ? "Xet" : isAr ? "الحركات" : "Strokes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", dir: "ltr", children: [
              pathResult.strokeCount,
              "/",
              pathResult.expectedCount
            ] })
          ] }),
          pathHint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted leading-relaxed", children: pathHint }),
          pathPassed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "success", fullWidth: true, onClick: handlePassNext, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }), children: nextLabel }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", fullWidth: true, onClick: handleRetry, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }), children: isKu ? "Dîsa biceribîne" : isAr ? "إعادة المحاولة" : "Retry" })
        ] }) : null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-muted space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isKu ? "Dagirtin" : isAr ? "التغطية" : "Coverage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", dir: "ltr", children: percentText(result.coverage) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isKu ? "Derveyî rê" : isAr ? "خارج المسار" : "Outside" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", dir: "ltr", children: percentText(result.outOfBounds) })
            ] })
          ] }),
          !result.passed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted leading-relaxed", children: isKu ? `Rêjeya te %${Math.round(result.coverage * 100)} e. Ji kerema xwe temam bike.` : isAr ? `نسبتك ${Math.round(result.coverage * 100)}٪. يرجى إكمالها.` : `Your coverage is ${Math.round(result.coverage * 100)}%. Please complete it.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-400 dark:text-slate-500", children: isKu ? `divê dagirtin ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}%, her herêm ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}%, derveyî ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}%` : isAr ? `التغطية ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}٪، كل منطقة ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}٪، خارج المسار ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}٪ (±${COVERAGE_TOLERANCE_PX} بكسل)` : `coverage ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}%, each zone ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}%, outside ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}% (±${COVERAGE_TOLERANCE_PX}px tolerance)` }),
          result.passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "success", fullWidth: true, onClick: handlePassNext, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }), children: nextLabel }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", fullWidth: true, onClick: handleRetry, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }), children: isKu ? "Dîsa biceribîne" : isAr ? "إعادة المحاولة" : "Retry" })
        ] })
      }
    )
  ] });
}
export {
  WritingTracingPage
};
