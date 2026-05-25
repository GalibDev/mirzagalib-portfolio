import { getTestimonials } from "@/lib/public-data";
import TestimonialsClient from "@/sections/TestimonialsClient";

export default async function Testimonials() {
  const { title, reviews } = await getTestimonials();

  return <TestimonialsClient title={title} reviews={reviews} />;
}
