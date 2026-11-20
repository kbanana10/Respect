import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate, d as useParams } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth, B as Button, M as Modal } from "./index-C4ml4lrv.js";
import { W as WRITING_WORDS } from "./writingWords-DQJu-7eV.js";
import { T as TracingCanvas } from "./TracingCanvas-32skzIIu.js";
import { a as buildStrokesMask, c as evaluateTrace, g as buildGlyphMask, M as MISS_TARGET, T as TRACE_CANVAS, f as drawGlyphInBox, O as OVERALL_COVERAGE_MIN, Z as ZONE_COVERAGE_MIN, d as OUT_OF_BOUNDS_MAX } from "./traceLetters-CGZtlSUi.js";
import { r as recordReview } from "./SpacedRepetitionService-DkhvYl5r.js";
import { w as Check, bj as CircleX, aq as Eraser, b3 as RotateCcw, K as CircleCheck, v as ChevronRight } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
const MARGIN = 0.09;
const CELL_TOP = 0.2;
const CELL_BOTTOM = 0.8;
function boxForCell(index, count) {
  if (count <= 0) return { left: 0, top: 0, right: 1, bottom: 1 };
  const cellWidth = (1 - 2 * MARGIN) / count;
  const left = MARGIN + index * cellWidth;
  const right = index === count - 1 ? 1 - MARGIN : left + cellWidth;
  return { left, top: CELL_TOP, right, bottom: CELL_BOTTOM };
}
function drawCellBorders(ctx, count) {
  ctx.save();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 5]);
  const top = CELL_TOP * TRACE_CANVAS;
  const bottom = CELL_BOTTOM * TRACE_CANVAS;
  for (let i = 0; i < count; i += 1) {
    const box = boxForCell(i, count);
    ctx.beginPath();
    ctx.moveTo(box.left * TRACE_CANVAS, top);
    ctx.lineTo(box.left * TRACE_CANVAS, bottom);
    ctx.stroke();
    if (i === count - 1) {
      ctx.beginPath();
      ctx.moveTo(box.right * TRACE_CANVAS, top);
      ctx.lineTo(box.right * TRACE_CANVAS, bottom);
      ctx.stroke();
    }
  }
  ctx.restore();
}
const FADED_GUIDE = "rgba(100, 116, 139, 0.30)";
function renderWordGuide(ctx, glyphs) {
  const count = glyphs.length;
  for (let i = 0; i < count; i += 1) {
    drawGlyphInBox(ctx, glyphs[i], boxForCell(i, count), FADED_GUIDE);
  }
  drawCellBorders(ctx, count);
}
const PENDING_STATUS = () => ({ state: "pending", coverage: 0 });
function WritingWordTracingPage() {
  const navigate = useNavigate();
  const { wordId } = useParams();
  const { language, userData, updateUserData } = useAuth();
  const deck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
  const word = WRITING_WORDS.find((w) => w.id === wordId) || WRITING_WORDS[0];
  const glyphs = reactExports.useMemo(() => word.ku.toUpperCase().split(""), [word.ku]);
  const count = glyphs.length;
  const boxes = reactExports.useMemo(() => glyphs.map((_, i) => boxForCell(i, count)), [glyphs, count]);
  const traceRef = reactExports.useRef(null);
  const [open, setOpen] = reactExports.useState(false);
  const [statuses, setStatuses] = reactExports.useState(() => glyphs.map(PENDING_STATUS));
  reactExports.useEffect(() => {
    var _a, _b;
    setOpen(false);
    setStatuses(glyphs.map(PENDING_STATUS));
    (_a = traceRef.current) == null ? void 0 : _a.clear();
    (_b = traceRef.current) == null ? void 0 : _b.clearMissHighlight();
  }, [word.id, glyphs]);
  const allPassed = statuses.every((s) => s.state === "pass");
  const passedCount = statuses.filter((s) => s.state === "pass").length;
  const clearAll = reactExports.useCallback(() => {
    var _a, _b;
    (_a = traceRef.current) == null ? void 0 : _a.clear();
    (_b = traceRef.current) == null ? void 0 : _b.clearMissHighlight();
    setStatuses(glyphs.map(PENDING_STATUS));
  }, [glyphs]);
  const handleCheck = reactExports.useCallback(() => {
    var _a, _b;
    const strokes = ((_a = traceRef.current) == null ? void 0 : _a.canvas()) ?? null;
    const strokesMask = buildStrokesMask(strokes);
    const results = glyphs.map(
      (glyph, i) => evaluateTrace(buildGlyphMask(glyph, boxes[i]), strokesMask, boxes[i], glyph)
    );
    const combinedMiss = new Uint8ClampedArray(TRACE_CANVAS * TRACE_CANVAS);
    for (const res of results) {
      if (res.passed) continue;
      for (let k = 0; k < res.miss.length; k += 1) {
        if (res.miss[k] === MISS_TARGET) combinedMiss[k] = MISS_TARGET;
      }
    }
    (_b = traceRef.current) == null ? void 0 : _b.showMissHighlight(combinedMiss);
    const nextStatuses = results.map((res) => ({
      state: res.passed ? "pass" : "fail",
      coverage: res.coverage
    }));
    setStatuses(nextStatuses);
    const everyLetterPassed = results.every((res) => res.passed);
    if (everyLetterPassed) {
      const updatedDeck = recordReview(deck, word.id, "good");
      void updateUserData({ reviewDeck: updatedDeck });
    }
    setOpen(true);
  }, [glyphs, boxes, deck, updateUserData, word.id]);
  const handleNextWord = reactExports.useCallback(() => {
    setOpen(false);
    const next = WRITING_WORDS[(WRITING_WORDS.findIndex((w) => w.id === word.id) + 1) % WRITING_WORDS.length];
    navigate(`/writing/words/${next.id}`, { replace: true });
  }, [navigate, word.id]);
  const isAr = language === "ar";
  const isKu = language === "ku";
  const clearLabel = isKu ? "Paqij bike" : isAr ? "مسح الكل" : "Clear";
  const undoLabel = isKu ? "Vegere" : isAr ? "تراجع" : "Undo";
  const checkLabel = isKu ? "Kontrol" : isAr ? "تحقق" : "Check";
  const nextWordLabel = isKu ? "Peyva din" : isAr ? "كلمة تالية" : "Next word";
  const keepDrawingLabel = isKu ? "Temam bike" : isAr ? "أكمل" : "Keep drawing";
  const failTitle = isKu ? "Dîsa biceribîne ❌" : isAr ? "حاول مرة أخرى ❌" : "Try again ❌";
  const wordPassTitle = isKu ? "Baş e! Peyv temam ✅" : isAr ? "أحسنت! اكتملت الكلمة ✅" : "Well done! Word complete ✅";
  const percentText = (fraction) => `${Math.round(fraction * 100)}%`;
  const thresholdText = isKu ? `divê dagirtin ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}%, her herêm ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}%, derveyî ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}%` : isAr ? `التغطية ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}٪، كل منطقة ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}٪، خارج المسار ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}٪` : `coverage ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}%, each zone ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}%, outside ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}%`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col min-h-screen pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black text-ink leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", className: "font-mono", children: word.ku }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-muted ms-2", children: isAr ? word.ar : word.en })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1.5", children: isKu ? "Hemû tîpan bikşîne, paşê Kontrol bike" : isAr ? "ارسم كل الحروف ثم اضغط تحقق" : "Draw the whole word, then tap Check" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("/writing/words"),
          className: "text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 uppercase tracking-wider cursor-pointer bg-transparent border-none min-h-[44px] px-2",
          children: isKu ? "Hemû peyv" : isAr ? "كل الكلمات" : "All words"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1.5 mb-3", "aria-label": isAr ? "حالة الحروف" : "Letter status", children: glyphs.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `w-8 h-8 rounded-lg flex items-center justify-center gap-0.5 text-[12px] font-black border transition-colors
              ${statuses[i].state === "pass" ? "bg-emerald-500 border-emerald-500 text-white" : statuses[i].state === "fail" ? "bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/50 dark:border-rose-700 dark:text-rose-300" : "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", children: g }),
          statuses[i].state === "pass" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3", "aria-hidden": "true" }),
          statuses[i].state === "fail" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3", "aria-hidden": "true" })
        ]
      },
      `${word.id}-${i}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TracingCanvas,
      {
        ref: traceRef,
        char: glyphs[0] ?? " ",
        guideBox: boxes[0] ?? boxForCell(0, 1),
        renderGuide: (ctx) => renderWordGuide(ctx, glyphs)
      },
      word.id
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 max-w-md w-full mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          size: "md",
          onClick: clearAll,
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
          variant: allPassed ? "success" : "secondary",
          size: "md",
          disabled: !allPassed,
          onClick: handleNextWord,
          leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rtl:-scale-x-100" }),
          className: "text-xs h-12",
          children: nextWordLabel
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open,
        onClose: () => setOpen(false),
        title: allPassed ? wordPassTitle : failTitle,
        variant: "center",
        hideCloseButton: true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 justify-center", "aria-label": isAr ? "نتيجة كل حرف" : "Per-letter result", children: glyphs.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `px-2 py-1 rounded-lg text-[11px] font-black border flex items-center gap-1
                  ${statuses[i].state === "pass" ? "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-700 dark:text-emerald-300" : statuses[i].state === "fail" ? "bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/50 dark:border-rose-700 dark:text-rose-300" : "bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", children: g }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", dir: "ltr", children: percentText(statuses[i].coverage) })
              ]
            },
            g + String(i)
          )) }),
          !allPassed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted leading-relaxed text-center", children: isKu ? `${count - passedCount} tîp hîn ne temam e. Deverên sor temam bike û dîsa Kontrol bike.` : isAr ? `بقي ${count - passedCount} حروف غير مكتملة. أكمل المناطق الحمراء ثم اضغط تحقق مرة أخرى.` : `${count - passedCount} letter${count - passedCount === 1 ? "" : "s"} still need work. Fill the red areas, then Check again.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center", children: thresholdText }),
          allPassed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "success", fullWidth: true, onClick: handleNextWord, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }), children: nextWordLabel }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", fullWidth: true, onClick: () => setOpen(false), children: keepDrawingLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", fullWidth: true, onClick: () => {
              clearAll();
              setOpen(false);
            }, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }), children: clearLabel })
          ] })
        ] })
      }
    )
  ] });
}
export {
  WritingWordTracingPage
};
