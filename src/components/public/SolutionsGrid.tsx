import Image from "next/image";
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
  UtensilsCrossed,
  Fuel,
  ScanLine,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  pos: Monitor,
  erp: Package,
  ecommerce: ShoppingCart,
  crm: Layers,
  mobile: Smartphone,
  analytics: BarChart3,
  sector: Fuel,
};

// Category-based gradient palettes for image overlay
const categoryGradients: Record<string, string> = {
  pos: "from-sky-500/40 to-indigo-500/40",
  mobile: "from-emerald-500/40 to-sky-500/40",
  sector: "from-orange-500/40 to-rose-500/40",
  erp: "from-indigo-500/40 to-purple-500/40",
  crm: "from-purple-500/40 to-pink-500/40",
  analytics: "from-cyan-500/40 to-blue-500/40",
};

const iconByName: Record<string, React.ElementType> = {
  Monitor,
  ShoppingCart,
  Package,
  Layers,
  Smartphone,
  BarChart3,
  UtensilsCrossed,
  Fuel,
  ScanLine,
};

// Fallback images per category when product has no coverImage
const fallbackImages: Record<string, string> = {
  pos: "/uploads/perakende-banner.jpg",
  mobile: "/uploads/el-terminali-banner.jpg",
  sector: "/uploads/akaryakit-banner.jpg",
  erp: "/uploads/homepage-urun.jpg",
  crm: "/uploads/homepage-urun.jpg",
  analytics: "/uploads/homepage-urun.jpg",
};

type Product = {
  slug: string;
  category: string;
  icon: string | null;
  coverImage?: string | null;
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
            const Icon =
              (product.icon && iconByName[product.icon]) ||
              categoryIcons[product.category] ||
              Monitor;
            const translation = product.translations[0];
            if (!translation) return null;

            const image =
              product.coverImage ||
              fallbackImages[product.category] ||
              "/uploads/homepage-urun.jpg";
            const gradient =
              categoryGradients[product.category] ||
              "from-primary/40 to-accent/40";

            return (
              <Link
                key={product.slug}
                href={{
                  pathname: "/cozumler/[slug]",
                  params: { slug: product.slug },
                }}
                className="card-gradient-border group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-border shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
              >
                {/* Product image with gradient overlay + floating icon */}
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={translation.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} mix-blend-multiply`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Floating icon badge - simge */}
                  <div className="absolute bottom-4 left-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 text-primary shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-dark mb-2 transition-colors duration-200 group-hover:text-primary">
                    {translation.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                    {translation.shortDescription}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t("details")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
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
