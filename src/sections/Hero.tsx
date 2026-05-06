"use client";

import { Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/* =========================
   01. TYPING TEXT WORDS
========================= */
const words = ["Full Stack Developer", "Problem Solver", "Web Designer"];

export default function Hero() {
  /* =========================
     02. TYPING ANIMATION STATE
  ========================= */
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* =========================
     03. HERO DYNAMIC DATA
     Dashboard theke name + image load hobe
  ========================= */
  const [heroName, setHeroName] = useState("Mirza Galib");
  const [heroImage, setHeroImage] = useState("");

  /* =========================
     04. LOAD HERO NAME FROM SUPABASE
     site_settings table er hero_name key
  ========================= */
  useEffect(() => {
    const loadHeroName = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "hero_name")
        .single();

      if (data?.value) {
        setHeroName(data.value);
      }
    };

    loadHeroName();
  }, []);

  /* =========================
     05. LOAD HERO IMAGE FROM SUPABASE
     site_assets table er hero_profile key
  ========================= */
  useEffect(() => {
    const loadHeroImage = async () => {
      const { data } = await supabase
        .from("site_assets")
        .select("image")
        .eq("key", "hero_profile")
        .single();

      if (data?.image) {
        setHeroImage(data.image);
      }
    };

    loadHeroImage();
  }, []);

  /* =========================
     06. TYPING ANIMATION LOGIC
  ========================= */
  useEffect(() => {
    const word = words[wordIndex];

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));

        if (text === word) {
          setTimeout(() => setDeleting(true), 900);
        }
      } else {
        setText(word.slice(0, text.length - 1));

        if (text === "") {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, deleting ? 45 : 90);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-transparent px-6 pt-28 text-white"
    >
      {/* =========================
          07. HERO BACKGROUND GLOW
      ========================= */}
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-500/15 blur-[130px]" />
      <div className="absolute right-24 top-40 h-80 w-80 rounded-full bg-purple-500/15 blur-[130px]" />

      {/* =========================
          08. MOVING LINE
      ========================= */}
      <div className="floating-line left-[8%] top-[32%]" />

      {/* =========================
          09. FLOATING PARTICLES
      ========================= */}
      <div className="particle right-[20%] top-[30%]" />
      <div className="particle right-[15%] top-[45%] animation-delay-2000" />
      <div className="particle right-[28%] top-[55%] animation-delay-4000" />

      {/* =========================
          10. HERO MAIN GRID
      ========================= */}
      <div className="relative mx-auto grid min-h-[78vh] max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        {/* =========================
            11. LEFT CONTENT
            Name, typing text, button, social icons
        ========================= */}
        <div className="md:pl-8">
          <p className="mb-4 text-sm text-white/70">Hey, I'm</p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {heroName} <span className="wave-hand">👋</span>
          </h1>

          <h2 className="mt-5 text-lg text-white/80 md:text-xl">
            I am a <span className="text-white">{text}</span>
            <span className="animate-pulse">|</span>
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
            🚀 Turning ideas into stunning websites <br />
            | Available for projects and collaborations ✨
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/20"
          >
            Say Hello <Send size={16} />
          </a>

          {/* =========================
              12. SOCIAL ICONS
          ========================= */}
          <div className="mt-8 flex items-center gap-5 text-white/60">
            <a href="#" className="transition hover:text-white">
              <FaGithub size={24} />
            </a>

            <a href="#" className="transition hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>

          <p className="mt-10 text-xs text-white/60">Scroll Down ↓</p>
        </div>

        {/* =========================
            13. RIGHT PROFILE AREA
            Neon orbit + uploaded image + rotating stats
        ========================= */}
        <div className="relative flex justify-center md:justify-end">
          <div className="profile-orbit-system">
            {/* =========================
                14. NEON PROFILE RING
            ========================= */}
            <div className="neon-orbit">
              <span className="orbit-dot" />

              {/* =========================
                  15. HERO PROFILE IMAGE
                  Dashboard image thakle seta show korbe
                  na thakle /profile.jpg fallback
              ========================= */}
              <div className="profile-image-wrap">
                <img
                  src={heroImage || "/profile.jpg"}
                  alt={heroName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* =========================
                16. ROTATING STATS CARDS
            ========================= */}
            <div className="stats-orbit">
              <div className="orbit-card orbit-card-1 glass">
                <strong>3</strong>
                <span>Year of</span>
                <span>Experience</span>
              </div>

              <div className="orbit-card orbit-card-2 glass">
                <strong>120</strong>
                <span>Problem</span>
                <span>Solving</span>
              </div>

              <div className="orbit-card orbit-card-3 glass">
                <strong>150</strong>
                <span>Finished</span>
                <span>Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}