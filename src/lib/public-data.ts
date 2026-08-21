import "server-only";

import { unstable_cache } from "next/cache";
import {
  localAboutImage,
  localHeroContent,
  localProjects,
  localQualifications,
  localTestimonials,
} from "@/data/local-portfolio";
import { supabaseServer } from "@/lib/supabase-server";
import type {
  HeroContent,
  QualificationItem,
  TestimonialsContent,
} from "@/types/public-content";
import type { Project } from "@/types/project";

const includeSupabaseExtras = process.env.SUPABASE_PUBLIC_EXTRAS === "true";
const portfolioProjectsKey = "portfolio_projects";
const resumeUrlKey = "resume_url";

export const getResumeUrl = unstable_cache(
  async (): Promise<string> => {
    const { data } = await supabaseServer
      .from("site_settings")
      .select("value")
      .eq("key", resumeUrlKey)
      .maybeSingle();

    return typeof data?.value === "string" && data.value.trim()
      ? data.value
      : "/resume.pdf";
  },
  ["public-resume-url"],
  { revalidate: 300, tags: ["public-content", "resume"] }
);

function parseSavedProjects(value: unknown): Project[] | null {
  if (typeof value !== "string") return null;

  try {
    const projects = JSON.parse(value);
    return Array.isArray(projects) ? (projects as Project[]) : null;
  } catch {
    return null;
  }
}

async function getSavedProjects(): Promise<Project[] | null> {
  const { data } = await supabaseServer
    .from("site_settings")
    .select("value")
    .eq("key", portfolioProjectsKey)
    .maybeSingle();

  return parseSavedProjects(data?.value);
}

function mergeById<T extends { id: string }>(base: T[], extra: T[]) {
  const baseIds = new Set(base.map((item) => item.id));
  return [...base, ...extra.filter((item) => !baseIds.has(item.id))];
}

export async function getHeroContent(): Promise<HeroContent> {
  return localHeroContent;
}

export async function getAboutImage(): Promise<string> {
  return localAboutImage;
}

export const getPublicProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const savedProjects = await getSavedProjects();

    if (savedProjects) {
      return savedProjects;
    }

    if (!includeSupabaseExtras) {
      return localProjects;
    }

    const { data, error } = await supabaseServer
      .from("projects")
      .select("id,title,description,image,tech,github,live")
      .order("created_at", { ascending: false });

    return !error && data?.length ? mergeById(localProjects, data) : localProjects;
  },
  ["public-projects-local-first"],
  { revalidate: 300, tags: ["public-content", "projects"] }
);

export const getProjectById = unstable_cache(
  async (id: string): Promise<Project | null> => {
    const savedProjects = await getSavedProjects();
    const savedProject = savedProjects?.find((item) => item.id === id);

    if (savedProjects) {
      return savedProject || null;
    }

    const localProject = localProjects.find((item) => item.id === id);

    if (localProject || !includeSupabaseExtras) {
      return localProject || null;
    }

    const { data } = await supabaseServer
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    return data || null;
  },
  ["public-project-by-id-local-first"],
  { revalidate: 300, tags: ["public-content", "projects"] }
);

export const getQualifications = unstable_cache(
  async (): Promise<QualificationItem[]> => {
    if (!includeSupabaseExtras) {
      return localQualifications;
    }

    const { data } = await supabaseServer
      .from("qualifications")
      .select("id,type,title,institution,duration,sort_order")
      .order("sort_order", { ascending: true });

    return data?.length
      ? mergeById(localQualifications, data)
      : localQualifications;
  },
  ["public-qualifications-local-first"],
  { revalidate: 300, tags: ["public-content", "qualifications"] }
);

export const getTestimonials = unstable_cache(
  async (): Promise<TestimonialsContent> => {
    if (!includeSupabaseExtras) {
      return localTestimonials;
    }

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
      title: titleData?.value || localTestimonials.title,
      reviews: reviewData?.length
        ? mergeById(localTestimonials.reviews, reviewData)
        : localTestimonials.reviews,
    };
  },
  ["public-testimonials-local-first"],
  { revalidate: 300, tags: ["public-content", "reviews"] }
);
