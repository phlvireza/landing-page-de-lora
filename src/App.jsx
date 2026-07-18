import Header from './components/Header'
import Hero from './components/Hero'
import EventsSection from './components/EventsSection'
import GalleryCarousel from './components/GalleryCarousel'
import Footer from './components/Footer'

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
      <Hero />
      <EventsSection />
      <GalleryCarousel />
      <Footer />
    </div>
  )
}

export default App
