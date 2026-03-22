import { setRequestLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Share2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import ShareButtons from "./ShareButtons";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.flatMap((p) => [
    { locale: "tr", slug: p.slug },
    { locale: "en", slug: p.slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      translations: { where: { locale } },
    },
  });

  const translation = post?.translations[0];

  return {
    title: translation?.metaTitle || translation?.title || slug,
    description: translation?.metaDescription || translation?.excerpt || "",
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      translations: { where: { locale } },
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  const translation = post.translations[0];
  if (!translation) {
    notFound();
  }

  // Related posts
  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: post.id },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      translations: {
        where: { locale },
        select: { title: true, excerpt: true },
      },
    },
  });

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header - immersive with optional cover image */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-dark-light to-dark py-20 lg:py-28">
        {/* Cover image as background if exists */}
        {post.coverImage && (
          <div className="pointer-events-none absolute inset-0">
            <img
              src={post.coverImage}
              alt=""
              className="h-full w-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
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

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("title")}
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-5xl">
            {translation.title}
          </h1>

          {post.publishedAt && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt, locale)}
            </div>
          )}
        </div>
      </section>

      {/* Cover Image - pulled up */}
      {post.coverImage && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={post.coverImage}
              alt={translation.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm lg:p-12">
            <div
              className="prose-content text-dark leading-relaxed"
              dangerouslySetInnerHTML={{ __html: translation.content }}
            />
          </div>

          {/* Share */}
          <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Share2 className="h-5 w-5" />
              <span className="text-sm font-medium text-dark">
                {t("share")}
              </span>
            </div>
            <div className="h-6 w-px bg-border" />
            <ShareButtons title={translation.title} />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-muted py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-2xl font-bold text-dark">
              {t("relatedPosts")}
            </h2>

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
              {relatedPosts.map((rp) => {
                const rt = rp.translations[0];
                if (!rt) return null;

                return (
                  <Link
                    key={rp.id}
                    href={{
                      pathname: "/blog/[slug]",
                      params: { slug: rp.slug },
                    }}
                    className="card-gradient-border group min-w-[280px] flex-shrink-0 overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-0"
                  >
                    {rp.coverImage && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={rp.coverImage}
                          alt={rt.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="mb-2 text-base font-semibold text-dark transition-colors group-hover:text-primary">
                        {rt.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        {t("readMore")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
