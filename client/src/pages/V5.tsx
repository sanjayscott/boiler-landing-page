import { useState, useEffect } from "react";
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
  Phone, Shield, Star, CheckCircle, Wrench, Award, MapPin, Calendar, ClipboardCheck, Clock,
} from "lucide-react";
import { motion } from "framer-motion";

import worcesterBoschLogo from "@assets/worcester-bosch-logo_(2)_1771281246798.png";
import heroImg from "@assets/4000-Traditional_Kitchen-face-on_1771281416429.jpg";
import boiler2000Img from "@assets/Worcs_Condens_2000_Front_1771281207345.jpg";
import boiler4000Img from "@assets/Worcester_Bosch_4000_Which_24_1080x1080_1771281354652.jpg";
import boiler8000Img from "@assets/Worcester_Bosch_8000__8000_Style_inward_packshot_-_585x550_1771281354652.jpg";
import guarantee8Img from "@assets/8_Blue_Ast_320x320_copy_2_1771281377729.jpg";
import guarantee10Img from "@assets/10_Blue_Ast_320x320_copy_2_1771281377729.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";
const SPRING_GREEN = "#4CAF50";
const SPRING_ACCENT = "#F57C00";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useCountdown() {
  const getTarget = () => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 2, 31, 23, 59, 59);
    if (now > target) target.setFullYear(target.getFullYear() + 1);
    return target;
  };
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = getTarget().getTime() - Date.now();
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) };
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(0, getTarget().getTime() - Date.now());
      setTimeLeft({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return timeLeft;
}

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md" data-testid="header">
      <div className="bg-[#4CAF50] text-white text-center py-2 text-sm font-bold tracking-wide flex items-center justify-center gap-2" data-testid="banner-promo">
        <Clock className="w-4 h-4" /> Spring Boiler Upgrade Event — Book Before March 31st
      </div>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-8 md:h-10 w-auto" data-testid="img-logo" />
        <a href={PHONE_HREF} className="flex items-center gap-2 font-bold" style={{ color: WB_BLUE }} data-testid="link-phone-header">
          <Phone className="w-5 h-5" /><span>{PHONE}</span>
        </a>
      </div>
    </header>
  );
}

