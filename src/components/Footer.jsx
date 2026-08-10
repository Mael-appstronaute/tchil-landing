import { Mail, Globe } from "lucide-react";

const NAV = [
  { label: "Le concept", href: "#concept" },
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Gratuit", href: "#gratuit" },
];

/* Retour client 10/08 : icônes réseaux sociaux dans leurs couleurs officielles. */
function InstagramColorIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.25" fill="#fff" />
    </svg>
  );
}

function FacebookColorIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        d="M15.6 12.5h-2.4v7h-2.9v-7H8.6V9.9h1.7V8.4c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.26v1.24h2.3l-.5 2.6Z"
        fill="#fff"
      />
    </svg>
  );
}

const LEGAL = ["CGU", "Confidentialité", "Mentions légales", "CGV", "Suppression du compte"];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-noir pt-20 text-blanc">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <img src="/logos/principal-white.svg" alt="Tchil.app" className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-blanc/50">
            Plus qu'une application, une présence.
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
              <a href="https://www.tchil.app" className="flex items-center gap-2 text-sm text-blanc/60 transition-colors hover:text-tchil">
                <Globe className="h-4 w-4" strokeWidth={1.5} /> www.tchil.app
              </a>
            </li>
          </ul>

          {/* Retour client #64 : accès direct aux réseaux sociaux officiels */}
          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href="https://www.instagram.com/tchilapp"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-2 rounded-full border border-blanc/20 px-4 py-2 text-xs font-semibold text-blanc/80 transition-all duration-200 hover:border-tchil hover:text-tchil"
            >
              <InstagramColorIcon className="h-4 w-4" /> Suivre sur Instagram
            </a>
            <a
              href="https://www.facebook.com/tchilapp"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-2 rounded-full border border-blanc/20 px-4 py-2 text-xs font-semibold text-blanc/80 transition-all duration-200 hover:border-tchil hover:text-tchil"
            >
              <FacebookColorIcon className="h-4 w-4" /> Suivre sur Facebook
            </a>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-6xl px-5 text-xs text-blanc/35 md:px-8">
        Application réservée aux 18 ans et plus. Données hébergées en France.
      </p>

      <div className="mt-10 border-t border-blanc/10 py-6 text-center text-xs text-blanc/40">
        © 2026 Tchil — Tous droits réservés.
      </div>
    </footer>
  );
}
