'use client';

import { ReactNode } from 'react';
import ReCaptchaProvider from './ReCaptchaProvider';

interface ReCaptchaWrapperProps {
  children: ReactNode;
}

export default function ReCaptchaWrapper({ children }: ReCaptchaWrapperProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Если ключ не настроен, просто рендерим children без капчи
  if (!siteKey) {
    return <>{children}</>;
  }

  return (
    <ReCaptchaProvider siteKey={siteKey}>
      {children}
    </ReCaptchaProvider>
  );
}
