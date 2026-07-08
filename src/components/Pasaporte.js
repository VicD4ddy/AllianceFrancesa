'use client';
import { useEffect, useRef } from 'react';
import styles from './Pasaporte.module.css';

const FEATURES = [
  {
    icon: 'favorite',
    title: 'Estudios Superiores',
    desc: 'Estudiar en universidades de prestigio en Europa, Francia y Canadá con convenios directos.',
  },
  {
    icon: 'chat_bubble',
    title: 'Comunidad Global',
    desc: 'Conectar con millones de personas de culturas diversas alrededor de los cinco continentes.',
  },
  {
    icon: 'send',
    title: 'Impulso Profesional',
    desc: 'Avanzar en tu carrera internacional en empresas transnacionales y organizaciones.',
  },
  {
    icon: 'bookmark',
    title: 'Idioma de Alcance',
    desc: 'El francés es el segundo idioma más aprendido en el mundo y clave en diplomacia.',
  },
];

export default function Pasaporte() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.anim-ready');
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('anim-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} id="nosotros" aria-labelledby="pasaporte-heading" ref={ref}>
      <div className="container">

        {/* Section intro */}
        <div className={styles.intro}>
          <span className={styles.tagline}>Red Global Alliance Française</span>
          <h2 id="pasaporte-heading" className={styles.title}>Tu Pasaporte al Mundo</h2>
          <p className={styles.desc}>
            Dominar el francés te abre las puertas a oportunidades educativas, profesionales y
            culturales sin fronteras. Sigue la ruta de inmersión francófona.
          </p>
        </div>

        {/* Features grid with Dotted Red Flight Path (Allfra2 reference) */}
        <div className={styles.featuresWrap}>
          {/* Background SVG dotted red route */}
          <svg
            className={styles.flightRouteSvg}
            viewBox="0 0 1000 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 80 60 Q 220 10, 360 60 T 640 60 T 920 60"
              stroke="#c8102e"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>

          <div className={styles.featuresGrid} role="list">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`${styles.featureItem} anim-ready`}
                role="listitem"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.iconWrap}>
                  <span className="material-symbols-outlined" aria-hidden="true">{f.icon}</span>
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology box */}
        <div className={`${styles.metodologia} anim-ready`} id="metodologia">
          {/* Visual */}
          <div className={styles.metoVisual} aria-hidden="true">
            <div className={styles.metoVisualInner}>
              <span className={styles.afMonogram}>af</span>
              <svg
                className={styles.metoSvg}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M20 100 Q60 30 100 100 Q140 170 180 100" stroke="#c8102e" strokeWidth="1" strokeDasharray="4 6" opacity=".28" />
                <path d="M20 120 Q60 50 100 120 Q140 190 180 120" stroke="#c8102e" strokeWidth="1" strokeDasharray="4 6" opacity=".18" />
                <circle cx="20" cy="100" r="4" fill="#c8102e" opacity=".38" />
                <circle cx="100" cy="100" r="4" fill="#c8102e" opacity=".38" />
                <circle cx="180" cy="100" r="4" fill="#c8102e" opacity=".38" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#c8102e" strokeWidth=".6" strokeDasharray="3 5" opacity=".14" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#c8102e" strokeWidth=".6" strokeDasharray="3 5" opacity=".14" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className={styles.metoContent}>
            <h3 className={styles.metoTitle}>Nuestra Metodología</h3>
            <div className={styles.metoGrid}>
              <div className={styles.metoBlock}>
                <strong>Enfoque Comunicativo</strong>
                <p>
                  Aprende practicando desde el primer día en situaciones reales, desarrollando
                  comprensión y expresión oral y escrita de forma integrada.
                </p>
              </div>
              <div className={styles.metoBlock}>
                <strong>Profesores Nativos y Certificados</strong>
                <p>
                  Equipo docente altamente calificado, formado en las últimas metodologías de
                  enseñanza del francés como lengua extranjera.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
