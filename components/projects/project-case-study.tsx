'use client'

import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from './project-case-study.module.css'
import { ProjectVisual } from '@/components/projects/project-visual'
import { Icon } from '@/components/ui/icon'
import type { Project } from '@/types'

interface CaseStudyProps {
  project: Project | null
  onClose: () => void
}

export function ProjectCaseStudy({ project, onClose }: CaseStudyProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const mounted = typeof document !== 'undefined'

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return

      const first = focusables[0]!
      const last = focusables[focusables.length - 1]!

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(timer)
    }
  }, [project, handleKeyDown])

  if (!mounted || !project) return null

  const sections: { label: string; icon: string; body?: string; list?: string[] }[] = [
    { label: 'Problem', icon: 'alert-circle', body: project.problem },
    { label: 'Solution', icon: 'lightbulb', body: project.solution },
    { label: 'Architecture', icon: 'git-branch', list: project.architecture },
  ]

  if (project.implementation?.length) {
    sections.push({ label: 'Implementation', icon: 'terminal', list: project.implementation })
  }
  sections.push({ label: 'Key Features', icon: 'list-checks', list: project.features })
  if (project.challenges?.length) {
    sections.push({ label: 'Challenges', icon: 'triangle-alert', list: project.challenges })
  }
  if (project.outcome?.length) {
    sections.push({ label: 'Outcome', icon: 'target', list: project.outcome })
  }

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.category}>{project.category}</span>
            {project.featured && <span className={styles.featured}>Featured</span>}
          </div>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close case study"
          >
            <Icon name="x" size={18} />
          </button>
        </header>

        <div className={styles.scroll}>
          <div className={styles.hero}>
            <h2 id="case-study-title" className={styles.title}>
              {project.title}
            </h2>
            <p className={styles.description}>{project.description}</p>
          </div>

          <div className={styles.visualWrap}>
            <ProjectVisual project={project} priority />
          </div>

          <div className={styles.sections}>
            {sections.map((section) => (
              <section key={section.label} className={styles.section}>
                <div className={styles.sectionHead}>
                  <Icon name={section.icon} size={16} className={styles.sectionIcon} />
                  <h3 className={styles.sectionTitle}>{section.label}</h3>
                </div>
                {section.body && <p className={styles.sectionBody}>{section.body}</p>}
                {section.list && (
                  <ol className={styles.sectionList}>
                    {section.list.map((item, i) => (
                      <li key={i} className={styles.sectionItem}>
                        <span className={styles.sectionItemIndex}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <Icon name="layers" size={16} className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Technologies</h3>
              </div>
              <ul className={styles.techGrid}>
                {project.technologies.map((tech) => (
                  <li key={tech} className={styles.techItem}>
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className={styles.actions}>
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={styles.actionLink}
              >
                <Icon name={link.icon ?? 'link'} size={16} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
