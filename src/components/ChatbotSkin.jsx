import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const CHATBOT_ORIGIN = "https://limova-web-sltj.onrender.com";

/* Habillage charte du bouton du chatbot Limova. La bulle réelle vit dans une
   iframe cross-origin (voir index.html) : impossible de la restyler. Ce
   composant superpose donc un bouton au design Tchil EXACTEMENT sur la bulle
   (48 px, bottom/right 24 — dimensions du loader) en `pointer-events: none`,
   pour que le clic traverse et déclenche la vraie ouverture dans l'iframe.
   L'état ouvert/fermé est lu sur les messages `chatbotOpen` que l'iframe
   poste au parent ; le skin se masque quand le chat est ouvert. Ne pas
   déplacer/redimensionner ce bouton sans recaler la bulle du loader. */
export function ChatbotSkin() {
  const [open, setOpen] = useState(false);
  // premier montage : on attend la levée de l'intro rideau (comme l'iframe,
  // animée avec 2,8 s de délai dans index.css) ; les réapparitions après
  // fermeture du chat sont immédiates
  const booted = useRef(false);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== CHATBOT_ORIGIN) return;
      if (e.data && typeof e.data === "object" && "chatbotOpen" in e.data) {
        setOpen(!!e.data.chatbotOpen);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="pointer-events-none fixed bottom-6 right-6 z-[56] h-12 w-12"
          initial={{ opacity: 0, y: 14, scale: 0.8 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: booted.current ? 0.1 : 2.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.12 } }}
          onAnimationComplete={() => {
            booted.current = true;
          }}
        >
          {/* onde douce derrière le bouton */}
          <span
            className="animate-chat-pulse absolute inset-0 rounded-full bg-tchil/40"
            aria-hidden="true"
          />
          <span className="gradient-noir-bleu relative flex h-12 w-12 items-center justify-center rounded-full border border-blanc/25 shadow-[0_10px_30px_rgba(4,18,28,0.45)]">
            <MessageCircle className="h-5 w-5 text-blanc" strokeWidth={2} fill="currentColor" fillOpacity={0.15} />
          </span>
          {/* pastille « en ligne » */}
          <span
            className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-blanc bg-tchil"
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
