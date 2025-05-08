/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack as it's not needed for this project
  experimental: {
    turbo: {
      enabled: false
    }
  }
}

module.exports = nextConfig 