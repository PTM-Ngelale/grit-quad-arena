import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Dev fallback — no Supabase configured, so nothing is booked
    return NextResponse.json({ booked: [] });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("time_slot")
    .eq("date", date);

  if (error) {
    console.error("[availability error]", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 },
    );
  }

  return NextResponse.json({ booked: data.map((row) => row.time_slot) });
}
