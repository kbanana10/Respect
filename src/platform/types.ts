/**
 * types.ts — Cross-Platform Abstraction Contract (Platform Layer)
 *
 * Isolates Android, iOS, and Web/PWA capabilities behind a single uniform
 * interface so Presentation, Application, and Domain layers remain 100%
 * platform-agnostic.
 */

export type PlatformTarget = 'android' | 'ios' | 'web';

export type HapticStyle = 'light' | 'medium' | 'success' | 'error';

export interface PlatformCapabilities {
  readonly target: PlatformTarget;
  readonly isNative: boolean;
  readonly isAndroid: boolean;
  readonly isIOS: boolean;
  readonly isWeb: boolean;
  readonly isStandalonePWA: boolean;
  readonly isIOSSafariBrowser: boolean;
  readonly hasNativeStorage: boolean;
}

export interface PlatformAdapter {
  getCapabilities(): PlatformCapabilities;
  initialize(theme: 'light' | 'dark'): Promise<void>;
  syncStatusBar(theme: 'light' | 'dark'): Promise<void>;
  triggerHaptic(style: HapticStyle): Promise<void>;
  /**
   * Registers a hardware back-button listener (Android).
   * Return `true` if handled in-app, or `false` to allow exiting the app.
   */
  onHardwareBackButton(handler: () => boolean): () => void;
  /**
   * Fires when the app returns to foreground (true) or enters background (false).
   */
  onAppStateChange(handler: (isActive: boolean) => void): () => void;
  /**
   * Fires whenever network connectivity changes on Web, Android, or iOS.
   */
  onNetworkChange(handler: (online: boolean) => void): () => void;
  isOnline(): Promise<boolean>;
  /**
   * Platform-native key-value storage (SharedPreferences on Android,
   * UserDefaults on iOS, localStorage on Web).
   */
  kvGet(key: string): Promise<string | null>;
  kvSet(key: string, value: string): Promise<void>;
  kvRemove(key: string): Promise<void>;
  exitApp(): Promise<void>;
}
