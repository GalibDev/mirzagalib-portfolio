import { Send } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050816] px-6 pt-28 text-white"
    >
      {/* background glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-purple-500/20 blur-[120px]" />



{/* floating lines */}
<div className="floating-line left-[8%] top-[33%]" />
<div className="floating-line right-[15%] top-[70%] animation-delay-2000" />
<div className="floating-line left-[18%] bottom-[25%] animation-delay-4000" />

{/* particles */}
<div className="particle right-[20%] top-[32%]" />
<div className="particle right-[12%] top-[45%] animation-delay-2000" />
<div className="particle right-[28%] top-[55%] animation-delay-4000" />
<div className="particle left-[8%] top-[60%] animation-delay-2000" />




      <div className="relative mx-auto grid min-h-[80vh] max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* left content */}
        <div>
          <p className="mb-4 text-white/70">Hey, I'm</p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Mirza Galib <span>👋</span>
          </h1>

          <h2 className="mt-5 text-xl text-white/80 md:text-2xl">
            Full Stack Developer
          </h2>

          <p className="mt-5 max-w-xl text-white/55">
            I build modern, scalable, and interactive web applications with
            React, Next.js, TypeScript, and beautiful user experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              Say Hello <Send size={16} />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* right profile */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative h-72 w-72 rounded-full border border-white/20 bg-white/5 p-3 shadow-2xl backdrop-blur-xl md:h-80 md:w-80">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-7xl">
              MG
            </div>
          </div>

          <div className="absolute left-4 top-12 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm backdrop-blur-xl">
            <strong>3+</strong> Years Experience
          </div>

          <div className="absolute bottom-8 right-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm backdrop-blur-xl">
            <strong>10+</strong> Projects Built
          </div>
        </div>
      </div>
    </section>
  );
}