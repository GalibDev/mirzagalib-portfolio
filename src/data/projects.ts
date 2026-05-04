import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Google Docs Clone",
    description:
      "A real-time collaborative document editor with authentication, sharing, and live editing features.",
    image: "/projects/google-docs.png",
    tech: ["Next.js", "TypeScript", "Socket.io", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    title: "Notion Clone",
    description:
      "A productivity workspace with document pages, editor features, and clean dashboard UI.",
    image: "/projects/notion.png",
    tech: ["React", "Node.js", "Prisma", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    title: "YouTube Clone",
    description:
      "A video sharing platform UI with authentication, channel pages, and responsive layout.",
    image: "/projects/youtube.png",
    tech: ["Next.js", "Tailwind", "API", "Auth"],
    github: "#",
    live: "#",
  },
];