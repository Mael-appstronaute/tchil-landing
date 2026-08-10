import { MapPin, QrCode, Wifi, BatteryFull, SignalHigh, Coffee, BadgeCheck, CalendarDays } from "lucide-react";
import { CountUp } from "./CountUp.jsx";

/** Cadre téléphone générique — mockups 100 % HTML/CSS, aucune image externe. */
export function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative aspect-[9/19] w-full overflow-hidden rounded-[2.6rem] border-[6px] border-noir bg-noir shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-noir" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-blanc">
        <div className="relative z-10 flex items-center justify-between px-5 pb-1 pt-3 text-[9px] font-semibold text-noir">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <SignalHigh className="h-2.5 w-2.5" />
            <Wifi className="h-2.5 w-2.5" />
            <BatteryFull className="h-3 w-3" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Écran image plein cadre — le visuel embarque déjà sa propre barre de statut. */
export function ImageScreen({ src, alt = "" }) {
  return <img src={src} alt={alt} className="absolute inset-0 z-20 h-full w-full object-cover object-top" />;
}

/** Cadre navigateur — pour les écrans desktop de l'espace pro. */
export function BrowserFrame({ src, alt = "", className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border-[6px] border-noir bg-noir shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="relative flex items-center gap-1.5 px-3 pb-2.5 pt-1.5">
        <span className="h-2 w-2 rounded-full bg-blanc/25" />
        <span className="h-2 w-2 rounded-full bg-blanc/25" />
        <span className="h-2 w-2 rounded-full bg-blanc/25" />
        <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-blanc/10 px-4 py-0.5 text-[9px] font-semibold text-blanc/60">
          pro.tchil.app
        </span>
      </div>
      <img src={src} alt={alt} className="block w-full rounded-t-lg" />
    </div>
  );
}

const PINS = [
  { top: "18%", left: "24%", n: 12 },
  { top: "38%", left: "62%", n: 8 },
  { top: "58%", left: "30%", n: 5 },
  { top: "72%", left: "66%", n: 17 },
];

/** Écran carte : rues en CSS, pins bleus pulsants avec compteurs de présents. */
export function MapScreen() {
  return (
    <div className="absolute inset-0 pt-8">
      <div className="relative h-full w-full overflow-hidden bg-[#f2f4f5]">
        {/* rues */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-[15%] top-0 h-full w-[6px] rotate-6 bg-white" />
          <div className="absolute left-[48%] top-0 h-full w-[10px] -rotate-3 bg-white" />
          <div className="absolute left-[78%] top-0 h-full w-[5px] rotate-12 bg-white" />
          <div className="absolute left-0 top-[22%] h-[8px] w-full -rotate-2 bg-white" />
          <div className="absolute left-0 top-[50%] h-[12px] w-full rotate-1 bg-white" />
          <div className="absolute left-0 top-[76%] h-[6px] w-full -rotate-3 bg-white" />
          <div className="absolute left-[8%] top-[8%] h-24 w-20 rounded-lg bg-[#e6ebee]" />
          <div className="absolute right-[6%] top-[30%] h-20 w-24 rounded-lg bg-[#e6ebee]" />
          <div className="absolute bottom-[8%] left-[12%] h-16 w-28 rounded-lg bg-[#e6ebee]" />
        </div>
        {PINS.map((p, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: p.top, left: p.left }}>
            <span className="absolute -inset-2 animate-ping rounded-full bg-tchil/30" style={{ animationDuration: "2.4s", animationDelay: `${i * 0.5}s` }} />
            <span className="relative flex items-center gap-1 rounded-full bg-noir px-2 py-1 text-[8px] font-bold text-blanc shadow-lg">
              <MapPin className="h-2.5 w-2.5 text-tchil" />
              {p.n}
            </span>
          </div>
        ))}
        {/* carte lieu en bas */}
        <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-blanc p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-asap text-[11px] font-bold text-noir">Le Comptoir</p>
              <p className="text-[9px] text-noir/50">Bar · Paris 11ᵉ · à 120 m</p>
            </div>
            <span className="rounded-full bg-tchil/15 px-2 py-1 text-[8px] font-bold text-tchil">12 présents</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-noir px-3 py-2 text-[9px] font-semibold text-blanc">
            <QrCode className="h-3 w-3 text-tchil" /> Scanner pour se checker
          </div>
        </div>
      </div>
    </div>
  );
}

