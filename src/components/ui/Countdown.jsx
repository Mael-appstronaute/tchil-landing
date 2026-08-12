import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* Lancement de l'application prévu en janvier 2027 (retour client 10/08). */
const LAUNCH = new Date("2027-01-01T00:00:00+01:00");

function remaining() {
  const diff = Math.max(0, LAUNCH.getTime() - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    jours: Math.floor(s / 86400),
    heures: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    sec: s % 60,
  };
}

/** Chiffre animé : l'ancienne valeur glisse vers le haut, la nouvelle monte du bas. */
function Digit({ value }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative block overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduce ? false : { y: "70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={reduce ? undefined : { y: "-70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: EASE }}
          className="block tabular-nums leading-none"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Compte à rebours jusqu'au lancement de l'app — capsule en verre dépoli
 * pour les heros bleus (accueil + Espace Pro), chiffres Asap qui défilent.
 */
export function Countdown() {
  const [time, setTime] = useState(remaining);

  useEffect(() => {
    const id = setInterval(() => setTime(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "jours", value: String(time.jours) },
    { label: "heures", value: String(time.heures).padStart(2, "0") },
    { label: "min", value: String(time.min).padStart(2, "0") },
    { label: "sec", value: String(time.sec).padStart(2, "0") },
  ];

  return (
    <div
      role="timer"
      aria-label="Compte à rebours jusqu'au lancement de l'application, prévu en janvier 2027"
      className="inline-flex flex-col items-center gap-3.5"
    >
      <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blanc/75">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#aadcff] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#aadcff]" />
        </span>
        Lancement de l'app · janvier 2027
      </span>

      <div className="flex items-stretch divide-x divide-blanc/10 rounded-[1.4rem] border border-blanc/15 bg-blanc/[0.08] shadow-[0_14px_40px_rgba(4,18,28,0.35)] backdrop-blur-md">
        {cells.map((c) => (
          <div key={c.label} className="flex min-w-[4.6rem] flex-col items-center gap-1.5 px-4 py-4 md:min-w-[5.4rem] md:px-5">
            <span className="font-asap text-2xl font-extrabold text-blanc md:text-3xl">
              <Digit value={c.value} />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-blanc/50">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
