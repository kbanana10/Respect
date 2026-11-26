/**
 * kids-adults-rebuild.test.tsx
 *
 * Stage 4 verification tests for the Kids + Adults Adaptive Rebuild:
 *  - Kids Mode 100% ad suppression across Banner, Interstitial, and Rewarded surfaces
 *  - ParentalGateModal rejects wrong answers and unlocks on the exact sum
 *  - Zero "Coming Soon" dead ends across Writing Studio, Store, QuizModePicker, and Games
 *  - Unit 0 (Hawar Foundations) starts the CEFR learning path with tri-lingual metadata
 *  - Offline bundled fonts (@fontsource/*) with zero Google Fonts CDN imports
 *  - Zero binary `language === 'ar'` / `language !== 'ar'` checks in UI pages/components
 */
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AdBanner, InterstitialAdModal, RewardedAdModal } from '../src/features/monetization/components/AdElements';
import { useAdStore } from '../src/features/monetization/store/adStore';
import { ParentalGateModal } from '../src/components/ui/ParentalGateModal';
import { Writing } from '../src/pages/Writing';
import { Store } from '../src/pages/Store';
import { Favorites } from '../src/pages/Favorites';
import { OnboardingFlow } from '../src/components/OnboardingFlow';
import { Modal } from '../src/components/ui/Modal';
import { QuizModePicker } from '../src/features/quiz/components/QuizModePicker';
import { MemoryMatchGame } from '../src/features/games/MemoryMatchGame';
import { getCurriculumWordPool } from '../src/features/games/curriculumWords';
import { searchVocabulary } from '../src/data/adapters/contentAdapter';
import { generateQuestionsForModule } from '../src/features/quiz/utils/questionGenerator';
import { learningPath } from '../src/data/learningPath';
import type { Language, LearnerMode, UserData } from '../src/models/user';

const mockUpdateUserData = vi.fn().mockResolvedValue(undefined);
const mockUpdateUserProgress = vi.fn().mockResolvedValue(undefined);

let mockLanguage: Language = 'en';
let mockLearnerMode: LearnerMode = 'kids';
let mockGems = 200;

function buildMockUserData(): UserData {
  return {
    schemaVersion: 4,
    xp: 120,
    level: 2,
    streak: 3,
    gems: mockGems,
    streakFreezes: 1,
    wordsLearned: 12,
    quizzesCompleted: 3,
    sessionsCount: 4,
    completedLessons: ['u0_vowels'],
    badges: ['first_steps'],
    unlockedLevels: ['U0', 'A1'],
    favorites: [],
    recentSearches: [],
    reviewDeck: {},
    learnerMode: mockLearnerMode,
    activeAccent: 'gold',
    unlockedAvatars: ['av-1'],
    unlockedStickers: ['sticker_sun'],
    relaxedTimer: mockLearnerMode === 'kids',
    parentalGateEnabled: mockLearnerMode === 'kids',
    isOnboarded: true,
    lastActive: Date.now(),
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now(),
  };
}

vi.mock('../src/store/AuthContext', () => ({
  useAuth: () => ({
    user: { uid: 'guest', displayName: 'Zana', email: null },
    userData: buildMockUserData(),
    language: mockLanguage,
    theme: 'light' as const,
    loading: false,
    updateUserData: mockUpdateUserData,
    updateUserProgress: mockUpdateUserProgress,
    setLanguage: vi.fn(),
    toggleTheme: vi.fn(),
  }),
}));

vi.mock('../src/features/audio/hooks/useAudio', () => ({
  useAudio: () => ({
    play: vi.fn(),
    stop: vi.fn(),
    isPlaying: false,
    progress: 0,
  }),
  stopAllActiveAudio: vi.fn(),
  playTapSound: vi.fn(),
  playButtonClickSound: vi.fn(),
  playSuccessSound: vi.fn(),
  playFailureSound: vi.fn(),
  playRewardSound: vi.fn(),
  playCompleteSound: vi.fn(),
  playAudioUrl: vi.fn().mockResolvedValue(undefined),
  getMuteState: vi.fn(() => false),
  setMuteState: vi.fn(),
  useSoundMuted: () => [false, vi.fn()] as const,
}));

