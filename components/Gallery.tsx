export default function Gallery() {
  return (
    <section className="py-24 md:py-32 bg-grit-grey">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">In the Arena</p>
          <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none mb-4">
            See the Action
          </h2>
          <p className="font-body text-grit-muted text-sm max-w-md mx-auto">
            Gallery coming soon — follow us on Instagram{' '}
            <span className="text-grit-sand">@grit_quad_arena</span> for real-time updates
          </p>
        </div>

        {/* 3×2 placeholder grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-grit-black flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl" aria-hidden="true">📷</span>
              <span className="font-body text-grit-muted text-xs">Photo Coming Soon</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.instagram.com/grit_quad_arena"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-grit-white text-sm hover:text-grit-orange transition-colors border-b border-grit-white/30 hover:border-grit-orange pb-0.5"
          >
            → Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
