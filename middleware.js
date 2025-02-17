// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const hostname = req.headers.get('host');
  let tenant = 'default';

  if (hostname) {
    // Assumes hostname is in the format tenant.example.com
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      	tenant = parts[0];
    }
  }

  // Append tenant as a query parameter so it’s accessible in your pages
  const url = req.nextUrl.clone();
  url.searchParams.set('tenant', tenant);

  // Optionally add a custom header
  const response = NextResponse.next();
  response.headers.set('x-tenant', tenant);

  return NextResponse.rewrite(url);
}

export const config = {
  // Exclude paths such as API routes and static assets
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
