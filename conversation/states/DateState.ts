import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";
import { bookingService } from "@/services/bookingService";
import {
  isCooldownSlot,
  isShuttleExclusiveSlot,
  TIME_SLOTS,
} from "@/lib/timeSlots";

export class DateState implements ConversationState {
  readonly name = STATES.SELECT_DATE;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const date = input.message.trim();
    if (!date) {
      return {
        nextState: STATES.SELECT_DATE,
        sessionData: input.session,
        reply: "Please enter a booking date in YYYY-MM-DD format.",
      };
    }

    const day = new Date(`${date}T00:00:00`).getDay();
    if (day !== 5 && day !== 6 && day !== 0) {
      return {
        nextState: STATES.SELECT_DATE,
        sessionData: input.session,
        reply:
          "Bookings are available on Fridays, Saturdays, and Sundays only. Please choose another date.",
      };
    }

    const bookedSlots = await bookingService.getAvailability(date);
    const options = TIME_SLOTS.filter(
      (slot) =>
        !bookedSlots.includes(slot) &&
        !isCooldownSlot(slot) &&
        !isShuttleExclusiveSlot(slot),
    );

    if (!options.length) {
      return {
        nextState: STATES.SELECT_DATE,
        sessionData: input.session,
        reply: "No available slots on that date. Please choose another date.",
      };
    }

    return {
      nextState: STATES.SELECT_TIME,
      sessionData: { ...input.session, date },
      reply:
        "Great. Choose a time slot:\n\n" +
        options.map((slot, index) => `${index + 1}️⃣ ${slot}`).join("\n"),
      buttons: options
        .slice(0, 4)
        .map((slot, index) => ({ label: slot, value: String(index + 1) })),
    };
  }
}
