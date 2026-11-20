import { r as reactExports, j as jsxRuntimeExports, R as React } from "./vendor-react--N-K1Ubq.js";
import { u as useNavigate, d as useParams } from "./vendor-router-m5cA7LJQ.js";
import { B as Button, c as cn, u as useAuth, r as registerBackInterceptor, A as AudioButton, M as Modal } from "./index-C4ml4lrv.js";
import { a as alphabet } from "./kurmanji-DANKPvwI.js";
import { P as Progress } from "./Progress-BMdEo1cu.js";
import { p as parseStrokePath, S as StrokeGuide, s as scoreBand, g as glyphBBoxFromMask, e as evaluateLessonStroke, f as freeWriteScore } from "./pathValidation-BvL8cQk4.js";
import { T as TRACE_CANVAS, b as buildLetterMask, f as drawGlyphInBox, S as SINGLE_BOX, a as buildStrokesMask, c as evaluateTrace } from "./traceLetters-CGZtlSUi.js";
import { b3 as RotateCcw, bc as ArrowRight, b0 as Eye, bk as ChevronLeft, V as Volume2, a2 as Pencil, bl as Feather, aq as Eraser, K as CircleCheck, T as Trophy, v as ChevronRight } from "./vendor-icons-UlZxPqC8.js";
import { r as recordReview } from "./SpacedRepetitionService-DkhvYl5r.js";
import "./vendor-capacitor-BK0LZzXH.js";
import "./vendor-firebase-CxrLxvH4.js";
import "./vendor-B7z8ML8n.js";
import "./vendor-motion-D8-S3eer.js";
import "./vendor-confetti-Dl7ieZFU.js";
const LETTER_STROKES = {
  // ---- Straight-stroke letters — centerline-authored (measured) ------------
  A: {
    glyph: "A",
    strokes: [
      { order: 0, path: "M0.51 0.03 L0.15 0.90", direction: "end" },
      // left leg, apex→bottom-left
      { order: 1, path: "M0.51 0.03 L0.87 0.90", direction: "end" },
      // right leg, apex→bottom-right
      { order: 2, path: "M0.28 0.70 L0.72 0.70", direction: "end" }
      // crossbar
    ]
  },
  B: {
    glyph: "B",
    strokes: [
      { order: 0, path: "M0.19 0.04 L0.19 0.96", direction: "end" },
      // stem
      {
        order: 1,
        path: "M0.19 0.11 L0.52 0.05 L0.80 0.16 L0.86 0.34 L0.62 0.47 L0.19 0.47",
        direction: "end"
      },
      // upper bowl
      {
        order: 2,
        path: "M0.19 0.53 L0.58 0.49 L0.85 0.60 L0.90 0.80 L0.72 0.95 L0.19 0.96",
        direction: "end"
      }
      // lower bowl
    ]
  },
  C: {
    glyph: "C",
    strokes: [
      {
        order: 0,
        // Exact measured centerline: at this 900-weight the C's left side
        // fuses into a vertical spine while the two arms flare to the open
        // mouth on the right. One continuous counterclockwise stroke from the
        // top arm tip, down the spine, along the bottom and back out.
        path: "M1.000 0.169 L0.960 0.149 L0.920 0.137 L0.880 0.123 L0.840 0.111 L0.800 0.103 L0.760 0.097 L0.720 0.094 L0.680 0.094 L0.640 0.091 L0.600 0.091 L0.560 0.094 L0.520 0.100 L0.480 0.106 L0.440 0.114 L0.400 0.123 L0.360 0.140 L0.320 0.154 L0.300 0.251 L0.260 0.300 L0.200 0.370 L0.140 0.440 L0.080 0.490 L0.040 0.500 L0.080 0.510 L0.140 0.560 L0.200 0.630 L0.260 0.700 L0.300 0.749 L0.320 0.846 L0.360 0.860 L0.400 0.877 L0.440 0.886 L0.480 0.894 L0.520 0.900 L0.560 0.903 L0.600 0.906 L0.640 0.909 L0.680 0.909 L0.720 0.906 L0.760 0.906 L0.800 0.903 L0.840 0.897 L0.880 0.886 L0.920 0.869 L0.960 0.846 L1.000 0.831",
        direction: "end"
      }
    ]
  },
  Ç: {
    glyph: "Ç",
    strokes: [
      {
        order: 0,
        // C body centerline above, scaled into the taller (cedilla) box.
        path: "M1.000 0.136 L0.960 0.120 L0.920 0.110 L0.880 0.099 L0.840 0.089 L0.800 0.083 L0.760 0.078 L0.720 0.076 L0.680 0.076 L0.640 0.073 L0.600 0.073 L0.560 0.076 L0.520 0.081 L0.480 0.085 L0.440 0.092 L0.400 0.099 L0.360 0.113 L0.320 0.124 L0.300 0.202 L0.260 0.242 L0.200 0.298 L0.140 0.355 L0.080 0.395 L0.040 0.403 L0.080 0.411 L0.140 0.451 L0.200 0.508 L0.260 0.564 L0.300 0.604 L0.320 0.682 L0.360 0.693 L0.400 0.707 L0.440 0.714 L0.480 0.721 L0.520 0.725 L0.560 0.728 L0.600 0.730 L0.640 0.733 L0.680 0.733 L0.720 0.730 L0.760 0.730 L0.800 0.728 L0.840 0.723 L0.880 0.714 L0.920 0.700 L0.960 0.682 L1.000 0.670",
        direction: "end"
      },
      { order: 1, path: "M0.66 0.815 L0.69 0.840 L0.71 0.865 L0.72 0.880 L0.70 0.905 L0.64 0.925 L0.60 0.950 L0.58 0.975 L0.57 1.000", direction: "end" }
      // cedilla (last)
    ]
  },
  D: {
    glyph: "D",
    strokes: [
      { order: 0, path: "M0.19 0.05 L0.19 0.95", direction: "end" },
      // stem
      {
        order: 1,
        path: "M0.19 0.05 L0.42 0.04 L0.70 0.11 L0.88 0.32 L0.92 0.54 L0.86 0.76 L0.66 0.90 L0.40 0.96 L0.19 0.95",
        direction: "end"
      }
      // bowl
    ]
  },
  E: {
    glyph: "E",
    strokes: [
      { order: 0, path: "M0.13 0.05 L0.13 0.94", direction: "end" },
      // stem
      { order: 1, path: "M0.13 0.07 L0.93 0.07", direction: "end" },
      // top bar
      { order: 2, path: "M0.13 0.46 L0.86 0.46", direction: "end" },
      // mid bar
      { order: 3, path: "M0.13 0.90 L0.92 0.90", direction: "end" }
      // bottom bar
    ]
  },
  Ê: {
    glyph: "Ê",
    strokes: [
      { order: 0, path: "M0.13 0.28 L0.13 0.97", direction: "end" },
      // stem
      { order: 1, path: "M0.13 0.30 L0.93 0.30", direction: "end" },
      // top bar
      { order: 2, path: "M0.13 0.62 L0.86 0.62", direction: "end" },
      // mid bar
      { order: 3, path: "M0.13 0.94 L0.92 0.94", direction: "end" },
      // bottom bar
      { order: 4, path: "M0.50 0.04 L0.37 0.11", direction: "end" },
      // circumflex left
      { order: 5, path: "M0.50 0.04 L0.63 0.11", direction: "end" }
      // circumflex right
    ]
  },
  F: {
    glyph: "F",
    strokes: [
      { order: 0, path: "M0.13 0.05 L0.13 0.95", direction: "end" },
      // stem
      { order: 1, path: "M0.13 0.07 L0.92 0.07", direction: "end" },
      // top bar
      { order: 2, path: "M0.13 0.47 L0.82 0.47", direction: "end" }
      // mid bar
    ]
  },
  G: {
    glyph: "G",
    strokes: [
      {
        order: 0,
        // Closed centerline ring, "Magic C keep-on-going" (HWT): start at the
        // TOP and travel counterclockwise (left, down, along the bottom, up the
        // right), closing at the start. The nose bar is the final separate
        // stroke (HWT: "little line across", drawn left → right).
        path: "M0.472 0.091 L0.336 0.125 L0.220 0.205 L0.138 0.320 L0.100 0.457 L0.109 0.599 L0.166 0.729 L0.263 0.832 L0.389 0.894 L0.528 0.909 L0.664 0.875 L0.780 0.795 L0.862 0.680 L0.900 0.543 L0.891 0.401 L0.834 0.271 L0.737 0.168 L0.611 0.106 L0.472 0.091",
        direction: "end"
      },
      { order: 1, path: "M0.600 0.520 L0.900 0.520", direction: "end" }
      // nose bar (last, left→right)
    ]
  },
  H: {
    glyph: "H",
    strokes: [
      { order: 0, path: "M0.13 0.05 L0.13 0.95", direction: "end" },
      { order: 1, path: "M0.87 0.05 L0.87 0.95", direction: "end" },
      { order: 2, path: "M0.13 0.50 L0.87 0.50", direction: "end" }
    ]
  },
  I: {
    glyph: "I",
    strokes: [
      { order: 0, path: "M0.50 0.10 L0.50 0.90", direction: "end" },
      { order: 1, path: "M0.06 0.10 L0.94 0.10", direction: "end" },
      { order: 2, path: "M0.06 0.90 L0.94 0.90", direction: "end" }
    ]
  },
  Î: {
    glyph: "Î",
    strokes: [
      { order: 0, path: "M0.50 0.28 L0.50 0.96", direction: "end" },
      { order: 1, path: "M0.25 0.24 L0.75 0.24", direction: "end" },
      { order: 2, path: "M0.25 0.995 L0.75 0.995", direction: "end" },
      { order: 3, path: "M0.50 0.01 L0.05 0.135", direction: "end" },
      { order: 4, path: "M0.50 0.01 L0.95 0.135", direction: "end" }
    ]
  },
  J: {
    glyph: "J",
    strokes: [
      {
        order: 0,
        path: "M0.800 0.050 L0.800 0.660 L0.800 0.740 L0.660 0.800 L0.500 0.860 L0.340 0.910 L0.210 0.945 L0.120 0.970",
        direction: "end"
      }
    ]
  },
  K: {
    glyph: "K",
    strokes: [
      { order: 0, path: "M0.14 0.05 L0.14 0.95", direction: "end" },
      // stem (top→bottom)
      { order: 1, path: "M0.86 0.05 L0.16 0.48", direction: "end" },
      // upper arm (lands on the stem; HWT "kick")
      { order: 2, path: "M0.34 0.48 L0.90 0.95", direction: "end" }
      // lower arm (from the arm/stem junction; HWT "slide away")
    ]
  },
  L: {
    glyph: "L",
    strokes: [
      { order: 0, path: "M0.185 0.050 L0.185 0.900", direction: "end" },
      // stem (center)
      { order: 1, path: "M0.185 0.905 L0.955 0.905", direction: "end" }
      // base
    ]
  },
  M: {
    glyph: "M",
    strokes: [
      { order: 0, path: "M0.11 0.05 L0.11 0.95", direction: "end" },
      { order: 1, path: "M0.11 0.05 L0.50 0.55 L0.89 0.05", direction: "end" },
      { order: 2, path: "M0.89 0.05 L0.89 0.95", direction: "end" }
    ]
  },
  N: {
    glyph: "N",
    strokes: [
      { order: 0, path: "M0.11 0.05 L0.11 0.95", direction: "end" },
      { order: 1, path: "M0.11 0.05 L0.89 0.95", direction: "end" },
      { order: 2, path: "M0.89 0.05 L0.89 0.95", direction: "end" }
    ]
  },
  O: {
    glyph: "O",
    strokes: [
      {
        order: 0,
        // Closed centerline ring, "Magic C keep-on-going": start at the top,
        // travel LEFT (counterclockwise), down, along the bottom, up the right
        // and close at the start. Matches the HWT convention (start at top,
        // CCW); the same direction strokeOrder.ts already teaches.
        path: "M0.500 0.094 L0.421 0.102 L0.345 0.125 L0.275 0.162 L0.213 0.213 L0.163 0.274 L0.126 0.345 L0.103 0.421 L0.095 0.500 L0.103 0.579 L0.126 0.655 L0.163 0.726 L0.213 0.787 L0.275 0.838 L0.345 0.875 L0.421 0.898 L0.500 0.906 L0.579 0.898 L0.655 0.875 L0.725 0.838 L0.787 0.787 L0.837 0.726 L0.874 0.655 L0.897 0.579 L0.905 0.500 L0.897 0.421 L0.874 0.345 L0.837 0.274 L0.787 0.213 L0.725 0.162 L0.655 0.125 L0.579 0.102 L0.500 0.094",
        direction: "end"
      }
    ]
  },
  P: {
    glyph: "P",
    strokes: [
      { order: 0, path: "M0.19 0.05 L0.19 0.95", direction: "end" },
      {
        order: 1,
        path: "M0.19 0.05 L0.55 0.06 L0.85 0.22 L0.90 0.42 L0.68 0.51 L0.19 0.51",
        direction: "end"
      }
    ]
  },
  Q: {
    glyph: "Q",
    strokes: [
      {
        order: 0,
        // Closed centerline ring in the body box (top ~175px of the taller
        // cedilla-style box), "Magic C keep-on-going": start at the top and
        // travel counterclockwise, close at the start. Tail is a separate
        // final stroke (HWT: "…stop, little line slides down").
        path: "M0.500 0.080 L0.421 0.087 L0.345 0.106 L0.275 0.138 L0.213 0.182 L0.163 0.234 L0.126 0.294 L0.103 0.359 L0.095 0.427 L0.103 0.494 L0.126 0.560 L0.163 0.620 L0.213 0.672 L0.275 0.715 L0.345 0.747 L0.421 0.767 L0.500 0.774 L0.579 0.767 L0.655 0.747 L0.725 0.715 L0.787 0.672 L0.837 0.620 L0.874 0.560 L0.897 0.494 L0.905 0.427 L0.897 0.359 L0.874 0.294 L0.837 0.234 L0.787 0.182 L0.725 0.138 L0.655 0.106 L0.579 0.087 L0.500 0.080",
        direction: "end"
      },
      { order: 1, path: "M0.640 0.740 L0.720 0.830 L0.790 0.910 L0.860 0.980", direction: "end" }
      // tail (last)
    ]
  },
  R: {
    glyph: "R",
    strokes: [
      { order: 0, path: "M0.19 0.05 L0.19 0.95", direction: "end" },
      {
        order: 1,
        path: "M0.19 0.05 L0.55 0.06 L0.85 0.22 L0.90 0.42 L0.68 0.51 L0.19 0.51",
        direction: "end"
      },
      { order: 2, path: "M0.46 0.51 L0.90 0.95", direction: "end" }
    ]
  },
  S: {
    glyph: "S",
    strokes: [
      {
        order: 0,
        path: "M0.820 0.130 L0.550 0.050 L0.280 0.060 L0.130 0.140 L0.090 0.260 L0.120 0.370 L0.220 0.450 L0.420 0.500 L0.620 0.550 L0.750 0.620 L0.800 0.740 L0.750 0.860 L0.580 0.950 L0.340 0.940 L0.190 0.870 L0.150 0.720",
        direction: "end"
      }
    ]
  },
  Ş: {
    glyph: "Ş",
    strokes: [
      {
        order: 0,
        // S body centerline scaled into the taller (cedilla) box.
        path: "M0.820 0.105 L0.550 0.040 L0.280 0.048 L0.130 0.113 L0.090 0.210 L0.120 0.298 L0.220 0.363 L0.420 0.403 L0.620 0.444 L0.750 0.500 L0.800 0.597 L0.750 0.694 L0.580 0.766 L0.340 0.758 L0.190 0.702 L0.150 0.581",
        direction: "end"
      },
      { order: 1, path: "M0.50 0.755 L0.35 0.960 L0.22 0.945", direction: "end" }
      // cedilla (last)
    ]
  },
  T: {
    glyph: "T",
    strokes: [
      { order: 0, path: "M0.06 0.06 L0.94 0.06", direction: "end" },
      { order: 1, path: "M0.50 0.06 L0.50 0.94", direction: "end" }
    ]
  },
  U: {
    glyph: "U",
    strokes: [
      { order: 0, path: "M0.16 0.03 L0.16 0.70 L0.27 0.88 L0.45 0.96", direction: "end" },
      { order: 1, path: "M0.84 0.03 L0.84 0.70 L0.73 0.88 L0.55 0.96", direction: "end" }
    ]
  },
  Û: {
    glyph: "Û",
    strokes: [
      { order: 0, path: "M0.16 0.28 L0.16 0.72 L0.27 0.89 L0.45 0.96", direction: "end" },
      { order: 1, path: "M0.84 0.28 L0.84 0.72 L0.73 0.89 L0.55 0.96", direction: "end" },
      { order: 2, path: "M0.50 0.02 L0.37 0.09", direction: "end" },
      { order: 3, path: "M0.50 0.02 L0.63 0.10", direction: "end" }
    ]
  },
  V: {
    glyph: "V",
    strokes: [{ order: 0, path: "M0.11 0.05 L0.50 0.95 L0.89 0.05", direction: "end" }]
  },
  W: {
    glyph: "W",
    strokes: [
      {
        order: 0,
        path: "M0.050 0.140 L0.280 0.840 L0.500 0.140 L0.720 0.840 L0.950 0.140",
        direction: "end"
      }
    ]
  },
  X: {
    glyph: "X",
    strokes: [
      { order: 0, path: "M0.12 0.05 L0.88 0.95", direction: "end" },
      { order: 1, path: "M0.88 0.05 L0.12 0.95", direction: "end" }
    ]
  },
  Y: {
    glyph: "Y",
    strokes: [
      { order: 0, path: "M0.12 0.05 L0.50 0.48", direction: "end" },
      { order: 1, path: "M0.88 0.05 L0.50 0.48", direction: "end" },
      { order: 2, path: "M0.50 0.48 L0.50 0.95", direction: "end" }
    ]
  },
  Z: {
    glyph: "Z",
    strokes: [
      { order: 0, path: "M0.08 0.06 L0.92 0.06", direction: "end" },
      { order: 1, path: "M0.92 0.06 L0.08 0.94", direction: "end" },
      { order: 2, path: "M0.08 0.94 L0.92 0.94", direction: "end" }
    ]
  }
};
const LESSON_GLYPHS = Object.keys(LETTER_STROKES);
const LETTER_GEOMETRY_VERIFIED = /* @__PURE__ */ new Set([
  "A",
  "B",
  "C",
  "Ç",
  "D",
  "E",
  "Ê",
  "F",
  "G",
  "H",
  "I",
  "Î",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Û",
  "V",
  "W",
  "X",
  "Y",
  "Z"
]);
const LETTER_HANDWRITING_READY = /* @__PURE__ */ new Set([
  "A",
  "B",
  "C",
  "Ç",
  "D",
  "E",
  "Ê",
  "F",
  "G",
  "H",
  "I",
  "Î",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Û",
  "V",
  "W",
  "X",
  "Y",
  "Z"
]);
function getLetterReadiness(glyph) {
  if (LETTER_HANDWRITING_READY.has(glyph)) return "ready";
  if (LETTER_GEOMETRY_VERIFIED.has(glyph)) return "verified";
  return "draft";
}
Object.freeze(Object.fromEntries(LESSON_GLYPHS.map((g) => [g, getLetterReadiness(g)])));
function getLetterStrokes(glyph) {
  return LETTER_STROKES[glyph];
}
function letterStrokesToPx(plan, bbox) {
  if (!plan) return [];
  return plan.strokes.map(
    (s) => parseStrokePath(s.path).map((p) => ({
      x: bbox.minC + p.x * (bbox.w || 1),
      y: bbox.minR + p.y * (bbox.h || 1)
    }))
  );
}
function LetterDemo({ glyph, labels, onContinue }) {
  const [replayToken, setReplayToken] = reactExports.useState(0);
  const readiness = getLetterReadiness(glyph);
  const missing = readiness === "draft";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-line-soft shadow-flat touch-none select-none",
        style: { aspectRatio: "1 / 1" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              viewBox: `0 0 ${TRACE_CANVAS} ${TRACE_CANVAS}`,
              className: "absolute inset-0 w-full h-full",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: TRACE_CANVAS / 2,
                  y: TRACE_CANVAS / 2,
                  fontFamily: "Noto Sans, system-ui, sans-serif",
                  fontWeight: 900,
                  fontSize: TRACE_CANVAS * 0.7,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  fill: "rgba(100,116,139,0.22)",
                  children: glyph
                }
              )
            }
          ),
          !missing && /* @__PURE__ */ jsxRuntimeExports.jsx(StrokeGuide, { char: glyph, replayToken })
        ]
      }
    ),
    missing && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted text-center leading-relaxed", children: labels.notice }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "md",
          onClick: () => setReplayToken((t) => t + 1),
          leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
          className: "text-xs h-12",
          children: labels.replay
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "primary",
          size: "md",
          onClick: onContinue,
          trailingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:-scale-x-100" }),
          className: "text-xs h-12",
          children: labels.continue
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sr-only flex items-center gap-1 text-muted", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
      labels.watch
    ] })
  ] });
}
const R = 42;
const CIRC = 2 * Math.PI * R;
const BAND_COLOUR = {
  excellent: "#10B981",
  good: "#F59E0B",
  practice: "#7C3AED",
  retry: "#EF4444"
};
function ScoreRing({ score, label, className }) {
  const [shown, setShown] = reactExports.useState(0);
  const clamped = Math.max(0, Math.min(100, score));
  const band = scoreBand(clamped);
  reactExports.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 700;
    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      setShown(Math.round(clamped * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [clamped]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("relative inline-flex items-center justify-center", className),
      role: "img",
      "aria-label": `${label ?? "Score"}: ${clamped}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "w-28 h-28 -rotate-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "50",
              cy: "50",
              r: R,
              fill: "none",
              stroke: "rgba(148,163,184,0.20)",
              strokeWidth: "9"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "50",
              cy: "50",
              r: R,
              fill: "none",
              stroke: BAND_COLOUR[band],
              strokeWidth: "9",
              strokeLinecap: "round",
              strokeDasharray: CIRC,
              strokeDashoffset: CIRC * (1 - shown / 100),
              style: { transition: "stroke-dashoffset 80ms linear" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute inset-0 flex items-center justify-center text-2xl font-black tabular-nums",
            style: { color: BAND_COLOUR[band] },
            dir: "ltr",
            children: clamped
          }
        )
      ]
    }
  );
}
const SIZE = TRACE_CANVAS;
const INK = "rgba(51, 65, 85, 0.62)";
const GOLD_DIM = "rgba(245, 158, 11, 0.30)";
const DASH = { on: 7, off: 6 };
const WritingLessonCanvas = React.forwardRef(
  function WritingLessonCanvas2({ char, mode, activeStrokeIndex = 0, onStrokeComplete }, ref) {
    const guideRef = reactExports.useRef(null);
    const strokesRef = reactExports.useRef(null);
    const missRef = reactExports.useRef(null);
    const drawingRef = reactExports.useRef(false);
    const currentPathRef = reactExports.useRef(null);
    const pathsRef = reactExports.useRef([]);
    const snapshotsRef = reactExports.useRef([]);
    const onStrokeCompleteRef = reactExports.useRef(onStrokeComplete);
    onStrokeCompleteRef.current = onStrokeComplete;
    const authored = reactExports.useMemo(() => {
      const plan = getLetterStrokes(char);
      if (!plan) return [];
      const mask = buildLetterMask(char);
      const bbox = glyphBBoxFromMask(mask, SIZE);
      if (!bbox) return [];
      return letterStrokesToPx(plan, bbox);
    }, [char]);
    const authoredRef = reactExports.useRef(authored);
    authoredRef.current = authored;
    const activeIndex = Math.min(activeStrokeIndex, Math.max(0, authored.length - 1));
    React.useImperativeHandle(ref, () => ({
      clear: () => {
        var _a, _b, _c;
        const ctx = (_a = strokesRef.current) == null ? void 0 : _a.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, SIZE, SIZE);
        snapshotsRef.current = [];
        pathsRef.current = [];
        currentPathRef.current = null;
        (_c = (_b = missRef.current) == null ? void 0 : _b.getContext("2d")) == null ? void 0 : _c.clearRect(0, 0, SIZE, SIZE);
      },
      undo: () => {
        const canvas = strokesRef.current;
        const ctx = canvas == null ? void 0 : canvas.getContext("2d");
        if (!canvas || !ctx) return;
        const snapshot = snapshotsRef.current.pop();
        pathsRef.current.pop();
        ctx.clearRect(0, 0, SIZE, SIZE);
        if (snapshot) ctx.drawImage(snapshot, 0, 0);
      },
      canvas: () => strokesRef.current,
      strokePaths: () => pathsRef.current,
      showDeviation: (paths) => {
        const layer = missRef.current;
        const ctx = layer == null ? void 0 : layer.getContext("2d");
        if (!layer || !ctx) return;
        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "rgba(239, 68, 68, 0.70)";
        ctx.lineWidth = SIZE * 0.045;
        for (const path of paths) {
          if (path.length === 0) continue;
          ctx.beginPath();
          ctx.moveTo(path[0].x, path[0].y);
          for (let k = 1; k < path.length; k += 1) ctx.lineTo(path[k].x, path[k].y);
          ctx.stroke();
          if (path.length === 1) {
            ctx.fillStyle = "rgba(239, 68, 68, 0.70)";
            ctx.beginPath();
            ctx.arc(path[0].x, path[0].y, SIZE * 0.02, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      },
      clearFeedback: () => {
        var _a, _b;
        (_b = (_a = missRef.current) == null ? void 0 : _a.getContext("2d")) == null ? void 0 : _b.clearRect(0, 0, SIZE, SIZE);
      }
    }));
    reactExports.useEffect(() => {
      const canvas = guideRef.current;
      const ctx = canvas == null ? void 0 : canvas.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      if (mode === "free") {
        drawGlyphInBox(ctx, char, SINGLE_BOX, "rgba(100, 116, 139, 0.24)");
        return;
      }
      const strokes = authoredRef.current;
      if (strokes.length === 0) {
        drawGlyphInBox(ctx, char, SINGLE_BOX, "rgba(100, 116, 139, 0.18)");
        return;
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = SIZE * 0.02;
      strokes.forEach((stroke, i) => {
        if (stroke.length < 2) return;
        const isPast = i < activeIndex;
        const isActive = i === activeIndex;
        if (!isPast && !isActive) return;
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let k = 1; k < stroke.length; k += 1) ctx.lineTo(stroke[k].x, stroke[k].y);
        if (isPast) {
          ctx.setLineDash([]);
          ctx.strokeStyle = GOLD_DIM;
        } else {
          ctx.setLineDash([DASH.on, DASH.off]);
          ctx.strokeStyle = "rgba(148, 163, 184, 0.90)";
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);
      const active = strokes[activeIndex];
      if (active && active.length >= 2) {
        const a = active[0];
        const b = active[active.length - 1];
        ctx.fillStyle = "#10B981";
        ctx.beginPath();
        ctx.arc(a.x, a.y, SIZE * 0.022, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(245, 158, 11, 0.95)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, SIZE * 0.014, 0, Math.PI * 2);
        ctx.fill();
      }
    }, [char, mode, activeIndex]);
    const toPoint = (e) => {
      const canvas = strokesRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) / rect.width * SIZE,
        y: (e.clientY - rect.top) / rect.height * SIZE
      };
    };
    const snapshotCurrent = () => {
      const canvas = strokesRef.current;
      if (!canvas) return;
      const copy = document.createElement("canvas");
      copy.width = SIZE;
      copy.height = SIZE;
      const copyCtx = copy.getContext("2d");
      if (copyCtx) copyCtx.drawImage(canvas, 0, 0);
      snapshotsRef.current.push(copy);
    };
    const handlePointerDown = (e) => {
      var _a, _b, _c;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      const ctx = (_a = strokesRef.current) == null ? void 0 : _a.getContext("2d");
      if (!ctx) return;
      (_c = (_b = e.currentTarget).setPointerCapture) == null ? void 0 : _c.call(_b, e.pointerId);
      snapshotCurrent();
      drawingRef.current = true;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = INK;
      ctx.lineWidth = SIZE * 0.042;
      const p = toPoint(e);
      currentPathRef.current = [{ x: p.x, y: p.y }];
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + 0.01, p.y + 0.01);
      ctx.stroke();
    };
    const handlePointerMove = (e) => {
      var _a, _b;
      if (!drawingRef.current) return;
      const ctx = (_a = strokesRef.current) == null ? void 0 : _a.getContext("2d");
      if (!ctx) return;
      const p = toPoint(e);
      (_b = currentPathRef.current) == null ? void 0 : _b.push({ x: p.x, y: p.y });
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    const endStroke = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      const path = currentPathRef.current;
      currentPathRef.current = null;
      if (!path || path.length === 0) return;
      pathsRef.current.push(path);
      if (mode === "trace" && onStrokeCompleteRef.current) {
        const authoredStrokes = authoredRef.current;
        const activeAuthored = authoredStrokes[activeIndex] ?? [];
        onStrokeCompleteRef.current(path, activeAuthored);
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-line-soft shadow-flat touch-none select-none",
        style: { aspectRatio: "1 / 1" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: guideRef,
              width: SIZE,
              height: SIZE,
              className: "absolute inset-0 w-full h-full",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: strokesRef,
              width: SIZE,
              height: SIZE,
              className: "absolute inset-0 w-full h-full cursor-crosshair touch-none",
              style: { touchAction: "none" },
              onPointerDown: handlePointerDown,
              onPointerMove: handlePointerMove,
              onPointerUp: endStroke,
              onPointerLeave: endStroke,
              onPointerCancel: endStroke
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: missRef,
              width: SIZE,
              height: SIZE,
              className: "absolute inset-0 w-full h-full pointer-events-none",
              "aria-hidden": "true"
            }
          )
        ]
      }
    );
  }
);
const XP_BY_BAND = {
  excellent: 12,
  good: 10,
  practice: 8,
  retry: 0
};
const bandLabels = (isKu, isAr) => ({
  excellent: isKu ? "Pir baş! 🌟" : isAr ? "ممتاز! 🌟" : "Excellent! 🌟",
  good: isKu ? "Baş e! 👍" : isAr ? "جيد! 👍" : "Good! 👍",
  practice: isKu ? "Berdewam be 💪" : isAr ? "واصل التدريب 💪" : "Keep practicing 💪",
  retry: isKu ? "Dîsa biceribîne 📝" : isAr ? "حاول مجدداً 📝" : "Retry 📝"
});
function WritingLessonPage() {
  var _a, _b;
  const navigate = useNavigate();
  const { letterId } = useParams();
  const { language, userData, updateUserData, updateUserProgress } = useAuth();
  const letter = alphabet.find((l) => l.id === letterId) || alphabet[0];
  const glyph = letter.char.split(" ")[0].toUpperCase();
  const isAr = language === "ar";
  const isKu = language === "ku";
  const canvasRef = reactExports.useRef(null);
  const [stage, setStage] = reactExports.useState("learn");
  const [activeStroke, setActiveStroke] = reactExports.useState(0);
  const [traceFeedback, setTraceFeedback] = reactExports.useState(null);
  const [score, setScore] = reactExports.useState(null);
  const [earnedXp, setEarnedXp] = reactExports.useState(0);
  const [showResult, setShowResult] = reactExports.useState(false);
  const [finalScoreSent, setFinalScoreSent] = reactExports.useState(false);
  const plan = reactExports.useMemo(() => getLetterStrokes(glyph), [glyph]);
  const readiness = getLetterReadiness(glyph);
  const traceable = readiness === "ready" && !!plan && plan.strokes.length > 0;
  const totalStrokes = (plan == null ? void 0 : plan.strokes.length) ?? 0;
  const xpAwardedRef = reactExports.useRef(false);
  const authoredPxRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    if (!plan) {
      authoredPxRef.current = [];
      return;
    }
    const mask = buildLetterMask(glyph);
    const bbox = glyphBBoxFromMask(mask, TRACE_CANVAS);
    authoredPxRef.current = bbox ? letterStrokesToPx(plan, bbox) : [];
  }, [plan, glyph]);
  const resetAttempt = reactExports.useCallback(() => {
    var _a2;
    (_a2 = canvasRef.current) == null ? void 0 : _a2.clear();
    setActiveStroke(0);
    setTraceFeedback(null);
    setScore(null);
    setShowResult(false);
    setFinalScoreSent(false);
    xpAwardedRef.current = false;
  }, []);
  const startTrace = reactExports.useCallback(() => {
    resetAttempt();
    setStage("trace");
  }, [resetAttempt]);
  const startWrite = reactExports.useCallback(() => {
    resetAttempt();
    setStage("write");
  }, [resetAttempt]);
  reactExports.useEffect(() => {
    var _a2, _b2;
    (_a2 = canvasRef.current) == null ? void 0 : _a2.clear();
    (_b2 = canvasRef.current) == null ? void 0 : _b2.clearFeedback();
    setStage("learn");
    setActiveStroke(0);
    setTraceFeedback(null);
    setScore(null);
    setEarnedXp(0);
    setShowResult(false);
    setFinalScoreSent(false);
    xpAwardedRef.current = false;
  }, [letter.id, glyph]);
  const stageRef = reactExports.useRef("learn");
  const showResultRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    stageRef.current = stage;
  }, [stage]);
  reactExports.useEffect(() => {
    showResultRef.current = showResult;
  }, [showResult]);
  reactExports.useEffect(() => {
    return registerBackInterceptor(() => {
      if (showResultRef.current) {
        setShowResult(false);
        return true;
      }
      if (stageRef.current !== "learn") {
        resetAttempt();
        setStage("learn");
        return true;
      }
      return false;
    });
  }, [resetAttempt]);
  const pushLessonBackMarkerIfDeepLink = reactExports.useCallback(() => {
    const w = globalThis.window;
    if (!w) return;
    const state = w.history.state ?? null;
    const idx = Number.isInteger(state == null ? void 0 : state.idx) ? (state == null ? void 0 : state.idx) ?? 0 : 0;
    if (idx !== 0) return;
    if (state == null ? void 0 : state.kqLessonBackMarker) return;
    try {
      w.history.pushState(
        { ...state, key: Math.random().toString(36).substring(2, 10), idx: idx + 1, kqLessonBackMarker: true },
        "",
        w.location.href
      );
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    if (stage === "learn") return;
    pushLessonBackMarkerIfDeepLink();
  }, [stage, pushLessonBackMarkerIfDeepLink]);
  reactExports.useEffect(() => {
    const w = globalThis.window;
    if (!w) return;
    const onPopState = () => {
      if (stageRef.current === "learn") return;
      resetAttempt();
      setStage("learn");
      navigate(`/writing/lesson/${letterId}`);
    };
    w.addEventListener("popstate", onPopState);
    return () => w.removeEventListener("popstate", onPopState);
  }, [navigate, letterId, resetAttempt]);
  const handleTraceStroke = reactExports.useCallback(
    (ink, authored) => {
      var _a2, _b2, _c, _d, _e;
      if (authored.length === 0) return;
      const ev = evaluateLessonStroke(authored, ink);
      if (ev.completed) {
        setTraceFeedback(null);
        (_a2 = canvasRef.current) == null ? void 0 : _a2.clearFeedback();
        if (activeStroke + 1 >= totalStrokes) {
          (_b2 = canvasRef.current) == null ? void 0 : _b2.clear();
          setActiveStroke(0);
          setStage("write");
        } else {
          setActiveStroke((i) => i + 1);
        }
      } else {
        (_c = canvasRef.current) == null ? void 0 : _c.undo();
        (_d = canvasRef.current) == null ? void 0 : _d.showDeviation([ink]);
        setTraceFeedback(
          ev.startedOnDot ? isKu ? "Hinekî ji rê derket. Dîsa biceribîne." : isAr ? "انحرفت قليلاً عن المسار. حاول مجدداً." : "A little off the path. Try this stroke again." : isKu ? "Ji cihê kesk dest pê bike." : isAr ? "ابدأ من النقطة الخضراء." : "Start from the green start dot."
        );
        try {
          (_e = navigator.vibrate) == null ? void 0 : _e.call(navigator, 30);
        } catch {
        }
      }
    },
    [activeStroke, totalStrokes, isKu, isAr]
  );
  const handleFreeCheck = reactExports.useCallback(() => {
    var _a2;
    const strokes = ((_a2 = canvasRef.current) == null ? void 0 : _a2.canvas()) ?? null;
    const mask = buildLetterMask(glyph);
    const strokesMask = buildStrokesMask(strokes);
    const traced = evaluateTrace(mask, strokesMask, void 0, glyph);
    const zonePassRate = traced.zones.length ? traced.zones.filter((z) => z.passed).length / traced.zones.length : 0;
    const s = freeWriteScore(traced.coverage, traced.outOfBounds, zonePassRate);
    setScore(s);
    setShowResult(true);
  }, [glyph]);
  const completeAttempt = reactExports.useCallback(
    (finalScore) => {
      var _a2;
      if (xpAwardedRef.current) return;
      xpAwardedRef.current = true;
      const band2 = scoreBand(finalScore);
      const xp = XP_BY_BAND[band2];
      const prev = ((_a2 = userData == null ? void 0 : userData.writingProgress) == null ? void 0 : _a2[glyph]) ?? {
        bestScore: 0,
        attempts: 0,
        completed: false
      };
      const next = {
        bestScore: Math.max(prev.bestScore, finalScore),
        attempts: prev.attempts + 1,
        completed: prev.completed || finalScore >= 60
      };
      const mergedProgress = {
        ...(userData == null ? void 0 : userData.writingProgress) ?? {},
        [glyph]: next
      };
      const deck = (userData == null ? void 0 : userData.reviewDeck) ?? {};
      const updatedDeck = finalScore >= 60 ? recordReview(deck, letter.id, "good") : deck;
      void updateUserData({ writingProgress: mergedProgress, reviewDeck: updatedDeck });
      if (xp > 0) {
        void updateUserProgress(xp, 0, false, 0);
        setEarnedXp(xp);
      } else {
        setEarnedXp(0);
      }
    },
    [glyph, letter.id, userData, updateUserData, updateUserProgress]
  );
  reactExports.useEffect(() => {
    if (score !== null && showResult && !finalScoreSent) {
      setFinalScoreSent(true);
      completeAttempt(score);
    }
  }, [score, showResult, finalScoreSent, completeAttempt]);
  const nextLetter = reactExports.useCallback(() => {
    const idx = alphabet.findIndex((l) => l.id === letter.id);
    const next = alphabet[(idx + 1) % alphabet.length];
    navigate(`/writing/lesson/${next.id}`, { replace: true });
  }, [navigate, letter.id]);
  reactExports.useCallback(() => {
    const idx = alphabet.findIndex((l) => l.id === letter.id);
    const prev = alphabet[(idx - 1 + alphabet.length) % alphabet.length];
    navigate(`/writing/lesson/${prev.id}`, { replace: true });
  }, [navigate, letter.id]);
  const bestScore = ((_b = (_a = userData == null ? void 0 : userData.writingProgress) == null ? void 0 : _a[glyph]) == null ? void 0 : _b.bestScore) ?? null;
  const band = score !== null ? scoreBand(score) : "retry";
  const t = {
    stageWatch: isKu ? "Temaşe bike" : isAr ? "شاهد" : "Watch",
    back: isKu ? "Vegere tîpan" : isAr ? "إلى الحروف" : "All letters",
    speak: isKu ? "Bibihîze" : isAr ? "استمع" : "Listen",
    watchNext: isKu ? "Niha binivîse" : isAr ? "ابدأ التتبع الآن" : "Now trace it",
    replay: isKu ? "Dîsa lê binêre" : isAr ? "إعادة المشاهدة" : "Replay",
    clear: isKu ? "Paqij bike" : isAr ? "مسح" : "Clear",
    undo: isKu ? "Vegere" : isAr ? "تراجع" : "Undo",
    check: isKu ? "Kontrol" : isAr ? "تحقق" : "Check",
    skipWrite: isKu ? "Ji bo nivîsînê amade ye" : isAr ? "انتقل للكتابة" : "Go write",
    next: isKu ? "Tîpa din" : isAr ? "الحرف التالي" : "Next letter",
    traceTitle: isKu ? "Bişopîne — xet dixet" : isAr ? "تتبّع — حركة بحركة" : "Trace stroke by stroke",
    traceHint: isKu ? "Ji xala kesk dest pê bike û bigihîne xala zêrîn." : isAr ? "ابدأ من النقطة الخضراء وتوقف عند النقطة الذهبية." : "Start at the green dot and stop at the gold dot.",
    writeTitle: isKu ? "Bê rêber binivîse" : isAr ? "اكتب بدون توجيه" : "Write it freely",
    writeHint: isKu ? "Niha bê xêzên arîkar binivîse." : isAr ? "اكتب الآن بدون الخطوط الإرشادية." : "Now write it without the guide lines.",
    noGuideNotice: isKu ? "Daneyên vê tîpê hê ne amade ne — em li ser dixebitin." : isAr ? "بيانات هذا الحرف غير جاهزة بعد — نعمل عليها." : "Stroke data for this letter is still being verified — coming soon.",
    tryAgain: isKu ? "Dîsa biceribîne" : isAr ? "حاول مجدداً" : "Try again"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col min-h-screen pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate("/writing", { replace: true }),
          className: "flex items-center gap-1 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider min-h-[44px] px-1 cursor-pointer bg-transparent border-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 rtl:-scale-x-100" }),
            t.back
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        bestScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wide", children: [
          isKu ? "Baştirîn: " : isAr ? "الأفضل: " : "Best: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-ink", children: bestScore })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "ltr", className: "font-mono text-xl font-black text-ink", children: glyph })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex items-center justify-center gap-2 mb-4", "aria-label": "Lesson steps", children: [
      ["learn", Volume2],
      ["watch", Eye],
      ["trace", Pencil],
      ["write", Feather]
    ].map(([s, Icon], i) => {
      const order = ["learn", "watch", "trace", "write"];
      const idx = order.indexOf(stage);
      const isDone = order.indexOf(s) < idx;
      const isActive = s === stage;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: [
              "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
              isActive ? "bg-[#FFB300] text-[#432C00]" : isDone ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
            ].join(" "),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
          }
        ),
        i < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-px bg-slate-200 dark:bg-slate-700" })
      ] }, s);
    }) }),
    stage === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-[2rem] p-8 text-center w-full max-w-md shadow-flat border border-line-soft relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -top-16 h-48 bg-[radial-gradient(circle_at_50%_0%,#FFB300_0%,transparent_65%)] opacity-[0.10] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 end-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudioButton,
          {
            audioUrl: letter.charAudio,
            textToSpeak: glyph,
            label: t.speak,
            className: "bg-[#FFF3D6] dark:bg-[#3A2F14] hover:bg-[#FFE7B3] active:scale-90 text-[#B8860B] dark:text-[#FFCE6B] border border-[#FFB300]/30 cursor-pointer shadow-sm"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-8xl font-black mb-4 mt-2 tracking-tight font-display select-none text-ink", dir: "ltr", children: glyph }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#FFF6E0] dark:bg-[#3A2F14] border border-[#FFB300]/30 p-4 rounded-2xl w-full max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black text-ink", dir: "ltr", children: letter.exampleWord }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold text-muted mt-1", children: [
            isKu ? "Mînak:" : isAr ? "مثال:" : "Example:",
            " ",
            isKu ? letter.exampleWord : isAr ? letter.meaningAr : letter.meaningEn
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 w-full max-w-xs mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudioButton,
          {
            audioUrl: letter.audio,
            textToSpeak: letter.exampleWord,
            label: t.speak
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "lg", fullWidth: true, onClick: () => setStage("watch"), leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" }), children: t.stageWatch }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "md", fullWidth: true, onClick: startTrace, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }), children: isKu ? "Yekser bişopîne" : isAr ? "ابدأ التتبع مباشرة" : "Skip to tracing" })
      ] })
    ] }),
    stage === "watch" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LetterDemo,
      {
        glyph,
        labels: { watch: t.stageWatch, replay: t.replay, continue: t.watchNext, notice: t.noGuideNotice },
        onContinue: startTrace
      }
    ),
    stage === "trace" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black text-ink", children: t.traceTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted mt-0.5", children: t.traceHint }),
        traceable && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 max-w-[180px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: activeStroke, max: totalStrokes, size: "sm" }) })
      ] }),
      !traceable ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm font-semibold text-muted p-6", children: [
        t.noGuideNotice,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "md", onClick: startWrite, children: t.skipWrite }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WritingLessonCanvas,
          {
            ref: canvasRef,
            char: glyph,
            mode: "trace",
            activeStrokeIndex: activeStroke,
            onStrokeComplete: handleTraceStroke
          },
          `trace-${glyph}`
        ),
        traceFeedback && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold text-[#EF4444] text-center", role: "status", "aria-live": "polite", children: traceFeedback }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: () => {
            var _a2;
            return (_a2 = canvasRef.current) == null ? void 0 : _a2.clear();
          }, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "w-4 h-4" }), className: "text-xs h-12", children: t.clear }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: () => {
            var _a2;
            return (_a2 = canvasRef.current) == null ? void 0 : _a2.undo();
          }, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }), className: "text-xs h-12", children: t.undo })
        ] })
      ] })
    ] }),
    stage === "write" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black text-ink", children: t.writeTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted mt-0.5", children: t.writeHint })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        WritingLessonCanvas,
        {
          ref: canvasRef,
          char: glyph,
          mode: "free"
        },
        `write-${glyph}`
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: () => {
          var _a2;
          return (_a2 = canvasRef.current) == null ? void 0 : _a2.clear();
        }, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "w-4 h-4" }), className: "text-xs h-12", children: t.clear }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: () => {
          var _a2;
          return (_a2 = canvasRef.current) == null ? void 0 : _a2.undo();
        }, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }), className: "text-xs h-12", children: t.undo }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "md", onClick: handleFreeCheck, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }), className: "text-xs h-12 col-span-2", children: t.check })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showResult && score !== null,
        onClose: () => setShowResult(false),
        title: bandLabels(isKu, isAr)[band],
        variant: "center",
        hideCloseButton: true,
        children: score !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { score, label: isKu ? "Xal" : isAr ? "النقاط" : "Score" }),
          earnedXp > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-sm font-black text-[#D97706] dark:text-[#FFCE6B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }),
            "+",
            earnedXp,
            " XP"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted text-center leading-relaxed", children: band === "excellent" ? isKu ? "Karekî hêja! Tu amade yî bo tîpa din." : isAr ? "عمل رائع! أنت جاهز للحرف التالي." : "Wonderful work! You are ready for the next letter." : band === "good" ? isKu ? "Baş e! Hinekî pratîk û tu dibî hoste." : isAr ? "جيد! القليل من التدريب وستتقنه." : "Good! A little more practice and you will master it." : band === "practice" ? isKu ? "Forma baş. Dîsa biceribîne da çêtir bibî." : isAr ? "شكل جيد. أعد المحاولة لتتحسن." : "Good form. Try again to improve." : isKu ? "Hê zûtir tê. Dîsa biceribîne!" : isAr ? "ستتقنه قريباً. حاول مجدداً!" : "You are getting there. Give it another try!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: resetAttempt, leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }), className: "text-xs h-12", children: t.tryAgain }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "success", size: "md", onClick: nextLetter, trailingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rtl:-scale-x-100" }), className: "text-xs h-12", children: t.next })
          ] })
        ] })
      }
    )
  ] });
}
export {
  WritingLessonPage,
  WritingLessonPage as default
};
