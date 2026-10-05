import styles from './experience.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { ExperienceTimeline, EducationBlock } from '@/components/experience/experience-timeline'

export function Experience() {
  return (
    <section className={styles.experience} aria-labelledby="experience-heading">
      <Container>
        <Reveal>
          <SectionHeading
            index="04"
            id="experience-heading"
            eyebrow="Experience"
            title="Where I've built and learned."
            description="Internships and roles where I applied full-stack development, backend engineering and AI automation to real projects."
          />
        </Reveal>

        <div className={styles.layout}>
          <div className={styles.timelineCol}>
            <ExperienceTimeline />
          </div>

          <Reveal delay={140} className={styles.sideCol}>
            <div className={styles.sideHeader}>
              <span className={styles.sideLabel}>Education</span>
              <span className={styles.sideLine} aria-hidden="true" />
            </div>
            <EducationBlock />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
