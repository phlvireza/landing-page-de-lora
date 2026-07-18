import { useState } from 'react'
import eventsData from '../data/events.json'
import { SectionHeader } from './common'
import { ICONS, SECTIONS } from '../constants'
import {
  getNextIndex,
  getPreviousIndex,
  isCarouselItemVisible,
  isDotActive,
} from '../utils/carouselUtils'
import '../css/GalleryCarousel.css'

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const gallery = eventsData.gallery

  const handleNextSlide = () => {
    setCurrentIndex(getNextIndex(currentIndex, gallery.length))
  }

  const handlePreviousSlide = () => {
    setCurrentIndex(getPreviousIndex(currentIndex, gallery.length))
  }

  const handleGoToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const currentItem = gallery[currentIndex]

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <SectionHeader
          accentLabel="Visual Stories"
          title="Community Gallery"
          description="Moments and memories from our most vibrant community events."
        />

        <div className="gallery-wrapper">
          <div className="gallery-slider">
            {gallery.map((item, itemIndex) => (
              <div
                key={item.id}
                className={`gallery-item ${
                  isCarouselItemVisible(itemIndex, currentIndex)
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
            className="carousel-nav-btn carousel-nav-left"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNextSlide}
            className="carousel-nav-btn carousel-nav-right"
            aria-label="Next slide"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="gallery-dots">
            {gallery.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => handleGoToSlide(dotIndex)}
                className={`gallery-dot ${
                  isDotActive(dotIndex, currentIndex)
                    ? 'gallery-dot-active'
                    : 'gallery-dot-inactive'
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
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
