/**
 * Navigation configuration
 * Centralized navigation data for reuse across components
 */

export const NAVIGATION_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'events', label: 'Events', href: '#events' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const FOOTER_LINKS = {
  explore: [
    { id: 'events', label: 'Upcoming Events', href: '#events' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'guidelines', label: 'Community Guidelines', href: '#' },
  ],
  resources: [
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'faqs', label: 'FAQs', href: '#faqs' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
}

export const CONTACT_INFO = {
  email: 'info@delora.com',
  phone: '+1 (234) 567-890',
  location: "de’Lora Housing Area",
}
