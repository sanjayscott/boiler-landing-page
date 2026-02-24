import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "./DashboardLayout";

const statusVariant: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  responded: "bg-yellow-100 text-yellow-800",
  shortlisted: "bg-orange-100 text-orange-800",
  quoted: "bg-purple-100 text-purple-800",
  won: "bg-green-100 text-green-800",
  done: "bg-emerald-100 text-emerald-800",
  declined: "bg-red-100 text-red-800",
};

const platformLabel: Record<string, string> = {
  myjobquote: "MyJobQuote",
  bark: "Bark",
  rated_people: "Rated People",
  mybuilder: "MyBuilder",
};

export default function Leads() {
  const [platform, setPlatform] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);

  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["/api/dashboard/leads", platform, status, search],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "500" });
      if (platform && platform !== "all") params.set("platform", platform);
      if (status && status !== "all") params.set("status", status);
      if (search) params.set("search", search);
      const res = await fetch(`/api/dashboard/leads?${params}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 30000,
    refetchInterval: 120000,
  });

  const leads = data?.leads || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Leads</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{leads.length} results</span>
            {dataUpdatedAt > 0 && (
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Updated {(() => { const s = Math.floor((Date.now() - dataUpdatedAt) / 1000); return s < 60 ? "just now" : s < 3600 ? `${Math.floor(s / 60)}m ago` : `${Math.floor(s / 3600)}h ago`; })()}</span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-44"><SelectValue placeholder="All platforms" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              <SelectItem value="myjobquote">MyJobQuote</SelectItem>
              <SelectItem value="bark">Bark</SelectItem>
              <SelectItem value="rated_people">Rated People</SelectItem>
              <SelectItem value="mybuilder">MyBuilder</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40"><SelectValue placeholder="All statuses" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="responded">Responded</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Search title, name, location..." className="max-w-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-3">{[1,2,3,4,5].map(i => <Skeleton key={i} className="h-10" />)}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead: any) => (
                    <TableRow key={lead.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelected(lead)}>
                      <TableCell className="text-xs font-medium">{platformLabel[lead.platform] || lead.platform}</TableCell>
                      <TableCell className="max-w-[300px] truncate text-sm">{lead.title}</TableCell>
                      <TableCell className="text-sm text-gray-600">{lead.location || "—"}</TableCell>
                      <TableCell className="text-sm">{lead.customer_name || "—"}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusVariant[lead.status] || "bg-gray-100 text-gray-800"}`}>
                          {lead.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">{lead.lead_date ? new Date(lead.lead_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }) : "—"}</TableCell>
                    </TableRow>
                  ))}
                  {leads.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-500">No leads found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Detail Sheet */}
        <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
          <SheetContent className="w-[400px] sm:w-[500px] overflow-y-auto">
            {selected && (
              <>
                <SheetHeader>
                  <SheetTitle>{selected.title}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Platform</span><p className="font-medium">{platformLabel[selected.platform] || selected.platform}</p></div>
                    <div><span className="text-gray-500">Status</span><p><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusVariant[selected.status] || ""}`}>{selected.status}</span></p></div>
                    <div><span className="text-gray-500">Location</span><p className="font-medium">{selected.location || "—"}</p></div>
                    <div><span className="text-gray-500">Distance</span><p className="font-medium">{selected.distance_miles ? `${selected.distance_miles} mi` : "—"}</p></div>
                    <div><span className="text-gray-500">Customer</span><p className="font-medium">{selected.customer_name || "—"}</p></div>
                    <div><span className="text-gray-500">Job Type</span><p className="font-medium">{selected.job_type || "—"}</p></div>
                    <div><span className="text-gray-500">Date</span><p className="font-medium">{selected.lead_date ? new Date(selected.lead_date).toLocaleDateString("en-GB") : "—"}</p></div>
                  </div>
                  {selected.description && (
                    <div>
                      <span className="text-sm text-gray-500">Description</span>
                      <p className="mt-1 text-sm bg-gray-50 rounded-lg p-3">{selected.description}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
