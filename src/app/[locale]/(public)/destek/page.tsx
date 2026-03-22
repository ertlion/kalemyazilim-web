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
      q: "Kalem Yazilim urunlerini nasil satin alabilirim?",
      a: "Web sitemizden iletisim formu doldurarak veya dogrudan telefon ile bize ulasabilirsiniz. Satis ekibimiz size en uygun paketi belirleyecektir.",
    },
    {
      q: "Kurulum sureci ne kadar surer?",
      a: "Standart kurulumlar 1-3 is gunu icinde tamamlanir. Ozel entegrasyonlar gerektiren projeler icin detayli bir zaman cizelgesi sunulur.",
    },
    {
      q: "Teknik destek saatleri nedir?",
      a: "7/24 teknik destek hattimiz uzerinden bize ulasabilirsiniz. Kritik sorunlar icin aninda mudahale garantisi sunuyoruz.",
    },
    {
      q: "Veri guvenligi nasil saglaniyor?",
      a: "Tum verileriniz sifreli olarak saklanir. Duzenli yedekleme yapilir ve KVKK uyumlu altyapimizla verileriniz guvende.",
    },
    {
      q: "Egitim destegi sunuyor musunuz?",
      a: "Evet, tum urunlerimiz icin kapsamli egitim programlari sunuyoruz. Online ve yerinde egitim secenekleri mevcuttur.",
    },
    {
      q: "Mevcut sistemimle entegrasyon yapilabilir mi?",
      a: "Evet, acik API yapimiz sayesinde mevcut ERP, muhasebe ve e-ticaret sistemlerinizle sorunsuz entegrasyon sagliyoruz.",
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

  const supportChannels = [
    {
      icon: Headphones,
      title: locale === "tr" ? "Telefon Destegi" : "Phone Support",
      value: "+90 (212) 000 00 00",
      description:
        locale === "tr"
          ? "7/24 teknik destek hatti"
          : "24/7 technical support line",
    },
    {
      icon: Mail,
      title: locale === "tr" ? "E-posta Destegi" : "Email Support",
      value: "destek@kalemyazilim.com",
      description:
        locale === "tr"
          ? "En gec 2 saat icinde yanit"
          : "Response within 2 hours",
    },
    {
      icon: MessageCircle,
      title: locale === "tr" ? "Canli Destek" : "Live Chat",
      value:
        locale === "tr"
          ? "Pazartesi - Cuma: 09:00 - 18:00"
          : "Monday - Friday: 09:00 - 18:00",
      description:
        locale === "tr"
          ? "Aninda baglanti, bekleme yok"
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
                    <p className="text-sm font-medium text-dark">
                      {channel.value}
                    </p>
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
