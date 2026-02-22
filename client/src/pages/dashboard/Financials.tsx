import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import DashboardLayout from "./DashboardLayout";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#14b8a6"];

export default function Financials() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/dashboard/financials"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/financials", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 60000,
  });

  if (isLoading) return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Financials</h2>
        <Skeleton className="h-80 rounded-xl" />
        <div className="grid grid-cols-2 gap-6"><Skeleton className="h-80 rounded-xl" /><Skeleton className="h-80 rounded-xl" /></div>
      </div>
    </DashboardLayout>
  );

  const pnl = data?.monthlyPnl || [];
  const expenses = data?.expensesByCategory || [];
  const income = data?.incomeByCustomer || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Financials</h2>

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
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={expenses} dataKey="total_spent" nameKey="category" cx="50%" cy="50%" outerRadius={100} label={({ category, total_spent }: any) => `${category}: £${Math.round(total_spent)}`} labelLine={false}>
                    {expenses.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `£${Number(v || 0).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Income by Customer */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Income by Customer</CardTitle></CardHeader>
            <CardContent className="p-0">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
