const VARIANT_SEPARATOR = /\s*(?:\/|,|;|\bor\b|\ban\b)\s*/i;
function normalizeQuizAnswer(value) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[ç]/g, "c").replace(/[ê]/g, "e").replace(/[î]/g, "i").replace(/[ş]/g, "s").replace(/[û]/g, "u").replace(/[’'`´]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function getAnswerVariants(answer) {
  const cleaned = answer.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return [];
  const variants = cleaned.split(VARIANT_SEPARATOR).map((part) => part.trim()).filter(Boolean);
  return Array.from(/* @__PURE__ */ new Set([cleaned, ...variants]));
}
function getPrimaryAnswerVariant(answer) {
  return getAnswerVariants(answer)[1] || getAnswerVariants(answer)[0] || answer.trim();
}
function editDistance(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  const dp = Array.from(
    { length: m + 1 },
    (_, i) => Array.from({ length: n + 1 }, (_2, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }
  return dp[m][n];
}
function isQuizAnswerAccepted(typed, correctAnswer) {
  const normalizedTyped = normalizeQuizAnswer(typed);
  if (!normalizedTyped) return false;
  return getAnswerVariants(correctAnswer).some((variant) => {
    const normalizedVariant = normalizeQuizAnswer(variant);
    if (normalizedTyped === normalizedVariant) return true;
    if (normalizedVariant.length >= 5 && !normalizedVariant.includes(" ") && normalizedTyped[0] === normalizedVariant[0]) {
      return editDistance(normalizedTyped, normalizedVariant) <= 1;
    }
    return false;
  });
}
function toLetterPuzzleAnswer(answer) {
  return getPrimaryAnswerVariant(answer).toLowerCase().replace(/[^a-zçêîşû]/g, "");
}
export {
  getPrimaryAnswerVariant as g,
  isQuizAnswerAccepted as i,
  toLetterPuzzleAnswer as t
};
