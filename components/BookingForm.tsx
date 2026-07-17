"use client";
import { useState, useEffect } from "react";
import {
  TIME_SLOTS,
  formatTimeSlot,
  isCooldownSlot,
  isShuttleExclusiveSlot,
} from "@/lib/timeSlots";

const soloRides = [
  { id: "5min", label: "5 Minutes", price: "₦6,000" },
  { id: "10min", label: "10 Minutes", price: "₦10,000" },
  { id: "15min", label: "15 Minutes", price: "₦13,000" },
];

const groupBookings = [
  { id: "5min-g3", durationLabel: "5 Minutes", riders: 3, price: "₦17,100" },
  { id: "5min-g4", durationLabel: "5 Minutes", riders: 4, price: "₦22,200" },
  { id: "5min-g5", durationLabel: "5 Minutes", riders: 5, price: "₦27,000" },
  { id: "5min-g6", durationLabel: "5 Minutes", riders: 6, price: "₦31,500" },
  { id: "10min-g3", durationLabel: "10 Minutes", riders: 3, price: "₦28,500" },
  { id: "10min-g4", durationLabel: "10 Minutes", riders: 4, price: "₦37,000" },
  { id: "10min-g5", durationLabel: "10 Minutes", riders: 5, price: "₦45,000" },
  { id: "10min-g6", durationLabel: "10 Minutes", riders: 6, price: "₦52,500" },
  { id: "15min-g3", durationLabel: "15 Minutes", riders: 3, price: "₦37,050" },
  { id: "15min-g4", durationLabel: "15 Minutes", riders: 4, price: "₦48,100" },
  { id: "15min-g5", durationLabel: "15 Minutes", riders: 5, price: "₦58,500" },
  { id: "15min-g6", durationLabel: "15 Minutes", riders: 6, price: "₦68,250" },
];

const shuttleOptions = [
  { id: "ada-george", label: "Genesis — Ada George (₦4,000 pp)" },
  { id: "trans-amadi", label: "Genesis — Trans Amadi (₦3,000 pp)" },
];

const ADULT_WAIVER_TITLE = "QUAD BIKING WAIVER & INDEMNITY FORM (Adult 18+)";
const ADULT_WAIVER_TEXT = `Participant Acknowledgement of Risk. I understand that quad biking is a medium-risk sport that involves physical exertion, uneven terrain, and possible collisions or falls. I accept that injury, property damage, or loss may occur as part of normal participation. I confirm that: I am 18 years or older and participating voluntarily. I am fit and healthy to ride. I will follow all safety instructions and wear the required protective gear. I understand that the organisers cannot be held responsible for injuries, accidents, or damages arising during the activity. I accept all risks and indemnify Grit quad biking arena, its owners, and staff against all claims, costs, or legal fees resulting from my participation.`;

const MINOR_WAIVER_TITLE = "GRIT QUAD BIKING WAIVER & PARENT/GUARDIAN CONSENT FORM (UNDER 18)";
const MINOR_WAIVER_TEXT = `Acknowledgement of Risk (For Participants Under 18). I understand that quad biking is a medium-risk outdoor activity involving speed, uneven terrain, and the potential for injury or property damage. I agree to follow all safety instructions and wear protective equipment at all times. Parent/Guardian Consent. I, the undersigned parent/guardian of the participant named below: Confirm that I have read and understood the risks associated with quad biking. Consent to my child's participation at their own risk. Agree to release and indemnify Grit Quad Biking Arena, its staff, and owners from any liability, injury, damage, or costs that may arise from their participation. Accept full responsibility for their safety, conduct, and compliance with all rules during the activity.`;

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  selectedDuration?: string;
  onDurationChange?: (id: string) => void;
}

function SuccessCard({ name }: { name: string }) {
  return (
    <div className="border border-grit-orange/50 bg-grit-grey p-10 text-center">
      <p className="font-body text-grit-orange text-xs tracking-widest uppercase mb-4">
        Request Received
      </p>
      <h3 className="font-display text-grit-white text-4xl leading-none mb-4">
        We got you, {name.split(" ")[0]}.
      </h3>
      <p className="font-body text-grit-white/60 text-sm leading-relaxed max-w-sm mx-auto mb-8">
        Your booking request has been sent. We&apos;ll confirm your slot via
        WhatsApp or phone within 24 hours.
      </p>
      <a
        href="https://wa.me/447443023079"
        target="_blank"
        rel="noopener noreferrer"
        className="grit-btn font-body font-semibold text-sm px-8 py-4 inline-block"
      >
        Chat on WhatsApp
      </a>
    </div>
  );
}

