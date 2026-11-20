import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
          type: 'module',
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//, /^\/audio\//],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-stylesheets',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 365 * 24 * 60 * 60,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /\.(?:mp3|wav|ogg|woff2?)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'audio-and-fonts-cache',
                expiration: {
                  maxEntries: 400,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        includeAssets: ['favicon.png', 'icon.svg', 'apple-touch-icon.png', 'pwa-maskable-512x512.png'],
        manifest: {
          id: '/',
          name: 'Kurdish Quest — Learn Kurmanji',
          short_name: 'KurdQuest',
          description: 'Interactive cross-platform app to learn Kurdish (Kurmanji) with alphabet, writing, grammar, CEFR roadmap, quizzes, and offline spaced repetition.',
          theme_color: '#FBFBFA',
          background_color: '#FBFBFA',
          display: 'standalone',
          orientation: 'any',
          start_url: '/',
          scope: '/',
          categories: ['education', 'books'],
          icons: [
            { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
            { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
      }),
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) return;
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }
        },
      },
    ],
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('firebase') || id.includes('@firebase')) return 'vendor-firebase';
            if (id.includes('@capacitor')) return 'vendor-capacitor';
            if (id.includes('motion') || id.includes('framer')) return 'vendor-motion';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('react-confetti') || id.includes('tween-functions')) return 'vendor-confetti';
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            return 'vendor';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      allowedHosts: true,
    },
  };
});
