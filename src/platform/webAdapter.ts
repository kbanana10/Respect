/**
 * webAdapter.ts — Web & PWA Platform Implementation (Platform Layer)
 */
import type { HapticStyle, PlatformAdapter, PlatformCapabilities } from './types';
import { createLogger } from '../core/logging/logger';

const log = createLogger('WebPlatform');

interface IOSNavigator extends Navigator {
  readonly standalone?: boolean;
}

function detectStandalonePWA(): boolean {
  if (globalThis.window === undefined) return false;
  const standaloneMedia =
    Boolean(window.matchMedia) &&
    window.matchMedia('(display-mode: standalone)').matches;
  // SAFETY: iOS Safari exposes the non-standard boolean `navigator.standalone` property on the standard Navigator instance.
  const iosNav = window.navigator as IOSNavigator;
  const iosStandalone = iosNav.standalone === true;
  return standaloneMedia || iosStandalone;
}

function detectIOSSafari(): boolean {
  if (globalThis.window === undefined || globalThis.navigator === undefined) return false;
  const ua = navigator.userAgent.toLowerCase();
  const isIOSDevice =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return isIOSDevice && !detectStandalonePWA();
}

export class WebPlatformAdapter implements PlatformAdapter {
  public getCapabilities(): PlatformCapabilities {
    const isStandalonePWA = detectStandalonePWA();
    const isIOSSafariBrowser = detectIOSSafari();
    return {
      target: 'web',
      isNative: false,
      isAndroid: false,
      isIOS: false,
      isWeb: true,
      isStandalonePWA,
      isIOSSafariBrowser,
      hasNativeStorage: false,
    };
  }

  public async initialize(theme: 'light' | 'dark'): Promise<void> {
    await this.syncStatusBar(theme);
  }

  public async syncStatusBar(theme: 'light' | 'dark'): Promise<void> {
    if (globalThis.document === undefined) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) {
      meta.content = theme === 'dark' ? '#141414' : '#FFB300';
    }
  }

  public async triggerHaptic(style: HapticStyle): Promise<void> {
    if (globalThis.navigator === undefined || !('vibrate' in navigator)) return;
    try {
      const pattern =
        style === 'success' ? [12, 40, 18] :
        style === 'error' ? [35, 30, 35] :
        style === 'medium' ? 18 : 8;
      navigator.vibrate(pattern);
    } catch {
      // Browsers may block vibration before user gesture — safe no-op.
    }
  }

  public onHardwareBackButton(_handler: () => boolean): () => void {
    return () => {};
  }

  public onAppStateChange(handler: (isActive: boolean) => void): () => void {
    if (globalThis.document === undefined) return () => {};
    const listener = () => {
      handler(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', listener);
    return () => document.removeEventListener('visibilitychange', listener);
  }

  public onNetworkChange(handler: (online: boolean) => void): () => void {
    if (globalThis.window === undefined) return () => {};
    const onOnline = () => handler(true);
    const onOffline = () => handler(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }

  public async isOnline(): Promise<boolean> {
    if (globalThis.navigator === undefined) return true;
    return navigator.onLine;
  }

  public async kvGet(key: string): Promise<string | null> {
    try {
      if (globalThis.window === undefined) return null;
      return window.localStorage.getItem(key);
    } catch (err) {
      log.warn('localStorage.getItem failed', { key, err: err instanceof Error ? err : String(err) });
      return null;
    }
  }

  public async kvSet(key: string, value: string): Promise<void> {
    try {
      if (globalThis.window === undefined) return;
      window.localStorage.setItem(key, value);
    } catch (err) {
      log.warn('localStorage.setItem failed', { key, err: err instanceof Error ? err : String(err) });
    }
  }

  public async kvRemove(key: string): Promise<void> {
    try {
      if (globalThis.window === undefined) return;
      window.localStorage.removeItem(key);
    } catch (err) {
      log.warn('localStorage.removeItem failed', { key, err: err instanceof Error ? err : String(err) });
    }
  }

  public async exitApp(): Promise<void> {
    // No-op on web browsers.
  }
}
