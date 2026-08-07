import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class BookingTypeState implements ConversationState {
  readonly name = STATES.BOOKING_TYPE;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.toLowerCase().trim();
    if (["1", "solo", "solo ride"].includes(text)) {
      return {
        nextState: STATES.SELECT_DURATION,
        sessionData: { bookingType: "solo" },
        reply:
          "Choose a duration:\n\n1️⃣ 5 minutes\n2️⃣ 10 minutes\n3️⃣ 15 minutes\n4️⃣ 30 minute Premium",
        buttons: [
          { label: "5 minutes", value: "1" },
          { label: "10 minutes", value: "2" },
          { label: "15 minutes", value: "3" },
          { label: "30 minute Premium", value: "4" },
        ],
      };
    }

    if (["2", "group", "group booking"].includes(text)) {
      return {
        nextState: STATES.SELECT_RIDER_COUNT,
        sessionData: { bookingType: "group" },
        reply: "How many riders?\n\n1️⃣ 3\n2️⃣ 4\n3️⃣ 5\n4️⃣ 6",
        buttons: [
          { label: "3", value: "1" },
          { label: "4", value: "2" },
          { label: "5", value: "3" },
          { label: "6", value: "4" },
        ],
      };
    }

    if (["agent", "support", "human", "9"].includes(text)) {
      return {
        nextState: STATES.HANDOFF,
        sessionData: {},
        reply:
          "You are being connected to a human agent. Please hold while we connect you.",
      };
    }

    return {
      nextState: STATES.BOOKING_TYPE,
      sessionData: input.session,
      reply: "Please choose a booking type.\n\n1️⃣ Solo Ride\n2️⃣ Group Booking",
      buttons: [
        { label: "Solo Ride", value: "1" },
        { label: "Group Booking", value: "2" },
      ],
    };
  }
}
