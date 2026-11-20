import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.kurdishquest.app',
  appName: 'Kurdish Quest',
  webDir: 'dist',
  backgroundColor: '#FBFBFA',
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    allowsLinkPreview: false,
    scrollEnabled: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#FBFBFA',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: false,
    },
    StatusBar: {
      overlaysWebView: false,
      style: 'LIGHT',
      backgroundColor: '#FBFBFA',
    },
    Keyboard: {
      resize: KeyboardResize.Body,
      resizeOnFullScreen: true,
    },
  },
};

export default config;
