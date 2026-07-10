'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  const [heroData, setHeroData] = useState({
    badge: 'Valencia, Venezuela',
    headline: 'Vive la Inmersión Cultural Francesa',
    description: 'Descubre el idioma, el arte y el pensamiento en el corazón de Valencia. Más que una escuela, tu puente directo a la cultura francófona.',
    ctaPrimary: 'Inicia tu Viaje Cultural',
    ctaSecondary: 'Descubre nuestros cursos'
  });

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.hero) {
          setHeroData(data.hero);
        }
      })
      .catch((err) => console.error('Error cargando datos del Hero:', err));
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">

      {/* Infinite Horizontal Scrolling Marquee Watermark */}
      <div className={styles.watermark} aria-hidden="true">
        <div className={`${styles.marqueeTrack} ${styles.track1}`}>
          <div className={styles.marqueeContent}>
            <span>Francés — Alliance Française — Francés — Alliance Française —&nbsp;</span>
          </div>
          <div className={styles.marqueeContent}>
            <span>Francés — Alliance Française — Francés — Alliance Française —&nbsp;</span>
          </div>
        </div>

        <div className={`${styles.marqueeTrack} ${styles.track2}`}>
          <div className={styles.marqueeContent}>
            <span>Presencial — Valencia — Presencial — Valencia — Presencial — Valencia —&nbsp;</span>
          </div>
          <div className={styles.marqueeContent}>
            <span>Presencial — Valencia — Presencial — Valencia — Presencial — Valencia —&nbsp;</span>
          </div>
        </div>

        <div className={`${styles.marqueeTrack} ${styles.track3}`}>
          <div className={styles.marqueeContent}>
            <span>Sábados — DELF &amp; DALF — Sábados — DELF &amp; DALF — Sábados — DELF &amp; DALF —&nbsp;</span>
          </div>
          <div className={styles.marqueeContent}>
            <span>Sábados — DELF &amp; DALF — Sábados — DELF &amp; DALF — Sábados — DELF &amp; DALF —&nbsp;</span>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        {/* Left column */}
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className="material-symbols-outlined" aria-hidden="true">language</span>
            <span>{heroData.badge}</span>
          </div>

          <h1 id="hero-heading" className={styles.headline}>
            {heroData.headline}
          </h1>

          <p className={styles.desc}>
            {heroData.description}
          </p>

          <div className={styles.cta}>
            <Link href="#cursos" className="btn-primary" id="btn-viaje-cultural">
              {heroData.ctaPrimary}
            </Link>
            <Link href="#cursos" className="btn-text-link" id="btn-cursos-link">
              {heroData.ctaSecondary}
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.cardWrap}>
          <div className={`${styles.decoCircle} ${styles.decoC1}`} />
          <div className={`${styles.decoCircle} ${styles.decoC2}`} />
          <div className={styles.heroPosterCard}>
            <Image
              src="/hero.png"
              alt="Francés Presencial - Alliance Française Valencia"
              width={520}
              height={650}
              className={styles.heroPosterImg}
              priority
            />
          </div>
        </div>
      </div>

    </section>
  );
}
