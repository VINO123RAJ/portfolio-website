import styles from './about.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { JourneyTimeline } from '@/components/about/journey-timeline'
import { StatsRow } from '@/components/about/stats-row'
import { InteractiveIntro } from '@/components/about/interactive-intro'
import { profile } from '@/data/profile'

export function About() {
  return (
    <>
      <InteractiveIntro />
      <section className={styles.about} aria-labelledby="about-heading">
        <Container>
          <SectionHeading
            index="01"
            id="about-heading"
            eyebrow="About"
            title="I learn about software that turns ideas into working systems."
          />

          <div className={styles.grid}>
            <div className={styles.bio}>
              <Reveal>
                <p className={styles.lead}>{profile.bio[0]}</p>
              </Reveal>
              {profile.bio.slice(1).map((paragraph, index) => (
                <Reveal key={index} delay={(index + 1) * 60}>
                  <p className={styles.paragraph}>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className={styles.timelineCol}>
              <div className={styles.timelineHeader}>
                <span className={styles.timelineLabel}>The Journey</span>
                <span className={styles.timelineLine} aria-hidden="true" />
              </div>
              <JourneyTimeline />
            </Reveal>
          </div>

          <div className={styles.statsWrap}>
            <StatsRow />
          </div>
        </Container>
      </section>
    </>
  )
}
