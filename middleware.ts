import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // If the path isn't just '/', redirect to the base URL
  if (url.pathname !== "/") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// This ensures the middleware runs for all routes
export const config = {
  matcher: "/:path*",
};
