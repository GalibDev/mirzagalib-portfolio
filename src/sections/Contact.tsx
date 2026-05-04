import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[#050816] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Contact Me</h2>
          <p className="mt-3 text-white/50">Let's work together</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* left side */}
          <div className="space-y-6">
            {/* Email */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <Mail className="mb-3 text-xl" />
              <h3 className="font-semibold">Email</h3>
              <p className="mt-1 text-sm text-white/60">
                mirzagalib@email.com
              </p>
              <a
                href="mailto:mirzagalib@email.com"
                className="mt-3 inline-block text-sm text-blue-400"
              >
                Send Email →
              </a>
            </div>

            {/* LinkedIn */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <FaLinkedin className="mb-3 text-xl" />
              <h3 className="font-semibold">LinkedIn</h3>
              <p className="mt-1 text-sm text-white/60">
                linkedin.com/in/mirzagalib
              </p>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="mt-3 inline-block text-sm text-blue-400"
              >
                Visit Profile →
              </a>
            </div>
          </div>

          {/* right form */}
          <form className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-blue-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-blue-400"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-blue-400"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-white/10 py-3 text-sm font-medium transition hover:bg-white/20"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}