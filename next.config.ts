/** @type {import('next').NextConfig} */
const nextConfig = {
  // YEH IMPORTANT LINE ADD KARNA HAI
  basePath: '/agency',
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Production Strapi URL (Railway par)
      {
        protocol: 'https',
        hostname: 'agency-backend-production.up.railway.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.landing.azeemcodes.com',
        pathname: '/uploads/**',
      },
    ],
    // Production domains
    domains: ['localhost', '127.0.0.1', 'agency-backend-production.up.railway.app', 'api.landing.azeemcodes.com'],
    
    // Static export ke liye required
    unoptimized: true,
  },
  
  // Enable Turbopack in development
  experimental: {
    turbo: {
      // Turbopack configuration if needed
    },
  },
  
  // Static export (Hostinger ke liye)
  output: 'export',
  
  // Optional: Trailing slash for better compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
