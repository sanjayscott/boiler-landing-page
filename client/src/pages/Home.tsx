import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { BoilerCard } from "@/components/BoilerCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ChevronDown, Phone, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string>("unsure");

  const scrollToForm = (model?: string) => {
    if (model) setSelectedModel(model);
    const element = document.getElementById("get-quote");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page">
      <nav className="fixed top-0 w-full z-50 bg-[#005F9E] h-16 md:h-20 shadow-lg">
        <div className="container h-full mx-auto px-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3" data-testid="logo-brand">
            <svg viewBox="0 0 40 40" className="w-8 h-8 md:w-10 md:h-10 shrink-0" aria-label="Worcester Bosch logo">
              <rect width="40" height="40" rx="6" fill="white" />
              <path d="M8 12 L14 28 L20 18 L26 28 L32 12" stroke="#005F9E" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="10" r="2.5" fill="#007BC0" />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base md:text-lg text-white tracking-tight">Worcester Bosch</span>
              <span className="text-[10px] md:text-xs text-blue-200 font-medium tracking-wide uppercase">Greenstar Boilers</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:08001234567" className="hidden md:flex items-center gap-2 text-white font-semibold transition-colors" data-testid="link-phone">
              <Phone className="w-4 h-4" />
              0800 123 4567
            </a>
            <Button onClick={() => scrollToForm("unsure")} variant="outline" className="border-white/40 text-white backdrop-blur-sm" data-testid="button-nav-quote">
              Get Quote
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-24 md:pt-32 pb-20 relative overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 hero-gradient z-0" />
        <div className="absolute inset-0 opacity-[0.04] z-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>UK's #1 Boiler Brand</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
                Upgrade Your Home <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                  Heating Today
                </span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 max-w-lg leading-relaxed">
                Save up to <strong className="text-white">£580 per year</strong> on energy bills with a new A-rated Worcester Bosch Greenstar boiler. Professional installation by Gas Safe engineers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={() => scrollToForm("unsure")}
                  className="bg-white text-[#005F9E] font-bold text-lg px-8"
                  data-testid="button-hero-quote"
                >
                  Get Your Free Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("models")?.scrollIntoView({ behavior: "smooth" })}
                  className="border-white/40 text-white"
                  data-testid="button-hero-models"
                >
                  View Models
                </Button>
              </div>

              <div className="pt-8 flex flex-wrap items-center gap-8 opacity-80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Up to 12 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold border border-white/50 px-1.5 py-0.5 rounded text-xs">A+</div>
                  <span className="text-sm font-medium">Energy Rated</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <img
                src="/images/hero-boiler.png"
                alt="Worcester Bosch Greenstar boiler installation"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px] border-4 border-white/10"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs text-gray-800">
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="font-bold italic">"Excellent service from start to finish. The new boiler is whisper quiet!"</p>
                <p className="text-sm text-gray-500 mt-2">— Sarah J., London</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      <section className="py-8 bg-white border-b" data-testid="section-trust">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Accredited & Trusted</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#005F9E] flex items-center justify-center">
                <span className="text-white text-xs font-bold">GS</span>
              </div>
              <span className="text-sm font-bold text-foreground">Gas Safe Registered</span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#007BC0] flex items-center justify-center">
                <span className="text-white text-xs font-bold">W?</span>
              </div>
              <span className="text-sm font-bold text-foreground">Which? Trusted Trader</span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">CT</span>
              </div>
              <span className="text-sm font-bold text-foreground">Checkatrade</span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-green-500 fill-green-500" />)}
              </div>
              <span className="text-sm font-bold text-foreground">Trustpilot Excellent</span>
            </div>
          </div>
        </div>
      </section>

      <section id="models" className="py-20 bg-background" data-testid="section-models">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#007BC0] uppercase tracking-widest mb-2">Greenstar Range</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Choose Your Perfect Boiler</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you need compact efficiency or high-performance power, Worcester Bosch has a solution for every home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <BoilerCard
              model="2000"
              category="Entry Level"
              description="Compact and affordable without compromising on quality. Perfect for apartments and small to medium homes."
              guaranteeYears={6}
              priceEstimate="£1,695"
              imageUrl="/images/boiler-2000.png"
              features={[
                { text: "Compact design fits in cupboards" },
                { text: "Quiet operation (45dB)" },
                { text: "User-friendly digital interface" },
              ]}
              onSelect={() => scrollToForm("2000")}
            />

            <BoilerCard
              model="4000"
              category="Mid Range"
              description="The successor to the best-selling Greenstar i. Modern design, easy to use, and incredibly efficient."
              guaranteeYears={10}
              priceEstimate="£2,095"
              imageUrl="/images/boiler-4000.png"
              popular={true}
              features={[
                { text: "Modern colour display" },
                { text: "Wireless connectivity ready" },
                { text: "Simple Switch water filling" },
                { text: "Higher hot water flow rates" },
              ]}
              onSelect={() => scrollToForm("4000")}
            />

            <BoilerCard
              model="8000"
              category="Premium"
              description="The ultimate in power and design. For larger homes with high hot water demand. A true style statement."
              guaranteeYears={12}
              priceEstimate="£2,695"
              imageUrl="/images/boiler-8000.png"
              features={[
                { text: "Touchscreen full colour display" },
                { text: "Our most powerful wall-hung boiler" },
                { text: "Stunning design (Gloss Black/White)" },
                { text: "Intelligent filling system" },
              ]}
              onSelect={() => scrollToForm("8000")}
            />
          </div>
        </div>
      </section>

      <FeaturesSection />

      <section className="py-20 bg-white relative" data-testid="section-quote-form">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold text-[#007BC0] uppercase tracking-widest mb-2">Simple Process</p>
                <h2 className="text-3xl font-bold text-foreground mb-4">Ready to upgrade?</h2>
                <p className="text-lg text-muted-foreground">
                  Complete the form to get your fixed price quote. No obligation, no hidden fees.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#005F9E] flex items-center justify-center shrink-0">
                    <span className="font-bold text-white">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg" data-testid="text-step-1">Request Quote</h4>
                    <p className="text-muted-foreground text-sm">Fill in your details and boiler preference.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#005F9E] flex items-center justify-center shrink-0">
                    <span className="font-bold text-white">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg" data-testid="text-step-2">Home Survey</h4>
                    <p className="text-muted-foreground text-sm">We'll arrange a quick video or home survey.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#005F9E] flex items-center justify-center shrink-0">
                    <span className="font-bold text-white">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg" data-testid="text-step-3">Installation</h4>
                    <p className="text-muted-foreground text-sm">Our Gas Safe engineers install your new system.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#005F9E]/5 p-6 rounded-xl border border-[#005F9E]/10">
                <h4 className="font-bold mb-2 text-foreground">Need help deciding?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our friendly team is here to answer any questions about finding the right boiler for your home.
                </p>
                <a href="tel:08001234567" className="text-[#005F9E] font-bold inline-flex items-center gap-2" data-testid="link-phone-help">
                  <Phone className="w-4 h-4" /> Call us on 0800 123 4567
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#007BC0] rounded-full opacity-10 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#005F9E] rounded-full opacity-10 blur-2xl" />

              <LeadForm preselectedModel={selectedModel} className="relative z-10" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#003d66] text-white py-12" data-testid="footer">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" aria-label="Worcester Bosch logo">
                  <rect width="40" height="40" rx="6" fill="white" />
                  <path d="M8 12 L14 28 L20 18 L26 28 L32 12" stroke="#005F9E" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="20" cy="10" r="2.5" fill="#007BC0" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-lg">Worcester Bosch</span>
                  <span className="text-[10px] text-blue-300 font-medium tracking-wide uppercase">Greenstar Boilers</span>
                </div>
              </div>
              <p className="text-blue-200 text-sm max-w-sm">
                Specialist installers of Worcester Bosch boilers. Committed to energy efficiency, quality installation, and outstanding customer service.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#models" className="hover:text-white transition-colors">Boiler Range</a></li>
                <li><a href="#get-quote" className="hover:text-white transition-colors">Get Quote</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>0800 123 4567</li>
                <li>info@worcesteroffers.co.uk</li>
                <li>Worcester, UK</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-300">
            <p>&copy; {new Date().getFullYear()} Worcester Bosch Group. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
