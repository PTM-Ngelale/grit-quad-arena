# GRIT Quad Booking Structure

This document explains how the booking flow works in this project, from the user-facing booking page to the server-side API and persistence layer.

## 1. High-level overview

The booking system is built with:

- Next.js App Router
- React components for the booking UI
- Supabase for storing bookings
- Resend for sending booking emails

The main flow is:

1. A visitor opens the booking page.
2. They choose a ride duration and fill out the booking form.
3. The form validates business rules on the client.
4. The form submits to the booking API endpoint.
5. The API stores the booking in Supabase (if configured).
6. The API sends notification emails to the business and a confirmation email to the customer (if an email address is provided).

---

## 2. Entry points in the app

### Booking page

The public booking page lives at:

- [app/booking/page.tsx](app/booking/page.tsx)

This page renders the booking experience and wraps the booking UI in a suspense boundary.

### Booking content

The main booking experience is rendered by:

- [components/BookingPageContent.tsx](components/BookingPageContent.tsx)

This component:

- shows pricing cards for solo rides and group deals
- lets the user select a duration
- scrolls to the booking form when a duration is chosen
- passes the selected duration into the booking form

---

## 3. Booking form UI

The booking form is implemented in:

- [components/BookingForm.tsx](components/BookingForm.tsx)

This is the heart of the booking experience. It handles:

- full name
- phone number
- optional email
- ride duration
- preferred date
- time slot
- number of riders
- rider age category
- waiver acceptance
- shuttle pickup option
- notes

### What the form does

The form does three important things:

1. It collects booking information from the user.
2. It validates the request before submission.
3. It sends the booking request to the booking API.

### Special form behavior

The form has some built-in business rules:

- The 30-minute premium ride is not submitted through the form. It redirects the user to WhatsApp instead.
- The selected duration can pre-fill the rider count for group bookings.
- The form disables certain time slots if they are booked, in cooldown, or shuttle-only.
- For minors, the form asks for extra consent details and requires a parent/guardian signature field.

---

## 4. Pricing and booking options

The pricing structure is defined in the booking form component and the booking page content component.

### Solo rides

These are the standard solo options:

- 5 minutes
- 10 minutes
- 15 minutes
- 30 minutes premium

### Group bookings

Group prices are defined for:

- 3 riders
- 4 riders
- 5 riders
- 6 riders

These group prices apply to the same duration selection.

### Shuttle bookings

Shuttle pickup is an optional add-on that can be selected during booking. The project supports a couple of pickup locations:

- Genesis Ada George
- Genesis Trans Amadi

---

## 5. Time slot logic

Time slot behavior is defined in:

- [lib/timeSlots.ts](lib/timeSlots.ts)

### Available time slots

The system uses a fixed set of time slots:

- 10:00
- 10:30
- 11:00
- 11:30
- 12:00
- 12:30
- 13:00
- 13:30
- 14:00
- 14:30
- 15:00
- 15:30
- 16:00
- 16:30
- 17:00
- 17:30

### Business rules encoded in the slot logic

The system blocks specific times for operational reasons:

- Cooldown breaks at 13:00 and 16:00
- Shuttle-exclusive slots at 14:00, 14:30, and 15:00

This means the booking form will not allow a user to select those slots unless the business rules allow it.

### Formatting helper

The helper function `formatTimeSlot()` converts the raw slot values into user-friendly display values such as 1:00pm or 4:30pm.

---

## 6. Availability checking

Availability is handled by the API route:

- [app/api/booking/availability/route.ts](app/api/booking/availability/route.ts)

### How it works

When the user picks a date, the form calls:

- `/api/booking/availability?date=YYYY-MM-DD`

The API:

1. reads the selected date from the query string
2. connects to Supabase
3. queries the `bookings` table for bookings on that date
4. returns the booked time slots as a JSON array

If Supabase is not configured, the API returns an empty booked list so the form still behaves in development mode.

---

## 7. Booking submission flow

The actual booking submission is handled by:

- [app/api/booking/route.ts](app/api/booking/route.ts)

### Request lifecycle

When the form submits:

1. The client sends a POST request to `/api/booking`
2. The API parses the JSON body
3. It validates the required booking fields
4. It checks business rules such as:
   - operating day
   - cooldown slot
   - shuttle-only slot
   - waiver acceptance
   - minor consent requirements
5. It inserts the booking into Supabase if the database is configured
6. It sends emails to the team and optionally to the customer

### Important validation rules

The API rejects a submission if:

- required fields are missing
- the selected slot is a cooldown slot
- the selected slot is shuttle-only and the user did not request shuttle pickup
- the waiver is not accepted
- a minor booking is missing participant or guardian information

---

## 8. Persistence layer

The Supabase client is created in:

- [lib/supabase.ts](lib/supabase.ts)

The project expects these environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

If these values are missing, the booking API will not write to the database, but the rest of the UI can still function in a fallback mode.

### Data stored for each booking

The booking insert includes these fields:

- `name`
- `phone`
- `email`
- `duration`
- `date`
- `time_slot`
- `riders`
- `shuttle`
- `shuttle_pickup`
- `notes`
- `age_category`
- `waiver_accepted`
- `participant_name`
- `guardian_name`
- `participant_age`

The code expects a Supabase table named `bookings`.

---

## 9. Email notifications

Booking submissions can trigger email sending through Resend.

### Notification email to the business

The booking API sends a detailed booking email to the business inbox at `gritarena@outlook.com`.

This email includes:

- customer name
- phone number
- email (if provided)
- preferred date
- selected time slot
- ride duration
- rider count
- waiver information
- shuttle information
- notes

### Confirmation email to the customer

If the customer entered an email address, the API sends a confirmation email to them and copies the business.

This email confirms that the booking request was received and directs the customer to WhatsApp or phone for follow-up.

---

## 10. Business rules summary

The booking structure is built around a few important operational rules:

- Bookings are only accepted on Fridays, Saturdays, and Sundays.
- Certain time slots are blocked for staff cooldown breaks.
- Shuttle bookings have exclusive access to a specific afternoon window.
- A booking requires waiver acceptance.
- Minors require additional consent information.
- The system prevents double-booking of the same time slot.
- The 30-minute premium ride is handled outside the standard form flow.

---

## 11. How the structure fits together

A simple mental model is:

- [components/BookingPageContent.tsx](components/BookingPageContent.tsx) prepares the page and pricing experience.
- [components/BookingForm.tsx](components/BookingForm.tsx) collects the booking input and validates it.
- [lib/timeSlots.ts](lib/timeSlots.ts) defines the available and restricted time slots.
- [app/api/booking/availability/route.ts](app/api/booking/availability/route.ts) checks what is already booked.
- [app/api/booking/route.ts](app/api/booking/route.ts) accepts the final booking request and saves it.
- [lib/supabase.ts](lib/supabase.ts) provides the database connection.

---

## 12. Suggested next improvements

If you want to expand this system further, the natural next steps would be:

- add a proper admin dashboard for managing bookings
- add booking status states such as pending, confirmed, canceled, and completed
- add payment and deposit handling for shuttle bookings
- add calendar-based views for staff
- add automated reminders for upcoming bookings
