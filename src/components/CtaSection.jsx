import { Button } from './common'
import '../css/CtaSection.css'

export default function CtaSection() {
  return (
    <section id="involved" className="cta-section">
      <div className="container">
        <div className="cta-wrapper">
          <div className="cta-content">
            <span className="cta-accent">Ready to move in?</span>
            <h2 className="cta-title">Become Part of Our Growing Community</h2>
            <p className="cta-description">
              Schedule a visit today to explore our model homes, walk through the parks, and experience the de'Lora lifestyle firsthand.
            </p>
            <div className="cta-actions">
              <Button variant="accent">Schedule a Visit</Button>
              <Button variant="secondary" className="cta-btn-white">Contact Management</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
