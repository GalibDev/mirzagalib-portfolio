import { FaAws } from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import type { Tech } from "@/types/tech";

export const techStack: Tech[] = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", icon: SiPrisma, color: "#FFFFFF" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
];
