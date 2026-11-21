import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../store/AuthContext';
import { alphabet } from '../data/kurmanji';
import { Modal, Button } from '../components/ui';
import TracingCanvas, { type TracingCanvasHandle } from '../components/TracingCanvas';
import StrokeGuide from '../components/StrokeGuide';
import { AUTHORED_GLYPHS } from '../data/strokeOrder';
import {
  buildLetterMask,
  buildStrokesMask,
  evaluateTrace,
  emptyTraceResult,
  runTraceSelfTest,
  OVERALL_COVERAGE_MIN,
  OUT_OF_BOUNDS_MAX,
  ZONE_COVERAGE_MIN,
  COVERAGE_TOLERANCE_PX,
  TRACE_CANVAS,
  type TraceResult,
} from '../lib/traceLetters';
import {
  validateStrokeTrace,
  glyphBBoxFromMask,
  type PathTraceResult,
} from '../lib/pathValidation';
import { recordReview, type ReviewDeck } from '../services/SpacedRepetitionService';
import { Eraser, RotateCcw, CheckCircle2, XCircle, ChevronRight, Eye } from 'lucide-react';
import { pickLocalized } from '../localization/translations';

/** Single-glyph tracing target burned into the offscreen mask. */
const TOP_LETTER = (letterApi: { id: string; char: string }) =>
  letterApi.char.split(' ')[0];

/**
 * WritingTracingPage — the tracing surface for one letter plus the checker
 * (overall coverage + out-of-bounds + per-zone coverage). A pass records a
 * `good` review into the shared SM-2 deck, which is what flips the grid tile
 * green back on /writing. On a fail, the still-missing glyph pixels inside the
 * failed zones are painted red so the learner knows exactly what to finish.
 */
