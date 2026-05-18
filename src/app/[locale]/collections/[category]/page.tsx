import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';
import { CATEGORIES, buildWaUrl } from '@/constants';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import type { Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;

  const validCategory = CATEGORIES.find((c) => c.key === category);
  if (!validCategory) notFound();

  const products = getProductsByCategory(category);
  const t = await getTranslations({ locale, namespace: 'categoryPage' });
  const tCol = await getTranslations({ locale, namespace: 'collections' });
  const tWa = await getTranslations({ locale, namespace: 'whatsapp' });

  const categoryName = tCol(`${category}.name`);
  const generalWaUrl = buildWaUrl(
    tWa(category as Parameters<typeof tWa>[0])
  );

  return (
    <>
      <Navbar locale={locale as Locale} />

      <main className="min-h-screen bg-[#FEFEFE] pt-20">
        {/* Header */}
        <div className="border-b border-[#E8E8E8] bg-white px-4 py-8 md:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/${locale}#colecciones`}
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] transition-colors hover:text-[#ED5082]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('back')}
            </Link>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                  {categoryName}
                </h1>
                <p className="mt-1 text-sm text-[#6B6B6B]">
                  {t('available', { n: products.length })}
                </p>
              </div>
              <a
                href={generalWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1DA851] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
              >
                <MessageCircle className="h-4 w-4" />
                {t('ctaGeneral')}
              </a>
            </div>
          </div>
        </div>

        {/* Product grid — 4 cols on mobile (ecommerce style), wider on larger screens */}
        <div className="mx-auto max-w-7xl px-2 py-6 sm:px-4 sm:py-10 md:px-8 md:py-14">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const name = locale === 'es' ? product.nameEs : product.nameEn;
              const description = locale === 'es' ? product.descriptionEs : product.descriptionEn;

              return (
                <Link
                  key={product.slug}
                  href={`/${locale}/collections/${category}/${product.slug}`}
                  className="group overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(192,192,192,0.3)] transition-shadow hover:shadow-[0_4px_20px_rgba(237,80,130,0.15)] focus-visible:outline-2 focus-visible:outline-[#ED5082] sm:rounded-[16px] sm:shadow-[0_4px_20px_rgba(192,192,192,0.22)]"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info — compact on mobile, full on sm+ */}
                  <div className="p-1.5 sm:p-4">
                    <h2 className="line-clamp-2 text-[10px] font-semibold leading-tight text-[#1A1A1A] group-hover:text-[#ED5082] transition-colors sm:text-sm sm:line-clamp-none">
                      {name}
                    </h2>
                    <p className="mt-1 hidden line-clamp-2 text-xs text-[#6B6B6B] sm:block">
                      {description}
                    </p>
                    <span className="mt-1 hidden text-[10px] font-semibold text-[#ED5082] sm:mt-3 sm:inline-block sm:text-xs">
                      {t('viewProduct')} →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </>
  );
}
