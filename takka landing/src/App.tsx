/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from "./components/ThemeProvider";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { motion, useScroll } from "motion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { ChangePassword } from "./pages/ChangePassword";
import { TrackMaintenance } from "./pages/TrackMaintenance";

import "./i18n";

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <ThemeProvider>
      <Router>
        <Preloader />

        {/* Film Grain Overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Scroll Progress */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-takka-gold)] origin-left z-[100]"
          style={{ scaleX: scrollYProgress }}
        />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

          <Route
            path="/track-maintenance"
            element={<TrackMaintenance />}
          />
        </Routes>

        <Footer />
        <ScrollToTop />
      </Router>
    </ThemeProvider>
  );
}
