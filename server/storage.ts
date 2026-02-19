import { inquiries, visits, partialLeads, type Inquiry, type InsertInquiry, type Visit, type InsertVisit, type PartialLead, type InsertPartialLead } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  markNotified(id: number): Promise<void>;
  createVisit(visit: InsertVisit): Promise<Visit>;
  createPartialLead(partial: InsertPartialLead): Promise<PartialLead>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return newInquiry;
  }

  async markNotified(id: number): Promise<void> {
    await db.update(inquiries).set({ notified: true }).where(eq(inquiries.id, id));
  }

  async createVisit(visit: InsertVisit): Promise<Visit> {
    const [newVisit] = await db.insert(visits).values(visit).returning();
    return newVisit;
  }

  async createPartialLead(partial: InsertPartialLead): Promise<PartialLead> {
    const [newPartial] = await db.insert(partialLeads).values(partial).returning();
    return newPartial;
  }
}

export const storage = new DatabaseStorage();
