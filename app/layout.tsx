import type { Metadata } from "next";
import "./globals.css";
import MouseGlow from "@/components/MouseGlow";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Mirza Galib | Portfolio",
  description: "Modern developer portfolio",
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
        
        <div className="stars" />
<div className="particles" />
<div className="shooting-star" />
        
        
        
        
        
        <div className="stars fixed inset-0 z-0 pointer-events-none" />
         <div className="shooting-star" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}