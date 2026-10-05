'use client'

import styles from './project-panel.module.css'
import { ProjectVisual } from '@/components/projects/project-visual'
import { Icon } from '@/components/ui/icon'
import { useTilt } from '@/lib/hooks/use-pointer'
import type { Project } from '@/types'

interface ProjectPanelProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export function ProjectPanel({ project, index, onOpen }: ProjectPanelProps) {
  const reversed = index % 2 === 1
  const tiltRef = useTilt<HTMLButtonElement>(5)

  return (
    <article
      className={`${styles.panel} ${reversed ? styles.reversed : ''}`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className={styles.visualCol}>
        <button
          ref={tiltRef}
          type="button"
          className={styles.visualButton}
          onClick={() => onOpen(project)}
          aria-label={`Open case study for ${project.title}`}
        >
          <ProjectVisual project={project} priority={index === 0} />
          <span className={styles.visualCta} aria-hidden="true">
            <Icon name="maximize-2" size={16} />
            View Case Study
          </span>
        </button>
      </div>

      <div className={styles.infoCol}>
        <span className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          {project.featured && <span className={styles.featured}>Featured</span>}
        </div>

        <h3 id={`project-${project.id}-title`} className={styles.title}>
          {project.title}
        </h3>

        <p className={styles.description}>{project.shortDescription}</p>

        <ul className={styles.tech} aria-label="Technologies used">
          {project.technologies.slice(0, 6).map((tech) => (
            <li key={tech} className={styles.techItem}>
              {tech}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button type="button" className={styles.caseStudyBtn} onClick={() => onOpen(project)}>
            Read Case Study
            <Icon name="arrow-up-right" size={15} />
          </button>

          <div className={styles.links}>
            {project.links.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={styles.link}
              >
                <Icon name={link.icon ?? 'link'} size={15} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
