'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Shield, Gem, Truck } from 'lucide-react';
import { buildWaUrl } from '@/constants';

const TRUST_ICONS = [Shield, Gem, Truck];

export default function Hero() {
  const t = useTranslations('hero');
  const tWa = useTranslations('whatsapp');

  const waUrl = buildWaUrl(tWa('defaultMessage'));
  const trustKeys = ['trust1', 'trust2', 'trust3'] as const;
  const lines = t('headline').split('\n');

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#FEFEFE]"
      aria-label="Hero"
    >
      {/* ── Banner image: full background ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner.png"
          alt="PLATA925 — Joyería de plata .925 certificada"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[115%_top] lg:object-right"
        />

        {/* Mobile: image fully visible, only subtle fade at very bottom for buttons */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(254,254,254,0.88) 78%, #FEFEFE 90%)',
          }}
        />

        {/* Desktop: white on left → transparent on right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, rgba(254,254,254,0.97) 0%, rgba(254,254,254,0.92) 45%, rgba(254,254,254,0.55) 68%, transparent 100%)',
          }}
        />

        {/* Top fade — slimmer on mobile so jewelry is not hidden */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#FEFEFE] to-transparent lg:h-28"
        />
      </div>

      {/* ── Copy: bottom on mobile, centered-left on desktop ── */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-12 pt-16 sm:px-10 sm:pb-16 lg:w-[52%] lg:justify-center lg:px-14 lg:pb-16 lg:pt-28 xl:px-20">

        {/* Badge — hidden on mobile, visible on desktop */}
        <div className="mb-4 hidden lg:inline-flex w-fit items-center gap-2 rounded-full border border-[#ED5082]/40 bg-[#FFF5F8]/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ED5082] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ED5082]" aria-hidden="true" />
          {t('trust1')}
        </div>

        {/* Headline — hidden on mobile, visible on desktop */}
        <h1
          className="mb-4 hidden font-display font-bold leading-tight tracking-tight text-[#1A1A1A] lg:block"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 4rem)' }}
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {/(certificada|Certified)/i.test(line) ? (
                line.split(/(certificada|Certified)/i).map((part, j) =>
                  /(certificada|Certified)/i.test(part) ? (
                    <span key={j} className="text-[#ED5082]">{part}</span>
                  ) : part
                )
              ) : line}
            </span>
          ))}
        </h1>

        {/* Subheadline — hidden on mobile, visible on desktop */}
        <p
          className="mb-7 hidden max-w-xs text-[#6B6B6B] lg:block sm:max-w-sm lg:max-w-md"
          style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1.05rem)', lineHeight: 1.65 }}
        >
          {t('subheadline')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#ED5082] px-7 py-3.5 text-center text-sm font-bold text-white shadow-[0_8px_28px_rgba(237,80,130,0.3)] transition-all hover:scale-105 hover:bg-[#D4407A] focus-visible:outline-2 focus-visible:outline-[#ED5082] sm:text-base sm:px-8 sm:py-4"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#colecciones"
            className="rounded-full border border-[#1A1A1A]/25 px-7 py-3.5 text-center text-sm font-semibold text-[#1A1A1A] transition-all hover:border-[#ED5082] hover:text-[#ED5082] focus-visible:outline-2 focus-visible:outline-[#ED5082] sm:text-base sm:px-8 sm:py-4"
          >
            {t('ctaSecondary')}
          </a>
        </div>

        {/* Trust badges — hidden on mobile, visible on desktop */}
        <div className="mt-6 hidden flex-wrap gap-3 lg:flex lg:gap-4">
          {trustKeys.map((key, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div key={key} className="flex items-center gap-1.5 text-xs font-medium text-[#6B6B6B]">
                <Icon className="h-3.5 w-3.5 text-[#C0C0C0]" aria-hidden="true" />
                {t(key)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
