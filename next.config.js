/** @type {import('next').NextConfig} */
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
  
  // Note: headers() is omitted because output: 'export' doesn't apply custom headers.
}

module.exports = nextConfig 