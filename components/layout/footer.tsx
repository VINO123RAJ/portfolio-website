import styles from './footer.module.css'
import { Container } from '@/components/ui/container'
import { Icon } from '@/components/ui/icon'
import { profile, navigationItems } from '@/data/profile'

const socials = [
  { label: 'GitHub', href: `https://github.com/${profile.githubUsername}`, icon: 'github' },
  { label: 'LinkedIn', href: profile.linkedinUrl, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <a href="#home" className={styles.brand}>
              <span className={styles.mark}>V</span>
              <span className={styles.brandName}>VINOTHRAJ</span>
            </a>
            <p className={styles.tagline}>
              Software Developer learning about AI-powered systems, automation and digital
              experiences from Chennai, India.
            </p>
            <div className={styles.socials}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.icon === 'mail' ? undefined : '_blank'}
                  rel={social.icon === 'mail' ? undefined : 'noopener noreferrer'}
                  className={styles.social}
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <span className={styles.navTitle}>Navigate</span>
            <ul className={styles.navList}>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.metaCol}>
            <span className={styles.navTitle}>Info</span>
            <ul className={styles.metaList}>
              <li>{profile.location}</li>
              <li>
                <a href={`mailto:${profile.email}`} className={styles.navLink}>
                  {profile.email}
                </a>
              </li>
              <li>Available for opportunities</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {year} {profile.name}. All rights reserved.
          </span>
          <span className={styles.built}>Built with Next.js, React Three Fiber &amp; GSAP</span>
        </div>
      </Container>
    </footer>
  )
}
