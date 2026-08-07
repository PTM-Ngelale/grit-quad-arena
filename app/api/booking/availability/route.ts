import { NextRequest, NextResponse } from "next/server";
import { bookingService } from "@/services/bookingService";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  const booked = await bookingService.getAvailability(date);
  return NextResponse.json({ booked });
}
