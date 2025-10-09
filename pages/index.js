import Head from 'next/head'
import Link from 'next/link'
import HeroSection from '../src/components/HeroSection'
import Layout from '../src/components/Layout'
import SobreNosotros from '../src/components/SobreNosotros'
import MobileMenu from '../src/components/MobileMenu'
import { prefixPath } from '../src/utils/basePath'

export default function Home({ isMobileMenuOpen, onMobileMenuClose }) {
  return (
    <>
      <Head>
        <title>Club de Programación Competitiva - UGR</title>
        <meta name="description" content="Club de Programación Competitiva de la Universidad de Granada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href={prefixPath('/favicon.ico')} />
      </Head>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={onMobileMenuClose}
      />

      {/* Top fold: hero + cards with better spacing */}
      <section className="relative z-10 min-h-[75vh] flex flex-col justify-center pb-8">
        {/* Hero (centered) */}
        <div className="flex-1 flex items-center justify-center">
          <HeroSection />
        </div>

        {/* Middle cards section - Closer to hero */}
        <div id="cards-section" className="mt-2">
          <Layout>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Aprende card */}
              <Link href="/aprende" legacyBehavior passHref>
                <a className="group rounded-2xl p-6 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-base font-medium text-black dark:text-white">Aprende</div>
                    <span className="text-xs text-black/60 dark:text-white/60">↗</span>
                  </div>
                  <p className="text-sm text-black/70 dark:text-white/70">Domina las bases desde nuestra documentación.</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-black/50 dark:text-white/50">
                    <div className="rounded-lg px-3 py-2 bg-black/5 dark:bg-white/5">Intro</div>
                    <div className="rounded-lg px-3 py-2 bg-black/5 dark:bg-white/5">Estructuras</div>
                    <div className="rounded-lg px-3 py-2 bg-black/5 dark:bg-white/5">Algoritmos</div>
                  </div>
                </a>
              </Link>

              {/* Retos card */}
              <Link href="/compite" legacyBehavior passHref>
                <a className="group rounded-2xl p-6 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-base font-medium text-black dark:text-white">Retos</div>
                    <span className="text-xs text-black/60 dark:text-white/60">↗</span>
                  </div>
                  <p className="text-sm text-black/70 dark:text-white/70">Ponte a prueba en retos sugeridos por nosotros.</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-black/50 dark:text-white/50">
                    <div className="rounded-lg px-3 py-2 bg-black/5 dark:bg-white/5">Greedy</div>
                    <div className="rounded-lg px-3 py-2 bg-black/5 dark:bg-white/5">DP</div>
                    <div className="rounded-lg px-3 py-2 bg-black/5 dark:bg-white/5">Grafos</div>
                  </div>
                </a>
              </Link>
            </div>
          </Layout>
        </div>
      </section>

      {/* Spacer section to push Sobre nosotros further down */}
      <div className="h-64"></div>

  {/* Sobre nosotros section - Centered in viewport */}
  <section id="sobre-nosotros" className="relative z-10 min-h-screen flex items-center scroll-mt-16">
        <Layout>
          <SobreNosotros />
        </Layout>
      </section>
    </>
  )
} 