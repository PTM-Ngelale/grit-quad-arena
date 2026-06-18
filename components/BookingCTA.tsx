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
          <a
            href="tel:+2348078591455"
            className="font-body font-semibold px-8 py-4 text-base bg-grit-black text-grit-white hover:bg-grit-grey transition-colors"
          >
            Call Us
          </a>
          <a
            href="https://wa.me/447443023079"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-semibold px-8 py-4 text-base bg-grit-white text-grit-black hover:bg-grit-white/80 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>

        <p className="font-body text-grit-black/60 text-sm">
          Open Fridays &amp; Saturdays · 10am – 6pm
        </p>
      </div>
    </section>
  )
}
