import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class RiderCountState implements ConversationState {
  readonly name = STATES.SELECT_RIDER_COUNT;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.toLowerCase().trim();
    const map: Record<string, string> = {
      "1": "3",
      "2": "4",
      "3": "5",
      "4": "6",
      "3 riders": "3",
      "4 riders": "4",
      "5 riders": "5",
      "6 riders": "6",
    };

    const selected = map[text];
    if (selected) {
      return {
        nextState: STATES.SELECT_DURATION,
        sessionData: { ...input.session, riders: selected },
        reply:
          "Great. Choose a duration:\n\n1️⃣ 5 minutes\n2️⃣ 10 minutes\n3️⃣ 15 minutes",
        buttons: [
          { label: "5 minutes", value: "1" },
          { label: "10 minutes", value: "2" },
          { label: "15 minutes", value: "3" },
        ],
      };
    }

    return {
      nextState: STATES.SELECT_RIDER_COUNT,
      sessionData: input.session,
      reply: "Please choose a valid rider count.\n\n1️⃣ 3\n2️⃣ 4\n3️⃣ 5\n4️⃣ 6",
      buttons: [
        { label: "3", value: "1" },
        { label: "4", value: "2" },
        { label: "5", value: "3" },
        { label: "6", value: "4" },
      ],
    };
  }
}
