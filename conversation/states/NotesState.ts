import {
  STATES,
  type ConversationResult,
  type ConversationState,
} from "@/conversation/types";

export class NotesState implements ConversationState {
  readonly name = STATES.NOTES;

  async handleMessage(input: {
    message: string;
    session: Record<string, unknown>;
  }): Promise<ConversationResult> {
    const text = input.message.trim();
    const notes = text && text.toLowerCase() !== "skip" ? text : "";

    return {
      nextState: STATES.CONFIRMATION,
      sessionData: { ...input.session, notes },
      reply:
        "Booking Summary\n\nDuration: " +
        String(input.session.duration ?? "") +
        "\nDate: " +
        String(input.session.date ?? "") +
        "\nTime: " +
        String(input.session.timeSlot ?? "") +
        "\nRiders: " +
        String(input.session.riders ?? "") +
        "\nShuttle: " +
        (input.session.shuttle ? "Yes" : "No") +
        "\nNotes: " +
        (notes || "None") +
        "\n\n1️⃣ Confirm\n2️⃣ Edit\n3️⃣ Cancel",
      buttons: [
        { label: "Confirm", value: "1" },
        { label: "Edit", value: "2" },
        { label: "Cancel", value: "3" },
      ],
    };
  }
}
