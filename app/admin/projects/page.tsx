"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, LogOut, Plus, Trash2, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  image_path: string | null;
  tech: string[];
  github: string;
  live: string;
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    image_path: "",
    tech: "",
    github: "",
    live: "",
  });

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      fetchProjects();
    };

    init();
  }, [router]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data || []);
    setLoading(false);
  };

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setToast("শুধু image file upload করা যাবে।");
      return;
    }

    setUploading(true);
    setToast("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      setUploading(false);
      setToast(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    setForm((prev) => ({
      ...prev,
      image: data.publicUrl,
      image_path: filePath,
    }));

    setUploading(false);
    setToast("Image upload hoyeche!");
    setTimeout(() => setToast(""), 2500);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadImage(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) await uploadImage(file);
  };

  const removeSelectedImage = async () => {
    if (form.image_path) {
      await supabase.storage.from("project-images").remove([form.image_path]);
    }

    setForm((prev) => ({
      ...prev,
      image: "",
      image_path: "",
    }));

    if (inputRef.current) inputRef.current.value = "";
  };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const techArray = form.tech
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const { error } = await supabase.from("projects").insert([
      {
        title: form.title,
        description: form.description,
        image: form.image,
        image_path: form.image_path,
        tech: techArray,
        github: form.github,
        live: form.live,
      },
    ]);

    if (error) {
      setToast(error.message);
      return;
    }

    setForm({
      title: "",
      description: "",
      image: "",
      image_path: "",
      tech: "",
      github: "",
      live: "",
    });

    if (inputRef.current) inputRef.current.value = "";

    setToast("Project add hoyeche!");
    fetchProjects();
    setTimeout(() => setToast(""), 2500);
  };

  const deleteProject = async (project: Project) => {
    if (project.image_path) {
      await supabase.storage.from("project-images").remove([project.image_path]);
    }

    await supabase.from("projects").delete().eq("id", project.id);
    fetchProjects();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
        <div className="glass rounded-3xl px-8 py-6">Loading projects...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="glass mb-8 flex items-center justify-between rounded-3xl p-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Projects</h1>
            <p className="mt-2 text-sm text-white/50">
              Drag, drop, upload and manage portfolio projects.
            </p>
          </div>

          <button
            onClick={logout}
            className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {toast && (
          <div className="glass mb-6 rounded-2xl px-5 py-4 text-sm">
            {toast}
          </div>
        )}

        <form onSubmit={addProject} className="glass mb-10 rounded-3xl p-6">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <Plus size={20} /> Add New Project
          </h2>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`glass flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-6 text-center transition ${
                dragging ? "border-blue-400 bg-blue-500/10" : "border-white/20"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {form.image ? (
                <div className="relative w-full">
                  <img
                    src={form.image}
                    alt="project preview"
                    className="h-56 w-full rounded-2xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedImage();
                    }}
                    className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <UploadCloud size={42} className="mb-4 text-blue-400" />
                  <h3 className="font-semibold">Drag & Drop Image</h3>
                  <p className="mt-2 text-sm text-white/50">
                    অথবা click করে direct upload করো
                  </p>
                  <p className="mt-3 text-xs text-white/35">
                    JPG, PNG, WEBP supported
                  </p>
                </>
              )}

              {uploading && (
                <p className="mt-4 text-sm text-blue-300">Uploading...</p>
              )}
            </div>

            <div className="space-y-4">
              <input
                placeholder="Project title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="glass w-full rounded-2xl bg-transparent px-4 py-3 outline-none"
              />

              <input
                placeholder="Tech stack: Next.js, TypeScript, Supabase"
                value={form.tech}
                onChange={(e) => setForm({ ...form, tech: e.target.value })}
                className="glass w-full rounded-2xl bg-transparent px-4 py-3 outline-none"
              />

              <input
                placeholder="GitHub link"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="glass w-full rounded-2xl bg-transparent px-4 py-3 outline-none"
              />

              <input
                placeholder="Live link"
                value={form.live}
                onChange={(e) => setForm({ ...form, live: e.target.value })}
                className="glass w-full rounded-2xl bg-transparent px-4 py-3 outline-none"
              />

              <textarea
                placeholder="Project description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                rows={5}
                className="glass w-full resize-none rounded-2xl bg-transparent px-4 py-3 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="glass glass-hover rounded-2xl px-6 py-3 text-sm font-semibold disabled:opacity-60"
          >
            {uploading ? "Image uploading..." : "Add Project"}
          </button>
        </form>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-3xl p-5">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="mb-4 h-36 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="glass mb-4 flex h-36 items-center justify-center rounded-2xl">
                  <ImagePlus className="text-white/40" />
                </div>
              )}

              <h3 className="text-lg font-semibold">{project.title}</h3>

              <p className="mt-2 line-clamp-3 text-sm text-white/60">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => deleteProject(project)}
                className="mt-5 flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30"
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}