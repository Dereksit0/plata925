import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, MessageCircle, ShieldCheck, Award } from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import { CATEGORIES, buildWaUrl } from '@/constants';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import ProductGallery from '@/components/product/product-gallery';
import type { Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { locale, category, slug } = await params;

  const validCategory = CATEGORIES.find((c) => c.key === category);
  const product = getProductBySlug(category, slug);
  if (!validCategory || !product) notFound();

  const tP = await getTranslations({ locale, namespace: 'productPage' });
  const tCol = await getTranslations({ locale, namespace: 'collections' });
  const tWa = await getTranslations({ locale, namespace: 'whatsapp' });

  const name = locale === 'es' ? product.nameEs : product.nameEn;
  const description = locale === 'es' ? product.descriptionEs : product.descriptionEn;
  const categoryName = tCol(`${category}.name` as Parameters<typeof tCol>[0]);

  const waMessage = tP('shareMessage', { name });
  const waUrl = buildWaUrl(waMessage);

  return (
    <>
      <Navbar locale={locale as Locale} />

      <main className="min-h-screen bg-[#FEFEFE] pt-20">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">

          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[#6B6B6B]" aria-label="Breadcrumb">
            <Link href={`/${locale}#colecciones`} className="hover:text-[#ED5082] transition-colors">
              {locale === 'es' ? 'Colecciones' : 'Collections'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/collections/${category}`} className="hover:text-[#ED5082] transition-colors">
              {categoryName}
            </Link>
            <span>/</span>
            <span className="max-w-[180px] truncate font-medium text-[#1A1A1A]">{name}</span>
          </nav>

          {/* Product layout */}
          <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">

            {/* Gallery (client component — handles thumbnail state) */}
            <ProductGallery
              images={product.images}
              alt={name}
              certifiedLabel={tP('certified')}
            />

            {/* Info (server-rendered) */}
            <div className="flex flex-col">
              <Link
                href={`/${locale}/collections/${category}`}
                className="mb-5 inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] transition-colors hover:text-[#ED5082]"
              >
                <ArrowLeft className="h-4 w-4" />
                {tP('back')}
              </Link>

              <h1 className="font-display text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                {name}
              </h1>
              <p className="mt-2 text-sm text-[#6B6B6B]">{tP('material')}</p>

              <p className="mt-6 leading-relaxed text-[#1A1A1A]">{description}</p>

              {/* Trust seals */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-[#E8E8E8] bg-white p-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-[#ED5082]" aria-hidden="true" />
                  <p className="text-xs font-medium text-[#1A1A1A]">NOM-033/1-SE-2020</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#E8E8E8] bg-white p-3">
                  <Award className="h-5 w-5 shrink-0 text-[#ED5082]" aria-hidden="true" />
                  <p className="text-xs font-medium text-[#1A1A1A]">Plata .925 pura</p>
                </div>
              </div>

              {/* Main CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tP('ctaAriaLabel')}
                className="mt-8 flex items-center justify-center gap-3 rounded-full bg-[#ED5082] px-8 py-4 text-base font-bold text-white shadow-[0_8px_28px_rgba(237,80,130,0.3)] transition-all hover:scale-105 hover:bg-[#D4407A] focus-visible:outline-2 focus-visible:outline-[#ED5082]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {tP('cta')}
              </a>

              <p className="mt-3 text-center text-xs text-[#6B6B6B]">
                {locale === 'es'
                  ? 'Respondemos en menos de 5 minutos'
                  : 'We reply in under 5 minutes'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </>
  );
}
