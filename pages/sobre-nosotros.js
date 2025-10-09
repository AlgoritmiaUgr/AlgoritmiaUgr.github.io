import Head from 'next/head'
import SobreNosotros from '../src/components/SobreNosotros'
import Layout from '../src/components/Layout'

export default function SobreNosotrosPage() {
  return (
    <Layout>
      <Head>
        <title>Sobre Nosotros | Club de Programación Competitiva UGR</title>
        <meta name="description" content="Somos una comunidad de estudiantes de la Universidad de Granada apasionados por la programación competitiva, algoritmos y resolución de problemas. Únete a nosotros para aprender, competir y crecer juntos." />
        <meta name="keywords" content="club programación Granada, UGR competitivo, estudiantes programación, comunidad coding Granada, algoritmos UGR" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sobre Nosotros | Club de Programación Competitiva UGR" />
        <meta property="og:description" content="Comunidad de estudiantes de la UGR apasionados por la programación competitiva" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Sobre Nosotros - Club de Programación Competitiva UGR",
            "description": "Comunidad de estudiantes de la Universidad de Granada dedicada a la programación competitiva",
            "url": "https://cpcugr.vercel.app/sobre-nosotros"
          })}
        </script>
      </Head>
      <SobreNosotros />
    </Layout>
  )
} 