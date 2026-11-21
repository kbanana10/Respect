# التحليل الهندسي الدقيق (من الشيفرة الكاملة) وبرومبت الإصلاح وإعادة البناء لمشروع Respect (Kurdish Quest v2.0.0)

> **المصدر المفحوص:** كامل ملفات المشروع (`172` ملفاً داخل `src/` + الإعدادات والبيانات) من [`Respect-main.zip`](https://drive.google.com/file/d/1Tpr2yq9s666m-RvM0k2RVyhRNYRlY9BA/view?usp=drivesdk) داخل مجلد [`Learn`](https://drive.google.com/drive/folders/1nCkx9Sn39_vQUFDq17jZuLP_xx04Q8ms) في Google Drive ومستودع [kbanana10/Respect](https://github.com/kbanana10/Respect).
> **المنهجية:** AEO v2.0 (فحص مباشر للشيفرة المصدرية الكاملة بدون تخمين).

---

## القسم الأول: التحليل الهندسي الدقيق للشيفرة الكاملة

### 1. تصحيح مهم بعد قراءة الملفات مباشرة
- **ترميز النصوص العربية سليم 100%:** بعد فحص جميع الملفات النصية في المستودع (`172` ملفاً في `src/`) برمجياً، تأكد وجود **صفر (`0`) محارف تالفة (`\uFFFD`)**؛ الرموز المربعة التي ظهرت سابقاً كانت بسبب عرض خطوط المتصفح لصفحة GitHub فقط وليست عطلاً في الشيفرة.

### 2. المشاكل الحقيقية المرصودة بالأرقام والملفات

| الأولوية | المشكلة الحقيقية | الأدلة والأرقام من الشيفرة | الأثر على المستخدم والكود |
|---|---|---|---|
| **حرج (Blocker)** | **ترتيب استيراد خاطئ في `Games.tsx`** | `src/pages/Games.tsx` (الأسطر `14–18`): استدعاء `React.memo(ZombieTypingGame)` و`React.memo(WordConnectGame)` قبل سطور `import` الخاصة بهما في السطرين `17–18` | خطأ معماري وهشاشة في الـ Linter ووقت التشغيل. |
| **حرج (Blocker)** | **343+ نصاً ثنائي اللغة مبرمجاً مباشرة يتجاهل الكردية (`ku`)** | `26` ملفاً تستخدم `language === 'ar' ? ... : ...` أو `language !== 'ar'` (مثل `Profile.tsx`: 43 مرة، `Roadmap.tsx`: 42، `Sentences.tsx`: 38، `VocabularyList.tsx`: 32، `WordConnectGame.tsx`: 24، `WordMatchingGame.tsx`: 24، `Games.tsx`: 23، `Quiz.tsx`: 19، `MainLayout.tsx`: 12، `Dashboard.tsx`: 12) رغم وجود قاموس `ku:` في `src/localization/translations.ts` | اختيار اللغة الكردية في الإعدادات يُظهر نصوصاً إنجليزية مبعثرة في معظم الصفحات ويصعّب الصيانة. |
| **حرج (Blocker)** | **إعلانات (`AdElements`) داخل صفحات التعلم بدون حماية للأطفال** | `src/features/monetization/components/AdElements.tsx` مستخدم داخل `Dashboard.tsx` و`Quiz.tsx` و`VocabularyList.tsx` و`Profile.tsx` و`App.tsx` | غير مقبول تماماً في وضع الأطفال (مخالف لمعايير سلامة الأطفال وCOPPA) ويشتت الانتباه أثناء الاختبار والتعلم. |
| **حرج (Blocker)** | **46 موضع "Coming Soon" وطرق مسدودة داخل التطبيق** | `WritingWords` و`WritingSentences` معطلان عبر `src/lib/writingFlags.ts` (`false`) ويحوّلان لـ `WritingComingSoon.tsx`؛ لعبة الذاكرة في `Games.tsx` (الأسطر `580–651`) مقفلة؛ `Image Quiz` في `QuizModePicker.tsx` مقفل؛ بطاقة `Pronunciation` في `LearningHub.tsx` غير فعالة؛ حزم الجواهر في `Store.tsx` مجرد معاينة | يعطي انطباعاً بأن التطبيق غير مكتمل ويُحبط الطفل أو المتعلم الجديد عند النقر على عناصر مقفلة. |
| **مرتفع (Should Fix)** | **66 استيراداً قديماً (Split-Brain Architecture)** | `66` استيراداً موزعة على أكثر من `36` ملفاً لا تزال تستورد من `src/lib/AuthContext` و`src/lib/translations` و`src/lib/ReminderService` و`src/lib/LeaderboardService` و`src/components/AudioButton` بدلاً من الطبقات الجديدة (`src/store/`، `src/localization/`، `src/services/`، `src/features/audio/`) | ازدواجية معمارية مستمرة وتراكم ملفات جسرية (`shims`) ومخاطر فشل `lint:knip`. |
| **مرتفع (Should Fix)** | **تضخم وتشتت الصفحات (28 مساراً وملفات تتجاوز 1,000 سطر)** | `VocabularyList.tsx` (`1,283` سطراً)، `ZombieTypingGame.tsx` (`1,046`)، `Sentences.tsx` (`916`)، `Games.tsx` (`872`)، `Roadmap.tsx` (`817`)، `traceLetters.ts` (`734`) + `pathValidation.ts` (`711`) + `letterStrokes.ts` (`508`) + `strokeOrder.ts`، `questionGenerator.ts` (`725`)، `useAudio.ts` (`723`)، `WordConnectGame.tsx` (`695`)، `WritingLessonPage.tsx` (`664`)، `Profile.tsx` (`655`)، `MainLayout.tsx` (`638`)، `Quiz.tsx` (`629`)، و`8` صفحات منفصلة للكتابة في `src/App.tsx` | التنقل مربك جداً بين `Dashboard` و`LearningHub` و`Roadmap` و`8` مسارات للكتابة، وصيانة الصفحات الضخمة مكلفة ومعرضة للأعطال. |
| **مرتفع (Should Fix)** | **محرك النطق يعتمد على Web Speech الاحتياطي بدون ملفات صوتية مدمجة** | `src/lib/audioFlags.ts` يضع `USE_CUSTOM_AUDIO_API = false` فيرجع إلى `window.speechSynthesis` (سلسلة `ku → tr → default`)، ومجلد `public/` لا يحتوي إلا على `3` ملفات صوتية للمؤثرات (`correct.wav`، `wrong.wav`، `complete.wav`) | النطق التركي أو الافتراضي يلفظ حروف الكرمانجية (`ê, î, û, q, x, w`) بشكل غير دقيق، بينما التطبيق يهدف لتعليم الأطفال والكبار نطقاً صحيحاً وبدون إنترنت. |
| **مرتفع (Should Fix)** | **كسر مبدأ Offline-First للخطوط وتعارض التبعيات** | السطر 1 في `src/index.css` يستدعي Google Fonts عبر رابط خارجي؛ وجود `bun.lock` بجانب `package-lock.json` بينما الـ CI يشغّل `npm ci`؛ وجود `vite` و`@tailwindcss/vite` و`@vitejs/plugin-react` ضمن `dependencies` بدلاً من `devDependencies`؛ وجود `zustand` غير مستخدم في `src/store/` | تفقد الواجهة خطوطها عند العمل دون إنترنت، وقد تفشل بوابات `lint:knip` و`npm ci` في الـ CI. |
| **متوسط (Pedagogy & UX)** | **غياب وضع الأطفال مقابل الكبار وتشتت رحلة التعلم** | لا يوجد في `UserData` أو `OnboardingFlow` تمييز بين `Kids Mode` و`Adults Mode`، ولا بوابة أبوية (`Parental Gate`)، و`MainLayout.tsx` يستخدم أيقونة `Hash` للرئيسية، و`OnboardingFlow.tsx` فيه نواقص إتاحة (`aria-label={av.id}` وغياب `aria-pressed`) | المتعلم المبتدئ أو الطفل يدخل فلا يجد مساراً خطياً واضحاً يبدأ بالأبجدية الهوارية (Unit 0) ثم ينتقل بسلاسة إلى A1–B2. |

### 3. الأصول القوية التي يجب الحفاظ عليها والبناء فوقها
- **طبقة البيانات والمناهج غنية فعلاً:** `src/data/academic.ts` (`71 KB`)، `src/data/kurmanji.ts` (`42 KB`)، `src/data/learningPath.ts` (`20.5 KB`)، `src/data/grammar/*` (`67 KB` موثقة المراجع في `VERIFICATION_NEEDED.md`)، `src/data/normalized/*`، وبيانات رسم الحروف (`letterStrokes.ts` و`traceLetters.ts`).
- **طبقة Offline-First والمزامنة:** `src/core/`، `src/domain/` (`progressEngine.ts` و`migrations.ts`)، `src/platform/`، `src/services/` (`OfflineStorageService.ts`، `SyncEngine.ts`، `SpacedRepetitionService.ts`، `GamificationService.ts`).
- **نظام جودة صارم جاهز:** قواعد `anti-slop` المدمجة في `eslint.config.mjs`، و`knip.json`، و`vitest`، و`storybook`.

---

## القسم الثاني: البرومبت الهندسي النهائي الجاهز للنسخ (Master Engineering Prompt)

انسخ النص التالي بالكامل والصقه في أداة البرمجة الذكية داخل مجلد مشروع `Respect`:

```markdown
# MASTER ENGINEERING DIRECTIVE: Kurdish Quest (kbanana10/Respect) — Complete Architectural Cleanup, Unified UI/UX Rebuild & Kids/Adults EdTech Transformation

Act as a **Principal EdTech Product Engineer, Curriculum UX Architect, and Senior React 19 / TypeScript Architect**.
You are taking full engineering ownership of **Kurdish Quest (`kbanana10/Respect` v2.0.0)** — an Offline-First Kurmanji Kurdish learning app (Web, PWA, Android & iOS via Capacitor 8).

Your goal is to **fix every structural and technical defect**, **delete or consolidate every dead-end, monolith, and duplicate**, and **rebuild ALL user-facing pages** (Onboarding, Home, Learning Map, Unified Lesson/Quiz Engine, Practice Hub, Writing Studio, Games Arcade, Profile/Settings, Rewards Shop) into ONE cohesive, joyful, science-backed learning experience tailored for **both Children (5–12) and Adults (13+)** from first launch to CEFR B2 mastery.

Follow a strict **verified execution loop**: inspect before changing, preserve strong domain/offline layers, execute in green stages, run ALL CI gates after every stage, and NEVER leave "Coming Soon" dead ends or unverified claims.

---

## STAGE 0 — BASELINE DIAGNOSTICS (BEFORE ANY CODE CHANGES)

1. Run `git status` and create a feature branch (`feat/unified-kids-adults-rebuild`).
2. Run all 8 CI commands from `.github/workflows/ci.yml` to capture the exact current failure baseline:
   - `npm ci`
   - `npm audit --omit=dev --audit-level=high`
   - `npm run lint`
   - `npm run lint:slop`
   - `npm run lint:knip`
   - `npm test`
   - `npm run build`
   - `npm run build-storybook`
3. Inspect `ARCHITECTURE.md`, `VERIFICATION_NEEDED.md`, `eslint.config.mjs`, `knip.json`, `vite.config.ts`, `capacitor.config.ts`, and `server.ts` so every edit complies with the vendored `anti-slop` ESLint rules and Knip dead-code rules.

---

## STAGE 1 — STRUCTURAL CLEANUP & GREEN CI BASELINE

Preserve the strong Offline-First core (`src/core/`, `src/domain/`, `src/platform/`, `src/services/OfflineStorageService.ts`, `SyncEngine.ts`, `SpacedRepetitionService.ts`, `GamificationService.ts`) and rich curriculum datasets (`src/data/academic.ts`, `kurmanji.ts`, `learningPath.ts`, `grammar/*`, `normalized/*`), while fixing every structural flaw:

1. **Eliminate All 66 Legacy Shim Imports & Duplicate Modules:**
   - Migrate every file importing from `src/lib/AuthContext`, `src/lib/translations`, `src/lib/ReminderService`, `src/lib/LeaderboardService`, `src/lib/utils`, and `src/components/AudioButton.tsx` to the canonical 6-layer paths (`src/store/AuthContext`, `src/localization/translations`, `src/services/*`, `src/utils/*`, `src/features/audio/components/AudioButton`).
   - Delete all obsolete shim files in `src/lib/` and `src/components/AudioButton.tsx` once zero references remain.
   - Unify the overlapping stroke datasets (`src/data/letterStrokes.ts`, `src/data/strokeOrder.ts`, `src/lib/traceLetters.ts`) into ONE clean, typed writing-stroke module.

2. **Fix Immediate Code, Packaging & Offline-First Defects:**
   - Fix `src/pages/Games.tsx` lines 14–18 (`React.memo` wrappers declared before `ZombieTypingGame` & `WordConnectGame` imports).
   - Remove `bun.lock` so `package-lock.json` is the single lockfile matching `.github/workflows/ci.yml`'s `npm ci`.
   - Move build-only tools (`vite`, `@tailwindcss/vite`, `@vitejs/plugin-react`) from `dependencies` to `devDependencies` in `package.json`, and remove unused `zustand` (or adopt it cleanly so `lint:knip` passes with zero warnings).
   - **True Offline-First Fonts:** Replace line 1 `@import url('https://fonts.googleapis.com/...')` in `src/index.css` with locally bundled fonts (`public/fonts/*.woff2` + `@font-face` or `@fontsource`) for `Plus Jakarta Sans`, `Fraunces`, `Noto Kufi Arabic`, and `JetBrains Mono` so PWA/Android/iOS render identically offline.
   - **Fix Tri-Lingual Localization (`ar` / `en` / `ku`):** Eliminate ALL `343+` hardcoded binary `language === 'ar' ? ... : ...` / `language !== 'ar'` ternaries across the 26 `.tsx` files (`Profile.tsx`, `Roadmap.tsx`, `Sentences.tsx`, `VocabularyList.tsx`, `WordConnectGame.tsx`, `WordMatchingGame.tsx`, `Games.tsx`, `Quiz.tsx`, `MainLayout.tsx`, `Dashboard.tsx`, `Search.tsx`, etc.). Route ALL UI text through `src/localization/translations.ts` with complete, accurate `en`, `ar`, and `ku` (Kurmanji Hawar) entries, plus add missing `ku` titles/descriptions to `CEFRLevel` in `src/data/learningPath.ts` and fix the `" train"` leading-space typo.
   - **Audit Audio Architecture (`src/lib/audioFlags.ts` & `src/features/audio/hooks/useAudio.ts`):** Keep the audio layer clean and resilient: support bundled/cached local Kurmanji audio assets first (ready for `scripts/generateAudio.ts` / `services/tts` output), then optional hosted TTS API, then graceful Web Speech fallback with clear visual feedback if offline audio for a word is not yet cached (never fail silently).

**Stage 1 Gate:** All CI checks (`lint`, `lint:slop`, `lint:knip`, `test`, `build`) must pass with 0 errors and 0 warnings before starting Stage 2.

---

## STAGE 2 — UNIFIED DESIGN SYSTEM & KIDS + ADULTS ADAPTIVE ARCHITECTURE

Design like a top EdTech team (combining Duolingo's clarity, Khan Academy Kids' warmth, and Busuu's structured CEFR depth).

### 1. Adaptive Learner Mode (`learnerMode: 'kids' | 'adults'`)
Extend `UserData` (`src/models/user.ts` & `src/domain/schema/migrations.ts` with a safe, tested v3→v4 migration that preserves 100% of existing user progress):
- `learnerMode: 'kids' | 'adults'`
- `autoPlayAudio: boolean` (default `true` in Kids Mode)
- `soundEnabled: boolean` (default `true`)
- `relaxedTimer: boolean` (default `true` in Kids Mode)
- `parentalGateEnabled: boolean` (default `true` in Kids Mode)

Enforce mode behavior globally:
- **Kids Mode (`kids`, ages 5–12):**
  - **100% AD-FREE:** Completely suppress `AdElements` / ads across every screen in Kids Mode (COPPA / kids-safety compliance). Also remove intrusive ads from active quiz/lesson flows in Adults Mode.
  - **Touch & Visual Ergonomics:** Minimum `48–56px` tap targets, rounded warm cards, larger typography, playful mascot/star animations (respecting `prefers-reduced-motion`), audio-first + icon/visual-first cards so young children don't need to read dense instructions.
  - **Simplified 4-Tab Navigation:** `Home` (My Adventure), `Map` (Learning Path), `Games` (Play), `Stars` (My Profile & Stickers). Hide dense grammar tables, competitive leaderboards, and raw settings.
  - **Stress-Free Practice:** Timers OFF by default in games, gentle encouraging feedback on mistakes with instant audio replay and visual hints.
  - **Parental Gate:** Lightweight math check (e.g., `8 + 5 = ?`) protecting Settings, Data Reset, Legal/External Links, and switching between Kids & Adults modes.
- **Adults Mode (`adults`, ages 13+):**
  - Refined **Warm Heritage Growth** design system (Light + Dark themes, semantic tokens in `src/index.css`).
  - **Structured 5-Tab Navigation:** `Home`, `Path` (CEFR A1–B2 Map), `Practice` (Alphabet, Vocabulary, Sentences, Grammar, Writing, Search, Favorites), `Games`, `Profile` (Stats, Settings, Rewards, Leaderboard).
  - Full SM-2 Spaced Repetition queue, Grammar deep-dives, typing & sentence-reordering drills, and optional CEFR test-out shortcuts.

### 2. Unified UI Primitives & App Shell (`src/components/ui/` + `src/components/MainLayout.tsx`)
- Build ONE shared component library (`PageShell`, `Card`, `Button`, `IconButton`, `Badge`, `ProgressBar`, `StatPill`, `SegmentedControl`, `Tabs`, `Modal`, `EmptyState`, `ErrorState`, `SkeletonLoader`, `OptionRow` with proper `aria-pressed`) using strict CSS logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`) so Arabic (`dir="rtl"`), English (`dir="ltr"`), and Kurmanji (`dir="ltr"`) align symmetrically with zero layout bugs.
- Decompose `MainLayout.tsx` (currently 638 lines) into clean sub-components (`DesktopSidebar`, `MobileTopBar`, `MobileBottomNav`, `SyncStatusBadge`), replace the `Hash` Home icon with a real `Home` icon, and unify navigation so there is ZERO confusion between Home, Map, and Practice.

---

## STAGE 3 — FULL PAGE-BY-PAGE REBUILD (ZERO DEAD ENDS, ZERO MONOLITHS)

Refactor, merge, or delete anything bloated or half-built. Every page file should stay focused and modular (<300–350 lines, delegating logic to feature hooks and sub-components).

1. **First-Launch Onboarding (`src/features/onboarding/`):**
   - Step 1: Pick Language (`العربية` / `English` / `Kurdî`) with live instant RTL/LTR switch.
   - Step 2: Pick Learner Mode (**Kids** vs **Adults**) with clear visual cards.
   - Step 3: Pick Avatar/Mascot + Starting Point (Kids: start straight at **Unit 0: Hawar Letters & Sounds**; Adults: "Brand New", "Know Basics", or a **60-second Placement Check** + daily goal `5 / 10 / 15 min`).
   - Step 4: **Immediate 60-Second First Win** — launch a 3-step interactive greeting micro-lesson ("Silav!") right after onboarding so the learner immediately experiences success before landing on Home.
   - Fix all accessibility issues (`aria-label` with localized names instead of raw `av.id`, `aria-pressed` on options, focus management).

2. **Home / Learning Cockpit (`src/pages/Dashboard.tsx`):**
   - One unmistakable primary Hero CTA (**"Continue Learning"** → launches the exact next node on the Learning Map).
   - Daily Goal & Streak card + SM-2 Smart Review card (only prominent when reviews are due) + Word of the Day (with instant audio + favorite toggle) + mode-adapted quick actions.

3. **Unified Learning Map (`src/features/roadmap/` + `src/pages/Roadmap.tsx` — decompose from 817 lines):**
   - Visual vertical **winding milestone trail** starting from **Unit 0: Hawar Alphabet & Sounds** (critical bridge for Arabic speakers learning Latin-script Kurmanji!) → **CEFR A1 → A2 → B1 → B2**.
   - Clear node states (`Completed` with stars, `Current` active CTA, `Unlocked`, `Locked` with preview & Adult "Test Out" option).
   - Every node launches the **Unified Micro-Lesson Engine** (`src/features/lesson/`): Teach Card (Audio + Visual + Meaning) → Recognition → Listening → Matching/Building → Celebration Summary (XP, Stars, Streak, Next Node Unlocked).
   - **Unify `Quiz.tsx` (629 lines, resolving `TODO-029`) & `src/pages/grammar/*` exercises** onto this SAME `LessonEngine` so Roadmap lessons, Grammar lessons, SM-2 Reviews, and Practice Quizzes share identical polished UX, keyboard shortcuts, haptics, and scoring. Remove the locked "Image Quiz — Coming Soon" stub from `QuizModePicker.tsx` (either make it genuinely work with real SVGs/icons or remove the dead tile).

4. **Unified Practice Hub (`src/pages/LearningHub.tsx`) & Eliminating Fragmented Pages:**
   - Remove the inert "Pronunciation — Coming Soon" dead card from `LearningHub.tsx` (or replace it with a real **Listen & Repeat Audio Drill** using existing vocabulary audio).
   - **Consolidate 8 Writing Pages → 1 Unified Writing Studio (`src/features/writing/`):**
     - **DELETE `src/pages/WritingComingSoon.tsx`** and remove the `WRITING_WORDS_ENABLED` / `WRITING_SENTENCES_ENABLED` dead-end gates (`src/lib/writingFlags.ts`).
     - Merge `Writing.tsx`, `WritingLessonPage.tsx` (664 lines), `WritingTracingPage.tsx`, `WritingWords.tsx`, `WritingWordTracingPage.tsx`, `WritingSentences.tsx`, and `WritingSentenceTracingPage.tsx` into ONE clean **Writing Studio** (`/writing`) with 3 working progressive tabs: **Letters** → **Words** → **Sentences** (keeping redirect aliases for legacy URLs if needed).
   - **Decompose & Unify Content Browsers:** Break down `VocabularyList.tsx` (1,283 lines), `Sentences.tsx` (916 lines), `Search.tsx` (569 lines), `Alphabet.tsx`, `Favorites.tsx`, and `Grammar.tsx` into clean shared card/filter/audio components inside `PageShell`. Every word/letter card must support instant audio, favorite toggle, and "Practice Now".

5. **Unified Games Arcade (`src/features/games/` + `src/pages/Games.tsx` — decompose from 872 lines):**
   - **Remove the locked "Memory Match — Coming Soon" dead end** (either implement a clean, working Memory Match game for Kids & Adults or delete the dead stub completely — zero "Coming Soon" tiles!).
   - Decompose `Games.tsx` (872 lines), `ZombieTypingGame.tsx` (1,046 lines), `WordConnectGame.tsx` (695 lines), and `WordMatchingGame.tsx` (548 lines) to share ONE unified **`GameShell` HUD** (Exit, Score/Stars, Lives/Hearts, optional Timer toggle OFF by default in Kids Mode, Sound toggle, Pause modal, End-of-Round XP + Missed Words Audio Review).
   - **Curriculum-Aware Vocabulary:** Feed games dynamically from the learner's unlocked Learning Map words or due SM-2 review queue (with Unit 1 A1 fallback for brand-new users) so games actively reinforce studied material.
   - In Kids Mode, highlight kid-friendly visual/audio games (Word Match, Memory Match, Letter/Word Connect) and hide high-pressure timed typing unless unlocked/selected.

6. **Unified Profile, Settings & Real Rewards Shop (`src/features/profile/` + `src/pages/Profile.tsx` & `src/pages/Store.tsx`):**
   - Decompose `Profile.tsx` (655 lines) into clean tabbed/grouped sections: **Profile & Stats**, **Learning Mode (Kids/Adults) & Preferences**, **Appearance & Language**, **Reminders (`ReminderService`)**, **Offline Data & Backup (`DataBackupCard`)**, and **Legal (`PrivacyPolicy`, `TermsOfService`)**.
   - **Rebuild `Store.tsx` into a Working Rewards Shop:** Remove ALL fake "Coming Soon" IAP gem-pack previews. Let learners spend earned XP/Coins offline on real, working rewards: **Streak Freeze**, **Unlockable Avatars/Mascots**, **Theme Accents**, and **Kids Sticker Collection** — all persisted in `OfflineStorageService`.
   - Keep `LeaderboardPage.tsx` clean and optional in Adults Mode (with a clear offline state when disconnected) and hidden in Kids Mode.

---

## STAGE 4 — VERIFICATION & QUALITY GATES (EVIDENCE REQUIRED)

Before finishing, run EVERY gate below and fix any issue at its root cause (never weaken tests or disable `anti-slop` rules):

1. **Automated CI Gates (all must exit 0 with 0 warnings):**
   - `npm ci`
   - `npm audit --omit=dev --audit-level=high`
   - `npm run lint`
   - `npm run lint:slop`
   - `npm run lint:knip`
   - `npm test` (add tests covering: `v3 → v4` `learnerMode` migration, Kids Mode ad suppression & parental gate, zero `language === 'ar'` regressions in core UI, unified `LessonEngine`, and zero "Coming Soon" dead routes)
   - `npm run build`
   - `npm run build-storybook`
2. **Real Browser Verification (Playwright):**
   - Verify **375px mobile** and **1280px desktop** (zero horizontal scroll, `>=44px` tap targets, `>=48px` in Kids Mode).
   - Verify **Arabic (`dir="rtl"`)**, **English (`dir="ltr"`)**, and **Kurmanji (`dir="ltr"`)** across every rebuilt page.
   - Verify **Light & Dark** themes and WCAG AA contrast.
   - Verify **Kids Mode** and **Adults Mode** end-to-end: Onboarding → First Win → Home → Learning Map → Complete Lesson → Writing Studio → Play Game → Rewards Shop → Settings/Mode Switch → Offline Reload (verify local fonts & persisted state with network offline).
   - Zero browser console errors or uncaught exceptions.
3. **Final Handoff:** Report exact bugs fixed, files added/modified/deleted, exact verification outputs, and any remaining manual Capacitor Android/iOS smoke checks.
```
