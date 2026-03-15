import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FORMSPREE_URL = 'https://formspree.io/f/maqdokll';

export default function Contact() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const serviceOtherVisible = serviceType === 'other';

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setSubmitting(true);
    fetch(FORMSPREE_URL, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
      .then(() => {
        form.reset();
        setServiceType('');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
          navigate('/thank-you');
        }, 1500);
      })
      .catch(() => {
        alert('Something went wrong. Please email us at ForestCityDigital@gmail.com or call (226-559-7450).');
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="contact pine-bg" id="contact">
      <div className="container">
        <h2 className="section-title">Let&apos;s Build Your Website</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>Ready to get started? Fill out the form or reach out directly.</p>
            <p><strong>Email:</strong> <a href="mailto:ForestCityDigital@gmail.com">ForestCityDigital@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+12265597450">(226-559-7450)</a></p>
            <p><strong>Instagram:</strong> <a href="https://www.instagram.com/forestcitydigital/" target="_blank" rel="noopener noreferrer">instagram.com/forestcitydigital</a></p>
            <div style={{ marginTop: 30 }}>
              <h4>What Happens Next?</h4>
              <ol style={{ marginTop: 15, paddingLeft: 20, color: 'var(--text-light)' }}>
                <li>We&apos;ll schedule a quick 20-minute call</li>
                <li>Discuss your needs and goals</li>
                <li>Provide a custom quote</li>
                <li>Get started on your new website</li>
              </ol>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit} action={FORMSPREE_URL} method="POST">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="business">Business Name</label>
                <input type="text" id="business" name="business" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input type="tel" id="phone" name="phone" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Type</label>
                <select
                  id="service"
                  name="service"
                  style={{ width: '100%', padding: 12, border: '2px solid var(--border-color)', borderRadius: 6, fontSize: 16 }}
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="restaurant">Restaurant / Café / Food</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="hvac">HVAC</option>
                  <option value="electrical">Electrical</option>
                  <option value="roofing">Roofing</option>
                  <option value="landscaping">Landscaping / Lawn Care</option>
                  <option value="cleaning">Cleaning / Janitorial</option>
                  <option value="handyman">Handyman / General Contractor</option>
                  <option value="painting">Painting</option>
                  <option value="moving">Moving / Storage</option>
                  <option value="automotive">Automotive / Auto Repair</option>
                  <option value="beauty">Beauty / Salon / Barber</option>
                  <option value="fitness">Fitness / Gym</option>
                  <option value="retail">Retail / Shop</option>
                  <option value="professional">Professional Services (legal, accounting, etc.)</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group service-other-wrap" style={{ display: serviceOtherVisible ? 'block' : 'none' }}>
                <label htmlFor="service_other">Please specify your service type</label>
                <input type="text" id="service_other" name="service_other" placeholder="e.g. Pet grooming, Event planning..." />
              </div>
              <div className="form-group">
                <label htmlFor="message">Tell us about your project *</label>
                <textarea id="message" name="message" rows={5} required placeholder="What kind of website do you need? Any specific features?" />
              </div>
              <button type="submit" className="btn btn-primary btn-large" disabled={submitting}>
                {submitting ? 'Sending…' : 'Get Free Quote'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={`toast ${toastVisible ? 'visible' : ''}`} aria-live="polite" role="status">Thank you for your submission!</div>
    </section>
  );
}
