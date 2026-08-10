import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { Manifesto } from "./components/Manifesto.jsx";
import { Features } from "./components/Features.jsx";
import { Testimonials } from "./components/Testimonials.jsx";
import { Pricing } from "./components/Pricing.jsx";
import { FinalCTA } from "./components/FinalCTA.jsx";
import { Footer } from "./components/Footer.jsx";
import { EspacePro } from "./components/EspacePro.jsx";

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const isPro = hash.startsWith("#/espace-pro");

  useEffect(() => {
    if (isPro) {
      window.scrollTo(0, 0);
      return;
    }
    // au retour de l'Espace Pro, honorer une éventuelle ancre (#gratuit, #cta…)
    const anchor = /^#[a-z]/.test(hash) ? document.getElementById(hash.slice(1)) : null;
    if (anchor) anchor.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [isPro]);

  if (isPro) return <EspacePro />;

  return (
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
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
