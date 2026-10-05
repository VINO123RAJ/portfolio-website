import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'zero-click-ai-automation',
    title: 'Zero-Click AI Workflow Automation',
    description:
      'An AI-powered automation system that converts natural-language requirements into executable workflow automation. Users describe a task in plain English and the system generates a ready-to-run n8n workflow.',
    shortDescription:
      'Natural language to executable automation workflows using Gemini AI and n8n.',
    problem:
      'Workflow automation platforms require users to manually configure each step, node, and connection — a tedious, error-prone process that demands technical knowledge. Most users cannot translate their intent directly into an automation blueprint.',
    solution:
      'A system that interprets natural-language requirements and generates structured automation workflows. By combining large language model reasoning with template-based workflow generation, users can go from plain English to a deployed automation in seconds.',
    technologies: ['React', 'Node.js', 'Gemini AI', 'n8n', 'REST API', 'TypeScript'],
    features: [
      'Natural-language requirement parsing',
      'AI-driven workflow generation using Gemini',
      'Structured output for n8n',
      'Reduces manual workflow configuration',
    ],
    architecture: [
      'User provides natural-language requirement',
      'React interface captures and validates input',
      'Node.js backend routes request to LLM',
      'Gemini AI analyzes intent and generates workflow structure',
      'Structured logic is converted to n8n JSON',
      'Workflow is deployed to n8n engine',
      'Automated execution begins immediately',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/VINO123RAJ/Zero-Click-Automation',
        icon: 'github',
        external: true,
      },
      // { label: 'Live Demo', url: '#', icon: 'external-link', external: true },
    ],
    images: [
      {
        src: '/images/projects/zero-click-cover.png',
        alt: 'Zero-Click AI Automation interface showing natural language input and workflow output',
        type: 'cover',
      },
      {
        src: '/images/projects/zero-click-screenshot-1.png',
        alt: 'Dashboard view of generated workflow',
        type: 'screenshot',
      },
      {
        src: '/images/projects/zero-click-architecture.png',
        alt: 'Architecture diagram of zero-click automation system',
        type: 'architecture',
      },
    ],
    coverImage: '/images/projects/zero-click-cover.png',
    date: '2025-06',
    featured: true,
    category: 'AI Automation',
  },
  {
    id: 'automation-builder',
    title: 'Automation Builder',
    description:
      'An intelligent workflow orchestration system that uses natural-language instructions to generate automation workflows. Based on research into LLM-driven workflow orchestration with n8n.',
    shortDescription:
      'LLM-driven workflow orchestration system generating n8n automations from natural language.',
    problem:
      'Traditional workflow orchestration requires manual configuration of triggers, actions, and connections. There is a gap between how users naturally describe tasks and how automation platforms expect structured input.',
    solution:
      'A system that maps natural-language instructions to structured workflow definitions. Using LLM-based intent classification and a graph-based workflow model, the system produces executable n8n workflows that can be reviewed and deployed.',
    technologies: ['React', 'Node.js', 'Gemini', 'n8n', 'MySQL', 'Docker'],
    features: [
      'Natural-language to workflow translation',
      'LLM-driven workflow generation',
      'n8n workflow export and execution',
      'MySQL-backed workflow storage',
      'Dockerized deployment',
    ],
    architecture: [
      'USER enters natural-language instruction',
      'NATURAL LANGUAGE is parsed and normalized',
      'LLM (Gemini) performs intent classification and reasoning',
      'WORKFLOW GENERATOR builds structured graph',
      'Generated workflow is exported to n8n',
      'EXECUTION runs automatically in n8n engine',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/VINO123RAJ/Zero-Click-Automation',
        icon: 'github',
        external: true,
      },
      // { label: 'Paper', url: '#', icon: 'file-text', external: true },
    ],
    images: [
      {
        src: '/images/projects/automation-builder-cover.png',
        alt: 'Automation Builder interface with workflow visualization',
        type: 'cover',
      },
      {
        src: '/images/projects/automation-builder-flow.png',
        alt: 'Workflow flow diagram showing NATURAL LANGUAGE to EXECUTION pipeline',
        type: 'architecture',
      },
    ],
    coverImage: '/images/projects/automation-builder-cover.png',
    date: '2025-08',
    featured: true,
    category: 'AI Automation',
  },
  {
    id: 'ai-news-summarizer',
    title: 'AI News Summarizer',
    description:
      'An AI-powered news summarization system that processes long-form news content and produces concise, coherent summaries using transformer-based models and NLP techniques.',
    shortDescription: 'Transformer-based news summarization producing concise article summaries.',
    problem:
      'Readers struggle to consume lengthy news articles. Manual summarization is slow and subjective, and generic extractive summaries often miss key context.',
    solution:
      'A system that applies text preprocessing, NLP techniques (TextRank), and transformer-based summarization models (T5/BART) to produce abstractive summaries that capture the core narrative of each article.',
    technologies: ['Python', 'NLP', 'TextRank', 'T5', 'BART', 'Transformers', 'Flask'],
    features: [
      'Long-form article processing',
      'Extractive summarization (TextRank)',
      'Abstractive summarization (T5/BART)',
      'Newspaper-inspired reading interface',
    ],
    architecture: [
      'ARTICLE content is fetched',
      'TEXT PROCESSING cleans and preprocesses content',
      'Tokenized input is passed to summarizer',
      'SUMMARIZATION MODEL (T5/BART) generates summary',
      'Post-processed SUMMARY is returned',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/VINO123RAJ/AI-News-Summarizer',
        icon: 'github',
        external: true,
      },
      // { label: 'Live Demo', url: '#', icon: 'external-link', external: true },
    ],
    images: [
      {
        src: '/images/projects/news-summarizer-cover.png',
        alt: 'News summarizer interface with article and summary side by side',
        type: 'cover',
      },
    ],
    coverImage: '/images/projects/news-summarizer-cover.png',
    date: '2025-03',
    featured: true,
    category: 'NLP',
  },
  {
    id: 'jarvis-voice-assistant',
    title: 'JARVIS Voice Assistant',
    description:
      'A voice-driven AI assistant designed to interact with users through speech and execute useful commands, featuring a futuristic AI interface.',
    shortDescription:
      'Voice-driven AI assistant with futuristic interface for speech-based command execution.',
    problem:
      'Most voice assistants are closed ecosystems. A customizable assistant that can execute developer-specific and system commands through voice offers unique utility.',
    solution:
      'A modular voice assistant that captures speech, processes it through speech-to-text, understands commands via NLP, executes actions, and responds through text-to-speech — all wrapped in a futuristic UI.',
    technologies: [
      'Python',
      'SpeechRecognition',
      'NLP',
      'Text-to-Speech',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
    features: [
      'Voice input capture',
      'Speech-to-text transcription',
      'Command understanding and intent parsing',
      'Action execution for useful commands',
      'Voice response with text-to-speech',
      'Futuristic AI interface',
    ],
    architecture: [
      'VOICE INPUT is captured and preprocessed',
      'SPEECH PROCESSING converts to text (ASR)',
      'COMMAND UNDERSTANDING parses intent',
      'Action is executed by the backend',
      'VOICE RESPONSE is generated (TTS) and spoken',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/VINO123RAJ/AI_Jarvis',
        icon: 'github',
        external: true,
      },
    ],
    images: [
      {
        src: '/images/projects/jarvis-cover.png',
        alt: 'JARVIS voice assistant futuristic interface',
        type: 'cover',
      },
    ],
    coverImage: '/images/projects/jarvis-cover.png',
    date: '2025-01',
    featured: false,
    category: 'AI',
  },
  {
    id: 'weather-sphere',
    title: 'Weather Sphere',
    description:
      'An interactive weather application that presents weather information through a modern visual interface with atmospheric motion and environmental effects.',
    shortDescription:
      'Interactive weather application with atmospheric motion and modern visual interface.',
    problem:
      'Traditional weather apps present data in static lists. Users miss contextual understanding of weather patterns and atmospheric conditions.',
    solution:
      'A visually rich weather application that uses dynamic particle systems, atmospheric motion, and environmental effects to communicate temperature, humidity, wind, and forecast data intuitively.',
    technologies: ['React', 'Weather API', 'Canvas', 'CSS Animations', 'TypeScript'],
    features: [
      'Weather data integration via API',
      'Atmospheric particle and motion visualization',
      'Temperature, humidity, wind speed display',
      'Forecast display with smooth transitions',
      'Location-based data',
    ],
    architecture: [
      'User location is obtained',
      'Weather API returns condition data',
      'Data is mapped to visual variables',
      'Atmospheric effects render in real-time',
      'Interactive FORECAST is displayed',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/VINO123RAJ/weather-sphere',
        icon: 'github',
        external: true,
      },
      { label: 'Live Demo', url: '#', icon: 'external-link', external: true },
    ],
    images: [
      {
        src: '/images/projects/weather-sphere-cover.png',
        alt: 'Weather Sphere interface with atmospheric visualization',
        type: 'cover',
      },
    ],
    coverImage: '/images/projects/weather-sphere-cover.png',
    date: '2024-11',
    featured: false,
    category: 'Frontend',
  },
  // {
  //   id: 'multimodal-emotion-detection',
  //   title: 'AI-Driven Multimodal Emotion Detection System',
  //   description:
  //     'A multimodal emotion recognition system combining facial, speech, and text information to classify emotional states using CNN, Bi-LSTM, and attention mechanisms.',
  //   shortDescription:
  //     'Multimodal emotion detection using CNN, Bi-LSTM, and attention mechanisms.',
  //   problem:
  //     'Single-modal emotion detection is unreliable — facial expressions, vocal tone, and word choice each tell part of the story. A system that fuses these signals provides more robust classification.',
  //   solution:
  //     'A system that processes facial data through a CNN, speech/text through a Bi-LSTM, and combines both via an attention mechanism to produce a final emotion classification. The architecture explicitly models cross-modal interactions.',
  //   technologies: ['Python', 'TensorFlow', 'CNN', 'Bi-LSTM', 'Attention', 'OpenCV', 'Librosa'],
  //   features: [
  //     'Facial expression analysis (CNN)',
  //     'Speech and text processing (Bi-LSTM)',
  //     'Cross-modal attention fusion',
  //     'Multi-class emotion classification',
  //   ],
  //   architecture: [
  //     'Facial Data is extracted and fed into CNN',
  //     'Speech / Text data is processed by Bi-LSTM',
  //     'Attention Mechanism fuses both modalities',
  //     'Emotion Classification produces final prediction',
  //   ],
  //   links: [
  //     { label: 'GitHub', url: 'https://github.com/VINO123RAJ/multimodal-emotion-detection', icon: 'github', external: true },
  //   ],
  //   images: [
  //     {
  //       src: '/images/projects/emotion-detection-cover.png',
  //       alt: 'Multimodal emotion detection architecture diagram',
  //       type: 'cover',
  //     },
  //   ],
  //   coverImage: '/images/projects/emotion-detection-cover.png',
  //   date: '2025-04',
  //   featured: false,
  //   category: 'AI',
  // },
]
