import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class StartState implements ConversationState {
  readonly name = STATES.START;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.toLowerCase().trim();
    if (["1", "book", "book a ride", "ride"].includes(text)) {
      return {
        nextState: STATES.BOOKING_TYPE,
        sessionData: {},
        reply:
          "Great! What would you like to book?\n\n1️⃣ Solo Ride\n2️⃣ Group Booking",
        buttons: [
          { label: "Solo Ride", value: "1" },
          { label: "Group Booking", value: "2" },
        ],
      };
    }

    if (["2", "pricing", "view pricing"].includes(text)) {
      return {
        nextState: STATES.START,
        sessionData: {},
        reply:
          "Our pricing starts from ₦6,000 for a 5-minute solo ride. Reply 1 to book a ride or 3 for support.",
        buttons: [
          { label: "Book a Ride", value: "1" },
          { label: "Contact Support", value: "3" },
        ],
      };
    }

    if (["3", "support", "agent", "human", "9"].includes(text)) {
      return {
        nextState: STATES.HANDOFF,
        sessionData: {},
        reply:
          "You are being connected to a human agent. Please hold while we connect you.",
      };
    }

    return {
      nextState: STATES.START,
      sessionData: {},
      reply:
        "Welcome to GRIT Quad!\n\nReply with a number.\n\n1️⃣ Book a Ride\n2️⃣ View Pricing\n3️⃣ Contact Support",
      buttons: [
        { label: "Book a Ride", value: "1" },
        { label: "View Pricing", value: "2" },
        { label: "Contact Support", value: "3" },
      ],
    };
  }
}
