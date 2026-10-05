import styles from './achievements.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Icon } from '@/components/ui/icon'
import { achievements } from '@/data/experience'

const typeLabel: Record<string, string> = {
  activity: 'Activity',
  award: 'Award',
  leadership: 'Leadership',
}

export function Achievements() {
  return (
    <section className={styles.achievements} aria-labelledby="achievements-heading">
      <Container>
        <SectionHeading
          index="06"
          id="achievements-heading"
          eyebrow="Beyond Code"
          title="Leadership, community and curiosity."
          description="Alongside building software, I value teaching, coordinating and contributing to the people around me."
        />

        <div className={styles.grid}>
          {achievements.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              {item.id === 'ijert-automation-builder' ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <article className={styles.card}>
                    <div className={styles.top}>
                      <span className={styles.iconWrap} aria-hidden="true">
                        <Icon name={item.icon} size={20} />
                      </span>

                      <span className={`${styles.type} ${styles[item.type]}`}>
                        {typeLabel[item.type]}
                      </span>
                    </div>

                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.org}>{item.organization}</p>
                    <p className={styles.body}>{item.description}</p>
                    <span className={styles.date}>{item.date}</span>
                  </article>
                </a>
              ) : (
                <article className={styles.card}>
                  <div className={styles.top}>
                    <span className={styles.iconWrap} aria-hidden="true">
                      <Icon name={item.icon} size={20} />
                    </span>

                    <span className={`${styles.type} ${styles[item.type]}`}>
                      {typeLabel[item.type]}
                    </span>
                  </div>

                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.org}>{item.organization}</p>
                  <p className={styles.body}>{item.description}</p>
                  <span className={styles.date}>{item.date}</span>
                </article>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
