import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const activities = [
  {
    tag: 'QUAD BIKING',
    title: 'Ride the Track',
    description: 'Hop on a real quad bike and hit the dirt. Choose your ride duration — from a quick 5-minute blast to a full 30-minute session. Helmets and briefing included.',
    image: '/images/drift-in-action.jpg',
    imageAlt: 'Rider performing a wheelie at GRIT Quad Biking Arena',
    cta: 'See Pricing',
    ctaHref: '#pricing',
  },
  {
    tag: 'ARCHERY',
    title: 'Take Aim',
    description: 'Test your focus and precision at our archery range. Under guidance from our team, you\'ll draw, aim, and release. No experience needed — just steady hands.',
    image: '/images/archery.jpg',
    imageAlt: 'Archery at GRIT Arena — GRIT Off-Road Adventure uniform',
    cta: 'Contact for Pricing',
    ctaHref: '#contact',
  },
  {
    tag: 'JELL BLASTERS',
    title: 'Battle It Out',
    description: 'Squad up and take cover. Jell Blasters is a high-energy team battle game that brings the arena to life. Perfect for groups, birthdays, and corporate outings.',
    image: '/videos/jell-blasters.jpg',
    imageAlt: 'Jell Blasters battle at GRIT Arena',
    cta: 'Contact for Pricing',
    ctaHref: '#contact',
  },
]

const trackModes = [
  {
    tag: 'TRACK MODE',
    title: 'Timed Laps',
    description: 'Race against the clock. Timed laps put a competitive edge on your session — post your best time, hit the leaderboard, and challenge your crew.',
    image: '/images/timed-laps.jpg',
    imageAlt: 'Timed Laps — riders at GRIT Quad Biking Arena at sunset',
  },
  {
    tag: 'TRACK MODE',
    title: 'Stunts',
    description: 'For the confident rider. Push the quad to its limits with supervised stunt circuits — drifts, sharp corners, and controlled chaos.',
    image: '/images/stunts.jpg',
    imageAlt: 'Stunts at GRIT Quad Biking Arena — rider drifting at sunset',
  },
]

export default function Experiences() {
  return (
    <section id="experiences" className="py-24 md:py-32 bg-grit-grey">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">What We Offer</p>
          <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none">
            Choose Your Ride
          </h2>
        </div>

        {/* Main activities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {activities.map((act) => (
            <div
              key={act.title}
              data-reveal
              className="opacity-0-init bg-grit-black hover:scale-105 transition-transform duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image src={act.image} alt={act.imageAlt} fill className="object-cover object-center" />
                <span className="absolute top-3 left-3 font-body text-xs font-bold text-grit-black bg-grit-orange px-2 py-1">
                  {act.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-grit-white text-2xl mb-3">{act.title}</h3>
                <p className="font-body text-grit-white/60 text-sm leading-relaxed mb-5">{act.description}</p>
                <a
                  href={act.ctaHref}
                  className="font-body text-grit-sand text-xs tracking-widest uppercase hover:text-grit-orange transition-colors border-b border-grit-sand/40 hover:border-grit-orange pb-0.5"
                >
                  {act.cta} <ArrowRight size={12} className="inline-block" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Track modes strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {trackModes.map((mode) => (
            <div
              key={mode.title}
              data-reveal
              className="opacity-0-init relative overflow-hidden bg-grit-black group"
            >
              <div className="relative aspect-[16/7] overflow-hidden">
                <Image src={mode.image} alt={mode.imageAlt} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-grit-black/50" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="font-body text-grit-orange text-xs font-bold tracking-widest uppercase mb-2">
                    {mode.tag}
                  </span>
                  <h3 className="font-display text-grit-white text-4xl md:text-5xl leading-none mb-2">{mode.title}</h3>
                  <p className="font-body text-grit-white/70 text-sm leading-relaxed max-w-sm">{mode.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-grit-muted text-sm text-center">
          Custom durations and private bookings available.{' '}
          <a href="#contact" className="text-grit-sand hover:text-grit-orange transition-colors underline underline-offset-2">
            Contact us for details.
          </a>
        </p>
      </div>
    </section>
  )
}
