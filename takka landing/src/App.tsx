/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from "./components/ThemeProvider";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustMarquee } from "./components/TrustMarquee";
import { TargetAudience } from "./components/TargetAudience";
import { VideoDemo } from "./components/VideoDemo";
import { BentoGrid } from "./components/BentoGrid";
import { InteractiveTour } from "./components/InteractiveTour";
import { MaintenanceFlow } from "./components/MaintenanceFlow";
import { Stats } from "./components/Stats";
import { Integrations } from "./components/Integrations";
import { PainPoints } from "./components/PainPoints";
import { SecurityFeatures } from "./components/SecurityFeatures";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

import { motion, useScroll } from "motion/react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ChangePassword } from "./pages/ChangePassword";
import { TrackMaintenance } from "./pages/TrackMaintenance";

import "./i18n";

function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Film Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-takka-gold)] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />

      <main>
        <Hero />

        <TrustMarquee />

        <TargetAudience />

        <VideoDemo />

        <div id="features">
          <BentoGrid />
        </div>

        <div id="tour">
          <InteractiveTour />
          <MaintenanceFlow />
        </div>

        <Stats />

        <Integrations />

        <div id="why-us">
          <PainPoints />
          <SecurityFeatures />
        </div>

        <div id="pricing">
          <Pricing />
          <FAQ />
        </div>

        <FinalCTA />
      </main>

      <Footer />

      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Preloader />

        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={<Home />} />

          {/* تغيير كلمة المرور */}
          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

          {/* تتبع الصيانة */}
          <Route
            path="/track-maintenance"
            element={<TrackMaintenance />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
