'use client'

import { useEffect, useRef } from 'react'
import styles from './interactive-intro.module.css'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const words = ['web applications', 'backend systems', 'AI-powered tools', 'automation workflows']

export function InteractiveIntro() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('[data-intro="hello"] .word', {
        scrollTrigger: {
          trigger: '[data-intro="hello"]',
          start: 'top 78%',
        },
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      })

      gsap.from('[data-intro="reveal"]', {
        scrollTrigger: {
          trigger: '[data-intro="reveal"]',
          start: 'top 80%',
          end: 'top 45%',
          scrub: 1,
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      })
    }, rootRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className={styles.intro}>
      <div className={styles.inner}>
        <h2 className={styles.hello} data-intro="hello">
          <span className={styles.line}>
            <span className={styles.word}>Hello,</span>
            <span className={styles.word}>I&apos;m</span>
            <span className={`${styles.word} ${styles.accent}`}>Vinothraj.</span>
          </span>
        </h2>

        <p className={styles.reveal} data-intro="reveal">
          I Love to learn{' '}
          {words.map((word, i) => (
            <span key={word} className={styles.rotate}>
              {word}
              {i < words.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
