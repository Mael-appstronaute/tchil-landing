import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, MailWarning } from "lucide-react";
import { Reveal } from "./ui/Reveal.jsx";

/* Formulaire de prise de contact professionnel (retour client 21/08) :
   porte d'entrée des futurs partenaires — toutes les infos nécessaires
   pour identifier, qualifier et enregistrer l'établissement, avec une
   catégorie d'activité clairement sélectionnable.

   Envoi via FormSubmit (https://formsubmit.co) vers contact@tchil.app,
   sans backend ni création de compte. IMPORTANT : lors de la toute
   première soumission, FormSubmit envoie un e-mail d'activation à
   contact@tchil.app — il faut cliquer le lien de confirmation une seule
   fois pour activer la réception des demandes. */
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/contact@tchil.app";

const CATEGORIES = [
  "Bar",
  "Restaurant",
  "Pub",
  "Café",
  "Hôtel",
  "Coiffeur",
  "Spa & bien-être",
  "Salle de sport",
  "Autre",
];

const inputClass =
  "w-full rounded-2xl border border-noir/15 bg-white px-4 py-3 text-sm text-noir placeholder:text-noir/35 outline-none transition-all duration-200 focus:border-tchil focus:ring-2 focus:ring-tchil/25";

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-baseline gap-1 text-sm font-semibold text-noir">
        {label}
        {required ? (
          <span className="text-tchil" aria-hidden="true">*</span>
        ) : (
          <span className="text-xs font-normal text-noir/40">(facultatif)</span>
        )}
      </span>
      {children}
    </label>
  );
}

export function PartnerForm() {
  const [categorie, setCategorie] = useState("");
  const [categorieError, setCategorieError] = useState(false);
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!categorie) {
      setCategorieError(true);
      document.getElementById("categorie-etablissement")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
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
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section id="devenir-partenaire" className="bg-blanc px-5 py-20 md:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-noir/10 bg-white p-10 text-center shadow-[0_10px_40px_rgba(23,53,75,0.08)] md:p-14">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tchil/10">
            <CheckCircle2 className="h-7 w-7 text-tchil" strokeWidth={1.8} />
          </span>
          <h2 className="font-asap mt-6 text-2xl font-extrabold tracking-tight text-noir md:text-3xl">
            Demande bien envoyée !
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-noir/60">
            Merci pour votre intérêt. L'équipe Tchil étudie votre demande et revient
            vers vous rapidement pour préparer l'intégration de votre établissement.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="devenir-partenaire" className="bg-blanc px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
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
          <form
            onSubmit={onSubmit}
            noValidate={false}
            className="rounded-3xl border border-noir/10 bg-white p-6 shadow-[0_10px_40px_rgba(23,53,75,0.08)] md:p-10"
          >
            {/* Catégorie d'activité — sélection claire dès le début du formulaire */}
            <div id="categorie-etablissement">
              <span className="mb-1.5 flex items-baseline gap-1 text-sm font-semibold text-noir">
                Type d'établissement <span className="text-tchil" aria-hidden="true">*</span>
              </span>
              <div role="radiogroup" aria-label="Type d'établissement" className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => {
                  const active = categorie === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setCategorie(c);
                        setCategorieError(false);
                      }}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "border-tchil bg-tchil text-blanc shadow-[0_6px_20px_rgba(110,170,204,0.4)]"
                          : "border-noir/15 bg-white text-noir/70 hover:border-tchil/60 hover:text-noir"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              {categorieError && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  Merci de sélectionner le type de votre établissement.
                </p>
              )}
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Field label="Nom de l'établissement" required>
                <input name="etablissement" required placeholder="Le Comptoir du Canal" className={inputClass} />
              </Field>
              <Field label="Nom et prénom du contact" required>
                <input name="contact" required placeholder="Marie Dupont" className={inputClass} />
              </Field>
              <Field label="Adresse e-mail" required>
                <input name="email" type="email" required placeholder="contact@moncommerce.fr" className={inputClass} />
              </Field>
              <Field label="Numéro de téléphone" required>
                <input name="telephone" type="tel" required placeholder="06 12 34 56 78" className={inputClass} />
              </Field>
              <Field label="Adresse de l'établissement" required className="md:col-span-2">
                <input name="adresse" required placeholder="12 quai de Valmy" className={inputClass} />
              </Field>
              <Field label="Code postal" required>
                <input name="codePostal" required inputMode="numeric" placeholder="75010" className={inputClass} />
              </Field>
              <Field label="Ville" required>
                <input name="ville" required placeholder="Paris" className={inputClass} />
              </Field>
              <Field label="Raison sociale / nom de l'entreprise" required className="md:col-span-2">
                <input name="raisonSociale" required placeholder="SARL Comptoir du Canal" className={inputClass} />
              </Field>
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

            {status === "error" && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <MailWarning className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement à{" "}
                  <a href="mailto:contact@tchil.app" className="font-semibold underline">
                    contact@tchil.app
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <p className="text-xs leading-relaxed text-noir/45">
                <span className="text-tchil">*</span> Champs obligatoires. Vos informations
                ne sont utilisées que pour traiter votre demande de partenariat.
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
        </Reveal>
      </div>
    </section>
  );
}
