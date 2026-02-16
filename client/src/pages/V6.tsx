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
  Phone, Shield, Star, CheckCircle, Wrench, Award, MapPin, Calendar, ClipboardCheck, CreditCard,
} from "lucide-react";
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
    <header className="fixed top-0 w-full z-50 bg-white shadow-md" data-testid="header">
      <div className="bg-[#00205B] text-white text-center py-2 text-sm font-bold tracking-wide flex items-center justify-center gap-2">
        <CreditCard className="w-4 h-4" /> 0% Finance Available — Spread the Cost of Your New Boiler
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

function HeroSection() {
  return (
    <section className="pt-28 md:pt-32" data-testid="section-hero">
      <div className="relative min-h-[550px] md:min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Worcester Bosch boiler" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,32,91,0.85) 0%, rgba(0,32,91,0.9) 100%)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-6">
            <div className="inline-block bg-[#78BE20] px-4 py-2 rounded-md">
              <p className="text-sm font-bold text-white uppercase tracking-wider">0% Finance Available</p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              New Worcester Bosch Boiler From{" "}
              <span className="text-[#78BE20]">£37/month</span>
            </h1>
            <p className="text-blue-200 text-lg">
              Spread the cost with affordable monthly payments. 0% finance available on all Worcester Bosch installations. No deposit required.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-md p-4 inline-block">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div><p className="text-2xl font-bold text-white">£37</p><p className="text-xs text-blue-200">per month</p></div>
                <div><p className="text-2xl font-bold text-white">0%</p><p className="text-xs text-blue-200">interest</p></div>
                <div><p className="text-2xl font-bold text-white">48</p><p className="text-xs text-blue-200">months</p></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Gas Safe</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" /> WB Accredited</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4" /> 4.8 Rated</span>
            </div>
            <div className="pt-2">
              <Button size="lg" onClick={() => scrollTo("book-assessment")} className="bg-[#78BE20] border-[#5a9e10] text-white font-bold text-lg" data-testid="button-hero-cta">
                Get Your Free Quote
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
    { tier: "Good", model: "Greenstar 2000i", price: "£1,790", monthly: "£37/mo", warranty: "8 Year Warranty", warrantyImg: guarantee8Img, image: boiler2000Img, features: ["Compact design", "Quiet operation", "Digital display", "Small-medium homes", "System flush included"] },
    { tier: "Better", model: "Greenstar 4000", price: "£2,199", monthly: "£46/mo", warranty: "10 Year Warranty", warrantyImg: guarantee10Img, image: boiler4000Img, popular: true, features: ["Colour display", "Which? Best Buy", "Wireless ready", "Higher flow rates", "System flush included"] },
    { tier: "Premium", model: "Greenstar 8000 Life", price: "£2,690", monthly: "£56/mo", warranty: "12 Year Warranty", image: boiler8000Img, features: ["Touchscreen display", "Most powerful wall-hung", "Black or white", "Intelligent filling", "System flush included"] },
  ];
  return (
    <section id="pricing" className="py-16 md:py-20 bg-white" data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#78BE20]">0% Finance Available</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Affordable Monthly Payments</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">All prices include full installation. Finance subject to status.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-5xl mx-auto items-start">
          {tiers.map((t) => (
            <Card key={t.tier} className={`flex flex-col p-0 ${t.popular ? "ring-2 ring-[#78BE20] relative" : ""}`} style={t.popular ? { transform: "scale(1.03)", zIndex: 1 } : {}} data-testid={`card-pricing-${t.tier.toLowerCase()}`}>
              {t.popular && <div className="bg-[#78BE20] text-white text-center py-2 font-bold text-sm uppercase tracking-wider rounded-t-md">Most Popular</div>}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1 text-[#78BE20]">{t.tier}</p>
                  <h3 className="text-xl font-bold" style={{ color: WB_BLUE }}>{t.model}</h3>
                </div>
                <div className="flex justify-center py-4"><img src={t.image} alt={t.model} className="h-48 w-auto object-contain" /></div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-[#78BE20]">{t.monthly}</p>
                  <p className="text-lg font-bold mt-1" style={{ color: WB_BLUE }}>or {t.price} outright</p>
                  <p className="text-xs text-gray-500 mt-1">0% APR, 48 months, no deposit</p>
                </div>
                {t.warrantyImg ? <div className="flex justify-center"><img src={t.warrantyImg} alt={t.warranty} className="h-16 w-16 object-contain" /></div> : <div className="flex justify-center"><div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold text-center leading-tight p-1" style={{ backgroundColor: WB_BLUE }}>{t.warranty}</div></div>}
                <ul className="space-y-2 flex-1">
                  {t.features.map((f, i) => (<li key={i} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-[#78BE20] mt-0.5 shrink-0" /><span>{f}</span></li>))}
                </ul>
                <Button onClick={() => scrollTo("book-assessment")} className={t.popular ? "bg-[#78BE20] border-[#5a9e10] text-white font-bold w-full" : "text-white font-bold w-full"} style={!t.popular ? { backgroundColor: WB_BLUE, borderColor: "#001845" } : {}} data-testid={`button-pricing-${t.tier.toLowerCase()}`}>Get Free Quote</Button>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">Representative example: Cash price £1,790, 48 monthly payments of £37.29, total payable £1,790. 0% APR. Finance subject to status. Terms and conditions apply.</p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Calendar, title: "Book Free Assessment", description: "We'll visit and confirm your fixed price." },
    { icon: CreditCard, title: "Choose How to Pay", description: "Pay outright or spread the cost with 0% finance." },
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
              <div className="w-8 h-8 rounded-full bg-[#78BE20] text-white font-bold flex items-center justify-center mx-auto text-sm">{i + 1}</div>
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
    { icon: CreditCard, title: "0% Finance Available" },
    { icon: Shield, title: "Up to 12 Years Warranty" },
    { icon: Award, title: "Worcester Bosch Accredited" },
    { icon: CheckCircle, title: "Gas Safe Registered" },
    { icon: MapPin, title: "Local Medway Engineers" },
    { icon: Star, title: "4.8 Star Rating" },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-benefits">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {items.map((b, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-[#78BE20]/10">
                <b.icon className="w-6 h-6 text-[#78BE20]" />
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
    { name: "Sarah Thompson", location: "Chatham", text: "The finance option made it so easy. No deposit and 0% interest. New boiler installed in a day!", rating: 5 },
    { name: "David Richardson", location: "Gillingham", text: "Fixed price, no surprises. The monthly payments are very manageable.", rating: 5 },
    { name: "Karen Mitchell", location: "Rochester", text: "Best value and longest warranty. Heating bills already dropped.", rating: 5 },
    { name: "James Patel", location: "Rainham", text: "Spreading the cost made upgrading a no-brainer. Great service.", rating: 5 },
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
    { q: "How does the 0% finance work?", a: "We offer 0% APR finance over 48 months with no deposit required. Subject to credit approval." },
    { q: "Can I pay outright instead?", a: "Absolutely. Full prices are shown alongside monthly costs." },
    { q: "Is the price fixed?", a: "Yes. Whether paying outright or on finance, the price includes everything." },
    { q: "How long does installation take?", a: "Typically one day, 4-6 hours for a standard replacement." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-white">New Boiler From<br /><span className="text-[#78BE20]">Just £37/month</span></h2>
            <ul className="space-y-3 text-blue-100">
              {["0% finance, no deposit", "Fixed price installation", "Up to 12 years warranty", "Installed in one day"].map((t, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#78BE20] shrink-0" />{t}</li>
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
                <p className="text-gray-500">We'll be in touch about your quote and finance options.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1" style={{ color: WB_BLUE }}>Get Your Free Quote</h3>
                <p className="text-sm text-gray-500 mb-6">We'll discuss pricing and finance options.</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4" data-testid="form-assessment">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Your Name" {...field} data-testid="input-name" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="postcode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postcode" {...field} data-testid="input-postcode" /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" size="lg" className="bg-[#78BE20] border-[#5a9e10] text-white font-bold w-full" disabled={mutation.isPending} data-testid="button-submit-form">
                      {mutation.isPending ? "Submitting..." : "Get Your Free Quote"}
                    </Button>
                    <p className="text-xs text-center text-gray-400">No obligation. Finance subject to status.</p>
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
            <p className="font-bold text-white mb-1">We Install Boilers Ltd</p>
            <p>Gas Safe Registered | Worcester Bosch Accredited</p>
          </div>
          <p>&copy; {new Date().getFullYear()} We Install Boilers Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

export default function V6() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v6">
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
