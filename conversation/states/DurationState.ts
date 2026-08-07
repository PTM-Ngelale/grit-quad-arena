import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class DurationState implements ConversationState {
  readonly name = STATES.SELECT_DURATION;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.toLowerCase().trim();
    const map: Record<string, string> = {
      "1": "5min",
      "2": "10min",
      "3": "15min",
      "4": "30min",
      "5 minutes": "5min",
      "10 minutes": "10min",
      "15 minutes": "15min",
      "30 minute premium": "30min",
    };

    const selected = map[text];
    if (selected === "30min") {
      return {
        nextState: STATES.HANDOFF,
        sessionData: { ...input.session, duration: "30 minute Premium" },
        reply:
          "This booking is handled directly through WhatsApp with our team.\n\nTap below to talk to an agent.",
        buttons: [{ label: "Talk to an Agent", value: "agent" }],
      };
    }

    if (selected) {
      return {
        nextState: STATES.ENTER_NAME,
        sessionData: { ...input.session, duration: selected },
        reply: "Great. What is your full name?",
      };
    }

    return {
      nextState: STATES.SELECT_DURATION,
      sessionData: input.session,
      reply:
        "Please choose a valid duration.\n\n1️⃣ 5 minutes\n2️⃣ 10 minutes\n3️⃣ 15 minutes\n4️⃣ 30 minute Premium",
      buttons: [
        { label: "5 minutes", value: "1" },
        { label: "10 minutes", value: "2" },
        { label: "15 minutes", value: "3" },
        { label: "30 minute Premium", value: "4" },
      ],
    };
  }
}
