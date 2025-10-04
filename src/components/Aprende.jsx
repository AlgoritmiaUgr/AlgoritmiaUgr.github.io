import { staticContent } from '../data/staticContent';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Aprende = () => {
  // Selector de modo: 'libre' | 'apuntes' | null
  const [learningMode, setLearningMode] = useState(null);
  // Página mínima: mostramos sólo la Introducción desde datos estáticos
  const introPage = staticContent.pages.find((p) => p.id === 'introduccion') || staticContent.pages[0];

  // Contenido seleccionado: null hasta que el usuario elige algo en la sidebar
  const [selectedContent, setSelectedContent] = useState(null);
  // Estado de colapsables para secciones
  const [expanded, setExpanded] = useState({ estructuras: false, algoritmos: false, retos: false, extra: false });
  const toggle = (key) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  // Descripciones de secciones (SPA): qué contiene cada bloque, por modo
  const sectionDescriptions = {
    libre: {
      estructuras: {
        title: 'Estructuras de datos',
        intro:
          'Domina las estructuras fundamentales para resolver problemas con eficiencia. Empezaremos por lo básico y subiremos de complejidad con ejemplos prácticos.',
        bullets: [
          'Arrays, listas enlazadas y colas/pilas',
          'Conjuntos y mapas (hash y ordenados)',
          'Árboles y grafos: nociones esenciales',
          'Cuándo usar cada estructura y costes típicos',
        ],
      },
      algoritmos: {
        title: 'Algorítmica',
        intro:
          'Técnicas y patrones para diseñar soluciones: de aproximaciones greedy a programación dinámica, con foco en la intuición y la práctica.',
        bullets: [
          'Complejidad temporal/espacial y análisis asintótico',
          'Búsqueda, ordenación y dos punteros',
          'Divide y vencerás, backtracking',
          'Programación dinámica (DP) paso a paso',
        ],
      },
      retos: {
        title: 'Retos',
        intro:
          'Colecciones de ejercicios graduados para poner en práctica lo aprendido. Pensados para mantener un ritmo constante y medir progreso.',
        bullets: [
          'Katas por nivel (fácil → intermedio → avanzado)',
          'Retos temáticos (ED, grafos, DP, greedy)',
          'Pistas opcionales y soluciones comentadas',
        ],
      },
      'reto-1': {
        title: 'Reto #1',
        intro: 'Primer reto de práctica para calentar motores: aplica conceptos básicos con un enunciado corto.',
        bullets: ['Entrada/Salida simple', 'Complejidad O(n)', 'Casos borde típicos'],
      },
      'reto-2': {
        title: 'Reto #2',
        intro: 'Segundo reto con un pequeño giro: refuerza patrones vistos y prueba una optimización ligera.',
        bullets: ['Pensar invariantes', 'Evitar doble bucle cuando sea posible', 'Probar con inputs grandes'],
      },
      extra: {
        title: 'Extra',
        intro:
          'Recursos complementarios para profundizar o variar el aprendizaje. Consejos, herramientas y lecturas recomendadas.',
        bullets: [
          'Buenas prácticas de código y estilo',
          'Herramientas: jueces online, depuración, plantillas',
          'Lecturas y referencias para seguir creciendo',
        ],
      },
    },
    apuntes: {
      estructuras: {
        title: 'Estructuras de datos (Apuntes)',
        intro:
          'Resumenes orientados a asignaturas: definiciones, propiedades y operaciones típicas con notación de coste y ejemplos concisos.',
        bullets: [
          'Listas, colas y pilas: ADTs y complejidades',
          'Diccionarios/mapas y sets: implementación y uso',
          'Árboles (BST, AVL) y grafos: conceptos básicos',
        ],
      },
      algoritmos: {
        title: 'Algorítmica (Apuntes)',
        intro:
          'Esquemas clásicos y patrones de examen: demostraciones breves, pseudocódigo y análisis de complejidad.',
        bullets: [
          'Greedy: criterio y pruebas de optimalidad',
          'Divide y vencerás y recursión de Master',
          'Backtracking y poda',
          'Programación dinámica: formulación y tablas',
        ],
      },
    },
  };

  const isActive = (key) => selectedContent === key;
  const itemBtnClass = (active) =>
    `appearance-none border-0 block w-full text-xs font-semibold uppercase tracking-wider rounded-md px-3 py-2 transition-colors ${
      active
        ? 'bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red text-white shadow'
        : 'bg-transparent text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
    }`;

  return (
    <div className="w-full">
      {/* Sidebar fija bajo el header: solo tras elegir modo */}
      {learningMode && (
        <aside className="hidden lg:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r border-gray-200 dark:border-gray-700 px-4 py-5 overflow-y-auto bg-transparent z-20">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white mb-4 text-center">CONTENIDOS</h2>
          {learningMode === 'libre' && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedContent('introduccion');
                  setTimeout(() => {
                    const el = document.getElementById('que-es');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }}
                className={`${itemBtnClass(isActive('introduccion'))} text-sm text-center`}
                aria-current={isActive('introduccion') ? 'page' : undefined}
              >
                Introducción
              </button>
            </div>
          )}
          <div className="space-y-2">
            <div>
              <button
                type="button"
                onClick={() => {
                  toggle('estructuras');
                  setSelectedContent('estructuras');
                }}
                className={`${itemBtnClass(isActive('estructuras'))} flex items-center justify-between`}
                aria-expanded={expanded.estructuras}
                aria-current={isActive('estructuras') ? 'page' : undefined}
              >
                <span>ESTRUCTURAS DE DATOS</span>
                <span className="ml-2">{expanded.estructuras ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
              </button>
              {expanded.estructuras && (
                <div className="mt-1 pl-3 text-xs text-black/70 dark:text-white/70">
                  {/* Contenido interno opcional en el futuro */}
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  toggle('algoritmos');
                  setSelectedContent('algoritmos');
                }}
                className={`${itemBtnClass(isActive('algoritmos'))} flex items-center justify-between`}
                aria-expanded={expanded.algoritmos}
                aria-current={isActive('algoritmos') ? 'page' : undefined}
              >
                <span>ALGORÍTMICA</span>
                <span className="ml-2">{expanded.algoritmos ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
              </button>
              {expanded.algoritmos && (
                <div className="mt-1 pl-3 text-xs text-black/70 dark:text-white/70">
                  {/* Contenido interno opcional en el futuro */}
                </div>
              )}
            </div>
            {learningMode === 'libre' && (
              <>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      toggle('retos');
                      setSelectedContent('retos');
                    }}
                    className={`${itemBtnClass(isActive('retos'))} flex items-center justify-between`}
                    aria-expanded={expanded.retos}
                    aria-current={isActive('retos') ? 'page' : undefined}
                  >
                    <span>RETOS</span>
                    <span className="ml-2">{expanded.retos ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
                  </button>
                  {expanded.retos && (
                    <div className="mt-1 pl-3 space-y-1">
                      <button
                        type="button"
                        onClick={() => setSelectedContent('reto-1')}
                        className={`w-full text-left text-xs px-2 py-1 rounded-md transition-colors bg-transparent border-0 ${
                          isActive('reto-1')
                            ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white'
                            : 'text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
                        }`}
                      >
                        Reto #1
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedContent('reto-2')}
                        className={`w-full text-left text-xs px-2 py-1 rounded-md transition-colors bg-transparent border-0 ${
                          isActive('reto-2')
                            ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white'
                            : 'text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
                        }`}
                      >
                        Reto #2
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      toggle('extra');
                      setSelectedContent('extra');
                    }}
                    className={`${itemBtnClass(isActive('extra'))} flex items-center justify-between`}
                    aria-expanded={expanded.extra}
                    aria-current={isActive('extra') ? 'page' : undefined}
                  >
                    <span>EXTRA</span>
                    <span className="ml-2">{expanded.extra ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
                  </button>
                  {expanded.extra && (
                    <div className="mt-1 pl-3 text-xs text-black/70 dark:text-white/70">
                      {/* Contenido interno opcional en el futuro */}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </aside>
      )}

      {/* Contenido principal (margina según sidebar) */}
      <div className={learningMode ? 'lg:ml-64' : undefined}>
  <div className={learningMode ? 'px-4 sm:px-6 lg:pl-[76px] lg:pr-10 py-10' : 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'}>
          {!learningMode && (
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black dark:text-white mb-5 bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red bg-clip-text text-transparent">Aprende</h1>
              <p className="text-lg sm:text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed mb-6">Primeros pasos y conceptos básicos de programación competitiva.</p>
              <div className="flex justify-center mb-10"><div className="w-28 h-[3px] bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red rounded-full"></div></div>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-center text-xl sm:text-2xl text-black dark:text-white font-light mb-6">Elige cómo quieres aprender</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <button onClick={() => setLearningMode('libre')} className="group relative overflow-hidden text-left rounded-2xl p-6 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/15 dark:border-white/10 ring-1 ring-black/10 dark:ring-white/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/40">
                    <div className="text-base font-medium text-black dark:text-white mb-1">Aprendizaje libre</div>
                    <p className="text-sm text-black/70 dark:text-white/70">Ruta autodidacta para aprender por afán: desde lo más básico a técnicas avanzadas.</p>
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"><div className="absolute -inset-x-6 -top-8 h-16 bg-gradient-to-b from-white/40 to-transparent dark:from-white/10 blur-xl" /></div>
                  </button>
                  <button onClick={() => setLearningMode('apuntes')} className="group relative overflow-hidden text-left rounded-2xl p-6 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/15 dark:border-white/10 ring-1 ring-black/10 dark:ring-white/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/40">
                    <div className="text-base font-medium text-black dark:text-white mb-1">Apuntes universitarios</div>
                    <p className="text-sm text-black/70 dark:text-white/70">Preparación de ED y Algorítmica con contenidos enfocados a asignaturas.</p>
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"><div className="absolute -inset-x-6 -top-8 h-16 bg-gradient-to-b from-white/40 to-transparent dark:from-white/10 blur-xl" /></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {learningMode && !selectedContent && (
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black dark:text-white mb-4 bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red bg-clip-text text-transparent">Aprende</h1>
              <p className="text-lg sm:text-xl text-black/70 dark:text-white/70 leading-relaxed mb-2">Primeros pasos y conceptos básicos de programación competitiva.</p>
              <p className="text-base text-black/70 dark:text-white/70">
                {learningMode === 'libre'
                  ? 'Ruta autodidacta y práctica para avanzar a tu ritmo: empieza por la introducción y continúa con estructuras y algoritmos esenciales.'
                  : 'Apuntes organizados por bloques de la asignatura: Estructuras de Datos y Algorítmica, con enfoque académico y resúmenes claros.'}
              </p>
            </div>
          )}

          {learningMode === 'libre' && selectedContent === 'introduccion' && (
            <article>
              <header className="mb-6">
                <h2 className="text-2xl font-semibold text-black dark:text-white mb-1">{introPage.title}</h2>
                {introPage.description && <p className="text-sm text-black/60 dark:text-white/60">{introPage.description}</p>}
              </header>
              <div className="space-y-8">
                {introPage.sections?.map((section) => (
                  <section key={section.id}>
                    <h3 id={section.id} className="text-xl font-medium text-black dark:text-white mb-3">{section.title}</h3>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      {(() => {
                        const nodes = [];
                        const lines = section.content.split('\n');
                        let listBuffer = [];
                        const flushList = (keyBase) => {
                          if (listBuffer.length > 0) {
                            nodes.push(
                              <ul key={`${keyBase}-ul`} className="list-disc pl-6 my-3">
                                {listBuffer.map((item, i) => (<li key={`${keyBase}-li-${i}`}>{item}</li>))}
                              </ul>
                            );
                            listBuffer = [];
                          }
                        };
                        lines.forEach((line, idx) => {
                          const t = line.trim();
                          const keyBase = `${section.id}-${idx}`;
                          if (t === '') { flushList(keyBase); nodes.push(<div key={`${keyBase}-sp`} className="h-2" />); return; }
                          if (t.startsWith('```')) { flushList(keyBase); nodes.push(<pre key={`${keyBase}-code`} className="code-block" />); return; }
                          if (t.startsWith('#')) { flushList(keyBase); nodes.push(<h4 key={`${keyBase}-h`} className="text-lg font-semibold mt-5 mb-2 text-black dark:text-white">{t.replace(/^#+\s*/, '')}</h4>); return; }
                          if (t.startsWith('* ')) { listBuffer.push(t.replace(/^\*\s+/, '')); return; }
                          flushList(keyBase);
                          nodes.push(<p key={`${keyBase}-p`} className="text-black/80 dark:text-white/80 leading-relaxed">{line}</p>);
                        });
                        flushList(`${section.id}-end`);
                        return nodes;
                      })()}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          )}

          {/* Descripciones de secciones para ambos modos */}
          {learningMode && selectedContent && selectedContent !== 'introduccion' && (
            (() => {
              const mode = learningMode;
              const desc = sectionDescriptions[mode]?.[selectedContent];
              if (!desc) return null;
              return (
                <article>
                  <header className="mb-6">
                    <h2 className="text-2xl font-semibold text-black dark:text-white mb-1">{desc.title}</h2>
                    {desc.intro && <p className="text-sm text-black/60 dark:text-white/60">{desc.intro}</p>}
                  </header>
                  {Array.isArray(desc.bullets) && desc.bullets.length > 0 && (
                    <ul className="list-disc pl-6 text-black/80 dark:text-white/80 space-y-2">
                      {desc.bullets.map((b, i) => (
                        <li key={`b-${i}`}>{b}</li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
};

export default Aprende;