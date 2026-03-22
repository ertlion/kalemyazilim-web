import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

type Breadcrumb = {
  label: string;
  href?: "/" | "/hakkimizda" | "/cozumler" | "/referanslar" | "/sektorler" | "/blog" | "/iletisim" | "/destek";
};

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <section className="page-header relative overflow-hidden bg-gradient-to-br from-dark via-dark-light to-dark py-20 lg:py-28">
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
            "radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)",
        }}
      />

      {/* Dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary-light) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 text-sm text-white/50"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-white/80"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl xl:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 lg:text-xl">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
