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
  Phone, Shield, Star, CheckCircle, Wrench, Award, MapPin, Calendar, ClipboardCheck, X,
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
      <div className="relative min-h-[500px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Worcester Bosch boiler" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,32,91,0.85) 0%, rgba(0,32,91,0.9) 100%)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Why Choose<br />We Install Boilers?
            </h1>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">
              See how we compare to Boxt, British Gas and other national providers. Better prices, better warranty, better service.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={() => scrollTo("comparison")} className="bg-[#F57C00] border-[#E65100] text-white font-bold text-lg" data-testid="button-hero-cta">
                See the Comparison
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const features = [
    { label: "Greenstar 2000i Price", wsb: "£1,790", boxt: "£2,100+", bg: "£2,800+" },
    { label: "Greenstar 4000 Price", wsb: "£2,199", boxt: "£2,500+", bg: "£3,200+" },
    { label: "Greenstar 8000 Price", wsb: "£2,690", boxt: "£3,100+", bg: "£3,800+" },
    { label: "Max Warranty", wsb: "12 Years", boxt: "10 Years", bg: "5 Years" },
    { label: "Named Local Engineer", wsb: true, boxt: false, bg: false },
    { label: "Free Home Assessment", wsb: true, boxt: false, bg: true },
    { label: "In-Home Survey", wsb: true, boxt: false, bg: true },
    { label: "Fixed Price Guarantee", wsb: true, boxt: true, bg: false },
    { label: "Local Medway Company", wsb: true, boxt: false, bg: false },
    { label: "Worcester Bosch Accredited", wsb: true, boxt: true, bg: true },
    { label: "Gas Safe Registered", wsb: true, boxt: true, bg: true },
    { label: "0% Finance Available", wsb: true, boxt: true, bg: true },
    { label: "Average Rating", wsb: "4.8/5", boxt: "4.3/5", bg: "3.8/5" },
  ];

  return (
    <section id="comparison" className="py-16 md:py-20 bg-white" data-testid="section-comparison">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#F57C00] uppercase tracking-widest mb-2">Head-to-Head Comparison</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>We Install Boilers vs The Rest</h2>
        </div>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse text-sm" data-testid="table-comparison">
            <thead>
              <tr>
                <th className="text-left p-3 font-semibold text-gray-500 border-b"></th>
                <th className="p-3 text-center font-bold border-b" style={{ color: WB_BLUE, backgroundColor: "#f0f4f8" }}>
                  <div className="space-y-1">
                    <p className="text-lg">We Install Boilers</p>
                    <div className="flex justify-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}</div>
                  </div>
                </th>
                <th className="p-3 text-center font-bold text-gray-600 border-b">Boxt</th>
                <th className="p-3 text-center font-bold text-gray-600 border-b">British Gas</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""} data-testid={`row-comparison-${i}`}>
                  <td className="p-3 font-medium text-gray-700 border-b">{f.label}</td>
                  <td className="p-3 text-center border-b font-bold" style={{ backgroundColor: i % 2 === 0 ? "#eef3f9" : "#f0f4f8", color: WB_BLUE }}>
                    {typeof f.wsb === "boolean" ? (
                      f.wsb ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />
                    ) : f.wsb}
                  </td>
                  <td className="p-3 text-center border-b text-gray-600">
                    {typeof f.boxt === "boolean" ? (
                      f.boxt ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />
                    ) : f.boxt}
                  </td>
                  <td className="p-3 text-center border-b text-gray-600">
                    {typeof f.bg === "boolean" ? (
                      f.bg ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />
                    ) : f.bg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <Button size="lg" onClick={() => scrollTo("book-assessment")} className="bg-[#F57C00] border-[#E65100] text-white font-bold text-lg" data-testid="button-comparison-cta">
            Get Our Best Price — Book Free Assessment
          </Button>
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
    <section id="pricing" className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Our Fixed Prices</h2>
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
    { icon: ClipboardCheck, title: "In-Home Survey", description: "We visit your home and confirm fixed price on the spot." },
    { icon: Wrench, title: "Installation Day", description: "Professional installation, typically one day." },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-how-it-works">
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

function Benefits() {
  const items = [
    { icon: Shield, title: "Up to 12 Years Warranty" },
    { icon: Award, title: "Worcester Bosch Accredited" },
    { icon: CheckCircle, title: "Gas Safe Registered" },
    { icon: MapPin, title: "Local Medway Company" },
    { icon: Star, title: "4.8 Star Average" },
    { icon: Calendar, title: "In-Home Survey" },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-benefits">
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
    { name: "Sarah Thompson", location: "Chatham", text: "Brilliant service. Much cheaper than British Gas quoted us.", rating: 5 },
    { name: "David Richardson", location: "Gillingham", text: "Fixed price, no surprises. Better than Boxt's online quote.", rating: 5 },
    { name: "Karen Mitchell", location: "Rochester", text: "Best value after comparing 5 companies. Longest warranty too.", rating: 5 },
    { name: "James Patel", location: "Rainham", text: "Local company, national quality. 12 year warranty sold it for us.", rating: 5 },
  ];
  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-testimonials">
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
    { q: "How do you compare to Boxt?", a: "We're typically £300-400 cheaper than Boxt for the same Worcester Bosch boiler, plus we do a free in-home survey (Boxt quotes online without visiting) and offer up to 12 years warranty." },
    { q: "Why not go with British Gas?", a: "British Gas is typically the most expensive option. For the same Greenstar 4000, you could save over £1,000 with us, plus get a longer warranty and local named engineer." },
    { q: "Do you do in-home surveys?", a: "Yes, unlike some online-only companies, we always visit your home first to confirm the exact requirements and give you a fixed price." },
    { q: "Is the price really fixed?", a: "Yes. The price confirmed during your in-home assessment is the price you pay. No hidden extras." },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-faq">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white">Get the Best Price<br /><span className="text-[#F57C00]">From £1,790</span></h2>
            <ul className="space-y-3 text-blue-100">
              {["Lower prices than Boxt and British Gas", "Free in-home survey (not just online)", "Up to 12 years warranty", "Named local engineer"].map((t, i) => (
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
                <h3 className="text-xl font-bold mb-1" style={{ color: WB_BLUE }}>Book Free Home Assessment</h3>
                <p className="text-sm text-gray-500 mb-6">See why we beat the big companies on price and service.</p>
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
            <p className="font-bold text-white mb-1">We Install Boilers Ltd</p>
            <p>Gas Safe Registered | Worcester Bosch Accredited</p>
          </div>
          <p>&copy; {new Date().getFullYear()} We Install Boilers Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

export default function V9() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page-v9">
      <Header />
      <HeroSection />
      <ComparisonTable />
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
