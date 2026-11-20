/**
 * capacitorAdapter.ts — Native Android & iOS Platform Adapter (Platform Layer)
 *
 * Bridges Capacitor native plugins (App, StatusBar, Keyboard, Haptics, Network,
 * Preferences, SplashScreen) behind PlatformAdapter so Android & iOS share the
 * exact same application code while feeling genuinely native.
 */
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { SplashScreen } from '@capacitor/splash-screen';
import type { HapticStyle, PlatformAdapter, PlatformCapabilities, PlatformTarget } from './types';
import { createLogger } from '../core/logging/logger';

const log = createLogger('CapacitorPlatform');

export class CapacitorPlatformAdapter implements PlatformAdapter {
  private readonly target: PlatformTarget;

  constructor() {
    const raw = Capacitor.getPlatform();
    this.target = raw === 'android' ? 'android' : raw === 'ios' ? 'ios' : 'web';
  }

  public getCapabilities(): PlatformCapabilities {
    return {
      target: this.target,
      isNative: Capacitor.isNativePlatform(),
      isAndroid: this.target === 'android',
      isIOS: this.target === 'ios',
      isWeb: this.target === 'web',
      isStandalonePWA: false,
      isIOSSafariBrowser: false,
      hasNativeStorage: true,
    };
  }

  public async initialize(theme: 'light' | 'dark'): Promise<void> {
    await this.syncStatusBar(theme);

    // Configure native keyboard behavior for iOS/Android
    try {
      if (this.target === 'ios') {
        await Keyboard.setResizeMode({ mode: KeyboardResize.Body });
        await Keyboard.setScroll({ isDisabled: false });
      }
    } catch (err) {
      log.debug('Keyboard plugin configuration skipped', { err });
    }

    // Hide splash screen cleanly after first render boot
    try {
      await SplashScreen.hide();
    } catch (err) {
      log.debug('SplashScreen.hide skipped', { err });
    }
  }

  public async syncStatusBar(theme: 'light' | 'dark'): Promise<void> {
    try {
      await StatusBar.setStyle({
        style: theme === 'dark' ? Style.Dark : Style.Light,
      });
      if (this.target === 'android') {
        await StatusBar.setBackgroundColor({
          color: theme === 'dark' ? '#141414' : '#FBFBFA',
        });
      }
    } catch (err) {
      log.debug('StatusBar sync skipped', { err });
    }
  }

  public async triggerHaptic(style: HapticStyle): Promise<void> {
    try {
      if (style === 'success') {
        await Haptics.notification({ type: NotificationType.Success });
      } else if (style === 'error') {
        await Haptics.notification({ type: NotificationType.Error });
      } else if (style === 'medium') {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } else {
        await Haptics.impact({ style: ImpactStyle.Light });
      }
    } catch {
      // Ignore haptic failures on devices with haptics disabled.
    }
  }

  public onHardwareBackButton(handler: () => boolean): () => void {
    let active = true;
    const handlePromise = CapacitorApp.addListener('backButton', () => {
      if (!active) return;
      const handled = handler();
      if (!handled) {
        void this.exitApp();
      }
    });

    return () => {
      active = false;
      void handlePromise.then((h) => h.remove()).catch(() => {});
    };
  }

  public onAppStateChange(handler: (isActive: boolean) => void): () => void {
    let active = true;
    const handlePromise = CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (active) handler(isActive);
    });
    return () => {
      active = false;
      void handlePromise.then((h) => h.remove()).catch(() => {});
    };
  }

  public onNetworkChange(handler: (online: boolean) => void): () => void {
    let active = true;
    const handlePromise = Network.addListener('networkStatusChange', (status) => {
      if (active) handler(status.connected);
    });
    return () => {
      active = false;
      void handlePromise.then((h) => h.remove()).catch(() => {});
    };
  }

  public async isOnline(): Promise<boolean> {
    try {
      const status = await Network.getStatus();
      return status.connected;
    } catch {
      return typeof navigator !== 'undefined' ? navigator.onLine : true;
    }
  }

  public async kvGet(key: string): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key });
      if (value !== null) return value;
    } catch (err) {
      log.warn('Capacitor Preferences.get failed, falling back to localStorage', { key, err });
    }
    try {
      return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  }

  public async kvSet(key: string, value: string): Promise<void> {
    try {
      await Preferences.set({ key, value });
    } catch (err) {
      log.warn('Capacitor Preferences.set failed', { key, err });
    }
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem(key, value);
    } catch {
      // Mirror best-effort
    }
  }

  public async kvRemove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (err) {
      log.warn('Capacitor Preferences.remove failed', { key, err });
    }
    try {
      if (typeof window !== 'undefined') window.localStorage.removeItem(key);
    } catch {
      // Mirror best-effort
    }
  }

  public async exitApp(): Promise<void> {
    try {
      await CapacitorApp.exitApp();
    } catch {
      // iOS disallows programmatic app exit; safe no-op.
    }
  }
}
