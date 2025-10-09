import '../styles/globals.css'
import 'katex/dist/katex.min.css'
import { ThemeProvider } from '../src/context/ThemeContext'
import { AuthProvider } from '../src/context/AuthContext'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { getBasePath } from '../src/utils/basePath'
import Header from '../src/components/Header'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// Cargar efectos de fondo en cliente para evitar problemas de SSR
const BackgroundEffects = dynamic(() => import('../src/components/BackgroundEffects'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-pure-white dark:bg-pure-black" />,
})

export default function App({ Component, pageProps }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Cerrar ambos menús cuando cambia la ruta
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Prevenir scroll cuando cualquier menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff6b35" />
        <meta name="description" content="Plataforma educativa para aprender programación competitiva - Universidad de Granada" />
        <link rel="manifest" href={`${getBasePath()}/manifest.json`} />
        <link rel="icon" href={`${getBasePath()}/favicon.ico`} />
        {/* Preconnect para fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Prefetch para rutas comunes (respetando basePath) */}
        <link rel="prefetch" href={`${getBasePath()}/aprende`} />
        <link rel="prefetch" href={`${getBasePath()}/sobre-nosotros`} />
      </Head>

      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen w-full bg-pure-white dark:bg-pure-black text-black dark:text-white flex flex-col items-center">
            <BackgroundEffects />
            <Header 
              onMobileMenuToggle={toggleMobileMenu}
              isMobileMenuOpen={isMobileMenuOpen}
            />
            <main className="w-full relative z-10 pt-20">
              <Component 
                {...pageProps} 
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
              />
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
} 