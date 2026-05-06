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
    institution: "Your School",
    duration: "2015 - 2017",
    sort_order: 1,
  },
  {
    id: "2",
    type: "education",
    title: "HSC",
    institution: "Your College",
    duration: "2017 - 2019",
    sort_order: 2,
  },
  {
    id: "3",
    type: "education",
    title: "BSc in CSE",
    institution: "Your University",
    duration: "2020 - 2024",
    sort_order: 3,
  },
];

export default function Qualification() {
  // =========================
  // 01. ACTIVE TAB
  // Experience / Education click korle change hobe
  // =========================
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "education"
  );

  // =========================
  // 02. QUALIFICATION DATA
  // Dashboard theke data load hobe
  // =========================
  const [items, setItems] = useState<Qualification[]>([]);

  // =========================
  // 03. LOAD DATA FROM SUPABASE
  // =========================
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

  // =========================
  // 04. DATA FILTER
  // activeTab onujayi only experience/education show korbe
  // =========================
  const allItems = items.length > 0 ? items : fallbackItems;

  const displayItems = allItems.filter((item) => item.type === activeTab);

  return (
    <section
      id="qualification"
      className="relative bg-transparent px-6 py-28 text-white"
    >
      {/* =========================
          05. SECTION TITLE
      ========================= */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">Qualification</h2>
        <p className="mt-3 text-sm text-white/50">My personal journey</p>
      </div>

      {/* =========================
          06. TAB BUTTONS
          ekhane click korle Experience/Education change hobe
      ========================= */}
      <div className="mb-14 flex justify-center gap-6">
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

      {/* =========================
          07. TIMELINE
      ========================= */}
      <div className="relative mx-auto max-w-3xl">
        {displayItems.length === 0 ? (
          <div className="glass mx-auto max-w-md rounded-3xl p-8 text-center text-sm text-white/60">
            No {activeTab} data found. Dashboard থেকে add করো।
          </div>
        ) : (
          <>
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />

            <div className="space-y-14">
              {displayItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative grid grid-cols-2 gap-10"
                >
                  {/* left/right alternating content */}
                  <div
                    className={
                      index % 2 === 0
                        ? "pr-8 text-right"
                        : "col-start-2 pl-8 text-left"
                    }
                  >
                    <h3 className="text-lg font-bold">{item.title}</h3>

                    <p className="mt-1 text-sm text-white/60">
                      {item.institution}
                    </p>

                    <p className="mt-2 text-sm text-white/50">
                      {item.duration}
                    </p>
                  </div>

                  {/* timeline dot */}
                  <span className="absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}