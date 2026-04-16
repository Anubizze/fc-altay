import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["ru", "kk"];
const DEFAULT_LOCALE = "ru";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.svg" ||
    /\.[a-z0-9]{2,4}$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocale) {
    const seg = pathname.split("/")[1];
    const res = NextResponse.next();
    if (seg === "ru" || seg === "kk") {
      res.cookies.set("NEXT_LOCALE", seg, { path: "/" });
    }
    return res;
  }

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set("NEXT_LOCALE", DEFAULT_LOCALE, { path: "/" });
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"]
};
