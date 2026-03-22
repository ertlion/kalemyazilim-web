import { setRequestLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";
import PageHeader from "@/components/public/PageHeader";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    include: {
      translations: {
        where: { locale },
        select: { title: true, excerpt: true },
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

      {/* Posts */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {t("noPosts")}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const translation = post.translations[0];
                if (!translation) return null;

                return (
                  <Link
                    key={post.id}
                    href={{
                      pathname: "/blog/[slug]",
                      params: { slug: post.slug },
                    }}
                    className="card-gradient-border group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                  >
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={post.coverImage}
                          alt={translation.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {post.publishedAt && (
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt, locale)}
                        </div>
                      )}

                      <h2 className="mb-2 text-lg font-semibold text-dark transition-colors group-hover:text-primary">
                        {translation.title}
                      </h2>

                      {translation.excerpt && (
                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {translation.excerpt}
                        </p>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {t("readMore")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
