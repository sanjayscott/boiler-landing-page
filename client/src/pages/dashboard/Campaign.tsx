import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import DashboardLayout from "./DashboardLayout";

const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899"];
const SEGMENT_COLORS: Record<string, string> = { HOT: "#ef4444", WARM: "#f59e0b", COLD: "#3b82f6" };

export default function Campaign() {
  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["/api/dashboard/campaign"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/campaign", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 60000,
    refetchInterval: 120000,
  });

  if (isLoading) return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Campaign</h2>
        <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}</div>
      </div>
    </DashboardLayout>
  );

  const stats = data?.targetStats?.[0] || {};
  const movers = data?.mailable?.[0] || {};
  const segments = data?.newMoversSummary || [];
  const tiers = data?.boilerTiers || [];
  const hotPostcodes = data?.hotPostcodes || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Campaign</h2>
          {dataUpdatedAt > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Updated {(() => { const s = Math.floor((Date.now() - dataUpdatedAt) / 1000); return s < 60 ? "just now" : s < 3600 ? `${Math.floor(s / 60)}m ago` : `${Math.floor(s / 3600)}h ago`; })()}</span>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Campaign Targets</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{Number(stats.total || 0).toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Poor EPC (D-G)</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-red-600">{Number(stats.poor_epc || 0).toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">New Movers</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-blue-600">{Number(movers.total || 0).toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Mailable (with names)</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-green-600">{Number(movers.with_names || 0).toLocaleString()}</p></CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Segment Breakdown */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">New Movers by Segment</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={segments.filter((s: any) => s.campaign_segment)} dataKey="total" nameKey="campaign_segment" cx="50%" cy="50%" outerRadius={90} label={({ campaign_segment, total }: any) => `${campaign_segment}: ${total}`}>
                    {segments.filter((s: any) => s.campaign_segment).map((s: any, i: number) => <Cell key={i} fill={SEGMENT_COLORS[s.campaign_segment] || COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Boiler Tiers */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Boiler Tier Distribution</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={tiers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="boiler_tier" width={160} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Hot Postcodes */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Hot Postcodes (Top 20)</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Postcode</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotPostcodes.slice(0, 20).map((row: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm font-medium">{row.postcode || row.district || "—"}</TableCell>
                    <TableCell className="text-sm text-right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
