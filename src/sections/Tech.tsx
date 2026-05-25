import { techStack } from "@/data/tech";

export default function Tech() {
  return (
    <section
      id="tech"
      className="relative overflow-hidden bg-transparent px-4 py-20 text-white sm:px-6 sm:py-24"
    >
      <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="reveal mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Technologies</h2>
          <p className="mt-3 text-sm text-white/50">My Tech Stack</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-8 md:grid-cols-6 lg:grid-cols-8">
          {techStack.map((tech) => {
            const Icon = tech.icon;

            return (
              <div key={tech.name} className="reveal-card group text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl backdrop-blur-xl transition duration-300 group-hover:-translate-y-1 group-hover:border-white/25 group-hover:bg-white/[0.08] sm:h-14 sm:w-14 sm:text-2xl">
                  <Icon style={{ color: tech.color }} />
                </div>

                <p className="mt-2 text-[11px] text-white/65">
                  {tech.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
