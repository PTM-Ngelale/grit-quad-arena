import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class ShuttleState implements ConversationState {
  readonly name = STATES.SHUTTLE;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.toLowerCase().trim();
    if (["1", "yes"].includes(text)) {
      return {
        nextState: STATES.SHUTTLE,
        sessionData: { ...input.session, shuttle: true },
        reply:
          "Please choose a pickup point:\n\n1️⃣ Genesis Ada George\n2️⃣ Genesis Trans Amadi",
        buttons: [
          { label: "Genesis Ada George", value: "1" },
          { label: "Genesis Trans Amadi", value: "2" },
        ],
      };
    }

    if (["2", "no"].includes(text)) {
      return {
        nextState: STATES.NOTES,
        sessionData: { ...input.session, shuttle: false },
        reply: "No problem. Any additional notes? Reply SKIP if none.",
      };
    }

    if (text === "1" || text === "genesis ada george") {
      return {
        nextState: STATES.NOTES,
        sessionData: {
          ...input.session,
          shuttle: true,
          shuttlePickup: "ada-george",
        },
        reply: "Great. Any additional notes? Reply SKIP if none.",
      };
    }

    if (text === "2" || text === "genesis trans amadi") {
      return {
        nextState: STATES.NOTES,
        sessionData: {
          ...input.session,
          shuttle: true,
          shuttlePickup: "trans-amadi",
        },
        reply: "Great. Any additional notes? Reply SKIP if none.",
      };
    }

    return {
      nextState: STATES.SHUTTLE,
      sessionData: input.session,
      reply: "Please reply Yes or No.",
    };
  }
}
