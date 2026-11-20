# Testing Strategy & Verification Guide

Kurdish Quest uses a multi-layered testing pyramid covering pure domain logic, offline storage/migration integration, React UI/RTL components, production build validation, and real Chromium browser E2E checks.

---

## 1. Test Commands

| Command | Runner | Scope |
|---|---|---|
| `npm run lint` | TypeScript (`tsc --noEmit`) | Strict static type verification across all `src/` and `audit/` files (zero `any` in `src/`). |
| `npm run test:unit` | Node test runner (`tsx --test`) | Pure zero-DOM domain tests (`src/domain/**/*.test.ts`): schema migrations v0/v1/v2→v3, CRDT/LWW sync reconciliation, XP/CEFR/badge/UTC mission calculations. |
| `npm test` | Vitest + jsdom + Testing Library + fake-indexeddb | Full suite across `audit/**/*.test.ts(x)` and `src/lib/grammar/**/*.test.ts(x)`: quiz engine, SM-2 SRS, writing stroke evaluator, offline IndexedDB v2 migrations, mutation coalescing, backoff retry, PlatformAdapter DI, EN/AR/KU RTL switching, UI accessibility & routes. |
| `npm run test:all` | Both | Runs `npm run test:unit && npm test`. |
| `npm run build` | Vite + `vite-plugin-pwa` | Verifies production bundle splitting, Workbox Service Worker generation (`dist/sw.js`), and Web App Manifest (`dist/manifest.webmanifest`). |
| `npm run cap:sync` | Vite + Capacitor CLI | Copies production web assets and syncs all 8 native plugins into `android/` and `ios/`. |

---

## 2. Test Coverage Highlights

- **Domain Unit Tests (`src/domain/`)**:
  - `migrations.test.ts`: v0/v1/v2→v3 upgrades, corrupted payload fallback, SM-2 clamping, backup envelope roundtrip, invalid JSON rejection.
  - `syncMerge.test.ts`: Additive union of lessons/badges/favorites/writingProgress/tours, max-wins XP/scores, Last-Write-Wins spendable gems/freezes, per-card SM-2 recency merge.
  - `progressEngine.test.ts`: XP/level curve, CEFR threshold unlocks (`A1`..`Advanced`), UTC midnight daily XP & mission resets, negative/NaN guardrails, badge triggers.
- **Offline Storage & Platform Integration (`audit/`)**:
  - `offline-storage-migration.test.ts`: IndexedDB v2 schema upgrade, `UPDATE_PROGRESS` queue coalescing, idempotency deduplication, exponential backoff + dead-letter recovery, JSON export/restore, diagnostics.
  - `platform-and-rtl.test.tsx`: `ServiceContainer` `PLATFORM_TOKEN` DI override simulating iOS native adapter, offline `NetworkStatusBadge`, EN/AR/KU `document.documentElement.dir`/`lang` updates, dark mode persistence, `DataBackupCard` trilingual UI.
- **Educational & Curriculum Suite (`audit/` + `src/lib/grammar/`)**:
  - 24 pre-existing suites (283 tests) preserved and passing: Hawar alphabet integrity, writing stroke scorer, grammar curriculum & exercises, quiz modes & distractor hygiene, SM-2 scheduling, games, routes, security & accessibility assertions.

---

## 3. Native Platform Verification Matrix

| Target | Automated in Linux CI/Container | Requires Native SDK / Host OS |
|---|---|---|
| Web & PWA | TypeScript, Unit, Vitest, Vite Build, Workbox SW, Real Chromium Playwright E2E (desktop 1440px, RTL/dark, mobile 390px) | — |
| Android (Capacitor) | `npx cap sync android`, Gradle/Manifest/ProGuard/AAB config validation | `./gradlew assembleRelease` (APK) & `./gradlew bundleRelease` (AAB) require JDK 17+ & Android SDK |
| iOS / iPadOS (Capacitor) | `npx cap add ios`, `npx cap sync ios`, `Info.plist` & Xcode project validation | `xcodebuild` / App Store Archive requires macOS + Xcode + CocoaPods/SPM |
