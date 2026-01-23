import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReCaptchaWrapper from '@/components/ReCaptchaWrapper';
import CookieConsent from '@/components/CookieConsent';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'GammaLab — Диагностическая лаборатория в Алматы',
    template: '%s | GammaLab',
  },
  description:
    'Современная диагностическая лаборатория GammaLab в Алматы. T-SPOT, ПЦР, ИГХ, FISH и другие анализы. Точная диагностика, быстрые результаты.',
  keywords: ['лаборатория', 'анализы', 'диагностика', 'GammaLab', 'Алматы', 'Казахстан', 'T-SPOT', 'ПЦР', 'ИГХ'],
  authors: [{ name: 'GammaLab' }],
  creator: 'GammaLab',
  publisher: 'GammaLab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gammalab.kz'),
  alternates: {
    canonical: '/',
    languages: {
      'ru': '/ru',
      'kz': '/kz',
      'en': '/en',
    },
  },
  openGraph: {
    title: 'GammaLab — Диагностическая лаборатория',
    description: 'Современная диагностическая лаборатория в Алматы. T-SPOT, ПЦР, ИГХ и другие анализы.',
    url: 'https://gammalab.kz',
    siteName: 'GammaLab',
    locale: 'ru_KZ',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GammaLab - Диагностическая лаборатория',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GammaLab — Диагностическая лаборатория',
    description: 'Современная диагностическая лаборатория в Алматы. T-SPOT, ПЦР, ИГХ и другие анализы.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ReCaptchaWrapper>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CookieConsent />
          </ReCaptchaWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
