import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const ADMIN_COOKIE_NAME = 'admin_session';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes separately
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      // If already authenticated, redirect to dashboard
      if (token && token.startsWith('session_')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Check authentication for other admin routes
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token || !token.startsWith('session_')) {
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
