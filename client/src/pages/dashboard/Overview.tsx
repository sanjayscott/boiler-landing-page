import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import DashboardLayout from "./DashboardLayout";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];
const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6", responded: "#f59e0b", shortlisted: "#f97316", quoted: "#8b5cf6",
  won: "#10b981", done: "#059669", declined: "#ef4444",
};

export default function Overview() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/dashboard/overview"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/overview", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 60000,
  });

  if (isLoading) return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </DashboardLayout>
  );

  const kpis = data?.leads?.[0] || {};
  const pipeline = data?.pipeline || [];
  const platforms = data?.platformCounts || [];
  const revenue = (data?.monthlyRevenue || []).reverse();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>

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
