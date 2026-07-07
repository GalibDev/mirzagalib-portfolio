import type { Metadata } from "next";
import "./globals.css";
import DesktopEffects from "@/components/DesktopEffects";
import {
  displayName,
  personName,
  profileImage,
  seoKeywords,
  siteDescription,
  siteTitle,
  siteUrl,
  socialLinks,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${displayName}`,
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: personName, url: siteUrl }],
  creator: personName,
  publisher: personName,
  applicationName: `${displayName} Portfolio`,
  category: "portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: `${personName} Portfolio`,
    images: [
      {
        url: profileImage,
        width: 1200,
        height: 630,
        alt: `${personName} - MERN Stack Developer`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [profileImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "profile:first_name": "Mirza",
    "profile:last_name": "Galib Palash",
    "article:author": socialLinks.linkedin,
    "og:see_also": [socialLinks.linkedin, socialLinks.github],
    "google-site-verification": "MixbFmWfM-djtkN7Q2-ei2IqzqWUFP9GTE-EwpDEVjs",
    "msapplication-TileColor": "#020617",
    "theme-color": "#020617",
    "contact:email": "mirza.galib.palash@gmail.com",
    "portfolio:location": "Dhaka, Bangladesh",
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
        <DesktopEffects />

        <div className="stars fixed inset-0 z-0 pointer-events-none" />
        <div className="particles pointer-events-none" />
        <div className="shooting-star pointer-events-none" />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