const PEOPLE = [
  { name: "Léa", status: "Envie de papoter", color: "#6eaacc" },
  { name: "Karim", status: "En terrasse", color: "#0f1b22" },
  { name: "Sofia", status: "Nouvelle ici", color: "#41758f" },
  { name: "Thomas", status: "Avec des amis", color: "#213744" },
  { name: "Nadia", status: "Au comptoir", color: "#6eaacc" },
  { name: "Hugo", status: "Dispo pour un verre", color: "#0f1b22" },
];

/** Écran liste des présents — défilement vertical en boucle. */
export function PresenceScreen() {
  const list = [...PEOPLE, ...PEOPLE];
  return (
    <div className="absolute inset-0 flex flex-col pt-8">
      <div className="px-4 pb-2">
        <p className="font-asap text-sm font-bold text-noir">Le Comptoir</p>
        <p className="text-[9px] text-noir/50">
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-tchil align-middle" />
          12 personnes présentes
        </p>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-scroll-list space-y-2 px-4">
          {list.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-2xl border border-noir/5 bg-white p-2.5 shadow-sm">
              <span
                className="font-asap flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-blanc"
                style={{ backgroundColor: p.color }}
              >
                {p.name[0]}
              </span>
              <span className="flex-1">
                <span className="block text-[11px] font-semibold text-noir">{p.name}</span>
                <span className="block text-[8px] text-noir/50">{p.status}</span>
              </span>
              <span className="whitespace-nowrap rounded-full bg-tchil px-2 py-1 text-[8px] font-bold text-blanc">Bonjour 👋</span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blanc to-transparent" />
      </div>
    </div>
  );
}

/** Écran scanner QR : viseur caméra + QR CSS + ligne de scan animée. */
export function ScanScreen({ validated = true }) {
  const cells = [1,0,1,1,0,1,1,1,0,1,0,0,1,0,1,1,1,0,1,1,0,1,0,1,1,0,0,1,1,0,1,0,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1];
  return (
    <div className="absolute inset-0 bg-[#0b1116] pt-8">
      <p className="px-4 text-center text-[10px] font-semibold text-blanc/80">Scannez le QR code du lieu</p>
      <div className="relative mx-auto mt-6 h-44 w-44">
        <span className="absolute -left-1 -top-1 h-6 w-6 rounded-tl-lg border-l-[3px] border-t-[3px] border-tchil" />
        <span className="absolute -right-1 -top-1 h-6 w-6 rounded-tr-lg border-r-[3px] border-t-[3px] border-tchil" />
        <span className="absolute -bottom-1 -left-1 h-6 w-6 rounded-bl-lg border-b-[3px] border-l-[3px] border-tchil" />
        <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-br-lg border-b-[3px] border-r-[3px] border-tchil" />
        <div className="grid h-full w-full grid-cols-7 gap-[3px] rounded-xl bg-white p-3">
          {cells.map((c, i) => (
            <span key={i} className={`rounded-[2px] ${c ? "bg-noir" : "bg-transparent"}`} />
          ))}
        </div>
        <span className="animate-float absolute inset-x-2 top-1/2 h-0.5 bg-tchil shadow-[0_0_12px_#6eaacc]" />
      </div>
      {validated && (
        <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-tchil px-4 py-2 text-[10px] font-bold text-blanc shadow-[0_10px_30px_rgba(110,170,204,0.4)]">
          <BadgeCheck className="h-4 w-4" /> Présence vérifiée par GPS
        </div>
      )}
      <p className="mt-4 text-center text-[9px] text-blanc/40">+10 Tchil Points crédités</p>
    </div>
  );
}

/** Écran solde de points + avantage. */
export function PointsScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center pt-14">
      <img src="/logos/icone-bleu.svg" alt="" className="h-8 w-8" />
      <p className="mt-3 text-[9px] font-semibold uppercase tracking-widest text-noir/40">Votre solde</p>
      <p className="font-asap mt-1 text-4xl font-extrabold text-noir">
        <CountUp to={128} />
      </p>
      <p className="text-[10px] font-semibold text-tchil">Tchil Points</p>
      <div className="mx-4 mt-6 w-[85%] rounded-2xl border border-tchil/30 bg-tchil/10 p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tchil text-blanc">
            <Coffee className="h-4 w-4" />
          </span>
          <span className="flex-1">
            <span className="block text-[11px] font-bold text-noir">Café offert</span>
            <span className="block text-[8px] text-noir/50">Le Comptoir · Paris 11ᵉ</span>
          </span>
          <span className="font-asap text-[11px] font-extrabold text-tchil">20 pts</span>
        </div>
        <span className="mt-2 block w-full rounded-xl bg-noir py-2 text-center text-[9px] font-bold text-blanc">Échanger</span>
      </div>
    </div>
  );
}

