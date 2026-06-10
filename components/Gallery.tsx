import Image from 'next/image'

const galleryItems = [
  { src: '/images/biking-in-motion.jpg',      alt: 'Two riders kicking up dust at GRIT Arena',          category: 'Action'  },
  { src: '/images/customer-group-photo.png',   alt: 'Group of riders posing at GRIT Quad Biking Arena',  category: 'Groups'  },
  { src: '/images/track-shot-2.jpg',           alt: 'GRIT Arena track view from the shelter',            category: 'Venue'   },
  { src: '/images/customer-bike-pov.jpg',      alt: 'First-person view from a quad bike at GRIT Arena',  category: 'Action'  },
  { src: '/images/timed-laps.jpg',             alt: 'Timed Laps at GRIT Quad Biking Arena',              category: 'Action'  },
  { src: '/images/grit-flag.jpg',              alt: 'GRIT Quad Biking Arena flag against a red sky',     category: 'Venue'   },
]

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
            Follow us on Instagram{' '}
            <span className="text-grit-sand">@grit_quad_arena</span> for real-time updates
          </p>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              data-reveal
              className="opacity-0-init relative aspect-[4/3] overflow-hidden group"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-grit-black/0 group-hover:bg-grit-black/30 transition-colors duration-300" />
              <span className="absolute bottom-2 left-3 font-body text-white/70 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/gallery"
            className="font-body text-grit-white text-sm hover:text-grit-orange transition-colors border-b border-grit-white/30 hover:border-grit-orange pb-0.5 mr-8"
          >
            View Full Gallery →
          </a>
          <a
            href="https://www.instagram.com/grit_quad_arena"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-grit-white text-sm hover:text-grit-orange transition-colors border-b border-grit-white/30 hover:border-grit-orange pb-0.5"
          >
            Follow on Instagram →
          </a>
        </div>
      </div>
    </section>
  )
}
