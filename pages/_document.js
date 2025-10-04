import Document, { Html, Head, Main, NextScript } from 'next/document'

const noFlashThemeScript = `(() => {
  try {
    const d = document.documentElement;
  const saved = localStorage.getItem('themeMode'); // 'dark' | 'light' | null
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : systemDark;
    if (isDark) d.classList.add('dark'); else d.classList.remove('dark');
  } catch (_) { /* noop */ }
})();`;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es" className="bg-pure-white dark:bg-pure-black">
        <Head>
          {/* Favicon y iconos */}
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" type="image/svg+xml" href="/imagenes/logo_claro.svg" />
          <link rel="apple-touch-icon" href="/imagenes/logo_claro.svg" />
          <link rel="manifest" href="/manifest.json" />
          
          {/* Meta tags básicos */}
          <meta name="color-scheme" content="dark light" />
          <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
          
          {/* SEO Meta Tags */}
          <meta name="description" content="Club de Programación Competitiva de la Universidad de Granada. Aprende algoritmos, estructuras de datos y compite en olimpiadas de programación." />
          <meta name="keywords" content="programación competitiva, algoritmos, UGR, Universidad de Granada, competencias de programación, ACM ICPC" />
          <meta name="author" content="Club de Programación Competitiva UGR" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Club de Programación Competitiva UGR" />
          <meta property="og:description" content="Aprende algoritmos, estructuras de datos y compite en olimpiadas de programación" />
          <meta property="og:image" content="/imagenes/logo_claro.svg" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Club de Programación Competitiva UGR" />
          <meta name="twitter:description" content="Aprende algoritmos, estructuras de datos y compite en olimpiadas de programación" />
          <meta name="twitter:image" content="/imagenes/logo_claro.svg" />
          
          <script
            id="theme-init"
            dangerouslySetInnerHTML={{ __html: noFlashThemeScript }}
          />
          {/* Preconnect y DNS Prefetch para fuentes */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* Preload de fuentes */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            as="style"
            onLoad="this.onload=null;this.rel='stylesheet'"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            />
          </noscript>
          {/* CSS crítico mínimo para evitar FOUC */}
          <style>{`html{scroll-behavior:smooth}body{font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}.dark{color-scheme:dark;background-color:#000}:root{color-scheme:light dark}`}</style>
        </Head>
        <body className="bg-pure-white dark:bg-pure-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
