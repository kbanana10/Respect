import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../store/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { getAllVocabularyLemmas } from '../data/adapters/contentAdapter';
import type { AcademicLevel } from '../data/academic';
import { AudioButton } from '../features/audio/components/AudioButton';
import { Heart, Search } from 'lucide-react';
import { t, tLevel, pickLocalized } from '../localization/translations';

interface FavoriteDisplayItem {
  readonly id: string;
  readonly matchedKey: string;
  readonly ku: string;
  readonly en: string;
  readonly ar: string;
  readonly audio?: string;
  readonly level: AcademicLevel;
  readonly exampleKu?: string;
  readonly exampleEn?: string;
  readonly exampleAr?: string;
}

function cefrToAcademicLevel(cefr: string): AcademicLevel {
  if (cefr === 'A2') return 'intermediate';
  if (cefr === 'B1' || cefr === 'B2' || cefr === 'C1') return 'advanced';
  return 'beginner';
}

export function Favorites() {
  const navigate = useNavigate();
  const { language } = useAuth();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState('');

  // Resolve favorites across the unified catalogue (normalized lemmas,
  // core vocabulary, academic terms with or without `acad_` prefix, and syllabus words).
  const favWords = useMemo<FavoriteDisplayItem[]>(() => {
    const lemmas = getAllVocabularyLemmas();
    const items: FavoriteDisplayItem[] = [];
    const seenKu = new Set<string>();

    for (const lemma of lemmas) {
      const legacyAcadId = lemma.id.startsWith('acad_') ? lemma.id.slice(5) : null;
      const matchedKey = isFavorite(lemma.id)
        ? lemma.id
        : legacyAcadId && isFavorite(legacyAcadId)
          ? legacyAcadId
          : null;

      if (!matchedKey) continue;
      const dedupeKey = lemma.lemmaKu.toLowerCase();
      if (seenKu.has(dedupeKey)) continue;
      seenKu.add(dedupeKey);

      const firstEx = lemma.examples?.[0];
      items.push({
        id: lemma.id,
        matchedKey,
        ku: lemma.lemmaKu,
        en: lemma.translations.en,
        ar: lemma.translations.ar,
        audio: lemma.media?.audioUrl,
        level: cefrToAcademicLevel(lemma.cefrLevel),
        exampleKu: firstEx?.sentenceKu,
        exampleEn: firstEx?.translations.en,
        exampleAr: firstEx?.translations.ar,
      });
    }

    return items;
  }, [favorites, isFavorite]);

  const words = favWords.filter((w) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      w.ku.toLowerCase().includes(q) ||
      w.en.toLowerCase().includes(q) ||
      w.ar.includes(search.trim())
    );
  });

  const removeFavLabel = pickLocalized(language, {
    en: 'Remove from favorites',
    ar: 'إزالة من المفضلة',
    ku: 'Ji bijareyan rake',
  });

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-4 flex flex-col">
      <div className="bg-rose-50 dark:bg-rose-950/20 rounded-3xl p-6 shadow-sm border border-rose-100 dark:border-rose-900/40 flex items-center gap-4 mb-2">
        <span className="text-4xl text-rose-500" aria-hidden="true">
          <Heart className="w-10 h-10 fill-current" />
        </span>
        <div>
          <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-200">{t(language, 'favorites')}</h2>
          <p className="text-rose-700 dark:text-rose-400 font-medium tabular-nums">
            {favWords.length} {t(language, 'words')}
          </p>
        </div>
      </div>

      {favWords.length > 0 && (
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.015)] focus:border-rose-300 focus:outline-none transition-colors ps-10 pe-4 text-slate-800 dark:text-slate-100 text-xs font-semibold"
              placeholder={t(language, 'search_terms')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="space-y-3 pb-4">
        {words.map((word) => (
          <div
            key={word.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] border border-line-soft dark:border-slate-800 flex flex-col gap-3 group relative"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-start">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-left font-black text-slate-900 dark:text-white text-base" dir="ltr">
                    {word.ku}
                  </h3>
                  <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg uppercase tracking-wider shrink-0">
                    {tLevel(language, word.level)}
                  </span>
                </div>
                <div className="flex gap-2 text-xs font-semibold mt-1 flex-wrap">
                  <span
                    className={pickLocalized(language, {
                      en: 'text-rose-600 dark:text-rose-400',
                      ar: 'text-slate-500 dark:text-slate-400',
                      ku: 'text-rose-600 dark:text-rose-400',
                    })}
                  >
                    <bdi>{word.en}</bdi>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span
                    className={pickLocalized(language, {
                      en: 'text-slate-500 dark:text-slate-400',
                      ar: 'text-rose-600 dark:text-rose-400',
                      ku: 'text-slate-500 dark:text-slate-400',
                    })}
                  >
                    <bdi>{word.ar}</bdi>
                  </span>
                </div>
              </div>
            </div>

            {word.exampleKu && (
              <div className="bg-slate-50/75 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-start">
                <p className="text-left font-extrabold text-slate-800 dark:text-slate-200 mb-1" dir="ltr">
                  "{word.exampleKu}"
                </p>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  <bdi>
                    {pickLocalized(language, {
                      en: word.exampleEn || '',
                      ar: word.exampleAr || '',
                      ku: word.exampleEn || '',
                    })}
                  </bdi>
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mt-1">
              <button
                type="button"
                aria-label={`${removeFavLabel}: ${word.ku}`}
                onClick={() => toggleFavorite(word.matchedKey)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors cursor-pointer bg-rose-50 dark:bg-rose-950/40 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/60"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
              <AudioButton
                audioUrl={word.audio}
                textToSpeak={word.ku}
                className="bg-rose-50 dark:bg-rose-950/45 text-rose-600 dark:text-rose-400 hover:bg-rose-100 border-none"
              />
            </div>
          </div>
        ))}

        {favWords.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-rose-200 dark:border-rose-900/40 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 mt-8">
            <Heart className="w-16 h-16 text-rose-300 dark:text-rose-900/40" />
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">{t(language, 'no_results')}</h3>
              <p className="text-slate-500 dark:text-slate-400">
                {pickLocalized(language, {
                  en: 'Go explore vocabulary categories and add standard or academic items to your favorites!',
                  ar: 'تصفح تصنيفات المفردات وأضف المصطلحات إلى مفضلتك الشخصية!',
                  ku: 'Kategoriyên peyvan bigere û peyvên akademîk yan giştî li bijareyên xwe zêde bike!',
                })}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/vocabulary')}
              className="mt-4 bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold px-6 py-3 rounded-2xl hover:bg-rose-200 transition-colors border-none cursor-pointer"
            >
              {pickLocalized(language, { en: 'Browse Vocabulary', ar: 'استعراض المفردات', ku: 'Peyvan Bibîne' })}
            </button>
          </div>
        )}

        {words.length === 0 && favWords.length > 0 && (
          <div className="text-center p-8 text-slate-500 font-medium">{t(language, 'no_results')}</div>
        )}
      </div>
    </div>
  );
}
