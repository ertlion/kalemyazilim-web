import { setRequestLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import PageHeader from "@/components/public/PageHeader";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "references" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ReferencesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "references" });

  const references = await prisma.reference.findMany({
    orderBy: { sortOrder: "asc" },
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

      {/* Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="group flex h-36 items-center justify-center rounded-2xl border border-border bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
              >
                {ref.logo ? (
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    className="max-h-16 max-w-full object-contain grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="text-center text-sm font-semibold text-dark/50 transition-colors group-hover:text-dark">
                    {ref.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          {references.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              {t("subtitle")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
