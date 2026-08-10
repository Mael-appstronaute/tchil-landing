import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { StoreBadges } from "./ui/StoreBadges.jsx";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Cartouche du mot rotatif : cadre affiné (bordure blanche + fond translucide
 * flouté) qui épouse la largeur du mot courant. La largeur est mesurée sur des
 * gabarits invisibles puis animée explicitement — pas de `layout` (qui gelait
 * l'animation d'entrée du mot avec AnimatePresence).
 */
function RotatingFrame({ words, interval = 2800 }) {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState(null);
  const rulers = useRef([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const measure = () => setWidths(rulers.current.map((el) => (el ? el.offsetWidth : 0)));
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  return (
    <span className="relative inline-block align-top">
      {/* gabarits invisibles pour mesurer chaque mot dans la typo du titre */}
      <span aria-hidden="true" className="pointer-events-none absolute opacity-0">
        {words.map((w, i) => (
          <span key={w} ref={(el) => (rulers.current[i] = el)} className="whitespace-nowrap">
            {w}
          </span>
        ))}
      </span>

      <span className="inline-flex -rotate-2 items-center rounded-[1.4rem] border-[3px] border-blanc/90 bg-blanc/10 px-[0.4em] py-[0.05em] shadow-[0_14px_40px_rgba(23,53,75,0.3)] backdrop-blur-[3px] transition-transform duration-300 hover:rotate-0">
        <motion.span
          className="relative block overflow-hidden"
          animate={widths ? { width: widths[index] } : undefined}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={words[index]}
              initial={reduce ? false : { y: "80%", opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={reduce ? undefined : { y: "-80%", opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block whitespace-nowrap text-center leading-[1.2] text-blanc"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </span>
    </span>
  );
}

/** Mockup téléphone façon Rociny : splash screen de l'app, coupé par le bas du hero. */
function PhoneSplash() {
  return (
    <div className="relative mx-auto w-64 md:w-80">
      <div className="overflow-hidden rounded-[3rem] border-[7px] border-noir bg-noir shadow-[0_40px_120px_rgba(4,18,28,0.55)]">
        <div className="relative overflow-hidden rounded-[2.55rem]">
          <img src="/screens/splash.jpg" alt="Écran de démarrage de l'application Tchil" className="w-full" />
          <span
            className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-noir"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 pt-32 md:pt-40">
      {/* Fond répliqué du hero rociny.com (base pleine + fondus de bords + halos centraux),
          transposé du vert Rociny #067d63 au bleu Tchil profond.
          Retour client #74 : la grille de traits blancs a été retirée pour alléger le visuel. */}
      <div className="absolute inset-0 bg-[#0e5c87]" aria-hidden="true" />
      {/* halos circulaires très doux derrière le titre (blanc 4 % + bleu ciel 8 %) */}
      <div
        className="absolute left-1/2 top-[30%] h-[930px] w-[930px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-[0.05] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-[30%] h-[690px] w-[690px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#aadcff] opacity-[0.1] blur-3xl"
        aria-hidden="true"
      />
      {/* fondus de bords vers le bleu nuit, comme les 4 calques de Rociny */}
      <div
        className="absolute inset-x-0 top-0 h-56"
        aria-hidden="true"
        style={{ background: "linear-gradient(180deg, #04121c 8%, rgba(4,18,28,0) 100%)" }}
      />
      <div
        className="absolute inset-y-0 left-0 w-[8%]"
        aria-hidden="true"
        style={{ background: "linear-gradient(90deg, rgba(4,18,28,0.35) 0%, rgba(4,18,28,0) 100%)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[8%]"
        aria-hidden="true"
        style={{ background: "linear-gradient(270deg, rgba(4,18,28,0.35) 0%, rgba(4,18,28,0) 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        aria-hidden="true"
        style={{ background: "linear-gradient(0deg, #04121c 8%, rgba(4,18,28,0) 100%)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="font-asap text-[clamp(2.7rem,6.5vw,5.6rem)] font-extrabold leading-[1.08] tracking-tight text-blanc text-balance">
          <motion.span
            className="block"
            initial={reduce ? false : { opacity: 0, y: 36, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            La rencontre{" "}
            {/* photo-sticker inclinée insérée dans le titre, effet signature Rociny */}
            <span className="mx-1 inline-block -rotate-6 overflow-hidden rounded-2xl border-[5px] border-blanc align-middle shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:rotate-0">
              <img
                src="/hero-friends.jpg"
                alt="Trois amis souriants"
                className="h-[0.95em] w-[1.9em] object-cover object-[center_62%]"
              />
            </span>{" "}
            réelle,
          </motion.span>
          {/* mot rotatif dans un cadre affiné (bordure + verre dépoli) */}
          <motion.span
            className="mt-3 block"
            initial={reduce ? false : { opacity: 0, y: 36, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            <RotatingFrame words={["spontanée.", "vérifiée.", "récompensée.", "authentique."]} />
          </motion.span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-blanc/85 md:text-lg"
        >
          Tchil connecte les personnes présentes au même endroit, au même moment.
          <br className="hidden md:block" /> Un scan, une rencontre, des souvenirs — sans swipe,
          sans profils fantômes.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#cta"
            className="group flex items-center gap-2.5 rounded-full bg-noir py-2 pl-6 pr-2 text-sm font-semibold text-blanc shadow-[0_14px_40px_rgba(0,0,0,0.45)] transition-all duration-200 hover:scale-[1.03]"
          >
            Télécharger Tchil
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blanc text-noir transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
          <a
            href="#concept"
            className="group flex items-center gap-2.5 rounded-full bg-blanc py-2 pl-6 pr-2 text-sm font-semibold text-noir shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-[1.03]"
          >
            Comment ça marche ?
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-noir text-blanc transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-6 flex justify-center"
        >
          <StoreBadges variant="light" />
        </motion.div>
      </div>

      {/* Mockup téléphone qui monte du bas du hero, coupé par le pli —
          apparition au chargement (ressort + montée) */}
      <motion.div
        className="relative z-10 -mb-[26%] mt-16 md:-mb-[13%] md:mt-20"
        initial={reduce ? false : { opacity: 0, y: 140, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.55, duration: 1, type: "spring", bounce: 0.25 }}
      >
        {/* Retour client #68 : flottement continu pour rendre le hero plus vivant */}
        <div className="animate-float" style={{ animationDuration: "6s" }}>
          <PhoneSplash />
        </div>
      </motion.div>
    </section>
  );
}
