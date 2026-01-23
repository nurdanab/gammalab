'use client';

import Script from 'next/script';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ReCaptchaContextType {
  executeRecaptcha: (action: string) => Promise<string | null>;
  isLoaded: boolean;
}

const ReCaptchaContext = createContext<ReCaptchaContextType>({
  executeRecaptcha: async () => null,
  isLoaded: false,
});

export const useReCaptcha = () => useContext(ReCaptchaContext);

interface ReCaptchaProviderProps {
  children: ReactNode;
  siteKey: string;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ReCaptchaProvider({ children, siteKey }: ReCaptchaProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!isLoaded || !window.grecaptcha) {
        console.warn('reCAPTCHA not loaded yet');
        return null;
      }

      try {
        const token = await new Promise<string>((resolve) => {
          window.grecaptcha.ready(async () => {
            const token = await window.grecaptcha.execute(siteKey, { action });
            resolve(token);
          });
        });
        return token;
      } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        return null;
      }
    },
    [isLoaded, siteKey]
  );

  return (
    <ReCaptchaContext.Provider value={{ executeRecaptcha, isLoaded }}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        onLoad={() => setIsLoaded(true)}
        strategy="lazyOnload"
      />
      {children}
    </ReCaptchaContext.Provider>
  );
}
