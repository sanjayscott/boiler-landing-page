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
  Phone, Star, CheckCircle, ChevronRight, ChevronLeft, Clock, ShieldCheck, Zap, Home, Flame, MapPin, ArrowRight, Thermometer,
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
import easyControlImg from "@assets/Homeowner_adjusting_EasyControl_1771321797513.jpg";
import engineerImg from "@assets/Worcester_Bosch_CDi_Classic_Model_and_Installer_Garage_1771321575771.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";
const WB_GREEN = "#78BE20";
const COMPANY = "We Service Boilers Ltd";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Configurator Types & Logic ──────────────────────────────────────────

type Answer = {
  owner?: string;
  boilerType?: string;
  homeType?: string;
  bedrooms?: string;
  bathrooms?: string;
  radiators?: string;
  postcode?: string;
};

type BoilerRec = {
  name: string;
  model: string;
  price: string;
  priceNum: number;
  warranty: string;
  image: string;
  kw: string;
  tag: string;
  monthly: string;
  features: string[];
};

function getRecommendation(a: Answer): BoilerRec {
  // Scoring: bedrooms + bathrooms + radiators → small / medium / large
  const beds = a.bedrooms === "1-2" ? 1 : a.bedrooms === "3" ? 2 : a.bedrooms === "4" ? 3 : 4;
  const baths = a.bathrooms === "1" ? 1 : a.bathrooms === "2" ? 2 : 3;
  const rads = a.radiators === "up-to-10" ? 1 : a.radiators === "10-15" ? 2 : 3;
  const score = beds + baths + rads; // 3-10

  if (score <= 4) {
    return {
      name: "Greenstar 2000i",
      model: "25kW Combi",
      price: "£1,790",
      priceNum: 1790,
      warranty: "8 year",
      image: boiler2000Img,
      kw: "25kW",
      tag: "Great Value",
      monthly: "£22.38",
      features: ["Up to 94% efficiency", "Compact & lightweight", "8 year warranty", "Quiet operation", "Easy to use controls"],
    };
  } else if (score <= 7) {
    return {
      name: "Greenstar 4000",
      model: "25kW Combi",
      price: "£2,199",
      priceNum: 2199,
      warranty: "10 year",
      image: boiler4000Img,
      kw: "25kW",
      tag: "Most Popular",
      monthly: "£27.49",
      features: ["Up to 94% efficiency", "Which? Best Buy 2025", "10 year warranty", "Smart thermostat ready", "Quiet Mark certified", "Most popular in the UK"],
    };
  } else {
    return {
      name: "Greenstar 8000 Life",
      model: "35kW Combi",
      price: "£2,690",
      priceNum: 2690,
      warranty: "12 year",
      image: boiler8000Img,
      kw: "35kW",
      tag: "Premium",
      monthly: "£33.63",
      features: ["Up to 94% efficiency", "Which? Best Buy 2025", "12 year warranty", "Built-in smart controls", "Premium black design", "High hot water flow rate"],
    };
  }
}

// ─── Configurator Steps ──────────────────────────────────────────────────

interface StepProps {
  onSelect: (value: string) => void;
}

function OptionButton({ label, desc, icon, onClick, selected }: { label: string; desc?: string; icon?: React.ReactNode; onClick: () => void; selected?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all text-left hover:border-[${WB_GREEN}] hover:bg-green-50/50 ${selected ? "border-[#78BE20] bg-green-50/60" : "border-gray-200 bg-white"}`}
      style={selected ? { borderColor: WB_GREEN, backgroundColor: "rgba(120,190,32,0.08)" } : {}}
    >
      {icon && <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${WB_BLUE}10` }}>{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base" style={{ color: WB_BLUE }}>{label}</p>
        {desc && <p className="text-sm text-gray-500 mt-0.5">{desc}</p>}
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
    </button>
  );
}

function StepOwner({ onSelect }: StepProps) {
  return (
    <div className="space-y-3">
      <OptionButton label="Homeowner" desc="I own the property" icon={<Home className="w-5 h-5" style={{ color: WB_BLUE }} />} onClick={() => onSelect("homeowner")} />
      <OptionButton label="Landlord" desc="I rent the property out" icon={<Home className="w-5 h-5" style={{ color: WB_BLUE }} />} onClick={() => onSelect("landlord")} />
    </div>
  );
}

