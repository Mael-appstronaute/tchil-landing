import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Carte au format exact des cards « section-benefits » de Rociny :
 * blanc, rounded-32, bordure #eff1f3, ombre douce, halo radial bleu en bas,
 * visuel en haut masqué en fondu, copy en bas.
 */
function RocinyCard({
  children,
  title,
  text,
  className = "",
  delay = 0,
  maskVisual = true,
  visualClass = "h-64",
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      className={`relative flex flex-col overflow-hidden rounded-[32px] border border-[#eff1f3] bg-white shadow-[0_1px_23px_rgba(23,53,75,0.13)] ${className}`}
    >
      {/* halo radial bleu qui monte du bas de la carte (BgBlur de Rociny) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(94% 69% at 50% 100%, rgba(110,170,204,0.44) 0%, rgba(110,170,204,0) 100%)",
        }}
      />
      <div
        className={`relative shrink-0 ${visualClass}`}
        style={
          maskVisual
            ? {
                WebkitMaskImage: "linear-gradient(rgb(0,0,0) 55%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(rgb(0,0,0) 55%, rgba(0,0,0,0) 100%)",
              }
            : undefined
        }
      >
        {children}
      </div>
      <div className="relative z-10 mt-auto px-7 pb-7 pt-2">
        <h4 className="font-asap text-xl font-bold leading-snug text-noir md:text-2xl">{title}</h4>
        <p className="mt-2 text-sm leading-snug text-noir/55">{text}</p>
      </div>
    </motion.article>
  );
}

/**
 * Visuel 1 : grand disque central avec le logo Tchil, anneaux concentriques et
 * têtes rondes posées sur l'orbite — réplique de la carte Delsey de Rociny.
 * Au survol, toute l'orbite tourne doucement (les têtes restent droites).
 */
function RingsHeadsVisual() {
  const heads = [
    { src: "/people/p1.jpg", pos: "left-[30%] -top-2", size: "h-16 w-16", ring: "border-blanc", d: "0s" },
    { src: "/people/p2.jpg", pos: "right-[10%] top-8", size: "h-[70px] w-[70px]", ring: "border-blanc", d: "0.8s" },
    { src: "/people/p3.jpg", pos: "left-[2%] top-[34%]", size: "h-[70px] w-[70px]", ring: "border-blanc", d: "1.5s" },
    { src: "/people/p4.jpg", pos: "-right-1 top-[52%]", size: "h-16 w-16", ring: "border-tchil", d: "2.2s" },
  ];
  return (
    <div className="group relative flex h-full w-full items-start justify-center overflow-hidden pt-8">
      <div className="relative flex h-[360px] w-[340px] items-start justify-center transition-transform duration-700 ease-out group-hover:rotate-6">
        {/* anneaux concentriques */}
        <span
          className="absolute left-1/2 top-4 h-[260px] w-[260px] -translate-x-1/2 rounded-full border-[3px] border-tchil/40"
          aria-hidden="true"
        />
        <span
          className="absolute left-1/2 top-[-24px] h-[340px] w-[340px] -translate-x-1/2 rounded-full border-2 border-tchil/20"
          aria-hidden="true"
        />
        {/* disque central avec le logo */}
        <div className="absolute left-1/2 top-12 flex h-44 w-44 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_16px_50px_rgba(23,53,75,0.18)] transition-transform duration-700 ease-out group-hover:-rotate-6">
          <img src="/logos/principal.svg" alt="Tchil.app" className="w-28" />
        </div>
        {/* têtes rondes sur l'orbite (contre-rotation pour rester droites) */}
        {heads.map((h) => (
          <span
            key={h.src}
            className={`absolute transition-transform duration-700 ease-out group-hover:-rotate-6 ${h.pos}`}
          >
            <img
              src={h.src}
              alt=""
              className={`animate-float rounded-full border-4 object-cover shadow-[0_8px_24px_rgba(23,53,75,0.28)] ${h.size} ${h.ring}`}
              style={{ animationDelay: h.d }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Visuel 2 : trois grands téléphones serrés qui se chevauchent, encoche visible,
 * coupés par le fondu — réplique du visuel « AppImages » de Rociny.
 */
function PhoneFig({ src, alt, className = "" }) {
  return (
    <figure
      className={`absolute w-48 overflow-hidden rounded-[2.2rem] border-[6px] border-noir bg-noir shadow-[0_20px_45px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out md:w-56 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.8rem]">
        <img src={src} alt={alt} className="block w-full" />
        <span
          className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-noir"
          aria-hidden="true"
        />
      </div>
    </figure>
  );
}

function PhonesFanVisual() {
  return (
    <div className="group relative h-full w-full overflow-hidden">
      <PhoneFig
        src="/screens/carte.jpg"
        alt="Écran carte des lieux Tchil"
        className="left-[2%] top-10 -rotate-[7deg] group-hover:-translate-x-3 group-hover:-translate-y-1 group-hover:-rotate-[11deg] md:left-[6%]"
      />
      <PhoneFig
        src="/screens/presents.jpg"
        alt="Écran des personnes présentes"
        className="left-1/2 top-3 z-10 -translate-x-1/2 group-hover:-translate-y-3"
      />
      <PhoneFig
        src="/screens/scanner.jpg"
        alt="Écran scanner de QR code"
        className="-right-[6%] top-8 z-20 rotate-12 group-hover:translate-x-3 group-hover:-translate-y-1 group-hover:rotate-[16deg] md:-right-[2%]"
      />
    </div>
  );
}

/**
 * Visuel 3 : trois grandes cartes photos inclinées qui se chevauchent, avec
 * légendes et pastilles de carrousel — réplique du « Collaborez en toute
 * confiance » de Rociny. Au survol, l'éventail s'écarte.
 */
function TiltedPhotosVisual() {
  const cards = [
    {
      src: "/people/p3.jpg",
      name: "Léa",
      meta: "Paris 11ᵉ",
      cls: "left-[1%] top-12 z-10 h-60 w-52 -rotate-[11deg] group-hover:-translate-x-3 group-hover:-rotate-[15deg]",
    },
    {
      src: "/people/p2.jpg",
      name: "Karim",
      meta: "Le Comptoir",
      cls: "left-1/2 top-5 h-64 w-56 -translate-x-1/2 -rotate-3 group-hover:-translate-y-2",
    },
    {
      src: "/people/p1.jpg",
      name: "Sofia",
      meta: "à 120 m",
      badge: "12 rencontres · 4,8 ★",
      cls: "right-[1%] top-8 z-20 h-72 w-60 rotate-[7deg] group-hover:translate-x-3 group-hover:rotate-[11deg]",
    },
  ];
  return (
    <div className="group relative h-full w-full overflow-hidden">
      {cards.map((c) => (
        <figure
          key={c.name}
          className={`absolute overflow-hidden rounded-[28px] shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out ${c.cls}`}
        >
          <img src={c.src} alt={`Portrait de ${c.name}`} className="h-full w-full object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-noir/70 to-transparent px-4 pb-3 pt-8">
            <span>
              <span className="block text-sm font-bold text-blanc">{c.name}</span>
              <span className="block text-[10px] text-blanc/75">{c.meta}</span>
            </span>
            {c.badge ? (
              <span className="text-right text-[9px] font-semibold text-blanc/85">{c.badge}</span>
            ) : (
              <span className="flex items-center gap-1 pb-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((d) => (
                  <span
                    key={d}
                    className={`h-1 w-1 rounded-full ${d === 0 ? "bg-blanc" : "bg-blanc/40"}`}
                  />
                ))}
              </span>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * Visuel 4 : pile de notifications qui se chevauchent, exactement comme la
 * carte « C'est fini, c'est payé » de Rociny — grosse icône app en dégradé
 * (favicon Tchil), opacités graduées, et la pile s'écarte au survol.
 */
function NotifStackVisual() {
  const notifs = [
    {
      title: "Tchil",
      desc: "Léa vient d'arriver au Comptoir…",
      cls: "w-[86%] opacity-35 group-hover:-translate-y-1.5",
    },
    {
      title: "Nouvelle interaction !",
      desc: "Karim vous propose un verre 🍷",
      cls: "z-10 -mt-5 w-[93%] opacity-75",
    },
    {
      title: "Vous avez reçu une récompense !",
      desc: "+10 Tchil Points",
      cls: "z-20 -mt-5 w-full opacity-100 group-hover:translate-y-1.5",
    },
  ];
  return (
    <div className="group flex h-full w-full flex-col items-end justify-center px-6">
      {notifs.map((n) => (
        <div
          key={n.title}
          className={`flex items-center gap-3.5 rounded-3xl border border-[#eff1f3] bg-blanc/70 p-3 shadow-[0_10px_30px_rgba(23,53,75,0.1)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.03] group-hover:opacity-100 ${n.cls}`}
        >
          <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#8fc0dc] to-[#3d7096] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
            <img src="/logos/icone-white.svg" alt="" className="h-8 w-8" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-bold text-noir">{n.title}</span>
            <span className="block truncate text-[13px] text-noir/50">{n.desc}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="fonctionnalites" className="relative px-5 pb-24 pt-8 md:pb-32">
      {/* grande tache bleue floutée au centre, derrière les cartes */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tchil/45 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Titre à gauche + petit bouton pill, comme « Pourquoi Rociny change la donne ? » */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="font-asap max-w-xl text-4xl font-bold leading-tight tracking-tight text-noir md:text-5xl">
            Pourquoi Tchil change la donne ?
          </h2>
          <a
            href="#cta"
            className="group mt-7 inline-flex items-center gap-3 rounded-full bg-noir py-2.5 pl-7 pr-2.5 text-base font-semibold text-blanc shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-[1.03]"
          >
            Télécharger Tchil
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blanc text-noir transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </motion.div>

        {/* Bento 2×2 asymétrique, cartes au format Rociny */}
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <RocinyCard
            className="lg:col-span-2"
            visualClass="h-80"
            title="Voyez qui est là, maintenant."
            text="Trouvez en un regard les personnes présentes autour de vous."
          >
            <RingsHeadsVisual />
          </RocinyCard>

          <RocinyCard
            className="lg:col-span-3"
            delay={0.1}
            visualClass="h-80"
            title="Check-in vérifié."
            text="Scannez le QR code du lieu : votre présence est validée par GPS, en toute transparence."
          >
            <PhonesFanVisual />
          </RocinyCard>

          <RocinyCard
            className="lg:col-span-3"
            visualClass="h-80"
            title="Brisez la glace, en douceur."
            text="Des invitations simples, une réponse oui ou non — le chat ne s'ouvre qu'après une vraie rencontre."
          >
            <TiltedPhotosVisual />
          </RocinyCard>

          <RocinyCard
            className="lg:col-span-2"
            delay={0.1}
            maskVisual={false}
            title="Vos sorties vous récompensent."
            text="Chaque check-in rapporte des Tchil Points, à échanger chez les établissements partenaires."
          >
            <NotifStackVisual />
          </RocinyCard>
        </div>
      </div>
    </section>
  );
}
