'use client'

import { useInView } from '@/lib/hooks/use-in-view'
import styles from './journey-timeline.module.css'

interface Milestone {
  year: string
  title: string
  body: string
}

const milestones: Milestone[] = [
  {
    year: 'Origins',
    title: 'Web Development',
    body: 'Started with HTML, CSS and JavaScript — learning to build interfaces that feel right.',
  },
  {
    year: 'Deepening',
    title: 'Backend & APIs',
    body: 'Moved into Node.js, Flask, REST APIs and database design to power real applications.',
  },
  {
    year: 'Systems',
    title: 'Databases & Architecture',
    body: 'Learned how data, services and interfaces fit together into maintainable systems.',
  },
  {
    year: 'Present',
    title: 'AI & Automation',
    body: 'Exploring LLM applications, Generative AI and workflow automation as practical software.',
  },
]

export function JourneyTimeline() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div ref={ref} className={`${styles.timeline} ${inView ? styles.active : ''}`} role="list">
      <span className={styles.rail} aria-hidden="true" />
      {milestones.map((milestone, index) => (
        <div
          key={milestone.title}
          className={styles.item}
          style={{ '--i': index } as React.CSSProperties}
          role="listitem"
        >
          <span className={styles.node} aria-hidden="true">
            <span className={styles.nodeInner} />
          </span>
          <div className={styles.content}>
            <span className={styles.year}>{milestone.year}</span>
            <h3 className={styles.title}>{milestone.title}</h3>
            <p className={styles.body}>{milestone.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
