import { NextRequest, NextResponse } from 'next/server';
import { getLoggedInUser } from '../lib/actions/user.action';

export async function middleware(request: NextRequest) {
  // Allow static files and public folder assets to pass through
  const PUBLIC_FILE = /\.(.*)$/;
  if (PUBLIC_FILE.test(request.nextUrl.pathname) || 
      request.nextUrl.pathname.startsWith('/_next/') || 
      request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  console.log("middleware running");

  const user = await getLoggedInUser();

  if (!user && !request.nextUrl.pathname.startsWith('/sign-in') && !request.nextUrl.pathname.startsWith('/sign-up')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