export function WritingTracingPage() {
  const navigate = useNavigate();
  const { letterId } = useParams();
  const { language, userData, updateUserData } = useAuth();
  const deck: ReviewDeck = userData?.reviewDeck ?? {};

  const letter = alphabet.find(l => l.id === letterId) || alphabet[0];
  const glyph = useMemo(() => TOP_LETTER(letter), [letter]);

  const maskCacheRef = useRef<{ glyph: string; mask: Uint8ClampedArray } | null>(null);
  const traceRef = useRef<TracingCanvasHandle>(null);
  const [result, setResult] = useState<TraceResult>(emptyTraceResult);
  // Path-based result for the 10 authored glyphs (null → pixel-engine mode).
  const [pathResult, setPathResult] = useState<PathTraceResult | null>(null);
  const [open, setOpen] = useState(false);
  // Stroke-order demo: `replayToken === 0` on mount plays the demo once (the
  // component auto-plays on first render), and each "Watch how" tap increments
  // it to replay. No per-letter authored plan → the token is harmless (the
  // overlay renders nothing for that glyph).
  const [replayToken, setReplayToken] = useState(0);

  // DEV-ONLY regression canary: after the guide has rendered, validate the
  // tolerance pipeline with a programmatic perfect trace. If correctness ever
  // regresses (thick-guide / thin-stroke mismatch), the console details the
  // coverage, per-zone coverage and miss-mask pixel count for each letter.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const rows = runTraceSelfTest(['I', 'E', 'O', 'M', 'W']);
    const anyFail = rows.some(r => !r.passed);
    if (anyFail) {
      const detail = rows
        .map(
          r =>
            `${r.char} → passed=${r.passed} coverage=${(r.coverage * 100).toFixed(1)}% ` +
            `missPixels=${r.missPixels} zones=[${r.zoneCoverage
              .map(z => `${(z * 100).toFixed(1)}%`)
              .join(', ')}]`,
        )
        .join('\n  ');
      console.error(
        `[writing] tracing self-test FAILED — a perfect trace must pass:\n  ${detail}`,
      );
    }
  }, []);

  // The target-letter pixel mask is built lazily on first Check (canvas APIs
  // exist in this browser-only page) and cached per glyph so repeated checks
  // never re-render the letter and navigating never serves a stale mask.
  const maskFor = useCallback((): Uint8ClampedArray => {
    const cached = maskCacheRef.current;
    if (cached && cached.glyph === glyph) return cached.mask;
    const mask = buildLetterMask(glyph);
    maskCacheRef.current = { glyph, mask };
    return mask;
  }, [glyph]);

  // Only letters with an authored stroke plan get the demo overlay + button
  // AND path-based validation; every other glyph keeps the pixel engine.
  const hasGuide = AUTHORED_GLYPHS.includes(glyph);

  const handleCheck = useCallback(() => {
    // PATH MODE: letters with an authored stroke plan validate against the
    // Watch animation's own strokes (direction/order/connection/coverage).
    if (hasGuide) {
      const mask = maskFor();
      const bbox = glyphBBoxFromMask(mask, TRACE_CANVAS);
      const ink = traceRef.current?.strokePaths() ?? [];
      const path = validateStrokeTrace(glyph, ink, bbox ?? { minC: 0, minR: 0, w: 0, h: 0 });
      setPathResult(path);
      setResult(emptyTraceResult());
      setOpen(true);
      // Red = deviation from the expected path (+ red guide on missing strokes).
      if (!path.passed && bbox) {
        const redPaths = [...path.deviations.map(p => [p])];
        traceRef.current?.showRedPaths([...redPaths, ...path.missingPaths]);
      } else if (path.passed) {
        traceRef.current?.clearMissHighlight();
      }
      return;
    }

    // PIXEL MODE (unchanged): every other glyph keeps the coverage engine.
    const strokes = traceRef.current?.canvas() ?? null;
    const mask = maskFor();
    const strokesMask = buildStrokesMask(strokes);
    const traced = evaluateTrace(mask, strokesMask, undefined, glyph);
    setPathResult(null);
    setResult(traced);
    setOpen(true);
    // `traced.miss` is all-zero on a pass and marks the missed glyph pixels of
    // failed zones on a fail, so painting it unconditionally is always right.
    traceRef.current?.showMissHighlight(traced.miss);
  }, [hasGuide, maskFor, glyph]);

  const goToLetter = useCallback(
    (id: string) => {
      setOpen(false);
      // The canvas remounts on every letterId change (see key below), which
      // blanks the surface and the miss highlight together.
      navigate(`/writing/${id}`, { replace: true });
    },
    [navigate],
  );

  // Records the pass into the shared SM-2 review deck (the same deck
  // RecallButton and the quiz engine write to), so the grid tile turns green.
  const handlePassNext = useCallback(() => {
    const updatedDeck = recordReview(deck, letter.id, 'good');
    // FIRE-AND-FORGET: mutate the profile asynchronously via the app's normal
    // persistence pipeline without ever blocking the drawing surface.
    void updateUserData({ reviewDeck: updatedDeck });
    const next = alphabet[(alphabet.findIndex(l => l.id === letter.id) + 1) % alphabet.length];
    goToLetter(next.id);
  }, [deck, updateUserData, goToLetter, letter.id]);

  const handleRetry = useCallback(() => {
    traceRef.current?.clear();
    setPathResult(null);
    setResult(emptyTraceResult());
    setOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    const next = alphabet[(alphabet.findIndex(l => l.id === letter.id) + 1) % alphabet.length];
    goToLetter(next.id);
  }, [goToLetter, letter.id]);

  const clearLabel = pickLocalized(language, { ku: 'Paqij bike', ar: 'مسح الكل', en: 'Clear' });
  const undoLabel = pickLocalized(language, { ku: 'Vegere', ar: 'تراجع', en: 'Undo' });
  const checkLabel = pickLocalized(language, { ku: 'Kontrol', ar: 'تحقق', en: 'Check' });
  const nextLabel = pickLocalized(language, { ku: 'Ya din', ar: 'التالي', en: 'Next' });
  const watchLabel = pickLocalized(language, { ku: 'Binêre', ar: 'شاهد', en: 'Watch how' });

  const failTitle = pickLocalized(language, { ku: 'Dîsa biceribîne ❌', ar: 'حاول مرة أخرى ❌', en: 'Try again ❌' });
  const passTitle = pickLocalized(language, { ku: 'Baş e! ✅', ar: 'أحسنت! ✅', en: 'Well done! ✅' });

  const percentText = (fraction: number) => `${Math.round(fraction * 100)}%`;

  // Path-mode verdict (authored glyphs only) + a plain-language hint per rule.
  const pathPassed = pathResult?.passed ?? false;
  const pathHint = (() => {
    if (!pathResult || pathResult.passed) return null;
    switch (pathResult.reason) {
      case 'empty':
        return pickLocalized(language, {
          ku: 'Tiştek nexşandî. Ji kerema xwe her tîp bi rêz bikişîne.',
          ar: 'لم ترسم شيئاً بعد. ارسم الحرف بضربات مرتبة.',
          en: 'Nothing drawn yet. Trace the letter stroke by stroke.',
        });
      case 'stroke-count':
        return pickLocalized(language, {
          ku: `Vê tîpê ${pathResult.expectedCount} xet hene — te ${pathResult.strokeCount} xet kişand.`,
          ar: `هذا الحرف يتكون من ${pathResult.expectedCount} حركات وأنت رسمت ${pathResult.strokeCount}.`,
          en: `This letter has ${pathResult.expectedCount} strokes — you drew ${pathResult.strokeCount}.`,
        });
      case 'order':
        return pickLocalized(language, {
          ku: 'Rêza xetan xelet e. Li "Binêre" temaşe bike û dîsa biceribîne.',
          ar: 'ترتيب الحركات خاطئ. شاهد "شاهد" ثم حاول مجدداً.',
          en: 'Strokes drawn in the wrong order. Watch the demo and try again.',
        });
      case 'direction':
        return pickLocalized(language, {
          ku: 'Berê xetê berevajî ye. Ji cihê destpêkê dest pê bike.',
          ar: 'اتجاه الحركة معكوس. ابدأ من نقطة البداية.',
          en: 'A stroke was drawn the wrong way. Start from the starting point.',
        });
      case 'shape':
        return pickLocalized(language, {
          ku: 'Şikl ji rê derket. Deverên sor li ser rêya zêrîn bikişîne.',
          ar: 'انحرفت عن المسار. ارسم فوق المناطق الحمراء على طول المسار الذهبي.',
          en: 'A stroke drifted off the path. Trace the red parts along the gold guide.',
        });
      case 'connection':
        return pickLocalized(language, {
          ku: 'Xet li hev nayên girêdan — ji kerema xwe serê xetan bigihîne hev.',
          ar: 'الحركات غير متصلة — صل أطراف الحركات ببعضها.',
          en: 'Strokes are not connected — join the stroke ends together.',
        });
      case 'coverage':
        return pickLocalized(language, {
          ku: 'Beşek ji tîpê kêm e. Deverên sor temam bike.',
          ar: 'جزء من الحرف ناقص. أكمل المناطق الحمراء.',
          en: 'Part of the letter is missing. Complete the red areas.',
        });
      default:
        return null;
    }
  })();

  return (
    <div className="p-4 flex flex-col min-h-screen pb-24">
      {/* Letter header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-xl font-black text-ink leading-none">
            <span dir="ltr" className="font-mono">{glyph}</span>
            <span className="text-sm font-black text-muted ms-2">
              {pickLocalized(language, { ku: 'Binivîse', ar: 'اكتب الحرف', en: 'Write the letter' })}
            </span>
          </h2>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1.5">
            {pickLocalized(language, { ku: 'Bi tiliya xwe bikşîne', ar: 'تتبّع بإصبعك', en: 'Trace with your finger' })}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/writing')}
          className="text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 uppercase tracking-wider cursor-pointer bg-transparent border-none min-h-[44px] px-2"
        >
          {pickLocalized(language, { ku: 'Vegere tomaran', ar: 'إلى الحروف', en: 'All letters' })}
        </button>
      </div>

      {/* Canvas */}
      <div className="mb-4">
        <TracingCanvas
          key={letter.id}
          ref={traceRef}
          char={glyph}
          guideOverlay={hasGuide ? <StrokeGuide char={glyph} replayToken={replayToken} /> : undefined}
        />
      </div>

      {/* Watch-how replay (letters with an authored stroke plan only) */}
      {hasGuide && (
        <div className="max-w-md w-full mx-auto mb-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => setReplayToken(t => t + 1)}
            leadingIcon={<Eye className="w-4 h-4" />}
            className="text-xs h-12 w-full"
          >
            {watchLabel}
          </Button>
        </div>
      )}

      {/* Toolbar — 2×2 grid on every screen size (narrow-phone safe) */}
      <div className="grid grid-cols-2 gap-3 max-w-md w-full mx-auto">
        <Button
          variant="secondary"
          size="md"
          onClick={() => traceRef.current?.clear()}
          leadingIcon={<Eraser className="w-4 h-4" />}
          className="text-xs h-12"
        >
          {clearLabel}
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => traceRef.current?.undo()}
          leadingIcon={<RotateCcw className="w-4 h-4" />}
          className="text-xs h-12"
        >
          {undoLabel}
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleCheck}
          leadingIcon={<CheckCircle2 className="w-4 h-4" />}
          className="text-xs h-12"
        >
          {checkLabel}
        </Button>
        <Button
          variant="success"
          size="md"
          onClick={handleNext}
          leadingIcon={<ChevronRight className="w-4 h-4 rtl:-scale-x-100" />}
          className="text-xs h-12"
        >
          {nextLabel}
        </Button>
      </div>

      {/* Result overlay */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={hasGuide ? (pathPassed ? passTitle : failTitle) : result.passed ? passTitle : failTitle}
        variant="center"
        hideCloseButton
      >
        {hasGuide ? (
          pathResult ? (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-xs font-bold text-muted">
                <span>{pickLocalized(language, { ku: 'Xet', ar: 'الحركات', en: 'Strokes' })}</span>
                <span className="tabular-nums" dir="ltr">
                  {pathResult.strokeCount}/{pathResult.expectedCount}
                </span>
              </div>

              {pathHint && (
                <p className="text-[11px] font-semibold text-muted leading-relaxed">{pathHint}</p>
              )}

              {pathPassed ? (
                <Button variant="success" fullWidth onClick={handlePassNext} leadingIcon={<CheckCircle2 className="w-4 h-4" />}>
                  {nextLabel}
                </Button>
              ) : (
                <Button variant="danger" fullWidth onClick={handleRetry} leadingIcon={<XCircle className="w-4 h-4" />}>
                  {pickLocalized(language, { ku: 'Dîsa biceribîne', ar: 'إعادة المحاولة', en: 'Retry' })}
                </Button>
              )}
            </div>
          ) : null
        ) : (
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold text-muted space-y-1">
              <div className="flex justify-between">
                <span>{pickLocalized(language, { ku: 'Dagirtin', ar: 'التغطية', en: 'Coverage' })}</span>
                <span className="tabular-nums" dir="ltr">{percentText(result.coverage)}</span>
              </div>
              <div className="flex justify-between">
                <span>{pickLocalized(language, { ku: 'Derveyî rê', ar: 'خارج المسار', en: 'Outside' })}</span>
                <span className="tabular-nums" dir="ltr">{percentText(result.outOfBounds)}</span>
              </div>
            </div>

            {!result.passed && (
              <p className="text-[11px] font-semibold text-muted leading-relaxed">
                {pickLocalized(language, {
                  ku: `Rêjeya te %${Math.round(result.coverage * 100)} e. Ji kerema xwe temam bike.`,
                  ar: `نسبتك ${Math.round(result.coverage * 100)}٪. يرجى إكمالها.`,
                  en: `Your coverage is ${Math.round(result.coverage * 100)}%. Please complete it.`,
                })}
              </p>
            )}

            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
              {pickLocalized(language, {
                ku: `divê dagirtin ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}%, her herêm ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}%, derveyî ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}%`,
                ar: `التغطية ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}٪، كل منطقة ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}٪، خارج المسار ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}٪ (±${COVERAGE_TOLERANCE_PX} بكسل)`,
                en: `coverage ≥ ${Math.round(OVERALL_COVERAGE_MIN * 100)}%, each zone ≥ ${Math.round(ZONE_COVERAGE_MIN * 100)}%, outside ≤ ${Math.round(OUT_OF_BOUNDS_MAX * 100)}% (±${COVERAGE_TOLERANCE_PX}px tolerance)`,
              })}
            </p>

            {result.passed ? (
              <Button variant="success" fullWidth onClick={handlePassNext} leadingIcon={<CheckCircle2 className="w-4 h-4" />}>
                {nextLabel}
              </Button>
            ) : (
              <Button variant="danger" fullWidth onClick={handleRetry} leadingIcon={<XCircle className="w-4 h-4" />}>
                {pickLocalized(language, { ku: 'Dîsa biceribîne', ar: 'إعادة المحاولة', en: 'Retry' })}
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
