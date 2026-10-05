'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { CustomCursor } from '@/components/cursor/custom-cursor'
import { Loader } from '@/components/loader/loader'
import { CommandPalette } from '@/components/command/command-palette'
import { SkipLink } from '@/components/a11y/skip-link'

gsap.registerPlugin(ScrollTrigger)

/* ---------------------------------- Theme --------------------------------- */

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = window.localStorage.getItem('theme') as Theme | null
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('theme', next)
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

/* -------------------------------- Loading --------------------------------- */

interface LoadingContextValue {
  isLoading: boolean
}

const LoadingContext = createContext<LoadingContextValue>({ isLoading: false })

export function useLoading() {
  return useContext(LoadingContext)
}

function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const doneRef = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      setIsLoading(false)
    }

    const minimum = window.setTimeout(finish, 900)
    if (document.readyState === 'complete') {
      window.setTimeout(finish, 400)
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    const failsafe = window.setTimeout(finish, 2600)
    return () => {
      window.clearTimeout(minimum)
      window.clearTimeout(failsafe)
      window.removeEventListener('load', finish)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      <Loader isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  )
}

/* ------------------------------ Smooth scroll ----------------------------- */

function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      autoRaf: false,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      cancelAnimationFrame(rafId)
      window.clearTimeout(refresh)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

/* --------------------------------- Root ----------------------------------- */

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <SmoothScrollProvider>
          <SkipLink />
          <CustomCursor />
          {children}
          <CommandPalette />
        </SmoothScrollProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}
