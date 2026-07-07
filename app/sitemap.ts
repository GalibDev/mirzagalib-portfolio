import type { MetadataRoute } from "next";
import { localProjects } from "@/data/local-portfolio";
import { absoluteUrl, profileImage } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [profileImage],
    },
    ...localProjects.map((project) => ({
      url: absoluteUrl(`/projects/${project.id}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: project.image ? [project.image] : undefined,
    })),
  ];
}
