import { Briefcase, Code2, Headphones } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#050816] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">About</h2>
          <p className="mt-3 text-white/50">My introduction</p>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* left image/avatar */}
          <div className="flex justify-center">
            <div className="relative h-80 w-80 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              <div className="relative flex h-full items-center justify-center text-7xl font-bold">
                MG
              </div>
            </div>
          </div>

          {/* right content */}
          <div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl">
                <Briefcase className="mx-auto mb-3" size={22} />
                <h3 className="font-semibold">Experience</h3>
                <p className="mt-1 text-xs text-white/50">3+ Years</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl">
                <Code2 className="mx-auto mb-3" size={22} />
                <h3 className="font-semibold">Completed</h3>
                <p className="mt-1 text-xs text-white/50">10+ Projects</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl">
                <Headphones className="mx-auto mb-3" size={22} />
                <h3 className="font-semibold">Support</h3>
                <p className="mt-1 text-xs text-white/50">Online 24/7</p>
              </div>
            </div>

            <p className="mt-8 max-w-xl leading-8 text-white/60">
              I am a Full Stack Developer focused on building clean, scalable,
              and user-friendly web applications. I enjoy turning ideas into
              real products using React, Next.js, TypeScript, and modern backend
              technologies.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex rounded-full bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-xl transition hover:bg-white/20"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}