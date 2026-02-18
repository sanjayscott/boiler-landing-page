import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import VariantIndex from "@/pages/VariantIndex";
import Home from "@/pages/Home";
import V2 from "@/pages/V2";
import V3 from "@/pages/V3";
import V4 from "@/pages/V4";
import V5 from "@/pages/V5";
import V6 from "@/pages/V6";
import V7 from "@/pages/V7";
import V8 from "@/pages/V8";
import V9 from "@/pages/V9";
import V10 from "@/pages/V10";
import V10a from "@/pages/V10a";
import V10b from "@/pages/V10b";
import V10f from "@/pages/V10f";
import V10h from "@/pages/V10h";
import V11 from "@/pages/V11";
import V11HeroTest from "@/pages/V11HeroTest";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VariantIndex} />
      <Route path="/v1" component={Home} />
      <Route path="/v2" component={V2} />
      <Route path="/v3" component={V3} />
      <Route path="/v4" component={V4} />
      <Route path="/v5" component={V5} />
      <Route path="/v6" component={V6} />
      <Route path="/v7" component={V7} />
      <Route path="/v8" component={V8} />
      <Route path="/v9" component={V9} />
      <Route path="/v10" component={V10} />
      <Route path="/v10a" component={V10a} />
      <Route path="/v10b" component={V10b} />
      <Route path="/v10f" component={V10f} />
      <Route path="/v10h" component={V10h} />
      <Route path="/v11" component={V11} />
      <Route path="/v11-heroes" component={V11HeroTest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
