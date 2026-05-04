import { techStack } from "@/data/tech";

export default function Tech() {
  return (
    <section id="tech" className="relative bg-[#050816] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Technologies</h2>
          <p className="mt-3 text-white/50">My tech stack</p>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-7">
          {techStack.map((tech) => {
            const Icon = tech.icon;

            return (
              <div key={tech.name} className="group text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-3xl shadow-xl backdrop-blur-xl transition duration-300 group-hover:-translate-y-2 group-hover:border-blue-400/40 group-hover:bg-white/10 group-hover:shadow-blue-500/20">
                  <Icon />
                </div>

                <p className="mt-3 text-sm text-white/70">{tech.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}