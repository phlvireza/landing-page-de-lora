import { useState, useMemo, useEffect } from 'react'
import { ICONS } from '../constants'
import { formatDateToShort } from '../utils/dateFormatter'
import '../css/CalendarModal.css'

export default function CalendarModal({ isOpen, onClose, events }) {
  // Initialize to the month of the first event, or current date
  const [currentDate, setCurrentDate] = useState(() => {
    if (events && events.length > 0) {
      const parts = events[0].date.split('-')
      if (parts.length === 3) {
         return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1)
      }
    }
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const [selectedDateStr, setSelectedDateStr] = useState(null)

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDateStr(null)
    }
  }, [isOpen])

  // Calendar logic
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDateStr(null)
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDateStr(null)
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Group events by date string (YYYY-MM-DD)
  const eventsByDate = useMemo(() => {
    const map = {}
    events.forEach(event => {
      if (!map[event.date]) {
        map[event.date] = []
      }
      map[event.date].push(event)
    })
    return map
  }, [events])

  const renderDays = () => {
    const cells = []

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>)
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const dayEvents = eventsByDate[dateStr] || []
      const hasEvents = dayEvents.length > 0
      const isSelected = selectedDateStr === dateStr

      cells.push(
        <button
          key={d}
          className={`calendar-cell day ${hasEvents ? 'has-event' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => hasEvents && setSelectedDateStr(dateStr)}
          disabled={!hasEvents}
        >
          <span className="day-number">{d}</span>
          {hasEvents && (
            <div className="event-indicators">
               {dayEvents.slice(0, 3).map((_, index) => (
                 <span key={index} className="event-dot"></span>
               ))}
               {dayEvents.length > 3 && <span className="event-dot-plus">+</span>}
            </div>
          )}
        </button>
      )
    }

    return cells
  }

  if (!isOpen) return null

  // Helper to parse "10:00 AM" to minutes for sorting
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0
    try {
      const [time, modifier] = timeStr.split(' ')
      let [hours, minutes] = time.split(':')
      hours = parseInt(hours, 10)
      minutes = parseInt(minutes, 10)
      if (hours === 12) hours = 0
      if (modifier === 'PM') hours += 12
      return hours * 60 + minutes
    } catch (e) {
      return 0
    }
  }

  const selectedEvents = selectedDateStr ? eventsByDate[selectedDateStr] : null
  const sortedSelectedEvents = selectedEvents 
    ? [...selectedEvents].sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time))
    : null

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal-content" onClick={e => e.stopPropagation()}>
        <div className="calendar-modal-header">
          <h2 className="calendar-modal-title">Events Calendar</h2>
          <button className="calendar-close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="calendar-modal-body">
          <div className="calendar-container">
            <div className="calendar-nav">
              <button onClick={handlePrevMonth} className="calendar-nav-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="calendar-month-year">{monthNames[month]} {year}</h3>
              <button onClick={handleNextMonth} className="calendar-nav-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="calendar-grid">
              {daysOfWeek.map(day => (
                <div key={day} className="calendar-day-header">{day}</div>
              ))}
              {renderDays()}
            </div>
          </div>

          <div className="calendar-details-container">
            {sortedSelectedEvents ? (
              <div className="selected-events-list">
                <h4 className="selected-events-title">Events on {formatDateToShort(selectedDateStr)}</h4>
                {sortedSelectedEvents.map(event => (
                  <div key={event.id} className="selected-event-card">
                    <h5 className="selected-event-name">{event.title}</h5>
                    <p className="selected-event-desc">{event.description}</p>
                    <div className="selected-event-meta">
                      <span className="meta-item"><span className="meta-icon">{ICONS.TIME}</span> {event.time}</span>
                      <span className="meta-item"><span className="meta-icon">{ICONS.LOCATION}</span> {event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="calendar-details-empty">
                <p>Select a highlighted date to view events.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
