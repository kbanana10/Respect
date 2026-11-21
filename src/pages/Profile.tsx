import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  User as UserIcon,
  LogOut,
  Award,
  Flame,
  BookOpen,
  Star,
  Globe,
  Edit2,
  Check,
  Sun,
  Moon,
  Bell,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Trophy,
  Library,
  Smile,
  GraduationCap,
  Compass,
  Search,
  Lock,
  ShoppingBag,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../store/AuthContext';
import type { Language, LearnerMode, UserData } from '../models/user';
import { t, pickLocalized } from '../localization/translations';
import {
  getReminderSettings,
  saveReminderSettings,
} from '../services/ReminderService';
import { AVATARS } from '../constants/appConstants';
import { getMissionStatuses, claimMission } from '../services/MissionsService';
import { Switch, SegmentedControl, ParentalGateModal } from '../components/ui';
import { resetToursForReplay } from '../features/tour/tours';
import { DataBackupCard } from '../presentation/components/DataBackupCard';

const AVATAR_ICON_MAP = {
  user: UserIcon,
  smile: Smile,
  'graduation-cap': GraduationCap,
  flame: Flame,
  sparkles: Sparkles,
  star: Star,
  compass: Compass,
  award: Award,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

const AVATAR_ICON_LOOKUP = new Map<string, React.ComponentType<{ className?: string }>>(
  Object.entries(AVATAR_ICON_MAP),
);

function renderProfileAvatarIcon(iconName: string, className = 'w-12 h-12') {
  const IconComponent = AVATAR_ICON_LOOKUP.get(iconName) ?? UserIcon;
  return <IconComponent className={className} />;
}

interface BadgeItem {
  id: string;
  icon: React.ReactNode;
  title: { en: string; ku: string; ar: string };
  desc: { en: string; ku: string; ar: string };
  color: string;
}

const BADGES_DB: readonly BadgeItem[] = [
  {
    id: 'first_steps',
    icon: <UserIcon className="w-6 h-6" />,
    title: { en: 'First Steps', ku: 'Gavên Yekem', ar: 'الخطوة الأولى' },
    desc: { en: 'Earn 50 XP to begin your path', ku: '50 XP qezenc bike ji bo destpêkirinê', ar: 'اجمع أول 50 نقطة لبدء المسار' },
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'dedicated_learner',
    icon: <Flame className="w-6 h-6" />,
    title: { en: 'Dedicated Learner', ku: 'Fêrxwazê Xebatkar', ar: 'المتعلم المكرّس' },
    desc: { en: 'Accumulate 500 XP total', ku: 'Tevahiya 500 XP berhev bike', ar: 'احصد 500 نقطة خبرة إجمالية' },
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'academic_achiever',
    icon: <BookOpen className="w-6 h-6" />,
    title: { en: 'Academic Scholar', ku: 'Zanayê Akademîk', ar: 'العالم الأكاديمي' },
    desc: { en: 'Accumulate 1500 XP total', ku: 'Tevahiya 1500 XP berhev bike', ar: 'احصد 1500 نقطة خبرة إجمالية' },
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'vocabulary_enthusiast',
    icon: <BookOpen className="w-6 h-6" />,
    title: { en: 'Vocab Hobbyist', ku: 'Hezkiriyê Peyvan', ar: 'هاوي المفردات' },
    desc: { en: 'Learn at least 10 words', ku: 'Kêmzêde 10 peyvan fêr bibe', ar: 'أتقن ما لا يقل عن 10 كلمات كوردية' },
    color: 'from-emerald-400 to-green-500',
  },
  {
    id: 'vocabulary_master',
    icon: <Star className="w-6 h-6" />,
    title: { en: 'Lexicon King', ku: 'Mîrê Ferhengê', ar: 'ملك القاموس' },
    desc: { en: 'Learn at least 50 words', ku: 'Kêmzêde 50 peyvan fêr bibe', ar: 'أتقن ما لا يقل عن 50 كلمة كوردية' },
    color: 'from-teal-400 to-emerald-600',
  },
  {
    id: 'polyglot',
    icon: <MessageCircle className="w-6 h-6" />,
    title: { en: 'Speech Polyglot', ku: 'Zimanzanê Kurmancî', ar: 'متحدث فصيح' },
    desc: { en: 'Learn at least 150 words', ku: 'Kêmzêde 150 peyvan fêr bibe', ar: 'أتقن ما لا يقل عن 150 كلمة كوردية' },
    color: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'streak_3',
    icon: <Sparkles className="w-6 h-6" />,
    title: { en: 'Streak Starter', ku: 'Destpêka Rêzê', ar: 'مشعل الحماس' },
    desc: { en: 'Maintain a 3-day streak', ku: '3 rojan li pey hev bidomîne', ar: 'حافظ على حماسك لثلاثة أيام متتالية' },
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 'streak_7',
    icon: <Award className="w-6 h-6" />,
    title: { en: 'Streak Majesty', ku: 'Pehlewaniya Rêzê', ar: 'سيادة الانضباط' },
    desc: { en: 'Maintain a 7-day streak', ku: '7 rojan li pey hev bidomîne', ar: 'حافظ على حماسك لسبعة أيام متتالية' },
    color: 'from-rose-400 to-red-600',
  },
  {
    id: 'quiz_conqueror',
    icon: <Trophy className="w-6 h-6" />,
    title: { en: 'Arena Conqueror', ku: 'Serkeftiyê Ezmûnan', ar: 'قاهر الاختبارات' },
    desc: { en: 'Complete 5 syllabus quizzes', ku: '5 pirsyariyan biqedîne', ar: 'اجتز 5 اختبارات تدريبية بنجاح' },
    color: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'quiz_master',
    icon: <Award className="w-6 h-6" />,
    title: { en: 'Great Master', ku: 'Hostayê Mezin', ar: 'سيد الحكمة والامتحانات' },
    desc: { en: 'Complete 20 syllabus quizzes', ku: '20 pirsyariyan biqedîne', ar: 'اجتز 20 اختباراً منهاجياً' },
    color: 'from-indigo-400 to-violet-600',
  },
  {
    id: 'lesson_scholar',
    icon: <Library className="w-6 h-6" />,
    title: { en: 'Lesson Scholar', ku: 'Zanayê Dersan', ar: 'الباحث العظيم' },
    desc: { en: 'Master 5 complete lessons', ku: '5 dersan bi temamî hîn bibe', ar: 'أتقن 5 وحدات درسية كاملة' },
    color: 'from-fuchsia-400 to-purple-600',
  },
];

const STICKER_BOOK = [
  { id: 'sticker_sun', emoji: '☀️', name: { en: 'Newroz Sun', ar: 'شمس نوروز', ku: 'Roja Newrozê' } },
  { id: 'sticker_mountain', emoji: '🏔️', name: { en: 'Zagros Peak', ar: 'قمة زاغروس', ku: 'Çiyayê Zagrosê' } },
  { id: 'sticker_pomegranate', emoji: '🍎', name: { en: 'Sweet Hinar', ar: 'رمانة حلوة', ku: 'Hinara Şîrîn' } },
  { id: 'sticker_eagle', emoji: '🦅', name: { en: 'Mountain Eagle', ar: 'نسر الجبال', ku: 'Eyloyê Çiyê' } },
  { id: 'sticker_drum', emoji: '🥁', name: { en: 'Daf Rhythm', ar: 'إيقاع الدف', ku: 'Rîtma Defê' } },
  { id: 'sticker_fire', emoji: '🔥', name: { en: 'Newroz Flame', ar: 'شعلة نوروز', ku: 'Agirê Newrozê' } },
] as const;

const DAY_LABELS = {
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  ku: ['Y', 'D', 'S', 'Ç', 'P', 'Î', 'Ş'],
  ar: ['أ', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
} satisfies Record<Language, readonly string[]>;

interface StatBoxProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorClass: string;
  highlight?: boolean;
}

function StatBox({ icon, label, value, colorClass, highlight }: StatBoxProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border rounded-3xl p-4 flex flex-col items-center text-center shadow-xs ${
        highlight ? 'border-[#FFB300]/60' : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className={`text-3xl mb-2 ${colorClass}`}>{icon}</div>
      <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</div>
      <div className="text-2xl font-black text-slate-800 dark:text-white font-mono tabular-nums mt-1">{value}</div>
    </div>
  );
}

export function Profile() {
  const navigate = useNavigate();
  const {
    user,
    userData,
    language,
    setLanguage,
    theme,
    toggleTheme,
    logout,
    updateUserData,
    updateProfileName,
    loading,
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'progress' | 'settings'>('progress');
  const [showAllBadges, setShowAllBadges] = useState(false);

  // Parental Gate state (protects Settings & grown-up controls while in Kids Mode)
  const [gateOpen, setGateOpen] = useState(false);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const isKidsMode = userData?.learnerMode === 'kids';
  const requiresParentalGate = isKidsMode && userData?.parentalGateEnabled !== false && !gateUnlocked;

  const runProtected = useCallback(
    (action: () => void) => {
      if (requiresParentalGate) {
        setPendingAction(() => action);
        setGateOpen(true);
        return;
      }
      action();
    },
    [requiresParentalGate],
  );

  // The header gear (MainLayout) opens the Settings tab via a window event.
  useEffect(() => {
    const openSettings = () => {
      runProtected(() => setActiveTab('settings'));
    };
    window.addEventListener('kq:profile-settings', openSettings);
    return () => window.removeEventListener('kq:profile-settings', openSettings);
  }, [runProtected]);

  const [reminderEnabled, setReminderEnabled] = useState(() => getReminderSettings().enabled);
  const [reminderHour] = useState(() => getReminderSettings().hour);

  const handleToggleReminder = () => {
    const nextEnabled = !reminderEnabled;
    setReminderEnabled(nextEnabled);
    saveReminderSettings({ enabled: nextEnabled, hour: reminderHour });
  };

  const handleClaimMission = async (missionId: string) => {
    if (!userData) return;
    const update = claimMission(userData, missionId);
    if (!update) return;
    await updateUserData(update);
  };

  const [editName, setEditName] = useState(user?.displayName || '');
  const [editAvatar, setEditAvatar] = useState(userData?.avatarId || AVATARS[0].id);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSave = async () => {
    if (editName.trim() !== user?.displayName) {
      await updateProfileName(editName.trim() || pickLocalized(language, { en: 'Learner', ar: 'متعلم', ku: 'Fêrxwaz' }));
    }
    await updateUserData({ avatarId: editAvatar });
    setIsEditing(false);
  };

  const handleSwitchLearnerMode = async (mode: LearnerMode) => {
    await updateUserData({
      learnerMode: mode,
      relaxedTimer: mode === 'kids',
      parentalGateEnabled: mode === 'kids',
    });
    if (mode === 'adults') {
      setGateUnlocked(false);
    }
  };

  if (loading && !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400">
        <div className="w-9 h-9 border-3 border-[#FFB300] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black tracking-wide">
          {pickLocalized(language, {
            en: 'Loading profile...',
            ar: 'جاري تحميل الملف الشخصي...',
            ku: 'Profîl tê barkirin...',
          })}
        </p>
      </div>
    );
  }

  const emptyProfile: UserData = {
    xp: 0,
    level: 1,
    streak: 0,
    gems: 0,
    streakFreezes: 0,
    avatarId: AVATARS[0].id,
    lastActive: 0,
    createdAt: 0,
    updatedAt: 0,
    wordsLearned: 0,
    recentSearches: [],
    favorites: [],
  };
  const safeUserData: UserData = userData ?? emptyProfile;
  const userUnlockedBadges = safeUserData.badges || [];
  const unlockedStickers = safeUserData.unlockedStickers || [];
  const selectedAvatar =
    AVATARS.find((a) => a.id === (isEditing ? editAvatar : safeUserData.avatarId)) || AVATARS[0];

  const tabOptions: readonly { value: 'progress' | 'settings'; label: string }[] = [
    {
      value: 'progress',
      label: pickLocalized(language, { en: 'Progress', ar: 'التقدم', ku: 'Pêşketin' }),
    },
    {
      value: 'settings',
      label: requiresParentalGate
        ? `🔒 ${pickLocalized(language, { en: 'Settings', ar: 'الإعدادات', ku: 'Mîheng' })}`
        : pickLocalized(language, { en: 'Settings', ar: 'الإعدادات', ku: 'Mîheng' }),
    },
  ];

  return (
    <div className="flex flex-col min-h-full bg-transparent p-4 lg:p-8 pb-28 lg:pb-12 max-w-5xl mx-auto w-full">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 mb-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#FFE7B3] to-transparent dark:from-[#3A2F14] pointer-events-none" />

        {!isEditing && (
          <button
            type="button"
            onClick={() => {
              setEditName(user?.displayName || '');
              setEditAvatar(safeUserData.avatarId || AVATARS[0].id);
              setIsEditing(true);
            }}
            aria-label={pickLocalized(language, {
              en: 'Edit profile',
              ar: 'تعديل الملف الشخصي',
              ku: 'Profîlê biguherîne',
            })}
            className="absolute top-4 end-4 w-11 h-11 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer z-20"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}

        <div
          className={`w-28 h-28 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg ring-4 ring-white dark:ring-slate-900 ${selectedAvatar.color}`}
        >
          {renderProfileAvatarIcon(selectedAvatar.icon, 'w-14 h-14')}
        </div>

        {isEditing ? (
          <div className="w-full max-w-sm space-y-5 relative z-10">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              aria-label={pickLocalized(language, { en: 'Your name', ar: 'اسمك', ku: 'Navê te' })}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-4 px-5 font-black text-center text-slate-800 dark:text-white focus:ring-4 focus:ring-[#FFB300]/25 outline-none transition-all"
              placeholder={pickLocalized(language, { en: 'Your name', ar: 'اسمك', ku: 'Navê te' })}
            />

            <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-4">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-3">
                {pickLocalized(language, { en: 'Select Avatar', ar: 'اختر صورتك', ku: 'Avatarê hilbijêre' })}
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    aria-label={avatar.id}
                    onClick={() => setEditAvatar(avatar.id)}
                    className={`aspect-square rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                      editAvatar === avatar.id
                        ? 'ring-4 ring-[#FFB300] scale-105 shadow-md'
                        : 'opacity-65 hover:opacity-100'
                    } ${avatar.color}`}
                  >
                    {renderProfileAvatarIcon(avatar.icon, 'w-8 h-8')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-4 min-h-[44px] bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-2xl font-black text-sm cursor-pointer transition-colors"
              >
                {pickLocalized(language, { en: 'Cancel', ar: 'إلغاء', ku: 'Betal bike' })}
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                className="flex-1 py-4 min-h-[44px] bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] rounded-full font-black text-sm shadow-[0_2px_0_#E69500] cursor-pointer transition-colors"
              >
                {pickLocalized(language, { en: 'Save', ar: 'حفظ', ku: 'Tomar bike' })}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 space-y-2">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">
              <bdi>{user?.displayName || pickLocalized(language, { en: 'Learner', ar: 'متعلم', ku: 'Fêrxwaz' })}</bdi>
            </h2>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] rounded-full text-xs font-extrabold border border-[#FFB300]/40 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-[#FFB300] text-[#FFB300]" aria-hidden="true" />
              {isKidsMode ? t(language, 'mode_kids') : t(language, 'mode_adults')}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <>
          {/* Segmented Tabs */}
          <div className="w-full max-w-sm mx-auto mb-6">
            <SegmentedControl
              options={tabOptions}
              value={activeTab}
              ariaLabel={pickLocalized(language, {
                en: 'Profile sections',
                ar: 'أقسام الملف الشخصي',
                ku: 'Beşên profîlê',
              })}
              onChange={(nextTab) => {
                if (nextTab === 'settings') {
                  runProtected(() => setActiveTab('settings'));
                } else {
                  setActiveTab('progress');
                }
              }}
            />
          </div>

          {/* Tab Content: Progress */}
          {activeTab === 'progress' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Quick Links */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-xs hover:border-[#FFB300]/60 dark:hover:border-[#FFB300]/40 transition-all cursor-pointer group text-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 dark:bg-sky-950/40 rounded-full flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {pickLocalized(language, { en: 'Dictionary', ar: 'القاموس', ku: 'Ferheng' })}
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white mt-0.5">
                      {pickLocalized(language, { en: 'Search', ar: 'البحث', ku: 'Lêgerîn' })}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/favorites')}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-xs hover:border-rose-300 dark:hover:border-rose-800 transition-all cursor-pointer group text-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-100 dark:bg-rose-950/40 rounded-full flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500/20" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {pickLocalized(language, { en: 'Saved', ar: 'المحفوظات', ku: 'Tomarkirî' })}
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white mt-0.5">
                      {pickLocalized(language, { en: 'Favorites', ar: 'المفضلة', ku: 'Bijarte' })}
                    </div>
                  </div>
                </button>

                {isKidsMode ? (
                  <button
                    type="button"
                    onClick={() => navigate('/store')}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-xs hover:border-amber-300 dark:hover:border-amber-800 transition-all cursor-pointer group text-center"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF3D6] dark:bg-amber-950/40 rounded-full flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
                      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="font-extrabold text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {pickLocalized(language, { en: 'Rewards', ar: 'المكافآت', ku: 'Xelat' })}
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white mt-0.5">
                        {t(language, 'store_stickers')}
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate('/leaderboard')}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-xs hover:border-amber-300 dark:hover:border-amber-800 transition-all cursor-pointer group text-center"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF3D6] dark:bg-amber-950/40 rounded-full flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-500/20" />
                    </div>
                    <div>
                      <div className="font-extrabold text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {pickLocalized(language, { en: 'Rank', ar: 'التصنيف', ku: 'Rêz' })}
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white mt-0.5">
                        {pickLocalized(language, { en: 'Leaderboard', ar: 'المتصدرون', ku: 'Lîga Pêşeng' })}
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBox
                  icon={<Sun className="w-8 h-8 text-[#FFB300] fill-[#FFB300]/30" />}
                  label={pickLocalized(language, { en: 'Total XP', ar: 'نقاط الخبرة', ku: 'Tevahiya XP' })}
                  value={safeUserData.xp || 0}
                  colorClass="text-amber-500"
                  highlight
                />
                <StatBox
                  icon={<Flame className="w-8 h-8 text-[#FF5722] fill-[#FF5722]/20" />}
                  label={pickLocalized(language, { en: 'Day Streak', ar: 'أيام متتالية', ku: 'Rêza Rojan' })}
                  value={safeUserData.streak || 0}
                  colorClass="text-orange-500"
                />
                <StatBox
                  icon={<Award className="w-8 h-8 text-sky-500" />}
                  label={pickLocalized(language, { en: 'Gems', ar: 'الجواهر', ku: 'Cewher' })}
                  value={safeUserData.gems ?? 100}
                  colorClass="text-sky-500"
                />
                <StatBox
                  icon={<ShieldCheck className="w-8 h-8 text-blue-500" />}
                  label={pickLocalized(language, { en: 'Freezes', ar: 'التجميد', ku: 'Cemidandin' })}
                  value={safeUserData.streakFreezes ?? 1}
                  colorClass="text-blue-500"
                />
              </div>

              {/* Sticker Book Collection */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-base text-slate-800 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FFB300]" aria-hidden="true" />
                    {t(language, 'store_stickers')}
                  </h3>
                  <button
                    type="button"
                    onClick={() => navigate('/store')}
                    className="text-xs font-black text-[#8A6100] dark:text-[#FFCE6B] hover:underline cursor-pointer min-h-[36px] px-2"
                  >
                    {pickLocalized(language, { en: 'Open Shop →', ar: 'افتح المتجر ←', ku: 'Firoşgeh →' })}
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {STICKER_BOOK.map((sticker) => {
                    const owned = unlockedStickers.includes(sticker.id);
                    return (
                      <div
                        key={sticker.id}
                        className={`rounded-2xl border p-3 flex flex-col items-center text-center gap-1.5 ${
                          owned
                            ? 'bg-[#FFF6E0]/70 dark:bg-[#3A2F14]/50 border-[#FFB300]/50'
                            : 'bg-slate-50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800 opacity-50 grayscale'
                        }`}
                      >
                        <span className="text-2xl select-none" aria-hidden="true">
                          {sticker.emoji}
                        </span>
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">
                          {pickLocalized(language, sticker.name)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* This Week streak tracker */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
                <h3 className="font-black text-base text-slate-800 dark:text-white mb-4">
                  {pickLocalized(language, { en: 'This Week', ar: 'هذا الأسبوع', ku: 'Ev Hefte' })}
                </h3>
                <div className="flex justify-between items-center">
                  {(() => {
                    const dayLetters = DAY_LABELS[language];
                    const todayIdx = new Date().getDay();
                    const streak = safeUserData.streak || 0;
                    const activeToday = safeUserData.lastActiveDate === new Date().toISOString().slice(0, 10);
                    return dayLetters.map((letter, i) => {
                      const isToday = i === todayIdx;
                      const daysAgo = todayIdx - i;
                      const isDone = !isToday && daysAgo > 0 && daysAgo <= (activeToday ? streak - 1 : streak);
                      return (
                        <div key={`${letter}-${i}`} className="flex flex-col items-center gap-2">
                          <span
                            className={`text-[11px] font-extrabold uppercase ${
                              isDone || isToday ? 'text-[#8A6100] dark:text-[#FFCE6B]' : 'text-slate-400'
                            }`}
                          >
                            {letter}
                          </span>
                          {isDone ? (
                            <span className="w-9 h-9 rounded-full bg-[#FFB300] flex items-center justify-center shadow-[0_2px_0_#E69500]">
                              <Check className="w-4 h-4 text-white stroke-[3.5]" />
                            </span>
                          ) : isToday ? (
                            <span className="w-9 h-9 rounded-full border-2 border-[#FFB300] flex items-center justify-center bg-white dark:bg-slate-900">
                              {activeToday ? (
                                <Check className="w-4 h-4 text-[#FFB300] stroke-[3.5]" />
                              ) : (
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB300]" />
                              )}
                            </span>
                          ) : (
                            <span className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800" />
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Daily Missions */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-xs">
                <div className="flex items-center justify-between mb-1 px-1">
                  <h3 className="font-black text-lg text-slate-800 dark:text-white">{t(language, 'missions_title')}</h3>
                  <span className="text-base" aria-hidden="true">💎</span>
                </div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 px-1 mb-3 leading-snug">
                  {t(language, 'missions_sub')}
                </p>
                <ul className="space-y-2.5 list-none p-0 m-0">
                  {getMissionStatuses(userData).map(({ def, progress, complete, claimed }) => (
                    <li
                      key={def.id}
                      className={`rounded-2xl border p-3 flex items-center gap-3 ${
                        claimed
                          ? 'bg-emerald-50/60 border-emerald-200/70 dark:bg-emerald-950/20 dark:border-emerald-900/50'
                          : 'bg-slate-50 border-slate-100 dark:bg-slate-950/40 dark:border-slate-800'
                      }`}
                    >
                      <span
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-lg shrink-0 select-none"
                        aria-hidden="true"
                      >
                        {def.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[13px] font-black text-slate-800 dark:text-slate-100 truncate">
                            {t(language, def.titleKey)}
                          </h4>
                          <span className="text-[11px] font-black text-cyan-700 dark:text-cyan-300 shrink-0">
                            💎 {def.reward}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 truncate">
                          {t(language, def.descKey)}
                        </p>
                        <div
                          className="mt-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
                          dir="ltr"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={def.target}
                          aria-valuenow={progress}
                          aria-label={t(language, def.titleKey)}
                        >
                          <div
                            className={`h-full rounded-full transition-all ${complete ? 'bg-emerald-500' : 'bg-[#FFB300]'}`}
                            style={{ width: `${Math.round((progress / def.target) * 100)}%` }}
                          />
                        </div>
                      </div>
                      {claimed ? (
                        <span className="shrink-0 text-[11px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> {t(language, 'mission_claimed')}
                        </span>
                      ) : complete ? (
                        <button
                          type="button"
                          onClick={() => void handleClaimMission(def.id)}
                          className="shrink-0 min-h-[44px] px-4 rounded-full bg-[#FFB300] hover:bg-[#E69500] text-[#432C00] text-xs font-black cursor-pointer transition-colors active:scale-95"
                        >
                          {t(language, 'mission_claim')}
                        </button>
                      ) : (
                        <span className="shrink-0 text-xs font-black text-slate-400 font-mono">
                          {progress}/{def.target}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Badges Section */}
              <div>
                <div className="flex justify-between items-center mb-4 px-1">
                  <h3 className="font-black text-lg text-slate-800 dark:text-white">
                    {pickLocalized(language, { en: 'Achievements', ar: 'الإنجازات', ku: 'Serkeftin' })}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAllBadges((v) => !v)}
                    className="text-sm font-extrabold text-[#8A6100] dark:text-[#FFCE6B] bg-transparent border-none cursor-pointer min-h-[44px] px-2"
                  >
                    {showAllBadges
                      ? pickLocalized(language, { en: 'Show Less', ar: 'عرض أقل', ku: 'Kêmtir nîşan bide' })
                      : pickLocalized(language, { en: 'View All', ar: 'عرض الكل', ku: 'Hemûyan bibîne' })}
                  </button>
                </div>

                {!showAllBadges ? (
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
                    {BADGES_DB.map((badge) => {
                      const isUnlocked = userUnlockedBadges.includes(badge.id);
                      const title = pickLocalized(language, badge.title);
                      return (
                        <div
                          key={badge.id}
                          className={`min-w-[118px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 flex flex-col items-center gap-2.5 text-center shadow-xs shrink-0 ${
                            isUnlocked ? '' : 'opacity-60'
                          }`}
                        >
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                              isUnlocked
                                ? `bg-gradient-to-br ${badge.color} text-white shadow-sm`
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 grayscale'
                            }`}
                          >
                            {badge.icon}
                          </div>
                          <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 leading-tight">
                            {title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[22rem] overflow-y-auto pe-1">
                    {BADGES_DB.map((badge) => {
                      const isUnlocked = userUnlockedBadges.includes(badge.id);
                      const title = pickLocalized(language, badge.title);
                      const desc = pickLocalized(language, badge.desc);
                      return (
                        <div
                          key={badge.id}
                          className={`p-4 rounded-[1.5rem] border flex items-center gap-4 transition-all ${
                            isUnlocked
                              ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 opacity-60'
                          }`}
                        >
                          <div
                            className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-3xl shrink-0 shadow-sm ${
                              isUnlocked
                                ? `bg-gradient-to-br ${badge.color} text-white`
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                            }`}
                          >
                            {badge.icon}
                          </div>
                          <div className="flex-1 text-start">
                            <h5 className="font-black text-sm text-slate-800 dark:text-slate-100 leading-tight">
                              {title}
                            </h5>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
                          </div>
                          {isUnlocked && (
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                              <Check className="w-4 h-4 text-emerald-500" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Tab Content: Settings (Protected by Parental Gate in Kids Mode) */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 text-start">
              {/* Learner Mode & Kids Protection */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
                <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {pickLocalized(language, {
                    en: 'Learner Experience',
                    ar: 'نمط التعلّم',
                    ku: 'Moda Fêrbûnê',
                  })}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    aria-pressed={isKidsMode}
                    onClick={() => void handleSwitchLearnerMode('kids')}
                    className={`p-4 rounded-2xl border-2 text-start transition-all cursor-pointer ${
                      isKidsMode
                        ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14]'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40'
                    }`}
                  >
                    <div className="text-sm font-black text-slate-800 dark:text-white">
                      {t(language, 'mode_kids')}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t(language, 'mode_kids_desc')}
                    </p>
                  </button>

                  <button
                    type="button"
                    aria-pressed={!isKidsMode}
                    onClick={() => void handleSwitchLearnerMode('adults')}
                    className={`p-4 rounded-2xl border-2 text-start transition-all cursor-pointer ${
                      !isKidsMode
                        ? 'border-[#FFB300] bg-[#FFF6E0] dark:bg-[#3A2F14]'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40'
                    }`}
                  >
                    <div className="text-sm font-black text-slate-800 dark:text-white">
                      {t(language, 'mode_adults')}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t(language, 'mode_adults_desc')}
                    </p>
                  </button>
                </div>

                {isKidsMode && (
                  <>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-800 dark:text-white">
                            {t(language, 'parental_gate_title')}
                          </div>
                          <div className="text-xs text-slate-500">
                            {pickLocalized(language, {
                              en: 'Ask a math check before opening Settings',
                              ar: 'طلب مسألة حسابية قبل فتح الإعدادات',
                              ku: 'Beriya vekirina Mîhengan pirsa matematîkê bipirse',
                            })}
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={safeUserData.parentalGateEnabled !== false}
                        onCheckedChange={(checked) => {
                          void updateUserData({ parentalGateEnabled: checked });
                        }}
                        label={t(language, 'parental_gate_title')}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Preferences */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
                <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  {pickLocalized(language, { en: 'Preferences', ar: 'التفضيلات', ku: 'Vebijêrk' })}
                </h3>

                {/* Language Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-black text-slate-800 dark:text-white mb-0.5">
                      {pickLocalized(language, { en: 'App Language', ar: 'لغة التطبيق', ku: 'Zimanê Sepanê' })}
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {pickLocalized(language, {
                        en: 'Change interface language',
                        ar: 'تغيير لغة واجهة المستخدم',
                        ku: 'Zimanê navrûyê biguhere',
                      })}
                    </div>
                  </div>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl gap-1">
                    {(['en', 'ku', 'ar'] as const).map((langOpt) => (
                      <button
                        key={langOpt}
                        type="button"
                        onClick={() => setLanguage(langOpt)}
                        className={`px-3 py-2 min-h-[40px] text-xs font-black rounded-xl transition-all cursor-pointer ${
                          language === langOpt
                            ? 'bg-white dark:bg-slate-700 shadow-sm text-[#B45309] dark:text-[#FFCE6B]'
                            : 'text-slate-500'
                        }`}
                      >
                        {langOpt === 'en' ? 'EN' : langOpt === 'ku' ? 'Kurdî' : 'عربي'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF3D6] dark:bg-[#3A2F14] flex items-center justify-center text-[#8A6100] dark:text-[#FFCE6B]">
                      {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-800 dark:text-white mb-0.5">
                        {pickLocalized(language, { en: 'Dark Mode', ar: 'الوضع الليلي', ku: 'Moda Tarî' })}
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        {pickLocalized(language, {
                          en: 'Toggle dark appearance',
                          ar: 'تفعيل المظهر الداكن',
                          ku: 'Xuyanga tarî biguhere',
                        })}
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={() => toggleTheme()}
                    label={pickLocalized(language, { en: 'Dark Mode', ar: 'الوضع الليلي', ku: 'Moda Tarî' })}
                  />
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                {/* Guided Tour replay */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-black text-slate-800 dark:text-white mb-0.5">
                        {t(language, 'tour_replay_title')}
                      </div>
                      <div className="text-xs font-medium text-slate-500">{t(language, 'tour_replay_desc')}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      void updateUserData(resetToursForReplay(userData));
                      navigate('/');
                    }}
                    className="shrink-0 min-h-[44px] px-4 rounded-full bg-[#FFF6E0] dark:bg-[#3A2F14] text-[#8A6100] dark:text-[#FFCE6B] border border-[#FFB300]/40 font-black text-xs cursor-pointer hover:bg-[#FFE7B3] transition-colors"
                  >
                    {t(language, 'tour_replay_btn')}
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
                <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  {pickLocalized(language, { en: 'Notifications', ar: 'الإشعارات', ku: 'Agahdarî' })}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-800 dark:text-white mb-0.5">
                        {pickLocalized(language, {
                          en: 'Daily Reminders',
                          ar: 'التذكير اليومي',
                          ku: 'Bîranînên Rojane',
                        })}
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        {pickLocalized(language, {
                          en: 'Get notified to practice',
                          ar: 'احصل على إشعارات للتمرين',
                          ku: 'Ji bo pratîkê agahdar bibe',
                        })}
                      </div>
                    </div>
                  </div>

                  <Switch
                    checked={reminderEnabled}
                    onCheckedChange={() => handleToggleReminder()}
                    label={pickLocalized(language, {
                      en: 'Daily Reminders',
                      ar: 'التذكير اليومي',
                      ku: 'Bîranînên Rojane',
                    })}
                  />
                </div>
              </div>

              {/* Storage, Sync, Backup & PWA Install */}
              <DataBackupCard />

              {/* Legal & Privacy */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-1">
                <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  {t(language, 'legal_section')}
                </h3>

                {[
                  {
                    path: '/privacy',
                    title: t(language, 'privacy_policy'),
                    desc: t(language, 'privacy_policy_desc'),
                    icon: <ShieldCheck className="w-5 h-5" />,
                    tone: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
                  },
                  {
                    path: '/terms',
                    title: t(language, 'terms_of_service'),
                    desc: t(language, 'terms_of_service_desc'),
                    icon: <BookOpen className="w-5 h-5" />,
                    tone: 'bg-sky-100 dark:bg-sky-950/40 text-sky-500',
                  },
                ].map((row) => (
                  <button
                    key={row.path}
                    type="button"
                    onClick={() => runProtected(() => navigate(row.path))}
                    className="w-full min-h-[56px] flex items-center gap-3.5 py-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer text-start px-2 -mx-2"
                  >
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${row.tone}`}
                      aria-hidden="true"
                    >
                      {row.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-black text-slate-800 dark:text-white leading-snug">
                        {row.title}
                      </span>
                      <span className="block text-xs font-medium text-slate-500 mt-0.5">{row.desc}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 rtl:-scale-x-100 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>

              {/* About Us */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4" />
                  {t(language, 'about_us')}
                </h3>

                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-[#FFC541] to-[#FFA000] rounded-2xl shadow-md shadow-[#FFB300]/25 flex items-center justify-center border border-[#FFDE8A] shrink-0"
                    aria-hidden="true"
                  >
                    <span className="text-[#432C00] font-black text-2xl select-none">K</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-black text-slate-800 dark:text-white">Kurdish Quest</div>
                    <div className="text-xs font-bold text-slate-400 mt-0.5">{t(language, 'app_version')} 2.0.0</div>
                  </div>
                </div>

                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
                  {t(language, 'about_app_desc')}
                </p>
                <p className="text-xs font-bold text-[#B45309] dark:text-[#FFCE6B] mt-3">{t(language, 'made_with')}</p>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="w-full bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 p-5 rounded-3xl flex items-center justify-center gap-2 font-black text-sm transition-colors cursor-pointer shadow-sm"
              >
                <LogOut className="w-5 h-5" />
                {pickLocalized(language, { en: 'Sign Out', ar: 'تسجيل الخروج', ku: 'Derkeve' })}
              </button>
            </motion.div>
          )}
        </>
      )}

      {/* Parental Gate Modal for Kids Mode protection */}
      <ParentalGateModal
        open={gateOpen}
        onClose={() => {
          setGateOpen(false);
          setPendingAction(null);
        }}
        onSuccess={() => {
          setGateUnlocked(true);
          setGateOpen(false);
          const action = pendingAction;
          setPendingAction(null);
          if (action) action();
        }}
      />
    </div>
  );
}
