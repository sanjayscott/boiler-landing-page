import { pgTable, text, serial, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
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
  notified: boolean("notified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  notified: true,
  createdAt: true,
});

const ukPhoneRegex = /^(?:(?:\+44\s?|0)(?:1\d{3,4}\s?\d{3,4}\s?\d{0,4}|2\d\s?\d{4}\s?\d{4}|3\d{2,3}\s?\d{3,4}\s?\d{0,4}|7\d{3}\s?\d{3}\s?\d{3}|800\s?\d{3}\s?\d{3,4}|8[0-9]{2}\s?\d{3}\s?\d{3,4}))$/;
const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export const leadFormSchema = insertInquirySchema.extend({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string()
    .min(1, "Please enter your phone number")
    .transform(v => v.replace(/[\s\-\(\)]/g, ""))
    .pipe(z.string().regex(ukPhoneRegex, "Please enter a valid UK phone number")),
  postcode: z.string()
    .min(1, "Please enter your postcode")
    .regex(ukPostcodeRegex, "Please enter a valid UK postcode"),
});

export const callbackFormSchema = insertInquirySchema.extend({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string()
    .min(1, "Please enter your phone number")
    .transform(v => v.replace(/[\s\-\(\)]/g, ""))
    .pipe(z.string().regex(ukPhoneRegex, "Please enter a valid UK phone number")),
  postcode: z.string().optional(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  ref: varchar("ref", { length: 50 }),
  epc: varchar("epc", { length: 5 }),
  page: varchar("page", { length: 100 }),
  userAgent: text("user_agent"),
  ip: text("ip"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVisitSchema = createInsertSchema(visits).omit({
  id: true,
  createdAt: true,
});

export type Visit = typeof visits.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;

export const partialLeads = pgTable("partial_leads", {
  id: serial("id").primaryKey(),
  name: text("name"),
  phone: varchar("phone", { length: 20 }),
  postcode: varchar("postcode", { length: 10 }),
  page: varchar("page", { length: 100 }),
  source: varchar("source", { length: 50 }),
  converted: boolean("converted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPartialLeadSchema = createInsertSchema(partialLeads).omit({
  id: true,
  converted: true,
  createdAt: true,
});

export type PartialLead = typeof partialLeads.$inferSelect;
export type InsertPartialLead = z.infer<typeof insertPartialLeadSchema>;
