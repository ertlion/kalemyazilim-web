"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import {
  Search,
  Sparkles,
  ArrowRight,
  ShoppingCart,
  Shirt,
  Pill,
  UtensilsCrossed,
  Cpu,
  Sofa,
  Fuel,
  Plane,
  Coffee,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Recommendation = {
  icon: LucideIcon;
  keywords: string[];
  tr: { name: string; solution: string; modules: string[] };
  en: { name: string; solution: string; modules: string[] };
  productSlug: string;
};

const RECOMMENDATIONS: Recommendation[] = [
  {
    icon: ShoppingCart,
    keywords: ["market", "bakkal", "süpermarket", "supermarket", "grocery", "bakkal", "manav"],
    tr: {
      name: "Market / Bakkal",
      solution: "KL-Retail Market Modülü",
      modules: ["Barkod yönetimi", "Tartılı ürün", "Kampanya yönetimi", "E-Fatura"],
    },
    en: {
      name: "Market / Grocery",
      solution: "KL-Retail Market Module",
      modules: ["Barcode management", "Weighed product", "Campaign management", "E-Invoice"],
    },
    productSlug: "kl-retail-market-modulu",
  },
  {
    icon: UtensilsCrossed,
    keywords: ["restoran", "restaurant", "kafe", "cafe", "lokanta", "yemek", "food"],
    tr: {
      name: "Restoran / Kafe",
      solution: "KL-Retail Food POS",
      modules: ["Masa yönetimi", "Adisyon takibi", "Mutfak yazıcısı", "Paket servis"],
    },
    en: {
      name: "Restaurant / Cafe",
      solution: "KL-Retail Food POS",
      modules: ["Table management", "Check tracking", "Kitchen printer", "Delivery"],
    },
    productSlug: "kl-retail-food-pos",
  },
  {
    icon: Fuel,
    keywords: ["akaryakıt", "benzin", "istasyon", "petrol", "fuel", "gas"],
    tr: {
      name: "Akaryakıt",
      solution: "KL-Retail Akaryakıt Modülü",
      modules: ["Pompa entegrasyonu", "Tank ölçüm", "Filo yakıt", "EPDK raporu"],
    },
    en: {
      name: "Fuel Station",
      solution: "KL-Retail Fuel Module",
      modules: ["Pump integration", "Tank measurement", "Fleet fuel", "EPDK report"],
    },
    productSlug: "kl-retail-akaryakit-modulu",
  },
  {
    icon: Shirt,
    keywords: ["tekstil", "moda", "giyim", "mağaza", "textile", "fashion", "clothing"],
    tr: {
      name: "Tekstil / Moda",
      solution: "KL-Retail T-POS",
      modules: ["Beden-renk varyant", "Sezon takibi", "Çoklu mağaza", "Sadakat programı"],
    },
    en: {
      name: "Textile / Fashion",
      solution: "KL-Retail T-POS",
      modules: ["Size-color variant", "Season tracking", "Multi-store", "Loyalty program"],
    },
    productSlug: "kl-retail-t-pos",
  },
  {
    icon: Pill,
    keywords: ["eczane", "ilaç", "pharmacy", "medicine"],
    tr: {
      name: "Eczane",
      solution: "KL-Retail T-POS",
      modules: ["İTS entegrasyonu", "Reçete yönetimi", "Stok kontrol", "SGK entegrasyonu"],
    },
    en: {
      name: "Pharmacy",
      solution: "KL-Retail T-POS",
      modules: ["ITS integration", "Prescription mgmt", "Stock control", "Insurance"],
    },
    productSlug: "kl-retail-t-pos",
  },
  {
    icon: Cpu,
    keywords: ["elektronik", "electronics", "teknoloji", "bilgisayar"],
    tr: {
      name: "Elektronik",
      solution: "KL-Retail T-POS",
      modules: ["Seri numara takibi", "Garanti yönetimi", "Teknik servis", "E-Ticaret"],
    },
    en: {
      name: "Electronics",
      solution: "KL-Retail T-POS",
      modules: ["Serial tracking", "Warranty mgmt", "Technical service", "E-Commerce"],
    },
    productSlug: "kl-retail-t-pos",
  },
  {
    icon: Sofa,
    keywords: ["mobilya", "furniture", "dekorasyon"],
    tr: {
      name: "Mobilya",
      solution: "KL-Retail ERP",
      modules: ["Sipariş bazlı üretim", "Teslimat planlama", "Showroom", "Stok takibi"],
    },
    en: {
      name: "Furniture",
      solution: "KL-Retail ERP",
      modules: ["Order-based production", "Delivery planning", "Showroom", "Stock"],
    },
    productSlug: "kl-retail-t-pos",
  },
  {
    icon: Plane,
    keywords: ["duty free", "duty-free", "havalimanı", "airport"],
    tr: {
      name: "Duty Free",
      solution: "KL-Retail Duty Free",
      modules: ["Çoklu para birimi", "Pasaport tarama", "Vergi muafiyeti", "Havalimanı"],
    },
    en: {
      name: "Duty Free",
      solution: "KL-Retail Duty Free",
      modules: ["Multi-currency", "Passport scan", "Tax exemption", "Airport"],
    },
    productSlug: "kl-retail-t-pos",
  },
  {
    icon: Coffee,
    keywords: ["kantin", "canteen", "büfe", "okul"],
    tr: {
      name: "Kantin / Büfe",
      solution: "KL-Retail Kantin",
      modules: ["Kredi kartı sistemi", "Öğrenci kartı", "Günlük limit", "Hızlı satış"],
    },
    en: {
      name: "Canteen",
      solution: "KL-Retail Canteen",
      modules: ["Credit system", "Student card", "Daily limit", "Fast sales"],
    },
    productSlug: "kl-retail-t-pos",
  },
  {
    icon: Warehouse,
    keywords: ["depo", "lojistik", "warehouse", "logistics", "el terminali"],
    tr: {
      name: "Lojistik / Depo",
      solution: "KL-Retail El Terminali",
      modules: ["Barkod okuma", "Sayım modülü", "Mal kabul", "Sevkiyat"],
    },
    en: {
      name: "Logistics / Warehouse",
      solution: "KL-Retail Hand Terminal",
      modules: ["Barcode scan", "Counting", "Goods receipt", "Dispatch"],
    },
    productSlug: "kl-retail-el-terminali",
  },
];

