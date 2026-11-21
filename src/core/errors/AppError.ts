/**
 * AppError.ts — Unified Error Hierarchy & Trilingual Error Formatting (Core Layer)
 */
import type { Language } from '../../models/user';

export enum AppErrorCode {
  NETWORK_OFFLINE = 'NETWORK_OFFLINE',
  STORAGE_READ_FAILED = 'STORAGE_READ_FAILED',
  STORAGE_WRITE_FAILED = 'STORAGE_WRITE_FAILED',
  MIGRATION_FAILED = 'MIGRATION_FAILED',
  BACKUP_INVALID = 'BACKUP_INVALID',
  SYNC_CONFLICT = 'SYNC_CONFLICT',
  SYNC_FAILED = 'SYNC_FAILED',
  AUTH_FAILED = 'AUTH_FAILED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  PLATFORM_UNAVAILABLE = 'PLATFORM_UNAVAILABLE',
  UNKNOWN = 'UNKNOWN',
}

export type ErrorCause = Error | string | null | undefined;

export interface AppErrorOptions {
  code: AppErrorCode;
  message: string;
  recoverable?: boolean;
  cause?: ErrorCause;
  context?: Record<string, string | number | boolean>;
}

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly recoverable: boolean;
  public readonly cause?: ErrorCause;
  public readonly context?: Record<string, string | number | boolean>;
  public readonly timestamp: number;

  constructor(options: AppErrorOptions) {
    super(options.message);
    this.name = 'AppError';
    this.code = options.code;
    this.recoverable = options.recoverable ?? true;
    this.cause = options.cause;
    this.context = options.context;
    this.timestamp = Date.now();
  }
}

function normalizeError(
  error: ErrorCause,
  fallbackCode: AppErrorCode = AppErrorCode.UNKNOWN,
  fallbackMessage = 'Unexpected error',
): AppError {
  if (error instanceof AppError) {
    return error;
  }
  if (error instanceof Error) {
    return new AppError({
      code: fallbackCode,
      message: error.message || fallbackMessage,
      cause: error,
    });
  }
  if (error !== null && error !== undefined && String(error).trim().length > 0) {
    return new AppError({
      code: fallbackCode,
      message: String(error),
      cause: error,
    });
  }
  return new AppError({
    code: fallbackCode,
    message: fallbackMessage,
    cause: error,
  });
}

const USER_MESSAGES = {
  [AppErrorCode.NETWORK_OFFLINE]: {
    en: 'You are offline. Your progress is safely saved on this device.',
    ar: 'أنت غير متصل بالإنترنت. تم حفظ تقدمك بأمان على جهازك.',
    ku: 'Tu bê înternet î. Pêşveçûna te bi ewlehî li ser cîhaza te hatiye tomarkirin.',
  },
  [AppErrorCode.STORAGE_READ_FAILED]: {
    en: 'Could not read local progress. Retrying with fallback storage.',
    ar: 'تعذرت قراءة البيانات المحلية. جاري المحاولة عبر التخزين الاحتياطي.',
    ku: 'Xwendina daneyên herêmî bi ser neket. Bi hilanîna cîgir tê ceribandin.',
  },
  [AppErrorCode.STORAGE_WRITE_FAILED]: {
    en: 'Could not save progress to device storage. Please check available space.',
    ar: 'تعذر حفظ التقدم على الجهاز. يرجى التحقق من المساحة المتاحة.',
    ku: 'Tomarkirina pêşveçûnê bi ser neket. Ji kerema xwe cihê vala kontrol bike.',
  },
  [AppErrorCode.MIGRATION_FAILED]: {
    en: 'Could not upgrade saved data format. Original data was preserved.',
    ar: 'تعذرت ترقية تنسيق البيانات المحفوظة. تم الحفاظ على بياناتك الأصلية.',
    ku: 'Nûkirina şêwaza daneyan bi ser neket. Daneyên orîjînal hatin parastin.',
  },
  [AppErrorCode.BACKUP_INVALID]: {
    en: 'The selected backup file is invalid or corrupted.',
    ar: 'ملف النسخة الاحتياطية غير صالح أو تالف.',
    ku: 'Pelê hilanînê ne derbasdar e an jî xera bûye.',
  },
  [AppErrorCode.SYNC_CONFLICT]: {
    en: 'Progress from multiple devices was merged automatically.',
    ar: 'تم دمج تقدمك من عدة أجهزة تلقائياً دون فقدان البيانات.',
    ku: 'Pêşveçûna ji çend cîhazan bixweber hate yekkirin.',
  },
  [AppErrorCode.SYNC_FAILED]: {
    en: 'Cloud sync paused. Your changes stay queued and will retry automatically.',
    ar: 'توقفت المزامنة السحابية مؤقتاً. ستتم إعادة المحاولة تلقائياً عند توفر الاتصال.',
    ku: 'Hevdengkirina ewrê rawestiya. Guhertinên te dê bixweber dîsa werin şandin.',
  },
  [AppErrorCode.AUTH_FAILED]: {
    en: 'Sign-in could not be completed. You can continue learning offline as a guest.',
    ar: 'تعذر إكمال تسجيل الدخول. يمكنك متابعة التعلم كضيف دون إنترنت.',
    ku: 'Têketin neqedî. Tu dikarî wekî mêvan bê înternet fêrbûnê bidomînî.',
  },
  [AppErrorCode.VALIDATION_ERROR]: {
    en: 'Please check the entered information and try again.',
    ar: 'يرجى التحقق من البيانات المدخلة والمحاولة مرة أخرى.',
    ku: 'Ji kerema xwe agahiyên ku hatine nivîsandin kontrol bike û dîsa biceribîne.',
  },
  [AppErrorCode.PLATFORM_UNAVAILABLE]: {
    en: 'This device capability is not available on the current platform.',
    ar: 'هذه الميزة غير متوفرة على المنصة الحالية.',
    ku: 'Ev taybetmendiya cîhazê li ser vê platformê peyda nabe.',
  },
  [AppErrorCode.UNKNOWN]: {
    en: 'Something went wrong. Please try again.',
    ar: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
    ku: 'Tiştêk şaş çû. Ji kerema xwe dîsa biceribîne.',
  },
} satisfies Record<AppErrorCode, Record<Language, string>>;

export function getUserErrorMessage(error: ErrorCause, language: Language): string {
  const appErr = normalizeError(error);
  return USER_MESSAGES[appErr.code]?.[language] ?? USER_MESSAGES[AppErrorCode.UNKNOWN][language];
}
