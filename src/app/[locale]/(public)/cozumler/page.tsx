import { setRequestLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import PageHeader from "@/components/public/PageHeader";
import SolutionsFilter from "./SolutionsFilter";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "solutions" });

  const products = await prisma.product.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    include: {
      translations: {
        where: { locale },
        select: { title: true, shortDescription: true },
      },
    },
  });

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

      {/* Products */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SolutionsFilter products={products} />
        </div>
      </section>
    </div>
  );
}
