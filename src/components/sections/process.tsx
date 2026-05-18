'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, MessageCircle, CheckCircle, Package } from 'lucide-react';
import { buildWaUrl } from '@/constants';
import { usePrefersReducedMotion } from '@/lib/utils';

const STEP_ICONS = [Search, MessageCircle, CheckCircle, Package];
const STEP_KEYS = [
  { title: 'step1Title', desc: 'step1Desc' },
  { title: 'step2Title', desc: 'step2Desc' },
  { title: 'step3Title', desc: 'step3Desc' },
  { title: 'step4Title', desc: 'step4Desc' },
] as const;

export default function Process() {
  const t = useTranslations('process');
  const tWa = useTranslations('whatsapp');
  const reduced = usePrefersReducedMotion();

  const waUrl = buildWaUrl(tWa('defaultMessage'));

  return (
    <section
      id="proceso"
      className="bg-[#FEFEFE] px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="process-title"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <motion.h2
            id="process-title"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold text-[#1A1A1A] sm:text-4xl md:text-5xl"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-[#6B6B6B]"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 bg-gradient-to-r from-[#E8E8E8] via-[#ED5082] to-[#E8E8E8] md:block"
          />

          {STEP_KEYS.map(({ title, desc }, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={title}
                initial={reduced ? {} : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ED5082] text-white shadow-[0_8px_32px_rgba(237,80,130,0.3)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#ED5082] shadow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-1 font-semibold text-[#1A1A1A]">{t(title)}</h3>
                <p className="text-sm text-[#6B6B6B]">{t(desc)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[#ED5082] px-8 py-4 text-base font-bold text-white shadow-[0_8px_32px_rgba(237,80,130,0.3)] transition-all hover:scale-105 hover:bg-[#D4407A] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
          >
            {t('cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
