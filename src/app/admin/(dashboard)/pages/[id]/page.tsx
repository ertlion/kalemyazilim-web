"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), {
  ssr: false,
  loading: () => <div className="border border-gray-300 rounded-lg p-4 min-h-[200px] bg-gray-50">Editör yükleniyor...</div>,
});

interface Translation {
  locale: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
}

interface PageData {
  id: string;
  slug: string;
  translations: Translation[];
}

export default function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("tr");
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    fetch(`/api/admin/pages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
        const trTrans = data.translations?.find((t: Translation) => t.locale === "tr") || {
          locale: "tr", title: "", content: "", metaTitle: "", metaDescription: "",
        };
        const enTrans = data.translations?.find((t: Translation) => t.locale === "en") || {
          locale: "en", title: "", content: "", metaTitle: "", metaDescription: "",
        };
        setTranslations([trTrans, enTrans]);
        setLoading(false);
      });
  }, [id]);

  function getTranslation(locale: string) {
    return translations.find((t) => t.locale === locale) || {
      locale, title: "", content: "", metaTitle: "", metaDescription: "",
    };
  }

  function updateTranslation(locale: string, field: keyof Translation, value: string) {
    setTranslations((prev) =>
      prev.map((t) => (t.locale === locale ? { ...t, [field]: value } : t))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ translations }),
      });

      if (res.ok) {
        router.push("/admin/pages");
      } else {
        const data = await res.json();
        alert(data.error || "Bir hata oluştu");
      }
    } catch {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Yükleniyor...</div>;
  if (!page) return <div className="text-center py-12 text-gray-500">Sayfa bulunamadı</div>;

  const current = getTranslation(activeTab);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/pages" className="p-2 text-gray-400 hover:text-gray-600 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#34373f]">Sayfayı Düzenle</h1>
            <p className="text-sm text-gray-500">{page.slug}</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#00accb] hover:bg-[#0098b3] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            {["tr", "en"].map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => setActiveTab(locale)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === locale
                    ? "border-[#00accb] text-[#00accb]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {locale === "tr" ? "Türkçe" : "English"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
            <input
              type="text"
              value={current.title}
              onChange={(e) => updateTranslation(activeTab, "title", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
            <TipTapEditor
              content={current.content}
              onChange={(val) => updateTranslation(activeTab, "content", val)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Başlık</label>
            <input
              type="text"
              value={current.metaTitle}
              onChange={(e) => updateTranslation(activeTab, "metaTitle", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Açıklama</label>
            <textarea
              value={current.metaDescription}
              onChange={(e) => updateTranslation(activeTab, "metaDescription", e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
