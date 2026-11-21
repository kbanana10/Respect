/**
 * ParentalGateModal.tsx
 *
 * Lightweight offline-first grown-up math check protecting Settings,
 * Kids/Adults mode switching, Data Reset, and External/Legal links while
 * `learnerMode === 'kids'`.
 */
import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useAuth } from '../../store/AuthContext';
import { t, pickLocalized } from '../../localization/translations';

export interface ParentalGateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface MathChallenge {
  a: number;
  b: number;
}

function generateChallenge(): MathChallenge {
  const a = 5 + Math.floor(Math.random() * 8); // 5..12
  const b = 4 + Math.floor(Math.random() * 7); // 4..10
  return { a, b };
}

export function ParentalGateModal({ open, onClose, onSuccess }: ParentalGateModalProps) {
  const { language } = useAuth();
  const [challenge, setChallenge] = useState<MathChallenge>(() => generateChallenge());
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (open) {
      setChallenge(generateChallenge());
      setAnswer('');
      setError(false);
    }
  }, [open]);

  const expected = challenge.a + challenge.b;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number.parseInt(answer.trim(), 10);
    if (parsed === expected) {
      setError(false);
      onSuccess();
      return;
    }
    setError(true);
    setAnswer('');
    setChallenge(generateChallenge());
  };

  const cancelLabel = pickLocalized(language, {
    en: 'Cancel',
    ar: 'إلغاء',
    ku: 'Betal bike',
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t(language, 'parental_gate_title')}
      description={t(language, 'parental_gate_desc')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#FFF6E0] dark:bg-[#3A2F14] border border-[#FFB300]/30 rounded-2xl p-4 flex items-center justify-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#8A6100] dark:text-[#FFCE6B] shrink-0" aria-hidden="true" />
          <span
            dir="ltr"
            data-testid="parental-gate-equation"
            className="text-2xl font-black text-ink tabular-nums tracking-wide"
          >
            {challenge.a} + {challenge.b} = ?
          </span>
        </div>

        <div>
          <input
            type="number"
            inputMode="numeric"
            autoFocus
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (error) setError(false);
            }}
            placeholder={t(language, 'parental_gate_placeholder')}
            aria-label={t(language, 'parental_gate_placeholder')}
            className="w-full min-h-[48px] px-4 rounded-2xl border border-line-soft dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center text-xl font-black text-ink tabular-nums focus:outline-none focus:border-[#FFB300]"
          />
          {error && (
            <p role="alert" className="text-xs font-bold text-rose-600 dark:text-rose-400 text-center mt-2">
              {t(language, 'parental_gate_wrong')}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            {t(language, 'parental_gate_unlock')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
