import { ChevronDown, ChevronRight } from 'lucide-react';

const ContentSidebar = ({ 
  isOpen, 
  onClose,
  learningMode,
  sectionsMap,
  expanded,
  toggle,
  setSelectedContent,
  isActive,
  itemBtnClass,
  getContentsBySection,
}) => {
  return (
    <>
      {/* Overlay - solo visible cuando está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Content Sidebar - Left side con animación */}
      <aside className={`fixed top-16 left-0 w-80 h-[calc(100vh-4rem)] bg-pure-white/95 dark:bg-pure-black/95 backdrop-blur-md border-r border-black/10 dark:border-white/10 overflow-y-auto z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
      }`}>
        <div className="px-4 py-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white mb-4 text-center">CONTENIDOS</h2>
          
          {learningMode === 'libre' && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedContent('introduccion');
                  onClose();
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
            {(() => {
              const category = learningMode === 'libre' ? 'Aprendizaje Libre' : 'Universitario';
              const sections = sectionsMap[category] || [];
              
              return sections
                .sort((a, b) => {
                  const orderA = typeof a === 'object' ? a.order : 0;
                  const orderB = typeof b === 'object' ? b.order : 0;
                  return orderA - orderB;
                })
                .map((section) => {
                  const sectionName = typeof section === 'string' ? section : section.name;
                  const subsections = typeof section === 'object' ? (section.subsections || []) : [];
                  const sectionKey = `${category}:${sectionName}`;
                  
                  return (
                    <div key={sectionName}>
                      <button
                        type="button"
                        onClick={() => {
                          toggle(sectionKey);
                          setSelectedContent(sectionKey);
                        }}
                        className={`${itemBtnClass(isActive(sectionKey))} flex items-center justify-between`}
                        aria-expanded={expanded[sectionKey]}
                        aria-current={isActive(sectionKey) ? 'page' : undefined}
                      >
                        <span>{sectionName.toUpperCase()}</span>
                        <span className="ml-2">{expanded[sectionKey] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
                      </button>
                      {expanded[sectionKey] && (
                        <div className="mt-1 pl-3 space-y-1">
                          {/* Subsecciones si existen */}
                          {subsections.length > 0 && subsections.map((subsection) => {
                            const subsectionContents = getContentsBySection(category, sectionName).filter(
                              c => c.subsection === subsection
                            );

                            const subsectionKey = `${sectionKey}:${subsection}`;

                            return (
                              <div key={subsection} className="mb-2">
                                <button
                                  type="button"
                                  onClick={() => toggle(subsectionKey)}
                                  className={`w-full flex items-center justify-between text-xs px-2 py-1 rounded-md transition-colors bg-transparent border-0 ${
                                    expanded[subsectionKey]
                                      ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white font-semibold'
                                      : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10'
                                  }`}
                                >
                                  <span>{subsection}</span>
                                  <span className="ml-1">{expanded[subsectionKey] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}</span>
                                </button>
                                {expanded[subsectionKey] && (
                                  <div className="mt-1 pl-3 space-y-1">
                                    {subsectionContents.length > 0 ? (
                                      subsectionContents.map((content) => (
                                        <button
                                          key={content.id}
                                          type="button"
                                          onClick={() => {
                                            setSelectedContent(`content-${content.id}`);
                                            onClose();
                                          }}
                                          className={`w-full text-left text-xs px-2 py-1 rounded-md transition-colors bg-transparent border-0 ${
                                            isActive(`content-${content.id}`)
                                              ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white'
                                              : 'text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
                                          }`}
                                        >
                                          {content.title}
                                        </button>
                                      ))
                                    ) : (
                                      <p className="text-xs text-black/60 dark:text-white/60 italic">
                                        Aún no hay contenidos en esta subsección.
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {/* Contenidos sin subsección */}
                          {(() => {
                            const contentsWithoutSubsection = getContentsBySection(category, sectionName).filter(
                              c => !c.subsection || c.subsection.trim() === ''
                            );

                            if (contentsWithoutSubsection.length === 0) return null;

                            return contentsWithoutSubsection.map((content) => (
                              <button
                                key={content.id}
                                type="button"
                                onClick={() => {
                                  setSelectedContent(`content-${content.id}`);
                                  onClose();
                                }}
                                className={`w-full text-left text-xs px-2 py-1 rounded-md transition-colors bg-transparent border-0 ${
                                  isActive(`content-${content.id}`)
                                    ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white'
                                    : 'text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
                                }`}
                              >
                                {content.title}
                              </button>
                            ));
                          })()}
                        </div>
                      )}
                    </div>
                  );
                });
            })()}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ContentSidebar;
