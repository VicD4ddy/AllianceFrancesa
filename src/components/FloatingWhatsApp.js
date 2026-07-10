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
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.638 1.966 14.122 1.96 12.01 1.96c-5.437 0-9.863 4.373-9.867 9.803-.001 1.839.486 3.633 1.412 5.2l-.994 3.626 3.731-.963zm11.267-7.464c-.3-.15-1.774-.875-2.048-.974-.275-.1-.475-.15-.674.15-.2.3-.774.974-.95 1.174-.175.2-.35.225-.65.075-1.04-.519-1.808-.962-2.52-2.186-.19-.323.19-.3.543-1.002.075-.15.038-.282-.018-.382-.056-.1-.475-1.144-.65-1.569-.17-.412-.34-.356-.475-.362-.125-.006-.27-.006-.413-.006-.144 0-.375.054-.57.269-.195.212-.75.731-.75 1.782 0 1.05.762 2.062.869 2.2.106.14 1.5 2.294 3.633 3.218.507.22 1.012.35 1.357.46.508.162.97.14 1.336.085.408-.06 1.774-.725 2.024-1.425.25-.7.25-1.3 0-1.425-.075-.125-.275-.2-.575-.35z"/>
        </svg>
      </div>
      <span className={styles.label}>Inscripción WhatsApp</span>
    </a>
  );
}
