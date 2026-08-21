"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, FileText, LogOut, RotateCcw, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const RESUME_URL_KEY = "resume_url";
const RESUME_PATH_KEY = "resume_storage_path";
const RESUME_BUCKET = "site-assets";
const DEFAULT_RESUME_URL = "/resume.pdf";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type ResumeSetting = {
  key: string;
  value: string | null;
};

export default function AdminResumePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentUrl, setCurrentUrl] = useState(DEFAULT_RESUME_URL);
  const [currentPath, setCurrentPath] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  const loadResume = useCallback(async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("key,value")
      .in("key", [RESUME_URL_KEY, RESUME_PATH_KEY]);

    const settings = (data || []) as ResumeSetting[];
    const savedUrl = settings.find((setting) => setting.key === RESUME_URL_KEY)?.value;
    const savedPath = settings.find((setting) => setting.key === RESUME_PATH_KEY)?.value;

    setCurrentUrl(savedUrl || DEFAULT_RESUME_URL);
    setCurrentPath(savedPath || "");
    setLoading(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      await loadResume();
    };

    init();
  }, [loadResume, router]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      showToast("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showToast("Resume PDF must be 10 MB or smaller.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    showToast("PDF selected. Click Upload & Replace to publish it.");
  };

  const revalidateResume = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) return;

    await fetch("/api/admin/resume/revalidate", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
  };

  const uploadResume = async () => {
    if (!selectedFile) {
      showToast("Choose a resume PDF first.");
      return;
    }

    setUploading(true);
    setToast("Uploading resume...");

    const fileName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `resumes/${Date.now()}-${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      setUploading(false);
      showToast(uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from(RESUME_BUCKET)
      .getPublicUrl(filePath);

    const { error: saveError } = await supabase.from("site_settings").upsert(
      [
        { key: RESUME_URL_KEY, value: publicUrlData.publicUrl },
        { key: RESUME_PATH_KEY, value: filePath },
      ],
      { onConflict: "key" }
    );

    if (saveError) {
      await supabase.storage.from(RESUME_BUCKET).remove([filePath]);
      setUploading(false);
      showToast(saveError.message);
      return;
    }

    if (currentPath) {
      await supabase.storage.from(RESUME_BUCKET).remove([currentPath]);
    }

    await revalidateResume();
    setCurrentUrl(publicUrlData.publicUrl);
    setCurrentPath(filePath);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploading(false);
    showToast("Resume updated successfully. The Download Resume buttons now use this PDF.");
  };

  const restoreDefaultResume = async () => {
    if (!window.confirm("Restore the resume bundled with the website? The uploaded PDF will be removed.")) {
      return;
    }

    setUploading(true);
    await supabase.from("site_settings").delete().in("key", [RESUME_URL_KEY, RESUME_PATH_KEY]);

    if (currentPath) {
      await supabase.storage.from(RESUME_BUCKET).remove([currentPath]);
    }

    await revalidateResume();
    setCurrentUrl(DEFAULT_RESUME_URL);
    setCurrentPath("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploading(false);
    showToast("Default website resume restored.");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
        <div className="glass rounded-3xl px-8 py-6">Loading resume manager...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-4 py-24 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-5 sm:p-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Resume</h1>
            <p className="mt-2 text-sm text-white/50">
              Upload a PDF to replace the resume downloaded from the portfolio.
            </p>
          </div>

          <button
            onClick={logout}
            className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {toast && <div className="glass mb-6 rounded-2xl px-5 py-4 text-sm">{toast}</div>}

        <div className="glass rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <FileText size={21} className="text-rose-400" /> Current Resume
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/50">
                {currentUrl === DEFAULT_RESUME_URL
                  ? "Using the resume included with the website."
                  : "Using an uploaded resume PDF."}
              </p>
            </div>

            <a
              href={currentUrl}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm"
            >
              <ExternalLink size={16} /> Open Resume
            </a>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-3xl border border-dashed border-white/20 bg-white/[0.03] px-5 py-10 text-center transition hover:bg-white/[0.06]"
          >
            <UploadCloud size={28} className="text-cyan-400" />
            <span>
              <span className="block font-semibold">
                {selectedFile ? selectedFile.name : "Choose a resume PDF"}
              </span>
              <span className="mt-1 block text-xs text-white/45">PDF only, maximum 10 MB</span>
            </span>
          </button>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={uploading || !selectedFile}
              onClick={uploadResume}
              className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              <UploadCloud size={16} /> {uploading ? "Uploading..." : "Upload & Replace"}
            </button>

            {currentUrl !== DEFAULT_RESUME_URL && (
              <button
                type="button"
                disabled={uploading}
                onClick={restoreDefaultResume}
                className="flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm text-white/80 transition hover:bg-white/15 disabled:opacity-50"
              >
                <RotateCcw size={16} /> Restore Default
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
