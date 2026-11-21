/**
 * navigation.ts
 * 
 * Provides safe back-navigation logic and route metadata definitions.
 * Fixes missing navigation import error.
 */

import { Language } from '../models/user';
import { pickLocalized } from '../localization/translations';

/**
 * Marker stored as `window.history.state.usr` on every native history entry
 * the Numbers/Colors subject pages push when a number family (or the advanced
 * "large numbers" family) is opened. Read by the header/Capacitor back handlers
 * to decide whether a back press should close the overlay before navigating
 * away. A plain string primitive so it survives `pushState`'s structured clone
 * and compares with `===` after deserialisation.
 */
export const NUMBER_FAMILY_HISTORY_STATE = 'number-family';

export interface RouteMeta {
  isMainTab: boolean;
  hideHeader: boolean;
  hideBottomNav: boolean;
  safeBackTo: string;
  brandLabel: string;
  title: string;
  shellMode?: 'immersive' | 'default';
}

export function getRouteMeta(pathname: string, language: Language): RouteMeta {
  const loc = (ku: string, ar: string, en: string) => pickLocalized(language, { ku, ar, en });

  // 1. Home
  if (pathname === '/') {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('KWESTA KURDÎ', 'كويست الكورمانجية', 'KURMANJI QUEST'),
      title: 'Zimanê Kurdî',
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 2. Login
  if (pathname === '/login') {
    return {
      isMainTab: true,
      hideHeader: true,
      hideBottomNav: true,
      brandLabel: loc('BI XÊR HATÎ', 'مرحباً', 'WELCOME'),
      title: loc('Têketin', 'تسجيل الدخول', 'Login'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 3. Alphabet
  if (pathname === '/alphabet') {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('LÎSTEYA TÎPAN', 'دراسة الأبجدية', 'ALPHABET STUDY'),
      title: loc('Tîpên Kurdî', 'الحروف الكوردية', 'Letters'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 4. Vocabulary categories (Main/Sub list)
  if (pathname === '/vocabulary') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('FERHENG Û PEYV', 'القاموس والمفردات', 'DICTIONARY'),
      title: loc('Kategorî', 'التصنيفات', 'Categories'),
      safeBackTo: loc('Rêç', 'الخارطة', 'Roadmap'),
    };
  }

  // 5. Vocabulary categories detail / list
  if (pathname.startsWith('/vocabulary/')) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('PEYV', 'المفردات', 'VOCABULARY'),
      title: loc('Lîsteya Peyvan', 'قائمة الكلمات', 'Word List'),
      safeBackTo: loc('Kategorî', 'التصنيفات', 'Categories'),
    };
  }

  // 6. Sentences builder
  if (pathname === '/sentences') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('HEVOK', 'الجمل', 'PHRASES'),
      title: loc('Hevokên Belav', 'العبارات الشائعة', 'Common Phrases'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 5a. Writing word tracing page (per word)
  if (pathname.startsWith('/writing/words/')) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('PEYV', 'كلمات', 'WORDS'),
      title: loc('Peyv', 'كلمة', 'Word'),
      safeBackTo: loc('Peyv', 'كلمات', 'Words'),
    };
  }

  // 5b. Writing word grid
  if (pathname === '/writing/words') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('NIVÎSÎN', 'الكتابة', 'WRITING'),
      title: loc('Peyv', 'كلمات', 'Words'),
      safeBackTo: loc('Nivîsîn', 'الكتابة', 'Writing'),
    };
  }

  // 5a2. Writing sentence tracing page (per sentence)
  if (pathname.startsWith('/writing/sentences/')) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('HEVOK', 'جُمَل', 'SENTENCES'),
      title: loc('Hevok', 'جملة', 'Sentence'),
      safeBackTo: loc('Hevok', 'جُمَل', 'Sentences'),
    };
  }

  // 5b2. Writing sentence grid
  if (pathname === '/writing/sentences') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('NIVÎSÎN', 'الكتابة', 'WRITING'),
      title: loc('Hevok', 'جُمَل', 'Sentences'),
      safeBackTo: loc('Nivîsîn', 'الكتابة', 'Writing'),
    };
  }

  // 5c. Writing tracing page (per letter)
  if (pathname.startsWith('/writing/')) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('NIVÎSÎN', 'الكتابة', 'WRITING'),
      title: loc('Şopandin', 'الكتابة', 'Trace'),
      safeBackTo: loc('Nivîsîn', 'الكتابة', 'Writing'),
    };
  }

  // 5b. Writing grid page (Nivîsîn)
  if (pathname === '/writing') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('NIVÎSÎN', 'الكتابة', 'WRITING'),
      title: loc('Nivîsîn', 'الكتابة', 'Writing'),
      safeBackTo: loc('Fêrbûn', 'التعلّم', 'Learning'),
    };
  }

  // 6a. Grammar lesson detail
  if (pathname.startsWith('/grammar/')) {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('RÊZIMAN', 'قواعد', 'GRAMMAR'),
      title: loc('Ders', 'الدرس', 'Lesson'),
      safeBackTo: loc('Rêziman', 'النحو', 'Grammar'),
    };
  }

  // 6b. Grammar sub-category hub
  if (pathname === '/grammar') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('RÊZIMAN', 'قواعد', 'GRAMMAR'),
      title: loc('Rêziman', 'النحو', 'Grammar'),
      safeBackTo: loc('Fêrbûn', 'التعلّم', 'Learning'),
    };
  }

  // 7. Favorites
  if (pathname === '/favorites') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('KOMEL', 'مجموعتي', 'SAVED'),
      title: loc('Bijare', 'المفضلة', 'Favorites'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 9. Active Quiz
  if (pathname.startsWith('/quiz/')) {
    return {
      isMainTab: false,
      hideHeader: true,
      hideBottomNav: true,
      brandLabel: loc('PIRS', 'التحدي', 'QUIZ ZONE'),
      title: loc('Pirs', 'اختبار', 'Quiz'),
      safeBackTo: loc('Rêç', 'الخارطة', 'Roadmap'),
      shellMode: 'immersive',
    };
  }

  // 10. Roadmap
  if (pathname === '/roadmap') {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('PLANA DERSAN', 'المنهج الدراسي', 'CURRICULUM'),
      title: loc('Rêça Hînbûnê', 'الخارطة التعليمية', 'Roadmap'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 11. Games
  if (pathname === '/games') {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('LÎSTIKÊN ŞAHIYÊ', 'ركن الألعاب', 'FUN ARCADE'),
      title: loc('Lîstikên Perwerdeyê', 'الألعاب التعليمية', 'Mini-Games'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // Gem Store
  if (pathname === '/store') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('DIKANA GEWHERAN', 'متجر الجواهر', 'GEM STORE'),
      title: loc('Dikan', 'المتجر', 'Store'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 12. Search
  if (pathname === '/search') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('FERHENG', 'المعجم الكوردي', 'GLOSSARY'),
      title: loc('Lêgerîn', 'البحث', 'Search'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 14. Profile
  if (pathname === '/profile') {
    return {
      isMainTab: true,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('HESAB', 'الحساب', 'ACCOUNT'),
      title: loc('Profîl', 'الملف الشخصي', 'Profile'),
      safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
    };
  }

  // 15. Leaderboard
  if (pathname === '/leaderboard') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('RÊZBÛN', 'الترتيب', 'RANKING'),
      title: loc('Tabloya Pêşengan', 'لوحة الصدارة', 'Leaderboard'),
      safeBackTo: loc('Profîl', 'الملف الشخصي', 'Profile'),
    };
  }

  // 16. Privacy Policy
  if (pathname === '/privacy') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('PARASTINA DANEYAN', 'الخصوصية', 'COMPLIANCE'),
      title: loc('Rêbaza Nepeniyê', 'سياسة الخصوصية', 'Privacy Policy'),
      safeBackTo: loc('Profîl', 'الملف الشخصي', 'Profile'),
    };
  }

  // 17. Terms of Service
  if (pathname === '/terms') {
    return {
      isMainTab: false,
      hideHeader: false,
      hideBottomNav: false,
      brandLabel: loc('ŞERTÊN BIKARANÎNÊ', 'الشروط', 'COMPLIANCE'),
      title: loc('Mercên Xizmetê', 'شروط الخدمة', 'Terms of Service'),
      safeBackTo: loc('Profîl', 'الملف الشخصي', 'Profile'),
    };
  }

  // 18. Default / Fallback
  return {
    isMainTab: false,
    hideHeader: false,
    hideBottomNav: false,
    brandLabel: loc('KWESTA KURDÎ', 'كويست الكورمانجية', 'KURMANJI QUEST'),
    title: loc('Hîn Bibe', 'تعلم', 'Learn'),
    safeBackTo: loc('Mal', 'الرئيسية', 'Home'),
  };
}

export function navigateSafelyBack(navigate: (path: string | number) => void, pathname: string) {
  // Prefer the user's REAL previous screen whenever in-app history exists
  // (react-router tracks its position in history.state.idx). The hardcoded
  // parent map below only serves deep links / fresh sessions, where -1
  // would exit the app or land somewhere unexpected.
  const historyIdx =
    globalThis.window !== undefined && window.history.state && Number.isInteger(window.history.state.idx)
      ? window.history.state.idx
      : 0;
  if (historyIdx > 0) {
    navigate(-1);
    return;
  }

  if (pathname.startsWith('/vocabulary/')) {
    navigate('/learn');
  } else if (pathname === '/vocabulary') {
    navigate('/roadmap');
  } else if (pathname.startsWith('/quiz/')) {
    navigate('/roadmap');
  } else if (pathname === '/leaderboard' || pathname === '/privacy' || pathname === '/terms') {
    navigate('/profile');
  } else if (pathname === '/grammar') {
    navigate('/learn');
  } else if (pathname.startsWith('/grammar/')) {
    navigate('/grammar');
  } else if (pathname === '/writing') {
    navigate('/learn');
  } else if (pathname.startsWith('/writing/words/')) {
    navigate('/writing/words');
  } else if (pathname === '/writing/words') {
    navigate('/writing');
  } else if (pathname.startsWith('/writing/sentences/')) {
    navigate('/writing/sentences');
  } else if (pathname === '/writing/sentences') {
    navigate('/writing');
  } else if (pathname.startsWith('/writing/')) {
    navigate('/writing');
  } else {
    navigate('/');
  }
}

/**
 * Back-press interceptor registry (LIFO).
 *
 * Some screens own a sub-level the router cannot see — the writing lesson's
 * watch/trace/write stages and its result overlay are component state, not
 * routes. A back press on such a screen must climb ONE level INSIDE the screen
 * instead of popping the route. Screens register a handler here; the header
 * arrow and the Capacitor hardware back button run the registry FIRST (before
 * navigateSafelyBack), and the most recently mounted screen gets the first
 * chance to consume the press.
 *
 * The registry is a module-level array with no window access, so it is safe
 * under SSR and jsdom (handlers are simply never invoked there).
 */
export type BackInterceptor = () => boolean;

const backInterceptors: BackInterceptor[] = [];

/** Register an interceptor; returns the unregister function (use as an effect cleanup). */
export function registerBackInterceptor(fn: BackInterceptor): () => void {
  backInterceptors.push(fn);
  return () => {
    const idx = backInterceptors.indexOf(fn);
    if (idx >= 0) backInterceptors.splice(idx, 1);
  };
}

/**
 * Run registered interceptors LIFO (most recently mounted screen first).
 * Returns true when one consumed the back press — the caller must then NOT
 * navigate; false means the press falls through to normal back navigation.
 */
export function runBackInterceptors(): boolean {
  for (let i = backInterceptors.length - 1; i >= 0; i--) {
    if (backInterceptors[i]()) return true;
  }
  return false;
}
