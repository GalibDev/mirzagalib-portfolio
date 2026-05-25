import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Tech from "@/sections/Tech";
import Skills from "@/sections/Skills";
import Services from "@/sections/Services";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import Testimonials from "@/sections/Testimonials";

import Qualification from "@/sections/Qualification";
export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <Navbar />
      <Hero />
      <About />
      <Tech />
      <Skills />

      <Qualification />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
