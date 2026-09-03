import { Play } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle.jsx";
import { Reveal, StaggerGroup, StaggerItem } from "./ui/Reveal.jsx";

const IG_PROFILE = "https://www.instagram.com/tchil.app/";

/* Publications affichées (les 6 dernières au 01/09).
   Pour mettre à jour : remplacer les images public/instagram/ig-*.jpg par les
   nouvelles miniatures et reporter ici l'URL de chaque publication. */
const POSTS = [
  { href: "https://www.instagram.com/tchil.app/reel/Db5b84Fo8kI/", img: "/instagram/ig-1.jpg", reel: true, alt: "Reel Tchil du 11 août" },
  { href: "https://www.instagram.com/tchil.app/p/DbOP39WDc1H/", img: "/instagram/ig-2.jpg", alt: "Publication Tchil du 25 juillet" },
  { href: "https://www.instagram.com/tchil.app/p/DbLrGrvjcZ_/", img: "/instagram/ig-3.jpg", alt: "Publication Tchil du 24 juillet" },
  { href: "https://www.instagram.com/tchil.app/p/DbLeCH5jC_y/", img: "/instagram/ig-4.jpg", alt: "Publication Tchil du 24 juillet" },
  { href: "https://www.instagram.com/tchil.app/p/DbGhioRjCsA/", img: "/instagram/ig-5.jpg", alt: "Publication Tchil du 22 juillet" },
  { href: "https://www.instagram.com/tchil.app/p/Da48McgDUgY/", img: "/instagram/ig-6.jpg", alt: "Publication Tchil du 17 juillet" },
];

/* Même glyphe que le footer, id de dégradé distinct (deux SVG montés en même temps). */
function InstagramIcon({ className = "h-5 w-5", color = false }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {color && (
        <defs>
          <radialGradient id="ig-grad-feed" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
      )}
      <rect x="2" y="2" width="20" height="20" rx="6" fill={color ? "url(#ig-grad-feed)" : "currentColor"} />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.25" fill="#fff" />
    </svg>
  );
}

export function InstagramFeed() {
  return (
    <section className="bg-blanc px-5 pb-24 md:pb-32">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          title="L'aventure continue sur Instagram."
          subtitle="Les coulisses, les lieux partenaires et les nouveautés de l'app, publiés au fil de l'eau sur @tchil.app."
        />

        <StaggerGroup className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {POSTS.map((post) => (
            <StaggerItem key={post.href}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${post.alt} — voir sur Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-2xl border border-noir/10"
              >
                <img
                  src={post.img}
                  alt={post.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
                {post.reel && (
                  <span
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-noir/55 text-blanc backdrop-blur-sm"
                    aria-hidden="true"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
                )}
                {/* Voile bleu + icône au survol */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-tchil/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <InstagramIcon className="h-8 w-8 text-blanc" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-noir px-7 py-3.5 text-sm font-semibold text-blanc transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)]"
          >
            <InstagramIcon className="h-5 w-5" color />
            Suivre @tchil.app
          </a>
        </Reveal>
      </div>
    </section>
  );
}
