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
  Phone, Shield, Star, CheckCircle, Award, MapPin, Calendar, ClipboardCheck, Wrench, Thermometer, TrendingDown, Zap, Home, FileText,
} from "lucide-react";
import { motion } from "framer-motion";

import worcesterBoschLogo from "@assets/worcester-bosch-logo_(2)_1771281246798.png";
import heroImg from "@assets/4000-Traditional_Kitchen-face-on_1771281416429.jpg";
import boiler4000Img from "@assets/Worcester_Bosch_4000_Which_24_1080x1080_1771281354652.jpg";
import boiler8000Img from "@assets/Worcester_Bosch_8000_Which_24_1080x1080_1771281280295.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";
const WB_GREEN = "#78BE20";
const COMPANY = "We Service Boilers Ltd";

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
      <div className="relative min-h-[650px] md:min-h-[750px] flex items-center" style={{ background: "linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 40%, #FFE0B2 100%)" }}>
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImg} alt="Beautiful kitchen with Worcester Bosch boiler" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight" style={{ color: WB_BLUE }} data-testid="text-hero-headline">
              Is Your Boiler<br />Costing You<br />Money?
            </h1>
            <p className="text-xl md:text-2xl font-semibold" style={{ color: WB_BLUE }}>
              Book Your Free Home Heating Assessment
            </p>
            <p className="text-gray-700 text-lg max-w-lg">
              If your boiler is over 10 years old, you could be wasting hundreds of pounds a year on energy bills. Our free assessment will show you exactly how much you could save.
            </p>

            <div className="flex flex-wrap items-center gap-6 py-4" data-testid="section-trust-badges">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-md px-5 py-4 shadow-sm">
                <Shield className="w-10 h-10 shrink-0" style={{ color: WB_BLUE }} />
                <div>
                  <p className="font-bold text-sm" style={{ color: WB_BLUE }}>Gas Safe</p>
                  <p className="text-xs text-gray-500">Registered</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-md px-5 py-4 shadow-sm">
                <Award className="w-10 h-10 shrink-0" style={{ color: WB_BLUE }} />
                <div>
                  <p className="font-bold text-sm" style={{ color: WB_BLUE }}>Worcester Bosch</p>
                  <p className="text-xs text-gray-500">Accredited Installer</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-md px-5 py-4 shadow-sm">
                <Star className="w-10 h-10 shrink-0 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="font-bold text-sm" style={{ color: WB_BLUE }}>4.8 Star</p>
                  <p className="text-xs text-gray-500">Customer Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-md px-5 py-4 shadow-sm">
                <CheckCircle className="w-10 h-10 shrink-0 text-green-600" />
                <div>
                  <p className="font-bold text-sm" style={{ color: WB_BLUE }}>Which?</p>
                  <p className="text-xs text-gray-500">Best Buy 2024</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button size="lg" onClick={() => scrollTo("book-assessment")} className="text-white font-bold text-lg px-10 py-6 text-base" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} data-testid="button-hero-cta">
                Book Your Free Assessment
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProblemIcon({ index }: { index: number }) {
  const cls = "w-6 h-6";
  const st = { color: WB_BLUE };
  if (index === 0) return <Thermometer className={cls} style={st} />;
  if (index === 1) return <TrendingDown className={cls} style={st} />;
  if (index === 2) return <Home className={cls} style={st} />;
  return <Wrench className={cls} style={st} />;
}

