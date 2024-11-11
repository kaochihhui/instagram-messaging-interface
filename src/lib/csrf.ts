import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { randomBytes } from 'crypto'

export const sessionOptions = {
  cookieName: "instagram_messaging_session",
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

export type SessionData = {
  csrfToken: string
}

export async function getCsrfToken(req: NextRequest, res: NextResponse) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions)
  
  if (!session.csrfToken) {
    session.csrfToken = randomBytes(32).toString('hex')
    await session.save()
  }

  return session.csrfToken
}

export async function validateCsrfToken(req: NextRequest, res: NextResponse, token: string) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions)
  return session.csrfToken === token
}