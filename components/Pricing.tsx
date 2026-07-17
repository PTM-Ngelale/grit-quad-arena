import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/* ── Archery ─────────────────────────────────────────────── */

const archeryIndividual = [
  { label: '3 Rounds', detail: '9 Arrows',  price: '₦4,000' },
  { label: '4 Rounds', detail: '12 Arrows', price: '₦5,000' },
  { label: '5 Rounds', detail: '15 Arrows', price: '₦6,500' },
]

const archeryCompetition = [
  {
    label: 'Duel Mode',
    detail: '2 Players · 3 rounds each (9 arrows) · Winner Takes All',
    price: '₦7,000',
    note: 'Total',
  },
  {
    label: 'Group Challenge',
    detail: '3–6 Players · 4 rounds each (12 arrows)',
    price: '₦5,000',
    note: 'Per Person',
  },
]

/* ── Gel Blaster ─────────────────────────────────────────── */

const gelIndividual = [
  {
    label: 'Battle Mode',
    detail: '1 Magazine (60 shots) · Fast-paced timed match · Training included',
    price: '₦5,000',
  },
  {
    label: 'Extended Battle',
    detail: '2 Magazines (120 shots) · Extended tactical gameplay · Team objectives included',
    price: '₦8,500',
  },
]

const gelTeam = [
  {
    label: 'Half Bottle Match',
    detail: '1 mag each · Half bottle reload · Tactical team battle',
    price: '₦6,500',
    note: 'Per Person',
  },
  {
    label: 'Full Bottle Match',
    detail: '1 mag each · Full bottle reload · Tactical team battle',
    price: '₦8,500',
    note: 'Per Person',
  },
]

/* ── Quad biking ─────────────────────────────────────────── */

const soloRides = [
  { id: '5min',  duration: '5 min',  price: '₦6,000',  label: 'Quick Thrill',   featured: false, dmToBook: false },
  { id: '10min', duration: '10 min', price: '₦10,000', label: 'Perfect Start',  featured: false, dmToBook: false },
  { id: '15min', duration: '15 min', price: '₦13,000', label: 'Most Popular',   featured: true,  dmToBook: false },
  { id: '30min', duration: '30 min', price: 'DM to Book', label: 'Premium Ride', featured: false, dmToBook: true },
]

const groupRates = [
  {
    duration: '5 min',
    rates: [
      { riders: 3, price: '₦17,100' },
      { riders: 4, price: '₦22,200' },
      { riders: 5, price: '₦27,000' },
      { riders: 6, price: '₦31,500' },
    ],
  },
  {
    duration: '10 min',
    rates: [
      { riders: 3, price: '₦28,500' },
      { riders: 4, price: '₦37,000' },
      { riders: 5, price: '₦45,000' },
      { riders: 6, price: '₦52,500' },
    ],
  },
  {
    duration: '15 min',
    rates: [
      { riders: 3, price: '₦37,050' },
      { riders: 4, price: '₦48,100' },
      { riders: 5, price: '₦58,500' },
      { riders: 6, price: '₦68,250' },
    ],
  },
]

