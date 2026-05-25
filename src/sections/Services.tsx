"use client";

import { useState } from "react";
import {
  Code2,
  Server,
  PenTool,
  Smartphone,
  MonitorCog,
  Database,
  X,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    icon: Code2,
    details: [
      "Modern responsive UI development",
      "React, Next.js, TypeScript based frontend",
      "Smooth animations and clean user experience",
      "Pixel-perfect design implementation",
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    details: [
      "REST API development",
      "Authentication and authorization",
      "Server-side business logic",
      "Secure backend architecture",
    ],
  },
  {
    title: "Full Stack Development",
    icon: PenTool,
    details: [
      "Complete frontend and backend solution",
      "Database integration and API connection",
      "Authentication, dashboard, and deployment",
      "End-to-end production-ready web app",
    ],
  },
  {
    title: "Mobile Hybrid App Development",
    icon: Smartphone,
    details: [
      "Responsive mobile-first interfaces",
      "Hybrid app UI structure",
      "Cross-device optimized experience",
      "Clean navigation and app-like feel",
    ],
  },
  {
    title: "Prototype Development",
    icon: MonitorCog,
    details: [
      "Fast MVP and prototype building",
      "Interactive UI prototype",
      "Idea validation with functional demo",
      "Clean structure for future scaling",
    ],
  },
  {
    title: "API Development",
    icon: Database,
    details: [
      "Custom API design and development",
      "Database connection and data flow",
      "Secure endpoints and validation",
      "Testing and deployment support",
    ],
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<(typeof services)[0] | null>(
    null
  );

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-transparent px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="reveal mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Services</h2>
          <p className="mt-3 text-sm text-white/50">What I offer</p>
        </div>

        <div className="grid justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <button
                key={service.title}
                onClick={() => setActiveService(service)}
                className="reveal-card glass glass-hover h-[210px] w-full rounded-3xl p-6 text-left sm:h-[230px] sm:max-w-[230px] sm:p-7"
              >
                <Icon className="mb-10" size={30} />

                <h3 className="text-lg font-semibold leading-snug">
                  {service.title}
                </h3>

                <p className="mt-6 text-xs text-white/70">View More</p>
              </button>
            );
          })}
        </div>
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm sm:px-6">
          <div className="absolute inset-0" onClick={() => setActiveService(null)} />

          <div className="glass relative z-10 w-full max-w-md rounded-3xl p-8 text-center">
            <button
              onClick={() => setActiveService(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold">{activeService.title}</h3>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/60">
              Creating clean, scalable and user-friendly solutions with modern
              technologies.
            </p>

            <div className="mt-7 space-y-4 text-left">
              {activeService.details.map((detail) => (
                <div key={detail} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 text-white/70" size={16} />
                  <p className="text-sm text-white/70">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
