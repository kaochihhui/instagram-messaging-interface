import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: 'minute',
  fireImmediately: true,
})

export async function rateLimit(request: NextRequest) {
  const remaining = await limiter.removeTokens(1)
  const ip = request.ip ?? '127.0.0.1'

  if (remaining < 0) {
    console.log(`Rate limit exceeded for IP: ${ip}`)
    return new NextResponse('Too Many Requests', { status: 429 })
  }
}