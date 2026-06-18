import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'
import GalleryClient from '@/components/GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery — GRIT Quad Biking Arena',
  description: 'See the action at GRIT Quad Biking Arena, Port Harcourt. Real riders, rugged terrain, unforgettable moments.',
}

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

      <GalleryClient />

      {/* Instagram CTA + submit */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
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
              @grit_quad_arena <ArrowRight size={14} className="inline-block" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Submit your photo */}
      <section className="py-16 bg-grit-grey">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-grit-white text-3xl leading-none mb-2">Ridden with us?</h3>
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
