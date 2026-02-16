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
  Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, CheckCircle, Shield, Award, Star, Calendar, ClipboardCheck, Wrench, MapPin, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

import worcesterBoschLogo from "@assets/worcester-bosch-logo_(2)_1771281246798.png";
import heroImg from "@assets/Worcester_Bosch_8000_Which_24_1080x1080_1771281280295.jpg";
import boiler2000Img from "@assets/Worcs_Condens_2000_Front_1771281207345.jpg";
import boiler4000Img from "@assets/Worcester_Bosch_4000_Which_24_1080x1080_1771281354652.jpg";
import boiler8000Img from "@assets/Worcester_Bosch_8000__8000_Style_inward_packshot_-_585x550_1771281354652.jpg";
import guarantee8Img from "@assets/8_Blue_Ast_320x320_copy_2_1771281377729.jpg";
import guarantee10Img from "@assets/10_Blue_Ast_320x320_copy_2_1771281377729.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm" data-testid="header">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-7 md:h-8 w-auto" data-testid="img-logo" />
        <a href={PHONE_HREF} className="flex items-center gap-2 font-bold text-sm" style={{ color: WB_BLUE }} data-testid="link-phone-header">
          <Phone className="w-4 h-4" /><span>{PHONE}</span>
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="pt-14" data-testid="section-hero">
      <div className="relative min-h-[500px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Worcester Bosch boiler" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,32,91,0.85) 0%, rgba(0,32,91,0.9) 100%)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-xl mx-auto text-center space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              New Worcester Bosch<br />From <span className="text-[#F57C00]">£1,790</span>
            </h1>
            <p className="text-blue-200 text-base">
              Fixed price. Installed in one day. Up to 12 years warranty.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-blue-200">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Gas Safe</span>
              <span className="flex items-center gap-1"><Award className="w-3 h-3" /> WB Accredited</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> 4.8 Rated</span>
            </div>
            <Button size="lg" onClick={() => scrollTo("book-assessment")} className="bg-[#F57C00] border-[#E65100] text-white font-bold" data-testid="button-hero-cta">
              Book Free Assessment
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    { tier: "Good", model: "Greenstar 2000i", price: "£1,790", warranty: "8yr", warrantyImg: guarantee8Img, image: boiler2000Img, features: ["Compact design", "Quiet operation", "Digital display"] },
    { tier: "Better", model: "Greenstar 4000", price: "£2,199", warranty: "10yr", warrantyImg: guarantee10Img, image: boiler4000Img, popular: true, features: ["Which? Best Buy", "Colour display", "Wireless ready"] },
    { tier: "Premium", model: "Greenstar 8000 Life", price: "£2,690", warranty: "12yr", image: boiler8000Img, features: ["Touchscreen", "Most powerful", "Black or white"] },
  ];
  return (
    <section id="pricing" className="py-12 md:py-16 bg-white" data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: WB_BLUE }}>Choose Your Boiler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-4xl mx-auto items-start">
          {tiers.map((t) => (
            <Card key={t.tier} className={`flex flex-col p-0 ${t.popular ? "ring-2 ring-[#F57C00] relative" : ""}`} style={t.popular ? { transform: "scale(1.03)", zIndex: 1 } : {}} data-testid={`card-pricing-${t.tier.toLowerCase()}`}>
              {t.popular && <div className="bg-[#F57C00] text-white text-center py-1.5 font-bold text-xs uppercase tracking-wider rounded-t-md">Most Popular</div>}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="text-center">
                  <p className="text-xs font-semibold text-[#F57C00] uppercase tracking-wide mb-0.5">{t.tier}</p>
                  <h3 className="text-lg font-bold" style={{ color: WB_BLUE }}>{t.model}</h3>
                </div>
                <div className="flex justify-center py-3"><img src={t.image} alt={t.model} className="h-40 w-auto object-contain" /></div>
                <div className="text-center">
                  <p className="text-3xl font-extrabold" style={{ color: WB_BLUE }}>{t.price}</p>
                  <p className="text-xs text-gray-500">Fully installed</p>
                </div>
                {t.warrantyImg ? <div className="flex justify-center"><img src={t.warrantyImg} alt={t.warranty} className="h-12 w-12 object-contain" /></div> : <div className="flex justify-center"><div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: WB_BLUE }}>{t.warranty}</div></div>}
                <ul className="space-y-1.5 flex-1">
                  {t.features.map((f, i) => (<li key={i} className="flex items-center gap-1.5 text-xs text-gray-600"><CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" /><span>{f}</span></li>))}
                </ul>
                <Button onClick={() => scrollTo("book-assessment")} className={t.popular ? "bg-[#F57C00] border-[#E65100] text-white font-bold w-full" : "text-white font-bold w-full"} style={!t.popular ? { backgroundColor: WB_BLUE } : {}} data-testid={`button-pricing-${t.tier.toLowerCase()}`}>Book Assessment</Button>
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
    { icon: Calendar, title: "Book", desc: "Free home assessment" },
    { icon: ClipboardCheck, title: "Confirm", desc: "Fixed price on the spot" },
    { icon: Wrench, title: "Install", desc: "Typically one day" },
  ];
  return (
    <section className="py-10 md:py-12" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-6" style={{ color: WB_BLUE }}>How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="text-center space-y-2 w-28">
              <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: WB_BLUE }}><s.icon className="w-5 h-5 text-white" /></div>
              <p className="text-sm font-bold" style={{ color: WB_BLUE }}>{s.title}</p>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: ThumbsUp, title: "Fixed Price" },
    { icon: Award, title: "WB Accredited" },
    { icon: Shield, title: "Up to 12yr Warranty" },
    { icon: CheckCircle, title: "Gas Safe" },
    { icon: MapPin, title: "Local Engineers" },
    { icon: Star, title: "4.8 Stars" },
  ];
  return (
    <section className="py-10 md:py-12 bg-white" data-testid="section-benefits">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          {items.map((b, i) => (
            <div key={i} className="text-center space-y-1 w-20">
              <b.icon className="w-5 h-5 mx-auto" style={{ color: WB_BLUE }} />
              <p className="text-[10px] font-bold" style={{ color: WB_BLUE }}>{b.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Sarah T.", text: "Brilliant service. Professional and tidy.", rating: 5 },
    { name: "David R.", text: "Fixed price. No surprises. Done in one day.", rating: 5 },
    { name: "Karen M.", text: "Best value. Bills already dropped.", rating: 5 },
  ];
  return (
    <section className="py-10 md:py-12" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-6" style={{ color: WB_BLUE }}>Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {reviews.map((r, i) => (
            <Card key={i} className="p-4 h-full flex flex-col gap-2" data-testid={`card-review-${i}`}>
              <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}</div>
              <p className="text-xs text-gray-600 flex-1 italic">"{r.text}"</p>
              <p className="font-bold text-xs" style={{ color: WB_BLUE }}>{r.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How long does installation take?", a: "Typically one day, 4-6 hours." },
    { q: "Is the price fixed?", a: "Yes. Includes boiler, installation, removal and flush." },
    { q: "Do you offer finance?", a: "Yes. 0% finance available, subject to status." },
  ];
  return (
    <section className="py-10 md:py-12 bg-white" data-testid="section-faq">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-xl font-bold text-center mb-4" style={{ color: WB_BLUE }}>FAQ</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-md px-3">
              <AccordionTrigger className="text-left font-semibold py-3 text-sm" style={{ color: WB_BLUE }}>{faq.q}</AccordionTrigger>
              <AccordionContent className="text-xs text-gray-500 pb-3">{faq.a}</AccordionContent>
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
    <section id="book-assessment" className="py-12 md:py-16" style={{ backgroundColor: WB_BLUE }} data-testid="section-form">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="p-6" data-testid="card-form">
          {submitted ? (
            <div className="text-center py-6 space-y-3" data-testid="form-success">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle className="w-7 h-7 text-green-600" /></div>
              <h3 className="text-lg font-bold" style={{ color: WB_BLUE }}>Thank You!</h3>
              <p className="text-sm text-gray-500">We'll be in touch shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-1 text-center" style={{ color: WB_BLUE }}>Book Your Free Assessment</h3>
              <p className="text-xs text-gray-500 mb-4 text-center">No obligation. We'll call you back.</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-3" data-testid="form-assessment">
                  <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Your Name" {...field} data-testid="input-name" /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="postcode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postcode" {...field} data-testid="input-postcode" /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="submit" size="lg" className="bg-[#F57C00] border-[#E65100] text-white font-bold w-full" disabled={mutation.isPending} data-testid="button-submit-form">
                    {mutation.isPending ? "Submitting..." : "Book Free Assessment"}
                  </Button>
                </form>
              </Form>
              <div className="text-center mt-4">
                <p className="text-xs text-gray-400 mb-1">Or call us free:</p>
                <a href={PHONE_HREF} className="font-bold flex items-center justify-center gap-2" style={{ color: WB_BLUE }} data-testid="link-phone-final">
                  <Phone className="w-4 h-4" />{PHONE}
                </a>
              </div>
            </>
          )}
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#001540" }} className="text-blue-200 py-6" data-testid="footer">
      <div className="container mx-auto px-4 text-center text-xs space-y-1">
        <p className="font-bold text-white">We Service Boilers Ltd</p>
        <p>Gas Safe Registered | Worcester Bosch Accredited | &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default function V8() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v8">
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
