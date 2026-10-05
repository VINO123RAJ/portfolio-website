import styles from './section-heading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  index?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  index,
  id,
}: SectionHeadingProps) {
  return (
    <header className={`${styles.heading} ${styles[align]}`}>
      {(eyebrow || index) && (
        <div className={styles.meta}>
          {index && <span className={styles.index}>{index}</span>}
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        </div>
      )}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  )
}
