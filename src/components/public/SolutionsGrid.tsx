import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Monitor,
  ShoppingCart,
  BarChart3,
  Smartphone,
  Package,
  Layers,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  pos: Monitor,
  erp: Package,
  ecommerce: ShoppingCart,
  crm: Layers,
  mobile: Smartphone,
  analytics: BarChart3,
};

type Product = {
  slug: string;
  category: string;
  icon: string | null;
  translations: {
    title: string;
    shortDescription: string;
  }[];
};

export default function SolutionsGrid({
  products,
}: {
  products: Product[];
}) {
  const t = useTranslations("solutions");

  return (
    <section className="py-20 lg:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with decorative underline */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = categoryIcons[product.category] || Monitor;
            const translation = product.translations[0];
            if (!translation) return null;

            return (
              <Link
                key={product.slug}
                href={{
                  pathname: "/cozumler/[slug]",
                  params: { slug: product.slug },
                }}
                className="card-gradient-border group relative rounded-2xl bg-white border border-border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
              >
                {/* Icon in gradient circle */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-bold text-dark mb-3 transition-colors duration-200 group-hover:text-primary">
                  {translation.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {translation.shortDescription}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {t("details")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* View all button */}
        {products.length > 6 && (
          <div className="mt-14 text-center">
            <Link
              href="/cozumler"
              className="group/btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
