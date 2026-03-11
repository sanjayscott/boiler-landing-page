import type { Inquiry, InsertInquiry, Visit, InsertVisit, PartialLead, InsertPartialLead } from "@shared/schema";

const SUPABASE_URL = "https://agswgxnhbywwdxjhgjjs.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || "";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  markNotified(id: number): Promise<void>;
  createVisit(visit: InsertVisit): Promise<Visit>;
  createPartialLead(partial: InsertPartialLead): Promise<PartialLead>;
}

async function supabaseInsert<T>(table: string, data: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase insert into ${table} failed (${res.status}): ${err}`);
  }
  const rows = await res.json();
  return rows[0];
}

async function supabasePatch(table: string, id: number, data: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase patch ${table} id=${id} failed (${res.status}): ${err}`);
  }
}

export class DatabaseStorage implements IStorage {
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    return supabaseInsert<Inquiry>("inquiries", inquiry as Record<string, unknown>);
  }

  async markNotified(id: number): Promise<void> {
    await supabasePatch("inquiries", id, { notified: true });
  }

  async createVisit(visit: InsertVisit): Promise<Visit> {
    const { userAgent, ...rest } = visit as any;
    return supabaseInsert<Visit>("visits", { ...rest, user_agent: userAgent });
  }

  async createPartialLead(partial: InsertPartialLead): Promise<PartialLead> {
    return supabaseInsert<PartialLead>("partial_leads", partial as Record<string, unknown>);
  }
}

export const storage = new DatabaseStorage();
