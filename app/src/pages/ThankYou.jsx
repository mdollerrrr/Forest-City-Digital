import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <section className="who-we-help" style={{ padding: '120px 0', minHeight: '50vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <h1 className="section-title" style={{ marginBottom: 20 }}>Thanks for reaching out</h1>
          <p style={{ fontSize: 18, color: 'var(--text-light)', marginBottom: 30 }}>
            We&apos;ll be in touch within 24 hours to discuss your project. In the meantime, feel free to call or email us directly.
          </p>
          <p style={{ marginBottom: 10 }}><strong>Email:</strong> <a href="mailto:ForestCityDigital@gmail.com">ForestCityDigital@gmail.com</a></p>
          <p style={{ marginBottom: 10 }}><strong>Phone:</strong> <a href="tel:+12265597450">(226-559-7450)</a></p>
          <p style={{ marginBottom: 30 }}><strong>Instagram:</strong> <a href="https://www.instagram.com/forestcitydigital/" target="_blank" rel="noopener noreferrer">instagram.com/forestcitydigital</a></p>
          <Link to="/" className="btn btn-primary btn-large">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
