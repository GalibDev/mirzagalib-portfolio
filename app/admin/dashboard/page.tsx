"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FolderKanban,
  LogOut,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();

  // =========================
  // 01. STATE
  // Admin email, loading, unread message count
  // =========================
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // =========================
  // 02. PAGE LOAD CHECK
  // Login na thakle /admin/login e pathabe
  // Login thakle dashboard data load korbe
  // =========================
  useEffect(() => {
    const loadDashboard = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/admin/login");
        return;
      }

      setEmail(data.user.email || "");

      // Unread messages count
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      setUnreadCount(count || 0);
      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  // =========================
  // 03. LOGOUT FUNCTION
  // Logout kore login page e pathabe
  // =========================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // =========================
  // 04. LOADING UI
  // Dashboard check korar somoy ei UI show hobe
  // =========================
  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent px-6 text-white">
        <div className="glass rounded-3xl px-8 py-6 text-center">
          Checking admin access...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl">
        {/* =========================
            05. DASHBOARD HEADER
            Title, admin email, logout button
        ========================= */}
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-white/50">{email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* =========================
            06. DASHBOARD CARDS
            Ei card gulo click kore admin pages e jabe
        ========================= */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* =========================
              PROJECTS CARD
              /admin/projects page e jabe
          ========================= */}
          <Link
            href="/admin/projects"
            className="glass glass-hover rounded-3xl p-6"
          >
            <FolderKanban size={28} className="text-blue-400" />
            <h2 className="mt-5 text-xl font-semibold">Projects</h2>
            <p className="mt-2 text-sm text-white/50">
              Add, upload, and delete portfolio projects.
            </p>
          </Link>

          {/* =========================
              SERVICES CARD
              Future services manage korar jonno
          ========================= */}
          <div className="glass glass-hover rounded-3xl p-6">
            <Wrench size={28} className="text-purple-400" />
            <h2 className="mt-5 text-xl font-semibold">Services</h2>
            <p className="mt-2 text-sm text-white/50">
              Manage your services section later.
            </p>
          </div>

          {/* =========================
              MESSAGES CARD
              /admin/messages page e jabe
              Unread message count badge show korbe
          ========================= */}
          <Link
            href="/admin/messages"
            className="glass glass-hover relative rounded-3xl p-6"
          >
            {unreadCount > 0 && (
              <span className="absolute right-5 top-5 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                {unreadCount} New
              </span>
            )}

            <MessageSquare size={28} className="text-pink-400" />
            <h2 className="mt-5 text-xl font-semibold">Messages</h2>
            <p className="mt-2 text-sm text-white/50">
              View, read/unread, and delete contact messages.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}