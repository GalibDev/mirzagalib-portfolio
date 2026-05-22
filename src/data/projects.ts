import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "novalo-football-jersey-ecommerce",
    title: "NOVALO - Premium Football Jersey E-commerce",
    description:
      "A responsive football jersey ecommerce website with product browsing, modern UI, and order-focused user experience.",
    image: "/profile.jpg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    github: "https://github.com/GalibDev",
    live: "https://nivalo.xyz",
    challenges: [
      "Designing a clean product card layout that works well on both mobile and desktop.",
      "Keeping the shopping flow simple while maintaining a premium visual style.",
      "Handling product content, images, and responsive spacing without layout shift.",
    ],
    improvements: [
      "Add payment gateway integration and order tracking.",
      "Improve product filtering, search, and inventory management.",
      "Add customer reviews and a richer admin analytics dashboard.",
    ],
  },
  {
    id: "idea-vault",
    title: "IdeaVault",
    description:
      "A modern idea management web app where users can save, organize, and manage project ideas securely.",
    image: "/profile.jpg",
    tech: ["Next.js", "JavaScript", "Tailwind CSS", "Node.js"],
    github: "https://github.com/GalibDev/idea-vault-client",
    live: "https://idea-vault-client-sigma.vercel.app",
    challenges: [
      "Structuring client and server features so idea data stays organized and secure.",
      "Creating a simple workflow for saving, editing, and managing project ideas.",
      "Balancing dashboard usability with responsive design on smaller screens.",
    ],
    improvements: [
      "Add team collaboration and shared idea boards.",
      "Improve search, tags, and priority filters.",
      "Add richer activity history and notification features.",
    ],
  },
  {
    id: "gatrix-robotics",
    title: "Gatrix Robotics Website",
    description:
      "A polished robotics-focused website built to present services, technology, and brand information with a modern interface.",
    image: "/profile.jpg",
    tech: ["React", "Next.js", "Tailwind CSS", "Responsive UI"],
    github: "https://github.com/GalibDev",
    live: "https://gatrix.xyz",
    challenges: [
      "Creating a futuristic visual feel while keeping the website readable and professional.",
      "Making technical content easy to scan for different visitor types.",
      "Maintaining smooth responsive spacing across laptop, tablet, and mobile views.",
    ],
    improvements: [
      "Add case studies and more detailed robotics service pages.",
      "Improve SEO with more service-specific landing content.",
      "Add lead capture forms and analytics for visitor insights.",
    ],
  },
];
