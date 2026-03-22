import { useTranslations } from "next-intl";
import { Award, Users, HeadphonesIcon, Puzzle } from "lucide-react";

const features = [
  { key: "experience" as const, icon: Award },
  { key: "customers" as const, icon: Users },
  { key: "support247" as const, icon: HeadphonesIcon },
  { key: "integration" as const, icon: Puzzle },
];

export default function WhyUs() {
  const t = useTranslations("whyUs");

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-muted/50 to-muted" />

      {/* Decorative gradient orb */}
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, var(--color-accent) 100%)",
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, var(--color-primary) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
            {t("title")}
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="group relative rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
              >
                {/* Icon */}
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-bold text-dark mb-2">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>

                {/* Bottom gradient line on hover */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
