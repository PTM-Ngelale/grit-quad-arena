export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-grit-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div data-reveal className="opacity-0-init">
            <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">About GRIT</p>
            <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none mb-8">
              Port Harcourt&apos;s<br />Wildest Ride
            </h2>
            <p className="font-body text-grit-white/70 text-base leading-relaxed mb-4">
              GRIT Quad Biking Arena is Port Harcourt&apos;s premier outdoor adventure destination. Whether you&apos;re a first-timer
              looking for a rush or a seasoned rider chasing the perfect track, GRIT delivers a raw, exhilarating experience
              on real quad bikes across rugged terrain.
            </p>
            <p className="font-body text-grit-white/70 text-base leading-relaxed mb-12">
              We opened our doors to bring world-class off-road adventure to the Garden City — and we&apos;re just getting started.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-grit-grey pt-8">
              {/* [PLACEHOLDER] — replace with real figures */}
              <div>
                <p className="font-display text-grit-sand text-4xl md:text-5xl leading-none">[X]+</p>
                <p className="font-body text-grit-white text-sm mt-1">Riders</p>
              </div>
              <div>
                <p className="font-display text-grit-sand text-4xl md:text-5xl leading-none">[X]</p>
                <p className="font-body text-grit-white text-sm mt-1">Tracks</p>
              </div>
              <div>
                <p className="font-display text-grit-sand text-4xl md:text-5xl leading-none">[X]+</p>
                <p className="font-body text-grit-white text-sm mt-1">Events Hosted</p>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div data-reveal className="opacity-0-init">
            <div className="aspect-[4/3] bg-grit-grey flex items-center justify-center">
              <span className="font-body text-grit-muted text-sm">[Photo Coming Soon]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
