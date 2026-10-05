import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/drei'],
  },
  env: {
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'vinoloke1973@gmail.com',
    NEXT_PUBLIC_GITHUB_USERNAME:
      process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'VINO123RAJ',
    NEXT_PUBLIC_LINKEDIN_URL:
      process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/p-vinoth-raj',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://vinothraj.dev',
    NEXT_PUBLIC_RESUME_PATH:
      process.env.NEXT_PUBLIC_RESUME_PATH || '/resume/Vinothraj-P-Resume.pdf',
  },
};

export default nextConfig;
