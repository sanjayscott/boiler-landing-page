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
import installerScandi from "@assets/Worcester_Bosch_CDi_Classic_Model_and_installer_in_Scandi_Kitc_1771321575784.jpg";
import greenstarKitchen from "@assets/Worcester_Bosch_Greenstar_400_Kitchen_HERO_CROPPED_1771321563335.jpg";
import homeownerEasyControl from "@assets/Homeowner_adjusting_EasyControl_1771321797513.jpg";

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
      <span className="text-lg font-bold whitespace-nowrap">{label}</span>
      <span className="text-sm text-gray-300">{description}</span>
    </div>
  );
}

/*
  Progressive overlay approach:
  - Mobile (< md): Pure white, no image
  - Tablet (md): Image visible but heavily washed out (90/85/white)
  - Desktop (lg): Image more visible, lighter overlay (80/70/white)
  - Wide (xl): Image even more prominent (65/55/white)
*/

function ProgressiveHero({ bgImage, id }: { bgImage: string; id: string }) {
  return (
    <section className="relative w-full">
      {/* Background image - hidden on mobile */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/*
        Progressive overlay: uses inline style + CSS custom property approach.
        Single overlay div whose opacity changes at each breakpoint via a <style> tag.
      */}
      <style>{`
        .hero-overlay-${id} {
          display: none;
        }
        @media (min-width: 768px) {
          .hero-overlay-${id} {
            display: block;
            background: linear-gradient(to bottom, rgba(255,255,255,0.92), rgba(255,255,255,0.88), rgba(255,255,255,1));
          }
        }
        @media (min-width: 1024px) {
          .hero-overlay-${id} {
            background: linear-gradient(to bottom, rgba(255,255,255,0.75), rgba(255,255,255,0.65), rgba(255,255,255,1));
          }
        }
        @media (min-width: 1280px) {
          .hero-overlay-${id} {
            background: linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.40), rgba(255,255,255,1));
          }
        }
        @media (min-width: 1536px) {
          .hero-overlay-${id} {
            background: linear-gradient(to bottom, rgba(255,255,255,0.40), rgba(255,255,255,0.25), rgba(255,255,255,1));
          }
        }
      `}</style>
      <div className={`hero-overlay-${id} absolute inset-0`} />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 lg:py-28">
        <HeroContent />
      </div>
    </section>
  );
}

const heroImages = [
  {
    label: "Option 1",
    description: "Ri Lifestyle — Modern kitchen, boiler on wall (current V11 image)",
    image: heroLifestyle,
  },
  {
    label: "Option 2",
    description: "Traditional Kitchen — Greenstar 4000 in classic kitchen setting",
    image: kitchenTraditional,
  },
  {
    label: "Option 3",
    description: "Scandi Kitchen — Installer with CDi Classic in Scandinavian kitchen",
    image: installerScandi,
  },
  {
    label: "Option 4",
    description: "Kitchen Hero — Greenstar 400 in modern kitchen, cropped hero shot",
    image: greenstarKitchen,
  },
  {
    label: "Option 5",
    description: "Homeowner — Person adjusting EasyControl thermostat",
    image: homeownerEasyControl,
  },
];

export default function V11HeroTest() {
  return (
    <div className="bg-white">
      <div className="bg-gray-800 text-white text-center py-4 px-4">
        <h2 className="text-xl font-bold">V11 Hero Options — Progressive Reveal</h2>
        <p className="text-sm text-gray-300 mt-1">
          Mobile: pure white · Tablet: heavily washed · Desktop: lighter wash · Wide: most visible
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Resize your browser window to see the progressive effect
        </p>
      </div>
      {heroImages.map((hero, idx) => (
        <div key={hero.label}>
          <OptionBanner label={hero.label} description={hero.description} />
          <ProgressiveHero bgImage={hero.image} id={`h${idx}`} />
        </div>
      ))}
    </div>
  );
}
