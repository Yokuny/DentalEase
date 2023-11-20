import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("auth_token")?.value;

  const siteURL = new URL("/", request.url);
  const appURL = new URL("/app", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/") return NextResponse.next();
    return NextResponse.redirect(siteURL);
  }

  if (request.nextUrl.pathname === "/") return NextResponse.redirect(appURL);
};

export const config = {
  matcher: ["/", "/app/:path*"],
};
