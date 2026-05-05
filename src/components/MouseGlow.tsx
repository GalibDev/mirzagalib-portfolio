"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="mouse-glow"
      style={{
        left: `${pos.x - 150}px`,
        top: `${pos.y - 150}px`,
      }}
    />
  );
}