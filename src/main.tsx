import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Locally bundled Offline-First fonts (no external Google Fonts network dependency)
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/700.css';
import '@fontsource/fraunces/800.css';
import '@fontsource/noto-kufi-arabic/400.css';
import '@fontsource/noto-kufi-arabic/500.css';
import '@fontsource/noto-kufi-arabic/600.css';
import '@fontsource/noto-kufi-arabic/700.css';
import '@fontsource/noto-kufi-arabic/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import App from './App.tsx';
import './index.css';

// Register standard Vite PWA
import { registerSW } from 'virtual:pwa-register';
registerSW({
  onNeedRefresh() {
    // Auto-update silently on next navigation
  },
  onOfflineReady() {
    // Offline assets and local fonts are ready
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
