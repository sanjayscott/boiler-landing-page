import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertVisitSchema, insertPartialLeadSchema } from "@shared/schema";
import { z } from "zod";

const ukPhoneRegex = /^(?:(?:\+44\s?|0)(?:1\d{3,4}\s?\d{3,4}\s?\d{0,4}|2\d\s?\d{4}\s?\d{4}|3\d{2,3}\s?\d{3,4}\s?\d{0,4}|7\d{3}\s?\d{3}\s?\d{3}|800\s?\d{3}\s?\d{3,4}|8[0-9]{2}\s?\d{3}\s?\d{3,4}))$/;

function isValidUkPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return ukPhoneRegex.test(cleaned);
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "8422310768";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendTelegram(msg: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: "HTML" }),
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
      if (!data.name?.trim() && !data.phone?.trim()) {
        return res.status(400).json({ message: "Name or phone number is required" });
      }
      if (data.phone?.trim() && !isValidUkPhone(data.phone)) {
        return res.status(400).json({ message: "Please enter a valid UK phone number" });
      }
      const inquiry = await storage.createInquiry(data);

      const nameLine = inquiry.name?.trim() ? `<b>${esc(inquiry.name.trim())}</b>` : "<i>No name provided</i>";
      const phoneLine = inquiry.phone?.trim() ? `📞 ${esc(inquiry.phone.trim())}` : "<i>No phone</i>";
      const postcodeLine = inquiry.postcode?.trim() ? `📍 ${esc(inquiry.postcode.trim())}` : "";
      const ref = inquiry.ref ? `\n🏷 Ref: ${esc(inquiry.ref)}` : "";
      const epc = inquiry.epc ? ` | EPC: ${esc(inquiry.epc)}` : "";
      const source = inquiry.source ? `\n📊 Source: ${esc(inquiry.source)}` : "";
      const notes = inquiry.notes ? `\n📝 ${esc(inquiry.notes)}` : "";
      const lines = [`<b>🔔 New Landing Page Lead!</b>`, "", nameLine, phoneLine];
      if (postcodeLine) lines.push(postcodeLine);
      if (ref) lines.push(ref.trim());
      if (epc) lines.push(epc.trim());
      if (source) lines.push(source.trim());
      if (notes) lines.push(notes.trim());
      const msg = lines.join("\n");

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
      const ref = data.ref ? ` (ref: ${esc(data.ref)})` : "";
      const visitMsg = `<b>👁 Site Visit</b>\nPage: ${esc(page)}${ref}\nIP: ${ip ? esc(ip.split(",")[0].trim()) : "-"}`;
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
      if (data.name) fields.push(esc(data.name));
      if (data.phone) fields.push(esc(data.phone));
      if (data.postcode) fields.push(esc(data.postcode));
      const partialMsg = `<b>⚠️ Partial Lead (not submitted)</b>\n${fields.join("\n")}\nPage: ${esc(data.page || "-")}`;
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
