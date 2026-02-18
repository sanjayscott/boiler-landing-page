import {
  Phone, Star, CheckCircle, Zap, ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import worcesterBoschLogo from "@assets/worcester-bosch-logo_(2)_1771281246798.png";
import heroLifestyle from "@assets/Ri_-_Lifestyle_1771321781805.jpg";
import gasSafeLogo from "@assets/Gas_Safe_Logo_1771321269776.png";
import checkatradeLogo from "@assets/Checkatrade_Logo_2023_1771322021422.png";
import wsbLogo from "@assets/WeServiceBoilers_Standard_1771321243040.png";
import kitchenTraditional from "@assets/4000-Traditional_Kitchen-face-on_1771321846519.jpg";
import installerImg from "@assets/Worcester_Bosch_CDi_Classic_Model_and_installer_in_Scandi_Kitc_1771321575784.jpg";
import greenstarKitchen from "@assets/Worcester_Bosch_Greenstar_400_Kitchen_HERO_CROPPED_1771321563335.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";
const WB_GREEN = "#78BE20";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function TrustBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-6">
      <img src={gasSafeLogo} alt="Gas Safe Registered" className="h-10 w-auto" />
      <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-7 w-auto" />
      <img src={wsbLogo} alt="We Service Boilers" className="h-6 w-auto" />
      <img src={checkatradeLogo} alt="Checkatrade" className="h-6 w-auto" />
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">{[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
        <span className="text-sm font-bold text-gray-800">4.8/5</span>
      </div>
    </div>
  );
}

function HeroContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center space-y-6">
      <div className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-white" style={{ backgroundColor: WB_BLUE }}>
        <Zap className="w-4 h-4" style={{ color: WB_GREEN }} /> Spring Promotion — Save Up To £500
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight" style={{ color: WB_BLUE }}>
        Worcester Bosch Boilers<br />From <span style={{ color: WB_GREEN }}>£1,790</span> Installed
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto">
        Transparent pricing. Free home assessment. Up to 12 years warranty. From your local Worcester Bosch accredited installer.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-1">
        <Button size="lg" onClick={() => scrollTo("book")} className="text-white font-bold text-base px-8" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }}>
          Book Free Assessment <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
        <a href={PHONE_HREF}>
          <Button size="lg" variant="outline" className="font-bold text-base px-8 gap-2 border-gray-300 text-gray-800 bg-white/70 backdrop-blur-sm">
            <Phone className="w-5 h-5" /> {PHONE}
          </Button>
        </a>
      </div>
      <TrustBar />
    </motion.div>
  );
}

function OptionBanner({ label, description }: { label: string; description: string }) {
  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex items-center gap-4">
      <span className="text-lg font-black">{label}</span>
      <span className="text-sm text-gray-300">{description}</span>
    </div>
  );
}

function HeroVariant({ bgImage, overlayClass }: { bgImage?: string; overlayClass?: string }) {
  return (
    <section className="relative w-full">
      {bgImage && (
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }} />
      )}
      {overlayClass && (
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayClass}`} />
      )}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 lg:py-28">
        <HeroContent />
      </div>
    </section>
  );
}

export default function V11HeroTest() {
  return (
    <div className="min-h-screen">
      <OptionBanner label="Option A" description="Pure white — no background image" />
      <HeroVariant />

      <OptionBanner label="Option B" description="Traditional kitchen with white overlay (90/80)" />
      <HeroVariant bgImage={kitchenTraditional} overlayClass="from-white/90 via-white/80 to-white" />

      <OptionBanner label="Option C" description="Current lifestyle image, much lighter overlay (95/92)" />
      <HeroVariant bgImage={heroLifestyle} overlayClass="from-white/95 via-white/92 to-white" />

      <OptionBanner label="Option D" description="Installer photo with overlay (85/75)" />
      <HeroVariant bgImage={installerImg} overlayClass="from-white/85 via-white/75 to-white" />

      <OptionBanner label="Option E" description="Greenstar kitchen hero with overlay (85/75)" />
      <HeroVariant bgImage={greenstarKitchen} overlayClass="from-white/85 via-white/75 to-white" />
    </div>
  );
}
