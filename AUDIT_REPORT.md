# Visual & Engineering Audit — 2026-11-27

Lead-engineer review of Kurdish Quest v2.0.0: end-to-end browser testing of
all 45 routes at mobile (390×844) and desktop (1280×800) viewports, plus a
full gate run (typecheck, eslint, vitest, node:test, production build, knip).

## Method

- `.review/crawl.mjs` — headless Chromium (`.review/env.mjs` pins
  `AWS_EXECUTION_ENV` so `@sparticuz/chromium` wires `LD_LIBRARY_PATH` on
  every run): completes first-run onboarding, seeds tour state, visits every
  route, records console errors / failed requests / horizontal overflow /
  empty states / login redirects, and captures full-page screenshots.
- Both viewports: **45/45 pages, 0 errors, 0 overflow, 0 failed requests,
  0 login redirects** (after the fixes below).
- Screenshots: `.review/shots/{mobile,desktop}/` (not committed).

## Issues found and fixed

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | High | `--font-mono` never defined in `@theme` while `font-mono` is used 49×; `JetBrains Mono` imported but unreachable | `src/index.css`: added `--font-mono` stack (JetBrains Mono first) |
| 2 | High | Arabic glosses inside LTR screens rendered as tofu boxes (no Arabic family in `--font-sans`) | `src/index.css`: `Noto Kufi Arabic` added to `--font-sans`, `--font-mono`, `--font-display`, `--font-arabic`, and the `[dir="rtl"]` override; `Noto Color Emoji` appended to all stacks (fontsource import already existed, so emoji now render on every platform, not only those with system emoji fonts) |
| 3 | Medium | Mobile header truncates titles at 390 px (`Mini-Gam…`, `Common P…`, `Privacy Poli…`) | `MainLayout.tsx`: stats pill compacted on mobile (`gap-2 px-2.5 py-1.5 text-xs`, full size from `sm:`), title `text-base sm:text-lg` |
| 4 | Medium | Unknown routes showed header `KURMANJI QUEST / Learn` | `src/lib/navigation.ts`: fallback now returns `ERROR 404 / Not Found` (short, never truncates); `/learn` got its own missing entry (`PRACTICE HUB / Learn`); trailing slashes normalised before matching |
| 5 | Low | Quiz study card title clipped to one line (`Hawar Sounds & Special L…`) | `QuizStudyPhase.tsx`: `line-clamp-2` |
| 6 | Low | Trace guide could overflow its lane for wide glyphs (Ş, M, W) | `src/lib/traceLetters.ts`: `fitGlyphFontToWidth` binary-searches a font size that keeps the glyph inside the lane; display + evaluation mask share the fitted size |
| 7 | Low | Stale `package-lock.json` (CI runs `npm ci`) | lockfile refreshed and committed |

Tests added: `src/lib/navigation.test.ts` (5 cases: `/learn` meta,
trailing-slash normalisation, 404 fallback + localisation, real routes still
matched) — wired into `test:unit`.

## Verified visually after the fix

- `Mini-Games`, `Privacy Policy`, `Common Phrases` headers fully visible.
- `/definitely-not-a-page` → `ERROR 404 / Not Found`.
- Grammar lesson Arabic (`مذكّر / مؤنّث`, example glosses, tip) renders in
  Noto Kufi Arabic.
- Colour emoji (💎 🔥 🎉 🍎 …) render everywhere via manifest-driven subsets
  (10 `.woff` subsets, 977 KB, 388 codepoints — `.review/subset-emoji.py`).
- Trace lanes: pixel analysis confirms glyphs stay ≥21 px inside the dashed
  lane on `writing/sentences/roj-bas`.

## Known limitations / follow-ups

- IPA transcription (`/səf…/` on the search card) relies on system fonts for
  rare phonetic glyphs; fine on stock iOS/Android/desktop, may tofu on
  fontless Linux. Candidate: bundle a small IPA-capable fallback.
- Android assets under `android/app/src/main/assets/public/` are stale
  (regenerate with `npx cap sync` when releasing the APK).
- `browserslist` data outdated (`npx update-browserslist-db`).
- The app ships `@fontsource/noto-color-emoji` (full COLR font); devices
  with platform emoji fonts will prefer the web font for listed codepoints —
  intentional for cross-platform consistency.
