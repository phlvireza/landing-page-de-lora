import '../../css/common.css'

/**
 * SectionHeader Component
 * Reusable section header with accent label, title, and description
 * Follows DRY principle - used across multiple sections
 * Single Responsibility: render section headers consistently
 */

export default function SectionHeader({ accentLabel, title, description }) {
  return (
    <div className="section-header-wrapper">
      {accentLabel && (
        <p className="section-header-accent">
          {accentLabel}
        </p>
      )}
      {title && (
        <h2 className="section-header-title">
          {title}
        </h2>
      )}
      {description && (
        <p className="section-header-description">
          {description}
        </p>
      )}
    </div>
  )
}
