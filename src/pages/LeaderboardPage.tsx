import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router';
import { pickLocalized } from '../localization/translations';
import {
  Trophy,
  Medal,
  Flame,
  Sparkles,
  Zap,
  Users,
  Landmark,
  Search,
  User as UserIcon,
  Smile,
  GraduationCap,
  Star,
  Compass,
  Award,
  Map as MapIcon,
  Gamepad2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getMergedLeaderboard,
  simulateCompetitorsProgress,
  type LeaderboardEntry,
} from '../services/LeaderboardService';
import { fetchCloudLeaderboard, publishOwnEntry, isRealLeaderboardUser } from '../services/CloudLeaderboard';

const AVATAR_ICON_MAP = {
  'av-1': UserIcon,
  'av-2': Smile,
  'av-3': GraduationCap,
  'av-4': Flame,
  'av-5': Sparkles,
  'av-6': Star,
  'av-7': Compass,
  'av-8': Award,
  av1: UserIcon,
  av2: Smile,
  av3: GraduationCap,
  av4: Flame,
  av5: Sparkles,
  av6: Star,
  av7: Compass,
  av8: Award,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

const AVATAR_COLOR_MAP = {
  'av-1': 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  'av-2': 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
  'av-3': 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
  'av-4': 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
  'av-5': 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400',
  'av-6': 'bg-fuchsia-100 dark:bg-fuchsia-950/40 text-fuchsia-600 dark:text-fuchsia-400',
  'av-7': 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400',
  'av-8': 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400',
  av1: 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  av2: 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
  av3: 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
  av4: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
  av5: 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400',
  av6: 'bg-fuchsia-100 dark:bg-fuchsia-950/40 text-fuchsia-600 dark:text-fuchsia-400',
  av7: 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400',
  av8: 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400',
} satisfies Record<string, string>;

const AVATAR_ICON_LOOKUP = new Map<string, React.ComponentType<{ className?: string }>>(
  Object.entries(AVATAR_ICON_MAP),
);
const AVATAR_COLOR_LOOKUP = new Map<string, string>(Object.entries(AVATAR_COLOR_MAP));

const renderAvatarIcon = (avatarId: string, sizeClass = 'w-6 h-6') => {
  const IconComponent = AVATAR_ICON_LOOKUP.get(avatarId) ?? UserIcon;
  const colors =
    AVATAR_COLOR_LOOKUP.get(avatarId) ??
    'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400';

  return (
    <div className={`rounded-xl flex items-center justify-center p-1.5 shadow-xs ${colors}`}>
      <IconComponent className={sizeClass} />
    </div>
  );
};

const ALL_TIME_LEGENDS: readonly LeaderboardEntry[] = [
  { uid: 'legend-1', name: 'Zinar - Amude', xp: 12450, avatar: 'av-1' },
  { uid: 'legend-2', name: 'Salar - Erbil', xp: 9540, avatar: 'av-2' },
  { uid: 'legend-3', name: 'Nisrin - Diyarbakir', xp: 8220, avatar: 'av-3' },
  { uid: 'legend-4', name: 'Shergo - Qamishlo', xp: 7650, avatar: 'av-4' },
  { uid: 'legend-5', name: 'Kovan - Duhok', xp: 6710, avatar: 'av-5' },
  { uid: 'legend-6', name: 'Jamil - Afrin', xp: 5980, avatar: 'av-6' },
  { uid: 'legend-7', name: 'Rojda - Kobane', xp: 5410, avatar: 'av-7' },
];

export function LeaderboardPage() {
  const { userData, user, language, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'weekly' | 'alltime'>('weekly');
  const [boardData, setBoardData] = useState<LeaderboardEntry[]>([]);
  const [simulationPulse, setSimulationPulse] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isKidsMode = userData?.learnerMode === 'kids';
  const isRealBoard = isRealLeaderboardUser(user);

  useEffect(() => {
    if (!userData || isKidsMode) return;
    const currentUserName =
      user?.displayName || pickLocalized(language, { en: 'Learner', ar: 'متعلم', ku: 'Fêrxwaz' });

    if (isRealLeaderboardUser(user) && user) {
      let cancelled = false;
      void (async () => {
        await publishOwnEntry(user.uid, currentUserName, userData.xp, userData.avatarId || 'av-1');
        try {
          const entries = await fetchCloudLeaderboard(user.uid);
          if (!cancelled) setBoardData(entries);
        } catch (err) {
          console.warn('[Leaderboard] cloud fetch failed:', err);
          if (!cancelled) setBoardData([]);
        }
      })();
      return () => {
        cancelled = true;
      };
    }

    if (activeTab === 'weekly') {
      const records = getMergedLeaderboard(currentUserName, userData.xp, userData.avatarId);
      setBoardData(records);
    } else {
      const userAvatar = userData.avatarId || 'av-1';
      const currentUserEntry: LeaderboardEntry = {
        uid: 'current-user-uid',
        name: currentUserName,
        xp: userData.xp,
        avatar: userAvatar,
        isCurrentUser: true,
      };
      const merged = [...ALL_TIME_LEGENDS, currentUserEntry].sort((a, b) => b.xp - a.xp);
      setBoardData(merged);
    }
  }, [userData, user, language, activeTab, isKidsMode]);

  if (loading && !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400">
        <div className="w-9 h-9 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black tracking-wide">
          {pickLocalized(language, {
            en: 'Loading leaderboard...',
            ar: 'جاري تحميل لوحة الصدارة...',
            ku: 'Lîga pêşeng tê barkirin...',
          })}
        </p>
      </div>
    );
  }

  // Kids Mode is pressure-free: celebrate personal progress instead of rankings
  if (isKidsMode) {
    return (
      <div className="p-4 lg:p-8 pb-28 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 border-2 border-[#FFB300]/40 rounded-[2.5rem] p-8 text-center shadow-sm space-y-5">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FFF6E0] dark:bg-[#3A2F14] flex items-center justify-center text-4xl">
            🌟
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {pickLocalized(language, {
              en: 'You Are Doing Great!',
              ar: 'أنت تقوم بعمل رائع!',
              ku: 'Tu Pir Baş Dikî!',
            })}
          </h2>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            {pickLocalized(language, {
              en: 'In Kids Mode, learning is all about fun — no stress or rankings! Earn stars and unlock stickers on the Map and in Games.',
              ar: 'في وضع الأطفال، التعلّم للمتعة فقط بدون توتر أو منافسة! اجمع النجوم وافتح الملصقات في الخريطة والألعاب.',
              ku: 'Di Moda Zarokan de fêrbûn ji bo kêfê ye — bê stres û pêşbazî! Li Nexşe û Lîstikan stêrkan berhev bike.',
            })}
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] font-black text-sm">
            <Star className="w-4 h-4 fill-[#FFB300] text-[#FFB300]" aria-hidden="true" />
            <span className="tabular-nums">{userData?.xp ?? 0} XP</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/roadmap')}
              className="min-h-[48px] px-6 rounded-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] font-black text-sm shadow-[0_3px_0_#E69500] flex items-center gap-2 cursor-pointer"
            >
              <MapIcon className="w-4 h-4" />
              {pickLocalized(language, { en: 'Open Map', ar: 'افتح الخريطة', ku: 'Nexşeyê veke' })}
            </button>
            <button
              type="button"
              onClick={() => navigate('/games')}
              className="min-h-[48px] px-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-black text-sm flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              {pickLocalized(language, { en: 'Play Games', ar: 'العب الألعاب', ku: 'Bilîze' })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const safeUserData = userData || {
    xp: 0,
    level: 1,
    avatarId: 'av-1',
  };

  const runRivalSimulation = () => {
    if (isRealBoard || activeTab !== 'weekly') return;
    setSimulationPulse(true);
    simulateCompetitorsProgress();

    const currentUserName =
      user?.displayName || pickLocalized(language, { en: 'Learner', ar: 'متعلم', ku: 'Fêrxwaz' });
    const records = getMergedLeaderboard(currentUserName, safeUserData.xp, safeUserData.avatarId);
    setBoardData(records);

    window.setTimeout(() => setSimulationPulse(false), 800);
  };

  const userRankIdx = boardData.findIndex((item) => item.isCurrentUser);
  const userRank = userRankIdx !== -1 ? userRankIdx + 1 : 0;

  const filteredBoard = boardData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const dict = pickLocalized(language, {
    en: {
      title: 'Kurmanji Leagues',
      subtitle: 'View community standings & compete live!',
      weeklyTab: 'Weekly Sprint',
      allTimeTab: 'All-Time Legends',
      searchPlaceholder: 'Search competitors...',
      simulateBtn: 'Refresh Practice Rivals',
      weeklyDesc: 'Refreshes every Sunday. Study daily to lock in your rank!',
      allTimeDesc: 'The hall of fame containing top learners worldwide.',
      positionInfo: 'Your Rank position: ',
      youArePrefix: 'You are ',
      behindMsg: ' XP behind the lead!',
      firstMsg: 'Outstanding! You are currently leading this League!',
      searchNoResults: 'No competitors found with that name',
      youBadge: 'YOU',
      realDesc: 'Live global standings — real learners, updated from the cloud.',
      practiceNote:
        'Practice League — these rivals are offline training bots, not real players. Sign in with Google to join the live global board.',
    },
    ku: {
      title: 'Lîga Kurmancî',
      subtitle: 'Rêzbûna civakê bibîne û bikeve pêşbaziyê!',
      weeklyTab: 'Pêşbaziya Heftane',
      allTimeTab: 'Hostayên Hemû Deman',
      searchPlaceholder: 'Li hevalan bigere...',
      simulateBtn: 'Nûkirina Çalakiya Hevalan',
      weeklyDesc: 'Her roja Yekşemê tê nûkirin. Rojane bixwîne da ku pêşeng bimînî!',
      allTimeDesc: 'Tabloya rûmetê ya fêrxwazên herî serkeftî yên cîhanê.',
      positionInfo: 'Cihê te yê rêzbûnê: ',
      youArePrefix: 'Tenê ',
      behindMsg: ' XP ma ji bo serkeftinê!',
      firstMsg: 'Aferîn! Tu niha li serê vê lîgê yî!',
      searchNoResults: 'Tu kes bi vî navî nehate dîtin',
      youBadge: 'TU',
      realDesc: 'Rêzbûna cîhanî ya zindî — fêrxwazên rastîn, ji ewrê tê nûkirin.',
      practiceNote:
        'Lîga Pratîkê — ev hevrik botên perwerdeyê yên bê-înternet in. Bi Google têkeve da ku beşdarî tabloya cîhanî ya zindî bibî.',
    },
    ar: {
      title: 'دوري الكرمانجية',
      subtitle: 'شاهد ترتيب المجتمع والتنافس المباشر!',
      weeklyTab: 'التحدي الأسبوعي',
      allTimeTab: 'أساطير المنصة',
      searchPlaceholder: 'البحث عن المنافسين...',
      simulateBtn: 'تحديث نشاط المنافسين',
      weeklyDesc: 'يتجدد الترتيب كل أحد. ادرس يومياً للحفاظ على صدارتك!',
      allTimeDesc: 'لوحة الشرف التي تضم كبار المتعلمين من جميع أرجاء العالم.',
      positionInfo: 'ترتيبك الحالي: ',
      youArePrefix: 'تبعد ',
      behindMsg: ' نقطة تفصلك عن المتصدر!',
      firstMsg: 'مذهل! أنت تتصدر هذا الدوري حالياً!',
      searchNoResults: 'لا يوجد منافس بهذا الاسم',
      youBadge: 'أنت',
      realDesc: 'الترتيب العالمي المباشر — متعلمون حقيقيون، يتم التحديث من السحابة.',
      practiceNote:
        'دوري التدريب — هؤلاء المنافسون روبوتات تدريبية للعمل دون إنترنت. سجّل الدخول عبر Google للانضمام إلى اللوحة العالمية المباشرة.',
    },
  });

  const top3 = filteredBoard.slice(0, 3);
  const remainingList = filteredBoard.slice(3);

  return (
    <div className="p-4 space-y-6 relative max-w-3xl mx-auto min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {dict.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{dict.subtitle}</p>
        </div>
      </div>

      {!isRealBoard && (
        <div className="flex bg-slate-100 dark:bg-slate-900 rounded-3xl p-1 border border-slate-200/50 dark:border-slate-800/80">
          <button
            type="button"
            onClick={() => {
              setActiveTab('weekly');
              setSearchQuery('');
            }}
            className={`flex-1 py-3 min-h-[44px] text-center font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'weekly'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.weeklyTab}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('alltime');
              setSearchQuery('');
            }}
            className={`flex-1 py-3 min-h-[44px] text-center font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'alltime'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>{dict.allTimeTab}</span>
          </button>
        </div>
      )}

      <div className="bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100/40 dark:border-indigo-900/40 p-3 rounded-2xl text-xs text-slate-500 dark:text-slate-400 leading-normal flex items-start gap-2 select-none">
        <Trophy className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-amber-500/10" />
        <span>{isRealBoard ? dict.realDesc : activeTab === 'weekly' ? dict.weeklyDesc : dict.allTimeDesc}</span>
      </div>

      {!isRealBoard && (
        <div
          role="note"
          className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/50 p-3 rounded-2xl text-xs font-bold text-amber-800 dark:text-amber-300 leading-normal flex items-start gap-2 select-none"
        >
          <Users className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{dict.practiceNote}</span>
        </div>
      )}

      {filteredBoard.length >= 3 && searchQuery === '' && (
        <div className="grid grid-cols-3 gap-2.5 items-end justify-center py-6 px-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          {top3[1] && (
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center mb-1">
                {renderAvatarIcon(top3[1].avatar, 'w-8 h-8')}
                <div className="absolute -bottom-1 -right-1 bg-slate-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black font-mono border border-white">
                  2
                </div>
              </div>
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 truncate max-w-[90px] mt-1.5">
                <bdi>{top3[1].name}</bdi>
              </span>
              <span className="text-[11px] font-bold font-mono text-slate-400 dark:text-slate-500">
                {top3[1].xp} xp
              </span>
              <div className="h-16 w-full bg-slate-100 dark:bg-slate-800 rounded-t-2xl mt-2 flex items-center justify-center shadow-inner border border-slate-100 dark:border-slate-700">
                <Medal className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          )}

          {top3[0] && (
            <div className="flex flex-col items-center z-10 scale-105">
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-300" />
                </div>
                <div className="mb-1">{renderAvatarIcon(top3[0].avatar, 'w-10 h-10')}</div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-[11px] font-black font-mono border border-white">
                  1
                </div>
              </div>
              <span className="text-sm font-black text-amber-600 dark:text-amber-400 truncate max-w-[100px] mt-1.5">
                <bdi>{top3[0].name}</bdi>
              </span>
              <span className="text-xs font-black font-mono text-amber-500">{top3[0].xp} xp</span>
              <div className="h-24 w-full bg-linear-to-b from-amber-100 to-amber-200 dark:from-amber-950/60 dark:to-amber-900/30 rounded-t-2xl mt-2 flex items-center justify-center shadow-lg border-2 border-amber-300 dark:border-amber-800/80">
                <Trophy className="w-7 h-7 text-amber-500 fill-amber-300/20" />
              </div>
            </div>
          )}

          {top3[2] && (
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center mb-1">
                {renderAvatarIcon(top3[2].avatar, 'w-8 h-8')}
                <div className="absolute -bottom-1 -right-1 bg-amber-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black font-mono border border-white">
                  3
                </div>
              </div>
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 truncate max-w-[90px] mt-1.5">
                <bdi>{top3[2].name}</bdi>
              </span>
              <span className="text-[11px] font-bold font-mono text-slate-400 dark:text-slate-500">
                {top3[2].xp} xp
              </span>
              <div className="h-12 w-full bg-amber-50 dark:bg-slate-800 rounded-t-2xl mt-2 flex items-center justify-center shadow-inner border border-slate-100 dark:border-slate-700">
                <Medal className="w-5 h-5 text-amber-700" />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label={dict.searchPlaceholder}
          placeholder={dict.searchPlaceholder}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 ps-10 pe-4 font-medium text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 shadow-xs"
        />
        <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {import.meta.env.DEV && !isRealBoard && activeTab === 'weekly' && searchQuery === '' && (
        <button
          type="button"
          onClick={runRivalSimulation}
          disabled={simulationPulse}
          className="w-full py-2.5 min-h-[44px] px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-2xl text-xs font-extrabold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
        >
          <Users className={`w-3.5 h-3.5 text-indigo-500 ${simulationPulse ? 'animate-spin' : ''}`} />
          <span>{dict.simulateBtn}</span>
        </button>
      )}

      <div className="space-y-2 mt-4 select-none">
        <AnimatePresence mode="popLayout">
          {filteredBoard.length === 0 ? (
            <div className="text-center py-10 font-bold text-slate-400 text-xs">{dict.searchNoResults}</div>
          ) : (
            (searchQuery !== '' ? filteredBoard : remainingList).map((item, localIdx) => {
              const rank =
                searchQuery !== '' ? boardData.findIndex((orig) => orig.uid === item.uid) + 1 : localIdx + 4;
              const isUser = item.isCurrentUser;

              return (
                <motion.div
                  key={item.uid}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`py-3 px-4 rounded-2xl flex items-center justify-between border transition-all duration-300 ${
                    isUser
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/25 border-indigo-200 dark:border-indigo-800/80 ring-2 ring-indigo-500/10'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold font-mono ${
                        isUser
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950'
                      }`}
                    >
                      {rank}
                    </div>

                    <div className="flex items-center gap-2">
                      {renderAvatarIcon(item.avatar, 'w-4 h-4')}
                      <span
                        className={`text-sm font-bold tracking-tight truncate max-w-[150px] ${
                          isUser ? 'text-indigo-800 dark:text-indigo-300 font-extrabold' : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <bdi>{item.name}</bdi>
                      </span>
                      {isUser && (
                        <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md tracking-wider">
                          {dict.youBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-mono">
                    <span
                      className={`text-sm font-black ${
                        isUser ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.xp}
                    </span>
                    <span className="text-[11px] text-slate-400 lowercase font-medium">xp</span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-900 text-white p-4 rounded-3xl flex items-center gap-3 shadow-xl shadow-slate-900/10 z-10 select-none">
        <Zap className="w-5 h-5 text-orange-400 fill-orange-400/15 shrink-0" />
        <div className="text-xs leading-normal font-medium flex-1 min-w-0">
          {userRank === 1 ? (
            <span className="font-extrabold text-emerald-400">{dict.firstMsg}</span>
          ) : (
            <p className="truncate">
              {dict.positionInfo} <strong className="text-indigo-300 font-extrabold">#{userRank}</strong>.{' '}
              {dict.youArePrefix}
              <span className="text-orange-400 font-black">
                {boardData[0] ? Math.max(0, boardData[0].xp - safeUserData.xp) : 0}
              </span>
              {dict.behindMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
