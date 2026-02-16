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
import heroImg from "@assets/4000-Traditional_Kitchen-face-on_1771281416429.jpg";
import boiler2000Img from "@assets/Worcs_Condens_2000_Front_1771281207345.jpg";
import boiler4000Img from "@assets/Worcester_Bosch_4000_Which_24_1080x1080_1771281354652.jpg";
import boiler8000Img from "@assets/Worcester_Bosch_8000__8000_Style_inward_packshot_-_585x550_1771281354652.jpg";
import guarantee8Img from "@assets/8_Blue_Ast_320x320_copy_2_1771281377729.jpg";
import guarantee10Img from "@assets/10_Blue_Ast_320x320_copy_2_1771281377729.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";
const WB_GREEN = "#78BE20";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md" data-testid="header">
      <div className="bg-[#00205B] text-white text-center py-2 text-sm font-semibold tracking-wide" data-testid="banner-promo">
        Spring Worcester Bosch Promotion — Fixed Price Installations
      </div>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-8 md:h-10 w-auto" data-testid="img-logo" />
        <a href={PHONE_HREF} className="flex items-center gap-2 font-bold text-[#00205B]" data-testid="link-phone-header">
          <Phone className="w-5 h-5" />
          <span>{PHONE}</span>
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="pt-28 md:pt-32" data-testid="section-hero">
      <div style={{ backgroundColor: WB_BLUE }} className="relative min-h-[550px] md:min-h-[600px] flex items-center">
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                New Worcester Bosch Boiler
                <br />
                <span className="text-white">Installed From </span>
                <span style={{ color: WB_GREEN }} className="text-4xl md:text-5xl">£1,790</span>
              </h1>
              <p className="text-blue-200 text-lg">
                Fixed price installations by accredited Worcester Bosch engineers. No hidden costs. Up to 12 years warranty.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Gas Safe</span>
                <span className="flex items-center gap-1"><Award className="w-4 h-4" /> WB Accredited</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4" /> 4.8 Rated</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Medway, Kent</span>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => scrollTo("book-assessment")}
                  style={{ backgroundColor: WB_GREEN, borderColor: "#5a9e10" }}
                  className="text-white font-bold text-lg"
                  data-testid="button-hero-cta"
                >
                  Book Your Free Assessment
                </Button>
                <a href={PHONE_HREF} className="flex items-center gap-2 text-white font-bold text-lg px-4">
                  <Phone className="w-5 h-5" /> {PHONE}
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <img src={heroImg} alt="Worcester Bosch boiler in kitchen" className="rounded-md shadow-2xl w-full max-w-md mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    { tier: "Good", model: "Greenstar 2000i", price: "£1,790", warranty: "8 Year Warranty", warrantyImg: guarantee8Img, image: boiler2000Img, features: ["Compact design, fits in a cupboard", "Quiet operation", "Digital display interface", "Ideal for small to medium homes", "Full system flush included"] },
    { tier: "Better", model: "Greenstar 4000", price: "£2,199", warranty: "10 Year Warranty", warrantyImg: guarantee10Img, image: boiler4000Img, popular: true, features: ["Modern colour display", "Which? Best Buy award", "Wireless connectivity ready", "Higher hot water flow rates", "Full system flush included"] },
    { tier: "Premium", model: "Greenstar 8000 Life", price: "£2,690", warranty: "12 Year Warranty", image: boiler8000Img, features: ["Touchscreen full colour display", "Most powerful wall-hung boiler", "Available in black or white", "Intelligent filling system", "Full system flush included"] },
  ];

  return (
    <section id="pricing" className="py-16 md:py-20 bg-white" data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Fixed Price Packages</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Choose Your New Boiler</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">All prices include full installation, removal of your old boiler, and system flush.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-5xl mx-auto items-start">
          {tiers.map((t) => (
            <Card key={t.tier} className={`flex flex-col p-0 ${t.popular ? "ring-2 relative" : ""}`} style={t.popular ? { ringColor: WB_GREEN, transform: "scale(1.03)", zIndex: 1 } : {}} data-testid={`card-pricing-${t.tier.toLowerCase()}`}>
              {t.popular && (
                <div style={{ backgroundColor: WB_GREEN }} className="text-white text-center py-2 font-bold text-sm uppercase tracking-wider rounded-t-md">
                  Most Popular
                </div>
              )}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: WB_GREEN }}>{t.tier}</p>
                  <h3 className="text-xl font-bold" style={{ color: WB_BLUE }}>{t.model}</h3>
                </div>
                <div className="flex justify-center py-4">
                  <img src={t.image} alt={t.model} className="h-48 w-auto object-contain" />
                </div>
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
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: WB_GREEN }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => scrollTo("book-assessment")}
                  style={t.popular ? { backgroundColor: WB_GREEN, borderColor: "#5a9e10" } : { backgroundColor: WB_BLUE, borderColor: "#001845" }}
                  className="text-white font-bold w-full"
                  data-testid={`button-pricing-${t.tier.toLowerCase()}`}
                >
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
    { icon: Calendar, title: "Book Your Free Assessment", description: "Call us or fill in the form. We'll arrange a convenient time to visit." },
    { icon: ClipboardCheck, title: "We Visit & Confirm Price", description: "Our engineer surveys your home and confirms the fixed price on the spot." },
    { icon: Wrench, title: "Professional Installation", description: "Gas Safe engineers install your new boiler, typically in just one day." },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: WB_BLUE }}>
                <s.icon className="w-7 h-7 text-white" />
              </div>
              <div className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center mx-auto text-sm" style={{ backgroundColor: WB_GREEN }}>{i + 1}</div>
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
    { icon: ThumbsUp, title: "Fixed Price, No Surprises", desc: "The price we quote is the price you pay." },
    { icon: Award, title: "Worcester Bosch Accredited", desc: "Trained and approved by Worcester Bosch." },
    { icon: Shield, title: "Up to 12 Years Warranty", desc: "Extended manufacturer warranty for peace of mind." },
    { icon: CheckCircle, title: "Gas Safe Registered", desc: "All engineers are Gas Safe registered." },
    { icon: MapPin, title: "Local Medway Engineers", desc: "Based in Medway, Kent. Local community." },
    { icon: Star, title: "4.8 Star Reviews", desc: "Hundreds of happy customers across Kent." },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-benefits">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Trust & Quality</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Why Choose Us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((b, i) => (
            <Card key={i} className="p-6 text-center space-y-3 h-full" data-testid={`card-benefit-${i}`}>
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${WB_BLUE}15` }}>
                <b.icon className="w-6 h-6" style={{ color: WB_BLUE }} />
              </div>
              <h3 className="font-bold" style={{ color: WB_BLUE }}>{b.title}</h3>
              <p className="text-sm text-gray-500">{b.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Sarah Thompson", location: "Chatham, Kent", text: "Brilliant service from start to finish. The engineer was professional, tidy and explained everything clearly. Our new Greenstar 4000 is so much quieter. Highly recommend!", rating: 5 },
    { name: "David Richardson", location: "Gillingham, Kent", text: "Fixed price was exactly what they quoted. No nasty surprises. Installation done in a single day and they left the kitchen spotless.", rating: 5 },
    { name: "Karen Mitchell", location: "Rochester, Kent", text: "Best value and the longest warranty. The whole process was smooth and the team were friendly. Our heating bills have already dropped noticeably.", rating: 5 },
    { name: "James Patel", location: "Rainham, Kent", text: "Really pleased with the new 8000 Life. It looks stunning and heats the house in no time. The 12 year warranty gives great peace of mind.", rating: 5 },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <Card key={i} className="p-5 h-full flex flex-col gap-3" data-testid={`card-review-${i}`}>
              <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
              <p className="text-sm text-gray-600 flex-1 italic">"{r.text}"</p>
              <div>
                <p className="font-bold text-sm" style={{ color: WB_BLUE }}>{r.name}</p>
                <p className="text-xs text-gray-400">{r.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How long does installation take?", a: "A standard combi boiler replacement is typically completed in one day, usually between 4-6 hours." },
    { q: "Is the price really fixed?", a: "Yes. The price we quote during your free home assessment is the price you pay. No hidden charges." },
    { q: "What if my home needs something different?", a: "Our engineer will survey your property and recommend the best solution with a clear fixed price before any work begins." },
    { q: "Are you Gas Safe registered?", a: "Yes, all our engineers are Gas Safe registered. We're also Worcester Bosch Accredited Installers." },
    { q: "Do you offer finance?", a: "Yes, we offer flexible finance options. Ask during your free assessment. Subject to status." },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Common Questions</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-md px-4" data-testid={`faq-item-${i}`}>
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
    onError: () => { toast({ title: "Something went wrong", description: "Please try again or call us directly.", variant: "destructive" }); },
  });

  return (
    <section id="book-assessment" className="py-16 md:py-24" style={{ backgroundColor: WB_BLUE }} data-testid="section-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Get Your New Boiler<br />
              <span style={{ color: WB_GREEN }}>From Just £1,790</span>
            </h2>
            <ul className="space-y-3 text-blue-100">
              {["Fixed price, no hidden costs", "Worcester Bosch Accredited Installer", "Up to 12 years warranty", "Typically installed in one day"].map((t, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 shrink-0" style={{ color: WB_GREEN }} />{t}</li>
              ))}
            </ul>
            <div className="pt-4">
              <p className="text-blue-200 text-sm mb-2">Or call us free:</p>
              <a href={PHONE_HREF} className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3" data-testid="link-phone-final">
                <Phone className="w-7 h-7" />{PHONE}
              </a>
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
                <h3 className="text-xl font-bold mb-1" style={{ color: WB_BLUE }}>Book Your Free Assessment</h3>
                <p className="text-sm text-gray-500 mb-6">Fill in your details and we'll call you back.</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4" data-testid="form-assessment">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Your Name" {...field} data-testid="input-name" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="postcode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postcode" {...field} data-testid="input-postcode" /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" size="lg" style={{ backgroundColor: WB_GREEN, borderColor: "#5a9e10" }} className="text-white font-bold w-full" disabled={mutation.isPending} data-testid="button-submit-form">
                      {mutation.isPending ? "Submitting..." : "Book Your Free Home Heating Assessment"}
                    </Button>
                    <p className="text-xs text-center text-gray-400">No obligation. We'll call within 2 hours during business hours.</p>
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
            <p>Gas Safe Registered | Worcester Bosch Accredited Installer</p>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} We Install Boilers Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function V2() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v2">
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
