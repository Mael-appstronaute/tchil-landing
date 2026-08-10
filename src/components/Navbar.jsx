import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Tarifs", href: "#tarifs" },
];

/** Header transparent façon Rociny : aucun fond, posé sur le hero, il défile avec la page. */
export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#" aria-label="Tchil — accueil">
          <img src="/logos/principal-white.svg" alt="Tchil.app" className="h-10 w-auto md:h-11" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-blanc/80 transition-colors duration-200 hover:text-blanc"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#/espace-pro"
            className="hidden rounded-full border border-blanc/40 px-5 py-2.5 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03] hover:border-blanc sm:block"
          >
            Espace Pro
          </a>
          <a
            href="#cta"
            className="hidden rounded-full bg-blanc px-5 py-2.5 text-sm font-semibold text-noir shadow-[0_10px_30px_rgba(4,18,28,0.35)] transition-all duration-200 hover:scale-[1.03] sm:block"
          >
            Télécharger l'app
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blanc/30 text-blanc lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-noir px-6 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <img src="/logos/principal-white.svg" alt="Tchil.app" className="h-9 w-auto" />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-blanc/20 text-blanc"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-14 flex flex-col gap-6">
              {[...LINKS, { label: "Espace Pro", href: "#/espace-pro" }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-asap text-4xl font-extrabold tracking-tight text-blanc transition-colors hover:text-tchil"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-auto rounded-full bg-blanc py-4 text-center font-semibold text-noir"
            >
              Télécharger l'app
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
