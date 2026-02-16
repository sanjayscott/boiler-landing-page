import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form";
import {
  Phone, Shield, Star, CheckCircle, Wrench, Award, MapPin, ThumbsUp, Calendar, ClipboardCheck,
} from "lucide-react";
import { motion } from "framer-motion";

import worcesterBoschLogo from "@assets/worcester-bosch-logo_(2)_1771281246798.png";
import boiler8000Img from "@assets/Worcester_Bosch_8000__8000_Style_inward_packshot_-_585x550_1771281354652.jpg";
import boiler8000StyleImg from "@assets/Worcester_Bosch_8000_style_584_x_550_1771281325567.jpg";
import boiler8000UtilityImg from "@assets/Worcester_Bosch_8000_Utility_560x466_1771281313189.jpg";
import boiler2000Img from "@assets/Worcs_Condens_2000_Front_1771281207345.jpg";
import boiler4000Img from "@assets/Worcester_Bosch_4000_Which_24_1080x1080_1771281354652.jpg";
import guarantee8Img from "@assets/8_Blue_Ast_320x320_copy_2_1771281377729.jpg";
import guarantee10Img from "@assets/10_Blue_Ast_320x320_copy_2_1771281377729.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";
const GOLD = "#D4A843";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 shadow-lg" style={{ backgroundColor: WB_BLUE }} data-testid="header">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-8 md:h-10 w-auto brightness-0 invert" data-testid="img-logo" />
        <a href={PHONE_HREF} className="flex items-center gap-2 font-bold text-white" data-testid="link-phone-header">
          <Phone className="w-5 h-5" /><span>{PHONE}</span>
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="pt-20 md:pt-24" data-testid="section-hero">
      <div style={{ background: `linear-gradient(135deg, ${WB_BLUE} 0%, #001540 40%, #000d2e 100%)` }} className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-visible">
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: GOLD }}>Premium Collection</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                The Ultimate<br />Home Heating<br />Upgrade
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white">
                Greenstar 8000 Life — <span style={{ color: GOLD }}>£2,690</span>
              </p>
              <p className="text-blue-200 text-lg max-w-lg">
                The pinnacle of Worcester Bosch engineering. Touchscreen control, intelligent filling, 12 year warranty.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-200">
                <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Gas Safe</span>
                <span className="flex items-center gap-1"><Award className="w-4 h-4" /> WB Accredited</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4" /> 4.8 Rated</span>
              </div>
              <div className="pt-2">
                <Button size="lg" onClick={() => scrollTo("book-assessment")} style={{ backgroundColor: GOLD, borderColor: "#b8912e" }} className="text-[#00205B] font-bold text-lg" data-testid="button-hero-cta">
                  Book Your Free Assessment
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden md:flex justify-center">
              <img src={boiler8000Img} alt="Greenstar 8000 Life" className="max-w-md w-full drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    { tier: "Good", model: "Greenstar 2000i", price: "£1,790", warranty: "8 Year Warranty", warrantyImg: guarantee8Img, image: boiler2000Img, features: ["Compact cupboard design", "Quiet operation", "Digital display", "Small to medium homes", "System flush included"] },
    { tier: "Better", model: "Greenstar 4000", price: "£2,199", warranty: "10 Year Warranty", warrantyImg: guarantee10Img, image: boiler4000Img, features: ["Full colour display", "Which? Best Buy", "Wireless ready", "Higher flow rates", "System flush included"] },
    { tier: "Premium", model: "Greenstar 8000 Life", price: "£2,690", warranty: "12 Year Warranty", image: boiler8000StyleImg, popular: true, features: ["Touchscreen colour display", "Most powerful wall-hung", "Black or white finish", "Intelligent filling", "System flush included"] },
  ];
  return (
    <section id="pricing" className="py-16 md:py-20" style={{ backgroundColor: "#f8f6f3" }} data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Complete Range</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Choose Your Worcester Bosch</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-5xl mx-auto items-start">
          {tiers.map((t) => (
            <Card key={t.tier} className={`flex flex-col p-0 ${t.popular ? "ring-2 relative" : ""}`} style={t.popular ? { ringColor: GOLD, transform: "scale(1.03)", zIndex: 1 } : {}} data-testid={`card-pricing-${t.tier.toLowerCase()}`}>
              {t.popular && (
                <div style={{ backgroundColor: GOLD }} className="text-[#00205B] text-center py-2 font-bold text-sm uppercase tracking-wider rounded-t-md">
                  Recommended
                </div>
              )}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: GOLD }}>{t.tier}</p>
                  <h3 className="text-xl font-bold" style={{ color: WB_BLUE }}>{t.model}</h3>
                </div>
                <div className="flex justify-center py-4"><img src={t.image} alt={t.model} className="h-48 w-auto object-contain" /></div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold" style={{ color: WB_BLUE }}>{t.price}</p>
                  <p className="text-sm text-gray-500 mt-1">Fully installed, fixed price</p>
                </div>
                {t.warrantyImg ? (
                  <div className="flex justify-center"><img src={t.warrantyImg} alt={t.warranty} className="h-16 w-16 object-contain" /></div>
                ) : (
                  <div className="flex justify-center"><div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold text-center leading-tight p-1" style={{ backgroundColor: WB_BLUE }}>{t.warranty}</div></div>
                )}
                <ul className="space-y-2 flex-1">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GOLD }} /><span>{f}</span></li>
                  ))}
                </ul>
                <Button onClick={() => scrollTo("book-assessment")} style={t.popular ? { backgroundColor: GOLD, borderColor: "#b8912e", color: WB_BLUE } : { backgroundColor: WB_BLUE, borderColor: "#001845" }} className="text-white font-bold w-full" data-testid={`button-pricing-${t.tier.toLowerCase()}`}>
                  Book Free Assessment
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Calendar, title: "Book Free Assessment", description: "Call or fill the form. We'll arrange a convenient visit." },
    { icon: ClipboardCheck, title: "Confirm Fixed Price", description: "Engineer surveys and confirms price on the spot." },
    { icon: Wrench, title: "Expert Installation", description: "Installed by Gas Safe engineers, typically one day." },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: WB_BLUE }}><s.icon className="w-7 h-7 text-white" /></div>
              <div className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center mx-auto text-sm" style={{ backgroundColor: GOLD, color: WB_BLUE }}>{i + 1}</div>
              <h3 className="text-lg font-bold" style={{ color: WB_BLUE }}>{s.title}</h3>
              <p className="text-sm text-gray-500">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: ThumbsUp, title: "Fixed Price Guarantee" },
    { icon: Award, title: "Worcester Bosch Accredited" },
    { icon: Shield, title: "Up to 12 Years Warranty" },
    { icon: CheckCircle, title: "Gas Safe Registered" },
    { icon: MapPin, title: "Local Medway Engineers" },
    { icon: Star, title: "4.8 Star Rating" },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f8f6f3" }} data-testid="section-benefits">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {items.map((b, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${WB_BLUE}10` }}>
                <b.icon className="w-6 h-6" style={{ color: GOLD }} />
              </div>
              <p className="text-sm font-bold" style={{ color: WB_BLUE }}>{b.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "James Patel", location: "Rainham, Kent", text: "Really pleased with the new 8000 Life. It looks stunning on the wall and heats the house in no time. The 12 year warranty gives great peace of mind.", rating: 5 },
    { name: "Sarah Thompson", location: "Chatham, Kent", text: "Brilliant service from start to finish. The engineer was professional and tidy. Highly recommend!", rating: 5 },
    { name: "David Richardson", location: "Gillingham, Kent", text: "Fixed price was exactly quoted. No surprises. Installation done in a single day.", rating: 5 },
    { name: "Karen Mitchell", location: "Rochester, Kent", text: "Best value with the longest warranty. Heating bills already dropped noticeably.", rating: 5 },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Customer Reviews</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <Card key={i} className="p-5 h-full flex flex-col gap-3" data-testid={`card-review-${i}`}>
              <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
              <p className="text-sm text-gray-600 flex-1 italic">"{r.text}"</p>
              <p className="font-bold text-sm" style={{ color: WB_BLUE }}>{r.name}, {r.location}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "What makes the 8000 Life special?", a: "The Greenstar 8000 Life is Worcester Bosch's flagship boiler with touchscreen controls, intelligent filling system, and our most powerful wall-hung design. Available in black or white." },
    { q: "How long does installation take?", a: "Typically completed in one day, 4-6 hours for a standard replacement." },
    { q: "Is the price fixed?", a: "Yes. £2,690 includes the boiler, installation, old boiler removal and system flush." },
    { q: "Do you offer finance?", a: "Yes, flexible finance options available. Ask during your assessment." },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f8f6f3" }} data-testid="section-faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>FAQ</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-md px-4">
              <AccordionTrigger className="text-left font-semibold py-4" style={{ color: WB_BLUE }}>{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-gray-500 pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const form = useForm<InsertInquiry>({ resolver: zodResolver(insertInquirySchema), defaultValues: { name: "", phone: "", postcode: "" } });
  const mutation = useMutation({
    mutationFn: async (data: InsertInquiry) => { const res = await apiRequest("POST", "/api/leads", data); return res.json(); },
    onSuccess: () => { setSubmitted(true); form.reset(); },
    onError: () => { toast({ title: "Something went wrong", description: "Please try again or call us.", variant: "destructive" }); },
  });

  return (
    <section id="book-assessment" className="py-16 md:py-24" style={{ background: `linear-gradient(135deg, ${WB_BLUE} 0%, #001540 100%)` }} data-testid="section-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: GOLD }}>Premium Installation</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">The Ultimate Upgrade<br /><span style={{ color: GOLD }}>From £1,790</span></h2>
            <ul className="space-y-3 text-blue-100">
              {["Fixed price, no hidden costs", "Worcester Bosch Accredited", "Up to 12 years warranty", "Installed in one day"].map((t, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 shrink-0" style={{ color: GOLD }} />{t}</li>
              ))}
            </ul>
            <div className="pt-4">
              <p className="text-blue-200 text-sm mb-2">Or call us free:</p>
              <a href={PHONE_HREF} className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3" data-testid="link-phone-final"><Phone className="w-7 h-7" />{PHONE}</a>
            </div>
          </div>
          <Card className="p-6 md:p-8" data-testid="card-form">
            {submitted ? (
              <div className="text-center py-8 space-y-4" data-testid="form-success">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                <h3 className="text-xl font-bold" style={{ color: WB_BLUE }}>Thank You!</h3>
                <p className="text-gray-500">We'll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1" style={{ color: WB_BLUE }}>Book Your Free Assessment</h3>
                <p className="text-sm text-gray-500 mb-6">We'll call you back to arrange a convenient time.</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4" data-testid="form-assessment">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Your Name" {...field} data-testid="input-name" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="postcode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postcode" {...field} data-testid="input-postcode" /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" size="lg" style={{ backgroundColor: GOLD, borderColor: "#b8912e", color: WB_BLUE }} className="font-bold w-full" disabled={mutation.isPending} data-testid="button-submit-form">
                      {mutation.isPending ? "Submitting..." : "Book Your Free Assessment"}
                    </Button>
                    <p className="text-xs text-center text-gray-400">No obligation. We'll call within 2 hours.</p>
                  </form>
                </Form>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#000d2e" }} className="text-blue-200 py-8" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-center md:text-left">
            <p className="font-bold text-white mb-1">We Install Boilers Ltd</p>
            <p>Gas Safe Registered | Worcester Bosch Accredited</p>
          </div>
          <p>&copy; {new Date().getFullYear()} We Install Boilers Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

export default function V4() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v4">
      <Header />
      <HeroSection />
      <PricingSection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FAQ />
      <LeadForm />
      <Footer />
    </div>
  );
}
