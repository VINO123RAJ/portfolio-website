'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import styles from './hero-canvas.module.css'

const HeroScene = dynamic(() => import('@/components/3d/hero-scene').then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
})

function CanvasSkeleton() {
  return <div className={styles.skeleton} aria-hidden="true" />
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldMount(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)

    const idle = window.setTimeout(() => setShouldMount(true), 1800)
    return () => {
      observer.disconnect()
      window.clearTimeout(idle)
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.canvasWrap} aria-hidden="true">
      {shouldMount ? <HeroScene /> : <CanvasSkeleton />}
    </div>
  )
}
