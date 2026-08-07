import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class ConfirmationState implements ConversationState {
  readonly name = STATES.CONFIRMATION;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.toLowerCase().trim();
    if (["1", "confirm"].includes(text)) {
      return {
        nextState: STATES.START,
        sessionData: input.session,
        reply: "Submitting your booking...",
      };
    }

    if (["2", "edit"].includes(text)) {
      return {
        nextState: STATES.ENTER_NAME,
        sessionData: input.session,
        reply: "Please enter your full name to update your booking details.",
      };
    }

    if (["3", "cancel"].includes(text)) {
      return {
        nextState: STATES.START,
        sessionData: {},
        reply: "Booking cancelled. Reply 1 to start again.",
      };
    }

    return {
      nextState: STATES.CONFIRMATION,
      sessionData: input.session,
      reply: "Please reply Confirm, Edit, or Cancel.",
    };
  }
}
