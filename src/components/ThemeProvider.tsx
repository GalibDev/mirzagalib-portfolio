"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div data-theme={theme}>
      {children}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed right-6 top-6 z-50 rounded-full border border-white/10 bg-black/40 p-3 text-white backdrop-blur-xl"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}