import { NextRequest, NextResponse } from 'next/server'
import { getCsrfToken } from '@/lib/csrf'

export async function GET(req: NextRequest) {
  const res = new NextResponse()
  const csrfToken = await getCsrfToken(req, res)
  return NextResponse.json({ csrfToken }, { headers: res.headers })
}