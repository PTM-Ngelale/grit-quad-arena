import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export const metadata: Metadata = {
  title: 'Events — GRIT Quad Biking Arena',
  description: 'Host your next event at GRIT Quad Biking Arena, Port Harcourt. Birthday parties, corporate outings, team bonding, and private track days.',
}

// [PLACEHOLDER] — replace with real upcoming events once scheduled
const upcomingEvents: {
  title: string
  date: string
  type: string
  description: string
  spots: string
}[] = []

const eventTypes = [
  {
    icon: '🎂',
    title: 'Birthday Parties',
    description:
      'Make it a birthday they\'ll never forget. Private track access, safety gear, and a dedicated host for your crew. Packages for any group size.',
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

      {/* Page header */}
      <section className="pt-40 pb-16 bg-grit-black border-b border-grit-grey">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Group Experiences</p>
          <h1 className="font-display text-grit-white text-6xl md:text-8xl leading-none mb-6">
            Events &amp; <span className="text-grit-orange">Bookings</span>
          </h1>
          <p className="font-body text-grit-white/60 text-base max-w-lg">
            From birthday parties to corporate bonding days — GRIT handles the terrain. You bring the crew.
          </p>
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
            {/* [PLACEHOLDER] — link to event submission form or social once in place */}
            <a
              href="https://www.instagram.com/grit_quad_arena"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-grit-muted text-xs tracking-widest uppercase hover:text-grit-orange transition-colors whitespace-nowrap"
            >
              Follow for updates →
            </a>
          </div>

          {upcomingEvents.length === 0 ? (
            /* [PLACEHOLDER] — populate once events are scheduled */
            <div
              data-reveal
              className="opacity-0-init border border-dashed border-grit-grey/60 p-16 text-center"
            >
              <p className="font-display text-grit-muted text-3xl mb-4">No Events Scheduled Yet</p>
              <p className="font-body text-grit-muted text-sm max-w-sm mx-auto mb-8">
                Check back soon or follow us on Instagram for announcements.
              </p>
              <a
                href="https://www.instagram.com/grit_quad_arena"
                target="_blank"
                rel="noopener noreferrer"
                className="grit-btn font-body font-semibold text-sm px-8 py-4"
              >
                @grit_quad_arena →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  data-reveal
                  className="opacity-0-init bg-grit-black p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div>
                    <span className="font-body text-grit-orange text-xs tracking-widest uppercase">{event.type}</span>
                    <h3 className="font-display text-grit-white text-2xl mt-1">{event.title}</h3>
                    <p className="font-body text-grit-muted text-sm mt-1">{event.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-grit-sand text-xl">{event.date}</p>
                    <p className="font-body text-grit-muted text-xs mt-1">{event.spots}</p>
                    <a href="/booking" className="grit-btn font-body font-semibold text-xs px-5 py-2 mt-3 inline-block">
                      Reserve a Spot
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            <h2 className="font-display text-grit-white text-5xl md:text-6xl leading-none">
              FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            {[
              {
                q: 'How far in advance do I need to book a group event?',
                a: 'We recommend at least 48–72 hours for group bookings. For full private track days, please contact us at least one week ahead.',
              },
              {
                q: 'What is the minimum age for riders?',
                // [PLACEHOLDER] — confirm real minimum age
                a: '[PLACEHOLDER: confirm minimum age with management]. Younger participants may be permitted with a guardian present — contact us to discuss.',
              },
              {
                q: 'Do you cater for corporate events?',
                a: 'Yes. We offer dedicated corporate packages with private track access, safety staff, and optional catering arrangements. Get in touch for a custom quote.',
              },
              {
                q: 'What happens if it rains?',
                // [PLACEHOLDER] — confirm weather policy
                a: '[PLACEHOLDER: insert actual weather/cancellation policy].',
              },
              {
                q: 'Can I bring my own food and drinks?',
                // [PLACEHOLDER] — confirm F&B policy
                a: '[PLACEHOLDER: insert food and beverage policy].',
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
