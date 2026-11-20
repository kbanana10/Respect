# Changelog

All notable changes to **Kurdish Quest** are documented in this file.

## [2.0.0] — Cross-Platform Architecture Rebuild

### Architecture & Code Quality
- Refactored codebase into a **6-layer Clean Architecture** (`core`, `domain`, `platform`, `services/data`, `store/application`, `presentation`).
- Added typed Core utilities: `src/core/config/env.ts`, `src/core/errors/AppError.ts` (trilingual error codes), `src/core/logging/logger.ts` (privacy-safe redacting structured logger), and `src/core/container.ts` (DI container).
- Extracted pure, deterministic Domain modules: `src/domain/schema/migrations.ts`, `src/domain/rules/syncMerge.ts`, and `src/domain/rules/progressEngine.ts`.
- Eliminated all `: any` and `as any` leaks across `src/` (0 remaining occurrences).
- Removed dead files and stray audit folders (`/app`, `/conceptcard-proof`, `/measure-ui-proof`, `/audit/zzz-verifier-tmp.test.tsx`, `/src/pages/GrammarLessonPlaceholder.tsx`).

### Cross-Platform Native Support (Android & iOS via Capacitor 8)
- Added `PlatformAdapter` abstraction (`src/platform/`) with `WebPlatformAdapter` and `CapacitorPlatformAdapter` registered via DI (`PLATFORM_TOKEN`).
- Installed and wired Capacitor 8 plugins: `@capacitor/ios`, `@capacitor/preferences`, `@capacitor/network`, `@capacitor/haptics`, `@capacitor/status-bar`, `@capacitor/keyboard`, `@capacitor/splash-screen`.
- Generated native iOS project (`ios/`) and hardened `capacitor.config.ts` for iPhone, iPad, and Android.
- Upgraded `android/app/build.gradle` to `versionCode 2` / `versionName "2.0.0"`, enabled R8/ProGuard minification & resource shrinking for release builds, and configured Android App Bundle (`AAB`) splits.
- Hardened `AndroidManifest.xml` (`usesCleartextTraffic="false"`, minimal `INTERNET` + `ACCESS_NETWORK_STATE` permissions).

### Offline-First Storage v2, Sync & Backup/Restore
- Upgraded IndexedDB (`kurmanji_quester_db`) to `DB_VERSION = 2` with `metadata` and `backups` object stores.
- Added lossless `v0/v1/v2 -> v3` `UserData` migrations with automatic pre-migration safety snapshots.
- Added Capacitor Preferences Tier-1 native storage mirror to guard against iOS WKWebView IndexedDB eviction.
- Upgraded `SyncEngine` with coalescing/deduplicating mutation queue, exponential backoff (2s–60s), dead-letter handling + manual retry, and conflict reporting (including `writingProgress` and `completedTours`).
- Added portable JSON backup Export & Restore (`DataBackupCard`) inside Profile Settings.

### Responsive UI, UX & PWA
- Rebuilt `MainLayout` into an adaptive responsive shell: desktop/iPad RTL-aware sidebar (`aside`) + mobile safe-area bottom navigation bar.
- Widened cramped `max-w-md` desktop layouts across Dashboard, Learning Hub, Profile, Store, Grammar, Vocabulary, Roadmap, and Leaderboard into responsive multi-column grids.
- Added trilingual `PWAInstallButton` with iOS Safari Add-to-Home-Screen guide modal.
- Added vector `/public/icon.svg` and safe-zone padded `/public/pwa-maskable-512x512.png`, updated Web App Manifest (`id`, `short_name: "KurdQuest"`, maskable icon, Workbox Google Fonts + audio caching), and added zero-FOUC theme/RTL bootstrap script in `index.html`.

### Security
- Removed `process.env.GEMINI_API_KEY` client bundle exposure from `vite.config.ts`.
- Hardened `server.ts` CSP (`worker-src 'self' blob:`) and security headers while ensuring embedded iframe preview compatibility.
- Updated `package.json` `engines.node` to `>=20.0.0`.

### Tests & Documentation
- Added `node:test` pure domain suites (`migrations.test.ts`, `syncMerge.test.ts`, `progressEngine.test.ts`).
- Added Vitest integration/component suites (`offline-storage-migration.test.ts`, `platform-and-rtl.test.tsx`).
- Added `ARCHITECTURE.md`, `MIGRATION.md`, `TESTING.md`, `CHANGELOG.md`, and updated `README.md`.
