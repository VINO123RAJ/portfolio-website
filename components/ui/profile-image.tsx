'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './profile-image.module.css'

interface ProfileImageProps {
  src: string
  alt: string
  size?: number
  priority?: boolean
  className?: string
}

export function ProfileImage({
  src,
  alt,
  size = 176,
  priority = false,
  className,
}: ProfileImageProps) {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`${styles.frame} ${className ?? ''}`} style={{ width: size, height: size }}>
      <div className={styles.ring} aria-hidden="true" />
      <div className={styles.glass} aria-hidden="true" />
      <div className={styles.inner}>
        {!errored ? (
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            priority={priority}
            onError={() => setErrored(true)}
            onLoad={() => setLoaded(true)}
            className={`${styles.image} ${loaded ? styles.loaded : ''}`}
            sizes={`${size}px`}
          />
        ) : (
          <div className={styles.fallback} role="img" aria-label={alt}>
            <span className={styles.initials}>VP</span>
          </div>
        )}
      </div>
    </div>
  )
}
