'use client'

import { useEffect, useState } from 'react'
import styles from './stats-row.module.css'
import { stats } from '@/data/skills'
import { useInView } from '@/lib/hooks/use-in-view'

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(target * eased)
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration])

  return value
}

function StatValue({ value, active }: { value: string; active: boolean }) {
  const numeric = Number(value)
  const isNumeric = !Number.isNaN(numeric) && value.trim() !== ''
  const animated = useCountUp(isNumeric ? numeric : 0, active)

  if (isNumeric) {
    const decimals = value.includes('.') ? 1 : 0
    return <>{animated.toFixed(decimals)}</>
  }
  return <>{value}</>
}

export function StatsRow() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div ref={ref} className={`${styles.stats} ${inView ? styles.active : ''}`}>
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={styles.stat}
          style={{ '--i': index } as React.CSSProperties}
        >
          <span className={styles.value}>
            <StatValue value={stat.value} active={inView} />
          </span>
          <span className={styles.label}>{stat.label}</span>
          {stat.description && <span className={styles.desc}>{stat.description}</span>}
        </div>
      ))}
    </div>
  )
}
