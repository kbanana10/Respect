import { v as vocabulary, a as alphabet } from "./kurmanji-DANKPvwI.js";
import { l as learningPath, a as academicVocabulary } from "./index-C4ml4lrv.js";
import { a as getDueItems } from "./SpacedRepetitionService-DkhvYl5r.js";
import { t as toLetterPuzzleAnswer } from "./answerUtils-WRjxYtEq.js";
function shuffle(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickDistractors(currentWord, poolWords, universe, valueOf, correctValue, count) {
  const seen = /* @__PURE__ */ new Set([correctValue]);
  const out = [];
  const cat = currentWord.category || currentWord.categoryId;
  const take = (candidates) => {
    for (const cand of candidates) {
      if (out.length >= count) return;
      if (cand.id === currentWord.id) continue;
      const val = valueOf(cand);
      if (!val || seen.has(val)) continue;
      seen.add(val);
      out.push(val);
    }
  };
  take(shuffle(poolWords));
  take(shuffle(universe.filter((u) => (u.category || u.categoryId) === cat)));
  take(shuffle(universe));
  return out;
}
function buildQuestionSubset(pool, maxQuestions, preserveOrder = false) {
  var _a;
  const firstPass = preserveOrder ? [...pool] : shuffle(pool);
  const result = firstPass.slice(0, maxQuestions);
  if (result.length < maxQuestions && pool.length > 0) {
    const target = Math.min(maxQuestions, pool.length * 2);
    let secondPass = shuffle(pool);
    if (pool.length > 1 && secondPass[0].id === ((_a = result[result.length - 1]) == null ? void 0 : _a.id)) {
      secondPass = [...secondPass.slice(1), secondPass[0]];
    }
    for (const item of secondPass) {
      if (result.length >= target) break;
      result.push(item);
    }
  }
  return result.map((item, uniqueIndex) => ({ ...item, uniqueIndex }));
}
function getAdaptiveLevelId(userData) {
  const xp = (userData == null ? void 0 : userData.xp) || 0;
  const unlocked = new Set((userData == null ? void 0 : userData.unlockedLevels) || ["A1"]);
  learningPath.forEach((lvl) => {
    if (xp >= lvl.requiredXp) unlocked.add(lvl.id);
  });
  let highest = "A1";
  for (const lvl of learningPath) {
    if (unlocked.has(lvl.id)) highest = lvl.id;
  }
  return highest;
}
function buildAdaptivePool(userData) {
  const xp = (userData == null ? void 0 : userData.xp) || 0;
  const unlockedIds = new Set((userData == null ? void 0 : userData.unlockedLevels) || ["A1"]);
  learningPath.forEach((lvl) => {
    if (xp >= lvl.requiredXp) unlockedIds.add(lvl.id);
  });
  const unlockedLevels = learningPath.filter((lvl) => unlockedIds.has(lvl.id));
  const completed = new Set((userData == null ? void 0 : userData.completedLessons) || []);
  const touchedIds = /* @__PURE__ */ new Set([
    ...(userData == null ? void 0 : userData.wrongAnswersHistory) || [],
    ...Object.keys((userData == null ? void 0 : userData.reviewDeck) || {})
  ]);
  const encountered = [];
  const pushUnique = (w) => {
    if (!encountered.some((e) => e.id === w.id)) encountered.push(w);
  };
  unlockedLevels.forEach(
    (lvl) => lvl.lessons.forEach((lesson) => {
      if (completed.has(lesson.id)) {
        lesson.words.forEach(pushUnique);
      } else {
        lesson.words.filter((w) => touchedIds.has(w.id)).forEach(pushUnique);
      }
    })
  );
  if (encountered.length < 4) {
    unlockedLevels.flatMap((lvl) => lvl.lessons).slice(0, 2).flatMap((lesson) => lesson.words).forEach(pushUnique);
  }
  const wrongSet = new Set((userData == null ? void 0 : userData.wrongAnswersHistory) || []);
  const dueSet = new Set(getDueItems((userData == null ? void 0 : userData.reviewDeck) || {}).map((d) => d.id));
  const focus = encountered.filter((w) => wrongSet.has(w.id) || dueSet.has(w.id));
  const rest = encountered.filter((w) => !wrongSet.has(w.id) && !dueSet.has(w.id));
  return [...shuffle(focus), ...shuffle(rest)];
}
const fillBlankTemplates = {
  // A1 Units
  "f_mom": { sentence: "Ez ji ______ xwe hez dikim.", blankWord: "Dayik", ar: "أنا أحب أمي.", en: "I love my mother." },
  "f_dad": { sentence: "______ min pir dilovan e.", blankWord: "Bav", ar: "أبي لطيف جداً.", en: "My father is very kind." },
  "f_bro": { sentence: "______ min li dibistanê ye.", blankWord: "Bra", ar: "أخي في المدرسة.", en: "My brother is at school." },
  "f_sis": { sentence: "______ min piçûk e.", blankWord: "Xwişk", ar: "أختي صغيرة.", en: "My sister is young." },
  "f_grandmom": { sentence: "______ a min ji min re çîrokan dibêje.", blankWord: "Dapîr", ar: "جدتي تخبرني بالحكايات الجميلة.", en: "My grandmother tells me stories." },
  "f_granddad": { sentence: "______ ê min pir biaqil e.", blankWord: "Bapîr", ar: "جدي حكيم وذكي جداً.", en: "My grandfather is very wise." },
  "nat_water": { sentence: "Ez ______ vedixwim.", blankWord: "Av", ar: "أنا أشرب الماء.", en: "I drink water." },
  "nat_tree": { sentence: "Sêv li ser ______ şîn dibe.", blankWord: "Dar", ar: "يظهر التفاح على الشجرة.", en: "Apples grow on the tree." },
  "nat_sun": { sentence: "Îro ______ pir germ e.", blankWord: "Roj", ar: "اليوم الشمس حارة جداً.", en: "Today the sun is very hot." },
  "nat_flower": { sentence: "Ev ______ pir xweşik e.", blankWord: "Kulîlk", ar: "هذه الزهرة جميلة جداً.", en: "This flower is very beautiful." },
  "nat_mtn": { sentence: "______ ê bilind bi berfê girtî ye.", blankWord: "Çiya", ar: "الجبل العالي مغطى بالثلج الأبيض.", en: "The high mountain is covered with snow." },
  // A2 Units
  "hm_bed": { sentence: "Ez li ser ______ min radizêm.", blankWord: "Text", ar: "أنا أنام في سريري المريح.", en: "I sleep in my comfortable bed." },
  "hm_door": { sentence: "Ji kerema xwe ______ bigire.", blankWord: "Derî", ar: "من فضلك أغلق الباب بهدوء.", en: "Please close the door quietly." },
  "hm_window": { sentence: "Ez ji ______ li dîtina xweşik dinêrim.", blankWord: "Pace", ar: "أنا أنظر إلى المنظر الجميل من النافذة.", en: "I look at the beautiful view from the window." },
  "hm_key": { sentence: "______ a min winda bûye.", blankWord: "Mifte", ar: "لقد ضاع مفتاحي ولا أستطيع الدخول.", en: "My key is lost and I cannot enter." },
  "hm_house": { sentence: "Ev ______ pir mezin e û bexçeyek heye.", blankWord: "Xanî", ar: "هذا المنزل كبير جداً ويحتوي على حديقة.", en: "This house is very big and has a garden." },
  "sh_shoe": { sentence: "Ez ______ a nû dikirim.", blankWord: "Pêlav", ar: "أنا أشتري حذاءً جديداً للسفر.", en: "I buy a new shoes for traveling." },
  "sh_shirt": { sentence: "______ a min spî ye.", blankWord: "Kiras", ar: "قميصي أبيض ونظيف جداً.", en: "My shirt is white and very clean." },
  "sh_bag": { sentence: "Ez pirtûkan di ______ a xwe de datînim.", blankWord: "Çente", ar: "أنا أضع الكتب في حقيبتي المدرسية.", en: "I put the books in my school bag." },
  "sh_market": { sentence: "Ez diçarim biçim ______ ê ji bo pîvaz dikirim.", blankWord: "Sûk", ar: "أنا ذاهب إلى السوق لشراء بعض الخضراوات.", en: "I am going to the market to buy some vegetables." },
  "sh_price": { sentence: "______ ê vê pirtûkê maqûl e.", blankWord: "Nirx", ar: "سعر هذا الكتاب مناسب ومعقول للغاية.", en: "The price of this book is very reasonable." },
  // B1 Units
  "tr_plane": { sentence: "Ji bo seferê ez li ______ siwar bûm.", blankWord: "Balafir", ar: "من أجل السفر ركبت الطائرة لأول مرة.", en: "For the trip, I boarded the airplane for the first time." },
  "tr_train": { sentence: "______ ê rêhesinî zû diçe.", blankWord: "Şimendifer", ar: "القطار يسير بسرعة عالية على السكة.", en: "The train travels at high speed on the railway." },
  "tr_ship": { sentence: "______ a mezin li ser deryayê digere.", blankWord: "Keştî", ar: "السفينة الكبيرة تبحر بأمان فوق مياه البحر.", en: "The large ship sails safely on the sea." },
  "tr_ticket": { sentence: "Ez herdem ______ a siwarbûnê diponijim.", blankWord: "Bîlet", ar: "أنا دائماً أحجز تذكرة الركوب مسبقاً قبل السفر.", en: "I always book the travel ticket in advance." },
  "tr_journey": { sentence: "______ a me pir xweş bu.", blankWord: "Sefer", ar: "كانت رحلتنا السياحية ممتعة جداً ومثيرة.", en: "Our journey was very pleasant and exciting." },
  "job_doc": { sentence: "Ez çûm ba ______ ji bo nexweşiyê.", blankWord: "Bijîşk", ar: "ذهبت إلى الطبيب لفحص حالتي الصحية بشكل دقيق.", en: "I went to the doctor for a thorough health check." },
  "job_teach": { sentence: "______ darsan dide me li dibistanê.", blankWord: "Mamoste", ar: "المعلم يشرح لنا الدروس بوضوح في المدرسة.", en: "The teacher explains the lessons clearly to us." },
  "job_eng": { sentence: "Min dît ku ______ xanî xêz dike.", blankWord: "Endazyar", ar: "المهندس يقوم بتخطيط وتصميم البناء بدقة.", en: "I saw the engineer designing the building details." },
  "job_writer": { sentence: "Ev ______ romaneke nû dinivîse.", blankWord: "Nivîskar", ar: "هذا الكاتب يكتب رواية أدبية جديدة ومثيرة.", en: "This writer is drafting a new exciting novel." },
  "job_work": { sentence: "Zehf giring e ku mirov di ______ de baldar be.", blankWord: "Kar", ar: "من المهم جداً أن يكون المرء مركّزاً في عمله.", en: "It is very important to be focused in one's work." },
  // B2 Units
  "sc_planet": { sentence: "Dinya yanî ______ a li ser ku em dijîn.", blankWord: "Gerstêrk", ar: "الأرض هي الكوكب الفريد الذي نعيش عليه.", en: "Earth is the unique planet we live on." },
  "sc_star": { sentence: "Di şevê de sedsalên ______ di ezmên de dibiriqin.", blankWord: "Stêrk", ar: "في الليل تلمع وتتوهج ملايين النجوم في السماء.", en: "At night, millions of stars shine and glisten in the sky." },
  "sc_exper": { sentence: "Zanyar zengîn ______ a nû di labratuarê de dikin.", blankWord: "Ezmûn", ar: "العلماء يجرون تجارب مخبرية جديدة لخدمة البشرية.", en: "Scientists conduct new laboratory experiments for humanity." },
  "sc_envir": { sentence: "Parastina ______ ê erka her kesî ye.", blankWord: "Sirişt", ar: "حماية الطبيعة والبيئة واجب وطني واجتماعي على الجميع.", en: "Protecting nature and environment is everyone's duty." },
  "sc_science": { sentence: "______ jiyana me asan dike.", blankWord: "Zanyarî", ar: "العلم والمعرفة يسهلان تفاصيل حياتنا المعاصرة.", en: "Science and knowledge make our modern life easier." },
  "soc_peace": { sentence: "Hemû mirov qencî û ______ yê dixwazin.", blankWord: "Aştî", ar: "كل البشر يريدون السلام والأمان والتعايش السلمي.", en: "All human beings desire peace, safety and co-existence." },
  "soc_justice": { sentence: "Bêyî ______ yê tu civak pêş nakeve.", blankWord: "Dadwerî", ar: "بدون العدالة لا يمكن لأي مجتمع أن يزدهر ويتطور.", en: "Without justice, no society can prosper and develop." },
  "soc_rights": { sentence: "Parastina ______ a mirovî ya bingehîn e.", blankWord: "Maf", ar: "صيانة وحماية حقوق الإنسان هي من الأولويات الدولية.", en: "Preserving human rights is an absolute priority." },
  "soc_culture": { sentence: "______ a gelekî nasnameya her mileti ye.", blankWord: "Kandî", ar: "الثقافة هي الهوية العميقة والمعبّرة عن الشعوب.", en: "Culture is the deep identity representing nations." },
  "soc_society": { sentence: "Mirov di nav beşa ______ yê de fêr dibe.", blankWord: "Civak", ar: "الإنسان يتعلم ويكتسب القيم ضمن نسيج المجتمع.", en: "Humans learn and acquire values within the fabric of society." },
  // Academic pathways
  "lit_novel": { sentence: "Min ______ a nû ya Kurdî xwend.", blankWord: "Roman", ar: "لقد قرأت الرواية الكوردية الجديدة الرائعة.", en: "I read the wonderful new Kurdish novel." },
  "lit_poem": { sentence: "Şair ji bo azadiyê ______ nivîsand.", blankWord: "Helbest", ar: "كتب الشاعر قصيدة شعرية ملهمة من أجل الحرية.", en: "The poet wrote an inspiring poem for freedom." },
  "lit_crit": { sentence: "______ a wêjeyî gelek giring e.", blankWord: "Rexne", ar: "النقد الأدبي مهم جداً لفهم النصوص الإبداعية.", en: "Literary criticism is very important for understanding texts." },
  "lit_lang": { sentence: "______ amûra ragihandinê ye.", blankWord: "Ziman", ar: "اللغة هي الأداة الأساسية للتواصل الإنساني والفكري.", en: "Language is the fundamental tool for communication." },
  "his_empire": { sentence: "______ a Medî di dîrokê de pir navdar e.", blankWord: "Împaratorî", ar: "الإمبراطورية الميدية مشهورة ومعروفة جداً في التاريخ.", en: "The Median Empire is very famous in historical annals." },
  "his_king": { sentence: "______ ê dîrokî yê gelê Medya gelek mezin e.", blankWord: "Şah", ar: "الملك التاريخي لشعب ميديا كان عظيماً وقائداً فذاً.", en: "The historical king of Media was a great and wise leader." },
  "his_civil": { sentence: "Herêm xwedan ______ a kevnar û dewlemend e.", blankWord: "Şaristaniyet", ar: "المنطقة تمتلك حضارة عريقة وغنية بالآثار.", en: "The region possesses an ancient and rich civilization." },
  "his_era": { sentence: "Di her ______ ê de milet xebatên taybet dike.", blankWord: "Serdem", ar: "في كل عصر وحقبة زمنية، تقوم الشعوب بإنجازات خاصة.", en: "In every era, nations accomplish special milestones." },
  "biz_wage": { sentence: "______ ê me îro hate razandin.", blankWord: "Meaş", ar: "تم تحويل وإيداع راتبنا الشهري في حساباتنا المصرفية اليوم.", en: "Our monthly salary has been wired to our bank accounts today." },
  "biz_meeting": { sentence: "______ ya şêwirê saet duyan e bi tîm re.", blankWord: "Civîn", ar: "الاجتماع الاستشاري مع الفريق مقرر عقده في الساعة الثانية.", en: "The team consultation meeting is scheduled at two o'clock." },
  "biz_contract": { sentence: "______ a nû hate îmzekirin bi fermî.", blankWord: "Peyman", ar: "تم توقيع العقد والاتفاقية التجارية الجديدة رسمياً وعلنياً.", en: "The new contract/transaction was officially signed." },
  "biz_work": { sentence: "______ ê nû ya pêşdebirinê pir mezin e.", blankWord: "Kar", ar: "مشروع العمل الجديد كبير ويتطلب الكثير من الهمة.", en: "The new development work is massive and requires high efforts." }
};
const sentenceReorderTemplates = [
  { sentence: "Ez ji Kurdistanê me", ar: "أنا من كردستان", en: "I am from Kurdistan" },
  { sentence: "Navê min Azad e", ar: "اسمي آزاد", en: "My name is Azad" },
  { sentence: "Tu çawa yî", ar: "كيف حالك", en: "How are you" },
  { sentence: "Ez baş im spas", ar: "أنا بخير شكراً", en: "I am fine thanks" },
  { sentence: "Rojbaş hevalê min", ar: "صباح الخير يا صديقي", en: "Good morning my friend" },
  { sentence: "Ez nan dixwim", ar: "أنا آكل الخبز", en: "I eat bread" },
  { sentence: "Av dermanê jiyanê ye", ar: "الماء دواء الحياة", en: "Water is the medicine of life" }
];
const getLevelOfModule = (module_id) => {
  for (const lvl of learningPath) {
    if (lvl.lessons.some((l) => l.id === module_id)) {
      return lvl.id;
    }
  }
  return "A1";
};
function generateQuestionsForModule(moduleId, selectedQuizMode, language, userData) {
  const isAdaptive = moduleId === "adaptive_practice" || selectedQuizMode === "adaptive_practice";
  if (moduleId === "alphabet" && !isAdaptive) {
    const alphabetPool = [...alphabet];
    const selectedLetters = shuffle(alphabetPool).slice(0, 5);
    if (selectedQuizMode === "multiple_choice") {
      return selectedLetters.map((l, idx) => {
        const otherLetters = shuffle(alphabetPool.filter((opt) => opt.id !== l.id)).slice(0, 3).map((opt) => opt.char);
        const options = shuffle([...otherLetters, l.char]);
        return {
          id: `${l.id}_q${idx}`,
          wordId: l.id,
          word: l,
          question: language !== "ar" ? `Which letter does "${l.exampleWord}" (${l.meaningEn}) start with?` : `بأي حرف تبدأ كلمة "${l.exampleWord}" (${l.meaningAr})؟`,
          correctAnswer: l.char,
          options,
          type: "multiple_choice",
          audio: "",
          // deliberately silent — this is the reading/text mode
          category: "alphabet"
        };
      });
    }
    if (selectedQuizMode === "write_kurdish") {
      return selectedLetters.map((l, idx) => ({
        id: `${l.id}_q${idx}`,
        wordId: l.id,
        word: l,
        question: language !== "ar" ? `Write "${l.meaningEn}" in Kurdish (starts with ${l.char}):` : `اكتب "${l.meaningAr}" باللغة الكوردية (تبدأ بـ ${l.char}):`,
        correctAnswer: l.exampleWord,
        options: [],
        type: "translate",
        audio: l.audio,
        category: "alphabet"
      }));
    }
    return selectedLetters.map((l, idx) => {
      const otherLetters = shuffle(alphabetPool.filter((opt) => opt.id !== l.id)).slice(0, 3).map((opt) => opt.char);
      const options = shuffle([...otherLetters, l.char]);
      return {
        id: `${l.id}_q${idx}`,
        wordId: l.id,
        word: l,
        question: language !== "ar" ? "Which letter does this sound represent?" : "أي حرف تسمعه الآن؟ (استمع للنطق)",
        correctAnswer: l.char,
        options,
        type: "listen",
        audio: l.charAudio,
        category: "alphabet"
      };
    });
  }
  const allWordsUniverse = [...vocabulary, ...academicVocabulary];
  learningPath.forEach((lvl) => lvl.lessons.forEach((l) => allWordsUniverse.push(...l.words)));
  const deduplicatedUniverse = allWordsUniverse.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
  let poolWords = [];
  let matchedLessonWords = [];
  for (const lvl of learningPath) {
    const matched = lvl.lessons.find((l) => l.id === moduleId);
    if (matched) {
      matchedLessonWords = matched.words;
      break;
    }
  }
  let reviewLetterPool = [];
  if (isAdaptive) {
    poolWords = buildAdaptivePool(userData);
  } else if ((moduleId === "review_mistakes" || moduleId === "srs_review" || moduleId === "review_due") && userData) {
    let targetIds = [];
    if (moduleId === "srs_review" || moduleId === "review_due") {
      const dueItems = getDueItems(userData.reviewDeck || {});
      targetIds = dueItems.map((d) => d.id);
    } else {
      targetIds = userData.wrongAnswersHistory || [];
    }
    const matchedWords = deduplicatedUniverse.filter((w) => targetIds.includes(w.id));
    poolWords = matchedWords;
    reviewLetterPool = alphabet.filter((l) => targetIds.includes(l.id));
  } else if (matchedLessonWords.length > 0) {
    poolWords = matchedLessonWords;
  } else {
    poolWords = deduplicatedUniverse.filter((w) => w.categoryId === moduleId || w.category === moduleId);
  }
  if (poolWords.length === 0 && reviewLetterPool.length === 0) {
    return [];
  }
  const levelId = isAdaptive ? getAdaptiveLevelId(userData) : getLevelOfModule(moduleId);
  let maxQuestions = 5;
  if (levelId === "A1") maxQuestions = 5;
  else if (levelId === "A2") maxQuestions = 7;
  else if (levelId === "B1") maxQuestions = 8;
  else if (levelId === "B2") maxQuestions = 10;
  else if (levelId === "Advanced") maxQuestions = 12;
  else maxQuestions = 7;
  const letterQuestions = shuffle(reviewLetterPool).slice(0, maxQuestions).map((l, idx) => {
    const otherLetters = shuffle(alphabet.filter((opt) => opt.id !== l.id)).slice(0, 3).map((opt) => opt.char);
    return {
      id: `${l.id}_rq${idx}`,
      wordId: l.id,
      word: l,
      question: language !== "ar" ? "Which letter does this sound represent?" : "أي حرف تسمعه الآن؟ (استمع للنطق)",
      correctAnswer: l.char,
      options: shuffle([...otherLetters, l.char]),
      type: "listen",
      audio: l.charAudio,
      category: "alphabet"
    };
  });
  const wordBudget = Math.max(0, maxQuestions - letterQuestions.length);
  const finalSubset = buildQuestionSubset(poolWords, wordBudget, isAdaptive);
  const adaptiveWrongSet = new Set((userData == null ? void 0 : userData.wrongAnswersHistory) || []);
  const wordQuestions = finalSubset.map((w, idx) => {
    const itemCategory = w.category || w.categoryId || "general";
    const itemEmoji = w.emoji || "🎓";
    let qType = "multiple_choice";
    if (selectedQuizMode === "mixed_challenge") {
      let allowedTypes = ["multiple_choice", "scrambled_letters", "true_false"];
      if (levelId === "A1") {
        allowedTypes = ["multiple_choice", "emoji", "true_false"];
      } else if (levelId === "A2") {
        allowedTypes = ["multiple_choice", "scrambled_letters", "true_false", "fill_blank", "emoji"];
      } else if (levelId === "B1") {
        allowedTypes = ["multiple_choice", "scrambled_letters", "fill_blank", "sentence_reorder", "true_false"];
      } else if (levelId === "B2" || levelId === "Advanced") {
        allowedTypes = ["multiple_choice", "translate", "fill_blank", "sentence_reorder", "scrambled_letters", "true_false"];
      }
      qType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
    } else if (selectedQuizMode === "adaptive_practice") {
      let allowedTypes = ["multiple_choice", "emoji", "true_false"];
      if (levelId === "A2") {
        allowedTypes = ["multiple_choice", "emoji", "true_false", "scrambled_letters", "fill_blank"];
      } else if (levelId === "B1") {
        allowedTypes = ["multiple_choice", "true_false", "scrambled_letters", "fill_blank", "sentence_reorder"];
      } else if (levelId === "B2" || levelId === "Advanced") {
        allowedTypes = ["multiple_choice", "true_false", "scrambled_letters", "fill_blank", "sentence_reorder", "translate"];
      }
      if (adaptiveWrongSet.has(w.id)) {
        allowedTypes = ["multiple_choice", "true_false"];
      } else if (w.difficulty === "hard" && levelId !== "A1") {
        const recall = allowedTypes.filter(
          (tp) => tp === "scrambled_letters" || tp === "translate" || tp === "fill_blank"
        );
        if (recall.length > 0) allowedTypes = recall;
      }
      qType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
    } else {
      if (selectedQuizMode === "write_kurdish") qType = "translate";
      else if (selectedQuizMode === "emoji_match") qType = "emoji";
      else if (selectedQuizMode === "true_false_challenge") qType = "true_false";
      else if (selectedQuizMode === "listening") qType = "multiple_choice";
      else if (selectedQuizMode === "fill_blank") qType = "fill_blank";
      else if (selectedQuizMode === "sentence_reorder") qType = "sentence_reorder";
      else if (selectedQuizMode === "scrambled_letters") qType = "scrambled_letters";
      else qType = "multiple_choice";
    }
    if (selectedQuizMode === "listening") {
      const wrongs = pickDistractors(w, poolWords, deduplicatedUniverse, (opt) => opt.ku, w.ku, 3);
      const options = shuffle([...wrongs, w.ku]);
      return {
        id: `${w.id}_q${idx}`,
        wordId: w.id,
        word: w,
        question: language !== "ar" ? "Which Kurdish word do you hear?" : "أي كلمة كوردية تسمع؟",
        correctAnswer: w.ku,
        options,
        type: "listen",
        audio: w.audio,
        category: itemCategory
      };
    }
    if (qType === "multiple_choice") {
      const correctMeaning = language !== "ar" ? w.en : w.ar;
      const meaningOf = (opt) => language !== "ar" ? opt.en : opt.ar;
      const wrongs = pickDistractors(w, poolWords, deduplicatedUniverse, meaningOf, correctMeaning, 3);
      const randomizedOpts = shuffle([...wrongs, correctMeaning]);
      return {
        id: `${w.id}_q${idx}`,
        wordId: w.id,
        word: w,
        question: language !== "ar" ? `What does "${w.ku}" mean?` : `ما معنى الكلمة الكوردية "${w.ku}"؟`,
        correctAnswer: correctMeaning,
        options: randomizedOpts,
        type: "multiple_choice",
        audio: w.audio,
        category: itemCategory
      };
    } else if (qType === "scrambled_letters") {
      const cleanKu = toLetterPuzzleAnswer(w.ku);
      const normalChars = cleanKu.split("");
      const scrambled = shuffle(normalChars);
      if (scrambled.join("") === cleanKu && scrambled.length > 1) {
        scrambled.reverse();
      }
      const term = language !== "ar" ? w.en : w.ar;
      return {
        id: `${w.id}_q${idx}`,
        wordId: w.id,
        word: w,
        question: language !== "ar" ? `Spell the Kurdish word for "${term}":` : `رتّب الأحرف لتهجئة الكلمة الكوردية لـ "${term}":`,
        correctAnswer: cleanKu,
        options: [],
        type: "scrambled_letters",
        audio: w.audio,
        category: itemCategory,
        scrambledLetters: scrambled
      };
    } else if (qType === "fill_blank") {
      const template = fillBlankTemplates[w.id];
      let blankSentence = "";
      let correctAns = w.ku;
      let hintAr = w.ar || "";
      let hintEn = w.en || "";
      if (template) {
        blankSentence = template.sentence;
        correctAns = template.blankWord;
        hintAr = template.ar;
        hintEn = template.en;
      } else if (w.exampleKu && w.exampleKu.toLowerCase().includes(w.ku.toLowerCase())) {
        const regex = new RegExp(w.ku, "i");
        blankSentence = w.exampleKu.replace(regex, "_____");
        correctAns = w.ku;
        hintAr = w.exampleAr || w.ar;
        hintEn = w.exampleEn || w.en;
      } else {
        blankSentence = `Ev _____ e.`;
        correctAns = w.ku;
        hintAr = w.ar;
        hintEn = w.en;
      }
      const wrongs = pickDistractors(w, poolWords, deduplicatedUniverse, (opt) => opt.ku, correctAns, 3);
      const options = shuffle([...wrongs, correctAns]);
      return {
        id: `${w.id}_q${idx}`,
        wordId: w.id,
        word: w,
        prompt: blankSentence,
        question: language !== "ar" ? `Fill in the blank: "${blankSentence}"` : `أكمل الفراغ بالكلمة المناسبة: "${blankSentence}"`,
        correctAnswer: correctAns,
        options,
        type: "fill_blank",
        audio: w.audio,
        category: itemCategory,
        fullSentence: blankSentence,
        hintAr,
        hintEn
      };
    } else if (qType === "true_false") {
      const isTrueQ = Math.random() > 0.5;
      let showTranslation = language !== "ar" ? w.en : w.ar;
      if (!isTrueQ) {
        const matches = deduplicatedUniverse.filter((m) => m.id !== w.id);
        if (matches.length > 0) {
          const mismatch = matches[Math.floor(Math.random() * matches.length)];
          showTranslation = language !== "ar" ? mismatch.en : mismatch.ar;
        } else {
          showTranslation = language !== "ar" ? "Water" : "ماء";
        }
      }
      const qText = language !== "ar" ? `Does "${w.ku}" translate to "${showTranslation}"?` : `هل تترجم كلمة "${w.ku}" إلى "${showTranslation}"؟`;
      return {
        id: `${w.id}_q${idx}`,
        wordId: w.id,
        word: w,
        question: qText,
        correctAnswer: isTrueQ ? language !== "ar" ? "True" : "صحيح" : language !== "ar" ? "False" : "خطأ",
        options: language !== "ar" ? ["True", "False"] : ["صحيح", "خطأ"],
        type: "true_false",
        audio: w.audio,
        category: itemCategory
      };
    } else if (qType === "emoji") {
      const wrongs = pickDistractors(w, poolWords, deduplicatedUniverse, (opt) => opt.ku, w.ku, 3);
      const randomizedOpts = shuffle([...wrongs, w.ku]);
      return {
        id: `${w.id}_q${idx}`,
        wordId: w.id,
        word: w,
        question: language !== "ar" ? `Which Kurdish word matches ${itemEmoji}?` : `أي كلمة كوردية تطابق هذا الرمز التعبيري ${itemEmoji}؟`,
        correctAnswer: w.ku,
        options: randomizedOpts,
        type: "emoji",
        audio: w.audio,
        category: itemCategory
      };
    } else if (qType === "sentence_reorder") {
      let sentenceKu = "";
      let hintAr = "";
      let hintEn = "";
      if (w.exampleKu && w.exampleKu.split(" ").length >= 3) {
        sentenceKu = w.exampleKu;
        hintAr = w.exampleAr || "";
        hintEn = w.exampleEn || "";
      } else {
        const sTemp = sentenceReorderTemplates[idx % sentenceReorderTemplates.length];
        sentenceKu = sTemp.sentence;
        hintAr = sTemp.ar;
        hintEn = sTemp.en;
      }
      const pureWords = sentenceKu.split(" ").map((s) => s.trim().replace(/[,.?!]/g, "")).filter(Boolean);
      const scrambledWords = shuffle(pureWords);
      if (scrambledWords.join(" ") === pureWords.join(" ") && scrambledWords.length > 1) {
        scrambledWords.reverse();
      }
      return {
        id: `${w.id}_q${idx}`,
        wordId: w.id,
        word: w,
        question: language !== "ar" ? `Translate and organize the Kurdish words for:` : `رتّب الكلمات الكوردية بالشكل الصحيح لتقابل المعنى المقترح:`,
        correctAnswer: pureWords.join(" "),
        options: [],
        type: "sentence_reorder",
        audio: w.audio,
        category: itemCategory,
        sentenceWords: scrambledWords,
        scrambledWords,
        hintAr,
        hintEn
      };
    } else {
      const prompt = language !== "ar" ? w.en : w.ar;
      return {
        id: `${w.id}_q${idx}`,
        wordId: w.id,
        word: w,
        question: language !== "ar" ? `Write "${prompt}" in Kurdish:` : `اكتب "${prompt}" باللغة الكوردية:`,
        correctAnswer: w.ku,
        options: [],
        type: "translate",
        audio: w.audio,
        category: itemCategory
      };
    }
  });
  return letterQuestions.length > 0 ? shuffle([...letterQuestions, ...wordQuestions]) : wordQuestions;
}
function filterReviewableIds(ids) {
  const universe = /* @__PURE__ */ new Set();
  vocabulary.forEach((w) => universe.add(w.id));
  academicVocabulary.forEach((w) => universe.add(w.id));
  learningPath.forEach((lvl) => lvl.lessons.forEach((l) => l.words.forEach((w) => universe.add(w.id))));
  alphabet.forEach((l) => universe.add(l.id));
  return ids.filter((id) => universe.has(id));
}
export {
  getAdaptiveLevelId as a,
  getLevelOfModule as b,
  filterReviewableIds as f,
  generateQuestionsForModule as g
};