describe('Kids Mode — 100% Ad Suppression', () => {
  beforeEach(() => {
    mockLanguage = 'en';
    mockLearnerMode = 'kids';
    useAdStore.setState({
      bannersEnabled: true,
      interstitialActive: true,
      rewardedActive: true,
      rewardedOnSuccess: null,
      rewardedOnClose: null,
    });
  });

  it('suppresses AdBanner, InterstitialAdModal, and RewardedAdModal completely in Kids Mode', () => {
    const banner = render(<AdBanner />);
    expect(banner.container.innerHTML).toBe('');

    const interstitial = render(<InterstitialAdModal />);
    expect(interstitial.container.innerHTML).toBe('');

    const rewarded = render(<RewardedAdModal />);
    expect(rewarded.container.innerHTML).toBe('');
  });

  it('still renders AdBanner in Adults Mode when bannersEnabled is true', () => {
    mockLearnerMode = 'adults';
    const { container } = render(<AdBanner />);
    expect(container.textContent).toContain('Sponsored Advertisement');
  });
});

describe('ParentalGateModal — Grown-Up Math Guard', () => {
  beforeEach(() => {
    mockLanguage = 'en';
    mockLearnerMode = 'kids';
  });

  it('rejects a wrong answer and unlocks on the exact sum', () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    render(<ParentalGateModal open={true} onClose={onClose} onSuccess={onSuccess} />);

    const eqText = screen.getByTestId('parental-gate-equation').textContent ?? '';
    const match = eqText.match(/(\d+)\s*\+\s*(\d+)/);
    expect(match).not.toBeNull();
    const sum1 = Number(match![1]) + Number(match![2]);

    const input = screen.getByPlaceholderText('Answer');
    fireEvent.change(input, { target: { value: String(sum1 + 5) } });
    fireEvent.click(screen.getByRole('button', { name: 'Unlock' }));

    expect(onSuccess).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeTruthy();

    // After a wrong guess the equation regenerates; read the fresh equation
    const eqText2 = screen.getByTestId('parental-gate-equation').textContent ?? '';
    const match2 = eqText2.match(/(\d+)\s*\+\s*(\d+)/);
    expect(match2).not.toBeNull();
    const sum2 = Number(match2![1]) + Number(match2![2]);

    fireEvent.change(screen.getByPlaceholderText('Answer'), { target: { value: String(sum2) } });
    fireEvent.click(screen.getByRole('button', { name: 'Unlock' }));

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});

describe('Zero "Coming Soon" Dead Ends & Live Rebuilt Surfaces', () => {
  beforeEach(() => {
    mockLanguage = 'en';
    mockLearnerMode = 'kids';
    mockGems = 200;
  });

  it('removed dead WritingComingSoon, writingFlags, and bun.lock artifacts', () => {
    expect(fs.existsSync('src/pages/WritingComingSoon.tsx')).toBe(false);
    expect(fs.existsSync('src/lib/writingFlags.ts')).toBe(false);
    expect(fs.existsSync('bun.lock')).toBe(false);
  });

  it('Writing Studio renders live Letters, Words, and Sentences tabs without Coming Soon text', () => {
    render(
      <MemoryRouter>
        <Writing />
      </MemoryRouter>,
    );

    expect(screen.getByRole('tab', { name: 'Letters' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Words' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Sentences' })).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'Words' }));
    expect(screen.getByText('Av')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'Sentences' }));
    expect(screen.getByText(/Roj baş/i)).toBeTruthy();
  });

  it('Store renders live offline rewards with zero Coming Soon copy', () => {
    const { container } = render(
      <MemoryRouter>
        <Store />
      </MemoryRouter>,
    );
    expect(container.textContent).not.toMatch(/coming soon/i);
    expect(screen.getByText('Theme Accents')).toBeTruthy();
    expect(screen.getByText('Avatars & Mascots')).toBeTruthy();
    expect(screen.getByText('Kids Sticker Book')).toBeTruthy();
  });

  it('QuizModePicker unlocks visual emoji_match mode with zero Coming Soon locks', () => {
    const onPick = vi.fn();
    const { container } = render(
      <QuizModePicker
        language="en"
        userLevelId="U0"
        showAdaptive={true}
        isKidsMode={true}
        onSelectMode={onPick}
        onBack={vi.fn()}
        onLeaderboard={vi.fn()}
      />,
    );
    expect(container.textContent).not.toMatch(/coming soon/i);
    const imageBtn = screen.getByRole('button', { name: /Emoji Association/i });
    expect((imageBtn as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(imageBtn);
    expect(onPick).toHaveBeenCalledWith('emoji_match');
  });
});

