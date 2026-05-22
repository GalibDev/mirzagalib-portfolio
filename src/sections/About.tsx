"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Briefcase, Code2, Headphones } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function About() {
  // =========================
  // 01. ABOUT IMAGE STATE
  // Dashboard theke uploaded about image ekhane load hobe
  // =========================
  const [aboutImage, setAboutImage] = useState("");

  // =========================
  // 02. LOAD ABOUT IMAGE FROM SUPABASE
  // site_assets table er about_image key theke image fetch korbe
  // =========================
  useEffect(() => {
    const loadAboutImage = async () => {
      const { data, error } = await supabase
        .from("site_assets")
        .select("image")
        .eq("key", "about_image")
        .single();

      if (!error && data?.image) {
        setAboutImage(data.image);
      }
    };

    loadAboutImage();
  }, []);

  return (
    <section
      id="about"
      className="relative bg-transparent px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
    >
      {/* =========================
          03. SECTION TITLE
      ========================= */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">About</h2>
        <p className="mt-3 text-sm text-white/50">My Introduction</p>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* =========================
            04. LEFT IMAGE CARD
            Dashboard image thakle show korbe
            na thakle MG fallback show korbe
        ========================= */}
        <div className="flex justify-center">
          <div className="about-photo-frame glass relative flex aspect-square w-full max-w-[360px] items-center justify-center overflow-hidden">
            {aboutImage ? (
              <Image
                src={aboutImage}
                alt="About Mirza Galib"
                fill
                sizes="360px"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl font-bold text-white/80">MG</span>
            )}
          </div>
        </div>

        {/* =========================
            05. RIGHT CONTENT
            Stats + description + resume button
        ========================= */}
        <div>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="glass rounded-2xl p-5 text-center">
              <Briefcase className="mx-auto mb-3" size={22} />
              <h3 className="text-sm font-semibold">Experience</h3>
              <p className="mt-1 text-xs text-white/50">1+ Years Working</p>
            </div>

            <div className="glass rounded-2xl p-5 text-center">
              <Code2 className="mx-auto mb-3" size={22} />
              <h3 className="text-sm font-semibold">Completed</h3>
              <p className="mt-1 text-xs text-white/50">50+ Projects</p>
            </div>

            <div className="glass rounded-2xl p-5 text-center">
              <Headphones className="mx-auto mb-3" size={22} />
              <h3 className="text-sm font-semibold">Support</h3>
              <p className="mt-1 text-xs text-white/50">Online 24/7</p>
            </div>
          </div>

          <div className="max-w-xl space-y-4 text-sm leading-7 text-white/65">
            <p>
              I am MD Mirza Galib Palash, a full stack web developer from
              Dhaka. My programming journey started with curiosity about how
              real websites work, then grew into building responsive interfaces,
              dashboards, ecommerce flows, and complete web applications with
              React, Next.js, TypeScript, Node.js, and MongoDB.
            </p>

            <p>
              I enjoy work that mixes clean UI, useful backend logic, and smooth
              user experience. I like turning rough ideas into polished products,
              fixing small interaction details, and learning better ways to
              write maintainable code. Outside programming, I enjoy exploring
              new tech, creative design ideas, and keeping my work practical and
              simple for real users.
            </p>
          </div>

          <a
            href="/resume.pdf"
            download
            className="glass glass-hover mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium"
          >
            Download Resume <Download size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
