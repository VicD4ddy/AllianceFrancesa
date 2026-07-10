'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top Diplomatic Official Banner */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarLeft}>
            <div className={styles.tricolorRibbon} aria-hidden="true">
              <span className={styles.ribbonBlue} />
              <span className={styles.ribbonWhite} />
              <span className={styles.ribbonRed} />
            </div>
            <div className={styles.diplomaticMarquee}>
              <span className={styles.diplomaticText}>
                Ambassade de France au Venezuela &nbsp;•&nbsp; Institución Oficial Acreditada en Carabobo &nbsp;•&nbsp; Centro DELF / DALF Autorizado
              </span>
            </div>
          </div>
          <div className={styles.topBarRight}>
            <span className={styles.topBarTag}>Centro DELF / DALF Autorizado</span>
          </div>
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={styles.inner}>

          {/* Logo */}
          <Link href="/" className={styles.logoLink} aria-label="Alliance Française Valencia — página principal">
            <Image
              src="/logo-share.png"
              alt="Alliance Française Valencia - Desde 1978"
              width={52}
              height={52}
              className={styles.logoImg}
              priority
              unoptimized
            />
            <div className={styles.logoText}>
              Alliance<br />Française<br />Valencia
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className={styles.nav} aria-label="Navegación principal">
            <Link href="#cursos">Cursos &amp; Horarios</Link>
            <Link href="#examenes">Exámenes DELF/DALF</Link>
            <Link href="#cultura">Cultura &amp; Cine</Link>
            <Link href="#nosotros">Pasaporte AF</Link>
          </nav>

          {/* Actions Desktop & Mobile Toggle */}
          <div className={styles.actions}>
            <div className={styles.searchWrap} role="search">
              <span className="material-symbols-outlined" aria-hidden="true">search</span>
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar en el sitio"
                id="site-search"
              />
            </div>
            <Link href="#cursos" className={`btn-primary ${styles.btnDesktop}`} id="btn-inscribirse" aria-label="Inscribirse">
              Inscribirse
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className={styles.hamburgerBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className={styles.mobileDrawer} role="dialog" aria-label="Menú móvil">
            <nav className={styles.mobileNav}>
              <Link href="#cursos" onClick={() => setMobileOpen(false)}>
                Cursos &amp; Horarios
              </Link>
              <Link href="#examenes" onClick={() => setMobileOpen(false)}>
                Exámenes DELF/DALF
              </Link>
              <Link href="#cultura" onClick={() => setMobileOpen(false)}>
                Cultura &amp; Cine
              </Link>
              <Link href="#nosotros" onClick={() => setMobileOpen(false)}>
                Pasaporte AF
              </Link>
              <Link
                href="#cursos"
                className="btn-primary"
                style={{ marginTop: '16px', justifyContent: 'center' }}
                onClick={() => setMobileOpen(false)}
              >
                Inscribirse Ahora
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
