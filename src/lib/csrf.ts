import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session/edge'
import { randomBytes } from 'crypto'

const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: 'instagram_messaging_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export async function getCsrfToken(request: Request) {
  const session = await getIronSession(request, NextResponse.next(), sessionOptions)
  
  if (!session.csrfToken) {
    session.csrfToken = randomBytes(32).toString('hex')
    await session.save()
  }

  return session.csrfToken
}

export async function validateCsrfToken(request: Request, token: string) {
  const session = await getIronSession(request, NextResponse.next(), sessionOptions)
  return session.csrfToken === token
}