function StepBoilerType({ onSelect }: StepProps) {
  return (
    <div className="space-y-3">
      <OptionButton label="Combi Boiler" desc="Heats water on demand — no tank or cylinder" icon={<Flame className="w-5 h-5" style={{ color: WB_BLUE }} />} onClick={() => onSelect("combi")} />
      <OptionButton label="Standard / Regular" desc="Has a hot water cylinder and cold water tank" icon={<Flame className="w-5 h-5" style={{ color: WB_BLUE }} />} onClick={() => onSelect("standard")} />
      <OptionButton label="System Boiler" desc="Has a cylinder but no tank in the loft" icon={<Flame className="w-5 h-5" style={{ color: WB_BLUE }} />} onClick={() => onSelect("system")} />
      <OptionButton label="I'm not sure" desc="Don't worry — we'll check during the assessment" icon={<Flame className="w-5 h-5" style={{ color: WB_BLUE }} />} onClick={() => onSelect("unknown")} />
    </div>
  );
}

function StepHomeType({ onSelect }: StepProps) {
  return (
    <div className="space-y-3">
      {[
        { label: "Detached", desc: "Stands on its own" },
        { label: "Semi-Detached", desc: "One shared wall" },
        { label: "Terraced", desc: "Walls shared on both sides" },
        { label: "Flat / Apartment", desc: "Part of a larger building" },
        { label: "Bungalow", desc: "Single storey home" },
      ].map(o => (
        <OptionButton key={o.label} label={o.label} desc={o.desc} icon={<Home className="w-5 h-5" style={{ color: WB_BLUE }} />} onClick={() => onSelect(o.label.toLowerCase().replace(/\s.*/, ""))} />
      ))}
    </div>
  );
}

function StepBedrooms({ onSelect }: StepProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["1-2", "3", "4", "5+"].map(n => (
        <button key={n} onClick={() => onSelect(n)} className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl border-2 border-gray-200 bg-white hover:border-[#78BE20] hover:bg-green-50/50 transition-all">
          <Home className="w-7 h-7" style={{ color: WB_BLUE }} />
          <span className="font-bold text-lg" style={{ color: WB_BLUE }}>{n}</span>
          <span className="text-xs text-gray-500">{n === "1-2" ? "bedrooms" : n === "5+" ? "or more" : "bedrooms"}</span>
        </button>
      ))}
    </div>
  );
}

function StepBathrooms({ onSelect }: StepProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {["1", "2", "3+"].map(n => (
        <button key={n} onClick={() => onSelect(n)} className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl border-2 border-gray-200 bg-white hover:border-[#78BE20] hover:bg-green-50/50 transition-all">
          <Home className="w-7 h-7" style={{ color: WB_BLUE }} />
          <span className="font-bold text-lg" style={{ color: WB_BLUE }}>{n}</span>
          <span className="text-xs text-gray-500">{n === "3+" ? "or more" : n === "1" ? "bathroom" : "bathrooms"}</span>
        </button>
      ))}
    </div>
  );
}

function StepRadiators({ onSelect }: StepProps) {
  return (
    <div className="space-y-3">
      {[
        { value: "up-to-10", label: "Up to 10", desc: "Smaller home or flat" },
        { value: "10-15", label: "10 – 15", desc: "Average 3 bed home" },
        { value: "15+", label: "15 or more", desc: "Larger property" },
      ].map(o => (
        <OptionButton key={o.value} label={o.label} desc={o.desc} icon={<Thermometer className="w-5 h-5" style={{ color: WB_BLUE }} />} onClick={() => onSelect(o.value)} />
      ))}
    </div>
  );
}

