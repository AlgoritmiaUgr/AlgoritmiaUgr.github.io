import Head from 'next/head'
import Aprende from '../src/components/Aprende'

export default function AprendePage() {
  return (
    <>
      <Head>
        <title>Aprende - Club de Programación Competitiva UGR</title>
        <meta name="description" content="Aprende programación competitiva con recursos y tutoriales" />
      </Head>
      <Aprende />
    </>
  )
} 