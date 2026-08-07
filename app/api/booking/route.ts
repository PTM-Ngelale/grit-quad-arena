import { NextRequest, NextResponse } from "next/server";
import { bookingService } from "@/services/bookingService";
import type { BookingInput } from "@/types/booking";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingInput;
    const result = await bookingService.submitBooking(body);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[booking API error]", err);
    return NextResponse.json(
      { error: "Failed to send booking request" },
      { status: 500 },
    );
  }
}
