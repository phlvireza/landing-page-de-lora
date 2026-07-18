/**
 * Navigation configuration
 * Centralized navigation data for reuse across components
 */

export const NAVIGATION_LINKS = [
  { id: 'events', label: 'Events', href: '#events' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const FOOTER_LINKS = {
  explore: [
    { id: 'events', label: 'Upcoming Events', href: '#events' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'guidelines', label: 'Community Guidelines', href: '#' },
  ],
  resources: [
    { id: 'about', label: 'About Us', href: '#' },
    { id: 'faqs', label: 'FAQs', href: '#' },
    { id: 'involved', label: 'Get Involved', href: '#' },
  ],
}

export const CONTACT_INFO = {
  email: 'info@delora.com',
  phone: '+1 (234) 567-890',
  location: 'De Lora Housing Area',
}
