import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BarChart3, CalendarHeart, Gift, Sparkles, X, ZoomIn } from "lucide-react";
import { Reveal } from "./ui/Reveal.jsx";
import { BrowserFrame } from "./ui/PhoneMockup.jsx";
import { Countdown } from "./ui/Countdown.jsx";
import { PartnerForm } from "./PartnerForm.jsx";
import { Footer } from "./Footer.jsx";

/* Page dédiée aux professionnels (retours client #57, #59 et #61) :
   la landing reste centrée sur les utilisateurs, tout le contenu
   établissements vit ici — découverte du concept, avantages du
   partenariat, accès à l'espace partenaire.
   Retours Figma 10/08 : visuel événements dans le hero, message élargi à
   toute structure recevant du public, tarifs pro — offre de lancement
   Paris & IDF 2027. Retour 21/08 : la prise de rendez-vous (Google Agenda)
   n'est accessible QU'APRÈS l'envoi du formulaire partenaire — aucun bouton
   « Prendre rendez-vous » ailleurs sur la page, les CTA renvoient au
   formulaire (#devenir-partenaire, voir PartnerForm.jsx). */

const scrollToForm = () =>
  document.getElementById("devenir-partenaire")?.scrollIntoView({ behavior: "smooth" });

const TARIFS = [
  { name: "Start", prix: "29,90", ancien: "49,90" },
  { name: "Plus", prix: "39,90", ancien: "69,90", accent: true },
  { name: "Premium", prix: "49,90", ancien: "89,90" },
];

/* Écrans du back-office présentés dans le hero — cliquables pour un
   agrandissement plein écran (retour client 12/08 : écrans en grand format). */
const PRO_SCREENS = [
  {
    id: "dashboard",
    src: "/screens/pro-dashboard.jpg",
    alt: "Tableau de bord de l'espace pro Tchil",
    label: "Le tableau de bord de votre établissement",
  },
  {
    id: "evenements",
    src: "/screens/pro-evenements.jpg",
    alt: "Gestion des événements dans l'espace pro Tchil",
    label: "La gestion de vos événements",
  },
];

/** Lightbox : écran du back-office agrandi, fermeture clic / Échap. */
function ProScreenLightbox({ index, onClose }) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#04121c]/90 px-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer l'aperçu"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-blanc/25 text-blanc transition-colors hover:border-blanc"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.div
            className="w-[min(92vw,1200px)]"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <BrowserFrame
              src={PRO_SCREENS[index].src}
              alt={PRO_SCREENS[index].alt}
              className="border-blanc/10 shadow-[0_60px_160px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
          <p className="mt-6 text-center text-sm font-semibold text-blanc/85">
            {PRO_SCREENS[index].label}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const POINTS = [
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
];

