"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  category: string;
  sortOrder: number;
  published: boolean;
  translations: { locale: string; title: string }[];
}

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
    }
  }

  const categoryLabels: Record<string, string> = {
    pos: "POS",
    erp: "ERP",
    ecommerce: "E-Ticaret",
    mobile: "Mobil",
    web: "Web",
    custom: "Özel Yazılım",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#34373f]">Ürünler</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#00accb] hover:bg-[#0098b3] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Yeni Ürün
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Henüz ürün yok.{" "}
            <Link href="/admin/products/new" className="text-[#00accb] hover:underline">
              İlk ürünü oluşturun
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ürün</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Kategori</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sıra</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Durum</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => {
                const trTitle = product.translations.find((t) => t.locale === "tr")?.title || product.slug;
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/admin/products/${product.id}`} className="text-sm font-medium text-gray-900 hover:text-[#00accb]">
                        {trTitle}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {categoryLabels[product.category] || product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.sortOrder}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          product.published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {product.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-gray-400 hover:text-[#00accb] transition"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
