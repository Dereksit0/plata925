import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import Hero from '@/components/sections/hero';
import TrustBar from '@/components/sections/trust-bar';
import Collections from '@/components/sections/collections';
import ProductViewer3D from '@/components/sections/product-3d-viewer';
import UrgencyBanner from '@/components/sections/urgency-banner';
import WhyUs from '@/components/sections/why-us';
import Process from '@/components/sections/process';
import Testimonials from '@/components/sections/testimonials';
import Certification from '@/components/sections/certification';
import Faq from '@/components/sections/faq';
import CtaFinal from '@/components/sections/cta-final';
import type { Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;

  return (
    <main>
      <Navbar locale={locale as Locale} />
      <Hero />
      <TrustBar />
      <Collections />
      <ProductViewer3D />
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
