const Noticias = () => {
  const noticias = [
    {
      id: 1,
      titulo: "Segundo lugar en la ICPC Regional",
      fecha: "15 de Noviembre, 2024",
      resumen: "Nuestro equipo principal logró el segundo lugar en la competencia regional de la ICPC, clasificando para la final nacional.",
      categoria: "Competencias"
    },
    {
      id: 2,
      titulo: "Nuevo curso de algoritmos avanzados",
      fecha: "8 de Noviembre, 2024",
      resumen: "Lanzamos un nuevo curso intensivo de algoritmos avanzados para miembros con experiencia intermedia.",
      categoria: "Educación"
    },
    {
      id: 3,
      titulo: "Hackatón UGR 2024 - Primer lugar",
      fecha: "2 de Noviembre, 2024",
      resumen: "El equipo 'CodeMasters' del CPC ganó el primer lugar en el Hackatón UGR con su solución innovadora.",
      categoria: "Eventos"
    },
    {
      id: 4,
      titulo: "Sesión de entrenamiento con Google",
      fecha: "25 de Octubre, 2024",
      resumen: "Tuvimos una sesión especial de entrenamiento dirigida por ingenieros de Google España.",
      categoria: "Talleres"
    },
    {
      id: 5,
      titulo: "Nuevos miembros bienvenidos",
      fecha: "20 de Octubre, 2024",
      resumen: "Damos la bienvenida a 45 nuevos miembros que se unieron al club en este semestre.",
      categoria: "Comunidad"
    },
    {
      id: 6,
      titulo: "Colaboración con empresas tech",
      fecha: "15 de Octubre, 2024",
      resumen: "Establecimos nuevas alianzas con empresas tecnológicas para ofrecer prácticas y oportunidades laborales.",
      categoria: "Partnerships"
    }
  ];

  const categoriaColors = {
    "Competencias": "bg-warm-red/20 text-warm-red dark:bg-red-900/30 dark:text-red-300",
    "Educación": "bg-warm-orange/20 text-warm-orange dark:bg-orange-900/30 dark:text-orange-300",
    "Eventos": "bg-warm-pink/20 text-warm-pink dark:bg-pink-900/30 dark:text-pink-300",
    "Talleres": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "Comunidad": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "Partnerships": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
  };

  return (
    <>
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-black dark:text-pure-white leading-tight mb-6 drop-shadow-sm">
          Noticias y eventos
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto">
          Mantente al día con las últimas noticias, logros y eventos del Club de Programación Competitiva UGR
        </p>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {noticias.map((noticia) => (
          <article 
            key={noticia.id}
            className="bg-gray-50/70 dark:bg-pure-black/85 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg"
          >
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-light ${categoriaColors[noticia.categoria]}`}>
                {noticia.categoria}
              </span>
            </div>
            
            <h2 className="text-xl font-light text-black dark:text-pure-white mb-3 leading-tight">
              {noticia.titulo}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 font-light text-sm mb-4 leading-relaxed">
              {noticia.resumen}
            </p>
            
            <div className="flex justify-between items-center">
              <time className="text-xs text-gray-500 dark:text-gray-400 font-light">
                {noticia.fecha}
              </time>
              <button className="text-warm-orange dark:text-warm-pink hover:text-warm-red dark:hover:text-warm-orange transition-colors duration-200 text-sm font-light">
                Leer más →
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-gray-100/70 dark:bg-pure-black/90 hover:bg-warm-orange/20 dark:hover:bg-white/5 text-black dark:text-pure-white px-8 py-3 rounded-lg font-light transition-all duration-300 backdrop-blur-sm">
          Cargar más noticias
        </button>
      </div>
    </>
  );
};

export default Noticias; 
