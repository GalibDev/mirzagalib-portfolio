"use client";

import { Home, Code2, Briefcase, Mail } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Tech Stack", href: "#tech", icon: Code2 },
  { label: "Projects", href: "#projects", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white shadow-2xl backdrop-blur-xl">
        <a href="#home" className="mr-3 font-bold tracking-wide">
          MG
        </a>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}