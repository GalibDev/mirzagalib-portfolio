"use client";

import { useEffect, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Qualification = {
  id: string;
  type: string;
  title: string;
  institution: string;
  duration: string;
  sort_order: number;
};

const fallbackItems: Qualification[] = [
  {
    id: "1",
    type: "education",
    title: "SSC",
    institution: "Shishu Niketon High School",
    duration: "2021 - 2022 | GPA 5.00",
    sort_order: 1,
  },
  {
    id: "2",
    type: "education",
    title: "HSC",
    institution: "Rangpur Model College, Rangpur",
    duration: "2023 - 2024 | GPA 5.00",
    sort_order: 2,
  },
  {
    id: "3",
    type: "education",
    title: "BSc in CSE",
    institution:
      "Shyamoli Engineering College, Affiliated with University of Dhaka",
    duration: "2024 - Present",
    sort_order: 3,
  },
  {
    id: "4",
    type: "experience",
    title: "Freelance Web Developer",
    institution: "Local clients and small business websites",
    duration: "2024 - Present",
    sort_order: 4,
  },
];

export default function Qualification() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "education"
  );
  const [items, setItems] = useState<Qualification[]>([]);

  useEffect(() => {
    const fetchQualifications = async () => {
      const { data } = await supabase
        .from("qualifications")
        .select("*")
        .order("sort_order", { ascending: true });

      setItems(data || []);
    };

    fetchQualifications();
  }, []);

  const allItems = items.length > 0 ? items : fallbackItems;
  const displayItems = allItems.filter((item) => item.type === activeTab);

  return (
    <section
      id="qualification"
      className="relative bg-transparent px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Qualification
        </h2>
        <p className="mt-3 text-sm text-white/50">My personal journey</p>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-3 sm:mb-14 sm:gap-6">
        <button
          type="button"
          onClick={() => setActiveTab("experience")}
          className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
            activeTab === "experience"
              ? "glass text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          <Briefcase size={18} />
          Experience
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("education")}
          className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
            activeTab === "education"
              ? "glass text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          <GraduationCap size={18} />
          Education
        </button>
      </div>

      <div className="relative mx-auto max-w-3xl">
        {displayItems.length === 0 ? (
          <div className="glass mx-auto max-w-md rounded-3xl p-6 text-center text-sm text-white/60 sm:p-8">
            No {activeTab} data found. Add it from the dashboard.
          </div>
        ) : (
          <>
            <div className="absolute left-4 top-0 h-full w-px bg-white/30 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-10 sm:space-y-14">
              {displayItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-2 md:gap-10"
                >
                  <div
                    className={
                      index % 2 === 0
                        ? "col-start-2 text-left md:col-start-1 md:pr-8 md:text-right"
                        : "col-start-2 text-left md:pl-8"
                    }
                  >
                    <h3 className="text-base font-bold sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-white/60">
                      {item.institution}
                    </p>

                    <p className="mt-2 text-sm text-white/50">
                      {item.duration}
                    </p>
                  </div>

                  <span className="absolute left-4 top-2 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] md:left-1/2" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
