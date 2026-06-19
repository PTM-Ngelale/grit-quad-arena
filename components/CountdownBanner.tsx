'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Flag, ArrowRight, X } from 'lucide-react'

// July 19, 2026 — 10:00 AM WAT (UTC+1)
const EVENT_DATE = new Date('2026-07-19T10:00:00+01:00')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft]   = useState<TimeLeft>(getTimeLeft())
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted]     = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  // Don't render on server (avoids hydration mismatch) or after event
  if (!mounted || dismissed || EVENT_DATE.getTime() <= Date.now()) return null

  const units = [
    { value: timeLeft.days,    label: 'days' },
    { value: timeLeft.hours,   label: 'hrs'  },
    { value: timeLeft.minutes, label: 'mins' },
    { value: timeLeft.seconds, label: 'secs' },
  ]

  return (
    <div className="bg-grit-orange">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-10 flex items-center justify-between gap-4">

        <Link href="/events" className="flex items-center gap-3 md:gap-5 flex-1 min-w-0 group">
          {/* Label */}
          <span className="font-body text-grit-black text-[10px] md:text-xs font-bold tracking-widest uppercase whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <Flag size={12} aria-hidden="true" /> Launch Day — 19 July
          </span>

          {/* Divider */}
          <span className="hidden md:block w-px h-4 bg-grit-black/20 shrink-0" />

          {/* Countdown units */}
          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
            {units.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-0.5 shrink-0">
                <span className="font-display text-grit-black text-base md:text-lg leading-none tabular-nums">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="font-body text-grit-black/60 text-[9px] md:text-[10px] uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <span className="hidden md:inline font-body text-grit-black/60 text-[10px] tracking-widest uppercase group-hover:text-grit-black transition-colors ml-auto shrink-0 flex items-center gap-1">
            See event <ArrowRight size={12} aria-hidden="true" />
          </span>
        </Link>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss event banner"
          className="shrink-0 w-6 h-6 flex items-center justify-center text-grit-black/40 hover:text-grit-black transition-colors"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
