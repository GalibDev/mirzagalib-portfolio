import "server-only";

import { unstable_cache } from "next/cache";
import { projects as fallbackProjects } from "@/data/projects";
import { supabaseServer } from "@/lib/supabase-server";
import type {
  HeroContent,
  HeroStat,
  QualificationItem,
  Review,
  TestimonialsContent,
} from "@/types/public-content";
import type { Project } from "@/types/project";

const fallbackHeroStats: HeroStat[] = [
  {
    id: "1",
    value: "3",
    label: "Year of",
    sub_label: "Experience",
    sort_order: 1,
  },
  {
    id: "2",
    value: "120",
    label: "Problem",
    sub_label: "Solving",
    sort_order: 2,
  },
  {
    id: "3",
    value: "150",
    label: "Finished",
    sub_label: "Projects",
    sort_order: 3,
  },
];

export const fallbackQualifications: QualificationItem[] = [
  {
    id: "1",
    type: "education",
    title: "SSC",
    institution: "Shishu Niketon High School",
    duration: "2021 - 2022 | GPA 5.00",
    sort_order: 1,
  },
  {
    id: "2",
    type: "education",
    title: "HSC",
    institution: "Rangpur Model College, Rangpur",
    duration: "2023 - 2024 | GPA 5.00",
    sort_order: 2,
  },
  {
    id: "3",
    type: "education",
    title: "BSc in CSE",
    institution:
      "Shyamoli Engineering College, Affiliated with University of Dhaka",
    duration: "2024 - Present",
    sort_order: 3,
  },
  {
    id: "4",
    type: "experience",
    title: "Freelance Web Developer",
    institution: "Local clients and small business websites",
    duration: "2024 - Present",
    sort_order: 4,
  },
];

export const fallbackReviews: Review[] = [
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

export const getHeroContent = unstable_cache(
  async (): Promise<HeroContent> => {
    const [{ data: nameData }, { data: imageData }, { data: statsData }] =
      await Promise.all([
        supabaseServer
          .from("site_settings")
          .select("value")
          .eq("key", "hero_name")
          .single(),
        supabaseServer
          .from("site_assets")
          .select("image")
          .eq("key", "hero_profile")
          .single(),
        supabaseServer
          .from("hero_stats")
          .select("id,label,sub_label,value,sort_order")
          .order("sort_order", { ascending: true })
          .limit(3),
      ]);

    return {
      name: nameData?.value || "Mirza Galib",
      image: imageData?.image || "",
      stats: statsData?.length ? statsData : fallbackHeroStats,
    };
  },
  ["public-hero-content"],
  { revalidate: 300, tags: ["public-content"] }
);

export const getPublicProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const { data, error } = await supabaseServer
      .from("projects")
      .select("id,title,description,image,tech,github,live")
      .order("created_at", { ascending: false })
      .limit(6);

    return !error && data?.length ? data : fallbackProjects;
  },
  ["public-projects"],
  { revalidate: 300, tags: ["public-content", "projects"] }
);

export const getProjectById = unstable_cache(
  async (id: string): Promise<Project | null> => {
    const { data } = await supabaseServer
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    const fallback = fallbackProjects.find((item) => item.id === id);

    return data || fallback || null;
  },
  ["public-project-by-id"],
  { revalidate: 300, tags: ["public-content", "projects"] }
);

export const getAboutImage = unstable_cache(
  async (): Promise<string> => {
    const { data, error } = await supabaseServer
      .from("site_assets")
      .select("image")
      .eq("key", "about_image")
      .single();

    return !error && data?.image ? data.image : "";
  },
  ["public-about-image"],
  { revalidate: 300, tags: ["public-content"] }
);

export const getQualifications = unstable_cache(
  async (): Promise<QualificationItem[]> => {
    const { data } = await supabaseServer
      .from("qualifications")
      .select("id,type,title,institution,duration,sort_order")
      .order("sort_order", { ascending: true });

    return data?.length ? data : fallbackQualifications;
  },
  ["public-qualifications"],
  { revalidate: 300, tags: ["public-content", "qualifications"] }
);

export const getTestimonials = unstable_cache(
  async (): Promise<TestimonialsContent> => {
    const [{ data: titleData }, { data: reviewData }] = await Promise.all([
      supabaseServer
        .from("site_settings")
        .select("value")
        .eq("key", "testimonial_title")
        .single(),
      supabaseServer
        .from("reviews")
        .select("id,name,email,rating,message,project_link,relation")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(3),
    ]);

    return {
      title: titleData?.value || "Community Feedback",
      reviews: reviewData?.length ? reviewData : fallbackReviews,
    };
  },
  ["public-testimonials"],
  { revalidate: 300, tags: ["public-content", "reviews"] }
);
