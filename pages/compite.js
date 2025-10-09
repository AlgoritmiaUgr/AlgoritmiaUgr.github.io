import Head from 'next/head'
import Compite from '../src/components/Compite'
import Layout from '../src/components/Layout'
import MobileMenu from '../src/components/MobileMenu'

export default function CompitePage({ isMobileMenuOpen, onMobileMenuClose }) {
  return (
    <Layout>
      <Head>
        <title>Compite - Club de Programación Competitiva UGR</title>
        <meta name="description" content="Participa en competiciones de programación" />
      </Head>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={onMobileMenuClose}
        showContentSidebar={false}
      />

      <Compite />
    </Layout>
  )
} 