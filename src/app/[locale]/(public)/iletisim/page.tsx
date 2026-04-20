"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import PageHeader from "@/components/public/PageHeader";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t("info.address"),
      value: "Maltepe Mah. Londra Asfaltı Cad. A-B Kısım No: 38 İç Kapı No: K1 Zeytinburnu / İstanbul",
    },
    {
      icon: Phone,
      title: t("info.phone"),
      value: "+90 (212) 222 21 21\n+90 (212) 320 61 57",
    },
    {
      icon: Mail,
      title: t("info.email"),
      value: "info@kalemyazilim.com",
      href: "mailto:info@kalemyazilim.com",
    },
    {
      icon: Clock,
      title: t("info.workingHours"),
      value: t("info.weekdays"),
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
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <InputField
                      label={`${t("form.name")} *`}
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <InputField
                      label={`${t("form.email")} *`}
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <InputField
                      label={t("form.phone")}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <InputField
                      label={t("form.company")}
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <InputField
                    label={t("form.subject")}
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <div className="group relative">
                    <label className="mb-2 block text-sm font-medium text-dark">
                      {t("form.message")} *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none ring-offset-2 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {status === "success" && (
                    <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 px-5 py-4 text-sm text-success animate-[fadeInUp_0.3s_ease]">
                      <CheckCircle className="h-5 w-5 shrink-0" />
                      {t("form.success")}
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive animate-[fadeInUp_0.3s_ease]">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {t("form.error")}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60 disabled:shadow-none"
                  >
                    <Send className="h-4 w-4" />
                    {status === "sending" ? t("form.sending") : t("form.send")}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-dark">
                        {info.title}
                      </h3>
                      {"href" in info && info.href ? (
                        <a
                          href={info.href}
                          className="mt-1 block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground whitespace-pre-line">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Map placeholder */}
              <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted to-border/50">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InputField({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-dark">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none ring-offset-2 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
