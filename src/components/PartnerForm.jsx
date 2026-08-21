import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock3,
  Coffee,
  Dumbbell,
  Flower2,
  LoaderCircle,
  Mail,
  MailWarning,
  Martini,
  Beer,
  Scissors,
  ShieldCheck,
  Sparkles,
  Store,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Reveal } from "./ui/Reveal.jsx";

/* Formulaire de prise de contact professionnel (retours client 21/08) :
   porte d'entrée des futurs partenaires — toutes les infos nécessaires
   pour identifier, qualifier et enregistrer l'établissement, avec une
   catégorie d'activité clairement sélectionnable (cartes à icônes).

   Après l'envoi, une fenêtre propose — de manière FACULTATIVE — de
   prendre rendez-vous avec Tchil (créneau Google Agenda, demande soumise
   à validation). Ce bouton de prise de rendez-vous n'existe NULLE PART
   ailleurs : il n'apparaît qu'une fois le formulaire complété et envoyé.

   Envoi par e-mail via FormSubmit (https://formsubmit.co) — gratuit, sans
   backend ni compte. IMPORTANT : à la toute première soumission depuis le
   domaine, FormSubmit envoie un e-mail d'activation au destinataire — il
   faut cliquer le lien de confirmation une fois pour recevoir les demandes
   suivantes (à refaire si le domaine du site change). */
const BOOKING_URL = "https://calendar.app.google/MyGRypvYDJkWiwDc7";

/* Adresse qui reçoit les demandes de partenariat. */
const DESTINATAIRE = "contact@tchil.app";

/** Envoie la demande par e-mail via FormSubmit (AJAX, réponse JSON). */
async function sendPartnerRequest({ categorie, ...data }) {
  const res = await fetch(`https://formsubmit.co/ajax/${DESTINATAIRE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Demande partenaire Tchil — ${data.etablissement} (${categorie})`,
      _template: "table",
      Catégorie: categorie,
      "Nom de l'établissement": data.etablissement,
      "Responsable / contact": data.contact,
      "E-mail": data.email,
      Téléphone: data.telephone,
      Adresse: data.adresse,
      "Code postal": data.codePostal,
      Ville: data.ville,
      "Raison sociale": data.raisonSociale,
      "Site internet": data.site || "—",
      "Réseaux sociaux": data.reseaux || "—",
      "Commentaire / demande": data.commentaire || "—",
    }),
  });
  if (!res.ok) throw new Error(`FormSubmit ${res.status}`);
  /* FormSubmit répond 200 même en échec (ex. adresse pas encore activée,
     avec success: "false") — on vérifie donc le corps de la réponse. */
  const body = await res.json();
  if (String(body.success) !== "true") throw new Error(body.message || "FormSubmit refused");
}

const CATEGORIES = [
  { label: "Bar", Icon: Martini },
  { label: "Restaurant", Icon: UtensilsCrossed },
  { label: "Pub", Icon: Beer },
  { label: "Café", Icon: Coffee },
  { label: "Hôtel", Icon: BedDouble },
  { label: "Coiffeur", Icon: Scissors },
  { label: "Spa & bien-être", Icon: Flower2 },
  { label: "Salle de sport", Icon: Dumbbell },
  { label: "Autre", Icon: Store },
];

const REASSURANCE = [
  {
    Icon: Clock3,
    title: "Réponse rapide",
    text: "L'équipe Tchil revient vers vous sous 48 h ouvrées pour qualifier votre demande.",
  },
  {
    Icon: Sparkles,
    title: "Offre de lancement",
    text: "Paris & Île-de-France 2027 : tarifs réduits et 6 mois offerts sur 12 d'engagement.",
  },
  {
    Icon: ShieldCheck,
    title: "Données protégées",
    text: "Vos informations ne servent qu'à traiter votre demande de partenariat.",
  },
];

