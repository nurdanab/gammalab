import { NextRequest, NextResponse } from 'next/server';
import { createDoctorRegistration } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { fullName, phone, comment } = data;

    // All fields are optional now
    const registration = await createDoctorRegistration({
      fullName: fullName || 'Не указано',
      phone: phone || 'Не указано',
      workplace: comment || '-', // Store comment in workplace field
      profession: 'Врач (форма обратной связи)',
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Не удалось сохранить данные' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: registration.id });
  } catch (error) {
    console.error('Doctor registration error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