function ProblemSection() {
  const problems = [
    { title: "Rising Energy Bills", desc: "Old boilers run at 60-70% efficiency. A modern Worcester Bosch runs at 94%, meaning up to 30% less gas used." },
    { title: "Losing Money Every Month", desc: "The average UK home with an old boiler wastes £340 per year. Over 5 years, that's £1,700 down the drain." },
    { title: "Uneven Heating", desc: "Old boilers struggle to heat your home evenly. Some rooms too hot, others too cold. A new boiler fixes this." },
    { title: "Expensive Repairs", desc: "Boiler repair costs increase dramatically after 10 years. Parts become harder to source and more expensive." },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-problems">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>The Hidden Cost of an Old Boiler</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Why Your Old Boiler Is Costing You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 h-full flex gap-4" data-testid={`card-problem-${i}`}>
                <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-blue-50">
                  <ProblemIcon index={i} />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: WB_BLUE }}>{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SavingsSection() {
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-savings">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: WB_GREEN }}>Energy Savings Calculator</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>How Much Could You Save?</h2>
            <div className="space-y-4">
              {[
                { age: "10-15 years old", eff: "~75%", saving: "Up to £250/year" },
                { age: "15-20 years old", eff: "~65%", saving: "Up to £380/year" },
                { age: "20+ years old", eff: "~55%", saving: "Up to £500/year" },
              ].map((row, i) => (
                <div key={i} className="bg-white rounded-md p-4 flex items-center justify-between gap-4" data-testid={`savings-row-${i}`}>
                  <div>
                    <p className="font-bold" style={{ color: WB_BLUE }}>{row.age}</p>
                    <p className="text-xs text-gray-500">Current efficiency: {row.eff}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-green-600">{row.saving}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">Based on average UK gas consumption. Actual savings depend on home size and usage.</p>
          </div>
          <div className="hidden md:flex flex-col items-center gap-4">
            <img src={boiler4000Img} alt="Worcester Bosch Greenstar 4000" className="max-w-sm w-full" />
            <div className="flex items-center gap-3 bg-white rounded-md px-5 py-4 shadow-sm" data-testid="which-badge-savings">
              <CheckCircle className="w-12 h-12 shrink-0 text-green-600" />
              <div>
                <p className="font-bold text-base" style={{ color: WB_BLUE }}>Which? Best Buy 2024</p>
                <p className="text-sm text-gray-500">Recommended by Which? magazine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AssessmentStepIcon({ index }: { index: number }) {
  const cls = "w-7 h-7 text-white";
  if (index === 0) return <Calendar className={cls} />;
  if (index === 1) return <ClipboardCheck className={cls} />;
  return <FileText className={cls} />;
}

function HowItWorks() {
  const steps = [
    { title: "Book Your Free Assessment", description: "We'll arrange a convenient time to visit your home. No obligation." },
    { title: "We Assess Your Heating", description: "Our engineer checks your current system and calculates potential savings." },
    { title: "Get Your Savings Report", description: "We'll show you exactly how much you could save with a modern boiler." },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What Happens at Your Free Assessment</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: WB_BLUE }}>
                <AssessmentStepIcon index={i} />
              </div>
              <div className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center mx-auto text-sm" style={{ backgroundColor: WB_GREEN }}>{i + 1}</div>
              <h3 className="text-lg font-bold" style={{ color: WB_BLUE }} data-testid={`text-step-${i + 1}`}>{s.title}</h3>
              <p className="text-sm text-gray-500">{s.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button size="lg" onClick={() => scrollTo("book-assessment")} className="text-white font-bold" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} data-testid="button-steps-cta">
            Book Your Free Assessment
          </Button>
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ index }: { index: number }) {
  const cls = "w-6 h-6";
  const st = { color: WB_BLUE };
  if (index === 0) return <Shield className={cls} style={st} />;
  if (index === 1) return <Award className={cls} style={st} />;
  if (index === 2) return <Star className={cls} style={st} />;
  if (index === 3) return <MapPin className={cls} style={st} />;
  if (index === 4) return <CheckCircle className={cls} style={st} />;
  return <TrendingDown className={cls} style={st} />;
}

function Benefits() {
  const items = [
    { title: "Gas Safe Registered", desc: "All engineers fully certified and registered." },
    { title: "Worcester Bosch Accredited", desc: "Official accredited installer." },
    { title: "4.8 Star Rating", desc: "Trusted by hundreds of homeowners." },
    { title: "Local to Medway", desc: "Your local heating specialists." },
    { title: "No Obligation", desc: "Free assessment, no pressure." },
    { title: "Save on Bills", desc: "Up to £500/year savings." },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-benefits">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((b, i) => (
            <Card key={i} className="p-5 text-center space-y-2" data-testid={`card-benefit-${i}`}>
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <BenefitIcon index={i} />
              </div>
              <h3 className="font-bold text-sm" style={{ color: WB_BLUE }}>{b.title}</h3>
              <p className="text-xs text-gray-500">{b.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Mr & Mrs Thompson", location: "Chatham", text: "The free assessment was really helpful. No pressure, just honest advice about our old boiler. We ended up saving over £300 a year!", rating: 5 },
    { name: "David R", location: "Gillingham", text: "Our old boiler was 18 years old and costing us a fortune. The assessment showed exactly how much we were wasting.", rating: 5 },
    { name: "Karen M", location: "Rochester", text: "We had no idea our old boiler was only 60% efficient. The savings since upgrading have been incredible.", rating: 5 },
    { name: "James P", location: "Rainham", text: "Professional assessment, clear explanation of the savings. No hard sell. Very impressed with the service.", rating: 5 },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Customer Stories</h2></div>
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
    { q: "Is the assessment really free?", a: "Yes, completely free with no obligation. Our engineer will assess your current heating system and provide an honest recommendation." },
    { q: "How long does the assessment take?", a: "About 30-45 minutes. Our engineer will check your current boiler, assess your home's heating needs, and calculate potential savings." },
    { q: "Will I be pressured to buy?", a: "Absolutely not. The assessment is informational. We'll show you the facts and let you make your own decision in your own time." },
    { q: "How much could I really save?", a: "Depending on the age and condition of your current boiler, savings typically range from £200 to £500 per year on energy bills." },
    { q: "What areas do you cover?", a: "We cover Medway, Kent and surrounding areas including Chatham, Rochester, Gillingham, Rainham, Strood and more." },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>FAQ</h2></div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-md px-4 bg-white">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-form-heading">
              Find Out How Much<br />You Could Save
            </h2>
            <p className="text-blue-200 text-lg">
              Book your free, no-obligation home heating assessment today. Our Gas Safe engineer will visit your home and show you exactly how much you could save.
            </p>
            <ul className="space-y-3 text-blue-100">
              {["Completely free assessment", "No obligation to proceed", "Gas Safe registered engineer", "Honest advice, no pressure"].map((t, i) => (
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
                <p className="text-gray-500">We'll be in touch shortly to arrange your free assessment.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1" style={{ color: WB_BLUE }}>Find Out How Much You Could Save</h3>
                <p className="text-sm text-gray-500 mb-6">No obligation. Book your free assessment today.</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4" data-testid="form-assessment">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Your Name" {...field} data-testid="input-name" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="postcode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postcode" {...field} data-testid="input-postcode" /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" size="lg" className="text-white font-bold w-full" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} disabled={mutation.isPending} data-testid="button-submit-form">
                      {mutation.isPending ? "Submitting..." : "Book Your Free Assessment"}
                    </Button>
                    <p className="text-xs text-center text-gray-400">100% free. No obligation. No pressure.</p>
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
    <footer style={{ backgroundColor: "#001540" }} className="text-blue-200 py-10 pb-24 md:pb-10" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-bold text-white text-lg mb-2">{COMPANY}</p>
            <p className="mb-1">Your local Worcester Bosch Accredited Installer</p>
            <p>Serving Medway, Kent & surrounding areas</p>
          </div>
          <div>
            <p className="font-bold text-white mb-2">Credentials</p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2"><Shield className="w-4 h-4 shrink-0" /> Gas Safe Registered</li>
              <li className="flex items-center gap-2"><Award className="w-4 h-4 shrink-0" /> Worcester Bosch Accredited</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 shrink-0" /> Which? Best Buy 2024</li>
              <li className="flex items-center gap-2"><Star className="w-4 h-4 shrink-0" /> 4.8 Star Customer Rating</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white mb-2">Contact</p>
            <a href={PHONE_HREF} className="flex items-center gap-2 text-white font-bold text-lg mb-2" data-testid="link-phone-footer">
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <p>Free, no-obligation assessments</p>
            <p>Monday - Saturday, 8am - 6pm</p>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-xs text-blue-300">
          <p>&copy; {new Date().getFullYear()} {COMPANY}. All rights reserved. Gas Safe Registered. Worcester Bosch Accredited Installer.</p>
        </div>
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" data-testid="sticky-mobile-cta">
      <div className="flex">
        <a href={PHONE_HREF} className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 text-lg" style={{ backgroundColor: WB_GREEN }} data-testid="link-phone-sticky">
          <Phone className="w-5 h-5" /> Call {PHONE}
        </a>
        <button onClick={() => scrollTo("book-assessment")} className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 text-lg" style={{ backgroundColor: WB_BLUE }} data-testid="button-sticky-form">
          Free Assessment
        </button>
      </div>
    </div>
  );
}

export default function V10() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v10">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SavingsSection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FAQ />
      <LeadForm />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
