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
  Phone, Shield, Star, CheckCircle, Wrench, Award, MapPin, Calendar, ClipboardCheck, ThumbsUp, Quote,
} from "lucide-react";
import { motion } from "framer-motion";

import worcesterBoschLogo from "@assets/worcester-bosch-logo_(2)_1771281246798.png";
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
  const featuredReviews = [
    { name: "Sarah T.", text: "Brilliant service from start to finish. Professional, tidy and explained everything clearly.", rating: 5 },
    { name: "David R.", text: "Fixed price was exactly what they quoted. No nasty surprises. Kitchen left spotless.", rating: 5 },
    { name: "Karen M.", text: "Best value and the longest warranty. Our heating bills have already dropped noticeably.", rating: 5 },
  ];

  return (
    <section className="pt-20 md:pt-24" data-testid="section-hero">
      <div style={{ backgroundColor: WB_BLUE }} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Rated 4.8<span className="text-yellow-400">{"\u2605"}</span> by<br />Medway Homeowners
            </h1>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">
              Hundreds of 5-star reviews. Worcester Bosch accredited. Fixed prices from £1,790.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {featuredReviews.map((r, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-md p-4 text-left">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-blue-100 italic mb-2">"{r.text}"</p>
                  <p className="text-sm font-bold text-white">{r.name}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={() => scrollTo("book-assessment")} className="bg-[#F57C00] border-[#E65100] text-white font-bold text-lg" data-testid="button-hero-cta">
                Book Your Free Assessment
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("pricing")} className="text-white border-white/30 font-bold" data-testid="button-hero-pricing">
                View Prices
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <div className="text-center">
              <p className="text-3xl font-extrabold" style={{ color: WB_BLUE }}>4.8<span className="text-yellow-400">{"\u2605"}</span></p>
              <p className="text-xs text-gray-500">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold" style={{ color: WB_BLUE }}>500+</p>
              <p className="text-xs text-gray-500">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold" style={{ color: WB_BLUE }}>98%</p>
              <p className="text-xs text-gray-500">Would Recommend</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold" style={{ color: WB_BLUE }}>12yr</p>
              <p className="text-xs text-gray-500">Max Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Sarah Thompson", location: "Chatham, Kent", text: "Brilliant service from start to finish. The engineer was professional, tidy and explained everything clearly. Our new Greenstar 4000 is so much quieter than our old boiler. Highly recommend!", rating: 5 },
    { name: "David Richardson", location: "Gillingham, Kent", text: "Fixed price was exactly what they quoted. No nasty surprises. The installation was done in a single day and they left the kitchen spotless. Couldn't be happier.", rating: 5 },
    { name: "Karen Mitchell", location: "Rochester, Kent", text: "After getting quotes from several companies, We Service Boilers Ltd offered the best value and the longest warranty. The whole process was smooth and the team were friendly.", rating: 5 },
    { name: "James Patel", location: "Rainham, Kent", text: "Really pleased with the new 8000 Life. It looks stunning on the wall and heats the house in no time. The 12 year warranty gives great peace of mind too.", rating: 5 },
    { name: "Linda Foster", location: "Strood, Kent", text: "From the initial assessment to final installation, everything was handled professionally. Our old boiler was on its last legs and the new one is brilliant.", rating: 5 },
    { name: "Mark Stevens", location: "Rochester, Kent", text: "Very impressed with the whole service. Engineer arrived on time, was polite and efficient. New boiler is working perfectly. Highly recommend.", rating: 5 },
    { name: "Emma Clarke", location: "Chatham, Kent", text: "We were dreading the cost of a new boiler but the fixed price made it easy to budget. The 0% finance option was a bonus. Excellent service.", rating: 5 },
    { name: "Robert Hall", location: "Gillingham, Kent", text: "Third boiler installation I've had done by different companies and this was by far the best experience. Professional, clean and on budget.", rating: 5 },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#F57C00] uppercase tracking-widest mb-2">Real Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What Medway Homeowners Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.1 }}>
              <Card className="p-5 h-full flex flex-col gap-3" data-testid={`card-review-${i}`}>
                <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                <Quote className="w-5 h-5 text-gray-300" />
                <p className="text-sm text-gray-600 flex-1 italic">"{r.text}"</p>
                <div>
                  <p className="font-bold text-sm" style={{ color: WB_BLUE }}>{r.name}</p>
                  <p className="text-xs text-gray-400">{r.location}</p>
                </div>
              </Card>
            </motion.div>
          ))}
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
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Fixed Price Packages</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">All prices include full installation, old boiler removal and system flush.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-5xl mx-auto items-start">
          {tiers.map((t) => (
            <Card key={t.tier} className={`flex flex-col p-0 ${t.popular ? "ring-2 ring-[#F57C00] relative" : ""}`} style={t.popular ? { transform: "scale(1.03)", zIndex: 1 } : {}} data-testid={`card-pricing-${t.tier.toLowerCase()}`}>
              {t.popular && <div className="bg-[#F57C00] text-white text-center py-2 font-bold text-sm uppercase tracking-wider rounded-t-md">Most Popular</div>}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#F57C00] uppercase tracking-wide mb-1">{t.tier}</p>
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
                <Button onClick={() => scrollTo("book-assessment")} className={t.popular ? "bg-[#F57C00] border-[#E65100] text-white font-bold w-full" : "text-white font-bold w-full"} style={!t.popular ? { backgroundColor: WB_BLUE } : {}} data-testid={`button-pricing-${t.tier.toLowerCase()}`}>Book Free Assessment</Button>
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
    { icon: Calendar, title: "Book Free Assessment", description: "Call or fill the form." },
    { icon: ClipboardCheck, title: "Confirm Fixed Price", description: "Engineer confirms on the spot." },
    { icon: Wrench, title: "Installation Day", description: "Typically one day." },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>How It Works</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: WB_BLUE }}><s.icon className="w-7 h-7 text-white" /></div>
              <div className="w-8 h-8 rounded-full bg-[#F57C00] text-white font-bold flex items-center justify-center mx-auto text-sm">{i + 1}</div>
              <h3 className="text-lg font-bold" style={{ color: WB_BLUE }}>{s.title}</h3>
              <p className="text-sm text-gray-500">{s.description}</p>
            </div>
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
    { q: "Do you offer finance?", a: "Yes, 0% finance available. Ask during your assessment." },
    { q: "Are you Gas Safe?", a: "Yes, all engineers are Gas Safe registered and WB accredited." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-white">Join 500+ Happy<br />Medway Homeowners</h2>
            <ul className="space-y-3 text-blue-100">
              {["4.8 star average rating", "Fixed price from £1,790", "Up to 12 years warranty", "Installed in one day"].map((t, i) => (
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
                <h3 className="text-xl font-bold mb-1" style={{ color: WB_BLUE }}>Book Your Free Assessment</h3>
                <p className="text-sm text-gray-500 mb-6">Join hundreds of satisfied customers.</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4" data-testid="form-assessment">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Your Name" {...field} data-testid="input-name" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="postcode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postcode" {...field} data-testid="input-postcode" /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" size="lg" className="bg-[#F57C00] border-[#E65100] text-white font-bold w-full" disabled={mutation.isPending} data-testid="button-submit-form">
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

export default function V7() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v7">
      <Header />
      <HeroSection />
      <Testimonials />
      <PricingSection />
      <HowItWorks />
      <FAQ />
      <LeadForm />
      <Footer />
    </div>
  );
}
