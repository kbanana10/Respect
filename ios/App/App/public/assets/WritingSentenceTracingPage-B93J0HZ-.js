import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate, d as useParams } from "./vendor-router-m5cA7LJQ.js";
import { u as useAuth, B as Button, M as Modal } from "./index-C4ml4lrv.js";
import { W as WRITING_SENTENCES } from "./writingSentences-e0j8USzu.js";
import { T as TracingCanvas } from "./TracingCanvas-32skzIIu.js";
import { a as buildStrokesMask, c as evaluateTrace, g as buildGlyphMask, M as MISS_TARGET, T as TRACE_CANVAS, f as drawGlyphInBox, O as OVERALL_COVERAGE_MIN, Z as ZONE_COVERAGE_MIN, d as OUT_OF_BOUNDS_MAX } from "./traceLetters-CGZtlSUi.js";
import { r as recordReview } from "./SpacedRepetitionService-DkhvYl5r.js";
import { w as Check, bj as CircleX, aq as Eraser, b3 as RotateCcw, K as CircleCheck, v as ChevronRight } from "./vendor-icons-UlZxPqC8.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
const MARGIN = 0.06;
const SPACE_UNITS = 0.6;
const ROW_MAX_UNITS = 7.5;
const CELL_INSET = 0.25;
const FADED_GUIDE = "rgba(100, 116, 139, 0.30)";
function layoutSentence(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const rows = [];
  let current = [];
  let currentUnits = 0;
  for (const word of words) {
    const gap = current.length === 0 ? 0 : SPACE_UNITS;
    if (current.length > 0 && currentUnits + gap + word.length > ROW_MAX_UNITS) {
      rows.push(current);
      current = [];
      currentUnits = 0;
    }
    currentUnits += (current.length === 0 ? 0 : SPACE_UNITS) + word.length;
    current.push(word);
  }
  if (current.length > 0) rows.push(current);
  const rowCount = Math.max(1, rows.length);
  const inner = 1 - 2 * MARGIN;
  const rowHeight = inner / rowCount;
  const lanes = [];
  for (let r = 0; r < rows.length; r += 1) {
    const rowWords = rows[r];
    const gaps = Math.max(0, rowWords.length - 1);
    const totalUnits = rowWords.reduce((sum, word) => sum + word.length, 0) + gaps * SPACE_UNITS;
    const unitWidth = inner / Math.max(1, totalUnits);
    const top = MARGIN + r * rowHeight;
    const bottom = top + rowHeight;
    let cursor = MARGIN;
    for (const text2 of rowWords) {
      const chars = text2.toUpperCase().split("");
      const width = chars.length * unitWidth;
      const left = cursor;
      const right = left + width;
      const cellTop = top + rowHeight * CELL_INSET;
      const cellBottom = bottom - rowHeight * CELL_INSET;
      const letterBoxes = chars.map((_, i) => ({
        left: left + i * width / chars.length,
        right: left + (i + 1) * width / chars.length,
        top: cellTop,
        bottom: cellBottom
      }));
      lanes.push({ index: lanes.length, text: text2, chars, left, right, top, bottom, letterBoxes });
      cursor = right + SPACE_UNITS * unitWidth;
    }
  }
  return { lanes, rows: rowCount };
}
function drawWordLane(ctx, lane) {
  const pad = 4;
  const x = lane.left * TRACE_CANVAS + pad;
  const y = lane.top * TRACE_CANVAS + pad;
  const w = (lane.right - lane.left) * TRACE_CANVAS - pad * 2;
  const h = (lane.bottom - lane.top) * TRACE_CANVAS - pad * 2;
  ctx.save();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 5]);
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}
function renderSentenceGuide(ctx, layout) {
  for (const lane of layout.lanes) {
    drawWordLane(ctx, lane);
    for (let i = 0; i < lane.chars.length; i += 1) {
      drawGlyphInBox(ctx, lane.chars[i], lane.letterBoxes[i], FADED_GUIDE);
    }
  }
}
const PENDING_STATUS = () => ({ state: "pending", coverage: 0 });
function WritingSentenceTracingPage() {
  var _a, _b;
  const navigate = useNavigate();
  const { sentenceId } = useParams();
  const { language, userData, updateUserData } = useAuth();
  const deck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
  const sentence = WRITING_SENTENCES.find((s) => s.id === sentenceId) || WRITING_SENTENCES[0];
  const words = reactExports.useMemo(() => sentence.ku.trim().split(/\s+/).filter(Boolean), [sentence.ku]);
  const layout = reactExports.useMemo(() => layoutSentence(sentence.ku), [sentence.ku]);
  const slots = reactExports.useMemo(
    () => layout.lanes.flatMap(
      (lane) => lane.chars.map((char, i) => ({ char, box: lane.letterBoxes[i] }))
    ),
    [layout]
  );
  const traceRef = reactExports.useRef(null);
  const [open, setOpen] = reactExports.useState(false);
  const [statuses, setStatuses] = reactExports.useState(() => words.map(PENDING_STATUS));
  reactExports.useEffect(() => {
    var _a2, _b2;
    setOpen(false);
    setStatuses(words.map(PENDING_STATUS));
    (_a2 = traceRef.current) == null ? void 0 : _a2.clear();
    (_b2 = traceRef.current) == null ? void 0 : _b2.clearMissHighlight();
  }, [sentence.id, words]);
  const allPassed = statuses.every((s) => s.state === "pass");
  const passedCount = statuses.filter((s) => s.state === "pass").length;
  const clearAll = reactExports.useCallback(() => {
    var _a2, _b2;
    (_a2 = traceRef.current) == null ? void 0 : _a2.clear();
    (_b2 = traceRef.current) == null ? void 0 : _b2.clearMissHighlight();
    setStatuses(words.map(PENDING_STATUS));
  }, [words]);
  const handleCheck = reactExports.useCallback(() => {
    var _a2, _b2;
    const strokesMask = buildStrokesMask(((_a2 = traceRef.current) == null ? void 0 : _a2.canvas()) ?? null);
    const wordResults = layout.lanes.map(
      (lane) => lane.chars.map(
        (char, i) => evaluateTrace(
          buildGlyphMask(char, lane.letterBoxes[i]),
          strokesMask,
          lane.letterBoxes[i],
          char
        )
      )
    );
    const combinedMiss = new Uint8ClampedArray(TRACE_CANVAS * TRACE_CANVAS);
    for (const results of wordResults) {
      for (const res of results) {
        if (res.passed) continue;
        for (let k = 0; k < res.miss.length; k += 1) {
          if (res.miss[k] === MISS_TARGET) combinedMiss[k] = MISS_TARGET;
        }
      }
    }
    (_b2 = traceRef.current) == null ? void 0 : _b2.showMissHighlight(combinedMiss);
    const nextStatuses = wordResults.map((results) => ({
      state: results.every((res) => res.passed) ? "pass" : "fail",
      coverage: Math.min(...results.map((res) => res.coverage))
    }));
    setStatuses(nextStatuses);
    if (nextStatuses.every((status) => status.state === "pass")) {
      const updatedDeck = recordReview(deck, sentence.id, "good");
      void updateUserData({ reviewDeck: updatedDeck });
    }
    setOpen(true);
  }, [layout, deck, updateUserData, sentence.id]);
  const handleNextSentence = reactExports.useCallback(() => {
    setOpen(false);
    const next = WRITING_SENTENCES[(WRITING_SENTENCES.findIndex((s) => s.id === sentence.id) + 1) % WRITING_SENTENCES.length];
    navigate(`/writing/sentences/${next.id}`, { replace: true });
  }, [navigate, sentence.id]);
  const isAr = language === "ar";
  const isKu = language === "ku";
  const clearLabel = isKu ? "Paqij bike" : isAr ? "مسح الكل" : "Clear";
  const undoLabel = isKu ? "Vegere" : isAr ? "تراجع" : "Undo";
  const checkLabel = isKu ? "Kontrol" : isAr ? "تحقق" : "Check";
  const nextLabel = isKu ? "Ya din" : isAr ? "جملة تالية" : "Next sentence";
  const keepDrawingLabel = isKu ? "Temam bike" : isAr ? "أكمل" : "Keep drawing";
  const failTitle = isKu ? "Dîsa biceribîne ❌" : isAr ? "حاول مرة أخرى ❌" : "Try again ❌";
  const passTitle = isKu ? "Baş e! Hevok temam ✅" : isAr ? "أحسنت! اكتملت الجملة ✅" : "Well done! Sentence complete ✅";
  const percentText = (fraction) => `${Math.round(fraction * 100)}%`;
  const thresholdText = isKu ? `divê dagirtin ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}%, her herêm ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}%, derveyî ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}%` : isAr ? `التغطية ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}٪، كل منطقة ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}٪، خارج المسار ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}٪` : `coverage ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}%, each zone ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}%, outside ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}%`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col min-h-screen pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black text-ink leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", className: "font-mono", children: sentence.ku }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-muted ms-2", children: isAr ? sentence.ar : sentence.en })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1.5", children: isKu ? "Hemû hevokê bikşîne, paşê Kontrol bike" : isAr ? "ارسم الجملة كلها ثم اضغط تحقق" : "Draw the whole sentence, then tap Check" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("/writing/sentences"),
          className: "text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 uppercase tracking-wider cursor-pointer bg-transparent border-none min-h-[44px] px-2",
          children: isKu ? "Hemû hevok" : isAr ? "كل الجُمل" : "All sentences"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1.5 mb-3", "aria-label": isAr ? "حالة الكلمات" : "Word status", children: layout.lanes.map((lane, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `h-8 px-2.5 rounded-lg flex items-center justify-center gap-1 text-[12px] font-black border transition-colors
              ${statuses[i].state === "pass" ? "bg-emerald-500 border-emerald-500 text-white" : statuses[i].state === "fail" ? "bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/50 dark:border-rose-700 dark:text-rose-300" : "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", children: lane.text }),
          statuses[i].state === "pass" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3", "aria-hidden": "true" }),
          statuses[i].state === "fail" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3", "aria-hidden": "true" })
        ]
      },
      `${sentence.id}-${lane.index}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TracingCanvas,
      {
        ref: traceRef,
        char: ((_a = slots[0]) == null ? void 0 : _a.char) ?? " ",
        guideBox: (_b = slots[0]) == null ? void 0 : _b.box,
        renderGuide: (ctx) => renderSentenceGuide(ctx, layout)
      },
      sentence.id
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
            var _a2;
            return (_a2 = traceRef.current) == null ? void 0 : _a2.undo();
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
          onClick: handleNextSentence,
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
        title: allPassed ? passTitle : failTitle,
        variant: "center",
        hideCloseButton: true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 justify-center", "aria-label": isAr ? "نتيجة كل كلمة" : "Per-word result", children: layout.lanes.map((lane, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `px-2 py-1 rounded-lg text-[11px] font-black border flex items-center gap-1
                  ${statuses[i].state === "pass" ? "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-700 dark:text-emerald-300" : statuses[i].state === "fail" ? "bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/50 dark:border-rose-700 dark:text-rose-300" : "bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", children: lane.text }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", dir: "ltr", children: percentText(statuses[i].coverage) })
              ]
            },
            lane.text + String(i)
          )) }),
          !allPassed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted leading-relaxed text-center", children: isKu ? `${words.length - passedCount} peyv hîn ne temam e. Deverên sor temam bike û dîsa Kontrol bike.` : isAr ? `بقي ${words.length - passedCount} كلمات غير مكتملة. أكمل المناطق الحمراء ثم اضغط تحقق مرة أخرى.` : `${words.length - passedCount} word${words.length - passedCount === 1 ? "" : "s"} still need work. Fill the red areas, then Check again.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center", children: thresholdText }),
          allPassed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "success", fullWidth: true, onClick: handleNextSentence, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }), children: nextLabel }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
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
  WritingSentenceTracingPage
};
