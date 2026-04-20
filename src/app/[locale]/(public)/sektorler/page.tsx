import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ShoppingCart,
  Shirt,
  Pill,
  UtensilsCrossed,
  Cpu,
  Sofa,
} from "lucide-react";
import PageHeader from "@/components/public/PageHeader";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const industries = [
  {
    icon: ShoppingCart,
    titleTr: "Market / Bakkal",
    titleEn: "Market / Grocery",
    descTr:
      "Barkod yönetimi, stok takibi ve hızlı satış noktası çözümleri ile market ve bakkal işletmenizi dijitalleştirin.",
    descEn:
      "Digitize your market and grocery business with barcode management, inventory tracking, and fast POS solutions.",
  },
  {
    icon: Shirt,
    titleTr: "Tekstil / Moda",
    titleEn: "Textile / Fashion",
    descTr:
      "Beden-renk varyant yönetimi, sezon takibi ve çoklu mağaza desteği ile tekstil sektörüne özel çözümler.",
    descEn:
      "Specialized solutions for the textile industry with size-color variant management, season tracking, and multi-store support.",
  },
  {
    icon: Pill,
    titleTr: "Eczane",
    titleEn: "Pharmacy",
    descTr:
      "İlaç Takip Sistemi (İTS) entegrasyonu, reçete yönetimi ve stok kontrol çözümleri.",
    descEn:
      "Drug tracking system integration, prescription management, and inventory control solutions.",
  },
  {
    icon: UtensilsCrossed,
    titleTr: "Restoran / Kafe",
    titleEn: "Restaurant / Cafe",
    descTr:
      "Masa yönetimi, sipariş takibi, mutfak ekranı ve paket servis entegrasyonu.",
    descEn:
      "Table management, order tracking, kitchen display, and delivery service integration.",
  },
  {
    icon: Cpu,
    titleTr: "Elektronik",
    titleEn: "Electronics",
    descTr:
      "Seri numara takibi, garanti yönetimi ve teknik servis modülleri ile elektronik perakende çözümleri.",
    descEn:
      "Electronics retail solutions with serial number tracking, warranty management, and technical service modules.",
  },
  {
    icon: Sofa,
    titleTr: "Mobilya",
    titleEn: "Furniture",
    descTr:
      "Sipariş bazlı üretim takibi, teslimat planlaması ve showroom yönetimi.",
    descEn:
      "Order-based production tracking, delivery planning, and showroom management.",
  },
];

export default async function IndustriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "industries" });

  return (
    <div className="pt-20 lg:pt-24">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: locale === "tr" ? "Ana Sayfa" : "Home", href: "/" },
          { label: t("title") },
        ]}
      />

      {/* Industries Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const number = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={index}
                  className="card-gradient-border group relative overflow-hidden rounded-xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                >
                  {/* Number badge */}
                  <span className="absolute right-6 top-6 text-4xl font-bold text-border/60 transition-colors group-hover:text-primary/10">
                    {number}
                  </span>

                  <div className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="relative mb-3 text-xl font-semibold text-dark">
                    {locale === "tr" ? industry.titleTr : industry.titleEn}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-muted-foreground">
                    {locale === "tr" ? industry.descTr : industry.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
