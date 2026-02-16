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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Phone,
  Shield,
  Star,
  CheckCircle,
  Wrench,
  Award,
  MapPin,
  ThumbsUp,
  Calendar,
  ClipboardCheck,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";

import logoImg from "@assets/2000_Worcester_1771281400349.png";
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
const WB_GREEN = "#78BE20";
const COMPANY = "We Service Boilers Ltd";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md" data-testid="header">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        <img
          src={logoImg}
          alt={COMPANY}
          className="h-8 md:h-10 w-auto"
          data-testid="img-logo"
        />
        <a
          href={PHONE_HREF}
          className="flex items-center gap-2 font-bold text-base md:text-lg"
          style={{ color: WB_BLUE }}
          data-testid="link-phone-header"
        >
          <Phone className="w-5 h-5" />
          <span>{PHONE}</span>
        </a>
      </div>
    </header>
  );
}

function StickyMobilePhoneBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" data-testid="sticky-mobile-bar">
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-3 py-3.5 text-white font-bold text-lg shadow-lg"
        style={{ backgroundColor: WB_GREEN }}
        data-testid="link-phone-sticky"
      >
        <Phone className="w-5 h-5" />
        Call Free: {PHONE}
      </a>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pt-20 md:pt-24 relative" data-testid="section-hero">
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Worcester Bosch 8000 boiler installation"
            className="w-full h-full object-cover"
          />
          <div className="dark-overlay absolute inset-0" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              New Worcester Bosch Boiler Installed From{" "}
              <span style={{ color: WB_GREEN }}>£1,790</span>
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-100 block mt-2">
                Fixed Price, No Hidden Costs
              </span>
            </h1>

            <p className="text-base md:text-lg text-blue-100 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Gas Safe Registered</span>
              <span className="text-blue-300">|</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" /> Worcester Bosch Accredited</span>
              <span className="text-blue-300">|</span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.8 Rated
              </span>
              <span className="text-blue-300">|</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Medway, Kent</span>
            </p>

            <div className="pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("book-assessment")}
                className="text-white font-bold text-lg border-[#5fa519]"
                style={{ backgroundColor: WB_GREEN }}
                data-testid="button-hero-cta"
              >
                Book Your Free Assessment
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-8 border-b" style={{ backgroundColor: "#f0f4f8" }} data-testid="section-trust-badges">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            <div className="flex items-center gap-3" data-testid="badge-gas-safe">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: WB_BLUE }}>
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground block">Gas Safe</span>
                <span className="text-xs text-muted-foreground">Registered</span>
              </div>
            </div>
            <img
              src={worcesterBoschLogo}
              alt="Worcester Bosch Accredited Installer"
              className="h-12 md:h-14 w-auto"
              data-testid="img-worcester-bosch-logo"
            />
            <div className="flex items-center gap-3" data-testid="badge-checkatrade">
              <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground block">Checkatrade</span>
                <span className="text-xs text-muted-foreground">Verified Member</span>
              </div>
            </div>
            <div className="flex items-center gap-3" data-testid="badge-which-best-buy">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#D4213D" }}>
                <BadgeCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground block">Which?</span>
                <span className="text-xs text-muted-foreground">Best Buy 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: string;
  model: string;
  price: string;
  warranty: string;
  warrantyImg?: string;
  image: string;
  popular?: boolean;
  whichBestBuy?: boolean;
  features: string[];
}

