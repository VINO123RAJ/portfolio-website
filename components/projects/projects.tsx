'use client'

import { useMemo, useState } from 'react'
import styles from './projects.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { ProjectPanel } from '@/components/projects/project-panel'
import { ProjectCaseStudy } from '@/components/projects/project-case-study'
import { projects } from '@/data/projects'
import type { Project } from '@/types'

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<string>('All')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  )

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="projects-section" className={styles.projects} aria-labelledby="projects-heading">
      <Container>
        <SectionHeading
          index="03"
          id="projects-heading"
          eyebrow="Selected Work"
          title="Projects built to solve real problems."
          description="Each project starts from a real requirement, not a tutorial. Open a case study to see the problem, the architecture, and how it was built."
        />

        <div className={styles.filters} role="tablist" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={filter === category}
              className={`${styles.filter} ${filter === category ? styles.filterActive : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.list}>
          {filtered.map((project, index) => (
            <Reveal key={project.id} delay={index * 60}>
              <ProjectPanel project={project} index={index} onOpen={setActiveProject} />
            </Reveal>
          ))}
        </div>
      </Container>

      <ProjectCaseStudy project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
