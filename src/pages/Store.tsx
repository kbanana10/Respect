/**
 * Store.tsx — Real Offline Rewards & Customization Shop (/store)
 *
 * Zero "Coming Soon" IAP gem-pack previews. Every single item can be genuinely
 * unlocked & equipped offline using Gems earned from lessons, quizzes & games,
 * and persisted in IndexedDB / LocalStorage via OfflineStorageService.
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Snowflake, Check, Palette, Sparkles, User, Smile, GraduationCap,
  Flame, Star, Compass, Award,
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { t, pickLocalized } from '../localization/translations';
import { AVATARS } from '../constants/appConstants';
import type { ThemeAccent } from '../models/user';

const FREEZE_COST = 100;

const ACCENT_REWARDS: readonly {
  id: ThemeAccent;
  cost: number;
  swatch: string;
  name: { en: string; ar: string; ku: string };
}[] = [
  { id: 'gold', cost: 0, swatch: 'bg-[#FFB300]', name: { en: 'Sun Gold', ar: 'ذهبي مشرق', ku: 'Zêrê Rojê' } },
  { id: 'emerald', cost: 60, swatch: 'bg-emerald-500', name: { en: 'Zagros Emerald', ar: 'زمرد زاغروس', ku: 'Zimrûdê Zagrosê' } },
  { id: 'sky', cost: 60, swatch: 'bg-sky-500', name: { en: 'Van Sky', ar: 'سماء وان', ku: 'Ezmanê Wanê' } },
  { id: 'rose', cost: 80, swatch: 'bg-rose-500', name: { en: 'Pomegranate Rose', ar: 'وردي الرمان', ku: 'Gula Hinarê' } },
];

const STICKER_REWARDS = [
  { id: 'sticker_sun', emoji: '☀️', cost: 30, name: { en: 'Newroz Sun', ar: 'شمس نوروز', ku: 'Roja Newrozê' } },
  { id: 'sticker_mountain', emoji: '🏔️', cost: 40, name: { en: 'Zagros Peak', ar: 'قمة زاغروس', ku: 'Çiyayê Zagrosê' } },
  { id: 'sticker_pomegranate', emoji: '🍎', cost: 40, name: { en: 'Sweet Hinar', ar: 'رمانة حلوة', ku: 'Hinara Şîrîn' } },
  { id: 'sticker_eagle', emoji: '🦅', cost: 50, name: { en: 'Mountain Eagle', ar: 'نسر الجبال', ku: 'Eyloyê Çiyê' } },
  { id: 'sticker_drum', emoji: '🥁', cost: 50, name: { en: 'Daf Rhythm', ar: 'إيقاع الدف', ku: 'Rîtma Defê' } },
  { id: 'sticker_fire', emoji: '🔥', cost: 60, name: { en: 'Newroz Flame', ar: 'شعلة نوروز', ku: 'Agirê Newrozê' } },
] as const;

const AVATAR_SHOP_COSTS = {
  av1: 0,
  av2: 0,
  av3: 40,
  av4: 50,
  av5: 60,
  av6: 60,
  av7: 70,
  av8: 80,
} satisfies Record<string, number>;

const AVATAR_ICON_MAP = {
  user: User,
  smile: Smile,
  'graduation-cap': GraduationCap,
  flame: Flame,
  sparkles: Sparkles,
  star: Star,
  compass: Compass,
  award: Award,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

export function Store() {
  const { userData, updateUserData, language } = useAuth();
  const gems = userData?.gems ?? 0;
  const freezes = userData?.streakFreezes ?? 0;
  const activeAccent: ThemeAccent = userData?.activeAccent ?? 'gold';
  const activeAvatar = userData?.avatarId ?? AVATARS[0].id;
  const unlockedAvatars = userData?.unlockedAvatars ?? ['av1', 'av2'];
  const unlockedStickers = userData?.unlockedStickers ?? [];
  const [toast, setToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const toastTimerRef = useRef<number | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      toastTimerRef.current = null;
      setToast(null);
    }, 2500);
  }, []);

  useEffect(() => () => {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
  }, []);

  const buyFreeze = async () => {
    if (busy) return;
    if (gems < FREEZE_COST) {
      showToast(t(language, 'store_not_enough'));
      return;
    }
    setBusy(true);
    try {
      await updateUserData({ gems: gems - FREEZE_COST, streakFreezes: freezes + 1 });
      showToast(t(language, 'store_freeze_bought'));
    } finally {
      setBusy(false);
    }
  };

  const handleAvatarAction = async (avId: string, cost: number) => {
    if (busy) return;
    const owned = cost === 0 || unlockedAvatars.includes(avId);
    if (owned) {
      await updateUserData({ avatarId: avId });
      showToast(
        pickLocalized(language, {
          en: 'Avatar equipped!',
          ar: 'تم تفعيل الشخصية!',
          ku: 'Avatar hate çalakkirin!',
        }),
      );
      return;
    }
    if (gems < cost) {
      showToast(t(language, 'store_not_enough'));
      return;
    }
    setBusy(true);
    try {
      await updateUserData({
        gems: gems - cost,
        unlockedAvatars: [...unlockedAvatars, avId],
        avatarId: avId,
      });
      showToast(
        pickLocalized(language, {
          en: 'New avatar unlocked & equipped!',
          ar: 'تم فتح وتفعيل الشخصية الجديدة!',
          ku: 'Avatara nû hate vekirin û çalakkirin!',
        }),
      );
    } finally {
      setBusy(false);
    }
  };

  const handleAccentAction = async (accent: ThemeAccent, cost: number) => {
    if (busy) return;
    const stickerKey = `accent_${accent}`;
    const owned = cost === 0 || unlockedStickers.includes(stickerKey);
    if (owned) {
      await updateUserData({ activeAccent: accent });
      showToast(
        pickLocalized(language, {
          en: 'Theme accent updated!',
          ar: 'تم تغيير لون المظهر!',
          ku: 'Rengê temayê hate guherandin!',
        }),
      );
      return;
    }
    if (gems < cost) {
      showToast(t(language, 'store_not_enough'));
      return;
    }
    setBusy(true);
    try {
      await updateUserData({
        gems: gems - cost,
        unlockedStickers: [...unlockedStickers, stickerKey],
        activeAccent: accent,
      });
      showToast(
        pickLocalized(language, {
          en: 'New theme accent unlocked!',
          ar: 'تم فتح لون المظهر الجديد!',
          ku: 'Rengê temayê yê nû hate vekirin!',
        }),
      );
    } finally {
      setBusy(false);
    }
  };

  const handleStickerUnlock = async (stickerId: string, cost: number) => {
    if (busy || unlockedStickers.includes(stickerId)) return;
    if (gems < cost) {
      showToast(t(language, 'store_not_enough'));
      return;
    }
    setBusy(true);
    try {
      await updateUserData({
        gems: gems - cost,
        unlockedStickers: [...unlockedStickers, stickerId],
      });
      showToast(
        pickLocalized(language, {
          en: 'Sticker added to your collection!',
          ar: 'تمت إضافة الملصق إلى دفترك!',
          ku: 'Stîker li koleksiyona te hate zêdekirin!',
        }),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 pb-28 max-w-3xl mx-auto space-y-6">
      {/* Header & Balance Hero */}
      <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-5 shadow-flat relative overflow-hidden flex items-center justify-between gap-4">
        <div className="relative z-10 min-w-0">
          <div className="text-xs font-extrabold text-muted uppercase tracking-wider">
            {t(language, 'store_balance')}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl select-none" aria-hidden="true">💎</span>
            <span className="text-3xl font-black text-ink tabular-nums">{gems}</span>
          </div>
          <p className="text-xs text-muted font-semibold mt-1">{t(language, 'store_rewards_subtitle')}</p>
        </div>
        <div className="relative z-10 text-end shrink-0">
          <div className="text-xs font-extrabold text-muted uppercase tracking-wider">
            {t(language, 'store_freeze_title')}
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-1.5">
            <Snowflake className="w-5 h-5 text-sky-500" aria-hidden="true" />
            <span className="text-2xl font-black text-ink tabular-nums">{freezes}</span>
          </div>
        </div>
      </div>

      {/* Power-Ups: Streak Freeze */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-ink px-1 uppercase tracking-wider">
          {t(language, 'store_powerups')}
        </h2>
        <div className="bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-800 rounded-3xl p-4 shadow-flat flex items-center gap-4">
          <span
            className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <Snowflake className="w-6 h-6" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-black text-ink flex items-center gap-2 flex-wrap">
              <span>{t(language, 'store_freeze_title')} ❄️</span>
              {freezes > 0 && (
                <span className="text-xs font-black bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                  {freezes} {t(language, 'store_owned')}
                </span>
              )}
            </div>
            <p className="text-xs text-muted font-semibold mt-0.5 leading-relaxed">
              {t(language, 'store_freeze_desc')}
            </p>
          </div>
          <button
            type="button"
            onClick={buyFreeze}
            disabled={busy}
            className={`shrink-0 min-h-[44px] px-4 rounded-full font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              gems >= FREEZE_COST
                ? 'bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] shadow-[0_3px_0_#E69500]'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            {t(language, 'store_buy')} · 💎{FREEZE_COST}
          </button>
        </div>
      </section>

      {/* Theme Accents */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-ink px-1 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#FFB300]" aria-hidden="true" />
          {t(language, 'store_accents')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACCENT_REWARDS.map((item) => {
            const owned = item.cost === 0 || unlockedStickers.includes(`accent_${item.id}`);
            const equipped = activeAccent === item.id;
            return (
              <button
                key={item.id}
                type="button"
                disabled={busy}
                aria-pressed={equipped}
                onClick={() => void handleAccentAction(item.id, item.cost)}
                className={`p-4 rounded-3xl border-2 bg-white dark:bg-slate-900 flex flex-col items-center gap-2.5 text-center transition-all cursor-pointer ${
                  equipped
                    ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14]'
                    : 'border-line-soft dark:border-slate-800 hover:border-[#FFB300]/50'
                }`}
              >
                <span className={`w-10 h-10 rounded-full ${item.swatch} shadow-sm`} aria-hidden="true" />
                <span className="text-xs font-black text-ink">{pickLocalized(language, item.name)}</span>
                <span
                  className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    equipped
                      ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                      : owned
                        ? 'bg-slate-100 dark:bg-slate-800 text-ink'
                        : 'bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B]'
                  }`}
                >
                  {equipped
                    ? t(language, 'store_equipped')
                    : owned
                      ? t(language, 'store_equip')
                      : `💎 ${item.cost}`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Unlockable Avatars */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-ink px-1 uppercase tracking-wider">
          {t(language, 'store_avatars')}
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {AVATARS.map((av) => {
            const costLookup = new Map<string, number>(Object.entries(AVATAR_SHOP_COSTS));
            const iconLookup = new Map<string, React.ComponentType<{ className?: string }>>(
              Object.entries(AVATAR_ICON_MAP),
            );
            const cost = costLookup.get(av.id) ?? 50;
            const Icon = iconLookup.get(av.icon) ?? User;
            const owned = cost === 0 || unlockedAvatars.includes(av.id);
            const equipped = activeAvatar === av.id;
            return (
              <button
                key={av.id}
                type="button"
                disabled={busy}
                aria-pressed={equipped}
                onClick={() => void handleAvatarAction(av.id, cost)}
                className={`p-3 rounded-3xl border-2 bg-white dark:bg-slate-900 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  equipped
                    ? 'border-[#FFB300] shadow-md'
                    : 'border-line-soft dark:border-slate-800 hover:border-[#FFB300]/50'
                }`}
              >
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${av.color}`}>
                  <Icon className="w-6 h-6" />
                </span>
                <span className="text-xs font-black text-ink">
                  {equipped ? '✓' : owned ? t(language, 'store_equip') : `💎${cost}`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Kids Sticker Collection */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-ink px-1 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFB300]" aria-hidden="true" />
          {t(language, 'store_stickers')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {STICKER_REWARDS.map((sticker) => {
            const owned = unlockedStickers.includes(sticker.id);
            return (
              <button
                key={sticker.id}
                type="button"
                disabled={busy || owned}
                onClick={() => void handleStickerUnlock(sticker.id, sticker.cost)}
                className={`p-4 rounded-3xl border-2 bg-white dark:bg-slate-900 flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                  owned
                    ? 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/25 opacity-100'
                    : 'border-line-soft dark:border-slate-800 hover:border-[#FFB300]/50'
                }`}
              >
                <span className="text-4xl select-none" aria-hidden="true">
                  {sticker.emoji}
                </span>
                <span className="text-xs font-black text-ink">{pickLocalized(language, sticker.name)}</span>
                <span
                  className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    owned
                      ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                      : 'bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B]'
                  }`}
                >
                  {owned ? `✓ ${t(language, 'store_unlocked')}` : `💎 ${sticker.cost}`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 inset-x-4 max-w-md mx-auto bg-white dark:bg-slate-900 border border-line-soft dark:border-slate-700 rounded-2xl px-4 py-3 shadow-[0_18px_44px_rgba(30,41,59,0.18)] flex items-center gap-2.5 z-50"
          role="status"
        >
          <Check className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
          <span className="text-xs font-extrabold text-ink">{toast}</span>
        </motion.div>
      )}
    </div>
  );
}
