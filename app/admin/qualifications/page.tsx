"use client";

import { useCallback, useEffect, useState } from "react";
import { Edit, GraduationCap, LogOut, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Qualification = {
  id: string;
  type: string;
  title: string;
  institution: string;
  duration: string;
  sort_order: number;
};

export default function AdminQualificationsPage() {
  const router = useRouter();

  // =========================
  // 01. STATE
  // qualifications list, form, edit mode
  // =========================
  const [items, setItems] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [editId, setEditId] = useState("");

  const [form, setForm] = useState({
    type: "education",
    title: "",
    institution: "",
    duration: "",
    sort_order: 0,
  });

  // =========================
  // 03. FETCH QUALIFICATIONS
  // =========================
  const fetchQualifications = useCallback(async () => {
    const { data, error } = await supabase
      .from("qualifications")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setToast(error.message);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  }, []);

  // =========================
  // 02. ADMIN CHECK + DATA LOAD
  // =========================
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      fetchQualifications();
    };

    init();
  }, [fetchQualifications, router]);

  // =========================
  // 04. ADD OR UPDATE QUALIFICATION
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      const { error } = await supabase
        .from("qualifications")
        .update(form)
        .eq("id", editId);

      if (error) {
        setToast(error.message);
        return;
      }

      setToast("Qualification update hoyeche!");
    } else {
      const { error } = await supabase.from("qualifications").insert([form]);

      if (error) {
        setToast(error.message);
        return;
      }

      setToast("Qualification add hoyeche!");
    }

    setForm({
      type: "education",
      title: "",
      institution: "",
      duration: "",
      sort_order: 0,
    });

    setEditId("");
    fetchQualifications();
    setTimeout(() => setToast(""), 2500);
  };

  // =========================
  // 05. EDIT BUTTON
  // =========================
  const startEdit = (item: Qualification) => {
    setEditId(item.id);
    setForm({
      type: item.type,
      title: item.title,
      institution: item.institution,
      duration: item.duration,
      sort_order: item.sort_order || 0,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =========================
  // 06. DELETE BUTTON
  // =========================
  const deleteQualification = async (id: string) => {
    const ok = confirm("এই qualification delete করতে চাও?");
    if (!ok) return;

    const { error } = await supabase
      .from("qualifications")
      .delete()
      .eq("id", id);

    if (error) {
      setToast(error.message);
      return;
    }

    setToast("Qualification delete hoyeche!");
    fetchQualifications();
    setTimeout(() => setToast(""), 2500);
  };

  // =========================
  // 07. CANCEL EDIT
  // =========================
  const cancelEdit = () => {
    setEditId("");
    setForm({
      type: "education",
      title: "",
      institution: "",
      duration: "",
      sort_order: 0,
    });
  };

  // =========================
  // 08. LOGOUT
  // =========================
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
        <div className="glass rounded-3xl px-8 py-6">
          Loading qualifications...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-4 py-24 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* =========================
            09. PAGE HEADER
        ========================= */}
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Qualifications</h1>
            <p className="mt-2 text-sm text-white/50">
              Education/experience add, edit, delete.
            </p>
          </div>

          <button
            onClick={logout}
            className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* =========================
            10. TOAST MESSAGE
        ========================= */}
        {toast && (
          <div className="glass mb-6 rounded-2xl px-5 py-4 text-sm">
            {toast}
          </div>
        )}

        {/* =========================
            11. ADD / EDIT FORM
        ========================= */}
        <form onSubmit={handleSubmit} className="glass mb-10 rounded-3xl p-6">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            {editId ? <Edit size={20} /> : <Plus size={20} />}
            {editId ? "Edit Qualification" : "Add Qualification"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
            >
              <option className="bg-[#050816]" value="education">
                Education
              </option>
              <option className="bg-[#050816]" value="experience">
                Experience
              </option>
            </select>

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
              placeholder="Title: SSC / HSC / BSc in CSE"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
            />

            <input
              placeholder="Institution: Your School / College"
              value={form.institution}
              onChange={(e) =>
                setForm({ ...form, institution: e.target.value })
              }
              required
              className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
            />

            <input
              placeholder="Duration: 2015 - 2017"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              required
              className="glass rounded-2xl bg-transparent px-4 py-3 outline-none md:col-span-2"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="glass glass-hover rounded-2xl px-6 py-3 text-sm font-semibold"
            >
              {editId ? "Update Qualification" : "Add Qualification"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-2xl bg-red-500/20 px-6 py-3 text-sm text-red-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* =========================
            12. QUALIFICATION LIST
        ========================= */}
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="glass rounded-3xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCap className="text-purple-400" size={22} />
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  {item.type}
                </span>
              </div>

              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.institution}</p>
              <p className="mt-2 text-xs text-white/40">{item.duration}</p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => startEdit(item)}
                  className="glass glass-hover flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
                >
                  <Edit size={15} />
                  Edit
                </button>

                <button
                  onClick={() => deleteQualification(item.id)}
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
