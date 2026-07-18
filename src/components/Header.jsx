import { useState } from 'react'
import { NavigationLink } from './common'
import { NAVIGATION_LINKS } from '../constants'
import '../css/Header.css'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header-wrapper">
      <nav className="container header-nav">
        <div className="header-container">
          <div className="header-logo">
            <img src="https://bsaland.co.id/wp-content/uploads/2022/10/logo-page-de_lora.png" alt="De Lora Logo" className="header-logo-image" />
            <h1 className="header-title">De Lora</h1>
            <span className="header-subtitle">Community</span>
          </div>

          <div className="header-links">
            {NAVIGATION_LINKS.map((link) => (
              <NavigationLink
                key={link.id}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>

          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-links">
            {NAVIGATION_LINKS.map((link) => (
              <div key={link.id} onClick={closeMobileMenu}>
                <NavigationLink
                  href={link.href}
                  label={link.label}
                />
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
