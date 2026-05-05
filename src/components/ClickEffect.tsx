"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function ClickEffect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("span");

        particle.className = "click-particle";
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;

        document.body.appendChild(particle);

        gsap.to(particle, {
          x: gsap.utils.random(-80, 80),
          y: gsap.utils.random(-80, 80),
          rotate: gsap.utils.random(0, 180),
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => particle.remove(),
        });
      }
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
}
