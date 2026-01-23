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
      console.log('Middleware: No secret found');
      return false;
    }

    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const lastDotIndex = decoded.lastIndexOf('.');

    if (lastDotIndex === -1) {
      console.log('Middleware: Invalid token format - no dot');
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
      console.log('Middleware: Signature length mismatch');
      return false;
    }

    if (!timingSafeEqual(sigBuffer, expectedSigBuffer)) {
      console.log('Middleware: Signature verification failed');
      return false;
    }

    // Check expiry
    const parts = data.split(':');
    if (parts.length !== 3 || parts[0] !== 'admin') {
      console.log('Middleware: Invalid token data format');
      return false;
    }

    const expiry = parseInt(parts[2], 10);
    if (isNaN(expiry) || Date.now() > expiry) {
      console.log('Middleware: Token expired');
      return false;
    }

    console.log('Middleware: Token verified successfully');
    return true;
  } catch (error) {
    console.log('Middleware: Token verification error', error);
    return false;
  }
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes separately
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    console.log('Middleware: Admin route accessed:', pathname, 'Has token:', !!token);

    // Allow access to login page
    if (pathname === '/admin/login') {
      // If already authenticated, redirect to dashboard
      if (token && verifySessionToken(token)) {
        console.log('Middleware: Redirecting authenticated user from login to admin');
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Check authentication for other admin routes
    if (!token) {
      console.log('Middleware: No token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (!verifySessionToken(token)) {
      console.log('Middleware: Invalid token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    console.log('Middleware: Access granted to', pathname);
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
