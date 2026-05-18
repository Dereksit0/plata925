'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PRODUCTS_3D, buildWaUrl } from '@/constants';
import { usePrefersReducedMotion } from '@/lib/utils';
import type { Product3D } from '@/types';

/* Dynamic import with ssr:false — Three.js / WebGL requires browser APIs unavailable on server */
const ProductViewerCanvas = dynamic(
  () => import('./product-viewer-canvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E8E8E8] border-t-[#ED5082]" />
      </div>
    ),
  }
);

export default function ProductViewer3D() {
  const t = useTranslations('viewer3d');
  const tWa = useTranslations('whatsapp');
  const reduced = usePrefersReducedMotion();

  const activeProduct = PRODUCTS_3D[0];
  const waUrl = buildWaUrl(tWa(activeProduct.waKey as Parameters<typeof tWa>[0]));

  return (
    <section
      className="bg-[#1A1A1A] px-4 py-20 md:px-8 md:py-28"
      aria-labelledby="viewer3d-title"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center text-white">
          <motion.h2
            id="viewer3d-title"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-white/60"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_280px]">
          {/* Canvas */}
          <motion.div
            initial={reduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square rounded-[16px] overflow-hidden bg-[#ED5082]"
          >
            <ProductViewerCanvas autoRotate={!reduced} />
            <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-white/40">
              {t('instructions')}
            </p>
          </motion.div>

          {/* Sidebar */}
          <div className="flex flex-col justify-center gap-6 md:gap-4">
            {/* Product info + CTA */}
            <div className="rounded-[16px] border border-white/10 bg-white/5 p-5">
              <h3 className="font-display text-2xl font-bold text-white">
                {t(`ingot.name`)}
              </h3>
              <p className="mt-2 text-sm text-white/50">Plata .925 · NOM-033/1-SE-2020</p>
              <p className="mt-4 text-sm text-white/80">
                {t('subtitle')}
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-full bg-[#ED5082] px-5 py-3 text-center text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#D4407A] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
              >
                {t(`ingot.cta`)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
