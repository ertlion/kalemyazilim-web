"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

const settingGroups = [
  {
    title: "Site Ayarları",
    fields: [
      { key: "site_title", label: "Site Başlığı", type: "text" },
      { key: "site_description", label: "Site Açıklaması", type: "textarea" },
      { key: "contact_email", label: "İletişim E-posta", type: "email" },
      { key: "contact_phone", label: "İletişim Telefon", type: "text" },
      { key: "address", label: "Adres", type: "textarea" },
    ],
  },
  {
    title: "SMTP Ayarları",
    fields: [
      { key: "smtp_host", label: "SMTP Sunucu", type: "text" },
      { key: "smtp_port", label: "SMTP Port", type: "text" },
      { key: "smtp_user", label: "SMTP Kullanıcı", type: "text" },
      { key: "smtp_password", label: "SMTP Parola", type: "password" },
      { key: "smtp_from", label: "Gönderen E-posta", type: "email" },
    ],
  },
  {
    title: "İstatistikler",
    fields: [
      { key: "stat_clients", label: "Müşteri Sayısı", type: "text" },
      { key: "stat_projects", label: "Proje Sayısı", type: "text" },
      { key: "stat_experience", label: "Deneyim (Yıl)", type: "text" },
      { key: "stat_satisfaction", label: "Memnuniyet (%)", type: "text" },
    ],
  },
  {
    title: "Sosyal Medya",
    fields: [
      { key: "social_facebook", label: "Facebook", type: "text" },
      { key: "social_twitter", label: "Twitter / X", type: "text" },
      { key: "social_instagram", label: "Instagram", type: "text" },
      { key: "social_linkedin", label: "LinkedIn", type: "text" },
      { key: "social_youtube", label: "YouTube", type: "text" },
    ],
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const res = await fetch("/api/admin/settings");
    const data = await res.json();
    setSettings(data);
    setLoading(false);
  }

  function updateSetting(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Ayarlar kaydedilemedi");
      }
    } catch {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Yükleniyor...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#34373f]">Ayarlar</h1>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 font-medium">Kaydedildi!</span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#00accb] hover:bg-[#0098b3] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      {settingGroups.map((group) => (
        <div key={group.title} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-[#34373f]">{group.title}</h2>
          </div>
          <div className="p-6 space-y-4">
            {group.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={settings[field.key] || ""}
                    onChange={(e) => updateSetting(field.key, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={settings[field.key] || ""}
                    onChange={(e) => updateSetting(field.key, e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}
