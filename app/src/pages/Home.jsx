import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [packagesTab, setPackagesTab] = useState('build');
  const buildGridRef = useRef(null);
  const careGridRef = useRef(null);

  // Carousel dots: sync scroll position with dot active state
  useEffect(() => {
    const grids = [buildGridRef.current, careGridRef.current].filter(Boolean);
    const dotContainers = document.querySelectorAll('.packages-section .carousel-dots');
    function updateDots() {
      grids.forEach((grid, gi) => {
        const dots = dotContainers[gi]?.querySelectorAll('.dot');
        const cards = grid?.querySelectorAll('.package-card');
        if (!dots?.length || !cards?.length) return;
        const scrollLeft = grid.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 16;
        let index = Math.round(scrollLeft / cardWidth);
        index = Math.max(0, Math.min(index, dots.length - 1));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      });
    }
    grids.forEach((g) => g?.addEventListener('scroll', updateDots));
    return () => grids.forEach((g) => g?.removeEventListener('scroll', updateDots));
  }, [packagesTab]);

  const scrollToPackage = (gridRef, index) => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.package-card');
    const cardWidth = (cards[0]?.offsetWidth ?? 0) + 16;
    grid.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero */}
      <section className="hero pine-bg hero-with-glows" id="home">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title text-gradient-hero">We build websites you don&apos;t have to worry about</h1>
            <p className="hero-subtitle">Websites for Local Businesses That Actually Bring You Customers</p>
            <div className="hero-cta-glass">
              <div className="hero-cta">
                <Link to="/contact" className="btn btn-primary btn-large">Get Your Free Quote</Link>
                <Link to="/portfolio" className="btn btn-secondary btn-large">View Our Work</Link>
              </div>
            </div>
            <p className="hero-note">Starting at $999 • Packages from $99/month</p>
            <div className="trust-strip">
              <span>Fast turnaround</span>
              <span>Mobile-first</span>
              <span>Maintenance included</span>
              <span>Local to London, ON</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="whofor-section" id="whofor" aria-label="Who this is for">
        <div className="container">
          <h2 className="section-title">Who This Is For</h2>
          <p className="section-subtitle">We specialize in trades and local small businesses that need more calls, quotes, and bookings.</p>
          <div className="whofor-grid">
            <div className="whofor-card card-premium">
              <h3>Trades</h3>
              <p>Electricians, plumbers, HVAC, roofers, landscapers, and other service pros.</p>
              <ul className="whofor-points">
                <li>Click-to-call + quote forms</li>
                <li>Service areas + trust sections</li>
                <li>Built for mobile and speed</li>
              </ul>
            </div>
            <div className="whofor-card card-premium">
              <h3>Local Small Businesses</h3>
              <p>Auto shops, clinics, local services — businesses that rely on local customers.</p>
              <ul className="whofor-points">
                <li>Clear messaging + strong CTAs</li>
                <li>Basic local SEO setup</li>
                <li>Lead-focused layout</li>
              </ul>
            </div>
            <div className="whofor-card whofor-card-accent card-premium">
              <h3>New business? No problem.</h3>
              <p>We&apos;re new — but your site won&apos;t look new. You&apos;ll get a modern, credible website you can confidently send people to.</p>
              <Link to="/portfolio" className="btn btn-secondary">See examples</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work */}
      <section className="work-section" id="work">
        <div className="container">
          <h2 className="section-title">See What&apos;s Possible</h2>
          <p className="section-subtitle">These demo sites show the potential for your business — with multiple design styles.</p>
          <div className="work-groups">
            <div className="work-group">
              <div className="work-group-head">
                <div>
                  <div className="work-group-kicker">Demos</div>
                  <h3 className="work-group-title">General demos</h3>
                  <p className="work-group-subtitle">A quick look at what a modern, lead-focused site can include.</p>
                </div>
                <div className="work-group-rule" aria-hidden="true" />
              </div>
              <div className="work-grid">
                <div className="work-card card-premium">
                  <div className="work-image" style={{ background: 'linear-gradient(135deg, #6B4C5A 0%, #5A3D4A 100%)' }}>
                    <div className="work-image-inner">
                      <img className="work-image-icon" src="/assets/Restauraunt/spaghetti.png" alt="Restaurant demo" loading="lazy" />
                      <div className="work-style-pill">Warm • Hospitality</div>
                      <h3 style={{ color: 'white', marginBottom: 10 }}>Restaurant Demo</h3>
                      <p style={{ opacity: 0.9 }}>Bella Vista Restaurant</p>
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>Restaurant Website</h3>
                    <p>Features: Online menu, reservation system, hours &amp; location, events page, mobile-optimized design</p>
                    <ul className="work-features">
                      <li>✓ Click-to-call buttons</li>
                      <li>✓ Online ordering integration</li>
                      <li>✓ Google Maps integration</li>
                      <li>✓ Mobile-first design</li>
                    </ul>
                    <a href="/demos/restaurant/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Demo</a>
                  </div>
                </div>
                <div className="work-card card-premium">
                  <div className="work-image" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)' }}>
                    <div className="work-image-inner">
                      <img className="work-image-icon" src="/assets/Main Website/technician.png" alt="Plumbing & HVAC demo" loading="lazy" />
                      <div className="work-style-pill">Trades • Utility</div>
                      <h3 style={{ color: 'white', marginBottom: 10 }}>Plumbing & HVAC Demo</h3>
                      <p style={{ opacity: 0.9 }}>Reliable Plumbing & HVAC</p>
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>Plumbing & HVAC Website</h3>
                    <p>Features: Service pages, emergency CTA, service area map, financing options, quote request form</p>
                    <ul className="work-features">
                      <li>✓ 24/7 emergency messaging</li>
                      <li>✓ Service area listings</li>
                      <li>✓ Quote request forms</li>
                      <li>✓ Trust signals &amp; certifications</li>
                    </ul>
                    <a href="/demos/plumber/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Demo</a>
                  </div>
                </div>
                <div className="work-card card-premium">
                  <div className="work-image" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                    <div className="work-image-inner">
                      <img className="work-image-icon" src="/assets/Main Website/electrician.png" alt="Electrician & Roofer demo" loading="lazy" />
                      <div className="work-style-pill">Bold • High contrast</div>
                      <h3 style={{ color: 'white', marginBottom: 10 }}>Electrician & Roofer Demo</h3>
                      <p style={{ opacity: 0.9 }}>Pro Electric & Roofing</p>
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>Electrician & Roofing Website</h3>
                    <p>Features: Project gallery, reviews section, detailed service pages, certification badges, estimate request</p>
                    <ul className="work-features">
                      <li>✓ Project gallery</li>
                      <li>✓ Customer reviews</li>
                      <li>✓ Free estimate forms</li>
                      <li>✓ License &amp; insurance badges</li>
                    </ul>
                    <a href="/demos/electrician/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Demo</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="work-group">
              <div className="work-group-head">
                <div>
                  <div className="work-group-kicker">Styles</div>
                  <h3 className="work-group-title">Industry-Specific Styles</h3>
                  <p className="work-group-subtitle">More tailored visuals and layout patterns — same lead-focused goal.</p>
                </div>
                <div className="work-group-rule" aria-hidden="true" />
              </div>
              <div className="work-grid">
                <div className="work-card card-premium">
                  <div className="work-image" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 60%, #06b6d4 100%)' }}>
                    <div className="work-image-inner">
                      <img className="work-image-icon" src="/assets/Main Website/technician.png" alt="HVAC Village demo" loading="lazy" />
                      <div className="work-style-pill">Light industrial • Cool blue</div>
                      <h3 style={{ color: 'white', marginBottom: 10 }}>HVAC Village</h3>
                      <p style={{ opacity: 0.9 }}>Clean &amp; technical contractor style</p>
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>HVAC Website (High-end)</h3>
                    <p>Features: Modern service switcher, pricing panels, proof cards, scroll reveals, and a dedicated process page.</p>
                    <ul className="work-features">
                      <li>✓ Premium contractor styling</li>
                      <li>✓ Pricing + financing patterns</li>
                      <li>✓ Motion + micro-interactions</li>
                      <li>✓ Mobile-first layout</li>
                    </ul>
                    <a href="/demos/hvac-village/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Demo</a>
                  </div>
                </div>
                <div className="work-card card-premium">
                  <div className="work-image" style={{ background: 'linear-gradient(135deg, #070A12 0%, #0B1022 55%, #1d4ed8 110%)' }}>
                    <div className="work-image-inner">
                      <img className="work-image-icon" src="/assets/Main Website/electrician.png" alt="NorthBolt Electric demo" loading="lazy" />
                      <div className="work-style-pill">Dark technical • Yellow accents</div>
                      <h3 style={{ color: 'white', marginBottom: 10 }}>NorthBolt Electric</h3>
                      <p style={{ opacity: 0.9 }}>Modern dark theme + sticky mobile CTA</p>
                    </div>
                  </div>
                  <div className="work-content">
                    <h3>Electrician Website (Modern)</h3>
                    <p>Features: Project gallery, pricing ranges, reviews with star ratings, process section, and mobile CTA bar.</p>
                    <ul className="work-features">
                      <li>✓ Dark premium aesthetic</li>
                      <li>✓ Pricing + trust sections</li>
                      <li>✓ Gallery + proof blocks</li>
                      <li>✓ Sticky mobile CTA</li>
                    </ul>
                    <a href="/demos/relume-northbolt-electric/home/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Demo</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="packages-section pine-bg" id="packages">
        <div className="container">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">Choose the package that fits your needs</p>
          <div className="packages-tabs">
            <button type="button" className={`tab-btn ${packagesTab === 'build' ? 'active' : ''}`} data-tab="build" onClick={() => setPackagesTab('build')}>Website Build</button>
            <button type="button" className={`tab-btn ${packagesTab === 'care' ? 'active' : ''}`} data-tab="care" onClick={() => setPackagesTab('care')}>Care Plans</button>
          </div>

          <div className={`tab-content ${packagesTab === 'build' ? 'active' : ''}`} id="build-tab">
            <div className="packages-grid" ref={buildGridRef}>
              <div className="package-card">
                <h3>Launch Pad</h3>
                <div className="package-price">Starting at $999</div>
                <p className="package-desc">A fast, high-converting site to boost calls and quotes</p>
                <ul className="package-features">
                  <li>✓ 1-page lead generator</li>
                  <li>✓ Copywriting included (questionnaire-based)</li>
                  <li>✓ Click-to-call + quote form</li>
                  <li>✓ Service areas + trust section</li>
                  <li>✓ Mobile-first</li>
                  <li>✓ Basic local SEO setup</li>
                </ul>
              </div>
              <div className="package-card">
                <h3>Starter</h3>
                <div className="package-price">Starting at $1,999</div>
                <p className="package-desc">Perfect for small businesses getting their first professional website</p>
                <ul className="package-features">
                  <li>✓ Up to 5 pages</li>
                  <li>✓ Template-based design</li>
                  <li>✓ Contact forms</li>
                  <li>✓ Basic local SEO</li>
                  <li>✓ Mobile responsive</li>
                  <li>✓ Google Maps integration</li>
                  <li>✓ 30-min training session</li>
                </ul>
              </div>
              <div className="package-card featured">
                <div className="featured-badge">Most Popular</div>
                <h3>Growth</h3>
                <div className="package-price">Starting at $4,499</div>
                <p className="package-desc">For established businesses ready to generate more leads</p>
                <ul className="package-features">
                  <li>✓ Everything in Starter</li>
                  <li>✓ Up to 10 pages</li>
                  <li>✓ Advanced forms &amp; lead routing</li>
                  <li>✓ Review integration</li>
                  <li>✓ Service pages (up to 5)</li>
                  <li>✓ Copywriting polish</li>
                  <li>✓ Conversion optimization</li>
                  <li>✓ Performance optimization</li>
                </ul>
              </div>
              <div className="package-card">
                <h3>Pro</h3>
                <div className="package-price">Starting at $7,999</div>
                <p className="package-desc">For businesses serious about dominating their local market</p>
                <ul className="package-features">
                  <li>✓ Everything in Growth</li>
                  <li>✓ Up to 15 pages</li>
                  <li>✓ 2 landing pages</li>
                  <li>✓ Advanced tracking</li>
                  <li>✓ Content strategy + 3 posts</li>
                  <li>✓ Local SEO Pro</li>
                  <li>✓ Performance audit</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
            </div>
            <div className="carousel-dots">
              {[0, 1, 2, 3].map((i) => (
                <button key={i} type="button" className="dot" data-index={i} aria-label={`Package ${i + 1}`} onClick={() => scrollToPackage(buildGridRef, i)} />
              ))}
            </div>
            <div className="swipe-hint">
              Swipe for more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </div>
          </div>

          <div className={`tab-content ${packagesTab === 'care' ? 'active' : ''}`} id="care-tab">
            <div className="packages-grid" ref={careGridRef}>
              <div className="package-card">
                <h3>Essentials</h3>
                <div className="package-price">$99<span>/month</span></div>
                <p className="package-desc">Peace of mind for small businesses</p>
                <ul className="package-features">
                  <li>✓ WordPress updates</li>
                  <li>✓ Daily backups (30-day retention)</li>
                  <li>✓ Uptime monitoring</li>
                  <li>✓ Basic security</li>
                  <li>✓ 30 min/month edits</li>
                  <li>✓ SSL certificate</li>
                  <li>✓ Hosting included</li>
                </ul>
              </div>
              <div className="package-card featured">
                <div className="featured-badge">Most Popular</div>
                <h3>Growth</h3>
                <div className="package-price">$199<span>/month</span></div>
                <p className="package-desc">For growing businesses</p>
                <ul className="package-features">
                  <li>✓ Everything in Essentials</li>
                  <li>✓ Priority support (24hr)</li>
                  <li>✓ Security hardening</li>
                  <li>✓ Performance monitoring</li>
                  <li>✓ 60 min/month edits</li>
                  <li>✓ Monthly optimization</li>
                  <li>✓ Detailed reports</li>
                </ul>
              </div>
              <div className="package-card">
                <h3>Pro</h3>
                <div className="package-price">$399<span>/month</span></div>
                <p className="package-desc">For serious growth</p>
                <ul className="package-features">
                  <li>✓ Everything in Growth</li>
                  <li>✓ 2 hours/month edits</li>
                  <li>✓ Content iterations</li>
                  <li>✓ 1 landing page/quarter</li>
                  <li>✓ Quarterly tune-ups</li>
                  <li>✓ Strategy calls</li>
                  <li>✓ Premium hosting</li>
                </ul>
              </div>
            </div>
            <div className="carousel-dots">
              {[0, 1, 2].map((i) => (
                <button key={i} type="button" className="dot" data-index={i} aria-label={`Package ${i + 1}`} onClick={() => scrollToPackage(careGridRef, i)} />
              ))}
            </div>
            <div className="swipe-hint">
              Swipe for more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="why-grid">
            <div className="why-item">
              <img className="why-icon-img" src="/assets/Main Website/quick.png" alt="Fast turnaround" loading="lazy" />
              <h3>Fast Turnaround</h3>
              <p>Most websites completed in 1–2 weeks</p>
            </div>
            <div className="why-item">
              <img className="why-icon-img" src="/assets/Main Website/smartphone.png" alt="Mobile-first design" loading="lazy" />
              <h3>Mobile-First</h3>
              <p>Every site optimized for mobile devices</p>
            </div>
            <div className="why-item">
              <img className="why-icon-img" src="/assets/Main Website/targeted.png" alt="Lead-focused websites" loading="lazy" />
              <h3>Lead-Focused</h3>
              <p>Designed to generate calls and bookings</p>
            </div>
            <div className="why-item">
              <img className="why-icon-img" src="/assets/Main Website/customer-service.png" alt="Ongoing support" loading="lazy" />
              <h3>Ongoing Support</h3>
              <p>Maintenance plans so you never worry</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq" aria-label="Frequently asked questions">
        <div className="container">
          <h2 className="section-title">FAQ</h2>
          <p className="section-subtitle">Clear answers so you know exactly what you&apos;re getting.</p>
          <div className="faq-list">
            <details className="faq-item">
              <summary>How long does a typical website take?</summary>
              <div className="faq-body">Most projects take <strong>1–2 weeks</strong> depending on pages, photos, and how quickly we get feedback.</div>
            </details>
            <details className="faq-item">
              <summary>What do you need from me to get started?</summary>
              <div className="faq-body">A quick questionnaire, your logo (if you have one), a list of services, service areas, and any photos you want included. If you don&apos;t have photos, we&apos;ll recommend simple options.</div>
            </details>
            <details className="faq-item">
              <summary>What&apos;s included in the build?</summary>
              <div className="faq-body">Mobile-first design, click-to-call + lead forms, basic local SEO setup, and a layout built to convert visitors into calls and quotes.</div>
            </details>
            <details className="faq-item">
              <summary>How many edits do I get?</summary>
              <div className="faq-body">We do a focused review round after the first draft, then a final polish pass. The goal is to ship fast without endless back-and-forth.</div>
            </details>
            <details className="faq-item">
              <summary>Do you offer hosting and maintenance?</summary>
              <div className="faq-body">Yes — if you want to be worry-free, we can handle hosting, updates, backups, and ongoing edits through a care plan.</div>
            </details>
            <details className="faq-item">
              <summary>Do I own the website?</summary>
              <div className="faq-body">Yes. If you ever want to take it over, we can hand everything off. (We&apos;ll outline the handover fee clearly up front.)</div>
            </details>
          </div>
          <div className="faq-cta">
            <h3>Want to see examples?</h3>
            <p>Check out demos and real previews — then we&apos;ll build one tailored to your business.</p>
            <div className="faq-cta-actions">
              <Link to="/portfolio" className="btn btn-secondary">View Portfolio</Link>
              <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
