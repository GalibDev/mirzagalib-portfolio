"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const moveCursor = (e: MouseEvent) => {
      gsap.to(".cursor-glow", {
        x: e.clientX - 150,
        y: e.clientY - 150,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    gsap.fromTo(
      ".hero-left",
      { opacity: 0, x: -120 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
      }
    );

    gsap.fromTo(
      ".hero-right",
      { opacity: 0, x: 120 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.25,
      }
    );

    gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="cursor-glow fixed h-[300px] w-[300px] rounded-full bg-purple-500/25 blur-[100px]" />
    </div>
  );
}