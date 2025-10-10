import Head from 'next/head';
import Layout from '../src/components/Layout';

const CLUB_REPO_URL = 'https://github.com/AlgoritmiaUgr/AlgoritmiaUgr.github.io';
const CLUB_AVATAR_URL = 'https://github.com/AlgoritmiaUgr.png?size=240';

const ADMINISTRATORS = [
  {
    id: 'adam-bourbahh',
    name: 'Adam Bourbahh Romero',
    role: 'Ideador y administrador principal',
    github: 'https://github.com/AdamBourbahh',
    tagline: '2º Grado en Ingeniería Informática',
    avatar: 'https://github.com/AdamBourbahh.png?size=240',
  },
  {
    id: 'nicolas-gonzales',
    name: 'Nicolás Gonzales Fernández',
    role: 'Administrador',
    github: 'https://github.com/NGonzalez018',
    tagline: '2º Doble Grado en Ingeniería Informática y Matemáticas',
    avatar: 'https://github.com/NGonzalez018.png?size=240',
  },
  {
    id: 'mohamed-hani',
    name: 'Mohamed Hani Mahmoud Abdelrazek',
    role: 'Administrador',
    github: 'https://github.com/mhanii',
    tagline: 'Grado en Ingeniería Informática | UGR AI researcher',
    avatar: 'https://github.com/mhanii.png?size=240',
  },
  {
    id: 'jaime-espin',
    name: 'Jaime Espín Rodríguez',
    role: 'Administrador',
    github: 'https://github.com/Jaime-espin',
    tagline: '2º Grado en Ingeniería Informática',
    avatar: 'https://github.com/Jaime-espin.png?size=240',
  },
  {
    id: 'airam-falcon',
    name: 'Airam Falcón Marrero',
    role: 'Administrador',
    github: 'https://github.com/FLL2016s',
    tagline: '4º Doble Grado en Ingeniería Informática y Matemáticas',
    avatar: 'https://github.com/FLL2016s.png?size=240',
  },
  {
    id: 'alvaro-hernandez',
    name: 'Álvaro Hernández Buendía',
    role: 'Administrador y diseñador web',
    github: 'https://github.com/u6lqre',
    tagline: '1º Grado en Ingeniería Informática',
    avatar: 'https://github.com/u6lqre.png?size=240',
  },
];

export default function AboutUsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Equipo GitHub | Club de Programación Competitiva UGR',
    url: 'https://cpcugr.vercel.app/aboutus',
    mainEntity: {
      '@type': 'Organization',
      name: 'Club de Programación Competitiva UGR',
      url: 'https://github.com/AlgoritmiaUgr/AlgoritmiaUgr.github.io',
      member: ADMINISTRATORS.map((admin) => ({
        '@type': 'Person',
        name: admin.name,
        jobTitle: admin.role,
        url: admin.github,
        description: admin.tagline,
      })),
    },
  };

  return (
    <Layout>
      <Head>
        <title>Equipo GitHub | Club de Programación Competitiva UGR</title>
        <meta
          name="description"
          content="Descubre el repositorio oficial del Club de Programación Competitiva UGR y conoce a las personas que administran la comunidad en GitHub."
        />
        <meta property="og:title" content="Equipo GitHub | Club de Programación Competitiva UGR" />
        <meta
          property="og:description"
          content="Repositorio del club y perfiles de los administradores responsables de la comunidad de programación competitiva."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cpcugr.vercel.app/aboutus" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <section className="space-y-12 sm:space-y-16">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-black/50 dark:text-white/50">GitHub</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-black dark:text-white">
            Comunidad en GitHub del CPC UGR
          </h1>
          <p className="mt-3 text-base sm:text-lg text-black/60 dark:text-white/60">
            Consulta el repositorio principal y conoce a las personas que lo mantienen día a día.
          </p>
        </header>

        <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-white/[0.08] dark:via-white/[0.05] dark:to-white/[0.03] shadow-2xl backdrop-blur p-8 sm:p-10 text-center">
          <div className="flex justify-center">
            <img
              src={CLUB_AVATAR_URL}
              alt="Avatar de GitHub de la asociación"
              className="h-28 w-28 rounded-full border border-black/10 dark:border-white/10 shadow-lg object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="mt-4 text-xs uppercase font-medium text-black/40 dark:text-white/40">Repositorio oficial</p>
          <a
            href={CLUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 text-lg sm:text-xl font-semibold text-warm-orange hover:text-warm-orange/80 transition-colors"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            AlgoritmiaUgr/AlgoritmiaUgr.github.io
          </a>
          <p className="mt-4 text-sm text-black/60 dark:text-white/60">
            Recursos, páginas estáticas y proyectos de la comunidad reunidos en un mismo lugar.
          </p>
        </div>

        <section aria-labelledby="admin-heading" className="space-y-6">
          <div className="text-center">
            <h2 id="admin-heading" className="text-2xl font-semibold text-black dark:text-white">
              Administradores del repositorio
            </h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Estas son las personas que coordinan contenidos, eventos y la infraestructura del club.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {ADMINISTRATORS.map((admin) => (
              <article
                key={admin.id}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.08] backdrop-blur p-6 shadow-lg flex flex-col items-center text-center"
              >
                <img
                  src={admin.avatar}
                  alt={`Avatar de GitHub de ${admin.name}`}
                  className="h-24 w-24 rounded-full border border-black/10 dark:border-white/15 shadow-md object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                  {admin.role}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-black dark:text-white">{admin.name}</h3>
                <a
                  href={admin.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-warm-orange hover:text-warm-orange/80 transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {admin.github.replace('https://github.com/', 'github.com/')}
                </a>
                <p className="mt-4 text-sm text-black/60 dark:text-white/60">{admin.tagline}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  );
}
