import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class MinorDetailsState implements ConversationState {
  readonly name = STATES.ENTER_MINOR_DETAILS;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const session = input.session;
    const participantName = session.participantName as string | undefined;
    const participantAge = session.participantAge as string | undefined;
    const guardianName = session.guardianName as string | undefined;

    if (!participantName) {
      return {
        nextState: STATES.ENTER_MINOR_DETAILS,
        sessionData: {
          ...input.session,
          participantName: input.message.trim(),
        },
        reply: "Please provide the participant age.",
      };
    }

    if (!participantAge) {
      return {
        nextState: STATES.ENTER_MINOR_DETAILS,
        sessionData: { ...input.session, participantAge: input.message.trim() },
        reply: "Please provide the guardian name.",
      };
    }

    if (!guardianName) {
      return {
        nextState: STATES.ENTER_MINOR_DETAILS,
        sessionData: { ...input.session, guardianName: input.message.trim() },
        reply: "Please accept the waiver.\n\n1️⃣ Accept\n2️⃣ Cancel",
        buttons: [
          { label: "Accept", value: "1" },
          { label: "Cancel", value: "2" },
        ],
      };
    }

    return {
      nextState: STATES.WAIVER,
      sessionData: { ...input.session, guardianName },
      reply: "Please accept the waiver.\n\n1️⃣ Accept\n2️⃣ Cancel",
      buttons: [
        { label: "Accept", value: "1" },
        { label: "Cancel", value: "2" },
      ],
    };
  }
}
