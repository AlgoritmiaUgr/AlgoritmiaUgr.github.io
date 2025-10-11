/**.@type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Habilitado para Vercel con soporte de API routes y SSR
  // output: 'export', // Comentado para habilitar funcionalidades de servidor
  trailingSlash: true,
  
  // Performance optimizations
  compress: true,
  
  // Image optimization
  images: {
    domains: ['localhost', 'ugr.es'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Silence ESLint during build (optional)
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/sobre-nosotros',
        destination: '/aboutus',
        permanent: true,
      },
    ];
  },
  
  // Headers de seguridad HTTP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          // Headers adicionales para navegadores privacy-focused
          { key: 'Accept-CH', value: 'Sec-CH-Prefers-Color-Scheme' },
        ],
      },
    ];
  },
}

module.exports = nextConfig 