import Head from 'next/head'
import Comparte from '../src/components/Comparte'
import Layout from '../src/components/Layout'

export default function CompartePage() {
  return (
    <Layout>
      <Head>
        <title>Comparte - Club de Programación Competitiva UGR</title>
        <meta name="description" content="Comparte tus conocimientos y experiencias" />
      </Head>
      <Comparte />
    </Layout>
  )
} 