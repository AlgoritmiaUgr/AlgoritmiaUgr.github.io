import Head from 'next/head'
import Compite from '../src/components/Compite'
import Layout from '../src/components/Layout'

export default function CompitePage() {
  return (
    <Layout>
      <Head>
        <title>Compite - Club de Programación Competitiva UGR</title>
        <meta name="description" content="Participa en competiciones de programación" />
      </Head>
      <Compite />
    </Layout>
  )
} 