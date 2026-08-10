import { ArrowRight, Check, Infinity as InfinityIcon } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle.jsx";
import { Reveal, StaggerGroup, StaggerItem } from "./ui/Reveal.jsx";

const PLANS = [
  {
    name: "Gratuit",
    price: "0 €",
    period: "",
    free: true,
    tagline: "L'essentiel, sans carte bancaire.",
    features: [
      "Carte des lieux partenaires",
      "Check-in illimité*",
      "Voir qui est là sur place",
      "Interactions sur place",
      "Tchil Points & parrainage",
    ],
    note: "*3 lieux par jour",
    cta: "Commencer",
  },
  {
    name: "Premium",
    price: "4,99 €",
    period: "/mois",
    tagline: "Voyez qui est là avant de sortir.",
    includes: "Tout le Gratuit, plus :",
    features: ["Voir qui est là à distance", "Invitations à distance", "Messages prédéfinis"],
    cta: "Choisir Premium",
  },
  {
    name: "Premium+",
    price: "9,99 €",
    period: "/mois",
    popular: true,
    tagline: "Engagez la conversation.",
    includes: "Tout Premium, plus :",
    features: ["Conversations réelles avec les personnes présentes", "Badge vérifié mis en avant"],
    cta: "Choisir Premium+",
  },
  {
    name: "Full",
    price: "14,99 €",
    period: "/mois",
    tagline: "Zéro plafond, zéro friction.",
    includes: "Tout Premium+, plus :",
    features: ["Liberté maximale", "Sans plafond", "Protections anti-spam actives"],
    cta: "Choisir Full",
  },
];

export function Pricing() {
  return (
    <section id="tarifs" className="bg-blanc px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Commencez gratuitement."
          subtitle="L'essentiel de Tchil est gratuit, pour toujours. Les abonnements élargissent simplement votre liberté."
        />

        <StaggerGroup className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                  p.free
                    ? "bg-noir text-blanc shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:shadow-[0_28px_70px_rgba(110,170,204,0.35)]"
                    : `bg-white hover:shadow-[0_20px_60px_rgba(110,170,204,0.22)] ${
                        p.popular ? "border-2 border-tchil" : "border border-noir/10"
                      }`
                }`}
              >
                {p.free && (
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-tchil/35 blur-[80px]"
                    aria-hidden="true"
                  />
                )}
                {p.popular && (
                  <span className="font-asap absolute right-5 top-5 rounded-full bg-tchil px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blanc">
                    Populaire
                  </span>
                )}
                {p.free && (
                  <span className="flex w-fit items-center gap-1.5 rounded-full border border-tchil/50 bg-tchil/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-tchil">
                    <InfinityIcon className="h-3 w-3" strokeWidth={2.5} />
                    Pour toujours
                  </span>
                )}

                <h3
                  className={`font-asap ${p.free ? "mt-5" : ""} text-xs font-bold uppercase tracking-[0.18em] ${
                    p.free ? "text-blanc/60" : "text-noir/50"
                  }`}
                >
                  {p.name}
                </h3>
                <p className="mt-2 flex items-baseline gap-1">
                  <span
                    className={`font-asap text-[2.6rem] font-extrabold leading-none tracking-tight ${
                      p.free ? "text-blanc" : "text-noir"
                    }`}
                  >
                    {p.price}
                  </span>
                  {p.period && <span className="text-sm font-medium text-noir/50">{p.period}</span>}
                </p>
                <p className={`mt-2.5 text-[13px] font-medium ${p.free ? "text-blanc/60" : "text-tchil"}`}>
                  {p.tagline}
                </p>

                <div className={`my-5 h-px w-full ${p.free ? "bg-blanc/15" : "bg-noir/10"}`} />

                {p.includes && (
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-noir/40">
                    {p.includes}
                  </p>
                )}
                <ul className="flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-sm ${p.free ? "text-blanc/85" : "text-noir/70"}`}
                    >
                      <span
                        className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                          p.free ? "bg-tchil" : "bg-tchil/15"
                        }`}
                      >
                        <Check
                          className={`h-2.5 w-2.5 ${p.free ? "text-noir" : "text-tchil"}`}
                          strokeWidth={3}
                        />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                {p.note && <p className="mt-3 text-[11px] text-blanc/35">{p.note}</p>}

                <a
                  href="#cta"
                  className={`mt-6 flex items-center justify-center gap-2 rounded-full py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-[1.03] ${
                    p.free
                      ? "bg-blanc text-noir hover:bg-tchil hover:text-blanc"
                      : p.popular
                        ? "bg-noir text-blanc hover:gradient-noir-bleu"
                        : "border border-noir/15 text-noir hover:border-tchil hover:text-tchil"
                  }`}
                >
                  {p.cta}
                  {p.free && <ArrowRight className="h-4 w-4" />}
                </a>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-6">
          <p className="text-center text-xs text-noir/40">
            Abonnements sans engagement, gérés via l'App Store et Google Play.
          </p>
        </Reveal>

        {/* Bandeau pro — thème clair uni (le client ne veut pas de dégradé foncé) */}
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
              href="#cta"
              className="shrink-0 rounded-full bg-tchil px-7 py-3.5 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03] hover:bg-noir"
            >
              Demander une invitation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
