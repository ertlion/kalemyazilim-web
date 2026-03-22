import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/cozumler": {
      tr: "/cozumler",
      en: "/solutions",
    },
    "/cozumler/[slug]": {
      tr: "/cozumler/[slug]",
      en: "/solutions/[slug]",
    },
    "/referanslar": {
      tr: "/referanslar",
      en: "/references",
    },
    "/sektorler": {
      tr: "/sektorler",
      en: "/industries",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/destek": {
      tr: "/destek",
      en: "/support",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
