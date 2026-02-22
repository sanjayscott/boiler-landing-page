import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import DashboardLayout from "./DashboardLayout";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function Pipeline() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/dashboard/pipeline"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/pipeline", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 60000,
  });

  if (isLoading) return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Pipeline</h2>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </DashboardLayout>
  );

  const funnel = data?.funnel || [];
  const declines = data?.declineReasons || [];
  const daily = (data?.dailyActivity || []).reverse();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Pipeline</h2>

        {/* Funnel per platform */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Lead Funnel by Platform</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnel}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_leads" fill="#3b82f6" name="Total" />
                <Bar dataKey="responded" fill="#f59e0b" name="Responded" />
                <Bar dataKey="shortlisted" fill="#f97316" name="Shortlisted" />
                <Bar dataKey="won" fill="#10b981" name="Won" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Rate Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {funnel.map((p: any, i: number) => (
            <Card key={i}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">{p.platform}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{p.total_leads}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {p.response_to_shortlist_pct != null ? `${p.response_to_shortlist_pct}% shortlist rate` : "No conversions yet"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Decline Reasons */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Decline Reasons</CardTitle></CardHeader>
            <CardContent>
              {declines.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={declines.slice(0, 10)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="decline_reason" width={150} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-gray-500 py-8 text-center">No decline data yet</p>
              )}
            </CardContent>
          </Card>

          {/* Daily Activity */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Daily Lead Activity (30 days)</CardTitle></CardHeader>
            <CardContent>
              {daily.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={daily}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="Leads" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-gray-500 py-8 text-center">No daily data yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
