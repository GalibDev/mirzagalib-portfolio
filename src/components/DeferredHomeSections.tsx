import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Projects from "@/sections/Projects";
import Qualification from "@/sections/Qualification";
import Services from "@/sections/Services";
import Skills from "@/sections/Skills";
import Tech from "@/sections/Tech";
import Testimonials from "@/sections/Testimonials";

export default function DeferredHomeSections() {
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