describe('Unit 0 Curriculum, Offline Fonts & Tri-Lingual Discipline', () => {
  it('starts learningPath with Unit 0 (U0) Hawar Foundations in EN/AR/KU', () => {
    expect(learningPath[0].id).toBe('U0');
    expect(learningPath[0].requiredXp).toBe(0);
    expect(learningPath[0].lessons.length).toBeGreaterThanOrEqual(2);
    expect(learningPath[0].title.length).toBeGreaterThan(0);
    expect(learningPath[0].titleAr.length).toBeGreaterThan(0);
    expect(learningPath[0].titleKu.length).toBeGreaterThan(0);
  });

  it('bundles @fontsource fonts locally with zero Google Fonts CDN imports', () => {
    const css = fs.readFileSync('src/index.css', 'utf8');
    const main = fs.readFileSync('src/main.tsx', 'utf8');
    expect(css).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com/);
    expect(main).toContain('@fontsource/plus-jakarta-sans');
    expect(main).toContain('@fontsource/noto-kufi-arabic');
  });

  it('has zero binary language === "ar" or language !== "ar" checks in src/pages and src/components', () => {
    const dirs = ['src/pages', 'src/components'];
    const offenders: string[] = [];

    const scan = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scan(full);
        } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
          const content = fs.readFileSync(full, 'utf8');
          if (/language\s*(?:===|!==)\s*['"]ar['"]/.test(content)) {
            offenders.push(full);
          }
        }
      }
    };

    dirs.forEach(scan);
    expect(offenders).toEqual([]);
  });
});

