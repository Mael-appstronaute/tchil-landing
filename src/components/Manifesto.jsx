import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/** Texte du manifesto, découpé en mots (les mots `blue` sont en bleu Tchil). */
const WORDS = [
  { t: "Les applis de rencontre ont créé des matchs. Tchil crée des " },
  { t: "souvenirs.", blue: true },
  { t: " Ici, tout commence par une " },
  { t: "présence réelle", blue: true },
  { t: " — un lieu, un moment, une personne en face de vous." },
].flatMap((seg) =>
  seg.t
    .split(" ")
    .filter(Boolean)
    .map((w) => ({ w, blue: seg.blue }))
);

const TOTAL_LETTERS = WORDS.reduce((n, { w }) => n + w.length, 0);

/** Une lettre dont l'opacité suit la progression du scroll. */
function Letter({ progress, index, char }) {
  const start = index / TOTAL_LETTERS;
  const end = Math.min(start + 6 / TOTAL_LETTERS, 1);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  );
}

/**
 * Texte révélé lettre par lettre, LIÉ au scroll (comme le bloc section-intro
 * de rociny.com) : chaque lettre s'éclaire progressivement pendant la descente.
 * Les espaces restent HORS des spans nowrap pour permettre les retours à la ligne.
 */
function LetterReveal() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  let letterIndex = 0;

  return (
    <h2
      ref={ref}
      className="font-asap relative text-4xl font-bold leading-[1.22] tracking-tight text-noir md:text-[3.5rem]"
    >
      {WORDS.map(({ w, blue }, i) => {
        const letters = w.split("").map((char) => {
          const idx = letterIndex;
          letterIndex += 1;
          return reduce ? (
            char
          ) : (
            <Letter key={idx} progress={scrollYProgress} index={idx} char={char} />
          );
        });
        return [
          <span key={`w-${i}`} className={`inline-block whitespace-nowrap ${blue ? "text-tchil" : ""}`}>
            {letters}
          </span>,
          " ",
        ];
      })}
    </h2>
  );
}

/** Cartes flottantes en verre dépoli autour du téléphone, façon Rociny. */
function GlassCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6, type: "spring", bounce: 0.3 }}
      className={`absolute z-20 rounded-2xl border border-noir/10 bg-blanc/80 p-3.5 shadow-[0_20px_50px_rgba(23,53,75,0.16)] backdrop-blur-md ${className}`}
    >
      <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

export function Manifesto() {
  const reduce = useReducedMotion();

  return (
    <section id="concept" className="relative px-5 py-24 md:py-32">
      {/* taches bleues floutées sur les côtés, comme les halos verts de Rociny */}
      <div
        className="pointer-events-none absolute -left-52 bottom-24 h-[560px] w-[560px] rounded-full bg-tchil/45 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-52 top-16 h-[560px] w-[560px] rounded-full bg-tchil/45 blur-[130px]"
        aria-hidden="true"
      />

      {/* Bloc texte : titre, bouton, paragraphe — aligné à gauche dans une colonne centrale */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <LetterReveal />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        >
          <a
            href="#cta"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-noir py-2.5 pl-7 pr-2.5 text-base font-semibold text-blanc shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-[1.03]"
          >
            Télécharger Tchil
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blanc text-noir transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
          <p className="mt-7 max-w-md text-base leading-relaxed text-noir/55 md:text-lg">
            Découvrez une nouvelle façon de vous rencontrer. Checkez-vous dans un lieu partenaire,
            voyez qui est présent autour de vous, et laissez la vraie vie faire le reste.
          </p>
        </motion.div>
      </div>

      {/* Téléphone centré sous le texte, entouré de cartes flottantes
          (retour client 12/08 : écran agrandi pour la lisibilité) */}
      <div className="relative z-10 mx-auto mt-28 w-80 md:mt-40 md:w-[400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="overflow-hidden rounded-[3rem] border-[7px] border-noir bg-noir shadow-[0_40px_100px_rgba(23,53,75,0.35)]"
        >
          <div className="relative overflow-hidden rounded-[2.55rem]">
            <img
              src="/screens/onboarding.jpg"
              alt="Écran d'accueil de l'application Tchil : « La rencontre commence ici »"
              className="w-full"
            />
            <span
              className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-noir"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        <GlassCard delay={0.25} className="-left-24 top-14 w-44 md:-left-52">
          <p className="text-[10px] font-semibold text-noir/50">Ce soir autour de vous</p>
          <p className="font-asap mt-1 text-2xl font-extrabold text-noir">
            12 <span className="text-sm font-bold text-tchil">présents</span>
          </p>
          <div className="mt-2 flex items-end gap-1">
            {[30, 55, 40, 75, 100, 65].map((h, i) => (
              <span
                key={i}
                className={`w-3 rounded-t ${i === 4 ? "bg-tchil" : "bg-noir/15"}`}
                style={{ height: `${h * 0.3}px` }}
              />
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.45} className="-right-24 -top-6 w-48 md:-right-56">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-noir">
              <MapPin className="h-4 w-4 text-tchil" />
            </span>
            <span>
              <span className="font-asap block text-xs font-bold text-noir">Le Comptoir</span>
              <span className="block text-[9px] text-noir/50">Bar · Paris 11ᵉ</span>
            </span>
          </div>
          <div className="mt-2 rounded-xl bg-tchil px-3 py-1.5 text-center text-[10px] font-bold text-blanc">
            Scanner pour se checker
          </div>
        </GlassCard>

        <GlassCard delay={0.65} className="-right-20 bottom-16 w-48 md:-right-48">
          <div className="flex items-center gap-2">
            <span className="font-asap flex h-8 w-8 items-center justify-center rounded-full bg-tchil text-xs font-bold text-blanc">
              K
            </span>
            <span className="flex-1 text-[11px] font-semibold text-noir">
              Karim vous dit bonjour 👋
            </span>
          </div>
          <p className="mt-1.5 text-[9px] text-noir/50">Interaction acceptée · chat débloqué 💬</p>
        </GlassCard>
      </div>
    </section>
  );
}
