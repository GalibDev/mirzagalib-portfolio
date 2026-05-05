"use client";

import { useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experienceData = [
  {
    title: "Frontend Developer",
    place: "Freelance / Company",
    year: "2022 - Present",
  },
  {
    title: "Backend Developer",
    place: "Startup",
    year: "2021 - 2022",
  },
];

const educationData = [
  {
    title: "SSC",
    place: "Your School",
    year: "2015 - 2017",
  },
  {
    title: "HSC",
    place: "Your College",
    year: "2017 - 2019",
  },
  {
    title: "BSc in CSE",
    place: "Your University",
    year: "2020 - 2024",
  },
];

export default function Qualification() {
  const [tab, setTab] = useState<"education" | "experience">("education");

  const data = tab === "education" ? educationData : experienceData;

  return (
    <section
      id="qualification"
      className="relative overflow-hidden bg-[#050816] px-6 py-28 text-white"
    >
      {/* glow bg */}
      <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold md:text-5xl">Qualification</h2>
        <p className="mt-2 text-sm text-white/50">My personal journey</p>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-8">
          <button
            onClick={() => setTab("experience")}
            className={`flex items-center gap-2 text-sm ${
              tab === "experience" ? "text-white" : "text-white/40"
            }`}
          >
            <Briefcase size={16} /> Experience
          </button>

          <button
            onClick={() => setTab("education")}
            className={`flex items-center gap-2 text-sm ${
              tab === "education" ? "text-white" : "text-white/40"
            }`}
          >
            <GraduationCap size={16} /> Education
          </button>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* center line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-white/20" />

          <div className="space-y-14">
            {data.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className="relative grid grid-cols-2 items-center"
                >
                  {/* left */}
                  <div
                    className={`${
                      isLeft ? "text-right pr-10" : "opacity-0"
                    }`}
                  >
                    {isLeft && (
                      <>
                        <h3 className="text-sm font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-xs text-white/50">
                          {item.place}
                        </p>
                        <span className="text-xs text-white/40">
                          {item.year}
                        </span>
                      </>
                    )}
                  </div>

                  {/* dot */}
                  <div className="relative flex justify-center">
                    <span className="h-3 w-3 rounded-full bg-white" />
                  </div>

                  {/* right */}
                  <div
                    className={`${
                      !isLeft ? "pl-10" : "opacity-0"
                    }`}
                  >
                    {!isLeft && (
                      <>
                        <h3 className="text-sm font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-xs text-white/50">
                          {item.place}
                        </p>
                        <span className="text-xs text-white/40">
                          {item.year}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}