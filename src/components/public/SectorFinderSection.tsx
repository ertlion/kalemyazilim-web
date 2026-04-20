import { getTranslations } from "next-intl/server";
import SectorFinder from "./SectorFinder";
import { Sparkles } from "lucide-react";

export default async function SectorFinderSection({
  locale,
}: {
  locale: string;
}) {
  const isTr = locale === "tr";
  const t = await getTranslations({ locale, namespace: "solutions" });

  const title = isTr
    ? "Size çözüm bulalım"
    : "Let's find a solution for you";
  const subtitle = isTr
    ? "Sektörünüzü yazın, işletmenize özel KL-Retail çözümünü anında önerelim."
    : "Type your industry, we'll instantly recommend the right KL-Retail solution for your business.";

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-white to-muted" />
      <div
        className="absolute -top-24 right-0 h-96 w-96 rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.2), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 left-0 h-96 w-96 rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {isTr ? "Akıllı Çözüm Önerisi" : "Smart Recommendation"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Sector finder card - light variant */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-primary/5 sm:p-8">
          <SectorFinder variant="light" />
        </div>

        {/* Stats footer */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <span>
            {isTr ? "10+ sektör desteği" : "10+ industries supported"}
          </span>
          <span className="hidden sm:block">•</span>
          <span>
            {isTr ? "Anında öneri" : "Instant recommendation"}
          </span>
          <span className="hidden sm:block">•</span>
          <span>
            {isTr ? t("details") : "Tailored modules"}
          </span>
        </div>
      </div>
    </section>
  );
}
