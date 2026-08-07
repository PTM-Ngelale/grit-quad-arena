import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  formatTimeSlot,
  isCooldownSlot,
  isShuttleExclusiveSlot,
} from "@/lib/timeSlots";
import type {
  AgeCategory,
  BookingInput,
  BookingSubmissionResult,
} from "@/types/booking";

const DURATION_LABELS: Record<string, string> = {
  "5min": "5 Minutes — ₦6,000",
  "10min": "10 Minutes — ₦10,000",
  "15min": "15 Minutes — ₦13,000",
  "30min": "30 Minutes (Premium) — DM to Book",
  "5min-g3": "5 Minutes · Group of 3 — ₦17,100",
  "5min-g4": "5 Minutes · Group of 4 — ₦22,200",
  "5min-g5": "5 Minutes · Group of 5 — ₦27,000",
  "5min-g6": "5 Minutes · Group of 6 — ₦31,500",
  "10min-g3": "10 Minutes · Group of 3 — ₦28,500",
  "10min-g4": "10 Minutes · Group of 4 — ₦37,000",
  "10min-g5": "10 Minutes · Group of 5 — ₦45,000",
  "10min-g6": "10 Minutes · Group of 6 — ₦52,500",
  "15min-g3": "15 Minutes · Group of 3 — ₦37,050",
  "15min-g4": "15 Minutes · Group of 4 — ₦48,100",
  "15min-g5": "15 Minutes · Group of 5 — ₦58,500",
  "15min-g6": "15 Minutes · Group of 6 — ₦68,250",
};

const SHUTTLE_LABELS: Record<string, string> = {
  "ada-george": "Genesis Ada George — ₦4,000 pp",
  "trans-amadi": "Genesis Trans Amadi — ₦3,000 pp",
};

function buildNotificationEmail(data: Record<string, string>): string {
  const duration = DURATION_LABELS[data.duration] ?? data.duration;
  const shuttleLine =
    data.shuttle === "on"
      ? `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Shuttle Pickup</td><td style="padding:8px 0;font-size:13px;">${SHUTTLE_LABELS[data.shuttlePickup] ?? data.shuttlePickup ?? "Requested (pickup TBC)"}</td></tr>`
      : "";
  const isMinor = data.ageCategory === "minor";
  const waiverLine = isMinor
    ? `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Waiver</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">✔ Accepted — Parent/Guardian Consent (Under 18)</td></tr>
       <tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Participant</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.participantName} (age ${data.participantAge})</td></tr>
       <tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Parent/Guardian</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.guardianName}</td></tr>`
    : `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Waiver</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">✔ Accepted — Adult Waiver (18+)</td></tr>`;

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0D0D0D;font-family:Inter,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:40px 20px;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-top:3px solid #CC1111;"><tr><td style="padding:32px 40px 24px;"><p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#CC1111;">New Booking Request</p><h1 style="margin:0;font-size:28px;color:#F2EDE6;font-weight:800;">${data.name}</h1><p style="margin:6px 0 0;font-size:14px;color:#6B6B6B;">${duration}</p></td></tr><tr><td style="padding:0 40px 32px;"><table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2A2A2A;"><tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;width:140px;">Phone</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.phone}</td></tr>${data.email ? `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Email</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.email}</td></tr>` : ""}<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;border-top:1px solid #2A2A2A;">Preferred Date</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;border-top:1px solid #2A2A2A;">${data.date}</td></tr><tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Time Slot</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.timeSlot ? formatTimeSlot(data.timeSlot) : "—"}</td></tr><tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Duration</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${duration}</td></tr><tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Riders</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.riders}</td></tr>${waiverLine}${shuttleLine}${data.notes ? `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;border-top:1px solid #2A2A2A;vertical-align:top;">Notes</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;border-top:1px solid #2A2A2A;">${data.notes}</td></tr>` : ""}</table></td></tr><tr><td style="padding:0 40px 40px;"><a href="https://wa.me/${data.phone?.replace(/^0/, "234").replace(/\s/g, "")}" style="display:inline-block;background:#CC1111;color:#fff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:12px 24px;">Reply on WhatsApp →</a></td></tr><tr><td style="padding:20px 40px;border-top:1px solid #2A2A2A;"><p style="margin:0;font-size:11px;color:#6B6B6B;">GRIT Quad Biking Arena · gritarena@outlook.com</p></td></tr></table></td></tr></table></body></html>`;
}

