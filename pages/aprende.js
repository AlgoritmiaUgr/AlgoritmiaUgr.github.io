import Head from 'next/head'
import Aprende from '../src/components/Aprende'

export default function AprendePage() {
  return (
    <>
      <Head>
        <title>Aprende Programación Competitiva | Algoritmos y Estructuras de Datos - UGR</title>
        <meta name="description" content="Recursos educativos gratuitos sobre algoritmos, estructuras de datos y programación competitiva. Aprende desde lo básico hasta técnicas avanzadas con ejercicios prácticos y explicaciones detalladas." />
        <meta name="keywords" content="aprender algoritmos, estructuras de datos, tutoriales programación, ejercicios coding, recursos gratuitos programación, competitive programming tutorial" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aprende Programación Competitiva - UGR" />
        <meta property="og:description" content="Recursos educativos gratuitos sobre algoritmos y estructuras de datos" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Aprende Programación Competitiva",
            "description": "Recursos educativos sobre algoritmos, estructuras de datos y programación competitiva",
            "provider": {
              "@type": "Organization",
              "name": "Club de Programación Competitiva UGR"
            },
            "educationalLevel": "Beginner to Advanced",
            "inLanguage": "es",
            "url": "https://cpcugr.vercel.app/aprende"
          })}
        </script>
      </Head>
      <Aprende />
    </>
  )
} 