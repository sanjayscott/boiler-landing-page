import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertVisitSchema } from "@shared/schema";
import { z } from "zod";
import cookieParser from "cookie-parser";

// Notification config (set via env vars in Replit Secrets)
// WEBHOOK_URL = n8n webhook (optional, for future automation)
// TELEGRAM_BOT_TOKEN = Telegram bot token for direct notifications
// TELEGRAM_CHAT_ID = Sanjay's Telegram chat ID (8422310768)
const WEBHOOK_URL = process.env.WEBHOOK_URL || "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "8422310768";

// Supabase config
const SUPABASE_URL = "https://agswgxnhbywwdxjhgjjs.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || "";
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || "wsb2026";

async function notifyWebhook(type: string, data: any) {
  // n8n webhook (if configured)
  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data, timestamp: new Date().toISOString() }),
      });
    } catch (e) {
      console.error("Webhook notification failed:", e);
    }
  }

  // Direct Telegram notification
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID && type === "form_submission") {
    const ref = data.ref ? ` (ref: ${data.ref})` : "";
    const epc = data.epc ? ` | EPC: ${data.epc}` : "";
    const source = data.source ? ` | Source: ${data.source}` : "";
    const msg = `🔔 *New Landing Page Lead!*\n\n👤 *${data.name}*\n📞 ${data.phone}\n📍 ${data.postcode}${epc}${ref}${source}\n📝 ${data.notes || "—"}`;
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: "Markdown" }),
      });
    } catch (e) {
      console.error("Telegram notification failed:", e);
    }
  }
}

async function supabaseQuery(path: string, params?: Record<string, string>) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  return res.json();
}

