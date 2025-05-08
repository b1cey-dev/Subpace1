/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable Turbopack for now to avoid route conflicts
    turbo: false
  }
}

module.exports = nextConfig 