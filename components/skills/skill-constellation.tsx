'use client'

import { useState } from 'react'
import styles from './skill-constellation.module.css'
import { skillCategories } from '@/data/skills'

const LEVEL_DOTS: Record<string, number> = {
  basic: 1,
  familiar: 2,
  proficient: 3,
  advanced: 4,
}

interface ConstellationProps {
  onSelect?: (categoryId: string) => void
}

export function SkillConstellation({ onSelect }: ConstellationProps) {
  const [active, setActive] = useState<string | null>(null)
  const count = skillCategories.length
  const radius = 37

  return (
    <div className={styles.wrap} role="group" aria-label="Technology overview constellation">
      <svg viewBox="0 0 100 100" className={styles.svg} aria-hidden="true">
        <defs>
          <radialGradient id="constellationCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="26" fill="url(#constellationCore)" />

        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.18"
          strokeDasharray="1 1.4"
          className={styles.orbitRing}
        />
        <circle
          cx="50"
          cy="50"
          r="22"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.18"
          className={styles.orbitRingReverse}
        />

        {skillCategories.map((category, index) => {
          const angle = (index / count) * Math.PI * 2 - Math.PI / 2
          const x = 50 + Math.cos(angle) * radius
          const y = 50 + Math.sin(angle) * radius
          const isActive = active === category.id
          return (
            <line
              key={`line-${category.id}`}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={isActive ? 'var(--color-accent)' : 'var(--color-border)'}
              strokeWidth={isActive ? 0.3 : 0.15}
              opacity={isActive ? 0.9 : 0.5}
            />
          )
        })}
      </svg>

      <div className={styles.core} aria-hidden="true">
        <span className={styles.coreLabel}>STACK</span>
      </div>

      {skillCategories.map((category, index) => {
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2
        const x = 50 + Math.cos(angle) * radius
        const y = 50 + Math.sin(angle) * radius
        const isActive = active === category.id
        return (
          <button
            key={category.id}
            type="button"
            className={`${styles.node} ${isActive ? styles.nodeActive : ''}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={() => setActive(category.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(category.id)}
            onBlur={() => setActive(null)}
            onClick={() => onSelect?.(category.id)}
            aria-label={`${category.title}: ${category.skills.map((s) => s.name).join(', ')}`}
          >
            <span className={styles.nodeDot} />
            <span className={styles.nodeText}>{category.title}</span>
            <span className={styles.nodeMeta}>
              {category.skills.length} ·{' '}
              {Math.max(...category.skills.map((s) => LEVEL_DOTS[s.level] ?? 1))}/4
            </span>
          </button>
        )
      })}
    </div>
  )
}
