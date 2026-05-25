import { getHeroContent } from "@/lib/public-data";
import HeroClient from "@/sections/HeroClient";

export default async function Hero() {
  const content = await getHeroContent();

  return <HeroClient content={content} />;
}
