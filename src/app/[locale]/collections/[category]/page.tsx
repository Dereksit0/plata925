import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, MessageCircle, Package } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';
import { CATEGORIES, buildWaUrl } from '@/constants';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import type { Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

type SupabaseProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[];
  slug: string | null;
  product_variants: { variant_name: string; stock: number }[];
};

async function getSupabaseProducts(category: string): Promise<SupabaseProduct[] | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const supabase = await createClient();
    const { data: collection } = await supabase
      .from('collections')
      .select('id')
      .eq('slug', category)
      .single();

    if (!collection) return null;

    const { data } = await supabase
      .from('products')
      .select('id, name, description, price, images, slug, product_variants(variant_name, stock)')
      .eq('collection_id', collection.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    return data as SupabaseProduct[] | null;
  } catch {
    return null;
  }
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;

  const validCategory = CATEGORIES.find((c) => c.key === category);
  if (!validCategory) notFound();

  const supabaseProducts = await getSupabaseProducts(category);
  const useSupabase = supabaseProducts !== null && supabaseProducts.length > 0;
  const hardcodedProducts = useSupabase ? [] : getProductsByCategory(category);

  const t = await getTranslations({ locale, namespace: 'categoryPage' });
  const tCol = await getTranslations({ locale, namespace: 'collections' });
  const tWa = await getTranslations({ locale, namespace: 'whatsapp' });

  const categoryName = tCol(`${category}.name`);
  const generalWaUrl = buildWaUrl(tWa(category as Parameters<typeof tWa>[0]));
  const totalCount = useSupabase ? supabaseProducts!.length : hardcodedProducts.length;

  // Responsive grid config based on product count
  const count = totalCount;
  const isCompact = count > 4;
  const mobileColsClass = count === 1 ? 'grid-cols-1' : count <= 4 ? 'grid-cols-2' : 'grid-cols-4';
  const mobileGapClass = isCompact ? 'gap-2' : 'gap-4';
  const mobileImgSize = count === 1 ? '95vw' : count <= 4 ? '48vw' : '25vw';
  const imageSizes = `(max-width: 640px) ${mobileImgSize}, (max-width: 1024px) 33vw, 25vw`;

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
                  {t('available', { n: totalCount })}
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

        {/* Product grid */}
        <div className="mx-auto max-w-7xl px-2 py-6 sm:px-4 sm:py-10 md:px-8 md:py-14">
          {totalCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-[#6B6B6B]">
                {locale === 'es' ? 'Próximamente nuevas joyas en esta colección.' : 'New pieces coming soon to this collection.'}
              </p>
            </div>
          ) : (
            <div
              className={`grid ${mobileColsClass} ${mobileGapClass} sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4`}
            >
              {/* ── Supabase products ── */}
              {useSupabase &&
                supabaseProducts!.map((product) => {
                  const productSlug = product.slug ?? product.id;
                  const totalStock = product.product_variants?.reduce(
                    (acc, v) => acc + v.stock,
                    0
                  ) ?? 0;

                  return (
                    <Link
                      key={product.id}
                      href={`/${locale}/collections/${category}/${productSlug}`}
                      className={`group overflow-hidden bg-white transition-shadow focus-visible:outline-2 focus-visible:outline-[#ED5082] ${
                        isCompact
                          ? 'rounded-lg shadow-[0_2px_8px_rgba(192,192,192,0.3)] hover:shadow-[0_4px_20px_rgba(237,80,130,0.15)]'
                          : 'rounded-[14px] shadow-[0_4px_20px_rgba(192,192,192,0.22)] hover:shadow-[0_8px_32px_rgba(237,80,130,0.15)]'
                      } sm:rounded-[16px] sm:shadow-[0_4px_20px_rgba(192,192,192,0.22)]`}
                    >
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-10 w-10 text-gray-300" />
                          </div>
                        )}
                        {/* Low-stock badge */}
                        {totalStock > 0 && totalStock <= 3 && (
                          <span className="absolute right-2 top-2 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                            {totalStock === 1
                              ? locale === 'es' ? 'ÚLTIMO' : 'LAST ONE'
                              : locale === 'es' ? `QUEDAN ${totalStock}` : `${totalStock} LEFT`}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className={`${isCompact ? 'p-1.5' : 'p-3'} sm:p-4`}>
                        <h2
                          className={`font-semibold leading-tight text-[#1A1A1A] transition-colors group-hover:text-[#ED5082] ${
                            isCompact ? 'line-clamp-2 text-[10px]' : 'line-clamp-2 text-xs sm:text-sm'
                          }`}
                        >
                          {product.name}
                        </h2>
                        {product.price > 0 && (
                          <p className={`mt-1 font-semibold text-[#ED5082] ${isCompact ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>
                            ${Number(product.price).toLocaleString('es-MX')} MXN
                          </p>
                        )}
                        {product.description && (
                          <p className={`mt-1 line-clamp-2 text-xs text-[#6B6B6B] ${isCompact ? 'hidden sm:block' : 'block'}`}>
                            {product.description}
                          </p>
                        )}
                        <span
                          className={`font-semibold text-[#ED5082] ${
                            isCompact
                              ? 'hidden sm:mt-3 sm:inline-block sm:text-xs'
                              : 'mt-2 inline-block text-[11px] sm:mt-3 sm:text-xs'
                          }`}
                        >
                          {t('viewProduct')} →
                        </span>
                      </div>
                    </Link>
                  );
                })}

              {/* ── Hardcoded fallback products ── */}
              {!useSupabase &&
                hardcodedProducts.map((product) => {
                  const name = locale === 'es' ? product.nameEs : product.nameEn;
                  const description = locale === 'es' ? product.descriptionEs : product.descriptionEn;

                  return (
                    <Link
                      key={product.slug}
                      href={`/${locale}/collections/${category}/${product.slug}`}
                      className={`group overflow-hidden bg-white transition-shadow focus-visible:outline-2 focus-visible:outline-[#ED5082] ${
                        isCompact
                          ? 'rounded-lg shadow-[0_2px_8px_rgba(192,192,192,0.3)] hover:shadow-[0_4px_20px_rgba(237,80,130,0.15)]'
                          : 'rounded-[14px] shadow-[0_4px_20px_rgba(192,192,192,0.22)] hover:shadow-[0_8px_32px_rgba(237,80,130,0.15)]'
                      } sm:rounded-[16px] sm:shadow-[0_4px_20px_rgba(192,192,192,0.22)]`}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={name}
                          fill
                          sizes={imageSizes}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className={`${isCompact ? 'p-1.5' : 'p-3'} sm:p-4`}>
                        <h2
                          className={`font-semibold leading-tight text-[#1A1A1A] transition-colors group-hover:text-[#ED5082] ${
                            isCompact ? 'line-clamp-2 text-[10px]' : 'line-clamp-2 text-xs sm:text-sm'
                          }`}
                        >
                          {name}
                        </h2>
                        <p className={`mt-1 line-clamp-2 text-xs text-[#6B6B6B] ${isCompact ? 'hidden sm:block' : 'block'}`}>
                          {description}
                        </p>
                        <span
                          className={`font-semibold text-[#ED5082] ${
                            isCompact
                              ? 'hidden sm:mt-3 sm:inline-block sm:text-xs'
                              : 'mt-2 inline-block text-[11px] sm:mt-3 sm:text-xs'
                          }`}
                        >
                          {t('viewProduct')} →
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </>
  );
}
