/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/agency',
  assetPrefix: '/agency/',
  
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
      // Production Strapi URL (Railway)
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
    domains: ['localhost', '127.0.0.1', 'agency-backend-production.up.railway.app'],
    unoptimized: true, // Required for static export
  },
  
  // Optional: For better compatibility
  trailingSlash: true,
  
  experimental: {
    turbo: {},
  },
};

module.exports = nextConfig;
