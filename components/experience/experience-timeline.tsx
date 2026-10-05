'use client'

import { useState } from 'react'
import styles from './experience-timeline.module.css'
import { experience, education } from '@/data/experience'
import { useInView } from '@/lib/hooks/use-in-view'
import { Icon } from '@/components/ui/icon'
import type { Experience as ExperienceEntry } from '@/types'

function formatRange(start: string, end: string) {
  const format = (value: string) => {
    if (!value) return ''
    if (value === 'Present' || value.includes('ongoing')) return 'Present'
    const [year, month] = value.split('-')
    if (!month) return year ?? value
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const from = format(start)
  const to = format(end)

  if (!from && !to) return ''
  if (!from) return to
  if (!to) return from
  return `${from} — ${to}`
}

interface TimelineItemProps {
  role: ExperienceEntry
  index: number
  isOpen: boolean
  onToggle: () => void
}

function TimelineItem({ role, index, isOpen, onToggle }: TimelineItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>({
    threshold: 0,
    rootMargin: '0px 0px -12% 0px',
  })

  const panelId = `role-panel-${role.id}`
  const range = formatRange(role.startDate, role.endDate)
  const hasSingleLine = role.description.length === 1

  const itemClasses = [
    styles.item,
    inView ? styles.visible : '',
    isOpen ? styles.open : '',
    role.current ? styles.currentItem : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li ref={ref} className={itemClasses} style={{ '--i': index } as React.CSSProperties}>
      <span className={styles.rail} aria-hidden="true" />
      <span className={styles.node} aria-hidden="true">
        <span className={styles.nodeDot} />
      </span>

      <div className={styles.card}>
        <div className={styles.head}>
          <div className={styles.headMain}>
            {role.current && (
              <span className={styles.currentBadge}>
                <span className={styles.currentDot} aria-hidden="true" />
                Current
              </span>
            )}

            <h3 className={styles.title}>{role.title}</h3>

            <p className={styles.company}>
              <span className={styles.companyName}>{role.company}</span>
              <span className={styles.sep} aria-hidden="true">
                ·
              </span>
              <span className={styles.location}>{role.location}</span>
            </p>

            {range && <span className={styles.date}>{range}</span>}
          </div>

          <button
            type="button"
            className={styles.toggle}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={`${isOpen ? 'Hide' : 'Show'} details for ${role.title}`}
          >
            <span className={styles.toggleLabel} aria-hidden="true">
              {isOpen ? 'Hide' : 'Details'}
            </span>
            <span className={styles.toggleIcon} aria-hidden="true">
              <Icon name={isOpen ? 'minus' : 'plus'} size={15} />
            </span>
          </button>
        </div>

        <div id={panelId} className={styles.panel} hidden={!isOpen}>
          {hasSingleLine ? (
            <p className={styles.summary}>{role.description[0]}</p>
          ) : (
            <ul className={styles.bullets}>
              {role.description.map((point, i) => (
                <li key={i} className={styles.bullet}>
                  <span className={styles.bulletMark} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          {role.technologies.length > 0 && (
            <ul className={styles.tags} aria-label={`Technologies used in ${role.title}`}>
              {role.technologies.map((tech) => (
                <li key={tech} className={styles.tag}>
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  )
}

export function ExperienceTimeline() {
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <ol className={styles.timeline}>
      {experience.map((role, index) => (
        <TimelineItem
          key={role.id}
          role={role}
          index={index}
          isOpen={expanded === role.id}
          onToggle={() => setExpanded((prev) => (prev === role.id ? null : role.id))}
        />
      ))}
    </ol>
  )
}

export function EducationBlock() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div ref={ref} className={`${styles.education} ${inView ? styles.active : ''}`}>
      {education.map((item) => (
        <article key={item.id} className={styles.eduCard}>
          <div className={styles.eduTop}>
            <span className={styles.eduYears}>
              {item.startDate} — {item.endDate}
            </span>
            <span className={styles.eduCgpa}>CGPA {item.cgpa}</span>
          </div>
          <h3 className={styles.eduDegree}>{item.degree}</h3>
          <p className={styles.eduInstitution}>{item.institution}</p>
          {item.description && <p className={styles.eduDesc}>{item.description}</p>}
          {item.link && (
            <p className={styles.eduLink}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                🎓 View Institution
              </a>
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