const EVENTS = [
  { emoji: "🎷", name: "Soirée jazz", place: "Café Lumière · 21h", tag: "+20 pts" },
  { emoji: "🎧", name: "DJ set du vendredi", place: "Le Comptoir · 22h", tag: "Gratuit" },
  { emoji: "🍹", name: "Happy hour", place: "La Terrasse · 18h – 20h", tag: "−50 %" },
  { emoji: "🎤", name: "Open mic", place: "Chez Marcel · 20h30", tag: "+15 pts" },
];

/** Écran événements : ce qui se passe ce soir dans les lieux partenaires. */
export function EventsScreen() {
  return (
    <div className="absolute inset-0 flex flex-col pt-8">
      <div className="px-4 pb-2">
        <p className="font-asap flex items-center gap-1.5 text-sm font-bold text-noir">
          <CalendarDays className="h-3.5 w-3.5 text-tchil" /> Ce soir
        </p>
        <p className="text-[9px] text-noir/50">4 événements autour de vous</p>
      </div>
      <div className="space-y-2 px-4">
        {EVENTS.map((e) => (
          <div key={e.name} className="flex items-center gap-2.5 rounded-2xl border border-noir/5 bg-white p-2.5 shadow-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tchil/15 text-sm">
              {e.emoji}
            </span>
            <span className="flex-1">
              <span className="block text-[11px] font-semibold text-noir">{e.name}</span>
              <span className="block text-[8px] text-noir/50">{e.place}</span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-tchil px-2 py-1 text-[8px] font-bold text-blanc">{e.tag}</span>
          </div>
        ))}
      </div>
      <div className="mx-4 mt-3 flex items-center gap-1.5 rounded-xl bg-noir px-3 py-2 text-[9px] font-semibold text-blanc">
        <MapPin className="h-3 w-3 text-tchil" /> Voir sur la carte
      </div>
    </div>
  );
}

/** Tableau de bord établissement (onglet pro). */
export function DashboardScreen() {
  return (
    <div className="absolute inset-0 flex flex-col pt-9 px-4">
      <p className="font-asap text-sm font-bold text-noir">Café Lumière</p>
      <p className="text-[9px] text-noir/50">Espace partenaire</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-noir p-3 text-blanc">
          <p className="text-[8px] opacity-60">Check-ins aujourd'hui</p>
          <p className="font-asap text-xl font-extrabold"><CountUp to={47} /></p>
        </div>
        <div className="rounded-2xl bg-tchil/15 p-3">
          <p className="text-[8px] text-noir/60">Visiteurs uniques</p>
          <p className="font-asap text-xl font-extrabold text-tchil"><CountUp to={31} /></p>
        </div>
      </div>
      <div className="mt-2 rounded-2xl border border-noir/10 p-3">
        <p className="text-[8px] font-semibold text-noir/60">Affluence de la semaine</p>
        <div className="mt-2 flex h-16 items-end gap-1.5">
          {[35, 55, 40, 70, 90, 100, 60].map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-md ${i === 5 ? "bg-tchil" : "bg-noir/15"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[7px] text-noir/40">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
            <span key={i} className="flex-1 text-center">{d}</span>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-2xl bg-tchil/10 p-2.5">
        <span className="text-sm">🎶</span>
        <span className="flex-1 text-[9px] font-semibold text-noir">Soirée jazz — vendredi</span>
        <span className="rounded-full bg-tchil px-2 py-1 text-[8px] font-bold text-blanc">Notifier</span>
      </div>
    </div>
  );
}
