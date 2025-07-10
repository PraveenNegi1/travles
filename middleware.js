import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Protect /dashboard and /dashboard/leads routes
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};
