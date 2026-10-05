'use client'

import { useState } from 'react'
import styles from './contact.module.css'
import { Icon } from '@/components/ui/icon'
import { profile } from '@/data/profile'

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'not_configured'

interface FormState {
  name: string
  email: string
  message: string
}

const initialForm: FormState = { name: '', email: '', message: '' }

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const validate = (): boolean => {
    const next: Partial<FormState> = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = 'Please enter a valid email.'
    if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setServerMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.ok) {
        setStatus('success')
        setForm(initialForm)
        return
      }

      if (data.reason === 'not_configured') {
        setStatus('not_configured')
        setServerMessage(data.message)
        return
      }

      if (data.fieldErrors) {
        setErrors(data.fieldErrors)
        setStatus('idle')
        return
      }

      setStatus('error')
      setServerMessage(data.message ?? 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setServerMessage('Network error. Please try again, or email me directly.')
    }
  }

  const isLoading = status === 'loading'
  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    'Project enquiry from portfolio',
  )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className={styles.label}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            disabled={isLoading}
          />
          {errors.name && (
            <span id="contact-name-error" className={styles.errorText} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            disabled={isLoading}
          />
          {errors.email && (
            <span id="contact-email-error" className={styles.errorText} role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className={`${styles.input} ${styles.textarea} ${
            errors.message ? styles.inputError : ''
          }`}
          placeholder="Tell me about the project or opportunity..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          disabled={isLoading}
        />
        {errors.message && (
          <span id="contact-message-error" className={styles.errorText} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <div className={styles.formFooter}>
        <button type="submit" className={styles.submit} disabled={isLoading} aria-busy={isLoading}>
          {isLoading && <span className={styles.spinner} aria-hidden="true" />}
          {isLoading ? 'Sending...' : 'Send Message'}
          {!isLoading && <Icon name="send" size={16} />}
        </button>

        <p className={styles.privacy}>Your details are only used to reply to your message.</p>
      </div>

      <div aria-live="polite" className={styles.statusRegion}>
        {status === 'success' && (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            <Icon name="check-circle-2" size={16} />
            Thanks — your message was sent. I&apos;ll get back to you soon.
          </div>
        )}

        {status === 'error' && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <Icon name="alert-circle" size={16} />
            {serverMessage}
          </div>
        )}

        {status === 'not_configured' && (
          <div className={`${styles.alert} ${styles.alertInfo}`}>
            <Icon name="info" size={16} />
            <span>
              {serverMessage}{' '}
              <a href={mailtoHref} className={styles.alertLink}>
                Email {profile.email}
              </a>
            </span>
          </div>
        )}
      </div>
    </form>
  )
}
