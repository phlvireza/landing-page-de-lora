import { useState } from 'react'
import { SectionHeader } from './common'
import '../css/FaqSection.css'

const FAQS = [
  { id: 1, question: 'What is the monthly HOA (Homeowners Association) fee?', answer: 'The monthly HOA fee is $150, which covers 24/7 security, landscaping of common areas, garbage collection, and maintenance of the clubhouse and pool.' },
  { id: 2, question: 'Are pets allowed in the community?', answer: 'Yes! de\'Lora is a pet-friendly community. We allow up to two pets per household, and we have a dedicated dog park for your furry friends.' },
  { id: 3, question: 'How can I reserve the clubhouse for a private event?', answer: 'Residents can reserve the clubhouse through the community portal. A small deposit is required, which is fully refundable after the event.' },
  { id: 4, question: 'What are the visiting hours for guests?', answer: 'Guests are welcome at any time! However, for security purposes, all non-residents must register at the main gate when entering after 10:00 PM.' },
]

export default function FaqSection() {
  const [openId, setOpenId] = useState(null)

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faqs" className="faq-section">
      <div className="container">
        <SectionHeader
          accentLabel="Common Questions"
          title="Frequently Asked Questions"
          description="Find quick answers to the most common questions about living in de'Lora."
        />
        
        <div className="faq-list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div 
                key={faq.id} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className="faq-answer-wrapper">
                  <p className="faq-answer">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
