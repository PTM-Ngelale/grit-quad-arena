import type { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export const metadata: Metadata = {
  title: 'Events — GRIT Quad Biking Arena',
  description: 'Host your next event at GRIT Quad Biking Arena, Port Harcourt. Birthday parties, corporate outings, team bonding, and private track days.',
}

// First GRIT event — date TBC, approx July 2026
const upcomingEvents = [
  {
    title: "GRIT's First Arena Day",
    date: 'July 2026',
    dateSub: 'Exact date TBC — stay tuned',
    type: 'OPEN EVENT',
    description: "We're hosting our first ever official arena day. Expect races, challenges, music, and the full GRIT experience. Limited spots — get notified early.",
    spots: 'Limited availability',
  },
]

const eventTypes = [
  {
    icon: '🎂',
    title: 'Birthday Parties',
    description:
      "Make it a birthday they'll never forget. Private track access, safety gear, and a dedicated host for your crew. Packages for any group size.",
    cta: 'Plan a Birthday',
  },
  {
    icon: '🏢',
    title: 'Corporate Outings',
    description:
      'Ditch the boardroom. GRIT offers team bonding experiences that actually work — rugged, competitive, and unforgettable. Catering and logistics on request.',
    cta: 'Enquire for Corporates',
  },
  {
    icon: '🏁',
    title: 'Private Track Days',
    description:
      'Book the entire arena for your group. Full track access, custom duration, and a dedicated safety crew. Ideal for car clubs, schools, and large gatherings.',
    cta: 'Book a Private Day',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family Sessions',
    description:
      'Supervised family rides for all ages. Our team ensures a safe, fun experience for first-timers and younger riders. Age restrictions apply.',
    cta: 'Plan a Family Visit',
  },
]

export default function EventsPage() {
  return (
    <main className="bg-grit-black min-h-screen">
      <ScrollRevealProvider />
      <Navbar />

      {/* Page header with grit-flag background */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/grit-flag.jpg"
            alt="GRIT Quad Biking Arena flag against dramatic red sky"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-grit-black/75" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Group Experiences</p>
          <h1 className="font-display text-grit-white text-6xl md:text-8xl leading-none mb-6">
            Events &amp; <span className="text-grit-orange">Bookings</span>
          </h1>
          <p className="font-body text-grit-white/60 text-base max-w-lg">
            From birthday parties to corporate bonding days — GRIT handles the terrain. You bring the crew.
          </p>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-24 bg-grit-grey">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">What&apos;s On</p>
              <h2 className="font-display text-grit-white text-5xl md:text-6xl leading-none">
                Upcoming Events
              </h2>
            </div>
            <a
              href="https://www.instagram.com/grit_quad_arena"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-grit-muted text-xs tracking-widest uppercase hover:text-grit-orange transition-colors whitespace-nowrap"
            >
              Follow for updates →
            </a>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                data-reveal
                className="opacity-0-init bg-grit-black border border-grit-orange/40 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <span className="font-body text-grit-orange text-xs tracking-widest uppercase">{event.type}</span>
                  <h3 className="font-display text-grit-white text-3xl mt-1 mb-2">{event.title}</h3>
                  <p className="font-body text-grit-white/60 text-sm leading-relaxed max-w-lg">{event.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-grit-sand text-2xl">{event.date}</p>
                  <p className="font-body text-grit-muted text-xs mt-1 mb-4">{event.dateSub}</p>
                  <p className="font-body text-grit-orange text-xs mb-3">{event.spots}</p>
                  {/* [PLACEHOLDER] — replace with real WhatsApp number */}
                  <a href="https://wa.me/[PLACEHOLDER]" className="grit-btn font-body font-semibold text-xs px-5 py-2 inline-block">
                    Get Notified
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event type cards */}
      <section className="py-24 bg-grit-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">What We Host</p>
            <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none">
              Your Event, Your Way
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventTypes.map((event) => (
              <div
                key={event.title}
                data-reveal
                className="opacity-0-init bg-grit-grey p-10 hover:scale-[1.02] transition-transform duration-300"
              >
                <span className="text-4xl block mb-6" aria-hidden="true">{event.icon}</span>
                <h3 className="font-display text-grit-white text-3xl leading-none mb-4">{event.title}</h3>
                <p className="font-body text-grit-white/60 text-sm leading-relaxed mb-8">{event.description}</p>
                <a
                  href="/booking"
                  className="font-body text-grit-sand text-xs tracking-widest uppercase hover:text-grit-orange transition-colors border-b border-grit-sand/40 hover:border-grit-orange pb-0.5"
                >
                  {event.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private booking CTA */}
      <section className="py-24 bg-grit-orange">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display text-grit-black text-6xl md:text-8xl leading-none mb-6">
            Plan Your Event
          </h2>
          <p className="font-body text-grit-black/70 text-lg max-w-md mx-auto mb-10">
            Tell us what you have in mind — we&apos;ll put together a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="font-body font-semibold px-8 py-4 text-base bg-grit-black text-grit-white hover:bg-grit-grey transition-colors"
            >
              Start Planning
            </a>
            {/* [PLACEHOLDER] — replace with real WhatsApp number */}
            <a
              href="https://wa.me/[PLACEHOLDER]"
              className="font-body font-semibold px-8 py-4 text-base bg-grit-white text-grit-black hover:bg-grit-white/80 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-grit-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Got Questions?</p>
            <h2 className="font-display text-grit-white text-5xl md:text-6xl leading-none">FAQs</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            {[
              {
                q: 'How far in advance do I need to book a group event?',
                a: 'We recommend at least 48–72 hours for group bookings. For full private track days, please contact us at least one week ahead.',
              },
              {
                q: 'Is shuttle service available?',
                a: 'Yes! We offer shuttle pickups from Genesis Ada George (₦4,000 pp) and Genesis Trans Amadi (₦3,000 pp) for groups of 4 or more riders, with 24 hours notice and a 30% deposit.',
              },
              {
                q: 'What days are you open?',
                a: 'We are open every Friday and Saturday, 10:00am to 6:00pm.',
              },
              {
                q: 'Do you cater for corporate events?',
                a: 'Yes. We offer dedicated corporate packages with private track access, safety staff, and optional catering arrangements. Get in touch for a custom quote.',
              },
              {
                q: 'What happens if it rains?',
                // [PLACEHOLDER] — confirm weather/cancellation policy
                a: '[PLACEHOLDER: insert actual weather/cancellation policy].',
              },
            ].map((faq) => (
              <div key={faq.q} data-reveal className="opacity-0-init border-t border-grit-grey py-8">
                <h3 className="font-body text-grit-white text-sm font-semibold mb-3">{faq.q}</h3>
                <p className="font-body text-grit-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
            <div className="border-t border-grit-grey" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
