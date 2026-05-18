'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageCircle, Clock } from 'lucide-react';
import { buildWaUrl } from '@/constants';
import { usePrefersReducedMotion } from '@/lib/utils';

export default function CtaFinal() {
  const t = useTranslations('ctaFinal');
  const tWa = useTranslations('whatsapp');
  const reduced = usePrefersReducedMotion();

  const waUrl = buildWaUrl(tWa('defaultMessage'));
  const lines = t('headline').split('\n');

  return (
    <section
      className="relative overflow-hidden bg-[#FFF5F8] px-4 py-24 text-center md:px-8 md:py-36"
      aria-label="Llamada a la acción final"
    >
      {/* Background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#ED5082]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#C0C0C0]/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.h2
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold leading-tight text-[#1A1A1A] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-lg text-lg text-[#6B6B6B]"
        >
          {t('subheadline')}
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#ED5082] px-10 py-5 text-lg font-bold text-white shadow-[0_8px_40px_rgba(237,80,130,0.35)] transition-all hover:scale-105 hover:bg-[#D4407A] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            {t('cta')}
          </a>

          <p className="flex items-center gap-1.5 text-sm text-[#6B6B6B]">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {t('hours')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
