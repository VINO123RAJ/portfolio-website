import styles from './development-philosophy.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Icon } from '@/components/ui/icon'
import { designProcess } from '@/data/skills'

export function DevelopmentPhilosophy() {
  return (
    <section className={styles.philosophy} aria-labelledby="philosophy-heading">
      <Container>
        <SectionHeading
          index="10"
          id="philosophy-heading"
          eyebrow="How I Build"
          title="A process from problem to product."
          description="Every project I take on follows the same discipline — understand first, design deliberately, build carefully, improve continuously."
        />

        <ol className={styles.steps}>
          {designProcess.map((step, index) => (
            <Reveal key={step.step} delay={index * 90} as="li" className={styles.stepWrap}>
              <article className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(step.step).padStart(2, '0')}
                </span>
                <span className={styles.stepIcon} aria-hidden="true">
                  <Icon name={step.icon} size={20} />
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.description}</p>
                <span className={styles.stepLine} aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
