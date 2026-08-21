"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ExternalLink, FileText, LogOut, RotateCcw, Trash2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const URL_KEY = "resume_url";
const PATH_KEY = "resume_storage_path";
const LIBRARY_KEY = "resume_library";
const BUCKET = "site-assets";
const DEFAULT_URL = "/resume.pdf";
const MAX_SIZE = 10 * 1024 * 1024;

type Setting = { key: string; value: string | null };
type SavedResume = {
  id: string;
  name: string;
  url: string;
  path: string;
  uploadedAt: string;
};

function parseLibrary(value?: string | null): SavedResume[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is SavedResume => {
          if (!item || typeof item !== "object") return false;
          const resume = item as SavedResume;
          return [resume.id, resume.name, resume.url, resume.path].every(
            (field) => typeof field === "string"
          );
        })
      : [];
  } catch {
    return [];
  }
}

function legacyName(path: string) {
  return path.split("/").pop()?.replace(/^\d+-/, "") || "Uploaded Resume.pdf";
}

export default function AdminResumePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [activeUrl, setActiveUrl] = useState(DEFAULT_URL);
  const [activePath, setActivePath] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState("");
  const [toast, setToast] = useState("");

  const loadResumes = useCallback(async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("key,value")
      .in("key", [URL_KEY, PATH_KEY, LIBRARY_KEY]);
    const settings = (data || []) as Setting[];
    const get = (key: string) => settings.find((item) => item.key === key)?.value || "";
    const savedUrl = get(URL_KEY) || DEFAULT_URL;
    const savedPath = get(PATH_KEY);
    let savedResumes = parseLibrary(get(LIBRARY_KEY));

    // Migrate a resume uploaded before multiple-resume support was added.
    if (savedUrl !== DEFAULT_URL && !savedResumes.some((item) => item.url === savedUrl)) {
      savedResumes = [{
        id: savedPath || savedUrl,
        name: legacyName(savedPath),
        url: savedUrl,
        path: savedPath,
        uploadedAt: "",
      }, ...savedResumes];
    }

    setResumes(savedResumes);
    setActiveUrl(savedUrl);
    setActivePath(savedPath);
    setLoading(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/admin/login");
        return;
      }
      await loadResumes();
    };
    init();
  }, [loadResumes, router]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3500);
  };

  const revalidate = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      await fetch("/api/admin/resume/revalidate", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
    }
  };

  const save = (library: SavedResume[], url: string, path: string) =>
    supabase.from("site_settings").upsert([
      { key: LIBRARY_KEY, value: JSON.stringify(library) },
      { key: URL_KEY, value: url },
      { key: PATH_KEY, value: path },
    ], { onConflict: "key" });

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
      notify("Please select a PDF file.");
      event.target.value = "";
      return;
    }
    if (selected.size > MAX_SIZE) {
      notify("Resume PDF must be 10 MB or smaller.");
      event.target.value = "";
      return;
    }
    setFile(selected);
    notify("PDF selected. Click Upload Resume to save and activate it.");
  };

  const upload = async () => {
    if (!file) return notify("Choose a resume PDF first.");
    setWorking("upload");
    setToast("Uploading resume...");
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `resumes/${timestamp}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      contentType: "application/pdf",
      upsert: false,
    });
    if (uploadError) {
      setWorking("");
      return notify(uploadError.message);
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    const resume: SavedResume = {
      id: `${timestamp}-${crypto.randomUUID()}`,
      name: file.name,
      url: data.publicUrl,
      path,
      uploadedAt: new Date().toISOString(),
    };
    const next = [resume, ...resumes];
    const { error } = await save(next, resume.url, resume.path);
    if (error) {
      await supabase.storage.from(BUCKET).remove([path]);
      setWorking("");
      return notify(error.message);
    }

    await revalidate();
    setResumes(next);
    setActiveUrl(resume.url);
    setActivePath(resume.path);
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    setWorking("");
    notify("Resume uploaded, saved in the library, and selected as active.");
  };

  const activate = async (resume: SavedResume) => {
    if (resume.url === activeUrl) return;
    setWorking(resume.id);
    const { error } = await save(resumes, resume.url, resume.path);
    if (error) {
      setWorking("");
      return notify(error.message);
    }
    await revalidate();
    setActiveUrl(resume.url);
    setActivePath(resume.path);
    setWorking("");
    notify(`${resume.name} is now active on the website.`);
  };

  const activateDefault = async () => {
    setWorking("default");
    const { error } = await save(resumes, DEFAULT_URL, "");
    if (error) {
      setWorking("");
      return notify(error.message);
    }
    await revalidate();
    setActiveUrl(DEFAULT_URL);
    setActivePath("");
    setWorking("");
    notify("Default website resume is now active.");
  };

  const remove = async (resume: SavedResume) => {
    if (!window.confirm(`Delete “${resume.name}”? This PDF will be permanently removed.`)) return;
    setWorking(`delete-${resume.id}`);
    const next = resumes.filter((item) => item.id !== resume.id);
    const wasActive = resume.url === activeUrl;
    const fallback = wasActive ? next[0] : undefined;
    const nextUrl = wasActive ? fallback?.url || DEFAULT_URL : activeUrl;
    const nextPath = wasActive ? fallback?.path || "" : activePath;
    const { error } = await save(next, nextUrl, nextPath);
    if (error) {
      setWorking("");
      return notify(error.message);
    }
    if (resume.path) await supabase.storage.from(BUCKET).remove([resume.path]);
    await revalidate();
    setResumes(next);
    setActiveUrl(nextUrl);
    setActivePath(nextPath);
    setWorking("");
    notify(wasActive
      ? "Resume deleted. Another available resume was selected automatically."
      : "Resume deleted successfully.");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) return (
    <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
      <div className="glass rounded-3xl px-8 py-6">Loading resume manager...</div>
    </section>
  );

  const isWorking = Boolean(working);

  return (
    <section className="min-h-screen bg-transparent px-4 py-24 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-5 sm:p-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Resumes</h1>
            <p className="mt-2 text-sm text-white/50">Upload multiple PDFs and select which one appears on the website.</p>
          </div>
          <button onClick={logout} className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {toast && <div className="glass mb-6 rounded-2xl px-5 py-4 text-sm">{toast}</div>}

        <div className="glass rounded-3xl p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <UploadCloud size={21} className="text-cyan-400" /> Upload Resume
          </h2>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={selectFile} />
          <button
            type="button"
            disabled={isWorking}
            onClick={() => inputRef.current?.click()}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-3xl border border-dashed border-white/20 bg-white/[0.03] px-5 py-9 transition hover:bg-white/[0.06] disabled:opacity-50"
          >
            <FileText size={27} className="text-rose-400" />
            <span className="text-left">
              <span className="block font-semibold">{file?.name || "Choose a resume PDF"}</span>
              <span className="mt-1 block text-xs text-white/45">PDF only, maximum 10 MB</span>
            </span>
          </button>
          <button
            type="button"
            disabled={isWorking || !file}
            onClick={upload}
            className="glass glass-hover mt-4 flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <UploadCloud size={16} /> {working === "upload" ? "Uploading..." : "Upload Resume"}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <ResumeCard
            name="Default Website Resume"
            note="The resume.pdf included with the website."
            url={DEFAULT_URL}
            active={activeUrl === DEFAULT_URL}
            disabled={isWorking}
            selectLabel={working === "default" ? "Selecting..." : "Use Default"}
            onSelect={activateDefault}
          />

          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              name={resume.name}
              note={resume.uploadedAt
                ? `Uploaded ${new Date(resume.uploadedAt).toLocaleString()}`
                : "Previously uploaded resume"}
              url={resume.url}
              active={resume.url === activeUrl}
              disabled={isWorking}
              selectLabel={working === resume.id ? "Selecting..." : "Select"}
              deleteLabel={working === `delete-${resume.id}` ? "Deleting..." : "Delete"}
              onSelect={() => activate(resume)}
              onDelete={() => remove(resume)}
            />
          ))}

          {resumes.length === 0 && (
            <div className="glass rounded-3xl p-6 text-center text-sm text-white/50">
              No uploaded resumes yet. Upload your first PDF above.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type ResumeCardProps = {
  name: string;
  note: string;
  url: string;
  active: boolean;
  disabled: boolean;
  selectLabel: string;
  deleteLabel?: string;
  onSelect: () => void;
  onDelete?: () => void;
};

function ResumeCard({
  name, note, url, active, disabled, selectLabel, deleteLabel, onSelect, onDelete,
}: ResumeCardProps) {
  return (
    <div className={`glass rounded-3xl border p-5 sm:p-6 ${active ? "border-emerald-400/50" : "border-white/10"}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="break-all font-semibold">{name}</h2>
            {active && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
                <Check size={13} /> Active
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-white/45">{note}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={url} target="_blank" rel="noreferrer" className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
            <ExternalLink size={15} /> View
          </a>
          {!active && (
            <button type="button" disabled={disabled} onClick={onSelect} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/25 disabled:opacity-50">
              {name === "Default Website Resume" ? <RotateCcw size={15} /> : <Check size={15} />} {selectLabel}
            </button>
          )}
          {onDelete && (
            <button type="button" disabled={disabled} onClick={onDelete} className="inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/25 disabled:opacity-50">
              <Trash2 size={15} /> {deleteLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
