import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(tr|en)/:path*",
    "/((?!api|admin|_next|_vercel|uploads|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
