import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import Cookies from "js-cookie";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next()
  }

  const authToken: any = request.cookies?.get('authToken');
  if (pathname.startsWith('/login')) {
    return NextResponse.next()
  } else {
    if (!authToken?.value) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }
}

// See "Matching Paths" below to learn more
// export const config = {}
