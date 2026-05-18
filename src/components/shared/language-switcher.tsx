'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, type Locale } from '@/i18n/config';

interface Props {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(locale: Locale) {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  }

  return (
    <div
      role="radiogroup"
      aria-label="Cambiar idioma / Change language"
      className="relative flex items-center rounded-full border border-[#D1D1D1] p-0.5"
    >
      <AnimatePresence>
        {locales.map((locale) => {
          const isActive = locale === currentLocale;
          return (
            <button
              key={locale}
              role="radio"
              aria-checked={isActive}
              onClick={() => !isActive && switchLocale(locale)}
              className="relative z-10 px-3 py-1 text-xs font-semibold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-[#ED5082]"
              style={{ color: isActive ? '#FEFEFE' : '#6B6B6B' }}
            >
              {isActive && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-[#ED5082]"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {locale.toUpperCase()}
            </button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
