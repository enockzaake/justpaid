import { NextRequest, NextResponse } from "next/server";

import { getSession } from "./actions/auth";

const userRoutes = ["/dashboard", "/account"];
const providerRoutes = [
  "/provider/dashboard",
  "/provider/account",
  "/provider/appointment",
];

const protectedRoutes = [...userRoutes, ...providerRoutes];

const authRoutes = ["/signup", "/login"];

export async function middleware(request: NextRequest) {
  const { data, error } = await getSession();

  if (protectedRoutes.includes(request.nextUrl.pathname) && error) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    data &&
    data.type !== "company" &&
    providerRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    data &&
    data.type !== "individual" &&
    userRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/search", request.url));
  }

  if (authRoutes.includes(request.nextUrl.pathname) && !error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
