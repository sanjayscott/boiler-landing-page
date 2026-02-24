import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Loader2, Bot } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];
const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6", responded: "#f59e0b", shortlisted: "#f97316", quoted: "#8b5cf6",
  won: "#10b981", done: "#059669", declined: "#ef4444",
};

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ago`;
}

export default function Overview() {
  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["/api/dashboard/overview"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/overview", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 60000,
    refetchInterval: 120000,
  });

  const { data: autoData } = useQuery({
    queryKey: ["/api/dashboard/automation"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/automation", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 60000,
    refetchInterval: 120000,
  });

  if (isLoading) return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-sm text-gray-500">Loading overview...</p>
      </div>
    </DashboardLayout>
  );

  const kpis = data?.leads?.[0] || {};
  const pipeline = data?.pipeline || [];
  const platforms = data?.platformCounts || [];
  const revenue = (data?.monthlyRevenue || []).reverse();

  const autoStats = autoData || {};
  const todayTotal = Number(autoStats.today_total || 0);
  const todayResponded = Number(autoStats.today_responded || 0);
  const todayDeclined = Number(autoStats.today_declined || 0);
  const successRate = todayTotal > 0 ? Math.round((todayResponded / todayTotal) * 100) : 0;
  const lastActivity = autoStats.last_activity ? new Date(autoStats.last_activity) : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          {dataUpdatedAt > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Updated {timeAgo(new Date(dataUpdatedAt))}</span>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Leads</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{kpis.total || 0}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">This Week</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-blue-600">{kpis.this_week || 0}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Won / Done</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-green-600">{kpis.won || 0}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">New (unactioned)</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-amber-600">{kpis.new_leads || 0}</p></CardContent>
          </Card>
        </div>

        {/* MyBuilder Auto Stats */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <CardTitle className="text-sm font-medium">MyBuilder Auto (Today)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Responded</p>
                <p className="text-2xl font-bold text-green-600">{todayResponded}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Declined</p>
                <p className="text-2xl font-bold text-red-600">{todayDeclined}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold">{successRate}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Activity</p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {lastActivity
                    ? lastActivity.toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Lead Pipeline</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={pipeline} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="status" width={90} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="cnt" name="Leads">
                    {pipeline.map((entry: any, i: number) => (
                      <Cell key={i} fill={STATUS_COLORS[entry.status] || COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Platform Split */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Leads by Platform</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={platforms} dataKey="cnt" nameKey="platform" cx="50%" cy="50%" outerRadius={90} label={({ platform, cnt }: any) => `${platform} (${cnt})`}>
                    {platforms.map((_: any, i: number) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend */}
        {revenue.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Monthly Income vs Expenses</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: any) => `£${Number(v || 0).toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" dot={false} />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" dot={false} />
                  <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={2} name="Net" strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
