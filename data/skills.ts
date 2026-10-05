import type {
  Stat,
  SkillCategory,
  DesignProcess,
  AIAutomationFlowNode,
  AIAutomationFlowEdge,
} from '@/types'

export const stats: Stat[] = [
  { label: 'CGPA', value: '8.6', description: 'B.E. Computer Science' },
  { label: 'Education', value: '2022–2026', description: 'B.E. CSE' },
  { label: 'Projects Built', value: 'Multiple', description: 'Across domains' },
  { label: 'Current Role', value: 'Software Developer', description: 'Full-Stack web Development' },
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { id: 'html', name: 'HTML', icon: 'html', level: 'familiar', category: 'frontend' },
      { id: 'css', name: 'CSS', icon: 'css', level: 'familiar', category: 'frontend' },
      { id: 'js', name: 'JavaScript', icon: 'js', level: 'familiar', category: 'frontend' },
      { id: 'react', name: 'React.js', icon: 'react', level: 'familiar', category: 'frontend' },
      { id: 'nextjs', name: 'Next.js', icon: 'nextjs', level: 'familiar', category: 'frontend' },
      // { id: 'angular', name: 'Angular', icon: 'angular', level: 'familiar', category: 'frontend' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { id: 'nodejs', name: 'Node.js', icon: 'nodejs', level: 'familiar', category: 'backend' },
      { id: 'hono', name: 'Hono', icon: 'hono', level: 'familiar', category: 'backend' },
      { id: 'flask', name: 'Flask', icon: 'flask', level: 'familiar', category: 'backend' },
      { id: 'rest', name: 'REST APIs', icon: 'api', level: 'familiar', category: 'backend' },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    skills: [
      { id: 'python', name: 'Python', icon: 'python', level: 'familiar', category: 'programming' },
      { id: 'java', name: 'HTML5', icon: 'java', level: 'proficient', category: 'programming' },
      { id: 'c', name: 'C', icon: 'c', level: 'familiar', category: 'programming' },
      { id: 'js2', name: 'JavaScript', icon: 'js', level: 'familiar', category: 'programming' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: [
      { id: 'mysql', name: 'MySQL', icon: 'mysql', level: 'familiar', category: 'databases' },
      {
        id: 'supabase',
        name: 'Supabase',
        icon: 'supabase',
        level: 'familiar',
        category: 'databases',
      },
      { id: 'mongodb', name: 'MongoDB', icon: 'mongodb', level: 'familiar', category: 'databases' },
      { id: 'sqlite', name: 'SQLite', icon: 'sqlite', level: 'familiar', category: 'databases' },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI / Automation',
    skills: [
      {
        id: 'genai',
        name: 'Generative AI',
        icon: 'brain',
        level: 'proficient',
        category: 'ai-automation',
      },
      {
        id: 'llm',
        name: 'LLM Applications',
        icon: 'llm',
        level: 'proficient',
        category: 'ai-automation',
      },
      {
        id: 'ai-automation',
        name: 'AI Automation',
        icon: 'automation',
        level: 'proficient',
        category: 'ai-automation',
      },
      // { id: 'n8n', name: 'n8n', icon: 'n8n', level: 'proficient', category: 'ai-automation' },
      { id: 'nlp', name: 'NLP', icon: 'nlp', level: 'familiar', category: 'ai-automation' },
      {
        id: 'workflow',
        name: 'AI Workflow Generation',
        icon: 'workflow',
        level: 'proficient',
        category: 'ai-automation',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { id: 'git', name: 'Git', icon: 'git', level: 'proficient', category: 'tools' },
      { id: 'github', name: 'GitHub', icon: 'github', level: 'proficient', category: 'tools' },
      { id: 'n8n', name: 'n8n', icon: 'n8n', level: 'proficient', category: 'ai-automation' },
      { id: 'powerbi', name: 'Power BI', icon: 'powerbi', level: 'familiar', category: 'tools' },
      { id: 'docker', name: 'Docker', icon: 'docker', level: 'familiar', category: 'tools' },
    ],
  },
]

export const designProcess: DesignProcess[] = [
  {
    step: 1,
    title: 'Understand',
    description:
      'Grasp the actual problem, constraints, and real user needs before touching any code.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'Design',
    description:
      'Sketch the user experience and system architecture — interface, data flow, and boundaries.',
    icon: 'pen-tool',
  },
  {
    step: 3,
    title: 'Build',
    description:
      'Develop the frontend, backend, database, and integrate APIs or AI systems into a working product.',
    icon: 'code',
  },
  {
    step: 4,
    title: 'Improve',
    description:
      'Test, optimize, and iterate — measuring impact and refining the solution over time.',
    icon: 'trending-up',
  },
]

export const aiAutomationFlowNodes: AIAutomationFlowNode[] = [
  { id: 'input', label: 'Natural Language' },
  { id: 'reasoning', label: 'AI Reasoning' },
  { id: 'logic', label: 'Structured Logic' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'automation', label: 'Automation' },
]

export const aiAutomationFlowEdges: AIAutomationFlowEdge[] = [
  { from: 'input', to: 'reasoning' },
  { from: 'reasoning', to: 'logic' },
  { from: 'logic', to: 'workflow' },
  { from: 'workflow', to: 'automation' },
]
