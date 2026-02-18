import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertVisitSchema } from "@shared/schema";
import { z } from "zod";

// Notification config (set via env vars in Replit Secrets)
// WEBHOOK_URL = n8n webhook (optional, for future automation)
// TELEGRAM_BOT_TOKEN = Telegram bot token for direct notifications
// TELEGRAM_CHAT_ID = Sanjay's Telegram chat ID (8422310768)
const WEBHOOK_URL = process.env.WEBHOOK_URL || "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "8422310768";

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

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
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

  return httpServer;
}
