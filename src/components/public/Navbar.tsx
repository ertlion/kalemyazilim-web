"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, Globe } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/" as const, key: "home" },
  { href: "/hakkimizda" as const, key: "about" },
  { href: "/cozumler" as const, key: "solutions" },
  { href: "/referanslar" as const, key: "references" },
  { href: "/sektorler" as const, key: "industries" },
  { href: "/blog" as const, key: "blog" },
  { href: "/iletisim" as const, key: "contact" },
  { href: "/destek" as const, key: "support" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const switchLocale = () => {
    const newLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname as "/", { locale: newLocale });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] border-b border-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-16 lg:h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/uploads/kalem-logo.png"
              alt="Kalem Yazılım"
              width={125}
              height={129}
              className={`h-9 w-9 lg:h-11 lg:w-11 object-contain transition-all duration-500 ${
                solid ? "" : "brightness-0 invert"
              }`}
              priority
            />
            <span
              className={`text-base lg:text-lg font-bold tracking-tight transition-all duration-500 ${
                solid ? "text-dark" : "text-white"
              }`}
            >
              Kalem
              <span className={`font-normal transition-all duration-500 ${solid ? "text-primary" : "text-white/80"}`}>
                {" "}Yazılım
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? solid
                        ? "text-primary"
                        : "text-white"
                      : solid
                        ? "text-slate-600 hover:text-primary hover:bg-primary/5"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t(link.key)}
                  {/* Active indicator - animated underline */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-primary animate-[slideInLeft_0.3s_ease-out]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Switcher - pill style */}
            <button
              onClick={switchLocale}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                solid
                  ? "text-slate-600 bg-slate-100 hover:bg-primary/10 hover:text-primary"
                  : "text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{locale === "tr" ? "EN" : "TR"}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden rounded-xl p-2.5 transition-all duration-300 ${
                solid
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - slide in animation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white/95 backdrop-blur-xl border-t border-slate-200/50 shadow-xl shadow-black/5">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-0.5">
            {navLinks.map((link, index) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-primary bg-primary/5 border-l-2 border-primary"
                    : "text-slate-700 hover:text-primary hover:bg-slate-50"
                }`}
                style={{
                  animation: mobileOpen
                    ? `mobileSlideIn 0.3s ease-out ${index * 0.04}s both`
                    : "none",
                }}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
