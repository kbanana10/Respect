import { R as React, r as reactExports, j as jsxRuntimeExports } from "./vendor-react--N-K1Ubq.js";
import { T as TRACE_CANVAS, f as drawGlyphInBox, S as SINGLE_BOX } from "./traceLetters-CGZtlSUi.js";
const SIZE = TRACE_CANVAS;
const TracingCanvas = React.forwardRef(
  function TracingCanvas2({ char, guideBox = SINGLE_BOX, renderGuide, guideOverlay }, ref) {
    const guideRef = reactExports.useRef(null);
    const strokesRef = reactExports.useRef(null);
    const missRef = reactExports.useRef(null);
    const drawingRef = reactExports.useRef(false);
    const pathsRef = reactExports.useRef([]);
    const currentPathRef = reactExports.useRef(null);
    const snapshotsRef = reactExports.useRef([]);
    React.useImperativeHandle(ref, () => ({
      clear: () => {
        var _a, _b;
        const ctx = (_a = strokesRef.current) == null ? void 0 : _a.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, SIZE, SIZE);
        snapshotsRef.current = [];
        pathsRef.current = [];
        currentPathRef.current = null;
        if (missRef.current) {
          (_b = missRef.current.getContext("2d")) == null ? void 0 : _b.clearRect(0, 0, SIZE, SIZE);
        }
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
      showMissHighlight: (miss) => {
        const layer = missRef.current;
        const ctx = layer == null ? void 0 : layer.getContext("2d");
        if (!layer || !ctx) return;
        ctx.clearRect(0, 0, SIZE, SIZE);
        const img = ctx.createImageData(SIZE, SIZE);
        const px = img.data;
        for (let i = 0; i < miss.length; i += 1) {
          if (miss[i] !== 2) continue;
          const a = i * 4;
          px[a] = 239;
          px[a + 1] = 68;
          px[a + 2] = 68;
          px[a + 3] = 170;
        }
        ctx.putImageData(img, 0, 0);
      },
      showRedPaths: (paths) => {
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
            ctx.arc(path[0].x, path[0].y, SIZE * 0.022, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      },
      clearMissHighlight: () => {
        var _a;
        const ctx = (_a = missRef.current) == null ? void 0 : _a.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, SIZE, SIZE);
      }
    }));
    reactExports.useEffect(() => {
      const canvas = guideRef.current;
      const ctx = canvas == null ? void 0 : canvas.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      if (renderGuide) {
        renderGuide(ctx);
      } else {
        drawGlyphInBox(ctx, char, guideBox, "rgba(100, 116, 139, 0.30)");
      }
    }, [char, guideBox, renderGuide]);
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
      ctx.strokeStyle = "rgba(51, 65, 85, 0.55)";
      ctx.lineWidth = SIZE * 0.045;
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
      drawingRef.current = false;
      const path = currentPathRef.current;
      if (path && path.length > 0) pathsRef.current.push(path);
      currentPathRef.current = null;
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
          guideOverlay,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: strokesRef,
              width: SIZE,
              height: SIZE,
              className: "absolute inset-0 w-full h-full cursor-crosshair touch-none",
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
export {
  TracingCanvas as T
};
