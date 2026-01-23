import { NextRequest, NextResponse } from 'next/server';
import { createSubmission } from '@/lib/data';
import { verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { firstName, lastName, email, phone, message, rating, type = 'contact', recaptchaToken } = data;

    // Проверка reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'contact_form');
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: recaptchaResult.error || 'Проверка безопасности не пройдена' },
        { status: 400 }
      );
    }

    if (!firstName || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    const submission = await createSubmission({
      type,
      firstName,
      lastName,
      email,
      phone,
      message,
      rating,
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Не удалось создать запись' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
