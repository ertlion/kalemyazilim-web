"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import PageHeader from "@/components/public/PageHeader";
import {
  ChevronDown,
  Headphones,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = {
  tr: [
    {
      q: "Kalem Yazılım ürünlerini nasıl satın alabilirim?",
      a: "Web sitemizden iletişim formu doldurarak veya doğrudan telefon ile bize ulaşabilirsiniz. Satış ekibimiz size en uygun paketi belirleyecektir.",
    },
    {
      q: "Kurulum süreci ne kadar sürer?",
      a: "Standart kurulumlar 1-3 iş günü içinde tamamlanır. Özel entegrasyonlar gerektiren projeler için detaylı bir zaman çizelgesi sunulur.",
    },
    {
      q: "Teknik destek saatleri nedir?",
      a: "7/24 teknik destek hattımız üzerinden bize ulaşabilirsiniz. Kritik sorunlar için anında müdahale garantisi sunuyoruz.",
    },
    {
      q: "Veri güvenliği nasıl sağlanıyor?",
      a: "Tüm verileriniz şifreli olarak saklanır. Düzenli yedekleme yapılır ve KVKK uyumlu altyapımızla verileriniz güvende.",
    },
    {
      q: "Eğitim desteği sunuyor musunuz?",
      a: "Evet, tüm ürünlerimiz için kapsamlı eğitim programları sunuyoruz. Online ve yerinde eğitim seçenekleri mevcuttur.",
    },
    {
      q: "Mevcut sistemimle entegrasyon yapılabilir mi?",
      a: "Evet, açık API yapımız sayesinde mevcut ERP, muhasebe ve e-ticaret sistemlerinizle sorunsuz entegrasyon sağlıyoruz.",
    },
  ],
  en: [
    {
      q: "How can I purchase Kalem Software products?",
      a: "You can reach us by filling out the contact form on our website or by calling us directly. Our sales team will determine the most suitable package for you.",
    },
    {
      q: "How long does the installation process take?",
      a: "Standard installations are completed within 1-3 business days. A detailed timeline is provided for projects requiring custom integrations.",
    },
    {
      q: "What are the technical support hours?",
      a: "You can reach us through our 24/7 technical support line. We offer instant intervention guarantee for critical issues.",
    },
    {
      q: "How is data security ensured?",
      a: "All your data is stored encrypted. Regular backups are made and your data is safe with our GDPR-compliant infrastructure.",
    },
    {
      q: "Do you offer training support?",
      a: "Yes, we offer comprehensive training programs for all our products. Online and on-site training options are available.",
    },
    {
      q: "Can integration be done with my existing system?",
      a: "Yes, thanks to our open API structure, we provide seamless integration with your existing ERP, accounting, and e-commerce systems.",
    },
  ],
};

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-all duration-300",
        open
          ? "border-primary/20 bg-primary/[0.02] shadow-sm"
          : "border-border bg-white"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-muted/50"
        aria-expanded={open}
      >
        <span className="pr-4 text-sm font-semibold text-dark">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary"
          )}
        />
      </button>
      <div className="faq-content" data-open={open}>
        <div>
          <div className="border-t border-border/50 px-6 pb-5 pt-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SupportPage() {
  const t = useTranslations("support");
  const locale = useLocale();

  const faqs = faqData[locale as "tr" | "en"] || faqData.tr;

  const supportChannels: {
    icon: typeof Headphones;
    title: string;
    value: string;
    href?: string;
    description: string;
  }[] = [
    {
      icon: Headphones,
      title: locale === "tr" ? "Telefon Desteği" : "Phone Support",
      value: "0850 800 21 21",
      href: "tel:+908508002121",
      description:
        locale === "tr"
          ? "7/24 teknik destek hattı · Merkez: 0 (212) 222 21 21"
          : "24/7 technical support · HQ: +90 (212) 222 21 21",
    },
    {
      icon: Mail,
      title: locale === "tr" ? "E-posta Desteği" : "Email Support",
      value: "destek@kalemyazilim.com",
      href: "mailto:destek@kalemyazilim.com",
      description:
        locale === "tr"
          ? "En geç 2 saat içinde yanıt"
          : "Response within 2 hours",
    },
    {
      icon: MessageCircle,
      title: locale === "tr" ? "Canlı Destek" : "Live Chat",
      value:
        locale === "tr"
          ? "Pazartesi - Cuma: 09:00 - 18:00"
          : "Monday - Friday: 09:00 - 18:00",
      description:
        locale === "tr"
          ? "Anında bağlantı, bekleme yok"
          : "Instant connection, no waiting",
    },
  ];

  return (
    <div className="pt-20 lg:pt-24">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: locale === "tr" ? "Ana Sayfa" : "Home", href: "/" },
          { label: t("title") },
        ]}
      />

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* FAQ */}
            <div className="lg:col-span-2">
              <h2 className="mb-8 text-2xl font-bold text-dark">
                {t("faq")}
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <FaqItem
                    key={index}
                    question={faq.q}
                    answer={faq.a}
                  />
                ))}
              </div>
            </div>

            {/* Support channels */}
            <div className="lg:col-span-1 space-y-4">
              {supportChannels.map((channel, i) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-semibold text-dark">
                        {channel.title}
                      </h3>
                    </div>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="text-sm font-medium text-dark transition-colors hover:text-primary"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-dark">
                        {channel.value}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {channel.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
