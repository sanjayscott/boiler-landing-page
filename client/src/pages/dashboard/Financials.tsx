import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Loader2 } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#14b8a6"];
const PLATFORM_COLORS: Record<string, string> = {
  mybuilder: "#3b82f6",
  bark: "#10b981",
  rated_people: "#f59e0b",
  myjobquote: "#8b5cf6",
};

function getPresetRange(preset: string): { from: string; to: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  switch (preset) {
    case "tax-year":
      return m < 3
        ? { from: `${y - 1}-04`, to: `${y}-03` }
        : { from: `${y}-04`, to: `${y + 1}-03` };
    case "last-tax-year":
      return m < 3
        ? { from: `${y - 2}-04`, to: `${y - 1}-03` }
        : { from: `${y - 1}-04`, to: `${y}-03` };
    case "quarter": {
      const qStart = new Date(y, Math.floor(m / 3) * 3, 1);
      const qEnd = new Date(y, Math.floor(m / 3) * 3 + 2, 28);
      return {
        from: `${qStart.getFullYear()}-${String(qStart.getMonth() + 1).padStart(2, "0")}`,
        to: `${qEnd.getFullYear()}-${String(qEnd.getMonth() + 1).padStart(2, "0")}`,
      };
    }
    case "6months": {
      const sixAgo = new Date(y, m - 5, 1);
      return {
        from: `${sixAgo.getFullYear()}-${String(sixAgo.getMonth() + 1).padStart(2, "0")}`,
        to: `${y}-${String(m + 1).padStart(2, "0")}`,
      };
    }
    default:
      return { from: "", to: "" };
  }
}

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ago`;
}

export default function Financials() {
  const defaultRange = getPresetRange("tax-year");
  const [from, setFrom] = useState(defaultRange.from);
  const [to, setTo] = useState(defaultRange.to);

  const { data, isLoading, isError, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["/api/dashboard/financials", from, to],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      const res = await fetch(`/api/dashboard/financials?${params}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 60000,
    refetchInterval: 120000,
  });

  const applyPreset = (preset: string) => {
    if (preset === "all") {
      setFrom("");
      setTo("");
    } else {
      const range = getPresetRange(preset);
      setFrom(range.from);
      setTo(range.to);
    }
  };

  if (isLoading) return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-sm text-gray-500">Loading financials...</p>
      </div>
    </DashboardLayout>
  );

  if (isError) return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <p className="text-sm text-red-600">Failed to load financial data</p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
      </div>
    </DashboardLayout>
  );

  const pnl = data?.monthlyPnl || [];
  const expenses = data?.expensesByCategory || [];
  const income = data?.incomeByCustomer || [];
  const summary = data?.pnlSummary || {};
  const platformSpend = (data?.platformSpend || []).reverse();
  const materialsSpend = (data?.materialsSpend || []).reverse();

  const netProfit = Number(summary.net_profit || 0);
  const rangeLabel = from && to
    ? `${new Date(from + "-01").toLocaleDateString("en-GB", { month: "short", year: "numeric" })} – ${new Date(to + "-01").toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`
    : "All Time";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Financials</h2>
          {dataUpdatedAt > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Updated {timeAgo(new Date(dataUpdatedAt))}</span>
          )}
        </div>

        {/* Date Range Picker */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">From</label>
                <input type="month" value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded-md px-3 py-1.5 text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">To</label>
                <input type="month" value={to} onChange={(e) => setTo(e.target.value)} className="border rounded-md px-3 py-1.5 text-sm" />
              </div>
              <div className="h-6 w-px bg-gray-200 mx-1" />
              <Button variant="outline" size="sm" onClick={() => applyPreset("tax-year")}>This Tax Year</Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("last-tax-year")}>Last Tax Year</Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("quarter")}>This Quarter</Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("6months")}>Last 6 Months</Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("all")}>All Time</Button>
            </div>
          </CardContent>
        </Card>

        {/* P&L Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Income</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">£{Number(summary.total_income || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="text-xs text-gray-400 mt-1">{rangeLabel}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">£{Number(summary.total_expenses || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="text-xs text-gray-400 mt-1">{rangeLabel}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Net Profit</CardTitle></CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                {netProfit >= 0 ? "" : "-"}£{Math.abs(netProfit).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-400 mt-1">{rangeLabel}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Transactions</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{Number(summary.transaction_count || 0).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">{rangeLabel}</p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly P&L */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Monthly Profit & Loss</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={pnl}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: any) => `£${Number(v || 0).toLocaleString()}`} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Breakdown */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Expenses by Category</CardTitle></CardHeader>
            <CardContent>
              {expenses.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={expenses} dataKey="total_spent" nameKey="category" cx="50%" cy="50%" outerRadius={100} label={({ category, total_spent }: any) => `${category}: £${Math.round(total_spent)}`} labelLine={false}>
                      {expenses.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: any) => `£${Number(v || 0).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-gray-500 py-8 text-center">No expense data for this period</p>
              )}
            </CardContent>
          </Card>

          {/* Income by Customer */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Income by Customer</CardTitle></CardHeader>
            <CardContent className="p-0">
              {income.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {income.slice(0, 10).map((row: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm">{row.payee || "Unknown"}</TableCell>
                        <TableCell className="text-sm text-right font-medium">£{Number(row.total_paid || 0).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-gray-500 py-8 text-center">No income data for this period</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Platform Spend */}
        {platformSpend.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Lead Platform Spend by Month</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformSpend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: any) => `£${Number(v || 0).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="mybuilder" fill={PLATFORM_COLORS.mybuilder} name="MyBuilder" stackId="a" />
                  <Bar dataKey="bark" fill={PLATFORM_COLORS.bark} name="Bark" stackId="a" />
                  <Bar dataKey="rated_people" fill={PLATFORM_COLORS.rated_people} name="Rated People" stackId="a" />
                  <Bar dataKey="myjobquote" fill={PLATFORM_COLORS.myjobquote} name="MyJobQuote" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Materials Spend */}
        {materialsSpend.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Materials Spend by Month</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={materialsSpend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: any) => `£${Number(v || 0).toLocaleString()}`} />
                  <Bar dataKey="total_spent" fill="#f59e0b" name="Materials" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
