"use client";

import { useState } from "react";
import {
  Home,
  Code2,
  GraduationCap,
  Briefcase,
  Mail,
  Grid2X2,
  ChevronDown,
  Sparkles,
  Star,
} from "lucide-react";

const mainNavItems = [
  { label: "Home", href: "#home", icon: Home, color: "text-yellow-400" },
  { label: "Tech Stack", href: "#tech", icon: Code2, color: "text-cyan-400" },
  {
    label: "Qualification",
    href: "#qualification",
    icon: GraduationCap,
    color: "text-purple-400",
  },
  { label: "Projects", href: "#projects", icon: Briefcase, color: "text-orange-400" },
  { label: "Contact Me", href: "#contact", icon: Mail, color: "text-pink-400" },
];

const moreItems = [
  { label: "Skills", href: "#skills", icon: Star, color: "text-green-400" },
  { label: "Services", href: "#services", icon: Grid2X2, color: "text-blue-400" },
  {
    label: "Testimonials",
    href: "#testimonials",
    icon: Sparkles,
    color: "text-violet-400",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <nav className="glass flex items-center gap-1 rounded-full px-3 py-2 text-xs text-white shadow-2xl">
        <a
          href="#home"
          className="mr-2 rounded-full px-3 py-2 font-bold tracking-wide text-white"
        >
          MG
        </a>

        {mainNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={15} className={item.color} />
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          );
        })}

        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <Grid2X2 size={15} className="text-indigo-400" />
            <span className="hidden sm:inline">More</span>
            <ChevronDown
              size={14}
              className={`transition ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="glass absolute right-0 top-12 min-w-44 rounded-2xl p-2">
              {moreItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={15} className={item.color} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}