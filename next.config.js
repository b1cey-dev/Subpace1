/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable Turbopack for now to avoid route conflicts
    turbo: {
      enabled: false
    }
  }
}

module.exports = nextConfig 