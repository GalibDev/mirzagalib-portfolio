import { services } from "@/data/services";

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-[#050816] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Services</h2>
          <p className="mt-3 text-white/50">What I offer</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/[0.07]"
              >
                <Icon className="mb-8 text-4xl text-white" />

                <h3 className="text-xl font-semibold">{service.title}</h3>

                <p className="mt-4 text-sm leading-6 text-white/55">
                  {service.description}
                </p>

                <button className="mt-6 text-sm text-white/80 transition group-hover:text-blue-300">
                  View More →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}