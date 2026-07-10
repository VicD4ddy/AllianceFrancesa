'use client';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp({ whatsappNumber = '584121234567' }) {
  const mensaje = `¡Bonjour Alianza Francesa Valencia! Quisiera solicitar información general sobre las próximas convocatorias de francés presencial.`;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingBtn}
      aria-label="Atención directa por WhatsApp"
    >
      <div className={styles.iconWrap}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>
      <span className={styles.label}>Inscripción WhatsApp</span>
    </a>
  );
}