const shuttlePickups = [
  { location: 'Genesis — Ada George', price: '₦4,000 pp' },
  { location: 'Genesis — Trans Amadi', price: '₦3,000 pp' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-grit-black">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Pricing</p>
          <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none">
            All Experiences
          </h2>
        </div>

        {/* Solo ride cards */}
        <div className="mb-4">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-6">Solo Rides</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {soloRides.map((ride) =>
              ride.dmToBook ? (
                <a
                  key={ride.duration}
                  href={`https://wa.me/447443023079?text=${encodeURIComponent(`Hi! I'd like to book the ${ride.duration} premium ride.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                  className="opacity-0-init relative p-6 bg-grit-grey block transition-colors hover:border-grit-orange border border-grit-orange/40"
                >
                  <p className="font-display text-grit-orange text-4xl md:text-5xl leading-none mb-1">
                    {ride.duration}
                  </p>
                  <p className="font-display text-grit-white text-xl md:text-2xl leading-none mb-3">
                    {ride.price}
                  </p>
                  <p className="font-body text-grit-muted text-xs">{ride.label}</p>
                </a>
              ) : (
                <Link
                  key={ride.duration}
                  href={`/booking?duration=${ride.id}#your-details`}
                  data-reveal
                  className={`opacity-0-init relative p-6 bg-grit-grey block transition-colors hover:border-grit-orange ${
                    ride.featured ? 'border-2 border-grit-orange' : 'border border-grit-grey'
                  }`}
                >
                  {ride.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-body text-xs font-bold text-grit-black bg-grit-orange px-3 py-1 whitespace-nowrap">
                      POPULAR
                    </span>
                  )}
                  <p className="font-display text-grit-orange text-4xl md:text-5xl leading-none mb-1">
                    {ride.duration}
                  </p>
                  <p className="font-display text-grit-white text-2xl md:text-3xl leading-none mb-3">
                    {ride.price}
                  </p>
                  <p className="font-body text-grit-muted text-xs">{ride.label}</p>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Group deals */}
        <div className="mb-12" data-reveal>
          <div className="flex items-baseline gap-4 mb-6 mt-12">
            <p className="font-body text-grit-sand text-xs tracking-widest uppercase">Group Deals</p>
            <p className="font-body text-grit-muted text-xs">Ride together and save more — up to 12.5% off per rider</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr className="border-b border-grit-grey">
                  <th className="font-body text-grit-muted text-xs tracking-widest uppercase text-left py-3 pr-6 w-24">
                    Duration
                  </th>
                  <th className="font-body text-grit-muted text-xs tracking-widest uppercase text-center py-3 px-3">
                    3 Riders
                    <span className="block text-grit-orange normal-case font-semibold mt-0.5">Save 5%</span>
                  </th>
                  <th className="font-body text-grit-muted text-xs tracking-widest uppercase text-center py-3 px-3">
                    4 Riders
                    <span className="block text-grit-orange normal-case font-semibold mt-0.5">Save 7.5%</span>
                  </th>
                  <th className="font-body text-grit-muted text-xs tracking-widest uppercase text-center py-3 px-3">
                    5 Riders
                    <span className="block text-grit-orange normal-case font-semibold mt-0.5">Save 10%</span>
                  </th>
                  <th className="font-body text-grit-muted text-xs tracking-widest uppercase text-center py-3 px-3">
                    6 Riders
                    <span className="block text-grit-orange normal-case font-semibold mt-0.5">Save 12.5%</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupRates.map((row) => (
                  <tr key={row.duration} className="border-b border-grit-grey/40 hover:bg-grit-grey/30 transition-colors">
                    <td className="font-display text-grit-orange text-xl py-4 pr-6">{row.duration}</td>
                    {row.rates.map((r) => (
                      <td key={r.riders} className="font-body text-grit-white text-sm text-center py-4 px-3">
                        {r.price}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-grit-muted text-xs mt-4">
            Group rates apply to 3–6 riders booking the same duration.{' '}
            <strong className="text-grit-white/80">Note: the discount does not apply to a group of 2</strong> — pairs are charged at the solo per-rider rate.
          </p>
          <p className="font-body text-grit-muted text-xs mt-1">
            30-minute group rates available on request — contact us for a quote.
          </p>
        </div>

        {/* ── ARCHERY ARENA ─────────────────────────────────────── */}
        <div className="mt-24">
          <div className="mb-10">
            <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Arena</p>
            <h3 className="font-display text-grit-white text-4xl md:text-5xl leading-none">Archery</h3>
          </div>

          {/* Individual Play */}
          <p className="font-body text-grit-muted text-xs tracking-widest uppercase mb-4">Individual Play</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {archeryIndividual.map((pkg) => (
              <div key={pkg.label} data-reveal className="opacity-0-init p-6 bg-grit-grey border border-grit-grey">
                <p className="font-display text-grit-orange text-4xl leading-none mb-1">{pkg.label}</p>
                <p className="font-body text-grit-muted text-xs mb-3">{pkg.detail}</p>
                <p className="font-display text-grit-white text-2xl">{pkg.price}</p>
              </div>
            ))}
          </div>

          {/* Competition Mode */}
          <p className="font-body text-grit-muted text-xs tracking-widest uppercase mb-4">Competition Mode</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {archeryCompetition.map((pkg) => (
              <div key={pkg.label} data-reveal className="opacity-0-init p-6 bg-grit-grey border border-grit-grey">
                <p className="font-display text-grit-orange text-3xl leading-none mb-1">{pkg.label}</p>
                <p className="font-body text-grit-muted text-xs mb-3">{pkg.detail}</p>
                <p className="font-display text-grit-white text-2xl">
                  {pkg.price}{' '}
                  <span className="font-body text-grit-muted text-xs">{pkg.note}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── GEL BLASTER ARENA ──────────────────────────────────── */}
        <div className="mt-24">
          <div className="mb-10">
            <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Arena</p>
            <h3 className="font-display text-grit-white text-4xl md:text-5xl leading-none">Gel Blasters</h3>
          </div>

          {/* Individual Battles */}
          <p className="font-body text-grit-muted text-xs tracking-widest uppercase mb-4">Individual Battles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {gelIndividual.map((pkg) => (
              <div key={pkg.label} data-reveal className="opacity-0-init p-6 bg-grit-grey border border-grit-grey">
                <p className="font-display text-grit-orange text-3xl leading-none mb-1">{pkg.label}</p>
                <p className="font-body text-grit-muted text-xs mb-3">{pkg.detail}</p>
                <p className="font-display text-grit-white text-2xl">{pkg.price}</p>
              </div>
            ))}
          </div>

          {/* Team Packages */}
          <p className="font-body text-grit-muted text-xs tracking-widest uppercase mb-4">Team Packages</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gelTeam.map((pkg) => (
              <div key={pkg.label} data-reveal className="opacity-0-init p-6 bg-grit-grey border border-grit-grey">
                <p className="font-display text-grit-orange text-3xl leading-none mb-1">{pkg.label}</p>
                <p className="font-body text-grit-muted text-xs mb-3">{pkg.detail}</p>
                <p className="font-display text-grit-white text-2xl">
                  {pkg.price}{' '}
                  <span className="font-body text-grit-muted text-xs">{pkg.note}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SHUTTLE SERVICE — all arenas ───────────────────────── */}
        <div data-reveal className="opacity-0-init border border-grit-orange/30 bg-grit-grey p-8 mt-24">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex-1">
              <p className="font-body text-grit-orange text-xs tracking-widest uppercase mb-2">Shuttle Service</p>
              <h3 className="font-display text-grit-white text-3xl leading-none mb-3">We&apos;ll Pick You Up</h3>
              <p className="font-body text-grit-white/60 text-sm leading-relaxed mb-4">
                Available for groups of <strong className="text-grit-white">4 or more</strong> booking any activity — quad biking, archery, or gel blasters. Requires{' '}
                <strong className="text-grit-white">24 hours notice</strong> and a 30% deposit to confirm.
              </p>
              <div className="space-y-2">
                {shuttlePickups.map((stop) => (
                  <div key={stop.location} className="flex items-center justify-between max-w-xs">
                    <span className="font-body text-grit-white/70 text-sm">{stop.location}</span>
                    <span className="font-display text-grit-sand text-lg ml-4">{stop.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <a
                href="https://wa.me/447443023079"
                className="font-body font-semibold text-sm px-6 py-3 bg-grit-orange text-grit-white hover:bg-grit-orange/90 transition-colors inline-block"
              >
                Request Shuttle <ArrowRight size={14} className="inline-block" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <p className="font-body text-grit-muted text-sm text-center mt-16">
          Prices subject to change. Contact us for corporate and event rates.
        </p>
      </div>
    </section>
  )
}
