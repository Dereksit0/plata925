import type { Metadata } from 'next';
import {
  Playfair_Display,
  Cormorant_Garamond,
  DM_Sans,
  Bebas_Neue,
} from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Script from 'next/script';
import './globals.css';
import WhatsAppButton from '@/components/shared/whatsapp-button';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const url = `https://plata925.com/${locale}`;
  const altLocale = locale === 'es' ? 'en' : 'es';

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://plata925.com'),
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [altLocale]: `https://plata925.com/${altLocale}`,
        'x-default': 'https://plata925.com/es',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'PLATA925',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PLATA925',
  url: 'https://plata925.com',
  description:
    'Joyería de plata .925 certificada. Aretes, pulseras, dijes, cadenas, arracadas y anillos. Certificado del Consejo Regulador de la Plata A.C. de Taxco.',
  foundingLocation: {
    '@type': 'Place',
    name: 'México',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'English'],
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  const fonts = [
    playfair.variable,
    cormorant.variable,
    dmSans.variable,
    bebas.variable,
  ].join(' ');

  return (
    <html lang={locale} className={fonts}>
      <head>
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
