'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './admin.module.css';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [heroPreview, setHeroPreview] = useState(null);
  const [subiendoImg, setSubiendoImg] = useState(false);
  const [cursoAbierto, setCursoAbierto] = useState(0);

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Previsualización local inmediata
    const reader = new FileReader();
    reader.onload = (ev) => setHeroPreview(ev.target.result);
    reader.readAsDataURL(file);

    // Subir al servidor
    setSubiendoImg(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pin', pin);
      formData.append('filename', 'hero');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        // Guardar la ruta en el CMS para que Hero.js la use
        setContent({
          ...content,
          hero: { ...content.hero, heroImage: data.path + '?v=' + Date.now() }
        });
        setToastMessage('Imagen del Hero actualizada correctamente');
        setTimeout(() => setToastMessage(''), 3000);
      } else {
        alert('Error al subir imagen: ' + (data.error || 'Desconocido'));
      }
    } catch (err) {
      alert('Error de conexión al subir la imagen');
    } finally {
      setSubiendoImg(false);
    }
  };

  const [culturaPreview, setCulturaPreview] = useState(null);
  const [subiendoCulturaImg, setSubiendoCulturaImg] = useState(false);

  const handleCulturaImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setCulturaPreview(ev.target.result);
    reader.readAsDataURL(file);

    setSubiendoCulturaImg(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pin', pin);
      formData.append('filename', 'cultura_destacado');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setContent({
          ...content,
          cultura: {
            ...content.cultura,
            destacado: {
              ...content.cultura?.destacado,
              imagen: data.path + '?v=' + Date.now()
            }
          }
        });
        setToastMessage('Imagen de evento cultural subida correctamente');
        setTimeout(() => setToastMessage(''), 3000);
      } else {
        alert('Error al subir imagen: ' + (data.error || 'Desconocido'));
      }
    } catch (err) {
      alert('Error de conexión al subir la imagen del evento');
    } finally {
      setSubiendoCulturaImg(false);
    }
  };

  const handleResetOficiales = async () => {
    if (!confirm('¿Estás seguro de restaurar los valores oficiales de la Alianza Francesa Valencia? Esto reemplazará las ediciones actuales.')) {
      return;
    }
    try {
      const res = await fetch('/api/content', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      const data = await res.json();
      if (res.ok && data.content) {
        setContent(data.content);
        setToastMessage('Valores oficiales restaurados con éxito');
        setTimeout(() => setToastMessage(''), 4000);
      } else {
        alert('Error al restaurar: ' + (data.error || 'No autorizado'));
      }
    } catch (e) {
      alert('Error de conexión');
    }
  };

  const agregarHorario = (cursoIndex) => {
    const nuevosCursos = [...content.cursos];
    const curso = nuevosCursos[cursoIndex];
    const nuevoId = 'h_' + Date.now();
    curso.horarios = [
      ...curso.horarios,
      {
        id: nuevoId,
        dias: 'Nuevo Horario',
        hora: 'de 4:00 a 6:00 pm',
        tipo: 'Semanal'
      }
    ];
    setContent({ ...content, cursos: nuevosCursos });
  };

  const eliminarHorario = (cursoIndex, horarioIndex) => {
    const nuevosCursos = [...content.cursos];
    nuevosCursos[cursoIndex].horarios.splice(horarioIndex, 1);
    setContent({ ...content, cursos: nuevosCursos });
  };

  // Intentar cargar contenido
  const cargarContenido = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
    } catch (e) {
      console.error('Error al cargar contenido en admin:', e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      if (res.ok) {
        setAuthorized(true);
        cargarContenido();
      } else {
        setLoginError('PIN incorrecto. (PIN por defecto: AFV-2026)');
      }
    } catch (error) {
      setLoginError('Error al conectar con servidor');
    }
  };

  const handleGuardarCambios = async () => {
    if (!content) return;
    setGuardando(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, content })
      });

      if (res.ok) {
        setToastMessage('¡Cambios publicados en vivo en la página oficial!');
        setTimeout(() => setToastMessage(''), 4000);
      } else {
        alert('Error al guardar: No autorizado');
      }
    } catch (error) {
      alert('Hubo un error guardando el contenido.');
    } finally {
      setGuardando(false);
    }
  };

  if (!authorized) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <span className={styles.loginBadge}>ACCESO RESTRINGIDO</span>
            <h1 className={styles.loginTitle}>Panel de Administración</h1>
            <p className={styles.loginSub}>Alianza Francesa Valencia</p>
          </div>

          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="admin-pin">
                PIN de Administrador
              </label>
              <input
                id="admin-pin"
                type="password"
                required
                placeholder="Introduce tu PIN (ej: AFV-2026)"
                className={styles.input}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              {loginError && (
                <span style={{ color: '#E1000F', fontSize: '0.85rem', fontWeight: 600 }}>
                  {loginError}
                </span>
              )}
            </div>

            <button type="submit" className={styles.loginBtn}>
              Acceder al CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={styles.container} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Cargando información editable...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <Image
            src="/afico.png"
            alt="Logo Alianza Francesa"
            width={38}
            height={38}
            className={styles.brandLogo}
            unoptimized
          />
          <div className={styles.brandText}>
            <h2 className={styles.brandTitle}>Panel de Control</h2>
            <span className={styles.brandSubtitle}>Alianza Francesa Valencia</span>
          </div>
        </div>

        <div className={styles.topActions}>
          <Link href="/" target="_blank" className={styles.previewBtn}>
            👁️ Ver Web
          </Link>
          <button
            onClick={handleGuardarCambios}
            disabled={guardando}
            className={styles.saveBtn}
          >
            {guardando ? 'Guardando...' : '💾 Guardar'}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={styles.tabNav}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'hero' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          Hero &amp; Encabezado
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'cursos' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('cursos')}
        >
          Cursos, Etiquetas &amp; Horarios
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'cultura' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('cultura')}
        >
          Agenda Cultural &amp; Eventos
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'contacto' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('contacto')}
        >
          Contacto &amp; Configuración
        </button>
      </nav>

      {/* Editor Body */}
      <main className={styles.main}>
        {/* Tab 1: Hero */}
        {activeTab === 'hero' && (
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Edición del Encabezado Principal (Hero)</h3>
            <p className={styles.sectionSub}>Modifica el titular, la insignia y las descripciones de la portada.</p>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Insignia de Ubicación</label>
                <input
                  type="text"
                  className={styles.input}
                  value={content.hero?.badge || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Titular Principal</label>
                <input
                  type="text"
                  className={styles.input}
                  value={content.hero?.headline || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, headline: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.inputGroup + ' ' + styles.formGridFull}>
                <label className={styles.label}>Descripción Principal</label>
                <textarea
                  className={styles.textarea}
                  value={content.hero?.description || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, description: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Botón Primario (CTA)</label>
                <input
                  type="text"
                  className={styles.input}
                  value={content.hero?.ctaPrimary || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, ctaPrimary: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Enlace Secundario</label>
                <input
                  type="text"
                  className={styles.input}
                  value={content.hero?.ctaSecondary || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, ctaSecondary: e.target.value }
                    })
                  }
                />
              </div>
            </div>

            {/* Sección de Imagen Hero */}
            <div className={styles.card} style={{ marginTop: '1.5rem' }}>
              <h3 className={styles.sectionTitle}>Imagen del Hero (Flyer / Poster)</h3>
              <p className={styles.sectionSub}>
                Sube una nueva imagen para reemplazar el flyer principal que aparece en la portada de la página.
              </p>

              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Previsualización */}
                <div style={{
                  width: '220px',
                  height: '275px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '2px solid #e2e8f0',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {heroPreview ? (
                    <img
                      src={heroPreview}
                      alt="Previsualización del Hero"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={content.hero?.heroImage || '/hero.png'}
                      alt="Imagen actual del Hero"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Seleccionar nueva imagen</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      className={styles.input}
                      style={{ padding: '0.6rem' }}
                    />
                  </div>
                  {subiendoImg && (
                    <p style={{ color: '#002395', fontWeight: 600, marginTop: '0.75rem', fontSize: '0.9rem' }}>
                      ⏳ Subiendo imagen al servidor...
                    </p>
                  )}
                  <p style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.75rem' }}>
                    Formatos aceptados: PNG, JPG, WEBP. Tamaño recomendado: 520×650px.
                    La imagen se reemplazará de inmediato al seleccionarla.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cursos y Horarios */}
        {activeTab === 'cursos' && (
          <div>
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Gestión de Cursos &amp; Etiquetas Dinámicas</h3>
              <p className={styles.sectionSub}>
                Cambia las etiquetas destacadas (&quot;¡Inscripciones Abiertas!&quot;, &quot;¡Últimos cupos!&quot;) y edita los horarios de cada programa.
              </p>

              {content.cursos?.map((curso, index) => {
                const isOpen = cursoAbierto === index;
                return (
                  <div key={curso.id} className={styles.courseItemCard}>
                    <div
                      className={styles.accordionHeader}
                      onClick={() => setCursoAbierto(isOpen ? -1 : index)}
                    >
                      <div className={styles.accordionTitleArea}>
                        <span className={styles.courseBadge}>{curso.modalidad}</span>
                        <strong className={styles.courseTitleText}>{curso.titulo}</strong>
                      </div>
                      <div className={`${styles.accordionToggleBtn} ${isOpen ? styles.accordionToggleBtnActive : ''}`}>
                        <span>{isOpen ? 'Ocultar' : 'Editar'}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.chevronIcon}>
                          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '1.25rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
                        <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Etiqueta Destacada (Rojo Alianza)</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={curso.etiquetaEstado || ''}
                        onChange={(e) => {
                          const nuevosCursos = [...content.cursos];
                          nuevosCursos[index].etiquetaEstado = e.target.value;
                          setContent({ ...content, cursos: nuevosCursos });
                        }}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Subtítulo de Programa</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={curso.subtitulo || ''}
                        onChange={(e) => {
                          const nuevosCursos = [...content.cursos];
                          nuevosCursos[index].subtitulo = e.target.value;
                          setContent({ ...content, cursos: nuevosCursos });
                        }}
                      />
                    </div>

                    <div className={styles.inputGroup + ' ' + styles.formGridFull}>
                      <label className={styles.label}>Descripción general del curso</label>
                      <textarea
                        className={styles.textarea}
                        value={curso.descripcion || ''}
                        onChange={(e) => {
                          const nuevosCursos = [...content.cursos];
                          nuevosCursos[index].descripcion = e.target.value;
                          setContent({ ...content, cursos: nuevosCursos });
                        }}
                      />
                    </div>
                  </div>

                  {/* Horarios */}
                  <div className={styles.horariosList}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155' }}>
                        Horarios disponibles para {curso.titulo}:
                      </span>
                      <button
                        type="button"
                        onClick={() => agregarHorario(index)}
                        style={{
                          background: '#EFF6FF',
                          color: '#002395',
                          border: '1px solid #BFDBFE',
                          borderRadius: '8px',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        + Agregar Horario
                      </button>
                    </div>
                    {curso.horarios?.map((horario, hIdx) => (
                      <div key={horario.id} className={styles.horarioRow} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          className={styles.input}
                          style={{ flex: 1 }}
                          value={horario.dias}
                          placeholder="Días"
                          onChange={(e) => {
                            const nuevosCursos = [...content.cursos];
                            nuevosCursos[index].horarios[hIdx].dias = e.target.value;
                            setContent({ ...content, cursos: nuevosCursos });
                          }}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          style={{ flex: 1 }}
                          value={horario.hora}
                          placeholder="Rango horario"
                          onChange={(e) => {
                            const nuevosCursos = [...content.cursos];
                            nuevosCursos[index].horarios[hIdx].hora = e.target.value;
                            setContent({ ...content, cursos: nuevosCursos });
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => eliminarHorario(index, hIdx)}
                          title="Eliminar este horario"
                          style={{
                            background: '#FEE2E2',
                            color: '#DC2626',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.55rem 0.75rem',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          🗑️
                        </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
            </div>
          </div>
        )}

        {/* Tab 3: Cultura */}
        {activeTab === 'cultura' && (
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Agenda Cultural &amp; Destacado</h3>
            <p className={styles.sectionSub}>Edita el evento principal cultural en la Mediateca o Cine Francés.</p>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Título del Evento Destacado</label>
                <input
                  type="text"
                  className={styles.input}
                  value={content.cultura?.destacado?.titulo || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cultura: {
                        ...content.cultura,
                        destacado: { ...content.cultura?.destacado, titulo: e.target.value }
                      }
                    })
                  }
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Fecha &amp; Lugar</label>
                <input
                  type="text"
                  className={styles.input}
                  value={content.cultura?.destacado?.fecha || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cultura: {
                        ...content.cultura,
                        destacado: { ...content.cultura?.destacado, fecha: e.target.value }
                      }
                    })
                  }
                />
              </div>

              <div className={styles.inputGroup + ' ' + styles.formGridFull}>
                <label className={styles.label}>Descripción del evento</label>
                <textarea
                  className={styles.textarea}
                  value={content.cultura?.destacado?.descripcion || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cultura: {
                        ...content.cultura,
                        destacado: { ...content.cultura?.destacado, descripcion: e.target.value }
                      }
                    })
                  }
                />
              </div>
            </div>

            {/* Subida de Imagen Evento Cultural */}
            <div className={styles.card} style={{ marginTop: '1.5rem' }}>
              <h3 className={styles.sectionTitle}>Afiche / Imagen del Evento Cultural</h3>
              <p className={styles.sectionSub}>Sube una imagen para el evento destacado (ej: Festival de Cine Francés).</p>

              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{
                  width: '220px',
                  height: '140px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '2px solid #e2e8f0',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img
                    src={culturaPreview || content.cultura?.destacado?.imagen || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80'}
                    alt="Previsualización Evento"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Seleccionar imagen del evento</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCulturaImageUpload}
                      className={styles.input}
                      style={{ padding: '0.6rem' }}
                    />
                  </div>
                  {subiendoCulturaImg && (
                    <p style={{ color: '#002395', fontWeight: 600, marginTop: '0.75rem', fontSize: '0.9rem' }}>
                      ⏳ Subiendo imagen del evento...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Contacto y Configuración General */}
        {activeTab === 'contacto' && (
          <div>
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Configuración Institucional &amp; WhatsApp</h3>
              <p className={styles.sectionSub}>Administra la línea de atención oficial, correo y dirección de la sede.</p>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Número de WhatsApp de Inscripciones (código de país sin signo +)</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={content.contacto?.whatsapp || '584121234567'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contacto: { ...content.contacto, whatsapp: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Correo Electrónico Oficial</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={content.contacto?.email || 'valencia@afvenezuela.org'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contacto: { ...content.contacto, email: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.inputGroup + ' ' + styles.formGridFull}>
                  <label className={styles.label}>Dirección Física de la Sede</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={content.contacto?.sede || 'Av. Bolívar Norte (San José), Valencia, Estado Carabobo'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contacto: { ...content.contacto, sede: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Card de Respaldo y Restauración */}
            <div className={styles.card} style={{ marginTop: '1.5rem', borderLeft: '4px solid #E1000F' }}>
              <h3 className={styles.sectionTitle} style={{ color: '#E1000F' }}>Restauración &amp; Respaldo del Sistema</h3>
              <p className={styles.sectionSub}>
                Si deseas revertir cualquier error de edición y recuperar todos los textos y horarios oficiales predeterminados por la Alianza Francesa Valencia, haz clic en el botón inferior.
              </p>
              <button
                type="button"
                onClick={handleResetOficiales}
                style={{
                  background: '#FEE2E2',
                  color: '#DC2626',
                  border: '1px solid #FCA5A5',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                🔄 Restaurar Todos los Valores Oficiales por Defecto
              </button>
            </div>
          </div>
        )}
      {/* Botón flotante de guardado rápido en móvil */}
      <button
        type="button"
        onClick={handleGuardarCambios}
        disabled={guardando}
        className={styles.mobileFab}
        title="Guardar todos los cambios"
      >
        {guardando ? '⏳ ...' : '💾 Guardar'}
      </button>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toast}>
          ✓ {toastMessage}
        </div>
      )}
    </div>
  );
}
