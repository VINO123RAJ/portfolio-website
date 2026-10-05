import '@/styles/globals.css'
import { Inter, Fira_Code } from 'next/font/google'
import { Providers } from '@/app/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vinothraj.dev'),
  title: {
    default: 'Vinothraj P | Software Developer | AI & Automation',
    template: '%s | Vinothraj P',
  },
  description:
    'Portfolio of Vinothraj P, a Software Developer focused on modern web applications, AI, automation and full-stack development.',
  keywords: [
    'Vinothraj P',
    'Software Developer',
    'AI Automation',
    'Full-Stack Developer',
    'Portfolio',
    'React',
    'Next.js',
    'n8n',
    'Gemini AI',
  ],
  authors: [{ name: 'Vinothraj P' }],
  creator: 'Vinothraj P',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Vinothraj P | Portfolio',
    title: 'Vinothraj P | Software Developer | AI & Automation',
    description:
      'Portfolio of Vinothraj P, a Software Developer focused on modern web applications, AI, automation and full-stack development.',
    images: [{ url: '/images/og/portfolio-og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinothraj P | Software Developer | AI & Automation',
    description:
      'Portfolio of Vinothraj P — Learning about AI-powered systems, automation workflows, and digital experiences.',
    images: ['/images/og/portfolio-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/images/og/portfolio-og.png',
  },
}

export const viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
