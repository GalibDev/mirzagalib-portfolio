"use client";

import { Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

const words = ["Full Stack Developer", "Problem Solver", "Web Designer"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
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
    <section className="relative min-h-screen px-6 pt-28 text-white">
      
      {/* glow bg */}
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute right-20 top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">

        {/* ========= LEFT ========= */}
        <div>
          <p className="text-sm text-white/60">Hey, I'm</p>

          <h1 className="text-4xl md:text-6xl font-bold mt-2">
            Mirza Galib 👋
          </h1>

          <h2 className="mt-4 text-lg text-white/80">
            I am a <span className="text-white">{text}</span>
            <span className="animate-pulse">|</span>
          </h2>

          <p className="mt-4 text-sm text-white/60 leading-7">
            🚀 Turning ideas into stunning websites <br />
            | Available for projects and collaborations ✨
          </p>

          {/* button */}
          <button className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
            Say Hello <Send size={16} />
          </button>

          {/* social icons FIXED */}
          <div className="mt-6 flex gap-5 text-white/60">
            <FaGithub size={24} className="hover:text-white cursor-pointer" />
            <FaLinkedin size={24} className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* ========= RIGHT PROFILE ========= */}
        <div className="flex justify-center md:justify-end">
          <div className="profile-orbit-system">

            {/* profile */}
            <div className="neon-orbit">
              <span className="orbit-dot" />

              <div className="profile-image-wrap">
                <img src="/profile.jpg" alt="profile" />
              </div>
            </div>

            {/* rotating stats */}
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