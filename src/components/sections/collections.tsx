'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/constants';
import { usePrefersReducedMotion } from '@/lib/utils';

function StockBadge({ stock, t }: { stock: number; t: ReturnType<typeof useTranslations> }) {
  if (stock === 1) {
    return (
      <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
        {t('stockLast')}
      </span>
    );
  }
  if (stock <= 3) {
    return (
      <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
        {t('stockFew', { n: stock })}
      </span>
    );
  }
  if (stock <= 6) {
    return (
      <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#1A1A1A]">
        {t('stockLow')}
      </span>
    );
  }
  return null;
}

export default function Collections() {
  const t = useTranslations('collections');
  const reduced = usePrefersReducedMotion();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'es';

  return (
    <section
      id="colecciones"
      className="bg-[#FEFEFE] px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="collections-title"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2
            id="collections-title"
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

        {/* Grid layout: 2 cols on mobile, 3 on lg, 4 on xl */}
        <div className="pb-3">
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const catName = t(`${cat.key}.name`);
            const catDesc = t(`${cat.key}.description`);

            return (
              <motion.div
                key={cat.key}
                initial={reduced ? {} : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Link
                  href={`/${locale}/collections/${cat.key}`}
                  className="group relative flex flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_4px_20px_rgba(192,192,192,0.22)] transition-shadow hover:shadow-[0_8px_32px_rgba(237,80,130,0.15)] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
                  aria-label={catName}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {/* Stock badge — top-right corner */}
                    <div className="absolute right-2 top-2 sm:right-3 sm:top-3 scale-90 sm:scale-100 origin-top-right">
                      <StockBadge stock={cat.stock} t={t} />
                    </div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <h3 className="font-display text-base font-bold text-white sm:text-xl">
                      {catName}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-white/80 sm:mt-1 sm:line-clamp-2 sm:text-sm">
                      {catDesc}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-[#ED5082] px-3 py-1 text-[10px] font-semibold text-white transition-colors group-hover:bg-[#D4407A] sm:mt-4 sm:px-5 sm:py-2 sm:text-sm">
                      {t('cta')}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
