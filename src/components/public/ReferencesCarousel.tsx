"use client";

import { useTranslations } from "next-intl";

type Reference = {
  id: string;
  name: string;
  logo: string | null;
};

export default function ReferencesCarousel({
  references,
}: {
  references: Reference[];
}) {
  const t = useTranslations("references");

  if (references.length === 0) return null;

  const doubled = [...references, ...references];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Row 1 - scrolls left */}
      <div className="relative mb-6">
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />

        <div className="flex animate-[scroll_40s_linear_infinite] gap-6 w-max">
          {doubled.map((ref, index) => (
            <div
              key={`row1-${ref.id}-${index}`}
              className="group flex h-20 w-52 shrink-0 items-center justify-center rounded-xl border border-border bg-white/80 backdrop-blur-sm px-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
            >
              {ref.logo ? (
                <img
                  src={ref.logo}
                  alt={ref.name}
                  className="max-h-12 max-w-full object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              ) : (
                <span className="text-sm font-semibold text-dark/50 transition-colors duration-300 group-hover:text-dark text-center">
                  {ref.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right (reverse) */}
      {references.length > 4 && (
        <div className="relative">
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />

          <div className="flex animate-[scroll-reverse_45s_linear_infinite] gap-6 w-max">
            {[...doubled].reverse().map((ref, index) => (
              <div
                key={`row2-${ref.id}-${index}`}
                className="group flex h-20 w-52 shrink-0 items-center justify-center rounded-xl border border-border bg-white/80 backdrop-blur-sm px-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
              >
                {ref.logo ? (
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    className="max-h-12 max-w-full object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                ) : (
                  <span className="text-sm font-semibold text-dark/50 transition-colors duration-300 group-hover:text-dark text-center">
                    {ref.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
