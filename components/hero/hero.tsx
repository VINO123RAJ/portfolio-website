'use client'

import { useEffect, useRef } from 'react'
import styles from './hero.module.css'
import { HeroCanvas } from '@/components/hero/hero-canvas'
import { ProfileImage } from '@/components/ui/profile-image'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { profile } from '@/data/profile'
import { gsap } from '@/lib/gsap'

const domains = ['Web Applications', 'AI Systems', 'Automation', 'Full-Stack']

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !rootRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero="eyebrow"]', { y: 24, opacity: 0, duration: 0.7 })
        .from(
          '[data-hero="line"]',
          { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.08 },
          '-=0.35',
        )
        .from('[data-hero="lead"]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('[data-hero="cta"]', { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('[data-hero="domain"]', { opacity: 0, y: 10, duration: 0.5, stagger: 0.06 }, '-=0.3')
        .from('[data-hero="portrait"]', { opacity: 0, scale: 0.92, duration: 1 }, '-=0.9')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className={styles.hero}>
      <div className={styles.canvasLayer}>
        <HeroCanvas />
      </div>

      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow} data-hero="eyebrow">
            <span className={styles.status} aria-hidden="true" />
            {profile.title}
          </p>

          <h1 className={styles.title}>
            <span className={styles.lineWrap}>
              <span className={styles.line} data-hero="line">
                Building intelligent
              </span>
            </span>
            <span className={styles.lineWrap}>
              <span className={styles.line} data-hero="line">
                <em>software</em>, AI systems
              </span>
            </span>
            <span className={styles.lineWrap}>
              <span className={styles.line} data-hero="line">
                &amp; digital experiences.
              </span>
            </span>
          </h1>

          <p className={styles.lead} data-hero="lead">
            I&apos;m Vinothraj P, a Software Developer focused on learning about modern web
            applications, AI-powered products, automation systems, and practical digital solutions.
          </p>

          <div className={styles.ctas}>
            <span data-hero="cta">
              <Magnetic>
                <Button as="link" href="#projects" variant="primary" size="lg" icon="arrow-right">
                  View My Work
                </Button>
              </Magnetic>
            </span>
            <span data-hero="cta">
              <Magnetic>
                <Button as="link" href="#contact" variant="secondary" size="lg" icon="mail">
                  Contact Me
                </Button>
              </Magnetic>
            </span>
          </div>

          <ul className={styles.domains} aria-label="Focus areas">
            {domains.map((domain) => (
              <li key={domain} className={styles.domain} data-hero="domain">
                {domain}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <div className={styles.portrait} data-hero="portrait">
            <ProfileImage
              src="/images/profile.jpeg"
              alt="Portrait of Vinothraj P"
              size={260}
              priority
            />
          </div>
          <div className={styles.frameLabel} aria-hidden="true">
            <span>CHENNAI, IN</span>
            <span className={styles.dot} />
            <span>AVAILABLE</span>
          </div>
        </div>
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll to About section">
        {/* <span>Scroll</span> */}
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </div>
  )
}
