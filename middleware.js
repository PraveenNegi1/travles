import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Protect /Dashboard and /Dashboard/leads routes
  if (request.nextUrl.pathname.startsWith("/Dashboard") && !token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
  matcher: ["/Dashboard/:path*"],
};
