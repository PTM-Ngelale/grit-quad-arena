import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class NameState implements ConversationState {
  readonly name = STATES.ENTER_NAME;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const name = input.message.trim();
    if (!name) {
      return {
        nextState: STATES.ENTER_NAME,
        sessionData: input.session,
        reply: "Please enter your full name.",
      };
    }

    return {
      nextState: STATES.ENTER_PHONE,
      sessionData: { ...input.session, name },
      reply: "Perfect. What is your phone number?",
    };
  }
}
