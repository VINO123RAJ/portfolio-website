'use client'

import { useState } from 'react'
import styles from './certifications.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Icon } from '@/components/ui/icon'
import { certifications } from '@/data/experience'

export function Certifications() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className={styles.certifications} aria-labelledby="certifications-heading">
      <Container>
        <SectionHeading
          index="05"
          id="certifications-heading"
          eyebrow="Certifications"
          title="Verified learning, applied in practice."
          description="Courses and programs that backed my hands-on work across Python, data, AI and full-stack development."
        />

        <div className={styles.wall}>
          {certifications.map((cert, index) => {
            const isOpen = openId === cert.id
            return (
              <Reveal key={cert.id} delay={index * 60}>
                <article className={`${styles.card} ${isOpen ? styles.open : ''}`}>
                  <button
                    type="button"
                    className={styles.trigger}
                    onClick={() => setOpenId(isOpen ? null : cert.id)}
                    aria-expanded={isOpen}
                    aria-controls={`cert-${cert.id}`}
                  >
                    <span className={styles.iconWrap} aria-hidden="true">
                      <Icon name={cert.icon} size={20} />
                    </span>
                    <span className={styles.cardMain}>
                      <span className={styles.issuer}>{cert.issuer}</span>
                      <span className={styles.cardTitle}>{cert.title}</span>
                    </span>
                    <span className={styles.chevron} aria-hidden="true">
                      <Icon name="chevron-down" size={16} />
                    </span>
                  </button>

                  <div id={`cert-${cert.id}`} className={styles.detail} hidden={!isOpen}>
                    <p className={styles.detailText}>{cert.description}</p>
                    <div className={styles.detailFooter}>
                      <span className={styles.period}>{cert.date.replace('-', ' / ')}</span>
                      {cert.url && (
                        <a
                          className={styles.detailLink}
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* Verify */}
                          {/* <Icon name="external-link" size={13} /> */}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
