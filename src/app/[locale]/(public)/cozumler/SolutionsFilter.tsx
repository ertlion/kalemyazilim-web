"use client";

import { useState } from "react";
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
  SearchX,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "all" },
  { key: "pos", label: "POS" },
  { key: "erp", label: "ERP" },
  { key: "ecommerce", label: "E-Commerce" },
  { key: "crm", label: "CRM" },
  { key: "mobile", label: "Mobile" },
  { key: "analytics", label: "Analytics" },
];

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

export default function SolutionsFilter({
  products,
}: {
  products: Product[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const t = useTranslations("solutions");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category Tabs - Modern pill buttons */}
      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
              activeCategory === cat.key
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
            )}
          >
            {cat.key === "all" ? t("viewAll") : cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => {
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
              className="card-gradient-border group relative overflow-hidden rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-colors duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-dark transition-colors group-hover:text-primary">
                {translation.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {translation.shortDescription}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {t("details")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchX className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium text-dark">
            {t("viewAll")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                {t("viewAll")}
              </button>
            )}
          </p>
        </div>
      )}
    </>
  );
}
