import { useState, useRef, useEffect, useCallback } from 'react'
import eventsData from '../data/events.json'
import { SectionHeader, EventInfoItem, Button } from './common'
import { ICONS, AUTO_SLIDE_INTERVAL_MS, SCROLL_DISTANCE_PX } from '../constants'
import { formatDateToShort } from '../utils/dateFormatter'
import CalendarModal from './CalendarModal'
import '../css/EventsSection.css'

export default function EventsSection() {
  const [events] = useState(eventsData.events)
  // Duplicate events to create an infinite scroll illusion
  const extendedEvents = [...events, ...events, ...events]
  
  const [isPaused, setIsPaused] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const scrollContainerRef = useRef(null)

  // Seamless infinite loop handler for both manual scrolling and button navigation
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const oneSetWidth = container.scrollWidth / 3

    if (!oneSetWidth) return

    // If user (manually or via button) scrolls into Set 3, jump back to Set 2
    if (container.scrollLeft >= oneSetWidth * 2 - 10) {
      container.scrollLeft -= oneSetWidth
    }
    // If user scrolls left into Set 1, jump forward to Set 2
    else if (container.scrollLeft <= 10) {
      container.scrollLeft += oneSetWidth
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -SCROLL_DISTANCE_PX, behavior: 'smooth' })
    }
  }

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: SCROLL_DISTANCE_PX, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (isPaused || isCalendarOpen) return
    const timer = setInterval(scrollRight, AUTO_SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [isPaused, isCalendarOpen, scrollRight])

  // Center the scroll initially on the middle set
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const oneSetWidth = container.scrollWidth / 3
      container.scrollTo({ left: oneSetWidth, behavior: 'auto' })
    }
  }, [])

  return (
    <section id="events" className="events-section">
      <div className="container events-container">
        <div className="events-header-wrapper">
          <SectionHeader
            accentLabel="Community Calendar"
            title="Upcoming Events"
            description="Join your neighbors for activities that build connection and create lasting memories."
          />
          <div className="view-calendar-wrapper">
            <Button 
              variant="accent" 
              icon={ICONS.DATE} 
              onClick={() => setIsCalendarOpen(true)}
            >
              View Detail Event
            </Button>
          </div>
        </div>
        
        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onClick={() => setIsPaused(true)}
        >
          <button
            onClick={scrollLeft}
            className="carousel-nav-btn carousel-nav-left"
            aria-label="Scroll left"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className="carousel-nav-btn carousel-nav-right"
            aria-label="Scroll right"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="events-scroll-container"
          >
            {extendedEvents.map((event, eventIndex) => (
              <div
                key={`${event.id}-${eventIndex}`}
                className="event-card"
              >
                <div className="event-image-wrapper">
                  <div className="event-image-overlay" />
                  <span className="event-image-icon">{ICONS.CAMERA}</span>
                </div>
                
                <div className="event-content">
                  <h3 className="event-title">
                    {event.title}
                  </h3>
                  <p className="event-description">
                    {event.description}
                  </p>
                  
                  <div className="event-info-list">
                    <EventInfoItem
                      icon={ICONS.DATE}
                      label="Date"
                      value={formatDateToShort(event.date)}
                    />
                    <EventInfoItem
                      icon={ICONS.TIME}
                      label="Time"
                      value={event.time}
                    />
                    <EventInfoItem
                      icon={ICONS.LOCATION}
                      label="Location"
                      value={event.location}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
        events={events}
      />
    </section>
  )
}
