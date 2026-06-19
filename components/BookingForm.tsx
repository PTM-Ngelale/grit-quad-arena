'use client'
import { useState, useEffect } from 'react'

const soloRides = [
  { id: '5min',  label: '5 Minutes',  price: '₦6,000'  },
  { id: '10min', label: '10 Minutes', price: '₦10,000' },
  { id: '15min', label: '15 Minutes', price: '₦13,000' },
  { id: '30min', label: '30 Minutes', price: '₦25,000' },
]

const shuttleOptions = [
  { id: 'ada-george',  label: 'Genesis — Ada George (₦4,000 pp)' },
  { id: 'trans-amadi', label: 'Genesis — Trans Amadi (₦3,000 pp)' },
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface Props {
  selectedDuration?: string
  onDurationChange?: (id: string) => void
}

function SuccessCard({ name }: { name: string }) {
  return (
    <div className="border border-grit-orange/50 bg-grit-grey p-10 text-center">
      <p className="font-body text-grit-orange text-xs tracking-widest uppercase mb-4">Request Received</p>
      <h3 className="font-display text-grit-white text-4xl leading-none mb-4">
        We got you, {name.split(' ')[0]}.
      </h3>
      <p className="font-body text-grit-white/60 text-sm leading-relaxed max-w-sm mx-auto mb-8">
        Your booking request has been sent. We&apos;ll confirm your slot via WhatsApp or phone within 24 hours.
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
  )
}

export default function BookingForm({ selectedDuration, onDurationChange }: Props) {
  const [status, setStatus]         = useState<Status>('idle')
  const [errorMsg, setErrorMsg]     = useState('')
  const [wantsShuttle, setWantsShuttle] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [dateError, setDateError]   = useState('')
  const [duration, setDuration]     = useState(selectedDuration ?? '')

  useEffect(() => {
    if (selectedDuration) setDuration(selectedDuration)
  }, [selectedDuration])

  function isOperatingDay(value: string) {
    if (!value) return true
    const day = new Date(value + 'T00:00:00').getDay() // local midnight avoids UTC offset shift
    return day === 5 || day === 6 || day === 0
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDateError(isOperatingDay(e.target.value) ? '' : 'We operate on Fridays, Saturdays, and Sundays. Please pick one of those days.')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const fd   = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries()) as Record<string, string>

    // Basic client-side guard
    if (!data.name?.trim() || !data.phone?.trim() || !data.duration || !data.date || !data.riders) {
      setErrorMsg('Please fill in all required fields.')
      setStatus('error')
      return
    }

    if (!isOperatingDay(data.date)) {
      setErrorMsg('We operate on Fridays, Saturdays, and Sundays. Please pick one of those days.')
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error ?? 'Something went wrong. Please try again.')
      }

      setSubmittedName(data.name)
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') return <SuccessCard name={submittedName} />

  const isSubmitting = status === 'submitting'

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
          Email <span className="text-grit-muted">(optional — for confirmation)</span>
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
            setDuration(e.target.value)
            onDurationChange?.(e.target.value)
          }}
          className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors disabled:opacity-50"
        >
          <option value="" disabled>Select a duration</option>
          {soloRides.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label} — {r.price}
            </option>
          ))}
          <option value="group">Group Ride (3–6 riders) — contact for rate</option>
        </select>
      </div>

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
          onChange={handleDateChange}
          className={`w-full bg-grit-grey border text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors disabled:opacity-50 ${dateError ? 'border-red-400' : 'border-grit-grey/80'}`}
        />
        {dateError
          ? <p className="font-body text-red-400 text-xs mt-1">{dateError}</p>
          : <p className="font-body text-grit-muted text-xs mt-1">Fridays, Saturdays and Sundays only</p>
        }
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
          disabled={isSubmitting}
          className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted disabled:opacity-50"
        />
      </div>

      {/* Shuttle toggle */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="shuttle"
            checked={wantsShuttle}
            onChange={(e) => setWantsShuttle(e.target.checked)}
            disabled={isSubmitting}
            className="mt-1 accent-grit-orange"
          />
          <span className="font-body text-grit-white/70 text-sm leading-relaxed">
            I need shuttle pickup{' '}
            <span className="text-grit-muted">(groups of 4+ · any activity · 24hrs notice · 30% deposit)</span>
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
              <option value="" disabled>Select pickup point</option>
              {shuttleOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
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
      {status === 'error' && (
        <p className="font-body text-red-400 text-sm border border-red-400/30 bg-red-400/10 px-4 py-3">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="grit-btn w-full font-body font-semibold text-sm py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Submit Booking Request'}
      </button>

      <p className="font-body text-grit-muted text-xs text-center">
        We&apos;ll confirm your slot via WhatsApp or phone within 24 hours.
      </p>
    </form>
  )
}
