export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row">
        <h2 className="text-lg font-semibold">Mirza Galib</h2>

        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} All rights reserved
        </p>

        <div className="flex gap-4 text-white/70">
          <a href="#" className="hover:text-white">
            GitHub
          </a>
          <a href="#" className="hover:text-white">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}