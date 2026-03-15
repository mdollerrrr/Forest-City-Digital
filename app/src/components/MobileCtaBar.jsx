import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      if (window.innerWidth <= 768 && window.scrollY > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className={`mobile-cta-bar ${visible ? 'visible' : ''}`} id="mobileCtaBar" aria-hidden="true">
      <a href="tel:+12265597450" className="mobile-cta-btn">Call</a>
      <a href="mailto:ForestCityDigital@gmail.com" className="mobile-cta-btn">Email</a>
      <Link to="/contact" className="mobile-cta-btn mobile-cta-primary">Get Quote</Link>
    </div>
  );
}
