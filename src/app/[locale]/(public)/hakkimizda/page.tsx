import { setRequestLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import PageHeader from "@/components/public/PageHeader";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });

  const page = await prisma.page.findUnique({
    where: { slug: "hakkimizda" },
    include: {
      translations: {
        where: { locale },
      },
    },
  });

  const translation = page?.translations[0];

  return (
    <div className="pt-20 lg:pt-24">
      <PageHeader
        title={translation?.title || t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: locale === "tr" ? "Ana Sayfa" : "Home", href: "/" },
          { label: t("title") },
        ]}
      />

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm lg:p-12">
            {translation?.content ? (
              <div
                className="prose-content text-dark leading-relaxed"
                dangerouslySetInnerHTML={{ __html: translation.content }}
              />
            ) : (
              <p className="text-center text-muted-foreground">
                {t("subtitle")}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
