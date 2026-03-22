"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save } from "lucide-react";

interface Reference {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  sortOrder: number;
}

export default function ReferencesPage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newRef, setNewRef] = useState({ name: "", logo: "", website: "", sortOrder: 0 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchReferences();
  }, []);

  async function fetchReferences() {
    const res = await fetch("/api/admin/references");
    const data = await res.json();
    setReferences(data);
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/references", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRef),
      });

      if (res.ok) {
        const ref = await res.json();
        setReferences([...references, ref]);
        setNewRef({ name: "", logo: "", website: "", sortOrder: 0 });
        setShowForm(false);
      }
    } catch {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu referansı silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/references/${id}`, { method: "DELETE" });
    if (res.ok) {
      setReferences(references.filter((r) => r.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#34373f]">Referanslar</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-[#00accb] hover:bg-[#0098b3] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Yeni Referans
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-[#34373f] mb-4">Yeni Referans Ekle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
              <input
                type="text"
                value={newRef.name}
                onChange={(e) => setNewRef({ ...newRef, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none"
                placeholder="Firma adı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
              <input
                type="text"
                value={newRef.logo}
                onChange={(e) => setNewRef({ ...newRef, logo: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none"
                placeholder="/uploads/logo.png"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="text"
                value={newRef.website}
                onChange={(e) => setNewRef({ ...newRef, website: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama</label>
              <input
                type="number"
                value={newRef.sortOrder}
                onChange={(e) => setNewRef({ ...newRef, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00accb] focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#00accb] hover:bg-[#0098b3] text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Kaydediliyor..." : "Ekle"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm transition"
            >
              İptal
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
        ) : references.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Henüz referans yok</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Logo</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ad</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Website</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sıra</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {references.map((ref) => (
                <tr key={ref.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {ref.logo ? (
                      <img src={ref.logo} alt={ref.name} className="w-10 h-10 object-contain" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{ref.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{ref.website || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{ref.sortOrder}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(ref.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
