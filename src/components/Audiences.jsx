import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EyeOff, ShieldCheck, Users, BarChart3, Gift, CalendarHeart } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle.jsx";
import { Reveal } from "./ui/Reveal.jsx";
import { PhoneFrame, ImageScreen, BrowserFrame } from "./ui/PhoneMockup.jsx";

const TABS = {
  users: {
    label: "L'app mobile",
    sublabel: "Pour vous",
    points: [
      {
        Icon: Users,
        title: "Des rencontres sans pression",
        text: "Pas de swipe, pas de matching : un scan sur place, et vous découvrez qui est là, ouvert à la discussion comme vous.",
      },
      {
        Icon: EyeOff,
        title: "Votre visibilité, vos règles",
        text: "Visible ou invisible en un geste. Votre position n'est jamais suivie : elle n'est vérifiée qu'au moment du scan.",
      },
      {
        Icon: ShieldCheck,
        title: "Un badge de confiance",
        text: "Vérifiez votre profil par selfie et affichez un badge qui rassure. Réservé aux 18 ans et plus.",
      },
    ],
  },
  pros: {
    label: "L'espace pro",
    sublabel: "Pour les établissements",
    points: [
      {
        Icon: BarChart3,
        title: "Un trafic réel, pas des promesses",
        text: "Chaque check-in est un client physiquement chez vous. Suivez check-ins, visiteurs uniques et affluence depuis votre espace pro en ligne — rien à installer.",
      },
      {
        Icon: Gift,
        title: "Fidélisez sans carte papier",
        text: "Définissez vos avantages et leur prix en Tchil Points : vos clients les gagnent en venant, et les dépensent chez vous.",
      },
      {
        Icon: CalendarHeart,
        title: "Animez vos soirées",
        text: "Créez un événement en quelques secondes : les habitués qui suivent votre lieu reçoivent aussitôt une notification.",
      },
    ],
  },
};

/* Fond copié du hero de Rociny : 10 colonnes verticales de 2px espacées de
   112px dans une zone centrée (~1010px), avec deux traits lumineux de 75px
   qui parcourent les lignes 2 et 8 — l'un descend, l'autre monte. */
const BEAMS = {
  1: { dir: "down", duration: 7, delay: 0 },
  7: { dir: "up", duration: 9, delay: 2.5 },
};

function GridBeams() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-y-0 left-1/2 w-[1010px] -translate-x-1/2">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="absolute inset-y-0 w-0.5 bg-blanc/[0.08]" style={{ left: i * 112 }}>
            {BEAMS[i] && (
              <span
                className="absolute left-0 h-[75px] w-full opacity-0"
                style={{
                  background:
                    BEAMS[i].dir === "down"
                      ? "linear-gradient(0deg, #6eaacc 0%, rgba(110,170,204,0.3) 100%)"
                      : "linear-gradient(180deg, #6eaacc 0%, rgba(110,170,204,0.3) 100%)",
                  animation: `beam-${BEAMS[i].dir} ${BEAMS[i].duration}s linear ${BEAMS[i].delay}s infinite`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PointList({ points, offset = 0 }) {
  return points.map((p, i) => (
    <motion.div
      key={p.title}
      initial={{ opacity: 0, x: offset }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blanc/15 bg-blanc/5">
        <p.Icon className="h-5 w-5 text-blanc" strokeWidth={1.5} />
      </span>
      <span>
        <span className="font-asap block text-lg font-bold text-blanc">{p.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-blanc/60">{p.text}</span>
      </span>
    </motion.div>
  ));
}

export function Audiences() {
  const [tab, setTab] = useState("users");
  const points = TABS[tab].points;
  const left = points.slice(0, 2);
  const right = points.slice(2);

  return (
    <section id="etablissements" className="relative overflow-hidden bg-noir px-5 py-24 md:py-32">
      <GridBeams />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle dark title="Une app côté rencontres, un espace pro côté comptoir." />

        <Reveal className="mb-14 flex items-center justify-center gap-4 md:gap-14">
          {Object.entries(TABS).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative flex flex-col items-center gap-2.5 rounded-3xl px-7 py-5 transition-opacity duration-300 md:px-12 md:py-6 ${
                tab === key ? "" : "opacity-35 hover:opacity-60"
              }`}
            >
              {tab === key && (
                <motion.span
                  layoutId="tab-card"
                  className="absolute inset-0 rounded-3xl border border-blanc/10 bg-blanc/[0.07]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                />
              )}
              <img
                src="/logos/principal-white.svg"
                alt=""
                aria-hidden="true"
                className="relative z-10 h-6 w-auto md:h-7"
              />
              <span className="font-asap relative z-10 text-base font-bold text-blanc md:text-lg">
                {t.sublabel}
              </span>
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-blanc/50 md:text-[11px]">
                {t.label}
              </span>
            </button>
          ))}
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <AnimatePresence mode="wait">
            <motion.div key={`${tab}-left`} className="order-2 space-y-10 lg:order-1">
              <PointList points={left} offset={-24} />
            </motion.div>
          </AnimatePresence>

          <div
            className={`order-1 mx-auto lg:order-2 ${
              tab === "users" ? "w-60 md:w-64" : "w-full max-w-md md:max-w-lg lg:w-[30rem]"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {tab === "users" ? (
                  <PhoneFrame className="border-blanc/10 shadow-[0_30px_100px_rgba(110,170,204,0.25)]">
                    <ImageScreen src="/screens/app-carte.jpg" alt="Écran carte de l'app mobile Tchil" />
                  </PhoneFrame>
                ) : (
                  <BrowserFrame
                    src="/screens/pro-dashboard.jpg"
                    alt="Tableau de bord de l'espace pro Tchil"
                    className="border-blanc/10 shadow-[0_30px_100px_rgba(110,170,204,0.25)]"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`${tab}-right`} className="order-3 flex flex-col justify-center gap-10">
              <PointList points={right} offset={24} />
              {tab === "pros" && (
                <motion.a
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  href="#tarifs"
                  className="w-fit rounded-full border-2 border-tchil px-6 py-3 text-sm font-semibold text-tchil transition-all duration-200 hover:scale-[1.03] hover:bg-tchil hover:text-blanc"
                >
                  Devenir établissement partenaire
                </motion.a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
