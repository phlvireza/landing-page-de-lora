import { useState, useRef, useEffect, useCallback } from 'react'
import eventsData from '../data/events.json'
import { SectionHeader, EventInfoItem, Button } from './common'
import { ICONS } from '../constants'
import { formatDateToShort } from '../utils/dateFormatter'
import '../css/EventsSection.css'

const AUTO_SLIDE_INTERVAL_MS = 3000
const SCROLL_DISTANCE_PX = 350

export default function EventsSection() {
  const [events] = useState(eventsData.events)
  const [hoveredEventId, setHoveredEventId] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -SCROLL_DISTANCE_PX, behavior: 'smooth' })
    }
  }

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
      if (isAtEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: SCROLL_DISTANCE_PX, behavior: 'smooth' })
      }
    }
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(scrollRight, AUTO_SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [isPaused, scrollRight])

  return (
    <section id="events" className="events-section">
      <div className="container events-container">
        <SectionHeader
          accentLabel="Community Calendar"
          title="Upcoming Events"
          description="Join your neighbors for activities that build connection and create lasting memories."
        />
        
        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
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
            className="events-scroll-container"
          >
            {events.map((event, eventIndex) => (
              <div
                key={event.id}
                onMouseEnter={() => setHoveredEventId(event.id)}
                onMouseLeave={() => setHoveredEventId(null)}
                className="event-card"
                style={{
                  animation: `slideUp 0.5s ease-out ${eventIndex * 0.1}s both`,
                }}
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
    </section>
  )
}
