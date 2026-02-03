import { MapPin, Plane, Users } from "lucide-react";
import HeroSection from "../components/landing/HeroSection";
import Navbar from "../components/layout/Navbar";
import HowItWorks from "../components/landing/HowItWorksSection";
import GetStartedBanner from "../components/landing/GetStartedBanner";
import Footer from "../components/layout/Footer";

const LandingPage = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />

        {/* TopLeft Plane */}
        <div className="absolute top-30 left-30 opacity-10 text-blue-500 rotate-[-15deg]">
          <Plane size={64} />
        </div>

        {/* TopRight Pin */}
        <div className="absolute top-1/4 right-20 opacity-10 text-blue-400">
          <MapPin size={48} />
        </div>

        {/* BottomLeft Users */}
        <div className="absolute bottom-40 left-64 opacity-10 text-emerald-400">
          <Users size={56} />
        </div>

        {/* BottomRight Plane */}
        <div className="absolute bottom-20 right-50 opacity-5 text-blue-600">
          <Plane size={80} />
        </div>
      </div>
      {/* Background End */}

      <Navbar />

      <div className="mt-[-120px]">
        <HeroSection />
      </div>
      <div id="how-it-works-section" className="pt-37">
        <HowItWorks badgeText="Come Funziona" />
      </div>

      <div className="flex items-center justify-center mt-40 w-full">
        <GetStartedBanner />
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
