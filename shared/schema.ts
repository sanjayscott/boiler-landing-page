import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  postcode: varchar("postcode", { length: 10 }).notNull(),
  ref: varchar("ref", { length: 50 }),
  epc: varchar("epc", { length: 5 }),
  source: varchar("source", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

// Page visit tracking (QR scans, direct visits)
export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  ref: varchar("ref", { length: 50 }),
  epc: varchar("epc", { length: 5 }),
  page: varchar("page", { length: 50 }),
  userAgent: text("user_agent"),
  ip: varchar("ip", { length: 45 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVisitSchema = createInsertSchema(visits).omit({
  id: true,
  createdAt: true,
});

export type Visit = typeof visits.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;
