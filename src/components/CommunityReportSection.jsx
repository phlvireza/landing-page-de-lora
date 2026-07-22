import { useState } from 'react'
import SectionHeader from './common/SectionHeader'
import Button from './common/Button'
import '../css/CommunityReportSection.css'

/**
 * CommunityReportSection Component
 * Custom in-page form for community complaints and feedback.
 * Pure Vanilla React implementation (Zero External Dependencies).
 * Submits directly to Google Sheets via VITE_GOOGLE_SCRIPT_URL environment variable.
 */

const CATEGORIES = [
  { id: 'facilities', label: '🏢 Facilities & Infrastructure', desc: 'Road damage, park amenities, shared spaces' },
  { id: 'security', label: '🛡️ Security & Safety', desc: 'Security concerns, disturbances, safety hazards' },
  { id: 'cleanliness', label: '🧹 Sanitation & Waste', desc: 'Trash collection, drainage, neighborhood hygiene' },
  { id: 'lighting', label: '💡 Street Lighting', desc: 'Broken or malfunctioning street lights' },
  { id: 'general', label: '💬 Feedback & Suggestions', desc: 'General ideas, inquiries, or other topics' },
]

/**
 * Pure Vanilla Indonesian Phone Mask (Zero External Dependencies)
 * Formats digits cleanly into 08XX-XXXX-XXXX layout.
 */
const formatIndonesianPhoneNoLib = (value) => {
  if (!value) return ''
  let digits = value.replace(/\D/g, '')

  if (digits.startsWith('62')) {
    digits = '0' + digits.slice(2)
  }

  digits = digits.slice(0, 13)

  if (digits.length <= 4) return digits
  if (digits.length <= 8) return `${digits.slice(0, 4)}-${digits.slice(4)}`
  return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`
}

export default function CommunityReportSection() {
  const [formData, setFormData] = useState({
    name: '',
    isAnonymous: false,
    phone: '',
    blockNumber: '',
    category: 'facilities',
    title: '',
    description: '',
  })

  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [reportId, setReportId] = useState('')

  // Google Apps Script Web App URL from environment variable
  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'phone') {
      const maskedPhone = formatIndonesianPhoneNoLib(value)
      setFormData((prev) => ({
        ...prev,
        phone: maskedPhone,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleCategorySelect = (categoryId) => {
    setFormData((prev) => ({ ...prev, category: categoryId }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const generatedId = `ADU-${Math.floor(100000 + Math.random() * 900000)}`

    const payload = {
      reportId: generatedId,
      timestamp: new Date().toLocaleString('en-US'),
      name: formData.isAnonymous ? 'Anonymous Resident' : (formData.name || 'de’Lora Resident'),
      phone: formData.phone || '-',
      blockNumber: formData.blockNumber || '-',
      category: CATEGORIES.find((c) => c.id === formData.category)?.label || formData.category,
      title: formData.title,
      description: formData.description,
    }

    try {
      if (scriptUrl) {
        // Submit to deployed Google Apps Script Web App
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      } else {
        // Simulated network submission for demo mode
        await new Promise((resolve) => setTimeout(resolve, 1200))
      }

      setReportId(generatedId)
      setStatus('success')
    } catch (err) {
      console.error('Failed to submit community report:', err)
      setStatus('error')
      setErrorMessage('Failed to submit report. Please check your network connection and try again.')
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      isAnonymous: false,
      phone: '',
      blockNumber: '',
      category: 'facilities',
      title: '',
      description: '',
    })
    setStatus('idle')
    setErrorMessage('')
  }

  return (
    <section id="report" className="report-section">
      <div className="container">
        <SectionHeader
          accentLabel="COMMUNITY REPORT"
          title="Submit Reports & Community Feedback"
          description="Official reporting platform for de’Lora residents to foster a safe, comfortable, and well-maintained neighborhood."
        />

        <div className="report-card-wrapper">
          {status === 'success' ? (
            <div className="report-success-card">
              <div className="success-icon-badge">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="16 9 11 14 8 11"></polyline>
                </svg>
              </div>
              <h3 className="success-title">Report Successfully Submitted!</h3>
              <p className="success-message">
                Thank you! Your report has been logged into the de’Lora community management system and will be reviewed shortly.
              </p>
              <div className="report-id-box">
                <span className="report-id-label">Report ID:</span>
                <strong className="report-id-code">{reportId}</strong>
              </div>
              <div className="success-actions">
                <Button variant="primary" onClick={handleReset}>
                  Submit Another Report
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="report-form">
              {/* Category Picker */}
              <div className="form-group full-width">
                <label className="form-label">
                  Select Report Category <span className="required-star">*</span>
                </label>
                <div className="category-pills">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`category-pill ${formData.category === cat.id ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive Grid for Personal Info */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Reporter Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formData.isAnonymous}
                    placeholder={formData.isAnonymous ? 'Submitting as Anonymous' : 'Enter your full name'}
                    className="form-input"
                  />
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isAnonymous"
                      checked={formData.isAnonymous}
                      onChange={handleChange}
                    />
                    <span>Submit Anonymously (Hide Name)</span>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="blockNumber" className="form-label">
                    House Unit / Block Number <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="blockNumber"
                    name="blockNumber"
                    required
                    value={formData.blockNumber}
                    onChange={handleChange}
                    placeholder="e.g. Block A3 / No. 12"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone / WhatsApp Number <span className="form-note">(Optional for follow-ups)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812-3456-7890"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Report Subject / Title <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Broken Street Light at Block B"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Detailed Description */}
              <div className="form-group full-width">
                <label htmlFor="description" className="form-label">
                  Detailed Description <span className="required-star">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the location, time, and specific details of the issue..."
                  className="form-textarea"
                />
              </div>

              {status === 'error' && (
                <div className="form-error-alert">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Form Action */}
              <div className="form-actions">
                <Button
                  type="submit"
                  variant="primary"
                  className="submit-btn"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <span className="btn-loading">
                      <span className="spinner"></span>
                      Submitting Report...
                    </span>
                  ) : (
                    <>
                      <span>Submit Report</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
