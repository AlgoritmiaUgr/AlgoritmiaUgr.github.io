import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { prefixPath } from '../utils/basePath';
import { ASSETS } from '../utils/assets';

// Lista de imágenes locales (carpeta: fotos)
const imageList = [
  ASSETS.fotos('1758572054955.jpeg'),
  ASSETS.fotos('1758572054965.jpeg'),
  ASSETS.fotos('1758572055096.jpeg'),
  ASSETS.fotos('1758572055155.jpeg'),
  ASSETS.fotos('1758572055218.jpeg'),
];

const SobreNosotros = () => {
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(null); // índice de foto ampliada
  const previouslyFocused = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const len = imageList.length;
  const goNext = () => setActive((i) => (i + 1) % len);
  const goPrev = () => setActive((i) => (i - 1 + len) % len);

  // Auto-advance every 10s
  useEffect(() => {
    const id = setInterval(goNext, 10000);
    return () => clearInterval(id);
  }, [len]);

  // Cerrar con Escape
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        startClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal]);

  const startClose = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setShowModal(false);
      setAnimatingOut(false);
      setViewerIndex(null);
      // Restaurar foco
      if (previouslyFocused.current) {
        previouslyFocused.current.focus();
      }
    }, 220);
  };

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (showModal) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      document.body.style.overflow = 'hidden';
      // Ajuste opcional para evitar salto por desaparición de la barra de scroll (omitido si no necesario)
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [showModal]);

  // Guardar foco previo y enfocar modal al abrir
  useEffect(() => {
    if (showModal) {
      previouslyFocused.current = document.activeElement;
      setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelector('[data-autofocus]') || modalRef.current.querySelector('button, a');
          focusable && focusable.focus();
        }
      }, 30);
    }
  }, [showModal]);

  // Focus trap simple
  useEffect(() => {
    if (!showModal) return;
    const handleFocus = (e) => {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target)) {
        // redirigir foco al modal
        const first = modalRef.current.querySelector('button, a, input, select, textarea, [tabindex="0"]');
        first && first.focus();
      }
    };
    window.addEventListener('focusin', handleFocus);
    return () => window.removeEventListener('focusin', handleFocus);
  }, [showModal]);

  const openViewer = (idx) => setViewerIndex(idx);
  const closeViewer = () => setViewerIndex(null);

  // Navegación dentro del visor
  const nextViewer = () => setViewerIndex(i => (i + 1) % imageList.length);
  const prevViewer = () => setViewerIndex(i => (i - 1 + imageList.length) % imageList.length);
  const [showContact, setShowContact] = useState(false);
  const openContact = () => setShowContact(true);
  const closeContact = () => setShowContact(false);

  // Atajos de teclado dentro del visor: Escape / Flechas
  useEffect(() => {
    if (viewerIndex == null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeViewer();
      else if (e.key === 'ArrowRight') nextViewer();
      else if (e.key === 'ArrowLeft') prevViewer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerIndex]);

  return (
    <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 items-stretch w-full">
      {/* Top row: Big image and Text card with the same height */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 shadow-2xl h-[40vh] lg:h-[46vh] group select-none">
          <img
            key={active}
            src={imageList[active]}
            alt="Galería principal CPC"
            className="w-full h-full object-cover select-none"
            draggable={false}
            loading="lazy"
          />
          {/* Hover navigation controls */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-3 lg:px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Imagen anterior"
              onMouseDown={(e) => e.preventDefault()}
              className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white/80 dark:bg-white/[0.12] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg p-2 sm:p-2.5 hover:scale-105 active:scale-95 transition focus:outline-none select-none"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-black/70 dark:text-white/80" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
              onMouseDown={(e) => e.preventDefault()}
              className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white/80 dark:bg-white/[0.12] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg p-2 sm:p-2.5 hover:scale-105 active:scale-95 transition focus:outline-none select-none"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-black/70 dark:text-white/80" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="relative rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-transparent backdrop-blur-sm shadow-xl h-[40vh] lg:h-[46vh] flex">
          <div className="p-6 sm:p-8 w-full">
            <div className="mb-3 sm:mb-4">
              <h2 className="text-xl sm:text-2xl font-light text-black dark:text-white tracking-wide">SOBRE NOSOTROS</h2>
            </div>
            <p className="text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed">
              El CPC (Club de Programacion Competitiva) es una comunidad de programadores aficionados al mundo de los algoritmos y las estructuras de datos.
              Compartimos recursos, organizamos sesiones de práctica y creamos proyectos juntos.
              Únete y crece con nosotros.
            </p>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium bg-black/85 text-white dark:bg-white/10 dark:text-white border border-black/30 dark:border-white/10 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/40 transition"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
      {/* Bottom row removed per request: no carousel, only main image with arrows */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sobre-modal-title"
        >
          <div
            className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-200 ${animatingOut ? 'opacity-0' : 'opacity-100'}`}
            onClick={startClose}
          ></div>
          <div
            className={`relative w-full max-w-5xl rounded-2xl border border-transparent shadow-xl overflow-hidden
              bg-black/55 dark:bg-black/60 backdrop-blur-md
              transition-transform transition-opacity duration-180 ease-out will-change-transform will-change-opacity
              ${animatingOut ? 'opacity-0 scale-[0.96] translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
            style={{ backfaceVisibility: 'hidden', transformOrigin: '50% 50%' }}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Eliminado mask radial y blur para mejorar rendimiento */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={startClose}
              className="absolute top-5 right-5 z-30 inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/50 bg-black/30 hover:bg-black/45 backdrop-blur-sm transition"
              aria-label="Cerrar"
              data-autofocus
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid lg:grid-cols-12 gap-6 xl:gap-8 p-4 sm:p-6 max-h-[70vh] overflow-y-auto overscroll-contain scrollbar-thin [scrollbar-width:thin] [-webkit-overflow-scrolling:touch] will-change-scroll transform-gpu" onWheel={(e) => e.stopPropagation()}>
              <div className="lg:col-span-7 space-y-8">
                <header>
                  <h3 id="sobre-modal-title" className="text-3xl font-semibold tracking-tight text-black dark:text-white mb-2">Sobre el Club</h3>
                  <p className="text-sm text-black/60 dark:text-white/60">Conoce nuestra filosofía, objetivos y planes.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={openContact}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium bg-black/50 dark:bg-white/10 text-white hover:bg-black/70 dark:hover:bg-white/20 backdrop-blur-sm border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/50 transition"
                    >
                      Contacto
                    </button>
                  </div>
                </header>
                <section className="space-y-6 text-sm leading-relaxed text-black/80 dark:text-white/70">
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-1">¿Qué es la programación competitiva?</h4>
                    <p>Es la actividad que consiste en la resolución de problemas algorítmicos bajo restricciones. Entrena la abstracción, modelado de problemas y optimización temporal y espacial.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-1">¿Cuándo surge la idea del club?</h4>
                    <p>Nace de estudiantes que, tras ver que en otras universidades ya había un club establecido, querían un espacio continuo para practicar, conocer a gente, compartir apuntes y preparar competiciones universitarias y nacionales.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-1">Objetivos del club</h4>
                    <ul className="list-disc pl-5 space-y-1 marker:text-warm-orange/80">
                      <li>Aprendizaje colaborativo estructurado.</li>
                      <li>Preparación para competiciones (ICPC, nacionales como el Ada Byron...).</li>
                      <li>Generación y curación de apuntes.</li>
                      <li>Fomento de cultura algorítmica.</li>
                      <li>Nada de dinámica profesor-alumno, sino crear un entorno amigable y seguro para todo tipo de interesados, desde el más nuevo al mayor de los expertos.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-1">Ventajas del club</h4>
                    <ul className="list-disc pl-5 space-y-1 marker:text-warm-orange/80">
                      <li>Refuerzo del pensamiento lógico.</li>
                      <li>Networking con compañeros motivados.</li>
                      <li>Feedback y revisión de soluciones.</li>
                      <li>Material curado y sesiones guiadas.</li>
                      <li>Conocimiento avanzado aplicable a entrevistas y el mundo real.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-1">Planes del club</h4>
                    <ul className="list-disc pl-5 space-y-1 marker:text-warm-orange/80">
                      <li>Talleres específicos.</li>
                      <li>Simulacros periódicos de concursos.</li>
                      <li>Repositorio vivo de problemas y soluciones.</li>
                      <li>Sesiones temáticas (grafos, DP, estructuras).</li>
                      <li>Participación coordinada en eventos.</li>
                      <li>Organización de concursos.</li>
                    </ul>
                  </div>
                  
                  {/* Sección de GitHub */}
                  <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
                    <h4 className="font-medium text-black dark:text-white mb-4 text-center">Equipo y Repositorio</h4>
                    
                    {/* GitHub del Club */}
                    <div className="mb-6 p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                      <div className="text-center">
                        <p className="text-xs text-black/60 dark:text-white/60 mb-2">Repositorio oficial del club</p>
                        <a
                          href="https://github.com/AlgoritmiaUgr/AlgoritmiaUgr.github.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 text-sm font-medium text-warm-orange hover:text-warm-orange/80 transition"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          AlgoritmiaUgr/AlgoritmiaUgr.github.io
                        </a>
                      </div>
                    </div>

                    {/* Administradores */}
                    <div className="space-y-4">
                      <p className="text-xs font-medium text-black/70 dark:text-white/70 mb-3">Administradores:</p>
                      
                      {/* Adam Bourbahh Romero */}
                      <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <p className="text-xs text-black/50 dark:text-white/50 mb-1">Ideador y administrador principal</p>
                        <p className="font-medium text-black dark:text-white text-sm mb-1">Adam Bourbahh Romero</p>
                        <a
                          href="https://github.com/AdamBourbahh"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-warm-orange hover:text-warm-orange/80 transition mb-1"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          github.com/AdamBourbahh
                        </a>
                        <p className="text-xs text-black/60 dark:text-white/60">2º Ingeniería Informática</p>
                      </div>

                      {/* Nicolás Gonzales Fernandez */}
                      <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <p className="text-xs text-black/50 dark:text-white/50 mb-1">Cofundador</p>
                        <p className="font-medium text-black dark:text-white text-sm mb-1">Nicolás Gonzales Fernández</p>
                        <a
                          href="https://github.com/NGonzalez018"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-warm-orange hover:text-warm-orange/80 transition mb-1"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          github.com/NGonzalez018
                        </a>
                        <p className="text-xs text-black/60 dark:text-white/60">2º Doble Grado de Ingeniería Informática y Matemáticas</p>
                      </div>

                      {/* Mohamed Hani */}
                      <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <p className="text-xs text-black/50 dark:text-white/50 mb-1">Administrador</p>
                        <p className="font-medium text-black dark:text-white text-sm mb-1">Mohamed Hani Mahmoud Abdelrazek</p>
                        <a
                          href="https://github.com/mhanii"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-warm-orange hover:text-warm-orange/80 transition mb-1"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          github.com/mhanii
                        </a>
                        <p className="text-xs text-black/60 dark:text-white/60">Ingeniería Informática | UGR AI Researcher</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="lg:col-span-5">
                <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 -m-1">
                  {imageList.slice(0,6).map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openViewer(idx)}
                      className="relative overflow-hidden group aspect-square will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/50 bg-transparent"
                    >
                      <img
                        src={src}
                        alt={`Foto club ${idx+1}`}
                        className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-black/50 dark:text-white/50 select-none">Momentos y sesiones recientes.</p>
              </aside>
            </div>
            {/* Visor movido fuera del contenedor para evitar recorte */}
            {showContact && (
              <div
                className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                role="dialog"
                aria-label="Contacto"
                onClick={closeContact}
              >
                <div
                  className="relative w-full max-w-sm mx-auto rounded-xl bg-zinc-900/90 text-white border border-white/10 p-6 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label="Cerrar contacto"
                    onClick={closeContact}
                    className="absolute top-3 right-3 inline-flex items-center justify-center rounded-md p-1.5 bg-white/10 hover:bg-white/20 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/50 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <h4 className="text-lg font-medium mb-3">Escríbenos</h4>
                  <p className="text-xs text-white/60 mb-4 leading-relaxed">
                    Aquí tienes nuestro correo y el enlace para unirte al grupo de WhatsApp.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-white/40 mb-1">Correo</span>
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 rounded bg-white/10 text-[13px]">cpcugr@gmail.com</code>
                        <button
                          type="button"
                          onClick={() => { navigator.clipboard?.writeText('cpcugr@gmail.com'); }}
                          className="text-[11px] px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                        >Copiar</button>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-white/40 mb-1">WhatsApp</span>
                      <a
                        href={process.env.NEXT_PUBLIC_WHATSAPP_INVITE_URL || 'https://chat.whatsapp.com/EJP8DQe7Zqe2nk9QTO17z0'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium bg-emerald-600/80 hover:bg-emerald-600 text-white transition shadow-md hover:shadow-lg"
                      >
                        Unirse al grupo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {viewerIndex != null && (
            <div
              className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-sm"
              role="dialog"
              aria-label="Visor de fotos"
              onClick={closeViewer}
            >
              <button
                type="button"
                aria-label="Cerrar visor"
                onClick={(e) => { e.stopPropagation(); closeViewer(); }}
                className="absolute right-5 inline-flex items-center justify-center rounded-md p-2 bg-white/15 hover:bg-white/30 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange/60 transition"
                style={{ top: 'calc(3.5rem + 2px)' }}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex justify-end items-center p-2 text-white/60 text-[11px] tracking-wide select-none pointer-events-none">
                <span className="mr-3">{viewerIndex + 1} / {imageList.length}</span>
              </div>
              {/* Botones de navegación */}
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={(e) => { e.stopPropagation(); prevViewer(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/15 hover:bg-white/25 text-white transition focus:outline-none"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Foto siguiente"
                onClick={(e) => { e.stopPropagation(); nextViewer(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/15 hover:bg-white/25 text-white transition focus:outline-none"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="flex-1 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img
                  src={imageList[viewerIndex]}
                  alt={`Foto ampliada ${viewerIndex + 1}`}
                  className="max-h-[100vh] max-w-[100vw] object-contain select-none"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SobreNosotros;

