import { i as isQuizAnswerAccepted } from "./answerUtils-WRjxYtEq.js";
function gl(en, ar, ku) {
  return { en, ar, ku };
}
function ex(ku, ar, en) {
  return { ku, ar, en };
}
function opt(ku, ar, en) {
  return { ku, ar, en };
}
function pair(ku, ar, en) {
  return { ku, ar, en };
}
function concept(c) {
  return {
    id: c.id,
    term: c.term,
    phonetic: c.phonetic,
    ar: c.ar,
    en: c.en,
    usage: gl(c.usageEn, c.usageAr, c.usageKu),
    examples: c.examples
  };
}
function q(e) {
  return {
    id: e.id,
    nodeId: e.node,
    type: e.type,
    prompt: gl(e.prompt.en, e.prompt.ar, e.prompt.ku),
    options: e.options,
    correctAnswer: e.correct,
    variants: e.variants,
    audioText: e.audioText,
    sentenceWords: e.sentenceWords,
    reference: e.reference ? gl(e.reference.en, e.reference.ar, e.reference.ku) : void 0,
    pairs: e.pairs,
    display: e.display,
    direction: e.direction
  };
}
function lesson(l) {
  return {
    topicId: l.topicId,
    xp: l.xp,
    title: gl(l.title.en, l.title.ar, l.title.ku),
    description: gl(l.description.en, l.description.ar, l.description.ku),
    concepts: l.concepts,
    summaryTable: l.summary ? { rows: l.summary.rows } : void 0,
    exercises: l.exercises
  };
}
const ez = concept({
  id: "pronoun-ez",
  term: "Ez",
  ar: "أنا",
  en: "I",
  usageAr: "للتحدّث عن نفسك (المتكلّم المفرد).",
  usageEn: "Use it to talk about yourself (1st person singular).",
  usageKu: "Ji bo axaftina li ser xwe (kesê yekem ê yekjimar).",
  examples: [
    ex("Ez kurd im", "أنا كردي", "I am Kurdish"),
    ex("Ez li malê me", "أنا في البيت", "I am at home"),
    ex("Ez nan dixwim", "أنا آكل الخبز", "I eat bread"),
    ex("Ez ji Amedê me", "أنا من آمد (ديار بكر)", "I am from Amed (Diyarbakır)"),
    ex("Ez mamoste me", "أنا معلّم", "I am a teacher")
  ]
});
const tu = concept({
  id: "pronoun-tu",
  term: "Tu",
  ar: "أنتَ / أنتِ",
  en: "you (singular)",
  usageAr: "لمخاطبة شخص واحد تعرفه (المخاطَب المفرد).",
  usageEn: "Use it to address one person you know (2nd person singular).",
  usageKu: "Ji bo axaftina bi kesekî re (kesê duyem ê yekjimar).",
  examples: [
    ex("Tu kurd î", "أنتَ كردي", "You are Kurdish"),
    ex("Tu li malê yî", "أنتَ في البيت", "You are at home"),
    ex("Tu nan dixwî", "أنتَ تأكل الخبز", "You eat bread"),
    ex("Tu ji ku yî?", "من أين أنتَ؟", "Where are you from?"),
    ex("Tu bi xêr hatî", "مرحباً بك (رجل)", "Welcome (to a man)")
  ]
});
const ew = concept({
  id: "pronoun-ew",
  term: "Ew",
  ar: "هو / هي",
  en: "he / she / it",
  usageAr: "للغائب المفرد؛ الكلمة نفسها تُستخدم للمذكّر والمؤنّث، والسياق يحدّد.",
  usageEn: "For the 3rd person singular; the same word is masculine/feminine — context decides.",
  usageKu: "Ji bo kesê sêyem ê yekjimar; heman peyv ji bo nêr û mê ye.",
  examples: [
    ex("Ew kurd e", "هو كردي", "He is Kurdish"),
    ex("Ew nan dixwe", "هو يأكل الخبز", "He eats bread"),
    ex("Ew li dibistanê ye", "هو في المدرسة", "He is at school"),
    ex("Ew ji Amedê ye", "هو من آمد", "He is from Amed"),
    ex("Ew mamoste ye", "هو معلّم", "He is a teacher")
  ]
});
const em = concept({
  id: "pronoun-em",
  term: "Em",
  ar: "نحن",
  en: "we",
  usageAr: "للتحدّث عن مجموعة تضمّك أنت (المتكلّم الجمع).",
  usageEn: "For a group that includes yourself (1st person plural).",
  usageKu: "Ji bo komekê ku tu tê de yî (kesê yekem ê pirjimar).",
  examples: [
    ex("Em kurd in", "نحن أكراد", "We are Kurds"),
    ex("Em li malê ne", "نحن في البيت", "We are at home"),
    ex("Em nan dixwin", "نحن نأكل الخبز", "We eat bread"),
    ex("Em ji Amedê ne", "نحن من آمد", "We are from Amed"),
    ex("Em mamoste ne", "نحن معلّمون", "We are teachers")
  ]
});
const hun = concept({
  id: "pronoun-hun",
  term: "Hûn",
  ar: "أنتم / أنتن",
  en: "you (plural)",
  usageAr: "لمخاطبة أكثر من شخص، أو شخص واحد باحترام (صيغة الجمع المهذّبة).",
  usageEn: "For addressing several people, or one person politely (plural/polite form).",
  usageKu: "Ji bo axaftina bi çend kesan re, an bi rêz ji bo kesekî.",
  examples: [
    ex("Hûn kurd in", "أنتم أكراد", "You are Kurds"),
    ex("Hûn li malê ne", "أنتم في البيت", "You are at home"),
    ex("Hûn nan dixwin", "أنتم تأكلون الخبز", "You eat bread"),
    ex("Hûn ji ku ne?", "من أين أنتم؟", "Where are you from?"),
    ex("Hûn bi xêr hatin", "مرحباً بكم", "Welcome (to several people)")
  ]
});
const bun = concept({
  id: "copula-bun",
  term: "bûn",
  phonetic: "im · yî · e · in · in",
  ar: "يكون (فعل الكينونة)",
  en: "to be",
  usageAr: "يربط المبتدأ بخبره: «أنا كردي» = Ez kurd *im*. يُصرَّف مع كل ضمير.",
  usageEn: 'Links the subject to its description: "I am Kurdish" = Ez kurd *im*. It conjugates with every pronoun.',
  usageKu: "Kirdeyê bi nîşaneya wê ve girê dide: Ez kurd *im*.",
  examples: [
    ex("Ez kurd im", "أنا كردي", "I am Kurdish"),
    ex("Tu kurd î", "أنتَ كردي", "You are Kurdish"),
    ex("Ew kurd e", "هو كردي", "He is Kurdish"),
    ex("Em kurd in", "نحن أكراد", "We are Kurds"),
    ex("Hûn kurd in", "أنتم أكراد", "You are Kurds")
  ]
});
const min = concept({
  id: "poss-min",
  term: "Min",
  ar: "ـي (لي)",
  en: "my",
  usageAr: "للملكية: «اسمي» = navê min، «بيتي» = mala min.",
  usageEn: 'For possession: "my name" = navê min, "my house" = mala min.',
  usageKu: "Ji bo xwedîtiyê: navê min, mala min.",
  examples: [
    ex("Navê min Azad e", "اسمي آزاد", "My name is Azad"),
    ex("Mala min li vir e", "بيتي هنا", "My house is here"),
    ex("Bavê min mamoste ye", "أبي معلّم", "My father is a teacher"),
    ex("Hevalên min kurd in", "أصدقائي أكراد", "My friends are Kurds"),
    ex("Ev pirtûka min e", "هذا كتابي", "This is my book")
  ]
});
const te = concept({
  id: "poss-te",
  term: "Te",
  ar: "ـكَ / ـكِ (لك)",
  en: "your (singular)",
  usageAr: "للملكية عند مخاطبة شخص واحد: «اسمك» = navê te.",
  usageEn: 'Possession for one person: "your name" = navê te.',
  usageKu: "Xwedîtiya kesekî: navê te.",
  examples: [
    ex("Navê te çi ye?", "ما اسمك؟", "What is your name?"),
    ex("Mala te li ku ye?", "أين بيتك؟", "Where is your house?"),
    ex("Diya te li malê ye", "أمّك في البيت", "Your mother is at home"),
    ex("Ev pirtûka te ye", "هذا كتابك", "This is your book")
  ]
});
const wi = concept({
  id: "poss-wi",
  term: "Wî",
  ar: "ـهُ (له)",
  en: "his",
  usageAr: "للملكية مع المذكّر: «اسمه» = navê wî.",
  usageEn: 'Possession with a masculine owner: "his name" = navê wî.',
  usageKu: "Xwedîtiya nêr: navê wî.",
  examples: [
    ex("Navê wî Azad e", "اسمه آزاد", "His name is Azad"),
    ex("Kurê wî li dibistanê ye", "ابنه في المدرسة", "His son is at school"),
    ex("Mala wî mezin e", "بيته كبير", "His house is big"),
    ex("Bavê wî kurd e", "أبوه كردي", "His father is Kurdish")
  ]
});
const we = concept({
  id: "poss-we-fem",
  term: "Wê",
  ar: "ـها (لها)",
  en: "her",
  usageAr: "للملكية مع المؤنّث: «اسمها» = navê wê.",
  usageEn: 'Possession with a feminine owner: "her name" = navê wê.',
  usageKu: "Xwedîtiya mê: navê wê.",
  examples: [
    ex("Navê wê Eyşan e", "اسمها عيشان", "Her name is Eyşan"),
    ex("Xwişka wê li vir e", "أختها هنا", "Her sister is here"),
    ex("Mala wê biçûk e", "بيتها صغير", "Her house is small"),
    ex("Pirtûka wê nû ye", "كتابها جديد", "Her book is new")
  ]
});
const me = concept({
  id: "poss-me",
  term: "Me",
  ar: "ـنا (لنا)",
  en: "our",
  usageAr: "للملكية الجماعية: «اسمنا» = navê me، «بلدنا» = welatê me.",
  usageEn: 'Group possession: "our name" = navê me, "our country" = welatê me.',
  usageKu: "Xwedîtiya komekê: navê me, welatê me.",
  examples: [
    ex("Navê me kurd e", "اسمنا كردي", "Our name is Kurdish"),
    ex("Welatê me Kurdistan e", "بلدنا كردستان", "Our country is Kurdistan"),
    ex("Mala me li Amedê ye", "بيتنا في آمد", "Our house is in Amed"),
    ex("Mamosteyê me baş e", "معلّمنا جيّد", "Our teacher is good")
  ]
});
const wePl = concept({
  id: "poss-we-pl",
  term: "We",
  ar: "ـكم / ـكن (لكم)",
  en: "your (plural)",
  usageAr: "للملكية عند مخاطبة أكثر من شخص: «اسمكم» = navê we.",
  usageEn: 'Possession addressing several people: "your name" = navê we.',
  usageKu: "Xwedîtiya çend kesan: navê we.",
  examples: [
    ex("Navê we çi ye?", "ما اسمكم؟", "What is your name?"),
    ex("Mala we li ku ye?", "أين بيتكم؟", "Where is your house?"),
    ex("Zarokên we li dibistanê ne", "أطفالكم في المدرسة", "Your children are at school")
  ]
});
const wan = concept({
  id: "poss-wan",
  term: "Wan",
  ar: "ـهم / ـهن (لهم)",
  en: "their",
  usageAr: "للملكية الجمعية للغائبين: «اسمهم» = navê wan.",
  usageEn: 'Possession of a third-person group: "their name" = navê wan.',
  usageKu: "Xwedîtiya koma sêyem: navê wan.",
  examples: [
    ex("Navê wan kurd e", "اسمهم كردي", "Their name is Kurdish"),
    ex("Mala wan li gund e", "بيتهم في القرية", "Their house is in the village"),
    ex("Hevalên wan hatin", "أصدقاؤهم جاؤوا", "Their friends came")
  ]
});
function pronounExercises() {
  return [
    // Step 2 — comprehension
    q({
      id: "p-q1",
      node: "cmp-ez",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "How do you say “I” in Kurdish?", ar: "كيف تقول «أنا» بالكردية؟", ku: "Tu çawa dibêjî «Ez»?" },
      options: [opt("Ez", "أنا", "I"), opt("Tu", "أنتَ", "you"), opt("Ew", "هو", "he"), opt("Em", "نحن", "we")],
      correct: "Ez"
    }),
    q({
      id: "p-q2",
      node: "cmp-tu",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "How do you say “you” (one person)?", ar: "كيف تقول «أنتَ» بالكردية؟", ku: "Tu çawa dibêjî «Tu»?" },
      options: [opt("Hûn", "أنتم", "you pl"), opt("Ew", "هو", "he"), opt("Tu", "أنتَ", "you"), opt("Em", "نحن", "we")],
      correct: "Tu"
    }),
    q({
      id: "p-q3",
      node: "cmp-ew",
      type: "select_translation",
      direction: "to_arabic",
      display: "Ew nan dixwe",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Ew nan dixwe", "هو يأكل الخبز", "He eats bread"),
        opt("Tu nan dixwî", "أنتَ تأكل الخبز", "You eat bread"),
        opt("Em nan dixwin", "نحن نأكل الخبز", "We eat bread"),
        opt("Ez nan dixwim", "أنا آكل الخبز", "I eat bread")
      ],
      correct: "Ew nan dixwe"
    }),
    q({
      id: "p-q4",
      node: "cmp-em",
      type: "select_translation",
      direction: "to_arabic",
      display: "Em kurd in",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Em kurd in", "نحن أكراد", "We are Kurds"),
        opt("Ez kurd im", "أنا كردي", "I am Kurdish"),
        opt("Tu kurd î", "أنتَ كردي", "You are Kurdish"),
        opt("Ew kurd e", "هو كردي", "He is Kurdish")
      ],
      correct: "Em kurd in"
    }),
    q({
      id: "p-q5",
      node: "cmp-hun",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "How do you say “you” (plural / polite)?", ar: "كيف تقول «أنتم» بالكردية؟", ku: "Tu çawa dibêjî «Hûn»?" },
      options: [opt("Hûn", "أنتم", "you pl"), opt("Tu", "أنتَ", "you"), opt("Em", "نحن", "we"), opt("Ew", "هم", "they")],
      correct: "Hûn"
    }),
    q({
      id: "p-q6",
      node: "cmp-bun",
      type: "complete_sentence",
      display: "Ez kurd ___",
      prompt: { en: "Complete: I am Kurdish.", ar: "أكمل: أنا كردي.", ku: "Temam bike: Ez kurd ___." },
      reference: { en: "I am Kurdish", ar: "أنا كردي", ku: "Ez kurd im" },
      options: [opt("im", "ـم (أنا)", "am"), opt("yî", "ـي (أنتَ)", "are"), opt("e", "ـه (هو)", "is"), opt("in", "ـن (نحن)", "are")],
      correct: "im"
    }),
    q({
      id: "p-q7",
      node: "cmp-min",
      type: "select_translation",
      direction: "to_arabic",
      display: "Mala min",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Mala min", "بيتي", "my house"),
        opt("Mala te", "بيتك", "your house"),
        opt("Mala wî", "بيته", "his house"),
        opt("Mala wê", "بيتها", "her house")
      ],
      correct: "Mala min"
    }),
    // Step 3 — production
    q({
      id: "p-q8",
      node: "prd-ez",
      type: "write_word",
      audioText: "Ez",
      prompt: { en: "Listen and write the word for “I”.", ar: "اسمع 🔊 ثم اكتب كلمة «أنا».", ku: "Guhdarî bike û peyva «Ez» binivîse." },
      reference: { en: "I", ar: "أنا", ku: "Ez" },
      correct: "Ez"
    }),
    q({
      id: "p-q9",
      node: "prd-tu",
      type: "write_word",
      audioText: "Tu",
      prompt: { en: "Listen and write the word for “you”.", ar: "اسمع 🔊 ثم اكتب كلمة «أنتَ».", ku: "Guhdarî bike û peyva «Tu» binivîse." },
      reference: { en: "you", ar: "أنتَ", ku: "Tu" },
      correct: "Tu"
    }),
    q({
      id: "p-q10",
      node: "prd-em",
      type: "write_word",
      audioText: "Em",
      prompt: { en: "Listen and write the word for “we”.", ar: "اسمع 🔊 ثم اكتب كلمة «نحن».", ku: "Guhdarî bike û peyva «Em» binivîse." },
      reference: { en: "we", ar: "نحن", ku: "Em" },
      correct: "Em"
    }),
    q({
      id: "p-q11",
      node: "prd-im",
      type: "write_word",
      audioText: "im",
      prompt: { en: "Listen and write the ending of “Ez kurd …” (I am).", ar: "اسمع 🔊 ثم اكتب نهاية «أنا كردي».", ku: "Guhdarî bike û dawiya «Ez kurd …» binivîse." },
      reference: { en: "(I) am", ar: "ـم (أنا)", ku: "im" },
      correct: "im"
    }),
    q({
      id: "p-q12",
      node: "prd-min",
      type: "write_word",
      audioText: "Navê min",
      prompt: { en: "Listen and write “my name”.", ar: "اسمع 🔊 ثم اكتب «اسمي».", ku: "Guhdarî bike û «navê min» binivîse." },
      reference: { en: "my name", ar: "اسمي", ku: "navê min" },
      correct: "navê min",
      variants: ["navê min"]
    }),
    q({
      id: "p-q13",
      node: "prd-xwarin",
      type: "arrange_sentence",
      sentenceWords: ["Ez", "nan", "dixwim"],
      prompt: { en: "Arrange: I eat bread.", ar: "رتّب الكلمات: أنا آكل الخبز.", ku: "Peyvan sererast bike: Ez nan dixwim." },
      reference: { en: "I eat bread", ar: "أنا آكل الخبز", ku: "Ez nan dixwim" },
      correct: "Ez nan dixwim"
    }),
    q({
      id: "p-q14",
      node: "prd-match",
      type: "match_pairs",
      prompt: { en: "Match the pronouns to their meanings.", ar: "طابِق الضمائر مع معانيها.", ku: "Cînavkan bi wateyên wan re bigihîne." },
      pairs: [
        pair("Ez", "أنا", "I"),
        pair("Tu", "أنتَ", "you"),
        pair("Em", "نحن", "we"),
        pair("Hûn", "أنتم", "you pl")
      ],
      correct: "Ez=أنا / Tu=أنتَ / Em=نحن / Hûn=أنتم"
    })
  ];
}
const pronounsLesson = lesson({
  topicId: "pronouns",
  xp: 60,
  title: { en: "Pronouns", ar: "الضمائر", ku: "Cînavk" },
  description: {
    en: "Say “I, you, he/she, we” and “my, your, his…” with real sentences.",
    ar: "تعلّم «أنا، أنتَ، هو/هي، نحن» و«ـي، ـكَ، ـهُ…» بجُمل حقيقية.",
    ku: "«Ez, Tu, Ew, Em» û «min, te, wî…» bi hevokên rast bixwîne."
  },
  concepts: [ez, tu, ew, em, hun, bun, min, te, wi, we, me, wePl, wan],
  summary: {
    rows: [
      { ku: "Ez / Min", ar: "أنا / ـي", en: "I / my" },
      { ku: "Tu / Te", ar: "أنتَ / ـكَ", en: "you / your" },
      { ku: "Ew / Wî · Wê", ar: "هو · هي / ـهُ · ـها", en: "he · she / his · her" },
      { ku: "Em / Me", ar: "نحن / ـنا", en: "we / our" },
      { ku: "Hûn / We", ar: "أنتم / ـكم", en: "you / your (pl)" },
      { ku: "Ew / Wan", ar: "هم / ـهم", en: "they / their" },
      { ku: "im · yî · e · in · in", ar: "أنا · أنتَ · هو · نحن · أنتم", en: "am · are · is · are · are" }
    ]
  },
  exercises: pronounExercises()
});
const infConcept = concept({
  id: "verb-infinitive",
  term: "kirin",
  phonetic: "ـين = المصدر",
  ar: "يفعل (المصدر)",
  en: "to do / to make",
  usageAr: "المصدر ينتهي عادة بـ -in، وهو شكل الفعل الذي تجده في القاموس.",
  usageEn: "The infinitive usually ends in -in; it is the dictionary form you find.",
  usageKu: "Mesder bi gelemperî bi -in bi dawî dibe.",
  examples: [
    ex("kirin", "يفعل", "to do / make"),
    ex("çûn", "يذهب", "to go"),
    ex("xwarin", "يأكل", "to eat"),
    ex("dîtin", "يرى", "to see"),
    ex("axaftin", "يتكلّم", "to speak")
  ]
});
const presentConcept = concept({
  id: "verb-present",
  term: "Ez dikim",
  ar: "أنا أفعل (المضارع)",
  en: "I do (present)",
  usageAr: "للمضارع نأخذ جذر المضارع ونضيف di- في أوله ولاحقة الفاعل في آخره.",
  usageEn: "The present = di- + present stem + personal ending.",
  usageKu: "Dema niha: di- + stûna niha + paşgira kesane.",
  examples: [
    ex("Ez dikim", "أنا أفعل", "I do"),
    ex("Tu dikî", "أنتَ تفعل", "You do"),
    ex("Ew dike", "هو يفعل", "He does"),
    ex("Em dikin", "نحن نفعل", "We do"),
    ex("Hûn dikin", "أنتم تفعلون", "You do (pl)")
  ]
});
const eatConcept = concept({
  id: "verb-eat",
  term: "Ez dixwim",
  ar: "أنا آكل",
  en: "I eat",
  usageAr: "«xwarin» = يأكل؛ مضارعه «dixwـ»: أقول Ez nan dixwim (أنا آكل الخبز).",
  usageEn: "xwarin = to eat; present stem -xw- → Ez nan dixwim (I eat bread).",
  usageKu: "xwarin: stûna niha -xw- → Ez nan dixwim.",
  examples: [
    ex("Ez nan dixwim", "أنا آكل الخبز", "I eat bread"),
    ex("Tu sêvê dixwî", "أنتَ تأكل التفاحة", "You eat the apple"),
    ex("Ew goşt naxwe", "هو لا يأكل اللحم", "He doesn't eat meat"),
    ex("Em taştê dixwin", "نحن نأكل الفطور", "We eat breakfast"),
    ex("Ez avê vedixwim", "أنا أشرب الماء", "I drink water")
  ]
});
const negConcept$1 = concept({
  id: "verb-negation",
  term: "Ez nakim",
  ar: "أنا لا أفعل (النفي)",
  en: "I don't do (negation)",
  usageAr: "للنفي نستبدل di- بـ na-: Ez nakim، Ez naxwim، Ew nake.",
  usageEn: "Negation replaces di- with na-: Ez nakim, Ez naxwim, Ew nake.",
  usageKu: "Neyînî: na- cihê di- digire.",
  examples: [
    ex("Ez nakim", "أنا لا أفعل", "I don't do"),
    ex("Tu nakî", "أنتَ لا تفعل", "You don't do"),
    ex("Ew nake", "هو لا يفعل", "He doesn't do"),
    ex("Ez nan naxwim", "أنا لا آكل الخبز", "I don't eat bread"),
    ex("Ez av venaxwim", "أنا لا أشرب الماء", "I don't drink water")
  ]
});
const pastConcept = concept({
  id: "verb-past",
  term: "Min kir",
  ar: "فعلتُ (الماضي البسيط)",
  en: "I did (simple past)",
  usageAr: "في ماضي الفعل المتعدّي نضع الفاعل بصيغة الميل: Min kir (فعلتُ)، Wî kir (فعلَ).",
  usageEn: "In the transitive past the doer is oblique: Min kir (I did), Wî kir (he did).",
  usageKu: "Di dema borî ya têper de kirde tewandî ye: Min kir, Wî kir.",
  examples: [
    ex("Min kir", "فعلتُ", "I did"),
    ex("Te kir", "فعلتَ", "You did"),
    ex("Wî kir", "فعلَ (هو)", "He did"),
    ex("Wê kir", "فعلتْ (هي)", "She did"),
    ex("Wan kir", "فعلوا", "They did")
  ]
});
function verbExercises() {
  return [
    // comprehension
    q({
      id: "v-q1",
      node: "cmp-infinitive",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "Which word means “to do”?", ar: "أي كلمة تعني «يفعل»؟", ku: "Kîjan peyv wateya «kirin»ê dide?" },
      options: [opt("kirin", "يفعل", "to do"), opt("çûn", "يذهب", "to go"), opt("dîtin", "يرى", "to see"), opt("xwarin", "يأكل", "to eat")],
      correct: "kirin"
    }),
    q({
      id: "v-q2",
      node: "cmp-present",
      type: "select_translation",
      direction: "to_arabic",
      display: "Ez dikim",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Ez dikim", "أنا أفعل", "I do"),
        opt("Tu dikî", "أنتَ تفعل", "You do"),
        opt("Ew dike", "هو يفعل", "He does"),
        opt("Em dikin", "نحن نفعل", "We do")
      ],
      correct: "Ez dikim"
    }),
    q({
      id: "v-q3",
      node: "cmp-eat",
      type: "select_translation",
      direction: "to_arabic",
      display: "Ew sêvê dixwe",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Ew sêvê dixwe", "هو يأكل التفاحة", "He eats the apple"),
        opt("Ez sêvê dixwim", "أنا آكل التفاحة", "I eat the apple"),
        opt("Tu sêvê dixwî", "أنتَ تأكل التفاحة", "You eat the apple"),
        opt("Em sêvê dixwin", "نحن نأكل التفاحة", "We eat the apple")
      ],
      correct: "Ew sêvê dixwe"
    }),
    q({
      id: "v-q4",
      node: "cmp-neg",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "How do you say “I don’t eat bread”?", ar: "كيف تقول «أنا لا آكل الخبز»؟", ku: "Tu çawa dibêjî «Ez nan naxwim»?" },
      options: [
        opt("Ez nan naxwim", "أنا لا آكل الخبز", "I don't eat bread"),
        opt("Ez nan dixwim", "أنا آكل الخبز", "I eat bread"),
        opt("Tu nan dixwî", "أنتَ تأكل الخبز", "You eat bread"),
        opt("Em nan dixwin", "نحن نأكل الخبز", "We eat bread")
      ],
      correct: "Ez nan naxwim"
    }),
    q({
      id: "v-q5",
      node: "cmp-past",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "How do you say “I did”?", ar: "كيف تقول «فعلتُ»؟", ku: "Tu çawa dibêjî «Min kir»?" },
      options: [
        opt("Min kir", "فعلتُ", "I did"),
        opt("Te kir", "فعلتَ", "You did"),
        opt("Wî kir", "فعلَ", "He did"),
        opt("Wan kir", "فعلوا", "They did")
      ],
      correct: "Min kir"
    }),
    // production
    q({
      id: "v-q6",
      node: "prd-dikim",
      type: "write_word",
      audioText: "Ez dikim",
      prompt: { en: "Listen and write “I do”.", ar: "اسمع 🔊 ثم اكتب «أنا أفعل».", ku: "Guhdarî bike û «Ez dikim» binivîse." },
      reference: { en: "I do", ar: "أنا أفعل", ku: "Ez dikim" },
      correct: "ez dikim"
    }),
    q({
      id: "v-q7",
      node: "prd-dixwim",
      type: "write_word",
      audioText: "Ez dixwim",
      prompt: { en: "Listen and write “I eat”.", ar: "اسمع 🔊 ثم اكتب «أنا آكل».", ku: "Guhdarî bike û «Ez dixwim» binivîse." },
      reference: { en: "I eat", ar: "أنا آكل", ku: "Ez dixwim" },
      correct: "ez dixwim"
    }),
    q({
      id: "v-q8",
      node: "prd-naxwim",
      type: "write_word",
      audioText: "Ez naxwim",
      prompt: { en: "Listen and write “I don’t eat”.", ar: "اسمع 🔊 ثم اكتب «أنا لا آكل».", ku: "Guhdarî bike û «Ez naxwim» binivîse." },
      reference: { en: "I don't eat", ar: "أنا لا آكل", ku: "Ez naxwim" },
      correct: "ez naxwim"
    }),
    q({
      id: "v-q9",
      node: "prd-kir",
      type: "write_word",
      audioText: "Min kir",
      prompt: { en: "Listen and write “I did”.", ar: "اسمع 🔊 ثم اكتب «فعلتُ».", ku: "Guhdarî bike û «Min kir» binivîse." },
      reference: { en: "I did", ar: "فعلتُ", ku: "Min kir" },
      correct: "min kir"
    }),
    q({
      id: "v-q10",
      node: "prd-arrange",
      type: "arrange_sentence",
      sentenceWords: ["Ez", "nan", "naxwim"],
      prompt: { en: "Arrange: I don’t eat bread.", ar: "رتّب: أنا لا آكل الخبز.", ku: "Sererast bike: Ez nan naxwim." },
      reference: { en: "I don't eat bread", ar: "أنا لا آكل الخبز", ku: "Ez nan naxwim" },
      correct: "Ez nan naxwim"
    }),
    q({
      id: "v-q11",
      node: "prd-match",
      type: "match_pairs",
      prompt: { en: "Match the verb forms.", ar: "طابِق صيَغ الفعل.", ku: "Formên lêkerê bigihîne." },
      pairs: [
        pair("kirin", "يفعل", "to do"),
        pair("Ez dikim", "أنا أفعل", "I do"),
        pair("Ez naxwim", "أنا لا آكل", "I don't eat"),
        pair("Min kir", "فعلتُ", "I did")
      ],
      correct: "kirin=يفعل / Ez dikim=أنا أفعل / Ez naxwim=أنا لا آكل / Min kir=فعلتُ"
    }),
    q({
      id: "v-q12",
      node: "cmp-drink",
      type: "complete_sentence",
      display: "Ez avê ___",
      prompt: { en: "Complete: I drink water.", ar: "أكمل: أنا أشرب الماء.", ku: "Temam bike: Ez avê ___." },
      reference: { en: "I drink water", ar: "أنا أشرب الماء", ku: "Ez avê vedixwim" },
      options: [opt("vedixwim", "أشرب", "I drink"), opt("dixwim", "آكل", "I eat"), opt("naxwim", "لا آكل", "I don't eat"), opt("dikim", "أفعل", "I do")],
      correct: "vedixwim"
    })
  ];
}
const verbsLesson = lesson({
  topicId: "verbs",
  xp: 60,
  title: { en: "Verbs", ar: "الأفعال", ku: "Lêker" },
  description: {
    en: "The infinitive, the present tense, negation and the simple past.",
    ar: "المصدر والمضارع والنفي والماضي البسيط.",
    ku: "Mesder, dema niha, neyînî û dema borî."
  },
  concepts: [infConcept, presentConcept, eatConcept, negConcept$1, pastConcept],
  summary: {
    rows: [
      { ku: "kirin · çûn · xwarin", ar: "يفعل · يذهب · يأكل", en: "do · go · eat" },
      { ku: "Ez dikim", ar: "أنا أفعل", en: "I do" },
      { ku: "Ez dixwim", ar: "أنا آكل", en: "I eat" },
      { ku: "Ez nakim", ar: "أنا لا أفعل", en: "I don't do" },
      { ku: "Ez naxwim", ar: "أنا لا آكل", en: "I don't eat" },
      { ku: "Min kir", ar: "فعلتُ", en: "I did" }
    ]
  },
  exercises: verbExercises()
});
const genderConcept = concept({
  id: "noun-gender",
  term: "nêr / mê",
  ar: "مذكّر / مؤنّث",
  en: "masculine / feminine",
  usageAr: "كل اسم كردي مذكّر أو مؤنّث، ولا قاعدة سهلة من المعنى — احفظ الجنس مع كل كلمة.",
  usageEn: "Every noun is masculine or feminine, with no simple meaning rule — learn the gender with each word.",
  usageKu: "Her navdêr nêr an mê ye; bi her peyvê re zayendê fêr bibe.",
  examples: [
    ex("nan (nêr)", "خبز (مذكّر)", "bread (masc.)"),
    ex("mal (mê)", "بيت (مؤنّث)", "house (fem.)"),
    ex("kur (nêr)", "ولد (مذكّر)", "boy (masc.)"),
    ex("keç (mê)", "بنت (مؤنّث)", "girl (fem.)"),
    ex("sêv (mê)", "تفاحة (مؤنّث)", "apple (fem.)")
  ]
});
const izafeMascConcept = concept({
  id: "noun-izafe-masc",
  term: "navê min",
  ar: "اسمي (إضافة المذكّر)",
  en: "my name (masculine izafe)",
  usageAr: "لربط اسم مذكّر بمالكه نضيف -ê: nav-ê min، kur-ê te.",
  usageEn: "A masculine noun links to its possessor with -ê: nav-ê min, kur-ê te.",
  usageKu: "Navdêra nêr bi -ê ve bi xwedî re girê dibe: nav-ê min.",
  examples: [
    ex("navê min", "اسمي", "my name"),
    ex("kurê te", "ابنك", "your son"),
    ex("bavê wî", "أبوه", "his father"),
    ex("hevalê me", "صديقنا", "our friend"),
    ex("mamosteyê wan", "معلّمهم", "their teacher")
  ]
});
const izafeFemConcept = concept({
  id: "noun-izafe-fem",
  term: "mala min",
  ar: "بيتي (إضافة المؤنّث)",
  en: "my house (feminine izafe)",
  usageAr: "لربط اسم مؤنّث بمالكه نضيف -a: mal-a min، xwişk-a te.",
  usageEn: "A feminine noun links to its possessor with -a: mal-a min, xwişk-a te.",
  usageKu: "Navdêra mê bi -a ve bi xwedî re girê dibe: mal-a min.",
  examples: [
    ex("mala min", "بيتي", "my house"),
    ex("xwişka te", "أختك", "your sister"),
    ex("diya wî", "أمّه", "his mother"),
    ex("pirtûka wê", "كتابها", "her book"),
    ex("keça me", "بنتنا", "our daughter")
  ]
});
const izafePluralConcept = concept({
  id: "noun-izafe-plural",
  term: "hevalên min",
  ar: "أصدقائي (إضافة الجمع)",
  en: "my friends (plural izafe)",
  usageAr: "الجمع يربط مالكه بـ -ên دائماً (للمذكّر والمؤنّث): heval-ên min.",
  usageEn: "Plural nouns always link with -ên: heval-ên min.",
  usageKu: "Pirjimar bi -ên ve girê dibe: heval-ên min.",
  examples: [
    ex("hevalên min", "أصدقائي", "my friends"),
    ex("pirtûkên te", "كتبك", "your books"),
    ex("zarokên wê", "أطفالها", "her children"),
    ex("gundên me", "قرانا", "our villages"),
    ex("mamosteyên wan", "معلّموهم", "their teachers")
  ]
});
const objectConcept = concept({
  id: "noun-object",
  term: "Ez sêvê dixwim",
  ar: "آكل التفاحة (المفعول)",
  en: "I eat the apple (object)",
  usageAr: "المفعول به في المضارع يكون بصيغة الميل: المؤنّث يضيف -ê (sêvê)، والمذكّر يبقى كما هو (nan).",
  usageEn: "The present-tense object is oblique: feminine adds -ê (sêvê); masculine is unchanged (nan).",
  usageKu: "Tebata dema niha tewandî ye: mê -ê (sêvê), nêr wek xwe (nan).",
  examples: [
    ex("Ez sêvê dixwim", "أنا آكل التفاحة", "I eat the apple"),
    ex("Ez nan dixwim", "أنا آكل الخبز", "I eat the bread"),
    ex("Tu avê vedixwî", "أنتَ تشرب الماء", "You drink the water"),
    ex("Ew pirtûkê dixwîne", "هو يقرأ الكتاب", "He reads the book")
  ]
});
function nounExercises() {
  return [
    // comprehension
    q({
      id: "n-q1",
      node: "cmp-gender",
      type: "match_pairs",
      prompt: { en: "Match each noun to its gender.", ar: "طابِق كل اسم مع جنسه.", ku: "Her navdêrê bi zayenda wê re bigihîne." },
      pairs: [
        pair("nan", "خبز (مذكّر)", "bread (masc.)"),
        pair("mal", "بيت (مؤنّث)", "house (fem.)"),
        pair("kur", "ولد (مذكّر)", "boy (masc.)"),
        pair("keç", "بنت (مؤنّث)", "girl (fem.)")
      ],
      correct: "nan=خبز (مذكّر) / mal=بيت (مؤنّث) / kur=ولد (مذكّر) / keç=بنت (مؤنّث)"
    }),
    q({
      id: "n-q2",
      node: "cmp-mala",
      type: "select_translation",
      direction: "to_arabic",
      display: "mala min",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("mala min", "بيتي", "my house"),
        opt("mala te", "بيتك", "your house"),
        opt("mala wî", "بيته", "his house"),
        opt("mala wê", "بيتها", "her house")
      ],
      correct: "mala min"
    }),
    q({
      id: "n-q3",
      node: "cmp-nave",
      type: "select_translation",
      direction: "to_arabic",
      display: "navê min",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("navê min", "اسمي", "my name"),
        opt("nava min", "داخلي", "inside me"),
        opt("nav min", "(بلا معنى)", "(no meaning)"),
        opt("navên min", "أسمائي", "my names")
      ],
      correct: "navê min"
    }),
    q({
      id: "n-q4",
      node: "cmp-hevalen",
      type: "select_translation",
      direction: "to_arabic",
      display: "hevalên min",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("hevalên min", "أصدقائي", "my friends"),
        opt("hevalê min", "صديقي", "my friend (masc.)"),
        opt("hevala min", "صديقتي", "my friend (fem.)"),
        opt("hevalan", "الأصدقاء (ميل)", "friends (oblique)")
      ],
      correct: "hevalên min"
    }),
    q({
      id: "n-q5",
      node: "cmp-seve",
      type: "select_translation",
      direction: "to_arabic",
      display: "Ez sêvê dixwim",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Ez sêvê dixwim", "أنا آكل التفاحة", "I eat the apple"),
        opt("Ez nan dixwim", "أنا آكل الخبز", "I eat the bread"),
        opt("Tu sêvê dixwî", "أنتَ تأكل التفاحة", "You eat the apple"),
        opt("Ew sêvê dixwe", "هو يأكل التفاحة", "He eats the apple")
      ],
      correct: "Ez sêvê dixwim"
    }),
    // production
    q({
      id: "n-q6",
      node: "prd-mala",
      type: "write_word",
      audioText: "mala min",
      prompt: { en: "Listen and write “my house”.", ar: "اسمع 🔊 ثم اكتب «بيتي».", ku: "Guhdarî bike û «mala min» binivîse." },
      reference: { en: "my house", ar: "بيتي", ku: "mala min" },
      correct: "mala min"
    }),
    q({
      id: "n-q7",
      node: "prd-nave",
      type: "write_word",
      audioText: "navê min",
      prompt: { en: "Listen and write “my name”.", ar: "اسمع 🔊 ثم اكتب «اسمي».", ku: "Guhdarî bike û «navê min» binivîse." },
      reference: { en: "my name", ar: "اسمي", ku: "navê min" },
      correct: "navê min"
    }),
    q({
      id: "n-q8",
      node: "prd-hevalen",
      type: "write_word",
      audioText: "hevalên min",
      prompt: { en: "Listen and write “my friends”.", ar: "اسمع 🔊 ثم اكتب «أصدقائي».", ku: "Guhdarî bike û «hevalên min» binivîse." },
      reference: { en: "my friends", ar: "أصدقائي", ku: "hevalên min" },
      correct: "hevalên min"
    }),
    q({
      id: "n-q9",
      node: "prd-arrange",
      type: "arrange_sentence",
      sentenceWords: ["Ez", "sêvê", "dixwim"],
      prompt: { en: "Arrange: I eat the apple.", ar: "رتّب: أنا آكل التفاحة.", ku: "Sererast bike: Ez sêvê dixwim." },
      reference: { en: "I eat the apple", ar: "أنا آكل التفاحة", ku: "Ez sêvê dixwim" },
      correct: "Ez sêvê dixwim"
    }),
    q({
      id: "n-q10",
      node: "cmp-match-izafe",
      type: "match_pairs",
      prompt: { en: "Match each form to its meaning.", ar: "طابِق كل صيغة مع معناها.", ku: "Her formê bi wateya wê re bigihîne." },
      pairs: [
        pair("navê min", "اسمي", "my name"),
        pair("mala wê", "بيتها", "her house"),
        pair("hevalên me", "أصدقاؤنا", "our friends"),
        pair("pirtûka te", "كتابك", "your book")
      ],
      correct: "navê min=اسمي / mala wê=بيتها / hevalên me=أصدقاؤنا / pirtûka te=كتابك"
    })
  ];
}
const nounsLesson = lesson({
  topicId: "nouns",
  xp: 60,
  title: { en: "Nouns", ar: "الأسماء", ku: "Navdêr" },
  description: {
    en: "Gender and the “izafe” link that shows who owns what.",
    ar: "الجنس ورابط الإضافة الذي يُظهر الملكية.",
    ku: "Zayend û girêdana îzafeyê."
  },
  concepts: [genderConcept, izafeMascConcept, izafeFemConcept, izafePluralConcept, objectConcept],
  summary: {
    rows: [
      { ku: "nav (nêr) → navê min", ar: "اسم → اسمي", en: "name → my name" },
      { ku: "mal (mê) → mala min", ar: "بيت → بيتي", en: "house → my house" },
      { ku: "heval → hevalên min", ar: "أصدقاء → أصدقائي", en: "friends → my friends" },
      { ku: "Ez sêvê dixwim", ar: "أنا آكل التفاحة", en: "I eat the apple" },
      { ku: "Ez nan dixwim", ar: "أنا آكل الخبز", en: "I eat the bread" }
    ]
  },
  exercises: nounExercises()
});
const sovConcept = concept({
  id: "sent-sov",
  term: "Ez nan dixwim",
  ar: "آكل الخبز (فاعل + مفعول + فعل)",
  en: "I eat bread (Subject–Object–Verb)",
  usageAr: "الترتيب الكردي هو: الفاعل ثم المفعول ثم الفعل في النهاية.",
  usageEn: "Kurdish order is Subject–Object–Verb: the verb comes last.",
  usageKu: "Rêz: kirde + tebat + lêker (li dawiyê).",
  examples: [
    ex("Ez nan dixwim", "أنا آكل الخبز", "I eat bread"),
    ex("Tu avê vedixwî", "أنتَ تشرب الماء", "You drink water"),
    ex("Ew sêvê dixwe", "هو يأكل التفاحة", "He eats the apple"),
    ex("Em kurdî diaxivin", "نحن نتكلّم الكردية", "We speak Kurdish"),
    ex("Hûn pirtûkê dixwînin", "أنتم تقرؤون الكتاب", "You read the book")
  ]
});
const verbLastConcept = concept({
  id: "sent-verb-last",
  term: "Ez li dibistanê dixwînim",
  ar: "أدرس في المدرسة",
  en: "I study at school",
  usageAr: "شبه الجملة (المكان) تأتي قبل الفعل، ويبقى الفعل في آخر الجملة.",
  usageEn: "Place phrases come before the verb; the verb stays last.",
  usageKu: "Komika cihî berî lêkerê ye; lêker li dawiyê ye.",
  examples: [
    ex("Ez li dibistanê dixwînim", "أنا أدرس في المدرسة", "I study at school"),
    ex("Ew li malê dixwe", "هو يأكل في البيت", "He eats at home"),
    ex("Em li bazarê dikirin", "نحن نشتري في السوق", "We shop at the market"),
    ex("Tu li Amedê dijî", "أنتَ تعيش في آمد", "You live in Amed")
  ]
});
const negConcept = concept({
  id: "sent-negation",
  term: "Ez nan naxwim",
  ar: "لا آكل الخبز (النفي)",
  en: "I don't eat bread (negation)",
  usageAr: "النفي يوضع على الفعل نفسه (na- في أول الفعل): naxwim = لا آكل.",
  usageEn: "Negation goes on the verb itself (na- prefix): naxwim = don’t eat.",
  usageKu: "Neyînî li ser lêkerê ye: naxwim.",
  examples: [
    ex("Ez nan naxwim", "أنا لا آكل الخبز", "I don't eat bread"),
    ex("Tu av venaxwî", "أنتَ لا تشرب الماء", "You don't drink water"),
    ex("Ew kurdî nizane", "هو لا يعرف الكردية", "He doesn't know Kurdish"),
    ex("Em naçin dibistanê", "نحن لا نذهب إلى المدرسة", "We don't go to school")
  ]
});
const toBeConcept = concept({
  id: "sent-to-be",
  term: "Ez mamoste me",
  ar: "أنا معلّم (جملة الكينونة)",
  en: "I am a teacher (to be)",
  usageAr: "مع «يكون» نضع الخبر بعد المبتدأ مباشرة: Ez mamoste me.",
  usageEn: 'With "to be", the description follows the subject directly: Ez mamoste me.',
  usageKu: "Bi «bûn»ê re nîşane piştî kirdeyê ye: Ez mamoste me.",
  examples: [
    ex("Ez mamoste me", "أنا معلّم", "I am a teacher"),
    ex("Tu şagirt î", "أنتَ طالب", "You are a student"),
    ex("Ew bijîşk e", "هو طبيب", "He is a doctor"),
    ex("Em kurd in", "نحن أكراد", "We are Kurds"),
    ex("Ew mal mezin e", "ذلك البيت كبير", "That house is big")
  ]
});
function sentenceExercises() {
  return [
    // comprehension
    q({
      id: "s-q1",
      node: "cmp-sov",
      type: "select_translation",
      direction: "to_arabic",
      display: "Ez nan dixwim",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Ez nan dixwim", "أنا آكل الخبز", "I eat bread"),
        opt("Nan ez dixwim", "الخبز أنا آكل", "Bread I eat"),
        opt("Ez dixwim nan", "أنا آكل الخبز (ترتيب خاطئ)", "I eat bread (wrong order)"),
        opt("Dixwim ez nan", "(ترتيب خاطئ)", "(wrong order)")
      ],
      correct: "Ez nan dixwim"
    }),
    q({
      id: "s-q2",
      node: "cmp-neg",
      type: "select_translation",
      direction: "to_arabic",
      display: "Ez nan naxwim",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Ez nan naxwim", "أنا لا آكل الخبز", "I don't eat bread"),
        opt("Ez nan dixwim", "أنا آكل الخبز", "I eat bread"),
        opt("Nan ez naxwim", "الخبز أنا لا آكل", "Bread I don’t eat"),
        opt("Ez naxwim nan", "(ترتيب خاطئ)", "(wrong order)")
      ],
      correct: "Ez nan naxwim"
    }),
    q({
      id: "s-q3",
      node: "cmp-verb",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "Where does the verb go in a Kurdish sentence?", ar: "أين يوضع الفعل في الجملة الكردية؟", ku: "Lêker li ku ye?" },
      options: [
        opt("di dawiyê de", "في النهاية", "at the end"),
        opt("di destpêkê de", "في البداية", "at the start"),
        opt("di nîvê de", "في الوسط", "in the middle"),
        opt("her cihê", "في أي مكان", "anywhere")
      ],
      correct: "di dawiyê de"
    }),
    q({
      id: "s-q4",
      node: "cmp-av",
      type: "select_translation",
      direction: "to_arabic",
      display: "Tu avê vedixwî",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Tu avê vedixwî", "أنتَ تشرب الماء", "You drink water"),
        opt("Ez avê vedixwim", "أنا أشرب الماء", "I drink water"),
        opt("Ew avê vedixwe", "هو يشرب الماء", "He drinks water"),
        opt("Em avê vedixwin", "نحن نشرب الماء", "We drink water")
      ],
      correct: "Tu avê vedixwî"
    }),
    // production
    q({
      id: "s-q5",
      node: "prd-nan",
      type: "arrange_sentence",
      sentenceWords: ["Ez", "nan", "dixwim"],
      prompt: { en: "Arrange: I eat bread.", ar: "رتّب: أنا آكل الخبز.", ku: "Sererast bike: Ez nan dixwim." },
      reference: { en: "I eat bread", ar: "أنا آكل الخبز", ku: "Ez nan dixwim" },
      correct: "Ez nan dixwim"
    }),
    q({
      id: "s-q6",
      node: "prd-neg",
      type: "arrange_sentence",
      sentenceWords: ["Ez", "nan", "naxwim"],
      prompt: { en: "Arrange: I don’t eat bread.", ar: "رتّب: أنا لا آكل الخبز.", ku: "Sererast bike: Ez nan naxwim." },
      reference: { en: "I don't eat bread", ar: "أنا لا آكل الخبز", ku: "Ez nan naxwim" },
      correct: "Ez nan naxwim"
    }),
    q({
      id: "s-q7",
      node: "prd-naxwim",
      type: "write_word",
      audioText: "Ez nan naxwim",
      prompt: { en: "Listen and write “I don’t eat bread”.", ar: "اسمع 🔊 ثم اكتب «أنا لا آكل الخبز».", ku: "Guhdarî bike û «Ez nan naxwim» binivîse." },
      reference: { en: "I don't eat bread", ar: "أنا لا آكل الخبز", ku: "Ez nan naxwim" },
      correct: "ez nan naxwim"
    }),
    q({
      id: "s-q8",
      node: "prd-mamoste",
      type: "complete_sentence",
      display: "Ez ___ me",
      prompt: { en: "Complete with the right word: I am a teacher.", ar: "أكمل: أنا معلّم.", ku: "Temam bike: Ez ___ me." },
      reference: { en: "I am a teacher", ar: "أنا معلّم", ku: "Ez mamoste me" },
      options: [opt("mamoste", "معلّم", "teacher"), opt("şagirt", "طالب", "student"), opt("bijîşk", "طبيب", "doctor"), opt("kurd", "كردي", "Kurd")],
      correct: "mamoste"
    }),
    q({
      id: "s-q9",
      node: "prd-av",
      type: "write_word",
      audioText: "Ez avê vedixwim",
      prompt: { en: "Listen and write “I drink water”.", ar: "اسمع 🔊 ثم اكتب «أنا أشرب الماء».", ku: "Guhdarî bike û «Ez avê vedixwim» binivîse." },
      reference: { en: "I drink water", ar: "أنا أشرب الماء", ku: "Ez avê vedixwim" },
      correct: "ez avê vedixwim",
      variants: ["ez ave vedixwim"]
    })
  ];
}
const sentenceStructureLesson = lesson({
  topicId: "sentence-structure",
  xp: 60,
  title: { en: "Sentence Structure", ar: "تركيب الجملة", ku: "Hevoksazî" },
  description: {
    en: "The Subject–Object–Verb order and how negation fits in.",
    ar: "ترتيب الفاعل–المفعول–الفعل وكيف يدخل النفي.",
    ku: "Rêza kirde–tebat–lêker û cihê neyîniyê."
  },
  concepts: [sovConcept, verbLastConcept, negConcept, toBeConcept],
  summary: {
    rows: [
      { ku: "Ez nan dixwim", ar: "أنا آكل الخبز", en: "I eat bread" },
      { ku: "Ez nan naxwim", ar: "أنا لا آكل الخبز", en: "I don't eat bread" },
      { ku: "Tu avê vedixwî", ar: "أنتَ تشرب الماء", en: "You drink water" },
      { ku: "Ez mamoste me", ar: "أنا معلّم", en: "I am a teacher" }
    ]
  },
  exercises: sentenceExercises()
});
const li = concept({
  id: "prep-li",
  term: "li",
  ar: "في / عند / إلى",
  en: "at / in / to",
  usageAr: '"li" مع مكان: خانه, مدرسة… تُستخدم كثيراً مع "bûn" (يكون) مثل li malê (في البيت).',
  usageEn: '"li" with places: li malê (at home), li dibistanê (at school).',
  usageKu: "li + cih: li malê, li dibistanê.",
  examples: [
    ex("Ez li malê me", "أنا في البيت", "I am at home"),
    ex("Ew li dibistanê ye", "هو في المدرسة", "He is at school"),
    ex("Tu li ku yî?", "أين أنتَ؟", "Where are you?"),
    ex("Em li Amedê ne", "نحن في آمد", "We are in Amed")
  ]
});
const ji = concept({
  id: "prep-ji",
  term: "ji",
  ar: "من / عن",
  en: "from / of",
  usageAr: '"ji" تعني المصدر أو الانتماء: ji min (منّي)، Ez ji Dihokê me (أنا من دهوك).',
  usageEn: '"ji" for origin/possession: ji min (from me), Ez ji Dihokê me (I’m from Duhok).',
  usageKu: "ji + çavkanî: Ez ji Dihokê me.",
  examples: [
    ex("Ez ji Amedê me", "أنا من آمد", "I am from Amed"),
    ex("Tu ji Dihokê yî", "أنتَ من دهوك", "You are from Duhok"),
    ex("Ew ji gund e", "هو من القرية", "He is from the village"),
    ex("Ev ji min re ye", "هذا لي", "This is for me")
  ]
});
const bi = concept({
  id: "prep-bi",
  term: "bi",
  ar: "بـ / بواسطة",
  en: "with / by means of",
  usageAr: '"bi" للأداة أو الوسيلة: bi pênûsê (بالقلم)، bi gerrokê (بالسيارة).',
  usageEn: '"bi" for instrument: bi pênûsê (with a pen), bi gerrokê (by car).',
  usageKu: "bi + alav: bi pênûsê, bi gerrokê.",
  examples: [
    ex("Ez bi pênûsê dinivîsim", "أنا أكتب بالقلم", "I write with a pen"),
    ex("Ew bi gerrokê diçe", "هو يذهب بالسيارة", "He goes by car"),
    ex("Em bi kurdî diaxivin", "نحن نتكلّم بالكردية", "We speak in Kurdish"),
    ex("Tu bi hevalê xwe re diçî", "أنتَ تذهب مع صديقك", "You go with your friend")
  ]
});
const diDe = concept({
  id: "prep-di-de",
  term: "di … de",
  ar: "في / داخل (إحاطة)",
  en: "in / inside (circumposition)",
  usageAr: '"di…de" تحيط بالمكان: di malê de (في البيت)، di odeyê de (في الغرفة).',
  usageEn: '"di…de" wraps the place: di malê de (in the house), di odeyê de (in the room).',
  usageKu: "di…de cihê dipêçe: di malê de, di odeyê de.",
  examples: [
    ex("Di odeyê de masek heye", "في الغرفة طاولة", "There is a table in the room"),
    ex("Ez di malê de me", "أنا في البيت", "I am in the house"),
    ex("Pirtûk di çanteyê de ye", "الكتاب في الحقيبة", "The book is in the bag"),
    ex("Em di baxçeyê de ne", "نحن في الحديقة", "We are in the garden")
  ]
});
const ser = concept({
  id: "prep-ser",
  term: "ser",
  ar: "فوق / على",
  en: "on / on top of",
  usageAr: '"ser" تعني فوق شيء: ser maseyê (على الطاولة).',
  usageEn: '"ser" = on (top of): ser maseyê (on the table).',
  usageKu: "ser = li ser tiştekî: ser maseyê.",
  examples: [
    ex("Pirtûk li ser maseyê ye", "الكتاب على الطاولة", "The book is on the table"),
    ex("Sêv li ser sindoqê ye", "التفاحة على الصندوق", "The apple is on the box"),
    ex("Ez li ser kursîyê rûniştim", "أنا جلست على الكرسي", "I sat on the chair")
  ]
});
const bin = concept({
  id: "prep-bin",
  term: "bin",
  ar: "تحت",
  en: "under",
  usageAr: '"bin" تعني تحت شيء: bin maseyê (تحت الطاولة).',
  usageEn: '"bin" = under: bin maseyê (under the table).',
  usageKu: "bin = di bin tiştekî de: bin maseyê.",
  examples: [
    ex("Pisîk di bin maseyê de ye", "القطة تحت الطاولة", "The cat is under the table"),
    ex("Gog di bin kursîyê de ye", "الكرة تحت الكرسي", "The ball is under the chair"),
    ex("Ez li bin darê me", "أنا تحت الشجرة", "I am under the tree")
  ]
});
const ber = concept({
  id: "prep-ber",
  term: "ber",
  ar: "أمام",
  en: "in front of",
  usageAr: '"ber" تعني أمام شيء: ber malê (أمام البيت).',
  usageEn: '"ber" = in front of: ber malê (in front of the house).',
  usageKu: "ber = li pêş tiştekî: ber malê.",
  examples: [
    ex("Ez li ber malê me", "أنا أمام البيت", "I am in front of the house"),
    ex("Gerrok li ber dibistanê ye", "السيارة أمام المدرسة", "The car is in front of the school"),
    ex("Ew li ber derî ye", "هو أمام الباب", "He is in front of the door")
  ]
});
const nav = concept({
  id: "prep-nav",
  term: "nav",
  ar: "داخل / بين",
  en: "inside / among",
  usageAr: '"nav" تعني داخل أو بين: di nav avê de (داخل الماء).',
  usageEn: '"nav" = inside/among: di nav avê de (in the water).',
  usageKu: "nav = di nav de: di nav avê de.",
  examples: [
    ex("Masî di nav avê de ye", "السمكة في الماء", "The fish is in the water"),
    ex("Tu di nav hevalan de yî", "أنتَ بين الأصدقاء", "You are among friends"),
    ex("Em di nav baxçeyê de ne", "نحن داخل الحديقة", "We are inside the garden")
  ]
});
function prepExercises() {
  return [
    // comprehension
    q({
      id: "pp-q1",
      node: "cmp-li",
      type: "match_pairs",
      prompt: { en: "Match each preposition to its meaning.", ar: "طابِق كل حرف جر مع معناه.", ku: "Her daçekê bi wateya wê re bigihîne." },
      pairs: [
        pair("li", "في / عند", "at / in"),
        pair("ji", "من / عن", "from / of"),
        pair("ser", "فوق / على", "on / on top"),
        pair("bin", "تحت", "under")
      ],
      correct: "li=في / عند / ji=من / عن / ser=فوق / على / bin=تحت"
    }),
    q({
      id: "pp-q2",
      node: "cmp-ji",
      type: "select_translation",
      direction: "to_arabic",
      display: "Ez ji Amedê me",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Ez ji Amedê me", "أنا من آمد", "I am from Amed"),
        opt("Ez li Amedê me", "أنا في آمد", "I am in Amed"),
        opt("Ez bi Amedê me", "أنا مع آمد", "I am with Amed"),
        opt("Ez di Amedê de me", "أنا داخل آمد", "I am inside Amed")
      ],
      correct: "Ez ji Amedê me"
    }),
    q({
      id: "pp-q3",
      node: "cmp-ser",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "Which word means “on / on top of”?", ar: "أي كلمة تعني «فوق / على»؟", ku: "Kîjan peyv wateya «ser» dide?" },
      options: [
        opt("ser", "فوق / على", "on / on top"),
        opt("bin", "تحت", "under"),
        opt("ber", "أمام", "in front"),
        opt("nav", "داخل", "inside")
      ],
      correct: "ser"
    }),
    q({
      id: "pp-q4",
      node: "cmp-bin",
      type: "select_translation",
      direction: "to_kurdish",
      prompt: { en: "Which word means “under”?", ar: "أي كلمة تعني «تحت»؟", ku: "Kîjan peyv wateya «bin» dide?" },
      options: [
        opt("bin", "تحت", "under"),
        opt("ser", "فوق", "on"),
        opt("ber", "أمام", "in front"),
        opt("ji", "من", "from")
      ],
      correct: "bin"
    }),
    q({
      id: "pp-q5",
      node: "cmp-di",
      type: "select_translation",
      direction: "to_arabic",
      display: "Di odeyê de masek heye",
      prompt: { en: "Choose the correct translation.", ar: "اختر الترجمة الصحيحة.", ku: "Wergera rast hilbijêre." },
      options: [
        opt("Di odeyê de masek heye", "في الغرفة طاولة", "There is a table in the room"),
        opt("Li ser maseyê ye", "هي على الطاولة", "It is on the table"),
        opt("Di bin maseyê de ye", "هي تحت الطاولة", "It is under the table"),
        opt("Li ber odeyê ye", "هي أمام الغرفة", "It is in front of the room")
      ],
      correct: "Di odeyê de masek heye"
    }),
    // production
    q({
      id: "pp-q6",
      node: "prd-li",
      type: "write_word",
      audioText: "li",
      prompt: { en: "Listen and write the word for “at / in”.", ar: "اسمع 🔊 ثم اكتب كلمة «في / عند».", ku: "Guhdarî bike û peyva «li» binivîse." },
      reference: { en: "at / in", ar: "في / عند", ku: "li" },
      correct: "li"
    }),
    q({
      id: "pp-q7",
      node: "prd-ji",
      type: "write_word",
      audioText: "ji",
      prompt: { en: "Listen and write the word for “from”.", ar: "اسمع 🔊 ثم اكتب كلمة «من».", ku: "Guhdarî bike û peyva «ji» binivîse." },
      reference: { en: "from", ar: "من", ku: "ji" },
      correct: "ji"
    }),
    q({
      id: "pp-q8",
      node: "prd-ser",
      type: "write_word",
      audioText: "ser",
      prompt: { en: "Listen and write the word for “on”.", ar: "اسمع 🔊 ثم اكتب كلمة «فوق / على».", ku: "Guhdarî bike û peyva «ser» binivîse." },
      reference: { en: "on", ar: "فوق / على", ku: "ser" },
      correct: "ser"
    }),
    q({
      id: "pp-q9",
      node: "prd-bin",
      type: "write_word",
      audioText: "bin",
      prompt: { en: "Listen and write the word for “under”.", ar: "اسمع 🔊 ثم اكتب كلمة «تحت».", ku: "Guhdarî bike û peyva «bin» binivîse." },
      reference: { en: "under", ar: "تحت", ku: "bin" },
      correct: "bin"
    }),
    q({
      id: "pp-q10",
      node: "prd-ji-amede",
      type: "write_word",
      audioText: "Ez ji Amedê me",
      prompt: { en: "Listen and write “I am from Amed”.", ar: "اسمع 🔊 ثم اكتب «أنا من آمد».", ku: "Guhdarî bike û «Ez ji Amedê me» binivîse." },
      reference: { en: "I am from Amed", ar: "أنا من آمد", ku: "Ez ji Amedê me" },
      correct: "ez ji amedê me",
      variants: ["ez ji amede me"]
    }),
    q({
      id: "pp-q11",
      node: "prd-arrange",
      type: "arrange_sentence",
      sentenceWords: ["Pirtûk", "li", "ser", "maseyê", "ye"],
      prompt: { en: "Arrange: The book is on the table.", ar: "رتّب: الكتاب على الطاولة.", ku: "Sererast bike: Pirtûk li ser maseyê ye." },
      reference: { en: "The book is on the table", ar: "الكتاب على الطاولة", ku: "Pirtûk li ser maseyê ye" },
      correct: "Pirtûk li ser maseyê ye"
    }),
    q({
      id: "pp-q12",
      node: "prd-match2",
      type: "match_pairs",
      prompt: { en: "Match each preposition to its meaning.", ar: "طابِق كل حرف جر مع معناه.", ku: "Her daçekê bi wateya wê re bigihîne." },
      pairs: [
        pair("bi", "بـ / بواسطة", "with / by means"),
        pair("ber", "أمام", "in front"),
        pair("nav", "داخل / بين", "inside / among"),
        pair("di…de", "في / داخل", "in / inside")
      ],
      correct: "bi=بـ / بواسطة / ber=أمام / nav=داخل / بين / di…de=في / داخل"
    })
  ];
}
const prepositionsLesson = lesson({
  topicId: "prepositions",
  xp: 60,
  title: { en: "Prepositions", ar: "حروف الجر", ku: "Daçek" },
  description: {
    en: "The key location words: at, from, with, in, on, under, before, inside.",
    ar: "كلمات المكان الأساسية: في، من، بـ، داخل، فوق، تحت، أمام، بين.",
    ku: "Daçekên cihî: li, ji, bi, di, ser, bin, ber, nav."
  },
  concepts: [li, ji, bi, diDe, ser, bin, ber, nav],
  summary: {
    rows: [
      { ku: "li", ar: "في / عند / إلى", en: "at / in / to" },
      { ku: "ji", ar: "من / عن", en: "from / of" },
      { ku: "bi", ar: "بـ / بواسطة", en: "with / by means" },
      { ku: "di … de", ar: "في / داخل", en: "in / inside" },
      { ku: "ser", ar: "فوق / على", en: "on / on top" },
      { ku: "bin", ar: "تحت", en: "under" },
      { ku: "ber", ar: "أمام", en: "in front of" },
      { ku: "nav", ar: "داخل / بين", en: "inside / among" }
    ]
  },
  exercises: prepExercises()
});
const GRAMMAR_LESSONS = [
  pronounsLesson,
  verbsLesson,
  nounsLesson,
  sentenceStructureLesson,
  prepositionsLesson
];
function slugEquals(a, b) {
  return a.trim().toLocaleLowerCase() === b.trim().toLocaleLowerCase();
}
function getGrammarLesson(topicId) {
  if (!topicId) return null;
  const raw = (() => {
    try {
      return decodeURIComponent(topicId);
    } catch {
      return topicId;
    }
  })().trim();
  if (!raw) return null;
  return GRAMMAR_LESSONS.find((lesson2) => slugEquals(lesson2.topicId, raw)) ?? GRAMMAR_LESSONS.find(
    (lesson2) => slugEquals(lesson2.title.ku, raw) || slugEquals(lesson2.title.ar, raw) || slugEquals(lesson2.title.en, raw)
  ) ?? null;
}
function grammarLessonKey(topicId) {
  return `grammar-${topicId}`;
}
function grammarExerciseNodeKey(topicId, nodeId) {
  return `${grammarLessonKey(topicId)}:${nodeId}`;
}
function lessonCompletionRatio(lesson2, deck) {
  const total = lesson2.exercises.length;
  if (total === 0) return 0;
  let learned = 0;
  for (const exercise of lesson2.exercises) {
    const item = deck[grammarExerciseNodeKey(lesson2.topicId, exercise.nodeId)];
    if (item && item.repetitions > 0) learned += 1;
  }
  return learned / total;
}
function lessonCompletionPercent(lesson2, deck) {
  return Math.round(lessonCompletionRatio(lesson2, deck) * 100);
}
function checkChoice(exercise, selected) {
  return selected !== null && selected === exercise.correctAnswer;
}
function checkText(exercise, typed) {
  const value = typed.trim();
  if (!value) return false;
  const accepted = [exercise.correctAnswer, ...exercise.variants ?? []];
  return accepted.some((answer) => isQuizAnswerAccepted(value, answer));
}
function checkReorder(exercise, words) {
  const canonical = exercise.sentenceWords ?? [];
  if (canonical.length === 0 || words.length !== canonical.length) return false;
  return words.every((word, i) => word === canonical[i]);
}
function checkMatch(exercise, rightIndexes) {
  const pairs = exercise.pairs ?? [];
  if (pairs.length === 0 || rightIndexes.length !== pairs.length) return false;
  return pairs.every((_, leftIndex) => rightIndexes[leftIndex] === leftIndex);
}
function checkExerciseAnswer(exercise, answer) {
  switch (answer.kind) {
    case "choice":
      return { correct: checkChoice(exercise, answer.value), compareValue: "" };
    case "text":
      return { correct: checkText(exercise, answer.value), compareValue: answer.value.trim() };
    case "reorder":
      return { correct: checkReorder(exercise, answer.words), compareValue: "" };
    case "match":
      return { correct: checkMatch(exercise, answer.rightIndexes), compareValue: "" };
  }
}
function grammarShuffle(items) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}
export {
  GRAMMAR_LESSONS as G,
  grammarExerciseNodeKey as a,
  grammarShuffle as b,
  checkExerciseAnswer as c,
  getGrammarLesson as d,
  grammarLessonKey as g,
  lessonCompletionPercent as l
};
