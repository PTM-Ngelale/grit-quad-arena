import { STATES, type ConversationResult } from "@/conversation/types";
import { StateFactory } from "@/conversation/StateFactory";
import { whatsappSessionRepository } from "@/repositories/whatsappSessionRepository";
import { bookingService } from "@/services/bookingService";
import type { BookingInput } from "@/types/booking";

export class ConversationManager {
  private stateFactory = new StateFactory();

  async handleIncomingMessage(
    phoneNumber: string,
    rawMessage: string,
  ): Promise<ConversationResult> {
    const normalizedMessage = rawMessage.trim();
    const session = await whatsappSessionRepository.getSession(phoneNumber);
    const existingSessionData = (session?.session_data ?? {}) as Record<
      string,
      unknown
    >;
    const currentState = session?.current_state ?? STATES.START;

    const now = new Date();
    const lastActivity = session?.last_activity
      ? new Date(session.last_activity)
      : null;
    const isExpired = lastActivity
      ? now.getTime() - lastActivity.getTime() > 24 * 60 * 60 * 1000
      : false;

    if (isExpired) {
      await whatsappSessionRepository.deleteSession(phoneNumber);
      return {
        nextState: STATES.START,
        sessionData: {},
        reply:
          "Welcome back.\n\nYour previous booking session expired.\n\nReply 1 to start a new booking.",
      };
    }

    const handoffKeywords = ["agent", "support", "human", "9"];
    if (handoffKeywords.includes(normalizedMessage.toLowerCase())) {
      await whatsappSessionRepository.saveSession({
        id: session?.id ?? `${phoneNumber}-${Date.now()}`,
        phone_number: phoneNumber,
        current_state: STATES.HANDOFF,
        session_data: existingSessionData,
        last_activity: now.toISOString(),
        created_at: session?.created_at ?? now.toISOString(),
        updated_at: now.toISOString(),
      });
      return {
        nextState: STATES.HANDOFF,
        sessionData: existingSessionData,
        reply:
          "You are being connected to a human agent. Please hold while we connect you.",
      };
    }

    if (
      currentState === STATES.CONFIRMATION &&
      ["1", "confirm"].includes(normalizedMessage.toLowerCase())
    ) {
      const result = await bookingService.submitBooking(
        existingSessionData as BookingInput,
      );
      if (result.success) {
        await whatsappSessionRepository.deleteSession(phoneNumber);
        return {
          nextState: STATES.START,
          sessionData: {},
          reply:
            "Booking submitted successfully. We will confirm your slot shortly.",
        };
      }

      return {
        nextState: currentState,
        sessionData: existingSessionData,
        reply: result.message,
      };
    }

    const inputState = this.stateFactory.create(currentState);
    const result = await inputState.handleMessage({
      message: normalizedMessage,
      session: existingSessionData,
    });

    const nextSessionData = {
      ...existingSessionData,
      ...(result.sessionData ?? {}),
    };
    const updatedSession = {
      id: session?.id ?? `${phoneNumber}-${Date.now()}`,
      phone_number: phoneNumber,
      current_state: result.nextState,
      session_data: nextSessionData,
      last_activity: now.toISOString(),
      created_at: session?.created_at ?? now.toISOString(),
      updated_at: now.toISOString(),
    };

    await whatsappSessionRepository.saveSession(updatedSession);

    return {
      nextState: result.nextState,
      sessionData: nextSessionData,
      reply: result.reply,
      buttons: result.buttons,
    };
  }

  async submitBooking(phoneNumber: string): Promise<ConversationResult> {
    const session = await whatsappSessionRepository.getSession(phoneNumber);
    if (!session) {
      return {
        nextState: STATES.START,
        sessionData: {},
        reply: "Your session was not found. Please start again.",
      };
    }

    const result = await bookingService.submitBooking(
      session.session_data as BookingInput,
    );
    if (result.success) {
      await whatsappSessionRepository.deleteSession(phoneNumber);
      return {
        nextState: STATES.START,
        sessionData: {},
        reply:
          "Booking submitted successfully. We will confirm your slot shortly.",
      };
    }

    return {
      nextState: session.current_state,
      sessionData: session.session_data,
      reply: result.message,
    };
  }
}

export const conversationManager = new ConversationManager();
