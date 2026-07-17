export const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

// Staff lunch/break windows — 15 minutes each, starting at 1pm and 4pm.
// Both fall at the start of a 30-minute slot, so the whole slot is blocked.
export const COOLDOWN_SLOTS = ["13:00", "16:00"];

export function isCooldownSlot(slot: string): boolean {
  return COOLDOWN_SLOTS.includes(slot);
}

// Shuttle service gets an exclusive block, 2:00pm-3:30pm, reserved in case of
// a high shuttle turnout — only shuttle bookings may take these slots.
export const SHUTTLE_EXCLUSIVE_SLOTS = ["14:00", "14:30", "15:00"];

export function isShuttleExclusiveSlot(slot: string): boolean {
  return SHUTTLE_EXCLUSIVE_SLOTS.includes(slot);
}

export function formatTimeSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")}${period}`;
}
