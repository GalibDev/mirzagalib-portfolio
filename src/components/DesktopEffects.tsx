"use client";

import { useEffect } from "react";

export default function DesktopEffects() {
  useEffect(() => {
    const supportsDesktopEffects = window.matchMedia(
      "(min-width: 768px) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!supportsDesktopEffects || prefersReducedMotion) return;

    let active = true;
    let rafId = 0;
    let cleanup = () => {};

    const setupEffects = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      if (!active) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      const cursorGlow = document.querySelector(".cursor-glow");
      const moveCursor = (event: MouseEvent) => {
        if (!cursorGlow) return;

        gsap.to(cursorGlow, {
          x: event.clientX - 150,
          y: event.clientY - 150,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      const handleClick = (event: MouseEvent) => {
        for (let i = 0; i < 6; i++) {
          const particle = document.createElement("span");

          particle.className = "click-particle";
          particle.style.left = `${event.clientX}px`;
          particle.style.top = `${event.clientY}px`;

          document.body.appendChild(particle);

          gsap.to(particle, {
            x: gsap.utils.random(-70, 70),
            y: gsap.utils.random(-70, 70),
            rotate: gsap.utils.random(0, 180),
            scale: 0,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            onComplete: () => particle.remove(),
          });
        }
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("click", handleClick);

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((section) => {
        const cards = section.querySelectorAll(".reveal-card");

        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
          }
        );

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
              },
            }
          );
        }
      });

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("click", handleClick);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        lenis.destroy();
      };
    };

    setupEffects();

    return () => {
      active = false;
      cleanup();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] hidden overflow-hidden md:block">
      <div className="cursor-glow fixed h-[300px] w-[300px] rounded-full bg-purple-500/25 blur-[100px]" />
    </div>
  );
}
