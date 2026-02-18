import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertVisitSchema } from "@shared/schema";
import { z } from "zod";

// Webhook URL for n8n notifications (set via env var)
const WEBHOOK_URL = process.env.WEBHOOK_URL || "";

async function notifyWebhook(type: string, data: any) {
  if (!WEBHOOK_URL) return;
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
