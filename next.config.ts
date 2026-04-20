import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// NOT: Proje yolu "Klasörler" (non-ASCII "ö") içeriyor. Bu Next 16'da
// Turbopack SST cache ve webpack FS ops'ı yavaşlatıyor. Hız için önerilen:
//   ln -s "/Users/.../Desktop/Klasörler/kalemyazilim-web" ~/kalemyazilim-web
//   ve oradan çalıştır.
const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
