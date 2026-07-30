import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  if (process.env.CRON_SECRET) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const { error } = await supabase.from('bookings').select('id').limit(1)
  if (error) {
    console.error('[keep-alive error]', error)
    return NextResponse.json({ error: 'Keep-alive query failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true, pingedAt: new Date().toISOString() })
}
