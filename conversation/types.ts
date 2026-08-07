export const STATES = {
  START: "START",
  BOOKING_TYPE: "BOOKING_TYPE",
  SELECT_DURATION: "SELECT_DURATION",
  SELECT_RIDER_COUNT: "SELECT_RIDER_COUNT",
  ENTER_NAME: "ENTER_NAME",
  ENTER_PHONE: "ENTER_PHONE",
  ENTER_EMAIL: "ENTER_EMAIL",
  SELECT_DATE: "SELECT_DATE",
  SELECT_TIME: "SELECT_TIME",
  SELECT_AGE_CATEGORY: "SELECT_AGE_CATEGORY",
  ENTER_MINOR_DETAILS: "ENTER_MINOR_DETAILS",
  WAIVER: "WAIVER",
  SHUTTLE: "SHUTTLE",
  NOTES: "NOTES",
  CONFIRMATION: "CONFIRMATION",
  HANDOFF: "HANDOFF",
} as const;

export interface ConversationInput {
  message: string;
  session: Record<string, unknown>;
}

export interface ConversationResult {
  nextState: string;
  sessionData: Record<string, unknown>;
  reply: string;
  buttons?: Array<{ label: string; value: string }>;
}

export interface ConversationState {
  readonly name: string;
  handleMessage(input: ConversationInput): Promise<ConversationResult>;
}
