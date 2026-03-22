"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Headphones,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
  };

  const socialLinks = [
    {
      href: "https://twitter.com/kalemyazilimcom",
      icon: Twitter,
      label: "Twitter",
    },
    {
      href: "https://www.facebook.com/kalemyazilimcom",
      icon: Facebook,
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/kalemyazilimcom",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/781274",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://www.youtube.com/channel/UCYQPknm8XxPjO7PaCgeYtpg",
      icon: Youtube,
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Top gradient line */}
      <div className="gradient-line" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Newsletter section */}
        <div className="mb-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-xl font-bold text-white">
                {t("newsletter")}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {t("description")}
              </p>
            </div>
            <form
              onSubmit={handleNewsletter}
              className="flex w-full max-w-md gap-3"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                />
              </div>
              <button
                type="submit"
                className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all duration-300 shrink-0"
              >
                {t("newsletterCta")}
                <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <Image
                src="/uploads/kalem-logo-footer.png"
                alt="Kalem Yazılım"
                width={146}
                height={147}
                className="h-10 w-10 object-contain brightness-0 invert"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                Kalem
                <span className="font-normal text-slate-400"> Yazılım</span>
              </span>
            </div>
            <p className="text-xs text-primary font-semibold mb-3 tracking-wider">
              {t("tagline")}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("description")}
            </p>

            {/* Social media icons */}
            <div className="flex items-center gap-2.5 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-primary hover:text-white border border-white/5 hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-300 mb-5">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/" as const, label: nav("home") },
                { href: "/hakkimizda" as const, label: nav("about") },
                { href: "/cozumler" as const, label: nav("solutions") },
                { href: "/referanslar" as const, label: nav("references") },
                { href: "/blog" as const, label: nav("blog") },
                { href: "/iletisim" as const, label: nav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors duration-300"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-300 mb-5">
              {t("sectors")}
            </h3>
            <ul className="space-y-2.5">
              {[
                "Perakende Çözümleri",
                "Akaryakıt İstasyonu Çözümleri",
                "Cafe & Restoran Çözümleri",
                "Mağazacılık Çözümleri",
                "Mobil Çözümler",
                "Depo Otomasyon Çözümleri",
              ].map((sector) => (
                <li
                  key={sector}
                  className="text-sm text-slate-400 hover:text-slate-300 transition-colors duration-300 cursor-default"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-300 mb-5">
              {t("contactInfo")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="leading-relaxed">{t("address")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span>{t("phone")}</span>
                  <span>{t("phone2")}</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Headphones className="h-4 w-4 text-primary" />
                </div>
                <span>Destek: {t("supportPhone")}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a
                  href={`mailto:${t("email")}`}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {t("email")}
                </a>
              </li>
            </ul>

            {/* Partner Logos */}
            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/uploads/logo-cozum-ortagi.jpg"
                alt="Logo Çözüm Ortağı"
                width={80}
                height={30}
                className="h-7 w-auto rounded-lg opacity-50 hover:opacity-90 transition-opacity duration-300"
              />
              <Image
                src="/uploads/venut-logo.jpg"
                alt="Venut"
                width={80}
                height={30}
                className="h-7 w-auto rounded-lg opacity-50 hover:opacity-90 transition-opacity duration-300"
              />
              <Image
                src="/uploads/fastsoft-logo.jpg"
                alt="Fastsoft"
                width={80}
                height={30}
                className="h-7 w-auto rounded-lg opacity-50 hover:opacity-90 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Kalem Yazılım Sistem
            Otomasyonları San. Tic. Ltd. Şti. {t("rights")}
          </p>
          <p className="text-xs text-slate-600">
            satis@kalemyazilim.com | perakende@kalemyazilim.com |
            destek@kalemyazilim.com
          </p>
        </div>
      </div>
    </footer>
  );
}
