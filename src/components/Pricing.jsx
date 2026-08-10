import { ArrowRight, Check, Infinity as InfinityIcon, Sparkles } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle.jsx";
import { Reveal } from "./ui/Reveal.jsx";
import { BrowserFrame } from "./ui/PhoneMockup.jsx";
import { StoreBadges } from "./ui/StoreBadges.jsx";

/* Retour client 10/08 : ne plus afficher les formules ni les prix sur le site.
   On met en avant la gratuité de l'app, avec des options d'achat à découvrir
   directement dans l'application. */
const FREE_FEATURES = [
  "Carte des lieux partenaires",
  "Check-in par scan sur place",
  "Voir qui est là autour de vous",
  "Rencontres et interactions sur place",
  "Tchil Points, récompenses & parrainage",
];

export function Pricing() {
  return (
    <section id="gratuit" className="bg-blanc px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Application gratuite, avec options d'achat."
          subtitle="Tchil se télécharge et s'utilise gratuitement. Des options dans l'app élargissent simplement votre liberté."
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-noir text-blanc shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-tchil/35 blur-[90px]"
              aria-hidden="true"
            />
            <div className="relative grid gap-10 p-8 md:grid-cols-2 md:gap-6 md:p-12">
              <div>
                <span className="flex w-fit items-center gap-1.5 rounded-full border border-tchil/50 bg-tchil/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-tchil">
                  <InfinityIcon className="h-3 w-3" strokeWidth={2.5} />
                  Gratuit, pour toujours
                </span>
                <h3 className="font-asap mt-5 text-2xl font-extrabold leading-tight tracking-tight text-balance md:text-4xl">
                  L'essentiel de Tchil, sans carte bancaire.
                </h3>
                <ul className="mt-6 space-y-3">
                  {FREE_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-blanc/85">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-tchil">
                        <Check className="h-2.5 w-2.5 text-noir" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center rounded-2xl border border-blanc/10 bg-blanc/5 p-6 text-center md:p-8">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-tchil text-blanc">
                  <Sparkles className="h-5 w-5" />
                </span>
                <p className="font-asap mt-4 text-lg font-extrabold tracking-tight md:text-xl">
                  Envie d'aller plus loin ?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-blanc/70">
                  Des options d'achat sont disponibles directement dans l'application.
                  Téléchargez Tchil pour les découvrir.
                </p>
                <a
                  href="#cta"
                  className="group mx-auto mt-6 inline-flex items-center gap-2.5 rounded-full bg-blanc py-2 pl-6 pr-2 text-sm font-semibold text-noir transition-all duration-200 hover:scale-[1.03]"
                >
                  Télécharger Tchil gratuitement
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-noir text-blanc transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <div className="mt-5 flex justify-center">
                  <StoreBadges variant="light" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <p className="text-center text-xs text-noir/40">
            Options gérées via l'App Store et Google Play, sans engagement.
          </p>
        </Reveal>

        {/* Bandeau pro — vraie vitrine : copy + CTA à gauche, dashboard pro qui
            déborde du cadre à droite, halo bleu et décor en fond */}
        <Reveal className="mt-14">
          <div className="gradient-noir-bleu relative overflow-hidden rounded-3xl">
            {/* halo bleu doux derrière le mockup */}
            <div
              className="pointer-events-none absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-tchil/40 blur-[110px]"
              aria-hidden="true"
            />
            {/* icône Tchil géante en filigrane à gauche */}
            <img
              src="/logos/icone-white.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 opacity-[0.06]"
            />

            <div className="relative grid items-center gap-10 p-8 md:grid-cols-[1.1fr_1fr] md:gap-6 md:p-12">
              <div className="text-center md:text-left">
                <span className="font-asap inline-block rounded-full border border-blanc/25 bg-blanc/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blanc backdrop-blur-sm">
                  Offre de lancement
                </span>
                <h3 className="font-asap mt-5 text-2xl font-extrabold leading-tight tracking-tight text-blanc text-balance md:text-4xl">
                  Vous gérez un bar, un café, un restaurant ?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-blanc/70 md:text-base">
                  À Paris ou en banlieue, rejoignez les premiers lieux partenaires et transformez
                  chaque check-in en client fidèle.
                </p>
                <a
                  href="#cta"
                  className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-blanc py-2 pl-6 pr-2 text-sm font-semibold text-noir shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-[1.03]"
                >
                  Demander une invitation
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-noir text-blanc transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </div>

              {/* dashboard pro coupé par le bord droit du cadre, façon mockups du site */}
              <div className="relative hidden md:block">
                <div className="w-[130%] rotate-2 transition-transform duration-500 hover:rotate-0">
                  <BrowserFrame
                    src="/screens/pro-dashboard.jpg"
                    alt="Tableau de bord de l'espace pro Tchil"
                    className="border-blanc/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
