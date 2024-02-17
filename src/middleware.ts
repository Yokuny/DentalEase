import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = (request: NextRequest) => {
  const siteURL = new URL("/home", request.url);
  const appURL = new URL("/app", request.url);

  const token = cookies().has("auth");
  const { pathname } = request.nextUrl;

  console.log("token", token);
  console.log("pathname", pathname);

  // if (token) {
  //   if (pathname === "/login" || pathname === "/home") return NextResponse.redirect(appURL);
  //   if (pathname === "/app") return NextResponse.next();
  // } else {
  //   if (pathname === "/app") return NextResponse.redirect(siteURL);
  //   if (pathname === "/login" || pathname === "/home") return NextResponse.next();
  // }
};

export const config = {
  matcher: ["/home/:path*", "/app/:path*", "/login"],
};
