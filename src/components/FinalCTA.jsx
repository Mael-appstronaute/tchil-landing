import { Reveal } from "./ui/Reveal.jsx";
import { StoreBadges } from "./ui/StoreBadges.jsx";
import { PhoneFrame, ImageScreen } from "./ui/PhoneMockup.jsx";

export function FinalCTA() {
  return (
    <section id="cta" className="gradient-noir-bleu relative overflow-hidden px-5 pt-24 md:pt-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
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

        {/* Trio d'écrans réels de l'app, en éventail, qui dépasse du bas du cadre */}
        <div className="-mb-[14%] mt-16 flex items-start justify-center md:-mb-[12%]">
          <Reveal delay={0.5} className="z-0 hidden w-44 sm:block md:w-56">
            <div className="-mr-8 mt-14 -rotate-[9deg] md:-mr-10">
              <PhoneFrame className="border-blanc/15 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <ImageScreen src="/screens/app-conversation.png" alt="Conversation dans l'app Tchil" />
              </PhoneFrame>
            </div>
          </Reveal>
          <Reveal delay={0.35} className="z-10 w-52 md:w-64">
            <PhoneFrame className="border-blanc/25 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              <ImageScreen src="/screens/app-carte-light.jpg" alt="Carte des lieux partenaires Tchil" />
            </PhoneFrame>
          </Reveal>
          <Reveal delay={0.5} className="z-0 hidden w-44 sm:block md:w-56">
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
