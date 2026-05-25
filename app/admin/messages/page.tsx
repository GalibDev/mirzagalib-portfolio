"use client";

import { useCallback, useEffect, useState } from "react";
import { LogOut, MailOpen, Mail, Trash2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export default function AdminMessagesPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setToast(error.message);
      return;
    }

    setMessages(data || []);
  }, []);

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      await fetchMessages();
      setLoading(false);
    };

    checkAdminAndFetch();
  }, [fetchMessages, router]);

  const toggleRead = async (msg: Message) => {
    const { error } = await supabase
      .from("messages")
      .update({ is_read: !msg.is_read })
      .eq("id", msg.id);

    if (error) {
      setToast(error.message);
      return;
    }

    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    const confirmDelete = confirm("এই message delete করতে চাও?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) {
      setToast(error.message);
      return;
    }

    setToast("Message delete hoyeche!");
    fetchMessages();

    setTimeout(() => setToast(""), 2500);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent px-6 text-white">
        <div className="glass rounded-3xl px-8 py-6">
          Loading messages...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-4 py-24 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="mt-2 text-sm text-white/50">
              View, mark read/unread, and delete contact messages.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchMessages}
              className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              onClick={logout}
              className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {toast && (
          <div className="glass mb-6 rounded-2xl px-5 py-4 text-sm">
            {toast}
          </div>
        )}

        {messages.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center text-white/50">
            No messages found.
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`glass rounded-3xl p-6 ${
                  msg.is_read ? "opacity-70" : "border border-pink-400/40"
                }`}
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      {msg.is_read ? (
                        <MailOpen size={20} className="text-green-400" />
                      ) : (
                        <Mail size={20} className="text-pink-400" />
                      )}

                      <h2 className="text-xl font-semibold">{msg.name}</h2>

                      {!msg.is_read && (
                        <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-300">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-white/50">{msg.email}</p>
                  </div>

                  <p className="text-xs text-white/40">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>

                <p className="leading-7 text-white/75">{msg.message}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => toggleRead(msg)}
                    className="glass glass-hover flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
                  >
                    {msg.is_read ? (
                      <>
                        <Mail size={15} />
                        Mark as Unread
                      </>
                    ) : (
                      <>
                        <MailOpen size={15} />
                        Mark as Read
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
