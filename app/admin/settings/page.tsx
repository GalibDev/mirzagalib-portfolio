"use client";

import { useEffect, useState } from "react";
import { LogOut, Save, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminSettingsPage() {
  const router = useRouter();

  // =========================
  // 01. STATE
  // Hero name edit korar jonno
  // =========================
  const [heroName, setHeroName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  // =========================
  // 02. ADMIN CHECK + LOAD SETTINGS
  // =========================
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      const { data: setting } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "hero_name")
        .single();

      setHeroName(setting?.value || "Mirza Galib");
      setLoading(false);
    };

    init();
  }, [router]);

  // =========================
  // 03. SAVE HERO NAME
  // =========================
  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast("");

    const { error } = await supabase.from("site_settings").upsert(
      {
        key: "hero_name",
        value: heroName,
      },
      { onConflict: "key" }
    );

    setSaving(false);

    if (error) {
      setToast(error.message);
      return;
    }

    setToast("Hero name update hoyeche!");
    setTimeout(() => setToast(""), 2500);
  };

  // =========================
  // 04. LOGOUT
  // =========================
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
        <div className="glass rounded-3xl px-8 py-6">Loading settings...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-4 py-24 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        {/* =========================
            05. PAGE HEADER
        ========================= */}
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-5 sm:p-6">
          <div>
            <h1 className="text-3xl font-bold">Website Settings</h1>
            <p className="mt-2 text-sm text-white/50">
              Hero name and basic website text edit.
            </p>
          </div>

          <button
            onClick={logout}
            className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {toast && (
          <div className="glass mb-6 rounded-2xl px-5 py-4 text-sm">
            {toast}
          </div>
        )}

        {/* =========================
            06. HERO NAME FORM
        ========================= */}
        <form onSubmit={saveSettings} className="glass rounded-3xl p-6">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <UserRound size={20} />
            Hero Name
          </h2>

          <input
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
            placeholder="Enter your name"
            required
            className="glass w-full rounded-2xl bg-transparent px-5 py-4 text-sm outline-none placeholder:text-white/35"
          />

          <button
            type="submit"
            disabled={saving}
            className="glass glass-hover mt-6 flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
}
