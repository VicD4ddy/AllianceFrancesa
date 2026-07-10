'use client';
import { useState, useEffect } from 'react';
import styles from './InscripcionModal.module.css';

export default function InscripcionModal({
  isOpen,
  onClose,
  cursoSeleccionado,
  whatsappNumber = '584121234567'
}) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [horarioElegido, setHorarioElegido] = useState('');

  useEffect(() => {
    if (cursoSeleccionado?.horario) {
      setHorarioElegido(cursoSeleccionado.horario);
    } else if (cursoSeleccionado?.horarios?.length > 0) {
      const h0 = cursoSeleccionado.horarios[0];
      setHorarioElegido(`${h0.dias} (${h0.hora})`);
    } else {
      setHorarioElegido('');
    }
  }, [cursoSeleccionado]);

  if (!isOpen) return null;

  const handleEnviarWhatsApp = (e) => {
    e.preventDefault();

    const saludo = `¡Bonjour Alianza Francesa Valencia!`;
    const detalleCurso = `Quisiera solicitar información e inscribirme en el curso: *${cursoSeleccionado?.titulo || 'Francés'}* (${cursoSeleccionado?.modalidad || 'Presencial'}).`;
    const detalleHorario = horarioElegido
      ? `\nHorario de preferencia: *${horarioElegido}*`
      : '';
    const detalleAlumno = nombre ? `\nMi nombre es: *${nombre}*` : '';
    const detalleTel = telefono ? `\nTeléfono de contacto: *${telefono}*` : '';

    const mensajeCompleto = `${saludo}\n\n${detalleCurso}${detalleHorario}${detalleAlumno}${detalleTel}\n\n¿Cuáles son los pasos y tarifas de matrícula?`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeCompleto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.tag}>Alianza Francesa Valencia</span>
            <h3 className={styles.title}>Inscripción Rápida</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal" title="Cerrar ventana">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form className={styles.body} onSubmit={handleEnviarWhatsApp}>
          <div className={styles.selectedCourseBadge}>
            <span className={styles.badgeLabel}>Programa Seleccionado</span>
            <span className={styles.badgeValue}>
              {cursoSeleccionado?.titulo || 'Francés Presencial'}
            </span>
            <span className={styles.badgeSub}>
              Modalidad: {cursoSeleccionado?.modalidad || 'Presencial'}
            </span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="nombre-alumno">
              Tu Nombre y Apellido
            </label>
            <input
              id="nombre-alumno"
              type="text"
              required
              placeholder="Ej. Camille Dupont"
              className={styles.input}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="telefono-alumno">
              Teléfono / WhatsApp
            </label>
            <input
              id="telefono-alumno"
              type="tel"
              required
              placeholder="Ej. +58 412 123 4567"
              className={styles.input}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="horario-select">
              Horario preferido
            </label>
            {cursoSeleccionado?.horarios?.length > 0 ? (
              <select
                id="horario-select"
                className={styles.select}
                value={horarioElegido}
                onChange={(e) => setHorarioElegido(e.target.value)}
              >
                {cursoSeleccionado.horarios.map((h) => (
                  <option key={h.id} value={`${h.dias} (${h.hora})`}>
                    {h.dias} — {h.hora}
                  </option>
                ))}
                <option value="Consultar otros horarios disponibles">
                  Consultar otros horarios disponibles
                </option>
              </select>
            ) : (
              <input
                id="horario-select"
                type="text"
                className={styles.input}
                placeholder="Ej. Martes y Jueves 3:30 pm o Sábados"
                value={horarioElegido}
                onChange={(e) => setHorarioElegido(e.target.value)}
              />
            )}
          </div>

          <button type="submit" className={styles.whatsappBtn}>
            <span>Iniciar Inscripción por WhatsApp</span>
          </button>

          <p className={styles.note}>
            Serás contactado directamente por el departamento académico de la sede Av. Bolívar Norte.
          </p>
        </form>
      </div>
    </div>
  );
}
