'use client'

import { useEffect, useRef } from 'react'
import styles from './ai-automation.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Icon } from '@/components/ui/icon'
import { aiAutomationFlowNodes } from '@/data/skills'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const ICONS = ['message-square', 'brain', 'git-branch', 'workflow', 'zap']

export function AIAutomation() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('[data-flow="node"]', {
        scrollTrigger: {
          trigger: '[data-flow="track"]',
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.16,
        ease: 'power3.out',
      })

      gsap.from('[data-flow="connector"]', {
        scrollTrigger: {
          trigger: '[data-flow="track"]',
          start: 'top 75%',
        },
        scaleX: 0,
        transformOrigin: 'left center',
        opacity: 0,
        duration: 0.5,
        stagger: 0.16,
        delay: 0.35,
        ease: 'power2.out',
      })
    }, rootRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} aria-labelledby="ai-automation-heading">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.backdropGrid} />
        <div className={styles.backdropGlow} />
      </div>

      <Container>
        <SectionHeading
          index="07"
          id="ai-automation-heading"
          eyebrow="AI & Automation"
          title="Turning ideas into automated systems."
          description="A core focus of my work: expressing intent in natural language, letting AI reason over it, and producing structured, executable automation."
        />

        <div ref={rootRef} className={styles.flowWrap}>
          <div className={styles.track} data-flow="track">
            {aiAutomationFlowNodes.map((node, index) => (
              <div key={node.id} className={styles.step}>
                <div className={styles.node} data-flow="node">
                  <span className={styles.nodeIcon} aria-hidden="true">
                    <Icon name={ICONS[index] ?? 'circle'} size={20} />
                  </span>
                  <span className={styles.nodeLabel}>{node.label}</span>
                  <span className={styles.nodeIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                {index < aiAutomationFlowNodes.length - 1 && (
                  <span className={styles.connector} data-flow="connector" aria-hidden="true">
                    <span className={styles.connectorPulse} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.caption}>
            <span className={styles.captionTag}>Intent → Execution</span>
            <p className={styles.captionText}>
              This pipeline is the throughline of my projects: it appears in the Zero-Click
              Automation system and forms the basis of my final-year research into LLM-driven
              workflow generation.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
