export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-grit-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">Find Us</p>
          <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none">
            Get in Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact details */}
          <div data-reveal className="opacity-0-init space-y-8">
            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Address</p>
              {/* [PLACEHOLDER] — replace with real address */}
              <p className="font-body text-grit-white text-sm leading-relaxed">
                [PLACEHOLDER ADDRESS], Port Harcourt, Rivers State
              </p>
            </div>

            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Phone</p>
              <div className="space-y-1">
                <a href="tel:+2348078591455" className="block font-body text-grit-white text-sm hover:text-grit-orange transition-colors">
                  0807 859 1455
                </a>
                <a href="tel:+2347025165644" className="block font-body text-grit-white text-sm hover:text-grit-orange transition-colors">
                  0702 516 5644
                </a>
                <a href="tel:+2347040820199" className="block font-body text-grit-white text-sm hover:text-grit-orange transition-colors">
                  0704 082 0199
                </a>
              </div>
            </div>

            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Email</p>
              <a
                href="mailto:gritarena@outlook.com"
                className="font-body text-grit-white text-sm hover:text-grit-orange transition-colors"
              >
                gritarena@outlook.com
              </a>
              <p className="font-body text-grit-muted text-xs mt-1">For excursions &amp; special bookings</p>
            </div>

            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Instagram</p>
              <a
                href="https://www.instagram.com/grit_quad_arena"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-grit-white text-sm hover:text-grit-orange transition-colors"
              >
                @grit_quad_arena
              </a>
            </div>

            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">TikTok</p>
              <a
                href="https://www.tiktok.com/@grit.quad.biking"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-grit-white text-sm hover:text-grit-orange transition-colors"
              >
                @grit.quad.biking
              </a>
            </div>

            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Opening Hours</p>
              <p className="font-body text-grit-white text-sm">Fridays, Saturdays &amp; Sundays</p>
              <p className="font-body text-grit-muted text-sm">10:00am – 6:00pm</p>
              <p className="font-body text-grit-orange text-xs mt-1">Sunday opening launched 28 June 2026</p>
            </div>

            {/* Shuttle service */}
            <div className="border-t border-grit-grey pt-8">
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-3">Shuttle Service</p>
              <p className="font-body text-grit-white/60 text-xs leading-relaxed mb-3">
                Groups of 4+ · 24hrs notice · 30% deposit required
              </p>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-body text-grit-white/70 text-xs">Genesis — Ada George</span>
                  <span className="font-body text-grit-sand text-sm ml-4">₦4,000 pp</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-grit-white/70 text-xs">Genesis — Trans Amadi</span>
                  <span className="font-body text-grit-sand text-sm ml-4">₦3,000 pp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder + WhatsApp CTA */}
          <div data-reveal className="opacity-0-init">
            {/* [PLACEHOLDER] — replace with real Google Maps embed iframe */}
            <div className="h-72 bg-grit-grey flex items-center justify-center mb-6">
              <span className="font-body text-grit-muted text-sm">[Map Embed Coming Soon]</span>
            </div>
            <a
              href="https://wa.me/2348078591455"
              target="_blank"
              rel="noopener noreferrer"
              className="grit-btn block text-center font-body font-semibold text-sm py-4"
            >
              WhatsApp Us to Book
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
