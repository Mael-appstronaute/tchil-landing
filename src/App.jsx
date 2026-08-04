import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { Manifesto } from "./components/Manifesto.jsx";
import { Features } from "./components/Features.jsx";
import { Audiences } from "./components/Audiences.jsx";
import { Testimonials } from "./components/Testimonials.jsx";
import { Pricing } from "./components/Pricing.jsx";
import { FinalCTA } from "./components/FinalCTA.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
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
        <Audiences />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
