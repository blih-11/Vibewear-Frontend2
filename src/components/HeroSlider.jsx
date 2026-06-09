import { useState, useEffect, useRef } from 'react';

export default function HeroSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 400);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setFading(false);
      }, 400);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <section className="zttw-hero">
      {/* Full-bleed background image */}
      <div
        className="zttw-hero__bg"
        style={{
          backgroundImage: `url(${slide.image})`,
          opacity: fading ? 0 : 1,
        }}
      />

      {/* Subtle dark overlay so nav icons are readable */}
      <div className="zttw-hero__overlay" />

      {/* Slide dots — bottom centre */}
      <div className="zttw-hero__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(timerRef.current); goTo(i); }}
            aria-label={`Slide ${i + 1}`}
            className={`zttw-dot${i === current ? ' zttw-dot--active' : ''}`}
          />
        ))}
      </div>

      <style>{`
        .zttw-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 500px;
          overflow: hidden;
        }

        .zttw-hero__bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
          transition: opacity 0.4s ease;
        }

        /* Very subtle dark gradient at top so nav is legible */
        .zttw-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.28) 0%,
            rgba(0,0,0,0.04) 35%,
            rgba(0,0,0,0) 60%
          );
          pointer-events: none;
        }

        .zttw-hero__dots {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          align-items: center;
          z-index: 3;
        }

        .zttw-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.7);
          background: transparent;
          padding: 0;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .zttw-dot--active {
          background: #fff;
          border-color: #fff;
        }
      `}</style>
    </section>
  );
}