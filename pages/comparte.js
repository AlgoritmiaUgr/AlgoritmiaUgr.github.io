import Head from 'next/head'
import Comparte from '../src/components/Comparte'
import Layout from '../src/components/Layout'
import MobileMenu from '../src/components/MobileMenu'

export default function CompartePage({ isMobileMenuOpen, onMobileMenuClose }) {
  return (
    <Layout>
      <Head>
        <title>Comparte - Club de Programación Competitiva UGR</title>
        <meta name="description" content="Comparte tus conocimientos y experiencias" />
      </Head>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={onMobileMenuClose}
        showContentSidebar={false}
      />

      <Comparte />
    </Layout>
  )
} 