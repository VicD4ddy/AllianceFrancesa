'use client';
import { useState } from 'react';
import styles from './CursosHorarios.module.css';

export default function CursosHorarios() {
  const [activeTab, setActiveTab] = useState('presencial');

  return (
    <section className={styles.section} id="cursos" aria-labelledby="cursos-heading">
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.tagline}>Aprende Francés en Valencia</span>
            <h2 id="cursos-heading" className={styles.title}>
              Cursos, Horarios &amp; Modalidades
            </h2>
            <p className={styles.subtitle}>
              Formación académica diseñada según el Marco Común Europeo de Referencia para las Lenguas (MCER).
              Elige el horario que se adapte a tu estilo de vida.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className={styles.tabBar} role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'presencial'}
              className={`${styles.tabBtn} ${activeTab === 'presencial' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('presencial')}
            >
              Francés Presencial
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'conversacion'}
              className={`${styles.tabBtn} ${activeTab === 'conversacion' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('conversacion')}
            >
              Club de Conversación
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'delf'}
              className={`${styles.tabBtn} ${activeTab === 'delf' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('delf')}
            >
              Exámenes DELF / DALF
            </button>
          </div>
        </div>

        {/* Tab 1: Francés Presencial (Allfra1 reference) */}
        {activeTab === 'presencial' && (
          <div className={styles.contentGrid}>
            <div className={styles.mainCard}>
              <div className={styles.cardHeader}>
                <div className={styles.beretBadge}>
                  <span className="material-symbols-outlined">school</span>
                  <span>Programa Presencial</span>
                </div>
                <span className={styles.startDate}>Próximo Inicio: Trimestre en Curso</span>
              </div>

              <h3 className={styles.cardHeadline}>
                Francés <em>Presencial</em>
              </h3>
              <p className={styles.cardDesc}>
                Clases dinámicas e inmersivas en nuestra sede de Av. Bolívar Norte (San José). 
                Grupos reducidos con profesores nativos y certificados.
              </p>

              {/* Red-bordered Schedule Pills from Allfra1.png */}
              <div className={styles.schedulePills}>
                <div className={styles.pill}>
                  <span className="material-symbols-outlined">calendar_today</span>
                  <div>
                    <strong>Martes y Jueves</strong>
                    <span>de 3:30 a 5:30 pm</span>
                  </div>
                </div>
                <div className={styles.pill}>
                  <span className="material-symbols-outlined">schedule</span>
                  <div>
                    <strong>Martes y Jueves</strong>
                    <span>de 6:00 a 8:00 pm</span>
                  </div>
                </div>
                <div className={styles.pill}>
                  <span className="material-symbols-outlined">wb_sunny</span>
                  <div>
                    <strong>Sábados Intensivos</strong>
                    <span>de 8:00 am a 12:00 pm</span>
                  </div>
                </div>
              </div>

              <div className={styles.pricingFoot}>
                <div className={styles.priceBox}>
                  <span>Matrícula &amp; Inscripción</span>
                  <strong>Cupos Abiertos</strong>
                </div>
                <a href="#contacto" className="btn-primary">
                  Inscríbete Ahora
                </a>
              </div>
            </div>

            {/* Side Card */}
            <div className={styles.sideBenefitCard}>
              <div className={styles.sideBenefitIcon}>
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <h4>¿Por qué estudiar en Alliance Française?</h4>
              <ul className={styles.sideList}>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Única institución avalada por la Embajada de Francia en Carabobo.</span>
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Acceso directo a nuestra mediateca cultural y biblioteca en francés.</span>
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Metodología 100% comunicativa desde la primera sesión.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Conversación (Allfra4 reference) */}
        {activeTab === 'conversacion' && (
          <div className={styles.contentGrid}>
            <div className={styles.mainCard}>
              <div className={styles.cardHeader}>
                <div className={styles.beretBadge}>
                  <span className="material-symbols-outlined">forum</span>
                  <span>Rencontre de Conversation</span>
                </div>
                <span className={styles.startDate}>Nivel requerido: A2 en adelante</span>
              </div>

              <h3 className={styles.cardHeadline}>
                Conversación <em>en Francés</em>
              </h3>
              <p className={styles.cardDesc}>
                Practica tu fluidez, pronunciación y vocabulario en un ambiente relajado y cultural. 
                Debate sobre arte, actualidad, gastronomía y cine francófono.
              </p>

              <div className={styles.schedulePills}>
                <div className={styles.pill}>
                  <span className="material-symbols-outlined">event</span>
                  <div>
                    <strong>Viernes Culturales</strong>
                    <span>de 5:00 a 7:00 pm</span>
                  </div>
                </div>
                <div className={styles.pill}>
                  <span className="material-symbols-outlined">coffee</span>
                  <div>
                    <strong>Sábados de Café</strong>
                    <span>de 2:00 a 4:00 pm</span>
                  </div>
                </div>
              </div>

              <div className={styles.pricingFoot}>
                <div className={styles.priceBox}>
                  <span>Modalidad</span>
                  <strong>Presencial &amp; Dinámica</strong>
                </div>
                <a href="#contacto" className="btn-primary">
                  Reservar Plaza
                </a>
              </div>
            </div>

            <div className={styles.sideBenefitCard}>
              <div className={styles.sideBenefitIcon}>
                <span className="material-symbols-outlined">record_voice_over</span>
              </div>
              <h4>¡Cómete el mundo hablando francés!</h4>
              <p className={styles.sideText}>
                Ideal para quienes ya tienen bases del idioma y buscan soltarse al hablar frente a nativos y compañeros de alto nivel.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: DELF / DALF (Allfra4 reference with French Blue + Red color blocking) */}
        {activeTab === 'delf' && (
          <div className={styles.delfGrid} id="examenes">
            <div className={styles.delfLeft}>
              <span className={styles.delfTag}>Certificación Internacional</span>
              <h3 className={styles.delfHeadline}>
                Exámenes Oficiales <span>DELF &amp; DALF</span>
              </h3>
              <p className={styles.delfDesc}>
                Títulos oficiales emitidos por el Ministerio de Educación Nacional de Francia, con validez de por vida. 
                Imprescindibles para estudiar, migrar o trabajar en países francófonos.
              </p>
              <div className={styles.delfLevels}>
                <div className={styles.levelBox}>
                  <strong>DELF A1 - B2</strong>
                  <span>Diplôme d&apos;Études en Langue Française</span>
                </div>
                <div className={styles.levelBox}>
                  <strong>DALF C1 - C2</strong>
                  <span>Diplôme Approfondi de Langue Française</span>
                </div>
              </div>
              <a href="#contacto" className="btn-primary">
                Consultar Sesiones de Examen
              </a>
            </div>

            {/* Official Color Block grid from Allfra4.png */}
            <div className={styles.delfColorBlock}>
              <div className={styles.blockRed}>
                <span className="material-symbols-outlined">assignment</span>
                <span>Registro Oficial</span>
              </div>
              <div className={styles.blockWhite}>
                <span className={styles.afLogoItalic}>af</span>
                <span>Centro Autorizado</span>
              </div>
              <div className={styles.blockBlue}>
                <strong>DELF<br />DALF</strong>
                <span>Reconocimiento Mundial</span>
              </div>
              <div className={styles.blockRedAlt}>
                <span className="material-symbols-outlined">military_tech</span>
                <span>Validez de por Vida</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
