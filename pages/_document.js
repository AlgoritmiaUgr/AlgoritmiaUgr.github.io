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
          <meta name="color-scheme" content="dark light" />
          
          {/* SEO y Social Media */}
          <meta name="author" content="Club de Programación Competitiva - UGR" />
          <meta name="keywords" content="programación competitiva, algoritmos, estructuras de datos, UGR, Universidad de Granada, coding, competitive programming" />
          <link rel="canonical" href="https://cpcugr.vercel.app" />
          
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