function buildConfirmationEmail(data: Record<string, string>): string {
  const duration = DURATION_LABELS[data.duration] ?? data.duration;
  const waiverConfirmLine =
    data.ageCategory === "minor"
      ? `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Waiver</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">Signed — Parent/Guardian Consent (Under 18)</td></tr>`
      : `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Waiver</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">Signed — Adult Waiver (18+)</td></tr>`;

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0D0D0D;font-family:Inter,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:40px 20px;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-top:3px solid #CC1111;"><tr><td style="padding:40px 40px 24px;text-align:center;"><p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#CC1111;">Booking Received</p><h1 style="margin:0 0 8px;font-size:32px;color:#F2EDE6;font-weight:800;">We got you, ${data.name.split(" ")[0]}.</h1><p style="margin:0;font-size:14px;color:#6B6B6B;max-width:380px;margin:8px auto 0;">Your request has been received. We'll confirm your slot via WhatsApp or phone within 24 hours.</p></td></tr><tr><td style="padding:0 40px 32px;"><table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2A2A2A;"><tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;width:140px;">Date Requested</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.date}</td></tr><tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Time Slot</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.timeSlot ? formatTimeSlot(data.timeSlot) : "—"}</td></tr><tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Duration</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${duration}</td></tr><tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Riders</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.riders}</td></tr>${waiverConfirmLine}</table></td></tr><tr><td style="padding:0 40px 40px;text-align:center;"><p style="margin:0 0 20px;font-size:13px;color:#6B6B6B;">Questions? Reach us on WhatsApp:</p><a href="https://wa.me/+2348078591455" style="display:inline-block;background:#CC1111;color:#fff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:12px 24px;">Chat on WhatsApp</a></td></tr><tr><td style="padding:20px 40px;border-top:1px solid #2A2A2A;text-align:center;"><p style="margin:0;font-size:11px;color:#6B6B6B;">GRIT Quad Biking Arena · Port Harcourt · Open Fri & Sat 10am–6pm</p></td></tr></table></td></tr></table></body></html>`;
}

function isOperatingDay(value: string): boolean {
  if (!value) return true;
  const day = new Date(`${value}T00:00:00`).getDay();
  return day === 5 || day === 6 || day === 0;
}

export class BookingService {
  async getAvailability(date: string): Promise<string[]> {
    const supabase = getSupabaseAdmin();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("bookings")
      .select("time_slot")
      .eq("date", date);
    if (error) {
      console.error("[availability error]", error);
      return [];
    }

    return (data ?? []).map((row) => row.time_slot as string);
  }

