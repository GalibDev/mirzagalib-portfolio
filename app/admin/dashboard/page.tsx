"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  BadgePlus,
  FolderKanban,
  GraduationCap,
  Image,
  LogOut,
  MessageSquare,
  Settings,
  Wrench,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();

  /* =========================
     01. STATES
  ========================= */
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  /* =========================
     02. CHECK ADMIN LOGIN
  ========================= */
  useEffect(() => {
    const checkAdmin = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/admin/login");
        return;
      }

      setEmail(data.user.email || "");

      // unread messages count
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      setUnreadCount(count || 0);

      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  /* =========================
     03. LOGOUT
  ========================= */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  /* =========================
     04. LOADING SCREEN
  ========================= */
  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
        <div className="glass rounded-3xl px-8 py-6">
          Loading Dashboard...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl">
        {/* =========================
            05. DASHBOARD HEADER
        ========================= */}
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
          <div>
            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Logged in as {email}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* =========================
            06. DASHBOARD CARDS GRID
        ========================= */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* =========================
              PROJECTS CARD
          ========================= */}
          <Link
            href="/admin/projects"
            className="glass glass-hover rounded-3xl p-6"
          >
            <FolderKanban
              size={28}
              className="text-blue-400"
            />

            <h2 className="mt-5 text-xl font-semibold">
              Projects
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Add, edit, upload, and delete projects.
            </p>
          </Link>

          {/* =========================
              WEBSITE IMAGES CARD
          ========================= */}
          <Link
            href="/admin/assets"
            className="glass glass-hover rounded-3xl p-6"
          >
            <Image
              size={28}
              className="text-cyan-400"
            />

            <h2 className="mt-5 text-xl font-semibold">
              Website Images
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Upload Hero/About section images.
            </p>
          </Link>

          {/* =========================
              QUALIFICATIONS CARD
          ========================= */}
          <Link
            href="/admin/qualifications"
            className="glass glass-hover rounded-3xl p-6"
          >
            <GraduationCap
              size={28}
              className="text-purple-400"
            />

            <h2 className="mt-5 text-xl font-semibold">
              Qualifications
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Manage education and experience timeline.
            </p>
          </Link>

          {/* =========================
              HERO STATS CARD
              3 / 120 / 150 cards
          ========================= */}
          <Link
            href="/admin/hero-stats"
            className="glass glass-hover rounded-3xl p-6"
          >
            <BadgePlus
              size={28}
              className="text-yellow-400"
            />

            <h2 className="mt-5 text-xl font-semibold">
              Hero Stats
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Edit floating hero profile stats.
            </p>
          </Link>

          {/* =========================
              SETTINGS CARD
              Hero name edit etc
          ========================= */}
          <Link
            href="/admin/settings"
            className="glass glass-hover rounded-3xl p-6"
          >
            <Settings
              size={28}
              className="text-green-400"
            />

            <h2 className="mt-5 text-xl font-semibold">
              Settings
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Edit hero name and website content.
            </p>
          </Link>

          {/* =========================
              SERVICES CARD
          ========================= */}
          <div className="glass glass-hover rounded-3xl p-6">
            <Wrench
              size={28}
              className="text-orange-400"
            />

            <h2 className="mt-5 text-xl font-semibold">
              Services
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Manage services section later.
            </p>
          </div>

          {/* =========================
              MESSAGES CARD
          ========================= */}
          <Link
            href="/admin/messages"
            className="glass glass-hover relative rounded-3xl p-6"
          >
            {/* unread badge */}
            {unreadCount > 0 && (
              <span className="absolute right-5 top-5 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                {unreadCount} New
              </span>
            )}

            <MessageSquare
              size={28}
              className="text-pink-400"
            />

            <h2 className="mt-5 text-xl font-semibold">
              Messages
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Read, delete, and manage contact messages.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}