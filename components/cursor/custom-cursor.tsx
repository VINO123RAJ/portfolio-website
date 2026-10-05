import { useEffect, useState, useRef } from 'react'
import styles from './custom-cursor.module.css'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

  const isTouchDevice = () =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  useEffect(() => {
    if (isTouchDevice()) return

    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      cursorX = e.clientX
      cursorY = e.clientY
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => setIsActive(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    const animate = () => {
      if (trailRef.current && cursorRef.current) {
        const rect = cursorRef.current.getBoundingClientRect()
        const targetX = cursorX - rect.width / 2
        const targetY = cursorY - rect.height / 2
        trailRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleInteractiveHover = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive = target.closest('button, a, [role="button"], input') !== null
      document.body.style.cursor = isInteractive ? 'pointer' : 'default'
    }

    document.addEventListener('mousemove', handleInteractiveHover)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleInteractiveHover)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  if (isTouchDevice()) return null

  return (
    <>
      <div
        ref={trailRef}
        className={`${styles.trail} ${isVisible ? styles.visible : ''}`}
        aria-hidden="true"
      />
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${isVisible ? styles.visible : ''} ${isActive ? styles.active : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        aria-hidden="true"
      />
    </>
  )
}
