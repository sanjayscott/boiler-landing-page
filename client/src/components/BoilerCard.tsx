import { Check, Shield } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BoilerFeature {
  text: string;
}

interface BoilerCardProps {
  model: string;
  category: "Entry Level" | "Mid Range" | "Premium";
  description: string;
  features: BoilerFeature[];
  guaranteeYears: number;
  priceEstimate: string;
  imageUrl: string;
  popular?: boolean;
  onSelect: () => void;
}

export function BoilerCard({
  model,
  category,
  description,
  features,
  guaranteeYears,
  priceEstimate,
  imageUrl,
  popular,
  onSelect,
}: BoilerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className={`h-full flex flex-col relative ${popular ? 'border-2 border-[#005F9E] shadow-xl scale-105 z-10' : ''}`} data-testid={`card-boiler-${model}`}>
        {popular && (
          <div className="absolute top-0 right-0 bg-[#005F9E] text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
            MOST POPULAR
          </div>
        )}

        <div className="relative h-48 overflow-hidden bg-gray-100 group rounded-t-md">
          <div className="absolute inset-0 bg-gradient-to-t from-[#003d66]/70 to-transparent z-10" />
          <img
            src={imageUrl}
            alt={`Worcester Bosch Greenstar ${model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-4 left-4 z-20 text-white">
            <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm border-none text-white">
              {category}
            </Badge>
            <h3 className="text-2xl font-bold leading-none">Greenstar {model}</h3>
          </div>
        </div>

        <CardHeader className="pb-2">
          <p className="text-sm text-muted-foreground min-h-[60px]">{description}</p>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex items-center gap-2 mb-4 p-2 bg-[#005F9E]/5 text-[#005F9E] rounded-md text-sm font-medium">
            <Shield className="w-4 h-4" />
            <span>{guaranteeYears} Year Guarantee</span>
          </div>

          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-[#007BC0] mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{feature.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-2 flex flex-col gap-3">
          <div className="text-center w-full">
            <span className="text-sm text-muted-foreground">From</span>
            <div className="text-2xl font-bold text-[#005F9E]">{priceEstimate}</div>
          </div>
          <Button
            onClick={onSelect}
            variant={popular ? "default" : "outline"}
            className="w-full"
            data-testid={`button-quote-${model}`}
          >
            Get a Quote
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
