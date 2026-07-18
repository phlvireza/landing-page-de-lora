import '../../css/common.css'

/**
 * Button Component
 * Reusable button with multiple variants
 * Follows DRY principle - replaces hardcoded button classes
 * Single Responsibility: render button with variants
 */

const BUTTON_VARIANTS = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  secondary: 'btn-secondary',
}

export default function Button({
  variant = 'primary',
  children,
  onClick,
  className = '',
  ...props
}) {
  const variantClasses = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary

  return (
    <button
      className={`btn ${variantClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
