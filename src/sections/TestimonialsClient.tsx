"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/types/public-content";

type TestimonialsClientProps = {
  title: string;
  reviews: Review[];
};

export default function TestimonialsClient({
  title,
  reviews,
}: TestimonialsClientProps) {
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

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast("");

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const result = await response.json().catch(() => null);

    setLoading(false);

    if (!response.ok || result?.success === false) {
      setToast(result?.error || "Review submit hoyni. Abar try koro.");
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

  return (
    <section
      id="testimonials"
      className="relative bg-transparent px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-white/50">Testimonials</p>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="glass glass-hover mt-6 rounded-full px-6 py-3 text-sm font-semibold"
          >
            {showForm ? "Close Review Form" : "Give a Review"}
          </button>
        </div>

        {toast && (
          <div className="glass mx-auto mb-8 max-w-md rounded-2xl px-5 py-4 text-center text-sm">
            {toast}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={submitReview}
            className="glass mx-auto mb-12 max-w-2xl rounded-3xl p-5 sm:p-6"
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="glass rounded-3xl p-6">
              <p className="text-sm leading-7 text-white/75">
                &ldquo;{review.message}&rdquo;
              </p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{review.name}</h3>

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
                  View Project &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
