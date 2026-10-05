export type ColorKey =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'background'
  | 'surface'
  | 'surfaceAlt'
  | 'border'
  | 'borderAlt'
  | 'text'
  | 'textSecondary'
  | 'textTertiary'
  | 'accent'
  | 'accentGlow'
  | 'success'
  | 'warning'
  | 'error'

export interface DesignTokens {
  colors: Record<ColorKey, string>
  gradients: Record<string, string>
  spacing: Record<string, string>
  fontSize: Record<string, { size: string; lineHeight: string; letterSpacing?: string }>
  fontWeight: Record<string, string>
  borderRadius: Record<string, string>
  transition: Record<string, string>
  breakpoints: Record<string, string>
  shadows: Record<string, string>
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  label: string
}

export interface Profile {
  name: string
  displayName: string
  title: string
  tagline: string
  bio: string[]
  location: string
  email: string
  githubUsername: string
  linkedinUrl: string
  siteUrl: string
  resumePath: string
}

export interface Stat {
  label: string
  value: string
  description?: string
}

export type SkillLevel = 'basic' | 'familiar' | 'proficient' | 'advanced'

export interface Skill {
  id: string
  name: string
  icon: string
  level: SkillLevel
  category: string
}

export interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

export interface ProjectImage {
  src: string
  alt: string
  width?: number
  height?: number
  type?: 'cover' | 'screenshot' | 'architecture' | 'diagram'
}

export interface ProjectLink {
  label: string
  url: string
  icon?: string
  external?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  problem: string
  solution: string
  technologies: string[]
  features: string[]
  architecture: string[]
  links: ProjectLink[]
  images: ProjectImage[]
  coverImage: string
  date?: string
  featured: boolean
  category: string
  /** Optional — only rendered when real, provided information exists. */
  challenges?: string[]
  /** Optional — only rendered when real, measured outcomes exist. */
  outcome?: string[]
  /** Optional — implementation notes specific to the project. */
  implementation?: string[]
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | 'Present'
  current: boolean
  description: string[]
  technologies: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  cgpa: string
  description?: string
  link?: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  icon: string
  url?: string
}

export interface Achievement {
  id: string
  title: string
  organization: string
  date: string
  description: string
  icon: string
  type: 'activity' | 'award' | 'leadership' | 'publication'
  url?: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  topics: string[]
  updated_at: string
}

export interface GitHubProfile {
  login: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface NavigationItem {
  label: string
  href: string
  icon: string
}

export interface CommandItem {
  id: string
  label: string
  icon: string
  section: string
  action: 'scroll' | 'link' | 'download' | 'theme'
  href?: string
}

export interface DesignProcess {
  step: number
  title: string
  description: string
  icon: string
}

export interface AIAutomationFlowNode {
  id: string
  label: string
  description?: string
  x?: number
  y?: number
}

export interface AIAutomationFlowEdge {
  from: string
  to: string
  label?: string
}