const inputClass =
  "peer w-full rounded-xl border border-noir/12 bg-[#f7f9fa] px-4 py-3 text-sm text-noir placeholder:text-noir/30 outline-none transition-all duration-200 focus:border-tchil focus:bg-white focus:ring-4 focus:ring-tchil/15";

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-baseline gap-1 text-[13px] font-semibold text-noir">
        {label}
        {required ? (
          <span className="text-tchil" aria-hidden="true">*</span>
        ) : (
          <span className="text-[11px] font-normal text-noir/40">(facultatif)</span>
        )}
      </span>
      {children}
    </label>
  );
}

/** Petit intitulé d'étape — numérotation Asap + trait, façon éditorial Tchil. */
function StepTitle({ n, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-asap text-xs font-extrabold tracking-[0.08em] text-tchil">{n}</span>
      <span className="font-asap text-sm font-bold uppercase tracking-[0.14em] text-noir">
        {children}
      </span>
      <span className="h-px flex-1 bg-noir/10" aria-hidden="true" />
    </div>
  );
}

/** Fenêtre post-envoi : proposition FACULTATIVE de prendre rendez-vous.
    Le créneau choisi sur le Google Agenda reste soumis à validation par Tchil. */
function BookingModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#04121c]/80 px-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Demande envoyée — prendre rendez-vous"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:p-10"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-tchil/25 blur-3xl"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la fenêtre"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-noir/10 text-noir/60 transition-colors hover:border-noir/30 hover:text-noir"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tchil/10">
              <CheckCircle2 className="h-7 w-7 text-tchil" strokeWidth={1.8} />
            </span>
            <h3 className="font-asap mt-5 text-2xl font-extrabold tracking-tight text-noir">
              Demande bien envoyée !
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-noir/60">
              Merci pour votre intérêt. Si vous le souhaitez, vous pouvez dès
              maintenant réserver un créneau pour échanger avec l'équipe Tchil —
              c'est facultatif, et la demande de rendez-vous reste soumise à
              validation par Tchil.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-tchil py-3.5 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.02] hover:bg-noir"
            >
              <CalendarCheck className="h-4 w-4" /> Prendre rendez-vous
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full rounded-full border border-noir/15 py-3.5 text-sm font-semibold text-noir/70 transition-colors duration-200 hover:border-noir/40 hover:text-noir"
            >
              Plus tard
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PartnerForm() {
  const [categorie, setCategorie] = useState("");
  const [categorieError, setCategorieError] = useState(false);
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!categorie) {
      setCategorieError(true);
      document.getElementById("categorie-etablissement")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const data = Object.fromEntries(new FormData(e.target).entries());
    setStatus("sending");
    try {
      await sendPartnerRequest({ categorie, ...data });
      setStatus("sent");
      setModalOpen(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="devenir-partenaire" className="bg-blanc px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
          <img src="/logos/icone-bleu.svg" alt="" aria-hidden="true" className="h-9 w-9" />
          <span className="mt-3 h-0.5 w-10 rounded-full bg-tchil" aria-hidden="true" />
          <h2 className="font-asap mt-6 text-3xl font-extrabold tracking-tight text-noir text-balance md:text-5xl">
            Devenez lieu partenaire
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-noir/60">
            Parlez-nous de votre établissement : ces informations nous permettent de
            qualifier votre demande et de préparer votre intégration sur Tchil.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid overflow-hidden rounded-[2rem] border border-noir/10 bg-white shadow-[0_20px_70px_rgba(23,53,75,0.12)] lg:grid-cols-[380px_1fr]">
            {/* Panneau gauche — même univers bleu que le hero */}
            <aside className="relative overflow-hidden bg-[#0e5c87] p-8 md:p-10">
              <div
                className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white opacity-[0.07] blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#aadcff] opacity-[0.14] blur-3xl"
                aria-hidden="true"
              />
              <img
                src="/logos/icone-white.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 opacity-[0.07]"
              />

              <div className="relative z-10 flex h-full flex-col">
                <span className="font-asap w-fit rounded-full border border-blanc/30 bg-blanc/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blanc backdrop-blur-sm">
                  Partenariat
                </span>
                <h3 className="font-asap mt-5 text-2xl font-extrabold leading-tight tracking-tight text-blanc md:text-[1.7rem]">
                  Votre établissement sur la carte Tchil.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-blanc/75">
                  Un formulaire, et on s'occupe du reste : qualification de votre
                  demande, présentation du partenariat et préparation de votre
                  espace pro.
                </p>

                <ul className="mt-8 space-y-5">
                  {REASSURANCE.map((r) => (
                    <li key={r.title} className="flex gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blanc/20 bg-blanc/10 backdrop-blur-sm">
                        <r.Icon className="h-4 w-4 text-blanc" strokeWidth={1.8} />
                      </span>
                      <span>
                        <span className="font-asap block text-sm font-bold text-blanc">{r.title}</span>
                        <span className="mt-0.5 block text-[13px] leading-relaxed text-blanc/65">
                          {r.text}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:contact@tchil.app"
                  className="mt-auto flex items-center gap-2.5 pt-10 text-sm font-semibold text-blanc/85 transition-colors duration-200 hover:text-blanc"
                >
                  <Mail className="h-4 w-4" /> contact@tchil.app
                </a>
              </div>
            </aside>

            {/* Formulaire */}
            <div className="p-6 md:p-10 lg:p-12">
              {status === "sent" ? (
                <div className="flex h-full min-h-[480px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-tchil/10">
                    <CheckCircle2 className="h-8 w-8 text-tchil" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-asap mt-6 text-2xl font-extrabold tracking-tight text-noir md:text-3xl">
                    Demande bien envoyée !
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-noir/60">
                    Merci pour votre intérêt. L'équipe Tchil étudie votre demande et
                    revient vers vous rapidement pour préparer l'intégration de votre
                    établissement.
                  </p>
                  {/* Prise de rendez-vous accessible UNIQUEMENT après l'envoi
                      du formulaire (facultative, soumise à validation) */}
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-7 flex items-center gap-2.5 rounded-full bg-tchil py-3 pl-6 pr-5 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03] hover:bg-noir"
                  >
                    <CalendarCheck className="h-4 w-4" /> Prendre rendez-vous
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-3 text-xs text-noir/40">
                    Facultatif — la demande de rendez-vous reste soumise à validation par Tchil.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  {/* Étape 1 — catégorie d'activité en cartes à icônes */}
                  <div id="categorie-etablissement">
                    <StepTitle n="01">Votre activité</StepTitle>
                    <p className="mt-2 text-[13px] text-noir/50">
                      Sélectionnez le type de votre établissement.
                      <span className="ml-1 text-tchil" aria-hidden="true">*</span>
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Type d'établissement"
                      className={`mt-4 grid grid-cols-3 gap-2.5 rounded-2xl sm:grid-cols-4 md:gap-3 lg:grid-cols-5 ${
                        categorieError ? "ring-2 ring-red-300 ring-offset-4" : ""
                      }`}
                    >
                      {CATEGORIES.map(({ label, Icon }) => {
                        const active = categorie === label;
                        return (
                          <button
                            key={label}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => {
                              setCategorie(label);
                              setCategorieError(false);
                            }}
                            className={`group relative flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 transition-all duration-200 ${
                              active
                                ? "border-tchil bg-tchil/10 shadow-[0_8px_24px_rgba(110,170,204,0.35)]"
                                : "border-noir/10 bg-white hover:-translate-y-0.5 hover:border-tchil/50 hover:shadow-[0_8px_24px_rgba(23,53,75,0.08)]"
                            }`}
                          >
                            <span
                              className={`absolute right-2 top-2 flex h-4.5 w-4.5 items-center justify-center rounded-full transition-all duration-200 ${
                                active ? "scale-100 bg-tchil opacity-100" : "scale-50 opacity-0"
                              }`}
                              aria-hidden="true"
                            >
                              <Check className="h-3 w-3 text-blanc" strokeWidth={3} />
                            </span>
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
                                active ? "bg-tchil text-blanc" : "bg-[#f0f4f7] text-noir/60 group-hover:text-tchil"
                              }`}
                            >
                              <Icon className="h-5 w-5" strokeWidth={1.7} />
                            </span>
                            <span
                              className={`text-center text-[12px] font-semibold leading-tight ${
                                active ? "text-noir" : "text-noir/65"
                              }`}
                            >
                              {label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {categorieError && (
                      <p className="mt-3 text-xs font-medium text-red-500">
                        Merci de sélectionner le type de votre établissement.
                      </p>
                    )}
                  </div>

                  {/* Étape 2 — l'établissement */}
                  <div className="mt-9">
                    <StepTitle n="02">Votre établissement</StepTitle>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <Field label="Nom de l'établissement" required>
                        <input name="etablissement" required placeholder="Le Comptoir du Canal" className={inputClass} />
                      </Field>
                      <Field label="Raison sociale / entreprise" required>
                        <input name="raisonSociale" required placeholder="SARL Comptoir du Canal" className={inputClass} />
                      </Field>
                      <Field label="Adresse" required className="md:col-span-2">
                        <input name="adresse" required placeholder="12 quai de Valmy" className={inputClass} />
                      </Field>
                      <Field label="Code postal" required>
                        <input name="codePostal" required inputMode="numeric" placeholder="75010" className={inputClass} />
                      </Field>
                      <Field label="Ville" required>
                        <input name="ville" required placeholder="Paris" className={inputClass} />
                      </Field>
                    </div>
                  </div>

                  {/* Étape 3 — le contact */}
                  <div className="mt-9">
                    <StepTitle n="03">Votre contact</StepTitle>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <Field label="Nom et prénom" required>
                        <input name="contact" required placeholder="Marie Dupont" className={inputClass} />
                      </Field>
                      <Field label="Téléphone" required>
                        <input name="telephone" type="tel" required placeholder="06 12 34 56 78" className={inputClass} />
                      </Field>
                      <Field label="Adresse e-mail" required className="md:col-span-2">
                        <input name="email" type="email" required placeholder="contact@moncommerce.fr" className={inputClass} />
                      </Field>
                    </div>
                  </div>

                  {/* Étape 4 — présence en ligne + message */}
                  <div className="mt-9">
                    <StepTitle n="04">Pour aller plus loin</StepTitle>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <Field label="Site internet">
                        <input name="site" type="url" placeholder="https://moncommerce.fr" className={inputClass} />
                      </Field>
                      <Field label="Réseaux sociaux">
                        <input name="reseaux" placeholder="@moncommerce (Instagram, Facebook…)" className={inputClass} />
                      </Field>
                      <Field label="Commentaire ou demande particulière" className="md:col-span-2">
                        <textarea
                          name="commentaire"
                          rows={4}
                          placeholder="Dites-nous en plus sur votre établissement, vos attentes, vos questions…"
                          className={`${inputClass} resize-y`}
                        />
                      </Field>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      <MailWarning className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>
                        L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement à{" "}
                        <a href={`mailto:${DESTINATAIRE}`} className="font-semibold underline">
                          {DESTINATAIRE}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <div className="mt-9 flex flex-col items-center gap-4 border-t border-noir/10 pt-6 md:flex-row md:justify-between">
                    <p className="text-xs leading-relaxed text-noir/45">
                      <span className="text-tchil">*</span> Champs obligatoires.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group flex shrink-0 items-center gap-2.5 rounded-full bg-noir py-2 pl-6 pr-2 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03] disabled:pointer-events-none disabled:opacity-60"
                    >
                      {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tchil text-blanc transition-transform duration-200 group-hover:translate-x-0.5">
                        {status === "sending" ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