export default function BookingForm({
  selectedDuration,
  onDurationChange,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [wantsShuttle, setWantsShuttle] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [dateError, setDateError] = useState("");
  const [duration, setDuration] = useState(selectedDuration ?? "");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [riders, setRiders] = useState("");
  const [ageCategory, setAgeCategory] = useState<"" | "adult" | "minor">("");
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [participantAge, setParticipantAge] = useState("");

  useEffect(() => {
    if (selectedDuration) setDuration(selectedDuration);
  }, [selectedDuration]);

  const selectedGroupBooking = groupBookings.find((g) => g.id === duration);

  const waiverComplete =
    ageCategory === "adult"
      ? waiverAccepted
      : ageCategory === "minor"
        ? waiverAccepted &&
          !!participantName.trim() &&
          !!guardianName.trim() &&
          !!participantAge.trim()
        : false;

  function isOperatingDay(value: string) {
    if (!value) return true;
    const day = new Date(value + "T00:00:00").getDay(); // local midnight avoids UTC offset shift
    return day === 5 || day === 6 || day === 0;
  }

  async function fetchAvailability(value: string) {
    if (!value || !isOperatingDay(value)) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    try {
      const res = await fetch(
        `/api/booking/availability?date=${encodeURIComponent(value)}`,
      );
      const json = await res.json();
      setBookedSlots(json.booked ?? []);
    } catch {
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDate(value);
    setTimeSlot("");
    setDateError(
      isOperatingDay(value)
        ? ""
        : "We operate on Fridays & Saturdays. Please pick one of those days.",
    );
    fetchAvailability(value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    // Basic client-side guard
    if (
      !data.name?.trim() ||
      !data.phone?.trim() ||
      !data.duration ||
      !data.date ||
      !data.timeSlot ||
      !data.riders
    ) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    if (!data.ageCategory) {
      setErrorMsg(
        "Please select whether all riders are 18+ or a rider is under 18.",
      );
      setStatus("error");
      return;
    }

    if (data.waiverAccepted !== "on") {
      setErrorMsg("Please read and accept the waiver before submitting.");
      setStatus("error");
      return;
    }

    if (
      data.ageCategory === "minor" &&
      (!data.participantName?.trim() ||
        !data.guardianName?.trim() ||
        !data.participantAge?.trim())
    ) {
      setErrorMsg(
        "Please complete the participant name, parent/guardian name, and age for the consent form.",
      );
      setStatus("error");
      return;
    }

    if (!isOperatingDay(data.date)) {
      setErrorMsg(
        "We operate on Fridays and Saturdays. Please pick one of those days.",
      );
      setStatus("error");
      return;
    }

    if (isCooldownSlot(data.timeSlot)) {
      setErrorMsg(
        "That time falls within a staff cooldown break. Please choose another time.",
      );
      setStatus("error");
      return;
    }

    if (isShuttleExclusiveSlot(data.timeSlot) && data.shuttle !== "on") {
      setErrorMsg(
        "2:00pm–3:30pm is reserved exclusively for shuttle riders. Please choose another time or add shuttle pickup.",
      );
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        if (res.status === 409) {
          setTimeSlot("");
          fetchAvailability(data.date);
        }
        throw new Error(
          (json as { error?: string }).error ??
            "Something went wrong. Please try again.",
        );
      }

      setSubmittedName(data.name);
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") return <SuccessCard name={submittedName} />;

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
          Full Name <span className="text-grit-orange">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          disabled={isSubmitting}
          className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted disabled:opacity-50"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
          Phone Number <span className="text-grit-orange">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="e.g. 080XXXXXXXX"
          disabled={isSubmitting}
          className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted disabled:opacity-50"
        />
      </div>

      {/* Email (optional) */}
      <div>
        <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
          Email{" "}
          <span className="text-grit-muted">(optional — for confirmation)</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          disabled={isSubmitting}
          className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted disabled:opacity-50"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
          Ride Duration <span className="text-grit-orange">*</span>
        </label>
        <select
          name="duration"
          required
          disabled={isSubmitting}
          value={duration}
          onChange={(e) => {
            const value = e.target.value;
            setDuration(value);
            onDurationChange?.(value);
            const group = groupBookings.find((g) => g.id === value);
            if (group) setRiders(String(group.riders));
          }}
          className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors disabled:opacity-50"
        >
          <option value="" disabled>
            Select a duration
          </option>
          <optgroup label="Solo Ride">
            {soloRides.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} — {r.price}
              </option>
            ))}
          </optgroup>
          <optgroup label="Group Booking">
            {groupBookings.map((g) => (
              <option key={g.id} value={g.id}>
                {g.durationLabel} · Group of {g.riders} — {g.price}
              </option>
            ))}
          </optgroup>
          <option value="30min">30 Minutes (Premium) — DM to Book</option>
        </select>
      </div>

      {/* 30-minute premium ride — booked directly via WhatsApp, skip the rest of the form */}
      {duration === "30min" ? (
        <div className="border border-grit-orange/40 bg-grit-grey p-6 text-center">
          <p className="font-body text-grit-white/70 text-sm leading-relaxed mb-5">
            Our 30-minute premium ride is arranged directly with our team.
            DM us on WhatsApp to lock in your slot.
          </p>
          <a
            href={`https://wa.me/447443023079?text=${encodeURIComponent("Hi! I'd like to book the 30 Minutes premium ride.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="grit-btn font-body font-semibold text-sm px-8 py-4 inline-block"
          >
            Chat on WhatsApp
          </a>
        </div>
      ) : (
        <>
      {/* Date */}
      <div>
        <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
          Preferred Date <span className="text-grit-orange">*</span>
        </label>
        <input
          type="date"
          name="date"
          required
          disabled={isSubmitting}
          value={date}
          onChange={handleDateChange}
          className={`w-full bg-grit-grey border text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors disabled:opacity-50 ${dateError ? "border-red-400" : "border-grit-grey/80"}`}
        />
        {dateError ? (
          <p className="font-body text-red-400 text-xs mt-1">{dateError}</p>
        ) : (
          <p className="font-body text-grit-muted text-xs mt-1">
            Fridays and Saturdays only
          </p>
        )}
      </div>

      {/* Time Slot */}
      <div>
        <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
          Time Slot <span className="text-grit-orange">*</span>
        </label>
        <select
          name="timeSlot"
          required
          disabled={isSubmitting || !date || !!dateError}
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors disabled:opacity-50"
        >
          <option value="" disabled>
            {!date
              ? "Pick a date first"
              : loadingSlots
                ? "Checking availability..."
                : "Select a time"}
          </option>
          {TIME_SLOTS.map((slot) => {
            const shuttleOnly = isShuttleExclusiveSlot(slot) && !wantsShuttle;
            return (
              <option
                key={slot}
                value={slot}
                disabled={
                  bookedSlots.includes(slot) ||
                  isCooldownSlot(slot) ||
                  shuttleOnly
                }
              >
                {formatTimeSlot(slot)}
                {isCooldownSlot(slot)
                  ? " — Staff Cooldown"
                  : bookedSlots.includes(slot)
                    ? " — Booked"
                    : shuttleOnly
                      ? " — Shuttle Riders Only"
                      : ""}
              </option>
            );
          })}
        </select>
        <p className="font-body text-grit-muted text-xs mt-1">
          Already-booked slots and staff cooldown breaks (1:00–1:15pm &amp;
          4:00–4:15pm) are marked and can&apos;t be selected.
        </p>
        <p className="font-body text-grit-muted text-xs mt-1">
          2:00pm–3:30pm is reserved exclusively for shuttle riders.
        </p>
        <p className="font-body text-grit-orange text-xs mt-1">
          Booked riders must be present 10 minutes prior to their booking
          time — missing your slot will result in forfeiture of your
          booking.
        </p>
      </div>

      {/* Riders */}
      <div>
        <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
          Number of Riders <span className="text-grit-orange">*</span>
        </label>
        <input
          type="number"
          name="riders"
          required
          min="1"
          max="20"
          placeholder="1"
          value={riders}
          onChange={(e) => setRiders(e.target.value)}
          disabled={isSubmitting}
          readOnly={!!selectedGroupBooking}
          className={`w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted disabled:opacity-50 ${selectedGroupBooking ? "opacity-70 cursor-not-allowed" : ""}`}
        />
        {selectedGroupBooking && (
          <p className="font-body text-grit-muted text-xs mt-1">
            Group size is set by your selection above.
          </p>
        )}
      </div>

      {/* Waiver & Consent */}
      <div className="space-y-4">
        <div>
          <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
            Rider Age Category <span className="text-grit-orange">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="ageCategory"
                value="adult"
                required
                checked={ageCategory === "adult"}
                onChange={() => {
                  setAgeCategory("adult");
                  setWaiverAccepted(false);
                }}
                disabled={isSubmitting}
                className="mt-1 accent-grit-orange"
              />
              <span className="font-body text-grit-white/70 text-sm leading-relaxed">
                All riders are 18 years or older
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="ageCategory"
                value="minor"
                required
                checked={ageCategory === "minor"}
                onChange={() => {
                  setAgeCategory("minor");
                  setWaiverAccepted(false);
                }}
                disabled={isSubmitting}
                className="mt-1 accent-grit-orange"
              />
              <span className="font-body text-grit-white/70 text-sm leading-relaxed">
                Includes a rider under 18 (parent/guardian consent required)
              </span>
            </label>
          </div>
        </div>

        {ageCategory && (
          <>
            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">
                {ageCategory === "adult" ? ADULT_WAIVER_TITLE : MINOR_WAIVER_TITLE}
              </p>
              <div className="border border-grit-orange/40 bg-grit-grey p-4 max-h-56 overflow-y-auto">
                <p className="font-body text-grit-white/70 text-sm leading-relaxed">
                  {ageCategory === "adult" ? ADULT_WAIVER_TEXT : MINOR_WAIVER_TEXT}
                </p>
              </div>
            </div>

            {ageCategory === "minor" && (
              <div className="pl-7 space-y-4">
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Participant Name <span className="text-grit-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="participantName"
                    required
                    placeholder="Child's full name"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Parent/Guardian Name (Signature) <span className="text-grit-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    required
                    placeholder="Type parent/guardian full legal name to sign"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted disabled:opacity-50"
                  />
                  <p className="font-body text-grit-muted text-xs mt-1">
                    Typing your name here serves as your electronic signature on the consent form above.
                  </p>
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Participant Age <span className="text-grit-orange">*</span>
                  </label>
                  <input
                    type="number"
                    name="participantAge"
                    required
                    min="1"
                    max="17"
                    placeholder="e.g. 15"
                    value={participantAge}
                    onChange={(e) => setParticipantAge(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted disabled:opacity-50"
                  />
                </div>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="waiverAccepted"
                required
                checked={waiverAccepted}
                onChange={(e) => setWaiverAccepted(e.target.checked)}
                disabled={isSubmitting}
                className="mt-1 accent-grit-orange"
              />
              <span className="font-body text-grit-white/70 text-sm leading-relaxed">
                {ageCategory === "adult"
                  ? 'I have read and agree to the Waiver & Indemnity Form above. Typing my full name in the "Full Name" field above and submitting this form serves as my electronic signature.'
                  : 'I have read and agree to the Waiver & Parent/Guardian Consent Form above on behalf of the participant named above. Typing my name in the "Parent/Guardian Name" field above serves as my electronic signature.'}
              </span>
            </label>
          </>
        )}
      </div>

      {/* Shuttle toggle */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="shuttle"
            checked={wantsShuttle}
            onChange={(e) => {
              const checked = e.target.checked;
              setWantsShuttle(checked);
              if (!checked && isShuttleExclusiveSlot(timeSlot)) {
                setTimeSlot("");
              }
            }}
            disabled={isSubmitting}
            className="mt-1 accent-grit-orange"
          />
          <span className="font-body text-grit-white/70 text-sm leading-relaxed">
            I need shuttle pickup{" "}
            <span className="text-grit-muted">
              (groups of 4+ · any activity · 24hrs notice · 30% deposit)
            </span>
          </span>
        </label>

        {/* Shuttle pickup location — shown when shuttle is checked */}
        {wantsShuttle && (
          <div className="pl-7">
            <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
              Pickup Point <span className="text-grit-orange">*</span>
            </label>
            <select
              name="shuttlePickup"
              required={wantsShuttle}
              disabled={isSubmitting}
              defaultValue=""
              className="w-full bg-grit-grey border border-grit-orange/50 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors disabled:opacity-50"
            >
              <option value="" disabled>
                Select pickup point
              </option>
              {shuttleOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          rows={4}
          placeholder="Any special requests, activities (archery, jell blasters), age of riders..."
          disabled={isSubmitting}
          className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted resize-none disabled:opacity-50"
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="font-body text-red-400 text-sm border border-red-400/30 bg-red-400/10 px-4 py-3">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !waiverComplete}
        className="grit-btn w-full font-body font-semibold text-sm py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Submit Booking Request"}
      </button>

      <p className="font-body text-grit-muted text-xs text-center">
        We&apos;ll confirm your slot via WhatsApp or phone within 24 hours.
      </p>
        </>
      )}
    </form>
  );
}
