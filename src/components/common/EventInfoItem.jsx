import '../../css/common.css'

/**
 * EventInfoItem Component
 * Reusable event information display (date, time, location)
 * Follows DRY principle - replaces repeated event info patterns
 * Single Responsibility: render event information consistently
 */

export default function EventInfoItem({ icon, label, value }) {
  return (
    <div className="event-info-wrapper">
      <span className="event-info-icon">{icon}</span>
      <span className="event-info-value" title={label}>
        {value}
      </span>
    </div>
  )
}
