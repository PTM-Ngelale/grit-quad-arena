import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class EmailState implements ConversationState {
  readonly name = STATES.ENTER_EMAIL;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const value = input.message.trim();
    if (!value || value.toLowerCase() === "skip") {
      return {
        nextState: STATES.SELECT_DATE,
        sessionData: { ...input.session, email: "" },
        reply:
          "No problem. What date do you want to book? Please reply with YYYY-MM-DD.",
      };
    }

    return {
      nextState: STATES.SELECT_DATE,
      sessionData: { ...input.session, email: value },
      reply:
        "Perfect. What date do you want to book? Please reply with YYYY-MM-DD.",
    };
  }
}
