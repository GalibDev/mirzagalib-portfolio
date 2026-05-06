"use client";

import { useEffect, useState } from "react";
import { Edit, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type HeroStat = {
  id: string;
  label: string;
  sub_label: string;
  value: string;
  sort_order: number;
};

export default function AdminHeroStatsPage() {
  const router = useRouter();

  const [stats, setStats] = useState<HeroStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [editId, setEditId] = useState("");

  const [form, setForm] = useState({
    value: "",
    label: "",
    sub_label: "",
    sort_order: 0,
  });

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      fetchStats();
    };

    init();
  }, [router]);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from("hero_stats")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setToast(error.message);
      setLoading(false);
      return;
    }

    setStats(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      const { error } = await supabase
        .from("hero_stats")
        .update(form)
        .eq("id", editId);

      if (error) {
        setToast(error.message);
        return;
      }

      setToast("Hero stat update hoyeche!");
    } else {
      const { error } = await supabase.from("hero_stats").insert([form]);

      if (error) {
        setToast(error.message);
        return;
      }

      setToast("Hero stat add hoyeche!");
    }

    setForm({
      value: "",
      label: "",
      sub_label: "",
      sort_order: 0,
    });

    setEditId("");
    fetchStats();
    setTimeout(() => setToast(""), 2500);
  };

  const startEdit = (stat: HeroStat) => {
    setEditId(stat.id);
    setForm({
      value: stat.value,
      label: stat.label,
      sub_label: stat.sub_label || "",
      sort_order: stat.sort_order || 0,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteStat = async (id: string) => {
    const ok = confirm("Ei stat delete korte chao?");
    if (!ok) return;

    const { error } = await supabase.from("hero_stats").delete().eq("id", id);

    if (error) {
      setToast(error.message);
      return;
    }

    setToast("Hero stat delete hoyeche!");
    fetchStats();
    setTimeout(() => setToast(""), 2500);
  };

  const cancelEdit = () => {
    setEditId("");
    setForm({
      value: "",
      label: "",
      sub_label: "",
      sort_order: 0,
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
        <div className="glass rounded-3xl px-8 py-6">Loading hero stats...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Hero Stats</h1>
            <p className="mt-2 text-sm text-white/50">
              Hero profile er 3 ta floating stat edit, update, delete.
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

        <form onSubmit={handleSubmit} className="glass mb-10 rounded-3xl p-6">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            {editId ? <Edit size={20} /> : <Plus size={20} />}
            {editId ? "Edit Hero Stat" : "Add Hero Stat"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Value: 3 / 120 / 150"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              required
              className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
            />

            <input
              type="number"
              placeholder="Sort order: 1, 2, 3"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) })
              }
              className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
            />

            <input
              placeholder="Label: Year of Experience"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              required
              className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
            />

            <input
              placeholder="Sub label optional"
              value={form.sub_label}
              onChange={(e) => setForm({ ...form, sub_label: e.target.value })}
              className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="glass glass-hover flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
            >
              <Save size={16} />
              {editId ? "Update Stat" : "Add Stat"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-2xl bg-red-500/20 px-6 py-3 text-sm text-red-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="glass rounded-3xl p-6">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="mt-2 text-sm text-white/80">{stat.label}</p>
              {stat.sub_label && (
                <p className="mt-1 text-xs text-white/50">{stat.sub_label}</p>
              )}

              <p className="mt-3 text-xs text-white/40">
                Sort order: {stat.sort_order}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => startEdit(stat)}
                  className="glass glass-hover flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
                >
                  <Edit size={15} />
                  Edit
                </button>

                <button
                  onClick={() => deleteStat(stat.id)}
                  className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}