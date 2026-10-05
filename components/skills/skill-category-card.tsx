import styles from './skill-category-card.module.css'
import { Icon } from '@/components/ui/icon'
import type { Skill, SkillCategory, SkillLevel } from '@/types'

const LEVEL_DOTS: Record<SkillLevel, number> = {
  basic: 1,
  familiar: 2,
  proficient: 3,
  advanced: 4,
}

const LEVEL_LABEL: Record<SkillLevel, string> = {
  basic: 'Basic',
  familiar: 'Familiar',
  proficient: 'Proficient',
  advanced: 'Advanced',
}

const CATEGORY_ICON: Record<string, string> = {
  frontend: 'code',
  backend: 'server',
  programming: 'terminal',
  databases: 'database',
  'ai-automation': 'brain',
  tools: 'wrench',
}

function LevelMeter({ level }: { level: SkillLevel }) {
  const filled = LEVEL_DOTS[level]
  return (
    <span className={styles.meter} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`${styles.pip} ${i < filled ? styles.pipOn : ''}`} />
      ))}
    </span>
  )
}

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <li className={styles.chip} title={`${skill.name} — ${LEVEL_LABEL[skill.level]}`}>
      <span className={styles.chipName}>{skill.name}</span>
      <LevelMeter level={skill.level} />
      <span className="u-sr-only">{LEVEL_LABEL[skill.level]}</span>
    </li>
  )
}

export function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const highest = category.skills.reduce<SkillLevel>((acc, skill) => {
    return LEVEL_DOTS[skill.level] > LEVEL_DOTS[acc] ? skill.level : acc
  }, 'basic')

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.headerIcon} aria-hidden="true">
          <Icon name={CATEGORY_ICON[category.id] ?? 'code'} size={17} />
        </span>
        <h3 className={styles.title}>{category.title}</h3>
        <span className={styles.count}>{category.skills.length}</span>
      </header>
      <div className={styles.levelRow}>
        <span className={styles.levelLabel}>Focus: {LEVEL_LABEL[highest]}</span>
      </div>
      <ul className={styles.chips}>
        {category.skills.map((skill) => (
          <SkillChip key={`${category.id}-${skill.id}`} skill={skill} />
        ))}
      </ul>
    </article>
  )
}