function StepPostcode({ onSubmit }: { onSubmit: (pc: string) => void }) {
  const [pc, setPc] = useState("");
  const valid = /^[A-Za-z]{1,2}\d[\dA-Za-z]?\s?\d[A-Za-z]{2}$/.test(pc.trim());

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">We need this to check we cover your area and to arrange your assessment.</p>
      <Input
        placeholder="e.g. ME7 2NY"
        value={pc}
        onChange={e => setPc(e.target.value.toUpperCase())}
        className="text-center text-xl font-bold tracking-wider py-6 border-2"
        style={{ borderColor: valid ? WB_GREEN : undefined, color: WB_BLUE }}
        maxLength={8}
        autoFocus
      />
      <Button
        size="lg"
        onClick={() => onSubmit(pc.trim())}
        disabled={!valid}
        className="w-full text-white font-bold text-base"
        style={{ backgroundColor: valid ? WB_GREEN : "#ccc", borderColor: valid ? WB_GREEN : "#ccc" }}
      >
        See My Fixed Price <ArrowRight className="w-5 h-5 ml-1" />
      </Button>
    </div>
  );
}

// ─── Configurator Component ─────────────────────────────────────────────

const STEPS = [
  { key: "owner", q: "Are you a homeowner or landlord?", icon: <Home className="w-5 h-5" /> },
  { key: "boilerType", q: "What type of boiler do you currently have?", icon: <Flame className="w-5 h-5" /> },
  { key: "homeType", q: "What type of home do you live in?", icon: <Home className="w-5 h-5" /> },
  { key: "bedrooms", q: "How many bedrooms?", icon: <Home className="w-5 h-5" /> },
  { key: "bathrooms", q: "How many bathrooms?", icon: <Home className="w-5 h-5" /> },
  { key: "radiators", q: "How many radiators do you have?", icon: <Thermometer className="w-5 h-5" /> },
  { key: "postcode", q: "What's your postcode?", icon: <MapPin className="w-5 h-5" /> },
] as const;

