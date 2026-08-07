import { NextRequest, NextResponse } from "next/server";
import { conversationManager } from "@/conversation/ConversationManager";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message =
      body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body ?? "";
    const from =
      body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from ?? "unknown";

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const result = await conversationManager.handleIncomingMessage(
      from,
      message,
    );
    return NextResponse.json({
      ok: true,
      reply: result.reply,
      nextState: result.nextState,
    });
  } catch (error) {
    console.error("[whatsapp webhook error]", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process message" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "WhatsApp webhook ready" });
}
