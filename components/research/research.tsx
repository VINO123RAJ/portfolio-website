import styles from './research.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Icon } from '@/components/ui/icon'

const sections = [
  {
    id: 'problem',
    label: 'Problem',
    icon: 'alert-circle',
    body: 'Automation platforms expect structured configuration, while users express requirements in natural language. Bridging this gap manually is slow and requires technical knowledge of workflow semantics.',
  },
  {
    id: 'approach',
    label: 'Approach',
    icon: 'route',
    body: 'Investigate how Large Language Models can interpret natural-language requirements and systematically transform them into valid, executable n8n workflow definitions.',
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: 'git-branch',
    steps: [
      'User Input — natural-language requirement',
      'LLM Reasoning — intent and entity extraction',
      'Workflow Generation — structured graph construction',
      'n8n Export — valid workflow JSON',
      'Execution — automated run in n8n',
    ],
  },
  {
    id: 'technology',
    label: 'Technology',
    icon: 'cpu',
    chips: ['React', 'Node.js', 'Gemini', 'n8n', 'MySQL', 'Docker', 'REST API'],
  },
  {
    id: 'result',
    label: 'Result / Demonstration',
    icon: 'presentation',
    body: 'The system demonstrates a working pipeline from natural-language instruction to deployed automation. Quantitative evaluation results are intentionally not claimed here — this is a demonstration of the approach and architecture.',
  },
]

export function Research() {
  return (
    <section className={styles.research} aria-labelledby="research-heading">
      <Container>
        <SectionHeading
          index="08"
          id="research-heading"
          eyebrow="Research & Innovation"
          title="Automation Builder — natural-language-driven workflow generation."
          description="Final-year research exploring how LLM reasoning and n8n can be combined to convert plain requirements into structured automation."
        />

        <div className={styles.paper}>
          <header className={styles.paperHead} style={{ position: 'relative' }}>
            <span className={styles.paperTag}>Research Paper / Final Year Project</span>

            <a
              className={styles.detailLink}
              href="https://www.ijert.org/automation-builder-natural-language-driven-workflow-generation-using-large-language-model-and-n8n-ijertv15is050297"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              ✓ Verify
            </a>

            <h3 className={styles.paperTitle}>
              Intelligent Workflow Orchestration Using LLM and n8n
            </h3>

            <p className={styles.paperMeta}>
              Vinothraj P · B.E. Computer Science and Engineering · 2022 – 2026
            </p>
          </header>

          <div className={styles.abstract}>
            <span className={styles.abstractLabel}>Abstract</span>
            <p className={styles.abstractText}>
              This work explores how natural-language requirements can be transformed into
              structured automation workflows using Large Language Models and n8n. It focuses on
              reducing manual workflow configuration by letting AI reason over user intent and emit
              an executable workflow structure.
            </p>
          </div>

          <div className={styles.body}>
            {sections.map((section, index) => (
              <Reveal key={section.id} delay={index * 60}>
                <article className={styles.block}>
                  <header className={styles.blockHead}>
                    <span className={styles.blockIndex}>{String(index + 1).padStart(2, '0')}</span>
                    <Icon name={section.icon} size={16} className={styles.blockIcon} />
                    <h4 className={styles.blockTitle}>{section.label}</h4>
                  </header>

                  {section.body && <p className={styles.blockBody}>{section.body}</p>}

                  {section.steps && (
                    <ol className={styles.steps}>
                      {section.steps.map((step, i) => (
                        <li key={i} className={styles.step}>
                          <span className={styles.stepIndex}>{String(i + 1).padStart(2, '0')}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {section.chips && (
                    <ul className={styles.chips}>
                      {section.chips.map((chip) => (
                        <li key={chip} className={styles.chip}>
                          {chip}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
