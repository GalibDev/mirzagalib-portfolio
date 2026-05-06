"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  project_link: string | null;
  relation: string | null;
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState("Community Feedback");

  const [form, setForm] = useState({
    name: "",
    email: "",
    relation: "",
    rating: 5,
    message: "",
    project_link: "",
  });

  const [toast, setToast] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTitle();
    fetchReviews();
  }, []);

  // =========================
  // 01. TESTIMONIAL TITLE LOAD
  // Dashboard theke title edit kora jabe
  // =========================
  const fetchTitle = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "testimonial_title")
      .single();

    if (data?.value) setTitle(data.value);
  };

  // =========================
  // 02. APPROVED REVIEWS LOAD
  // Sudhu approved reviews main website e show korbe
  // =========================
  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("id,name,email,rating,message,project_link,relation")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    setReviews(data || []);
  };

  // =========================
  // 03. SUBMIT REVIEW
  // Visitor review submit korbe, admin approve korle show hobe
  // =========================
  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast("");

    const { error } = await supabase.from("reviews").insert([
      {
        name: form.name,
        email: form.email,
        relation: form.relation || null,
        rating: form.rating,
        message: form.message,
        project_link: form.project_link || null,
        is_approved: false,
      },
    ]);

    setLoading(false);

    if (error) {
      setToast(error.message);
      return;
    }

    setToast("Review submit hoyeche! Admin approve korle show korbe.");

    setForm({
      name: "",
      email: "",
      relation: "",
      rating: 5,
      message: "",
      project_link: "",
    });

    setTimeout(() => {
      setToast("");
      setShowForm(false);
    }, 3000);
  };

  // =========================
  // 04. FALLBACK REVIEWS
  // Database empty hole demo review show korbe
  // =========================
  const displayReviews =
    reviews.length > 0
      ? reviews
      : [
          {
            id: "fallback-1",
            name: "Tanvir Ahmed",
            email: "",
            relation: "Teammate",
            rating: 5,
            message:
              "Clean UI and smooth user experience. Design sense is really good.",
            project_link: null,
          },
          {
            id: "fallback-2",
            name: "Arafat Hossain",
            email: "",
            relation: "Friend",
            rating: 5,
            message:
              "Fast delivery and good communication. The website looks modern.",
            project_link: null,
          },
          {
            id: "fallback-3",
            name: "Sabbir Hasan",
            email: "",
            relation: "Collaborator",
            rating: 5,
            message:
              "Strong React and Next.js skills with creative design thinking.",
            project_link: null,
          },
        ];

  return (
    <section
      id="testimonials"
      className="relative bg-transparent px-6 py-28 text-white"
    >
      <div className="mx-auto max-w-6xl">
        {/* =========================
            05. SECTION TITLE
        ========================= */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
          <p className="mt-3 text-sm text-white/50">Testimonials</p>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="glass glass-hover mt-6 rounded-full px-6 py-3 text-sm font-semibold"
          >
            {showForm ? "Close Review Form" : "Give a Review"}
          </button>
        </div>

        {/* =========================
            06. TOAST MESSAGE
        ========================= */}
        {toast && (
          <div className="glass mx-auto mb-8 max-w-md rounded-2xl px-5 py-4 text-center text-sm">
            {toast}
          </div>
        )}

        {/* =========================
            07. REVIEW SUBMIT FORM
        ========================= */}
        {showForm && (
          <form
            onSubmit={submitReview}
            className="glass mx-auto mb-12 max-w-2xl rounded-3xl p-6"
          >
            <h3 className="mb-6 text-xl font-semibold">Write Your Review</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
              />

              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="glass rounded-2xl bg-transparent px-4 py-3 outline-none"
              />

              {/* =========================
                  OPTIONAL RELATION
                  Friend / Teammate / Collaborator etc
                  Na dile main card e show korbe na
              ========================= */}
              <input
                placeholder="Relation optional: Friend / Teammate / Collaborator"
                value={form.relation}
                onChange={(e) =>
                  setForm({ ...form, relation: e.target.value })
                }
                className="glass rounded-2xl bg-transparent px-4 py-3 outline-none md:col-span-2"
              />

              <input
                placeholder="Project link optional"
                value={form.project_link}
                onChange={(e) =>
                  setForm({ ...form, project_link: e.target.value })
                }
                className="glass rounded-2xl bg-transparent px-4 py-3 outline-none md:col-span-2"
              />

              {/* =========================
                  RATING
              ========================= */}
              <div className="glass rounded-2xl px-4 py-3 md:col-span-2">
                <p className="mb-3 text-sm text-white/60">Rating</p>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setForm({ ...form, rating: num })}
                      className="text-yellow-400"
                    >
                      <Star
                        size={26}
                        fill={num <= form.rating ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Write your review"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
                className="glass resize-none rounded-2xl bg-transparent px-4 py-3 outline-none md:col-span-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glass glass-hover mt-6 rounded-2xl px-6 py-3 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

        {/* =========================
            08. REVIEW CARDS
        ========================= */}
        <div className="grid gap-6 md:grid-cols-3">
          {displayReviews.slice(0, 3).map((review) => (
            <div key={review.id} className="glass rounded-3xl p-6">
              <p className="text-sm leading-7 text-white/75">
                “{review.message}”
              </p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{review.name}</h3>

                  {/* =========================
                      RELATION SHOW
                      Relation thakle show korbe, na thakle hide
                  ========================= */}
                  {review.relation && (
                    <p className="text-xs text-white/40">{review.relation}</p>
                  )}
                </div>

                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
              </div>

              {review.project_link && (
                <a
                  href={review.project_link}
                  target="_blank"
                  className="mt-4 inline-block text-xs text-blue-300 hover:text-blue-200"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}