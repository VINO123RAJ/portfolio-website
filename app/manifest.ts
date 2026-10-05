import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vinothraj P — Software Developer',
    short_name: 'VINOTHRAJ P',
    description:
      'Portfolio of Vinothraj P, a Software Developer focused on modern web applications, AI, automation and full-stack development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050507',
    theme_color: '#050507',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
