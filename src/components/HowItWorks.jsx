import { Map, QrCode, HeartHandshake } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle.jsx";
import { StaggerGroup, StaggerItem } from "./ui/Reveal.jsx";

const STEPS = [
  {
    n: "01",
    Icon: Map,
    title: "Repérez",
    text: "Ouvrez la carte et trouvez les lieux animés autour de vous, avec le nombre de personnes présentes.",
  },
  {
    n: "02",
    Icon: QrCode,
    title: "Scannez",
    text: "Sur place, scannez le QR code du lieu. Votre présence est vérifiée, vos points sont crédités.",
  },
  {
    n: "03",
    Icon: HeartHandshake,
    title: "Rencontrez",
    text: "Envoyez une invitation, recevez un oui, levez les yeux de votre écran. La suite s'écrit en vrai.",
  },
];

/* Décalage vertical croissant : les cartes descendent comme un escalier,
   le regard suit naturellement la progression 01 → 02 → 03. */
const OFFSETS = ["", "md:mt-12", "md:mt-24"];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-blanc px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Trois gestes. Une rencontre." />

        <StaggerGroup className="grid gap-6 md:grid-cols-3 md:gap-8" stagger={0.15}>
          {STEPS.map((s, i) => (
            <StaggerItem key={s.n}>
              <div className={OFFSETS[i]}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-noir/10 bg-white p-8 pb-10 transition-all duration-500 hover:-translate-y-2 hover:border-tchil/60 hover:shadow-[0_24px_60px_rgba(110,170,204,0.3)]">
                  {/* numéro géant en filigrane, contour bleu */}
                  <span
                    className="font-asap pointer-events-none absolute -top-5 right-4 text-[6.5rem] font-extrabold leading-none text-transparent transition-colors duration-500 group-hover:text-tchil/10"
                    style={{ WebkitTextStroke: "1.5px rgba(110,170,204,0.45)" }}
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-noir transition-colors duration-500 group-hover:bg-tchil">
                    <s.Icon
                      className="h-6 w-6 text-tchil transition-colors duration-500 group-hover:text-noir"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="font-asap mt-8 text-2xl font-bold text-noir">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-noir/60">{s.text}</p>

                  <span
                    className="mt-6 block h-1 w-8 rounded-full bg-tchil transition-all duration-500 group-hover:w-16"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
