import styles from './contact.module.css'
import { Container } from '@/components/ui/container'
import { Icon } from '@/components/ui/icon'
import { ContactForm } from '@/components/contact/contact-form'
import { Reveal } from '@/components/ui/reveal'
import { profile } from '@/data/profile'

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
    external: false,
  },
  {
    label: 'GitHub',
    value: `@${profile.githubUsername}`,
    href: `https://github.com/${profile.githubUsername}`,
    icon: 'github',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'Connect with me',
    href: profile.linkedinUrl,
    icon: 'linkedin',
    external: true,
  },
]

export function Contact() {
  return (
    <section className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.contactGlow} aria-hidden="true" />
      <Container>
        <div className={styles.layout}>
          <div className={styles.left}>
            <Reveal>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Open to opportunities
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h2 id="contact-heading" className={styles.headline}>
                Let&apos;s build something useful.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className={styles.lead}>
                I&apos;m open to software development opportunities, interesting technical projects,
                AI and automation ideas, and collaborations.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className={styles.channels}>
                {channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className={styles.channel}
                  >
                    <span className={styles.channelIcon} aria-hidden="true">
                      <Icon name={channel.icon} size={18} />
                    </span>
                    <span className={styles.channelBody}>
                      <span className={styles.channelLabel}>{channel.label}</span>
                      <span className={styles.channelValue}>{channel.value}</span>
                    </span>
                    <Icon name="arrow-up-right" size={15} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className={styles.formWrap}>
              <span className={styles.formTitle}>Send a Message</span>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
