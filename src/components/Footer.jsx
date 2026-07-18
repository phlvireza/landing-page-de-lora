import { FooterLinkSection } from './common'
import { FOOTER_LINKS, CONTACT_INFO, ICONS } from '../constants'
import '../css/Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer-section">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <h3 className="footer-brand-title">De Lora</h3>
            <p className="footer-brand-desc">
              Building stronger neighborhoods through meaningful community connection and shared experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <FooterLinkSection title="Explore" links={FOOTER_LINKS.explore} />

          {/* Resources Links */}
          <FooterLinkSection title="Resources" links={FOOTER_LINKS.resources} />

          {/* Contact */}
          <div>
            <h4 className="footer-contact-title">Connect</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <span className="footer-contact-icon">{ICONS.EMAIL}</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="footer-contact-link"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">{ICONS.PHONE}</span>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="footer-contact-link"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="footer-contact-item align-start">
                <span className="footer-contact-icon mt-0-5">{ICONS.LOCATION}</span>
                <span className="footer-contact-text">{CONTACT_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider">
          <div className="footer-bottom">
            <p>&copy; 2026 De Lora Community. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#" className="footer-legal-link">
                Privacy Policy
              </a>
              <a href="#" className="footer-legal-link">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
