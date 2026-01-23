interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(
  token: string,
  expectedAction?: string
): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    // В режиме разработки пропускаем проверку
    if (process.env.NODE_ENV === 'development') {
      return { success: true, score: 1.0 };
    }
    return { success: false, error: 'reCAPTCHA not configured' };
  }

  if (!token) {
    return { success: false, error: 'No reCAPTCHA token provided' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data: RecaptchaVerifyResponse = await response.json();

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return { success: false, error: 'reCAPTCHA verification failed' };
    }

    // Проверяем action если указан
    if (expectedAction && data.action !== expectedAction) {
      console.error(`reCAPTCHA action mismatch: expected ${expectedAction}, got ${data.action}`);
      return { success: false, error: 'Invalid reCAPTCHA action' };
    }

    // Проверяем score (0.0 - бот, 1.0 - человек)
    // Порог 0.5 - разумный баланс между безопасностью и UX
    const score = data.score || 0;
    if (score < 0.5) {
      console.warn(`Low reCAPTCHA score: ${score}`);
      return { success: false, score, error: 'Suspicious activity detected' };
    }

    return { success: true, score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Failed to verify reCAPTCHA' };
  }
}
