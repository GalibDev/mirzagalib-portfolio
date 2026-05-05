"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const PROJECTS_PER_PAGE = 6;

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#050816] px-6 py-28 text-white"
    >
      <div className="reveal mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Projects</h2>
          <p className="mt-3 text-sm text-white/50">Recent Projects</p>
        </div>

        <div className="grid justify-items-center gap-7 md:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project) => (
            <article
              key={project.title}
              className="reveal-card glass glass-hover w-full max-w-[300px] overflow-hidden rounded-3xl"
            >
              <div className="h-44 overflow-hidden bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold leading-snug">
                  {project.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-xs leading-5 text-white/55">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
                  >
                    <FaGithub size={14} /> GitHub
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs text-white transition hover:bg-blue-500"
                  >
                    <FiExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:bg-white/20 disabled:opacity-40"
            >
              ← PREV
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-full text-xs transition ${
                    currentPage === page
                      ? "bg-white text-black"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:bg-white/20 disabled:opacity-40"
            >
              NEXT →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}