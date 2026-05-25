import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeferredHomeSections from "@/components/DeferredHomeSections";
import Hero from "@/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <Navbar />
      <Hero />
      <DeferredHomeSections />
      <Footer />
    </main>
  );
}
