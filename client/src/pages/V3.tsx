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
import boiler4000Img from "@assets/Worcester_Bosch_4000_Which_24_1080x1080_1771281354652.jpg";
import boiler4000KitchenImg from "@assets/4000_Traditional_Kitchen_copy_1771281416429.jpg";
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
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
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
    <section className="pt-20 md:pt-24" data-testid="section-hero">
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img src={boiler4000KitchenImg} alt="Greenstar 4000 in kitchen" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,32,91,0.8) 0%, rgba(0,32,91,0.9) 100%)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold text-blue-200 uppercase tracking-widest">The UK's Most Popular Combi Boiler</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Worcester Bosch<br />Greenstar 4000
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white">
              Installed From <span className="text-[#F57C00]">£2,199</span>
            </p>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">
              Which? Best Buy. 10 Year Warranty. Fixed price, fully installed by accredited engineers.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Gas Safe</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" /> WB Accredited</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4" /> 4.8 Rated</span>
            </div>
            <div className="pt-4">
              <Button size="lg" onClick={() => scrollTo("book-assessment")} className="bg-[#F57C00] border-[#E65100] text-white font-bold text-lg" data-testid="button-hero-cta">
                Book Your Free Assessment
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-product">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
            <img src={boiler4000Img} alt="Greenstar 4000" className="max-w-sm w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Greenstar 4000</h2>
            <p className="text-4xl font-extrabold" style={{ color: WB_BLUE }}>£2,199 <span className="text-base font-normal text-gray-500">fully installed</span></p>
            <div className="flex items-center gap-3">
              <img src={guarantee10Img} alt="10 Year Warranty" className="w-16 h-16 object-contain" />
              <span className="font-bold" style={{ color: WB_BLUE }}>10 Year Manufacturer Warranty</span>
            </div>
            <ul className="space-y-3">
              {[
                "Which? Best Buy Award Winner",
                "Modern full colour display",
                "Wireless connectivity ready",
                "Higher hot water flow rates",
                "Compact design fits any kitchen",
                "Quiet Mark accredited",
                "Full system flush included",
                "Old boiler removed and recycled",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" onClick={() => scrollTo("book-assessment")} className="bg-[#F57C00] border-[#E65100] text-white font-bold text-lg" data-testid="button-product-cta">
              Get This Boiler — Book Free Assessment
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Calendar, title: "Book Your Free Assessment", description: "Call us or fill in the form. We'll arrange a convenient time." },
    { icon: ClipboardCheck, title: "We Visit & Confirm Price", description: "Our engineer confirms the fixed price on the spot. No surprises." },
    { icon: Wrench, title: "Professional Installation", description: "Installed by Gas Safe engineers, typically in just one day." },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>How It Works</h2>
        </div>
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
    { icon: ThumbsUp, title: "Fixed Price, No Surprises" },
    { icon: Award, title: "Worcester Bosch Accredited" },
    { icon: Shield, title: "10 Year Warranty" },
    { icon: CheckCircle, title: "Gas Safe Registered" },
    { icon: MapPin, title: "Local Medway Engineers" },
    { icon: Star, title: "4.8 Star Customer Rating" },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-benefits">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {items.map((b, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${WB_BLUE}10` }}>
                <b.icon className="w-6 h-6" style={{ color: WB_BLUE }} />
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
    { name: "Sarah Thompson", location: "Chatham", text: "Our new Greenstar 4000 is so much quieter than our old boiler. Brilliant service!", rating: 5 },
    { name: "David Richardson", location: "Gillingham", text: "Fixed price was exactly what they quoted. Installation done in a single day.", rating: 5 },
    { name: "Karen Mitchell", location: "Rochester", text: "Best value and the longest warranty. Heating bills have already dropped.", rating: 5 },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
    { q: "Why the Greenstar 4000?", a: "It's a Which? Best Buy winner, offering the perfect balance of performance, reliability and value. It's the UK's most popular combi boiler for good reason." },
    { q: "How long does installation take?", a: "A standard replacement is typically completed in one day, usually 4-6 hours." },
    { q: "Is the price really fixed?", a: "Yes. £2,199 includes the boiler, installation, old boiler removal and system flush. No hidden charges." },
    { q: "Do you offer finance?", a: "Yes, flexible finance options available. Ask during your free assessment." },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Frequently Asked Questions</h2>
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
    <section id="book-assessment" className="py-16 md:py-24" style={{ backgroundColor: WB_BLUE }} data-testid="section-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Get the Greenstar 4000<br /><span className="text-[#F57C00]">Installed for £2,199</span>
            </h2>
            <ul className="space-y-3 text-blue-100">
              {["Which? Best Buy winner", "10 Year manufacturer warranty", "Fixed price, no hidden costs", "Installed in one day"].map((t, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400 shrink-0" />{t}</li>
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
                    <Button type="submit" size="lg" className="bg-[#F57C00] border-[#E65100] text-white font-bold w-full" disabled={mutation.isPending} data-testid="button-submit-form">
                      {mutation.isPending ? "Submitting..." : "Book Free Assessment"}
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
    <footer style={{ backgroundColor: "#001540" }} className="text-blue-200 py-8" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-center md:text-left">
            <p className="font-bold text-white mb-1">We Service Boilers Ltd</p>
            <p>Gas Safe Registered | Worcester Bosch Accredited Installer</p>
          </div>
          <p className="text-center md:text-right">&copy; {new Date().getFullYear()} We Service Boilers Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

export default function V3() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v3">
      <Header />
      <HeroSection />
      <ProductShowcase />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FAQ />
      <LeadForm />
      <Footer />
    </div>
  );
}
