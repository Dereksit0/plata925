import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import Hero from '@/components/sections/hero';
import TrustBar from '@/components/sections/trust-bar';
import Collections from '@/components/sections/collections';
import UrgencyBanner from '@/components/sections/urgency-banner';
import WhyUs from '@/components/sections/why-us';
import Process from '@/components/sections/process';
import Testimonials from '@/components/sections/testimonials';
import Certification from '@/components/sections/certification';
import Faq from '@/components/sections/faq';
import CtaFinal from '@/components/sections/cta-final';
import { createClient } from '@/lib/supabase/server';
import type { Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: string }>;
};

async function getCollectionStockMap(): Promise<Record<string, number>> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return {};
  try {
    const supabase = await createClient();
    // Fetch collections with their products' variants to sum stock per slug
    const { data } = await supabase
      .from('collections')
      .select('slug, products(product_variants(stock))');

    if (!data) return {};

    const map: Record<string, number> = {};
    for (const col of data) {
      if (!col.slug) continue;
      const products = (col.products as { product_variants: { stock: number }[] }[]) ?? [];
      const total = products
        .flatMap((p) => p.product_variants ?? [])
        .reduce((sum, v) => sum + (v.stock ?? 0), 0);
      map[col.slug] = total;
    }
    return map;
  } catch {
    return {};
  }
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  const stockMap = await getCollectionStockMap();

  return (
    <main>
      <Navbar locale={locale as Locale} />
      <Hero />
      <TrustBar />
      <Collections stockMap={stockMap} />
      <UrgencyBanner />
      <WhyUs />
      <Process />
      <Testimonials />
      <Certification />
      <Faq />
      <CtaFinal />
      <Footer locale={locale as Locale} />
    </main>
  );
}
