import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export const metadata: Metadata = {
  title: 'Gallery — GRIT Quad Biking Arena',
  description: 'See the action at GRIT Quad Biking Arena, Port Harcourt. Real riders, rugged terrain, unforgettable moments.',
}

// [PLACEHOLDER] — replace all entries with real images and captions once photos are available
const galleryItems = [
  { id: 1, caption: 'Solo lap — main circuit',    category: 'action' },
  { id: 2, caption: 'Group race day',              category: 'groups' },
  { id: 3, caption: 'High-speed challenge run',    category: 'action' },
  { id: 4, caption: 'Corporate team outing',       category: 'groups' },
  { id: 5, caption: 'Track overview',              category: 'venue' },
  { id: 6, caption: 'Birthday group package',      category: 'events' },
  { id: 7, caption: 'First-timer briefing',        category: 'action' },
  { id: 8, caption: 'Gear up station',             category: 'venue' },
  { id: 9, caption: 'Night ride event',            category: 'events' },
  { id: 10, caption: 'Banked turn section',        category: 'venue' },
  { id: 11, caption: 'Kids adventure session',     category: 'groups' },
  { id: 12, caption: 'Finish line celebration',    category: 'events' },
]

const categories = [
  { key: 'all',    label: 'All' },
  { key: 'action', label: 'Action' },
  { key: 'groups', label: 'Groups' },
  { key: 'events', label: 'Events' },
  { key: 'venue',  label: 'Venue' },
]

export default function GalleryPage() {
  return (
    <main className="bg-grit-black min-h-screen">
      <ScrollRevealProvider />
      <Navbar />

      {/* Page header */}
      <section className="pt-40 pb-16 bg-grit-black border-b border-grit-grey">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">In the Arena</p>
          <h1 className="font-display text-grit-white text-6xl md:text-8xl leading-none mb-6">
            See the <span className="text-grit-orange">Action</span>
          </h1>
          <p className="font-body text-grit-white/60 text-base max-w-lg">
            Real riders. Rugged terrain. Unforgettable moments. Photos coming soon — follow{' '}
            <a
              href="https://www.instagram.com/grit_quad_arena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grit-sand hover:text-grit-orange transition-colors"
            >
              @grit_quad_arena
            </a>{' '}
            for live updates.
          </p>
        </div>
      </section>

      {/* Filter tabs — [PLACEHOLDER] wire up JS filtering once real images exist */}
      <section className="border-b border-grit-grey bg-grit-black sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                className={`font-body text-xs tracking-widest uppercase px-5 py-4 border-b-2 whitespace-nowrap transition-colors ${
                  i === 0
                    ? 'border-grit-orange text-grit-orange'
                    : 'border-transparent text-grit-muted hover:text-grit-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* [PLACEHOLDER] — replace placeholder boxes with real <Image> tags once photos arrive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                data-reveal
                className="opacity-0-init group relative aspect-[4/3] bg-grit-grey overflow-hidden"
              >
                {/* Photo placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl" aria-hidden="true">📷</span>
                  <span className="font-body text-grit-muted text-xs">Photo Coming Soon</span>
                </div>
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-grit-black/80 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-body text-grit-white text-xs">{item.caption}</p>
                  <span className="font-body text-grit-muted text-[10px] uppercase tracking-widest">{item.category}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="border border-grit-grey p-10 text-center" data-reveal>
            <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Follow Us</p>
            <h2 className="font-display text-grit-white text-4xl md:text-5xl leading-none mb-4">
              More on Instagram
            </h2>
            <p className="font-body text-grit-white/60 text-sm max-w-sm mx-auto mb-8">
              Behind-the-scenes, event recaps, and rider moments — all live on our Instagram.
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
        </div>
      </section>

      {/* Submit your photo CTA */}
      <section className="py-16 bg-grit-grey">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-grit-white text-3xl leading-none mb-2">
              Ridden with us?
            </h3>
            <p className="font-body text-grit-muted text-sm">
              {/* [PLACEHOLDER] — add submission email or form once ready */}
              Tag us on Instagram or send your photos to{' '}
              <span className="text-grit-sand">[PLACEHOLDER EMAIL]</span> to be featured.
            </p>
          </div>
          <a
            href="https://www.instagram.com/grit_quad_arena"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-semibold text-sm px-8 py-4 border border-grit-white/30 text-grit-white hover:border-grit-orange hover:text-grit-orange transition-colors whitespace-nowrap"
          >
            Tag Us on Instagram
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
