import { useEffect, useState, useRef } from 'react'
import styles from './command-palette.module.css'
import { Icon } from '@/components/ui/icon'

interface Command {
  id: string
  label: string
  icon: string
  section: string
  href?: string
  external?: boolean
}

const commands: Command[] = [
  { id: 'home', label: 'Go to Home', icon: 'home', href: '#home', section: 'Navigation' },
  { id: 'about', label: 'Go to About', icon: 'user', href: '#about', section: 'Navigation' },
  { id: 'skills', label: 'Go to Skills', icon: 'code', href: '#skills', section: 'Navigation' },
  {
    id: 'projects',
    label: 'Go to Projects',
    icon: 'folder',
    href: '#projects',
    section: 'Navigation',
  },
  {
    id: 'experience',
    label: 'Go to Experience',
    icon: 'briefcase',
    href: '#experience',
    section: 'Navigation',
  },
  {
    id: 'research',
    label: 'Go to Research',
    icon: 'graduation-cap',
    href: '#research',
    section: 'Navigation',
  },
  { id: 'contact', label: 'Go to Contact', icon: 'mail', href: '#contact', section: 'Navigation' },
  {
    id: 'resume',
    label: 'Download Resume',
    icon: 'download',
    href: '/resume/Vinothraj-P-Resume.pdf',
    external: true,
    section: 'File',
  },
  { id: 'help', label: 'Show Help', icon: 'help-circle', section: 'Other' },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setShowHelp(false)
        return
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setShowHelp(false)
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]!
        const last = focusables[focusables.length - 1]!
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const filtered: Command[] = showHelp
    ? [
        {
          id: 'help-info',
          label: 'Available commands: navigate, download, help. Press Esc to close.',
          icon: 'info',
          section: 'Help',
        },
      ]
    : commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.section.toLowerCase().includes(query.toLowerCase()),
      )

  const handleCommandClick = (cmd: Command) => {
    if (cmd.id === 'help') {
      setShowHelp(true)
      return
    }
    if (cmd.href) {
      const isAnchor = cmd.href.startsWith('#')
      if (isAnchor) {
        const el = document.querySelector(cmd.href)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.open(cmd.href, cmd.external ? '_blank' : '_self')
      }
    }
    setIsOpen(false)
    setQuery('')
  }

  if (!isOpen) {
    return (
      <button
        className={styles.floatingButton}
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette (Ctrl+K)"
        title="Keyboard shortcut: Ctrl+K"
      >
        <Icon name="command" size={18} />
        <span className={styles.hotkey}>Ctrl K</span>
      </button>
    )
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => {
        setIsOpen(false)
        setQuery('')
        setShowHelp(false)
      }}
    >
      <div className={styles.panel} ref={panelRef} onClick={(event) => event.stopPropagation()}>
        <div className={styles.search}>
          <Icon name="search" size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            autoFocus
            aria-label="Search commands"
          />
          <kbd className={styles.kbd}>ESC</kbd>
        </div>
        <div className={styles.results}>
          {filtered.length === 0 ? (
            <div className={styles.noResults}>No commands found.</div>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                className={styles.commandItem}
                onClick={() => handleCommandClick(cmd)}
              >
                <div className={styles.commandIcon}>
                  <Icon name={cmd.icon} size={16} />
                </div>
                <div className={styles.commandInfo}>
                  <span className={styles.commandLabel}>{cmd.label}</span>
                  <span className={styles.commandSection}>{cmd.section}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
