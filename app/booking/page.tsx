import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'
import BookingForm from '@/components/BookingForm'

export const metadata: Metadata = {
  title: 'Book a Ride — GRIT Quad Biking Arena',
  description: 'Reserve your slot at GRIT Quad Biking Arena, Port Harcourt. Solo rides from ₦6,000. Group deals available. Open Fridays, Saturdays & Sundays, 10am–6pm.',
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

      {/* Pricing quick-ref */}
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
            Group deals available —{' '}
            <a href="/#pricing" className="text-grit-sand hover:text-grit-orange transition-colors underline underline-offset-2">
              see full pricing
            </a>{' '}
            for group rates (3–6 riders).
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-24 bg-grit-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Live booking form */}
            <div>
              <h2 className="font-display text-grit-white text-4xl leading-none mb-8">Your Details</h2>
              <BookingForm />
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
                    href="https://wa.me/2348078591455"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-semibold px-6 py-3 text-sm border border-grit-white/30 text-grit-white hover:border-grit-orange hover:text-grit-orange transition-colors text-center"
                  >
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
                    'Minimum rider age: [PLACEHOLDER]',
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
