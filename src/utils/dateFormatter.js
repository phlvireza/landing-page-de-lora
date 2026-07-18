/**
 * Date formatting utilities
 * Single responsibility: handle date formatting logic
 */

/**
 * Formats a date string to localized short format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (e.g., "Sat, Aug 15")
 */
export const formatDateToShort = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
