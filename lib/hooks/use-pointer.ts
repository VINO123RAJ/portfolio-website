'use client'

import { useEffect, useRef } from 'react'

function canUsePointerEffects(): boolean {
  if (typeof window === 'undefined') return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(pointer: fine)').matches
  return !reduce && fine
}

/**
 * Subtle magnetic pull towards the cursor. Applied to a wrapper element so it
 * never fights GSAP transforms on a parent.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !canUsePointerEffects()) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const animate = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        raf = requestAnimationFrame(animate)
      } else {
        raf = 0
      }
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(animate)
    }

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      targetX = (event.clientX - (rect.left + rect.width / 2)) * strength
      targetY = (event.clientY - (rect.top + rect.height / 2)) * strength
      start()
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength])

  return ref
}

/**
 * Writes pointer position to CSS custom properties so a transform defined in
 * CSS can produce a 3D tilt without any per-frame JavaScript layout work.
 */
export function useTilt<T extends HTMLElement>(maxDegrees = 6) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !canUsePointerEffects()) return

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const ry = (px - 0.5) * maxDegrees * 2
      const rx = (0.5 - py) * maxDegrees * 2
      el.style.setProperty('--tilt-x', `${rx.toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${ry.toFixed(2)}deg`)
      el.style.setProperty('--spot-x', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--spot-y', `${(py * 100).toFixed(1)}%`)
      el.dataset.tilting = 'true'
    }

    const onLeave = () => {
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
      delete el.dataset.tilting
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [maxDegrees])

  return ref
}
