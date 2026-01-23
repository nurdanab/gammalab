import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return false;
  }
  return password === adminPassword;
}

export async function createSession(): Promise<string> {
  const token = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  return token;
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken();
  return !!token && token.startsWith('session_');
}
