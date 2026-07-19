import { SectionHeader } from './common'
import '../css/AboutSection.css'

const AMENITIES = [
  { id: 1, title: '24/7 Security', description: 'Round-the-clock patrol and smart access gates ensuring a safe environment for your family.', icon: '🛡️' },
  { id: 2, title: 'Clubhouse', description: 'A modern community hub featuring a lounge, fitness center, and multi-purpose halls.', icon: '🏢' },
  { id: 3, title: 'Green Parks', description: 'Lush open spaces with playgrounds, jogging tracks, and beautifully landscaped gardens.', icon: '🌳' },
  { id: 4, title: 'Swimming Pool', description: 'Olympic-sized lap pool and a dedicated kids pool for weekend family recreation.', icon: '🏊' },
]

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <SectionHeader
              accentLabel="About Us"
              title="Experience Modern Community Living"
              description="de’Lora is more than just a housing area; it's a vibrant, master-planned community designed for families to thrive. We blend modern architecture with lush natural surroundings to create the perfect sanctuary."
            />
          </div>

          <div className="amenities-grid">
            {AMENITIES.map((amenity) => (
              <div key={amenity.id} className="amenity-card">
                <div className="amenity-icon-wrapper">
                  <span className="amenity-icon">{amenity.icon}</span>
                </div>
                <h3 className="amenity-title">{amenity.title}</h3>
                <p className="amenity-description">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
