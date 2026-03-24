/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  experimental: {
    optimizePackageImports: ['zustand']
  }
};

export default nextConfig;
