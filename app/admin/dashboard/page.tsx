"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BadgePlus,
  FolderKanban,
  GraduationCap,
  Image,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const cards = [
  {
    title: "Reviews",
    desc: "Approve, delete and edit testimonial reviews.",
    href: "/admin/reviews",
    icon: Star,
    color: "text-yellow-400",
  },
  {
    title: "Projects",
    desc: "Add, edit, upload, and delete projects.",
    href: "/admin/projects",
    icon: FolderKanban,
    color: "text-blue-400",
  },
  {
    title: "Website Images",
    desc: "Upload Hero/About section images.",
    href: "/admin/assets",
    icon: Image,
    color: "text-cyan-400",
  },
  {
    title: "Qualifications",
    desc: "Manage education and experience timeline.",
    href: "/admin/qualifications",
    icon: GraduationCap,
    color: "text-purple-400",
  },
  {
    title: "Hero Stats",
    desc: "Edit floating hero profile stats.",
    href: "/admin/hero-stats",
    icon: BadgePlus,
    color: "text-orange-400",
  },
  {
    title: "Settings",
    desc: "Edit hero name and website content.",
    href: "/admin/settings",
    icon: Settings,
    color: "text-green-400",
  },
  {
    title: "Messages",
    desc: "Read, delete, and manage contact messages.",
    href: "/admin/messages",
    icon: MessageSquare,
    color: "text-pink-400",
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/admin/login");
        return;
      }

      setEmail(data.user.email || "");

      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      setUnreadCount(count || 0);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-transparent px-6 text-white">
        <div className="glass rounded-3xl px-8 py-6">Loading Dashboard...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent px-5 py-28 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-white/50">Logged in as {email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="glass glass-hover flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="glass glass-hover relative block min-h-[165px] rounded-3xl p-6"
              >
                {card.title === "Messages" && unreadCount > 0 && (
                  <span className="absolute right-5 top-5 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                    {unreadCount} New
                  </span>
                )}

                <Icon size={30} className={card.color} />

                <h2 className="mt-5 text-xl font-semibold">{card.title}</h2>

                <p className="mt-2 max-w-xs text-sm leading-6 text-white/50">
                  {card.desc}
                </p>
              </Link>
            );
          })}

          {/* SERVICES FUTURE CARD */}
          <div className="glass glass-hover block min-h-[165px] rounded-3xl p-6 opacity-80">
            <Wrench size={30} className="text-orange-400" />
            <h2 className="mt-5 text-xl font-semibold">Services</h2>
            <p className="mt-2 max-w-xs text-sm leading-6 text-white/50">
              Manage services section later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}