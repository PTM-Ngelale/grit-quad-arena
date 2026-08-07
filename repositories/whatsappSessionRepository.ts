import { getSupabaseAdmin } from "@/lib/supabase";
import type { WhatsappSession } from "@/types/booking";

class InMemorySessionStore {
  private store = new Map<string, WhatsappSession>();

  async getSession(phoneNumber: string): Promise<WhatsappSession | null> {
    return this.store.get(phoneNumber) ?? null;
  }

  async saveSession(session: WhatsappSession): Promise<void> {
    this.store.set(session.phone_number, session);
  }

  async deleteSession(phoneNumber: string): Promise<void> {
    this.store.delete(phoneNumber);
  }
}

export class WhatsappSessionRepository {
  private memoryStore = new InMemorySessionStore();

  async getSession(phoneNumber: string): Promise<WhatsappSession | null> {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return this.memoryStore.getSession(phoneNumber);
    }

    const { data, error } = await supabase
      .from("whatsapp_sessions")
      .select("*")
      .eq("phone_number", phoneNumber)
      .maybeSingle();

    if (error) {
      console.error("[whatsapp session read error]", error);
      return this.memoryStore.getSession(phoneNumber);
    }

    return data as WhatsappSession | null;
  }

  async saveSession(session: WhatsappSession): Promise<void> {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      await this.memoryStore.saveSession(session);
      return;
    }

    const { error } = await supabase
      .from("whatsapp_sessions")
      .upsert(session, { onConflict: "phone_number" });
    if (error) {
      console.error("[whatsapp session save error]", error);
      await this.memoryStore.saveSession(session);
    }
  }

  async deleteSession(phoneNumber: string): Promise<void> {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      await this.memoryStore.deleteSession(phoneNumber);
      return;
    }

    const { error } = await supabase
      .from("whatsapp_sessions")
      .delete()
      .eq("phone_number", phoneNumber);
    if (error) {
      console.error("[whatsapp session delete error]", error);
      await this.memoryStore.deleteSession(phoneNumber);
    }
  }
}

export const whatsappSessionRepository = new WhatsappSessionRepository();
