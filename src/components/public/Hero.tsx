"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, PhoneCall, Globe, Users, CalendarDays } from "lucide-react";
import SectorsMarquee from "./SectorsMarquee";

export default function Hero() {
  const t = useTranslations("hero");
  const ft = useTranslations("footer");

  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden gradient-mesh">
      {/* Animated gradient mesh orbs */}
      <div
        className="animate-orb-1 absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.4), transparent 70%)",
        }}
      />
      <div
        className="animate-orb-2 absolute bottom-[10%] right-[10%] h-[600px] w-[600px] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)",
        }}
      />
      <div
        className="animate-orb-1 absolute top-[60%] left-[50%] h-[300px] w-[300px] rounded-full opacity-20 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)",
          animationDelay: "5s",
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating abstract shapes */}
      <div
        className="animate-float absolute top-[20%] right-[15%] h-20 w-20 rounded-2xl border border-white/10 rotate-12"
        style={{ animationDuration: "7s" }}
      />
      <div
        className="absolute bottom-[30%] left-[8%] h-14 w-14 rounded-full border border-primary/20"
        style={{
          animation: "float-delayed 8s ease-in-out infinite",
        }}
      />
      <div
        className="animate-float absolute top-[45%] right-[30%] h-6 w-6 rounded-full bg-primary/10"
        style={{ animationDuration: "5s", animationDelay: "2s" }}
      />

      {/* Centered content wrapper — marquee flex-col'un altında kalsın */}
      <div className="relative flex flex-1 items-center">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-primary-light backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            {ft("tagline")}
          </div>

          {/* Headline with gradient text */}
          <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
            {t("title").split(" ").map((word, i, arr) => {
              const highlightWords = ["Lider", "Leading", "Ortağınız", "Partner"];
              if (highlightWords.includes(word)) {
                return (
                  <span key={i} className="gradient-text">
                    {word}
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                );
              }
              return (
                <span key={i}>
                  {word}
                  {i < arr.length - 1 ? " " : ""}
                </span>
              );
            })}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
            <Link
              href="/cozumler"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/40 transition-all duration-300 animate-pulse-glow"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/iletisim"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <PhoneCall className="h-4 w-4" />
              {t("contact")}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap items-center gap-3 animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
              <Globe className="h-4 w-4 text-primary-light" />
              {t("trustCountries")}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
              <Users className="h-4 w-4 text-primary-light" />
              {t("trustCustomers")}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
              <CalendarDays className="h-4 w-4 text-primary-light" />
              {t("trustYears")}
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* /centered content wrapper */}

      {/* Sectors marquee - butonların ALTINDAN boydan boya sürekli akar */}
      <div className="relative z-[1] animate-[fadeInUp_0.6s_ease-out_0.9s_both]">
        <SectorsMarquee />
      </div>

    </section>
  );
}
