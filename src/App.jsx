import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { Manifesto } from "./components/Manifesto.jsx";
import { Features } from "./components/Features.jsx";
import { Testimonials } from "./components/Testimonials.jsx";
import { Pricing } from "./components/Pricing.jsx";
import { InstagramFeed } from "./components/InstagramFeed.jsx";
import { FinalCTA } from "./components/FinalCTA.jsx";
import { Footer } from "./components/Footer.jsx";
import { EspacePro } from "./components/EspacePro.jsx";
import { Intro } from "./components/Intro.jsx";
import { ChatbotSkin } from "./components/ChatbotSkin.jsx";

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  // le contenu n'est monté qu'à la levée du rideau d'intro, pour que les
  // animations d'entrée du hero se jouent pendant la transition
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const isPro = hash.startsWith("#/espace-pro");

  useEffect(() => {
    if (!entered) return;
    if (isPro) {
      window.scrollTo(0, 0);
      return;
    }
    // au retour de l'Espace Pro, honorer une éventuelle ancre (#gratuit, #cta…)
    const anchor = /^#[a-z]/.test(hash) ? document.getElementById(hash.slice(1)) : null;
    if (anchor) anchor.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [isPro, entered]);

  const content = isPro ? (
    <EspacePro />
  ) : (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* fond commun continu entre le manifesto et le bento (pas de couture) */}
        <div className="relative overflow-hidden bg-[#f4f6f8]">
          <Manifesto />
          <Features />
        </div>
        <Testimonials />
        <Pricing />
        {/* Retour client 01/09 : feed Instagram en bas d'accueil, juste au-dessus du CTA final */}
        <InstagramFeed />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );

  return (
    <>
      {entered && content}
      <Intro onReveal={() => setEntered(true)} />
      {/* habillage charte du bouton du chatbot Limova (index.html) */}
      <ChatbotSkin />
    </>
  );
}
