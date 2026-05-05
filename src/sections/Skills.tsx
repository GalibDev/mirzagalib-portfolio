import { CheckCircle2 } from "lucide-react";

const frontendSkills = [
  { name: "HTML5", level: "Expert" },
  { name: "Next.js", level: "Expert" },
  { name: "TypeScript", level: "Expert" },
  { name: "Tailwind CSS", level: "Intermediate" },
  { name: "JavaScript", level: "Expert" },
  { name: "React.js", level: "Expert" },
];

const backendSkills = [
  { name: "Node.js", level: "Expert" },
  { name: "SQL", level: "Intermediate" },
  { name: "Express.js", level: "Expert" },
  { name: "Docker", level: "Intermediate" },
  { name: "MongoDB", level: "Expert" },
  { name: "Kubernetes", level: "Intermediate" },
];

function SkillCard({
  title,
  skills,
}: {
  title: string;
  skills: { name: string; level: string }[];
}) {
  return (
    <div className="reveal-card glass glass-hover rounded-3xl p-8">
      <h3 className="mb-8 text-center text-xl font-semibold">{title}</h3>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-start gap-3">
            <CheckCircle2 size={16} className="mt-1 text-white/70" />

            <div>
              <h4 className="text-sm font-semibold">{skill.name}</h4>
              <p className="mt-1 text-xs text-white/45">{skill.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-white"
    >
      <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="reveal mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Skills</h2>
          <p className="mt-3 text-sm text-white/50">My Technical Level</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <SkillCard title="Frontend Developer" skills={frontendSkills} />
          <SkillCard title="Backend Developer" skills={backendSkills} />
        </div>
      </div>
    </section>
  );
}