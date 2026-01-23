import { NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'admin_session';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
