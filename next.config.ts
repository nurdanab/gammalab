import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ['gammalab.kz', 'i.pravatar.cc'],
  },
};

export default withNextIntl(nextConfig);
