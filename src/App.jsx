import Header from './components/Header'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import EventsSection from './components/EventsSection'
import GalleryCarousel from './components/GalleryCarousel'
import CommunityReportSection from './components/CommunityReportSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import { ScrollReveal, BackToTop } from './components/common'

/**
 * Main App Component
 * Follows Single Responsibility Principle: only orchestrates page layout
 * Composition of reusable page sections
 */
import './css/App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <ScrollReveal>
        <Hero />
      </ScrollReveal>
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal>
        <EventsSection />
      </ScrollReveal>
      <ScrollReveal>
        <GalleryCarousel />
      </ScrollReveal>
      <ScrollReveal>
        <CommunityReportSection />
      </ScrollReveal>
      <ScrollReveal>
        <FaqSection />
      </ScrollReveal>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
