"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Code,
  GraduationCap,
  Briefcase,
  Mail,
  MoreHorizontal,
  Lock,
  Star,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // ============================
  // 🔹 MAIN NAV ITEMS (Top visible menu)
  // ============================
  const navItems = [
    {
      label: "Home",
      href: "#home",
      icon: Home,
      color: "text-yellow-400",
    },
    {
      label: "Tech Stack",
      href: "#tech",
      icon: Code,
      color: "text-cyan-400",
    },
    {
      label: "Qualification",
      href: "#qualification",
      icon: GraduationCap,
      color: "text-purple-400",
    },
    {
      label: "Projects",
      href: "#projects",
      icon: Briefcase,
      color: "text-orange-400",
    },
    {
      label: "Contact Me",
      href: "#contact",
      icon: Mail,
      color: "text-pink-400",
    },
  ];

  // ============================
  // 🔹 MORE DROPDOWN ITEMS
  // ============================
  const moreItems = [
    {
      label: "Skills",
      href: "#skills",
      icon: Star,
      color: "text-blue-400",
    },
    {
      label: "Settings",
      href: "#settings",
      icon: Settings,
      color: "text-green-400",
    },
    {
      label: "Admin Login",
      href: "/admin/login",
      icon: Lock,
      color: "text-red-400",
    },
  ];

  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      {/* ============================
          🔹 GLASS NAVBAR CONTAINER
      ============================ */}
      <div className="glass flex items-center gap-6 rounded-full px-6 py-3 shadow-xl">
        
        {/* ============================
            🔹 LOGO PART
        ============================ */}
        <span className="font-bold text-white">MG</span>

        {/* ============================
            🔹 MAIN NAV ITEMS
        ============================ */}
        {navItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <Icon size={16} className={item.color} />
              {item.label}
            </Link>
          );
        })}

        {/* ============================
            🔹 MORE DROPDOWN BUTTON
        ============================ */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <MoreHorizontal size={16} className="text-blue-400" />
            More
          </button>

          {/* ============================
              🔹 DROPDOWN MENU
          ============================ */}
          {open && (
            <div className="glass absolute right-0 mt-3 w-48 rounded-2xl p-3 shadow-2xl">
              {moreItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={16} className={item.color} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}