function CountdownBar() {
  const t = useCountdown();
  return (
    <div className="bg-[#FFF3E0] py-4 border-b" data-testid="countdown-bar">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <p className="font-bold text-sm" style={{ color: WB_BLUE }}>Spring offer ends in:</p>
          <div className="flex gap-3">
            {[
              { val: t.days, label: "Days" },
              { val: t.hours, label: "Hours" },
              { val: t.minutes, label: "Mins" },
              { val: t.seconds, label: "Secs" },
            ].map((u) => (
              <div key={u.label} className="text-center">
                <div className="w-14 h-14 rounded-md flex items-center justify-center font-bold text-xl text-white" style={{ backgroundColor: WB_BLUE }}>{String(u.val).padStart(2, "0")}</div>
                <p className="text-xs text-gray-500 mt-1">{u.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pt-28 md:pt-32" data-testid="section-hero">
      <CountdownBar />
      <div className="relative min-h-[550px] md:min-h-[600px] flex items-center" style={{ background: `linear-gradient(135deg, #1b5e20 0%, ${SPRING_GREEN} 50%, #81C784 100%)` }}>
        <div className="absolute inset-0 opacity-20">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md">
              <p className="text-sm font-bold text-white uppercase tracking-wider">Limited Time Spring Event</p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Spring Boiler<br />Upgrade Event
            </h1>
            <p className="text-xl md:text-2xl font-bold text-white">
              New Worcester Bosch From <span className="text-yellow-300">£1,790</span>
            </p>
            <p className="text-green-100 text-lg">
              Book before March 31st and lock in our best spring prices. Fixed price, fully installed.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-green-100">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Gas Safe</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" /> WB Accredited</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4" /> 4.8 Rated</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Medway</span>
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => scrollTo("book-assessment")} className="bg-[#F57C00] border-[#E65100] text-white font-bold text-lg" data-testid="button-hero-cta">
                Book Before March 31st
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    { tier: "Good", model: "Greenstar 2000i", price: "£1,790", warranty: "8 Year Warranty", warrantyImg: guarantee8Img, image: boiler2000Img, features: ["Compact design", "Quiet operation", "Digital display", "Small-medium homes", "System flush included"] },
    { tier: "Better", model: "Greenstar 4000", price: "£2,199", warranty: "10 Year Warranty", warrantyImg: guarantee10Img, image: boiler4000Img, popular: true, features: ["Colour display", "Which? Best Buy", "Wireless ready", "Higher flow rates", "System flush included"] },
    { tier: "Premium", model: "Greenstar 8000 Life", price: "£2,690", warranty: "12 Year Warranty", image: boiler8000Img, features: ["Touchscreen display", "Most powerful wall-hung", "Black or white", "Intelligent filling", "System flush included"] },
  ];
  return (
    <section id="pricing" className="py-16 md:py-20 bg-white" data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: SPRING_GREEN }}>Spring Event Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Choose Your New Boiler</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">All prices include full installation. Book before March 31st.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-5xl mx-auto items-start">
          {tiers.map((t) => (
            <Card key={t.tier} className={`flex flex-col p-0 ${t.popular ? "ring-2 ring-[#F57C00] relative" : ""}`} style={t.popular ? { transform: "scale(1.03)", zIndex: 1 } : {}} data-testid={`card-pricing-${t.tier.toLowerCase()}`}>
              {t.popular && <div className="bg-[#F57C00] text-white text-center py-2 font-bold text-sm uppercase tracking-wider rounded-t-md">Most Popular</div>}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: SPRING_GREEN }}>{t.tier}</p>
                  <h3 className="text-xl font-bold" style={{ color: WB_BLUE }}>{t.model}</h3>
                </div>
                <div className="flex justify-center py-4"><img src={t.image} alt={t.model} className="h-48 w-auto object-contain" /></div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold" style={{ color: WB_BLUE }}>{t.price}</p>
                  <p className="text-sm text-gray-500 mt-1">Fully installed, fixed price</p>
                </div>
                {t.warrantyImg ? <div className="flex justify-center"><img src={t.warrantyImg} alt={t.warranty} className="h-16 w-16 object-contain" /></div> : <div className="flex justify-center"><div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold text-center leading-tight p-1" style={{ backgroundColor: WB_BLUE }}>{t.warranty}</div></div>}
                <ul className="space-y-2 flex-1">
                  {t.features.map((f, i) => (<li key={i} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /><span>{f}</span></li>))}
                </ul>
                <Button onClick={() => scrollTo("book-assessment")} className={t.popular ? "bg-[#F57C00] border-[#E65100] text-white font-bold w-full" : "text-white font-bold w-full"} style={!t.popular ? { backgroundColor: WB_BLUE, borderColor: "#001845" } : {}} data-testid={`button-pricing-${t.tier.toLowerCase()}`}>Book Before March 31st</Button>
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
    { icon: Calendar, title: "Book Free Assessment", description: "Book now to lock in spring pricing." },
    { icon: ClipboardCheck, title: "Confirm Fixed Price", description: "Engineer confirms price on the spot." },
    { icon: Wrench, title: "Installation Day", description: "Typically completed in just one day." },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>How It Works</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: WB_BLUE }}><s.icon className="w-7 h-7 text-white" /></div>
              <div className="w-8 h-8 rounded-full bg-[#F57C00] text-white font-bold flex items-center justify-center mx-auto text-sm">{i + 1}</div>
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
    { icon: Shield, title: "Up to 12 Years Warranty" },
    { icon: Award, title: "Worcester Bosch Accredited" },
    { icon: CheckCircle, title: "Gas Safe Registered" },
    { icon: MapPin, title: "Local Medway Engineers" },
    { icon: Star, title: "4.8 Star Reviews" },
    { icon: Clock, title: "Spring Pricing Ends March 31st" },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-benefits">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {items.map((b, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${SPRING_GREEN}20` }}>
                <b.icon className="w-6 h-6" style={{ color: SPRING_GREEN }} />
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
    { name: "Sarah Thompson", location: "Chatham", text: "Brilliant service. New Greenstar 4000 is so much quieter. Highly recommend!", rating: 5 },
    { name: "David Richardson", location: "Gillingham", text: "Fixed price. No surprises. Installation done in one day.", rating: 5 },
    { name: "Karen Mitchell", location: "Rochester", text: "Best value, longest warranty. Bills already dropped.", rating: 5 },
    { name: "James Patel", location: "Rainham", text: "8000 Life looks stunning. Heats the house in no time.", rating: 5 },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Customer Reviews</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <Card key={i} className="p-5 h-full flex flex-col gap-3" data-testid={`card-review-${i}`}>
              <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
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
    { q: "When does the spring offer end?", a: "Book your free assessment before March 31st to lock in spring pricing." },
    { q: "How long does installation take?", a: "Typically one day, 4-6 hours." },
    { q: "Is the price fixed?", a: "Yes. Includes boiler, installation, removal and flush. No hidden costs." },
    { q: "Do you offer finance?", a: "Yes, flexible finance available. Ask during your assessment." },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>FAQ</h2></div>
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
    <section id="book-assessment" className="py-16 md:py-24" style={{ backgroundColor: WB_BLUE }} data-testid="section-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-[#F57C00] px-4 py-2 rounded-md"><p className="text-sm font-bold text-white uppercase">Offer Ends March 31st</p></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Don't Miss Out<br /><span className="text-[#F57C00]">From £1,790</span></h2>
            <ul className="space-y-3 text-blue-100">
              {["Fixed price, no hidden costs", "WB Accredited Installer", "Up to 12 years warranty", "Installed in one day"].map((t, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400 shrink-0" />{t}</li>
              ))}
            </ul>
            <div className="pt-4">
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
                <h3 className="text-xl font-bold mb-1" style={{ color: WB_BLUE }}>Book Your Spring Assessment</h3>
                <p className="text-sm text-gray-500 mb-6">Lock in spring pricing before March 31st.</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4" data-testid="form-assessment">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Your Name" {...field} data-testid="input-name" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="postcode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postcode" {...field} data-testid="input-postcode" /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" size="lg" className="bg-[#F57C00] border-[#E65100] text-white font-bold w-full" disabled={mutation.isPending} data-testid="button-submit-form">
                      {mutation.isPending ? "Submitting..." : "Book Before March 31st"}
                    </Button>
                    <p className="text-xs text-center text-gray-400">No obligation. Spring pricing guaranteed.</p>
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
    <footer style={{ backgroundColor: "#001540" }} className="text-blue-200 py-8" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-center md:text-left">
            <p className="font-bold text-white mb-1">We Service Boilers Ltd</p>
            <p>Gas Safe Registered | Worcester Bosch Accredited</p>
          </div>
          <p>&copy; {new Date().getFullYear()} We Service Boilers Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

export default function V5() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v5">
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
