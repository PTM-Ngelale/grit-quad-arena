'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

const imageItems = [
  { src: '/images/biking-in-motion.jpg',     alt: 'Two riders kicking up dust at GRIT Arena',           category: 'action'     },
  { src: '/images/drift-in-action.jpg',      alt: 'Rider pulling a wheelie at GRIT Quad Biking Arena',  category: 'action'     },
  { src: '/images/timed-laps.jpg',           alt: 'Timed Laps promotional shot at GRIT Arena',          category: 'action'     },
  { src: '/images/stunts.jpg',               alt: 'Stunts at GRIT Quad Biking Arena',                   category: 'action'     },
  { src: '/images/customer-bike-pov.jpg',    alt: 'First-person view from a quad bike at GRIT',         category: 'action'     },
  { src: '/images/track-shot-1.jpg',         alt: 'GRIT Arena at sunset with GRIT flags',               category: 'venue'      },
  { src: '/images/track-shot-2.jpg',         alt: 'GRIT Arena track view from the covered shelter',     category: 'venue'      },
  { src: '/images/grit-flag.jpg',            alt: 'GRIT Quad Biking Arena flag against a red sky',      category: 'venue'      },
  { src: '/images/customer-group-photo.png', alt: 'Group of riders posing at GRIT Quad Biking Arena',  category: 'groups'     },
  { src: '/images/archery.jpg',              alt: 'Archery activity at GRIT Arena',                     category: 'activities' },
]

const videoItems = [
  {
    src:      '/videos/ride-drift.MOV',
    poster:   '',
    alt:      'Rider drifting on the track at GRIT Quad Biking Arena',
    title:    'Ride & Drift',
    category: 'action',
  },
  {
    src:      '/videos/track.MOV',
    poster:   '',
    alt:      'Riders on the track at GRIT Quad Biking Arena',
    title:    'On the Track',
    category: 'action',
  },
  {
    src:      '/videos/track-view.MOV',
    poster:   '',
    alt:      'Track view at GRIT Quad Biking Arena',
    title:    'Track View',
    category: 'venue',
  },
  {
    src:      '/videos/jell-blasting.MOV',
    poster:   '',
    alt:      'Jell blasting activity at GRIT Arena',
    title:    'Jell Blasting',
    category: 'activities',
  },
  {
    src:      '/videos/jell-blasting-2.MOV',
    poster:   '',
    alt:      'Jell blasting action at GRIT Arena',
    title:    'Jell Blasting II',
    category: 'activities',
  },
]

const categories = [
  { key: 'all',        label: 'All'        },
  { key: 'action',     label: 'Action'     },
  { key: 'venue',      label: 'Venue'      },
  { key: 'groups',     label: 'Groups'     },
  { key: 'activities', label: 'Activities' },
  { key: 'videos',     label: 'Videos'     },
]

function VideoCard({ item }: { item: typeof videoItems[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    videoRef.current?.play()
    setPlaying(true)
  }

  return (
    <div className="group relative aspect-[4/3] overflow-hidden bg-grit-grey">
      <video
        ref={videoRef}
        src={item.src}
        {...(item.poster ? { poster: item.poster } : {})}
        preload="none"
        playsInline
        controls={playing}
        className="absolute inset-0 w-full h-full object-cover"
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {/* Play button overlay — hides once video starts */}
      {!playing && (
        <button
          onClick={handlePlay}
          aria-label={`Play ${item.title}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-grit-black/40 hover:bg-grit-black/60 transition-colors duration-300"
        >
          <span className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-grit-white/80 text-grit-white group-hover:border-grit-orange group-hover:text-grit-orange transition-colors duration-300">
            <Play size={22} fill="currentColor" />
          </span>
          <span className="font-body text-grit-white text-xs tracking-widest uppercase">{item.title}</span>
        </button>
      )}

      {/* Category label */}
      <div className="absolute bottom-0 left-0 right-0 bg-grit-black/80 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
        <span className="font-body text-grit-muted text-[10px] uppercase tracking-widest">{item.category}</span>
      </div>
    </div>
  )
}

export default function GalleryClient() {
  const [active, setActive] = useState('all')

  const showVideosOnly = active === 'videos'

  const filteredImages = showVideosOnly
    ? []
    : imageItems.filter(img => active === 'all' || img.category === active)

  const filteredVideos = showVideosOnly
    ? videoItems
    : active === 'all'
    ? videoItems
    : videoItems.filter(v => v.category === active)

  const hasResults = filteredImages.length > 0 || filteredVideos.length > 0

  return (
    <>
      {/* Filter tabs */}
      <section className="border-b border-grit-grey bg-grit-black sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`font-body text-xs tracking-widest uppercase px-5 py-4 border-b-2 whitespace-nowrap transition-colors ${
                  active === cat.key
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
          {!hasResults ? (
            <p className="font-body text-grit-muted text-sm text-center py-24">No items in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
              {filteredImages.map((item, i) => (
                <div
                  key={`img-${i}`}
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

              {filteredVideos.map((item, i) => (
                <VideoCard key={`vid-${i}`} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
