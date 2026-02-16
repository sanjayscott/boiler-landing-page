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
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm h-16 md:h-20">
        <div className="container h-full mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              WB
            </div>
            <span className="font-display font-bold text-lg md:text-xl text-secondary">
              Worcester Offers
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0800000000" className="hidden md:flex items-center gap-2 text-secondary font-semibold hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              0800 123 4567
            </a>
            <Button onClick={() => scrollToForm("unsure")} className="bg-primary hover:bg-primary/90">
              Get Quote
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient z-0" />
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0" />
        
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
                <span>#1 Rated Boiler Brand in the UK</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight text-white">
                Upgrade Your Home <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  Heating Efficiency
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 max-w-lg leading-relaxed">
                Save up to £580 per year on your energy bills with a new A-rated Worcester Bosch boiler. Professional installation from Gas Safe engineers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToForm("unsure")}
                  className="bg-white text-secondary hover:bg-gray-100 font-bold text-lg px-8 h-14"
                >
                  Get Your Free Quote
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => document.getElementById("models")?.scrollIntoView({ behavior: "smooth" })}
                  className="border-white/40 text-white hover:bg-white/10 hover:text-white h-14"
                >
                  View Models
                </Button>
              </div>
              
              <div className="pt-8 flex items-center gap-8 opacity-80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">10 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold border px-1 rounded text-xs">A+</div>
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
              {/* boiler image interior modern home */}
              <img 
                src="https://pixabay.com/get/g74037cb344a9be8e9384d557a5f3a2dd31c278bd8a0a54cc05ce6201338e56573d233453a37ae48436faa24189a12e9ca7b21115f081d1725bee367cc67f780b_1280.jpg"
                alt="Modern boiler installation" 
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

      {/* Brands / Trust Indicators */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Accredited & Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos represented as text for this demo */}
            <span className="text-xl font-bold font-display">Gas Safe</span>
            <span className="text-xl font-bold font-display">Which? Trusted Trader</span>
            <span className="text-xl font-bold font-display">Checkatrade</span>
            <span className="text-xl font-bold font-display">Trustpilot</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="models" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4 font-display">Choose Your Perfect Boiler</h2>
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
              imageUrl="https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=60" /* boiler in kitchen utility room */
              features={[
                { text: "Compact design fits in cupboards" },
                { text: "Quiet operation (45dB)" },
                { text: "User-friendly interface" },
              ]}
              onSelect={() => scrollToForm("2000")}
            />

            <BoilerCard
              model="4000"
              category="Mid Range"
              description="The successor to the best-selling Greenstar i. Modern design, easy to use, and incredibly efficient."
              guaranteeYears={10}
              priceEstimate="£2,095"
              imageUrl="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=60" /* modern kitchen clean */
              popular={true}
              features={[
                { text: "Modern colorful display" },
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
              imageUrl="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop&q=60" /* luxury modern home interior */
              features={[
                { text: "Touchscreen full color display" },
                { text: "Our most powerful wall-hung boiler" },
                { text: "Stunning design (Gloss Black/White)" },
                { text: "Intelligent filling system" },
              ]}
              onSelect={() => scrollToForm("8000")}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <FeaturesSection />

      {/* Form Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-4">Ready to upgrade?</h2>
                <p className="text-lg text-muted-foreground">
                  Complete the form to get your fixed price quote. No obligation, no hidden fees.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-blue-700">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Request Quote</h4>
                    <p className="text-muted-foreground text-sm">Fill in your details and boiler preference.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-blue-700">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Survey</h4>
                    <p className="text-muted-foreground text-sm">We'll arrange a quick video or home survey.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-blue-700">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Installation</h4>
                    <p className="text-muted-foreground text-sm">Our expert engineers install your new system.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h4 className="font-bold mb-2">Need help deciding?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our friendly team is here to answer any questions you might have about finding the right boiler for your home.
                </p>
                <a href="tel:08001234567" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call us on 0800 123 4567
                </a>
              </div>
            </div>

            <div className="relative">
              {/* Decorative element behind form */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-10 blur-2xl" />
              
              <LeadForm preselectedModel={selectedModel} className="relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold">WB</div>
                <span className="font-display font-bold text-xl">Worcester Offers</span>
              </div>
              <p className="text-blue-200 text-sm max-w-sm">
                Specialist installers of Worcester Bosch boilers. Committed to energy efficiency, quality installation, and outstanding customer service.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#models" className="hover:text-white transition-colors">Boiler Models</a></li>
                <li><a href="#get-quote" className="hover:text-white transition-colors">Get Quote</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>0800 123 4567</li>
                <li>info@worcesteroffers.co.uk</li>
                <li>123 Heating Lane, UK</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
            <p>&copy; 2024 Worcester Offers. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
