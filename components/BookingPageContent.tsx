'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'
import BookingForm from './BookingForm'

const soloRides = [
  { id: '5min',  label: '5 Minutes',  price: '₦6,000',  sublabel: 'Quick Thrill',  featured: false },
  { id: '10min', label: '10 Minutes', price: '₦10,000', sublabel: 'Perfect Start', featured: false },
  { id: '15min', label: '15 Minutes', price: '₦13,000', sublabel: 'Most Popular',  featured: true  },
  { id: '30min', label: '30 Minutes', price: '₦25,000', sublabel: 'Premium Ride',  featured: false },
]

export default function BookingPageContent() {
  const searchParams = useSearchParams()
  const [selectedDuration, setSelectedDuration] = useState(searchParams.get('duration') ?? '')

  function pickDuration(id: string) {
    setSelectedDuration(id)
    document.getElementById('your-details')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Pricing quick-ref */}
      <section className="py-16 bg-grit-grey border-b border-grit-black">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-6">Solo Ride Prices</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {soloRides.map((ride) => (
              <button
                key={ride.id}
                type="button"
                onClick={() => pickDuration(ride.id)}
                className={`relative p-5 bg-grit-black text-left w-full transition-all duration-200 ${
                  selectedDuration === ride.id
                    ? 'border-2 border-grit-orange'
                    : ride.featured
                      ? 'border-2 border-grit-orange/40 hover:border-grit-orange'
                      : 'border border-grit-grey hover:border-grit-orange/50'
                }`}
              >
                {ride.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-body text-xs font-bold text-grit-black bg-grit-orange px-3 py-1 whitespace-nowrap">
                    POPULAR
                  </span>
                )}
                {selectedDuration === ride.id && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-grit-orange flex items-center justify-center">
                    <Check size={11} className="text-grit-black" strokeWidth={3} />
                  </span>
                )}
                <p className="font-display text-grit-orange text-2xl leading-none">{ride.label}</p>
                <p className="font-display text-grit-white text-3xl leading-none mt-1">{ride.price}</p>
                <p className="font-body text-grit-muted text-xs mt-2">{ride.sublabel}</p>
              </button>
            ))}
          </div>
          <p className="font-body text-grit-muted text-xs mt-4">
            Group deals available —{' '}
            <a href="/#pricing" className="text-grit-sand hover:text-grit-orange transition-colors underline underline-offset-2">
              see full pricing
            </a>{' '}
            for group rates (3–6 riders).
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section id="your-details" className="py-24 bg-grit-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Live booking form */}
            <div>
              <h2 className="font-display text-grit-white text-4xl leading-none mb-8">Your Details</h2>
              <BookingForm selectedDuration={selectedDuration} onDurationChange={setSelectedDuration} />
            </div>

            {/* Sidebar */}
            <div className="space-y-10">
              <div>
                <h3 className="font-display text-grit-white text-3xl leading-none mb-6">Prefer to Call?</h3>
                <p className="font-body text-grit-white/70 text-sm leading-relaxed mb-6">
                  Walk in anytime during opening hours or reach us directly — we&apos;ll get you sorted on the spot.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="tel:+2348078591455" className="font-body font-semibold px-6 py-3 text-sm bg-grit-grey text-grit-white hover:bg-grit-orange transition-colors text-center">
                    0807 859 1455
                  </a>
                  <a href="tel:+2347025165644" className="font-body font-semibold px-6 py-3 text-sm bg-grit-grey text-grit-white hover:bg-grit-orange transition-colors text-center">
                    0702 516 5644
                  </a>
                  <a href="tel:+2347040820199" className="font-body font-semibold px-6 py-3 text-sm bg-grit-grey text-grit-white hover:bg-grit-orange transition-colors text-center">
                    0704 082 0199
                  </a>
                  <a
                    href="https://wa.me/447443023079"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-semibold px-6 py-3 text-sm border border-grit-white/30 text-grit-white hover:border-grit-orange hover:text-grit-orange transition-colors text-center"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="border border-grit-orange/30 bg-grit-grey p-6">
                <p className="font-body text-grit-orange text-xs tracking-widest uppercase mb-2">Shuttle Service</p>
                <h3 className="font-display text-grit-white text-2xl leading-none mb-3">We&apos;ll Pick You Up</h3>
                <p className="font-body text-grit-white/60 text-xs leading-relaxed mb-4">
                  Groups of 4+ riders · 24hrs notice · 30% deposit required
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-body text-grit-white/70 text-xs">Genesis — Ada George</span>
                    <span className="font-display text-grit-sand text-base">₦4,000 pp</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-grit-white/70 text-xs">Genesis — Trans Amadi</span>
                    <span className="font-display text-grit-sand text-base">₦3,000 pp</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-grit-grey pt-10">
                <h3 className="font-display text-grit-white text-2xl leading-none mb-4">Opening Hours</h3>
                <p className="font-body text-grit-white text-sm font-semibold">Fri, Sat &amp; Sun</p>
                <p className="font-body text-grit-muted text-sm">10:00am – 6:00pm</p>
              </div>

              <div className="border-t border-grit-grey pt-10">
                <h3 className="font-display text-grit-white text-2xl leading-none mb-4">Good to Know</h3>
                <ul className="space-y-3">
                  {[
                    'Helmets and safety gear provided',
                    'Walk-ins welcome — subject to availability',
                    'Group bookings recommended 24hrs in advance',
                    'Maximum 6 riders per slot',
                  ].map((item) => (
                    <li key={item} className="font-body text-grit-white/70 text-sm flex items-start gap-2">
                      <Check size={14} className="text-grit-orange mt-0.5 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
