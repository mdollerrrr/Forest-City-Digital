import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PORTFOLIO_ITEMS = [
  {
    title: 'Slürps Dirty Soda',
    videoSrc: '/assets/Main Website/slurps recording.mp4',
    outcomes: ['Pop-up schedule page', 'Event booking / contact flow', 'Mobile-first social + CTA layout'],
    visitUrl: 'https://slurpsdirtysoda.vercel.app/',
  },
  {
    title: 'Bella Vista Restaurant Demo',
    videoSrc: '/assets/Main Website/assetsportfolio-demo.mp4',
    outcomes: ['Online menu & hours', 'Reservation / contact forms', 'Mobile-friendly layout'],
    visitUrl: 'https://example.com',
  },
  {
    title: 'Another Project',
    videoSrc: '/assets/another-demo.mp4',
    outcomes: ['Custom pages & branding', 'Lead capture & calls to action'],
    visitUrl: 'https://example.com',
  },
];

function PortfolioCard({ item }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const isHoverDevice = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

    function stopAllExcept(exceptVideo) {
      document.querySelectorAll('.portfolio-preview').forEach((w) => {
        const v = w.querySelector('.portfolio-video');
        if (!v || v === exceptVideo) return;
        try {
          v.pause();
          v.currentTime = 0;
        } catch (e) {}
        w.classList.remove('is-playing');
      });
    }

    if (isHoverDevice) {
      const onEnter = () => {
        stopAllExcept(video);
        wrap.classList.add('is-playing');
        video.play().catch(() => {});
      };
      const onLeave = () => {
        wrap.classList.remove('is-playing');
        video.pause();
        video.currentTime = 0;
      };
      wrap.addEventListener('mouseenter', onEnter);
      wrap.addEventListener('mouseleave', onLeave);
      return () => {
        wrap.removeEventListener('mouseenter', onEnter);
        wrap.removeEventListener('mouseleave', onLeave);
      };
    }

    const onClick = () => {
      if (video.paused) {
        stopAllExcept(video);
        video.preload = 'auto';
        try {
          video.load();
        } catch (e) {}
        wrap.classList.add('is-playing');
        video.play().catch(() => {});
      } else {
        wrap.classList.remove('is-playing');
        try {
          video.pause();
          video.currentTime = 0;
        } catch (e) {}
      }
    };
    wrap.addEventListener('click', onClick);
    return () => wrap.removeEventListener('click', onClick);
  }, [item.videoSrc]);

  return (
    <article className="portfolio-card">
      <div className="portfolio-preview" ref={wrapRef} aria-hidden="true">
        <div className="portfolio-play-overlay" aria-hidden="true">
          <span className="portfolio-play-icon" aria-hidden="true" />
          <span className="portfolio-play-text">Tap to play preview</span>
        </div>
        <video className="portfolio-video" ref={videoRef} muted loop preload="metadata" playsInline>
          <source src={item.videoSrc} type="video/mp4" />
        </video>
      </div>
      <div className="portfolio-footer">
        <h3 className="portfolio-title">{item.title}</h3>
        <ul className="portfolio-outcomes">
          {item.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <a href={item.visitUrl} target="_blank" rel="noopener" className="portfolio-link">Visit site →</a>
        <Link to="/contact" className="btn btn-primary portfolio-cta">Get one like this</Link>
      </div>
    </article>
  );
}

export default function Portfolio() {
  return (
    <section className="work-section portfolio-section">
      <div className="container">
        <h2 className="section-title">Websites We&apos;ve Built</h2>
        <p className="section-subtitle">
          Tap (mobile) or hover (desktop) over a preview to play the video. Click the link to visit the live site.
        </p>
        <div className="portfolio-grid" id="portfolio-grid">
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
