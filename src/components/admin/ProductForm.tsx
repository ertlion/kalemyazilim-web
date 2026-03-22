"use client";

import { useState } from "react";
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
  shortDescription: string;
  description: string;
  features: string;
  metaTitle: string;
  metaDescription: string;
}

interface ProductFormProps {
  initialData?: {
    id?: string;
    slug: string;
    icon: string;
    coverImage: string;
    category: string;
    sortOrder: number;
    published: boolean;
    translations: Translation[];
  };
  isNew?: boolean;
}

const emptyTranslation = (locale: string): Translation => ({
  locale,
  title: "",
  shortDescription: "",
  description: "",
  features: "[]",
  metaTitle: "",
  metaDescription: "",
});

export default function ProductForm({ initialData, isNew }: ProductFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tr");
  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [icon, setIcon] = useState(initialData?.icon || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [category, setCategory] = useState(initialData?.category || "pos");
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder || 0);
  const [published, setPublished] = useState(initialData?.published !== false);
  const [translations, setTranslations] = useState<Translation[]>(
    initialData?.translations && initialData.translations.length > 0
      ? initialData.translations
      : [emptyTranslation("tr"), emptyTranslation("en")]
  );

  function getTranslation(locale: string) {
    return translations.find((t) => t.locale === locale) || emptyTranslation(locale);
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
      const url = isNew ? "/api/admin/products" : `/api/admin/products/${initialData?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          icon,
          coverImage,
          category,
          sortOrder,
          published,
          translations,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
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

  const current = getTranslation(activeTab);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 text-gray-400 hover:text-gray-600 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#34373f]">
            {isNew ? "Yeni Ürün" : "Ürünü Düzenle"}
          </h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                  placeholder="Ürün başlığı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama</label>
                <textarea
                  value={current.shortDescription}
                  onChange={(e) => updateTranslation(activeTab, "shortDescription", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none resize-none"
                  placeholder="Kısa açıklama"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <TipTapEditor
                  content={current.description}
                  onChange={(val) => updateTranslation(activeTab, "description", val)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Özellikler (JSON Dizisi)
                </label>
                <textarea
                  value={current.features}
                  onChange={(e) => updateTranslation(activeTab, "features", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none resize-none font-mono text-sm"
                  placeholder='["Özellik 1", "Özellik 2"]'
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Başlık</label>
                <input
                  type="text"
                  value={current.metaTitle}
                  onChange={(e) => updateTranslation(activeTab, "metaTitle", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none"
                  placeholder="SEO başlık"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Açıklama</label>
                <textarea
                  value={current.metaDescription}
                  onChange={(e) => updateTranslation(activeTab, "metaDescription", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none resize-none"
                  placeholder="SEO açıklaması"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-[#34373f]">Ürün Ayarları</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none text-sm"
                placeholder="urun-url-adresi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">İkon</label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none text-sm"
                placeholder="ikon-adi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kapak Görseli</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none text-sm"
                placeholder="/uploads/gorsel.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none text-sm"
              >
                <option value="pos">POS</option>
                <option value="erp">ERP</option>
                <option value="ecommerce">E-Ticaret</option>
                <option value="mobile">Mobil</option>
                <option value="web">Web</option>
                <option value="custom">Özel Yazılım</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#00accb] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00accb]" />
              </label>
              <span className="text-sm font-medium text-gray-700">
                {published ? "Yayında" : "Taslak"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
