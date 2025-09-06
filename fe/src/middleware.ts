import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/todo"];

  const publicRoutes = ["/", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isProtectedRoute) {
    const authCookie = request.cookies.get("auth-storage");

    let isAuthenticated = false;

    if (authCookie) {
      try {
        const authData = JSON.parse(authCookie.value);
        isAuthenticated = authData?.state?.isAuthenticated === true;
      } catch (error) {
        console.error("Error parsing auth cookie:", error);
      }
    }

    if (!isAuthenticated) {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isPublicRoute && pathname === "/") {
    const authCookie = request.cookies.get("auth-storage");

    if (authCookie) {
      try {
        const authData = JSON.parse(authCookie.value);
        const isAuthenticated = authData?.state?.isAuthenticated === true;

        if (isAuthenticated) {
          return NextResponse.redirect(new URL("/home", request.url));
        }
      } catch (error) {
        console.error("Error parsing auth cookie:", error);
      }
    }
  }

  // Continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
