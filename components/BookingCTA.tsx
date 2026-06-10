export default function BookingCTA() {
  return (
    <section className="py-24 md:py-32 bg-grit-orange">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="font-display text-grit-black text-6xl md:text-8xl leading-none mb-6">
          Ready to Ride?
        </h2>
        <p className="font-body text-grit-black/70 text-lg mb-10">
          Walk in or get in touch to book your slot.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="/booking"
            className="font-body font-semibold px-8 py-4 text-base bg-grit-black text-grit-white hover:bg-grit-grey transition-colors"
          >
            Book Online
          </a>
          {/* [PLACEHOLDER] — replace tel: with real number */}
          <a
            href="tel:[PLACEHOLDER]"
            className="font-body font-semibold px-8 py-4 text-base bg-grit-black text-grit-white hover:bg-grit-grey transition-colors"
          >
            Call Us
          </a>
          {/* [PLACEHOLDER] — replace with real WhatsApp number */}
          <a
            href="https://wa.me/[PLACEHOLDER]"
            className="font-body font-semibold px-8 py-4 text-base bg-grit-white text-grit-black hover:bg-grit-white/80 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>

        {/* [PLACEHOLDER] — replace with real days and hours */}
        <p className="font-body text-grit-black/60 text-sm">
          Open [PLACEHOLDER DAYS], [PLACEHOLDER HOURS]
        </p>
      </div>
    </section>
  )
}
