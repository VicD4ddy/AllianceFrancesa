import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>

        {/* Brand & Contact */}
        <div>
          <h2 className={styles.brandTitle}>Alliance Française Valencia</h2>
          <ul className={styles.contactList}>
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
              <span>Av. Bolívar Norte, Sector San José, Valencia, Estado Carabobo, Venezuela.</span>
            </li>
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">phone</span>
              <span>+58 241-825.XXXX</span>
            </li>
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">chat</span>
              <span>WhatsApp: +58 414-414.XXXX</span>
            </li>
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">language</span>
              <a
                href="https://valencia.alianzafrancesa.org.ve"
                target="_blank"
                rel="noopener noreferrer"
              >
                valencia.alianzafrancesa.org.ve
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={styles.colTitle}>Enlaces Rápidos</h3>
          <ul className={styles.links}>
            <li><Link href="#">Mapa del sitio</Link></li>
            <li><Link href="#">Política de privacidad</Link></li>
            <li><Link href="#">Contacto</Link></li>
            <li><Link href="#">Aviso Legal</Link></li>
          </ul>
        </div>

        {/* Support + Copyright */}
        <div className={styles.right}>
          <div>
            <p className={styles.apoyo}>Con el apoyo de:</p>
            {/* French flag SVG inline – no external image dependency */}
            <div className={styles.flagWrap} title="Ambassade de France au Venezuela">
              <svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" className={styles.flagSvg} aria-label="Bandera de Francia">
                <rect width="1" height="2" fill="#002395" />
                <rect x="1" width="1" height="2" fill="#EDEDED" />
                <rect x="2" width="1" height="2" fill="#ED2939" />
              </svg>
            </div>
          </div>
          <p className={styles.copy}>© 2024 Alliance Française Valencia. Tous droits réservés.</p>
        </div>

      </div>
    </footer>
  );
}
