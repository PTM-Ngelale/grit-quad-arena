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
              {/* [PLACEHOLDER] — replace with real phone number */}
              <a
                href="tel:[PLACEHOLDER]"
                className="font-body text-grit-white text-sm hover:text-grit-orange transition-colors"
              >
                [PLACEHOLDER PHONE NUMBER]
              </a>
            </div>
            <div>
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Email</p>
              {/* [PLACEHOLDER] — replace with real email */}
              <a
                href="mailto:[PLACEHOLDER]"
                className="font-body text-grit-white text-sm hover:text-grit-orange transition-colors"
              >
                [PLACEHOLDER EMAIL]
              </a>
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
              <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-2">Opening Hours</p>
              {/* [PLACEHOLDER] — replace with real hours */}
              <p className="font-body text-grit-white text-sm">[PLACEHOLDER]</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div data-reveal className="opacity-0-init">
            {/* [PLACEHOLDER] — replace with real Google Maps embed iframe */}
            <div className="h-72 bg-grit-grey flex items-center justify-center">
              <span className="font-body text-grit-muted text-sm">[Map Embed Coming Soon]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
