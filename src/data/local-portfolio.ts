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
    id: "fundora",
    title: "Fundora - Crowdfunding Platform",
    description:
      "A full-stack crowdfunding platform where supporters fund campaigns with Stripe-powered credits, creators manage campaigns and withdrawals, and administrators moderate users, payments, reports, and approvals.",
    image: "/project-images/fundora.svg",
    tech: ["Next.js", "TypeScript", "Express.js", "MongoDB", "Stripe"],
    github: "https://github.com/GalibDev/Fundora",
    live: "https://fundora-hazel.vercel.app",
    challenges: [
      "Designing secure role-aware workflows for supporters, creators, and administrators.",
      "Keeping Stripe Checkout, signed webhooks, credit balances, refunds, and withdrawals consistent.",
      "Coordinating the separate Next.js client and Express API across Vercel and Render deployments.",
    ],
    improvements: [
      "Add recurring donations and more flexible campaign funding models.",
      "Expand creator analytics with conversion, retention, and funding-source insights.",
      "Add automated fraud signals and stronger moderation tools for campaigns and transactions.",
    ],
  },
  {
    id: "jersey-shop",
    title: "NOVALO Jersey Store",
    description:
      "A responsive football jersey e-commerce application with product discovery, cart, wishlist, checkout, order tracking, customer accounts, and a protected admin dashboard for complete store management.",
    image:
      "https://raw.githubusercontent.com/GalibDev/jersey-shop/main/public/products/argentina.jpg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Zustand"],
    github: "https://github.com/GalibDev/jersey-shop",
    live: "https://www.novalo.xyz",
    challenges: [
      "Keeping cart and wishlist state predictable across product, checkout, and account flows.",
      "Building secure customer and admin authentication around Supabase data and storage.",
      "Creating responsive product galleries, quick views, size selection, and order tracking for small screens.",
    ],
    improvements: [
      "Add a production payment gateway with verified payment and refund handling.",
      "Introduce inventory alerts, discount campaigns, and advanced product filtering.",
      "Expand sales analytics and automate customer order-status notifications.",
    ],
  },
  {
    id: "gatrix",
    title: "GATRIX - Robotics Club Platform",
    description:
      "A modern robotics club platform for publishing projects, team profiles, achievements, galleries, notices, AI FAQs, and community updates through a CMS-driven administration dashboard.",
    image:
      "https://raw.githubusercontent.com/GalibDev/gatrix/main/src/assets/group1.jpeg",
    tech: ["React 19", "Vite", "Tailwind CSS", "Supabase", "Framer Motion"],
    github: "https://github.com/GalibDev/gatrix",
    live: "https://gatrix.xyz",
    challenges: [
      "Turning many content types into a consistent CMS without making the admin workflow confusing.",
      "Balancing motion-heavy robotics visuals with fast loading and accessible responsive layouts.",
      "Managing authentication, database content, media storage, contact messages, and notices through Supabase.",
    ],
    improvements: [
      "Add event registration, attendance tracking, and member-specific dashboards.",
      "Introduce richer project case studies with technical documents and progress timelines.",
      "Improve media delivery with automated image optimization and gallery categorization.",
    ],
  },
  {
    id: "recipehub-client",
    title: "RecipeHub - Recipe Sharing Platform",
    description:
      "A full-stack recipe sharing platform with recipe publishing, favorites, purchases, Stripe Checkout, Google sign-in, protected user dashboards, and administrator moderation tools.",
    image: "/project-images/recipehub.svg",
    tech: ["Next.js", "TypeScript", "MongoDB", "Better Auth", "Stripe"],
    github: "https://github.com/GalibDev/recipehub-client",
    live: "https://recipehub-client-seven.vercel.app",
    challenges: [
      "Combining Google sign-in with secure HTTP-only JWT sessions and reload-safe route protection.",
      "Implementing recipe CRUD, favorites, reports, purchases, and moderation in one coherent data model.",
      "Handling Stripe confirmation and server-side filtering and pagination without disrupting the browsing experience.",
    ],
    improvements: [
      "Add nutritional analysis, serving-size calculations, and ingredient-based search.",
      "Introduce creator profiles, following, collections, and personalized recipe recommendations.",
      "Add image moderation and richer cooking steps with video support.",
    ],
  },
  {
    id: "flightops-client",
    title: "FlightOps - Airline Operations Platform",
    description:
      "A full-stack airline operations and flight discovery platform where travellers search and book flights, operators manage listings, and administrators control approvals, users, payments, messages, and audit activity.",
    image:
      "https://raw.githubusercontent.com/GalibDev/flightops-client/main/docs/screenshots/home.png",
    tech: ["Next.js 16", "TypeScript", "MongoDB", "Stripe", "Recharts"],
    github: "https://github.com/GalibDev/flightops-client",
    live: "https://flightops-client.vercel.app",
    challenges: [
      "Modeling flights, approvals, bookings, payments, messages, and audit logs with clear role boundaries.",
      "Synchronizing seat reservations with Stripe Checkout and signed webhook results.",
      "Building detailed search, filtering, pagination, charts, and an AI travel assistant without overwhelming the interface.",
    ],
    improvements: [
      "Add real-time seat maps, fare classes, and reservation-hold expiration.",
      "Integrate external flight-status data and operational disruption notifications.",
      "Expand operator analytics with route performance, load factor, and revenue reporting.",
    ],
  },
  {
    id: "intellihub-ai",
    title: "IntelliHub AI - Agentic SaaS Workspace",
    description:
      "An agentic AI SaaS workspace for discovering AI tools, context-aware chat, explainable recommendations, content generation, document analysis, favorites, reviews, and analytics.",
    image:
      "https://raw.githubusercontent.com/GalibDev/intellihub-ai/main/docs/screenshots/home.jpg",
    tech: ["Next.js", "TypeScript", "Express.js", "MongoDB", "Gemini AI"],
    github: "https://github.com/GalibDev/intellihub-ai",
    live: "https://intellihub-ai-client.vercel.app",
    challenges: [
      "Keeping AI provider credentials and document processing server-side while supporting responsive streaming-like interactions.",
      "Designing context-aware conversations, recommendations, content generation, and document analysis as consistent workflows.",
      "Securing a separate Next.js client and Express API with rotating JWT sessions, validation, rate limits, and role checks.",
    ],
    improvements: [
      "Add provider fallback, usage budgets, observability, and per-feature token analytics.",
      "Support collaborative workspaces with shared conversations, documents, and generated assets.",
      "Introduce semantic search and retrieval across saved tools, documents, and conversation history.",
    ],
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
