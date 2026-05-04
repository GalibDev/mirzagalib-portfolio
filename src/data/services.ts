import type { Service } from "@/types/service";
import { FiCode, FiLayers, FiServer, FiUploadCloud } from "react-icons/fi";

export const services: Service[] = [
  {
    title: "Full Stack Development",
    description: "Complete web apps with frontend, backend, database, and auth.",
    icon: FiLayers,
  },
  {
    title: "Frontend Development",
    description: "Responsive, modern, and animated interfaces with React and Next.js.",
    icon: FiCode,
  },
  {
    title: "Backend & API",
    description: "Secure REST APIs, authentication, database design, and server logic.",
    icon: FiServer,
  },
  {
    title: "Deployment",
    description: "Deploying apps with Vercel, Docker, and cloud-ready workflows.",
    icon: FiUploadCloud,
  },
];