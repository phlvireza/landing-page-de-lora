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
}) {
  return (
    <a href={href} className={`nav-link ${className}`}>
      {label}
    </a>
  )
}
