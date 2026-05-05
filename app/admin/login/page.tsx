"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-transparent px-6 text-white">
      <div className="glass w-full max-w-md rounded-3xl p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Lock size={24} />
          </div>

          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-white/50">
            Login to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
            <Mail size={18} className="text-white/50" />
            <input
              type="email"
              placeholder="Enter Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
            />
          </div>

          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
            <Lock size={18} className="text-white/50" />

            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-white/60 hover:text-white"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="glass glass-hover w-full rounded-2xl px-5 py-4 text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}