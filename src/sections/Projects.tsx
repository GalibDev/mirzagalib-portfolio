import { ExternalLink, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPublicProjects } from "@/lib/public-data";

export default async function Projects() {
  const projects = await getPublicProjects();

  return (
    <section
      id="projects"
      className="relative bg-transparent px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Projects</h2>
          <p className="mt-3 text-sm text-white/50">Recent Projects</p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-sm text-white/50">
            No projects found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass glass-hover overflow-hidden rounded-3xl"
              >
                {project.image ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-white/10 text-white/40">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-lg font-semibold">{project.title}</h3>

                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/60">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech?.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/projects/${project.id}`}
                      className="glass flex items-center gap-2 rounded-xl px-4 py-2 text-xs hover:bg-white/10"
                    >
                      <Info size={14} /> View Details
                    </Link>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        className="glass flex items-center gap-2 rounded-xl px-4 py-2 text-xs hover:bg-white/10"
                      >
                        <span className="text-[10px] font-bold">GH</span> GitHub
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        className="glass flex items-center gap-2 rounded-xl px-4 py-2 text-xs hover:bg-white/10"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