export function EspacePro() {
  const [zoom, setZoom] = useState(null);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#/" aria-label="Tchil — retour à l'accueil">
            <img src="/logos/principal-white.svg" alt="Tchil.app" className="h-10 w-auto md:h-11" />
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#/"
              className="flex items-center gap-2 text-sm font-medium text-blanc/80 transition-colors duration-200 hover:text-blanc"
            >
              <ArrowLeft className="h-4 w-4" /> Retour au site
            </a>
            <a
              href="https://pro.tchil.app"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-blanc px-5 py-2.5 text-sm font-semibold text-noir shadow-[0_10px_30px_rgba(4,18,28,0.35)] transition-all duration-200 hover:scale-[1.03] sm:block"
            >
              Accéder à mon espace
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero pro — même univers que le hero de l'accueil, sans la grille */}
        <section className="relative overflow-hidden px-5 pb-16 pt-32 md:pb-24 md:pt-44">
          <div className="absolute inset-0 bg-[#0e5c87]" aria-hidden="true" />
          <div
            className="absolute left-1/2 top-[30%] h-[930px] w-[930px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-[0.05] blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-[30%] h-[690px] w-[690px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#aadcff] opacity-[0.1] blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-56"
            aria-hidden="true"
            style={{ background: "linear-gradient(180deg, #04121c 8%, rgba(4,18,28,0) 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-56"
            aria-hidden="true"
            style={{ background: "linear-gradient(0deg, #04121c 8%, rgba(4,18,28,0) 100%)" }}
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal>
              <span className="font-asap inline-block rounded-full border border-blanc/30 bg-blanc/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blanc backdrop-blur-sm">
                Espace Pro
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-asap mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-blanc text-balance md:text-6xl">
                Une app côté rencontres, un espace pro côté comptoir.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blanc/85 md:text-lg">
                Bar, restaurant ou toute autre structure commerciale recevant du public :
                Tchil fait venir les gens chez vous, pas seulement sur un écran.
                Devenez lieu partenaire et transformez chaque check-in en client fidèle.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {/* Scroll vers le formulaire partenaire — bouton (pas d'ancre href :
                  changer le hash casserait le routing #/espace-pro) */}
              <button
                type="button"
                onClick={scrollToForm}
                className="group flex items-center gap-2.5 rounded-full bg-blanc py-2 pl-6 pr-2 text-sm font-semibold text-noir shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-[1.03]"
              >
                Devenir partenaire
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-noir text-blanc transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <a
                href="https://pro.tchil.app"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-blanc/40 px-6 py-3 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03] hover:border-blanc"
              >
                Accéder à mon espace
              </a>
            </Reveal>

            {/* Compte à rebours jusqu'au lancement (retour client 10/08) */}
            <Reveal delay={0.4} className="mt-10 flex justify-center">
              <Countdown />
            </Reveal>
          </div>

          {/* Deux écrans du back-office : tableau de bord + gestion des événements —
              en grand format et cliquables pour un agrandissement plein écran */}
          <Reveal delay={0.45} className="relative z-10 mx-auto mt-14 grid w-full max-w-6xl gap-8 md:grid-cols-2 md:gap-6">
            {PRO_SCREENS.map((s, i) => (
              <div key={s.id} className={i === 1 ? "md:translate-y-8" : ""}>
                <button
                  type="button"
                  onClick={() => setZoom(i)}
                  aria-label={`Agrandir : ${s.label}`}
                  className="group relative block w-full cursor-zoom-in transition-transform duration-300 hover:-translate-y-2"
                >
                  <BrowserFrame
                    src={s.src}
                    alt={s.alt}
                    className="border-blanc/10 shadow-[0_30px_100px_rgba(4,18,28,0.55)]"
                  />
                  <span className="pointer-events-none absolute right-3 top-10 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-noir/70 text-blanc opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </button>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Avantages du partenariat */}
        <section className="bg-blanc px-5 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
              <img src="/logos/icone-bleu.svg" alt="" aria-hidden="true" className="h-9 w-9" />
              <span className="mt-3 h-0.5 w-10 rounded-full bg-tchil" aria-hidden="true" />
              <h2 className="font-asap mt-6 text-3xl font-extrabold tracking-tight text-noir text-balance md:text-5xl">
                Pourquoi devenir lieu partenaire ?
              </h2>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {POINTS.map((p) => (
                <Reveal key={p.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-noir/10 bg-white shadow-[0_6px_20px_rgba(23,53,75,0.1)]">
                    <p.Icon className="h-5 w-5 text-tchil" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="font-asap block text-lg font-bold text-noir">{p.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-noir/55">{p.text}</span>
                  </span>
                </Reveal>
              ))}
            </div>

            {/* Invitation à remplir le formulaire partenaire — la prise de
                rendez-vous n'est proposée qu'après l'envoi (retour 21/08) */}
            <Reveal className="mt-16">
              <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-noir/10 bg-white p-8 text-center shadow-[0_10px_40px_rgba(23,53,75,0.08)] md:flex-row md:p-10 md:text-left">
                <div className="flex items-start gap-4">
                  <img src="/logos/icone-bleu.svg" alt="" className="hidden h-10 w-10 md:block" />
                  <p className="max-w-xl text-base font-medium leading-relaxed text-noir md:text-lg">
                    Bar, restaurant, café ou toute autre structure commerciale recevant du public :{" "}
                    <span className="font-semibold text-tchil">
                      vous souhaitez devenir un lieu Tchil et apparaître sur la carte de l'application ?
                    </span>{" "}
                    Présentez-nous votre établissement via le formulaire partenaire, nous revenons
                    vers vous rapidement.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-tchil px-7 py-3.5 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03] hover:bg-noir"
                >
                  Devenir partenaire <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tarifs pro — offre de lancement Paris & Île-de-France, valable toute
            l'année 2027 : tarifs réduits, 6 mois offerts sur 12 d'engagement,
            remises fidélité 2 et 3 ans. Tarifs standards de retour après 2027. */}
        <section id="tarifs-pro" className="bg-[#f4f6f8] px-5 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto mb-4 flex max-w-3xl flex-col items-center text-center">
              <span className="flex w-fit items-center gap-1.5 rounded-full border border-tchil/40 bg-tchil/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-tchil">
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                Offre de lancement · Paris &amp; Île-de-France
              </span>
              <h2 className="font-asap mt-6 text-3xl font-extrabold tracking-tight text-noir text-balance md:text-5xl">
                Tarifs professionnels 2027
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-noir/60">
                Pendant toute l'année 2027, les lieux de Paris &amp; Île-de-France profitent
                de tarifs de lancement réduits. Quelle que soit la formule :{" "}
                <span className="font-semibold text-noir">
                  engagement de 12 mois, dont 6 mois offerts.
                </span>
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TARIFS.map((t) => (
                <Reveal key={t.name}>
                  <div
                    className={`relative flex h-full flex-col rounded-3xl p-8 ${
                      t.accent
                        ? "bg-noir text-blanc shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                        : "border border-noir/10 bg-white text-noir shadow-[0_10px_40px_rgba(23,53,75,0.08)]"
                    }`}
                  >
                    <span
                      className={`font-asap text-xs font-bold uppercase tracking-[0.18em] ${
                        t.accent ? "text-tchil" : "text-noir/50"
                      }`}
                    >
                      {t.name}
                    </span>
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="font-asap text-4xl font-extrabold tracking-tight">
                        {t.prix} €
                      </span>
                      <span className={`text-sm ${t.accent ? "text-blanc/60" : "text-noir/50"}`}>
                        /mois
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${t.accent ? "text-blanc/60" : "text-noir/50"}`}>
                      au lieu de <span className="line-through">{t.ancien} €/mois</span>
                    </p>
                    <span
                      className={`mt-5 flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
                        t.accent ? "bg-tchil/20 text-tchil" : "bg-tchil/10 text-tchil"
                      }`}
                    >
                      <Gift className="h-3 w-3" strokeWidth={2.5} />
                      6 mois offerts
                    </span>
                    <p className={`mt-4 text-xs leading-relaxed ${t.accent ? "text-blanc/50" : "text-noir/45"}`}>
                      Tarif de lancement valable toute l'année 2027 — engagement de 12 mois,
                      dont 6 mois offerts.
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Remises selon la durée d'engagement */}
            <Reveal className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { duree: "Engagement 2 ans", remise: "−10 %" },
                  { duree: "Engagement 3 ans", remise: "−20 %" },
                ].map((e) => (
                  <div
                    key={e.duree}
                    className="flex items-center justify-between gap-4 rounded-3xl border border-noir/10 bg-white p-6 shadow-[0_10px_40px_rgba(23,53,75,0.08)] md:p-7"
                  >
                    <div>
                      <p className="font-asap text-lg font-bold text-noir">{e.duree}</p>
                      <p className="mt-0.5 text-sm text-noir/55">sur la totalité de l'engagement</p>
                    </div>
                    <span className="font-asap shrink-0 rounded-2xl bg-tchil/10 px-4 py-2.5 text-2xl font-extrabold text-tchil">
                      {e.remise}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10 flex flex-col items-center gap-5 text-center">
              <button
                type="button"
                onClick={scrollToForm}
                className="group flex items-center gap-2.5 rounded-full bg-noir py-2 pl-6 pr-2 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03]"
              >
                Devenir partenaire
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tchil text-blanc transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <div className="max-w-2xl space-y-1 text-xs leading-relaxed text-noir/45">
                <p>
                  Après 2027, les tarifs standards s'appliquent : de 49,90 € à 89,90 €/mois
                  selon la formule choisie.
                </p>
                <p>
                  Le déploiement national de Tchil est prévu progressivement au cours de
                  l'année 2027.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Formulaire de prise de contact professionnel (retour client 21/08) */}
        <PartnerForm />
      </main>

      <ProScreenLightbox index={zoom} onClose={() => setZoom(null)} />

      <Footer />
    </>
  );
}
