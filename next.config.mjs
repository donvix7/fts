/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

const nextConfig = pwaConfig({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  // Turbopack specific config
  experimental: {
    turbo: {
      // Rules for Turbopack to handle webpack loaders/plugins
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Keep webpack for production build
  webpack: (config, { isServer, dev }) => {
    // Only use webpack for production builds
    if (!dev && !isServer) {
      // Your webpack modifications here
    }
    return config
  },
})

export default nextConfig