function PricingCard({ tier, model, price, warranty, warrantyImg, image, popular, whichBestBuy, features }: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col p-0 ${popular ? "pricing-popular" : ""}`}
      data-testid={`card-pricing-${tier.toLowerCase()}`}
    >
      {popular && (
        <div className="text-white text-center py-2 font-bold text-sm uppercase tracking-wider rounded-t-md" style={{ backgroundColor: WB_GREEN }}>
          Most Popular
        </div>
      )}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: WB_BLUE }}>{tier}</p>
          <h3 className="text-xl font-bold text-foreground">{model}</h3>
          {whichBestBuy && (
            <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-white px-2 py-0.5 rounded-md" style={{ backgroundColor: "#D4213D" }} data-testid={`badge-which-${tier.toLowerCase()}`}>
              <BadgeCheck className="w-3 h-3" /> Which? Best Buy
            </span>
          )}
        </div>

        <div className="flex justify-center py-4">
          <img
            src={image}
            alt={model}
            className="h-48 w-auto object-contain"
          />
        </div>

        <div className="text-center">
          <p className="text-4xl font-extrabold" style={{ color: WB_BLUE }}>{price}</p>
          <p className="text-sm text-muted-foreground mt-1">Fully installed, fixed price</p>
        </div>

        <div className="flex justify-center">
          {warrantyImg ? (
            <img src={warrantyImg} alt={warranty} className="h-16 w-16 object-contain" />
          ) : (
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold text-center leading-tight p-1" style={{ backgroundColor: WB_BLUE }}>
              {warranty}
            </div>
          )}
        </div>

        <ul className="space-y-2 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => scrollToSection("book-assessment")}
          className={popular ? "text-white font-bold w-full border-[#5fa519]" : "text-white font-bold w-full border-[#5fa519]"}
          style={{ backgroundColor: WB_GREEN }}
          data-testid={`button-pricing-${tier.toLowerCase()}`}
        >
          Book Free Assessment
        </Button>
      </div>
    </Card>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-background" data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_BLUE }}>Fixed Price Packages</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Choose Your New Boiler</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            All prices include full installation, removal of your old boiler, and system flush. No hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-5xl mx-auto items-start">
          <PricingCard
            tier="Good"
            model="Greenstar 2000i"
            price="£1,790"
            warranty="8 Year Warranty"
            warrantyImg={guarantee8Img}
            image={boiler2000Img}
            features={[
              "Compact design, fits in a cupboard",
              "Quiet operation",
              "Digital display interface",
              "Ideal for small to medium homes",
              "Full system flush included",
            ]}
          />
          <PricingCard
            tier="Better"
            model="Greenstar 4000"
            price="£2,199"
            warranty="10 Year Warranty"
            warrantyImg={guarantee10Img}
            image={boiler4000Img}
            popular
            whichBestBuy
            features={[
              "Modern colour display",
              "Which? Best Buy award",
              "Wireless connectivity ready",
              "Higher hot water flow rates",
              "Full system flush included",
            ]}
          />
          <PricingCard
            tier="Premium"
            model="Greenstar 8000 Life"
            price="£2,690"
            warranty="12 Year Warranty"
            image={boiler8000Img}
            features={[
              "Touchscreen full colour display",
              "Our most powerful wall-hung boiler",
              "Available in black or white",
              "Intelligent filling system",
              "Full system flush included",
            ]}
          />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          *Warranty subject to terms and conditions. Based on standard combi boiler replacement.
        </p>
      </div>
    </section>
  );
}

function StepIcon({ index }: { index: number }) {
  const cls = "w-7 h-7 text-white";
  if (index === 0) return <Calendar className={cls} />;
  if (index === 1) return <ClipboardCheck className={cls} />;
  return <Wrench className={cls} />;
}

function HowItWorks() {
  const steps = [
    { title: "Book Your Free Assessment", description: "Call us or fill in the form. We'll arrange a convenient time to visit your home." },
    { title: "We Visit & Confirm Your Fixed Price", description: "Our engineer surveys your home and confirms the fixed price quote on the spot. No surprises." },
    { title: "Professional Installation", description: "Our Gas Safe engineers install your new boiler, typically completed in just one day." },
  ];

  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_BLUE }}>Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: WB_BLUE }}>
                <StepIcon index={i} />
              </div>
              <div className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center mx-auto text-sm" style={{ backgroundColor: WB_GREEN }}>
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-foreground" data-testid={`text-step-${i + 1}`}>{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ index }: { index: number }) {
  const cls = "w-6 h-6";
  const st = { color: WB_BLUE };
  if (index === 0) return <ThumbsUp className={cls} style={st} />;
  if (index === 1) return <Award className={cls} style={st} />;
  if (index === 2) return <Shield className={cls} style={st} />;
  if (index === 3) return <CheckCircle className={cls} style={st} />;
  if (index === 4) return <MapPin className={cls} style={st} />;
  return <Star className={cls} style={st} />;
}

function WhyChooseUs() {
  const benefits = [
    { title: "Fixed Price, No Surprises", description: "The price we quote is the price you pay. No hidden extras." },
    { title: "Worcester Bosch Accredited", description: "Trained and approved by Worcester Bosch for quality installations." },
    { title: "Up to 12 Years Warranty", description: "Extended manufacturer warranty for complete peace of mind." },
    { title: "Gas Safe Registered", description: "All our engineers are Gas Safe registered for your safety." },
    { title: "Local Medway Engineers", description: "Based in Medway, Kent. We know our local community." },
    { title: "4.8 Star Reviews", description: "Hundreds of happy customers across Medway and Kent." },
  ];

  return (
    <section className="py-16 md:py-20 bg-background" data-testid="section-why-choose">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_BLUE }}>Trust & Quality</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose {COMPANY}?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 text-center space-y-3 h-full" data-testid={`card-benefit-${i}`}>
                <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                  <BenefitIcon index={i} />
                </div>
                <h3 className="font-bold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Sarah Thompson",
      location: "Chatham, Kent",
      text: "Brilliant service from start to finish. The engineer was professional, tidy and explained everything clearly. Our new Greenstar 4000 is so much quieter than our old boiler. Highly recommend!",
      rating: 5,
    },
    {
      name: "David Richardson",
      location: "Gillingham, Kent",
      text: "Fixed price was exactly what they quoted. No nasty surprises. The installation was done in a single day and they left the kitchen spotless. Couldn't be happier with our new Worcester Bosch boiler.",
      rating: 5,
    },
    {
      name: "Karen Mitchell",
      location: "Rochester, Kent",
      text: "After getting quotes from several companies, We Service Boilers Ltd offered the best value and the longest warranty. The whole process was smooth and the team were friendly. Our heating bills have already dropped noticeably.",
      rating: 5,
    },
    {
      name: "James Patel",
      location: "Rainham, Kent",
      text: "Really pleased with the new 8000 Life. It looks stunning on the wall and heats the house in no time. The 12 year warranty gives great peace of mind too.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_BLUE }}>Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-5 h-full flex flex-col gap-3" data-testid={`card-review-${i}`}>
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground flex-1 italic">"{r.text}"</p>
                <div>
                  <p className="font-bold text-sm text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "How long does installation take?",
      a: "A standard combi boiler replacement is typically completed in one day, usually between 4-6 hours. If additional work is needed (such as moving the boiler to a new location), we'll let you know during the free assessment and it may take slightly longer.",
    },
    {
      q: "Is the price really fixed?",
      a: "Yes, absolutely. The price we quote during your free home assessment is the price you pay. There are no hidden charges, call-out fees, or surprise extras. Our fixed price includes the boiler, full installation, removal of your old boiler, and a system flush.",
    },
    {
      q: "What if my home needs something different?",
      a: "During our free home assessment, our engineer will survey your property and recommend the best solution. If your installation requires additional work beyond a standard replacement (such as relocating pipework), we'll explain everything clearly and provide a fixed price before any work begins.",
    },
    {
      q: "Are you Gas Safe registered?",
      a: "Yes, all of our engineers are Gas Safe registered, which is a legal requirement for anyone working with gas appliances in the UK. You can verify our registration on the Gas Safe Register website. We're also Worcester Bosch Accredited Installers.",
    },
    {
      q: "Do you offer finance?",
      a: "Yes, we offer flexible finance options to help spread the cost of your new boiler. Ask about our finance plans during your free assessment. Subject to status and affordability checks.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background" data-testid="section-faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_BLUE }}>Common Questions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-md px-4" data-testid={`faq-item-${i}`}>
              <AccordionTrigger className="text-left font-semibold text-foreground py-4" data-testid={`button-faq-${i}`}>
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: { name: "", phone: "", postcode: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  return (
    <section id="book-assessment" className="py-16 md:py-24 section-navy" data-testid="section-final-cta">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Get Your New Boiler
                <br />
                <span style={{ color: WB_GREEN }}>From Just £1,790</span>
              </h2>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  Fixed price, no hidden costs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  Worcester Bosch Accredited Installer
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  Up to 12 years warranty
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  Typically installed in one day
                </li>
              </ul>
              <div className="pt-4">
                <p className="text-blue-200 text-sm mb-2">Or call us free:</p>
                <a
                  href={PHONE_HREF}
                  className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3"
                  data-testid="link-phone-final"
                >
                  <Phone className="w-7 h-7" />
                  {PHONE}
                </a>
              </div>
            </div>

            <div>
              <Card className="p-6 md:p-8" data-testid="card-form">
                {submitted ? (
                  <div className="text-center py-8 space-y-4" data-testid="form-success">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Thank You!</h3>
                    <p className="text-muted-foreground">
                      We've received your details. One of our team will be in touch shortly to arrange your free home assessment.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-foreground mb-1">Book Your Free Assessment</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Fill in your details and we'll call you back to arrange a convenient time.
                    </p>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                        className="space-y-4"
                        data-testid="form-assessment"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postcode"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Postcode" {...field} data-testid="input-postcode" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          size="lg"
                          className="text-white font-bold w-full border-[#5fa519]"
                          style={{ backgroundColor: WB_GREEN }}
                          disabled={mutation.isPending}
                          data-testid="button-submit-form"
                        >
                          {mutation.isPending ? "Submitting..." : "Book Your Free Home Heating Assessment"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          No obligation. We'll call you back within 2 hours during business hours.
                        </p>
                      </form>
                    </Form>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-blue-200 py-8 pb-20 md:pb-8" style={{ backgroundColor: "#001540" }} data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-center md:text-left">
            <p className="font-bold text-white mb-1">{COMPANY}</p>
            <p>Gas Safe Registered | Worcester Bosch Accredited Installer</p>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans" data-testid="landing-page">
      <Header />
      <HeroSection />
      <PricingSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <StickyMobilePhoneBar />
    </div>
  );
}
