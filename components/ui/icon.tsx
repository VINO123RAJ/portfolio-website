import {
  Home,
  User,
  Code,
  Folder,
  Briefcase,
  GraduationCap,
  Mail,
  Download,
  HelpCircle,
  Search,
  Command,
  Info,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  Link as LinkIcon,
  ExternalLink,
  AlertCircle,
  Lightbulb,
  GitBranch,
  Terminal,
  ListChecks,
  TriangleAlert,
  Target,
  Layers,
  X,
  Minus,
  Plus,
  Award,
  BarChart,
  Brain,
  Network,
  ChevronDown,
  Users,
  Trophy,
  MessageSquare,
  Workflow,
  Zap,
  Route,
  Cpu,
  Presentation,
  BookMarked,
  Star,
  GitFork,
  Eye,
  FileWarning,
  Send,
  CheckCircle2,
  PenTool,
  TrendingUp,
  Sun,
  Moon,
  Menu,
  FileText,
  Server,
  Database,
  Wrench,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/brand-icons'

type IconComponent = React.ComponentType<LucideProps>

/**
 * Explicit registry instead of a wildcard import: keeps the bundle to the
 * icons actually used and guarantees they survive tree-shaking.
 * Keys are normalized (lowercase, no separators).
 */
const ICONS: Record<string, IconComponent> = {
  home: Home,
  user: User,
  code: Code,
  folder: Folder,
  briefcase: Briefcase,
  graduationcap: GraduationCap,
  mail: Mail,
  download: Download,
  helpcircle: HelpCircle,
  search: Search,
  command: Command,
  info: Info,
  arrowright: ArrowRight,
  arrowupright: ArrowUpRight,
  maximize2: Maximize2,
  link: LinkIcon,
  externallink: ExternalLink,
  alertcircle: AlertCircle,
  lightbulb: Lightbulb,
  gitbranch: GitBranch,
  terminal: Terminal,
  listchecks: ListChecks,
  trianglealert: TriangleAlert,
  target: Target,
  layers: Layers,
  x: X,
  minus: Minus,
  plus: Plus,
  award: Award,
  barchart: BarChart,
  brain: Brain,
  network: Network,
  chevrondown: ChevronDown,
  users: Users,
  trophy: Trophy,
  messagesquare: MessageSquare,
  workflow: Workflow,
  zap: Zap,
  route: Route,
  cpu: Cpu,
  presentation: Presentation,
  bookmarked: BookMarked,
  star: Star,
  gitfork: GitFork,
  eye: Eye,
  filewarning: FileWarning,
  send: Send,
  checkcircle2: CheckCircle2,
  pentool: PenTool,
  trendingup: TrendingUp,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  filetext: FileText,
  server: Server,
  database: Database,
  wrench: Wrench,
  github: GithubIcon as IconComponent,
  linkedin: LinkedinIcon as IconComponent,
}

export interface AppIconProps {
  name: string
  size?: number
  className?: string
  strokeWidth?: number
  'aria-hidden'?: boolean
  'aria-label'?: string
}

export function Icon({ name, size = 20, className, strokeWidth = 1.75, ...rest }: AppIconProps) {
  const key = name.replace(/[-_\s]/g, '').toLowerCase()
  const ResolvedIcon = ICONS[key] ?? null

  if (!ResolvedIcon) {
    return (
      <span
        className={className}
        style={{ display: 'inline-block', width: size, height: size }}
        aria-hidden="true"
      />
    )
  }

  return <ResolvedIcon size={size} className={className} strokeWidth={strokeWidth} {...rest} />
}
