import Head from 'next/head'
import Noticias from '../src/components/Noticias'
import Layout from '../src/components/Layout'

export default function NoticiasPage() {
  return (
    <Layout>
      <Head>
        <title>Noticias - Club de Programación Competitiva UGR</title>
        <meta name="description" content="Últimas noticias y eventos del club" />
      </Head>
      <Noticias />
    </Layout>
  )
} 