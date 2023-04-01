/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net', 'videos.ctfassets.net'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
