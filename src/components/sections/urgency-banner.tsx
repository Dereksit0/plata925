'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { buildWaUrl } from '@/constants';
import { usePrefersReducedMotion } from '@/lib/utils';

export default function UrgencyBanner() {
  const t = useTranslations('urgency');
  const tWa = useTranslations('whatsapp');
  const reduced = usePrefersReducedMotion();

  const waUrl = buildWaUrl(tWa('defaultMessage'));

  return (
    <section
      aria-label="Oferta especial"
      className="bg-[#ED5082] px-4 py-10 text-white md:px-8"
    >
      <motion.div
        initial={reduced ? {} : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left"
      >
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            <Zap className="h-3 w-3" aria-hidden="true" />
            {t('badge')}
          </span>
          <h2 className="font-impact text-2xl font-bold tracking-wide sm:text-3xl md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-sm text-white/80">{t('subtitle')}</p>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#ED5082] shadow-lg transition-all hover:scale-105 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-white"
        >
          {t('cta')}
        </a>
      </motion.div>
    </section>
  );
}
