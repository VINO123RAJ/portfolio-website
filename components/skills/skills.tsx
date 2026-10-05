import styles from './skills.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { SkillConstellation } from '@/components/skills/skill-constellation'
import { SkillCategoryCard } from '@/components/skills/skill-category-card'
import { skillCategories } from '@/data/skills'

export function Skills() {
  return (
    <section className={styles.skills} aria-labelledby="skills-heading">
      <Container>
        <SectionHeading
          index="02"
          id="skills-heading"
          eyebrow="Capabilities"
          title="A stack chosen to build complete products."
          description="I use these tools to build products from idea to production — from UI and databases to APIs and AI. The levels show how familiar I am with each tool."
        />

        <div className={styles.top}>
          <Reveal className={styles.constellationCol}>
            <SkillConstellation />
          </Reveal>

          <Reveal delay={120} className={styles.noteCol}>
            <div className={styles.noteCard}>
              <span className={styles.noteIndex}>Note</span>
              <p className={styles.note}>
                I&apos;m a generalist by design. Rather than optimising for one layer, I focus on
                understanding how frontend, backend, data and AI connect — and building products
                that work end to end.
              </p>
              <div className={styles.noteLegend}>
                <span className={styles.legendItem}>
                  <span className={styles.legendPip} style={{ opacity: 0.35 }} />
                  Familiar
                </span>
                <span className={styles.legendItem}>
                  <span className={styles.legendPip} style={{ opacity: 1 }} />
                  Proficient
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 70}>
              <SkillCategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
