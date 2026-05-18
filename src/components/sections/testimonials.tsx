'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/utils';

const TESTIMONIAL_KEYS = [1, 2, 3, 4, 5, 6] as const;

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="testimonios"
      className="bg-[#FFF5F8] px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.h2
            id="testimonials-title"
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

        {/* Mobile: horizontal scroll — from sm+: grid */}
        <div className="-mx-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <div className="flex w-max gap-4 sm:w-auto sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIAL_KEYS.map((n, i) => (
            <motion.article
              key={n}
              initial={reduced ? {} : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-[80vw] max-w-[320px] flex-none rounded-[16px] bg-white p-6 shadow-[0_4px_20px_rgba(192,192,192,0.25)] sm:w-auto sm:max-w-none"
            >
              {/* Stars */}
              <div className="mb-3 flex gap-0.5" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className="h-4 w-4 fill-[#ED5082] text-[#ED5082]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-4 text-sm leading-relaxed text-[#1A1A1A]">
                &ldquo;{t(`t${n}Text`)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ED5082] text-sm font-bold text-white">
                  {t(`t${n}Name`).charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    {t(`t${n}Name`)}
                  </p>
                  <p className="text-xs text-[#6B6B6B]">
                    {t(`t${n}Location`)} · {t(`t${n}Age`)}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
