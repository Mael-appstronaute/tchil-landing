import { Reveal } from "./Reveal.jsx";

/**
 * Marqueur de section conforme à la charte : petite icône Tchil centrée
 * au-dessus du titre, avec un trait horizontal bleu dessous.
 */
export function SectionTitle({ title, subtitle, dark = false, id }) {
  return (
    <Reveal className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center md:mb-20">
      <img
        src={dark ? "/logos/icone-white.svg" : "/logos/icone-bleu.svg"}
        alt=""
        aria-hidden="true"
        className="h-9 w-9"
      />
      <span className="mt-3 h-0.5 w-10 rounded-full bg-tchil" aria-hidden="true" />
      <h2
        id={id}
        className={`font-asap mt-6 text-3xl font-extrabold tracking-tight text-balance md:text-5xl ${
          dark ? "text-blanc" : "text-noir"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-xl text-base md:text-lg ${dark ? "text-blanc/60" : "text-noir/60"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
