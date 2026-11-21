/**
 * index.ts — Platform Facade, DI Registration & Cross-Platform React Hooks
 */
import { useEffect, useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { createServiceToken, serviceContainer } from '../core/container';
import type { PlatformAdapter } from './types';
import { WebPlatformAdapter } from './webAdapter';
import { CapacitorPlatformAdapter } from './capacitorAdapter';

export type { PlatformAdapter } from './types';
export { WebPlatformAdapter } from './webAdapter';

export const PLATFORM_TOKEN = createServiceToken<PlatformAdapter>('PlatformAdapter');

function createDefaultPlatformAdapter(): PlatformAdapter {
  try {
    if (Capacitor.isNativePlatform()) {
      return new CapacitorPlatformAdapter();
    }
  } catch {
    // Fallback to web adapter in non-browser/SSR/unit-test environments.
  }
  return new WebPlatformAdapter();
}

serviceContainer.registerSingleton(PLATFORM_TOKEN, createDefaultPlatformAdapter);

export function getPlatform(): PlatformAdapter {
  return serviceContainer.resolve(PLATFORM_TOKEN);
}

/** Reactive connectivity hook working seamlessly on Web, Android, and iOS. */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(
    globalThis.navigator !== undefined ? navigator.onLine : true,
  );

  useEffect(() => {
    const platform = getPlatform();
    let mounted = true;
    void platform.isOnline().then((online) => {
      if (mounted) setIsOnline(online);
    });
    const unsubscribe = platform.onNetworkChange((online) => {
      if (mounted) setIsOnline(online);
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return isOnline;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

/** Cross-browser PWA install hook (Chromium beforeinstallprompt + iOS Safari detection). */
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    const caps = getPlatform().getCapabilities();
    return caps.isNative || caps.isStandalonePWA;
  });
  const [isIOSSafari, setIsIOSSafari] = useState<boolean>(
    () => getPlatform().getCapabilities().isIOSSafariBrowser,
  );

  useEffect(() => {
    const caps = getPlatform().getCapabilities();
    setIsInstalled(caps.isNative || caps.isStandalonePWA);
    setIsIOSSafari(caps.isIOSSafariBrowser);

    if (globalThis.window === undefined || caps.isNative) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // SAFETY: The browser `beforeinstallprompt` event always implements `prompt()` and `userChoice`.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  return {
    isInstallable: Boolean(deferredPrompt),
    isInstalled,
    isIOS: isIOSSafari,
    install,
  };
}
