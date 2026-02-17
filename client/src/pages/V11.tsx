import { useState, useCallback } from "react";
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
import {
  Phone, Star, CheckCircle, ChevronRight, Clock, ShieldCheck, Zap, Home, Flame, MapPin, ArrowRight, PhoneCall, HelpCircle, Calculator,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import worcesterBoschLogo from "@assets/worcester-bosch-logo_(2)_1771281246798.png";
import heroLifestyle from "@assets/Ri_-_Lifestyle_1771321781805.jpg";
import boiler2000Img from "@assets/Worcester_Bosch_2000_584_x_550_1771321664217.jpg";
import boiler4000Img from "@assets/Worcester_Bosch_4000_Combi_Boiler_584x550_1771321664218.jpg";
import boiler8000Img from "@assets/8000_Style_Black_1771321846520.jpg";
import gasSafeLogo from "@assets/Gas_Safe_Logo_1771321269776.png";
import checkatradeLogo from "@assets/Checkatrade_Logo_2023_1771322021422.png";
import whichBestBuy from "@assets/Which_Best_Buy_Combi_Boilers_1771321755707.png";
import wsbLogo from "@assets/WeServiceBoilers_Standard_1771321243040.png";
import leapLogo from "@assets/LEAP_Logo_1771321364902.png";
import engineerImg from "@assets/Worcester_Bosch_CDi_Classic_Model_and_Installer_Garage_1771321575771.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";
const WB_GREEN = "#78BE20";
const COMPANY = "We Service Boilers Ltd";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Boiler Data ─────────────────────────────────────────────────────────

const boilers = [
  {
    name: "Greenstar 2000",
    model: "25kW Combi",
    price: "£1,790",
    priceNum: 1790,
    warranty: "8 year",
    image: boiler2000Img,
    kw: "25kW",
    tag: "Great Value",
    monthly: "£22.38",
    features: ["Up to 94% efficiency", "Compact & lightweight", "8 year warranty", "Quiet operation", "Easy to use controls"],
    idealFor: "1-2 bed homes with 1 bathroom and up to 10 radiators",
  },
  {
    name: "Greenstar 4000",
    model: "25kW Combi",
    price: "£2,199",
    priceNum: 2199,
    warranty: "10 year",
    image: boiler4000Img,
    kw: "25kW",
    tag: "Most Popular",
    monthly: "£27.49",
    features: ["Up to 94% efficiency", "Which? Best Buy 2025", "10 year warranty", "Built-in frost protection", "Smart thermostat compatible"],
    idealFor: "3-4 bed homes with 1-2 bathrooms and 10-15 radiators",
  },
  {
    name: "Greenstar 8000 Life",
    model: "35kW Combi",
    price: "£2,690",
    priceNum: 2690,
    warranty: "12 year",
    image: boiler8000Img,
    kw: "35kW",
    tag: "Premium",
    monthly: "£33.63",
    features: ["Up to 94% efficiency", "Top-of-range model", "12 year warranty", "High hot water demand", "Designer black finish available"],
    idealFor: "4+ bed homes with 2+ bathrooms and 15+ radiators",
  },
];

// ─── Ballpark Quiz Logic ─────────────────────────────────────────────────

function getBallpark(beds: string, baths: string, rads: string) {
  const b = beds === "1-2" ? 1 : beds === "3" ? 2 : 3;
  const ba = baths === "1" ? 1 : baths === "2" ? 2 : 3;
  const r = rads === "up-to-10" ? 1 : rads === "10-15" ? 2 : 3;
  const score = b + ba + r;
  if (score <= 4) return boilers[0];
  if (score <= 7) return boilers[1];
  return boilers[2];
}

// ─── Booking Form ────────────────────────────────────────────────────────

function BookingForm({ context }: { context?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: { name: "", phone: "", postcode: "" },
  });
  const mutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await apiRequest("POST", "/api/leads", { ...data, notes: context || "V11 booking form" });
      return res.json();
    },
    onSuccess: () => { setSubmitted(true); form.reset(); },
    onError: () => { toast({ title: "Something went wrong", description: "Please try again or call us.", variant: "destructive" }); },
  });

  if (submitted) {
    return (
      <Card className="p-8 text-center" style={{ backgroundColor: WB_BLUE }}>
        <div className="mx-auto w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You're Booked In!</h3>
        <p className="text-blue-200 mb-1">We'll call you within 2 hours to confirm your free home assessment.</p>
        <p className="text-blue-200 text-sm">No obligation. No pressure. Just honest advice.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8" style={{ backgroundColor: WB_BLUE }}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white">Book your free home assessment</h3>
        <p className="text-blue-200 mt-1">We'll visit, confirm the right boiler, and give you an exact fixed price — no obligation</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4 max-w-sm mx-auto">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormControl><Input placeholder="Your Name" className="bg-white border-0 py-5 text-base" {...field} /></FormControl><FormMessage className="text-red-300" /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormControl><Input placeholder="Phone Number" type="tel" className="bg-white border-0 py-5 text-base" {...field} /></FormControl><FormMessage className="text-red-300" /></FormItem>
          )} />
          <FormField control={form.control} name="postcode" render={({ field }) => (
            <FormItem><FormControl><Input placeholder="Postcode" className="bg-white border-0 py-5 text-base" {...field} /></FormControl><FormMessage className="text-red-300" /></FormItem>
          )} />
          <Button type="submit" size="lg" className="w-full text-white font-bold text-base py-6" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Book My Free Assessment"}
          </Button>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2">
            {["100% free", "No obligation", "No pressure"].map((t, i) => (
              <span key={i} className="text-xs text-blue-200 flex items-center gap-1"><CheckCircle className="w-3 h-3" style={{ color: WB_GREEN }} />{t}</span>
            ))}
          </div>
        </form>
      </Form>
      <div className="text-center mt-6 pt-4 border-t border-white/10">
        <p className="text-blue-200 text-sm mb-2">Or call us free:</p>
        <a href={PHONE_HREF} className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Phone className="w-6 h-6" /> {PHONE}
        </a>
      </div>
    </Card>
  );
}

