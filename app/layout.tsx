import type { Metadata } from "next";
import "./globals.css";
import MouseGlow from "@/components/MouseGlow";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://mirzagalib.xyz"),
  title: {
    default: "Mirza Galib | Full Stack Developer",
    template: "%s | Mirza Galib",
  },
  description:
    "Portfolio of Mirza Galib, a full stack developer building responsive, scalable, and user-focused web applications with React, Next.js, TypeScript, and Node.js.",
  keywords: [
    "Mirza Galib",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Portfolio",
    "Dhaka developer",
  ],
  authors: [{ name: "Mirza Galib" }],
  creator: "Mirza Galib",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mirza Galib | Full Stack Developer",
    description:
      "Explore Mirza Galib's portfolio, projects, skills, and contact details for modern web development work.",
    url: "/",
    siteName: "Mirza Galib Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Mirza Galib",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirza Galib | Full Stack Developer",
    description:
      "Full stack developer portfolio featuring React, Next.js, TypeScript, and Node.js projects.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative overflow-x-hidden bg-transparent text-white">
        <SmoothScroll />
        <MouseGlow />

        <div className="stars fixed inset-0 z-0 pointer-events-none" />
        <div className="particles pointer-events-none" />
        <div className="shooting-star pointer-events-none" />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
