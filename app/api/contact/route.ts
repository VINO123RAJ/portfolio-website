import { NextResponse } from 'next/server'

interface ContactPayload {
  name?: unknown
  email?: unknown
  message?: unknown
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  let payload: ContactPayload

  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const name = asString(payload.name)
  const email = asString(payload.email)
  const message = asString(payload.message)

  const fieldErrors: Record<string, string> = {}
  if (name.length < 2) fieldErrors.name = 'Please enter your name.'
  if (!EMAIL_REGEX.test(email)) fieldErrors.email = 'Please enter a valid email.'
  if (message.length < 10) fieldErrors.message = 'Message should be at least 10 characters.'

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 })
  }

  const providerEndpoint = process.env.CONTACT_FORM_ENDPOINT
  const providerKey = process.env.CONTACT_FORM_KEY

  // No email provider configured: respond honestly instead of pretending to send.
  if (!providerEndpoint) {
    return NextResponse.json(
      {
        ok: false,
        reason: 'not_configured',
        message: 'Direct sending is not configured yet. Please reach out by email instead.',
      },
      { status: 200 },
    )
  }

  try {
    const res = await fetch(providerEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(providerKey ? { Authorization: `Bearer ${providerKey}` } : {}),
      },
      body: JSON.stringify({ name, email, message }),
    })

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, reason: 'provider_error', message: 'The message could not be sent.' },
        { status: 200 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { ok: false, reason: 'network_error', message: 'The message could not be sent.' },
      { status: 200 },
    )
  }
}
