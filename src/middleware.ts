import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (request: NextRequest) => {
  const siteURL = new URL("/login", request.url);
  const appURL = new URL("/app", request.url);

  const cookieStore = await cookies();
  const authCookie = cookieStore.has("auth");
  const { pathname } = request.nextUrl;

  if (authCookie) {
    if (pathname.includes("/home") || pathname.includes("/login")) return NextResponse.redirect(appURL);
    if (pathname.includes("/app")) return NextResponse.next();
  } else {
    if (pathname.includes("/app")) return NextResponse.redirect(siteURL);
  }
};

export const config = {
  matcher: ["/home/:path*", "/app/:path*", "/login"],
};
