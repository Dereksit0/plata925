'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { buildWaUrl } from '@/constants';
import { usePrefersReducedMotion } from '@/lib/utils';

const SEAL_KEYS = ['seal1', 'seal2', 'seal3'] as const;

export default function Certification() {
  const t = useTranslations('certification');
  const tWa = useTranslations('whatsapp');
  const reduced = usePrefersReducedMotion();

  const waUrl = buildWaUrl(tWa('defaultMessage'));

  return (
    <section
      id="certificacion"
      className="bg-[#1A1A1A] px-4 py-20 text-white md:px-8 md:py-28"
      aria-labelledby="cert-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              id="cert-title"
              className="font-display text-3xl font-bold sm:text-4xl md:text-5xl"
            >
              {t('title')}
            </h2>
            <p className="mt-6 leading-relaxed text-white/70">{t('body')}</p>

            <div className="mt-8 flex justify-center sm:justify-start">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[#ED5082] px-8 py-4 text-base font-bold text-white shadow-[0_8px_32px_rgba(237,80,130,0.4)] transition-all hover:scale-105 hover:bg-[#D4407A] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
              >
                {t('cta')}
              </a>
            </div>
          </motion.div>

          {/* Seals */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Main seal */}
            <div className="rounded-[16px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              {/* Silver gradient text — inline style: CSS background-clip:text cannot be expressed as Tailwind color */}
              <div
                className="font-impact text-6xl font-bold tracking-wider silver-gradient-text"
                aria-label="Plata .925"
              >
                .925
              </div>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-[#C0C0C0]">
                Sterling Silver
              </p>
              <div className="hologram-line my-4 h-0.5 rounded-full" aria-hidden="true" />
              <p className="text-xs text-white/50">
                NOM-033/1-SE-2020
              </p>
            </div>

            {/* Seal list */}
            <div className="grid gap-3">
              {SEAL_KEYS.map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-[#ED5082]"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium">{t(key)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
