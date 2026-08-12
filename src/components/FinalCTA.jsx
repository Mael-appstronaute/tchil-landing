import { Reveal } from "./ui/Reveal.jsx";
import { StoreBadges } from "./ui/StoreBadges.jsx";
import { PhoneFrame, ImageScreen } from "./ui/PhoneMockup.jsx";

export function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden px-5 pt-24 md:pt-32">
      {/* Retour client 10/08 : reprendre le même bleu que le haut de page —
          fond répliqué du hero (base #0e5c87, halos doux, fondus vers le bleu nuit) */}
      <div className="absolute inset-0 bg-[#0e5c87]" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-[35%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-[0.05] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-[35%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#aadcff] opacity-[0.1] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-48"
        aria-hidden="true"
        style={{ background: "linear-gradient(180deg, #04121c 4%, rgba(4,18,28,0) 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        aria-hidden="true"
        style={{ background: "linear-gradient(0deg, #04121c 4%, rgba(4,18,28,0) 100%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <Reveal>
          <img src="/logos/secondaire-white.svg" alt="Tchil.app" className="mx-auto h-24 w-auto md:h-32" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-asap mt-8 text-4xl font-extrabold tracking-tight text-blanc text-balance md:text-7xl">
            Plus qu'une application, une présence.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-blanc/70 md:text-xl">Crée des souvenirs, pas des matchs.</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-6">
          <a
            href="#"
            className="rounded-full bg-blanc px-10 py-4 text-base font-semibold text-noir transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_10px_50px_rgba(253,253,253,0.35)] md:px-12 md:py-5 md:text-lg"
          >
            Télécharger Tchil gratuitement
          </a>
          <StoreBadges variant="light" />
        </Reveal>

        {/* Trio d'écrans réels de l'app, en éventail, qui dépasse du bas du cadre.
            NB retour client 10/08 : ces captures proviennent des maquettes app —
            à ré-exporter une fois les maquettes mises à jour (thème bleu clair). */}
        <div className="-mb-[14%] mt-16 flex items-start justify-center md:-mb-[12%]">
          <Reveal delay={0.5} className="z-0 hidden w-48 sm:block md:w-72">
            <div className="-mr-8 mt-14 -rotate-[9deg] md:-mr-10">
              <PhoneFrame className="border-blanc/15 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <ImageScreen src="/screens/app-conversation.png" alt="Conversation dans l'app Tchil" />
              </PhoneFrame>
            </div>
          </Reveal>
          <Reveal delay={0.35} className="z-10 w-56 md:w-80">
            <PhoneFrame className="border-blanc/25 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              <ImageScreen src="/screens/app-carte-light.jpg" alt="Carte des lieux partenaires Tchil" />
            </PhoneFrame>
          </Reveal>
          <Reveal delay={0.5} className="z-0 hidden w-48 sm:block md:w-72">
            <div className="-ml-8 mt-14 rotate-[9deg] md:-ml-10">
              <PhoneFrame className="border-blanc/15 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <ImageScreen src="/screens/app-profil.png" alt="Profil vérifié dans l'app Tchil" />
              </PhoneFrame>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
