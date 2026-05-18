'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './language-switcher';
import { buildWaUrl } from '@/constants';
import type { Locale } from '@/i18n/config';

interface Props {
  locale: Locale;
}

const NAV_KEYS = ['collections', 'whyUs', 'certification', 'testimonials', 'faq'] as const;
const SECTION_IDS: Record<string, string> = {
  collections: 'colecciones',
  whyUs: 'por-que',
  certification: 'certificacion',
  testimonials: 'testimonios',
  faq: 'faq',
};

export default function Navbar({ locale }: Props) {
  const t = useTranslations('nav');
  const tWa = useTranslations('whatsapp');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const waUrl = buildWaUrl(tWa('defaultMessage'));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-display text-xl font-bold tracking-tight text-[#1A1A1A]"
          aria-label="PLATA925 — Ir al inicio"
        >
          PLATA<span className="text-[#ED5082]">925</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 text-sm font-medium text-[#1A1A1A] md:flex">
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <a
                href={`/${locale}#${SECTION_IDS[key]}`}
                className="transition-colors hover:text-[#ED5082] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher currentLocale={locale} />
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#ED5082] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#D4407A] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-md p-2 text-[#1A1A1A] transition-colors hover:text-[#ED5082] md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[#E8E8E8] bg-white/98 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4 text-sm font-medium text-[#1A1A1A]">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <a
                    href={`/${locale}#${SECTION_IDS[key]}`}
                    className="block py-2 transition-colors hover:text-[#ED5082]"
                    onClick={() => setOpen(false)}
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 px-6 pb-5">
              <LanguageSwitcher currentLocale={locale} />
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-[#ED5082] px-5 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#D4407A]"
              >
                {t('cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