// ─── Callback Form ───────────────────────────────────────────────────────

function CallbackForm({ context }: { context?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/leads", {
        name, phone, postcode: "",
        notes: `Callback request${context ? `: ${context}` : ""}`,
      });
      return res.json();
    },
    onSuccess: () => { setSubmitted(true); setName(""); setPhone(""); },
    onError: () => { toast({ title: "Something went wrong", description: "Please try again or call us.", variant: "destructive" }); },
  });

  if (submitted) {
    return (
      <div className="text-center py-6 space-y-3">
        <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E8F5E9" }}>
          <CheckCircle className="w-6 h-6" style={{ color: WB_GREEN }} />
        </div>
        <h3 className="text-lg font-bold" style={{ color: WB_BLUE }}>We'll Call You Back!</h3>
        <p className="text-sm text-gray-500">Expect a call within 2 hours during business hours.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="border-gray-200 py-5 text-base" />
      <Input placeholder="Phone Number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="border-gray-200 py-5 text-base" />
      <Button size="lg" onClick={() => mutation.mutate()} disabled={!name.trim() || !phone.trim() || mutation.isPending}
        className="w-full text-white font-bold text-base" style={{ backgroundColor: WB_BLUE, borderColor: WB_BLUE }}>
        {mutation.isPending ? "Requesting..." : <><PhoneCall className="w-5 h-5 mr-2" /> Request a Callback</>}
      </Button>
      <p className="text-xs text-center text-gray-400">We'll call you back within 2 hours. No obligation.</p>
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroLifestyle})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-white" style={{ backgroundColor: WB_BLUE }}>
            <Zap className="w-4 h-4" style={{ color: WB_GREEN }} /> Spring Promotion — Save Up To £500
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight" style={{ color: WB_BLUE }}>
            Worcester Bosch Boilers<br />From <span style={{ color: WB_GREEN }}>£1,790</span> Installed
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto">
            Transparent pricing. Free home assessment. Up to 12 years warranty. From your local Worcester Bosch accredited installer.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <Button size="lg" onClick={() => scrollTo("book")} className="text-white font-bold text-base px-8" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }}>
              Book Free Assessment <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <a href={PHONE_HREF}>
              <Button size="lg" variant="outline" className="font-bold text-base px-8 gap-2 border-gray-300 text-gray-800 bg-white/70 backdrop-blur-sm">
                <Phone className="w-5 h-5" /> {PHONE}
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-6">
            <img src={gasSafeLogo} alt="Gas Safe Registered" className="h-10 w-auto" />
            <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-7 w-auto" />
            <img src={checkatradeLogo} alt="Checkatrade" className="h-6 w-auto" />
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
              <span className="text-sm font-bold text-gray-800">4.8/5</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section id="pricing" className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Transparent Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>New boiler prices — fully installed</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">Everything included: boiler, installation, flue, fittings, chemical flush, magnetic filter, CO alarm, building control certificate, and old boiler removal.</p>
        </div>

        {/* Urgency banner */}
        <div className="max-w-2xl mx-auto mb-10 rounded-lg px-4 py-3 text-center" style={{ backgroundColor: "#FFF3CD" }}>
          <p className="text-sm font-semibold" style={{ color: "#856404" }}>
            <Clock className="w-4 h-4 inline mr-1" />
            Spring offer ends 31st March — limited installations remaining at this price
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {boilers.map((boiler, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`relative overflow-hidden h-full flex flex-col ${i === 1 ? "border-2 ring-2 ring-offset-2" : "border"}`} style={i === 1 ? { borderColor: WB_GREEN, ringColor: WB_GREEN } : {}}>
                {/* Tag */}
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-bl-lg" style={{ backgroundColor: i === 1 ? WB_GREEN : WB_BLUE }}>
                  {boiler.tag}
                </div>

                {/* Image */}
                <div className="p-6 pb-2 flex items-center justify-center" style={{ backgroundColor: "#F8F9FA" }}>
                  <img src={boiler.image} alt={boiler.name} className="h-48 w-auto object-contain" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{boiler.model}</p>
                  <h3 className="text-xl font-bold mt-1" style={{ color: WB_BLUE }}>{boiler.name}</h3>

                  <div className="mt-4 mb-2">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-4xl font-black" style={{ color: WB_GREEN }}>{boiler.price}</p>
                    <p className="text-sm text-gray-500">or from <strong>{boiler.monthly}/mo</strong> (0% APR)</p>
                  </div>

                  <div className="flex flex-wrap gap-2 my-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${WB_BLUE}10`, color: WB_BLUE }}>
                      <ShieldCheck className="w-3 h-3" /> {boiler.warranty}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${WB_BLUE}10`, color: WB_BLUE }}>
                      <Zap className="w-3 h-3" /> {boiler.kw}
                    </span>
                  </div>

                  <ul className="space-y-1.5 flex-1">
                    {boiler.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: WB_GREEN }} />{f}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-gray-400 mt-3 italic">Ideal for: {boiler.idealFor}</p>

                  <Button size="lg" onClick={() => scrollTo("book")} className="w-full mt-4 text-white font-bold" style={{ backgroundColor: i === 1 ? WB_GREEN : WB_BLUE }}>
                    Book Free Assessment
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Exact price confirmed during your free home assessment. No hidden extras — the price we quote is the price you pay.
        </p>
      </div>
    </section>
  );
}

// ─── What Happens Next ───────────────────────────────────────────────────

function WhatHappensNext() {
  const steps = [
    { icon: <Phone className="w-6 h-6" />, title: "1. Book your free assessment", desc: "Fill in the form or call us. We'll arrange a visit at a time that suits you." },
    { icon: <Home className="w-6 h-6" />, title: "2. We visit your home", desc: "Our Gas Safe engineer checks your system, confirms the right boiler, and gives you an exact fixed price." },
    { icon: <CheckCircle className="w-6 h-6" />, title: "3. You decide — no pressure", desc: "Take your time. There's no hard sell. If you want to go ahead, we can usually install within 48 hours." },
    { icon: <Flame className="w-6 h-6" />, title: "4. Installed and guaranteed", desc: "Professional installation in a day. Up to 12 years manufacturer warranty. We handle everything." },
  ];

  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What happens next</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 h-full text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${WB_GREEN}15`, color: WB_GREEN }}>
                  {step.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ color: WB_BLUE }}>{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Booking Section ────────────────────────────────────────────────

function BookingSection() {
  return (
    <section id="book" className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-lg">
        <BookingForm context="V11 main booking" />

        {/* Callback alternative */}
        <div className="mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${WB_BLUE}10` }}>
                <PhoneCall className="w-5 h-5" style={{ color: WB_BLUE }} />
              </div>
              <div>
                <h3 className="font-bold" style={{ color: WB_BLUE }}>Prefer to Talk?</h3>
                <p className="text-sm text-gray-500">Request a free callback — no forms, no fuss</p>
              </div>
            </div>
            <CallbackForm context="V11 callback" />
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─── Ballpark Quiz ("Want to find out without a visit?") ─────────────────

function BallparkQuiz() {
  const [open, setOpen] = useState(false);
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [rads, setRads] = useState("");
  const [result, setResult] = useState<typeof boilers[0] | null>(null);

  const handleSubmit = () => {
    if (beds && baths && rads) {
      setResult(getBallpark(beds, baths, rads));
    }
  };

  const OptionButton = ({ value, current, onClick, children }: { value: string; current: string; onClick: (v: string) => void; children: React.ReactNode }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all ${current === value ? "text-white" : "bg-white hover:border-gray-300"}`}
      style={current === value ? { backgroundColor: WB_GREEN, borderColor: WB_GREEN } : { borderColor: "#E5E7EB", color: WB_BLUE }}
    >
      {children}
    </button>
  );

  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        {!open && !result && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${WB_BLUE}08` }}>
              <Calculator className="w-8 h-8" style={{ color: WB_BLUE }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: WB_BLUE }}>
              Want a Price Without a Visit?
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Answer 3 quick questions and we'll suggest which boiler is likely right for your home — with an estimated starting price.
            </p>
            <Button size="lg" onClick={() => setOpen(true)} variant="outline" className="font-bold text-base px-8 gap-2" style={{ borderColor: WB_BLUE, color: WB_BLUE }}>
              <HelpCircle className="w-5 h-5" /> Get an Estimate
            </Button>
          </motion.div>
        )}

        <AnimatePresence>
          {open && !result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-1 text-center" style={{ color: WB_BLUE }}>Quick price estimate</h3>
                <p className="text-sm text-gray-500 text-center mb-6">This is an estimate only — your free home assessment confirms the exact price.</p>

                <div className="space-y-6">
                  {/* Bedrooms */}
                  <div>
                    <p className="font-semibold mb-3" style={{ color: WB_BLUE }}>How many bedrooms?</p>
                    <div className="grid grid-cols-3 gap-3">
                      <OptionButton value="1-2" current={beds} onClick={setBeds}>1-2</OptionButton>
                      <OptionButton value="3" current={beds} onClick={setBeds}>3</OptionButton>
                      <OptionButton value="4+" current={beds} onClick={setBeds}>4+</OptionButton>
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <p className="font-semibold mb-3" style={{ color: WB_BLUE }}>How many bathrooms/showers?</p>
                    <div className="grid grid-cols-3 gap-3">
                      <OptionButton value="1" current={baths} onClick={setBaths}>1</OptionButton>
                      <OptionButton value="2" current={baths} onClick={setBaths}>2</OptionButton>
                      <OptionButton value="3+" current={baths} onClick={setBaths}>3+</OptionButton>
                    </div>
                  </div>

                  {/* Radiators */}
                  <div>
                    <p className="font-semibold mb-3" style={{ color: WB_BLUE }}>How many radiators?</p>
                    <div className="grid grid-cols-3 gap-3">
                      <OptionButton value="up-to-10" current={rads} onClick={setRads}>Up to 10</OptionButton>
                      <OptionButton value="10-15" current={rads} onClick={setRads}>10-15</OptionButton>
                      <OptionButton value="15+" current={rads} onClick={setRads}>15+</OptionButton>
                    </div>
                  </div>

                  <Button size="lg" onClick={handleSubmit} disabled={!beds || !baths || !rads}
                    className="w-full text-white font-bold text-base py-6" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }}>
                    Show My Estimate
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden border-2" style={{ borderColor: WB_GREEN }}>
                <div className="p-6 md:p-8 text-center">
                  <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Based on your answers</p>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: WB_BLUE }}>We'd Recommend the {result.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">Estimated starting price for a standard installation:</p>

                  <div className="flex items-center justify-center gap-6 mb-6">
                    <img src={result.image} alt={result.name} className="h-32 w-auto object-contain" />
                    <div className="text-left">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="text-4xl font-black" style={{ color: WB_GREEN }}>{result.price}</p>
                      <p className="text-sm text-gray-500">or from <strong>{result.monthly}/mo</strong></p>
                      <p className="text-xs mt-1"><ShieldCheck className="w-3 h-3 inline" style={{ color: WB_BLUE }} /> {result.warranty} warranty</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 mb-6 text-sm text-amber-800">
                    <strong>This is an estimate.</strong> The exact price depends on your pipework, flue position, and any additional work needed.
                    A free home assessment confirms everything — no obligation.
                  </div>

                  <Button size="lg" onClick={() => scrollTo("book")} className="text-white font-bold text-base px-8" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }}>
                    Book free assessment to confirm price
                  </Button>

                  <button onClick={() => { setResult(null); setOpen(false); setBeds(""); setBaths(""); setRads(""); }}
                    className="block mx-auto mt-3 text-sm text-gray-400 underline">Start over</button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Why Home Assessment ─────────────────────────────────────────────────

