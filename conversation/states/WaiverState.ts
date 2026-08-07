import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class WaiverState implements ConversationState {
  readonly name = STATES.WAIVER;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.toLowerCase().trim();
    if (["1", "accept"].includes(text)) {
      return {
        nextState: STATES.SHUTTLE,
        sessionData: { ...input.session, waiverAccepted: true },
        reply: "Great. Do you need shuttle pickup?\n\n1️⃣ Yes\n2️⃣ No",
        buttons: [
          { label: "Yes", value: "1" },
          { label: "No", value: "2" },
        ],
      };
    }

    if (["2", "cancel"].includes(text)) {
      return {
        nextState: STATES.START,
        sessionData: {},
        reply: "Booking cancelled. Reply 1 to start again.",
      };
    }

    return {
      nextState: STATES.WAIVER,
      sessionData: input.session,
      reply: "Please reply with Accept or Cancel.",
    };
  }
}
