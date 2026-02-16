import { ShieldCheck, Zap, Thermometer, PenTool, PiggyBank, Clock } from "lucide-react";

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
    icon: PenTool,
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Why Choose Worcester Bosch?</h2>
          <p className="text-muted-foreground text-lg">
            Voted the UK's best boiler brand for 14 years running by Which? consumer surveys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
