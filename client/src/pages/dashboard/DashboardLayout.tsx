import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, PoundSterling, Target, GitBranch, LogOut, Menu, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/dashboard/leads", label: "Leads", icon: Users },
  { path: "/dashboard/financials", label: "Financials", icon: PoundSterling },
  { path: "/dashboard/campaign", label: "Campaign", icon: Target },
  { path: "/dashboard/pipeline", label: "Pipeline", icon: GitBranch },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/check-auth", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          setLocation("/dashboard/login");
        } else {
          setAuthChecked(true);
        }
      })
      .catch(() => {
        setLocation("/dashboard/login");
      });
  }, [setLocation]);

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const sidebarContent = (
    <>
      <div className="p-6 border-b">
        <h1 className="text-lg font-bold text-gray-900">WSB Dashboard</h1>
        <p className="text-xs text-gray-500 mt-1">We Service Boilers</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path !== "/dashboard" && location.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors",
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Link href="/">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 cursor-pointer">
            <LogOut className="w-4 h-4" />
            Back to site
          </div>
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center gap-3 bg-white border-b px-4 py-3 md:hidden">
        <button onClick={() => setSidebarOpen(true)} className="p-1 rounded-md hover:bg-gray-100">
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-sm font-bold text-gray-900">WSB Dashboard</h1>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full bg-white flex flex-col shadow-xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
