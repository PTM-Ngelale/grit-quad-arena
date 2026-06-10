import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export const metadata: Metadata = {
  title: 'Book a Ride — GRIT Quad Biking Arena',
  description: 'Reserve your slot at GRIT Quad Biking Arena, Port Harcourt. Walk in or book ahead for solo laps, thrill rides, and group packages.',
}

const packages = [
  {
    id: 'solo-lap',
    label: 'Solo Lap',
    tier: 'Starter',
    price: '₦[X],000', // [PLACEHOLDER] — real price
    duration: '30 mins',
    includes: ['1 rider', 'Helmet included', 'Safety briefing'],
    featured: false,
  },
  {
    id: 'thrill-ride',
    label: 'Thrill Ride',
    tier: 'Popular',
    price: '₦[X],000', // [PLACEHOLDER] — real price
    duration: '45 mins',
    includes: ['1 rider', 'Helmet + briefing', 'Full circuit access'],
    featured: true,
  },
  {
    id: 'group-pack',
    label: 'Group Pack',
    tier: 'Group',
    price: '₦[X],000', // [PLACEHOLDER] — real price
    duration: '2 hrs',
    includes: ['Up to 6 riders', 'Safety gear + staff', 'Private session'],
    featured: false,
  },
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

      {/* Package picker */}
      <section className="py-24 bg-grit-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-grit-white text-4xl md:text-5xl leading-none mb-12">
            Choose a Package
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                data-reveal
                className={`opacity-0-init relative p-8 bg-grit-grey ${
                  pkg.featured ? 'border-2 border-grit-orange' : 'border border-grit-grey'
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-body text-xs font-bold text-grit-black bg-grit-orange px-3 py-1">
                    MOST POPULAR
                  </span>
                )}
                <p className="font-body text-grit-muted text-xs tracking-widest uppercase mb-2">{pkg.tier}</p>
                <h3 className="font-display text-grit-white text-3xl mb-2">{pkg.label}</h3>
                <p className="font-body text-grit-muted text-xs mb-4">{pkg.duration}</p>
                {/* [PLACEHOLDER] — replace with real price */}
                <p className="font-display text-grit-orange text-5xl mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item) => (
                    <li key={item} className="font-body text-grit-white/70 text-sm flex items-center gap-2">
                      <span className="text-grit-orange text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Booking form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div data-reveal className="opacity-0-init">
              <h2 className="font-display text-grit-white text-4xl leading-none mb-8">
                Your Details
              </h2>
              {/* [PLACEHOLDER] — wire up to real booking system / form handler */}
              <form className="space-y-5" action="#" method="POST">
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="[PLACEHOLDER] e.g. 080XXXXXXXX"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Package
                  </label>
                  <select
                    name="package"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors"
                  >
                    <option value="">Select a package</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.label} — {pkg.duration}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Number of Riders
                  </label>
                  <input
                    type="number"
                    name="riders"
                    min="1"
                    max="20"
                    placeholder="1"
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted"
                  />
                </div>
                <div>
                  <label className="font-body text-grit-sand text-xs tracking-widest uppercase block mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Any special requests, age of riders, etc."
                    className="w-full bg-grit-grey border border-grit-grey/80 text-grit-white font-body text-sm px-4 py-3 outline-none focus:border-grit-orange transition-colors placeholder:text-grit-muted resize-none"
                  />
                </div>
                {/* [PLACEHOLDER] — form submission not yet wired; connect to email/backend */}
                <button
                  type="submit"
                  className="grit-btn w-full font-body font-semibold text-sm py-4"
                >
                  Submit Booking Request
                </button>
                <p className="font-body text-grit-muted text-xs text-center">
                  We&apos;ll confirm your slot via WhatsApp or phone call within 24 hours.
                </p>
              </form>
            </div>

            {/* Sidebar info */}
            <div data-reveal className="opacity-0-init space-y-10">
              <div>
                <h3 className="font-display text-grit-white text-3xl leading-none mb-6">
                  Prefer to Call?
                </h3>
                <p className="font-body text-grit-white/70 text-sm leading-relaxed mb-6">
                  Walk in anytime during opening hours or reach us directly — we&apos;ll get you sorted on the spot.
                </p>
                <div className="flex flex-col gap-3">
                  {/* [PLACEHOLDER] — replace tel: with real number */}
                  <a
                    href="tel:[PLACEHOLDER]"
                    className="font-body font-semibold px-6 py-3 text-sm bg-grit-grey text-grit-white hover:bg-grit-orange transition-colors text-center"
                  >
                    Call Us
                  </a>
                  {/* [PLACEHOLDER] — replace with real WhatsApp number */}
                  <a
                    href="https://wa.me/[PLACEHOLDER]"
                    className="font-body font-semibold px-6 py-3 text-sm border border-grit-white/30 text-grit-white hover:border-grit-orange hover:text-grit-orange transition-colors text-center"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="border-t border-grit-grey pt-10">
                <h3 className="font-display text-grit-white text-2xl leading-none mb-4">
                  Opening Hours
                </h3>
                {/* [PLACEHOLDER] — replace with real hours */}
                <p className="font-body text-grit-muted text-sm">[PLACEHOLDER DAYS]</p>
                <p className="font-body text-grit-white text-sm">[PLACEHOLDER HOURS]</p>
              </div>

              <div className="border-t border-grit-grey pt-10">
                <h3 className="font-display text-grit-white text-2xl leading-none mb-4">
                  Good to Know
                </h3>
                <ul className="space-y-3">
                  {[
                    'Helmets and safety gear provided',
                    'Minimum age: [PLACEHOLDER] years',
                    'Walk-ins welcome subject to availability',
                    'Group bookings require 24 hrs advance notice',
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
