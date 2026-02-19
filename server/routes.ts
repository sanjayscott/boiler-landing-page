import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertVisitSchema, insertPartialLeadSchema } from "@shared/schema";
import { z } from "zod";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "8422310768";

async function sendTelegram(msg: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: "Markdown" }),
      });
      const body = await res.json();
      if (body.ok) {
        console.log("Telegram sent (attempt " + attempt + ")");
        return true;
      }
      console.error("Telegram API error (attempt " + attempt + "):", JSON.stringify(body));
    } catch (e) {
      console.error("Telegram network error (attempt " + attempt + "):", e);
    }
    if (attempt < 3) await new Promise(r => setTimeout(r, 2000 * attempt));
  }
  return false;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  const handleInquiry = async (req: any, res: any) => {
    try {
      const data = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(data);

      const ref = inquiry.ref ? ` (ref: ${inquiry.ref})` : "";
      const epc = inquiry.epc ? ` | EPC: ${inquiry.epc}` : "";
      const source = inquiry.source ? ` | Source: ${inquiry.source}` : "";
      const msg = `🔔 *New Landing Page Lead!*\n\n👤 *${inquiry.name}*\n📞 ${inquiry.phone}\n📍 ${inquiry.postcode}${epc}${ref}${source}\n📝 ${inquiry.notes || "—"}`;

      sendTelegram(msg).then(async (sent) => {
        if (sent) {
          await storage.markNotified(inquiry.id);
        } else {
          console.error("FAILED to notify for lead #" + inquiry.id + " - " + inquiry.name + " " + inquiry.phone);
        }
      });

      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Lead save error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };

  app.post("/api/inquiries", handleInquiry);
  app.post("/api/leads", handleInquiry);

  app.post("/api/visits", async (req, res) => {
    try {
      const ip = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "").slice(0, 500);
      const data = insertVisitSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"] || null,
        ip: ip || null,
      });
      const visit = await storage.createVisit(data);

      const page = data.page || "unknown";
      const ref = data.ref ? ` (ref: ${data.ref})` : "";
      const visitMsg = `👁 *Site Visit*\n📄 Page: ${page}${ref}\n📍 IP: ${ip ? ip.split(",")[0].trim() : "—"}`;
      sendTelegram(visitMsg);

      res.status(201).json({ ok: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Visit save error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.post("/api/partial-leads", async (req, res) => {
    try {
      const data = insertPartialLeadSchema.parse(req.body);
      if (!data.name && !data.phone && !data.postcode) {
        return res.status(200).json({ ok: true, saved: false });
      }
      const partial = await storage.createPartialLead(data);

      const fields = [];
      if (data.name) fields.push(`👤 ${data.name}`);
      if (data.phone) fields.push(`📞 ${data.phone}`);
      if (data.postcode) fields.push(`📍 ${data.postcode}`);
      const partialMsg = `⚠️ *Partial Lead (not submitted)*\n${fields.join("\n")}\n📄 Page: ${data.page || "—"}`;
      sendTelegram(partialMsg);

      res.status(201).json({ ok: true, saved: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Partial lead save error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
