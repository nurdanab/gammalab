import { NextRequest, NextResponse } from 'next/server';
import { createSubmission } from '@/lib/data';
import { verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { firstName, phone, analysisId, analysisName, preferredDate, recaptchaToken } = data;

    // Проверка reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'booking_form');
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: recaptchaResult.error || 'Проверка безопасности не пройдена' },
        { status: 400 }
      );
    }

    if (!firstName || !phone || !analysisId) {
      return NextResponse.json(
        { error: 'Имя, телефон и анализ обязательны' },
        { status: 400 }
      );
    }

    const submission = await createSubmission({
      type: 'booking',
      firstName,
      phone,
      analysisId,
      analysisName,
      preferredDate,
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
