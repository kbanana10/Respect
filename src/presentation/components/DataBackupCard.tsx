/**
 * DataBackupCard.tsx — Offline Storage, Sync & Data Backup/Restore Panel (Presentation Layer)
 *
 * Gives learners full transparency and control over their local/cloud data:
 * - Shows connectivity, pending/failed sync count, schema version, and platform target
 * - Triggers manual cloud sync (when Firebase is configured)
 * - Exports a portable versioned JSON backup
 * - Restores a JSON backup safely with automatic schema migration
 */
import React, { useEffect, useRef, useState } from 'react';
import { Database, Download, Upload, RefreshCw, CheckCircle2, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { offlineStorage, type StorageDiagnostics } from '../../services/OfflineStorageService';
import { syncEngine, type SyncEngineStatus } from '../../services/SyncEngine';
import { isFirebaseConfigured } from '../../lib/firebase';
import { getUserErrorMessage } from '../../core/errors/AppError';
import { PWAInstallButton } from './PWAInstallButton';
import type { Language } from '../../models/user';

const LABELS = {
  en: {
    sectionTitle: 'Storage, Sync & Backup',
    offlineReady: 'Offline-first local storage active',
    onlineLabel: 'Online',
    offlineLabel: 'Offline Mode',
    syncNow: 'Sync Now',
    syncing: 'Syncing...',
    exportBtn: 'Export Backup',
    importBtn: 'Restore Backup',
    exportSuccess: 'Progress backup downloaded successfully.',
    importSuccess: 'Progress restored and migrated safely.',
    syncDone: 'Sync check completed.',
    schemaLabel: 'Schema',
    pendingLabel: 'Queued',
  },
  ar: {
    sectionTitle: 'التخزين والمزامنة والنسخ الاحتياطي',
    offlineReady: 'التخزين المحلي للعمل دون إنترنت مفعّل',
    onlineLabel: 'متصل',
    offlineLabel: 'وضع دون إنترنت',
    syncNow: 'مزامنة الآن',
    syncing: 'جاري المزامنة...',
    exportBtn: 'تصدير نسخة احتياطية',
    importBtn: 'استعادة نسخة',
    exportSuccess: 'تم تنزيل النسخة الاحتياطية لتقدمك بنجاح.',
    importSuccess: 'تمت استعادة البيانات وترقيتها بأمان.',
    syncDone: 'اكتمل فحص المزامنة.',
    schemaLabel: 'المخطط',
    pendingLabel: 'قيد الانتظار',
  },
  ku: {
    sectionTitle: 'Hilanîn, Hevdengkirin û Piştgir',
    offlineReady: 'Hilanîna herêmî ya bê-înternet çalak e',
    onlineLabel: 'Girêdayî',
    offlineLabel: 'Bê înternet',
    syncNow: 'Niha Hevdeng Bike',
    syncing: 'Tê hevdengkirin...',
    exportBtn: 'Piştgirê Daxe',
    importBtn: 'Piştgirê Vegerîne',
    exportSuccess: 'Piştgira pêşveçûna te bi serkeftî hate daxistin.',
    importSuccess: 'Daneyên te bi ewlehî hatin vegerandin û nûkirin.',
    syncDone: 'Kontrola hevdengkirinê qediya.',
    schemaLabel: 'Şema',
    pendingLabel: 'Li bendê',
  },
} satisfies Record<Language, Record<string, string>>;

export const DataBackupCard: React.FC = () => {
  const { user, language, theme, importBackupData } = useAuth();
  const [syncStatus, setSyncStatus] = useState<SyncEngineStatus>(() => syncEngine.getStatus());
  const [diag, setDiag] = useState<StorageDiagnostics | null>(null);
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const strings = LABELS[language] ?? LABELS.en;

  useEffect(() => {
    const unsub = syncEngine.subscribe(setSyncStatus);
    void offlineStorage.getDiagnostics().then(setDiag);
    return unsub;
  }, []);

  const handleExport = async () => {
    setBusy(true);
    setFeedback(null);
    try {
      const json = await offlineStorage.exportBackupJson({
        displayName: user?.displayName ?? undefined,
        language,
        theme,
      });
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kurdish-quest-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setFeedback({ kind: 'ok', text: strings.exportSuccess });
    } catch (err) {
      setFeedback({ kind: 'err', text: getUserErrorMessage(err instanceof Error ? err : String(err), language) });
    } finally {
      setBusy(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setBusy(true);
    setFeedback(null);
    try {
      const text = await file.text();
      const restored = await offlineStorage.restoreBackupJson(text);
      await importBackupData(restored.userData, restored.profile);
      setDiag(await offlineStorage.getDiagnostics());
      setFeedback({ kind: 'ok', text: strings.importSuccess });
    } catch (err) {
      setFeedback({ kind: 'err', text: getUserErrorMessage(err instanceof Error ? err : String(err), language) });
    } finally {
      setBusy(false);
    }
  };

  const handleManualSync = async () => {
    setBusy(true);
    setFeedback(null);
    try {
      await syncEngine.manualSync(user?.uid);
      setDiag(await offlineStorage.getDiagnostics());
      setFeedback({ kind: 'ok', text: strings.syncDone });
    } catch (err) {
      setFeedback({ kind: 'err', text: getUserErrorMessage(err instanceof Error ? err : String(err), language) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-black text-xs text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4" aria-hidden="true" />
          <span>{strings.sectionTitle}</span>
        </h3>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
          {syncStatus.isOnline ? (
            <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          ) : (
            <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          )}
          <span>{syncStatus.isOnline ? strings.onlineLabel : strings.offlineLabel}</span>
        </span>
      </div>

      <div className="text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span>{strings.offlineReady}</span>
        <span aria-hidden="true">·</span>
        <span className="font-mono tabular-nums">
          {strings.schemaLabel} v{diag?.schemaVersion ?? 3}
        </span>
        {syncStatus.pendingCount > 0 && (
          <>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {strings.pendingLabel}: {syncStatus.pendingCount}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => void handleExport()}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap"
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{strings.exportBtn}</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap"
        >
          <Upload className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{strings.importBtn}</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={(e) => void handleFileChange(e)}
          className="sr-only"
          aria-label={strings.importBtn}
        />

        {isFirebaseConfigured && user && user.uid !== 'local_user' && (
          <button
            type="button"
            onClick={() => void handleManualSync()}
            disabled={busy || syncStatus.isSyncing || !syncStatus.isOnline}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 shrink-0 ${syncStatus.isSyncing ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{syncStatus.isSyncing ? strings.syncing : strings.syncNow}</span>
          </button>
        )}

        <PWAInstallButton />
      </div>

      {feedback && (
        <div
          role="status"
          className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold ${
            feedback.kind === 'ok'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
              : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200'
          }`}
        >
          {feedback.kind === 'ok' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}
    </div>
  );
};
