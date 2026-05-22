"use client";

import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast("");

    const { error } = await supabase.from("messages").insert([
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    ]);

    if (error) {
      setLoading(false);
      setToast("Message send hoyni. Abar try koro.");
      return;
    }

    const emailRes = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const emailResult = await emailRes.json().catch(() => null);

    setLoading(false);

    if (!emailRes.ok || emailResult?.success === false) {
      setToast("Message saved, but email notification failed.");
      return;
    }

    setToast("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setToast(""), 3000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-sm text-white/50">Contact Me</p>
        </div>

        {toast && (
          <div className="glass mx-auto mb-8 max-w-md rounded-2xl px-5 py-4 text-center text-sm">
            {toast}
          </div>
        )}

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-lg font-semibold">Talk to me</h3>

            <div className="space-y-5">
              <div className="glass glass-hover rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <Mail size={22} />
                </div>
                <h4 className="text-sm font-semibold tracking-widest">EMAIL</h4>
                <p className="mt-2 text-xs text-white/60">
                  mirza.galib.palash@gmail.com
                </p>
                <a
                  href="mailto:mirza.galib.palash@gmail.com"
                  className="mt-4 inline-block text-xs text-white/70 hover:text-white"
                >
                  Write me →
                </a>
              </div>

              <div className="glass glass-hover rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <FaLinkedin size={22} />
                </div>
                <h4 className="text-sm font-semibold tracking-widest">
                  LINKEDIN
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  md-mirza-galib-palash
                </p>
                <a
                  href="https://www.linkedin.com/in/md-mirza-galib-palash"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-xs text-white/70 hover:text-white"
                >
                  Write me →
                </a>
              </div>

              <div className="glass glass-hover rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-green-400">
                  <FaWhatsapp size={22} />
                </div>
                <h4 className="text-sm font-semibold tracking-widest">
                  WHATSAPP
                </h4>
                <p className="mt-2 text-xs text-white/60">015577088342</p>
                <a
                  href="https://wa.me/88015577088342"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-xs text-white/70 hover:text-white"
                >
                  Write me →
                </a>
              </div>

              <div className="glass glass-hover rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                  <FaGithub size={22} />
                </div>
                <h4 className="text-sm font-semibold tracking-widest">
                  GITHUB
                </h4>
                <p className="mt-2 text-xs text-white/60">GalibDev</p>
                <a
                  href="https://github.com/GalibDev"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-xs text-white/70 hover:text-white"
                >
                  View profile
                </a>
              </div>

              <div className="glass glass-hover rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                  <Phone size={22} />
                </div>
                <h4 className="text-sm font-semibold tracking-widest">PHONE</h4>
                <p className="mt-2 text-xs text-white/60">015577088342</p>
                <a
                  href="tel:+88015577088342"
                  className="mt-4 inline-block text-xs text-white/70 hover:text-white"
                >
                  Call me
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Write me your project
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="name"
                type="text"
                placeholder="Insert your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="glass w-full rounded-2xl bg-transparent px-5 py-4 text-sm outline-none placeholder:text-white/35"
              />

              <input
                name="email"
                type="email"
                placeholder="Insert your email"
                value={form.email}
                onChange={handleChange}
                required
                className="glass w-full rounded-2xl bg-transparent px-5 py-4 text-sm outline-none placeholder:text-white/35"
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Write your project"
                value={form.message}
                onChange={handleChange}
                required
                className="glass w-full resize-none rounded-2xl bg-transparent px-5 py-4 text-sm outline-none placeholder:text-white/35"
              />

              <button
                type="submit"
                disabled={loading}
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