function normalize(s: string) {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .trim();
}

export default function SectorFinder({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const locale = useLocale();
  const router = useRouter();
  const isTr = locale === "tr";
  const [query, setQuery] = useState("");
  const isLight = variant === "light";

  const match = useMemo<Recommendation | null>(() => {
    if (!query.trim()) return null;
    const q = normalize(query);
    return (
      RECOMMENDATIONS.find((r) =>
        r.keywords.some((kw) => {
          const nkw = normalize(kw);
          return nkw.includes(q) || q.includes(nkw);
        })
      ) ?? null
    );
  }, [query]);

  const copy = isTr
    ? {
        label: "Sektörünüzü yazın, size özel çözüm sunalım",
        placeholder: "Örn: market, restoran, akaryakıt...",
        suggestedTitle: "Size önerimiz:",
        modulesTitle: "Dahil edilen modüller",
        cta: "Çözümü İncele",
        nothing: "Sektörünüze uygun çözüm için",
        contact: "bizimle iletişime geçin",
        quick: "Hızlı örnekler:",
      }
    : {
        label: "Type your industry, get a tailored solution",
        placeholder: "E.g. grocery, restaurant, fuel station...",
        suggestedTitle: "Our recommendation:",
        modulesTitle: "Included modules",
        cta: "Explore Solution",
        nothing: "For a tailored solution",
        contact: "contact us",
        quick: "Quick picks:",
      };

  const quickPicks = RECOMMENDATIONS.slice(0, 4);

  // Theme tokens
  const labelClass = isLight ? "text-dark" : "text-white";
  const inputClass = isLight
    ? "w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm text-dark placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
    : "w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30";
  const searchIconClass = isLight
    ? "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
    : "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400";
  const quickLabelClass = isLight ? "text-xs text-muted-foreground" : "text-xs text-slate-400";
  const quickBtnClass = isLight
    ? "rounded-full border border-border bg-muted px-3 py-1 text-xs text-dark transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
    : "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-white";
  const matchTitleClass = isLight ? "text-base font-semibold text-dark" : "text-base font-semibold text-white";
  const matchSubClass = isLight ? "text-xs text-muted-foreground" : "text-xs text-slate-300";
  const moduleChipClass = isLight
    ? "rounded-md border border-border bg-white px-2 py-0.5 text-[11px] text-dark-light"
    : "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200";
  const noMatchClass = isLight
    ? "mt-4 rounded-xl border border-border bg-muted p-4 text-sm text-dark-light"
    : "mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300";
  const noMatchLinkClass = isLight
    ? "font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
    : "font-semibold text-primary-light underline underline-offset-4 hover:text-white";
  const wrapperClass = isLight
    ? ""
    : "rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-md shadow-[0_8px_40px_rgba(14,165,233,0.08)]";

  return (
    <div className={wrapperClass}>
      {!isLight && (
        <div className={`mb-3 flex items-center gap-2 text-sm font-semibold ${labelClass}`}>
          <Sparkles className="h-4 w-4 text-primary-light" />
          {copy.label}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className={searchIconClass} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.placeholder}
            className={inputClass}
          />
        </div>
      </div>

      {/* Quick picks */}
      {!query && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className={quickLabelClass}>{copy.quick}</span>
          {quickPicks.map((r) => (
            <button
              key={r.productSlug + r.tr.name}
              type="button"
              onClick={() => setQuery(isTr ? r.tr.name : r.en.name)}
              className={quickBtnClass}
            >
              {isTr ? r.tr.name : r.en.name}
            </button>
          ))}
        </div>
      )}

      {/* Match card */}
      {query && match && (
        <div
          className={
            isLight
              ? "mt-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4"
              : "mt-4 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-4"
          }
        >
          <div className="flex items-start gap-3">
            <div
              className={
                isLight
                  ? "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  : "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary-light"
              }
            >
              <match.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={
                  isLight
                    ? "text-xs uppercase tracking-wider text-primary"
                    : "text-xs uppercase tracking-wider text-primary-light"
                }
              >
                {copy.suggestedTitle}
              </div>
              <div className={`mt-0.5 ${matchTitleClass}`}>
                {isTr ? match.tr.solution : match.en.solution}
              </div>
              <div className={`mt-1 ${matchSubClass}`}>
                {isTr ? match.tr.name : match.en.name}
              </div>

              <div className="mt-3">
                <div className={`mb-1.5 ${isLight ? "text-xs font-medium text-dark-light" : "text-xs font-medium text-slate-300"}`}>
                  {copy.modulesTitle}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(isTr ? match.tr.modules : match.en.modules).map((m) => (
                    <span key={m} className={moduleChipClass}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push({
                    pathname: "/cozumler/[slug]",
                    params: { slug: match.productSlug },
                  })
                }
                className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50"
              >
                {copy.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No match */}
      {query && !match && (
        <div className={noMatchClass}>
          {copy.nothing}{" "}
          <Link href="/iletisim" className={noMatchLinkClass}>
            {copy.contact}
          </Link>
          .
        </div>
      )}
    </div>
  );
}
