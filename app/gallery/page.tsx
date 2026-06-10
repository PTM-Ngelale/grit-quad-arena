import type { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export const metadata: Metadata = {
  title: 'Gallery — GRIT Quad Biking Arena',
  description: 'See the action at GRIT Quad Biking Arena, Port Harcourt. Real riders, rugged terrain, unforgettable moments.',
}

const galleryItems = [
  { src: '/images/biking-in-motion.jpg',     alt: 'Two riders kicking up dust at GRIT Arena',           category: 'action' },
  { src: '/images/drift-in-action.jpg',      alt: 'Rider pulling a wheelie at GRIT Quad Biking Arena',  category: 'action' },
  { src: '/images/timed-laps.jpg',           alt: 'Timed Laps promotional shot at GRIT Arena',          category: 'action' },
  { src: '/images/stunts.jpg',               alt: 'Stunts at GRIT Quad Biking Arena',                   category: 'action' },
  { src: '/images/customer-bike-pov.jpg',    alt: 'First-person view from a quad bike at GRIT',         category: 'action' },
  { src: '/images/track-shot-1.jpg',         alt: 'GRIT Arena at sunset with GRIT flags',               category: 'venue'  },
  { src: '/images/track-shot-2.jpg',         alt: 'GRIT Arena track view from the covered shelter',     category: 'venue'  },
  { src: '/images/grit-flag.jpg',            alt: 'GRIT Quad Biking Arena flag against a red sky',      category: 'venue'  },
  { src: '/images/customer-group-photo.png', alt: 'Group of riders posing at GRIT Quad Biking Arena',   category: 'groups' },
  { src: '/images/archery.jpg',              alt: 'Archery activity at GRIT Arena',                     category: 'activities' },
  { src: '/videos/jell-blasters.jpg',        alt: 'Jell Blasters battle game at GRIT Arena',            category: 'activities' },
  { src: '/videos/biking.jpg',               alt: 'Riders on the track at GRIT Quad Biking Arena',      category: 'action' },
]

const categories = [
  { key: 'all',        label: 'All'        },
  { key: 'action',     label: 'Action'     },
  { key: 'venue',      label: 'Venue'      },
  { key: 'groups',     label: 'Groups'     },
  { key: 'activities', label: 'Activities' },
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
            Real riders. Rugged terrain. Unforgettable moments. Follow{' '}
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

      {/* Filter tabs — static display; JS filtering can be wired up later */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                data-reveal
                className="opacity-0-init group relative aspect-[4/3] overflow-hidden bg-grit-grey"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-grit-black/0 group-hover:bg-grit-black/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-grit-black/80 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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

      {/* Submit your photo */}
      <section className="py-16 bg-grit-grey">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-grit-white text-3xl leading-none mb-2">Ridden with us?</h3>
            {/* [PLACEHOLDER] — add submission email once ready */}
            <p className="font-body text-grit-muted text-sm">
              Tag us on Instagram or send your photos to{' '}
              <a href="mailto:gritarena@outlook.com" className="text-grit-sand hover:text-grit-orange transition-colors">gritarena@outlook.com</a> to be featured.
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
