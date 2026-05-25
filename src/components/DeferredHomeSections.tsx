"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/sections/About"), { ssr: false });
const Tech = dynamic(() => import("@/sections/Tech"), { ssr: false });
const Skills = dynamic(() => import("@/sections/Skills"), { ssr: false });
const Qualification = dynamic(() => import("@/sections/Qualification"), {
  ssr: false,
});
const Services = dynamic(() => import("@/sections/Services"), { ssr: false });
const Projects = dynamic(() => import("@/sections/Projects"), { ssr: false });
const Testimonials = dynamic(() => import("@/sections/Testimonials"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/sections/Contact"), { ssr: false });

export default function DeferredHomeSections() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
      const frame = window.requestAnimationFrame(() => setReady(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const load = () => setReady(true);
    const timeout = window.setTimeout(load, 1400);

    window.addEventListener("scroll", load, { once: true, passive: true });
    window.addEventListener("touchstart", load, { once: true, passive: true });

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", load);
      window.removeEventListener("touchstart", load);
    };
  }, []);

  if (!ready) {
    return <div className="h-24" aria-hidden="true" />;
  }

  return (
    <>
      <About />
      <Tech />
      <Skills />
      <Qualification />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
}
