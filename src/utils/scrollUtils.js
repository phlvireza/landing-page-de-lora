/**
 * Scroll Utilities
 * camelCase for functions
 * Single Responsibility: handles scroll functionality
 */

/**
 * Smoothly scroll to element by ID
 * @param {string} elementId - Element ID to scroll to
 * @returns {void}
 */
export const smoothScrollToElement = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Create scroll handler for navigation
 * @param {string} elementId - Element ID to scroll to
 * @returns {function} Click handler function
 */
export const createScrollHandler = (elementId) => {
  return () => smoothScrollToElement(elementId)
}
