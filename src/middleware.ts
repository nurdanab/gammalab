import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { createHmac, timingSafeEqual } from 'crypto';

const intlMiddleware = createMiddleware(routing);

const ADMIN_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Verify session token in middleware
function verifySessionToken(token: string): boolean {
  try {
    const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
    if (!secret) {
      return false;
    }

    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const lastDotIndex = decoded.lastIndexOf('.');

    if (lastDotIndex === -1) {
      return false;
    }

    const data = decoded.substring(0, lastDotIndex);
    const signature = decoded.substring(lastDotIndex + 1);

    // Verify signature
    const hmac = createHmac('sha256', secret);
    hmac.update(data);
    const expectedSignature = hmac.digest('hex');

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

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes separately
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      // If already authenticated, redirect to dashboard
      if (token && verifySessionToken(token)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Check authentication for other admin routes
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
  }

  // Apply internationalization middleware to all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next (Next.js internals)
    // - static files (images, etc.)
    '/((?!api|_next|.*\\..*).*)'
  ],
};
