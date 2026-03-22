import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  const t = useTranslations("contactCta");

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-primary-dark) 100%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating decorative shapes */}
      <div
        className="absolute top-12 left-[10%] h-24 w-24 rounded-full bg-white/10 blur-sm"
        style={{ animation: "float 6s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-16 right-[15%] h-32 w-32 rounded-2xl bg-white/10 blur-sm rotate-12"
        style={{ animation: "float-delayed 7s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/2 left-[5%] h-16 w-16 rounded-lg bg-white/5 blur-sm -rotate-12"
        style={{ animation: "float 8s ease-in-out infinite" }}
      />
      <div
        className="absolute top-20 right-[8%] h-20 w-20 rounded-full bg-white/5 blur-sm"
        style={{ animation: "float-delayed 5s ease-in-out infinite" }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-10">
          <Link
            href="/iletisim"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-10 py-4 text-base font-bold text-primary shadow-2xl transition-all duration-300 hover:bg-white/95 hover:-translate-y-0.5"
            style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
          >
            {t("cta")}
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
