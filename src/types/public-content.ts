export type HeroStat = {
  id: string;
  label: string;
  sub_label: string | null;
  value: string;
  sort_order: number;
};

export type HeroContent = {
  name: string;
  image: string;
  stats: HeroStat[];
};

export type QualificationItem = {
  id: string;
  type: string;
  title: string;
  institution: string;
  duration: string;
  sort_order: number;
};

export type Review = {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  project_link: string | null;
  relation: string | null;
};

export type TestimonialsContent = {
  title: string;
  reviews: Review[];
};
