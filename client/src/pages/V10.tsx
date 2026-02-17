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
  Phone, Star, CheckCircle, Calendar, ClipboardCheck, Zap, FileText, ChevronRight, Clock, ShieldCheck, Users, Rocket,
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
import utilityRoomImg from "@assets/Greenstar_4000_utility1_1771321809308.jpg";
import boilerPackShot from "@assets/Boiler_Pack_Shot_1771321846521.jpg";

const PHONE = "0800 048 5737";
const PHONE_HREF = "tel:08000485737";
const WB_BLUE = "#00205B";
const WB_GREEN = "#78BE20";
const COMPANY = "We Service Boilers Ltd";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PromoBanner() {
  return (
    <div className="w-full py-2.5 px-4 text-center" style={{ backgroundColor: WB_BLUE }} data-testid="promo-banner">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="text-white text-sm font-semibold">Spring Worcester Bosch Promotion</span>
        <span className="text-blue-200 text-sm hidden sm:inline">|</span>
        <span className="text-white text-sm">Save Up To <strong>&pound;500</strong> on a New Boiler Installation + <strong>Free Home Heating Assessment</strong></span>
        <button onClick={() => scrollTo("book-assessment")} className="text-sm font-bold underline underline-offset-2 flex items-center gap-0.5" style={{ color: WB_GREEN }} data-testid="link-promo-cta">
          Claim Offer <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-white shadow-sm" data-testid="header">
      <PromoBanner />
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 overflow-hidden">
          <img src={worcesterBoschLogo} alt="Worcester Bosch Accredited Installer" className="h-6 md:h-8 w-auto shrink-0" data-testid="img-wb-logo" />
          <div className="hidden md:block h-6 w-px bg-gray-200 shrink-0" />
          <img src={wsbLogo} alt={COMPANY} className="hidden md:block h-3 lg:h-4 w-auto shrink-0" data-testid="img-company-logo" />
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <a href={PHONE_HREF} className="hidden lg:flex items-center gap-2 font-bold text-base" style={{ color: WB_BLUE }} data-testid="link-phone-header">
            <Phone className="w-4 h-4" /><span>{PHONE}</span>
          </a>
          <Button size="sm" onClick={() => scrollTo("book-assessment")} className="text-white font-semibold text-xs md:text-sm whitespace-nowrap" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} data-testid="button-header-cta">
            Free Assessment
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      className="relative w-full"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroLifestyle})` }}
        data-testid="img-hero-lifestyle"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/50" />
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 lg:py-36">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-white" style={{ backgroundColor: WB_BLUE }} data-testid="badge-spring-promo">
            <Zap className="w-4 h-4" style={{ color: WB_GREEN }} /> Spring Promotion - Save Up To &pound;500
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight" style={{ color: WB_BLUE }} data-testid="text-hero-headline">
            Is Your Boiler<br />Costing You<br />Money?
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-lg">
            If your boiler is over 10 years old, you could be wasting hundreds of pounds a year. Book a free, no-obligation home heating assessment today.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button size="lg" onClick={() => scrollTo("book-assessment")} className="text-white font-bold text-base px-8" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} data-testid="button-hero-cta">
              Book Free Assessment
            </Button>
            <a href={PHONE_HREF} data-testid="link-phone-hero">
              <Button size="lg" variant="outline" className="font-bold text-base px-8 gap-2 border-gray-300 text-gray-800 bg-white/70 backdrop-blur-sm">
                <Phone className="w-5 h-5" /> {PHONE}
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6" data-testid="hero-trust-logos">
            <img src={gasSafeLogo} alt="Gas Safe Registered" className="h-10 w-auto" />
            <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-7 w-auto" />
            <img src={checkatradeLogo} alt="Checkatrade" className="h-6 w-auto" />
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <span className="text-sm font-bold text-gray-800">4.8/5</span>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <img src={whichBestBuy} alt="Which? Best Buy 2025" className="h-14 w-auto" />
            <div>
              <p className="font-bold text-sm" style={{ color: WB_BLUE }}>Which? Best Buy 2025</p>
              <p className="text-gray-500 text-xs">Recommended by Which? magazine</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    {
      name: "Greenstar 2000",
      price: "From £1,895",
      image: boiler2000Img,
      popular: false,
      features: ["Up to 94% efficiency", "Compact design", "7 year warranty", "Quiet operation", "Easy controls", "Budget-friendly"],
      desc: "Great value for smaller homes",
    },
    {
      name: "Greenstar 4000",
      price: "From £2,395",
      image: boiler4000Img,
      popular: true,
      features: ["Up to 94% efficiency", "Which? Best Buy 2025", "10 year warranty", "Smart thermostat ready", "Quiet Mark certified", "Most popular choice"],
      desc: "Our most recommended boiler",
    },
    {
      name: "Greenstar 8000 Style",
      price: "From £2,995",
      image: boiler8000Img,
      popular: false,
      features: ["Up to 94% efficiency", "Which? Best Buy 2025", "10 year warranty", "Built-in smart controls", "Premium black finish", "Sleek wall-mounted design"],
      desc: "Premium design for modern homes",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white" data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Worcester Bosch Greenstar Range</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Choose Your New Boiler</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">All prices include full installation, system flush, and waste removal. Finance options available.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`relative overflow-visible flex flex-col h-full ${tier.popular ? "ring-2" : ""}`} style={tier.popular ? { borderColor: WB_GREEN, boxShadow: `0 0 0 2px ${WB_GREEN}` } : {}} data-testid={`card-pricing-${i}`}>
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-md text-white text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: WB_GREEN }} data-testid="badge-most-popular">
                    Most Popular
                  </div>
                )}
                <div className="p-6 pb-4 flex flex-col items-center gap-2 border-b border-gray-100" style={{ backgroundColor: tier.popular ? "#F0FAF0" : "#F8F9FA" }}>
                  <img src={tier.image} alt={tier.name} className="h-60 md:h-72 w-auto object-contain" loading="lazy" data-testid={`img-boiler-${i}`} />
                  <h3 className="text-lg font-bold mt-1" style={{ color: WB_BLUE }}>{tier.name}</h3>
                  <p className="text-xs text-gray-500">{tier.desc}</p>
                  <p className="text-2xl font-black" style={{ color: WB_GREEN }}>{tier.price}</p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: WB_GREEN }} />{f}
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" onClick={() => scrollTo("book-assessment")} className="w-full mt-6 text-white font-bold" style={{ backgroundColor: tier.popular ? WB_GREEN : WB_BLUE, borderColor: tier.popular ? WB_GREEN : WB_BLUE }} data-testid={`button-pricing-cta-${i}`}>
                    Get Free Quote
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">All installations include up to 10 year Worcester Bosch guarantee when installed by an accredited installer</p>
        </div>
        <div className="mt-6 max-w-3xl mx-auto">
          <div className="rounded-md px-6 py-4 text-center flex flex-wrap items-center justify-center gap-2" style={{ backgroundColor: "#FFF3E0", border: "1px solid #FFE0B2" }} data-testid="urgency-banner">
            <Clock className="w-5 h-5 shrink-0" style={{ color: "#E65100" }} />
            <p className="text-sm font-semibold" style={{ color: "#E65100" }}>
              Spring offer ends 31st March &mdash; limited installations remaining at this price.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const benefits = [
    { title: "Gas Safe Registered", desc: "All our engineers are fully Gas Safe registered and certified.", logo: gasSafeLogo, logoH: "h-12" },
    { title: "Worcester Bosch Accredited", desc: "Official accredited installer with manufacturer-backed guarantees.", logo: worcesterBoschLogo, logoH: "h-9" },
    { title: "Checkatrade Verified", desc: "Vetted and reviewed on Checkatrade with excellent ratings.", logo: checkatradeLogo, logoH: "h-8" },
    { title: "Which? Best Buy Boilers", desc: "We install Which? Best Buy award-winning boilers.", logo: whichBestBuy, logoH: "h-14" },
    { title: "4.8 Star Rated", desc: "Trusted by hundreds of homeowners across Medway and Kent.", stars: true },
    { title: "LEAP Approved", desc: "Approved provider for energy efficiency improvements.", logo: leapLogo, logoH: "h-10" },
  ];

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#F8F9FA" }} data-testid="section-why-choose-us">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Trusted Professionals</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Why Choose {COMPANY}?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <Card key={i} className="p-6 text-center flex flex-col items-center gap-3" data-testid={`card-benefit-${i}`}>
              <div className="h-16 flex items-center justify-center">
                {b.stars ? (
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(n => <Star key={n} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}</div>
                ) : (
                  <img src={b.logo} alt={b.title} className={`${b.logoH} w-auto object-contain`} />
                )}
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

function HowItWorks() {
  const steps = [
    { icon: <Calendar className="w-7 h-7 text-white" />, title: "Book Your Free Assessment", desc: "Call us or fill in the form. We'll arrange a convenient time to visit your home. No obligation." },
    { icon: <ClipboardCheck className="w-7 h-7 text-white" />, title: "We Assess Your Heating", desc: "Our Gas Safe engineer checks your current system, insulation, and calculates your potential savings." },
    { icon: <FileText className="w-7 h-7 text-white" />, title: "Get Your Savings Report", desc: "We'll show you exactly how much you could save and recommend the best boiler for your home." },
  ];

  return (
    <section className="py-14 md:py-16 bg-white" data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center space-y-3">
              <div className="relative mx-auto">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: WB_BLUE }}>
                  {s.icon}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full text-white font-bold flex items-center justify-center text-xs" style={{ backgroundColor: WB_GREEN }}>{i + 1}</div>
              </div>
              <h3 className="text-base font-bold" style={{ color: WB_BLUE }} data-testid={`text-step-${i + 1}`}>{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md overflow-hidden shadow-md">
            <img src={engineerImg} alt="Worcester Bosch accredited engineer installing a boiler" className="w-full h-44 md:h-56 object-cover" loading="lazy" data-testid="img-engineer" />
          </div>
          <div className="rounded-md overflow-hidden shadow-md">
            <img src={utilityRoomImg} alt="Greenstar 4000 installed in a modern utility room" className="w-full h-44 md:h-56 object-cover" loading="lazy" data-testid="img-utility-room" />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatHappensNext() {
  const nextSteps = [
    { icon: <Calendar className="w-6 h-6" style={{ color: WB_GREEN }} />, title: "Book Your Free Assessment", desc: "Fill in the form or call us. We'll arrange a time that suits you. Completely free, no obligation." },
    { icon: <ShieldCheck className="w-6 h-6" style={{ color: WB_GREEN }} />, title: "We Visit & Recommend", desc: "Our Gas Safe engineer visits your home, checks your current system, and recommends the right boiler for your needs." },
    { icon: <Users className="w-6 h-6" style={{ color: WB_GREEN }} />, title: "You Decide - No Pressure", desc: "Take your time. There's no hard sell, no pressure. You choose whether to go ahead in your own time." },
    { icon: <Rocket className="w-6 h-6" style={{ color: WB_GREEN }} />, title: "Installed in 48 Hours", desc: "If you choose to go ahead, we can have your new boiler installed in as little as 48 hours." },
  ];

  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F9FA" }} data-testid="section-what-happens-next">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Risk-Free Process</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What Happens Next?</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">From booking to installation, we make the whole process simple and pressure-free.</p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {nextSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4" data-testid={`card-next-step-${i}`}>
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 shadow-sm" style={{ borderColor: WB_GREEN }}>
                  {step.icon}
                </div>
                <span className="text-xs font-black w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: WB_BLUE }}>{i + 1}</span>
              </div>
              <div className="pt-1">
                <h3 className="font-bold mb-1" style={{ color: WB_BLUE }}>{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button size="lg" onClick={() => scrollTo("book-assessment")} className="text-white font-bold px-8" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} data-testid="button-next-steps-cta">
            Get Started - It's Free
          </Button>
        </div>
      </div>
    </section>
  );
}

function SavingsSection() {
  return (
    <section className="py-14 md:py-16 bg-white" data-testid="section-savings">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: WB_GREEN }}>Energy Savings</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>How Much Could You Save?</h2>
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
              <table className="w-full text-sm" data-testid="savings-table">
                <thead>
                  <tr style={{ backgroundColor: WB_BLUE }}>
                    <th className="text-left text-white font-semibold py-3 px-4">Boiler Age</th>
                    <th className="text-left text-white font-semibold py-3 px-4">Efficiency</th>
                    <th className="text-right text-white font-semibold py-3 px-4">Annual Saving</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { age: "10-15 years", eff: "~75%", saving: "Up to £250/yr" },
                    { age: "15-20 years", eff: "~65%", saving: "Up to £380/yr" },
                    { age: "20+ years", eff: "~55%", saving: "Up to £500/yr" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"} data-testid={`savings-row-${i}`}>
                      <td className="py-3 px-4 font-semibold" style={{ color: WB_BLUE }}>{row.age}</td>
                      <td className="py-3 px-4 text-gray-500">{row.eff}</td>
                      <td className="py-3 px-4 text-right font-bold text-green-600">{row.saving}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400">Based on average UK gas consumption. Actual savings depend on home size and usage.</p>
            <Button size="lg" onClick={() => scrollTo("book-assessment")} className="text-white font-bold" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} data-testid="button-savings-cta">
              Get Your Free Savings Report
            </Button>
          </div>
          <div className="hidden md:flex flex-col items-center gap-6">
            <img src={boilerPackShot} alt="Worcester Bosch Greenstar range" className="max-w-sm w-full rounded-md" loading="lazy" data-testid="img-boiler-range" />
            <div className="flex items-center gap-4 bg-white rounded-md px-5 py-4 shadow-sm border border-gray-100">
              <img src={whichBestBuy} alt="Which? Best Buy 2025" className="h-14 w-auto object-contain" loading="lazy" />
              <div>
                <p className="font-bold text-sm" style={{ color: WB_BLUE }}>Which? Best Buy 2025</p>
                <p className="text-xs text-gray-500">Recommended by Which? magazine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmartControlSection() {
  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F9FA" }} data-testid="section-smart-control">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-md overflow-hidden shadow-md">
            <img src={easyControlImg} alt="Homeowner adjusting Worcester Bosch EasyControl thermostat" className="w-full h-auto object-cover" loading="lazy" data-testid="img-easycontrol" />
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: WB_GREEN }}>Smart Heating</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>Control Your Heating From Anywhere</h2>
            <p className="text-gray-600">
              Every Greenstar 4000 and 8000 installation includes the option to add the Worcester Bosch EasyControl smart thermostat. Control your heating room by room from your phone, set schedules, and save even more on energy bills.
            </p>
            <ul className="space-y-2">
              {["Room-by-room temperature control", "Set schedules from your phone", "Works with Amazon Alexa & Google Home", "Automatically adjusts to weather changes"].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: WB_GREEN }} />{f}
                </li>
              ))}
            </ul>
          </div>
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
    <section className="py-14 md:py-16 bg-white" data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: WB_GREEN }}>Real Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: WB_BLUE }}>What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <Card key={i} className="p-5 h-full flex flex-col gap-3" data-testid={`card-review-${i}`}>
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
    { q: "Is the assessment really free?", a: "Yes, completely free with no obligation. Our engineer will assess your current heating system and provide an honest recommendation." },
    { q: "How long does the assessment take?", a: "About 30-45 minutes. Our engineer will check your current boiler, assess your home's heating needs, and calculate potential savings." },
    { q: "Will I be pressured to buy?", a: "Absolutely not. The assessment is informational. We'll show you the facts and let you make your own decision in your own time." },
    { q: "How much could I really save?", a: "Depending on the age and condition of your current boiler, savings typically range from £200 to £500 per year on energy bills." },
    { q: "What areas do you cover?", a: "We cover Medway, Kent and surrounding areas including Chatham, Rochester, Gillingham, Rainham, Strood and more." },
    { q: "What warranties do you offer?", a: "As a Worcester Bosch Accredited Installer, we can offer up to 10 year manufacturer-backed guarantees on Greenstar boilers." },
  ];

  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F9FA" }} data-testid="section-faq">
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

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [showFields, setShowFields] = useState(false);
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
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-form-heading">
              Find Out How Much<br />You Could Save
            </h2>
            <p className="text-blue-200 text-lg">
              Book your free, no-obligation home heating assessment today. Our Gas Safe registered engineer will visit your home and show you exactly how much you could save.
            </p>
            <ul className="space-y-3 text-blue-100">
              {["Completely free assessment", "No obligation to proceed", "Gas Safe registered engineer", "Honest advice, no pressure", "Up to £500 spring saving"].map((t, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 shrink-0" style={{ color: WB_GREEN }} />{t}</li>
              ))}
            </ul>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <img src={gasSafeLogo} alt="Gas Safe" className="h-10 w-auto" />
              <img src={worcesterBoschLogo} alt="Worcester Bosch" className="h-8 w-auto brightness-0 invert" />
              <img src={checkatradeLogo} alt="Checkatrade" className="h-6 w-auto brightness-0 invert" />
            </div>
            <div className="pt-2">
              <p className="text-blue-200 text-sm mb-2">Or call us free:</p>
              <a href={PHONE_HREF} className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3" data-testid="link-phone-final"><Phone className="w-7 h-7" />{PHONE}</a>
            </div>
          </div>
          <Card className="p-6 md:p-8" data-testid="card-form">
            {submitted ? (
              <div className="text-center py-8 space-y-4" data-testid="form-success">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                <h3 className="text-xl font-bold" style={{ color: WB_BLUE }}>Thank You!</h3>
                <p className="text-gray-500">We'll be in touch shortly to arrange your free home heating assessment.</p>
              </div>
            ) : !showFields ? (
              <div className="text-center py-6 space-y-5" data-testid="form-step-1">
                <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E8F5E9" }}>
                  <Zap className="w-7 h-7" style={{ color: WB_GREEN }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: WB_BLUE }}>Get Your Free Quote</h3>
                <p className="text-sm text-gray-500">Find out how much you could save on your energy bills with a new Worcester Bosch boiler.</p>
                <ul className="text-left text-sm text-gray-500 space-y-2 max-w-xs mx-auto">
                  {["100% free, no obligation", "Takes less than 60 seconds", "No pressure, ever"].map((t, i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 shrink-0" style={{ color: WB_GREEN }} />{t}</li>
                  ))}
                </ul>
                <Button size="lg" onClick={() => setShowFields(true)} className="w-full text-white font-bold text-lg" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} data-testid="button-get-quote">
                  Get My Free Quote
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} data-testid="form-step-2">
                  <h3 className="text-xl font-bold mb-1" style={{ color: WB_BLUE }}>Almost There!</h3>
                  <p className="text-sm text-gray-500 mb-5">Just 3 quick details and we'll get back to you.</p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4" data-testid="form-assessment">
                      <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Full Name" {...field} data-testid="input-name" /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" type="tel" {...field} data-testid="input-phone" /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="postcode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postcode" {...field} data-testid="input-postcode" /></FormControl><FormMessage /></FormItem>)} />
                      <Button type="submit" size="lg" className="text-white font-bold w-full" style={{ backgroundColor: WB_GREEN, borderColor: WB_GREEN }} disabled={mutation.isPending} data-testid="button-submit-form">
                        {mutation.isPending ? "Submitting..." : "Book Your Free Assessment"}
                      </Button>
                      <p className="text-xs text-center text-gray-400">100% free. No obligation. No pressure.</p>
                    </form>
                  </Form>
                </motion.div>
              </AnimatePresence>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-gray-500 py-12 pb-28 md:pb-12 bg-white border-t border-gray-100" data-testid="footer">
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
              <li>Greenstar 2000</li>
              <li>Greenstar 4000</li>
              <li>Greenstar 8000 Style</li>
              <li>EasyControl Smart Thermostat</li>
              <li>System Upgrades</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm mb-3" style={{ color: WB_BLUE }}>Contact</p>
            <a href={PHONE_HREF} className="flex items-center gap-2 font-bold text-lg mb-3" style={{ color: WB_BLUE }} data-testid="link-phone-footer">
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <p className="text-sm">Free, no-obligation assessments</p>
            <p className="text-sm">Monday - Saturday, 8am - 6pm</p>
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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden shadow-lg" data-testid="sticky-mobile-cta">
      <div className="flex">
        <a href={PHONE_HREF} className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 text-base" style={{ backgroundColor: WB_GREEN }} data-testid="link-phone-sticky">
          <Phone className="w-5 h-5" /> Call {PHONE}
        </a>
        <button onClick={() => scrollTo("book-assessment")} className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 text-base" style={{ backgroundColor: WB_BLUE }} data-testid="button-sticky-form">
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
      <PricingSection />
      <WhyChooseUs />
      <HowItWorks />
      <WhatHappensNext />
      <SavingsSection />
      <SmartControlSection />
      <Testimonials />
      <FAQ />
      <LeadForm />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
