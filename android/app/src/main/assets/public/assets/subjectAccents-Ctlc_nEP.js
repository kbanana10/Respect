const SUBJECT_ACCENTS = {
  letters: {
    well: "bg-[#FFF3D6] dark:bg-[#3A2F14]",
    icon: "text-[#D97706] dark:text-[#FFCE6B]",
    barFill: "bg-[#F59E0B]",
    heroBorder: "border-s-[#F59E0B] dark:border-s-[#FFBA38]"
  },
  numbers: {
    well: "bg-sky-100 dark:bg-sky-950/40",
    icon: "text-sky-600 dark:text-sky-400",
    barFill: "bg-sky-500",
    heroBorder: "border-s-sky-500 dark:border-s-sky-400"
  },
  colors: {
    well: "bg-emerald-100 dark:bg-emerald-950/40",
    icon: "text-emerald-600 dark:text-emerald-400",
    barFill: "bg-emerald-500",
    heroBorder: "border-s-emerald-500 dark:border-s-emerald-400"
  },
  vocabulary: {
    well: "bg-[#EDE9FE] dark:bg-[#2E2447]",
    icon: "text-[#7C3AED] dark:text-[#C4B5FD]",
    barFill: "bg-[#7C3AED]",
    heroBorder: "border-s-[#7C3AED] dark:border-s-[#A78BFA]"
  },
  phrases: {
    well: "bg-[#F3E8FF] dark:bg-[#3B2560]",
    icon: "text-[#9333EA] dark:text-[#D8B4FE]",
    barFill: "bg-[#9333EA]",
    heroBorder: "border-s-[#9333EA] dark:border-s-[#C084FC]"
  },
  pronunciation: {
    well: "bg-slate-100 dark:bg-slate-800",
    icon: "text-slate-400 dark:text-slate-500",
    barFill: "bg-slate-400",
    heroBorder: "border-s-slate-300 dark:border-s-slate-700"
  },
  grammar: {
    well: "bg-teal-100 dark:bg-teal-950/40",
    icon: "text-teal-600 dark:text-teal-400",
    barFill: "bg-teal-500",
    heroBorder: "border-s-teal-500 dark:border-s-teal-400"
  },
  writing: {
    well: "bg-[#EDE9FE] dark:bg-[#2E2447]",
    icon: "text-[#7C3AED] dark:text-[#C4B5FD]",
    barFill: "bg-[#7C3AED]",
    heroBorder: "border-s-[#7C3AED] dark:border-s-[#A78BFA]"
  }
};
function categorySubjectAccent(categoryId) {
  if (categoryId === "numbers") return SUBJECT_ACCENTS.numbers;
  if (categoryId === "colors") return SUBJECT_ACCENTS.colors;
  return null;
}
export {
  SUBJECT_ACCENTS as S,
  categorySubjectAccent as c
};
