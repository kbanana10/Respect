import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { g as buildGlyphMask, T as TRACE_CANVAS, S as SINGLE_BOX } from "./traceLetters-CGZtlSUi.js";
function parseStrokePath(path) {
  const points = [];
  const tokens = path.match(/[A-Za-z]|-?\d*\.?\d+(?:e[+-]?\d+)?/g);
  if (!tokens) return points;
  let i = 0;
  while (i < tokens.length) {
    const cmd = tokens[i].toUpperCase();
    i += 1;
    const coords = [];
    while (i < tokens.length && /^-?\d*\.?\d+(?:e[+-]?\d+)?$/i.test(tokens[i])) {
      coords.push(parseFloat(tokens[i]));
      i += 1;
    }
    for (let k = 0; k + 1 < coords.length; k += 2) {
      if (cmd === "M" && points.length === 0) {
        points.push({ x: coords[k], y: coords[k + 1] });
      } else if (cmd === "M") {
        points.push({ x: coords[k], y: coords[k + 1] });
      } else {
        points.push({ x: coords[k], y: coords[k + 1] });
      }
    }
  }
  return points;
}
const STROKE_PLANS = {
  E: {
    glyph: "E",
    strokes: [
      { order: 0, path: "M0.09 0.05 L0.09 0.94", direction: "end" },
      // vertical stem, top→bottom
      { order: 1, path: "M0.09 0.07 L0.93 0.07", direction: "end" },
      // top bar, left→right
      { order: 2, path: "M0.09 0.46 L0.86 0.46", direction: "end" },
      // middle bar
      { order: 3, path: "M0.09 0.90 L0.92 0.90", direction: "end" }
      // bottom bar
    ]
  },
  O: {
    glyph: "O",
    strokes: [
      {
        order: 0,
        path: "M0.50 0.05 L0.24 0.07 L0.08 0.21 L0.06 0.50 L0.08 0.79 L0.23 0.93 L0.50 0.95 L0.77 0.93 L0.92 0.79 L0.94 0.50 L0.92 0.21 L0.76 0.07 L0.50 0.05",
        direction: "end"
      }
    ]
  },
  I: {
    glyph: "I",
    strokes: [
      { order: 0, path: "M0.50 0.10 L0.50 0.90", direction: "end" },
      // stem
      { order: 1, path: "M0.06 0.10 L0.94 0.10", direction: "end" },
      // top bar
      { order: 2, path: "M0.06 0.90 L0.94 0.90", direction: "end" }
      // bottom bar
    ]
  },
  L: {
    glyph: "L",
    strokes: [
      { order: 0, path: "M0.10 0.05 L0.10 0.90", direction: "end" },
      // stem
      { order: 1, path: "M0.10 0.90 L0.93 0.90", direction: "end" }
      // base
    ]
  },
  T: {
    glyph: "T",
    strokes: [
      { order: 0, path: "M0.05 0.06 L0.95 0.06", direction: "end" },
      // top bar
      { order: 1, path: "M0.50 0.06 L0.50 0.94", direction: "end" }
      // stem, top→bottom
    ]
  },
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
      { order: 0, path: "M0.14 0.04 L0.14 0.96", direction: "end" },
      // stem
      {
        order: 1,
        path: "M0.14 0.12 L0.55 0.05 L0.82 0.16 L0.86 0.34 L0.60 0.47 L0.14 0.47",
        direction: "end"
      },
      // upper bowl
      {
        order: 2,
        path: "M0.14 0.53 L0.60 0.49 L0.86 0.60 L0.90 0.80 L0.70 0.95 L0.14 0.96",
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
        path: "M0.88 0.16 L0.55 0.05 L0.22 0.06 L0.10 0.18 L0.05 0.45 L0.06 0.62 L0.12 0.82 L0.30 0.95 L0.58 0.96 L0.85 0.85",
        direction: "end"
      }
    ]
  },
  S: {
    glyph: "S",
    strokes: [
      {
        order: 0,
        path: "M0.82 0.13 L0.55 0.05 L0.28 0.06 L0.13 0.14 L0.09 0.26 L0.12 0.37 L0.22 0.45 L0.42 0.50 L0.62 0.55 L0.75 0.62 L0.80 0.74 L0.75 0.86 L0.58 0.95 L0.34 0.94 L0.19 0.87 L0.15 0.72",
        direction: "end"
      }
    ]
  },
  U: {
    glyph: "U",
    strokes: [
      { order: 0, path: "M0.13 0.03 L0.13 0.70 L0.24 0.88 L0.42 0.96", direction: "end" },
      // left stem → bowl left half
      { order: 1, path: "M0.87 0.03 L0.87 0.70 L0.76 0.88 L0.58 0.96", direction: "end" }
      // right stem → bowl right half
    ]
  },
  Û: {
    glyph: "Û",
    // TALLER box than U (the circumflex sits above the letter), so the base U
    // occupies y≈0.26..0.97. Diacritic is ALWAYS last: stroke 2, 3.
    strokes: [
      { order: 0, path: "M0.15 0.28 L0.15 0.72 L0.26 0.89 L0.43 0.96", direction: "end" },
      // left stem → bowl
      { order: 1, path: "M0.85 0.28 L0.85 0.72 L0.74 0.89 L0.57 0.96", direction: "end" },
      // right stem → bowl
      { order: 2, path: "M0.50 0.02 L0.37 0.09", direction: "end" },
      // circumflex left arm
      { order: 3, path: "M0.50 0.02 L0.63 0.10", direction: "end" }
      // circumflex right arm
    ]
  }
};
const AUTHORED_GLYPHS = Object.keys(STROKE_PLANS);
const SIZE = TRACE_CANVAS;
const PLAY_DURATION_MS = 2e3;
function StrokeGuide({
  char,
  replayToken,
  onDone,
  guideBox = SINGLE_BOX
}) {
  const ref = reactExports.useRef(null);
  const onDoneRef = reactExports.useRef(onDone);
  onDoneRef.current = onDone;
  reactExports.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas == null ? void 0 : canvas.getContext("2d");
    if (!canvas || !ctx) return;
    const plan = STROKE_PLANS[char];
    if (!plan) return;
    const strokesMeta = plan.strokes;
    const mask = buildGlyphMask(char, guideBox);
    let minRow = SIZE, maxRow = -1, minCol = SIZE, maxCol = -1;
    for (let i = 0; i < mask.length; i += 1) {
      if (mask[i] === 1) {
        const r = Math.floor(i / SIZE);
        const c = i % SIZE;
        if (r < minRow) minRow = r;
        if (r > maxRow) maxRow = r;
        if (c < minCol) minCol = c;
        if (c > maxCol) maxCol = c;
      }
    }
    if (maxRow < minRow) return;
    const boxW = maxCol - minCol;
    const boxH = maxRow - minRow;
    const toPx = (p) => ({
      x: minCol + p.x * boxW,
      y: minRow + p.y * boxH
    });
    const strokesPx = strokesMeta.map((s) => parseStrokePath(s.path).map(toPx));
    let raf = 0;
    let start = 0;
    const drawFrame = (now) => {
      if (start === 0) start = now;
      const elapsed = now - start;
      const total = PLAY_DURATION_MS;
      const progress = Math.min(1, elapsed / total);
      const pos = progress * strokesPx.length;
      const activeIdx = Math.min(strokesPx.length - 1, Math.floor(pos));
      const strokeFrac = pos - Math.floor(pos);
      ctx.clearRect(0, 0, SIZE, SIZE);
      for (let s = 0; s < strokesPx.length; s += 1) {
        const px = strokesPx[s];
        const isPast = s < activeIdx;
        const isActive = s === activeIdx;
        if (!isPast && !isActive) continue;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = SIZE * 0.028;
        ctx.beginPath();
        if (isPast) {
          ctx.strokeStyle = "rgba(245, 158, 11, 0.30)";
          ctx.moveTo(px[0].x, px[0].y);
          for (let k = 1; k < px.length; k += 1) ctx.lineTo(px[k].x, px[k].y);
        } else {
          ctx.strokeStyle = "rgba(245, 158, 11, 0.92)";
          const target = 1 + (px.length - 1) * strokeFrac;
          const last2 = Math.floor(target);
          ctx.moveTo(px[0].x, px[0].y);
          for (let k = 1; k <= last2 && k < px.length; k += 1) ctx.lineTo(px[k].x, px[k].y);
          if (last2 < px.length - 1) {
            const t = target - last2;
            const a = px[last2];
            const b = px[last2 + 1];
            ctx.lineTo(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
          } else if (strokeFrac < 1) {
            const a = px[px.length - 2];
            const b = px[px.length - 1];
            ctx.lineTo(a.x + (b.x - a.x) * strokeFrac, a.y + (b.y - a.y) * strokeFrac);
          }
        }
        ctx.stroke();
      }
      if (progress < 1) {
        const px = strokesPx[activeIdx];
        const seg = px.length <= 1 ? 0 : (px.length - 1) * strokeFrac;
        const lo = Math.floor(seg);
        const t = seg - lo;
        const a = px[Math.min(lo, px.length - 1)];
        const b = px[Math.min(lo + 1, px.length - 1)];
        const tip = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        ctx.fillStyle = "rgba(245, 158, 11, 0.95)";
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, SIZE * 0.022, 0, Math.PI * 2);
        ctx.fill();
      }
      if (progress < 1) {
        raf = requestAnimationFrame(drawFrame);
      } else {
        ctx.lineWidth = SIZE * 0.028;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
        for (const px of strokesPx) {
          if (!px.length) continue;
          ctx.beginPath();
          ctx.moveTo(px[0].x, px[0].y);
          for (let k = 1; k < px.length; k += 1) ctx.lineTo(px[k].x, px[k].y);
          ctx.stroke();
        }
        window.setTimeout(() => {
          var _a;
          ctx.clearRect(0, 0, SIZE, SIZE);
          (_a = onDoneRef.current) == null ? void 0 : _a.call(onDoneRef);
        }, 450);
      }
    };
    ctx.clearRect(0, 0, SIZE, SIZE);
    start = 0;
    raf = requestAnimationFrame(drawFrame);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [char, guideBox, replayToken]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref,
      width: SIZE,
      height: SIZE,
      className: "absolute inset-0 w-full h-full pointer-events-none",
      "aria-hidden": "true"
    }
  );
}
const RESAMPLE_N = 96;
const ORDER_TOLERANCE_PX = 35;
const PATH_TOLERANCE_PX = 30;
const CONNECTION_TOLERANCE_PX = 15;
const AUTH_TOUCH_PX = 6;
const COVERAGE_MIN = 0.7;
const COVERAGE_TOLERANCE_PX = 20;
const RED_TOLERANCE_PX = 14;
const MISSING_COVERAGE_FLOOR = 0.25;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const pathLength = (p) => {
  let s = 0;
  for (let i = 1; i < p.length; i += 1) s += dist(p[i - 1], p[i]);
  return s;
};
function resample(p, n = RESAMPLE_N) {
  if (p.length === 0) return [];
  const len = pathLength(p);
  if (len <= 1e-9) return Array.from({ length: n }, () => ({ x: p[0].x, y: p[0].y }));
  const out = [];
  let seg = 0;
  let acc = 0;
  for (let k = 0; k < n; k += 1) {
    const target = len * k / (n - 1);
    while (seg < p.length - 2 && acc + dist(p[seg], p[seg + 1]) < target) {
      acc += dist(p[seg], p[seg + 1]);
      seg += 1;
    }
    const segLen = dist(p[seg], p[Math.min(seg + 1, p.length - 1)]) || 1e-9;
    const t = Math.min(1, Math.max(0, (target - acc) / segLen));
    const a = p[seg];
    const b = p[Math.min(seg + 1, p.length - 1)];
    out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  }
  return out;
}
function frechet(P, Q) {
  const n = P.length;
  const m = Q.length;
  if (n === 0 || m === 0) return Infinity;
  const dd = (i, j) => dist(P[i], Q[j]);
  const c = Array.from({ length: n }, () => new Float64Array(m).fill(Infinity));
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      const d = dd(i, j);
      if (i === 0 && j === 0) c[i][j] = d;
      else if (i === 0) c[i][j] = Math.max(c[i][j - 1], d);
      else if (j === 0) c[i][j] = Math.max(c[i - 1][j], d);
      else c[i][j] = Math.max(Math.min(c[i - 1][j], c[i][j - 1], c[i - 1][j - 1]), d);
    }
  }
  return c[n - 1][m - 1];
}
function mmd(P, Q) {
  if (P.length === 0 || Q.length === 0) return Infinity;
  let sum = 0;
  for (const p of P) {
    let m = Infinity;
    for (const q of Q) m = Math.min(m, dist(p, q));
    sum += m;
  }
  for (const q of Q) {
    let m = Infinity;
    for (const p of P) m = Math.min(m, dist(p, q));
    sum += m;
  }
  return sum / (P.length + Q.length);
}
function minInterDistance(P, Q) {
  let best = Infinity;
  for (const p of P) {
    for (let j = 0; j + 1 < Q.length; j += 1) {
      best = Math.min(best, pointSegDistance(p, Q[j], Q[j + 1]));
    }
  }
  for (const q of Q) {
    for (let i = 0; i + 1 < P.length; i += 1) {
      best = Math.min(best, pointSegDistance(q, P[i], P[i + 1]));
    }
  }
  return best;
}
function pointSegDistance(p, a, b) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const len2 = abx * abx + aby * aby;
  if (len2 <= 1e-9) return dist(p, a);
  let t = ((p.x - a.x) * abx + (p.y - a.y) * aby) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + abx * t), p.y - (a.y + aby * t));
}
function pointPolyDistance(p, poly) {
  let best = Infinity;
  for (let i = 0; i + 1 < poly.length; i += 1) {
    best = Math.min(best, pointSegDistance(p, poly[i], poly[i + 1]));
  }
  if (poly.length === 1) best = Math.min(best, dist(p, poly[0]));
  return best;
}
const COVERAGE_SAMPLES = 48;
function pathCoverage(path, ink, tol) {
  if (path.length === 0) return 0;
  const sampled = path.length >= COVERAGE_SAMPLES ? path : resample(path, COVERAGE_SAMPLES);
  let covered = 0;
  for (const p of sampled) {
    if (ink.some((stroke) => pointPolyDistance(p, stroke) <= tol)) covered += 1;
  }
  return covered / sampled.length;
}
const first = (p) => p[0];
const last = (p) => p[p.length - 1];
function drawnBackwards(inkRaw, authoredRaw) {
  const sA = first(authoredRaw);
  const eA = last(authoredRaw);
  const sI = first(inkRaw);
  const eI = last(inkRaw);
  const closed = dist(sA, eA) < 0.05 * Math.max(1, pathLength(authoredRaw));
  if (closed) {
    const ink = resample(inkRaw);
    const fwd = frechet(ink, resample(authoredRaw));
    const bwd = frechet(ink, resample([...authoredRaw].reverse()));
    return bwd < fwd - 1e-9;
  }
  const forward = dist(sI, sA) + dist(eI, eA);
  const reversed = dist(sI, eA) + dist(eI, sA);
  return reversed < forward - 1e-9;
}
function glyphBBoxFromMask(mask, size) {
  let minR = size;
  let maxR = -1;
  let minC = size;
  let maxC = -1;
  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === 1) {
      const r = Math.floor(i / size);
      const c = i % size;
      if (r < minR) minR = r;
      if (r > maxR) maxR = r;
      if (c < minC) minC = c;
      if (c > maxC) maxC = c;
    }
  }
  if (maxC < minC) return null;
  return { minC, minR, w: maxC - minC, h: maxR - minR };
}
function authoredStrokesToPx(glyph, bbox) {
  const plan = STROKE_PLANS[glyph];
  if (!plan) return [];
  return plan.strokes.map(
    (s) => parseStrokePath(s.path).map((p) => ({
      x: bbox.minC + p.x * bbox.w,
      y: bbox.minR + p.y * bbox.h
    }))
  );
}
function computeHighlights(inkRaw, authored) {
  const deviations = [];
  const missingPaths = [];
  const stops = Math.min(inkRaw.length, authored.length);
  for (let i = 0; i < stops; i += 1) {
    for (const p of inkRaw[i]) {
      if (pointPolyDistance(p, authored[i]) > RED_TOLERANCE_PX) deviations.push(p);
    }
  }
  for (let i = 0; i < authored.length; i += 1) {
    if (pathCoverage(authored[i], inkRaw, COVERAGE_TOLERANCE_PX) < MISSING_COVERAGE_FLOOR) {
      missingPaths.push(authored[i]);
    }
  }
  return { deviations, missingPaths };
}
function validateStrokeTrace(glyph, inkStrokes, bbox) {
  const authored = authoredStrokesToPx(glyph, bbox);
  const expected = authored.length;
  const emptyCoverage = () => 0;
  if (inkStrokes.length === 0) {
    const { deviations, missingPaths } = computeHighlights([], authored);
    return {
      passed: false,
      reason: "empty",
      coverage: emptyCoverage(),
      strokeCount: 0,
      expectedCount: expected,
      deviations,
      missingPaths
    };
  }
  if (inkStrokes.length !== expected) {
    const { deviations, missingPaths } = computeHighlights(inkStrokes, authored);
    return {
      passed: false,
      reason: "stroke-count",
      coverage: 0,
      strokeCount: inkStrokes.length,
      expectedCount: expected,
      deviations,
      missingPaths
    };
  }
  const ink = inkStrokes.map((s) => resample(s));
  const A = authored.map((s) => resample(s));
  for (let i = 0; i < expected; i += 1) {
    const own = mmd(ink[i], A[i]);
    let best = own;
    for (let j = 0; j < expected; j += 1) {
      if (j === i) continue;
      best = Math.min(best, mmd(ink[i], A[j]));
    }
    if (own > ORDER_TOLERANCE_PX || best < own - 1e-9) {
      const { deviations, missingPaths } = computeHighlights(inkStrokes, authored);
      return {
        passed: false,
        reason: "order",
        coverage: 0,
        strokeCount: inkStrokes.length,
        expectedCount: expected,
        deviations,
        missingPaths
      };
    }
  }
  for (let i = 0; i < expected; i += 1) {
    if (drawnBackwards(inkStrokes[i], authored[i])) {
      const { deviations, missingPaths } = computeHighlights(inkStrokes, authored);
      return {
        passed: false,
        reason: "direction",
        coverage: 0,
        strokeCount: inkStrokes.length,
        expectedCount: expected,
        deviations,
        missingPaths
      };
    }
  }
  for (let i = 0; i < expected; i += 1) {
    if (frechet(ink[i], A[i]) > PATH_TOLERANCE_PX) {
      const { deviations, missingPaths } = computeHighlights(inkStrokes, authored);
      return {
        passed: false,
        reason: "shape",
        coverage: 0,
        strokeCount: inkStrokes.length,
        expectedCount: expected,
        deviations,
        missingPaths
      };
    }
  }
  for (let i = 0; i + 1 < expected; i += 1) {
    const authoredGap = minInterDistance(authored[i], authored[i + 1]);
    if (authoredGap <= AUTH_TOUCH_PX) {
      const inkGap = minInterDistance(inkStrokes[i], inkStrokes[i + 1]);
      if (inkGap > CONNECTION_TOLERANCE_PX) {
        const { deviations, missingPaths } = computeHighlights(inkStrokes, authored);
        return {
          passed: false,
          reason: "connection",
          coverage: 0,
          strokeCount: inkStrokes.length,
          expectedCount: expected,
          deviations,
          missingPaths
        };
      }
    }
  }
  let minCoverage = 1;
  for (const stroke of authored) {
    minCoverage = Math.min(minCoverage, pathCoverage(stroke, inkStrokes, COVERAGE_TOLERANCE_PX));
  }
  if (minCoverage < COVERAGE_MIN) {
    const { deviations, missingPaths } = computeHighlights(inkStrokes, authored);
    return {
      passed: false,
      reason: "coverage",
      coverage: minCoverage,
      strokeCount: inkStrokes.length,
      expectedCount: expected,
      deviations,
      missingPaths
    };
  }
  return {
    passed: true,
    reason: null,
    coverage: minCoverage,
    strokeCount: inkStrokes.length,
    expectedCount: expected,
    deviations: [],
    missingPaths: []
  };
}
const STROKE_DOT_TOLERANCE_PX = 30;
function scoreBand(score) {
  if (score >= 90) return "excellent";
  if (score >= 75) return "good";
  if (score >= 60) return "practice";
  return "retry";
}
function evaluateLessonStroke(authored, ink) {
  if (authored.length === 0 || ink.length === 0) {
    return {
      startedOnDot: false,
      endedOnDot: false,
      onPath: false,
      backwards: true,
      coverage: 0,
      completed: false
    };
  }
  const sA = first(authored);
  const eA = last(authored);
  const sI = first(ink);
  const eI = last(ink);
  const startedOnDot = dist(sI, sA) <= STROKE_DOT_TOLERANCE_PX;
  const endedOnDot = dist(eI, eA) <= STROKE_DOT_TOLERANCE_PX;
  const backwards = drawnBackwards(ink, authored);
  const coverage = pathCoverage(authored, [ink], COVERAGE_TOLERANCE_PX);
  let onPath = false;
  if (ink.length >= 2) {
    const inkR = resample(ink);
    const aR = resample(authored);
    onPath = frechet(inkR, aR) <= PATH_TOLERANCE_PX;
  }
  const completed = startedOnDot && onPath && !backwards && endedOnDot && coverage >= COVERAGE_MIN;
  return { startedOnDot, endedOnDot, onPath, backwards, coverage, completed };
}
function freeWriteScore(coverage, outOfBounds, zonePassRate) {
  const cov = Math.max(0, Math.min(1, coverage));
  const zoneFit = Math.max(0, Math.min(1, zonePassRate));
  const oob = Math.max(0, Math.min(1, outOfBounds));
  const boundsFactor = Math.max(0.5, 1 - Math.max(0, oob - 0.05));
  const raw = 100 * (0.5 * cov + 0.5 * zoneFit) * boundsFactor;
  return Math.max(0, Math.min(100, Math.round(raw)));
}
export {
  AUTHORED_GLYPHS as A,
  StrokeGuide as S,
  evaluateLessonStroke as e,
  freeWriteScore as f,
  glyphBBoxFromMask as g,
  parseStrokePath as p,
  scoreBand as s,
  validateStrokeTrace as v
};
