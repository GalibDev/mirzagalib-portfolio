"use client";

import { useRef } from "react";
import { Briefcase, Code2, Headphones, Download } from "lucide-react";
import useReveal from "@/hooks/useReveal";

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-transparent px-6 py-28 text-white"
    >
      <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[130px]" />

      <div ref={ref} className="reveal mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">About</h2>
          <p className="mt-3 text-sm text-white/50">My Introduction</p>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="relative h-[360px] w-[320px] overflow-hidden rounded-[2rem]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
              <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-500/15 to-purple-500/20 text-7xl font-bold">
                MG
              </div>
            </div>
          </div>

          {/* Right content */}
          <div>
            <div className="grid grid-cols-3 gap-4">
              <div className="reveal-card glass glass-hover rounded-2xl p-5 text-center">
                <Briefcase className="mx-auto mb-3" size={22} />
                <h3 className="text-sm font-semibold">Experience</h3>
                <p className="mt-1 text-xs text-white/50">3 Years Working</p>
              </div>

              <div className="reveal-card glass glass-hover rounded-2xl p-5 text-center">
                <Code2 className="mx-auto mb-3" size={22} />
                <h3 className="text-sm font-semibold">Completed</h3>
                <p className="mt-1 text-xs text-white/50">10+ Projects</p>
              </div>

              <div className="reveal-card glass glass-hover rounded-2xl p-5 text-center">
                <Headphones className="mx-auto mb-3" size={22} />
                <h3 className="text-sm font-semibold">Support</h3>
                <p className="mt-1 text-xs text-white/50">Online 24/7</p>
              </div>
            </div>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/65">
              Proficient in React.js, Next.js, TypeScript, Node.js, MongoDB,
              PostgreSQL, and modern UI development. I build scalable,
              high-performance applications with clean design, smooth user
              experience, and maintainable code.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-4 text-sm font-medium backdrop-blur-xl transition hover:bg-white/20"
            >
              Download Resume <Download size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}