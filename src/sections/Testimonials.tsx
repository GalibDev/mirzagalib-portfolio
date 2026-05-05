"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "James Miller",
    role: "CEO of FutureScale",
    text: "Galib worked efficiently while maintaining excellent design quality. Communication was clear and smooth.",
  },
  {
    name: "Emily Johnson",
    role: "Product Manager",
    text: "Amazing experience! Clean UI, modern design, and delivered on time.",
  },
  {
    name: "Alex Carter",
    role: "Founder",
    text: "Very creative developer. The final product exceeded expectations.",
  },
  {
    name: "Daniel Lee",
    role: "Startup Owner",
    text: "Highly recommended. Professional, fast, and very responsive.",
  },
  {
    name: "Sophia Brown",
    role: "UI Designer",
    text: "Great collaboration. Clean code and strong UI sense.",
  },
  {
    name: "Michael Scott",
    role: "Manager",
    text: "Delivered exactly what I needed. Smooth experience overall.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">My Clients Say</h2>
          <p className="mt-2 text-sm text-white/50">Testimonials</p>
        </div>

        {/* Cards */}
        <div className="relative flex items-center justify-center gap-6">
          {[-1, 0, 1].map((offset) => {
            const i =
              (index + offset + testimonials.length) % testimonials.length;
            const item = testimonials[i];

            return (
              <div
                key={i}
                className={`glass rounded-3xl p-6 transition-all duration-500 ${
                  offset === 0
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-40"
                }`}
                style={{ width: "300px" }}
              >
                <p className="text-sm text-white/60">{item.text}</p>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-white/40">{item.role}</p>
                  </div>

                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={prev}
            className="rounded-full bg-white/10 p-3 hover:bg-white/20"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="rounded-full bg-white/10 p-3 hover:bg-white/20"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}