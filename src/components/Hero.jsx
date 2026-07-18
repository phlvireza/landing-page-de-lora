import { Button } from './common'
import { SECTIONS, ICONS } from '../constants'
import { createScrollHandler } from '../utils/scrollUtils'

/**
 * Hero Component
 * Landing page hero section with call-to-action buttons
 * Single Responsibility: render hero banner and messaging
 * KISS: simplified scroll handler using utility function
 */

import '../css/Hero.css'

export default function Hero() {
  const handleExploreEvents = createScrollHandler('events')

  return (
    <section className="hero-section">
      <div className="hero-backdrop" />
      
      <div className="container hero-content">
        <div className="hero-grid">
          <div className="hero-text-block">
            <div>
              <p className="hero-welcome">
                {SECTIONS.WELCOME}
              </p>
              <h1 className="hero-title">
                De Lora Community
              </h1>
            </div>
            <p className="hero-description">
              Your hub for authentic neighborhood connection. Discover events, share moments, and build lasting community bonds.
            </p>
            <div className="hero-buttons">
              <Button
                variant="accent"
                onClick={handleExploreEvents}
              >
                Explore Events
              </Button>
            </div>
          </div>
          
          <div className="hero-image-block">
            <div className="hero-image-wrapper">
              <span className="hero-icon">{ICONS.HOME}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
