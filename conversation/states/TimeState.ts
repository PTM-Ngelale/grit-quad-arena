import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class TimeState implements ConversationState {
  readonly name = STATES.SELECT_TIME;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const raw = input.message.trim();
    const map: Record<string, string> = {
      "1": "10:00",
      "2": "10:30",
      "3": "11:00",
      "4": "11:30",
      "5": "12:00",
      "6": "12:30",
      "7": "13:00",
      "8": "13:30",
      "9": "14:00",
      "10": "14:30",
      "11": "15:00",
      "12": "15:30",
      "13": "16:00",
      "14": "16:30",
      "15": "17:00",
      "16": "17:30",
    };

    const selected = map[raw];
    if (selected) {
      return {
        nextState: STATES.SELECT_AGE_CATEGORY,
        sessionData: { ...input.session, timeSlot: selected },
        reply:
          "Great. Are you booking as an adult or a minor?\n\n1️⃣ Adult\n2️⃣ Minor",
        buttons: [
          { label: "Adult", value: "1" },
          { label: "Minor", value: "2" },
        ],
      };
    }

    return {
      nextState: STATES.SELECT_TIME,
      sessionData: input.session,
      reply: "Please choose a valid time slot.",
    };
  }
}
