'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Droplets, ShieldCheck, Award, Flag } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/utils';

const ICONS = [ShieldCheck, Droplets, Award, Flag];
const ITEM_KEYS = [
  { title: 'item1Title', desc: 'item1Desc' },
  { title: 'item2Title', desc: 'item2Desc' },
  { title: 'item3Title', desc: 'item3Desc' },
  { title: 'item4Title', desc: 'item4Desc' },
] as const;

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="por-que"
      className="bg-[#FFF5F8] px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="why-us-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.h2
            id="why-us-title"
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
            className="mt-3 max-w-2xl mx-auto text-[#6B6B6B]"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEM_KEYS.map(({ title, desc }, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={title}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-[16px] bg-white p-6 shadow-[0_4px_20px_rgba(192,192,192,0.25)] text-center sm:text-left"
              >
                <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF5F8] sm:mx-0">
                  <Icon className="h-6 w-6 text-[#ED5082]" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-[#1A1A1A]">
                  {t(title)}
                </h3>
                <p className="text-sm leading-relaxed text-[#6B6B6B]">
                  {t(desc)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
