import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { buildWaUrl, CATEGORIES } from '@/constants';
import type { Locale } from '@/i18n/config';

interface Props {
  locale: Locale;
}

export default function Footer({ locale }: Props) {
  const t = useTranslations('footer');
  const tWa = useTranslations('whatsapp');
  const waUrl = buildWaUrl(tWa('defaultMessage'));

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {/* Brand — centered on mobile, left-aligned on desktop */}
          <div className="text-center md:text-left">
            <Link
              href={`/${locale}`}
              className="inline-block font-display text-2xl font-bold tracking-tight"
              aria-label="PLATA925 — Inicio"
            >
              PLATA<span className="text-[#ED5082]">925</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#9A9A9A]">
              {t('tagline')}
            </p>
            <div className="mt-4 flex justify-center md:justify-start">
              <span className="inline-block rounded-full border border-[#ED5082]/40 px-3 py-1 text-xs text-[#ED5082]">
                {t('certBadge')}
              </span>
            </div>
          </div>

          {/* Mobile: Collections + Info side by side (2 cols).
              Desktop: md:contents makes them separate columns in the parent 3-col grid. */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {/* Collections */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#6B6B6B]">
                {t('collectionsTitle')}
              </h3>
              <ul className="space-y-2 text-sm text-[#9A9A9A]">
                {CATEGORIES.map((cat) => (
                  <li key={cat.key}>
                    <a
                      href="#colecciones"
                      className="transition-colors hover:text-[#ED5082] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
                    >
                      {cat.key.charAt(0).toUpperCase() + cat.key.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info + Contact */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#6B6B6B]">
                  {t('infoTitle')}
                </h3>
                <ul className="space-y-2 text-sm text-[#9A9A9A]">
                  <li>
                    <a href="#por-que" className="hover:text-[#ED5082] transition-colors">
                      {t('whyUs')}
                    </a>
                  </li>
                  <li>
                    <a href="#certificacion" className="hover:text-[#ED5082] transition-colors">
                      {t('certificationLink')}
                    </a>
                  </li>
                  <li>
                    <a href="#proceso" className="hover:text-[#ED5082] transition-colors">
                      {t('processLink')}
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-[#ED5082] transition-colors">
                      {t('faqLink')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#ED5082] transition-colors">
                      {t('privacy')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#ED5082] transition-colors">
                      {t('terms')}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#6B6B6B]">
                  {t('contactTitle')}
                </h3>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1DA851] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-[#6B6B6B]">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
