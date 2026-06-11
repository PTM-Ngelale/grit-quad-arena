import { Star } from 'lucide-react'

// TODO: Replace with real testimonials

const testimonials = [
  {
    quote: "Best experience in PH! Rode for the first time and I was hooked. Can't wait to come back.",
    name: '[Name]',
    label: 'Port Harcourt',
  },
  {
    quote: 'Took my team here for a bonding day. GRIT delivered — everyone had an absolute blast.',
    name: '[Name]',
    label: 'Corporate Client',
  },
  {
    quote: 'My kids loved it. Staff were super helpful and safety-conscious. Highly recommend.',
    name: '[Name]',
    label: 'Parent',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-grit-grey">
      {/* TODO: Replace with real testimonials */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Reviews</p>
          <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none">
            What Riders Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} data-reveal className="opacity-0-init bg-grit-black p-8">
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-grit-grey mb-6" />
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="text-grit-orange fill-grit-orange" aria-hidden="true" />
                ))}
              </div>
              {/* Quote */}
              <p className="font-body text-grit-white/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-body text-grit-white text-sm font-semibold">{t.name}</p>
              <p className="font-body text-grit-muted text-xs">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
