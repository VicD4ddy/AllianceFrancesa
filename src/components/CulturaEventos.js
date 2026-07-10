'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CulturaEventos.module.css';

export default function CulturaEventos() {
  const sectionRef = useRef(null);
  const [culturaData, setCulturaData] = useState({
    subTagline: 'Agenda Cultural Francófona',
    title: 'Cultura, Cine & Eventos',
    subtitle: 'Sumérgete en una vibrante agenda cultural diseñada para acercarte a la esencia francófona a través del cine, el arte y la gastronomía.',
    destacado: {
      titulo: '40 Años de Festival de Cine Francés',
      fecha: 'Todos los Jueves • Mediateca AF Valencia',
      descripcion: 'Disfruta de la mejor selección del cine contemporáneo francófono con proyecciones especiales y debates en nuestras instalaciones. Entradas ya disponibles.',
      imagen: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80'
    }
  });

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.cultura) {
          setCulturaData(data.cultura);
        }
      })
      .catch((err) => console.error('Error cargando cultura:', err));
  }, []);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.anim-ready');
    if (!cards) return;

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
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={styles.section}
      id="cultura"
      aria-labelledby="cultura-heading"
      ref={sectionRef}
    >
      <div className="container">

        {/* Section header */}
        <div className={styles.header}>
          <div>
            <span className={styles.subTagline}>{culturaData.subTagline || 'Agenda Cultural Francófona'}</span>
            <h2 id="cultura-heading" className={styles.title}>{culturaData.title || 'Cultura, Cine & Eventos'}</h2>
            <p className={styles.subtitle}>
              {culturaData.subtitle || 'Sumérgete en una vibrante agenda cultural diseñada para acercarte a la esencia francófona a través del cine, el arte y la gastronomía.'}
            </p>
          </div>
          <Link href="#contacto" className="btn-outline-primary" id="btn-agenda">
            Ver Agenda Completa
            <span className="material-symbols-outlined" aria-hidden="true">east</span>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid} role="list">

          {/* Main feature inspired by Allfra3.png - 40 Años Festival de Cine Francés */}
          <article className={`${styles.bentoMain} anim-ready`} role="listitem">
            <Image
              src={culturaData?.destacado?.imagen || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80'}
              alt={culturaData?.destacado?.titulo || 'Festival de Cine Francés'}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className={styles.bentoImg}
              priority
              unoptimized
            />
            <div className={styles.overlay} aria-hidden="true" />
            
            {/* Cinematic 40 Años Badge */}
            <div className={styles.anniversaryBadge}>
              <span className={styles.annivNum}>40</span>
              <div className={styles.annivText}>
                <span>AÑOS</span>
                <small>DE PASIÓN AL ROJO VIVO</small>
              </div>
            </div>

            <div className={styles.bentoContent}>
              <div className={styles.tagWrap}>
                <span className={styles.tag}>{culturaData?.destacado?.fecha || 'Gala Inaugural'}</span>
                <span className={styles.tagGold}>Edición Especial</span>
              </div>
              <h3 className={styles.mainTitle}>
                {culturaData?.destacado?.titulo || 'Festival de Cine Francés'}
              </h3>
              <p className={styles.mainDesc}>
                {culturaData?.destacado?.descripcion || 'Disfruta de la mejor selección del cine contemporáneo francófono con proyecciones especiales y debates en nuestras instalaciones. Entradas ya disponibles.'}
              </p>
              <Link href="#contacto" className={styles.mainLink} id="btn-festival">
                Reservar Entradas para la Gala
                <span className="material-symbols-outlined" aria-hidden="true">arrow_right_alt</span>
              </Link>
            </div>
          </article>

          {/* Side event 1 */}
          <article className={`${styles.bentoSide1} anim-ready`} role="listitem">
            <Image
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80"
              alt="Noche de Cine – proyección especial"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={styles.bentoImg}
            />
            <div className={styles.sideTop}>
              <span className={styles.sideDate}>24 Octubre</span>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ color: 'var(--on-surface)', fontSize: '22px' }}>movie</span>
            </div>
            <div className={styles.sideBottom}>
              <span className={styles.sideTitle}>Noche de Cine Noir</span>
              <br />
              <span className={styles.sideDesc}>
                Proyección especial y foro debate sobre clásicos del cine noir y Nouvelle Vague.
              </span>
            </div>
          </article>

          {/* Side event 2 */}
          <article className={`${styles.bentoSide2} anim-ready`} role="listitem">
            <div className={styles.side2Bg} />
            <div className={styles.sideTop} style={{ position: 'relative', zIndex: 2 }}>
              <span className={styles.sideDateOutline}>Noviembre</span>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ color: 'var(--primary)', fontSize: '22px' }}>restaurant_menu</span>
            </div>
            <div className={styles.sideBottom} style={{ position: 'relative', zIndex: 2 }}>
              <p className={styles.sideTitleDark}>Masterclass de Gastronomía</p>
              <p className={styles.sideDescPlain}>
                Aprende los secretos de la patisserie y boulangerie tradicional francesa en nuestros talleres prácticos.
              </p>
              <Link href="#contacto" className={styles.sideLink} id="btn-reserva">
                Reserva tu plaza
              </Link>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
