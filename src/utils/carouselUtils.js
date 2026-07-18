/**
 * Carousel Utilities
 * UPPER_SNAKE_CASE for constants
 * camelCase for functions
 * Single Responsibility: handles carousel state logic
 */

/**
 * Calculate next carousel index
 * @param {number} currentIndex - Current index
 * @param {number} totalItems - Total number of items
 * @returns {number} Next index
 */
export const getNextIndex = (currentIndex, totalItems) => {
  return (currentIndex + 1) % totalItems
}

/**
 * Calculate previous carousel index
 * @param {number} currentIndex - Current index
 * @param {number} totalItems - Total number of items
 * @returns {number} Previous index
 */
export const getPreviousIndex = (currentIndex, totalItems) => {
  return (currentIndex - 1 + totalItems) % totalItems
}

/**
 * Determine if carousel item should be visible
 * @param {number} itemIndex - Item index
 * @param {number} currentIndex - Current index
 * @returns {boolean} Whether item is visible
 */
export const isCarouselItemVisible = (itemIndex, currentIndex) => {
  return itemIndex === currentIndex
}

/**
 * Determine if dot indicator is active
 * @param {number} dotIndex - Dot index
 * @param {number} currentIndex - Current index
 * @returns {boolean} Whether dot is active
 */
export const isDotActive = (dotIndex, currentIndex) => {
  return dotIndex === currentIndex
}
