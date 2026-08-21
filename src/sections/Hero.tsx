import { getHeroContent, getResumeUrl } from "@/lib/public-data";
import HeroClient from "@/sections/HeroClient";

export default async function Hero() {
  const [content, resumeUrl] = await Promise.all([getHeroContent(), getResumeUrl()]);

  return <HeroClient content={content} resumeUrl={resumeUrl} />;
}
