'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [guardando, setGuardando] = useState(false);

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
      {/* Top Bar */}
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#E1000F' }}>af</span>
          <h2 className={styles.brandTitle}>Panel de Administrador • Alianza Francesa</h2>
        </div>

        <div className={styles.topActions}>
          <Link href="/" target="_blank" className={styles.previewBtn}>
            👁️ Ver Web en Vivo
          </Link>
          <button
            onClick={handleGuardarCambios}
            disabled={guardando}
            className={styles.saveBtn}
          >
            {guardando ? 'Guardando...' : '💾 Publicar Cambios'}
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

              {content.cursos?.map((curso, index) => (
                <div key={curso.id} className={styles.courseItemCard}>
                  <div className={styles.courseItemHeader}>
                    <span className={styles.courseBadge}>{curso.modalidad}</span>
                    <strong style={{ fontSize: '1.1rem' }}>{curso.titulo}</strong>
                  </div>

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
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155', marginTop: '0.5rem' }}>
                      Horarios disponibles para {curso.titulo}:
                    </span>
                    {curso.horarios?.map((horario, hIdx) => (
                      <div key={horario.id} className={styles.horarioRow}>
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
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
          </div>
        )}
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
