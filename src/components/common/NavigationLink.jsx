import '../../css/common.css'

/**
 * NavigationLink Component
 * Reusable navigation link with consistent styling
 * Follows DRY principle - handles navigation link styling
 * Single Responsibility: render consistent navigation links
 */

export default function NavigationLink({
  href,
  label,
  className = '',
  isActive = false,
}) {
  return (
    <a href={href} className={`nav-link ${isActive ? 'active' : ''} ${className}`}>
      {label}
    </a>
  )
}
