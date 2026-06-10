export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-grit-black overflow-hidden">
      {/* Background gradient — swap for real image once available */}
      <div className="absolute inset-0 bg-gradient-to-br from-grit-black via-grit-black/95 to-grit-grey" />

      {/* Giant GRIT watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display text-grit-grey/20 leading-none"
          style={{ fontSize: '35vw' }}
        >
          GRIT
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-6xl mx-auto px-6 py-32">
        <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-8">
          Port Harcourt&apos;s #1 Quad Biking Experience
        </p>

        <h1 className="font-display leading-none mb-8">
          <span className="block text-grit-white text-7xl md:text-[10rem]">RIDE.</span>
          <span className="block text-grit-white text-7xl md:text-[10rem]">FEEL THE</span>
          <span className="block text-grit-orange text-7xl md:text-[10rem]">GRIT.</span>
        </h1>

        <p className="font-body text-grit-white/70 text-lg max-w-sm mb-12">
          Rugged tracks. Real machines. All skill levels welcome.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/booking" className="grit-btn font-body font-semibold px-8 py-4 text-base">
            Book a Ride
          </a>
          <a
            href="/#experiences"
            className="font-body font-semibold px-8 py-4 text-base text-grit-white border border-grit-white/40 hover:border-grit-white transition-colors"
          >
            See Experiences ↓
          </a>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="relative z-10 border-t border-grit-grey/50 py-3">
        <p className="font-body text-grit-muted text-xs text-center tracking-wide">
          Open:{' '}
          <span className="text-grit-white/80">[PLACEHOLDER HOURS]</span>
          {' · '}
          <span className="text-grit-white/80">[PLACEHOLDER ADDRESS]</span>, Port Harcourt, Rivers State
        </p>
      </div>
    </section>
  )
}