function Configurator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = useCallback((key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    }
  }, [step]);

  const handlePostcode = useCallback((pc: string) => {
    setAnswers(prev => ({ ...prev, postcode: pc }));
    setShowResult(true);
  }, []);

  const goBack = useCallback(() => {
    if (showResult) {
      setShowResult(false);
    } else if (step > 0) {
      setStep(s => s - 1);
    }
  }, [step, showResult]);

  const rec = getRecommendation(answers);
  const progress = showResult ? 100 : Math.round(((step) / STEPS.length) * 100);

  if (showResult) {
    return <ResultSection recommendation={rec} answers={answers} onBack={goBack} />;
  }

  return (
    <section className="py-12 md:py-20 bg-white" id="configurator">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Step {step + 1} of {STEPS.length}</span>
              <span className="text-xs font-semibold" style={{ color: WB_GREEN }}>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: WB_GREEN }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Back button */}
          {step > 0 && (
            <button onClick={goBack} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: WB_BLUE }}>
                {STEPS[step].q}
              </h2>

              {step === 0 && <StepOwner onSelect={v => handleSelect("owner", v)} />}
              {step === 1 && <StepBoilerType onSelect={v => handleSelect("boilerType", v)} />}
              {step === 2 && <StepHomeType onSelect={v => handleSelect("homeType", v)} />}
              {step === 3 && <StepBedrooms onSelect={v => handleSelect("bedrooms", v)} />}
              {step === 4 && <StepBathrooms onSelect={v => handleSelect("bathrooms", v)} />}
              {step === 5 && <StepRadiators onSelect={v => handleSelect("radiators", v)} />}
              {step === 6 && <StepPostcode onSubmit={handlePostcode} />}
            </motion.div>
          </AnimatePresence>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-10 pt-6 border-t border-gray-100">
            <img src={gasSafeLogo} alt="Gas Safe" className="h-7 w-auto opacity-60" />
            <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-5 w-auto opacity-60" />
            <img src={checkatradeLogo} alt="Checkatrade" className="h-4 w-auto opacity-60" />
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(n => <Star key={n} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-xs font-bold text-gray-400 ml-1">4.8/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Result Section (after configurator) ─────────────────────────────────

function ResultSection({ recommendation: rec, answers, onBack }: { recommendation: BoilerRec; answers: Answer; onBack: () => void }) {
  return (
    <section className="py-12 md:py-20 bg-white" id="your-quote">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Change answers
          </button>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-white mb-4" style={{ backgroundColor: WB_GREEN }}>
              <CheckCircle className="w-4 h-4" /> Your Recommended Boiler
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>
              Your Fixed Price
            </h2>
            <p className="text-gray-500 mt-2">Based on your {answers.bedrooms} bedroom {answers.homeType} with {answers.radiators === "up-to-10" ? "up to 10" : answers.radiators === "10-15" ? "10-15" : "15+"} radiators</p>
          </motion.div>

          {/* Recommendation card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="overflow-hidden border-2" style={{ borderColor: WB_GREEN }}>
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md text-white text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: WB_GREEN }}>
                  {rec.tag}
                </div>
              </div>
              <div className="grid md:grid-cols-2">
                {/* Image side */}
                <div className="p-8 flex items-center justify-center" style={{ backgroundColor: "#F8F9FA" }}>
                  <img src={rec.image} alt={rec.name} className="max-h-72 w-auto object-contain" />
                </div>
                {/* Info side */}
                <div className="p-6 md:p-8 space-y-5">
                  <div>
                    <p className="text-sm text-gray-500">{rec.model}</p>
                    <h3 className="text-2xl font-bold" style={{ color: WB_BLUE }}>{rec.name}</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Your fixed price including installation:</p>
                    <p className="text-4xl font-black" style={{ color: WB_GREEN }}>{rec.price}</p>
                    <p className="text-sm text-gray-500">or from <strong>{rec.monthly}/month</strong> (0% APR representative)</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: `${WB_BLUE}10`, color: WB_BLUE }}>
                      <ShieldCheck className="w-3.5 h-3.5" /> {rec.warranty} warranty
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: `${WB_BLUE}10`, color: WB_BLUE }}>
                      <Zap className="w-3.5 h-3.5" /> {rec.kw} output
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {rec.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: WB_GREEN }} />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* What's included */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4" style={{ color: WB_BLUE }}>Everything Included in Your Price</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "New Worcester Bosch boiler",
                  "Full professional installation",
                  "Chemical system flush",
                  "Magnetic filter fitted",
                  "New flue & fittings",
                  "CO alarm installed",
                  "Condensate pipework",
                  "Thermostat included",
                  "Electrical connection",
                  "Old boiler removed & recycled",
                  "Building control certificate",
                  `Up to ${rec.warranty} manufacturer warranty`,
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: WB_GREEN }} />{item}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA: Book assessment */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
            <BookingForm postcode={answers.postcode || ""} boiler={rec.name} price={rec.price} />
          </motion.div>

          {/* Why home assessment */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
            <Card className="p-6" style={{ backgroundColor: "#F8F9FA" }}>
              <h3 className="font-bold text-lg mb-3" style={{ color: WB_BLUE }}>Why We Visit Your Home First</h3>
              <p className="text-sm text-gray-500 mb-4">Unlike online-only companies that rely on algorithms, we send a Gas Safe registered engineer to your home to:</p>
              <ul className="space-y-2">
                {[
                  "Check your existing pipework and flue position",
                  "Confirm the right boiler size for your home",
                  "Identify any additional work needed (no surprises on install day)",
                  "Answer your questions face-to-face",
                  "Lock in your fixed price — guaranteed",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: WB_GREEN }} />{item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Booking Form ────────────────────────────────────────────────────────

function BookingForm({ postcode, boiler, price }: { postcode: string; boiler: string; price: string }) {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: { name: "", phone: "", postcode },
  });
  const mutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await apiRequest("POST", "/api/leads", { ...data, notes: `Configurator: ${boiler} at ${price}` });
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
        <p className="text-blue-200 text-sm">Your quote: <strong className="text-white">{boiler} — {price} installed</strong></p>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8" style={{ backgroundColor: WB_BLUE }}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white">Book Your Free Home Assessment</h3>
        <p className="text-blue-200 mt-1">We'll confirm your {boiler} quote in person — no obligation, no pressure</p>
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

// ─── Shared Sections (inherited from V10) ────────────────────────────────

function PromoBanner() {
  return (
    <div className="w-full py-2.5 px-4 text-center" style={{ backgroundColor: WB_BLUE }}>
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="text-white text-sm font-semibold">Spring Worcester Bosch Promotion</span>
        <span className="text-blue-200 text-sm hidden sm:inline">|</span>
        <span className="text-white text-sm">New Boiler From <strong>£1,790</strong> Installed + <strong>Free Home Assessment</strong></span>
        <button onClick={() => scrollTo("configurator")} className="text-sm font-bold underline underline-offset-2 flex items-center gap-0.5" style={{ color: WB_GREEN }}>
          Get Your Price <ChevronRight className="w-3.5 h-3.5" />
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
          <Button size="sm" onClick={() => scrollTo("configurator")} className="text-white font-semibold text-xs md:text-sm whitespace-nowrap" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }}>
            Get Your Price
          </Button>
        </div>
      </div>
    </header>
  );
}

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
            Get Your Fixed Price<br />In 60 Seconds
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto">
            Answer a few quick questions about your home and we'll show you the exact cost of a new Worcester Bosch boiler — fully installed, no hidden extras.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <Button size="lg" onClick={() => scrollTo("configurator")} className="text-white font-bold text-base px-8" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }}>
              Get My Fixed Price <ArrowRight className="w-5 h-5 ml-1" />
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

