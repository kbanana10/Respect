# Migration Guide — Kurdish Quest `v1.x` -> `v2.0.0`

This document covers both **runtime data migration** (automatic and zero-data-loss for existing learners) and **codebase architectural migration** for developers.

---

## 1. User Data & Storage Migration (Automatic, Zero Data Loss)

### What Changed

| Component | `v1.x` | `v2.0.0` |
|---|---|---|
| `UserData` schema | Implicit v1/v2 (no `schemaVersion`) | Explicit `schemaVersion: 3` |
| IndexedDB (`kurmanji_quester_db`) | `DB_VERSION = 1` (`user_data`, `sync_queue`, `telemetry_events`) | `DB_VERSION = 2` (+ `metadata`, `backups`) |
| Native persistence | `localStorage` only (vulnerable to iOS WKWebView eviction) | Dual-tier: IndexedDB v2 + `@capacitor/preferences` native mirror |
| Sync Queue | Flat append-only queue, infinite retries | Coalescing `UPDATE_PROGRESS`, idempotency keys, exponential backoff (2s..60s), dead-letter cap at 5 retries + manual reset |
| Portable Backups | Not available | Export/Restore versioned JSON (`kurdish-quest-backup` v3 envelope) + legacy raw JSON import |

### How Automatic Upgrade Works

When an existing user opens `v2.0.0`:

1. `OfflineStorageService.getUserData()` checks:
   - IndexedDB `user_data/current_user`
   - Native `@capacitor/preferences` (`kurmanji_user_data_v2`)
   - `localStorage` (`kurmanji_user_data_v2`, then legacy `kurdish_quest_data`)
2. `migrateUserData(raw)` runs deterministically:
   - Detects legacy version (`v0` corrupt/empty, `v1` pre-gems/SRS, `v2` pre-versioned).
   - Preserves **all** existing progress (`xp`, `completedLessons`, `favorites`, `badges`, `writingProgress`, `gameScores`, `reviewDeck`, custom legacy properties).
   - Reconciles `level` and `unlockedLevels` against the XP progression curve.
   - Clamps invalid numbers (e.g., SM-2 `easeFactor >= 1.3`, `writingProgress.bestScore` in `[0, 100]`).
3. Before overwriting the record, `OfflineStorageService` saves an immutable safety copy inside IndexedDB's `backups` store (`pre_migration_v<N>_<timestamp>`).
4. The upgraded `v3` record is saved atomically to IndexedDB, `localStorage`, and (on native) Capacitor Preferences.

### Manual Export & Restore (Cross-Device / Pre-Upgrade Safety)

Learners can export or restore progress anytime via **Profile -> Settings -> Backup & Sync**:

- **Export JSON**: Downloads `kurdish-quest-backup-YYYY-MM-DD.json` containing `{ format, schemaVersion, exportedAt, appVersion, profile, userData }`.
- **Restore JSON**: Validates structure with `parseAndMigrateBackup()`, automatically migrates legacy exports, applies language/theme preferences, and persists to all storage tiers. Malformed files throw `AppError(BACKUP_INVALID)` and leave existing progress untouched.

---

## 2. Developer Migration Notes

### Removed Legacy / Dead Files
- `/app/find_emojis.cjs`, `/app/update_data_icons.cjs` (stray one-off scripts)
- `/conceptcard-proof/`, `/measure-ui-proof/` (stray audit output folders)
- `/audit/zzz-verifier-tmp.test.tsx` (throwaway temp test)
- `/src/pages/GrammarLessonPlaceholder.tsx` (replaced by live `src/pages/grammar/GrammarLesson.tsx`)

### Security & Configuration Breaking Fixes
1. **Removed client-side `GEMINI_API_KEY` bundle injection**: `vite.config.ts` no longer exposes `process.env.GEMINI_API_KEY` via `define`. Keep API secrets server-side only.
2. **Platform Calls**: Replace direct `Capacitor.*` / `navigator.onLine` / `App.addListener` usage with `getPlatform()` from `src/platform`.
3. **Domain Rules**: Import progress/sync logic from `src/domain/rules/progressEngine.ts`, `src/domain/rules/syncMerge.ts`, and `src/domain/schema/migrations.ts` rather than embedding business rules in React contexts.
4. **Node Engine**: Updated `package.json` `engines.node` from `>=20.0.0 <21` to `>=20.0.0` (verified on Node 22).