async function supabaseSQL(query: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.use(cookieParser());

  const handleInquiry = async (req: any, res: any) => {
    try {
      const data = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(data);

      // Notify webhook (non-blocking)
      notifyWebhook("form_submission", {
        name: inquiry.name,
        phone: inquiry.phone,
        postcode: inquiry.postcode,
        ref: inquiry.ref,
        epc: inquiry.epc,
        source: inquiry.source,
        notes: inquiry.notes,
      });

      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };

  // Track page visits (QR scans)
  app.post("/api/visits", async (req, res) => {
    try {
      const data = insertVisitSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"] || null,
        ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
      });
      const visit = await storage.createVisit(data);
      res.status(201).json({ ok: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.post("/api/inquiries", handleInquiry);
  app.post("/api/leads", handleInquiry);

  // ============================================================
  // Dashboard API routes
  // ============================================================

  // Dashboard auth - simple password gate
  app.post("/api/dashboard/auth", (req, res) => {
    const { password } = req.body;
    if (password === DASHBOARD_PASSWORD) {
      (req as any).session = (req as any).session || {};
      // Set a cookie
      res.cookie("wsb_dashboard", "authenticated", {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "lax"
      });
      res.json({ ok: true });
    } else {
      res.status(401).json({ error: "Wrong password" });
    }
  });

  // Auth check middleware for dashboard routes
  const dashboardAuth = (req: any, res: any, next: any) => {
    if (req.cookies?.wsb_dashboard === "authenticated") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  app.get("/api/dashboard/check-auth", (req: any, res) => {
    if (req.cookies?.wsb_dashboard === "authenticated") {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

  // Overview KPIs
  app.get("/api/dashboard/overview", dashboardAuth, async (_req, res) => {
    try {
      const [leads, pipeline, platformCounts, monthlyRevenue] = await Promise.all([
        supabaseSQL("SELECT json_agg(row_to_json(t)) FROM (SELECT count(*) as total, count(*) FILTER (WHERE created_at > now() - interval '7 days') as this_week, count(*) FILTER (WHERE status = 'won' OR status = 'done') as won, count(*) FILTER (WHERE status = 'new') as new_leads FROM leads) t"),
        supabaseSQL("SELECT json_agg(row_to_json(t)) FROM (SELECT status, count(*) as cnt FROM leads GROUP BY status ORDER BY CASE status WHEN 'new' THEN 1 WHEN 'responded' THEN 2 WHEN 'shortlisted' THEN 3 WHEN 'quoted' THEN 4 WHEN 'won' THEN 5 WHEN 'done' THEN 6 WHEN 'declined' THEN 7 END) t"),
        supabaseSQL("SELECT json_agg(row_to_json(t)) FROM (SELECT platform, count(*) as cnt FROM leads GROUP BY platform ORDER BY count(*) DESC) t"),
        supabaseSQL("SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM monthly_pnl ORDER BY month DESC LIMIT 12) t"),
      ]);
      res.json({ leads, pipeline, platformCounts, monthlyRevenue });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch overview" });
    }
  });

  // Leads list with filtering
  app.get("/api/dashboard/leads", dashboardAuth, async (req, res) => {
    try {
      const { platform, status, search, limit = "100", offset = "0" } = req.query as any;
      let query = "leads?select=id,platform,title,description,location,distance_miles,job_type,customer_name,status,lead_date,created_at&order=created_at.desc";
      if (platform) query += `&platform=eq.${platform}`;
      if (status) query += `&status=eq.${status}`;
      if (search) query += `&or=(title.ilike.*${search}*,customer_name.ilike.*${search}*,location.ilike.*${search}*)`;
      query += `&limit=${limit}&offset=${offset}`;

      const [leads, countResult] = await Promise.all([
        supabaseQuery(query),
        supabaseSQL(`SELECT json_agg(row_to_json(t)) FROM (SELECT count(*) as total FROM leads ${platform ? `WHERE platform='${platform}'` : ''} ${status ? `${platform ? 'AND' : 'WHERE'} status='${status}'` : ''}) t`),
      ]);
      res.json({ leads, total: countResult?.[0]?.total || 0 });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // Financials (with optional date range filtering)
  app.get("/api/dashboard/financials", dashboardAuth, async (req, res) => {
    try {
      const { from, to } = req.query as { from?: string; to?: string };
      const hasRange = from && to;

      // Build date filter for SQL queries
      const dateFilter = hasRange ? `WHERE date >= '${from}-01' AND date <= '${to}-31'` : "";
      const dateFilterAnd = hasRange ? `AND date >= '${from}-01' AND date <= '${to}-31'` : "";

      const queries: Promise<any>[] = [
        // Monthly P&L - filter by month range
        hasRange
          ? supabaseQuery(`monthly_pnl?order=month.asc&month=gte.${from}&month=lte.${to}`)
          : supabaseQuery("monthly_pnl?order=month.asc"),
        // Expenses by category - use SQL for date filtering
        hasRange
          ? supabaseSQL(`SELECT json_agg(row_to_json(t)) FROM (SELECT category, sub_category, sum(paid_out) as total_spent, count(*) as transaction_count FROM transactions WHERE paid_out > 0 AND date >= '${from}-01' AND date <= '${to}-31' GROUP BY category, sub_category ORDER BY sum(paid_out) DESC LIMIT 15) t`)
          : supabaseQuery("expenses_by_category?order=total_spent.desc&limit=15"),
        // Income by customer - use SQL for date filtering
        hasRange
          ? supabaseSQL(`SELECT json_agg(row_to_json(t)) FROM (SELECT payee, sum(paid_in) as total_paid, count(*) as payment_count FROM transactions WHERE paid_in > 0 ${dateFilterAnd} GROUP BY payee ORDER BY sum(paid_in) DESC LIMIT 15) t`)
          : supabaseQuery("income_by_customer?order=total_paid.desc&limit=15"),
        // Platform spend
        supabaseQuery("lead_platform_spend?order=month.desc&limit=12"),
        // Materials spend
        supabaseQuery("materials_spend?order=month.desc&limit=12"),
        // P&L summary totals
        supabaseSQL(`SELECT json_agg(row_to_json(t)) FROM (SELECT coalesce(sum(paid_in), 0) as total_income, coalesce(sum(paid_out), 0) as total_expenses, coalesce(sum(paid_in), 0) - coalesce(sum(paid_out), 0) as net_profit, count(*) as transaction_count FROM transactions ${dateFilter}) t`),
      ];

      const [monthlyPnl, expensesByCategory, incomeByCustomer, platformSpend, materialsSpend, pnlSummary] = await Promise.all(queries);

      // SQL results from json_agg are the array directly; no unwrapping needed
      const expenses = hasRange ? (expensesByCategory || []) : expensesByCategory;
      const income = hasRange ? (incomeByCustomer || []) : incomeByCustomer;

      res.json({
        monthlyPnl,
        expensesByCategory: expenses,
        incomeByCustomer: income,
        platformSpend,
        materialsSpend,
        pnlSummary: pnlSummary?.[0] || { total_income: 0, total_expenses: 0, net_profit: 0, transaction_count: 0 },
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch financials" });
    }
  });

  // Campaign
  app.get("/api/dashboard/campaign", dashboardAuth, async (_req, res) => {
    try {
      const [targetStats, newMoversSummary, boilerTiers, hotPostcodes, mailable] = await Promise.all([
        supabaseSQL("SELECT json_agg(row_to_json(t)) FROM (SELECT count(*) as total, count(*) FILTER (WHERE energy_rating IN ('D','E','F','G')) as poor_epc, count(*) FILTER (WHERE lead_score >= 8) as high_score FROM campaign_targets) t"),
        supabaseSQL("SELECT json_agg(row_to_json(t)) FROM (SELECT campaign_segment, sum(count) as total FROM new_movers_summary GROUP BY campaign_segment ORDER BY sum(count) DESC) t"),
        supabaseQuery("new_movers_boiler_tiers"),
        supabaseQuery("new_movers_hot_by_postcode?order=count.desc&limit=20"),
        supabaseSQL("SELECT json_agg(row_to_json(t)) FROM (SELECT count(*) as total, count(*) FILTER (WHERE resident_name IS NOT NULL) as with_names FROM new_movers) t"),
      ]);
      res.json({ targetStats, newMoversSummary, boilerTiers, hotPostcodes, mailable });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch campaign data" });
    }
  });

  // Pipeline
  app.get("/api/dashboard/pipeline", dashboardAuth, async (_req, res) => {
    try {
      const [funnel, declineReasons, dailyActivity] = await Promise.all([
        supabaseQuery("lead_funnel"),
        supabaseQuery("decline_reasons?order=count.desc&limit=15"),
        supabaseQuery("daily_activity?order=day.desc&limit=30"),
      ]);
      res.json({ funnel, declineReasons, dailyActivity });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch pipeline data" });
    }
  });

  return httpServer;
}
