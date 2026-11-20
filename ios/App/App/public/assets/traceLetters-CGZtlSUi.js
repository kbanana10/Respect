const TRACE_CANVAS = 320;
const STROKE_ALPHA_THRESHOLD = 64;
const COVERAGE_TOLERANCE_PX = 4;
const BOUNDS_TOLERANCE_PX = 2;
const ZONE_COVERAGE_MIN = 0.4;
const ZONE_COVERAGE_FLOOR = 0.2;
const ZONE_COVERAGE_MEAN_MIN = 0.6;
const OVERALL_COVERAGE_MIN = 0.6;
const OUT_OF_BOUNDS_MAX = 0.3;
const ZONE_GRID = 3;
const ZONE_MIN_DIMENSION = 4;
const ZONE_MIN_PIXELS = 20;
const ZONE_CONFIG = {
  // Narrow letters → one column × four rows.
  I: { rows: 4, cols: 1 },
  l: { rows: 4, cols: 1 },
  i: { rows: 4, cols: 1 },
  j: { rows: 4, cols: 1 },
  "1": { rows: 4, cols: 1 },
  // Wide / complex letters → 4×4.
  M: { rows: 4, cols: 4 },
  W: { rows: 4, cols: 4 },
  m: { rows: 4, cols: 4 },
  w: { rows: 4, cols: 4 },
  N: { rows: 4, cols: 4 },
  Z: { rows: 4, cols: 4 },
  K: { rows: 4, cols: 4 },
  X: { rows: 4, cols: 4 }
};
function resolveZoneGrid(glyph, boundingWidth, boundingHeight) {
  let config;
  const override = glyph ? ZONE_CONFIG[glyph] : void 0;
  if (override) {
    config = override;
  } else {
    const ratio = boundingWidth / Math.max(1, boundingHeight);
    if (ratio < 0.4) config = { rows: 3, cols: 1 };
    else if (ratio > 1.5) config = { rows: 3, cols: 4 };
    else config = { rows: ZONE_GRID, cols: ZONE_GRID };
  }
  let { rows, cols } = config;
  while (rows > 1 && cols > 1 && (boundingHeight / rows < ZONE_MIN_DIMENSION || boundingWidth / cols < ZONE_MIN_DIMENSION)) {
    rows -= 1;
    cols -= 1;
  }
  return { rows, cols };
}
const SINGLE_BOX = { left: 0.09, top: 0.09, right: 0.91, bottom: 0.91 };
const FULL_BOX = { left: 0, top: 0, right: 1, bottom: 1 };
const MISS_TARGET = 2;
function emptyTraceResult() {
  return {
    passed: false,
    coverage: 0,
    outOfBounds: 0,
    reason: "empty",
    zones: [],
    miss: new Uint8ClampedArray(TRACE_CANVAS * TRACE_CANVAS)
  };
}
function glyphFontForBox(box) {
  const w = Math.max(0, box.right - box.left);
  const h = Math.max(0, box.bottom - box.top);
  const px = Math.max(8, Math.round(TRACE_CANVAS * Math.min(w, h) * 0.88));
  return `900 ${px}px "Noto Sans", "Arial", sans-serif`;
}
function drawGlyphInBox(ctx, glyph, box, fillStyle) {
  const cx = (box.left + box.right) / 2 * TRACE_CANVAS;
  const cy = (box.top + box.bottom) / 2 * TRACE_CANVAS;
  ctx.save();
  ctx.fillStyle = fillStyle;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = glyphFontForBox(box);
  ctx.fillText(glyph, cx, cy);
  ctx.restore();
}
function renderGlyph(glyph, box = FULL_BOX, fillStyle = "#000000") {
  const canvas = document.createElement("canvas");
  canvas.width = TRACE_CANVAS;
  canvas.height = TRACE_CANVAS;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("Canvas 2D context unavailable");
  }
  drawGlyphInBox(ctx, glyph, box, fillStyle);
  return canvas;
}
function buildInkCoverLookup(ink, size, radius) {
  const n = size * size;
  const cover = new Uint8ClampedArray(n);
  if (radius <= 0) {
    for (let i = 0; i < n; i += 1) {
      if (ink[i] === 1) cover[i] = 1;
    }
    return cover;
  }
  let rowCover;
  rowCover = new Uint8ClampedArray(n);
  for (let r = 0; r < size; r += 1) {
    let run = 0;
    for (let c = 0; c < size + radius; c += 1) {
      if (c < size && ink[r * size + c] === 1) run += 1;
      let oldest;
      if (c >= 2 * radius + 1) {
        oldest = c - (2 * radius + 1);
        if (oldest < size && ink[r * size + oldest] === 1) run -= 1;
      }
      let center;
      if (c >= radius) {
        center = c - radius;
        if (center < size && run > 0) rowCover[r * size + center] = 1;
      }
    }
  }
  for (let c = 0; c < size; c += 1) {
    let run = 0;
    for (let r = 0; r < size + radius; r += 1) {
      if (r < size && rowCover[r * size + c] === 1) run += 1;
      if (r >= 2 * radius + 1) {
        const oldest = r - (2 * radius + 1);
        if (oldest < size && rowCover[oldest * size + c] === 1) run -= 1;
      }
      if (r >= radius) {
        const center = r - radius;
        if (center < size && run > 0) cover[center * size + c] = 1;
      }
    }
  }
  return cover;
}
function buildGlyphMask(glyph, box = FULL_BOX) {
  const n = TRACE_CANVAS * TRACE_CANVAS;
  const rendered = renderGlyph(glyph, box, "#000000");
  const rctx = rendered.getContext("2d", { willReadFrequently: true });
  if (!rctx) {
    throw new Error("Canvas 2D context unavailable");
  }
  const ralpha = rctx.getImageData(0, 0, TRACE_CANVAS, TRACE_CANVAS).data;
  const mask = new Uint8ClampedArray(n);
  for (let i = 0; i < n; i += 1) {
    mask[i] = ralpha[i * 4 + 3] > 0 ? 1 : 0;
  }
  return mask;
}
function buildLetterMask(char) {
  return buildGlyphMask(char, SINGLE_BOX);
}
function buildStrokesMask(strokes) {
  const n = TRACE_CANVAS * TRACE_CANVAS;
  const ink = new Uint8ClampedArray(n);
  if (!strokes) return ink;
  const src = document.createElement("canvas");
  src.width = TRACE_CANVAS;
  src.height = TRACE_CANVAS;
  const srcCtx = src.getContext("2d", { willReadFrequently: true });
  if (!srcCtx) {
    throw new Error("Canvas 2D context unavailable");
  }
  srcCtx.drawImage(strokes, 0, 0, TRACE_CANVAS, TRACE_CANVAS);
  const data = srcCtx.getImageData(0, 0, TRACE_CANVAS, TRACE_CANVAS).data;
  for (let i = 0; i < n; i += 1) {
    if (data[i * 4 + 3] > STROKE_ALPHA_THRESHOLD) ink[i] = 1;
  }
  return ink;
}
function glyphBounds(mask, size) {
  let minRow = size;
  let maxRow = -1;
  let minCol = size;
  let maxCol = -1;
  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      if (mask[r * size + c] === 1) {
        if (r < minRow) minRow = r;
        if (r > maxRow) maxRow = r;
        if (c < minCol) minCol = c;
        if (c > maxCol) maxCol = c;
      }
    }
  }
  if (maxRow < minRow) return null;
  return { minRow, maxRow, minCol, maxCol };
}
function evaluateZones(glyph, glyphMask, cover, size) {
  const miss = new Uint8ClampedArray(size * size);
  const bounds = glyphBounds(glyphMask, size);
  if (!bounds) {
    return { zones: [], allPassed: false, miss: new Uint8ClampedArray(size * size) };
  }
  const width = bounds.maxCol - bounds.minCol + 1;
  const height = bounds.maxRow - bounds.minRow + 1;
  const { rows, cols } = resolveZoneGrid(glyph, width, height);
  const zones = [];
  let allPassed = true;
  for (let row = 0; row < rows; row += 1) {
    const r0 = bounds.minRow + Math.floor(row * height / rows);
    const r1 = bounds.minRow + Math.floor((row + 1) * height / rows);
    for (let col = 0; col < cols; col += 1) {
      const c0 = bounds.minCol + Math.floor(col * width / cols);
      const c1 = bounds.minCol + Math.floor((col + 1) * width / cols);
      let targetPixels = 0;
      let coveredPixels = 0;
      for (let r = r0; r < r1; r += 1) {
        for (let c = c0; c < c1; c += 1) {
          const i = r * size + c;
          if (glyphMask[i] === 1) {
            targetPixels += 1;
            if (cover[i] === 1) coveredPixels += 1;
          }
        }
      }
      const coverage = targetPixels > 0 ? coveredPixels / targetPixels : 0;
      const passed = targetPixels === 0 || targetPixels < ZONE_MIN_PIXELS || coverage >= ZONE_COVERAGE_MIN;
      zones.push({ row, col, targetPixels, coveredPixels, coverage, passed });
      if (targetPixels >= ZONE_MIN_PIXELS && coverage < ZONE_COVERAGE_MIN) {
        allPassed = false;
      }
    }
  }
  if (!allPassed) {
    const meaningful = zones.filter(
      (z) => z.targetPixels >= ZONE_MIN_PIXELS && z.coverage < ZONE_COVERAGE_MIN
    );
    const noWholesaleMiss = meaningful.every((z) => z.coverage >= ZONE_COVERAGE_FLOOR);
    if (noWholesaleMiss) {
      const tracked = zones.filter((z) => z.targetPixels >= ZONE_MIN_PIXELS);
      if (tracked.length > 0) {
        const mean = tracked.reduce((sum, z) => sum + z.coverage, 0) / tracked.length;
        if (mean >= ZONE_COVERAGE_MEAN_MIN) allPassed = true;
      }
    }
    if (!allPassed) {
      for (let row = 0; row < rows; row += 1) {
        const r0 = bounds.minRow + Math.floor(row * height / rows);
        const r1 = bounds.minRow + Math.floor((row + 1) * height / rows);
        for (let col = 0; col < cols; col += 1) {
          const z = zones[row * cols + col];
          if (z.targetPixels >= ZONE_MIN_PIXELS && z.coverage < ZONE_COVERAGE_MIN) {
            const c0 = bounds.minCol + Math.floor(col * width / cols);
            const c1 = bounds.minCol + Math.floor((col + 1) * width / cols);
            for (let r = r0; r < r1; r += 1) {
              for (let c = c0; c < c1; c += 1) {
                const i = r * size + c;
                if (glyphMask[i] === 1 && cover[i] !== 1) miss[i] = MISS_TARGET;
              }
            }
          }
        }
      }
    }
  }
  return { zones, allPassed, miss };
}
function evaluateTrace(glyphMask, strokesMask, region = FULL_BOX, glyph) {
  const size = TRACE_CANVAS;
  const n = size * size;
  const rLeft = Math.max(0, Math.round(region.left * size));
  const rRight = Math.min(size, Math.round(region.right * size));
  const rTop = Math.max(0, Math.round(region.top * size));
  const rBottom = Math.min(size, Math.round(region.bottom * size));
  const cover = buildInkCoverLookup(strokesMask, size, COVERAGE_TOLERANCE_PX);
  const inkWide = buildInkCoverLookup(strokesMask, size, BOUNDS_TOLERANCE_PX);
  let letterPixels = 0;
  let covered = 0;
  let inkRegion = 0;
  let outside = 0;
  for (let i = 0; i < n; i += 1) {
    const isGlyph = glyphMask[i] === 1;
    const isInk = inkWide[i] === 1;
    if (isGlyph) {
      letterPixels += 1;
      if (cover[i] === 1) covered += 1;
    }
    if (isInk) {
      const r = Math.floor(i / size);
      const c = i % size;
      if (c >= rLeft && c < rRight && r >= rTop && r < rBottom) {
        inkRegion += 1;
        if (!isGlyph) outside += 1;
      }
    }
  }
  if (letterPixels === 0 || inkRegion === 0) {
    const miss = new Uint8ClampedArray(n);
    for (let i = 0; i < n; i += 1) {
      if (glyphMask[i] === 1) miss[i] = MISS_TARGET;
    }
    return {
      passed: false,
      coverage: 0,
      outOfBounds: 0,
      reason: "empty",
      zones: [],
      miss
    };
  }
  const coverage = covered / letterPixels;
  const outOfBounds = outside / inkRegion;
  const zoneEval = evaluateZones(glyph, glyphMask, cover, size);
  const passed = coverage >= OVERALL_COVERAGE_MIN && outOfBounds <= OUT_OF_BOUNDS_MAX && zoneEval.allPassed;
  let reason;
  if (!passed) {
    if (outOfBounds > OUT_OF_BOUNDS_MAX) reason = "bounds";
    else if (coverage < OVERALL_COVERAGE_MIN) reason = "coverage";
    else if (!zoneEval.allPassed) reason = "zone";
    else reason = "coverage";
  } else {
    reason = "coverage";
  }
  let highlight = zoneEval.miss;
  if (!passed && reason === "coverage") {
    let anyMarked = false;
    for (let i = 0; i < n; i += 1) {
      if (highlight[i] === MISS_TARGET) {
        anyMarked = true;
        break;
      }
    }
    if (!anyMarked) {
      highlight = new Uint8ClampedArray(n);
      for (let i = 0; i < n; i += 1) {
        if (glyphMask[i] === 1 && cover[i] !== 1) highlight[i] = MISS_TARGET;
      }
    }
  }
  return { passed, coverage, outOfBounds, reason, zones: zoneEval.zones, miss: highlight };
}
export {
  COVERAGE_TOLERANCE_PX as C,
  MISS_TARGET as M,
  OVERALL_COVERAGE_MIN as O,
  SINGLE_BOX as S,
  TRACE_CANVAS as T,
  ZONE_COVERAGE_MIN as Z,
  buildStrokesMask as a,
  buildLetterMask as b,
  evaluateTrace as c,
  OUT_OF_BOUNDS_MAX as d,
  emptyTraceResult as e,
  drawGlyphInBox as f,
  buildGlyphMask as g
};
