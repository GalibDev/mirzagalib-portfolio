import { Mail, Send } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent px-6 py-28 text-white"
    >
      {/* glow bg */}
      <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Get in Touch</h2>
          <p className="mt-3 text-sm text-white/50">Contact Me</p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* LEFT */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Talk to me</h3>

            <div className="space-y-5">
              {/* EMAIL */}
              <div className="glass glass-hover rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <Mail size={22} />
                </div>

                <h4 className="text-sm font-semibold tracking-widest">EMAIL</h4>

                <p className="mt-2 text-xs text-white/60">
                  mirzagalib@email.com
                </p>

                <a
                  href="#"
                  className="mt-4 inline-block text-xs text-white/70 hover:text-white"
                >
                  Write me →
                </a>
              </div>

              {/* LINKEDIN */}
              <div className="glass glass-hover rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <FaLinkedin size={22} />
                </div>

                <h4 className="text-sm font-semibold tracking-widest">
                  LINKEDIN
                </h4>

                <p className="mt-2 text-xs text-white/60">mirza-galib</p>

                <a
                  href="#"
                  className="mt-4 inline-block text-xs text-white/70 hover:text-white"
                >
                  Write me →
                </a>
              </div>

              {/* TWITTER */}
              <div className="glass glass-hover rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                  <FaTwitter size={22} />
                </div>

                <h4 className="text-sm font-semibold tracking-widest">
                  TWITTER
                </h4>

                <p className="mt-2 text-xs text-white/60">@MirzaGalib</p>

                <a
                  href="#"
                  className="mt-4 inline-block text-xs text-white/70 hover:text-white"
                >
                  Write me →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Write me your project
            </h3>

            <form className="space-y-5">
              {/* NAME */}
              <input
                type="text"
                placeholder="Insert your Name"
                className="glass w-full rounded-2xl px-5 py-4 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-blue-500/30"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Insert your email"
                className="glass w-full rounded-2xl px-5 py-4 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-blue-500/30"
              />

              {/* TEXTAREA */}
              <textarea
                rows={6}
                placeholder="Write your project"
                className="glass w-full resize-none rounded-2xl px-5 py-4 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-blue-500/30"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition hover:scale-105"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}