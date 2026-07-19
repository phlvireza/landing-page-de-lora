import { useState, useEffect, useCallback, useRef } from 'react'
import eventsData from '../data/events.json'
import { SectionHeader } from './common'
import { ICONS, SECTIONS, AUTO_SLIDE_INTERVAL_MS } from '../constants'
import {
  getNextIndex,
  getPreviousIndex,
  isCarouselItemVisible,
  isDotActive,
} from '../utils/carouselUtils'
import '../css/GalleryCarousel.css'

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const gallery = eventsData.gallery

  const handleNextSlide = useCallback(() => {
    setCurrentIndex((prev) => getNextIndex(prev, gallery.length))
  }, [gallery.length])

  const handlePreviousSlide = useCallback(() => {
    setCurrentIndex((prev) => getPreviousIndex(prev, gallery.length))
  }, [gallery.length])

  const onTouchStart = (e) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      handleNextSlide()
    }
    if (isRightSwipe) {
      handlePreviousSlide()
    }
    
    // Reset values
    touchStartX.current = null
    touchEndX.current = null
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(handleNextSlide, AUTO_SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [isPaused, handleNextSlide])

  const currentItem = gallery[currentIndex]

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <SectionHeader
          accentLabel="Visual Stories"
          title="Community Gallery"
          description="Moments and memories from our most vibrant community events."
        />

        <div
          className="gallery-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="gallery-slider">
            {gallery.map((item, itemIndex) => (
              <div
                key={item.id}
                className={`gallery-item ${isCarouselItemVisible(itemIndex, currentIndex)
                    ? 'gallery-item-visible'
                    : 'gallery-item-hidden'
                  }`}
              >
                {item.type === 'image' ? (
                  <div className="gallery-image-bg">
                    <div className="gallery-content">
                      <p className="gallery-icon">{ICONS.PHOTO}</p>
                      <p className="gallery-item-title">{item.title}</p>
                      <p className="gallery-item-subtitle">[Image: {item.image}]</p>
                    </div>
                  </div>
                ) : (
                  <div className="gallery-video-bg">
                    <div className="gallery-content">
                      <p className="gallery-icon">{ICONS.VIDEO}</p>
                      <p className="gallery-item-title">{item.title}</p>
                      <p className="gallery-item-subtitle">[Video: {item.video}]</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="gallery-overlay" />
          </div>

          <button
            onClick={handlePreviousSlide}
            className="gallery-nav-btn gallery-nav-left"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNextSlide}
            className="gallery-nav-btn gallery-nav-right"
            aria-label="Next slide"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="gallery-dots">
            {gallery.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={`gallery-dot ${isDotActive(dotIndex, currentIndex)
                    ? 'gallery-dot-active'
                    : 'gallery-dot-inactive'
                  }`}
                aria-label={`Slide ${dotIndex + 1} indicator`}
              />
            ))}
          </div>
        </div>

        <div className="gallery-caption">
          <p className="gallery-caption-title">{currentItem.title}</p>
          <p className="gallery-caption-type">
            {currentItem.type === 'image' ? 'Photo' : 'Video'}
          </p>
        </div>
      </div>
    </section>
  )
}

