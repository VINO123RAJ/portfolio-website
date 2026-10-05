'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './project-visual.module.css'
import type { Project } from '@/types'

interface ProjectVisualProps {
  project: Project
  priority?: boolean
}

export function ProjectVisual({ project, priority = false }: ProjectVisualProps) {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={styles.visual}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      {!errored ? (
        <Image
          src={project.coverImage}
          alt={`${project.title} preview`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 55vw"
          className={`${styles.image} ${loaded ? styles.loaded : ''}`}
          onError={() => setErrored(true)}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <ProjectDiagram project={project} />
      )}

      <div className={styles.scrim} aria-hidden="true" />
      <span className={styles.badge}>{project.category}</span>
    </div>
  )
}

function ProjectDiagram({ project }: { project: Project }) {
  const steps = project.architecture.slice(0, 5)
  return (
    <div className={styles.diagram} role="img" aria-label={`${project.title} architecture`}>
      <span className={styles.diagramLabel}>{project.title}</span>
      <div className={styles.flow}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={styles.flowNode}
            style={{ '--i': index } as React.CSSProperties}
          >
            <span className={styles.flowIndex}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.flowText}>{step}</span>
            {index < steps.length - 1 && <span className={styles.flowArrow} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  )
}
