import '../../css/common.css'

/**
 * FooterLinkSection Component
 * Reusable footer section with heading and links
 * Follows DRY principle - replaces repeated footer link lists
 * Single Responsibility: render footer link sections consistently
 */

export default function FooterLinkSection({ title, links }) {
  return (
    <div>
      <h4 className="footer-link-section-title">
        {title}
      </h4>
      <ul className="footer-link-list">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className="footer-link-item"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
