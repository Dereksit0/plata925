'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/utils';

const FAQ_KEYS = [1, 2, 3, 4, 5, 6] as const;

export default function Faq() {
  const t = useTranslations('faq');
  const reduced = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="bg-[#FEFEFE] px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <motion.h2
            id="faq-title"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold text-[#1A1A1A] sm:text-4xl"
          >
            {t('title')}
          </motion.h2>
        </div>

        <dl className="space-y-3">
          {FAQ_KEYS.map((n, i) => {
            const isOpen = openId === n;
            return (
              <motion.div
                key={n}
                initial={reduced ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-[16px] border border-[#E8E8E8] bg-white overflow-hidden"
              >
                <dt>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${n}`}
                    onClick={() => setOpenId(isOpen ? null : n)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-[#1A1A1A] transition-colors hover:text-[#ED5082] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
                  >
                    <span>{t(`q${n}`)}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#6B6B6B] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      id={`faq-answer-${n}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[#6B6B6B]">
                        {t(`a${n}`)}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
