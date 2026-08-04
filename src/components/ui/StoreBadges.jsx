/**
 * Badges stores officiels (mêmes visuels que le hero de rociny.com) :
 * « Download on the App Store » et « GET IT ON Google Play ».
 * Le paramètre `variant` est conservé pour compatibilité mais les badges
 * officiels sont identiques sur fond clair comme sombre.
 */
export function StoreBadges({ variant = "dark", className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href="#"
        aria-label="Télécharger Tchil sur l'App Store"
        className="transition-transform duration-200 hover:scale-[1.04]"
      >
        <img src="/badges/app-store.png" alt="Download on the App Store" className="h-11 w-auto" />
      </a>
      <a
        href="#"
        aria-label="Télécharger Tchil sur Google Play"
        className="transition-transform duration-200 hover:scale-[1.04]"
      >
        <img src="/badges/google-play.png" alt="Get it on Google Play" className="h-11 w-auto" />
      </a>
    </div>
  );
}
