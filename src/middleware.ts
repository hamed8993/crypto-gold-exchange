import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { persistKeys } from "./core/constants/keys";
import { routing } from "./i18n/routing";

export default function middleware(req: NextRequest) {
  const intlMiddleware = createMiddleware(routing);
  const response = intlMiddleware(req);

  const { nextUrl: requestUrl, cookies, headers } = req;
  const baseUrl = requestUrl.origin;

  const languages = ["fa", "en", "tr", "ar", "ru"];
  const lngPath = req.nextUrl.pathname.split("/")[1];
  const lng = languages.includes(lngPath) ? lngPath : "en";

  const skipPaths = [
    "/robots.txt",
    "/sitemap.xml",
    "/en_sitemap.xml",
    "/fa_sitemap.xml",
    "/static",
    "/tradingview",
    "/icon-158.png",
    "/icon-t-158.png",
    "/icon-192.png",
    "/icon-t-192.png",
    "/manifest.json",
  ];

  if (skipPaths.some((path) => requestUrl.pathname.startsWith(path))) {
    return;
  }

  if (
    requestUrl.pathname.startsWith("/account") &&
    !cookies.has(persistKeys.GOLDFINO_LOGIN_TOKEN)
  ) {
    return NextResponse.redirect(new URL(`/${lng}/`, baseUrl));
  }

  if (
    requestUrl.pathname.startsWith("/authentication") &&
    cookies.has(persistKeys.GOLDFINO_LOGIN_TOKEN)
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}/my-account/profile`, baseUrl),
    );
  }

  // Redirect if lng in path is not supported
  if (
    !languages.includes(requestUrl.pathname.split("/")[1])
    // && !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}/${req.nextUrl.pathname}`, baseUrl),
      {
        headers,
      },
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
