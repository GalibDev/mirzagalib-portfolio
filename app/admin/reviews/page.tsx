"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle,
  Edit,
  LogOut,
  Save,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  name: string;
  email: string;
  relation: string | null;
  rating: number;
  message: string;
  project_link: string | null;
  is_approved: boolean;
  created_at: string;
};

export default function AdminReviewsPage() {
  const router = useRouter();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState("Community Feedback");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  // =========================
  // 01. TITLE LOAD
  // =========================
  const fetchTitle = useCallback(async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "testimonial_title")
      .single();

    if (data?.value) setTitle(data.value);
  }, []);

  // =========================
  // 02. TITLE SAVE
  // =========================
  const saveTitle = async () => {
    const { error } = await supabase.from("site_settings").upsert(
      {
        key: "testimonial_title",
        value: title,
      },
      { onConflict: "key" }
    );

    if (error) {
      setToast(error.message);
      return;
    }

    setToast("Title update hoyeche!");
    setTimeout(() => setToast(""), 2500);
  };

  // =========================
  // 03. REVIEWS LOAD
  // =========================
  const fetchReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setToast(error.message);
      return;
    }

    setReviews(data || []);
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      await fetchTitle();
      await fetchReviews();
      setLoading(false);
    };

    init();
  }, [fetchReviews, fetchTitle, router]);

  // =========================
  // 04. APPROVE / UNAPPROVE
  // =========================
  const toggleApprove = async (review: Review) => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: !review.is_approved })
      .eq("id", review.id);

    if (error) {
      setToast(error.message);
      return;
    }

    fetchReviews();
  };

  // =========================
  // 05. DELETE REVIEW
  // =========================
  const deleteReview = async (id: string) => {
    const ok = confirm("Ei review delete korte chao?");
    if (!ok) return;

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      setToast(error.message);
      return;
    }

    setToast("Review delete hoyeche!");
    fetchReviews();
    setTimeout(() => setToast(""), 2500);
  };

  // =========================
  // 06. LOGOUT
  // =========================
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent text-white">
        <div className="glass rounded-3xl px-8 py-6">Loading reviews...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-4 py-24 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* =========================
            07. HEADER
        ========================= */}
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Reviews</h1>
            <p className="mt-2 text-sm text-white/50">
              Approve, delete and edit testimonial title.
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
            08. TITLE EDIT
        ========================= */}
        <div className="glass mb-10 rounded-3xl p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">
            <Edit size={20} />
            Testimonial Section Title
          </h2>

          <div className="flex flex-col gap-4 md:flex-row">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass flex-1 rounded-2xl bg-transparent px-5 py-4 text-sm outline-none"
            />

            <button
              onClick={saveTitle}
              className="glass glass-hover flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold"
            >
              <Save size={16} />
              Save Title
            </button>
          </div>
        </div>

        {/* =========================
            09. REVIEWS LIST
        ========================= */}
        <div className="space-y-5">
          {reviews.length === 0 ? (
            <div className="glass rounded-3xl p-8 text-center text-white/50">
              No reviews found.
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="glass rounded-3xl p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{review.name}</h3>
                    <p className="text-sm text-white/50">{review.email}</p>

                    {review.relation && (
                      <p className="mt-1 text-xs text-blue-300">
                        Relation: {review.relation}
                      </p>
                    )}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      review.is_approved
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {review.is_approved ? "Approved" : "Pending"}
                  </span>
                </div>

                <div className="mb-4 flex gap-1 text-yellow-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>

                <p className="text-sm leading-7 text-white/75">
                  {review.message}
                </p>

                {review.project_link && (
                  <a
                    href={review.project_link}
                    target="_blank"
                    className="mt-3 inline-block text-sm text-blue-300 hover:text-blue-200"
                  >
                    Project Link →
                  </a>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => toggleApprove(review)}
                    className="glass glass-hover flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
                  >
                    {review.is_approved ? (
                      <>
                        <XCircle size={15} />
                        Unapprove
                      </>
                    ) : (
                      <>
                        <CheckCircle size={15} />
                        Approve
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteReview(review.id)}
                    className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
