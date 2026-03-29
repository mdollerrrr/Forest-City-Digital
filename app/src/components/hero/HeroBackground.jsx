/**
 * Premium hero background for Forest City Digital main site.
 * Floating gradient blobs (CSS keyframes) + subtle grain. No Motion/GSAP.
 * Layering: glows (z-0) → grain → hero content (container).
 */
export function HeroBackground() {
  return (
    <>
      <div className="hero-bg-glows" aria-hidden="true">
        <div className="hero-bg-blob hero-bg-blob-1" />
        <div className="hero-bg-blob hero-bg-blob-2" />
        <div className="hero-bg-blob hero-bg-blob-3" />
      </div>
      <div className="hero-bg-grain" aria-hidden="true" />
    </>
  );
}
