const tiers = [
  {
    tier: 'Starter',
    label: 'Solo Lap',
    price: '₦[X],000', // [PLACEHOLDER] — replace with real price
    includes: ['1 rider', '30 mins', 'Helmet included'],
    featured: false,
  },
  {
    tier: 'Popular',
    label: 'Thrill Ride',
    price: '₦[X],000', // [PLACEHOLDER] — replace with real price
    includes: ['1 rider', '45 mins', 'Helmet + briefing'],
    featured: true,
  },
  {
    tier: 'Group',
    label: 'Group Pack',
    price: '₦[X],000', // [PLACEHOLDER] — replace with real price
    includes: ['Up to 6 riders', '2 hrs', 'Safety gear + staff'],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-grit-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Pricing</p>
          <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none">
            Pick Your Package
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.tier}
              data-reveal
              className={`opacity-0-init relative p-8 bg-grit-grey ${
                tier.featured ? 'border-2 border-grit-orange' : 'border border-grit-grey'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-body text-xs font-bold text-grit-black bg-grit-orange px-3 py-1">
                  POPULAR
                </span>
              )}
              <p className="font-body text-grit-muted text-xs tracking-widest uppercase mb-2">{tier.tier}</p>
              <h3 className="font-display text-grit-white text-3xl mb-4">{tier.label}</h3>
              {/* [PLACEHOLDER] — replace with real price */}
              <p className="font-display text-grit-orange text-5xl mb-6">{tier.price}</p>
              <ul className="space-y-3 mb-8">
                {tier.includes.map((item) => (
                  <li key={item} className="font-body text-grit-white/70 text-sm flex items-center gap-2">
                    <span className="text-grit-orange text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="grit-btn block text-center font-body text-sm font-semibold py-3"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>

        <p className="font-body text-grit-muted text-sm text-center mt-10">
          Prices subject to change. Contact us for corporate and event rates.
        </p>
      </div>
    </section>
  )
}
