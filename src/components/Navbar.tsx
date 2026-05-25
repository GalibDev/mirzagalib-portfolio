"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Code,
  GraduationCap,
  Briefcase,
  Mail,
  MoreHorizontal,
  Lock,
  Star,
  MessageSquareHeart,
  Menu,
  X,
  UserRound,
  Wrench,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const sectionHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  const navItems = [
    { label: "Home", href: "#home", icon: Home, color: "text-yellow-400" },
    { label: "About", href: "#about", icon: UserRound, color: "text-white" },
    { label: "Tech Stack", href: "#tech", icon: Code, color: "text-cyan-400" },
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
    { label: "Contact Me", href: "#contact", icon: Mail, color: "text-pink-400" },
  ];

  const moreItems = [
    { label: "Skills", href: "#skills", icon: Star, color: "text-blue-400" },
    {
      label: "Services",
      href: "#services",
      icon: Wrench,
      color: "text-orange-300",
    },
    {
      label: "Reviews",
      href: "#testimonials",
      icon: MessageSquareHeart,
      color: "text-green-400",
    },
    {
      label: "Admin Login",
      href: "/admin/login",
      icon: Lock,
      color: "text-red-400",
    },
  ];

  const mobileItems = [...navItems, ...moreItems];

  const closeMobile = () => setOpen(false);

  return (
    <>
      {/* =========================
          DESKTOP NAVBAR
          আগের সুন্দর desktop design same রাখা হয়েছে
      ========================= */}
      <nav className="fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 lg:block">
        <div className="glass flex items-center gap-6 rounded-full px-6 py-3 shadow-xl">
          <Link href={sectionHref("#home")} className="font-bold text-white">
            MG
          </Link>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={sectionHref(item.href)}
                className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
              >
                <Icon size={16} className={item.color} />
                {item.label}
              </Link>
            );
          })}

          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <MoreHorizontal size={16} className="text-blue-400" />
              More
            </button>

            {moreOpen && (
              <div className="glass absolute right-0 mt-3 w-48 rounded-2xl p-3 shadow-2xl">
                {moreItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={
                        item.href.startsWith("#")
                          ? sectionHref(item.href)
                          : item.href
                      }
                      onClick={() => setMoreOpen(false)}
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

      <nav className="fixed right-4 top-4 z-50 lg:hidden">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Open navigation menu"
            className="mobile-menu-button flex h-11 w-11 items-center justify-center rounded-full text-white transition"
          >
            {open ? <X size={23} /> : <Menu size={25} />}
          </button>
        </div>

        {open && (
          <div className="mobile-menu-panel mt-3 w-[min(82vw,280px)] p-3">
            <div className="grid gap-2">
              {mobileItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={
                      item.href.startsWith("#")
                        ? sectionHref(item.href)
                        : item.href
                    }
                    onClick={closeMobile}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={18} className={item.color} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
