import { inquiries, visits, type Inquiry, type InsertInquiry, type Visit, type InsertVisit } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  createVisit(visit: InsertVisit): Promise<Visit>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return newInquiry;
  }

  async createVisit(visit: InsertVisit): Promise<Visit> {
    const [newVisit] = await db.insert(visits).values(visit).returning();
    return newVisit;
  }
}

export const storage = new DatabaseStorage();
