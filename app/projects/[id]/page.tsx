import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectById } from "@/lib/public-data";
import { absoluteUrl, displayName, personName } from "@/lib/seo";
import { localProjects } from "@/data/local-portfolio";

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

type ProjectDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return localProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${project.title} by ${displayName}`;
  const description = `${project.description.slice(0, 155)}${
    project.description.length > 155 ? "..." : ""
  }`;
  const url = absoluteUrl(`/projects/${project.id}`);
  const images = project.image
    ? [
        {
          url: project.image,
          alt: `${project.title} project by ${personName}`,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: `${personName} Portfolio`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);
  const displayedChallenges = project?.challenges?.length
    ? project.challenges
    : defaultChallenges;
  const displayedImprovements = project?.improvements?.length
    ? project.improvements
    : defaultImprovements;
  const projectStructuredData = project
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": absoluteUrl(`/projects/${project.id}#project`),
        name: project.title,
        description: project.description,
        image: project.image || undefined,
        url: absoluteUrl(`/projects/${project.id}`),
        creator: {
          "@type": "Person",
          name: personName,
          url: absoluteUrl("/"),
        },
        keywords: project.tech.join(", "),
        codeRepository: project.github || undefined,
        sameAs: project.live || undefined,
      }
    : null;

  return (
    <main className="min-h-screen bg-transparent text-white">
      {projectStructuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectStructuredData),
          }}
        />
      )}
      <Navbar />

      <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          {!project ? (
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
                      <span className="text-[10px] font-bold">GH</span> Client
                      Repo
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
