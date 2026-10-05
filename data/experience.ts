import type { Experience, Education, Certification, Achievement } from '@/types'

export const experience: Experience[] = [
  {
    id: 'current',
    // EDIT: replace `company` with your actual employer, and add a start date
    // (e.g. '2025-06') if you want the range shown.
    title: 'Full-stack Developer',
    company: 'NICS',
    location: 'Chennai, India',
    startDate: '',
    endDate: 'Present',
    current: true,
    description: ['Currently working as a Full-stack Developer.'],
    technologies: ['TypeScript', 'React', 'Node.js', 'Python'],
  },
  {
    id: 'dexwox',
    // EDIT: add start/end dates when available, e.g. '2025-02' / '2025-06'.
    title: 'Backend / Full-Stack Development',
    company: 'GFG',
    location: 'Chennai, India',
    startDate: '',
    endDate: '',
    current: false,
    description: [
      'Backend development',
      'Frontend development',
      'Database integration',
      'REST APIs',
      'Responsive interfaces',
      'Real-time data',
    ],
    technologies: ['Node.js', 'React', 'MySQL', 'REST APIs'],
  },
  {
    id: 'besant',
    title: 'Full Stack Web Developer Course',
    company: 'NOVITECH R&D',
    location: 'Chennai, India',
    startDate: '2024-10',
    endDate: '2025-01',
    current: false,
    description: ['Internship focused on full-stack web development.'],
    technologies: ['React', 'Node.js', 'MySQL'],
  },
  {
    id: 'finari',
    title: 'Frontend Developer Intern',
    company: 'Finari Services',
    location: 'Chennai, India',
    startDate: '2025-06',
    endDate: '2025-09',
    current: false,
    description: ['Internship focused on frontend development.'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'codsoft',
    title: 'Python Programming Intern',
    company: 'CODSOFT',
    location: 'Remote',
    startDate: '2025-07',
    endDate: '2025-08',
    current: false,
    description: ['Internship focused on Python programming.'],
    technologies: ['Python'],
  },
]

export const education: Education[] = [
  {
    id: 'degree',
    degree: 'B.E. Computer Science and Engineering',
    institution: 'Misrimal Navajee Munoth Jain Engineering College, Chennai',
    location: 'Chennai, Tamil Nadu, India',
    startDate: '2022',
    endDate: '2026',
    cgpa: '8.6',
    description:
      'Focused on software engineering fundamentals, data structures, algorithms, database systems, and artificial intelligence.',
    link: 'https://mnmjec.ac.in/',
  },
]

export const certifications: Certification[] = [
  // {
  //   id: 'nptel-python',
  //   title: 'Python for Data Science',
  //   issuer: 'NPTEL',
  //   date: '2025-03',
  //   description:
  //     'Comprehensive course covering Python programming, data structures, data analysis, and visualization techniques using pandas, NumPy, and matplotlib.',
  //   icon: 'award',
  //   url: 'https://nptel.ac.in/',
  // },
  {
    id: 'data-analytics-python',
    title: 'Data Analytics with Python',
    issuer: 'NPTEL',
    date: '2025-04',
    description:
      'Applied data analytics methodologies using Python libraries for statistical analysis, data cleaning, and visualization of real-world datasets.',
    icon: 'bar-chart',
    url: 'https://nptel.ac.in/',
  },
  // {
  //   id: 'guvi-genai',
  //   title: 'Generative AI',
  //   issuer: 'GUVI',
  //   date: '2025-05',
  //   description:
  //     'Explored foundations of generative AI, prompt engineering, transformer models, and practical applications in content creation and automation.',
  //   icon: 'brain',
  //   url: 'https://www.guvi.in/',
  // },
  {
    id: 'digilabs-python-basics',
    title: 'Python Basics',
    issuer: 'DigiLabs',
    date: '2024',
    description:
      'Learned Python fundamentals, including variables, data types, loops, functions, conditional statements, and basic problem-solving.',
    icon: 'code',
    url: 'https://www.digilabs.in/',
  },
  {
    id: 'cisco-networking',
    title: 'Networking Essentials',
    issuer: 'Cisco',
    date: '2024-12',
    description:
      'Fundamental networking concepts including OSI model, IP addressing, routing, switching, and network security basics.',
    icon: 'network',
    url: 'https://www.cisco.com/',
  },
  {
    id: 'infosys-js',
    title: 'JavaScript Front-End Development',
    issuer: 'Infosys Springboard',
    date: '2024-10',
    description:
      'Modern JavaScript concepts, DOM manipulation, event handling, and building interactive user interfaces with vanilla JS.',
    icon: 'code',
    url: 'https://www.infosys.com/sp',
  },
  {
    id: 'besant-fullstack',
    title: 'Full Stack Development',
    issuer: 'NOVITECH R&D',
    date: '2025-01',
    description:
      'End-to-end full-stack development training covering MERN stack, database design, REST APIs, and deployment practices.',
    icon: 'layers',
    url: 'https://novitechrd.com/',
  },
]

export const achievements: Achievement[] = [
  {
    id: 'coders-club',
    title: "Coder's Club — Full Stack Knowledge Sharing",
    organization: 'College Developer Community',
    date: '2023-2026',
    description:
      'Co-founded and regularly conduct sessions on full-stack development, React, and AI automation for fellow students. Shared practical workshops on building real projects.',
    icon: 'users',
    type: 'activity',
  },
  {
    id: 'nse-coordinator',
    title: 'National Science Day 2025 — Overall Student Coordinator',
    organization: 'Misrimal Navajee Munoth Jain Engineering College',
    date: '2025-02',
    description:
      'Led coordination of the National Science Day event across departments, managing logistics, schedules, and student participation for college-wide scientific activities.',
    icon: 'award',
    type: 'leadership',
  },
  {
    id: 'cse-symposium',
    title: 'CSE Symposium Participation',
    organization: 'Department of Computer Science & Engineering',
    date: '2024-09',
    description:
      'Actively participated in technical events and hackathons organized during the annual CSE symposium, presenting projects on AI automation and full-stack applications.',
    icon: 'code',
    type: 'activity',
  },
  // {
  //   id: 'tagore-symposium',
  //   title: '2nd Place — Non-Technical Event',
  //   organization: 'Tagore Engineering College Symposium 2024',
  //   date: '2024-03',
  //   description:
  //     'Secured second place in a non-technical team event at the Tagore Engineering College annual symposium, demonstrating teamwork and problem-solving skills.',
  //   icon: 'trophy',
  //   type: 'award',
  // },
  {
    id: 'ijert-automation-builder',
    title: 'Research Paper — Automation Builder',
    organization: 'International Journal of Engineering Research & Technology (IJERT)',
    date: '2026-05',
    description:
      'Published a research paper on generating automated workflows from natural language using Large Language Models and n8n, exploring AI-powered workflow creation and automation.',
    icon: 'file-text',
    type: 'award',
    url: 'https://www.ijert.org/automation-builder-natural-language-driven-workflow-generation-using-large-language-model-and-n8n-ijertv15is050297',
  },
]
