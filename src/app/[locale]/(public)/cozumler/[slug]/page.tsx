import { setRequestLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      select: { slug: true },
    });

    return products.flatMap((p) => [
      { locale: "tr", slug: p.slug },
      { locale: "en", slug: p.slug },
    ]);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      translations: { where: { locale } },
    },
  });

  const translation = product?.translations[0];

  return {
    title: translation?.metaTitle || translation?.title || slug,
    description:
      translation?.metaDescription || translation?.shortDescription || "",
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "solutions" });

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      translations: { where: { locale } },
    },
  });

  if (!product || !product.published) {
    notFound();
  }

  const translation = product.translations[0];
  if (!translation) {
    notFound();
  }

  let features: string[] = [];
  try {
    features = JSON.parse(translation.features);
  } catch {
    features = [];
  }

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-dark-light to-dark py-20 lg:py-28">
        {/* Cover image background */}
        {product.coverImage && (
          <div className="pointer-events-none absolute inset-0">
            <img
              src={product.coverImage}
              alt=""
              className="h-full w-full object-cover opacity-8"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70" />
          </div>
        )}

        {/* Mesh gradient orbs */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        />

        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-primary-light) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/cozumler"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("title")}
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-5xl xl:text-6xl">
            {translation.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70 lg:text-xl">
            {translation.shortDescription}
          </p>

          {/* CTA in hero */}
          <div className="mt-8">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
            >
              {t("requestDemo")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cover image pulled up */}
      {product.coverImage && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={product.coverImage}
              alt={translation.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Description */}
            <div className="lg:col-span-2">
              {translation.description && (
                <div className="rounded-2xl border border-border bg-white p-8 shadow-sm lg:p-10">
                  <div
                    className="prose-content text-dark leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: translation.description,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Features */}
              {features.length > 0 && (
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="mb-5 text-lg font-semibold text-dark">
                    {t("features")}
                  </h3>
                  <ul className="space-y-3">
                    {features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-dark"
                      >
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA card */}
              <div className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                <h3 className="mb-2 text-lg font-semibold text-dark">
                  {t("requestDemo")}
                </h3>
                <p className="mb-5 text-sm text-muted-foreground">
                  {translation.shortDescription}
                </p>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
                >
                  {t("requestDemo")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
