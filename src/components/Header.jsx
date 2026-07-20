import { useState, useEffect } from 'react'
import { NavigationLink } from './common'
import { NAVIGATION_LINKS } from '../constants'
import '../css/Header.css'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = NAVIGATION_LINKS.map(link => link.href.replace('#', '')).filter(Boolean)
      let current = ''
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            current = section
          }
        }
      }

      // If we are at the bottom of the page, activate the last section (Contact)
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 10) {
        current = sections[sections.length - 1]
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="container header-nav">
          <div className="header-container">
            <div className="header-logo">
              <img src="https://bsaland.co.id/wp-content/uploads/2022/10/logo-page-de_lora.png" alt="de’Lora Logo" className="header-logo-image" />
              <h1 className="header-title">de’Lora</h1>
              <span className="header-subtitle">Community</span>
            </div>

            <div className="header-links">
              {NAVIGATION_LINKS.map((link) => (
                <NavigationLink
                  key={link.id}
                  href={link.href}
                  label={link.label}
                  isActive={activeSection === link.href.replace('#', '')}
                />
              ))}
            </div>

            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button
          className="mobile-menu-close-btn"
          onClick={closeMobileMenu}
          aria-label="Close Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mobile-menu-links">
          {NAVIGATION_LINKS.map((link) => (
            <div key={link.id} onClick={closeMobileMenu}>
              <NavigationLink
                href={link.href}
                label={link.label}
                isActive={activeSection === link.href.replace('#', '')}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
