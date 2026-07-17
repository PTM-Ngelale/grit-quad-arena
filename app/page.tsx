import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experiences from '@/components/Experiences'
import BrandDivider from '@/components/BrandDivider'
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
      <BrandDivider src="/images/o.jpg" alt="GRIT tire emblem" />
      <HowItWorks />
      <Gallery />
      <BrandDivider src="/images/x.jpg" alt="GRIT Adventure Arena emblem" />
      <Pricing />
      <Testimonials />
      <BookingCTA />
      <Contact />
      <Footer />
    </main>
  )
}
