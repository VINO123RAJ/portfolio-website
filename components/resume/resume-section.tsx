'use client'

import { useEffect, useState } from 'react'
import styles from './resume-section.module.css'
import { Container } from '@/components/ui/container'
import { Icon } from '@/components/ui/icon'
import { profile } from '@/data/profile'

type ResumeState = 'checking' | 'available' | 'missing'

export function ResumeSection() {
  const [state, setState] = useState<ResumeState>('checking')

  useEffect(() => {
    const controller = new AbortController()

    async function check() {
      try {
        const res = await fetch(profile.resumePath, {
          method: 'HEAD',
          signal: controller.signal,
        })
        const type = res.headers.get('content-type') ?? ''
        const isPdf = type.includes('pdf') || type.includes('octet-stream')
        setState(res.ok && isPdf ? 'available' : 'missing')
      } catch (error) {
        if ((error as Error).name === 'AbortError') return
        setState('missing')
      }
    }

    check()
    return () => controller.abort()
  }, [])

  return (
    <section className={styles.resume} aria-labelledby="resume-heading">
      <Container>
        <div className={styles.card}>
          <div className={styles.cardGlow} aria-hidden="true" />

          <div className={styles.content}>
            <span className={styles.eyebrow}>Resume</span>
            <h2 id="resume-heading" className={styles.title}>
              Want the complete picture?
            </h2>
            <p className={styles.lead}>
              A concise, recruiter-friendly summary of my experience, projects, skills and education
              — everything in one document.
            </p>

            {state === 'available' && (
              <div className={styles.actions}>
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primary}
                >
                  <Icon name="eye" size={16} />
                  View Resume
                </a>
                <a href={profile.resumePath} download className={styles.secondary}>
                  <Icon name="download" size={16} />
                  Download Resume
                </a>
              </div>
            )}

            {state === 'checking' && (
              <div className={styles.actions}>
                <span className={`${styles.primary} ${styles.disabled}`}>
                  <span className={styles.spinner} aria-hidden="true" />
                  Checking resume...
                </span>
              </div>
            )}

            {state === 'missing' && (
              <div className={styles.placeholder}>
                <Icon name="file-warning" size={18} />
                <div className={styles.placeholderBody}>
                  <strong className={styles.placeholderTitle}>Resume not uploaded yet</strong>
                  <p className={styles.placeholderText}>
                    Add your PDF at <code className={styles.code}>{profile.resumePath}</code> and it
                    will appear here automatically.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.doc}>
              <span className={styles.docLine} style={{ width: '55%' }} />
              <span className={styles.docLine} style={{ width: '85%' }} />
              <span className={styles.docLine} style={{ width: '70%' }} />
              <span className={styles.docLine} style={{ width: '90%' }} />
              <span className={styles.docLine} style={{ width: '60%' }} />
              <span className={styles.docLine} style={{ width: '78%' }} />
              <span className={styles.docLine} style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
