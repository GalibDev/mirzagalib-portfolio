import type { Project } from "@/types/project";
import type {
  HeroContent,
  QualificationItem,
  Review,
  TestimonialsContent,
} from "@/types/public-content";

export const localHeroContent: HeroContent = {
  name: "Mirza Galib",
  image:
    "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/site-assets/hero_profile/1779474917792-ut7u097ik2.jpg",
  stats: [
    {
      id: "494e9ab9-3fe9-484e-829e-a702f02cd5c0",
      label: "Year of Experience",
      sub_label: "",
      value: "1+",
      sort_order: 1,
    },
    {
      id: "a729a485-d278-465f-a832-8a263a822aac",
      label: "Problems Solved",
      sub_label: "",
      value: "100+",
      sort_order: 2,
    },
    {
      id: "5284161e-dd88-410d-adba-15bd5cdb9841",
      label: "Finished Projects",
      sub_label: "",
      value: "50+",
      sort_order: 3,
    },
  ],
};

export const localAboutImage =
  "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/site-assets/about_image/1778062312177-1f0gxi0y0h.jpeg";

export const localProjects: Project[] = [
  {
    id: "c24e478e-b5f6-4abd-bb8f-f7c8465cd69c",
    title: "GitHub Issues Tracker",
    description:
      "Developed a GitHub Issues Tracker web application that enables users to search repositories, view issue details, filter issues by status, and manage issue tracking efficiently using the GitHub API.",
    image:
      "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/project-images/projects/1779476442326-qsw51oa9xy.png",
    tech: ["HTML", "CSS", "JavaScript", "GitHub API", "GitHub Pages"],
    github: "https://github.com/GalibDev/github-issue-tracker",
    live: "https://galibdev.github.io/github-issue-tracker",
  },
  {
    id: "94931af6-8ae8-4806-8bf8-7939ca2430a1",
    title: "GATRIX - Robotics Group Showcase Website",
    description:
      "Designed and developed a modern robotics team showcase platform featuring project highlights, team introductions, achievements, gallery sections, multilingual support, and responsive UI design for an engaging user experience.",
    image:
      "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/project-images/projects/1779475928420-7zqo5vygost.png",
    tech: [
      "React.js",
      "Tailwind CSS",
      "JavaScript",
      "Responsive Design",
      "Firebase",
    ],
    github: "https://github.com/GalibDev",
    live: "https://gatrix.xyz",
  },
  {
    id: "21abd595-54c0-446a-9ddd-7f2399539d09",
    title: "KeenKeeper - Personal Relationship Management App",
    description:
      "KeenKeeper is a modern React-based web application designed to manage and track personal relationships efficiently. It helps users organize contacts, monitor interactions, and analyze engagement patterns through a clean and user-friendly interface.",
    image:
      "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/project-images/projects/1779475363524-ehgnocidx49.png",
    tech: ["React", "React Router", "Vite", "Tailwind CSS", "Recharts"],
    github: "https://github.com/GalibDev/keen-keeper",
    live: "https://voluble-dasik-5510bd.netlify.app/",
  },
  {
    id: "1489c255-98b6-450e-bfd6-fa6ec33b840f",
    title: "Digital Products Marketplace",
    description:
      "Developed a responsive digital marketplace for selling AI tools and digital products with product listings, cart management, pricing plans, and modern UI/UX using Next.js and Tailwind CSS.",
    image:
      "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/project-images/projects/1779472484788-u7xahth4r2i.png",
    tech: [
      "React.js",
      "Tailwind CSS",
      "DaisyUI",
      "JavaScript",
      "React Toastify",
    ],
    github: "https://github.com/GalibDev/digitools",
    live: "https://scintillating-centaur-93eafb.netlify.app/",
  },
  {
    id: "c0dc91f3-3b69-4e46-ba8e-cdbb8fcacfee",
    title: "NOVALO - Premium Football Jersey E-commerce Website",
    description:
      "Built a modern and responsive football jersey e-commerce website for a client. Developed complete frontend UI and backend integration including product showcase, promotional banners, cart system, mobile responsive navigation, and admin project management features. Focused on clean user experience, fast performance, and modern design aesthetics using Next.js and TypeScript.",
    image:
      "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/project-images/projects/1779464920578-7k8aq86gfbx.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    github: "https://github.com/GalibDev",
    live: "https://novalo.xyz",
  },
  {
    id: "a802cabf-6809-4519-8e0d-c0c79569ceea",
    title: "IdeaVault",
    description:
      "IdeaVault is a modern idea management web app where users can save, organize, and manage their project ideas in one secure place. It includes authentication, a clean dashboard, responsive UI, and database-powered idea storage for fast access across devices.",
    image:
      "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/project-images/projects/1779389747910-beuags1ut3v.png",
    tech: ["Next.js", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/GalibDev/idea-vault-client",
    live: "https://idea-vault-client-sigma.vercel.app",
  },
];

export const localQualifications: QualificationItem[] = [
  {
    id: "03931cb5-71e9-4cbb-8dc6-294bc2173ea2",
    type: "experience",
    title: "Web Developer",
    institution: "Personal & Client Projects",
    duration: "2024 - Present",
    sort_order: 0,
  },
  {
    id: "fc7f7625-7b60-4ff0-b84e-9715526dd34c",
    type: "education",
    title: "SSC",
    institution: "Shishu Niketon High School",
    duration: "2021-2022",
    sort_order: 1,
  },
  {
    id: "3e1ff108-835d-4306-92e4-d81a608c0e0b",
    type: "education",
    title: "HSC",
    institution: "Rangpur Model College, Rangpur",
    duration: "2023-2024",
    sort_order: 2,
  },
  {
    id: "f836f876-1652-466f-b00e-22216e720ebd",
    type: "experience",
    title: "Full Stack Developer",
    institution: "Personal & Client Projects",
    duration: "2024 - Present",
    sort_order: 2,
  },
  {
    id: "05fd5b33-da8d-4774-84c0-fcf40e2e8027",
    type: "experience",
    title: "MERN Stack Developer",
    institution: "MongoDB, Express, React, Node.js",
    duration: "2025 - Present",
    sort_order: 2,
  },
  {
    id: "ffc00457-46d7-49d1-b548-aae3b69c258b",
    type: "education",
    title: "BSc in CSE",
    institution: "Shyamoli Engineering College Affiliated with University of Dhaka",
    duration: "2024-Present",
    sort_order: 3,
  },
];

export const localReviews: Review[] = [
  {
    id: "fallback-1",
    name: "Tanvir Ahmed",
    email: "",
    relation: "Teammate",
    rating: 5,
    message: "Clean UI and smooth user experience. Design sense is really good.",
    project_link: null,
  },
  {
    id: "fallback-2",
    name: "Arafat Hossain",
    email: "",
    relation: "Friend",
    rating: 5,
    message: "Fast delivery and good communication. The website looks modern.",
    project_link: null,
  },
  {
    id: "fallback-3",
    name: "Sabbir Hasan",
    email: "",
    relation: "Collaborator",
    rating: 5,
    message: "Strong React and Next.js skills with creative design thinking.",
    project_link: null,
  },
];

export const localTestimonials: TestimonialsContent = {
  title: "Community Feedback",
  reviews: localReviews,
};
