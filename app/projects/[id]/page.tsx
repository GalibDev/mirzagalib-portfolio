"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { projects as fallbackProjects } from "@/data/projects";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  challenges?: string[];
  improvements?: string[];
};

const defaultChallenges = [
  "Keeping the interface responsive and polished across mobile, tablet, and desktop screens.",
  "Structuring reusable components so the project can grow without messy duplication.",
  "Balancing visual design, performance, and clean user flow during development.",
];

const defaultImprovements = [
  "Add more analytics and admin controls for better project management.",
  "Improve accessibility, loading states, and empty-state feedback.",
  "Expand testing coverage and optimize deployment performance over time.",
];

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const displayedChallenges = project?.challenges?.length
    ? project.challenges
    : defaultChallenges;
  const displayedImprovements = project?.improvements?.length
    ? project.improvements
    : defaultImprovements;

  useEffect(() => {
    const loadProject = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("id", params.id)
        .single();

      const fallback = fallbackProjects.find((item) => item.id === params.id);
      setProject(data || fallback || null);
      setLoading(false);
    };

    if (params.id) {
      loadProject();
    }
  }, [params.id]);

  return (
    <main className="min-h-screen bg-transparent text-white">
      <Navbar />

      <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          {loading ? (
            <div className="glass rounded-3xl p-8 text-center text-sm text-white/60">
              Loading project details...
            </div>
          ) : !project ? (
            <div className="glass rounded-3xl p-8 text-center">
              <h1 className="text-2xl font-bold">Project not found</h1>
              <p className="mt-3 text-sm text-white/60">
                This project may have been removed or the link is incorrect.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="glass overflow-hidden rounded-3xl">
                {project.image ? (
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-white/10 text-white/45">
                    No Image
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-white/50">Project Details</p>
                <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                  {project.title}
                </h1>

                <p className="mt-5 text-sm leading-7 text-white/65">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm"
                    >
                      <ExternalLink size={15} /> Live Project
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm"
                    >
                      <FaGithub /> Client Repo
                    </a>
                  )}
                </div>
              </div>

              <div className="glass rounded-3xl p-6 sm:p-8 lg:col-span-2">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Challenges Faced
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-white/65">
                      {displayedChallenges.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      Future Improvements
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-white/65">
                      {displayedImprovements.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
