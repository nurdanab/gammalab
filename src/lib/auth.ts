import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const ADMIN_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Get secret key for signing tokens
function getSecretKey(): string {
  // Use ADMIN_PASSWORD as part of the secret (or a dedicated secret if available)
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error('ADMIN_PASSWORD environment variable is not set');
  }
  return secret;
}

// Create HMAC signature for token data
function signToken(data: string): string {
  const hmac = createHmac('sha256', getSecretKey());
  hmac.update(data);
  return hmac.digest('hex');
}

// Verify password with timing-safe comparison
export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  try {
    const passwordBuffer = Buffer.from(password, 'utf8');
    const adminPasswordBuffer = Buffer.from(adminPassword, 'utf8');

    // Log lengths for debugging (remove in production if needed)
    console.log('Password verification - input length:', passwordBuffer.length, 'expected length:', adminPasswordBuffer.length);

    if (passwordBuffer.length !== adminPasswordBuffer.length) {
      console.log('Password length mismatch');
      return false;
    }

    const result = timingSafeEqual(passwordBuffer, adminPasswordBuffer);
    console.log('Password verification result:', result);
    return result;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

// Create a signed session token
export async function createSession(): Promise<string> {
  const timestamp = Date.now();
  const expiry = timestamp + SESSION_DURATION;
  const data = `admin:${timestamp}:${expiry}`;
  const signature = signToken(data);

  // Token format: data.signature (base64 encoded)
  const token = Buffer.from(`${data}.${signature}`).toString('base64');
  return token;
}

// Verify a session token
export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const lastDotIndex = decoded.lastIndexOf('.');

    if (lastDotIndex === -1) {
      return false;
    }

    const data = decoded.substring(0, lastDotIndex);
    const signature = decoded.substring(lastDotIndex + 1);

    // Verify signature
    const expectedSignature = signToken(data);

    const sigBuffer = Buffer.from(signature);
    const expectedSigBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedSigBuffer.length) {
      return false;
    }

    if (!timingSafeEqual(sigBuffer, expectedSigBuffer)) {
      return false;
    }

    // Check expiry
    const parts = data.split(':');
    if (parts.length !== 3 || parts[0] !== 'admin') {
      return false;
    }

    const expiry = parseInt(parts[2], 10);
    if (isNaN(expiry) || Date.now() > expiry) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
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
  if (!token) {
    return false;
  }
  return verifySessionToken(token);
}
