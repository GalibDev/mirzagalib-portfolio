"use client";

import { Download, Rocket, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import type { HeroContent } from "@/types/public-content";

const words = ["Full Stack Developer", "Problem Solver", "Web Designer"];

type HeroClientProps = {
  content: HeroContent;
};

export default function HeroClient({ content }: HeroClientProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("Full Stack Developer");
  const [deleting, setDeleting] = useState(false);

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
      className="relative min-h-[100svh] overflow-hidden bg-transparent px-4 pb-12 pt-28 text-white sm:px-6 md:min-h-screen md:pt-16 lg:pt-24"
    >
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-500/15 blur-[130px]" />
      <div className="absolute right-24 top-40 h-80 w-80 rounded-full bg-purple-500/15 blur-[130px]" />

      <div className="floating-line left-[8%] top-[32%]" />
      <div className="particle right-[20%] top-[30%]" />
      <div className="particle right-[15%] top-[45%] animation-delay-2000" />
      <div className="particle right-[28%] top-[55%] animation-delay-4000" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-7 pt-4 sm:gap-8 md:min-h-[78vh] md:grid-cols-2 md:items-center md:gap-14 md:pt-0">
        <div className="mobile-hero-card text-center md:hidden">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs text-white/75">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available for freelance work
          </div>

          <div className="mobile-profile-ring relative mx-auto mb-6">
            <Image
              src={content.image || "/profile.jpg"}
              alt={content.name}
              fill
              priority
              sizes="144px"
              className="rounded-full object-cover"
            />
          </div>

          <p className="mb-3 text-sm text-white/65">Hey, I am</p>
          <h1 className="text-4xl font-extrabold leading-tight">
            Mirza <span>Galib</span>
          </h1>

          <h2 className="mt-4 min-h-8 text-xl font-medium text-white/82">
            I am a <span className="text-white">{text}</span>
            <span className="ml-1 inline-block animate-pulse text-cyan-300">|</span>
          </h2>

          <p className="mx-auto mt-6 max-w-sm text-base leading-8 text-white/58">
            I craft responsive, high-performance web apps with{" "}
            <span className="font-semibold text-white">React, Next.js, Tailwind CSS</span>,
            Node.js & MongoDB, focused on clean UI and seamless UX.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="#projects"
              className="inline-flex min-h-14 w-full max-w-[280px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-base font-semibold text-white shadow-[0_12px_30px_rgba(6,182,212,0.2)]"
            >
              <Rocket size={19} /> View Projects
            </a>

            <a
              href="/resume.pdf"
              download
              className="spark-button inline-flex min-h-[52px] w-full max-w-[260px] items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold text-white"
            >
              <Download size={19} /> Download Resume
            </a>
          </div>
        </div>

        <div className="hidden text-center md:block md:pl-8 md:text-left">
          <p className="mb-3 text-xs text-white/70 sm:text-sm md:mb-4">
            Hey, I am
          </p>

          <h1 className="text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {content.name}
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
              <FaGithub size={20} aria-hidden="true" />
            </a>

            <a
              href="https://www.linkedin.com/in/md-mirza-galib-palash"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition hover:text-white"
            >
              <FaLinkedinIn size={20} aria-hidden="true" />
            </a>
          </div>

          <p className="mt-8 hidden text-xs text-white/60 md:mt-10 md:block">
            Scroll Down
          </p>
        </div>

        <div className="relative hidden justify-center sm:flex md:justify-end">
          <div className="w-full max-w-[390px]">
            <div className="profile-orbit-system">
              <div className="neon-orbit">
                <span className="orbit-dot" />

                <div className="profile-image-wrap relative">
                  <Image
                    src={content.image || "/profile.jpg"}
                    alt={content.name}
                    fill
                    sizes="(min-width: 768px) 280px, 150px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="stats-orbit">
                {content.stats.slice(0, 3).map((stat, index) => (
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
