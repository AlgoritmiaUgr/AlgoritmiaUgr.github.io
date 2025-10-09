import Head from 'next/head'
import Comparte from '../src/components/Comparte'
import Layout from '../src/components/Layout'

export default function CompartePage() {
  return (
    <Layout>
      <Head>
        <title>Comparte | Comunidad y Recursos de Programación - UGR</title>
        <meta name="description" content="Únete a nuestra comunidad de programadores. Comparte conocimientos, participa en Discord, accede a recursos y colabora con otros estudiantes apasionados por la programación competitiva." />
        <meta name="keywords" content="comunidad programación, Discord programación, recursos compartidos, colaboración coding, comunidad UGR, estudiantes programación Granada" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Comparte y Colabora - Club de Programación UGR" />
        <meta property="og:description" content="Únete a nuestra comunidad de programadores en Granada" />
      </Head>
      <Comparte />
    </Layout>
  )
} 