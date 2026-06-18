const steps = [
  {
    number: '01',
    title: 'Book or Walk In',
    description: 'Reserve your slot online or just show up during opening hours.',
  },
  {
    number: '02',
    title: 'Gear Up',
    description: 'We provide helmets and a safety briefing before every ride.',
  },
  {
    number: '03',
    title: 'Hit the Track',
    description: 'Take on the terrain solo, raced, or with your group.',
  },
  {
    number: '04',
    title: 'Make Memories',
    description: 'Our team captures your ride — photos and video of your session are available on the day.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-grit-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">The Process</p>
          <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none">
            How It Works
          </h2>
        </div>

        <div className="flex flex-col md:flex-row">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 relative">
              {/* Dashed connector line between steps (desktop) */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute top-8 left-1/2 w-full h-px border-t-2 border-dashed border-grit-orange/30"
                />
              )}
              <div
                data-reveal
                className="opacity-0-init relative z-10 flex flex-col items-center text-center px-6 pb-12 md:pb-0"
              >
                <span className="font-display text-grit-orange text-6xl md:text-7xl leading-none mb-4 bg-grit-black px-2">
                  {step.number}
                </span>
                <h3 className="font-body text-grit-white text-sm font-bold uppercase tracking-wide mb-2">{step.title}</h3>
                <p className="font-body text-grit-muted text-sm leading-relaxed max-w-[180px]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
