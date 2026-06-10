import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export const metadata: Metadata = {
  title: 'Book a Ride — GRIT Quad Biking Arena',
  description: 'Reserve your slot at GRIT Quad Biking Arena, Port Harcourt. Solo rides from ₦6,000. Group deals available. Open Fridays & Saturdays, 10am–6pm.',
}

const soloRides = [
  { id: '5min',  label: '5 Minutes',  price: '₦6,000',  sublabel: 'Quick Thrill',  featured: false },
  { id: '10min', label: '10 Minutes', price: '₦10,000', sublabel: 'Perfect Start', featured: false },
  { id: '15min', label: '15 Minutes', price: '₦13,000', sublabel: 'Most Popular',  featured: true  },
  { id: '30min', label: '30 Minutes', price: '₦25,000', sublabel: 'Premium Ride',  featured: false },
]

export default function BookingPage() {
  return (
    <main className="bg-grit-black min-h-screen">
      <ScrollRevealProvider />
      <Navbar />

      {/* Page header */}
      <section className="pt-40 pb-16 bg-grit-black border-b border-grit-grey">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Reserve Your Slot</p>
          <h1 className="font-display text-grit-white text-6xl md:text-8xl leading-none">
            Book a <span className="text-grit-orange">Ride</span>
          </h1>
        </div>
      </section>

      {/* Pricing reference */}
      <section className="py-16 bg-grit-grey border-b border-grit-black">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-6">Solo Ride Prices</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {soloRides.map((ride) => (
              <div
                key={ride.id}
                className={`relative p-5 bg-grit-black ${
                  ride.featured ? 'border-2 border-grit-orange' : 'border border-grit-grey'
                }`}
              >
                {ride.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-body text-xs font-bold text-grit-black bg-grit-orange px-3 py-1 whitespace-nowrap">
                    POPULAR
                  </span>
                )}
                <p className="font-display text-grit-orange text-2xl leading-none">{ride.label}</p>
                <p className="font-display text-grit-white text-3xl leading-none mt-1">{ride.price}</p>
                <p className="font-body text-grit-muted text-xs mt-2">{ride.sublabel}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-grit-muted text-xs mt-4">
            Group deals available — see{' '}
            <a href="/#pricing" className="text-grit-sand hover:text-grit-orange transition-colors underline-offset-2 underline">
              full pricing
            </a>{' '}
            for group rates (3–6 riders).
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-24 bg-grit-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Booking form */}
            <div data-reveal className="opacity-0-init">
              <h2 className="font-display text-grit-white text-4xl leading-none mb-8">Your Details</h2>
              {/* [PLACEHOLDER] — wire up to real booking system / form handler */}
              <form className="space-y-5" action="#" method="POST">
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 080XXXXXXXX"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">Ride Duration</label>
                  <select
                    name="duration"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors"
                  >
                    <option value="">Select a duration</option>
                    {soloRides.map((ride) => (
                      <option key={ride.id} value={ride.id}>
                        {ride.label} — {ride.price}
                      </option>
                    ))}
                    <option value="group">Group Ride (3–6 riders)</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors"
                  />
                  <p className="font-body text-grit-muted text-xs mt-1">Fridays &amp; Saturdays only</p>
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">Number of Riders</label>
                  <input
                    type="number"
                    name="riders"
                    min="1"
                    max="20"
                    placeholder="1"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="shuttle"
                    name="shuttle"
                    className="mt-1 accent-grit-orange"
                  />
                  <label htmlFor="shuttle" className="font-body text-grit-white/70 text-sm leading-relaxed cursor-pointer">
                    I need shuttle pickup (groups of 4+ only, 24hrs notice required, 30% deposit)
                  </label>
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Shuttle pickup point, group activity preferences, special requests..."
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted resize-none"
                  />
                </div>
                {/* [PLACEHOLDER] — form submission not yet wired; connect to email/backend */}
                <button type="submit" className="grit-btn w-full font-body font-semibold text-sm py-4">
                  Submit Booking Request
                </button>
                <p className="font-body text-grit-muted text-xs text-center">
                  We&apos;ll confirm your slot via WhatsApp or phone within 24 hours.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div data-reveal className="opacity-0-init space-y-10">
              <div>
                <h3 className="font-display text-grit-white text-3xl leading-none mb-6">Prefer to Call?</h3>
                <p className="font-body text-grit-white/70 text-sm leading-relaxed mb-6">
                  Walk in anytime during opening hours or reach us directly — we&apos;ll get you sorted on the spot.
                </p>
                <div className="flex flex-col gap-3">
                  {/* [PLACEHOLDER] — replace tel: with real number */}
                  <a href="tel:[PLACEHOLDER]" className="font-body font-semibold px-6 py-3 text-sm bg-grit-grey text-grit-white hover:bg-grit-orange transition-colors text-center">
                    Call Us
                  </a>
                  {/* [PLACEHOLDER] — replace with real WhatsApp number */}
                  <a href="https://wa.me/[PLACEHOLDER]" className="font-body font-semibold px-6 py-3 text-sm border border-grit-white/30 text-grit-white hover:border-grit-orange hover:text-grit-orange transition-colors text-center">
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Shuttle service */}
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
                <p className="font-body text-grit-white text-sm font-semibold">Fridays &amp; Saturdays</p>
                <p className="font-body text-grit-muted text-sm">10:00am – 6:00pm</p>
              </div>

              <div className="border-t border-grit-grey pt-10">
                <h3 className="font-display text-grit-white text-2xl leading-none mb-4">Good to Know</h3>
                <ul className="space-y-3">
                  {[
                    'Helmets and safety gear provided',
                    'Walk-ins welcome — subject to availability',
                    'Group bookings recommended 24hrs in advance',
                    // [PLACEHOLDER] — confirm minimum age
                    'Minimum rider age: [PLACEHOLDER]',
                    // [PLACEHOLDER] — confirm refund/cancellation policy
                    'Refund policy: [PLACEHOLDER]',
                  ].map((item) => (
                    <li key={item} className="font-body text-grit-white/70 text-sm flex items-start gap-2">
                      <span className="text-grit-orange mt-0.5 text-xs shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
