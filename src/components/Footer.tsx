import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/md-mirza-galib-palash",
      icon: "in",
    },
    {
      label: "GitHub",
      href: "https://github.com/GalibDev",
      icon: "GH",
    },
  ];

  return (
    <footer className="relative mt-12 border-t border-white/10 bg-transparent px-4 py-10 text-white sm:mt-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 text-center sm:text-left md:grid-cols-2 md:gap-10">
          <div>
            <h3 className="text-lg font-semibold">Mirza Galib</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-white/60 sm:mx-0">
              Full Stack Developer passionate about creating beautiful and
              functional web experiences.
            </p>

            <div className="mt-5 flex justify-center gap-3 sm:justify-start">
              {socialLinks.map((item) => {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white"
                  >
                    <span className="text-xs font-bold">{item.icon}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:text-right">
            <h4 className="text-sm font-semibold">Quick Links</h4>

            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <a href="#about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white">
                  Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs leading-5 text-white/50">
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-5">
            <a
              href="mailto:mirza.galib.palash@gmail.com"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Mail size={14} /> mirza.galib.palash@gmail.com
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} /> Dhaka, Mohammadpur
            </span>
          </div>
          <p className="mt-2">
            &copy; 2026 Mirza Galib. All rights reserved. Built with Next.js &
            Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
