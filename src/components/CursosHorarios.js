'use client';
import { useState, useEffect } from 'react';
import styles from './CursosHorarios.module.css';
import InscripcionModal from './InscripcionModal';

export default function CursosHorarios() {
  const [activeTab, setActiveTab] = useState('presencial');
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [cursosData, setCursosData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cursoElegido, setCursoElegido] = useState(null);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.cursos) {
          setCursosData(data.cursos);
        }
      })
      .catch((err) => console.error('Error cargando cursos dinámicos:', err));
  }, []);

  const handleAbrirInscripcion = (curso, horario = '') => {
    setCursoElegido({
      titulo: curso.titulo,
      modalidad: curso.modalidad,
      horario: horario
    });
    setModalOpen(true);
  };

  // Buscar el curso activo de los datos dinámicos o usar fallback
  const cursoActivo = cursosData?.find((c) => c.id === activeTab);

  // Filtrar horarios por tipo si se seleccionó un filtro
  const horariosFiltrados = cursoActivo?.horarios?.filter((h) => {
    if (filtroTipo === 'Todos') return true;
    return h.tipo === filtroTipo;
  });

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
              onClick={() => { setActiveTab('presencial'); setFiltroTipo('Todos'); }}
            >
              Francés Presencial
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'conversacion'}
              className={`${styles.tabBtn} ${activeTab === 'conversacion' ? styles.activeTab : ''}`}
              onClick={() => { setActiveTab('conversacion'); setFiltroTipo('Todos'); }}
            >
              Club de Conversación
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'delf'}
              className={`${styles.tabBtn} ${activeTab === 'delf' ? styles.activeTab : ''}`}
              onClick={() => { setActiveTab('delf'); setFiltroTipo('Todos'); }}
            >
              Exámenes DELF / DALF
            </button>
          </div>
        </div>

        {/* Filtro Interactivo por Tipo de Horario */}
        {activeTab !== 'delf' && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {['Todos', 'Semanal', 'Sabatino'].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '999px',
                  border: filtroTipo === tipo ? '2px solid #E1000F' : '1px solid #cbd5e1',
                  background: filtroTipo === tipo ? '#FFF1F2' : '#FFFFFF',
                  color: filtroTipo === tipo ? '#E1000F' : '#475569',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tipo === 'Todos' ? 'Todos los Horarios' : `Horario ${tipo}`}
              </button>
            ))}
          </div>
        )}

        {/* Tab 1: Francés Presencial */}
        {activeTab === 'presencial' && (
          <div className={styles.contentGrid}>
            <div className={styles.mainCard}>
              <div className={styles.cardHeader}>
                <div className={styles.beretBadge}>
                  <span className="material-symbols-outlined">
                    {cursoActivo?.icono || 'school'}
                  </span>
                  <span>{cursoActivo?.modalidad || 'Programa Presencial'}</span>
                </div>
                <span className={styles.startDate}>
                  {cursoActivo?.subtitulo || 'Próximo Inicio: Trimestre en Curso'}
                </span>
              </div>

              <h3 className={styles.cardHeadline}>
                Francés <em>Presencial</em>
              </h3>
              <p className={styles.cardDesc}>
                {cursoActivo?.descripcion ||
                  'Clases dinámicas e inmersivas en nuestra sede de Av. Bolívar Norte (San José). Grupos reducidos con profesores nativos y certificados.'}
              </p>

              {/* Horarios Dinámicos */}
              <div className={styles.schedulePills}>
                {(horariosFiltrados || [
                  { id: '1', dias: 'Martes y Jueves', hora: 'de 3:30 a 5:30 pm' },
                  { id: '2', dias: 'Martes y Jueves', hora: 'de 6:00 a 8:00 pm' },
                  { id: '3', dias: 'Sábados Intensivos', hora: 'de 8:00 am a 12:00 pm' }
                ]).map((item) => (
                  <div
                    key={item.id}
                    className={styles.pill}
                    onClick={() => handleAbrirInscripcion(cursoActivo || { titulo: 'Francés Presencial', modalidad: 'Presencial' }, `${item.dias} ${item.hora}`)}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                    title="Haz clic para inscribirte en este horario"
                  >
                    <span className="material-symbols-outlined">calendar_today</span>
                    <div>
                      <strong>{item.dias}</strong>
                      <span>{item.hora}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.pricingFoot}>
                <div className={styles.priceBox}>
                  <span>Matrícula &amp; Inscripción</span>
                  <strong style={{ color: '#E1000F' }}>
                    {cursoActivo?.etiquetaEstado || '¡Inscripciones Abiertas!'}
                  </strong>
                </div>
                <button
                  onClick={() => handleAbrirInscripcion(cursoActivo || { titulo: 'Francés Presencial', modalidad: 'Presencial' })}
                  className="btn-primary"
                >
                  Inscríbete Ahora
                </button>
              </div>
            </div>

            {/* Side Card */}
            <div className={styles.sideBenefitCard}>
              <div className={styles.sideBenefitIcon}>
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <h4>¿Por qué estudiar en Alliance Française?</h4>
              <ul className={styles.sideList}>
                {(cursoActivo?.beneficios || [
                  'Única institución avalada por la Embajada de Francia en Carabobo.',
                  'Acceso directo a nuestra mediateca cultural y biblioteca en francés.',
                  'Metodología 100% comunicativa desde la primera sesión.'
                ]).map((ben, idx) => (
                  <li key={idx}>
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Conversación */}
        {activeTab === 'conversacion' && (
          <div className={styles.contentGrid}>
            <div className={styles.mainCard}>
              <div className={styles.cardHeader}>
                <div className={styles.beretBadge}>
                  <span className="material-symbols-outlined">forum</span>
                  <span>Rencontre de Conversation</span>
                </div>
                <span className={styles.startDate}>
                  {cursoActivo?.subtitulo || 'Nivel requerido: A2 en adelante'}
                </span>
              </div>

              <h3 className={styles.cardHeadline}>
                Conversación <em>en Francés</em>
              </h3>
              <p className={styles.cardDesc}>
                {cursoActivo?.descripcion ||
                  'Practica tu fluidez, pronunciación y vocabulario en un ambiente relajado y cultural. Debate sobre arte, actualidad, gastronomía y cine francófono.'}
              </p>

              <div className={styles.schedulePills}>
                {(horariosFiltrados || [
                  { id: 'c1', dias: 'Viernes Culturales', hora: 'de 4:00 a 6:00 pm' },
                  { id: 'c2', dias: 'Sábados de Café', hora: 'de 10:30 am a 12:30 pm' }
                ]).map((item) => (
                  <div
                    key={item.id}
                    className={styles.pill}
                    onClick={() => handleAbrirInscripcion(cursoActivo || { titulo: 'Club de Conversación', modalidad: 'Presencial / Híbrida' }, `${item.dias} ${item.hora}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="material-symbols-outlined">event</span>
                    <div>
                      <strong>{item.dias}</strong>
                      <span>{item.hora}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.pricingFoot}>
                <div className={styles.priceBox}>
                  <span>Estado del grupo</span>
                  <strong style={{ color: '#E1000F' }}>
                    {cursoActivo?.etiquetaEstado || '¡Últimos cupos!'}
                  </strong>
                </div>
                <button
                  onClick={() => handleAbrirInscripcion(cursoActivo || { titulo: 'Club de Conversación', modalidad: 'Presencial / Híbrida' })}
                  className="btn-primary"
                >
                  Reservar Plaza
                </button>
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

        {/* Tab 3: DELF / DALF */}
        {activeTab === 'delf' && (
          <div className={styles.delfGrid} id="examenes">
            <div className={styles.delfLeft}>
              <span className={styles.delfTag}>Certificación Internacional</span>
              <h3 className={styles.delfHeadline}>
                Exámenes Oficiales <span>DELF &amp; DALF</span>
              </h3>
              <p className={styles.delfDesc}>
                {cursoActivo?.descripcion ||
                  'Títulos oficiales emitidos por el Ministerio de Educación Nacional de Francia, con validez de por vida. Imprescindibles para estudiar, migrar o trabajar en países francófonos.'}
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
              <button
                onClick={() => handleAbrirInscripcion(cursoActivo || { titulo: 'Exámenes DELF / DALF', modalidad: 'Certificación Oficial' })}
                className="btn-primary"
              >
                Consultar Sesiones e Inscribirse
              </button>
            </div>

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

      {/* Modal Inteligente de WhatsApp */}
      <InscripcionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cursoSeleccionado={cursoElegido}
      />
    </section>
  );
}
