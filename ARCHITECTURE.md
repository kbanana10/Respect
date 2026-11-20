# Kurdish Quest — Cross-Platform Architecture (`v2.0.0`)

Kurdish Quest is built on a **6-layer clean cross-platform architecture** sharing **>95% of TypeScript code, educational content, domain logic, and UI** across **Web**, **Installable PWA**, **Android (Capacitor APK/AAB)**, and **iOS / iPadOS (Capacitor Xcode)** while isolating platform-specific capabilities behind strict interfaces.

---

## 1. Layer Architecture

```
+-------------------------------------------------------------------+
| 6. Presentation Layer (src/pages/, src/components/,               |
|    src/presentation/components/, src/features/*/components/)      |
|    - Responsive Adaptive Shell (Desktop/iPad Sidebar + Mobile     |
|      Bottom Navigation), RTL/LTR trilingual UI (EN / AR / KU),    |
|      WCAG AA contrast, safe-area insets                           |
+-------------------------------------------------------------------+
                                 |
                                 v
+-------------------------------------------------------------------+
| 5. Application Layer (src/store/AuthContext.tsx, hooks, stores)   |
|    - Thin React state adapters delegating all rules to Domain,    |
|      Data, and Platform layers                                    |
+-------------------------------------------------------------------+
                                 |
          +----------------------+----------------------+
          v                                             v
+-----------------------------------+   +---------------------------+
| 4. Data & Sync Layer              |   | 3. Platform Layer         |
| (src/services/)                   |   | (src/platform/)           |
| - OfflineStorageService (IDB v2 + |   | - PlatformAdapter iface   |
|   Capacitor Preferences mirror +  |   | - WebPlatformAdapter      |
|   pre-migration backups)          |   | - CapacitorPlatformAdapter|
| - SyncEngine (backoff, CRDT/LWW)  |   |   (Android & iOS plugins) |
| - SpacedRepetitionService (SM-2)  |   | - useOnlineStatus()       |
| - GamificationService             |   | - usePWAInstall()         |
+-----------------------------------+   +---------------------------+
          |
          v
+-------------------------------------------------------------------+
| 2. Domain Layer (src/domain/, src/models/, src/data/)             |
|    - Zero React/DOM/Capacitor dependencies                        |
|    - schema/migrations.ts (lossless v0/v1/v2 -> v3 + backups)     |
|    - rules/syncMerge.ts (deterministic CRDT/additive + LWW merge) |
|    - rules/progressEngine.ts (XP curve, CEFR, missions, badges)   |
+-------------------------------------------------------------------+
                                 |
                                 v
+-------------------------------------------------------------------+
| 1. Core Layer (src/core/)                                         |
|    - config/env.ts (typed runtime config, zero client secrets)    |
|    - errors/AppError.ts (typed error codes + EN/AR/KU messages)   |
|    - logging/logger.ts (privacy-safe redacting logger + buffer)   |
|    - container.ts (lightweight typed DI ServiceContainer)         |
+-------------------------------------------------------------------+
```

---

## 2. Dependency Rules

- **Core** imports nothing from outer layers.
- **Domain** imports only from Core, Models, and pure domain helpers. It never imports React, `window`, `document`, Firebase, or `@capacitor/*`. Every domain module can run directly under `node:test`.
- **Platform** implements `PlatformAdapter` and registers a singleton inside `ServiceContainer` (`PLATFORM_TOKEN`). Tests can swap in mock Android/iOS adapters cleanly via `serviceContainer.registerInstance(PLATFORM_TOKEN, mock)`.
- **Data** persists locally via two tiers:
  1. **Tier 1 (Fast/Eviction-Resistant Mirror)**: `@capacitor/preferences` on Android/iOS (prevents iOS WKWebView 7-day IndexedDB eviction) and `localStorage` on Web.
  2. **Tier 2 (Structured Store)**: IndexedDB `kurmanji_quester_db` v2 (`user_data`, `sync_queue`, `telemetry_events`, `metadata`, `backups`).
- **Presentation** never calls `@capacitor/*` or `indexedDB` directly.

---

## 3. Cross-Platform Native Integration (Capacitor 8)

| Capability | Web / PWA (`WebPlatformAdapter`) | Android & iOS (`CapacitorPlatformAdapter`) |
|---|---|---|
| Network state | `navigator.onLine` + window events | `@capacitor/network` native listener |
| App lifecycle | `document.visibilitychange` | `@capacitor/app` `appStateChange` |
| Hardware Back | History / route fallback | `@capacitor/app` `backButton` |
| Haptics | `navigator.vibrate` fallback | `@capacitor/haptics` impact/notification |
| Status Bar | `<meta name="theme-color">` update | `@capacitor/status-bar` style & color |
| Splash Screen | No-op | `@capacitor/splash-screen` controlled hide |
| Eviction-Safe KV | `localStorage` | `@capacitor/preferences` (UserDefaults / SharedPreferences) |
| Keyboard | Browser viewport resize | `@capacitor/keyboard` (`resize: 'body'`) |

---

## 4. Responsive Shell & RTL Support

- **Mobile (`< 768px`)**: Bottom 5-tab bar (`nav[aria-label="Main Navigation"]`) with `pb-safe` safe-area inset for iOS home indicator and Android gesture bar.
- **Tablet & Desktop (`>= 768px`)**: Persistent collapsible-ready sidebar (`aside`) pinned to the logical inline start (`border-e`), with direct navigation, EN/AR/KU language selector, light/dark toggle, and PWA install button.
- **Logical CSS & Zero-FOUC Boot**: `index.html` applies stored `kurdish_quest_theme` and `kurdish_quest_lang` (`dir="rtl"` for Arabic, `dir="ltr"` for English & Kurmanji) before first paint.

---

## 5. Adding a New Feature

1. Define pure state types and rules under `src/domain/` and add `node:test` unit tests.
2. Expose storage/sync methods via `src/services/` if persistence is needed.
3. Access device capabilities exclusively through `getPlatform()` (`src/platform/`).
4. Add UI components under `src/presentation/` or `src/features/<feature>/` using logical Tailwind spacing (`ps-*`, `pe-*`, `ms-*`, `me-*`, `text-start`) so EN/KU (LTR) and AR (RTL) work automatically.
5. Add integration/component tests in `audit/` and verify via `npm run lint && npm run test:all && npm run build`.