  validateBookingPayload(input: BookingInput): {
    normalized: BookingInput;
    errors: string[];
  } {
    const normalized: BookingInput = {
      ...input,
      name: input.name?.trim() ?? "",
      phone: input.phone?.trim() ?? "",
      email: input.email?.trim() ?? "",
      duration: input.duration?.trim() ?? "",
      date: input.date?.trim() ?? "",
      timeSlot: input.timeSlot?.trim() ?? "",
      riders: input.riders?.toString().trim() ?? "",
      ageCategory: input.ageCategory?.trim() ?? "",
      participantName: input.participantName?.trim() ?? "",
      guardianName: input.guardianName?.trim() ?? "",
      participantAge: input.participantAge?.toString().trim() ?? "",
      notes: input.notes?.trim() ?? "",
      shuttle: this.toBoolean(input.shuttle),
      waiverAccepted: this.toBoolean(input.waiverAccepted),
    };

    const errors: string[] = [];
    const required = [
      "name",
      "phone",
      "duration",
      "date",
      "timeSlot",
      "riders",
      "ageCategory",
    ] as const;
    for (const field of required) {
      if (!normalized[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    if (
      normalized.ageCategory !== "adult" &&
      normalized.ageCategory !== "minor"
    ) {
      errors.push("Invalid age category.");
    }

    if (normalized.waiverAccepted !== true) {
      errors.push("Waiver must be accepted before booking can be submitted.");
    }

    if (normalized.ageCategory === "minor") {
      if (!normalized.participantName)
        errors.push("Participant name is required for minor bookings.");
      if (!normalized.guardianName)
        errors.push("Guardian name is required for minor bookings.");
      if (!normalized.participantAge)
        errors.push("Participant age is required for minor bookings.");
    }

    if (!isOperatingDay(normalized.date ?? "")) {
      errors.push("We operate on Fridays, Saturdays, and Sundays.");
    }

    if (normalized.timeSlot && isCooldownSlot(normalized.timeSlot)) {
      errors.push("That time falls within a staff cooldown break.");
    }

    if (
      normalized.timeSlot &&
      isShuttleExclusiveSlot(normalized.timeSlot) &&
      normalized.shuttle !== true
    ) {
      errors.push("That time is reserved for shuttle bookings only.");
    }

    return { normalized, errors };
  }

  async submitBooking(input: BookingInput): Promise<BookingSubmissionResult> {
    const { normalized, errors } = this.validateBookingPayload(input);
    if (errors.length) {
      return { success: false, message: errors[0] };
    }

    const payload = normalized as Record<string, unknown>;
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { error: insertError } = await supabase.from("bookings").insert({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        duration: payload.duration,
        date: payload.date,
        time_slot: payload.timeSlot,
        riders: Number(payload.riders),
        shuttle: payload.shuttle === true,
        shuttle_pickup: payload.shuttlePickup || null,
        notes: payload.notes || null,
        age_category: payload.ageCategory,
        waiver_accepted: payload.waiverAccepted === true,
        participant_name:
          payload.ageCategory === "minor" ? payload.participantName : null,
        guardian_name:
          payload.ageCategory === "minor" ? payload.guardianName : null,
        participant_age:
          payload.ageCategory === "minor"
            ? Number(payload.participantAge)
            : null,
      });

      if (insertError) {
        if (insertError.code === "23505") {
          return {
            success: false,
            message: "That time slot has just been booked by someone else.",
          };
        }
        console.error("[booking insert error]", insertError);
        return { success: false, message: "Failed to save booking" };
      }
    }

    if (!process.env.RESEND_API_KEY) {
      console.log("[Booking received — no RESEND_API_KEY set]", payload);
      return { success: true, message: "Booking received" };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const sends: Promise<unknown>[] = [];
    sends.push(
      resend.emails
        .send({
          from: "GRIT Arena Bookings <bookings@gritquad.com>",
          to: ["gritarena@outlook.com"],
          replyTo: (payload.email as string) || undefined,
          subject: `${payload.ageCategory === "minor" ? "⚠ MINOR — " : ""}New Booking — ${payload.name} · ${DURATION_LABELS[String(payload.duration)] ?? String(payload.duration)}`,
          html: buildNotificationEmail(payload as Record<string, string>),
        })
        .catch((err) => console.error("[booking notify error]", err)),
    );

    if (payload.email) {
      sends.push(
        resend.emails
          .send({
            from: "GRIT Arena <bookings@gritquad.com>",
            to: [String(payload.email)],
            cc: ["gritarena@outlook.com"],
            subject: "Booking request received — GRIT Quad Biking Arena",
            html: buildConfirmationEmail(payload as Record<string, string>),
          })
          .catch((err) => console.error("[booking confirm error]", err)),
      );
    }

    await Promise.all(sends);
    return { success: true, message: "Booking received" };
  }

  private toBoolean(value: boolean | string | undefined): boolean {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      return (
        normalized === "on" || normalized === "true" || normalized === "yes"
      );
    }
    return false;
  }
}

export const bookingService = new BookingService();
