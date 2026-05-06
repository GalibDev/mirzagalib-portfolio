"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, LogOut, Trash2, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Asset = {
  id: string;
  key: string;
  image: string | null;
  image_path: string | null;
};

const assetItems = [
  {
    key: "hero_profile",
    title: "Hero Profile Image",
    description: "Hero section er circular profile image.",
  },
  {
    key: "about_image",
    title: "About Section Image",
    description: "About section er MG/image card.",
  },
];

export default function AdminAssetsPage() {
  const router = useRouter();

  // =========================
  // 01. FILE INPUT REFS
  // Hidden file input click korar jonno
  // =========================
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // =========================
  // 02. STATES
  // assets = database image
  // selectedFiles = not uploaded yet
  // previews = selected image preview
  // =========================
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>(
    {}
  );
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState("");
  const [toast, setToast] = useState("");

  // =========================
  // 03. ADMIN CHECK + ASSETS LOAD
  // =========================
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      fetchAssets();
    };

    init();
  }, [router]);

  // =========================
  // 04. FETCH ASSETS FROM SUPABASE
  // =========================
  const fetchAssets = async () => {
    const { data } = await supabase.from("site_assets").select("*");
    setAssets(data || []);
    setLoading(false);
  };

  // =========================
  // 05. FIND SINGLE ASSET
  // =========================
  const getAsset = (key: string) => {
    return assets.find((asset) => asset.key === key);
  };

  // =========================
  // 06. SELECT IMAGE ONLY
  // ekhane upload hobe na, sudhu preview show korbe
  // =========================
  const selectImage = (key: string, file: File) => {
    if (!file.type.startsWith("image/")) {
      setToast("শুধু image upload করা যাবে।");
      return;
    }

    setSelectedFiles((prev) => ({
      ...prev,
      [key]: file,
    }));

    setPreviews((prev) => ({
      ...prev,
      [key]: URL.createObjectURL(file),
    }));

    setToast("Image select hoyeche. Ebar Upload / Update চাপো.");
    setTimeout(() => setToast(""), 2500);
  };

  // =========================
  // 07. INPUT FILE CHANGE
  // =========================
  const handleFileChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) selectImage(key, file);
  };

  // =========================
  // 08. UPLOAD SELECTED IMAGE
  // Upload / Update button e click korle eta run hobe
  // =========================
  const uploadAsset = async (key: string) => {
    const file = selectedFiles[key];

    if (!file) {
      setToast("আগে image select করো, তারপর Upload / Update চাপো।");
      return;
    }

    setUploadingKey(key);
    setToast("Uploading...");

    const oldAsset = getAsset(key);

    // old image storage theke remove
    if (oldAsset?.image_path) {
      await supabase.storage.from("site-assets").remove([oldAsset.image_path]);
    }

    const fileExt = file.name.split(".").pop();
    const filePath = `${key}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setUploadingKey("");
      setToast(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("site-assets").getPublicUrl(filePath);

    const { error } = await supabase.from("site_assets").upsert(
      {
        key,
        image: data.publicUrl,
        image_path: filePath,
      },
      { onConflict: "key" }
    );

    if (error) {
      setUploadingKey("");
      setToast(error.message);
      return;
    }

    setSelectedFiles((prev) => ({
      ...prev,
      [key]: null,
    }));

    setPreviews((prev) => ({
      ...prev,
      [key]: "",
    }));

    if (fileRefs.current[key]) {
      fileRefs.current[key]!.value = "";
    }

    await fetchAssets();

    setUploadingKey("");
    setToast("Image successfully update hoyeche!");
    setTimeout(() => setToast(""), 2500);
  };

  // =========================
  // 09. CANCEL SELECTED IMAGE
  // upload er age selected preview remove
  // =========================
  const cancelSelectedImage = (key: string) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [key]: null,
    }));

    setPreviews((prev) => ({
      ...prev,
      [key]: "",
    }));

    if (fileRefs.current[key]) {
      fileRefs.current[key]!.value = "";
    }
  };

  // =========================
  // 10. DELETE IMAGE
  // database + storage theke image delete korbe
  // =========================
  const deleteAsset = async (key: string) => {
    const confirmDelete = confirm("এই image delete করতে চাও?");
    if (!confirmDelete) return;

    const asset = getAsset(key);

    if (asset?.image_path) {
      await supabase.storage.from("site-assets").remove([asset.image_path]);
    }

    await supabase
      .from("site_assets")
      .update({ image: null, image_path: null })
      .eq("key", key);

    cancelSelectedImage(key);
    await fetchAssets();

    setToast("Image delete hoyeche!");
    setTimeout(() => setToast(""), 2500);
  };

  // =========================
  // 11. LOGOUT
  // =========================
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
        <div className="glass rounded-3xl px-8 py-6">Loading assets...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl">
        {/* =========================
            12. PAGE HEADER
        ========================= */}
        <div className="glass mb-8 flex items-center justify-between rounded-3xl p-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Website Images</h1>
            <p className="mt-2 text-sm text-white/50">
              Hero and About image upload, update, delete.
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
            13. TOAST MESSAGE
        ========================= */}
        {toast && (
          <div className="glass mb-6 rounded-2xl px-5 py-4 text-sm">
            {toast}
          </div>
        )}

        {/* =========================
            14. IMAGE CARDS
        ========================= */}
        <div className="grid gap-6 md:grid-cols-2">
          {assetItems.map((item) => {
            const asset = getAsset(item.key);
            const preview = previews[item.key];
            const displayImage = preview || asset?.image;

            return (
              <div key={item.key} className="glass rounded-3xl p-6">
                <h2 className="text-xl font-semibold">{item.title}</h2>

                <p className="mt-2 text-sm text-white/50">
                  {item.description}
                </p>

                {/* hidden file input */}
                <input
                  ref={(el) => {
                    fileRefs.current[item.key] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(item.key, e)}
                />

                {/* image preview/select area */}
                <div
                  onClick={() => fileRefs.current[item.key]?.click()}
                  className="glass mt-6 flex h-64 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/20"
                >
                  {displayImage ? (
                    <div className="relative h-full w-full">
                      <img
                        src={displayImage}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />

                      {preview && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelSelectedImage(item.key);
                          }}
                          className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <UploadCloud
                        size={42}
                        className="mx-auto mb-4 text-blue-400"
                      />
                      <p className="font-semibold">Click to select image</p>
                      <p className="mt-2 text-xs text-white/40">
                        JPG, PNG, WEBP
                      </p>
                    </div>
                  )}
                </div>

                {/* buttons */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => uploadAsset(item.key)}
                    disabled={uploadingKey === item.key}
                    className="glass glass-hover flex items-center gap-2 rounded-xl px-4 py-2 text-sm disabled:opacity-60"
                  >
                    <ImagePlus size={16} />
                    {uploadingKey === item.key
                      ? "Uploading..."
                      : preview
                      ? "Upload Selected Image"
                      : "Upload / Update"}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteAsset(item.key)}
                    className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>

                {preview && (
                  <p className="mt-3 text-xs text-blue-300">
                    New image selected. Upload / Update চাপলে save হবে।
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}