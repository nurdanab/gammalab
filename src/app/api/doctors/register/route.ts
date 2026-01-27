import { NextRequest, NextResponse } from 'next/server';
import { createDoctorRegistration } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { fullName, phone, workplace, profession } = data;

    if (!fullName || !phone || !workplace || !profession) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    const registration = await createDoctorRegistration({
      fullName,
      phone,
      workplace,
      profession,
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