describe('MemoryMatchGame — Pure State Updaters & Stable Victory Screen', () => {
  beforeEach(() => {
    mockLanguage = 'en';
    mockLearnerMode = 'kids';
  });

  it('completes all 6 pairs without React setState-in-render warnings and keeps victory state visible', () => {
    vi.useFakeTimers();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const onWinSpy = vi.fn();

    function ParentHarness() {
      const [celebrating, setCelebrating] = useState(false);
      return (
        <div>
          <span data-testid="parent-celebrate">{celebrating ? 'yes' : 'no'}</span>
          <MemoryMatchGame
            onWin={(xp) => {
              setCelebrating(true);
              onWinSpy(xp);
            }}
            onExit={vi.fn()}
          />
        </div>
      );
    }

    try {
      const pool = getCurriculumWordPool(buildMockUserData(), 24);
      const labelToWordId = new Map<string, string>();
      for (const word of pool) {
        labelToWordId.set(word.ku, word.id);
        labelToWordId.set(word.en, word.id);
      }

      render(<ParentHarness />);

      // Reveal cards in pairs to learn their word ids, then match all 6 pairs cleanly.
      const cardButtons = () =>
        screen
          .getAllByRole('button')
          .filter((btn) => btn.hasAttribute('aria-pressed') && btn.closest('.grid') !== null);

      const cardCount = cardButtons().length;
      expect(cardCount).toBe(12);

      const indexByWordId = new Map<string, number[]>();
      for (let i = 0; i < cardCount; i += 2) {
        fireEvent.click(cardButtons()[i]);
        const labelA = cardButtons()[i].getAttribute('aria-label') ?? '';
        fireEvent.click(cardButtons()[i + 1]);
        const labelB = cardButtons()[i + 1].getAttribute('aria-label') ?? '';

        const wordIdA = labelToWordId.get(labelA);
        const wordIdB = labelToWordId.get(labelB);
        if (wordIdA) {
          indexByWordId.set(wordIdA, [...(indexByWordId.get(wordIdA) ?? []), i]);
        }
        if (wordIdB) {
          indexByWordId.set(wordIdB, [...(indexByWordId.get(wordIdB) ?? []), i + 1]);
        }

        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      for (const indices of indexByWordId.values()) {
        if (indices.length !== 2) continue;
        const buttons = cardButtons();
        if (buttons.length === 0) break;
        if (buttons[indices[0]].getAttribute('aria-pressed') === 'true') continue;
        fireEvent.click(buttons[indices[0]]);
        fireEvent.click(buttons[indices[1]]);
        act(() => {
          vi.advanceTimersByTime(500);
        });
      }

      expect(onWinSpy).toHaveBeenCalledTimes(1);
      expect(onWinSpy).toHaveBeenCalledWith(20);
      expect(screen.getByTestId('parent-celebrate').textContent).toBe('yes');
      expect(screen.getByText('6/6')).toBeTruthy();

      const setStateInRenderCalls = consoleErrorSpy.mock.calls.filter((args) =>
        args.some((arg) => typeof arg === 'string' && arg.includes('Cannot update a component')),
      );
      expect(setStateInRenderCalls).toEqual([]);
    } finally {
      consoleErrorSpy.mockRestore();
      vi.useRealTimers();
    }
  });
});

describe('Full-App QA Regression Fixes', () => {
  beforeEach(() => {
    mockLanguage = 'en';
    mockLearnerMode = 'adults';
    mockGems = 200;
    localStorage.removeItem('kurmanji_favorites');
  });

  it('Store displays tiered avatar pricing for av-1..av-8 (av-1 and av-2 free, av-3=40, av-8=80)', () => {
    render(
      <MemoryRouter>
        <Store />
      </MemoryRouter>,
    );
    expect(screen.getByText('💎40')).toBeTruthy();
    expect(screen.getByText('💎50')).toBeTruthy();
    expect(screen.getByText('💎70')).toBeTruthy();
    expect(screen.getByText('💎80')).toBeTruthy();
  });

  it('Modal closes on Escape even when focus is on document.body and honors closeLabel', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} title="Daily Goal" closeLabel="Close goal sheet">
        <p>Pick a tier</p>
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'Close goal sheet' })).toBeTruthy();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('generateQuestionsForModule("all") returns a valid mixed practice set', () => {
    const qs = generateQuestionsForModule('all', 'multiple_choice', 'en', buildMockUserData());
    expect(qs.length).toBeGreaterThanOrEqual(4);
  });

  it('OnboardingFlow starts directly on Learner Mode (3 steps) with accurate avatar labels', async () => {
    render(<OnboardingFlow onComplete={vi.fn()} />);
    expect(screen.getByText(/Step 1 \/ 3/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    expect(await screen.findByRole('button', { name: 'Happy Friend' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Scholar' })).toBeTruthy();
  });

  it('Search result favorited by ID resolves and displays inside Favorites', () => {
    const matches = searchVocabulary({ query: 'Dayik', limit: 5 });
    expect(matches.length).toBeGreaterThan(0);
    const dayikId = matches[0].id;
    localStorage.setItem('kurmanji_favorites', JSON.stringify({ [dayikId]: true }));

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );
    expect(screen.getByText(matches[0].lemmaKu)).toBeTruthy();
  });

  it('WordMatchingGame runs timer-free with infinite tries in Kids Mode', async () => {
    const { WordMatchingGame } = await import('../src/components/games/WordMatchingGame');
    const sampleVocab = [
      { id: 'w1', ku: 'Av', en: 'Water', ar: 'ماء', categoryId: 'basics', audio: '', emoji: '💧' },
      { id: 'w2', ku: 'Nan', en: 'Bread', ar: 'خبز', categoryId: 'basics', audio: '', emoji: '🍞' },
      { id: 'w3', ku: 'Roj', en: 'Sun', ar: 'شمس', categoryId: 'basics', audio: '', emoji: '☀️' },
      { id: 'w4', ku: 'Dar', en: 'Tree', ar: 'شجرة', categoryId: 'basics', audio: '', emoji: '🌳' },
    ];
    render(
      <WordMatchingGame
        vocabulary={sampleVocab}
        language="en"
        isKidsMode={true}
        onWin={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByTestId('word-matching-relaxed-badge')).toBeTruthy();
    expect(screen.queryByTestId('word-matching-timer')).toBeNull();
    expect(screen.getByText(/Unlimited/i)).toBeTruthy();
  });
});


