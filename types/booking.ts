export type AgeCategory = "adult" | "minor";

export interface BookingInput {
  name?: string;
  phone?: string;
  email?: string;
  duration?: string;
  date?: string;
  timeSlot?: string;
  riders?: string;
  ageCategory?: string;
  waiverAccepted?: boolean | string;
  participantName?: string;
  guardianName?: string;
  participantAge?: string | number;
  shuttle?: boolean | string;
  shuttlePickup?: string;
  notes?: string;
}

export interface BookingSubmissionResult {
  success: boolean;
  message: string;
}

export interface ConversationStateResult {
  nextState: string;
  sessionData: Record<string, unknown>;
  reply: string;
  buttons?: Array<{ label: string; value: string }>;
}

export interface WhatsappSession {
  id: string;
  phone_number: string;
  current_state: string;
  session_data: Record<string, unknown>;
  last_activity: string;
  created_at: string;
  updated_at: string;
}
