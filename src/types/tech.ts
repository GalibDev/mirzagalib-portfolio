import type { IconType } from "react-icons";

export type Tech = {
  name: string;
  icon: IconType;
  category: "Frontend" | "Backend" | "Database" | "Tools";
};