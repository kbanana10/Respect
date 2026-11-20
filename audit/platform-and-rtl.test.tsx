import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { serviceContainer } from '../src/core/container';
import { PLATFORM_TOKEN, WebPlatformAdapter, getPlatform, type PlatformAdapter } from '../src/platform';
import { NetworkStatusBadge } from '../src/components/NetworkStatusBadge';
import { AuthProvider, useAuth } from '../src/store/AuthContext';
import { DataBackupCard } from '../src/presentation/components/DataBackupCard';

function LanguageDirHarness() {
  const { language, setLanguage, theme, toggleTheme } = useAuth();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={() => setLanguage('ar')}>Switch AR</button>
      <button type="button" onClick={() => setLanguage('ku')}>Switch KU</button>
      <button type="button" onClick={() => setLanguage('en')}>Switch EN</button>
      <button type="button" onClick={toggleTheme}>Toggle Theme</button>
      <DataBackupCard />
    </div>
  );
}

describe('Cross-Platform DI, RTL Switching, Network Badge & DataBackupCard', () => {
  afterEach(() => {
    cleanup();
    serviceContainer.registerInstance(PLATFORM_TOKEN, new WebPlatformAdapter());
    localStorage.clear();
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
    document.documentElement.classList.remove('dark');
  });

  it('switches document dir and lang cleanly between EN (LTR), AR (RTL), and KU (LTR)', async () => {
    render(
      <AuthProvider>
        <LanguageDirHarness />
      </AuthProvider>,
    );

    const arBtn = await screen.findByText('Switch AR');
    fireEvent.click(arBtn);
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
    expect(screen.getByText('التخزين والمزامنة والنسخ الاحتياطي')).toBeTruthy();

    fireEvent.click(screen.getByText('Switch KU'));
    expect(document.documentElement.dir).toBe('ltr');
    expect(document.documentElement.lang).toBe('ku');

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('supports DI override of PlatformAdapter for native Android/iOS simulation', async () => {
    const listeners = new Set<(online: boolean) => void>();
    const fakeNativePlatform: PlatformAdapter = {
      getCapabilities: () => ({
        target: 'ios',
        isNative: true,
        isAndroid: false,
        isIOS: true,
        isWeb: false,
        isStandalonePWA: false,
        isIOSSafariBrowser: false,
        hasNativeStorage: true,
      }),
      initialize: vi.fn(async () => {}),
      syncStatusBar: vi.fn(async () => {}),
      triggerHaptic: vi.fn(async () => {}),
      onHardwareBackButton: () => () => {},
      onAppStateChange: () => () => {},
      onNetworkChange: (cb) => {
        listeners.add(cb);
        return () => listeners.delete(cb);
      },
      isOnline: async () => false,
      kvGet: vi.fn(async () => null),
      kvSet: vi.fn(async () => {}),
      kvRemove: vi.fn(async () => {}),
      exitApp: vi.fn(async () => {}),
    };

    serviceContainer.registerInstance(PLATFORM_TOKEN, fakeNativePlatform);
    expect(getPlatform().getCapabilities().target).toBe('ios');
    expect(getPlatform().getCapabilities().isNative).toBe(true);

    render(
      <AuthProvider>
        <NetworkStatusBadge />
      </AuthProvider>,
    );

    const badge = await screen.findByText(/Offline Mode/i);
    expect(badge).toBeTruthy();
  });
});
