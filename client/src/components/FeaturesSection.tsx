import { ShieldCheck, Zap, Thermometer, Award, PiggyBank, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Up to 12 Year Guarantee",
    description: "Peace of mind with market-leading warranties on all Greenstar boilers."
  },
  {
    icon: Zap,
    title: "A-Rated Efficiency",
    description: "94% efficiency rating helps reduce your energy bills and carbon footprint."
  },
  {
    icon: Award,
    title: "Award Winning Design",
    description: "Sleek, modern units designed to fit seamlessly into your home environment."
  },
  {
    icon: Thermometer,
    title: "Smart Control Ready",
    description: "Compatible with Bosch EasyControl for heating management from your phone."
  },
  {
    icon: PiggyBank,
    title: "Flexible Finance",
    description: "Spread the cost with 0% interest options available on selected models."
  },
  {
    icon: Clock,
    title: "Fast Installation",
    description: "Expert installation usually completed within 1-2 days with minimal disruption."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-[#005F9E]/[0.03]" data-testid="section-features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-[#007BC0] uppercase tracking-widest mb-2">Why Worcester Bosch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The UK's Most Trusted Boiler Brand</h2>
          <p className="text-muted-foreground text-lg">
            Voted the UK's best boiler brand for over 14 years running by Which? consumer surveys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-feature-${i}`}>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#005F9E]/10 rounded-md flex items-center justify-center mb-6 text-[#005F9E]">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
