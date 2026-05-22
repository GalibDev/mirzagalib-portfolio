export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-transparent px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-2">
          {/* left */}
          <div>
            <h3 className="text-lg font-semibold">Mirza Galib</h3>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              Full Stack Developer passionate about creating beautiful and
              functional web experiences.
            </p>
          </div>

          {/* right */}
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
          <p>mirza.galib.palash@gmail.com</p>
          <p>Dhaka, Mohammadpur</p>
          <p className="mt-2">
            &copy; 2026 Mirza Galib. All rights reserved. Built with Next.js &
            Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}