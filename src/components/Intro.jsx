import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Écran d'entrée du site (retour client 01/09) : fond noir, le logo Tchil
   apparaît avec un halo bleu qui respire et le trait bleu de la charte se
   déploie dessous, puis le rideau noir se lève pour révéler le site — le
   contenu n'est monté qu'à ce moment-là (via onReveal) pour que les
   animations du hero se jouent pendant la levée du rideau. */

const EASE_CURTAIN = [0.83, 0, 0.17, 1];
const EASE_OUT = [0.16, 1, 0.3, 1];

export function Intro({ onReveal }) {
  const reduce = useReducedMotion();
  const [lift, setLift] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduce) {
      onReveal();
      setGone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      onReveal();
      setLift(true);
    }, 2050);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-noir"
      initial={false}
      animate={lift ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: EASE_CURTAIN }}
      onAnimationComplete={() => lift && setGone(true)}
      aria-hidden="true"
    >
      {/* halo bleu qui respire derrière le logo */}
      <motion.div
        className="absolute h-[480px] w-[480px] rounded-full bg-tchil blur-3xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.16, 0.1], scale: [0.6, 1, 1.05] }}
        transition={{ duration: 1.8, ease: "easeOut", times: [0, 0.55, 1] }}
      />

      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 26, scale: 0.92, filter: "blur(10px)" }}
        animate={
          lift
            ? { opacity: 0, y: -60, scale: 0.96, filter: "blur(6px)" }
            : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
        }
        transition={
          lift ? { duration: 0.45, ease: "easeIn" } : { duration: 0.9, delay: 0.25, ease: EASE_OUT }
        }
      >
        <img src="/logos/principal-white.svg" alt="" className="h-20 w-auto md:h-24" />
        {/* trait bleu façon marqueur de section, déployé sous le logo */}
        <motion.span
          className="mt-1 h-0.5 rounded-full bg-tchil"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0, ease: EASE_OUT }}
        />
      </motion.div>
    </motion.div>
  );
}
