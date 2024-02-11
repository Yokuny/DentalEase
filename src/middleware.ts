import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = localStorage.getItem("token");

  console.log("middleware");
  console.log(request.nextUrl.pathname);

  const siteURL = new URL("/", request.url);
  const appURL = new URL("/app", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/home") return NextResponse.next();
    return NextResponse.redirect(siteURL);
  }

  if (request.nextUrl.pathname === "/") return NextResponse.redirect(appURL);
};

export const config = {
  matcher: ["/", "/app/:path*"],
};
