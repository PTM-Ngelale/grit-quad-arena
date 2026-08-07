import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class PhoneState implements ConversationState {
  readonly name = STATES.ENTER_PHONE;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const phone = input.message.trim();
    if (!phone) {
      return {
        nextState: STATES.ENTER_PHONE,
        sessionData: input.session,
        reply: "Please enter your phone number.",
      };
    }

    return {
      nextState: STATES.ENTER_EMAIL,
      sessionData: { ...input.session, phone },
      reply:
        "Great. What is your email address? Type skip if you do not want to share one.",
    };
  }
}
