import { ArrowRight, Check, Infinity as InfinityIcon, Smartphone } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle.jsx";
import { Reveal } from "./ui/Reveal.jsx";

/* Retour client #58 : les abonnements ne sont plus détaillés sur le site.
   On met en avant la gratuité ; le détail des offres se découvre dans l'app. */
const FREE_FEATURES = [
  "Carte des lieux partenaires",
  "Check-in et rencontres sur place",
  "Voir qui est là autour de vous",
  "Tchil Points & parrainage",
];

export function Pricing() {
  return (
    <section id="tarifs" className="bg-blanc px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Tchil est gratuit."
          subtitle="L'essentiel de l'expérience est accessible à tous, sans carte bancaire. Des options payantes offrent encore plus de liberté et de fonctionnalités."
        />

        <Reveal className="mx-auto max-w-xl">
          <article className="relative overflow-hidden rounded-3xl bg-noir p-8 text-blanc shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-10">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-tchil/35 blur-[80px]"
              aria-hidden="true"
            />
            <span className="flex w-fit items-center gap-1.5 rounded-full border border-tchil/50 bg-tchil/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-tchil">
              <InfinityIcon className="h-3 w-3" strokeWidth={2.5} />
              Pour toujours
            </span>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-asap text-[3.2rem] font-extrabold leading-none tracking-tight">0 €</span>
              <span className="text-sm font-medium text-blanc/50">pour se rencontrer</span>
            </p>

            <div className="my-6 h-px w-full bg-blanc/15" />

            <ul className="space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-blanc/85">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-tchil">
                    <Check className="h-2.5 w-2.5 text-noir" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-blanc/10 bg-blanc/5 p-4 text-sm leading-relaxed text-blanc/60">
              <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-tchil" strokeWidth={1.5} />
              Envie d'aller plus loin ? Découvrez les options et leurs avantages directement dans
              l'application.
            </p>

            <a
              href="#cta"
              className="mt-7 flex items-center justify-center gap-2 rounded-full bg-blanc py-3.5 text-center text-sm font-semibold text-noir transition-all duration-200 hover:scale-[1.03] hover:bg-tchil hover:text-blanc"
            >
              Télécharger Tchil gratuitement
              <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        </Reveal>

        {/* Bandeau pro — retour client #62 : thème clair, sans dégradé */}
        <Reveal className="mt-14">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-noir/10 bg-white p-8 text-center shadow-[0_10px_40px_rgba(23,53,75,0.08)] md:flex-row md:p-10 md:text-left">
            <div className="flex items-start gap-4">
              <img src="/logos/icone-bleu.svg" alt="" className="hidden h-10 w-10 md:block" />
              <p className="max-w-xl text-base font-medium leading-relaxed text-noir md:text-lg">
                Vous gérez un bar, un café, un restaurant à Paris ou en banlieue ?{" "}
                <span className="font-semibold text-tchil">Profitez de l'offre de lancement partenaire.</span>
              </p>
            </div>
            <a
              href="#/espace-pro"
              className="shrink-0 rounded-full bg-tchil px-7 py-3.5 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03] hover:bg-noir"
            >
              Découvrir l'Espace Pro
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
