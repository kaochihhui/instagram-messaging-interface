import { NextRequest, NextResponse } from 'next/server'
import { sendInstagramMessage } from '@/lib/agentql'
import { getCurrentUser } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { log } from '@/lib/logger'
import { validateCsrfToken } from '@/lib/csrf'

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = await rateLimit(request)
  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult
  }

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    log('warn', 'Unauthorized access attempt', { ip: request.ip })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { recipient, message, csrfToken } = await request.json()

    // CSRF validation
    const isValidCsrf = await validateCsrfToken(request, csrfToken)
    if (!isValidCsrf) {
      log('warn', 'Invalid CSRF token', { user: currentUser.id, ip: request.ip })
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
    }

    if (!recipient || !message) {
      log('warn', 'Invalid request: missing recipient or message', { user: currentUser.id })
      return NextResponse.json({ error: 'Recipient and message are required' }, { status: 400 })
    }

    const result = await sendInstagramMessage(recipient, message)
    log('info', 'Message sent successfully', { user: currentUser.id, recipient })

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    log('error', 'Error sending message', { user: currentUser?.id, error })
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}