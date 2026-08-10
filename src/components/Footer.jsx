import { Instagram, Mail, Globe } from "lucide-react";

const NAV = [
  { label: "Le concept", href: "#concept" },
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Tarifs", href: "#tarifs" },
];

const LEGAL = ["CGU", "Confidentialité", "Mentions légales", "CGV", "Suppression du compte"];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-noir pt-20 text-blanc">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <img src="/logos/principal-white.svg" alt="Tchil.app" className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-blanc/50">
            Une app qui rapproche les gens, au-delà des écrans.
          </p>
        </div>

        <nav aria-label="Navigation pied de page">
          <p className="font-asap text-sm font-bold uppercase tracking-widest text-tchil">Navigation</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-blanc/60 transition-colors hover:text-tchil">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Liens légaux">
          <p className="font-asap text-sm font-bold uppercase tracking-widest text-tchil">Légal</p>
          <ul className="mt-4 space-y-2.5">
            {LEGAL.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-blanc/60 transition-colors hover:text-tchil">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-asap text-sm font-bold uppercase tracking-widest text-tchil">Contact</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href="mailto:contact@tchil.app" className="flex items-center gap-2 text-sm text-blanc/60 transition-colors hover:text-tchil">
                <Mail className="h-4 w-4" strokeWidth={1.5} /> contact@tchil.app
              </a>
            </li>
            <li>
              <a href="https://www.tchilapp.fr" className="flex items-center gap-2 text-sm text-blanc/60 transition-colors hover:text-tchil">
                <Globe className="h-4 w-4" strokeWidth={1.5} /> www.tchilapp.fr
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-sm text-blanc/60 transition-colors hover:text-tchil">
                <Instagram className="h-4 w-4" strokeWidth={1.5} /> @tchilapp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-6xl px-5 text-xs text-blanc/35 md:px-8">
        Application réservée aux 18 ans et plus. Données hébergées en France.
      </p>

      {/* Logo géant en marquee */}
      <div className="marquee-paused relative mt-10 overflow-hidden" aria-hidden="true">
        <div className="marquee-track animate-marquee-slow flex w-max items-center">
          {Array.from({ length: 16 }).map((_, i) => (
            <img
              key={i}
              src="/logos/principal-white.svg"
              alt=""
              className="-mx-6 h-24 w-auto opacity-10 md:-mx-10 md:h-40"
            />
          ))}
        </div>
      </div>

      <div className="border-t border-blanc/10 py-6 text-center text-xs text-blanc/40">
        © 2026 Tchil — Tous droits réservés.
      </div>
    </footer>
  );
}
