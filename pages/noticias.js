import Head from 'next/head'
import Noticias from '../src/components/Noticias'
import Layout from '../src/components/Layout'
import MobileMenu from '../src/components/MobileMenu'

export default function NoticiasPage({ isMobileMenuOpen, onMobileMenuClose }) {
  return (
    <Layout>
      <Head>
        <title>Noticias - Club de Programación Competitiva UGR</title>
        <meta name="description" content="Últimas noticias y eventos del club" />
      </Head>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={onMobileMenuClose}
        showContentSidebar={false}
      />

      <Noticias />
    </Layout>
  )
} 