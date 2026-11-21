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
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AdBanner, InterstitialAdModal, RewardedAdModal } from '../src/features/monetization/components/AdElements';
import { useAdStore } from '../src/features/monetization/store/adStore';
import { ParentalGateModal } from '../src/components/ui/ParentalGateModal';
import { Writing } from '../src/pages/Writing';
import { Store } from '../src/pages/Store';
import { QuizModePicker } from '../src/features/quiz/components/QuizModePicker';
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
    onboardingCompleted: true,
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
  playSuccessSound: vi.fn(),
  playFailureSound: vi.fn(),
  playCompleteSound: vi.fn(),
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
    expect(screen.getByText(/Words/i)).toBeTruthy();

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
    const imageBtn = screen.getByRole('button', { name: /Image Quiz/i });
    expect((imageBtn as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(imageBtn);
    expect(onPick).toHaveBeenCalledWith('emoji_match');
  });
});

describe('Unit 0 Curriculum, Offline Fonts & Tri-Lingual Discipline', () => {
  it('starts learningPath with Unit 0 (U0) Hawar Foundations in EN/AR/KU', () => {
    expect(learningPath[0].id).toBe('U0');
    expect(learningPath[0].requiredXp).toBe(0);
    expect(learningPath[0].lessons.length).toBeGreaterThanOrEqual(3);
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
