import { useEffect, useState } from 'react'
import styles from './loader.module.css'

export function Loader({ isLoading }: { isLoading: boolean }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let start: number | null = null
    const duration = 1200

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)

      if (pct < 100) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
    return () => {
      start = null
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!visible) return null

  return (
    <div
      className={styles.loader}
      style={{
        opacity: visible && isLoading ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      <div className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.name}>VINOTHRAJ</span>
          <span className={styles.tag}>SYSTEM INITIALIZING</span>
        </div>
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
