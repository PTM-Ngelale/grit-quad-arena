import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const DURATION_LABELS: Record<string, string> = {
  '5min':  '5 Minutes — ₦6,000',
  '10min': '10 Minutes — ₦10,000',
  '15min': '15 Minutes — ₦13,000',
  '30min': '30 Minutes — ₦25,000',
  'group': 'Group Ride (3–6 riders)',
}

const SHUTTLE_LABELS: Record<string, string> = {
  'ada-george':  'Genesis Ada George — ₦4,000 pp',
  'trans-amadi': 'Genesis Trans Amadi — ₦3,000 pp',
}

function buildNotificationEmail(data: Record<string, string>): string {
  const duration   = DURATION_LABELS[data.duration] ?? data.duration
  const shuttleLine = data.shuttle === 'on'
    ? `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Shuttle Pickup</td><td style="padding:8px 0;font-size:13px;">${SHUTTLE_LABELS[data.shuttlePickup] ?? data.shuttlePickup ?? 'Requested (pickup TBC)'}</td></tr>`
    : ''

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0D0D0D;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-top:3px solid #CC1111;">
        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 24px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#CC1111;">New Booking Request</p>
            <h1 style="margin:0;font-size:28px;color:#F2EDE6;font-weight:800;">${data.name}</h1>
            <p style="margin:6px 0 0;font-size:14px;color:#6B6B6B;">${duration}</p>
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2A2A2A;">
              <tr>
                <td style="padding:8px 0;color:#6B6B6B;font-size:13px;width:140px;">Phone</td>
                <td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.phone}</td>
              </tr>
              ${data.email ? `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Email</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.email}</td></tr>` : ''}
              <tr>
                <td style="padding:8px 0;color:#6B6B6B;font-size:13px;border-top:1px solid #2A2A2A;">Preferred Date</td>
                <td style="padding:8px 0;font-size:13px;color:#F2EDE6;border-top:1px solid #2A2A2A;">${data.date}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Duration</td>
                <td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${duration}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Riders</td>
                <td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.riders}</td>
              </tr>
              ${shuttleLine}
              ${data.notes ? `<tr><td style="padding:8px 0;color:#6B6B6B;font-size:13px;border-top:1px solid #2A2A2A;vertical-align:top;">Notes</td><td style="padding:8px 0;font-size:13px;color:#F2EDE6;border-top:1px solid #2A2A2A;">${data.notes}</td></tr>` : ''}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 40px 40px;">
            <a href="https://wa.me/${data.phone?.replace(/^0/, '234').replace(/\s/g, '')}"
               style="display:inline-block;background:#CC1111;color:#fff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:12px 24px;">
              Reply on WhatsApp →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #2A2A2A;">
            <p style="margin:0;font-size:11px;color:#6B6B6B;">GRIT Quad Biking Arena · gritarena@outlook.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildConfirmationEmail(data: Record<string, string>): string {
  const duration = DURATION_LABELS[data.duration] ?? data.duration

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0D0D0D;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-top:3px solid #CC1111;">
        <tr>
          <td style="padding:40px 40px 24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#CC1111;">Booking Received</p>
            <h1 style="margin:0 0 8px;font-size:32px;color:#F2EDE6;font-weight:800;">We got you, ${data.name.split(' ')[0]}.</h1>
            <p style="margin:0;font-size:14px;color:#6B6B6B;max-width:380px;margin:8px auto 0;">Your request has been received. We'll confirm your slot via WhatsApp or phone within 24 hours.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2A2A2A;">
              <tr>
                <td style="padding:8px 0;color:#6B6B6B;font-size:13px;width:140px;">Date Requested</td>
                <td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.date}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Duration</td>
                <td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${duration}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6B6B6B;font-size:13px;">Riders</td>
                <td style="padding:8px 0;font-size:13px;color:#F2EDE6;">${data.riders}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 40px;text-align:center;">
            <p style="margin:0 0 20px;font-size:13px;color:#6B6B6B;">Questions? Reach us on WhatsApp:</p>
            <a href="https://wa.me/447443023079"
               style="display:inline-block;background:#CC1111;color:#fff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:12px 24px;">
              Chat on WhatsApp
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #2A2A2A;text-align:center;">
            <p style="margin:0;font-size:11px;color:#6B6B6B;">GRIT Quad Biking Arena · Port Harcourt · Open Fri, Sat & Sun 10am–6pm</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string>

    // Validate required fields
    const missing = ['name', 'phone', 'duration', 'date', 'riders'].filter((f) => !body[f])
    if (missing.length) {
      return NextResponse.json(
        { error: `Missing fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      // Dev fallback — log and return success so form works without a key
      console.log('[Booking received — no RESEND_API_KEY set]', body)
      return NextResponse.json({ success: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const sends: Promise<unknown>[] = []

    // Notify the business
    sends.push(
      resend.emails.send({
        from: 'GRIT Arena Bookings <onboarding@resend.dev>',
        to: ['preciousngelale@gmail.com'],
        replyTo: body.email || undefined,
        subject: `New Booking — ${body.name} · ${DURATION_LABELS[body.duration] ?? body.duration}`,
        html: buildNotificationEmail(body),
      }).catch((err) => console.error('[booking notify error]', err))
    )

    // Confirm to customer if they gave an email; CC the business on every confirmation
    if (body.email) {
      sends.push(
        resend.emails.send({
          from: 'GRIT Arena <onboarding@resend.dev>',
          to: [body.email],
          cc: ['preciousngelale@gmail.com'],
          subject: 'Booking request received — GRIT Quad Biking Arena',
          html: buildConfirmationEmail(body),
        }).catch((err) => console.error('[booking confirm error]', err))
      )
    }

    await Promise.all(sends)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[booking API error]', err)
    return NextResponse.json({ error: 'Failed to send booking request' }, { status: 500 })
  }
}
