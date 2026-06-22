import AnimatedBackground from "@/components/AnimatedBackground";
import BrandLogo from "@/components/BrandLogo";
import CTA from "@/components/CTA";
import DustParticles from "@/components/DustParticles";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import IntroBackdrop from "@/components/IntroBackdrop";
import Navbar from "@/components/Navbar";
import WaitlistModal from "@/components/WaitlistModal";
import { IntroProvider } from "@/context/IntroContext";
import { WaitlistProvider } from "@/context/WaitlistContext";

export default function Home() {
  return (
    <IntroProvider>
      <WaitlistProvider>
        <AnimatedBackground />
        <DustParticles />
        <BrandLogo />
        <Navbar />
        <main className="relative z-[2]">
          <Hero />
          <HowItWorks />
          <Features />
          <CTA />
        </main>
        <Footer />
        <WaitlistModal />
        <IntroBackdrop />
      </WaitlistProvider>
    </IntroProvider>
  );
}