function ComparisonSection() {
  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Why Choose Us Over Online-Only</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>The Best of Both Worlds</h2>
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
                { feature: "Fixed price online", online: true, us: true },
                { feature: "Home assessment before install", online: false, us: true },
                { feature: "Named local engineer", online: false, us: true },
                { feature: "No algorithm guesswork", online: false, us: true },
                { feature: "Worcester Bosch warranty", online: true, us: true },
                { feature: "Price match guarantee", online: false, us: true },
                { feature: "Aftercare & servicing", online: false, us: true },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-3 px-4 font-medium" style={{ color: WB_BLUE }}>{row.feature}</td>
                  <td className="py-3 px-4 text-center">{row.online ? <CheckCircle className="w-5 h-5 mx-auto text-gray-300" /> : <span className="text-gray-300">✕</span>}</td>
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

function Testimonials() {
  const reviews = [
    { name: "Mr & Mrs Thompson", location: "Chatham", text: "The free assessment was really helpful. No pressure, just honest advice about our old boiler. We ended up saving over £300 a year!", rating: 5 },
    { name: "David R", location: "Gillingham", text: "Got a fixed price online, then Sanjay came round and confirmed everything. No surprises. Boiler installed two days later.", rating: 5 },
    { name: "Karen M", location: "Rochester", text: "We had no idea our old boiler was only 60% efficient. The savings since upgrading have been incredible.", rating: 5 },
    { name: "James P", location: "Rainham", text: "Professional assessment, clear explanation of the savings. No hard sell. Very impressed with the service.", rating: 5 },
  ];

  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Real Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What Our Customers Say</h2>
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

function FAQ() {
  const faqs = [
    { q: "How accurate is the online price?", a: "Very accurate for standard installations. The home assessment confirms everything — if anything changes, we'll explain why before you commit. Most customers get exactly the price shown." },
    { q: "Is the home assessment really free?", a: "Yes, completely free with no obligation. Our engineer will check your system and confirm the right boiler. There's no pressure to go ahead." },
    { q: "How quickly can you install?", a: "Once you've had your assessment and decided to go ahead, we can usually install within 48 hours. Most installs take just one day." },
    { q: "What areas do you cover?", a: "We cover Medway, Kent and surrounding areas including Chatham, Rochester, Gillingham, Rainham, Strood, Gravesend, Canterbury and more." },
    { q: "What warranties do you offer?", a: "As a Worcester Bosch Accredited Installer, we can offer up to 12 year manufacturer-backed guarantees on Greenstar boilers. This is the longest warranty available." },
    { q: "Do you offer finance?", a: "Yes, we offer 0% APR representative finance options. We'll go through all payment options during your home assessment." },
  ];

  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Frequently Asked Questions</h2>
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
              <li>Greenstar 2000i</li>
              <li>Greenstar 4000</li>
              <li>Greenstar 8000 Life</li>
              <li>EasyControl Smart Thermostat</li>
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
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden shadow-lg">
      <div className="flex">
        <a href={PHONE_HREF} className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 text-base" style={{ backgroundColor: WB_GREEN }}>
          <Phone className="w-5 h-5" /> Call Free
        </a>
        <button onClick={() => scrollTo("configurator")} className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 text-base" style={{ backgroundColor: WB_BLUE }}>
          Get Your Price
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────

export default function V11() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <HeroSection />
      <Configurator />
      <ComparisonSection />
      <Testimonials />
      <FAQ />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
