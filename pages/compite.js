import Head from 'next/head'
import Compite from '../src/components/Compite'
import Layout from '../src/components/Layout'

export default function CompitePage() {
  return (
    <Layout>
      <Head>
        <title>Compite | Concursos y Competiciones de Programación - UGR</title>
        <meta name="description" content="Participa en competiciones de programación competitiva. Encuentra información sobre ACM ICPC, Codeforces, AtCoder y otros concursos. Mejora tus habilidades compitiendo con otros programadores." />
        <meta name="keywords" content="competiciones programación, ACM ICPC, Codeforces, AtCoder, concursos coding, programming contests, competitive programming competitions" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Compite en Programación Competitiva - UGR" />
        <meta property="og:description" content="Participa en competiciones y concursos de programación" />
      </Head>
      <Compite />
    </Layout>
  )
} 