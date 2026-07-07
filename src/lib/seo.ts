export const siteUrl = "https://mirzagalib.xyz";

export const personName = "MD Mirza Galib Palash";
export const displayName = "Mirza Galib";
export const siteTitle = `${personName} | MERN Stack Developer in Dhaka`;
export const siteDescription =
  "Official portfolio of MD Mirza Galib Palash, also known as Mirza Galib, a MERN stack and full stack web developer in Dhaka, Bangladesh building React, Next.js, Node.js, and MongoDB web applications.";

export const profileImage =
  "https://wzvksvbjkunqdjwawsvh.supabase.co/storage/v1/object/public/site-assets/hero_profile/1779474917792-ut7u097ik2.jpg";

export const socialLinks = {
  github: "https://github.com/GalibDev",
  linkedin: "https://www.linkedin.com/in/md-mirza-galib-palash",
  email: "mailto:mirza.galib.palash@gmail.com",
} as const;

export const seoKeywords = [
  "MD Mirza Galib Palash",
  "Mirza Galib Palash",
  "Mirza Galib",
  "GalibDev",
  "Mirza Galib portfolio",
  "Mirza Galib developer",
  "MERN Stack Developer",
  "Full Stack Developer",
  "React Developer",
  "Next.js Developer",
  "Node.js Developer",
  "MongoDB Developer",
  "TypeScript Developer",
  "Web Developer in Dhaka",
  "Bangladesh web developer",
  "Portfolio",
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
