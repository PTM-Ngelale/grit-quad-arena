import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experiences from '@/components/Experiences'
import HowItWorks from '@/components/HowItWorks'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import BookingCTA from '@/components/BookingCTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export default function Home() {
  return (
    <main>
      <ScrollRevealProvider />
      <Navbar />
      <Hero />
      <About />
      <Experiences />
      <HowItWorks />
      <Gallery />
      <Pricing />
      <Testimonials />
      <BookingCTA />
      <Contact />
      <Footer />
    </main>
  )
}
