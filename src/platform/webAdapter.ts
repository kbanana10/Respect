/**
 * webAdapter.ts — Web & PWA Platform Implementation (Platform Layer)
 */
import type { HapticStyle, PlatformAdapter, PlatformCapabilities } from './types';
import { createLogger } from '../core/logging/logger';

const log = createLogger('WebPlatform');

function detectStandalonePWA(): boolean {
  if (typeof window === 'undefined') return false;
  const standaloneMedia =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(display-mode: standalone)').matches;
  const iosStandalone =
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return standaloneMedia || iosStandalone;
}

function detectIOSSafari(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
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
    if (typeof document === 'undefined') return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) {
      meta.content = theme === 'dark' ? '#141414' : '#FFB300';
    }
  }

  public async triggerHaptic(style: HapticStyle): Promise<void> {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
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
    // Web uses browser history popstate; no hardware back button interception needed.
    return () => {};
  }

  public onAppStateChange(handler: (isActive: boolean) => void): () => void {
    if (typeof document === 'undefined') return () => {};
    const listener = () => {
      handler(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', listener);
    return () => document.removeEventListener('visibilitychange', listener);
  }

  public onNetworkChange(handler: (online: boolean) => void): () => void {
    if (typeof window === 'undefined') return () => {};
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
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  }

  public async kvGet(key: string): Promise<string | null> {
    try {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(key);
    } catch (err) {
      log.warn('localStorage.getItem failed', { key, err });
      return null;
    }
  }

  public async kvSet(key: string, value: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, value);
    } catch (err) {
      log.warn('localStorage.setItem failed', { key, err });
    }
  }

  public async kvRemove(key: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    } catch (err) {
      log.warn('localStorage.removeItem failed', { key, err });
    }
  }

  public async exitApp(): Promise<void> {
    // No-op on web browsers.
  }
}
