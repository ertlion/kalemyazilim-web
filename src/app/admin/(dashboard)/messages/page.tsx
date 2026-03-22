"use client";

import { useState, useEffect } from "react";
import { Trash2, Mail, MailOpen, ArrowLeft, Eye } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  }

  async function handleSelect(msg: Message) {
    setSelected(msg);

    if (!msg.read) {
      const res = await fetch(`/api/admin/messages/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
        );
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages(messages.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#34373f]">Mesajlar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-500">
              {messages.length} mesaj, {messages.filter((m) => !m.read).length} okunmamış
            </p>
          </div>
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>Henüz mesaj yok</p>
              </div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition ${
                    selected?.id === msg.id ? "bg-blue-50" : ""
                  } ${!msg.read ? "bg-[#00accb]/5" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm ${!msg.read ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                      {msg.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {!msg.read && <span className="w-2 h-2 bg-[#00accb] rounded-full" />}
                      <span className="text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{msg.subject || msg.email}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{msg.message}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          {selected ? (
            <div>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelected(null)}
                    className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="font-semibold text-[#34373f]">{selected.name}</h2>
                    <p className="text-sm text-gray-500">{selected.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                    selected.read ? "bg-gray-100 text-gray-600" : "bg-[#00accb]/10 text-[#00accb]"
                  }`}>
                    {selected.read ? <MailOpen className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {selected.read ? "Okundu" : "Yeni"}
                  </span>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {selected.subject && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Konu</label>
                    <p className="text-sm text-gray-900 mt-0.5">{selected.subject}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {selected.phone && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Telefon</label>
                      <p className="text-sm text-gray-900 mt-0.5">{selected.phone}</p>
                    </div>
                  )}
                  {selected.company && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Firma</label>
                      <p className="text-sm text-gray-900 mt-0.5">{selected.company}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Mesaj</label>
                  <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap leading-relaxed">
                    {selected.message}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-400">
                    {new Date(selected.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] text-gray-400">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto text-gray-200 mb-3" />
                <p className="text-sm">Mesaj seçin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
