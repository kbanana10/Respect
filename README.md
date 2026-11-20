# Kurdish Quest (`v2.0.0`)

An offline-first, cross-platform educational application for learning **Kurdish (Kurmanji)** across **Web**, **Installable PWA**, **Android (APK/AAB)**, and **iOS / iPadOS (Capacitor)**.

## Highlights

- **Complete Kurmanji Curriculum**: 31-letter Hawar alphabet with audio, interactive stroke-by-stroke letter/word/sentence writing lab, categorized general & academic vocabulary, grammar lessons with exercises, and a CEFR roadmap (`A1` -> `Advanced`).
- **Active Recall & Spaced Repetition**: Multi-mode quiz engine (listening, typing, multiple choice, fill-in-the-blank, sentence reorder, adaptive practice), SM-2 spaced repetition review deck, and 3 interactive learning games.
- **Trilingual & Adaptive UI**: English (LTR), Arabic (RTL), and Kurmanji (LTR), light & dark themes, WCAG AA contrast, mobile safe-area insets, and responsive layouts from phones (390px) to tablets and desktop displays.
- **Offline-First & Zero-Data-Loss**: IndexedDB v2 + Capacitor Preferences native mirror, lossless v0/v1/v2→v3 schema migrations with pre-migration snapshots, coalescing sync queue with exponential backoff, and portable JSON backup export/restore.

---

## Quick Start (Web & PWA)

**Requirements**: Node.js `>= 20.0.0`

```bash
# 1. Install dependencies
npm install

# 2. Configure optional Firebase cloud sync (app works 100% offline in guest mode without env vars)
cp .env.example .env

# 3. Start development server on http://localhost:3000
npm run dev
```

### Verification & Tests

```bash
npm run lint       # TypeScript strict check (tsc --noEmit)
npm run test:unit  # Pure domain unit tests (node:test)
npm test           # Full Vitest integration & component suite
npm run test:all   # Run all unit + integration tests
npm run build      # Production Vite + Workbox PWA build
```

---

## Building for Android (APK & AAB)

**Requirements**: JDK 17+, Android Studio / Android SDK.

```bash
# 1. Build web bundle and sync assets + Capacitor plugins to Android
npm run cap:android

# 2. Build debug APK
cd android && ./gradlew assembleDebug

# 3. Build Play Store App Bundle (AAB) or release APK
cd android && ./gradlew bundleRelease
# or: ./gradlew assembleRelease
```

> Configure your release signing keystore via local Gradle properties (`android/keystore.properties`, git-ignored). Never commit `.keystore` or `.jks` files.

---

## Building for iOS / iPadOS

**Requirements**: macOS, Xcode 15+, CocoaPods / Swift Package Manager.

```bash
# 1. Build web bundle and sync assets + Capacitor plugins to iOS
npm run cap:ios

# 2. Open in Xcode to select signing team, run on Simulator/iPhone/iPad, or Archive for TestFlight/App Store
npx cap open ios
```

---

## Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — 6-layer cross-platform architecture, DI container, and platform abstraction.
- [`MIGRATION.md`](./MIGRATION.md) — Automatic v0/v1/v2→v3 data migrations, backup/restore, and developer migration notes.
- [`TESTING.md`](./TESTING.md) — Test pyramid, commands, and platform verification matrix.
- [`CHANGELOG.md`](./CHANGELOG.md) — Full `v2.0.0` release notes.
