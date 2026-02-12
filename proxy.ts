import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard-admin", "/admin", "/(protected)"];
const publicRoutes = ["/login", "/api/auth"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute =
    publicRoutes.some((route) => path === route) || path.startsWith("/api");

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /login if the user is not authenticated and trying to access a protected route
  //    OR if trying to access root '/' without auth
  if ((isProtectedRoute || path === "/") && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated and trying to access /login
  if (path === "/login" && session?.userId) {
    if (session.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard-admin", req.nextUrl));
    }
    // If ordinary user logs in, maybe go to root page?
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 6. Role-based access control for /dashboard
  if (path.startsWith("/dashboard-admin") && session?.role !== "admin") {
    // If user is not admin, redirect to home.
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 7. General protection: catch-all
  const isPublicFile = path.includes(".") || path.startsWith("/_next");
  if (!isPublicRoute && !isPublicFile && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
