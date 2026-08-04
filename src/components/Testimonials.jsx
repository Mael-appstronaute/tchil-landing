import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle.jsx";
import { Reveal } from "./ui/Reveal.jsx";

const TESTIMONIALS = [
  {
    name: "Léa, 26 ans",
    short: "Léa",
    role: "Paris 11ᵉ",
    color: "#6eaacc",
    photo: "/people/p1.jpg",
    text: "J'ai supprimé toutes mes applis de dating. Avec Tchil, je sais que la personne est là, à dix mètres. La première conversation se fait autour d'un verre, pas derrière un clavier.",
  },
  {
    name: "Karim, 30 ans",
    short: "Karim",
    role: "Montreuil",
    color: "#0f1b22",
    photo: "/people/p2.jpg",
    text: "On l'utilise entre potes pour repérer où il y a de l'ambiance. Et les points, c'est devenu un jeu : notre bar nous offre la tournée de cafés du dimanche.",
  },
  {
    name: "Nadia",
    short: "Nadia",
    role: "Gérante du Café Lumière",
    color: "#41758f",
    photo: "/people/p5.jpg",
    text: "Je vois enfin qui vient grâce à l'app, et mes habitués reviennent pour leurs avantages. Aucune carte de fidélité papier ne m'a jamais apporté ça.",
  },
];

const AUTOPLAY_S = 6;

/* Positions du deck : 0 = carte active, puis chaque carte recule d'un cran
   (léger décalage vertical + rotation alternée) pour laisser voir les bords. */
const STACK = [
  { y: 0, scale: 1, rotate: 0 },
  { y: 22, scale: 0.955, rotate: 2.4 },
  { y: 42, scale: 0.91, rotate: -2.4 },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = TESTIMONIALS.length;

  const go = (dir) => setIndex((i) => (i + dir + n) % n);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), AUTOPLAY_S * 1000);
    return () => clearInterval(id);
  }, [reduce, paused, index, n]);

  return (
    <section className="relative overflow-hidden bg-blanc px-5 py-24 md:py-32">
      {/* Halo bleu diffus derrière le deck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-tchil/15 blur-[130px]"
      />
      {/* Guillemet géant en filigrane */}
      <span
        aria-hidden="true"
        className="font-asap pointer-events-none absolute left-1/2 top-24 -translate-x-[380px] select-none text-[220px] font-extrabold leading-none text-tchil/[0.07] md:top-16"
      >
        «
      </span>

      <div className="relative mx-auto max-w-3xl">
        <SectionTitle
          title="Ils ont levé les yeux de leur écran."
          subtitle="Trois usages, une même envie : se parler pour de vrai."
        />

        <Reveal>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Deck de cartes empilées — toutes montées, seule la position change */}
            <div className="grid pb-12">
              {TESTIMONIALS.map((t, i) => {
                const pos = (i - index + n) % n;
                const isFront = pos === 0;
                const stack = STACK[Math.min(pos, STACK.length - 1)];
                return (
                  <motion.article
                    key={t.name}
                    aria-hidden={!isFront}
                    style={{ gridArea: "1 / 1", zIndex: n - pos }}
                    animate={reduce ? { opacity: isFront ? 1 : 0 } : stack}
                    transition={{ type: "spring", bounce: 0.22, duration: 0.65 }}
                    {...(isFront && !reduce
                      ? {
                          drag: "x",
                          dragConstraints: { left: 0, right: 0 },
                          dragElastic: 0.55,
                          onDragEnd: (_, info) => {
                            if (info.offset.x < -70 || info.velocity.x < -400) go(1);
                            else if (info.offset.x > 70 || info.velocity.x > 400) go(-1);
                          },
                        }
                      : {})}
                    className={`relative rounded-[2rem] border border-noir/10 bg-white p-8 shadow-[0_30px_80px_rgba(110,170,204,0.18)] md:p-12 ${
                      isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                    }`}
                  >
                    {/* Badge citation flottant, teinté par témoin */}
                    <span
                      className="absolute -top-5 left-8 flex h-11 w-11 -rotate-6 items-center justify-center rounded-2xl text-blanc shadow-lg md:left-12"
                      style={{ backgroundColor: t.color }}
                      aria-hidden="true"
                    >
                      <Quote className="h-5 w-5" />
                    </span>

                    {/* Le contenu des cartes de fond est masqué : on ne voit que des dos blancs */}
                    <div className={`transition-opacity duration-300 ${isFront ? "" : "opacity-0"}`}>
                      <blockquote className="min-h-44 md:min-h-36">
                        <p className="font-asap text-xl font-medium leading-relaxed tracking-tight text-noir/85 md:text-2xl">
                          « {t.text} »
                        </p>
                        <footer className="mt-8 flex items-center gap-3">
                          <img
                            src={t.photo}
                            alt={`Portrait de ${t.short}`}
                            className="h-11 w-11 rounded-full object-cover"
                            style={{ boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${t.color}` }}
                          />
                          <span>
                            <span className="font-asap block text-sm font-bold text-noir">{t.name}</span>
                            <span className="block text-xs text-noir/50">{t.role}</span>
                          </span>
                        </footer>
                      </blockquote>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Sélecteur : flèches + puces avatar avec progression de l'autoplay */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Témoignage précédent"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-noir/10 text-noir/50 transition-all hover:border-tchil hover:text-tchil"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setIndex(i)}
                  aria-label={`Témoignage de ${t.short}`}
                  className={`relative flex items-center gap-2.5 overflow-hidden rounded-full border py-1.5 pl-1.5 pr-4 transition-all duration-300 ${
                    i === index
                      ? "border-noir bg-noir"
                      : "border-noir/10 bg-white hover:border-noir/30"
                  }`}
                >
                  <img
                    src={t.photo}
                    alt=""
                    aria-hidden="true"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span
                    className={`font-asap text-sm font-semibold ${
                      i === index ? "text-blanc" : "text-noir/50"
                    }`}
                  >
                    {t.short}
                  </span>
                  {i === index && !reduce && !paused && (
                    <motion.span
                      key={`progress-${index}`}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-tchil"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_S, ease: "linear" }}
                    />
                  )}
                </button>
              ))}

              <button
                onClick={() => go(1)}
                aria-label="Témoignage suivant"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-noir/10 text-noir/50 transition-all hover:border-tchil hover:text-tchil"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] text-noir/25">Témoignages illustratifs</p>
        </Reveal>
      </div>
    </section>
  );
}
