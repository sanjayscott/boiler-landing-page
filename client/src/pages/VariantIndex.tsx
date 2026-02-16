import { Link } from "wouter";
import worcesterBoschLogo from "@assets/worcester-bosch-logo_(2)_1771281246798.png";

const variants = [
  { path: "/v1", title: "Original Landing Page", description: "The original design with hero image, 3-tier pricing, testimonials, FAQ and lead form." },
  { path: "/v2", title: "Worcester Bosch Branded", description: "Deep blue hero, white text, WB green accent CTAs. Clean corporate feel like worcester-bosch.co.uk." },
  { path: "/v3", title: "Single Boiler Focus", description: "Only the Greenstar 4000 at \u00a32,199. Clean, minimal, one product one price." },
  { path: "/v4", title: "Premium LED", description: "8000 Life as hero product. Aspirational, luxury feel. Dark navy with gold/amber accents." },
  { path: "/v5", title: "Spring Seasonal", description: "Spring Boiler Upgrade Event with time-limited urgency. Countdown and seasonal messaging." },
  { path: "/v6", title: "Finance LED", description: "Monthly payment focus \u2014 \u00a337/month headline. Removes price shock with finance-first messaging." },
  { path: "/v7", title: "Social Proof Heavy", description: "Reviews and testimonials dominate above the fold. 5-star ratings prominent." },
  { path: "/v8", title: "Minimal", description: "Ultra-clean. Hero + CTA, pricing cards, and form only. Zero friction." },
  { path: "/v9", title: "Comparison Table", description: "Side-by-side comparison: WSB vs Boxt vs British Gas. Makes WSB the clear winner." },
  { path: "/v10", title: "Free Assessment Only", description: "No prices shown. Pure lead generation focused on energy savings." },
];

export default function VariantIndex() {
  return (
    <div className="min-h-screen bg-[#00205B]" data-testid="variant-index">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 space-y-4">
          <img
            src={worcesterBoschLogo}
            alt="Worcester Bosch"
            className="h-10 md:h-14 w-auto mx-auto mb-6"
            data-testid="img-wb-logo"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Landing Page Variations
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto">
            10 unique landing page designs for Worcester Bosch boiler installations by We Install Boilers Ltd.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {variants.map((v, i) => (
            <Link key={v.path} href={v.path}>
              <div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-5 space-y-2 cursor-pointer transition-colors duration-150"
                style={{ ["--elevate-1" as string]: "rgba(255,255,255,0.06)" }}
                data-testid={`link-variant-${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#78BE20] text-[#00205B] font-bold text-sm shrink-0">
                    {i + 1}
                  </span>
                  <h2 className="text-white font-bold text-lg">{v.title}</h2>
                </div>
                <p className="text-blue-200 text-sm leading-relaxed">{v.description}</p>
                <span className="text-[#78BE20] text-sm font-semibold inline-block pt-1">{v.path} &rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 text-blue-300 text-sm">
          <p>All forms submit to the same /api/leads endpoint. Phone: 0800 048 5737</p>
        </div>
      </div>
    </div>
  );
}