function WhyAssessment() {
  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Why We Visit First</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: WB_BLUE }}>No surprises on install day</h2>
            <p className="text-gray-500 mb-6">
              Unlike online-only companies that rely on algorithms, we send a Gas Safe registered engineer to your home. This means:
            </p>
            <ul className="space-y-3">
              {[
                "We check your existing pipework and flue position",
                "We confirm the right boiler size for your home",
                "We identify any additional work needed upfront",
                "We answer your questions face-to-face",
                "The price we quote is the price you pay — guaranteed",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: WB_GREEN }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={engineerImg} alt="Gas Safe engineer" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Comparison Table ────────────────────────────────────────────────────

function ComparisonSection() {
  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>The best of both worlds</h2>
        </div>
        <div className="max-w-3xl mx-auto overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: WB_BLUE }}>
                <th className="text-left text-white font-semibold py-3 px-4"></th>
                <th className="text-center text-white font-semibold py-3 px-4">Online-Only<br/><span className="font-normal text-blue-200 text-xs">(BOXT, Heatable etc)</span></th>
                <th className="text-center font-semibold py-3 px-4" style={{ backgroundColor: WB_GREEN, color: "white" }}>{COMPANY}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Transparent starting prices", online: true, us: true },
                { feature: "Home assessment before install", online: false, us: true },
                { feature: "Named local engineer", online: false, us: true },
                { feature: "No algorithm guesswork", online: false, us: true },
                { feature: "Worcester Bosch warranty", online: true, us: true },
                { feature: "Price match guarantee", online: false, us: true },
                { feature: "Aftercare & annual servicing", online: false, us: true },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-3 px-4 font-medium" style={{ color: WB_BLUE }}>{row.feature}</td>
                  <td className="py-3 px-4 text-center">{row.online ? <CheckCircle className="w-5 h-5 mx-auto text-gray-400" /> : <span className="text-red-400 font-bold text-lg">✕</span>}</td>
                  <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 mx-auto" style={{ color: WB_GREEN }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────

function Testimonials() {
  const reviews = [
    { name: "Mr & Mrs Thompson", location: "Chatham", text: "The free assessment was really helpful. No pressure, just honest advice about our old boiler. We ended up saving over £300 a year!", rating: 5 },
    { name: "David R", location: "Gillingham", text: "Transparent prices on the website, then Sanjay came round and confirmed everything. No surprises. Boiler installed two days later.", rating: 5 },
    { name: "Karen M", location: "Rochester", text: "We had no idea our old boiler was only 60% efficient. The savings since upgrading have been incredible.", rating: 5 },
    { name: "James P", location: "Rainham", text: "Professional assessment, clear explanation of the savings. No hard sell. Very impressed with the service.", rating: 5 },
  ];

  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Real Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What our customers say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <Card key={i} className="p-5 h-full flex flex-col gap-3">
              <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
              <p className="text-sm text-gray-600 flex-1 italic">"{r.text}"</p>
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-sm" style={{ color: WB_BLUE }}>{r.name}, {r.location}</p>
                <img src={checkatradeLogo} alt="Checkatrade" className="h-4 w-auto opacity-60" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────

function FAQ() {
  const faqs = [
    { q: "Why are these 'from' prices?", a: "Every home is different — pipework, flue position, and access can affect the final cost. Our starting prices cover a standard installation. The free home assessment confirms your exact price, and most customers pay exactly what's shown." },
    { q: "Is the home assessment really free?", a: "Yes, completely free with no obligation. Our engineer will check your system and confirm the right boiler. There's no pressure to go ahead." },
    { q: "How quickly can you install?", a: "Once you've had your assessment and decided to go ahead, we can usually install within 48 hours. Most installs take just one day." },
    { q: "What areas do you cover?", a: "We cover Medway, Kent and surrounding areas including Chatham, Rochester, Gillingham, Rainham, Strood, Gravesend, Canterbury and more." },
    { q: "What warranties do you offer?", a: "As a Worcester Bosch Accredited Installer, we can offer up to 12 year manufacturer-backed guarantees on Greenstar boilers. This is the longest warranty available." },
    { q: "Do you offer finance?", a: "Yes, we offer 0% APR representative finance options. We'll go through all payment options during your home assessment." },
    { q: "Can you beat BOXT / online prices?", a: "Yes — our prices are competitive with or lower than online-only companies, and you get a proper home assessment included. We price match any like-for-like Worcester Bosch quote." },
  ];

  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Frequently asked questions</h2>
        </div>
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

// ─── Shared Components ───────────────────────────────────────────────────

function PromoBanner() {
  return (
    <div className="w-full py-2.5 px-4 text-center" style={{ backgroundColor: WB_BLUE }}>
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="text-white text-sm font-semibold">Spring Worcester Bosch Promotion</span>
        <span className="text-blue-200 text-sm hidden sm:inline">|</span>
        <span className="text-white text-sm">New Boiler From <strong>£1,790</strong> Installed + <strong>Free Home Assessment</strong></span>
        <button onClick={() => scrollTo("book")} className="text-sm font-bold underline underline-offset-2 flex items-center gap-0.5" style={{ color: WB_GREEN }}>
          Book Free Assessment <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-white shadow-sm">
      <PromoBanner />
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 overflow-hidden">
          <img src={worcesterBoschLogo} alt="Worcester Bosch Accredited Installer" className="h-6 md:h-8 w-auto shrink-0" />
          <div className="hidden md:block h-6 w-px bg-gray-200 shrink-0" />
          <img src={wsbLogo} alt={COMPANY} className="hidden md:block h-3 lg:h-4 w-auto shrink-0" />
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <a href={PHONE_HREF} className="hidden lg:flex items-center gap-2 font-bold text-base" style={{ color: WB_BLUE }}>
            <Phone className="w-4 h-4" /><span>{PHONE}</span>
          </a>
          <Button size="sm" onClick={() => scrollTo("book")} className="text-white font-semibold text-xs md:text-sm whitespace-nowrap" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }}>
            Book Free Assessment
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="text-gray-500 py-12 pb-28 md:pb-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img src={wsbLogo} alt={COMPANY} className="h-10 w-auto mb-3" />
            <p className="text-sm text-gray-500">Your local Worcester Bosch Accredited Installer serving Medway, Kent & surrounding areas.</p>
          </div>
          <div>
            <p className="font-bold text-sm mb-3" style={{ color: WB_BLUE }}>Credentials</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2"><img src={gasSafeLogo} alt="Gas Safe" className="h-6 w-auto" /><span className="text-sm">Gas Safe Registered</span></div>
              <div className="flex items-center gap-2"><img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-5 w-auto" /><span className="text-sm">Accredited Installer</span></div>
              <div className="flex items-center gap-2"><img src={checkatradeLogo} alt="Checkatrade" className="h-4 w-auto" /><span className="text-sm">Verified Member</span></div>
              <div className="flex items-center gap-2"><img src={leapLogo} alt="LEAP" className="h-5 w-auto" /><span className="text-sm">LEAP Approved</span></div>
            </div>
          </div>
          <div>
            <p className="font-bold text-sm mb-3" style={{ color: WB_BLUE }}>Products</p>
            <ul className="space-y-2 text-sm">
              <li>Greenstar 2000 — from £1,790</li>
              <li>Greenstar 4000 — from £2,199</li>
              <li>Greenstar 8000 Life — from £2,690</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm mb-3" style={{ color: WB_BLUE }}>Contact</p>
            <a href={PHONE_HREF} className="flex items-center gap-2 font-bold text-lg mb-3" style={{ color: WB_BLUE }}>
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <p className="text-sm">Monday – Saturday, 8am – 6pm</p>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} {COMPANY}. All rights reserved. Gas Safe Registered. Worcester Bosch Accredited Installer.</p>
        </div>
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  const [showCallback, setShowCallback] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showCallback && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40" onClick={() => setShowCallback(false)}>
            <motion.div initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }}
              className="w-full max-w-lg bg-white rounded-t-2xl p-6 pb-8" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: WB_BLUE }}>Request a free callback</h3>
                <button onClick={() => setShowCallback(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">Leave your name and number — we'll call you back within 2 hours during business hours.</p>
              <CallbackForm context="Mobile sticky callback" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden shadow-lg">
        <div className="flex">
          <button onClick={() => setShowCallback(true)} className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 text-base" style={{ backgroundColor: WB_GREEN }}>
            <PhoneCall className="w-5 h-5" /> Book a Callback
          </button>
          <button onClick={() => scrollTo("book")} className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 text-base" style={{ backgroundColor: WB_BLUE }}>
            Book Assessment
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────

export default function V11() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <HeroSection />
      <PricingSection />
      <WhatHappensNext />
      <BookingSection />
      <BallparkQuiz />
      <WhyAssessment />
      <ComparisonSection />
      <Testimonials />
      <FAQ />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
