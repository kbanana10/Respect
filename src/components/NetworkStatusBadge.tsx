/**
 * NetworkStatusBadge.tsx — Trilingual Offline & Cloud Sync Connectivity Indicator
 *
 * Always informs learners when offline (even in local-first guest mode so
 * offline capability is transparent), and displays syncing/reconnected states
 * when cloud sync is configured.
 */
import React, { useState, useEffect, useRef } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { syncEngine, type SyncEngineStatus } from '../services/SyncEngine';
import { isFirebaseConfigured } from '../lib/firebase';
import { useAuth } from '../store/AuthContext';
import { useOnlineStatus } from '../platform';
import { motion, AnimatePresence } from 'motion/react';
import type { Language } from '../models/user';

const COPY: Record<
  Language,
  { offline: string; syncing: (n: number) => string; backOnline: string; merged: string }
> = {
  en: {
    offline: 'Offline Mode — Saved locally',
    syncing: (n) => `Syncing (${n})...`,
    backOnline: 'Back Online',
    merged: 'Progress synced across devices',
  },
  ar: {
    offline: 'وضع بدون إنترنت — الحفظ محلي',
    syncing: (n) => `جاري المزامنة (${n})...`,
    backOnline: 'تمت استعادة الاتصال',
    merged: 'تمت مزامنة التقدم بنجاح',
  },
  ku: {
    offline: 'Bê înternet — Li cîhazê tê tomarkirin',
    syncing: (n) => `Hevdengkirin (${n})...`,
    backOnline: 'Înternet vegeriya',
    merged: 'Pêşveçûn hate hevdengkirin',
  },
};

export function NetworkStatusBadge() {
  const { language } = useAuth();
  const platformOnline = useOnlineStatus();
  const [status, setStatus] = useState<SyncEngineStatus>(() => syncEngine.getStatus());
  const [showOnlineToast, setShowOnlineToast] = useState(false);
  const effectiveOnline = platformOnline && status.isOnline;
  const wasOnlineRef = useRef<boolean>(effectiveOnline);
  const onlineToastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = syncEngine.subscribe((newStatus) => {
      setStatus(newStatus);
    });
    return () => {
      unsubscribe();
      if (onlineToastTimerRef.current !== null) window.clearTimeout(onlineToastTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!wasOnlineRef.current && effectiveOnline) {
      setShowOnlineToast(true);
      if (onlineToastTimerRef.current !== null) window.clearTimeout(onlineToastTimerRef.current);
      onlineToastTimerRef.current = window.setTimeout(() => {
        onlineToastTimerRef.current = null;
        setShowOnlineToast(false);
      }, 3500);
    }
    wasOnlineRef.current = effectiveOnline;
  }, [effectiveOnline]);

  const strings = COPY[language] ?? COPY.en;
  const showCloudSyncing = isFirebaseConfigured && effectiveOnline && (status.isSyncing || status.pendingCount > 0);
  const showOffline = !effectiveOnline;
  const showReconnected = effectiveOnline && showOnlineToast && !showCloudSyncing;

  if (!showOffline && !showCloudSyncing && !showReconnected) {
    return null;
  }

  return (
    <div
      className="fixed top-[max(0.5rem,env(safe-area-inset-top))] end-3 z-50 pointer-events-none select-none"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {showOffline && (
          <motion.div
            key="offline"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-auto bg-amber-500 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2 border border-amber-400"
          >
            <WifiOff className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{strings.offline}</span>
            {status.pendingCount > 0 && (
              <span className="font-mono tabular-nums opacity-80">({status.pendingCount})</span>
            )}
          </motion.div>
        )}

        {showCloudSyncing && (
          <motion.div
            key="syncing"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-auto bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" aria-hidden="true" />
            <span>{strings.syncing(status.pendingCount)}</span>
          </motion.div>
        )}

        {showReconnected && (
          <motion.div
            key="online"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-auto bg-emerald-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2"
          >
            <Wifi className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{isFirebaseConfigured ? strings.merged : strings.backOnline}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
