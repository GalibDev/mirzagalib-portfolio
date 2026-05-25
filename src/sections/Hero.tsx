"use client";

import { Download, Send } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const words = ["Full Stack Developer", "Problem Solver", "Web Designer"];

type HeroStat = {
  id: string;
  label: string;
  sub_label: string | null;
  value: string;
  sort_order: number;
};

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("Full Stack Developer");
  const [deleting, setDeleting] = useState(false);

  const [heroName, setHeroName] = useState("Mirza Galib");
  const [heroImage, setHeroImage] = useState("");
  const [heroStats, setHeroStats] = useState<HeroStat[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadHeroContent = async () => {
      const [{ data: nameData }, { data: imageData }, { data: statsData }] =
        await Promise.all([
          supabase
            .from("site_settings")
            .select("value")
            .eq("key", "hero_name")
            .single(),
          supabase
            .from("site_assets")
            .select("image")
            .eq("key", "hero_profile")
            .single(),
          supabase
            .from("hero_stats")
            .select("id,label,sub_label,value,sort_order")
            .order("sort_order", { ascending: true })
            .limit(3),
        ]);

      if (!mounted) return;

      if (nameData?.value) setHeroName(nameData.value);
      if (imageData?.image) setHeroImage(imageData.image);
      if (statsData) setHeroStats(statsData);
    };

    loadHeroContent();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      return;
    }

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

  const displayStats =
    heroStats.length > 0
      ? heroStats.slice(0, 3)
      : [
          {
            id: "1",
            value: "3",
            label: "Year of",
            sub_label: "Experience",
            sort_order: 1,
          },
          {
            id: "2",
            value: "120",
            label: "Problem",
            sub_label: "Solving",
            sort_order: 2,
          },
          {
            id: "3",
            value: "150",
            label: "Finished",
            sub_label: "Projects",
            sort_order: 3,
          },
        ];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-transparent px-4 pb-12 pt-28 text-white sm:px-6 md:min-h-screen lg:pt-24"
    >
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-500/15 blur-[130px]" />
      <div className="absolute right-24 top-40 h-80 w-80 rounded-full bg-purple-500/15 blur-[130px]" />

      <div className="floating-line left-[8%] top-[32%]" />
      <div className="particle right-[20%] top-[30%]" />
      <div className="particle right-[15%] top-[45%] animation-delay-2000" />
      <div className="particle right-[28%] top-[55%] animation-delay-4000" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-7 pt-4 sm:gap-8 md:min-h-[78vh] md:grid-cols-2 md:items-center md:gap-14 md:pt-0">
        <div className="text-center md:pl-8 md:text-left">
          <p className="mb-3 text-xs text-white/70 sm:text-sm md:mb-4">
            Hey, I am
          </p>

          <h1 className="text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {heroName}
          </h1>

          <h2 className="mt-3 text-base text-white/80 sm:text-lg md:mt-5 md:text-xl">
            I am a <span className="text-white">{text}</span>
            <span className="hidden animate-pulse md:inline">|</span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/60 md:mx-0 md:mt-4 md:leading-7">
            Turning ideas into stunning websites <br />
            Available for projects and collaborations
          </p>

          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:mt-8 md:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              Say Hello <Send size={16} />
            </a>

            <a
              href="/resume.pdf"
              download
              className="spark-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              <span>Download Resume</span> <Download size={16} />
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-5 text-white/60 md:mt-8 md:justify-start">
            <a
              href="https://github.com/GalibDev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition hover:text-white"
            >
              <FaGithub size={24} />
            </a>

            <a
              href="https://www.linkedin.com/in/md-mirza-galib-palash"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

          <p className="mt-8 hidden text-xs text-white/60 md:mt-10 md:block">
            Scroll Down
          </p>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="w-full max-w-[390px]">
            <div className="profile-orbit-system">
              <div className="neon-orbit">
                <span className="orbit-dot" />

                <div className="profile-image-wrap relative">
                  <Image
                    src={heroImage || "/profile.jpg"}
                    alt={heroName}
                    fill
                    priority
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="stats-orbit">
                {displayStats.map((stat, index) => (
                  <div
                    key={stat.id}
                    className={`orbit-card orbit-card-${index + 1} glass`}
                  >
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                    {stat.sub_label && <span>{stat.sub_label}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
