import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../store/AuthContext';
import { X, AlertTriangle, ShieldCheck, Gem, Lightbulb, PartyPopper, Heart, Volume2, VolumeX, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { t, pickLocalized } from '../localization/translations';
import { AudioButton } from '../features/audio/components/AudioButton';
import { useSoundMuted, playRewardSound, playAudioUrl, stopAllActiveAudio } from '../features/audio/hooks/useAudio';
import { useQuizEngine } from '../features/quiz/hooks/useQuizEngine';
import { getAdaptiveLevelId } from '../features/quiz/utils/questionGenerator';
import { categories } from '../data/kurmanji';
import { academicCategories } from '../data/academic';
import { learningPath, getLessonTitle, type LessonWord } from '../data/learningPath';
import { MultipleChoiceQuestion } from '../features/quiz/components/MultipleChoiceQuestion';
import { TranslateQuestion } from '../features/quiz/components/TranslateQuestion';
import { ScrambledLettersQuestion } from '../features/quiz/components/ScrambledLettersQuestion';
import { SentenceReorderQuestion } from '../features/quiz/components/SentenceReorderQuestion';
import { QuizStudyPhase } from '../features/quiz/components/QuizStudyPhase';
import { QuizModePicker } from '../features/quiz/components/QuizModePicker';
import { QuizResults } from '../features/quiz/components/QuizResults';
import { cn } from '../utils/cn';
import { Badge, Button, Card, ErrorState, Modal, Progress, Spinner } from '../components/ui';

export function Quiz() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { userData, updateUserData, updateUserProgress, language } = useAuth();
  const isKidsMode = userData?.learnerMode === 'kids';

  const [useSlowPronunciation, setUseSlowPronunciation] = useState(false);
  const [isMuted, setSoundMuted] = useSoundMuted();

  const handleToggleMute = () => {
    setSoundMuted(!isMuted);
  };

  const [isInStudyPhase, setIsInStudyPhase] = useState(true);
  const [selectedBlockIndices, setSelectedBlockIndices] = useState<number[]>([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const {
    selectedQuizMode,
    setSelectedQuizMode,
    questions,
    questionSetReady,
    currentIndex,
    selectedOption,
    typingAnswer,
    setTypingAnswer,
    hasChecked,
    isCorrect,
    score,
    combo,
    hearts,
    isFinished,
    showConfetti,
    earnedXp,
    earnedGems,
    missedQuestions,
    restartMissedQuestions,
    handleOptionSelect,
    handleVerify,
    handleNext,
    handleCharClick,
  } = useQuizEngine({
    moduleId,
    language,
    updateUserProgress,
    updateUserData,
    userData,
    navigateBack: () => navigate(-1),
  });

  React.useEffect(() => {
    setSelectedBlockIndices([]);
    setHintUsed(false);
    setEliminatedOptions([]);
  }, [currentIndex]);

  const activeListenQ = !isFinished && questionSetReady ? questions[currentIndex] : undefined;
  React.useEffect(() => {
    if (!activeListenQ || activeListenQ.type !== 'listen' || !activeListenQ.audio) return;
    const timer = window.setTimeout(() => {
      void playAudioUrl(
        activeListenQ.audio,
        activeListenQ.word?.ku || activeListenQ.correctAnswer,
        useSlowPronunciation ? 0.65 : 1.0,
      );
    }, 400);
    return () => {
      window.clearTimeout(timer);
      stopAllActiveAudio();
    };
  }, [activeListenQ?.id]);

  const labels = pickLocalized(language, {
    en: {
      srsReview: 'Spaced Repetition Review',
      reviewMistakes: 'Review Lesson Mistakes',
      sandbox: 'Practice Sandbox',
      allCaughtUp: 'All caught up! 🎉',
      cleanRecord: 'Clean record! ✨',
      srsEmpty: 'No words are due for review right now. Keep learning — new reviews will appear here as you go.',
      mistakesEmpty: 'You have no mistakes to fix. Great work!',
      keepLearning: 'Keep Learning',
      noQuestionsTitle: 'This lesson has no questions yet',
      noQuestionsDesc: 'The lesson may have been moved or renamed. Pick another lesson from the roadmap.',
      roadmap: 'Roadmap',
      goBack: 'Go back',
      exitQuiz: 'Exit quiz',
      heartsLeft: (n: number) => `${n} hearts left`,
      quizProgress: 'Quiz progress',
      useHint: isKidsMode ? 'Gentle Hint (Free)' : 'Use Hint',
      muteAudio: 'Mute sounds',
      unmuteAudio: 'Turn on sounds',
      comboPraise: (n: number) => `Awesome! ${n} in a row!`,
      kidsRetry: 'Good try! The answer is:',
    },
    ar: {
      srsReview: 'مراجعة التكرار المتباعد',
      reviewMistakes: 'مراجعة الأخطاء',
      sandbox: 'تمرين حر',
      allCaughtUp: 'أنت على اطلاع تام! 🎉',
      cleanRecord: 'سجلك نظيف! ✨',
      srsEmpty: 'لا توجد كلمات بحاجة للمراجعة الآن. واصل الدروس وستظهر المراجعات هنا.',
      mistakesEmpty: 'لا توجد أخطاء لمعالجتها. عمل رائع!',
      keepLearning: 'واصل التعلم',
      noQuestionsTitle: 'لا توجد أسئلة في هذا الدرس بعد',
      noQuestionsDesc: 'ربما تم نقل الدرس أو إعادة تسميته. اختر درساً آخر من الخارطة.',
      roadmap: 'الخارطة',
      goBack: 'رجوع',
      exitQuiz: 'إنهاء الاختبار',
      heartsLeft: (n: number) => `${n} قلوب متبقية`,
      quizProgress: 'تقدم الاختبار',
      useHint: isKidsMode ? 'تلميح مجاني' : 'استخدم تلميح',
      muteAudio: 'كتم الأصوات',
      unmuteAudio: 'تشغيل الأصوات',
      comboPraise: (n: number) => `رائع يا بطل! ${n} متتالية!`,
      kidsRetry: 'محاولة جميلة! الإجابة هي:',
    },
    ku: {
      srsReview: 'Dubarekirina Jîr (SM-2)',
      reviewMistakes: 'Çewtiyan Rast Bike',
      sandbox: 'Rahênana Azad',
      allCaughtUp: 'Tu bi tevahî amade yî! 🎉',
      cleanRecord: 'Tomara te paqij e! ✨',
      srsEmpty: 'Niha tu peyvên ji bo dubarekirinê tune ne. Dersan bidomîne — dubarekirin dê li vir xuya bibin.',
      mistakesEmpty: 'Tu çewtiyên ji bo rastkirinê tune ne. Karê hêja!',
      keepLearning: 'Fêrbûnê Bidomîne',
      noQuestionsTitle: 'Di vê dersê de hîn pirs tune ne',
      noQuestionsDesc: 'Dibe ku ev ders hatibe guherandin. Derseke din ji nexşeyê hilbijêre.',
      roadmap: 'Nexşe',
      goBack: 'Vegere',
      exitQuiz: 'Ji azmûnê derkeve',
      heartsLeft: (n: number) => `${n} dil mane`,
      quizProgress: 'Pêşveçûna azmûnê',
      useHint: isKidsMode ? 'Têbîniya Belaş' : 'Têbînî Bikar Bîne',
      muteAudio: 'Dengê bêdeng bike',
      unmuteAudio: 'Dengê veke',
      comboPraise: (n: number) => `Aferîn! ${n} li pey hev!`,
      kidsRetry: 'Hewldana baş! Bersiva rast:',
    },
  });

  const getCategoryInfo = () => {
    if (moduleId === 'alphabet') return { name: t(language, 'alphabet'), icon: 'Type' };
    if (moduleId === 'all') {
      return {
        name: pickLocalized(language, {
          en: 'Full Practice',
          ar: 'تمرين شامل',
          ku: 'Rahênana Giştî',
        }),
        icon: 'Sparkles',
      };
    }
    if (moduleId === 'srs_review' || moduleId === 'review_due') {
      return { name: labels.srsReview, icon: 'RotateCcw' };
    }
    if (moduleId === 'review_mistakes') return { name: labels.reviewMistakes, icon: 'Brain' };

    for (const lvl of learningPath) {
      const les = lvl.lessons.find((l) => l.id === moduleId);
      if (les) return { name: getLessonTitle(les, language), icon: les.icon };
    }

    const cat = categories.find((c) => c.id === moduleId);
    if (cat) {
      return {
        name: pickLocalized(language, { en: cat.name, ar: cat.ar || cat.name, ku: cat.name }),
        icon: cat.icon,
      };
    }

    const acadCat = academicCategories.find((c) => c.id === moduleId);
    if (acadCat) {
      return {
        name: pickLocalized(language, { en: acadCat.nameEn, ar: acadCat.nameAr, ku: acadCat.nameEn }),
        icon: acadCat.icon,
      };
    }

    return { name: labels.sandbox, icon: 'BookOpen' };
  };

  const catInfo = getCategoryInfo();
  const userLevelId = getAdaptiveLevelId(userData);

  let matchedLessonWords: LessonWord[] = [];
  for (const lvl of learningPath) {
    const matched = lvl.lessons.find((l) => l.id === moduleId);
    if (matched) {
      matchedLessonWords = matched.words;
      break;
    }
  }

  if (selectedQuizMode === 'mixed_challenge' && isInStudyPhase && matchedLessonWords.length > 0) {
    return (
      <QuizStudyPhase
        language={language}
        catName={catInfo.name}
        catIcon={catInfo.icon}
        words={matchedLessonWords}
        useSlowPronunciation={useSlowPronunciation}
        onToggleSlow={setUseSlowPronunciation}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onStart={() => setIsInStudyPhase(false)}
        onExit={() => navigate('/roadmap')}
      />
    );
  }

  if (!selectedQuizMode) {
    return (
      <QuizModePicker
        language={language}
        userLevelId={userLevelId}
        showAdaptive={(userData?.completedLessons?.length ?? 0) > 0}
        isKidsMode={isKidsMode}
        onSelectMode={setSelectedQuizMode}
        onBack={() => navigate(-1)}
        onLeaderboard={() => navigate('/leaderboard')}
      />
    );
  }

  if (!questionSetReady) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <Spinner size="lg" showLabel label={t(language, 'loading')} />
      </div>
    );
  }

  if (isFinished) {
    return (
      <QuizResults
        language={language}
        score={score}
        total={questions.length}
        earnedXp={earnedXp}
        earnedGems={earnedGems}
        showConfetti={showConfetti}
        hasMissedQuestions={missedQuestions.length > 0}
        onPrimary={() => {
          if (missedQuestions.length > 0) {
            restartMissedQuestions();
          } else {
            // Active learning flow stays ad-free and seamless.
            navigate('/roadmap');
          }
        }}
        onHome={() => navigate('/')}
      />
    );
  }

  const currentQ = questions[currentIndex];

  if (questions.length === 0) {
    if (moduleId === 'srs_review' || moduleId === 'review_due' || moduleId === 'review_mistakes') {
      const isSrs = moduleId !== 'review_mistakes';
      return (
        <div className="p-6 flex flex-col items-center justify-center h-full gap-5 text-center max-w-sm mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <PartyPopper className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-ink">
              {isSrs ? labels.allCaughtUp : labels.cleanRecord}
            </h2>
            <p className="text-sm text-muted font-semibold leading-relaxed">
              {isSrs ? labels.srsEmpty : labels.mistakesEmpty}
            </p>
          </div>
          <Button size="lg" fullWidth onClick={() => navigate('/roadmap')}>
            {labels.keepLearning}
          </Button>
        </div>
      );
    }
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full gap-4">
        <ErrorState
          icon={<AlertTriangle className="w-8 h-8" aria-hidden="true" />}
          title={labels.noQuestionsTitle}
          description={labels.noQuestionsDesc}
          onRetry={() => navigate('/roadmap')}
          retryLabel={labels.roadmap}
          className="w-full max-w-sm"
        />
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          {labels.goBack}
        </Button>
      </div>
    );
  }

  if (!currentQ || !currentQ.question) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <Spinner size="lg" showLabel label={t(language, 'loading')} />
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const currentSpeed = useSlowPronunciation ? 0.65 : 1.0;

  const getQuizModeTitle = () => {
    if (moduleId === 'srs_review' || moduleId === 'review_due' || moduleId === 'review_mistakes') {
      return getCategoryInfo().name;
    }
    if (selectedQuizMode === 'multiple_choice') return t(language, 'quiz_mode_word_title');
    if (selectedQuizMode === 'emoji_match') return t(language, 'quiz_type_emoji');
    if (selectedQuizMode === 'listening') return t(language, 'quiz_mode_listening_title');
    if (selectedQuizMode === 'write_kurdish') return t(language, 'quiz_mode_writing_title');
    if (selectedQuizMode === 'adaptive_practice') return t(language, 'quiz_mode_adaptive_title');
    if (selectedQuizMode === 'mixed_challenge') return t(language, 'quiz_mode_mixed_title');
    return t(language, 'quiz');
  };

  const isOptionQuestion =
    currentQ.type === 'multiple_choice' ||
    currentQ.type === 'true_false' ||
    currentQ.type === 'emoji' ||
    currentQ.type === 'listen';

  const hintCost = isKidsMode ? 0 : 10;

  return (
    <div className="p-4 flex flex-col h-full absolute top-0 start-0 w-full bg-surface-2 text-ink z-50 select-none pb-24 overflow-y-auto">
      <div className="flex items-center justify-between gap-3 py-2 mb-3 max-w-md mx-auto w-full">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowExitConfirm(true)}
          aria-label={labels.exitQuiz}
          className="shrink-0 w-11 !px-0 rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>

        <Modal
          open={showExitConfirm}
          onClose={() => setShowExitConfirm(false)}
          title={t(language, 'quiz_exit_title')}
          description={t(language, 'quiz_exit_msg')}
          hideCloseButton
        >
          <div className="flex gap-3 w-full">
            <Button variant="secondary" fullWidth onClick={() => setShowExitConfirm(false)}>
              {t(language, 'quiz_exit_keep')}
            </Button>
            <Button
              variant="danger"
              fullWidth
              onClick={() => {
                setShowExitConfirm(false);
                setSelectedQuizMode(null);
              }}
            >
              {t(language, 'quiz_exit_leave')}
            </Button>
          </div>
        </Modal>

        <h2 className="text-base font-black text-ink truncate">{getQuizModeTitle()}</h2>

        <div className="flex items-center gap-2 shrink-0">
          {hearts !== null && (
            <span
              data-testid="quiz-hearts"
              className="flex items-center gap-0.5"
              role="status"
              aria-label={labels.heartsLeft(hearts)}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  aria-hidden="true"
                  className={cn(
                    'w-4 h-4 transition-colors',
                    i < hearts ? 'text-[#FF5722] fill-[#FF5722]' : 'text-line-soft fill-transparent',
                  )}
                />
              ))}
            </span>
          )}
          <button
            type="button"
            data-testid="quiz-sound-toggle"
            onClick={handleToggleMute}
            aria-label={isMuted ? labels.unmuteAudio : labels.muteAudio}
            aria-pressed={isMuted}
            className="w-11 h-11 rounded-full border border-line-soft bg-white dark:bg-slate-900 flex items-center justify-center text-ink hover:bg-surface-3 transition-colors cursor-pointer shrink-0"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-muted" /> : <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
          </button>
          <Badge tone="primary" className="shrink-0 tracking-normal">
            {currentIndex + 1}/{questions.length}
          </Badge>
        </div>
      </div>

      <Progress
        value={progressPercent}
        size="sm"
        label={labels.quizProgress}
        className="mb-6 max-w-md mx-auto w-full [&>div:first-child]:sr-only"
      />

      <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full space-y-4">
        <Card padding="lg" className="text-center flex flex-col items-center justify-center space-y-3">
          {currentQ.type === 'listen' ? (
            <>
              <h2 className="text-lg font-black text-ink tracking-tight">{currentQ.question || ''}</h2>
              <AudioButton
                audioUrl={currentQ.audio}
                textToSpeak={currentQ.word?.ku || currentQ.correctAnswer}
                className="w-16 h-16 bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] rounded-full flex items-center justify-center transition-colors cursor-pointer border-none shadow-flat"
                iconClassName="w-7 h-7"
                showProgress={false}
                playbackRate={currentSpeed}
              />
              <span className="text-xs font-bold text-muted">{t(language, 'quiz_tap_to_replay')}</span>
            </>
          ) : (
            <div className="flex items-center justify-center gap-3 pt-1">
              <h2 className="text-2xl font-black text-ink tracking-tight">{currentQ.question || ''}</h2>
              {currentQ.audio && (
                <AudioButton
                  audioUrl={currentQ.audio}
                  textToSpeak={currentQ.word?.ku || currentQ.correctAnswer}
                  className="bg-surface-2 hover:bg-surface-3 p-2.5 text-brand rounded-control transition-colors cursor-pointer border-none"
                  iconClassName="w-5 h-5"
                  showProgress={false}
                  playbackRate={currentSpeed}
                />
              )}
            </div>
          )}
        </Card>

        <div className="flex-1 flex flex-col justify-center">
          {isOptionQuestion && (
            <MultipleChoiceQuestion
              currentQ={currentQ}
              eliminatedOptions={eliminatedOptions}
              selectedOption={selectedOption}
              hasChecked={hasChecked}
              isCorrect={isCorrect}
              handleOptionSelect={handleOptionSelect}
            />
          )}

          {(currentQ.type === 'translate' || currentQ.type === 'fill_blank') && (
            <TranslateQuestion
              currentQ={currentQ}
              typingAnswer={typingAnswer}
              setTypingAnswer={setTypingAnswer}
              hasChecked={hasChecked}
              isCorrect={isCorrect}
              language={language}
              handleCharClick={handleCharClick}
              handleVerify={handleVerify}
              handleNext={handleNext}
            />
          )}

          {currentQ.type === 'scrambled_letters' && (
            <ScrambledLettersQuestion
              currentQ={currentQ}
              typingAnswer={typingAnswer}
              setTypingAnswer={setTypingAnswer}
              selectedBlockIndices={selectedBlockIndices}
              setSelectedBlockIndices={setSelectedBlockIndices}
              hasChecked={hasChecked}
              isCorrect={isCorrect}
              language={language}
              handleVerify={handleVerify}
              handleNext={handleNext}
            />
          )}

          {currentQ.type === 'sentence_reorder' && (
            <SentenceReorderQuestion
              currentQ={currentQ}
              selectedBlockIndices={selectedBlockIndices}
              setSelectedBlockIndices={setSelectedBlockIndices}
              typingAnswer={typingAnswer}
              setTypingAnswer={setTypingAnswer}
              hasChecked={hasChecked}
              isCorrect={isCorrect}
              language={language}
              handleVerify={handleVerify}
              handleNext={handleNext}
            />
          )}
        </div>

        {isOptionQuestion && (
          <div className="space-y-2 pt-2">
            <AnimatePresence>
              {hasChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8 }}
                  role="status"
                  className={cn(
                    'rounded-card border-2 px-4 py-3 flex items-center justify-between gap-2.5 text-start',
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300'
                      : isKidsMode
                        ? 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-200'
                        : 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300',
                  )}
                >
                  {isCorrect ? (
                    <>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" aria-hidden="true" />
                        <span className="font-black text-sm">
                          {combo >= 2 ? labels.comboPraise(combo) : t(language, 'quiz_feedback_correct')}
                        </span>
                      </div>
                      {combo >= 2 && (
                        <span className="inline-flex items-center gap-1 font-black text-xs text-amber-700 dark:text-amber-300 shrink-0">
                          <Flame className="w-4 h-4 fill-orange-500 text-orange-500" aria-hidden="true" />
                          ×{combo}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isKidsMode ? (
                        <Lightbulb className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      ) : (
                        <X className="w-5 h-5 shrink-0 text-rose-600" aria-hidden="true" />
                      )}
                      <span className="text-sm font-bold min-w-0">
                        <span className="opacity-80">
                          {isKidsMode ? labels.kidsRetry : t(language, 'correct_answer_is')}
                        </span>{' '}
                        <bdi className="font-black">{currentQ.correctAnswer}</bdi>
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {hasChecked && (
              <Button
                size="lg"
                fullWidth
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNext();
                }}
              >
                {t(language, 'quiz_next')}
              </Button>
            )}

            {currentQ.options.length > 2 && !hasChecked && (
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => {
                  if (selectedOption || hasChecked || hintUsed) return;
                  if (hintCost > 0 && (userData?.gems ?? 0) < hintCost) return;
                  const wrongOpts = currentQ.options.filter((o) => o !== currentQ.correctAnswer);
                  const toRemove = wrongOpts.slice(0, Math.max(1, Math.floor(wrongOpts.length / 2)));
                  setEliminatedOptions(toRemove);
                  setHintUsed(true);
                  playRewardSound();
                  if (hintCost > 0) {
                    void updateUserData?.({ gems: (userData?.gems ?? 0) - hintCost });
                  }
                }}
                disabled={hasChecked || hintUsed || (hintCost > 0 && (userData?.gems ?? 0) < hintCost)}
                leadingIcon={<Lightbulb className="w-3.5 h-3.5 text-warning" />}
              >
                <span>{labels.useHint}</span>
                {hintCost > 0 && (
                  <Badge tone="warning" className="ms-2 tracking-normal">
                    <Gem className="w-3 h-3" aria-hidden="true" />
                    {hintCost}
                  </Badge>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
