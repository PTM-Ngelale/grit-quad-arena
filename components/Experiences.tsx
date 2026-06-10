const experiences = [
  {
    tag: 'BEGINNER',
    title: 'Solo Lap Ride',
    description: 'Hop on, get briefed, and ride the track at your own pace. Perfect for first-timers. No experience needed.',
    duration: '30 mins',
  },
  {
    tag: 'THRILL RIDE',
    title: 'High-Speed Challenge',
    description: 'Push the throttle and take on the full track circuit with speed gates and banked turns. For confident riders only.',
    duration: '45 mins',
  },
  {
    tag: 'GROUP EVENT',
    title: 'Group Package',
    description: 'Bring your squad — birthday parties, team outings, corporate bonding. We handle the rest.',
    duration: '2 hrs',
  },
]

export default function Experiences() {
  return (
    <section id="experiences" className="py-24 md:py-32 bg-grit-grey">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">What We Offer</p>
          <h2 className="font-display text-grit-white text-5xl md:text-7xl leading-none">
            Choose Your Ride
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              data-reveal
              className="opacity-0-init bg-grit-black hover:scale-105 transition-transform duration-300"
            >
              {/* Image placeholder */}
              <div className="relative aspect-video bg-neutral-800 flex items-center justify-center">
                <span className="font-body text-grit-muted text-xs">[Image Coming Soon]</span>
                <span className="absolute top-3 left-3 font-body text-xs font-bold text-grit-black bg-grit-orange px-2 py-1">
                  {exp.tag}
                </span>
              </div>
              {/* Card body */}
              <div className="p-6">
                <h3 className="font-display text-grit-white text-2xl mb-3">{exp.title}</h3>
                <p className="font-body text-grit-white/60 text-sm leading-relaxed mb-5">{exp.description}</p>
                <span className="font-body text-grit-sand text-xs font-medium border border-grit-sand/40 px-3 py-1">
                  {exp.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-grit-muted text-sm text-center mt-10">
          Custom durations and private bookings available.{' '}
          <a href="#contact" className="text-grit-sand hover:text-grit-orange transition-colors underline underline-offset-2">
            Contact us for details.
          </a>
        </p>
      </div>
    </section>
  )
}
