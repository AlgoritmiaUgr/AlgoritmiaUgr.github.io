import Head from 'next/head'
import SobreNosotros from '../src/components/SobreNosotros'
import Layout from '../src/components/Layout'

export default function SobreNosotrosPage() {
  return (
    <Layout>
      <Head>
        <title>Sobre Nosotros - Club de Programación Competitiva UGR</title>
        <meta name="description" content="Conoce más sobre el Club de Programación Competitiva UGR" />
      </Head>
      <SobreNosotros />
    </Layout>
  )
} 