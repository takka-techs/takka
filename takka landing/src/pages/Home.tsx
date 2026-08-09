import { Hero } from "../components/Hero";
import { TrustMarquee } from "../components/TrustMarquee";
import { TargetAudience } from "../components/TargetAudience";
import { VideoDemo } from "../components/VideoDemo";
import { BentoGrid } from "../components/BentoGrid";
import { InteractiveTour } from "../components/InteractiveTour";
import { MaintenanceFlow } from "../components/MaintenanceFlow";
import { Stats } from "../components/Stats";
import { Integrations } from "../components/Integrations";
import { PainPoints } from "../components/PainPoints";
import { SecurityFeatures } from "../components/SecurityFeatures";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";

export function Home() {
  return (
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
  );
}
