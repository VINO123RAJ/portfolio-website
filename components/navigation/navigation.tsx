'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import styles from './navigation.module.css'
import { navigationItems } from '@/data/profile'
import { Icon } from '@/components/ui/icon'
import { useTheme } from '@/app/providers'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleNavClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav} aria-label="Primary">
          <a href="#home" className={styles.brand} onClick={(e) => handleNavClick(e, '#home')}>
            <img src="/images/logo.png" alt="Vinothraj" className={styles.brandMark} />
            <span className={styles.brandName}>VINOTHRAJ P</span>
          </a>

          <ul className={styles.links}>
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`${styles.link} ${
                    activeSection === item.href.slice(1) ? styles.active : ''
                  }`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
            </button>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <Icon name={isMenuOpen ? 'x' : 'menu'} size={18} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <ul className={styles.mobileLinks}>
          {navigationItems.map((item, index) => (
            <li key={item.href} style={{ transitionDelay: `${index * 40}ms` }}>
              <a
                href={item.href}
                className={styles.mobileLink}
                onClick={(e) => handleNavClick(e, item.href)}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span className={styles.mobileIndex}>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.mobileTheme}
          onClick={toggleTheme}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </>
  )
}
