'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">

      {/* Infinite Horizontal Scrolling Marquee Watermark */}
      <div className={styles.watermark} aria-hidden="true">
        {/* Track 1: Left to Right */}
        <div className={`${styles.marqueeTrack} ${styles.track1}`}>
          <div className={styles.marqueeContent}>
            <span>Francés — Alliance Française — Francés — Alliance Française —&nbsp;</span>
          </div>
          <div className={styles.marqueeContent}>
            <span>Francés — Alliance Française — Francés — Alliance Française —&nbsp;</span>
          </div>
        </div>

        {/* Track 2: Right to Left */}
        <div className={`${styles.marqueeTrack} ${styles.track2}`}>
          <div className={styles.marqueeContent}>
            <span>Presencial — Valencia — Presencial — Valencia — Presencial — Valencia —&nbsp;</span>
          </div>
          <div className={styles.marqueeContent}>
            <span>Presencial — Valencia — Presencial — Valencia — Presencial — Valencia —&nbsp;</span>
          </div>
        </div>

        {/* Track 3: Left to Right */}
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
            <span>Valencia, Venezuela</span>
          </div>

          <h1 id="hero-heading" className={styles.headline}>
            Vive la Inmersión<br />
            Cultural <em>Francesa</em>
          </h1>

          <p className={styles.desc}>
            Descubre el idioma, el arte y el pensamiento en el corazón de Valencia.
            Más que una escuela, tu puente directo a la cultura francófona.
          </p>

          <div className={styles.cta}>
            <button className="btn-primary" id="btn-viaje-cultural">
              Inicia tu Viaje Cultural
            </button>
            <Link href="#cursos" className="btn-text-link" id="btn-cursos-link">
              Descubre nuestros cursos
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Right column – Hero flyer image (hero.png) */}
        <div className={styles.cardWrap}>
          <div className={`${styles.decoCircle} ${styles.decoC1}`} />
          <div className={`${styles.decoCircle} ${styles.decoC2}`} />
          <div className={styles.heroPosterCard}>
            <Image
              src="/hero.png"
              alt="Francés Presencial - Alliance Française Valencia - Horarios y Tarifas"
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
