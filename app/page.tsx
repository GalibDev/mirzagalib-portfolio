import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeferredHomeSections from "@/components/DeferredHomeSections";
import Hero from "@/sections/Hero";
import {
  absoluteUrl,
  displayName,
  personName,
  profileImage,
  siteDescription,
  siteTitle,
  socialLinks,
} from "@/lib/seo";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: personName,
      alternateName: [displayName, "Mirza Galib Palash", "GalibDev"],
      url: absoluteUrl("/"),
      image: profileImage,
      jobTitle: "MERN Stack Developer",
      description: siteDescription,
      email: "mirza.galib.palash@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "Full Stack Web Development",
      ],
      sameAs: [socialLinks.linkedin, socialLinks.github],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: `${personName} Portfolio`,
      alternateName: `${displayName} Portfolio`,
      description: siteDescription,
      publisher: {
        "@id": absoluteUrl("/#person"),
      },
    },
    {
      "@type": "ProfilePage",
      "@id": absoluteUrl("/#profile-page"),
      url: absoluteUrl("/"),
      name: siteTitle,
      description: siteDescription,
      mainEntity: {
        "@id": absoluteUrl("/#person"),
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <Hero />
      <DeferredHomeSections />
      <Footer />
    </main>
  );
}
