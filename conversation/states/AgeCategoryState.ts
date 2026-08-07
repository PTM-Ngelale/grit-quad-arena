import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class AgeCategoryState implements ConversationState {
  readonly name = STATES.SELECT_AGE_CATEGORY;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.toLowerCase().trim();
    if (["1", "adult"].includes(text)) {
      return {
        nextState: STATES.WAIVER,
        sessionData: { ...input.session, ageCategory: "adult" },
        reply: "Please accept the waiver.\n\n1️⃣ Accept\n2️⃣ Cancel",
        buttons: [
          { label: "Accept", value: "1" },
          { label: "Cancel", value: "2" },
        ],
      };
    }

    if (["2", "minor"].includes(text)) {
      return {
        nextState: STATES.ENTER_MINOR_DETAILS,
        sessionData: { ...input.session, ageCategory: "minor" },
        reply: "Please provide the participant name.",
      };
    }

    return {
      nextState: STATES.SELECT_AGE_CATEGORY,
      sessionData: input.session,
      reply: "Please choose Adult or Minor.\n\n1️⃣ Adult\n2️⃣ Minor",
      buttons: [
        { label: "Adult", value: "1" },
        { label: "Minor", value: "2" },
      ],
    };
  }
}
