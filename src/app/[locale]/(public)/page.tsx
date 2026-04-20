import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import Hero from "@/components/public/Hero";
import SectorFinderSection from "@/components/public/SectorFinderSection";
import WhyUs from "@/components/public/WhyUs";
import SolutionsGrid from "@/components/public/SolutionsGrid";
import StatsCounter from "@/components/public/StatsCounter";
import ReferencesCarousel from "@/components/public/ReferencesCarousel";
import ContactCTA from "@/components/public/ContactCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [products, references, settings] = await Promise.all([
    prisma.product.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
      select: {
        slug: true,
        category: true,
        icon: true,
        coverImage: true,
        translations: {
          where: { locale },
          select: { title: true, shortDescription: true },
        },
      },
    }),
    prisma.reference.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, logo: true },
    }),
    prisma.setting.findMany(),
  ]);

  const settingsMap = Object.fromEntries(
    settings.map((s) => [s.key, s.value])
  );

  const stats = {
    customers: parseInt(settingsMap.stat_customers || "5000"),
    experience: parseInt(settingsMap.stat_experience || "25"),
    products: parseInt(settingsMap.stat_products || "15"),
    support: parseInt(settingsMap.stat_support || "100"),
  };

  return (
    <>
      <Hero />
      <SectorFinderSection locale={locale} />
      <WhyUs />
      <SolutionsGrid products={products} />
      <StatsCounter stats={stats} />
      <ReferencesCarousel references={references} />
      <ContactCTA />
    </>
  );
}
