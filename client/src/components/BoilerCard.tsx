import { Check, Info } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className={`h-full flex flex-col relative overflow-hidden border-2 transition-colors ${popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-border hover:border-primary/50'}`}>
        {popular && (
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
            MOST POPULAR
          </div>
        )}
        
        <div className="relative h-48 overflow-hidden bg-gray-100 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img 
            src={imageUrl} 
            alt={`Worcester Bosch ${model}`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute bottom-4 left-4 z-20 text-white">
            <Badge variant={popular ? "default" : "secondary"} className="mb-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-none text-white">
              {category}
            </Badge>
            <h3 className="text-2xl font-bold font-display leading-none">Worcester {model}</h3>
          </div>
        </div>

        <CardHeader className="pb-2">
          <p className="text-sm text-muted-foreground min-h-[60px]">{description}</p>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex items-center gap-2 mb-4 p-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium">
            <Info className="w-4 h-4" />
            <span>{guaranteeYears} Year Guarantee</span>
          </div>
          
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{feature.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-2 flex flex-col gap-3">
          <div className="text-center w-full">
            <span className="text-sm text-muted-foreground">From</span>
            <div className="text-2xl font-bold text-secondary">{priceEstimate}</div>
          </div>
          <Button 
            onClick={onSelect} 
            variant={popular ? "default" : "outline"}
            className="w-full"
          >
            Get a Quote
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
