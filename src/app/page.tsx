import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Tech from "@/sections/Tech";
import Services from "@/sections/Services";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Hero />
      <About />
      <Tech />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}