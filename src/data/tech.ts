import type { Tech } from "@/types/tech";

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiDocker,
} from "react-icons/si";

import { FaAws } from "react-icons/fa";

export const techStack: Tech[] = [
  { name: "JavaScript", icon: SiJavascript, category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend" },
  { name: "React", icon: SiReact, category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },

  { name: "Node.js", icon: SiNodedotjs, category: "Backend" },
  { name: "Express", icon: SiExpress, category: "Backend" },
  { name: "NestJS", icon: SiNestjs, category: "Backend" },

  { name: "MongoDB", icon: SiMongodb, category: "Database" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database" },
  { name: "Prisma", icon: SiPrisma, category: "Database" },

  { name: "Git", icon: SiGit, category: "Tools" },
  { name: "Docker", icon: SiDocker, category: "Tools" },
  { name: "AWS", icon: FaAws, category: "Tools" },
];