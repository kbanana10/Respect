const GRADE_QUALITY = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5
};
const DAY_MS = 864e5;
const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;
function createReviewItem(id, now = Date.now()) {
  return {
    id,
    easeFactor: DEFAULT_EASE,
    intervalDays: 0,
    repetitions: 0,
    dueAt: now,
    lastReviewedAt: 0,
    lapses: 0
  };
}
function scheduleNextReview(item, grade, now = Date.now()) {
  const q = GRADE_QUALITY[grade];
  const failed = q < 3;
  const rawEase = item.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  const easeFactor = Math.max(MIN_EASE, Number.isFinite(rawEase) ? rawEase : DEFAULT_EASE);
  let repetitions;
  let intervalDays;
  if (failed) {
    repetitions = 0;
    intervalDays = 10 / (60 * 24);
  } else {
    repetitions = item.repetitions + 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(item.intervalDays * easeFactor);
    intervalDays = Math.min(intervalDays, 365);
  }
  return {
    ...item,
    easeFactor,
    repetitions,
    intervalDays,
    dueAt: now + intervalDays * DAY_MS,
    lastReviewedAt: now,
    lapses: item.lapses + (failed ? 1 : 0)
  };
}
function recordReview(deck, id, grade, now = Date.now()) {
  const existing = deck[id] ?? createReviewItem(id, now);
  return { ...deck, [id]: scheduleNextReview(existing, grade, now) };
}
function getDueItems(deck, now = Date.now(), limit = 20) {
  return Object.values(deck).filter((it) => it.dueAt <= now).sort((a, b) => a.dueAt - b.dueAt).slice(0, limit);
}
function gradeFromAnswer(opts) {
  const { correct, usedHint = false, responseMs, slowThresholdMs = 8e3, fastThresholdMs = 2500 } = opts;
  if (!correct) return "again";
  if (usedHint) return "hard";
  if (responseMs !== void 0 && Number.isFinite(responseMs)) {
    if (responseMs <= fastThresholdMs) return "easy";
    if (responseMs >= slowThresholdMs) return "hard";
  }
  return "good";
}
export {
  getDueItems as a,
  gradeFromAnswer as g,
  recordReview as r
};
