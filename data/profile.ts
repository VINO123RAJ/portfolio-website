import type { Profile, NavigationItem } from '@/types'

export const profile: Profile = {
  name: 'Vinothraj P',
  displayName: 'VINOTHRAJ P',
  title: 'Software Developer | AI & Automation Learner | Full-Stack Developer',
  tagline:
    'Learning about intelligent software, AI-powered systems & digital experiences through thoughtful engineering.',
  bio: [
    "I'm Vinothraj P, a Software Developer focused on learning about modern web applications, AI-powered products, automation systems, and practical digital solutions.",
    'I enjoy building practical software products that combine modern web development, backend systems, artificial intelligence and automation.',
    'My journey started with web development and gradually expanded into backend engineering, APIs, databases, AI applications and workflow automation.',
    'I am particularly interested in understanding how AI can be turned into useful software rather than remaining just a standalone model or chatbot.',
    "Currently, I'm focused on becoming a stronger software engineer while exploring AI, Generative AI, automation and full-stack application development.",
  ],
  location: 'Chennai, Tamil Nadu, India',
  email: 'vinoloke1973@gmail.com',
  githubUsername: 'VINO123RAJ',
  linkedinUrl: 'https://linkedin.com/in/p-vinoth-raj',
  siteUrl: 'https://vinothraj.dev',
  resumePath: '/resume/Vinothraj-P-Resume.pdf',
}

export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Skills', href: '#skills', icon: 'code' },
  { label: 'Projects', href: '#projects', icon: 'folder' },
  { label: 'Experience', href: '#experience', icon: 'briefcase' },
  { label: 'Research', href: '#research', icon: 'graduation-cap' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
]
